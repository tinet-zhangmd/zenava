#!/bin/bash
# Nginx 部署脚本
# 使用方法: ./deploy-nginx.sh

set -e

echo "🚀 开始部署 Zenava 到 Nginx..."

# 1. 检查 Node.js 版本
echo "📦 检查 Node.js 版本..."
node --version || { echo "❌ 请先安装 Node.js"; exit 1; }

# 2. 安装依赖
echo "📦 安装依赖..."
npm install

# 3. 安装 Node.js 特定依赖
echo "📦 安装 Node.js 运行时依赖..."
npm install @hono/node-server better-sqlite3 --save

# 4. 创建数据目录
echo "📦 创建数据目录..."
mkdir -p data
mkdir -p logs

# 5. 构建项目（如果需要）
echo "🔨 构建项目..."
npm run build || echo "⚠️  构建失败，但继续部署..."

# 6. 复制文件到部署目录
DEPLOY_DIR="/var/www/zenava"
echo "📁 复制文件到 ${DEPLOY_DIR}..."

# 创建部署目录
sudo mkdir -p ${DEPLOY_DIR}
sudo mkdir -p ${DEPLOY_DIR}/data
sudo mkdir -p ${DEPLOY_DIR}/logs

# 复制文件
sudo cp -r dist ${DEPLOY_DIR}/
sudo cp -r src ${DEPLOY_DIR}/
sudo cp server.js ${DEPLOY_DIR}/
sudo cp package*.json ${DEPLOY_DIR}/
sudo cp -r node_modules ${DEPLOY_DIR}/ 2>/dev/null || echo "⚠️  跳过 node_modules（将在服务器上安装）"

# 设置权限
sudo chown -R www-data:www-data ${DEPLOY_DIR}
sudo chmod -R 755 ${DEPLOY_DIR}

# 7. 安装 PM2（如果未安装）
echo "📦 检查 PM2..."
if ! command -v pm2 &> /dev/null; then
    echo "📦 安装 PM2..."
    sudo npm install -g pm2
fi

# 8. 启动应用
echo "🚀 启动应用..."
cd ${DEPLOY_DIR}
sudo -u www-data npm install --production
sudo -u www-data pm2 start server.js --name zenava-webapp || sudo -u www-data pm2 restart zenava-webapp

# 9. 保存 PM2 配置
sudo -u www-data pm2 save
sudo -u www-data pm2 startup

# 10. 配置 Nginx
echo "⚙️  配置 Nginx..."
NGINX_CONF="/etc/nginx/sites-available/zenava"
if [ -f "nginx.conf" ]; then
    sudo cp nginx.conf ${NGINX_CONF}
    sudo ln -sf ${NGINX_CONF} /etc/nginx/sites-enabled/zenava
    sudo nginx -t && sudo systemctl reload nginx || echo "⚠️  Nginx 配置测试失败，请手动检查"
else
    echo "⚠️  未找到 nginx.conf，请手动配置 Nginx"
fi

echo "✅ 部署完成！"
echo ""
echo "📋 后续步骤："
echo "1. 编辑 ${NGINX_CONF} 并设置正确的域名"
echo "2. 运行: sudo nginx -t"
echo "3. 运行: sudo systemctl reload nginx"
echo "4. 检查应用状态: pm2 status"
echo "5. 查看日志: pm2 logs zenava-webapp"

