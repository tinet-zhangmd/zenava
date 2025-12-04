# 本地环境数据库初始化指南

由于沙箱环境无法访问您本地的 MySQL 数据库，您需要在本地机器上运行数据库初始化脚本。

## 📋 前置条件

- ✅ MySQL 5.7+ 或 8.0+ 已安装并运行
- ✅ Node.js 18+ 已安装
- ✅ Git 已安装

---

## 🚀 步骤 1：克隆项目到本地

```bash
# 克隆项目
git clone https://github.com/Tinet-zhangmd/ZENAVA.git
cd ZENAVA

# 切换到开发分支
git checkout genspark_ai_developer
```

---

## 🚀 步骤 2：安装依赖

```bash
npm install
```

---

## 🚀 步骤 3：配置 .env 文件

在项目根目录创建 `.env` 文件：

```bash
cat > .env << 'EOF'
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_DATABASE=ZENAVA_LOCAL
MYSQL_USER=root
MYSQL_PASSWORD=12345
EOF
```

**或者手动创建** `.env` 文件，内容如下：

```env
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_DATABASE=ZENAVA_LOCAL
MYSQL_USER=root
MYSQL_PASSWORD=12345
```

---

## 🚀 步骤 4：创建数据库（如果尚未创建）

```bash
mysql -u root -p12345 -e "CREATE DATABASE IF NOT EXISTS ZENAVA_LOCAL CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
```

**或者通过 MySQL 命令行：**

```bash
mysql -u root -p
```

然后在 MySQL 命令行中执行：

```sql
CREATE DATABASE IF NOT EXISTS ZENAVA_LOCAL CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
SHOW DATABASES LIKE 'ZENAVA_%';
EXIT;
```

---

## 🚀 步骤 5：运行数据库初始化脚本

```bash
npx tsx scripts/init-resource-center-db.ts
```

**预期输出：**

```
[dotenv@17.2.3] injecting env (5) from .env
🚀 开始初始化资源中心数据库...

📊 数据库配置:
   Host: localhost
   Port: 3306
   Database: ZENAVA_LOCAL
   User: root

📡 正在连接数据库...
✅ 数据库连接成功

📄 读取 SQL 文件: /path/to/migrations/001_create_resource_center_tables.sql
✅ SQL 文件读取成功 (5536 字符)

⚙️  正在执行数据库迁移...
✅ 数据库迁移执行成功

🔍 验证表结构...
📊 已创建的表:
   ✓ resource_categories
   ✓ resource_contents

📦 检查示例数据...
   ✓ resource_categories: 5 条记录
   ✓ resource_contents: 6 条记录

✨ 资源中心数据库初始化完成！

🎯 下一步操作:
   1. 访问管理后台: http://localhost:3000/ticloudadmin/resource-categories
   2. 访问管理后台: http://localhost:3000/ticloudadmin/resource-contents
   3. 开始管理您的资源内容

🔌 数据库连接已关闭
```

---

## 🚀 步骤 6：验证表结构

```bash
mysql -u root -p12345 ZENAVA_LOCAL -e "SHOW TABLES;"
```

**预期输出：**

```
+---------------------------+
| Tables_in_ZENAVA_LOCAL    |
+---------------------------+
| resource_categories       |
| resource_contents         |
+---------------------------+
```

---

## 🚀 步骤 7：查看示例数据

**查看分类：**

```bash
mysql -u root -p12345 ZENAVA_LOCAL -e "SELECT id, name, category_template, is_displayed, sort_order FROM resource_categories;"
```

**查看内容：**

```bash
mysql -u root -p12345 ZENAVA_LOCAL -e "SELECT id, title, author, status FROM resource_contents LIMIT 5;"
```

---

## 🚀 步骤 8：启动本地开发服务器

```bash
npm run pm2:start
```

**或者：**

```bash
npm run dev
```

---

## 🚀 步骤 9：访问管理后台

打开浏览器访问：

- **栏目分类管理**: http://localhost:3000/ticloudadmin/resource-categories
- **内容列表管理**: http://localhost:3000/ticloudadmin/resource-contents

---

## ⚠️ 常见问题

### 问题 1: MySQL 连接失败

**错误信息：**
```
Error: connect ECONNREFUSED 127.0.0.1:3306
```

**解决方案：**

1. 检查 MySQL 服务状态：

**Windows:**
```bash
# 以管理员身份运行
net start MySQL
# 或
services.msc  # 在服务列表中启动 MySQL
```

**macOS:**
```bash
brew services start mysql
# 或
sudo mysql.server start
```

**Linux:**
```bash
sudo systemctl start mysql
# 或
sudo service mysql start
```

2. 验证 MySQL 正在监听 3306 端口：

```bash
# Windows
netstat -ano | findstr :3306

# macOS / Linux
netstat -tuln | grep 3306
# 或
lsof -i :3306
```

---

### 问题 2: 密码错误

**错误信息：**
```
Error: Access denied for user 'root'@'localhost' (using password: YES)
```

**解决方案：**

1. 验证密码：

```bash
mysql -u root -p12345 -e "SELECT 1;"
```

2. 如果密码不正确，更新 `.env` 文件中的 `MYSQL_PASSWORD`

---

### 问题 3: 数据库不存在

**错误信息：**
```
Error: Unknown database 'ZENAVA_LOCAL'
```

**解决方案：**

```bash
mysql -u root -p12345 -e "CREATE DATABASE ZENAVA_LOCAL CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
```

---

### 问题 4: 表已存在

**错误信息：**
```
Error: Table 'resource_categories' already exists
```

**解决方案：**

这不是错误！SQL 脚本使用了 `CREATE TABLE IF NOT EXISTS`，如果表已存在会跳过创建。

如果需要重新初始化数据库：

```bash
# ⚠️ 警告：这将删除所有数据！
mysql -u root -p12345 ZENAVA_LOCAL -e "DROP TABLE IF EXISTS resource_contents; DROP TABLE IF EXISTS resource_categories;"

# 然后重新运行初始化脚本
npx tsx scripts/init-resource-center-db.ts
```

---

## 📞 技术支持

如有问题，请参考：
- `RESOURCE_CENTER_README.md` - 完整使用指南
- `RESOURCE_CENTER_IMPLEMENTATION_SUMMARY.md` - 实施总结
- GitHub Issues: https://github.com/Tinet-zhangmd/ZENAVA/issues

---

**🎉 完成后，您就可以在本地使用资源中心管理系统了！**
