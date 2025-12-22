# 管理员用户管理功能设置指南

## 📋 概述

已为管理后台添加了完整的用户管理功能，包括：
- 管理员用户数据库表
- 完整的 CRUD API
- 用户管理界面

## 🗄️ 数据库设置

### 1. 创建管理员用户表

**方法一：使用 Node.js 脚本（推荐）**

```bash
node scripts/create-admin-users-table.js
```

脚本会自动读取 `.env` 文件中的数据库配置并创建表。

**方法二：使用 MySQL 命令行**

```bash
mysql -u root -p12345 zenava < migrations/0018_create_admin_users.sql
```

或者如果使用其他数据库配置：

```bash
mysql -u YOUR_USER -p YOUR_DATABASE < migrations/0018_create_admin_users.sql
```

### 2. 验证表已创建

运行脚本后会自动显示表结构。也可以手动验证：

```bash
mysql -u root -p12345 zenava -e "DESCRIBE admin_users;"
```

或者使用 Node.js 脚本验证：

```bash
node scripts/create-admin-users-table.js
```

应该看到以下字段：
- `id` - 主键
- `username` - 用户名
- `email` - 邮箱（唯一，用于登录）
- `password_hash` - 密码哈希
- `role` - 角色（super_admin/admin/editor）
- `last_login_at` - 最后登录时间
- `created_at` - 创建时间
- `updated_at` - 更新时间

## 🚀 API 路由

所有 API 路由都需要认证（`requireAuth()`），路径前缀为 `/api/admin/users`：

| 方法 | 路径 | 功能 | 说明 |
|------|------|------|------|
| GET | `/api/admin/users` | 获取所有管理员 | 返回用户列表 |
| GET | `/api/admin/users/:id` | 获取单个管理员 | 返回用户详情 |
| POST | `/api/admin/users` | 创建管理员 | 需要：username, email, password, role |
| PUT | `/api/admin/users/:id` | 更新管理员 | 可选字段：username, email, password, role |
| DELETE | `/api/admin/users/:id` | 删除管理员 | 删除指定用户 |

### API 请求示例

#### 创建管理员
```bash
curl -X POST http://localhost:3000/api/admin/users \
  -H "Content-Type: application/json" \
  -H "Cookie: admin_session=YOUR_SESSION" \
  -d '{
    "username": "新管理员",
    "email": "newadmin@zenava.com",
    "password": "secure_password_123",
    "role": "admin"
  }'
```

#### 更新管理员
```bash
curl -X PUT http://localhost:3000/api/admin/users/1 \
  -H "Content-Type: application/json" \
  -H "Cookie: admin_session=YOUR_SESSION" \
  -d '{
    "username": "更新后的用户名",
    "role": "super_admin"
  }'
```

#### 删除管理员
```bash
curl -X DELETE http://localhost:3000/api/admin/users/1 \
  -H "Cookie: admin_session=YOUR_SESSION"
```

## 🎨 前端界面

### 访问路径
- **用户管理页面**: `/ticloudadmin/users`

### 功能特性
1. **用户列表**
   - 显示所有管理员用户
   - 显示用户名、邮箱、角色、最后登录时间
   - 支持编辑和删除操作

2. **添加管理员**
   - 点击"添加管理员"按钮打开表单
   - 必填字段：用户名、邮箱、密码、角色
   - 自动验证邮箱格式和唯一性

3. **编辑管理员**
   - 点击编辑图标打开编辑表单
   - 密码字段可选（留空则不修改）
   - 支持更新用户名、邮箱、角色

4. **删除管理员**
   - 点击删除图标
   - 显示确认对话框
   - 删除后自动刷新列表

## 🔐 角色说明

| 角色值 | 显示名称 | 说明 |
|--------|---------|------|
| `super_admin` | 超级管理员 | 拥有所有权限 |
| `admin` | 管理员 | 标准管理员权限 |
| `editor` | 编辑 | 编辑权限 |

## 📝 注意事项

1. **密码安全**
   - 密码使用 `hashPassword` 函数加密存储
   - 密码不会以明文形式返回

2. **邮箱唯一性**
   - 邮箱必须唯一
   - 创建和更新时会自动检查

3. **权限控制**
   - 所有 API 都需要登录认证
   - 使用现有的 `requireAuth()` 中间件

4. **数据验证**
   - 邮箱格式验证
   - 必填字段验证
   - 角色值验证

## 🧪 测试步骤

1. **创建数据库表**
   ```bash
   node scripts/create-admin-users-table.js
   ```
   
   或者使用 MySQL 命令行：
   ```bash
   mysql -u root -p12345 zenava < migrations/0018_create_admin_users.sql
   ```

2. **重启服务器**
   ```bash
   npm run start:node
   ```

3. **访问用户管理页面**
   - 登录管理后台
   - 访问 `/ticloudadmin/users`

4. **测试功能**
   - 添加新管理员
   - 编辑现有管理员
   - 删除管理员
   - 验证列表刷新

## 🔧 故障排除

### 问题：API 返回 404
- 检查路由是否正确注册在 `index-node.tsx` 中
- 确认路径为 `/api/admin/users`（不是 `/ticloudadmin/api/users`）

### 问题：数据库错误
- 确认已运行迁移文件创建表
- 检查数据库连接配置
- 查看服务器日志获取详细错误信息

### 问题：前端无法加载用户列表
- 检查浏览器控制台错误
- 确认 API 路由可访问
- 验证登录状态（Cookie）

## 📚 相关文件

- **数据库迁移**: `migrations/0018_create_admin_users.sql`
- **API 路由**: `src/index-node.tsx` (约 3515-3650 行)
- **前端组件**: `src/pages/admin/UserManagement.tsx`
- **导航菜单**: `src/pages/admin/AdminLayout.tsx`

