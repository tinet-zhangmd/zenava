# 迁移到 Node.js 完整指南

## 🎯 目标

将应用完全适配为 Node.js 版本，不依赖 Wrangler，使用 Nginx + Node.js 部署。

---

## ✅ 已完成的工作

1. **数据库适配器** (`src/adapters/database.ts`)
   - ✅ 创建了 D1 兼容的 SQLite 适配器
   - ✅ 完全兼容 D1 API（`prepare().all()`, `prepare().first()`, `prepare().run()`）

2. **Node.js 入口文件** (`src/index-node.tsx`)
   - ✅ 基础结构已创建
   - ✅ 数据库初始化
   - ✅ 主要路由已添加（首页、AI Agents）
   - ⚠️ 需要复制其他路由

3. **服务器入口** (`server.js`)
   - ✅ 已更新为使用 Node.js 适配版本
   - ✅ 静态文件服务配置

---

## 📋 待完成的工作

### 1. 复制所有路由到 `src/index-node.tsx`

需要从 `src/index.tsx` 复制以下路由：

- [ ] 所有多语言路由（/en, /zh, /jp, /hk）
- [ ] 场景页面路由（Marketing, Sales, CustomerService 等）
- [ ] Admin 页面路由（/ticloudadmin/*）
- [ ] API 路由（/api/*）
- [ ] 其他页面路由（About, Privacy, Terms 等）

### 2. 测试数据库功能

- [ ] 测试数据库连接
- [ ] 测试 API 路由的数据库查询
- [ ] 验证数据迁移脚本

### 3. 配置 Nginx

- [ ] 更新 nginx.conf
- [ ] 测试反向代理
- [ ] 配置 SSL/HTTPS

---

## 🚀 快速开始（当前可用功能）

### 1. 安装依赖

```bash
npm install
```

### 2. 初始化数据库

```bash
# 创建数据目录
mkdir -p data

# 运行迁移（需要适配为 SQLite）
# 目前可以使用 SQLite 直接执行 SQL 文件
```

### 3. 启动服务器

```bash
# 方式 1: 直接运行
node server.js

# 方式 2: 使用 PM2
pm2 start server.js --name zenava-node
```

### 4. 测试访问

```bash
# 测试首页
curl http://localhost:3000

# 测试 API
curl http://localhost:3000/api/hello
curl http://localhost:3000/api/db/health
```

---

## 🔧 数据库迁移脚本

创建 `migrate-sqlite.sh`：

```bash
#!/bin/bash
# SQLite 数据库迁移脚本

DB_PATH="${DB_PATH:-data/zenava.db}"

echo "📦 初始化 SQLite 数据库..."

# 创建数据库目录
mkdir -p data

# 执行所有迁移文件
for file in migrations/*.sql; do
  if [ -f "$file" ]; then
    echo "执行迁移: $file"
    sqlite3 "$DB_PATH" < "$file"
  fi
done

# 执行种子数据
if [ -f "seed.sql" ]; then
  echo "填充种子数据..."
  sqlite3 "$DB_PATH" < seed.sql
fi

echo "✅ 数据库初始化完成: $DB_PATH"
```

---

## 📝 下一步行动

### 选项 1: 逐步迁移（推荐）

1. 先测试当前已实现的路由
2. 逐步添加其他路由
3. 测试每个功能模块

### 选项 2: 完整迁移

1. 一次性复制所有路由
2. 全面测试
3. 修复问题

---

## 💡 建议

**当前状态：**
- ✅ 基础架构已完成
- ✅ 数据库适配器已完成
- ⚠️ 需要复制路由（可以逐步完成）

**推荐工作流：**
1. 先测试当前已实现的功能
2. 确认数据库连接正常
3. 逐步添加需要的路由
4. 最后完善所有功能

---

## 🆘 需要帮助？

如果需要我帮您：
1. 复制所有路由到 Node.js 版本
2. 创建数据库迁移脚本
3. 测试和调试

请告诉我！

