# 🖼️ 图片存储方案设计

## 📊 存储架构

### 推荐方案：文件系统存储 + 数据库存储路径

```
用户上传图片
    ↓
服务器接收
    ↓
文件存储到服务器磁盘 (/public/uploads/categories/)
    ↓
数据库存储相对路径 (/uploads/categories/xxx.jpg)
    ↓
前端通过路径访问图片
```

## 🗂️ 目录结构

```
webapp/
├── public/
│   ├── uploads/              # 上传文件根目录
│   │   ├── categories/       # 栏目封面图
│   │   │   ├── 2024/        # 按年份分类
│   │   │   │   ├── 12/      # 按月份分类
│   │   │   │   │   ├── uuid-filename.jpg
│   │   │   │   │   ├── uuid-filename.png
│   │   ├── contents/         # 内容配图
│   │   ├── temp/            # 临时文件（定期清理）
```

**优点**:
- ✅ 按时间组织，便于管理
- ✅ 避免单个目录文件过多
- ✅ 便于备份和迁移

## 🗄️ 数据库设计

### 方案 1: 简单方案（推荐用于中小型项目）

```sql
-- 在 resource_categories 表中直接存储图片路径
ALTER TABLE resource_categories 
ADD COLUMN description TEXT COMMENT '栏目描述',
ADD COLUMN cover_image VARCHAR(500) COMMENT '封面图片路径' AFTER description,
ADD COLUMN cover_image_size INT COMMENT '图片大小(字节)' AFTER cover_image,
ADD COLUMN cover_image_type VARCHAR(50) COMMENT '图片类型' AFTER cover_image_size;

-- 示例数据
-- cover_image: /uploads/categories/2024/12/uuid-company-news.jpg
-- cover_image_size: 524288 (512KB)
-- cover_image_type: image/jpeg
```

**字段说明**:
- `cover_image`: 相对路径，可以直接在前端使用 `<img src="/uploads/categories/...">`
- `cover_image_size`: 记录文件大小，用于统计和管理
- `cover_image_type`: 记录 MIME 类型，用于验证和显示

### 方案 2: 独立图片表（推荐用于大型项目）

```sql
-- 创建独立的图片管理表
CREATE TABLE uploaded_images (
  id INT PRIMARY KEY AUTO_INCREMENT,
  uuid VARCHAR(36) UNIQUE NOT NULL COMMENT 'UUID',
  original_name VARCHAR(255) NOT NULL COMMENT '原始文件名',
  stored_path VARCHAR(500) NOT NULL COMMENT '存储路径',
  file_size INT NOT NULL COMMENT '文件大小(字节)',
  mime_type VARCHAR(100) NOT NULL COMMENT 'MIME类型',
  width INT COMMENT '图片宽度',
  height INT COMMENT '图片高度',
  uploaded_by INT COMMENT '上传者ID',
  used_by_table VARCHAR(50) COMMENT '使用表名',
  used_by_id INT COMMENT '使用记录ID',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_uuid (uuid),
  INDEX idx_used (used_by_table, used_by_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='上传图片管理表';

-- resource_categories 表只存储图片ID
ALTER TABLE resource_categories 
ADD COLUMN description TEXT COMMENT '栏目描述',
ADD COLUMN cover_image_id INT COMMENT '封面图片ID' AFTER description,
ADD FOREIGN KEY (cover_image_id) REFERENCES uploaded_images(id) ON DELETE SET NULL;
```

**优点**:
- ✅ 统一管理所有上传的图片
- ✅ 便于追踪图片使用情况
- ✅ 便于清理未使用的图片
- ✅ 支持图片复用

**缺点**:
- ⚠️ 查询稍微复杂一点（需要 JOIN）
- ⚠️ 初期开发成本高

## 💡 推荐选择

**对于您的项目，推荐使用 方案 1（简单方案）**

**理由**:
1. 后台管理系统，图片数量有限
2. 开发快速，维护简单
3. 性能完全够用
4. 后期可以平滑升级到方案 2

## 📝 实现代码

### 1. 数据库更新脚本

```sql
-- 更新 resource_categories 表
ALTER TABLE resource_categories 
ADD COLUMN description TEXT COMMENT '栏目描述' AFTER name,
ADD COLUMN cover_image VARCHAR(500) COMMENT '封面图片路径' AFTER description,
ADD COLUMN cover_image_size INT COMMENT '图片大小(字节)' AFTER cover_image,
ADD COLUMN cover_image_type VARCHAR(50) COMMENT '图片类型' AFTER cover_image_size;
```

### 2. 创建上传目录

```bash
mkdir -p public/uploads/categories
mkdir -p public/uploads/contents
mkdir -p public/uploads/temp

# 设置权限
chmod 755 public/uploads
chmod 755 public/uploads/categories
chmod 755 public/uploads/contents
chmod 755 public/uploads/temp
```

### 3. 图片上传 API

**文件**: `src/lib/upload.ts`

```typescript
import { createWriteStream } from 'fs'
import { mkdir } from 'fs/promises'
import { join, extname } from 'path'
import { v4 as uuidv4 } from 'uuid'

interface UploadResult {
  success: boolean
  path?: string
  url?: string
  size?: number
  type?: string
  error?: string
}

// 允许的图片类型
const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp']
const MAX_SIZE = 30 * 1024 * 1024 // 30MB

/**
 * 保存上传的图片
 * @param file 文件对象
 * @param category 分类 (categories/contents/temp)
 * @returns 上传结果
 */
export async function saveUploadedImage(
  file: File,
  category: 'categories' | 'contents' | 'temp' = 'categories'
): Promise<UploadResult> {
  try {
    // 1. 验证文件类型
    if (!ALLOWED_TYPES.includes(file.type)) {
      return {
        success: false,
        error: '不支持的图片格式，请上传 PNG、JPG 或 WebP 格式'
      }
    }

    // 2. 验证文件大小
    if (file.size > MAX_SIZE) {
      return {
        success: false,
        error: '文件大小超过限制（最大 30MB）'
      }
    }

    // 3. 生成存储路径
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    
    // 目录: /uploads/categories/2024/12/
    const uploadDir = join(process.cwd(), 'public', 'uploads', category, String(year), month)
    
    // 4. 确保目录存在
    await mkdir(uploadDir, { recursive: true })

    // 5. 生成文件名: uuid-原始名
    const uuid = uuidv4().slice(0, 8)
    const ext = extname(file.name)
    const safeName = file.name
      .replace(ext, '')
      .replace(/[^a-zA-Z0-9\u4e00-\u9fa5-]/g, '-')
      .slice(0, 50)
    const filename = `${uuid}-${safeName}${ext}`
    
    // 完整路径
    const filePath = join(uploadDir, filename)
    
    // 6. 保存文件
    const buffer = await file.arrayBuffer()
    const nodeBuffer = Buffer.from(buffer)
    await writeFile(filePath, nodeBuffer)

    // 7. 返回相对路径（用于数据库和前端访问）
    const relativePath = `/uploads/${category}/${year}/${month}/${filename}`

    return {
      success: true,
      path: relativePath,
      url: relativePath, // 前端可以直接使用
      size: file.size,
      type: file.type
    }
  } catch (error) {
    console.error('图片上传失败:', error)
    return {
      success: false,
      error: '图片上传失败，请重试'
    }
  }
}

/**
 * 删除已上传的图片
 * @param imagePath 图片相对路径
 */
export async function deleteUploadedImage(imagePath: string): Promise<boolean> {
  try {
    const fs = await import('fs/promises')
    const fullPath = join(process.cwd(), 'public', imagePath)
    await fs.unlink(fullPath)
    return true
  } catch (error) {
    console.error('删除图片失败:', error)
    return false
  }
}
```

**依赖**: 需要安装 `uuid`

```bash
npm install uuid
npm install --save-dev @types/uuid
```

### 4. 图片上传 API 路由

**文件**: `src/index-node.tsx`

```typescript
import { saveUploadedImage } from './lib/upload'

// 图片上传接口
app.post('/api/admin/upload/image', requireAuth(), async (c) => {
  try {
    const formData = await c.req.formData()
    const file = formData.get('file') as File
    const category = formData.get('category') as string || 'categories'

    if (!file) {
      return c.json({
        success: false,
        error: '没有接收到文件'
      }, 400)
    }

    const result = await saveUploadedImage(file, category)
    
    if (result.success) {
      return c.json({
        success: true,
        data: {
          url: result.url,
          path: result.path,
          size: result.size,
          type: result.type
        }
      })
    } else {
      return c.json({
        success: false,
        error: result.error
      }, 400)
    }
  } catch (error: any) {
    console.error('上传失败:', error)
    return c.json({
      success: false,
      error: '服务器错误'
    }, 500)
  }
})
```

### 5. 更新创建栏目 API

```typescript
app.post('/api/admin/resource-categories', async (c) => {
  try {
    const { 
      sort_order, 
      name, 
      slug, 
      description,      // 新增
      cover_image,      // 新增
      cover_image_size, // 新增
      cover_image_type, // 新增
      list_template, 
      detail_template, 
      is_visible 
    } = await c.req.json()
    
    if (!name || !slug || !list_template || !detail_template) {
      return c.json({ 
        success: false, 
        error: '缺少必填字段' 
      }, 400)
    }
    
    const result: any = await mysqlQuery(
      `INSERT INTO resource_categories 
       (sort_order, name, link, description, cover_image, cover_image_size, cover_image_type, 
        category_template, page_template, is_displayed) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        sort_order || 0, 
        name, 
        slug, 
        description || null,
        cover_image || null,
        cover_image_size || null,
        cover_image_type || null,
        list_template, 
        detail_template, 
        is_visible !== false
      ]
    )
    
    return c.json({ 
      success: true, 
      data: { 
        id: result.insertId,
        sort_order,
        name,
        slug,
        description,
        cover_image,
        list_template,
        detail_template,
        is_visible
      }
    })
  } catch (error: any) {
    console.error('创建栏目失败:', error)
    return c.json({ 
      success: false, 
      error: error.message
    }, 500)
  }
})
```

### 6. 前端上传逻辑

**文件**: `src/pages/admin/ResourceCategoryManagement.tsx`

```javascript
// 在表单提交时，先上传图片
categoryForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const categoryId = document.getElementById('category-id').value;
  let coverImagePath = document.getElementById('category-cover-url').value || '';
  let coverImageSize = 0;
  let coverImageType = '';
  
  // 如果选择了图片文件，先上传
  const coverFile = document.getElementById('category-cover-file').files[0];
  if (coverFile && !coverImagePath) {
    try {
      // 显示上传进度
      const uploadBtn = document.querySelector('[type="submit"]');
      uploadBtn.disabled = true;
      uploadBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>上传中...';
      
      // 上传图片
      const formData = new FormData();
      formData.append('file', coverFile);
      formData.append('category', 'categories');
      
      const uploadResponse = await fetch('/api/admin/upload/image', {
        method: 'POST',
        body: formData
      });
      
      const uploadResult = await uploadResponse.json();
      
      if (uploadResult.success) {
        coverImagePath = uploadResult.data.path;
        coverImageSize = uploadResult.data.size;
        coverImageType = uploadResult.data.type;
      } else {
        alert('图片上传失败: ' + uploadResult.error);
        uploadBtn.disabled = false;
        uploadBtn.innerHTML = '<i class="fas fa-save mr-2"></i>保存';
        return;
      }
    } catch (error) {
      console.error('上传图片失败:', error);
      alert('图片上传失败，请重试');
      return;
    }
  }
  
  // 提交栏目数据
  const formData = {
    sort_order: parseInt(document.getElementById('category-sort-order').value) || 0,
    name: document.getElementById('category-name').value,
    slug: document.getElementById('category-slug').value,
    description: document.getElementById('category-description').value || '',
    cover_image: coverImagePath,
    cover_image_size: coverImageSize,
    cover_image_type: coverImageType,
    list_template: document.getElementById('category-list-template').value,
    detail_template: document.getElementById('category-list-template').value,
    is_visible: document.getElementById('category-is-visible').checked,
  };
  
  // ... 保存栏目数据
});
```

## 📊 数据示例

### 数据库存储
```sql
INSERT INTO resource_categories VALUES (
  1,                                                    -- id
  0,                                                    -- sort_order
  '公司动态',                                            -- name
  '/a/186',                                            -- link
  '公司最新动态、新闻发布、活动报道',                      -- description
  '/uploads/categories/2024/12/a1b2c3d4-company.jpg',  -- cover_image
  524288,                                              -- cover_image_size (512KB)
  'image/jpeg',                                        -- cover_image_type
  'list_article',                                      -- category_template
  'list_article',                                      -- page_template
  1,                                                   -- is_displayed
  NOW(),                                               -- created_at
  NOW()                                                -- updated_at
);
```

### 前端使用
```html
<!-- 直接使用路径 -->
<img src="/uploads/categories/2024/12/a1b2c3d4-company.jpg" alt="公司动态" />

<!-- 或使用完整URL -->
<img src="https://your-domain.com/uploads/categories/2024/12/a1b2c3d4-company.jpg" alt="公司动态" />
```

## 🔐 安全注意事项

### 1. 文件类型验证
```typescript
// 后端验证（不能只依赖前端）
const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp']
const ALLOWED_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp']

// 验证 MIME 类型
if (!ALLOWED_TYPES.includes(file.type)) {
  return error
}

// 验证文件扩展名
const ext = extname(file.name).toLowerCase()
if (!ALLOWED_EXTENSIONS.includes(ext)) {
  return error
}
```

### 2. 文件大小限制
```typescript
const MAX_SIZE = 30 * 1024 * 1024 // 30MB

if (file.size > MAX_SIZE) {
  return error
}
```

### 3. 文件名安全
```typescript
// 使用 UUID + 清理后的原始名称
const uuid = uuidv4().slice(0, 8)
const safeName = originalName
  .replace(/[^a-zA-Z0-9\u4e00-\u9fa5-]/g, '-')
  .slice(0, 50)
```

### 4. 目录权限
```bash
# Linux/Mac
chmod 755 public/uploads
chown www-data:www-data public/uploads

# 不要使用 777 权限！
```

### 5. 防止路径遍历攻击
```typescript
// 验证路径不包含 ..
if (path.includes('..') || path.includes('~')) {
  return error
}

// 使用 path.join 而不是字符串拼接
const safePath = join(BASE_DIR, category, filename)
```

## 🗑️ 图片清理策略

### 1. 删除栏目时清理图片
```typescript
app.delete('/api/admin/resource-categories/:id', async (c) => {
  const id = c.req.param('id')
  
  // 1. 获取栏目信息
  const [category] = await mysqlQuery<any[]>(
    'SELECT cover_image FROM resource_categories WHERE id = ?',
    [id]
  )
  
  // 2. 删除栏目记录
  await mysqlQuery('DELETE FROM resource_categories WHERE id = ?', [id])
  
  // 3. 删除图片文件
  if (category?.cover_image) {
    await deleteUploadedImage(category.cover_image)
  }
  
  return c.json({ success: true })
})
```

### 2. 定期清理临时文件
```typescript
// 清理超过24小时的临时文件
import { readdir, stat, unlink } from 'fs/promises'

async function cleanupTempFiles() {
  const tempDir = join(process.cwd(), 'public', 'uploads', 'temp')
  const files = await readdir(tempDir)
  const now = Date.now()
  const maxAge = 24 * 60 * 60 * 1000 // 24小时

  for (const file of files) {
    const filePath = join(tempDir, file)
    const stats = await stat(filePath)
    
    if (now - stats.mtimeMs > maxAge) {
      await unlink(filePath)
      console.log(`清理临时文件: ${file}`)
    }
  }
}

// 每天执行一次
setInterval(cleanupTempFiles, 24 * 60 * 60 * 1000)
```

## 📈 未来扩展方案

### 1. CDN 加速
```typescript
// 配置 CDN 域名
const CDN_DOMAIN = process.env.CDN_DOMAIN || ''

function getImageUrl(path: string): string {
  if (CDN_DOMAIN) {
    return `${CDN_DOMAIN}${path}`
  }
  return path
}
```

### 2. 图片处理（压缩、缩略图）
```bash
npm install sharp
```

```typescript
import sharp from 'sharp'

// 生成缩略图
await sharp(filePath)
  .resize(800, 600, { fit: 'inside' })
  .jpeg({ quality: 85 })
  .toFile(thumbnailPath)
```

### 3. 对象存储（OSS/S3）
- 阿里云 OSS
- 腾讯云 COS  
- AWS S3
- 七牛云

适合大规模应用，但增加成本和复杂度。

## 📝 总结

### 推荐方案
✅ **文件系统存储 + 数据库存储路径**

### 数据库设计
```sql
ALTER TABLE resource_categories 
ADD COLUMN description TEXT,
ADD COLUMN cover_image VARCHAR(500),
ADD COLUMN cover_image_size INT,
ADD COLUMN cover_image_type VARCHAR(50);
```

### 目录结构
```
public/uploads/categories/YYYY/MM/uuid-filename.ext
```

### 优点
- ✅ 简单易维护
- ✅ 性能好
- ✅ 易于备份
- ✅ 成本低
- ✅ 可平滑升级

---

**现在需要我帮您实现这套方案吗？** 🚀


