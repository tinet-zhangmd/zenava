#!/bin/bash
# 打包脚本 - 用于云效流水线构建
# 生成可部署的压缩包

set -e

echo "📦 开始打包 Zenava Webapp..."

# 1. 清理旧的构建
echo "🧹 清理旧构建..."
rm -rf dist
rm -rf package.tar.gz
rm -rf deploy-package

# 2. 安装依赖
echo "📥 安装依赖..."
npm ci --production=false

# 3. 构建项目
echo "🔨 构建项目..."
npm run build

# 4. 创建部署包目录
echo "📁 创建部署包..."
mkdir -p deploy-package

# 5. 复制必要文件
echo "📋 复制文件..."

# 核心文件
cp -r dist deploy-package/
cp package.json deploy-package/
cp package-lock.json deploy-package/ 2>/dev/null || true

# 配置文件
cp ecosystem.config.cjs deploy-package/ 2>/dev/null || true
cp nginx.conf deploy-package/ 2>/dev/null || true
cp server.js deploy-package/ 2>/dev/null || true

# 数据库迁移文件（如果需要）
if [ -d "migrations" ]; then
  cp -r migrations deploy-package/
fi

# 6. 创建部署脚本
cat > deploy-package/deploy.sh << 'DEPLOY_SCRIPT'
#!/bin/bash
# 部署脚本 - 在目标服务器上执行

set -e

DEPLOY_DIR="/var/www/zenava"
BACKUP_DIR="/var/www/zenava-backup-$(date +%Y%m%d-%H%M%S)"

echo "🚀 开始部署..."

# 1. 备份旧版本
if [ -d "$DEPLOY_DIR" ]; then
  echo "📦 备份旧版本到 $BACKUP_DIR..."
  mkdir -p "$BACKUP_DIR"
  cp -r "$DEPLOY_DIR/dist" "$BACKUP_DIR/" 2>/dev/null || true
  cp "$DEPLOY_DIR/package.json" "$BACKUP_DIR/" 2>/dev/null || true
fi

# 2. 创建部署目录
echo "📁 创建部署目录..."
sudo mkdir -p "$DEPLOY_DIR"
sudo mkdir -p "$DEPLOY_DIR/data"
sudo mkdir -p "$DEPLOY_DIR/logs"

# 3. 复制文件
echo "📋 复制文件..."
sudo cp -r dist "$DEPLOY_DIR/"
sudo cp package.json "$DEPLOY_DIR/"
sudo cp package-lock.json "$DEPLOY_DIR/" 2>/dev/null || true
sudo cp ecosystem.config.cjs "$DEPLOY_DIR/" 2>/dev/null || true

# 4. 安装生产依赖
echo "📥 安装生产依赖..."
cd "$DEPLOY_DIR"
sudo npm ci --production

# 5. 设置权限
echo "🔐 设置权限..."
sudo chown -R www-data:www-data "$DEPLOY_DIR" 2>/dev/null || sudo chown -R $USER:$USER "$DEPLOY_DIR"
sudo chmod -R 755 "$DEPLOY_DIR"

# 6. 重启应用
echo "🔄 重启应用..."
if command -v pm2 &> /dev/null; then
  cd "$DEPLOY_DIR"
  sudo -u www-data pm2 restart zenava-webapp || sudo -u www-data pm2 start ecosystem.config.cjs || echo "⚠️  PM2 启动失败，请手动启动"
else
  echo "⚠️  PM2 未安装，请手动启动应用"
fi

# 7. 重载 Nginx（如果需要）
if command -v nginx &> /dev/null && [ -f "nginx.conf" ]; then
  echo "⚙️  重载 Nginx..."
  sudo cp nginx.conf /etc/nginx/sites-available/zenava 2>/dev/null || true
  sudo nginx -t && sudo systemctl reload nginx || echo "⚠️  Nginx 配置测试失败"
fi

echo "✅ 部署完成！"
echo "📋 部署目录: $DEPLOY_DIR"
echo "📦 备份目录: $BACKUP_DIR"
DEPLOY_SCRIPT

chmod +x deploy-package/deploy.sh

# 7. 创建启动脚本（使用 Wrangler）
cat > deploy-package/start.sh << 'START_SCRIPT'
#!/bin/bash
# 启动脚本 - 使用 Wrangler 运行

cd /var/www/zenava

# 使用 PM2 启动
if command -v pm2 &> /dev/null; then
  pm2 start ecosystem.config.cjs || pm2 restart zenava-webapp
  pm2 save
else
  echo "⚠️  PM2 未安装，使用 npx 直接启动..."
  npx wrangler pages dev dist --ip 0.0.0.0 --port 3000
fi
START_SCRIPT

chmod +x deploy-package/start.sh

# 8. 创建 README
cat > deploy-package/README.md << 'README'
# Zenava Webapp 部署包

## 文件说明

- `dist/` - 构建后的静态文件和 Worker 代码
- `package.json` - 项目依赖配置
- `ecosystem.config.cjs` - PM2 配置文件
- `deploy.sh` - 自动部署脚本
- `start.sh` - 应用启动脚本
- `nginx.conf` - Nginx 配置示例

## 部署步骤

### 方法 1: 使用自动部署脚本

```bash
chmod +x deploy.sh
sudo ./deploy.sh
```

### 方法 2: 手动部署

1. 解压文件到 `/var/www/zenava`
2. 安装依赖: `npm ci --production`
3. 使用 PM2 启动: `pm2 start ecosystem.config.cjs`

## 环境要求

- Node.js 18+
- PM2 (推荐)
- Nginx (可选，用于反向代理)

## 端口配置

默认端口: 3000

修改 `ecosystem.config.cjs` 中的 `PORT` 环境变量来更改端口。
README

# 9. 创建压缩包
echo "📦 创建压缩包..."
tar -czf package.tar.gz deploy-package/

# 10. 显示打包信息
echo ""
echo "✅ 打包完成！"
echo "📦 部署包: package.tar.gz"
echo "📁 部署目录: deploy-package/"
echo ""
echo "📋 文件列表:"
ls -lh package.tar.gz
du -sh deploy-package/

echo ""
echo "🚀 下一步:"
echo "1. 将 package.tar.gz 上传到服务器"
echo "2. 解压: tar -xzf package.tar.gz"
echo "3. 运行部署: cd deploy-package && sudo ./deploy.sh"

