import mysql from 'mysql2/promise'
import * as dotenv from 'dotenv'
import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 加载环境变量
dotenv.config()

// 数据库配置
const DB_CONFIG = {
  host: process.env.MYSQL_HOST || 'localhost',
  port: parseInt(process.env.MYSQL_PORT || '3306'),
  database: process.env.MYSQL_DATABASE || 'ZENAVA_LOCAL',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '12345',
  multipleStatements: true,
}

async function addVideoDescriptionMultilingualFields() {
  console.log('\n🚀 添加视频简介多语言字段到 resource_contents 表\n')
  
  let connection
  try {
    // 连接数据库
    console.log('📡 正在连接数据库...')
    connection = await mysql.createConnection(DB_CONFIG)
    console.log('✅ 数据库连接成功\n')
    
    // 检查并添加字段的函数
    const addColumnIfNotExists = async (columnName: string, comment: string, afterColumn: string) => {
      // 检查字段是否存在
      const [columns]: any = await connection.query(
        `SELECT COUNT(*) as count FROM INFORMATION_SCHEMA.COLUMNS 
         WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'resource_contents' AND COLUMN_NAME = ?`,
        [DB_CONFIG.database, columnName]
      )
      
      if (columns[0].count === 0) {
        console.log(`📝 添加 ${columnName} 字段...`)
        // COMMENT 和 AFTER 不能使用参数化查询，需要直接拼接
        const sql = `ALTER TABLE resource_contents ADD COLUMN ${columnName} TEXT NULL COMMENT '${comment}' AFTER ${afterColumn}`
        await connection.execute(sql)
        console.log(`✅ ${columnName} 字段添加成功`)
      } else {
        console.log(`⏭️  ${columnName} 字段已存在，跳过`)
      }
    }
    
    // 添加各个多语言字段
    await addColumnIfNotExists('video_description_zh', '视频简介-简体中文', 'video_description')
    await addColumnIfNotExists('video_description_en', '视频简介-英文', 'video_description_zh')
    await addColumnIfNotExists('video_description_jp', '视频简介-日文', 'video_description_en')
    await addColumnIfNotExists('video_description_hk', '视频简介-繁体中文', 'video_description_jp')
    
    // 验证字段是否添加成功
    console.log('\n🔍 验证字段...')
    const [columns]: any = await connection.query(
      `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS 
       WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'resource_contents' 
       AND COLUMN_NAME LIKE 'video_description_%' 
       ORDER BY COLUMN_NAME`,
      [DB_CONFIG.database]
    )
    
    console.log('\n📊 已添加的视频简介多语言字段:')
    columns.forEach((col: any) => {
      console.log(`   ✓ ${col.COLUMN_NAME}`)
    })
    
    console.log('\n✨ 迁移完成！')
    
  } catch (error: any) {
    console.error('\n❌ 迁移失败:', error.message)
    if (error.sql) {
      console.error('SQL:', error.sql.substring(0, 200))
    }
    throw error
  } finally {
    if (connection) {
      await connection.end()
    }
  }
}

addVideoDescriptionMultilingualFields()

