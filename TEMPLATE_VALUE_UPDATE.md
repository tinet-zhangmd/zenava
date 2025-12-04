# 📝 模板值格式统一更新

## ✅ 更新完成

### 🎯 目标
将分类模板和内容模板的值统一为不带 `.html` 后缀的格式。

### 📋 更新内容

#### 1. 前端表单选项更新 ✅

**文件**: `src/pages/admin/ResourceCategoryManagement.tsx`

**分类模板选项**:
```html
<option value="list_article">list_article - 文章列表</option>
<option value="list_video">list_video - 视频列表</option>
<option value="list_download">list_download - 下载列表</option>
```

**内容模板选项**:
```html
<option value="list_article">list_article - 文章详情</option>
<option value="list_video">list_video - 视频详情</option>
<option value="list_download">list_download - 下载详情</option>
```

#### 2. API 代码简化 ✅

**文件**: `src/index-node.tsx`

##### GET `/api/admin/resource-categories`
- ❌ 之前: `CONCAT(category_template, '.html') as list_template`
- ✅ 现在: `category_template as list_template`

##### GET `/api/admin/resource-categories/:id`
- ❌ 之前: `SELECT *` (返回数据库原始字段名)
- ✅ 现在: 明确映射字段，返回统一格式

##### POST `/api/admin/resource-categories`
- ❌ 之前: 需要去掉 `.html` 后缀
```typescript
const cleanListTemplate = (list_template || '').toString().replace(/\.html$/i, '')
```
- ✅ 现在: 直接使用前端发送的值
```typescript
[sort_order || 0, name, slug, list_template, detail_template, is_visible !== false]
```

##### PUT `/api/admin/resource-categories/:id`
- ❌ 之前: 需要去掉 `.html` 后缀
```typescript
const cleanListTemplate = list_template.replace('.html', '')
```
- ✅ 现在: 直接使用前端发送的值
```typescript
[sort_order, name, slug, list_template, detail_template, is_visible, id]
```

### 🎨 统一的数据格式

#### 前端发送格式
```json
{
  "name": "文章栏目",
  "slug": "/articles",
  "list_template": "list_article",
  "detail_template": "list_article",
  "sort_order": 0,
  "is_visible": true
}
```

#### 数据库存储格式
```sql
category_template = 'list_article'  -- ENUM 类型
page_template = 'list_article'      -- ENUM 类型
```

#### API 返回格式
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "文章栏目",
    "slug": "/articles",
    "list_template": "list_article",
    "detail_template": "list_article",
    "sort_order": 0,
    "is_visible": true
  }
}
```

### ✨ 优势

1. **更简洁**: 代码更简单，无需格式转换
2. **更一致**: 前端、API、数据库使用相同的值格式
3. **更可靠**: 减少了转换逻辑，降低出错概率
4. **更易维护**: 代码逻辑更清晰，易于理解

### 📊 有效的模板值

系统支持以下模板值（ENUM 类型）：

| 值 | 说明 |
|---|---|
| `list_article` | 文章列表 |
| `list_video` | 视频列表 |
| `list_download` | 下载列表 |

API 会验证提交的值是否在允许的范围内。

### 🧪 测试

#### 测试创建栏目
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

#### 预期响应
```json
{
  "success": true,
  "data": {
    "id": 12,
    "sort_order": 0,
    "name": "测试栏目",
    "slug": "/test",
    "list_template": "list_article",
    "detail_template": "list_article",
    "is_visible": true
  }
}
```

### 📝 相关文件

- `src/pages/admin/ResourceCategoryManagement.tsx` - 前端表单
- `src/index-node.tsx` - API 实现
- `migrations/001_create_resource_center_tables.sql` - 数据库结构

### ⚠️ 注意事项

1. 如果之前创建的数据带有 `.html` 后缀，需要手动清理
2. API 现在会验证模板值，非法值会返回 400 错误
3. 前端和 API 现在使用完全一致的格式，不再做转换

---

**更新时间**: 2024-12-04  
**状态**: ✅ 完成并测试通过

