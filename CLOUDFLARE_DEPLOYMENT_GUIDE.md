# Cloudflare Pages 部署指南

## 🎯 概述

将 Zenava Webapp 部署到 Cloudflare Pages，享受全球 CDN 加速和边缘计算。

---

## 📋 前置要求

1. **Cloudflare 账号**
   - 注册地址：https://dash.cloudflare.com/sign-up
   - 免费版即可使用

2. **Wrangler CLI**
   - 已包含在项目依赖中（`npm install` 会自动安装）

3. **Cloudflare API Token**（可选，推荐）
   - 用于 CI/CD 自动化部署

---

## 🚀 快速部署

### 方法 1: 使用 npm 脚本（最简单）

```bash
# 1. 构建项目
npm run build

# 2. 部署到 Cloudflare Pages
npm run deploy

# 或部署到指定项目
npm run deploy:prod
```

### 方法 2: 使用 Wrangler 命令

```bash
# 1. 构建
npm run build

# 2. 登录 Cloudflare（首次需要）
npx wrangler login

# 3. 部署
npx wrangler pages deploy dist
```

---

## 🔧 详细部署步骤

### 步骤 1: 登录 Cloudflare

```bash
# 方式 1: 浏览器登录（推荐）
npx wrangler login

# 方式 2: 使用 API Token
export CLOUDFLARE_API_TOKEN="your-api-token-here"
```

**获取 API Token：**
1. 登录 Cloudflare Dashboard
2. 进入 "My Profile" → "API Tokens"
3. 点击 "Create Token"
4. 使用 "Edit Cloudflare Workers" 模板
5. 复制生成的 Token

### 步骤 2: 配置项目名称

编辑 `wrangler.jsonc` 或使用命令行参数：

```bash
# 使用默认项目名（webapp）
npx wrangler pages deploy dist

# 或指定项目名
npx wrangler pages deploy dist --project-name zenava-official
```

### 步骤 3: 创建 Pages 项目（首次部署）

```bash
# 创建项目（如果不存在会自动创建）
npx wrangler pages project create zenava-official \
    --production-branch main \
    --compatibility-date 2024-01-01
```

### 步骤 4: 配置数据库（D1）

#### 4.1 创建生产数据库

```bash
# 创建 D1 数据库
npx wrangler d1 create zenava-production

# 输出示例：
# ✅ Successfully created DB 'zenava-production'!
# Created your database using D1's new storage backend. The new storage backend is not yet recommended for production workloads, but backs up your data via snapshots to R2.
# [[d1_databases]]
# binding = "DB"
# database_name = "zenava-production"
# database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

#### 4.2 更新 wrangler.jsonc

将返回的 `database_id` 更新到 `wrangler.jsonc`：

```jsonc
{
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "zenava-production",
      "database_id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"  // 替换为实际 ID
    }
  ]
}
```

#### 4.3 应用数据库迁移

```bash
# 应用迁移到生产环境
npm run db:migrate:prod

# 或手动执行
npx wrangler d1 migrations apply zenava-production
```

#### 4.4 填充种子数据（可选）

```bash
# 执行种子数据
npx wrangler d1 execute zenava-production --file=./seed.sql
```

### 步骤 5: 部署应用

```bash
# 构建
npm run build

# 部署
npx wrangler pages deploy dist --project-name zenava-official
```

---

## 🌐 访问部署的应用

部署成功后，您会获得：

1. **默认 Pages 域名**：
   ```
   https://zenava-official.pages.dev
   ```

2. **预览部署**（每次部署都会生成）：
   ```
   https://<commit-hash>-zenava-official.pages.dev
   ```

3. **自定义域名**（需要配置）：
   ```
   https://yourdomain.com
   ```

---

## 🔗 绑定自定义域名

### 在 Cloudflare Dashboard 中配置

1. 登录 Cloudflare Dashboard
2. 进入 "Workers & Pages" → 选择您的项目
3. 点击 "Custom domains" → "Set up a custom domain"
4. 输入您的域名
5. 按照提示配置 DNS 记录

### 使用命令行配置

```bash
# 添加自定义域名
npx wrangler pages domain add yourdomain.com --project-name zenava-official
```

---

## 🔄 CI/CD 集成

### GitHub Actions 示例

创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to Cloudflare Pages

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Cloudflare Pages
        uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: zenava-official
          directory: dist
```

### 云效流水线配置

**构建步骤：**
```bash
npm install
npm run build
```

**部署步骤：**
```bash
# 设置 API Token（在云效环境变量中配置）
export CLOUDFLARE_API_TOKEN="your-token"

# 部署
npx wrangler pages deploy dist --project-name zenava-official
```

---

## 📝 常用命令

### 部署相关

```bash
# 部署到默认项目
npm run deploy

# 部署到指定项目
npm run deploy:prod

# 查看部署列表
npx wrangler pages deployment list --project-name zenava-official

# 回滚到之前的部署
npx wrangler pages deployment rollback <deployment-id> --project-name zenava-official
```

### 数据库相关

```bash
# 应用迁移
npm run db:migrate:prod

# 执行 SQL
npx wrangler d1 execute zenava-production --command "SELECT * FROM pages"

# 查看数据库信息
npx wrangler d1 info zenava-production
```

### 项目管理

```bash
# 查看项目列表
npx wrangler pages project list

# 查看项目详情
npx wrangler pages project get zenava-official

# 删除项目（谨慎使用）
npx wrangler pages project delete zenava-official
```

---

## 🔒 环境变量配置

### 在 Cloudflare Dashboard 中配置

1. 进入 "Workers & Pages" → 选择项目
2. 点击 "Settings" → "Environment variables"
3. 添加变量：
   - Production: 生产环境变量
   - Preview: 预览环境变量

### 使用命令行配置

```bash
# 设置环境变量
npx wrangler pages secret put SECRET_KEY --project-name zenava-official
```

---

## 📊 监控和日志

### 查看实时日志

```bash
# 查看实时日志
npx wrangler tail --project-name zenava-official

# 过滤日志
npx wrangler tail --project-name zenava-official --format pretty
```

### 在 Dashboard 中查看

1. 进入项目页面
2. 点击 "Deployments" 查看部署历史
3. 点击 "Functions" 查看函数日志
4. 点击 "Analytics" 查看访问统计

---

## 🎯 部署流程总结

### 首次部署

```bash
# 1. 登录
npx wrangler login

# 2. 创建数据库
npx wrangler d1 create zenava-production
# 更新 wrangler.jsonc 中的 database_id

# 3. 应用迁移
npm run db:migrate:prod

# 4. 构建
npm run build

# 5. 部署
npm run deploy:prod
```

### 后续部署

```bash
# 只需两步
npm run build
npm run deploy:prod
```

---

## ⚠️ 注意事项

### 1. 数据库 ID 配置

- 本地开发：使用 `local-development`
- 生产环境：使用实际的 `database_id`
- 确保 `wrangler.jsonc` 中的 ID 正确

### 2. 环境变量

- 敏感信息使用 Secrets（`wrangler pages secret`）
- 非敏感配置使用环境变量

### 3. 构建输出

- 确保 `dist/` 目录包含所有必要文件
- 静态资源会自动从 `dist/` 提供

### 4. 路由配置

- `dist/_routes.json` 控制路由规则
- 确保配置正确，避免静态资源被 Worker 处理

---

## 🐛 故障排查

### 问题 1: 部署失败

```bash
# 检查登录状态
npx wrangler whoami

# 检查项目是否存在
npx wrangler pages project list

# 查看详细错误
npx wrangler pages deploy dist --project-name zenava-official --verbose
```

### 问题 2: 数据库连接失败

```bash
# 检查数据库 ID
npx wrangler d1 info zenava-production

# 验证数据库绑定
npx wrangler d1 execute zenava-production --command "SELECT 1"
```

### 问题 3: 静态资源 404

- 检查 `dist/_routes.json` 配置
- 确保静态文件在 `dist/` 目录中
- 检查路由规则是否正确

---

## 📚 参考资源

- [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)
- [Wrangler CLI 文档](https://developers.cloudflare.com/workers/wrangler/)
- [D1 数据库文档](https://developers.cloudflare.com/d1/)

---

## ✅ 部署检查清单

- [ ] Cloudflare 账号已注册
- [ ] Wrangler 已登录
- [ ] 数据库已创建并配置
- [ ] 数据库迁移已应用
- [ ] 项目已构建（`npm run build`）
- [ ] 部署成功
- [ ] 自定义域名已配置（可选）
- [ ] 环境变量已设置（如果需要）
- [ ] 访问测试通过

