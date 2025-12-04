# 表结构映射修复 ✅

## 🐛 问题
```
Unknown column 'slug' in 'field list'
```

API 代码使用的字段名与实际 MySQL 表结构不匹配。

## 🔍 字段映射关系

| API/前端使用 | MySQL 实际字段 | 说明 |
|-------------|---------------|------|
| `slug` | `link` | URL 链接 |
| `list_template` | `category_template` | 列表模板 |
| `detail_template` | `page_template` | 详情模板 |
| `is_visible` | `is_displayed` | 是否显示 |

## ✅ 解决方案

### 修改的 API

#### 1. GET - 获取栏目列表
```typescript
// 使用 SQL 别名映射字段
SELECT id, sort_order, name, 
       link as slug,                    // 映射
       category_template as list_template,  // 映射
       page_template as detail_template,    // 映射
       is_displayed as is_visible,          // 映射
       created_at, updated_at 
FROM resource_categories
```

#### 2. POST - 创建栏目
```typescript
// 使用实际表字段
INSERT INTO resource_categories 
  (sort_order, name, link, category_template, page_template, is_displayed) 
VALUES (?, ?, ?, ?, ?, ?)
```

#### 3. PUT - 更新栏目
```typescript
// 使用实际表字段
UPDATE resource_categories 
SET sort_order = ?, name = ?, link = ?, 
    category_template = ?, page_template = ?, is_displayed = ?
WHERE id = ?
```

## 📊 实际表结构

### resource_categories
```sql
CREATE TABLE `resource_categories` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `link` varchar(255) DEFAULT NULL,                    -- ⚠️ 不是 slug
  `category_template` enum(...) DEFAULT 'list_article', -- ⚠️ 不是 list_template
  `page_template` enum(...) DEFAULT 'list_article',     -- ⚠️ 不是 detail_template
  `is_displayed` tinyint(1) DEFAULT '1',                -- ⚠️ 不是 is_visible
  `sort_order` int unsigned DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_sort_order` (`sort_order`),
  KEY `idx_is_displayed` (`is_displayed`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

## 🚀 测试步骤

### 1. 重启服务器
```bash
# 服务器应该已经在运行，如果不在运行：
npm run start:node
```

### 2. 测试创建栏目
```bash
curl -X POST http://127.0.0.1:3000/api/admin/resource-categories \
  -H "Content-Type: application/json" \
  -d '{
    "name": "测试栏目",
    "slug": "/test",
    "list_template": "list_article",
    "detail_template": "list_article",
    "sort_order": 0,
    "is_visible": true
  }'
```

应该返回：
```json
{
  "success": true,
  "data": {
    "id": 11,
    "sort_order": 0,
    "name": "测试栏目",
    "slug": "/test",
    "list_template": "list_article",
    "detail_template": "list_article",
    "is_visible": true
  }
}
```

### 3. 测试获取栏目列表
```bash
curl http://127.0.0.1:3000/api/admin/resource-categories
```

应该返回所有栏目，字段名为前端期望的格式（slug, list_template, 等）。

### 4. 验证数据库
```bash
mysql -u root -p12345 ZENAVA_LOCAL -e "SELECT id, name, link FROM resource_categories;"
```

应该能看到新创建的记录。

## ⚙️ 设计说明

### 为什么不改表结构？

**优点：**
- ✅ 保持现有数据完整性
- ✅ 不影响其他可能依赖此表的代码
- ✅ 更安全，不需要数据迁移

### 为什么不改前端/API接口？

**缺点：**
- ❌ 需要修改所有前端代码
- ❌ 需要修改管理页面组件
- ❌ 破坏 API 一致性

### 当前方案：在 SQL 层做映射

**优点：**
- ✅ 只需修改 API 代码
- ✅ 前端/管理页面无需改动
- ✅ API 接口保持一致
- ✅ 使用 SQL 别名，性能无损

## 📝 后续工作

### 已完成
- ✅ GET /api/admin/resource-categories (列表)
- ✅ POST /api/admin/resource-categories (创建)
- ✅ GET /api/admin/resource-categories/:id (单个)
- ✅ PUT /api/admin/resource-categories/:id (更新)
- ✅ DELETE /api/admin/resource-categories/:id (删除)

### 待完成
- ⚠️ POST /api/admin/resource-categories/batch (批量操作)
- ⚠️ 所有 /api/admin/resource-contents 相关 API

## ✅ 验证清单

- [ ] 服务器启动成功，显示 MySQL 配置
- [ ] 没有 "Unknown column" 错误
- [ ] GET 请求返回正确的字段名
- [ ] POST 请求可以创建记录
- [ ] 数据库中可以看到新记录
- [ ] 前端管理页面可以正常使用

---

**修复时间**: 2024-12-04  
**状态**: ✅ 已修复  
**测试**: 待验证

