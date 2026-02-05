#!/bin/bash
# Zenava 生产环境打包脚本
# 用于生成生产环境部署包

set -e  # 遇到错误立即退出

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 项目信息
PROJECT_NAME="zenava"
VERSION=$(date +%Y%m%d-%H%M%S)
PACKAGE_NAME="${PROJECT_NAME}-production-${VERSION}.tar.gz"
DEPLOY_DIR="deploy-package"

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  Zenava 生产环境打包脚本${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

# 1. 清理旧构建
echo -e "${YELLOW}[1/10] 清理旧构建...${NC}"
rm -rf dist-node
rm -rf node_modules/.cache
rm -rf ${DEPLOY_DIR}
rm -f ${PROJECT_NAME}-production-*.tar.gz
echo -e "${GREEN}✓ 清理完成${NC}"
echo ""

# 2. 检查 Node.js 版本
echo -e "${YELLOW}[2/10] 检查 Node.js 版本...${NC}"
NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
  echo -e "${RED}✗ Node.js 版本过低，需要 18.x 或更高版本${NC}"
  exit 1
fi
echo -e "${GREEN}✓ Node.js 版本: $(node --version)${NC}"
echo ""

# 3. 安装依赖
echo -e "${YELLOW}[3/10] 安装依赖...${NC}"
npm install
echo -e "${GREEN}✓ 依赖安装完成${NC}"
echo ""

# 4. 运行测试（可选）
# echo -e "${YELLOW}[4/10] 运行测试...${NC}"
# npm test || echo -e "${YELLOW}⚠ 测试跳过或失败，继续打包...${NC}"
# echo ""

# 5. 构建项目
echo -e "${YELLOW}[4/10] 构建项目...${NC}"
npm run build
if [ ! -d "dist-node" ]; then
  echo -e "${RED}✗ 构建失败：dist-node 目录不存在${NC}"
  exit 1
fi

# 验证构建文件是否存在（支持带 hash 的文件名）
BUILD_FILE=$(find dist-node -name "index-node.*.js" -type f | head -1)
if [ -z "$BUILD_FILE" ]; then
  # 向后兼容：检查固定文件名
  if [ ! -f "dist-node/index-node.js" ]; then
    echo -e "${RED}✗ 构建失败：找不到构建文件 index-node.*.js${NC}"
    exit 1
  else
    BUILD_FILE="dist-node/index-node.js"
  fi
fi
echo -e "${GREEN}✓ 构建完成${NC}"
echo -e "${GREEN}  构建文件: ${BUILD_FILE}${NC}"
echo ""

# 6. 创建部署目录
echo -e "${YELLOW}[5/10] 创建部署目录...${NC}"
mkdir -p ${DEPLOY_DIR}
echo -e "${GREEN}✓ 目录创建完成${NC}"
echo ""

# 7. 复制必要文件
echo -e "${YELLOW}[6/10] 复制文件...${NC}"

# 核心文件
if [ -d "dist-node" ]; then
  cp -r dist-node ${DEPLOY_DIR}/dist-node
else
  echo -e "${RED}✗ 错误: dist-node 目录不存在，构建可能失败${NC}"
  exit 1
fi

if [ -d "public" ]; then
  cp -r public ${DEPLOY_DIR}/public
else
  echo -e "${YELLOW}⚠ 警告: public 目录不存在${NC}"
fi

cp server.js ${DEPLOY_DIR}/
cp package.json ${DEPLOY_DIR}/
cp package-lock.json ${DEPLOY_DIR}/ 2>/dev/null || true

# 配置文件
cp nginx.conf ${DEPLOY_DIR}/ 2>/dev/null || true

# 数据库迁移文件
if [ -d "migrations" ]; then
  cp -r migrations ${DEPLOY_DIR}/
  echo -e "${GREEN}  ✓ 已复制 migrations 目录${NC}"
fi

# 脚本文件（如果需要）
if [ -d "scripts" ]; then
  mkdir -p ${DEPLOY_DIR}/scripts
  # 只复制必要的脚本文件
  cp scripts/init-resource-center-db.ts ${DEPLOY_DIR}/scripts/ 2>/dev/null || true
fi

echo -e "${GREEN}✓ 文件复制完成${NC}"
echo ""

# 8. 创建部署脚本
echo -e "${YELLOW}[7/10] 创建部署脚本...${NC}"

cat > ${DEPLOY_DIR}/deploy.sh << 'DEPLOY_SCRIPT'
#!/bin/bash
# Zenava 生产环境部署脚本
# 在目标服务器上执行此脚本

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

DEPLOY_DIR="/var/www/zenava"
BACKUP_DIR="/var/www/zenava-backup-$(date +%Y%m%d-%H%M%S)"

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  Zenava 生产环境部署${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

# 检查是否为 root 用户
if [ "$EUID" -ne 0 ]; then 
  echo -e "${RED}✗ 请使用 sudo 运行此脚本${NC}"
  exit 1
fi

# 1. 备份旧版本
if [ -d "$DEPLOY_DIR" ]; then
  echo -e "${YELLOW}[1/8] 备份旧版本...${NC}"
  mkdir -p "$BACKUP_DIR"
  cp -r "$DEPLOY_DIR/dist-node" "$BACKUP_DIR/" 2>/dev/null || true
  cp "$DEPLOY_DIR/package.json" "$BACKUP_DIR/" 2>/dev/null || true
  cp "$DEPLOY_DIR/.env" "$BACKUP_DIR/" 2>/dev/null || true
  echo -e "${GREEN}✓ 备份完成: $BACKUP_DIR${NC}"
else
  echo -e "${YELLOW}[1/8] 创建部署目录...${NC}"
  mkdir -p "$DEPLOY_DIR"
fi
echo ""

# 2. 停止应用
echo -e "${YELLOW}[2/8] 停止应用...${NC}"
if systemctl is-active --quiet zenava 2>/dev/null; then
  systemctl stop zenava
  echo -e "${GREEN}✓ 应用已停止${NC}"
else
  # 尝试停止可能正在运行的进程
  pkill -f "tsx server.js" 2>/dev/null || true
  echo -e "${YELLOW}⚠ 应用未运行或已停止${NC}"
fi
echo ""

# 3. 复制文件
echo -e "${YELLOW}[3/8] 复制文件...${NC}"
cp -r dist-node "$DEPLOY_DIR/" 2>/dev/null || true
cp -r public "$DEPLOY_DIR/" 2>/dev/null || true
cp server.js "$DEPLOY_DIR/"
cp package.json "$DEPLOY_DIR/"
cp package-lock.json "$DEPLOY_DIR/" 2>/dev/null || true

# 保留现有的 .env 文件
if [ ! -f "$DEPLOY_DIR/.env" ]; then
  echo -e "${YELLOW}⚠ .env 文件不存在，请手动创建${NC}"
fi

# 复制数据库迁移文件
if [ -d "migrations" ]; then
  cp -r migrations "$DEPLOY_DIR/"
fi

echo -e "${GREEN}✓ 文件复制完成${NC}"
echo ""

# 4. 安装生产依赖
echo -e "${YELLOW}[4/8] 安装生产依赖...${NC}"
cd "$DEPLOY_DIR"
npm ci --production
echo -e "${GREEN}✓ 依赖安装完成${NC}"
echo ""

# 5. 设置权限
echo -e "${YELLOW}[5/8] 设置权限...${NC}"
# 尝试使用 www-data，如果不存在则使用当前用户
if id "www-data" &>/dev/null; then
  chown -R www-data:www-data "$DEPLOY_DIR"
elif id "nginx" &>/dev/null; then
  chown -R nginx:nginx "$DEPLOY_DIR"
else
  chown -R $SUDO_USER:$SUDO_USER "$DEPLOY_DIR"
fi
chmod -R 755 "$DEPLOY_DIR"
chmod 600 "$DEPLOY_DIR/.env" 2>/dev/null || true

# 创建日志目录
mkdir -p "$DEPLOY_DIR/logs"
chmod 755 "$DEPLOY_DIR/logs"
echo -e "${GREEN}✓ 权限设置完成${NC}"
echo ""

# 6. 创建 systemd 服务文件
echo -e "${YELLOW}[6/8] 创建 systemd 服务...${NC}"
cat > /etc/systemd/system/zenava.service << 'SYSTEMD_SERVICE'
[Unit]
Description=Zenava Web Application
After=network.target mysql.service

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/zenava
Environment="NODE_ENV=production"
Environment="PORT=3000"
EnvironmentFile=/var/www/zenava/.env
ExecStart=/usr/bin/tsx /var/www/zenava/server.js
Restart=always
RestartSec=10
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=zenava

[Install]
WantedBy=multi-user.target
SYSTEMD_SERVICE

# 重载 systemd 并启动服务
systemctl daemon-reload
if systemctl start zenava; then
  systemctl enable zenava
  echo -e "${GREEN}✓ 应用已启动并设置开机自启${NC}"
else
  echo -e "${YELLOW}⚠ 服务启动失败，请检查配置${NC}"
  echo -e "${YELLOW}查看日志: sudo journalctl -u zenava -n 50${NC}"
fi
echo ""

# 7. 重载 Nginx（如果存在）
echo -e "${YELLOW}[7/8] 重载 Nginx...${NC}"
if command -v nginx &> /dev/null && [ -f "nginx.conf" ]; then
  cp nginx.conf /etc/nginx/sites-available/zenava 2>/dev/null || true
  if nginx -t 2>/dev/null; then
    systemctl reload nginx
    echo -e "${GREEN}✓ Nginx 已重载${NC}"
  else
    echo -e "${YELLOW}⚠ Nginx 配置测试失败，请手动检查${NC}"
  fi
else
  echo -e "${YELLOW}⚠ Nginx 未安装或配置文件不存在，跳过${NC}"
fi
echo ""

# 8. 验证部署
echo -e "${YELLOW}[8/8] 验证部署...${NC}"
sleep 3
if curl -f http://localhost:3000 > /dev/null 2>&1; then
  echo -e "${GREEN}✓ 应用运行正常${NC}"
else
  echo -e "${RED}✗ 应用可能未正常启动，请检查日志${NC}"
  echo -e "${YELLOW}查看日志: sudo journalctl -u zenava -n 50${NC}"
fi
echo ""

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  部署完成！${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo "部署目录: $DEPLOY_DIR"
echo "备份目录: $BACKUP_DIR"
echo ""
echo "常用命令:"
echo "  查看状态: sudo systemctl status zenava"
echo "  查看日志: sudo journalctl -u zenava -f"
echo "  重启应用: sudo systemctl restart zenava"
echo "  停止应用: sudo systemctl stop zenava"
echo ""
DEPLOY_SCRIPT

chmod +x ${DEPLOY_DIR}/deploy.sh
echo -e "${GREEN}✓ 部署脚本创建完成${NC}"
echo ""

# 9. 创建环境变量示例文件
echo -e "${YELLOW}[8/10] 创建环境变量示例文件...${NC}"

cat > ${DEPLOY_DIR}/.env.example << 'ENV_EXAMPLE'
# Node.js 环境
NODE_ENV=production
PORT=3000
HOST=0.0.0.0

# MySQL 数据库配置
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_DATABASE=ZENAVA_PROD
MYSQL_USER=zenava_user
MYSQL_PASSWORD=your_secure_password_here

# 管理员账号（可选）
ADMIN_EMAIL=admin@zenava.ai
ADMIN_PASSWORD=your_admin_password_here

# 安全配置（可选）
SESSION_SECRET=your_random_session_secret_here
CSRF_SECRET=your_random_csrf_secret_here
ENV_EXAMPLE

echo -e "${GREEN}✓ 环境变量示例文件创建完成${NC}"
echo ""

# 10. 创建 README
echo -e "${YELLOW}[9/10] 创建 README...${NC}"

cat > ${DEPLOY_DIR}/README.md << 'README'
# Zenava 生产环境部署包

## 📦 文件说明

- `dist-node/` - 构建后的应用代码
- `public/` - 静态资源文件
- `server.js` - Node.js 服务器入口文件
- `package.json` - 项目依赖配置
- `nginx.conf` - Nginx 配置示例
- `migrations/` - 数据库迁移文件
- `deploy.sh` - 自动部署脚本
- `.env.example` - 环境变量示例文件

## 🚀 快速部署

### 方法 1: 使用自动部署脚本（推荐）

```bash
# 1. 解压部署包
tar -xzf zenava-production-*.tar.gz

# 2. 进入部署目录
cd deploy-package

# 3. 配置环境变量
cp .env.example .env
nano .env  # 编辑数据库配置等信息

# 4. 运行部署脚本
sudo ./deploy.sh
```

### 方法 2: 手动部署

```bash
# 1. 解压部署包
tar -xzf zenava-production-*.tar.gz

# 2. 复制文件到部署目录
sudo mkdir -p /var/www/zenava
sudo cp -r deploy-package/* /var/www/zenava/

# 3. 配置环境变量
cd /var/www/zenava
sudo cp .env.example .env
sudo nano .env  # 编辑配置

# 4. 安装依赖
sudo npm ci --production

# 5. 设置权限
sudo chown -R www-data:www-data /var/www/zenava
sudo chmod -R 755 /var/www/zenava
sudo chmod 600 /var/www/zenava/.env

# 6. 启动应用（systemd 服务会在部署脚本中自动创建和启动）
sudo systemctl start zenava
sudo systemctl enable zenava
```

## 📋 部署前检查清单

- [ ] MySQL 数据库已创建并配置
- [ ] 数据库迁移文件已导入
- [ ] 环境变量已正确配置
- [ ] Node.js 18+ 已安装
- [ ] systemd 服务已配置（部署脚本会自动创建）
- [ ] Nginx 已安装（可选）
- [ ] 防火墙端口已开放（80, 443, 3000）

## 📖 详细文档

请参考 `PRODUCTION_DEPLOYMENT.md` 获取完整的部署文档。

## 🔧 常用命令

```bash
# 查看应用状态
sudo systemctl status zenava

# 查看日志
sudo journalctl -u zenava -f

# 重启应用
sudo systemctl restart zenava

# 停止应用
sudo systemctl stop zenava

# 启动应用
sudo systemctl start zenava

# 查看 Nginx 日志
sudo tail -f /var/log/nginx/zenava-access.log
sudo tail -f /var/log/nginx/zenava-error.log
```

## 📞 技术支持

如遇到问题，请联系技术支持团队。
README

echo -e "${GREEN}✓ README 创建完成${NC}"
echo ""

# 11. 创建压缩包
echo -e "${YELLOW}[10/10] 创建压缩包...${NC}"
tar -czf ${PACKAGE_NAME} ${DEPLOY_DIR}/
echo -e "${GREEN}✓ 压缩包创建完成${NC}"
echo ""

# 显示打包信息
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  打包完成！${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${GREEN}📦 部署包: ${PACKAGE_NAME}${NC}"
echo -e "${GREEN}📁 部署目录: ${DEPLOY_DIR}/${NC}"
echo ""
echo "文件大小:"
ls -lh ${PACKAGE_NAME} | awk '{print $5}'
echo ""
echo "目录大小:"
du -sh ${DEPLOY_DIR}/ | awk '{print $1}'
echo ""
echo -e "${YELLOW}📋 下一步操作:${NC}"
echo "1. 将 ${PACKAGE_NAME} 上传到服务器"
echo "2. 在服务器上解压: tar -xzf ${PACKAGE_NAME}"
echo "3. 进入目录: cd ${DEPLOY_DIR}"
echo "4. 配置环境变量: cp .env.example .env && nano .env"
echo "5. 运行部署脚本: sudo ./deploy.sh"
echo ""
echo -e "${GREEN}✅ 打包流程完成！${NC}"

