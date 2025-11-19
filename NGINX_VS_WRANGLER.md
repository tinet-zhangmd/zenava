# Nginx 部署：Wrangler vs Node.js

## 🎯 核心问题

**如果用 Nginx 部署，是否还需要 Wrangler？**

**答案：不需要！** 您有两个选择：

---

## 方案 A：Nginx + Wrangler（不推荐）

### 架构
```
用户请求 → Nginx (端口 80/443) → Wrangler (端口 3000) → 应用
```

### 配置示例
```nginx
# nginx.conf
location / {
    proxy_pass http://127.0.0.1:3000;
}
```

```bash
# 启动命令
pm2 start npx --name zenava -- wrangler pages dev dist --port 3000
```

### 缺点
- ❌ 仍需要安装 Wrangler
- ❌ Wrangler 占用额外资源
- ❌ 启动较慢
- ❌ 不适合生产环境

---

## 方案 B：Nginx + Node.js（推荐 ✅）

### 架构
```
用户请求 → Nginx (端口 80/443) → Node.js 应用 (端口 3000) → 应用
```

### 配置示例
```nginx
# nginx.conf
location / {
    proxy_pass http://127.0.0.1:3000;
}
```

```bash
# 启动命令
pm2 start server.js --name zenava
```

### 优点
- ✅ 不需要 Wrangler
- ✅ 纯 Node.js，性能更好
- ✅ 资源占用低
- ✅ 启动快速
- ✅ 适合生产环境

---

## 🔄 迁移步骤

### 1. 安装 Node.js 依赖

```bash
npm install @hono/node-server better-sqlite3 --save
```

### 2. 修改代码适配 Node.js

主要修改点：
- `c.env.DB` → 使用 `better-sqlite3`
- `serveStatic` → 使用 `@hono/node-server/serve-static`
- Cloudflare 特定 API → Node.js 等价实现

### 3. 使用新的启动方式

```bash
# 不再使用
npx wrangler pages dev dist

# 改为使用
node server.js
# 或
pm2 start server.js
```

---

## 📊 对比总结

| 特性 | Wrangler | Node.js |
|------|----------|---------|
| 依赖 | 需要 Wrangler | 只需 Node.js |
| 性能 | 中等 | 更好 |
| 资源占用 | 较高 | 较低 |
| 启动速度 | 较慢 | 快速 |
| 生产适用 | ❌ | ✅ |
| 代码修改 | 无需 | 需要适配 |

---

## 💡 建议

**对于 Nginx 部署，强烈推荐使用方案 B（Node.js）**

原因：
1. 更符合传统部署方式
2. 更好的性能和资源利用
3. 更容易调试和维护
4. 不依赖 Cloudflare 工具链

**Wrangler 适合：**
- Cloudflare Pages 部署
- 快速原型开发
- 需要 Cloudflare 特定功能时

