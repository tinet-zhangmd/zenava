# 缩略图多语言支持更新说明

## 📋 更新概述

根据需求，**缩略图 (cover_image)** 需要支持多语言版本，每个语言可以上传不同的缩略图。

## ✅ 已完成

### 1. 数据库字段添加
已成功添加 4 个缩略图多语言字段到 `resource_contents` 表：
- `cover_image_zh` - 简体中文缩略图
- `cover_image_en` - 英文缩略图
- `cover_image_jp` - 日文缩略图
- `cover_image_hk` - 繁体中文缩略图

### 2. 数据迁移
已将现有的 `cover_image` 数据复制到 `cover_image_zh`

## 📝 需要的字段总结

根据用户确认，**只有以下字段需要多语言支持**：

| 字段类型 | 原字段名 | 多语言字段 | 状态 |
|---------|---------|-----------|------|
| 标题 | `title` | `title_zh/en/jp/hk` | ✅ 已完成 |
| 内容 | `content` | `content_zh/en/jp/hk` | ✅ 已完成 |
| 缩略图 | `cover_image` | `cover_image_zh/en/jp/hk` | ✅ 数据库完成 |
| SEO标题 | `meta_title` | `meta_title_zh/en/jp/hk` | ✅ 已完成 |
| SEO描述 | `meta_description` | `meta_description_zh/en/jp/hk` | ✅ 已完成 |
| SEO关键词 | `meta_keywords` | `meta_keywords_zh/en/jp/hk` | ✅ 已完成 |

**不需要多语言的字段：**
- 作者 (author)
- 发布时间 (published_at)
- 访问量 (views)
- 阅读时间 (reading_time)
- 推荐状态 (is_featured)
- 排序 (sort_order)
- 状态 (status)
- 视频文件 (video_file)
- 附件文件 (attachment_file)
- 等等...

## 🔧 待完成的前端修改

### ContentEditor.tsx 需要修改的部分

#### 1. 将缩略图上传移到语言 Tab 内

**当前结构：**
```
- 语言 Tab (zh/en/jp/hk)
  - 简体中文内容
    - 标题
    - 内容编辑器
  - 英文内容
    - 标题
    - 内容编辑器
  ...
- 缩略图上传（在 Tab 外，所有语言共用）❌
- 发布人
- 分类栏目
...
```

**目标结构：**
```
- 语言 Tab (zh/en/jp/hk)
  - 简体中文内容
    - 标题
    - 内容编辑器
    - 缩略图上传 ✅
  - 英文内容
    - 标题
    - 内容编辑器
    - 缩略图上传 ✅
  ...
- 发布人
- 分类栏目
...
```

#### 2. 更新缩略图上传逻辑

需要为每个语言创建独立的：
- 文件输入框：`content-cover-zh`, `content-cover-en`, `content-cover-jp`, `content-cover-hk`
- 预览容器：`cover-preview-container-zh`, `cover-preview-container-en`, 等
- 上传按钮：`upload-cover-btn-zh`, `upload-cover-btn-en`, 等
- 删除按钮：`remove-cover-btn-zh`, `remove-cover-btn-en`, 等
- 隐藏字段：`cover-image-url-zh`, `cover-image-url-en`, 等

#### 3. 更新表单提交逻辑

在表单提交时，需要：
1. 检查每个语言是否上传了新图片
2. 如果上传了，调用上传 API
3. 将每个语言的图片 URL 保存到对应字段：
   ```javascript
   formData.cover_image_zh = ...
   formData.cover_image_en = ...
   formData.cover_image_jp = ...
   formData.cover_image_hk = ...
   ```

## 🔄 API 更新

### 需要更新的 API 端点

#### 1. 创建内容 API (`POST /api/admin/resource-contents`)
需要接收并保存：
- `cover_image_zh/en/jp/hk`
- `title_zh/en/jp/hk`
- `content_zh/en/jp/hk`
- `meta_title_zh/en/jp/hk`
- `meta_description_zh/en/jp/hk`
- `meta_keywords_zh/en/jp/hk`

#### 2. 更新内容 API (`PUT /api/admin/resource-contents/:id`)
需要更新：
- 所有多语言字段

#### 3. 查询内容 API (`GET /api/admin/resource-contents/:id`)
需要返回：
- 所有多语言字段用于编辑回填

## 📊 数据库字段完整列表

### 多语言字段（共 24 个）
```sql
-- 标题 (4)
title_zh, title_en, title_jp, title_hk

-- 内容 (4)
content_zh, content_en, content_jp, content_hk

-- 缩略图 (4)
cover_image_zh, cover_image_en, cover_image_jp, cover_image_hk

-- SEO 标题 (4)
meta_title_zh, meta_title_en, meta_title_jp, meta_title_hk

-- SEO 描述 (4)
meta_description_zh, meta_description_en, meta_description_jp, meta_description_hk

-- SEO 关键词 (4)
meta_keywords_zh, meta_keywords_en, meta_keywords_jp, meta_keywords_hk
```

### 保留的原字段（作为默认/简体中文）
```sql
title, content, cover_image, meta_title, meta_description, meta_keywords
```

## 🎯 下一步行动

1. ⏳ 修改 `ContentEditor.tsx`，将缩略图上传移到语言 Tab 内
2. ⏳ 更新前端 JavaScript，支持每个语言独立上传缩略图
3. ⏳ 更新 API 端点，支持多语言字段的保存和查询
4. ⏳ 测试完整流程

## 📝 注意事项

1. **向后兼容**：保留原有的 `cover_image` 字段作为默认值（简体中文）
2. **数据回填**：编辑时，如果 `cover_image_zh` 为空，使用 `cover_image` 的值
3. **前端展示**：根据当前语言显示对应的缩略图，如果为空则显示默认缩略图

## ✅ 用户确认的需求

> "内容、标题、缩略图、seo的三个字段 是需要多语言的，其他字段不需要多语言"

已确认需要多语言的字段：
1. ✅ 标题 (title)
2. ✅ 内容 (content)
3. ✅ 缩略图 (cover_image)
4. ✅ SEO 三个字段 (meta_title, meta_description, meta_keywords)

其他字段（作者、发布时间、视频、附件等）**不需要**多语言版本。

