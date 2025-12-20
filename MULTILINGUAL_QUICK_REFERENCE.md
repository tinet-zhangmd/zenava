# 多语言功能快速参考

## 🚀 快速开始

### 1. 执行数据库迁移 (必须先完成)

```bash
cd /home/devbox/project/ZENAVA

# 确保 MySQL 服务运行中
# 然后执行以下命令之一:

# 方式 A: 使用 Node.js 脚本 (推荐)
node scripts/add-multilingual-fields.js

# 方式 B: 使用 MySQL 命令
mysql -u root -p12345 ZENAVA_LOCAL < migrations/002_add_multilingual_content.sql
```

### 2. 重启应用

```bash
npm run pm2:restart
# 或
npm run build && npm run dev:sandbox
```

### 3. 测试功能

访问: `http://localhost:3000/ticloudadmin/resource-contents/new`

## 📋 功能清单

### ✅ 已完成
- [x] 数据库迁移文件创建
- [x] 前端编辑器 Tab 切换
- [x] 四个独立的 Quill 编辑器
- [x] 多语言 SEO 设置
- [x] 表单数据收集逻辑
- [x] TypeScript 类型定义

### ⏳ 待完成
- [ ] 执行数据库迁移
- [ ] 更新后端 API (创建/更新/查询)
- [ ] 前端展示页面多语言支持
- [ ] 完整功能测试

## 🎯 编辑器使用

### 语言 Tab
- **简体中文** - 必填,作为默认语言
- **English** - 可选
- **日本語** - 可选
- **繁體中文** - 可选

### 每个语言包含
1. 标题输入框
2. 富文本编辑器 (Quill)
3. SEO 设置 (标题、描述、关键词)

### 操作流程
1. 点击语言 Tab 切换
2. 输入该语言的内容
3. 展开 SEO 设置输入 SEO 信息
4. 点击"发布"或"保存"

## 📊 数据库字段

### 标题字段
- `title` (原字段,保留)
- `title_zh` (简体中文)
- `title_en` (英文)
- `title_jp` (日文)
- `title_hk` (繁体中文)

### 内容字段
- `content` (原字段,保留)
- `content_zh` (简体中文)
- `content_en` (英文)
- `content_jp` (日文)
- `content_hk` (繁体中文)

### SEO 字段
- `meta_title_zh/en/jp/hk`
- `meta_description_zh/en/jp/hk`
- `meta_keywords_zh/en/jp/hk`

## 🔧 API 更新要点

### 创建/更新内容 API

**接收字段**:
```json
{
  "title": "简体中文标题",
  "content": "<p>简体中文内容</p>",
  "title_zh": "简体中文标题",
  "title_en": "English Title",
  "title_jp": "日本語タイトル",
  "title_hk": "繁體中文標題",
  "content_zh": "<p>简体中文内容</p>",
  "content_en": "<p>English content</p>",
  "content_jp": "<p>日本語コンテンツ</p>",
  "content_hk": "<p>繁體中文內容</p>",
  "meta_title_zh": "...",
  "meta_title_en": "...",
  ...
}
```

### 查询内容 API

**返回所有语言字段**,用于编辑时回填。

## 🐛 常见问题

### Q: Tab 切换不工作?
A: 检查浏览器控制台,确保 Quill.js 正确加载

### Q: 保存后数据丢失?
A: 检查 API 是否接收并保存了多语言字段

### Q: 数据库迁移失败?
A: 确保 MySQL 服务运行,检查连接配置

## 📁 重要文件

- `migrations/002_add_multilingual_content.sql` - 数据库迁移
- `scripts/add-multilingual-fields.js` - 迁移脚本
- `src/pages/admin/ContentEditor.tsx` - 编辑器组件
- `MULTILINGUAL_CONTENT_GUIDE.md` - 详细指南
- `MULTILINGUAL_IMPLEMENTATION_SUMMARY.md` - 实现总结

## 📞 获取帮助

查看详细文档:
- `MULTILINGUAL_CONTENT_GUIDE.md` - 完整使用指南
- `MULTILINGUAL_IMPLEMENTATION_SUMMARY.md` - 技术实现细节

