import mysql from 'mysql2/promise'
import * as dotenv from 'dotenv'
import * as fs from 'fs'
import * as path from 'path'

// 加载环境变量
dotenv.config()

// MySQL连接配置
const DB_CONFIG = {
  host: process.env.MYSQL_HOST || 'localhost',
  port: parseInt(process.env.MYSQL_PORT || '3306'),
  database: process.env.MYSQL_DATABASE || 'zenava',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'zenava',
}

// 要添加的字段列表
const fieldsToAdd = [
  {
    name: 'video_file_zh',
    type: 'VARCHAR(500)',
    comment: '简体中文视频/音频文件URL',
    after: 'video_description_hk'
  },
  {
    name: 'video_file_en',
    type: 'VARCHAR(500)',
    comment: 'English video/audio file URL',
    after: 'video_file_zh'
  },
  {
    name: 'video_file_jp',
    type: 'VARCHAR(500)',
    comment: '日本語動画/音声ファイルURL',
    after: 'video_file_en'
  },
  {
    name: 'video_file_hk',
    type: 'VARCHAR(500)',
    comment: '繁體中文視頻/音頻文件URL',
    after: 'video_file_jp'
  },
  {
    name: 'attachment_file_zh',
    type: 'VARCHAR(500)',
    comment: '简体中文附件文件URL',
    after: 'attachment_name'
  },
  {
    name: 'attachment_file_en',
    type: 'VARCHAR(500)',
    comment: 'English attachment file URL',
    after: 'attachment_file_zh'
  },
  {
    name: 'attachment_file_jp',
    type: 'VARCHAR(500)',
    comment: '日本語添付ファイルURL',
    after: 'attachment_file_en'
  },
  {
    name: 'attachment_file_hk',
    type: 'VARCHAR(500)',
    comment: '繁體中文附件文件URL',
    after: 'attachment_file_jp'
  },
  {
    name: 'attachment_name_zh',
    type: 'VARCHAR(255)',
    comment: '简体中文附件文件名',
    after: 'attachment_file_hk'
  },
  {
    name: 'attachment_name_en',
    type: 'VARCHAR(255)',
    comment: 'English attachment file name',
    after: 'attachment_name_zh'
  },
  {
    name: 'attachment_name_jp',
    type: 'VARCHAR(255)',
    comment: '日本語添付ファイル名',
    after: 'attachment_name_en'
  },
  {
    name: 'attachment_name_hk',
    type: 'VARCHAR(255)',
    comment: '繁體中文附件文件名',
    after: 'attachment_name_jp'
  }
]

async function checkColumnExists(connection: mysql.Connection, columnName: string): Promise<boolean> {
  const [rows]: any = await connection.execute(
    `SELECT COUNT(*) as count FROM INFORMATION_SCHEMA.COLUMNS 
     WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'resource_contents' AND COLUMN_NAME = ?`,
    [DB_CONFIG.database, columnName]
  )
  return rows[0].count > 0
}

async function addColumn(connection: mysql.Connection, field: typeof fieldsToAdd[0]): Promise<void> {
  const exists = await checkColumnExists(connection, field.name)
  
  if (exists) {
    console.log(`⏭️  字段 ${field.name} 已存在，跳过`)
    return
  }

  const sql = `ALTER TABLE resource_contents 
               ADD COLUMN ${field.name} ${field.type} DEFAULT NULL 
               COMMENT ${mysql.escape(field.comment)} 
               AFTER ${field.after}`

  await connection.execute(sql)
  console.log(`✅ 已添加字段: ${field.name}`)
}

async function main() {
  let connection: mysql.Connection | null = null

  try {
    console.log('🔌 正在连接数据库...')
    console.log('📊 数据库配置:', {
      host: DB_CONFIG.host,
      port: DB_CONFIG.port,
      database: DB_CONFIG.database,
      user: DB_CONFIG.user,
      password: DB_CONFIG.password ? '***已设置***' : '❌未设置'
    })

    connection = await mysql.createConnection(DB_CONFIG)
    console.log('✅ 数据库连接成功')

    // 检查表是否存在
    const [tables]: any = await connection.execute(
      `SELECT COUNT(*) as count FROM INFORMATION_SCHEMA.TABLES 
       WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'resource_contents'`,
      [DB_CONFIG.database]
    )

    if (tables[0].count === 0) {
      throw new Error('表 resource_contents 不存在')
    }

    console.log('📋 开始添加多语言字段...')
    console.log(`   共 ${fieldsToAdd.length} 个字段需要添加\n`)

    // 逐个添加字段
    for (const field of fieldsToAdd) {
      await addColumn(connection, field)
    }

    console.log('\n✅ 迁移完成！所有字段已成功添加')
    console.log('\n📝 添加的字段:')
    fieldsToAdd.forEach(field => {
      console.log(`   - ${field.name}: ${field.comment}`)
    })

  } catch (error: any) {
    console.error('❌ 迁移失败:', error.message)
    console.error(error)
    process.exit(1)
  } finally {
    if (connection) {
      await connection.end()
      console.log('\n🔌 数据库连接已关闭')
    }
  }
}

main()

