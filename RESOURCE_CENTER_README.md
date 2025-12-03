# 资源中心管理系统 (Resource Center Management System)

## 📚 功能概述 (Features Overview)

ZENAVA 资源中心管理系统提供了完整的后台管理功能，用于管理网站的资源内容，包括：

- ✅ **栏目分类管理** - 创建、编辑、删除资源分类
- ✅ **内容列表管理** - 管理文章、视频、下载等多种类型的资源
- ✅ **批量操作** - 支持批量删除、批量排序
- ✅ **模板配置** - 支持多种展示模板（文章列表、视频列表、下载列表）
- ✅ **富文本编辑器** - 基于 Quill 的富文本内容编辑
- ✅ **SEO 优化** - 内置 SEO 字段（Meta Title, Description, Keywords）
- ✅ **发布管理** - 草稿、已发布、已归档等多种状态管理

---

## 🗂️ 文件结构 (File Structure)

```
webapp/
├── src/
│   ├── api/
│   │   └── resource-center.ts          # 资源中心 API 接口
│   ├── lib/
│   │   └── mysql.ts                    # MySQL 数据库连接池
│   ├── pages/
│   │   └── admin/
│   │       ├── ResourceCategoryManagement.tsx  # 栏目分类管理页面
│   │       └── ResourceContentManagement.tsx   # 内容列表管理页面
│   └── index.tsx                       # 主路由配置（已注册资源中心路由）
├── migrations/
│   └── 001_create_resource_center_tables.sql   # 数据库表结构
├── scripts/
│   └── init-resource-center-db.ts      # 数据库初始化脚本
└── RESOURCE_CENTER_README.md           # 本文档
```

---

## 🚀 快速开始 (Quick Start)

### 1️⃣ 前置条件 (Prerequisites)

- ✅ Node.js 18+ 已安装
- ✅ MySQL 5.7+ 或 8.0+ 已安装并运行
- ✅ 数据库 `ZENAVA_LOCAL` 已创建

**创建数据库（如果尚未创建）：**

```bash
mysql -u root -p
CREATE DATABASE ZENAVA_LOCAL CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
```

---

### 2️⃣ 配置数据库连接 (Configure Database)

**方式1：环境变量（推荐）**

创建 `.env` 文件：

```env
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_DATABASE=ZENAVA_LOCAL
MYSQL_USER=root
MYSQL_PASSWORD=your_password_here
```

**方式2：修改代码**

编辑 `src/lib/mysql.ts` 中的连接配置：

```typescript
export const pool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  database: 'ZENAVA_LOCAL',
  user: 'root',
  password: 'your_password_here',
  // ...
});
```

---

### 3️⃣ 安装依赖 (Install Dependencies)

```bash
cd /home/user/webapp
npm install
```

项目已自动安装 `mysql2` 包。

---

### 4️⃣ 初始化数据库 (Initialize Database)

运行数据库初始化脚本：

```bash
cd /home/user/webapp
npx tsx scripts/init-resource-center-db.ts
```

**预期输出：**

```
🚀 开始初始化资源中心数据库...

📊 数据库配置:
   Host: localhost
   Port: 3306
   Database: ZENAVA_LOCAL
   User: root

📡 正在连接数据库...
✅ 数据库连接成功

📄 读取 SQL 文件: /home/user/webapp/migrations/001_create_resource_center_tables.sql
✅ SQL 文件读取成功 (5536 字符)

⚙️  正在执行数据库迁移...
✅ 数据库迁移执行成功

🔍 验证表结构...
📊 已创建的表:
   ✓ resource_categories
   ✓ resource_contents

📦 检查示例数据...
   ✓ resource_categories: 5 条记录
   ✓ resource_contents: 6 条记录

✨ 资源中心数据库初始化完成！
```

---

### 5️⃣ 启动开发服务器 (Start Dev Server)

```bash
cd /home/user/webapp
npm run dev
# 或使用 PM2
npm run pm2:start
```

服务启动后，访问：

- **栏目分类管理**: [http://localhost:3000/ticloudadmin/resource-categories](http://localhost:3000/ticloudadmin/resource-categories)
- **内容列表管理**: [http://localhost:3000/ticloudadmin/resource-contents](http://localhost:3000/ticloudadmin/resource-contents)

---

## 🗄️ 数据库表结构 (Database Schema)

### 📁 `resource_categories` (资源栏目分类表)

| 字段名 | 类型 | 说明 | 示例 |
|--------|------|------|------|
| `id` | INT | 主键ID | 1 |
| `name` | VARCHAR(100) | 分类名称 | "技术文档" |
| `link` | VARCHAR(255) | 链接地址 | "/resources/tech-docs" |
| `category_template` | ENUM | 分类模板 | 'list_article', 'list_video', 'list_download' |
| `page_template` | ENUM | 页面模板 | 'list_article', 'list_video', 'list_download' |
| `is_displayed` | TINYINT(1) | 是否显示 | 1=显示, 0=隐藏 |
| `sort_order` | INT | 排序权重 | 10 (数值越小越靠前) |
| `created_at` | TIMESTAMP | 创建时间 | 2024-01-01 12:00:00 |
| `updated_at` | TIMESTAMP | 更新时间 | 2024-01-02 15:30:00 |

---

### 📝 `resource_contents` (资源内容表)

| 字段名 | 类型 | 说明 | 示例 |
|--------|------|------|------|
| `id` | INT | 主键ID | 1 |
| `category_id` | INT | 所属分类ID | 1 |
| `title` | VARCHAR(255) | 内容标题 | "ZENAVA API 开发指南" |
| `content` | TEXT | 内容详情（富文本） | `<h1>标题</h1><p>内容...</p>` |
| `author` | VARCHAR(100) | 作者 | "技术团队" |
| `cover_image` | VARCHAR(255) | 封面图片 | "/assets/images/cover.jpg" |
| `tags` | VARCHAR(255) | 标签（逗号分隔） | "API,开发,指南" |
| `download_url` | VARCHAR(255) | 下载链接 | "https://example.com/file.zip" |
| `video_url` | VARCHAR(255) | 视频链接 | "https://youtube.com/watch?v=xxx" |
| `status` | ENUM | 发布状态 | 'draft', 'published', 'archived' |
| `published_at` | TIMESTAMP | 发布时间 | 2024-01-01 10:00:00 |
| `views` | INT | 浏览次数 | 1234 |
| `downloads` | INT | 下载次数 | 567 |
| `sort_order` | INT | 排序权重 | 20 |
| `meta_title` | VARCHAR(255) | SEO标题 | "ZENAVA API 开发指南 - 完整文档" |
| `meta_description` | TEXT | SEO描述 | "详细的 API 开发指南..." |
| `meta_keywords` | VARCHAR(255) | SEO关键词 | "ZENAVA,API,开发" |
| `created_at` | TIMESTAMP | 创建时间 | 2024-01-01 09:00:00 |
| `updated_at` | TIMESTAMP | 更新时间 | 2024-01-02 14:00:00 |

---

## 🔌 API 接口文档 (API Endpoints)

所有 API 接口前缀: `/api/resource-center`

### 1️⃣ 栏目分类 API (Categories API)

#### ✅ 获取分类列表

```http
GET /api/resource-center/categories
```

**响应示例：**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "技术文档",
      "link": "/resources/tech-docs",
      "category_template": "list_article",
      "page_template": "list_article",
      "is_displayed": 1,
      "sort_order": 10
    }
  ]
}
```

#### ✅ 创建分类

```http
POST /api/resource-center/categories
Content-Type: application/json

{
  "name": "新分类",
  "link": "/resources/new-category",
  "category_template": "list_article",
  "page_template": "list_article",
  "is_displayed": 1,
  "sort_order": 50
}
```

#### ✅ 更新分类

```http
PUT /api/resource-center/categories/:id
Content-Type: application/json

{
  "name": "更新后的分类名",
  "sort_order": 15
}
```

#### ✅ 删除分类

```http
DELETE /api/resource-center/categories/:id
```

---

### 2️⃣ 内容管理 API (Contents API)

#### ✅ 获取内容列表

```http
GET /api/resource-center/contents?category_id=1&status=published&limit=20&offset=0
```

**查询参数：**

- `category_id` (可选): 按分类筛选
- `status` (可选): 按状态筛选 (draft/published/archived)
- `search` (可选): 搜索关键词（标题/作者）
- `limit` (可选): 每页数量（默认 20）
- `offset` (可选): 偏移量（默认 0）

**响应示例：**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "category_id": 1,
      "title": "ZENAVA API 开发指南",
      "author": "技术团队",
      "cover_image": "/assets/images/guide.jpg",
      "status": "published",
      "views": 1234,
      "published_at": "2024-01-01T10:00:00Z"
    }
  ],
  "total": 50
}
```

#### ✅ 获取单个内容详情

```http
GET /api/resource-center/contents/:id
```

#### ✅ 创建内容

```http
POST /api/resource-center/contents
Content-Type: application/json

{
  "category_id": 1,
  "title": "新内容标题",
  "content": "<h1>富文本内容</h1>",
  "author": "作者名",
  "cover_image": "/assets/images/cover.jpg",
  "tags": "标签1,标签2",
  "status": "draft",
  "meta_title": "SEO 标题",
  "meta_description": "SEO 描述",
  "meta_keywords": "关键词1,关键词2"
}
```

#### ✅ 更新内容

```http
PUT /api/resource-center/contents/:id
Content-Type: application/json

{
  "title": "更新后的标题",
  "status": "published",
  "published_at": "2024-01-15T10:00:00Z"
}
```

#### ✅ 删除内容

```http
DELETE /api/resource-center/contents/:id
```

---

## 🎨 前端页面功能 (Frontend Features)

### 📁 栏目分类管理页面

**路由**: `/ticloudadmin/resource-categories`

**功能列表：**

- ✅ 显示所有分类列表（表格形式）
- ✅ 新增分类（模态框表单）
- ✅ 编辑分类（模态框表单）
- ✅ 删除分类（带确认提示）
- ✅ 批量删除（多选）
- ✅ 批量排序（拖拽或输入数值）
- ✅ 显示/隐藏开关（is_displayed）
- ✅ 模板选择（list_article / list_video / list_download）

---

### 📝 内容列表管理页面

**路由**: `/ticloudadmin/resource-contents`

**功能列表：**

- ✅ 显示所有内容列表（表格形式）
- ✅ 新增内容（完整表单 + 富文本编辑器）
- ✅ 编辑内容（完整表单 + 富文本编辑器）
- ✅ 删除内容（带确认提示）
- ✅ 批量删除（多选）
- ✅ 按分类筛选
- ✅ 按状态筛选（草稿/已发布/已归档）
- ✅ 搜索功能（标题/作者）
- ✅ 分页功能
- ✅ 发布状态切换
- ✅ 富文本编辑（基于 Quill Editor）
- ✅ 图片上传（封面图）
- ✅ SEO 字段编辑

---

## 📸 UI/UX 设计 (Design)

### 主题色系 (Color Scheme)

- **主色调**: Teal / Cyan（青绿色）
- **辅助色**: Gray（灰色）
- **强调色**: Red（红色 - 删除按钮）
- **成功色**: Green（绿色 - 成功提示）

### 布局特点 (Layout Features)

- ✅ 响应式设计（支持桌面/平板/移动端）
- ✅ 卡片式布局（Cards）
- ✅ 模态框表单（Modal Forms）
- ✅ 表格展示（Responsive Tables）
- ✅ Toast 提示（Success/Error/Info）
- ✅ Font Awesome 图标
- ✅ Tailwind CSS 样式

---

## 🧪 测试建议 (Testing Checklist)

### ✅ 功能测试

- [ ] 创建新分类
- [ ] 编辑已有分类
- [ ] 删除分类
- [ ] 批量删除分类
- [ ] 调整分类排序
- [ ] 切换显示/隐藏状态
- [ ] 创建新内容（文章/视频/下载）
- [ ] 编辑已有内容
- [ ] 删除内容
- [ ] 批量删除内容
- [ ] 按分类筛选
- [ ] 按状态筛选
- [ ] 搜索功能
- [ ] 分页功能
- [ ] 富文本编辑器（格式化、插入图片、链接）
- [ ] SEO 字段保存

### ✅ 响应式测试

- [ ] 桌面端（1920x1080）
- [ ] 平板端（768x1024）
- [ ] 移动端（375x667）

### ✅ 浏览器兼容性

- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

---

## 🔧 故障排除 (Troubleshooting)

### ❌ 问题1: 数据库连接失败

**错误信息：**

```
Error: connect ECONNREFUSED 127.0.0.1:3306
```

**解决方案：**

1. 检查 MySQL 服务是否运行：`sudo service mysql status`
2. 验证数据库配置（`src/lib/mysql.ts` 或 `.env`）
3. 确认数据库名称、用户名、密码正确

---

### ❌ 问题2: 表不存在

**错误信息：**

```
Error: Table 'ZENAVA_LOCAL.resource_categories' doesn't exist
```

**解决方案：**

重新运行数据库初始化脚本：

```bash
npx tsx scripts/init-resource-center-db.ts
```

---

### ❌ 问题3: API 请求 404

**错误信息：**

```
GET /api/resource-center/categories 404 Not Found
```

**解决方案：**

1. 确认 `src/index.tsx` 中已注册路由：
   ```typescript
   app.route('/api/resource-center', resourceCenterApi)
   ```
2. 重启开发服务器：`npm run pm2:restart`

---

## 📞 技术支持 (Support)

如有问题或建议，请联系：

- **GitHub Repository**: [https://github.com/Tinet-zhangmd/ZENAVA](https://github.com/Tinet-zhangmd/ZENAVA)
- **Pull Request**: [https://github.com/Tinet-zhangmd/ZENAVA/pull/1](https://github.com/Tinet-zhangmd/ZENAVA/pull/1)
- **Documentation**: 项目根目录下的 Markdown 文件

---

## 📝 变更日志 (Changelog)

### v1.0.0 (2024-01-XX)

- ✅ 初始版本发布
- ✅ 栏目分类管理功能
- ✅ 内容列表管理功能
- ✅ 批量操作支持
- ✅ 富文本编辑器集成
- ✅ SEO 字段支持
- ✅ MySQL 数据库集成
- ✅ 完整 API 接口

---

## 📄 许可证 (License)

MIT License - ZENAVA Team

---

**感谢使用 ZENAVA 资源中心管理系统！** 🎉
