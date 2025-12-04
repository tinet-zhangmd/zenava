# 📝 栏目表单字段更新

## ✅ 更新完成

已按照要求更新"添加新栏目"表单，包含以下 7 个主要字段。

## 📋 表单字段清单

### 1. ✅ 栏目名称
- **字段 ID**: `category-name`
- **类型**: 文本输入框
- **必填**: 是
- **示例**: "公司动态、行业报告"

### 2. ✅ 栏目标识 (Slug)
- **字段 ID**: `category-slug`
- **类型**: 文本输入框
- **必填**: 是
- **示例**: "/a/186 或 /resources/tech-docs"
- **说明**: 用于 URL 路径

### 3. ✅ 栏目描述
- **字段 ID**: `category-description`
- **类型**: 多行文本框 (textarea)
- **必填**: 否
- **行数**: 3行
- **说明**: 用于 SEO 和前台展示

### 4. ✅ 栏目封面图
- **字段 ID**: `category-cover-file`
- **类型**: 文件上传
- **格式**: png, jpg, jpeg
- **大小限制**: 最大 30MB
- **功能**:
  - ✅ 文件类型验证
  - ✅ 文件大小验证
  - ✅ 图片预览
  - ✅ 删除图片按钮

### 5. ✅ 栏目封面链接
- **字段 ID**: `category-cover-url`
- **类型**: URL 输入框
- **必填**: 否
- **示例**: "https://example.com/images/cover.jpg"
- **说明**: 与上传图片二选一

### 6. ✅ 分类模板
- **字段 ID**: `category-list-template`
- **类型**: 下拉选择框
- **必填**: 是
- **选项**:
  - `list_article` - 文章列表
  - `list_video` - 视频列表
  - `list_download` - 下载列表

### 7. ✅ 排序
- **字段 ID**: `category-sort-order`
- **类型**: 数字输入框
- **必填**: 是
- **默认值**: 0
- **说明**: 数字越小越靠前

### 额外字段
- **是否显示**: 复选框，控制前台是否显示该栏目

## 🎨 表单样式

### 字段布局
- 每个字段有清晰的编号 (1-7)
- 统一的样式和间距
- 必填字段标记 ⚠️ 红色星号
- 友好的提示文字

### 图片上传体验
```
[选择图片] 按钮
    ↓
显示文件名
    ↓
显示图片预览 (48x32)
    ↓
[删除图片] 按钮
```

## 💻 JavaScript 功能

### 图片上传处理
```javascript
// 1. 文件类型验证
validTypes = ['image/png', 'image/jpeg', 'image/jpg']

// 2. 文件大小验证
maxSize = 30 * 1024 * 1024 // 30MB

// 3. 实时预览
FileReader.readAsDataURL()

// 4. 删除功能
清空文件输入 + 隐藏预览
```

### 表单提交数据
```javascript
{
  sort_order: 0,                    // 排序
  name: "公司动态",                  // 栏目名称
  slug: "/a/186",                   // 栏目标识
  description: "公司最新动态...",    // 栏目描述
  cover_url: "https://...",         // 栏目封面链接
  list_template: "list_article",    // 分类模板
  detail_template: "list_article",  // 内容模板（保留）
  is_visible: true                  // 是否显示
}
```

## 📊 数据库字段映射

需要在数据库添加以下新字段：

```sql
ALTER TABLE resource_categories 
ADD COLUMN description TEXT COMMENT '栏目描述',
ADD COLUMN cover_url VARCHAR(500) COMMENT '封面图片URL';
```

## ⚠️ 注意事项

### 1. 图片上传功能
当前前端已实现：
- ✅ 文件选择
- ✅ 验证（类型、大小）
- ✅ 预览

**待开发**:
- ⚠️ 图片实际上传到服务器
- ⚠️ 返回图片 URL
- ⚠️ 保存到数据库

**临时方案**: 用户可以使用"栏目封面链接"直接填写图片 URL

### 2. API 更新
需要更新以下 API 接受新字段：
- `POST /api/admin/resource-categories` - 创建栏目
- `PUT /api/admin/resource-categories/:id` - 更新栏目
- `GET /api/admin/resource-categories/:id` - 获取栏目（返回新字段）

### 3. 删除的字段
- ❌ `detail_template` (内容模板) - 从表单中移除
  - 但在提交数据时会自动设置为与 `list_template` 相同
  - 保持与旧系统兼容

## 🧪 测试清单

- [ ] 填写所有必填字段后能成功创建
- [ ] 上传 PNG 图片正常
- [ ] 上传 JPG 图片正常
- [ ] 上传超过 30MB 的图片会提示错误
- [ ] 上传非图片文件会提示错误
- [ ] 图片预览正常显示
- [ ] 删除图片功能正常
- [ ] 填写封面链接能正常保存
- [ ] 栏目描述能正常保存
- [ ] 排序功能正常
- [ ] 编辑栏目时字段能正确回填

## 📖 使用说明

### 添加新栏目
1. 点击"添加新分类"按钮
2. 按顺序填写 7 个字段：
   - 栏目名称 *
   - 栏目标识 *
   - 栏目描述
   - 栏目封面图（上传）
   - 栏目封面链接（URL）
   - 分类模板 *
   - 排序 *
3. 勾选"在前台显示此栏目"
4. 点击"保存"

### 图片处理
两种方式（二选一）：
1. **上传本地图片**: 点击"选择图片"，选择本地文件
2. **使用图片链接**: 直接在"栏目封面链接"中填写图片 URL

## 🎯 下一步

### 立即可做
1. ✅ 前端表单已完成
2. ⚠️ 需要重启服务器查看效果
3. ⚠️ 测试表单功能

### 后续开发
1. 更新数据库表结构（添加 `description` 和 `cover_url` 字段）
2. 更新 API 接受新字段
3. 实现图片上传接口
4. 更新列表页显示新字段

---

**更新时间**: 2024-12-04  
**文件**: `src/pages/admin/ResourceCategoryManagement.tsx`  
**状态**: ✅ 前端表单已完成，等待测试和后端 API 更新


