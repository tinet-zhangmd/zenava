# Cloudflare 部署快速开始

## 🚀 三步部署

### 1. 登录 Cloudflare

```bash
npx wrangler login
```

会打开浏览器，完成登录。

### 2. 构建项目

```bash
npm run build
```

### 3. 部署

```bash
# 方式 1: 使用脚本（推荐）
npm run deploy:cf

# 方式 2: 使用 npm 脚本
npm run deploy:prod

# 方式 3: 直接命令
npx wrangler pages deploy dist --project-name zenava-official
```

---

## ✅ 完成！

部署成功后，访问：
```
https://zenava-official.pages.dev
```

---

## 📋 完整流程（首次部署）

### 步骤 1: 登录和准备

```bash
# 登录 Cloudflare
npx wrangler login
```

### 步骤 2: 创建数据库（如果需要）

```bash
# 创建 D1 数据库
npx wrangler d1 create zenava-production

# 复制返回的 database_id，更新到 wrangler.jsonc
```

### 步骤 3: 应用数据库迁移

```bash
# 更新 wrangler.jsonc 中的 database_id 后
npm run db:migrate:prod
```

### 步骤 4: 部署应用

```bash
npm run deploy:cf
```

---

## 🔄 后续部署

只需两步：

```bash
npm run build
npm run deploy:cf
```

---

## 🌐 绑定自定义域名

1. 登录 Cloudflare Dashboard
2. 进入 "Workers & Pages" → 选择项目
3. 点击 "Custom domains" → "Set up a custom domain"
4. 输入域名并配置 DNS

---

## 📝 常用命令

```bash
# 查看部署列表
npx wrangler pages deployment list --project-name zenava-official

# 查看实时日志
npx wrangler tail --project-name zenava-official

# 查看项目信息
npx wrangler pages project get zenava-official
```

---

## ⚠️ 注意事项

1. **首次部署需要登录**：`npx wrangler login`
2. **数据库 ID**：确保 `wrangler.jsonc` 中的 `database_id` 是生产环境的 ID
3. **环境变量**：敏感信息使用 `wrangler pages secret put`

---

## 🆘 遇到问题？

查看详细文档：`CLOUDFLARE_DEPLOYMENT_GUIDE.md`

