# Zenava WebApp 阿里云部署指南

## 📋 目录
1. [部署前准备](#部署前准备)
2. [阿里云服务器配置](#阿里云服务器配置)
3. [环境搭建](#环境搭建)
4. [源码部署](#源码部署)
5. [Cloudflare Pages部署（推荐）](#cloudflare-pages部署推荐)
6. [自建服务器部署（备选）](#自建服务器部署备选)
7. [域名配置](#域名配置)
8. [故障排查](#故障排查)
9. [维护指南](#维护指南)

---

## 部署前准备

### 1.1 必需资源清单
```
✅ 阿里云ECS服务器（推荐配置：2核4G以上）
✅ 域名（已备案）
✅ SSL证书（可使用免费的Let's Encrypt）
✅ Cloudflare账号（用于Pages部署）
✅ 源码包：webapp-backup-*.tar.gz
```

### 1.2 技术栈说明
```
- 框架：Hono + TypeScript
- 运行时：Cloudflare Workers/Pages
- 数据库：Cloudflare D1 (SQLite)
- 构建工具：Vite + Wrangler
- 进程管理：PM2
- Node版本：18.x或20.x
```

### 1.3 项目结构
```
webapp/
├── src/                    # 源代码
│   ├── index.tsx          # 主入口
│   ├── pages/             # 页面组件
│   ├── components/        # 通用组件
│   └── routes/            # API路由
├── public/                # 静态资源
│   └── static/           # CSS/JS文件
├── migrations/            # 数据库迁移文件
├── dist/                  # 构建输出
├── wrangler.jsonc         # Cloudflare配置
├── package.json           # 依赖配置
├── ecosystem.config.cjs   # PM2配置
└── .env.example          # 环境变量示例
```

---

## 阿里云服务器配置

### 2.1 创建ECS实例
```bash
# 推荐配置
- 地域：选择离目标用户最近的地域
- 实例类型：ecs.g6.large（2核4G）
- 镜像：Ubuntu 22.04 LTS 或 CentOS 8
- 网络：专有网络VPC
- 公网IP：分配公网IPv4地址
- 带宽：5Mbps起步
```

### 2.2 安全组配置
```bash
# 入方向规则
- 80/TCP    # HTTP
- 443/TCP   # HTTPS
- 22/TCP    # SSH
- 3000/TCP  # 开发服务器（可选）
```

### 2.3 SSH连接配置
```bash
# 本地生成SSH密钥（如果没有）
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"

# 连接到服务器
ssh root@<服务器公网IP>

# 或使用密钥
ssh -i ~/.ssh/id_rsa root@<服务器公网IP>
```

---

## 环境搭建

### 3.1 基础环境安装
```bash
# 更新系统
sudo apt update && sudo apt upgrade -y  # Ubuntu
# 或
sudo yum update -y  # CentOS

# 安装必要工具
sudo apt install -y curl git wget vim build-essential  # Ubuntu
# 或
sudo yum install -y curl git wget vim gcc-c++ make  # CentOS
```

### 3.2 安装Node.js 20.x
```bash
# 使用NodeSource仓库安装Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -  # Ubuntu
sudo apt-get install -y nodejs

# 或使用nvm（推荐）
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 20
nvm use 20
nvm alias default 20

# 验证安装
node -v  # 应显示 v20.x.x
npm -v   # 应显示 10.x.x
```

### 3.3 安装PM2
```bash
# 全局安装PM2
npm install -g pm2

# 配置PM2开机自启
pm2 startup
# 按提示执行生成的命令

# 安装PM2日志管理插件
pm2 install pm2-logrotate
```

### 3.4 安装Nginx（用于反向代理）
```bash
# Ubuntu
sudo apt install -y nginx

# CentOS
sudo yum install -y nginx

# 启动Nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

---

## 源码部署

### 4.1 上传并解压源码包
```bash
# 方法1：使用scp上传
# 在本地执行
scp webapp-backup-*.tar.gz root@<服务器IP>:/root/

# 方法2：使用wget下载（如果有下载链接）
wget <下载链接>

# 在服务器上解压
cd /root
tar -xzf webapp-backup-*.tar.gz

# 源码将解压到 /home/user/webapp/
```

### 4.2 安装项目依赖
```bash
# 进入项目目录
cd /home/user/webapp

# 安装依赖
npm install

# 如果遇到权限问题
npm install --unsafe-perm

# 安装wrangler CLI
npm install -g wrangler
```

### 4.3 配置环境变量
```bash
# 复制环境变量示例文件
cp .env.example .env

# 编辑环境变量
vim .env

# 必需的环境变量
NODE_ENV=production
PORT=3000
```

---

## Cloudflare Pages部署（推荐）

### 5.1 配置Cloudflare API Token
```bash
# 1. 登录 https://dash.cloudflare.com/profile/api-tokens
# 2. 创建Token，选择 "Edit Cloudflare Workers" 模板
# 3. 保存生成的Token

# 配置Token
export CLOUDFLARE_API_TOKEN="your_api_token_here"

# 或永久保存
echo 'export CLOUDFLARE_API_TOKEN="your_api_token_here"' >> ~/.bashrc
source ~/.bashrc
```

### 5.2 创建Cloudflare D1数据库
```bash
# 创建生产数据库
npx wrangler d1 create webapp-production

# 复制输出的database_id到wrangler.jsonc
vim wrangler.jsonc
# 更新 database_id 字段
```

### 5.3 应用数据库迁移
```bash
# 应用迁移到生产数据库
npx wrangler d1 migrations apply webapp-production

# 如果需要初始化数据
npx wrangler d1 execute webapp-production --file=./seed.sql
```

### 5.4 部署到Cloudflare Pages
```bash
# 构建项目
npm run build

# 创建Pages项目（首次）
npx wrangler pages project create webapp \
  --production-branch main \
  --compatibility-date 2024-01-01

# 部署
npx wrangler pages deploy dist --project-name webapp

# 部署成功后将获得URL
# https://webapp.pages.dev
# https://<random-id>.webapp.pages.dev
```

### 5.5 配置环境变量和密钥
```bash
# 添加API密钥
npx wrangler pages secret put API_KEY --project-name webapp
# 输入密钥值

# 添加其他环境变量
npx wrangler pages secret put DATABASE_URL --project-name webapp
```

---

## 自建服务器部署（备选）

### 6.1 配置PM2启动脚本
```bash
# 编辑PM2配置
vim /home/user/webapp/ecosystem.config.cjs

# 确保配置如下：
module.exports = {
  apps: [{
    name: 'webapp',
    script: 'npx',
    args: 'wrangler pages dev dist --ip 0.0.0.0 --port 3000',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    instances: 1,
    exec_mode: 'fork',
    autorestart: true,
    watch: false,
    max_memory_restart: '1G'
  }]
}
```

### 6.2 构建并启动服务
```bash
# 构建项目
cd /home/user/webapp
npm run build

# 使用PM2启动
pm2 start ecosystem.config.cjs

# 保存PM2配置
pm2 save

# 查看状态
pm2 list
pm2 logs webapp --lines 50
```

### 6.3 配置Nginx反向代理
```bash
# 创建站点配置
sudo vim /etc/nginx/sites-available/webapp

# 配置内容：
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    
    # 强制HTTPS（可选）
    # return 301 https://$server_name$request_uri;
    
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # 超时设置
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
    
    # 静态文件缓存
    location /static/ {
        alias /home/user/webapp/public/static/;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
    
    # Gzip压缩
    gzip on;
    gzip_types text/css application/javascript application/json;
}

# 启用站点
sudo ln -s /etc/nginx/sites-available/webapp /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## 域名配置

### 7.1 阿里云DNS解析
```bash
# 在阿里云控制台添加DNS记录
记录类型: A
主机记录: @
记录值: <服务器公网IP>
TTL: 10分钟

记录类型: A
主机记录: www
记录值: <服务器公网IP>
TTL: 10分钟
```

### 7.2 配置SSL证书（Let's Encrypt）
```bash
# 安装Certbot
sudo apt install -y certbot python3-certbot-nginx  # Ubuntu

# 获取证书
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# 自动续期
sudo certbot renew --dry-run

# 添加定时任务
crontab -e
# 添加：
0 2 * * * /usr/bin/certbot renew --quiet
```

### 7.3 Cloudflare CDN配置（可选）
```bash
# 1. 将域名DNS服务器改为Cloudflare
# 2. 在Cloudflare添加DNS记录
# 3. 配置SSL/TLS为"完全（严格）"
# 4. 启用自动HTTPS重写
# 5. 配置页面规则缓存静态资源
```

---

## 故障排查

### 8.1 常见问题及解决方案

#### 服务无法启动
```bash
# 检查端口占用
sudo lsof -i:3000
sudo kill -9 <PID>

# 检查PM2日志
pm2 logs webapp --err --lines 100

# 重新构建
rm -rf node_modules dist
npm install
npm run build
```

#### 数据库连接失败
```bash
# 检查D1配置
npx wrangler d1 list
npx wrangler d1 info webapp-production

# 重新应用迁移
npx wrangler d1 migrations apply webapp-production --local
```

#### Nginx 502错误
```bash
# 检查后端服务
curl http://127.0.0.1:3000

# 检查Nginx错误日志
sudo tail -f /var/log/nginx/error.log

# 重启服务
pm2 restart webapp
sudo systemctl restart nginx
```

### 8.2 性能优化
```bash
# PM2集群模式（多核服务器）
pm2 start ecosystem.config.cjs -i max

# 启用Node.js生产模式
export NODE_ENV=production

# 配置系统限制
ulimit -n 65535  # 增加文件描述符限制
```

### 8.3 监控设置
```bash
# PM2监控
pm2 install pm2-server-monit
pm2 web  # 启动Web监控界面

# 系统监控
htop  # CPU和内存监控
iotop  # IO监控
```

---

## 维护指南

### 9.1 备份策略
```bash
#!/bin/bash
# 创建备份脚本
cat > /root/backup.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/root/backups"
DATE=$(date +%Y%m%d_%H%M%S)
PROJECT_DIR="/home/user/webapp"

# 创建备份目录
mkdir -p $BACKUP_DIR

# 备份源码和数据库
cd $PROJECT_DIR
tar -czf $BACKUP_DIR/webapp_$DATE.tar.gz \
  --exclude=node_modules \
  --exclude=.wrangler \
  --exclude=dist \
  .

# 保留最近7天的备份
find $BACKUP_DIR -name "webapp_*.tar.gz" -mtime +7 -delete

echo "Backup completed: webapp_$DATE.tar.gz"
EOF

chmod +x /root/backup.sh

# 添加定时任务
crontab -e
# 每天凌晨2点备份
0 2 * * * /root/backup.sh
```

### 9.2 更新部署
```bash
# 拉取最新代码（如果使用Git）
cd /home/user/webapp
git pull origin main

# 或上传新的tar包并解压
tar -xzf webapp-new.tar.gz

# 安装依赖并构建
npm install
npm run build

# 重启服务
pm2 restart webapp

# 如果是Cloudflare Pages
npx wrangler pages deploy dist --project-name webapp
```

### 9.3 日志管理
```bash
# PM2日志轮转配置
pm2 set pm2-logrotate:max_size 100M
pm2 set pm2-logrotate:retain 7
pm2 set pm2-logrotate:compress true

# 查看日志
pm2 logs webapp --lines 100
tail -f /home/user/.pm2/logs/webapp-out.log
```

### 9.4 安全加固
```bash
# 1. 修改SSH端口
vim /etc/ssh/sshd_config
# Port 22 改为 Port 2222
systemctl restart sshd

# 2. 配置防火墙
ufw enable
ufw allow 2222/tcp
ufw allow 80/tcp
ufw allow 443/tcp

# 3. 安装fail2ban
apt install fail2ban
systemctl enable fail2ban

# 4. 定期更新
apt update && apt upgrade -y
npm audit fix
```

---

## 快速部署脚本

创建一键部署脚本 `/root/deploy.sh`：
```bash
#!/bin/bash

echo "=== Zenava WebApp 快速部署脚本 ==="

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'

# 检查参数
if [ $# -eq 0 ]; then
    echo -e "${RED}请提供tar包路径作为参数${NC}"
    echo "用法: ./deploy.sh webapp-backup.tar.gz"
    exit 1
fi

TAR_FILE=$1

# 解压源码
echo "1. 解压源码包..."
tar -xzf $TAR_FILE
cd /home/user/webapp

# 安装依赖
echo "2. 安装项目依赖..."
npm install

# 构建项目
echo "3. 构建项目..."
npm run build

# 启动服务
echo "4. 启动服务..."
pm2 delete webapp 2>/dev/null
pm2 start ecosystem.config.cjs

# 配置Nginx
echo "5. 配置Nginx..."
# ... Nginx配置代码 ...

echo -e "${GREEN}部署完成！${NC}"
echo "访问地址: http://your-domain.com"
pm2 list
```

---

## 联系支持

如遇到问题，请准备以下信息：
1. 错误日志：`pm2 logs webapp --err --lines 200`
2. 系统信息：`uname -a && node -v && npm -v`
3. 配置文件：`wrangler.jsonc` 和 `ecosystem.config.cjs`

---

## 附录：环境变量说明

```bash
# .env 文件模板
NODE_ENV=production              # 环境模式
PORT=3000                        # 服务端口
CLOUDFLARE_API_TOKEN=xxx        # Cloudflare API令牌
DATABASE_URL=xxx                # 数据库连接字符串（如使用外部数据库）
API_KEY=xxx                     # API密钥
JWT_SECRET=xxx                  # JWT密钥
```

---

最后更新：2025-01-03
版本：1.0.0