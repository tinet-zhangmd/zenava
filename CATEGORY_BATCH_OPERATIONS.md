# 栏目分类批量操作功能说明

## 📋 功能概述

在资源中心栏目管理页面（`http://127.0.0.1:3000/ticloudadmin/resource-categories`）中，已完善以下三个批量操作功能：

### ✅ 已实现的批量操作

1. **批量删除** - 删除选中的多个栏目
2. **批量显示** - 将选中的栏目设置为显示状态
3. **批量隐藏** - 将选中的栏目设置为隐藏状态

---

## 🎯 使用方法

### 1. 选择栏目

在栏目列表中，勾选需要操作的栏目：

```
┌─────────────────────────────────────────────────────────────┐
│ ☑️ 全选复选框 - 点击可全选/取消全选所有栏目                 │
│                                                             │
│ [☑️] #1  [封面图]  白皮书  whitepapers  [video]  [显示]   │
│ [☑️] #2  [封面图]  博客    blogs       [article] [显示]   │
│ [☐] #3  [封面图]  视频    videos      [video]   [隐藏]   │
└─────────────────────────────────────────────────────────────┘
```

### 2. 选择批量操作

在页面顶部的下拉菜单中选择操作类型：

```
┌─────────────────────────┐
│ 批量操作 ▼              │
├─────────────────────────┤
│ 批量删除                │
│ 批量显示                │
│ 批量隐藏                │
└─────────────────────────┘
```

### 3. 点击"应用"按钮

- 系统会弹出确认对话框
- 确认后执行批量操作
- 操作完成后自动刷新页面

---

## 🔧 技术实现

### 前端实现（`ResourceCategoryManagement.tsx`）

```typescript
// 批量操作事件处理
document.getElementById('apply-batch-action')?.addEventListener('click', async () => {
  const action = document.getElementById('batch-action').value;
  const selected = Array.from(document.querySelectorAll('.category-checkbox:checked'))
    .map(cb => parseInt(cb.value));
  
  if (selected.length === 0) {
    alert('请至少选择一个栏目');
    return;
  }
  
  // 发送批量操作请求
  const res = await fetch('/api/admin/resource-categories/batch', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      action: action,  // 'delete' | 'show' | 'hide'
      ids: selected    // [1, 2, 3]
    })
  });
  
  if (res.ok) {
    window.location.reload();
  }
});
```

### 后端实现（`index-node.tsx`）

#### API 端点
```
POST /api/admin/resource-categories/batch
```

#### 请求参数
```json
{
  "action": "delete" | "show" | "hide",
  "ids": [1, 2, 3]
}
```

#### 响应格式
```json
{
  "success": true,
  "message": "成功显示 3 个栏目"
}
```

#### 核心逻辑

**批量删除 (delete)**
```typescript
case 'delete':
  // 1. 检查是否有关联内容
  const [contentCountResult] = await mysqlQuery(
    `SELECT COUNT(*) as count FROM resource_contents WHERE category_id IN (${placeholders})`,
    ids
  )
  
  if (contentCountResult.count > 0) {
    return c.json({ 
      success: false, 
      error: `选中的栏目中有 ${contentCountResult.count} 个关联内容，请先删除这些内容后再删除栏目` 
    }, 400)
  }
  
  // 2. 获取所有栏目的封面图片
  const categories = await mysqlQuery(
    `SELECT cover_image FROM resource_categories WHERE id IN (${placeholders})`,
    ids
  )
  
  // 3. 删除栏目记录
  await mysqlQuery(
    `DELETE FROM resource_categories WHERE id IN (${placeholders})`,
    ids
  )
  
  // 4. 删除封面图片文件
  for (const category of categories) {
    if (category?.cover_image) {
      await deleteUploadedImage(category.cover_image)
    }
  }
  break
```

**批量显示 (show)**
```typescript
case 'show':
  await mysqlQuery(
    `UPDATE resource_categories SET is_visible = 1 WHERE id IN (${placeholders})`,
    ids
  )
  break
```

**批量隐藏 (hide)**
```typescript
case 'hide':
  await mysqlQuery(
    `UPDATE resource_categories SET is_visible = 0 WHERE id IN (${placeholders})`,
    ids
  )
  break
```

---

## ⚠️ 安全与验证

### 批量删除的安全检查

1. **关联内容检查** - 不允许删除有关联内容的栏目
   ```sql
   SELECT COUNT(*) as count 
   FROM resource_contents 
   WHERE category_id IN (1, 2, 3)
   ```
   
2. **二次确认** - 前端弹出确认对话框
   ```javascript
   confirm('确定要删除选中的 3 个栏目吗？此操作不可恢复！')
   ```

3. **文件清理** - 删除栏目时同时删除关联的封面图片

### 参数验证

```typescript
if (!action || !ids || !Array.isArray(ids) || ids.length === 0) {
  return c.json({ 
    success: false, 
    error: '缺少必要参数' 
  }, 400)
}
```

---

## 📊 操作反馈

### 成功消息

- **批量删除**: `成功删除 3 个栏目`
- **批量显示**: `成功显示 3 个栏目`
- **批量隐藏**: `成功隐藏 3 个栏目`

### 错误消息

- **未选择栏目**: `请至少选择一个栏目`
- **未选择操作**: `请选择批量操作`
- **删除失败**: `选中的栏目中有 5 个关联内容，请先删除这些内容后再删除栏目`
- **参数错误**: `缺少必要参数`
- **未知操作**: `未知操作类型`

---

## 🧪 测试步骤

### 测试批量显示/隐藏

1. 访问 `http://127.0.0.1:3000/ticloudadmin/resource-categories`
2. 勾选 2-3 个栏目
3. 选择"批量隐藏"
4. 点击"应用"
5. 确认对话框后，查看状态是否变为"隐藏"
6. 再次选择相同栏目，选择"批量显示"
7. 确认状态是否恢复为"显示"

### 测试批量删除（无关联内容）

1. 创建一个测试栏目（不添加任何内容）
2. 勾选该测试栏目
3. 选择"批量删除"
4. 点击"应用"
5. 确认对话框后，查看栏目是否被删除
6. 检查封面图片文件是否也被清理

### 测试批量删除（有关联内容）

1. 勾选一个已有内容的栏目
2. 选择"批量删除"
3. 点击"应用"
4. 确认对话框后，应该看到错误提示：
   ```
   选中的栏目中有 X 个关联内容，请先删除这些内容后再删除栏目
   ```

---

## 🎨 UI 设计

### 操作栏布局

```
┌────────────────────────────────────────────────────────────┐
│  [批量操作 ▼]  [应用]  [添加新栏目]        [搜索栏目...] │
└────────────────────────────────────────────────────────────┘
```

### 确认对话框

- **批量删除**: "确定要删除选中的 3 个栏目吗？此操作不可恢复！"
- **批量显示**: "确定要显示选中的 3 个栏目吗？"
- **批量隐藏**: "确定要隐藏选中的 3 个栏目吗？"

---

## 📝 数据库影响

### 批量显示/隐藏
- 修改 `is_visible` 字段
- 不影响其他数据

### 批量删除
- 删除 `resource_categories` 表记录
- 清理关联的封面图片文件
- 保留关联内容（需要先手动删除）

---

## ✨ 功能特性

1. ✅ **全选功能** - 点击表头复选框可全选/取消全选
2. ✅ **多选支持** - 可同时选择多个栏目进行操作
3. ✅ **操作确认** - 所有批量操作都有二次确认
4. ✅ **错误提示** - 明确的错误信息和操作反馈
5. ✅ **自动刷新** - 操作成功后自动刷新页面显示最新状态
6. ✅ **文件清理** - 删除栏目时自动清理关联的封面图片
7. ✅ **数据保护** - 不允许删除有关联内容的栏目

---

## 🔄 更新历史

- **2024-12-05**: 完善批量删除、批量显示、批量隐藏三个功能
  - 修改前端 JavaScript，统一使用 `/api/admin/resource-categories/batch` API
  - 更新后端 API，从 Cloudflare D1 迁移到 MySQL
  - 增加关联内容检查和封面图片清理逻辑
  - 优化用户提示和错误信息

---

## 🎯 后续优化建议

1. **批量排序** - 一次性调整多个栏目的排序
2. **批量移动** - 将多个内容批量移动到其他栏目
3. **导出/导入** - 支持批量导出栏目配置和内容
4. **操作日志** - 记录批量操作的历史记录
5. **撤销功能** - 支持撤销最近的批量操作

