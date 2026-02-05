/**
 * Node.js 服务器入口文件
 * 用于在 Nginx 后运行 Hono 应用（纯 Node.js，不需要 Wrangler）
 */

import { serve } from '@hono/node-server'
import { join } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { mkdirSync } from 'fs'

// 获取当前目录
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// 确保数据目录存在
const dataDir = join(process.cwd(), 'data')
try {
  mkdirSync(dataDir, { recursive: true })
} catch (e) {
  // 目录可能已存在
}

// 导入应用（Node.js 适配版本）
// 在生产环境中使用构建后的文件，开发环境使用源文件
import { existsSync, readdirSync, readFileSync } from 'fs'
import { join as pathJoin } from 'path'

// 查找构建后的文件（支持 hash 文件名）
function findDistFile() {
  const distDir = join(__dirname, 'dist-node')
  
  // 首先尝试查找 manifest.json（Vite 生成的文件清单）
  const manifestPath = join(distDir, 'manifest.json')
  if (existsSync(manifestPath)) {
    try {
      const manifest = JSON.parse(readFileSync(manifestPath, 'utf-8'))
      // manifest 格式: { "src/index-node.tsx": { "file": "index-node.[hash].js" } }
      const entryKey = Object.keys(manifest).find(key => key.includes('index-node'))
      if (entryKey && manifest[entryKey]?.file) {
        const fileName = manifest[entryKey].file
        const filePath = join(distDir, fileName)
        if (existsSync(filePath)) {
          return filePath
        }
      }
    } catch (error) {
      console.warn('⚠️  无法读取 manifest.json:', error.message)
    }
  }
  
  // 如果没有 manifest，尝试查找 index-node.*.js 文件（带 hash）
  if (existsSync(distDir)) {
    try {
      const files = readdirSync(distDir)
      const hashFile = files.find(file => 
        file.startsWith('index-node.') && file.endsWith('.js')
      )
      if (hashFile) {
        return join(distDir, hashFile)
      }
    } catch (error) {
      console.warn('⚠️  无法读取 dist-node 目录:', error.message)
    }
  }
  
  // 最后尝试固定文件名（向后兼容）
  const fixedPath = join(distDir, 'index-node.js')
  if (existsSync(fixedPath)) {
    return fixedPath
  }
  
  return null
}

const distPath = findDistFile()
const srcPath = join(__dirname, 'src', 'index-node.tsx')

// 使用动态导入，根据文件存在性选择
let appModule
if (distPath) {
  // 将绝对路径转换为相对路径（从项目根目录）
  const relativePath = distPath.replace(process.cwd() + '/', './')
  appModule = await import(relativePath)
} else if (existsSync(srcPath)) {
  appModule = await import('./src/index-node.tsx')
} else {
  console.error('❌ 无法找到应用文件')
  console.error(`   尝试了: dist-node/index-node.*.js`)
  console.error(`   尝试了: ${srcPath}`)
  process.exit(1)
}

if (distPath) {
  const fileName = distPath.split('/').pop()
  console.log(`📦 使用构建后的文件: dist-node/${fileName}`)
} else {
  console.log('🔧 使用源文件: src/index-node.tsx')
}

const app = appModule.default || appModule

// 启动服务器
const port = process.env.PORT || 3000
const host = process.env.HOST || '0.0.0.0'

console.log(`🚀 Zenava Node.js server starting...`)
console.log(`📦 Database: ${process.env.DB_PATH || join(dataDir, 'zenava.db')}`)
console.log(`🌐 Server: http://${host}:${port}`)

serve({
  fetch: app.fetch,
  port: Number(port),
  hostname: host
}, (info) => {
  console.log(`✅ Server is running on http://${info.address}:${info.port}`)
  console.log(`📝 Ready to accept requests`)
  console.log(`💡 Use Nginx to proxy requests to this server`)
})

