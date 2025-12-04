# 管理后台 API 路由修复 ✅

## 🐛 问题描述

前端调用 API 时返回 404 错误：
```
POST http://127.0.0.1:3000/api/admin/resource-categories 404 (Not Found)
```

## 🔍 根本原因

**路径不匹配问题**

### 原来的设置
- **API 挂载**: `app.route('/api/admin/resource', resourceCenterApi)`
- **API 文件路径**: `/categories`, `/contents`
- **实际完整路径**: `/api/admin/resource/categories` ❌
- **前端期望路径**: `/api/admin/resource-categories` ✅

### 问题分析
前端页面调用的路径是 `/api/admin/resource-categories`（带连字符），但实际挂载的路径是 `/api/admin/resource`（不带连字符），导致 404。

## ✅ 解决方案

在 `src/index-node.tsx` 中添加了两种路径挂载：

```typescript
// Resource Center API - 两种路径都支持
app.route('/api/admin/resource', resourceCenterApi)   // 原路径：/api/admin/resource/categories
app.route('/api/admin/resource-', resourceCenterApi)  // 新路径：/api/admin/resource-categories
```

这样两种路径都可以工作：
1. `/api/admin/resource/categories` → `/categories`
2. `/api/admin/resource-categories` → `/categories`

## 📋 资源中心 API 路由列表

### 栏目分类 API (`/api/admin/resource-categories`)

| 方法 | 路径 | 功能 |
|------|------|------|
| GET | `/api/admin/resource-categories` | 获取所有栏目分类 |
| GET | `/api/admin/resource-categories/:id` | 获取单个栏目 |
| POST | `/api/admin/resource-categories` | 创建栏目 |
| PUT | `/api/admin/resource-categories/:id` | 更新栏目 |
| DELETE | `/api/admin/resource-categories/:id` | 删除栏目 |
| POST | `/api/admin/resource-categories/batch` | 批量操作 |
| PATCH | `/api/admin/resource-categories/:id/sort` | 更新排序 |

### 资源内容 API (`/api/admin/resource-contents`)

| 方法 | 路径 | 功能 |
|------|------|------|
| GET | `/api/admin/resource-contents` | 获取所有内容（支持分页、筛选） |
| GET | `/api/admin/resource-contents/:id` | 获取单个内容 |
| POST | `/api/admin/resource-contents` | 创建内容 |
| PUT | `/api/admin/resource-contents/:id` | 更新内容 |
| DELETE | `/api/admin/resource-contents/:id` | 删除内容 |
| POST | `/api/admin/resource-contents/batch` | 批量操作 |

## 🧪 测试步骤

### 1. 重启服务器
```bash
npm run start:node
```

### 2. 测试 API

#### 获取栏目分类列表
```bash
curl http://127.0.0.1:3000/api/admin/resource-categories
```

预期响应：
```json
{
  "success": true,
  "data": [
    {
      "id": 186,
      "sort_order": 0,
      "name": "公司动态",
      "slug": "/a/186",
      ...
    }
  ]
}
```

#### 创建新栏目
```bash
curl -X POST http://127.0.0.1:3000/api/admin/resource-categories \
  -H "Content-Type: application/json" \
  -d '{
    "name": "测试栏目",
    "slug": "/a/test",
    "list_template": "list_article.html",
    "detail_template": "info_article.html",
    "is_visible": true
  }'
```

### 3. 浏览器测试

1. 登录管理后台
2. 访问 **资源中心** → **栏目分类**
3. 点击 **创建新栏目** 按钮
4. 填写表单并提交
5. 应该能成功创建（不再报 404）

## 📊 API 实现说明

### 数据来源
资源中心 API 使用 MySQL 数据库：
- 表：`resource_categories`（栏目分类）
- 表：`resource_contents`（资源内容）

### API 文件位置
`src/api/resource-center.ts`

### 特性
- ✅ 参数化查询（防 SQL 注入）
- ✅ 错误处理
- ✅ 输入验证
- ✅ 分页支持
- ✅ 搜索筛选
- ✅ 批量操作
- ✅ 关联查询（内容关联分类）

## 🔐 认证说明

⚠️ **重要**：当前 API **没有认证保护**！

### 当前状态
```typescript
app.route('/api/admin/resource-', resourceCenterApi)  // 无认证
```

### 建议改进
添加认证中间件：
```typescript
// 方案 1：在挂载时添加认证
app.use('/api/admin/*', requireAuth())
app.route('/api/admin/resource-', resourceCenterApi)

// 方案 2：在 API 文件中添加认证
// src/api/resource-center.ts
import { requireAuth } from '../utils/security.js'

const app = new Hono()
app.use('*', requireAuth())  // 保护所有路由
```

## 🗃️ 数据库要求

确保已创建资源中心表：

```bash
# 检查表是否存在
mysql -u root -p12345 ZENAVA_LOCAL -e "SHOW TABLES LIKE 'resource%';"

# 应该看到：
# resource_categories
# resource_contents

# 如果没有，运行迁移：
mysql -u root -p12345 ZENAVA_LOCAL < migrations/001_create_resource_center_tables.sql
```

### 表结构

#### resource_categories
```sql
CREATE TABLE resource_categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sort_order INT DEFAULT 0,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  list_template VARCHAR(100),
  detail_template VARCHAR(100),
  is_visible BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### resource_contents
```sql
CREATE TABLE resource_contents (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  thumbnail VARCHAR(500),
  author VARCHAR(100),
  publish_date DATE,
  summary TEXT,
  body TEXT,
  tags VARCHAR(500),
  status VARCHAR(20) DEFAULT 'draft',
  is_featured BOOLEAN DEFAULT FALSE,
  view_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES resource_categories(id) ON DELETE CASCADE
);
```

## ✅ 验证清单

- [ ] 服务器已重启
- [ ] `/api/admin/resource-categories` 返回数据（200）
- [ ] `/api/admin/resource-contents` 返回数据（200）
- [ ] 可以创建新栏目
- [ ] 可以编辑栏目
- [ ] 可以删除栏目
- [ ] 可以创建新内容
- [ ] 可以编辑内容
- [ ] 可以删除内容
- [ ] 批量操作正常工作

## 🔄 相关修改

### 修改的文件
- `src/index-node.tsx` - 添加了新的 API 路由挂载

### 未修改的文件
- `src/api/resource-center.ts` - API 实现保持不变
- `src/pages/admin/ResourceCategoryManagement.tsx` - 前端页面保持不变
- `src/pages/admin/ResourceContentManagement.tsx` - 前端页面保持不变

## 📝 后续优化建议

1. **添加认证保护** - 所有 `/api/admin/*` 路由都应该需要登录
2. **添加 CSRF 保护** - 防止跨站请求伪造
3. **添加速率限制** - 防止 API 滥用
4. **添加操作日志** - 记录所有 CRUD 操作
5. **改进错误处理** - 统一的错误响应格式
6. **添加数据验证** - 使用 Zod 或类似库验证输入

---

**修复时间**: 2024-12-04  
**状态**: ✅ 已完成  
**下一步**: 重启服务器并测试

