# Nginx 部署启动说明

## 🎯 两种启动方式

### 方式 1: 使用 Wrangler（临时方案）

```bash
# 启动
pm2 start npx --name zenava -- wrangler pages dev dist --ip 0.0.0.0 --port 3000

# 优点：无需修改代码
# 缺点：依赖 Wrangler，资源占用高
```

### 方式 2: 使用 Node.js（推荐 ✅）

```bash
# 1. 安装依赖
npm install @hono/node-server better-sqlite3 --save

# 2. 启动
node server.js
# 或使用 PM2
pm2 start server.js --name zenava

# 优点：纯 Node.js，性能好，资源占用低
# 缺点：需要完成代码适配（已创建基础文件）
```

---

## 📝 当前状态

✅ **已创建的文件：**
- `server.js` - Node.js 服务器入口
- `src/index-node.tsx` - Node.js 适配版本（部分完成）
- `nginx.conf` - Nginx 配置
- `deploy-nginx.sh` - 部署脚本

⚠️ **需要完成的工作：**
- 完善 `src/index-node.tsx`，复制所有路由
- 适配数据库访问（D1 → SQLite）
- 测试所有功能

---

## 🚀 快速开始（使用 Wrangler）

如果您想快速测试 Nginx 部署，可以先用 Wrangler：

```bash
# 1. 构建
npm run build

# 2. 使用 PM2 启动 Wrangler
pm2 start npx --name zenava -- wrangler pages dev dist --ip 0.0.0.0 --port 3000

# 3. 配置 Nginx（使用提供的 nginx.conf）
sudo cp nginx.conf /etc/nginx/sites-available/zenava
sudo ln -s /etc/nginx/sites-available/zenava /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## 🔧 完整迁移到 Node.js（推荐）

如果您想要完全独立的 Node.js 应用：

1. **完成代码适配**（我可以帮您完成）
2. **测试所有功能**
3. **部署到生产环境**

需要我帮您完成 Node.js 适配吗？

