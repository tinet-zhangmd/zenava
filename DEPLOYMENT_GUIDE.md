# Zenava AI Web Application - 部署指南

## 📦 项目备份下载

### 下载链接
**🔗 备份文件下载地址**: 
```
https://page.gensparksite.com/project_backups/toolu_01DQpuV2w8sXAgbWrUENjZVR.tar.gz
```

- **文件大小**: 2.01 MB
- **备份时间**: 2025-01-03
- **文件格式**: tar.gz 压缩包

## 🚀 部署步骤

### 1. 下载并解压备份

```bash
# 下载备份文件
wget https://page.gensparksite.com/project_backups/toolu_01DQpuV2w8sXAgbWrUENjZVR.tar.gz

# 或使用 curl
curl -O https://page.gensparksite.com/project_backups/toolu_01DQpuV2w8sXAgbWrUENjZVR.tar.gz

# 解压文件
tar -xzf toolu_01DQpuV2w8sXAgbWrUENjZVR.tar.gz

# 进入项目目录
cd webapp
```

### 2. 安装依赖

```bash
# 安装 Node.js 依赖
npm install
```

### 3. 配置环境变量

创建 `.dev.vars` 文件用于本地开发：
```bash
# 复制示例配置
cp .dev.vars.example .dev.vars

# 编辑配置文件，添加必要的环境变量
nano .dev.vars
```

### 4. 本地开发运行

```bash
# 构建项目
npm run build

# 使用 PM2 启动（推荐）
pm2 start ecosystem.config.cjs

# 或直接使用 wrangler
npx wrangler pages dev dist --d1=webapp-production --local --ip 0.0.0.0 --port 3000
```

### 5. 部署到 Cloudflare Pages

#### 准备工作
1. 注册 Cloudflare 账号
2. 获取 Cloudflare API Token
3. 安装 wrangler CLI（已包含在项目依赖中）

#### 配置 Cloudflare
```bash
# 登录 Cloudflare
npx wrangler login

# 或使用 API Token
export CLOUDFLARE_API_TOKEN="your-api-token-here"
```

#### 创建数据库（如果需要）
```bash
# 创建 D1 数据库
npx wrangler d1 create webapp-production

# 将返回的 database_id 更新到 wrangler.jsonc 文件中
```

#### 应用数据库迁移
```bash
# 应用迁移到生产环境
npx wrangler d1 migrations apply webapp-production

# 应用种子数据（可选）
npx wrangler d1 execute webapp-production --file=./seed.sql
```

#### 部署到 Cloudflare Pages
```bash
# 创建 Pages 项目
npx wrangler pages project create zenava-webapp \
  --production-branch main \
  --compatibility-date 2024-01-01

# 部署项目
npm run deploy

# 或手动指定项目名称
npx wrangler pages deploy dist --project-name zenava-webapp
```

## 📁 项目结构

```
webapp/
├── src/                    # 源代码
│   ├── components/         # React/JSX 组件
│   ├── pages/             # 页面组件
│   ├── utils/             # 工具函数
│   └── index.tsx          # 主入口文件
├── public/                # 静态资源
│   └── static/            # CSS、JS、图片等
├── migrations/            # 数据库迁移文件
├── dist/                  # 构建输出
├── .wrangler/             # Wrangler 本地状态
├── package.json           # 依赖配置
├── wrangler.jsonc         # Cloudflare 配置
├── ecosystem.config.cjs   # PM2 配置
└── README.md              # 项目说明

```

## ⚙️ 配置说明

### wrangler.jsonc
主要的 Cloudflare 配置文件，包含：
- 项目名称
- D1 数据库绑定
- 兼容性设置

### ecosystem.config.cjs
PM2 进程管理配置，用于本地开发

### package.json 脚本
- `npm run build` - 构建项目
- `npm run dev` - 本地开发
- `npm run deploy` - 部署到 Cloudflare
- `npm run db:migrate:local` - 应用本地数据库迁移
- `npm run db:migrate:prod` - 应用生产数据库迁移

## 🔑 环境变量

需要配置的环境变量：
- `CLOUDFLARE_API_TOKEN` - Cloudflare API 令牌
- `DATABASE_ID` - D1 数据库 ID（在 wrangler.jsonc 中配置）

## 🌍 访问地址

部署成功后，您将获得：
- **生产环境**: `https://zenava-webapp.pages.dev`
- **预览环境**: `https://<branch>.zenava-webapp.pages.dev`
- **自定义域名**: 可在 Cloudflare Dashboard 配置

## ✅ 功能清单

项目包含以下完整功能：
- ✅ 多语言支持（英语、日语、中文）
- ✅ 响应式设计（移动端优化）
- ✅ CMS 内容管理系统
- ✅ 管理后台
- ✅ D1 数据库集成
- ✅ 安全防护（XSS、CSRF）
- ✅ SEO 优化
- ✅ 统一导航和页脚
- ✅ 多个业务场景页面
- ✅ 联系表单
- ✅ CTA 按钮和转换优化

## 🆘 故障排除

### 常见问题

1. **构建失败**
   - 确保 Node.js 版本 >= 16
   - 清除缓存：`rm -rf node_modules dist .wrangler`
   - 重新安装依赖：`npm install`

2. **数据库连接失败**
   - 检查 database_id 是否正确
   - 确认数据库已创建
   - 应用迁移：`npm run db:migrate:prod`

3. **部署失败**
   - 验证 API Token 权限
   - 检查项目名称是否唯一
   - 查看错误日志：`npx wrangler tail`

## 📞 支持

如需技术支持，请联系：
- Email: marketing@zenava.ai
- 项目仓库: [GitHub 地址]

---
**最后更新**: 2025-01-03
**版本**: 1.0.0