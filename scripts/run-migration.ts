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
  database: process.env.MYSQL_DATABASE || 'zenava',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '12345',
  multipleStatements: true,
}

async function runMigration(migrationFile: string) {
  console.log(`\n🚀 运行迁移文件: ${migrationFile}`)
  
  let connection
  try {
    // 连接数据库
    connection = await mysql.createConnection(DB_CONFIG)
    console.log('✅ 数据库连接成功')
    
    // 读取 SQL 文件
    const sqlFilePath = path.join(__dirname, '..', migrationFile)
    if (!fs.existsSync(sqlFilePath)) {
      throw new Error(`SQL 文件不存在: ${sqlFilePath}`)
    }
    
    const sqlScript = fs.readFileSync(sqlFilePath, 'utf-8')
    console.log(`✅ SQL 文件读取成功 (${sqlScript.length} 字符)`)
    
    // 执行 SQL 脚本
    console.log('⚙️  正在执行数据库迁移...')
    await connection.query(sqlScript)
    console.log('✅ 数据库迁移执行成功')
    
    // 验证表是否存在
    if (migrationFile.includes('category_banners')) {
      const [tables]: any = await connection.query(
        "SHOW TABLES LIKE 'category_banners'"
      )
      if (tables.length > 0) {
        console.log('✅ category_banners 表创建成功')
      }
    }
    
    if (migrationFile.includes('background')) {
      const [columns]: any = await connection.query(
        "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = ? AND TABLE_NAME IN ('resource_banners', 'category_banners') AND COLUMN_NAME LIKE 'background_url_%'",
        [DB_CONFIG.database]
      )
      if (columns.length > 0) {
        console.log(`✅ 多语言背景字段添加成功 (${columns.length} 个字段)`)
      }
    }
    
  } catch (error: any) {
    console.error('❌ 迁移失败:', error.message)
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

// 主函数
async function main() {
  const migrationFile = process.argv[2]
  
  if (!migrationFile) {
    console.error('❌ 请指定迁移文件路径')
    console.log('用法: npx tsx scripts/run-migration.ts migrations/0015_create_category_banners.sql')
    process.exit(1)
  }
  
  try {
    await runMigration(migrationFile)
    console.log('\n✨ 迁移完成！')
  } catch (error) {
    console.error('\n❌ 迁移失败')
    process.exit(1)
  }
}

main()

