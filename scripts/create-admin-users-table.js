#!/usr/bin/env node

/**
 * 创建管理员用户表的脚本
 * 使用方法: node scripts/create-admin-users-table.js
 */

import mysql from 'mysql2/promise'
import * as dotenv from 'dotenv'
import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

// 加载环境变量
dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// MySQL连接配置
const dbConfig = {
  host: process.env.MYSQL_HOST || 'localhost',
  port: parseInt(process.env.MYSQL_PORT || '3306'),
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '12345',
  database: process.env.MYSQL_DATABASE || 'zenava',
  multipleStatements: true
}

async function createAdminUsersTable() {
  let connection = null
  
  try {
    console.log('📊 连接数据库:', {
      host: dbConfig.host,
      port: dbConfig.port,
      user: dbConfig.user,
      database: dbConfig.database
    })
    
    // 创建连接
    connection = await mysql.createConnection(dbConfig)
    console.log('✅ 数据库连接成功')
    
    // 读取SQL文件
    const sqlFile = join(__dirname, '../migrations/0018_create_admin_users.sql')
    const sql = readFileSync(sqlFile, 'utf-8')
    
    console.log('📝 执行SQL迁移文件...')
    
    // 执行SQL
    await connection.query(sql)
    
    console.log('✅ admin_users 表创建成功！')
    
    // 验证表是否存在
    const [tables] = await connection.query(
      "SHOW TABLES LIKE 'admin_users'"
    )
    
    if (tables.length > 0) {
      console.log('✅ 验证: admin_users 表已存在')
      
      // 显示表结构
      const [columns] = await connection.query('DESCRIBE admin_users')
      console.log('\n📋 表结构:')
      console.table(columns)
    }
    
  } catch (error) {
    console.error('❌ 创建表失败:', error.message)
    
    if (error.code === 'ER_TABLE_EXISTS_ERROR') {
      console.log('ℹ️  表已存在，跳过创建')
    } else {
      throw error
    }
  } finally {
    if (connection) {
      await connection.end()
      console.log('✅ 数据库连接已关闭')
    }
  }
}

// 执行
createAdminUsersTable()
  .then(() => {
    console.log('\n🎉 完成！')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ 执行失败:', error)
    process.exit(1)
  })

