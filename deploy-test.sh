#!/bin/bash
# 测试环境部署脚本
# 用于云效流水线的"主机部署"步骤

set -e

# 配置变量（可在云效中配置为环境变量）
DEPLOY_DIR="${DEPLOY_DIR:-/var/www/zenava-test}"
APP_PORT="${APP_PORT:-3000}"
NODE_ENV="${NODE_ENV:-test}"

echo "🚀 开始部署到测试环境..."
echo "📁 部署目录: $DEPLOY_DIR"
echo "🔌 端口: $APP_PORT"
echo "🌍 环境: $NODE_ENV"

# 1. 检查必要文件
if [ ! -d "dist" ]; then
  echo "❌ 错误: dist 目录不存在，请先运行构建"
  exit 1
fi

# 2. 备份旧版本
if [ -d "$DEPLOY_DIR" ]; then
  BACKUP_DIR="${DEPLOY_DIR}-backup-$(date +%Y%m%d-%H%M%S)"
  echo "📦 备份旧版本到 $BACKUP_DIR..."
  sudo mkdir -p "$(dirname $BACKUP_DIR)"
  sudo mv "$DEPLOY_DIR" "$BACKUP_DIR" || true
fi

# 3. 创建部署目录
echo "📁 创建部署目录..."
sudo mkdir -p "$DEPLOY_DIR"
sudo mkdir -p "$DEPLOY_DIR/data"
sudo mkdir -p "$DEPLOY_DIR/logs"

# 4. 复制文件
echo "📋 复制文件..."
sudo cp -r dist "$DEPLOY_DIR/"
sudo cp package.json "$DEPLOY_DIR/"
sudo cp package-lock.json "$DEPLOY_DIR/" 2>/dev/null || true
sudo cp ecosystem.config.cjs "$DEPLOY_DIR/" 2>/dev/null || true

# 5. 安装依赖
echo "📥 安装依赖..."
cd "$DEPLOY_DIR"
sudo npm ci --production

# 6. 设置权限
echo "🔐 设置权限..."
sudo chown -R www-data:www-data "$DEPLOY_DIR" 2>/dev/null || sudo chown -R $USER:$USER "$DEPLOY_DIR"
sudo chmod -R 755 "$DEPLOY_DIR"

# 7. 检查并安装 PM2
if ! command -v pm2 &> /dev/null; then
  echo "📦 安装 PM2..."
  sudo npm install -g pm2
fi

# 8. 启动/重启应用
echo "🔄 启动应用..."
cd "$DEPLOY_DIR"

# 停止旧进程
pm2 stop zenava-webapp-test 2>/dev/null || true
pm2 delete zenava-webapp-test 2>/dev/null || true

# 启动新进程
if [ -f "ecosystem.config.cjs" ]; then
  # 修改端口（如果是测试环境）
  if [ "$NODE_ENV" = "test" ]; then
    pm2 start ecosystem.config.cjs --update-env --env test || \
    pm2 start npx --name zenava-webapp-test -- wrangler pages dev dist --ip 0.0.0.0 --port $APP_PORT
  else
    pm2 start ecosystem.config.cjs
  fi
else
  pm2 start npx --name zenava-webapp-test -- wrangler pages dev dist --ip 0.0.0.0 --port $APP_PORT
fi

# 保存 PM2 配置
pm2 save

# 9. 健康检查
echo "🏥 健康检查..."
sleep 3
if curl -f http://localhost:$APP_PORT > /dev/null 2>&1; then
  echo "✅ 应用启动成功！"
else
  echo "⚠️  应用可能未正常启动，请检查日志: pm2 logs zenava-webapp-test"
fi

# 10. 显示状态
echo ""
echo "✅ 部署完成！"
echo ""
echo "📋 部署信息:"
echo "  - 目录: $DEPLOY_DIR"
echo "  - 端口: $APP_PORT"
echo "  - 环境: $NODE_ENV"
echo ""
echo "📝 常用命令:"
echo "  - 查看状态: pm2 status"
echo "  - 查看日志: pm2 logs zenava-webapp-test"
echo "  - 重启应用: pm2 restart zenava-webapp-test"
echo "  - 停止应用: pm2 stop zenava-webapp-test"

