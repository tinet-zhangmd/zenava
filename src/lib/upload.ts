import { writeFile, unlink } from 'fs/promises'
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
const ALLOWED_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp']
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

    // 2. 验证文件扩展名
    const ext = extname(file.name).toLowerCase()
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      return {
        success: false,
        error: '不支持的文件扩展名'
      }
    }

    // 3. 验证文件大小
    if (file.size > MAX_SIZE) {
      return {
        success: false,
        error: '文件大小超过限制（最大 30MB）'
      }
    }

    // 4. 生成存储路径
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    
    // 目录: /uploads/categories/2024/12/
    const uploadDir = join(process.cwd(), 'public', 'uploads', category, String(year), month)
    
    // 5. 确保目录存在
    const { mkdir } = await import('fs/promises')
    await mkdir(uploadDir, { recursive: true })

    // 6. 生成文件名: uuid-原始名（只保留英文数字和连字符）
    const uuid = uuidv4().slice(0, 8)
    const safeName = file.name
      .replace(ext, '')
      .replace(/[^a-zA-Z0-9-]/g, '-')  // 移除所有非英文数字和连字符的字符（包括中文）
      .replace(/-+/g, '-')  // 将多个连字符合并为一个
      .replace(/^-|-$/g, '')  // 移除首尾的连字符
      .slice(0, 50)
    const filename = safeName ? `${uuid}-${safeName}${ext}` : `${uuid}${ext}`
    
    // 完整路径
    const filePath = join(uploadDir, filename)
    
    // 7. 保存文件
    const buffer = await file.arrayBuffer()
    const nodeBuffer = Buffer.from(buffer)
    await writeFile(filePath, nodeBuffer)

    // 8. 返回相对路径（用于数据库和前端访问）
    const relativePath = `/uploads/${category}/${year}/${month}/${filename}`

    console.log(`✅ 图片上传成功: ${relativePath} (${(file.size / 1024).toFixed(2)} KB)`)

    return {
      success: true,
      path: relativePath,
      url: relativePath, // 前端可以直接使用
      size: file.size,
      type: file.type
    }
  } catch (error) {
    console.error('❌ 图片上传失败:', error)
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
    // 防止路径遍历攻击
    if (imagePath.includes('..') || imagePath.includes('~')) {
      console.error('❌ 非法路径:', imagePath)
      return false
    }

    const fullPath = join(process.cwd(), 'public', imagePath)
    await unlink(fullPath)
    console.log(`🗑️ 图片删除成功: ${imagePath}`)
    return true
  } catch (error) {
    console.error('❌ 删除图片失败:', error)
    return false
  }
}

/**
 * 清理临时文件（超过24小时）
 */
export async function cleanupTempFiles(): Promise<void> {
  try {
    const { readdir, stat, unlink } = await import('fs/promises')
    const tempDir = join(process.cwd(), 'public', 'uploads', 'temp')
    const files = await readdir(tempDir)
    const now = Date.now()
    const maxAge = 24 * 60 * 60 * 1000 // 24小时

    let cleanedCount = 0
    for (const file of files) {
      const filePath = join(tempDir, file)
      const stats = await stat(filePath)
      
      if (now - stats.mtimeMs > maxAge) {
        await unlink(filePath)
        cleanedCount++
      }
    }

    if (cleanedCount > 0) {
      console.log(`🧹 清理临时文件: ${cleanedCount} 个`)
    }
  } catch (error) {
    console.error('清理临时文件失败:', error)
  }
}


