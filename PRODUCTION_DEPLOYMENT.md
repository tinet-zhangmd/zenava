# Zenava 生产环境部署文档

## 📋 目录

1. [系统要求](#系统要求)
2. [环境准备](#环境准备)
3. [数据库配置](#数据库配置)
4. [项目打包](#项目打包)
5. [部署步骤](#部署步骤)
6. [Nginx 配置](#nginx-配置)
7. [进程管理](#进程管理)
8. [环境变量配置](#环境变量配置)
9. [验证部署](#验证部署)
10. [故障排查](#故障排查)
11. [回滚操作](#回滚操作)

---

## 🖥️ 系统要求

### 最低配置
- **操作系统**: Linux (CentOS 7+, Ubuntu 18.04+, Debian 10+)
- **Node.js**: 18.x 或更高版本
- **MySQL**: 5.7+ 或 8.0+
- **内存**: 2GB RAM（推荐 4GB+）
- **磁盘空间**: 10GB+（推荐 20GB+）
- **CPU**: 2 核心（推荐 4 核心+）

### 必需软件
- Node.js 18+
- npm 或 yarn
- MySQL 5.7+ 或 8.0+

### 推荐软件（可选）
- Nginx（反向代理，推荐用于生产环境）
- systemd（Linux 系统自带，用于进程管理）

---

## 🔧 环境准备

### 1. 安装 Node.js

```bash
# CentOS/RHEL
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs

# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 验证安装
node --version  # 应显示 v18.x.x 或更高
npm --version   # 应显示 9.x.x 或更高
```

### 2. systemd（系统自带）

systemd 是 Linux 系统的服务管理器，无需额外安装。部署脚本会自动创建 systemd 服务文件。

**验证 systemd：**
```bash
systemctl --version
```

### 3. 安装 MySQL

```bash
# CentOS/RHEL
sudo yum install -y mysql-server
sudo systemctl start mysqld
sudo systemctl enable mysqld

# Ubuntu/Debian
sudo apt-get update
sudo apt-get install -y mysql-server
sudo systemctl start mysql
sudo systemctl enable mysql

# 验证安装
mysql --version
```

### 4. 安装 Nginx（可选，推荐）

```bash
# CentOS/RHEL
sudo yum install -y nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Ubuntu/Debian
sudo apt-get install -y nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# 验证安装
nginx -v
```

---

## 🗄️ 数据库配置

### 1. 创建数据库

```bash
# 登录 MySQL
mysql -u root -p

# 创建数据库
CREATE DATABASE IF NOT EXISTS ZENAVA_PROD CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# 创建专用用户（推荐）
CREATE USER 'zenava_user'@'localhost' IDENTIFIED BY 'your_secure_password_here';
GRANT ALL PRIVILEGES ON ZENAVA_PROD.* TO 'zenava_user'@'localhost';
FLUSH PRIVILEGES;

# 退出
EXIT;
```

### 2. 导入数据库结构

```bash
# 进入项目目录
cd /path/to/zenava

# 导入所有迁移文件
for file in migrations/*.sql; do
  echo "导入: $file"
  mysql -u zenava_user -p ZENAVA_PROD < "$file"
done

# 或使用脚本导入
mysql -u zenava_user -p ZENAVA_PROD < migrations/001_create_resource_center_tables.sql
mysql -u zenava_user -p ZENAVA_PROD < migrations/0023_add_multilingual_links_to_banners.sql
# ... 导入其他迁移文件
```

### 3. 验证数据库

```bash
mysql -u zenava_user -p ZENAVA_PROD -e "SHOW TABLES;"
```

应该看到以下表：
- `resource_categories`
- `resource_contents`
- `resource_banners`
- `category_banners`
- `admin_users`
- 其他业务表...

---

## 📦 项目打包

### 方式 1: 使用打包脚本（推荐）

```bash
# 在开发机器上执行
cd /path/to/zenava
chmod +x build-production.sh
./build-production.sh
```

打包完成后会生成：
- `zenava-production.tar.gz` - 生产环境部署包

### 方式 2: 手动打包

```bash
# 1. 清理旧构建
rm -rf dist-node node_modules/.cache

# 2. 安装依赖（仅生产依赖）
npm ci --production=false

# 3. 构建项目
npm run build

# 4. 创建部署目录
mkdir -p deploy-package
cp -r dist-node deploy-package/
cp -r public deploy-package/
cp package.json deploy-package/
cp server.js deploy-package/
cp -r migrations deploy-package/ 2>/dev/null || true

# 5. 创建压缩包
tar -czf zenava-production.tar.gz deploy-package/
```

---

## 🚀 部署步骤

### 1. 上传部署包到服务器

```bash
# 使用 SCP 上传
scp zenava-production.tar.gz user@your-server:/tmp/

# 或使用 SFTP、FTP 等工具上传
```

### 2. 解压部署包

```bash
# SSH 登录服务器
ssh user@your-server

# 创建部署目录
sudo mkdir -p /var/www/zenava
cd /var/www/zenava

# 解压部署包
sudo tar -xzf /tmp/zenava-production.tar.gz -C /var/www/zenava --strip-components=1
```

### 3. 安装生产依赖

```bash
cd /var/www/zenava
sudo npm ci --production
```

### 4. 配置环境变量

```bash
# 创建 .env 文件
sudo nano /var/www/zenava/.env
```

添加以下内容：

```env
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

# 管理员账号（可选，用于首次登录）
ADMIN_EMAIL=admin@zenava.ai
ADMIN_PASSWORD=your_admin_password_here

# 安全配置（可选）
SESSION_SECRET=your_random_session_secret_here
CSRF_SECRET=your_random_csrf_secret_here
```

**⚠️ 重要安全提示：**
- `.env` 文件包含敏感信息，不要提交到 Git
- 使用强密码（至少 16 位，包含大小写字母、数字、特殊字符）
- 定期更换密码

### 5. 设置文件权限

```bash
# 设置目录所有者（根据实际情况调整用户）
sudo chown -R www-data:www-data /var/www/zenava
# 或
sudo chown -R node:node /var/www/zenava

# 设置目录权限
sudo chmod -R 755 /var/www/zenava
sudo chmod 600 /var/www/zenava/.env  # .env 文件仅所有者可读写
```

### 6. 创建日志目录

```bash
sudo mkdir -p /var/www/zenava/logs
sudo chown -R www-data:www-data /var/www/zenava/logs
sudo chmod -R 755 /var/www/zenava/logs
```

---

## 🌐 Nginx 配置

### 1. 创建 Nginx 配置文件

```bash
sudo nano /etc/nginx/sites-available/zenava
```

添加以下配置：

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    # 日志配置
    access_log /var/log/nginx/zenava-access.log;
    error_log /var/log/nginx/zenava-error.log;

    # 客户端最大上传大小（用于文件上传）
    client_max_body_size 100M;

    # 静态文件直接由 Nginx 提供
    location /assets/ {
        alias /var/www/zenava/public/assets/;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    location /uploads/ {
        alias /var/www/zenava/public/uploads/;
        expires 7d;
        add_header Cache-Control "public";
    }

    # API 和动态内容代理到 Node.js
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # 超时设置
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}
```

### 2. 启用站点

```bash
# 创建符号链接
sudo ln -s /etc/nginx/sites-available/zenava /etc/nginx/sites-enabled/

# 测试配置
sudo nginx -t

# 重载 Nginx
sudo systemctl reload nginx
```

### 3. 配置 HTTPS（推荐，使用 Let's Encrypt）

```bash
# 安装 Certbot
sudo apt-get install -y certbot python3-certbot-nginx  # Ubuntu/Debian
sudo yum install -y certbot python3-certbot-nginx     # CentOS/RHEL

# 获取 SSL 证书
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# 自动续期（Certbot 会自动配置）
sudo certbot renew --dry-run
```

---

## 🔄 进程管理

### 使用 systemd 服务（推荐）

部署脚本会自动创建 systemd 服务文件。如果需要手动创建，可以按照以下步骤：

#### 创建服务文件

```bash
sudo nano /etc/systemd/system/zenava.service
```

添加以下内容：

```ini
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
```

#### 启动服务

```bash
# 重载 systemd
sudo systemctl daemon-reload

# 启动服务
sudo systemctl start zenava

# 设置开机自启
sudo systemctl enable zenava

# 查看状态
sudo systemctl status zenava

# 查看日志
sudo journalctl -u zenava -f
```

**注意**：部署脚本 `deploy.sh` 会自动创建并启动 systemd 服务，通常无需手动操作。

### systemd 常用命令

```bash
# 查看状态
sudo systemctl status zenava

# 启动服务
sudo systemctl start zenava

# 停止服务
sudo systemctl stop zenava

# 重启服务
sudo systemctl restart zenava

# 查看日志（实时）
sudo journalctl -u zenava -f

# 查看最近日志
sudo journalctl -u zenava -n 50

# 设置开机自启
sudo systemctl enable zenava

# 取消开机自启
sudo systemctl disable zenava

# 重载服务配置（修改服务文件后）
sudo systemctl daemon-reload
sudo systemctl restart zenava
```

### systemd 服务配置文件

服务文件位置：`/etc/systemd/system/zenava.service`

部署脚本会自动创建此文件。如果需要手动修改：

```bash
sudo nano /etc/systemd/system/zenava.service
```

修改后需要重载并重启：

```bash
sudo systemctl daemon-reload
sudo systemctl restart zenava
```

---

## 🔐 环境变量配置

### 必需的环境变量

| 变量名 | 说明 | 示例值 |
|--------|------|--------|
| `NODE_ENV` | 运行环境 | `production` |
| `PORT` | 应用端口 | `3000` |
| `HOST` | 监听地址 | `0.0.0.0` |
| `MYSQL_HOST` | MySQL 主机 | `localhost` |
| `MYSQL_PORT` | MySQL 端口 | `3306` |
| `MYSQL_DATABASE` | 数据库名 | `ZENAVA_PROD` |
| `MYSQL_USER` | 数据库用户 | `zenava_user` |
| `MYSQL_PASSWORD` | 数据库密码 | `your_password` |

### 可选的环境变量

| 变量名 | 说明 | 示例值 |
|--------|------|--------|
| `ADMIN_EMAIL` | 管理员邮箱 | `admin@zenava.ai` |
| `ADMIN_PASSWORD` | 管理员密码 | `your_admin_password` |
| `SESSION_SECRET` | Session 密钥 | `random_string_32_chars` |
| `CSRF_SECRET` | CSRF 密钥 | `random_string_32_chars` |

---

## ✅ 验证部署

### 1. 检查服务状态

```bash
# 检查 systemd 服务
sudo systemctl status zenava

# 检查进程
ps aux | grep "tsx server.js"

# 检查 Nginx
sudo systemctl status nginx

# 检查 MySQL
sudo systemctl status mysql

# 检查端口监听
sudo netstat -tlnp | grep :3000
sudo netstat -tlnp | grep :80
```

### 2. 测试应用

```bash
# 测试本地访问
curl http://localhost:3000

# 测试外部访问（如果配置了域名）
curl http://your-domain.com

# 测试管理后台
curl http://your-domain.com/ticloudadmin/login
```

### 3. 检查日志

```bash
# systemd 日志（实时）
sudo journalctl -u zenava -f

# systemd 日志（最近 50 行）
sudo journalctl -u zenava -n 50

# systemd 日志（按时间范围）
sudo journalctl -u zenava --since "1 hour ago"

# Nginx 日志
sudo tail -f /var/log/nginx/zenava-access.log
sudo tail -f /var/log/nginx/zenava-error.log
```

### 4. 功能测试清单

- [ ] 首页正常访问
- [ ] 资源中心列表页正常显示
- [ ] 资源详情页正常显示
- [ ] 管理后台登录正常
- [ ] 文件上传功能正常
- [ ] 数据库读写正常
- [ ] 多语言切换正常
- [ ] 静态资源加载正常

---

## 🔍 故障排查

### 问题 1: 应用无法启动

**检查步骤：**
```bash
# 1. 查看应用日志
sudo journalctl -u zenava -n 50

# 2. 检查端口是否被占用
sudo lsof -i :3000

# 3. 检查环境变量
cd /var/www/zenava
cat .env

# 4. 检查服务状态
sudo systemctl status zenava

# 5. 手动启动测试
cd /var/www/zenava
NODE_ENV=production tsx server.js
```

**常见原因：**
- 端口被占用
- 环境变量配置错误
- 数据库连接失败
- 文件权限问题

### 问题 2: 数据库连接失败

**检查步骤：**
```bash
# 1. 测试数据库连接
mysql -u zenava_user -p ZENAVA_PROD

# 2. 检查 MySQL 服务状态
sudo systemctl status mysql

# 3. 检查防火墙
sudo firewall-cmd --list-all  # CentOS/RHEL
sudo ufw status              # Ubuntu/Debian
```

**常见原因：**
- MySQL 服务未启动
- 用户名或密码错误
- 数据库不存在
- 防火墙阻止连接

### 问题 3: 静态资源 404

**检查步骤：**
```bash
# 1. 检查文件是否存在
ls -la /var/www/zenava/public/assets/

# 2. 检查 Nginx 配置
sudo nginx -t

# 3. 检查文件权限
ls -la /var/www/zenava/public/
```

**常见原因：**
- 文件路径错误
- 文件权限问题
- Nginx 配置错误

### 问题 4: 502 Bad Gateway

**检查步骤：**
```bash
# 1. 检查 Node.js 应用是否运行
sudo systemctl status zenava

# 2. 检查应用日志
sudo journalctl -u zenava -f

# 3. 检查 Nginx 错误日志
sudo tail -f /var/log/nginx/zenava-error.log

# 4. 检查进程
ps aux | grep "tsx server.js"
```

**常见原因：**
- Node.js 应用未启动
- 应用崩溃
- 端口配置错误

---

## 🔙 回滚操作

### 1. 停止当前版本

```bash
sudo systemctl stop zenava
```

### 2. 恢复备份

```bash
# 如果有备份目录
cd /var/www
sudo rm -rf zenava
sudo tar -xzf zenava-backup-YYYYMMDD-HHMMSS.tar.gz
sudo mv zenava-backup-YYYYMMDD-HHMMSS zenava
```

### 3. 重启应用

```bash
sudo systemctl restart zenava
```

### 4. 验证回滚

```bash
# 检查应用状态
sudo systemctl status zenava

# 测试访问
curl http://localhost:3000
```

---

## 📞 技术支持

如遇到问题，请联系：
- **技术支持邮箱**: support@zenava.ai
- **文档**: 查看项目根目录下的其他 `.md` 文件

---

## 📝 更新日志

- **2025-01-XX**: 初始版本创建
- 后续更新将在此记录

---

**文档版本**: 1.0.0  
**最后更新**: 2025-01-XX  
**维护者**: Zenava 技术团队

