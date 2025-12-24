import mysql from 'mysql2/promise'
import * as dotenv from 'dotenv'
import * as fs from 'fs'
import * as path from 'path'

// 加载环境变量
dotenv.config()

// MySQL连接配置
const dbConfig = {
  host: process.env.MYSQL_HOST || 'localhost',
  port: parseInt(process.env.MYSQL_PORT || '3306'),
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '12345',
  database: process.env.MYSQL_DATABASE || 'ZENAVA_LOCAL',
  multipleStatements: true
}

async function executeMigration() {
  let connection: mysql.Connection | null = null
  
  try {
    console.log('📊 连接数据库...')
    console.log('   主机:', dbConfig.host)
    console.log('   端口:', dbConfig.port)
    console.log('   用户:', dbConfig.user)
    console.log('   数据库:', dbConfig.database)
    
    connection = await mysql.createConnection(dbConfig)
    console.log('✅ 数据库连接成功\n')
    
    // 检查并添加 resource_banners 表的多语言链接字段
    console.log('📝 检查 resource_banners 表...')
    const [resourceBannerColumns]: any = await connection.execute(
      `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS 
       WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'resource_banners' 
       AND COLUMN_NAME IN ('button_link_zh', 'button_link_en', 'button_link_jp', 'button_link_hk', 'link_url_zh', 'link_url_en', 'link_url_jp', 'link_url_hk')`,
      [dbConfig.database]
    )
    
    const existingResourceColumns = resourceBannerColumns.map((row: any) => row.COLUMN_NAME)
    console.log('   已存在的字段:', existingResourceColumns.length > 0 ? existingResourceColumns.join(', ') : '无')
    
    // 添加缺失的字段
    const resourceBannerFields = [
      { name: 'button_link_zh', comment: '按钮链接-简体中文', after: 'button_link' },
      { name: 'button_link_en', comment: '按钮链接-英文', after: 'button_link_zh' },
      { name: 'button_link_jp', comment: '按钮链接-日文', after: 'button_link_en' },
      { name: 'button_link_hk', comment: '按钮链接-繁体中文', after: 'button_link_jp' },
      { name: 'link_url_zh', comment: '链接地址-简体中文(full_image模式)', after: 'link_url' },
      { name: 'link_url_en', comment: '链接地址-英文(full_image模式)', after: 'link_url_zh' },
      { name: 'link_url_jp', comment: '链接地址-日文(full_image模式)', after: 'link_url_en' },
      { name: 'link_url_hk', comment: '链接地址-繁体中文(full_image模式)', after: 'link_url_jp' }
    ]
    
    for (const field of resourceBannerFields) {
      if (!existingResourceColumns.includes(field.name)) {
        console.log(`   ➕ 添加字段: ${field.name}`)
        await connection.execute(
          `ALTER TABLE resource_banners 
           ADD COLUMN ${field.name} VARCHAR(500) NULL COMMENT '${field.comment}' AFTER ${field.after}`
        )
      } else {
        console.log(`   ⏭️  字段已存在: ${field.name}`)
      }
    }
    
    console.log('✅ resource_banners 表迁移完成\n')
    
    // 检查并添加 category_banners 表的多语言链接字段
    console.log('📝 检查 category_banners 表...')
    const [categoryBannerColumns]: any = await connection.execute(
      `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS 
       WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'category_banners' 
       AND COLUMN_NAME IN ('button_link_zh', 'button_link_en', 'button_link_jp', 'button_link_hk', 'link_url_zh', 'link_url_en', 'link_url_jp', 'link_url_hk')`,
      [dbConfig.database]
    )
    
    const existingCategoryColumns = categoryBannerColumns.map((row: any) => row.COLUMN_NAME)
    console.log('   已存在的字段:', existingCategoryColumns.length > 0 ? existingCategoryColumns.join(', ') : '无')
    
    // 添加缺失的字段
    const categoryBannerFields = [
      { name: 'button_link_zh', comment: '按钮链接-简体中文', after: 'button_link' },
      { name: 'button_link_en', comment: '按钮链接-英文', after: 'button_link_zh' },
      { name: 'button_link_jp', comment: '按钮链接-日文', after: 'button_link_en' },
      { name: 'button_link_hk', comment: '按钮链接-繁体中文', after: 'button_link_jp' },
      { name: 'link_url_zh', comment: '链接地址-简体中文(full_image模式)', after: 'link_url' },
      { name: 'link_url_en', comment: '链接地址-英文(full_image模式)', after: 'link_url_zh' },
      { name: 'link_url_jp', comment: '链接地址-日文(full_image模式)', after: 'link_url_en' },
      { name: 'link_url_hk', comment: '链接地址-繁体中文(full_image模式)', after: 'link_url_jp' }
    ]
    
    for (const field of categoryBannerFields) {
      if (!existingCategoryColumns.includes(field.name)) {
        console.log(`   ➕ 添加字段: ${field.name}`)
        await connection.execute(
          `ALTER TABLE category_banners 
           ADD COLUMN ${field.name} VARCHAR(500) NULL COMMENT '${field.comment}' AFTER ${field.after}`
        )
      } else {
        console.log(`   ⏭️  字段已存在: ${field.name}`)
      }
    }
    
    console.log('✅ category_banners 表迁移完成\n')
    
    console.log('🎉 迁移完成！所有多语言链接字段已成功添加。')
    
  } catch (error: any) {
    console.error('❌ 迁移失败:', error.message)
    if (error.sql) {
      console.error('   SQL:', error.sql)
    }
    process.exit(1)
  } finally {
    if (connection) {
      await connection.end()
      console.log('\n✅ 数据库连接已关闭')
    }
  }
}

// 执行迁移
executeMigration()

