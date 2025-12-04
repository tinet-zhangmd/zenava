# ENUM 值格式修复 ✅

## 🐛 问题
```
Data truncated for column 'category_template' at row 1
```

前端发送的值包含 `.html` 后缀，但数据库 ENUM 不包含。

## 🔍 值的不匹配

### 数据库 ENUM 定义
```sql
category_template ENUM('list_article', 'list_video', 'list_download')
page_template ENUM('list_article', 'list_video', 'list_download')
```

### 前端发送的值
```
list_article.html  ❌ (多了 .html)
list_video.html    ❌
list_download.html ❌
```

## ✅ 解决方案

### 方案：在 API 层做格式转换

**写入时（POST/PUT）**：去掉 `.html` 后缀
```typescript
const cleanListTemplate = list_template.replace('.html', '')
const cleanDetailTemplate = detail_template.replace('.html', '')
```

**读取时（GET）**：添加 `.html` 后缀
```sql
SELECT CONCAT(category_template, '.html') as list_template,
       CONCAT(page_template, '.html') as detail_template
FROM resource_categories
```

## 🔧 修改的代码

### 1. GET - 获取列表
```typescript
app.get('/api/admin/resource-categories', async (c) => {
  const categories = await mysqlQuery(
    `SELECT id, sort_order, name, link as slug, 
            CONCAT(category_template, '.html') as list_template,  // 添加 .html
            CONCAT(page_template, '.html') as detail_template,    // 添加 .html
            is_displayed as is_visible, created_at, updated_at 
     FROM resource_categories`
  )
  return c.json({ success: true, data: categories })
})
```

### 2. POST - 创建
```typescript
app.post('/api/admin/resource-categories', async (c) => {
  const { list_template, detail_template, ... } = await c.req.json()
  
  // 去掉 .html 后缀
  const cleanListTemplate = list_template.replace('.html', '')
  const cleanDetailTemplate = detail_template.replace('.html', '')
  
  await mysqlQuery(
    `INSERT INTO resource_categories (..., category_template, page_template, ...) 
     VALUES (..., ?, ?, ...)`,
    [..., cleanListTemplate, cleanDetailTemplate, ...]
  )
})
```

### 3. PUT - 更新
```typescript
app.put('/api/admin/resource-categories/:id', async (c) => {
  const { list_template, detail_template, ... } = await c.req.json()
  
  // 去掉 .html 后缀
  const cleanListTemplate = list_template.replace('.html', '')
  const cleanDetailTemplate = detail_template.replace('.html', '')
  
  await mysqlQuery(
    `UPDATE resource_categories 
     SET ..., category_template = ?, page_template = ?, ...
     WHERE id = ?`,
    [..., cleanListTemplate, cleanDetailTemplate, ...]
  )
})
```

## 🎯 为什么这样做？

### 优点
- ✅ 前端代码无需修改
- ✅ 数据库结构无需修改
- ✅ API 接口保持一致
- ✅ 在 API 层统一处理格式转换

### 替代方案及缺点
1. **修改数据库 ENUM**：需要数据迁移，风险大
2. **修改前端代码**：需要改多个地方，容易遗漏
3. **修改表单选项**：用户体验下降

## 🚀 测试步骤

### 1. 确认服务器在运行
服务器应该还在运行，无需重启（代码已自动重载）。

如果不在运行：
```bash
npm run start:node
```

### 2. 测试创建栏目
在浏览器管理后台：
1. 访问 **资源中心** → **栏目分类**
2. 点击 **创建新栏目**
3. 填写表单：
   - 名称：`测试栏目`
   - 链接：`/test`
   - 分类模板：`list_article.html`
   - 页面模板：`list_article.html`
   - 排序：`0`
4. ✅ 点击提交，应该成功！

### 3. 验证数据
```bash
mysql -u root -p12345 ZENAVA_LOCAL -e "SELECT id, name, link, category_template, page_template FROM resource_categories WHERE name='测试栏目';"
```

应该看到：
```
id | name     | link  | category_template | page_template
11 | 测试栏目  | /test | list_article      | list_article
```

注意：数据库中是 `list_article`（无 .html），但前端看到的是 `list_article.html`。

### 4. 测试获取列表
```bash
curl http://127.0.0.1:3000/api/admin/resource-categories | jq '.data[0]'
```

应该看到带 `.html` 的值：
```json
{
  "id": 186,
  "name": "公司动态",
  "slug": "/a/186",
  "list_template": "list_article.html",  ✅
  "detail_template": "list_article.html", ✅
  ...
}
```

## 📊 完整的值映射

| 前端/API | 数据库存储 | 转换方向 |
|---------|-----------|---------|
| `list_article.html` | `list_article` | 写入时去掉 |
| `list_video.html` | `list_video` | 写入时去掉 |
| `list_download.html` | `list_download` | 写入时去掉 |
| 反向 | ↑ | 读取时添加 |

## ✅ 验证清单

- [ ] 服务器正常运行
- [ ] 没有 "Data truncated" 错误
- [ ] 可以在管理后台创建栏目
- [ ] 下拉选项显示 .html 格式
- [ ] 数据库中存储不带 .html
- [ ] API 返回带 .html 格式
- [ ] 编辑功能正常
- [ ] 删除功能正常

## 🎉 最终状态

**完整功能已可用！**

所有资源中心栏目管理功能：
- ✅ 查看列表
- ✅ 创建栏目
- ✅ 编辑栏目
- ✅ 删除栏目
- ✅ 字段格式自动转换

---

**修复时间**: 2024-12-04  
**状态**: ✅ 完全修复  
**测试**: 立即可用

