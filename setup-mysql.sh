#!/bin/bash

echo "🔧 MySQL 安装和配置脚本"
echo "================================"
echo ""

# 检查是否有 root 权限
if [ "$EUID" -ne 0 ]; then 
  echo "⚠️  此脚本需要 root 权限运行"
  echo "请使用: sudo bash setup-mysql.sh"
  exit 1
fi

# 安装 MySQL
echo "📦 正在安装 MySQL..."
apt update
apt install mysql-server -y

# 启动 MySQL
echo "🚀 正在启动 MySQL..."
systemctl start mysql
systemctl enable mysql

# 检查状态
echo ""
echo "✅ MySQL 安装完成！"
systemctl status mysql --no-pager | head -10

# 设置 root 密码
echo ""
echo "🔐 设置 MySQL root 密码为: 12345"
mysql -e "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '12345';"
mysql -e "FLUSH PRIVILEGES;"

# 创建数据库
echo "📊 创建数据库 ZENAVA_LOCAL..."
mysql -uroot -p12345 -e "CREATE DATABASE IF NOT EXISTS ZENAVA_LOCAL CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

echo ""
echo "✅ MySQL 配置完成！"
echo ""
echo "数据库信息:"
echo "  Host: localhost"
echo "  Port: 3306"
echo "  User: root"
echo "  Password: 12345"
echo "  Database: ZENAVA_LOCAL"
echo ""
echo "接下来可以运行数据库迁移脚本了！"
