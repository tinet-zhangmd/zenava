/**
 * 添加 is_featured 字段到 resource_contents 表的脚本
 * Add is_featured Field to resource_contents Table Script
 * 
 * Usage: 
 *   npx tsx scripts/add-is-featured-field.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import mysql from 'mysql2/promise';
import * as dotenv from 'dotenv';

// 获取当前文件的目录路径（ES模块中的 __dirname 替代方案）
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 加载 .env 文件
dotenv.config({ path: path.join(__dirname, '../.env') });

// 数据库配置（从环境变量读取，或使用默认值）
const DB_CONFIG = {
  host: process.env.MYSQL_HOST || 'localhost',
  port: parseInt(process.env.MYSQL_PORT || '3306'),
  database: process.env.MYSQL_DATABASE || 'zenava',
  user: process.env.MYSQL_USER || 'zenava',
  password: process.env.MYSQL_PASSWORD || '',
  multipleStatements: true, // 允许执行多条 SQL 语句
};

async function addIsFeaturedField() {
  console.log('🚀 开始添加 is_featured 字段到 resource_contents 表...\n');
  console.log('📊 数据库配置:');
  console.log(`   Host: ${DB_CONFIG.host}`);
  console.log(`   Port: ${DB_CONFIG.port}`);
  console.log(`   Database: ${DB_CONFIG.database}`);
  console.log(`   User: ${DB_CONFIG.user}\n`);

  let connection;

  try {
    // 1. 连接数据库
    console.log('📡 正在连接数据库...');
    connection = await mysql.createConnection(DB_CONFIG);
    console.log('✅ 数据库连接成功\n');

    // 2. 读取迁移文件
    const migrationFile = path.join(__dirname, '../migrations/0011_add_is_featured_to_resource_contents.sql');
    console.log(`📄 读取迁移文件: ${migrationFile}`);
    
    if (!fs.existsSync(migrationFile)) {
      throw new Error(`迁移文件不存在: ${migrationFile}`);
    }
    
    const sqlScript = fs.readFileSync(migrationFile, 'utf-8');
    console.log('✅ 迁移文件读取成功\n');

    // 3. 执行迁移
    console.log('⚙️  正在执行迁移...');
    await connection.query(sqlScript);
    console.log('✅ 迁移执行成功\n');

    // 4. 验证字段是否添加成功
    console.log('🔍 验证字段是否添加成功...');
    const [columns]: any = await connection.query(
      `SELECT COLUMN_NAME, DATA_TYPE, COLUMN_DEFAULT, COLUMN_COMMENT 
       FROM INFORMATION_SCHEMA.COLUMNS 
       WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'resource_contents' AND COLUMN_NAME = 'is_featured'`,
      [DB_CONFIG.database]
    );

    if (columns.length > 0) {
      console.log('✅ is_featured 字段已成功添加:');
      console.log(`   字段名: ${columns[0].COLUMN_NAME}`);
      console.log(`   数据类型: ${columns[0].DATA_TYPE}`);
      console.log(`   默认值: ${columns[0].COLUMN_DEFAULT}`);
      console.log(`   注释: ${columns[0].COLUMN_COMMENT}\n`);
    } else {
      console.log('⚠️  警告: 未找到 is_featured 字段\n');
    }

    // 5. 验证索引是否创建成功
    console.log('🔍 验证索引是否创建成功...');
    const [indexes]: any = await connection.query(
      `SELECT INDEX_NAME, COLUMN_NAME 
       FROM INFORMATION_SCHEMA.STATISTICS 
       WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'resource_contents' AND INDEX_NAME = 'idx_is_featured'`,
      [DB_CONFIG.database]
    );

    if (indexes.length > 0) {
      console.log('✅ idx_is_featured 索引已成功创建:');
      indexes.forEach((idx: any) => {
        console.log(`   索引名: ${idx.INDEX_NAME}, 字段: ${idx.COLUMN_NAME}`);
      });
      console.log('');
    } else {
      console.log('⚠️  警告: 未找到 idx_is_featured 索引\n');
    }

    console.log('🎉 迁移完成！');

  } catch (error: any) {
    console.error('\n❌ 迁移失败:');
    console.error(`   错误信息: ${error.message}`);
    if (error.code) {
      console.error(`   错误代码: ${error.code}`);
    }
    console.error('\n💡 故障排查建议:');
    console.error('   1. 检查 MySQL 服务是否运行');
    console.error('   2. 检查数据库连接配置是否正确');
    console.error('   3. 检查用户权限是否足够');
    console.error(`   4. 检查数据库 ${DB_CONFIG.database} 是否存在`);
    console.error(`   5. 检查表 resource_contents 是否存在`);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
      console.log('📡 数据库连接已关闭');
    }
  }
}

// 执行迁移
addIsFeaturedField();
