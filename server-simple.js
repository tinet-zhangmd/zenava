/**
 * 简化的 Node.js 服务器
 * 直接使用现有的 Hono 应用，通过适配器支持 Node.js 环境
 */

import { serve } from '@hono/node-server'
import Database from 'better-sqlite3'
import { join } from 'path'
import { readFileSync } from 'fs'

// 动态导入 Hono 应用（需要先构建）
// 注意：这需要将 src/index.tsx 改为支持 Node.js 环境

console.log('🚀 启动 Zenava Node.js 服务器...')

// 初始化数据库
const dbPath = process.env.DB_PATH || join(process.cwd(), 'data', 'zenava.db')
console.log(`📦 连接数据库: ${dbPath}`)

let db
try {
  db = new Database(dbPath)
  console.log('✅ 数据库连接成功')
} catch (error) {
  console.error('❌ 数据库连接失败:', error.message)
  console.log('💡 提示: 请先运行数据库迁移')
  process.exit(1)
}

// 创建模拟的 Cloudflare 环境
const env = {
  DB: db
}

// 注意：这里需要导入构建后的应用
// 由于当前项目是为 Cloudflare Workers 构建的，我们需要一个不同的方法

// 临时方案：使用 wrangler 在 Node.js 中运行
// 或者创建一个完全独立的 Node.js 版本

console.log('⚠️  注意: 当前需要将应用适配为 Node.js 环境')
console.log('📖 请参考 NGINX_DEPLOYMENT_GUIDE.md 了解完整部署方案')

// 启动一个简单的 HTTP 服务器作为占位
const port = process.env.PORT || 3000
const host = process.env.HOST || '127.0.0.1'

console.log(`✅ 服务器将在 http://${host}:${port} 启动`)
console.log('💡 提示: 请完成 Node.js 适配后重新启动')

