# 数据库表创建文档

## 📋 概述

本文档说明需要创建的数据库表结构，用于支持资源中心Banner管理功能。

---

## 🗄️ 表结构：resource_banners

### 表名
`resource_banners` - 资源中心Banner管理表

### 用途
用于存储和管理资源中心的Banner轮播图数据，支持两种显示模式：
- **文字+图片模式** (`text_image`): 包含文字标题、副标题、按钮和背景图片
- **整张大图模式** (`full_image`): 仅显示一张完整的Banner图片

---

## 📐 完整SQL创建语句

```sql
-- 资源中心Banner表
CREATE TABLE IF NOT EXISTS resource_banners (
  id INT AUTO_INCREMENT PRIMARY KEY,
  banner_type VARCHAR(20) NOT NULL DEFAULT 'text_image' COMMENT 'Banner类型: text_image(文字+图片), full_image(整张大图)',
  
  -- 公共字段
  title VARCHAR(255) NOT NULL COMMENT '标题/说明',
  sort_order INT DEFAULT 0 COMMENT '排序',
  status VARCHAR(20) DEFAULT 'draft' COMMENT '状态: draft(草稿), published(已发布)',
  
  -- 文字+图片模式字段
  text_title VARCHAR(255) COMMENT '文字标题(text_image模式)',
  text_subtitle TEXT COMMENT '文字副标题(text_image模式)',
  text_button VARCHAR(100) COMMENT '按钮文字(text_image模式)',
  button_link VARCHAR(500) COMMENT '按钮链接(text_image模式)',
  button_target VARCHAR(20) DEFAULT '_self' COMMENT '打开方式: _self(当前页), _blank(新页面)',
  text_position VARCHAR(20) DEFAULT 'left' COMMENT '文字位置: left(左), center(中), right(右), no-text(无文字)',
  text_color VARCHAR(50) DEFAULT 'rgba(255,255,255,1)' COMMENT '文字颜色',
  subtitle_color VARCHAR(50) DEFAULT 'rgba(255,255,255,0.8)' COMMENT '副标题颜色',
  image_url VARCHAR(500) COMMENT '图片/动图URL(text_image模式)',
  background_type VARCHAR(20) DEFAULT 'image' COMMENT '背景类型: image(图片/动图), video(视频)',
  background_url VARCHAR(500) COMMENT '背景URL',
  
  -- 整张大图模式字段
  full_image_url VARCHAR(500) COMMENT '完整Banner图URL(full_image模式)',
  link_url VARCHAR(500) COMMENT '链接地址(full_image模式)',
  link_target VARCHAR(20) DEFAULT '_self' COMMENT '打开方式(full_image模式)',
  
  -- 时间戳
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_sort_order (sort_order),
  INDEX idx_status (status),
  INDEX idx_banner_type (banner_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='资源中心Banner管理表';
```

---

## 📊 字段详细说明

### 主键字段
| 字段名 | 类型 | 说明 |
|--------|------|------|
| `id` | INT AUTO_INCREMENT | 主键，自增ID |

### 公共字段
| 字段名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| `banner_type` | VARCHAR(20) | ✅ | `'text_image'` | Banner类型：`text_image`(文字+图片) 或 `full_image`(整张大图) |
| `title` | VARCHAR(255) | ✅ | - | 标题/说明，用于后台识别，不会显示在前台 |
| `sort_order` | INT | ❌ | `0` | 排序值，数字越小越靠前 |
| `status` | VARCHAR(20) | ❌ | `'draft'` | 状态：`draft`(草稿) 或 `published`(已发布) |

### 文字+图片模式字段 (`banner_type = 'text_image'`)
| 字段名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| `text_title` | VARCHAR(255) | ❌ | - | Banner主标题 |
| `text_subtitle` | TEXT | ❌ | - | Banner副标题 |
| `text_button` | VARCHAR(100) | ❌ | - | 按钮文字 |
| `button_link` | VARCHAR(500) | ❌ | - | 按钮链接地址 |
| `button_target` | VARCHAR(20) | ❌ | `'_self'` | 链接打开方式：`_self`(当前页) 或 `_blank`(新页面) |
| `text_position` | VARCHAR(20) | ❌ | `'left'` | 文字位置：`left`(左)、`center`(中)、`right`(右)、`no-text`(无文字) |
| `text_color` | VARCHAR(50) | ❌ | `'rgba(255,255,255,1)'` | 文字颜色，RGBA格式 |
| `subtitle_color` | VARCHAR(50) | ❌ | `'rgba(255,255,255,0.8)'` | 副标题颜色，RGBA格式 |
| `image_url` | VARCHAR(500) | ❌ | - | 图片/动图URL |
| `background_type` | VARCHAR(20) | ❌ | `'image'` | 背景类型：`image`(图片/动图) 或 `video`(视频) |
| `background_url` | VARCHAR(500) | ❌ | - | 背景URL |

### 整张大图模式字段 (`banner_type = 'full_image'`)
| 字段名 | 类型 | 必填 | 默认值 | 说明 |
|--------|------|------|--------|------|
| `full_image_url` | VARCHAR(500) | ❌ | - | 完整Banner图URL |
| `link_url` | VARCHAR(500) | ❌ | - | 链接地址 |
| `link_target` | VARCHAR(20) | ❌ | `'_self'` | 链接打开方式：`_self`(当前页) 或 `_blank`(新页面) |

### 时间戳字段
| 字段名 | 类型 | 说明 |
|--------|------|------|
| `created_at` | TIMESTAMP | 创建时间，自动设置 |
| `updated_at` | TIMESTAMP | 更新时间，自动更新 |

---

## 🔍 索引说明

| 索引名 | 字段 | 说明 |
|--------|------|------|
| `idx_sort_order` | `sort_order` | 用于排序查询优化 |
| `idx_status` | `status` | 用于按状态筛选优化 |
| `idx_banner_type` | `banner_type` | 用于按类型筛选优化 |

---

## 📝 业务逻辑说明

### Banner类型与排版的关系

根据最新的代码实现，`banner_type` 字段会根据 `text_position` 的值自动设置：

- **当 `text_position` = `'no-text'`** 时：
  - `banner_type` 自动设置为 `'full_image'`
  - 显示整张大图模式配置表单
  - 使用 `full_image_url`、`link_url`、`link_target` 字段

- **当 `text_position` = `'left'`、`'center'` 或 `'right'`** 时：
  - `banner_type` 自动设置为 `'text_image'`
  - 显示文字+图片模式配置表单
  - 使用 `text_title`、`text_subtitle`、`background_url` 等字段

### 字段使用规则

1. **文字+图片模式** (`banner_type = 'text_image'`)：
   - 使用字段：`text_title`, `text_subtitle`, `text_button`, `button_link`, `button_target`, `text_position`, `text_color`, `subtitle_color`, `background_type`, `background_url`
   - `image_url` 字段已废弃，不再使用
   - `full_image_url`, `link_url`, `link_target` 字段不使用

2. **整张大图模式** (`banner_type = 'full_image'`)：
   - 使用字段：`full_image_url`, `link_url`, `link_target`
   - 文字相关字段不使用

---

## 🚀 执行步骤

### 方法一：使用 Node.js 脚本（推荐）⭐

项目提供了自动化脚本，无需安装 MySQL 客户端：

```bash
npm run db:create-banners-table
```

或者直接使用 tsx：

```bash
npx tsx scripts/create-resource-banners-table.ts
```

**脚本功能：**
- ✅ 自动读取迁移文件
- ✅ 检查表是否已存在
- ✅ 显示详细的表结构信息
- ✅ 显示索引信息
- ✅ 友好的错误提示和故障排查建议

**强制重新创建表（如果表已存在）：**
```bash
npx tsx scripts/create-resource-banners-table.ts --force
```

### 方法二：直接执行SQL文件

如果系统中已安装 MySQL 客户端，可以直接执行：

```bash
mysql -u [用户名] -p [数据库名] < migrations/0010_resource_banners.sql
```

**示例（使用默认配置）：**
```bash
mysql -u root -p12345 zenava < migrations/0010_resource_banners.sql
```

### 方法三：在MySQL客户端执行

1. 连接到MySQL数据库：
```bash
mysql -u [用户名] -p [数据库名]
```

2. 复制上面的完整SQL创建语句并执行

3. 验证表是否创建成功：
```sql
SHOW TABLES LIKE 'resource_banners';
DESCRIBE resource_banners;
```

---

## ⚠️ 注意事项

1. **字符集设置**：表使用 `utf8mb4` 字符集，支持完整的Unicode字符（包括emoji）

2. **字段兼容性**：
   - `text_position` 字段支持 `'no-text'` 值（虽然注释中未明确说明，但VARCHAR(20)可以存储）
   - `image_url` 字段在数据库中保留，但前端代码已不再使用

3. **数据迁移**：
   - 如果已有旧数据，需要确保 `banner_type` 和 `text_position` 的值保持一致
   - 建议在创建表后运行数据一致性检查

4. **权限要求**：
   - 执行创建表的用户需要有 `CREATE TABLE` 权限
   - 建议使用数据库管理员账户执行

---

## 🔧 故障排查

### 错误：Table 'zenava.resource_banners' doesn't exist

**原因**：数据库表尚未创建

**解决方法**：
1. 按照本文档的"执行步骤"创建表
2. 确认数据库名称是否正确（示例中使用的是 `zenava`）
3. 确认用户有创建表的权限

### 错误：Duplicate column name

**原因**：表中已存在某个字段

**解决方法**：
1. 检查表是否已部分创建
2. 使用 `DESCRIBE resource_banners;` 查看现有结构
3. 如果表已存在，考虑使用 `ALTER TABLE` 语句添加缺失的字段

---

## 📚 相关文件

- **迁移文件**：`migrations/0010_resource_banners.sql`
- **API文件**：`src/api/resource-banners.ts`
- **编辑器组件**：`src/pages/admin/BannerEditor.tsx`
- **管理页面**：`src/pages/admin/ResourceBannerManagement.tsx`

---

## 📅 更新记录

- **2024-XX-XX**: 初始版本，创建 `resource_banners` 表
- **2024-XX-XX**: 更新 `text_position` 字段说明，支持 `'no-text'` 值

---

## ✅ 验证清单

创建表后，请验证以下内容：

- [ ] 表 `resource_banners` 已成功创建
- [ ] 所有字段类型和默认值正确
- [ ] 索引已创建（`idx_sort_order`, `idx_status`, `idx_banner_type`）
- [ ] 字符集为 `utf8mb4`
- [ ] 可以执行 INSERT 操作
- [ ] 可以执行 SELECT 操作
- [ ] 时间戳字段自动更新功能正常

---

**文档版本**：1.0  
**最后更新**：2024-XX-XX

