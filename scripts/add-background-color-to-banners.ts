import mysql from 'mysql2/promise'
import * as dotenv from 'dotenv'

// 加载环境变量
dotenv.config()

// 数据库配置
const DB_CONFIG = {
  host: process.env.MYSQL_HOST || 'localhost',
  port: parseInt(process.env.MYSQL_PORT || '3306'),
  database: process.env.MYSQL_DATABASE || 'ZENAVA_LOCAL',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '12345',
}

async function addBackgroundColorToBanners() {
  console.log('\n🚀 添加背景色字段到 Banner 表\n')
  
  let connection
  try {
    // 连接数据库
    console.log('📡 正在连接数据库...')
    connection = await mysql.createConnection(DB_CONFIG)
    console.log('✅ 数据库连接成功\n')
    
    // 检查并添加字段的函数
    const addColumnIfNotExists = async (tableName: string, columnName: string, comment: string, afterColumn: string) => {
      // 检查字段是否存在
      const [columns]: any = await connection.query(
        `SELECT COUNT(*) as count FROM INFORMATION_SCHEMA.COLUMNS 
         WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ? AND COLUMN_NAME = ?`,
        [DB_CONFIG.database, tableName, columnName]
      )
      
      if (columns[0].count === 0) {
        console.log(`📝 添加 ${tableName}.${columnName} 字段...`)
        await connection.query(
          `ALTER TABLE ${tableName} ADD COLUMN ${columnName} VARCHAR(50) NULL DEFAULT NULL COMMENT ${mysql.escape(comment)} AFTER ${afterColumn}`
        )
        console.log(`✅ ${tableName}.${columnName} 字段添加成功`)
      } else {
        console.log(`⏭️  ${tableName}.${columnName} 字段已存在，跳过`)
      }
    }
    
    // 为 resource_banners 表添加 background_color 字段
    await addColumnIfNotExists(
      'resource_banners',
      'background_color',
      '背景颜色，格式: rgba(R,G,B,透明度) 或 #RRGGBB',
      'subtitle_color'
    )
    
    // 为 category_banners 表添加 background_color 字段
    await addColumnIfNotExists(
      'category_banners',
      'background_color',
      '背景颜色，格式: rgba(R,G,B,透明度) 或 #RRGGBB',
      'subtitle_color'
    )
    
    console.log('\n🔍 验证字段...\n')
    
    // 验证字段是否添加成功
    const [resourceBannerColumns]: any = await connection.query(
      `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS 
       WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'resource_banners' AND COLUMN_NAME = 'background_color'`,
      [DB_CONFIG.database]
    )
    
    const [categoryBannerColumns]: any = await connection.query(
      `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS 
       WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'category_banners' AND COLUMN_NAME = 'background_color'`,
      [DB_CONFIG.database]
    )
    
    console.log('📊 已添加的背景色字段:')
    if (resourceBannerColumns.length > 0) {
      console.log('   ✓ resource_banners.background_color')
    }
    if (categoryBannerColumns.length > 0) {
      console.log('   ✓ category_banners.background_color')
    }
    
    console.log('\n✅ 迁移完成！\n')
    
  } catch (error: any) {
    console.error('❌ 迁移失败:', error.message)
    process.exit(1)
  } finally {
    if (connection) {
      await connection.end()
    }
  }
}

addBackgroundColorToBanners()


