# Zenava 后端管理系统 - 快速指南

## 🚀 快速开始

### 访问管理后台
- **URL**: http://localhost:3000/ticloudadmin
- **用户名**: ticloudhoutai@zenava.ai
- **密码**: tinet.Az2167Hk

⚠️ **生产环境必须修改密码！**

---

## 📚 功能模块导航

| 模块 | 路径 | 说明 |
|------|------|------|
| 🏠 控制台 | `/ticloudadmin` | 仪表盘和快速操作 |
| 📄 内容管理 | `/ticloudadmin/content` | 页面内容编辑 |
| 🔍 SEO 管理 | `/ticloudadmin/seo` | SEO 优化配置 |
| 🌍 多语言管理 | `/ticloudadmin/i18n` | 翻译管理 |
| 🖼️ 媒体库 | `/ticloudadmin/media` | 图片、视频管理 |
| 📦 公共内容 | `/ticloudadmin/common-content` | 导航栏和页脚 |
| 📁 资源分类 | `/ticloudadmin/resource-categories` | 资源中心分类管理 |
| 📝 资源内容 | `/ticloudadmin/resource-contents` | 资源中心内容管理 |
| 🚀 发布管理 | `/ticloudadmin/publish` | 部署到生产环境 |
| ⚙️ 系统设置 | `/ticloudadmin/settings` | 全局配置 |
| 📋 操作日志 | `/ticloudadmin/logs` | 操作记录 |

---

## 🗄️ 数据库设置

### 1. 创建 MySQL 数据库

```bash
# 创建数据库
mysql -u root -p12345 -e "CREATE DATABASE IF NOT EXISTS ZENAVA_LOCAL CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
```

### 2. 导入表结构

```bash
# 依次导入所有迁移文件
mysql -u root -p12345 ZENAVA_LOCAL < migrations/0001_initial_schema.sql
mysql -u root -p12345 ZENAVA_LOCAL < migrations/0002_cms_schema.sql
mysql -u root -p12345 ZENAVA_LOCAL < migrations/0004_common_content.sql
mysql -u root -p12345 ZENAVA_LOCAL < migrations/0008_unified_navigation.sql
mysql -u root -p12345 ZENAVA_LOCAL < migrations/001_create_resource_center_tables.sql
```

### 3. 导入种子数据（可选）

```bash
mysql -u root -p12345 ZENAVA_LOCAL < seed-cms.sql
```

### 4. 配置环境变量

```bash
# .env
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=12345
MYSQL_DATABASE=ZENAVA_LOCAL

# 管理员账号（生产环境务必修改）
ADMIN_EMAIL=ticloudhoutai@zenava.ai
ADMIN_PASSWORD=tinet.Az2167Hk
```

---

## 📊 核心数据表

| 表名 | 用途 |
|------|------|
| `pages` | 页面基本信息 |
| `content_modules` | 页面内容模块 |
| `page_seo` | SEO 配置 |
| `common_content` | 公共内容（导航、页脚） |
| `unified_navigation` | 统一导航菜单 |
| `resource_categories` | 资源分类 |
| `resource_contents` | 资源内容 |
| `media` | 媒体库 |

---

## 🔌 API 接口快速参考

### CMS API

```bash
# 获取页面列表
GET /api/cms/pages?language=en&status=published

# 创建/更新页面
POST /api/cms/pages
Content-Type: application/json
{
  "slug": "about",
  "language": "en",
  "title": "About Us",
  "status": "draft",
  "seo": {...},
  "modules": [...]
}

# 获取媒体列表
GET /api/cms/media?folder=/resources

# 上传媒体
POST /api/upload
Content-Type: multipart/form-data
```

### 公共内容 API

```bash
# 获取导航栏
GET /api/common-content/navbar?language=en

# 更新导航栏
PUT /api/common-content/navbar
Content-Type: application/json

# 获取页脚
GET /api/common-content/footer?language=en

# 更新页脚
PUT /api/common-content/footer
```

### 资源中心 API

```bash
# 获取资源分类
GET /api/resource-center/categories?is_active=true

# 创建分类
POST /api/resource-center/categories
Content-Type: application/json

# 获取资源内容
GET /api/resource-center/contents?category_id=1&status=published&page=1&limit=20

# 创建内容
POST /api/resource-center/contents
Content-Type: application/json

# 更新内容
PUT /api/resource-center/contents/:id

# 删除内容
DELETE /api/resource-center/contents/:id
```

---

## 🛡️ 安全清单

### 开发环境
- ✅ 使用默认密码快速开始
- ✅ Cookie-based Session 认证
- ✅ CSRF Token 保护
- ✅ 速率限制（20次/分钟登录尝试）

### 生产环境必做
- [ ] 修改 `ADMIN_EMAIL` 和 `ADMIN_PASSWORD`
- [ ] 配置 HTTPS
- [ ] 启用安全响应头
- [ ] 配置数据库备份
- [ ] 设置日志收集
- [ ] 配置错误监控
- [ ] 限制管理后台 IP 访问（可选）

---

## 🔧 常用操作

### 添加新的管理页面

1. **创建页面组件** (`src/pages/admin/NewFeature.tsx`)
```tsx
export function NewFeature() {
  return (
    <div class="space-y-6">
      <h2 class="text-2xl font-bold">新功能</h2>
      {/* 页面内容 */}
    </div>
  )
}
```

2. **添加路由** (`src/index.tsx`)
```typescript
app.get('/ticloudadmin/new-feature', requireAuth(), (c) => {
  return c.html(
    <AdminLayout title="新功能" currentPath="/ticloudadmin/new-feature">
      <NewFeature />
    </AdminLayout>
  )
})
```

3. **更新侧边栏** (`src/pages/admin/AdminLayout.tsx`)
```tsx
<a href="/ticloudadmin/new-feature"
   class={`flex items-center px-4 py-3 rounded-lg ${currentPath.startsWith('/ticloudadmin/new-feature') ? 'active' : ''}`}>
  <i class="fas fa-star mr-3"></i>
  新功能
</a>
```

### 添加新的 API 端点

1. **创建 API 文件** (`src/api/new-feature.tsx`)
```typescript
import { Hono } from 'hono'

const newFeatureApi = new Hono()

newFeatureApi.get('/', async (c) => {
  const results = await c.env.DB.prepare('SELECT * FROM table').all()
  return c.json({ success: true, data: results })
})

newFeatureApi.post('/', async (c) => {
  const data = await c.req.json()
  const result = await c.env.DB.prepare('INSERT INTO table ...').run()
  return c.json({ success: true, data: { id: result.meta.last_row_id } })
})

export default newFeatureApi
```

2. **注册路由** (`src/index.tsx`)
```typescript
import newFeatureApi from './api/new-feature'
app.route('/api/new-feature', newFeatureApi)
```

---

## 📖 详细文档

完整的后端管理系统规则和开发指南，请参考：
👉 `.cursor/rules/13-admin-system.mdc`

---

## 🆘 常见问题

### Q: 忘记管理员密码怎么办？
A: 修改 `.env` 文件中的 `ADMIN_PASSWORD` 或在代码 `src/index.tsx` 中修改默认密码。

### Q: 如何添加多个管理员？
A: 需要创建 `admin_users` 表并修改登录逻辑，参考详细文档。

### Q: 数据库连接失败？
A: 检查 `.env` 中的数据库配置，确保 MySQL 服务已启动。

### Q: 登录后立即退出？
A: 检查 Cookie 配置，确保 Session 正常保存。

### Q: API 返回 401 错误？
A: 检查是否已登录，以及 `requireAuth()` 中间件是否正确配置。

---

## 📞 支持

- 📧 Email: support@zenava.ai
- 📚 文档: `.cursor/rules/`
- 🐛 Issues: 项目 GitHub 仓库

---

**最后更新**: 2024-12-04

