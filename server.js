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
import { existsSync } from 'fs'

const distPath = join(__dirname, 'dist-node', 'index-node.js')
const srcPath = join(__dirname, 'src', 'index-node.tsx')

// 使用动态导入，根据文件存在性选择
const appModule = existsSync(distPath)
  ? await import('./dist-node/index-node.js')
  : existsSync(srcPath)
  ? await import('./src/index-node.tsx')
  : (() => {
      console.error('❌ 无法找到应用文件')
      console.error(`   尝试了: ${distPath}`)
      console.error(`   尝试了: ${srcPath}`)
      process.exit(1)
    })()

if (existsSync(distPath)) {
  console.log('📦 使用构建后的文件: dist-node/index-node.js')
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

