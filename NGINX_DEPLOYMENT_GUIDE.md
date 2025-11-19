# Nginx 部署指南

本指南将帮助您将 Zenava Webapp 部署到 Nginx 服务器上。

## 📋 前置要求

- **服务器**: Ubuntu 20.04+ / CentOS 7+ / Debian 10+
- **Node.js**: v18+ 
- **Nginx**: 1.18+
- **PM2**: 用于进程管理（可选但推荐）
- **数据库**: SQLite（使用 better-sqlite3）

## 🚀 快速部署

### 步骤 1: 准备服务器

```bash
# 更新系统
sudo apt update && sudo apt upgrade -y

# 安装 Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# 安装 Nginx
sudo apt install -y nginx

# 安装 PM2（进程管理）
sudo npm install -g pm2
```

### 步骤 2: 上传项目文件

```bash
# 在服务器上创建项目目录
sudo mkdir -p /var/www/zenava
sudo chown -R $USER:$USER /var/www/zenava

# 上传项目文件（使用 scp 或 git）
# scp -r . user@your-server:/var/www/zenava
# 或
# git clone your-repo /var/www/zenava
```

### 步骤 3: 安装依赖

```bash
cd /var/www/zenava

# 安装 Node.js 运行时依赖
npm install @hono/node-server better-sqlite3 --save

# 安装所有依赖
npm install
```

### 步骤 4: 配置数据库

```bash
# 创建数据目录
mkdir -p data

# 初始化数据库（如果需要）
# 运行迁移脚本或导入 SQL 文件
```

### 步骤 5: 配置 Nginx

```bash
# 复制 Nginx 配置文件
sudo cp nginx.conf /etc/nginx/sites-available/zenava

# 编辑配置文件，设置您的域名
sudo nano /etc/nginx/sites-available/zenava

# 启用站点
sudo ln -s /etc/nginx/sites-available/zenava /etc/nginx/sites-enabled/

# 测试配置
sudo nginx -t

# 重载 Nginx
sudo systemctl reload nginx
```

### 步骤 6: 启动应用

```bash
cd /var/www/zenava

# 使用 PM2 启动（推荐）
pm2 start server.js --name zenava-webapp

# 保存 PM2 配置
pm2 save

# 设置开机自启
pm2 startup
```

### 步骤 7: 验证部署

```bash
# 检查 PM2 状态
pm2 status

# 查看日志
pm2 logs zenava-webapp

# 检查 Nginx 状态
sudo systemctl status nginx

# 测试网站
curl http://localhost
```

## ⚙️ 配置说明

### Nginx 配置 (`nginx.conf`)

主要配置项：

1. **域名设置**: 修改 `server_name` 为您的域名
2. **SSL 证书**: 如需 HTTPS，取消注释 SSL 相关配置
3. **静态文件**: 静态资源由 Nginx 直接提供，提高性能
4. **反向代理**: 动态请求转发到 Node.js 应用（端口 3000）

### 环境变量

创建 `.env` 文件：

```bash
# 服务器端口
PORT=3000
HOST=127.0.0.1

# 数据库路径
DB_PATH=/var/www/zenava/data/zenava.db

# CORS 配置
CORS_ORIGIN=https://your-domain.com
```

### PM2 配置

创建 `ecosystem.config.cjs`:

```javascript
module.exports = {
  apps: [{
    name: 'zenava-webapp',
    script: 'server.js',
    cwd: '/var/www/zenava',
    instances: 2,
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: './logs/pm2-error.log',
    out_file: './logs/pm2-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
  }]
}
```

## 🔧 常见问题

### 1. 端口被占用

```bash
# 检查端口占用
sudo lsof -i :3000

# 或修改 server.js 中的端口
```

### 2. 权限问题

```bash
# 设置正确的文件权限
sudo chown -R www-data:www-data /var/www/zenava
sudo chmod -R 755 /var/www/zenava
```

### 3. 数据库连接失败

```bash
# 检查数据库文件权限
ls -la data/zenava.db

# 确保应用有读写权限
sudo chmod 664 data/zenava.db
```

### 4. 静态文件 404

```bash
# 检查 Nginx 配置中的静态文件路径
# 确保 dist 目录存在且包含静态文件
ls -la /var/www/zenava/dist/static/
```

## 📝 维护命令

```bash
# 查看应用日志
pm2 logs zenava-webapp

# 重启应用
pm2 restart zenava-webapp

# 停止应用
pm2 stop zenava-webapp

# 查看 Nginx 日志
sudo tail -f /var/log/nginx/zenava-access.log
sudo tail -f /var/log/nginx/zenava-error.log

# 重载 Nginx 配置
sudo nginx -t && sudo systemctl reload nginx
```

## 🔒 SSL/HTTPS 配置

### 使用 Let's Encrypt

```bash
# 安装 Certbot
sudo apt install certbot python3-certbot-nginx

# 获取证书
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# 自动续期
sudo certbot renew --dry-run
```

### 手动配置 SSL

在 `nginx.conf` 中取消注释并配置：

```nginx
listen 443 ssl http2;
ssl_certificate /path/to/certificate.crt;
ssl_certificate_key /path/to/private.key;
```

## 🚀 性能优化

1. **启用 Gzip**: 已在配置中启用
2. **静态文件缓存**: 已配置 30 天缓存
3. **PM2 集群模式**: 使用多进程提高性能
4. **Nginx 缓存**: 可添加 proxy_cache 配置

## 📞 技术支持

如有问题，请检查：
- PM2 日志: `pm2 logs zenava-webapp`
- Nginx 日志: `/var/log/nginx/zenava-error.log`
- 应用日志: `/var/www/zenava/logs/`

