# Internal Server Error 修复说明

## ❌ 问题描述

部署到 Cloudflare Pages 后出现 "Internal Server Error"（500 错误）。

## 🔍 问题原因

在 Cloudflare Workers 环境中，**无法访问本地文件系统路径**（如 `./dist`）。

之前的修复尝试在 Worker 中处理 `/assets/*` 请求：
```typescript
app.use('/assets/*', serveStatic({ root: './dist' }))
```

这会导致错误，因为：
1. Cloudflare Workers 运行在 Cloudflare 的服务器上，不是本地文件系统
2. `./dist` 路径在 Worker 环境中不存在
3. 导致所有请求 `/assets/*` 的路径都返回 500 错误

---

## ✅ 正确解决方案

### Cloudflare Pages 静态文件服务机制

**重要原则**：
- ✅ Cloudflare Pages **自动服务** `dist/` 目录下的所有静态文件
- ✅ 不需要在 Worker 中手动处理静态文件
- ✅ 通过 `_routes.json` 配置哪些路径由 Worker 处理，哪些由 Pages 自动处理

### 修复方案

#### 1. 移除 Worker 中的静态文件处理

**文件**: `src/index.tsx`

**修改前**:
```typescript
// Serve /assets/* files from dist/assets/ directory
app.use('/assets/*', serveStatic({ root: './dist' }))
```

**修改后**:
```typescript
// /assets/* files are automatically served by Cloudflare Pages from dist/assets/
// No need to handle them in Worker
```

#### 2. 配置路由排除静态资源

**文件**: `dist/_routes.json`（构建时自动生成）

**正确配置**:
```json
{"version":1,"include":["/*"],"exclude":["/static/*","/assets/*"]}
```

**说明**：
- `exclude` 列表中的路径**不会被 Worker 处理**
- 这些路径会由 **Cloudflare Pages 自动服务**
- `/assets/*` 和 `/static/*` 都应该被排除

---

## 📋 修复步骤

### 步骤 1：修改代码（已完成）

已在 `src/index.tsx` 中移除了 `/assets/*` 的 Worker 处理。

### 步骤 2：重新构建（已完成）

```bash
npm run build
```

### 步骤 3：重新部署

```bash
npm run deploy:prod
```

---

## 🔧 技术说明

### Cloudflare Pages 文件服务优先级

1. **静态文件服务**（优先级最高）
   - 如果文件存在于 `dist/` 目录
   - 且路径在 `_routes.json` 的 `exclude` 列表中
   - 由 Cloudflare Pages **自动服务**，不经过 Worker

2. **Worker 处理**（优先级较低）
   - 如果路径不在 `exclude` 列表中
   - 请求会被发送到 Worker（`_worker.js`）
   - Worker 可以处理动态路由、API 等

### 路径映射

| 请求路径 | 文件位置 | 处理方式 |
|---------|---------|---------|
| `/assets/images/logo.png` | `dist/assets/images/logo.png` | Pages 自动服务 ✅ |
| `/assets/video/codegen.mov` | `dist/assets/video/codegen.mov` | Pages 自动服务 ✅ |
| `/static/style.css` | `dist/static/style.css` | Pages 自动服务 ✅ |
| `/api/*` | - | Worker 处理 ✅ |
| `/*` (页面路由) | - | Worker 处理 ✅ |

---

## ✅ 验证方法

部署完成后，检查以下内容：

### 1. 检查网站是否正常

访问：`https://zenava-official.pages.dev`

应该：
- ✅ 不再出现 500 错误
- ✅ 页面正常加载
- ✅ 图片正常显示

### 2. 检查静态资源

```bash
# 检查图片
curl -I https://zenava-official.pages.dev/assets/images/logo.png
# 应该返回 200 OK

# 检查 CSS
curl -I https://zenava-official.pages.dev/static/style.css
# 应该返回 200 OK
```

### 3. 查看部署日志

```bash
# 查看实时日志
npx wrangler tail --project-name zenava-official

# 查看部署列表
npx wrangler pages deployment list --project-name zenava-official
```

---

## 🆘 如果问题仍然存在

### 检查清单

1. ✅ **构建是否成功？**
   ```bash
   npm run build
   # 检查是否有错误
   ```

2. ✅ **部署是否成功？**
   ```bash
   npm run deploy:prod
   # 检查部署输出
   ```

3. ✅ **`_routes.json` 配置是否正确？**
   ```bash
   cat dist/_routes.json
   # 应该包含 "/assets/*" 在 exclude 列表中
   ```

4. ✅ **静态文件是否存在？**
   ```bash
   ls -la dist/assets/images/
   # 检查图片文件是否存在
   ```

5. ✅ **查看 Cloudflare Dashboard**
   - 登录 Cloudflare Dashboard
   - 进入 Pages 项目
   - 查看部署日志和错误日志

### 调试方法

```bash
# 查看 Worker 日志
npx wrangler tail --project-name zenava-official

# 测试静态资源
curl https://zenava-official.pages.dev/assets/images/logo.png

# 测试 API
curl https://zenava-official.pages.dev/api/navigation
```

---

## 📝 相关文件

- `src/index.tsx` - Worker 入口，已移除 `/assets/*` 处理
- `dist/_routes.json` - 路由配置（构建时自动生成）
- `dist/assets/` - 静态资源目录（由 Pages 自动服务）
- `dist/static/` - 静态文件目录（由 Pages 自动服务）

---

## 💡 最佳实践

### ✅ 推荐做法

1. **静态文件**：放在 `dist/` 目录，由 Pages 自动服务
2. **动态路由**：在 Worker 中处理
3. **API 路由**：在 Worker 中处理
4. **路由配置**：通过 `_routes.json` 明确哪些路径由 Worker 处理

### ❌ 避免的做法

1. ❌ 不要在 Worker 中处理静态文件（除非有特殊需求）
2. ❌ 不要使用本地文件系统路径（如 `./dist`）
3. ❌ 不要在 Worker 中读取文件系统

---

**修复完成时间**: 2025-01-03  
**状态**: ✅ 已修复  
**下一步**: 重新部署并验证

