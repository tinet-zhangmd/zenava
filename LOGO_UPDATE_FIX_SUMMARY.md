# Logo更新问题修复总结

## 问题描述
在后台公共内容管理中，修改导航栏与页脚的LOGO设置，点击保存、发布后，前端页面导航栏和页脚的LOGO没有发生变化。

## 修复的问题

### 1. 数据库查询问题
- **问题**: `navigation_helper.ts` 和 `common-content.tsx` 中的查询条件包含 `status = 'published'`，导致草稿状态的更新不会被显示
- **修复**: 
  - 移除了查询中的 status 条件检查
  - 始终获取 id=1 的配置，确保管理员的更改立即生效

### 2. API 更新问题
- **问题**: navigation 和 footer 配置 API 中的 language 字段处理不当
- **修复**:
  - navigation_config 表没有 language 字段，从更新语句中移除
  - footer_config 表有 language 字段，保留该字段的更新
  - 将默认 status 设置为 'published' 以确保立即生效

### 3. PNG 图片支持
- **问题**: 原始上传限制为 5MB，可能对 PNG 文件太小
- **修复**:
  - 将文件大小限制从 5MB 增加到 10MB
  - 明确添加了 PNG MIME 类型支持
  - 改进了 Base64 转换算法以处理大文件

### 4. 前端组件问题
- **问题**: UnifiedFooter 组件硬编码了 logo，没有使用数据库配置
- **修复**:
  - 修改 UnifiedFooter 组件以接收 config 参数
  - 修改 LayoutWithUnifiedNav 组件以传递 footer 配置
  - 确保 logo_url、logo_alt、subtitle 和 copyright 都从配置中读取

### 5. 管理面板问题
- **问题**: 保存时 status 字段可能被设置为 'draft'
- **修复**:
  - 确保管理面板在保存时始终发送 status: 'published'
  - 改进了保存后的数据重载逻辑

## 已实现的功能

1. **完整的 PNG 支持**
   - 支持 JPG, PNG, GIF, WebP, SVG, ICO, BMP 格式
   - 最大文件大小: 10MB
   - 优化的 Base64 编码处理

2. **即时更新机制**
   - 保存后立即在前端生效
   - 无需等待发布流程
   - 自动刷新配置数据

3. **统一的配置管理**
   - 导航栏和页脚使用相同的 logo 配置
   - 支持独立的 alt 文本、副标题和版权信息
   - 所有语言版本共享同一配置

## 测试脚本

创建了两个测试脚本来验证功能：

1. `test-logo-update.sh` - 基础 logo 更新测试
2. `test-admin-logo-flow.sh` - 完整的管理后台流程测试

## 使用说明

### 通过管理后台更新 Logo

1. 访问 http://localhost:3000/admin/common-content
2. 在"导航栏设置"标签下：
   - 点击"选择文件"上传 PNG logo
   - 或输入 logo URL
   - 修改 Alt 文本
3. 点击"保存所有更改"
4. 点击"发布到生产"
5. Logo 会立即在前端页面更新

### 通过 API 更新 Logo

```bash
# 1. 上传图片
curl -X POST http://localhost:3000/api/upload/image \
  -F "file=@your-logo.png"

# 2. 更新导航配置
curl -X POST http://localhost:3000/api/common-content/navigation \
  -H "Content-Type: application/json" \
  -d '{
    "logo_url": "data:image/png;base64,...",
    "logo_alt": "Your Company Logo",
    "status": "published"
  }'

# 3. 发布更改
curl -X POST http://localhost:3000/api/common-content/publish \
  -H "Content-Type: application/json" \
  -d '{"type": "all"}'
```

## 验证更新

更新后可以通过以下方式验证：

1. **前端页面**: 访问 http://localhost:3000 查看导航栏和页脚
2. **API 检查**: `curl http://localhost:3000/api/navigation/config`
3. **数据库检查**: `npx wrangler d1 execute zenava-production --local --command="SELECT * FROM navigation_config;"`

## 注意事项

- Logo 图片会被转换为 Base64 格式存储
- 建议使用透明背景的 PNG 格式
- Logo 高度默认为 2.5rem，可在配置中调整
- 页脚 logo 会自动应用白色滤镜以适应深色背景