#!/usr/bin/env node

/**
 * 将环境变量中的管理员账号迁移到数据库
 * 使用方法: node scripts/migrate-admin-to-db.js
 */

import mysql from 'mysql2/promise'
import * as dotenv from 'dotenv'
import crypto from 'crypto'

// 加载环境变量
dotenv.config()

// MySQL连接配置
const dbConfig = {
  host: process.env.MYSQL_HOST || 'localhost',
  port: parseInt(process.env.MYSQL_PORT || '3306'),
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '12345',
  database: process.env.MYSQL_DATABASE || 'zenava'
}

// 简单的密码哈希函数（与 security.ts 中的 hashPassword 保持一致）
async function hashPassword(password) {
  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(16).toString('hex')
    crypto.pbkdf2(password, salt, 10000, 64, 'sha512', (err, derivedKey) => {
      if (err) reject(err)
      resolve(salt + ':' + derivedKey.toString('hex'))
    })
  })
}

async function migrateAdminToDatabase() {
  let connection = null
  
  try {
    console.log('📊 连接数据库...')
    connection = await mysql.createConnection(dbConfig)
    console.log('✅ 数据库连接成功')
    
    // 从环境变量获取管理员账号
    const adminEmail = process.env.ADMIN_EMAIL || 'ticloudhoutai@zenava.ai'
    const adminPassword = process.env.ADMIN_PASSWORD || 'tinet.Az2167Hk'
    
    console.log('\n📋 准备迁移的管理员账号:')
    console.log('   邮箱:', adminEmail)
    console.log('   密码: ******** (已隐藏)')
    
    // 检查账号是否已存在
    const [existing] = await connection.query(
      'SELECT id, username, email FROM admin_users WHERE email = ?',
      [adminEmail]
    )
    
    if (existing.length > 0) {
      console.log('\n⚠️  账号已存在于数据库中:')
      console.log('   ID:', existing[0].id)
      console.log('   用户名:', existing[0].username)
      console.log('   邮箱:', existing[0].email)
      console.log('\n💡 如需更新密码，请使用用户管理界面或手动更新')
      return
    }
    
    // 生成密码哈希
    console.log('\n🔐 生成密码哈希...')
    const passwordHash = await hashPassword(adminPassword)
    
    // 从邮箱提取用户名（去掉@后面的部分）
    const username = adminEmail.split('@')[0] || 'Admin'
    
    // 插入管理员账号
    console.log('\n📝 插入管理员账号到数据库...')
    const [result] = await connection.query(
      `INSERT INTO admin_users (username, email, password_hash, role) 
       VALUES (?, ?, ?, ?)`,
      [username, adminEmail, passwordHash, 'super_admin']
    )
    
    console.log('✅ 管理员账号迁移成功！')
    console.log('\n📊 账号信息:')
    console.log('   ID:', result.insertId)
    console.log('   用户名:', username)
    console.log('   邮箱:', adminEmail)
    console.log('   角色: 超级管理员')
    
    // 验证插入
    const [verify] = await connection.query(
      'SELECT id, username, email, role FROM admin_users WHERE id = ?',
      [result.insertId]
    )
    
    if (verify.length > 0) {
      console.log('\n✅ 验证成功，账号已保存到数据库')
      console.table(verify)
    }
    
  } catch (error) {
    console.error('\n❌ 迁移失败:', error.message)
    
    if (error.code === 'ER_DUP_ENTRY') {
      console.log('\n💡 账号已存在，无需重复迁移')
    } else {
      throw error
    }
  } finally {
    if (connection) {
      await connection.end()
      console.log('\n✅ 数据库连接已关闭')
    }
  }
}

// 执行迁移
migrateAdminToDatabase()
  .then(() => {
    console.log('\n🎉 迁移完成！')
    console.log('\n💡 提示:')
    console.log('   1. 现在可以在用户管理页面看到管理员账号')
    console.log('   2. 可以继续使用环境变量中的账号登录（向后兼容）')
    console.log('   3. 建议后续通过用户管理界面添加更多管理员')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ 执行失败:', error)
    process.exit(1)
  })

