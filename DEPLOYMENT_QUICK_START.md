# Zenava 生产环境部署快速指南

## 🚀 快速部署（5分钟）

### 1. 打包项目

```bash
cd /path/to/zenava
chmod +x build-production.sh
./build-production.sh
```

打包完成后会生成：`zenava-production-YYYYMMDD-HHMMSS.tar.gz`

### 2. 上传到服务器

```bash
scp zenava-production-*.tar.gz user@your-server:/tmp/
```

### 3. 在服务器上部署

```bash
# SSH 登录服务器
ssh user@your-server

# 解压
cd /tmp
tar -xzf zenava-production-*.tar.gz

# 进入部署目录
cd deploy-package

# 配置环境变量
cp .env.example .env
nano .env  # 编辑数据库配置

# 运行部署脚本
sudo ./deploy.sh
```

### 4. 验证部署

```bash
# 检查应用状态
sudo systemctl status zenava

# 查看日志
sudo journalctl -u zenava -f

# 测试访问
curl http://localhost:3000
```

---

## 📋 详细文档

完整部署文档请参考：[PRODUCTION_DEPLOYMENT.md](./PRODUCTION_DEPLOYMENT.md)

---

## ⚙️ 必需配置

### 环境变量（.env）

```env
NODE_ENV=production
PORT=3000
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_DATABASE=ZENAVA_PROD
MYSQL_USER=zenava_user
MYSQL_PASSWORD=your_password
```

### 进程管理

部署脚本会自动创建 systemd 服务，无需手动配置。

**常用命令：**
```bash
sudo systemctl status zenava    # 查看状态
sudo systemctl restart zenava   # 重启应用
sudo journalctl -u zenava -f    # 查看日志
```

### 数据库准备

```sql
CREATE DATABASE ZENAVA_PROD CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'zenava_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON ZENAVA_PROD.* TO 'zenava_user'@'localhost';
FLUSH PRIVILEGES;
```

---

## 🔧 常用命令

```bash
# systemd 服务管理
sudo systemctl status zenava      # 查看状态
sudo systemctl restart zenava     # 重启
sudo systemctl stop zenava        # 停止
sudo journalctl -u zenava -f      # 查看日志

# Nginx
sudo nginx -t                     # 测试配置
sudo systemctl reload nginx        # 重载

# MySQL
sudo systemctl status mysql        # 查看状态
```

---

## 📞 问题排查

1. **应用无法启动** → 查看 `sudo journalctl -u zenava -n 50`
2. **数据库连接失败** → 检查 `.env` 中的数据库配置
3. **静态资源 404** → 检查 Nginx 配置和文件权限
4. **502 Bad Gateway** → 检查 Node.js 应用是否运行

详细故障排查请参考：[PRODUCTION_DEPLOYMENT.md](./PRODUCTION_DEPLOYMENT.md#故障排查)

