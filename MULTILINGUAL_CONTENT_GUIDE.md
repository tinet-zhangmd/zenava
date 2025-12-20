# 资源内容多语言功能实现指南

## 📋 概述

本文档说明如何为资源中心的内容管理系统添加四种语言(简体中文、英文、日文、繁体中文)的支持。

## 🎯 已完成的工作

### 1. 数据库迁移文件

已创建 `migrations/002_add_multilingual_content.sql`,添加以下多语言字段:

#### 标题字段
- `title_zh` - 简体中文标题
- `title_en` - 英文标题
- `title_jp` - 日文标题
- `title_hk` - 繁体中文标题

#### 内容字段
- `content_zh` - 简体中文内容
- `content_en` - 英文内容
- `content_jp` - 日文内容
- `content_hk` - 繁体中文内容

#### SEO 标题字段
- `meta_title_zh/en/jp/hk`

#### SEO 描述字段
- `meta_description_zh/en/jp/hk`

#### SEO 关键词字段
- `meta_keywords_zh/en/jp/hk`

### 2. 编辑器组件更新

已更新 `src/pages/admin/ContentEditor.tsx`,添加:

- ✅ 四个语言 Tab 切换按钮(简体、English、日本語、繁體)
- ✅ 每个语言独立的标题输入框
- ✅ 每个语言独立的 Quill 富文本编辑器
- ✅ 每个语言独立的 SEO 设置(标题、描述、关键词)
- ✅ Tab 切换 JavaScript 逻辑
- ✅ 表单提交时收集所有语言的数据

## 🚀 部署步骤

### 步骤 1: 执行数据库迁移

有两种方式执行迁移:

#### 方式 A: 使用 MySQL 命令行(如果 MySQL 已安装)

```bash
cd /home/devbox/project/ZENAVA
mysql -u root -p12345 ZENAVA_LOCAL < migrations/002_add_multilingual_content.sql
```

#### 方式 B: 使用 Node.js 脚本

```bash
cd /home/devbox/project/ZENAVA
node scripts/add-multilingual-fields.js
```

**注意**: 执行前确保 MySQL 服务正在运行。

### 步骤 2: 重启应用

```bash
# 如果使用 PM2
npm run pm2:restart

# 或者重新启动开发服务器
npm run build
npm run dev:sandbox
```

### 步骤 3: 测试多语言功能

1. 访问管理后台: `http://localhost:3000/ticloudadmin`
2. 进入资源内容管理: `/ticloudadmin/resource-contents`
3. 点击"发布文章"或编辑现有文章
4. 查看四个语言 Tab 是否正常显示
5. 切换不同语言 Tab,输入内容
6. 保存并验证数据是否正确存储

## 📝 使用说明

### 编辑器界面

编辑器顶部有四个语言 Tab:

- **简体中文** (必填) - 作为默认语言
- **English** (可选)
- **日本語** (可选)
- **繁體中文** (可选)

### 内容输入规则

1. **简体中文是必填的**,其他语言可选
2. 每个语言有独立的:
   - 标题输入框
   - 富文本编辑器
   - SEO 设置(标题、描述、关键词)
3. 切换 Tab 时,内容会自动保存在对应的编辑器中
4. 提交表单时,所有语言的内容会一起保存

### SEO 设置

展开"SEO 设置"后,会根据当前选中的语言 Tab 显示对应语言的 SEO 字段:

- 简体中文 SEO
- English SEO  
- 日本語 SEO
- 繁體中文 SEO

## 🔧 API 更新需求

需要更新以下 API 端点以支持多语言字段:

### 1. 创建内容 API

**文件**: `src/api/resource-center.ts` 或相关文件

**需要接收的新字段**:

```typescript
{
  // 原有字段
  title: string,
  content: string,
  
  // 新增多语言字段
  title_zh?: string,
  title_en?: string,
  title_jp?: string,
  title_hk?: string,
  content_zh?: string,
  content_en?: string,
  content_jp?: string,
  content_hk?: string,
  
  // SEO 多语言字段
  meta_title_zh?: string,
  meta_title_en?: string,
  meta_title_jp?: string,
  meta_title_hk?: string,
  meta_description_zh?: string,
  meta_description_en?: string,
  meta_description_jp?: string,
  meta_description_hk?: string,
  meta_keywords_zh?: string,
  meta_keywords_en?: string,
  meta_keywords_jp?: string,
  meta_keywords_hk?: string
}
```

### 2. 更新内容 API

同上,需要支持更新所有多语言字段。

### 3. 查询内容 API

查询时需要返回所有语言的字段,以便编辑时回填数据。

## 📊 数据库字段说明

### 字段类型

- 标题字段: `VARCHAR(255)`
- 内容字段: `TEXT`
- SEO 字段: `VARCHAR(255)` 或 `TEXT`

### 字段默认值

所有新增字段默认为 `NULL`,表示该语言版本未填写。

### 数据迁移

迁移脚本会自动将现有的 `title` 和 `content` 复制到 `title_zh` 和 `content_zh`,确保现有数据不丢失。

## 🎨 前端显示逻辑

### 语言选择优先级

在前端页面显示内容时,建议按以下优先级选择语言:

1. 用户当前选择的语言版本
2. 如果该语言版本为空,回退到简体中文版本
3. 如果简体中文也为空,使用原 `title` 和 `content` 字段

示例代码:

```typescript
function getContentByLanguage(content, lang) {
  const title = content[`title_${lang}`] || content.title_zh || content.title;
  const body = content[`content_${lang}`] || content.content_zh || content.content;
  return { title, body };
}
```

## ⚠️ 注意事项

1. **向后兼容**: 保留原有的 `title` 和 `content` 字段,确保旧数据仍然可用
2. **必填验证**: 前端只验证简体中文标题和内容为必填
3. **数据一致性**: 建议在保存时,将简体中文版本同步到原 `title` 和 `content` 字段
4. **性能考虑**: 查询时如果不需要所有语言,可以只查询需要的字段

## 🐛 故障排查

### 问题 1: Tab 切换不工作

检查浏览器控制台是否有 JavaScript 错误,确保 Quill 编辑器正确初始化。

### 问题 2: 保存后数据丢失

检查:
1. API 是否正确接收所有多语言字段
2. 数据库字段是否已创建
3. 表单提交的数据格式是否正确

### 问题 3: 编辑器显示异常

确保:
1. Quill.js CDN 资源正常加载
2. 每个语言的编辑器 ID 唯一(`quill-editor-zh/en/jp/hk`)
3. CSS 样式正确应用

## 📞 技术支持

如有问题,请检查:
- 数据库迁移日志
- 浏览器控制台错误
- 服务器日志

## 📚 相关文件

- 数据库迁移: `migrations/002_add_multilingual_content.sql`
- 迁移脚本: `scripts/add-multilingual-fields.js`
- 编辑器组件: `src/pages/admin/ContentEditor.tsx`
- 本文档: `MULTILINGUAL_CONTENT_GUIDE.md`

