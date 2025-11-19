# Nginx + Node.js 部署快速开始

## 🎯 方案说明

**方案 B：Nginx + Node.js（推荐）**
- ✅ 不需要 Wrangler
- ✅ 纯 Node.js 运行
- ✅ 适合生产环境
- ✅ 完全控制服务器配置

---

## 📋 前置要求

1. **Node.js** >= 18.0.0
2. **Nginx** >= 1.18.0
3. **SQLite3** (用于数据库)
4. **PM2** (可选，用于进程管理)

---

## 🚀 快速开始（5 步）

### 步骤 1: 安装依赖

```bash
npm install
```

### 步骤 2: 初始化数据库

```bash
# 创建数据目录
mkdir -p data

# 运行数据库迁移
npm run db:migrate:sqlite

# 如果需要重置数据库
npm run db:migrate:sqlite:reset
```

### 步骤 3: 测试 Node.js 服务器

```bash
# 启动服务器
npm run start:node

# 或使用 PM2
pm2 start server.js --name zenava-node
```

访问：`http://localhost:3000`

### 步骤 4: 配置 Nginx

编辑 `nginx.conf` 或创建新的配置文件：

```nginx
server {
    listen 80;
    server_name your-domain.com;

    # 静态文件直接由 Nginx 提供
    location /assets/ {
        alias /path/to/webapp/dist/assets/;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    location /static/ {
        alias /path/to/webapp/public/static/;
        expires 7d;
    }

    # 所有其他请求代理到 Node.js
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 步骤 5: 启动服务

```bash
# 启动 Node.js 服务器
npm run start:node

# 或使用 PM2（推荐生产环境）
pm2 start server.js --name zenava-node

# 启动 Nginx
sudo nginx -t  # 测试配置
sudo nginx -s reload  # 重新加载配置
```

---

## 📁 项目结构

```
webapp/
├── src/
│   ├── index-node.tsx      # Node.js 适配版本（主要路由）
│   ├── adapters/
│   │   └── database.ts     # 数据库适配器（D1 → SQLite）
│   └── ...
├── server.js               # Node.js 服务器入口
├── data/
│   └── zenava.db          # SQLite 数据库文件
├── nginx.conf             # Nginx 配置
└── migrate-sqlite.sh      # 数据库迁移脚本
```

---

## 🔧 环境变量

创建 `.env` 文件（可选）：

```bash
# 数据库路径
DB_PATH=data/zenava.db

# 服务器配置
PORT=3000
HOST=127.0.0.1

# CORS 配置
CORS_ORIGIN=*
```

---

## 📝 当前状态

### ✅ 已完成

1. **数据库适配器** - D1 → SQLite 完全兼容
2. **基础路由** - 首页、AI Agents 页面
3. **服务器入口** - `server.js` 已配置
4. **数据库迁移** - `migrate-sqlite.sh` 脚本

### ⚠️ 待完成

1. **路由迁移** - 需要从 `src/index.tsx` 复制其他路由到 `src/index-node.tsx`
   - 场景页面路由
   - Admin 页面路由
   - 其他 API 路由

**注意**：当前版本可以运行，但只有基础路由。需要逐步添加其他路由。

---

## 🛠️ 添加更多路由

### 方法 1: 手动复制（推荐）

从 `src/index.tsx` 复制需要的路由到 `src/index-node.tsx`。

### 方法 2: 逐步迁移

1. 先测试当前功能
2. 根据需求逐步添加路由
3. 测试每个功能模块

---

## 🧪 测试

### 测试数据库连接

```bash
curl http://localhost:3000/api/db/health
```

预期响应：
```json
{
  "success": true,
  "status": "healthy",
  "database": "SQLite (Node.js)",
  "timestamp": "2024-..."
}
```

### 测试首页

```bash
curl http://localhost:3000
```

### 测试 API

```bash
curl http://localhost:3000/api/hello
```

---

## 🚨 常见问题

### 1. 数据库文件不存在

```bash
# 运行迁移脚本
npm run db:migrate:sqlite
```

### 2. 端口被占用

```bash
# 修改端口
PORT=3001 npm run start:node
```

### 3. 静态文件 404

确保：
- Nginx 配置正确指向 `dist/assets/`
- 或 Node.js 服务器能访问 `dist/` 目录

### 4. 数据库查询错误

检查：
- 数据库文件是否存在
- 迁移是否成功执行
- 数据库路径是否正确

---

## 📚 相关文档

- `迁移到Node.js指南.md` - 详细迁移指南
- `NGINX_DEPLOYMENT_GUIDE.md` - Nginx 部署详细说明
- `nginx.conf` - Nginx 配置文件示例

---

## 💡 下一步

1. ✅ 测试当前功能
2. ⏭️ 添加需要的路由
3. ⏭️ 配置生产环境
4. ⏭️ 设置 SSL/HTTPS
5. ⏭️ 配置监控和日志

---

## 🆘 需要帮助？

如果需要我帮您：
- 复制所有路由
- 测试数据库功能
- 配置 Nginx
- 解决错误

请告诉我！

