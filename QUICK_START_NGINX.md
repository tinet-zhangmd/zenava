# Nginx 部署快速开始

## 🎯 方案选择

由于您的项目当前是为 **Cloudflare Workers** 设计的，部署到 Nginx 有两种方案：

### 方案 A: 最小改动（推荐用于快速测试）

使用 **Wrangler** 在 Node.js 中运行，Nginx 作为反向代理。

**优点**: 无需修改代码  
**缺点**: 需要运行 Wrangler，资源占用较高

### 方案 B: 完全适配（推荐用于生产环境）

将应用完全适配为 Node.js 环境，使用 `@hono/node-server`。

**优点**: 性能更好，资源占用低  
**缺点**: 需要修改代码以适配 Node.js

---

## 🚀 方案 A: 快速部署（使用 Wrangler）

### 1. 安装依赖

```bash
npm install
```

### 2. 构建项目

```bash
npm run build
```

### 3. 配置 Nginx

```bash
# 复制配置文件
sudo cp nginx.conf /etc/nginx/sites-available/zenava

# 编辑并设置域名
sudo nano /etc/nginx/sites-available/zenava

# 启用站点
sudo ln -s /etc/nginx/sites-available/zenava /etc/nginx/sites-enabled/

# 测试配置
sudo nginx -t

# 重载 Nginx
sudo systemctl reload nginx
```

### 4. 使用 PM2 启动 Wrangler

```bash
# 安装 PM2
sudo npm install -g pm2

# 启动应用（使用现有的 PM2 配置）
pm2 start ecosystem.config.cjs

# 或直接启动
pm2 start npx --name zenava -- wrangler pages dev dist --ip 0.0.0.0 --port 3000

# 保存配置
pm2 save
pm2 startup
```

### 5. 验证

```bash
# 检查 PM2 状态
pm2 status

# 查看日志
pm2 logs zenava

# 测试访问
curl http://localhost
```

---

## 🔧 方案 B: Node.js 适配（需要代码修改）

### 步骤 1: 安装 Node.js 依赖

```bash
npm install @hono/node-server better-sqlite3 --save
```

### 步骤 2: 修改数据库访问

需要将所有使用 `c.env.DB` 的地方改为使用适配器：

```typescript
// 原代码 (Cloudflare)
const result = await c.env.DB.prepare('SELECT * FROM table').all()

// 适配后 (Node.js)
const db = getDatabaseAdapter(c.env.DB)
const result = await db.prepare('SELECT * FROM table').all()
```

### 步骤 3: 创建 Node.js 入口

使用我创建的 `server.js` 和 `src/index-node.tsx` 作为起点。

### 步骤 4: 复制所有路由

将 `src/index.tsx` 中的所有路由复制到 `src/index-node.tsx`，并替换数据库访问。

---

## 📝 推荐工作流

### 阶段 1: 快速验证（使用方案 A）

1. 使用 Wrangler 在本地测试
2. 确认所有功能正常
3. 部署到服务器验证

### 阶段 2: 生产优化（使用方案 B）

1. 创建 Node.js 适配版本
2. 逐步迁移路由
3. 性能测试和优化
4. 正式部署

---

## 🔍 当前状态检查

运行以下命令检查您的环境：

```bash
# 检查 Node.js
node --version  # 需要 v18+

# 检查 Nginx
nginx -v  # 需要 1.18+

# 检查 PM2
pm2 --version  # 可选

# 检查项目构建
npm run build  # 应该成功
```

---

## 💡 建议

**如果您需要快速上线**: 使用方案 A  
**如果您需要最佳性能**: 使用方案 B

**混合方案**: 
- 开发环境使用 Cloudflare Pages
- 生产环境使用 Nginx + Node.js（方案 B）

---

## 📞 需要帮助？

1. 查看 `NGINX_DEPLOYMENT_GUIDE.md` 获取详细指南
2. 检查 `nginx.conf` 配置文件
3. 查看 PM2 日志: `pm2 logs`
4. 查看 Nginx 日志: `/var/log/nginx/zenava-error.log`

