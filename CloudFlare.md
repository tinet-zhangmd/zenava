# Cloudflare Pages 域名绑定指南

## 🎯 核心答案

**是的！** 如果您有域名，可以：
1. 将域名添加到 Cloudflare（如果还没有）
2. 部署到 Cloudflare Pages
3. 绑定自定义域名
4. 直接通过域名访问

---

## 🚀 快速流程

### 方式 1: 域名已在 Cloudflare 管理

```bash
# 1. 部署到 Cloudflare Pages
npm run deploy:cf

# 2. 绑定域名（在 Dashboard 中或使用命令行）
npx wrangler pages domain add yourdomain.com --project-name zenava-official
```

### 方式 2: 域名未在 Cloudflare 管理

需要先将域名添加到 Cloudflare，然后再绑定。

---

## 📋 详细步骤

### 场景 A: 域名已在 Cloudflare 管理

#### 步骤 1: 部署应用

```bash
npm run build
npm run deploy:cf
```

#### 步骤 2: 绑定域名

**方法 1: 使用命令行（推荐）**

```bash
npx wrangler pages domain add yourdomain.com --project-name zenava-official
```

**方法 2: 在 Dashboard 中配置**

1. 登录 Cloudflare Dashboard
2. 进入 "Workers & Pages" → 选择项目 `zenava-official`
3. 点击 "Custom domains" → "Set up a custom domain"
4. 输入您的域名（如 `zenava.com` 或 `www.zenava.com`）
5. 点击 "Continue"
6. Cloudflare 会自动配置 DNS 记录

#### 步骤 3: 访问

```
https://yourdomain.com
```

---

### 场景 B: 域名未在 Cloudflare 管理

#### 步骤 1: 将域名添加到 Cloudflare

1. 登录 Cloudflare Dashboard
2. 点击 "Add a Site"
3. 输入您的域名（如 `zenava.com`）
4. 选择计划（免费版即可）
5. 按照提示更新域名的 Nameservers（在域名注册商处）

#### 步骤 2: 等待 DNS 生效

通常需要几分钟到几小时，取决于 DNS 传播速度。

#### 步骤 3: 部署应用

```bash
npm run build
npm run deploy:cf
```

#### 步骤 4: 绑定域名

```bash
npx wrangler pages domain add yourdomain.com --project-name zenava-official
```

或在 Dashboard 中配置（同场景 A 的步骤 2）。

---

## 🌐 域名配置示例

### 示例 1: 根域名

```bash
# 绑定根域名
npx wrangler pages domain add zenava.com --project-name zenava-official
```

访问：`https://zenava.com`

### 示例 2: 子域名

```bash
# 绑定 www 子域名
npx wrangler pages domain add www.zenava.com --project-name zenava-official

# 绑定测试子域名
npx wrangler pages domain add test.zenava.com --project-name zenava-official
```

访问：
- `https://www.zenava.com`
- `https://test.zenava.com`

### 示例 3: 多个域名

```bash
# 可以绑定多个域名
npx wrangler pages domain add zenava.com --project-name zenava-official
npx wrangler pages domain add www.zenava.com --project-name zenava-official
npx wrangler pages domain add app.zenava.com --project-name zenava-official
```

---

## 🔧 自动化部署脚本

创建 `deploy-with-domain.sh`：

```bash
#!/bin/bash
# 部署并绑定域名

set -e

PROJECT_NAME="${PROJECT_NAME:-zenava-official}"
DOMAIN="${DOMAIN:-}"

echo "🚀 部署到 Cloudflare Pages"
echo "================================"

# 1. 构建
echo "🔨 构建项目..."
npm run build

# 2. 部署
echo "🚀 部署应用..."
npx wrangler pages deploy dist --project-name "$PROJECT_NAME"

# 3. 绑定域名（如果提供）
if [ -n "$DOMAIN" ]; then
    echo "🌐 绑定域名: $DOMAIN"
    npx wrangler pages domain add "$DOMAIN" --project-name "$PROJECT_NAME" || \
        echo "⚠️  域名绑定失败，可能已存在或域名未在 Cloudflare 管理"
fi

echo ""
echo "✅ 部署完成！"
if [ -n "$DOMAIN" ]; then
    echo "🌐 访问地址: https://$DOMAIN"
else
    echo "🌐 访问地址: https://$PROJECT_NAME.pages.dev"
fi
```

使用方式：
```bash
DOMAIN=zenava.com ./deploy-with-domain.sh
```

---

## 📝 域名管理命令

### 查看已绑定的域名

```bash
npx wrangler pages domain list --project-name zenava-official
```

### 删除域名绑定

```bash
npx wrangler pages domain remove yourdomain.com --project-name zenava-official
```

### 验证域名配置

```bash
# 检查 DNS 记录
dig yourdomain.com

# 应该看到 CNAME 记录指向 pages.dev
```

---

## ⚙️ DNS 配置说明

### 自动配置（推荐）

当您在 Cloudflare Dashboard 中绑定域名时，Cloudflare 会自动创建：

- **CNAME 记录**：`yourdomain.com` → `zenava-official.pages.dev`
- **SSL 证书**：自动申请和续期

### 手动配置（如果需要）

如果自动配置失败，可以手动添加 DNS 记录：

1. 进入 Cloudflare Dashboard → 选择域名
2. 进入 "DNS" → "Records"
3. 添加记录：
   - **类型**: CNAME
   - **名称**: @（根域名）或 www（子域名）
   - **目标**: `zenava-official.pages.dev`
   - **代理状态**: 已代理（橙色云朵）

---

## 🔒 SSL/HTTPS 配置

### 自动配置（默认）

Cloudflare 会自动：
- ✅ 申请 SSL 证书
- ✅ 配置 HTTPS 重定向
- ✅ 自动续期证书

### 验证 SSL

```bash
# 检查 SSL 证书
curl -I https://yourdomain.com

# 应该返回 200 或 301/302
```

---

## 🎯 完整部署流程（带域名）

### 首次部署

```bash
# 1. 登录 Cloudflare
npx wrangler login

# 2. 将域名添加到 Cloudflare（如果还没有）
# 在 Dashboard 中操作

# 3. 构建和部署
npm run build
npm run deploy:cf

# 4. 绑定域名
npx wrangler pages domain add yourdomain.com --project-name zenava-official
```

### 后续部署

```bash
# 只需构建和部署，域名绑定是持久的
npm run build
npm run deploy:cf
```

---

## ✅ 验证部署

### 1. 检查部署状态

```bash
npx wrangler pages deployment list --project-name zenava-official
```

### 2. 检查域名绑定

```bash
npx wrangler pages domain list --project-name zenava-official
```

### 3. 测试访问

```bash
# 测试默认域名
curl https://zenava-official.pages.dev

# 测试自定义域名
curl https://yourdomain.com
```

---

## 💡 最佳实践

### 1. 同时绑定根域名和 www

```bash
npx wrangler pages domain add zenava.com --project-name zenava-official
npx wrangler pages domain add www.zenava.com --project-name zenava-official
```

### 2. 配置重定向（在 Cloudflare Dashboard）

- 将 `www` 重定向到根域名，或
- 将根域名重定向到 `www`

### 3. 使用环境变量

```bash
# 在 .env 或环境变量中设置
export CLOUDFLARE_PROJECT_NAME=zenava-official
export CLOUDFLARE_DOMAIN=zenava.com

# 在脚本中使用
npx wrangler pages deploy dist --project-name "$CLOUDFLARE_PROJECT_NAME"
npx wrangler pages domain add "$CLOUDFLARE_DOMAIN" --project-name "$CLOUDFLARE_PROJECT_NAME"
```

---

## 🆘 常见问题

### Q: 域名绑定失败？

**可能原因：**
1. 域名未在 Cloudflare 管理
2. DNS 记录未正确配置
3. 域名已被其他项目使用

**解决方法：**
1. 确保域名已添加到 Cloudflare
2. 检查 DNS 记录
3. 等待 DNS 传播（最多 24 小时）

### Q: HTTPS 不工作？

**解决方法：**
1. 确保域名在 Cloudflare 管理
2. SSL/TLS 模式设置为 "Full" 或 "Full (strict)"
3. 等待 SSL 证书自动申请（通常几分钟）

### Q: 如何查看域名状态？

```bash
# 查看所有绑定的域名
npx wrangler pages domain list --project-name zenava-official

# 查看项目详情
npx wrangler pages project get zenava-official
```

---

## 📚 总结

**是的，可以直接用 Wrangler 部署到域名！**

流程：
1. ✅ 部署到 Cloudflare Pages（`npm run deploy:cf`）
2. ✅ 绑定域名（命令行或 Dashboard）
3. ✅ 自动配置 SSL/HTTPS
4. ✅ 通过域名访问

**关键点：**
- 域名需要在 Cloudflare 管理
- 绑定是持久的，后续部署不需要重新绑定
- SSL 证书自动配置

