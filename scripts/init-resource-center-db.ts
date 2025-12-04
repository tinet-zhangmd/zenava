/**
 * 资源中心数据库初始化脚本
 * Resource Center Database Initialization Script
 * 
 * Usage: node --loader tsx scripts/init-resource-center-db.ts
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
  database: process.env.MYSQL_DATABASE || 'ZENAVA_LOCAL',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  multipleStatements: true, // 允许执行多条 SQL 语句
};

async function initDatabase() {
  console.log('🚀 开始初始化资源中心数据库...\n');
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

    // 2. 读取 SQL 文件
    const sqlFilePath = path.join(__dirname, '../migrations/001_create_resource_center_tables.sql');
    console.log(`📄 读取 SQL 文件: ${sqlFilePath}`);
    
    if (!fs.existsSync(sqlFilePath)) {
      throw new Error(`SQL 文件不存在: ${sqlFilePath}`);
    }

    const sqlScript = fs.readFileSync(sqlFilePath, 'utf-8');
    console.log(`✅ SQL 文件读取成功 (${sqlScript.length} 字符)\n`);

    // 3. 执行 SQL 脚本
    console.log('⚙️  正在执行数据库迁移...');
    await connection.query(sqlScript);
    console.log('✅ 数据库迁移执行成功\n');

    // 4. 验证表是否创建成功
    console.log('🔍 验证表结构...');
    const [tables] = await connection.query(
      "SHOW TABLES LIKE 'resource_%'"
    );
    
    console.log('📊 已创建的表:');
    if (Array.isArray(tables) && tables.length > 0) {
      tables.forEach((table: any) => {
        const tableName = Object.values(table)[0];
        console.log(`   ✓ ${tableName}`);
      });
    } else {
      console.warn('⚠️  未找到 resource_* 表，可能创建失败');
    }

    // 5. 检查示例数据
    console.log('\n📦 检查示例数据...');
    const [categories] = await connection.query(
      'SELECT COUNT(*) as count FROM resource_categories'
    );
    const [contents] = await connection.query(
      'SELECT COUNT(*) as count FROM resource_contents'
    );
    
    const categoryCount = (categories as any)[0].count;
    const contentCount = (contents as any)[0].count;
    
    console.log(`   ✓ resource_categories: ${categoryCount} 条记录`);
    console.log(`   ✓ resource_contents: ${contentCount} 条记录`);

    console.log('\n✨ 资源中心数据库初始化完成！\n');
    console.log('🎯 下一步操作:');
    console.log('   1. 访问管理后台: http://localhost:3000/ticloudadmin/resource-categories');
    console.log('   2. 访问管理后台: http://localhost:3000/ticloudadmin/resource-contents');
    console.log('   3. 开始管理您的资源内容\n');

  } catch (error) {
    console.error('\n❌ 初始化失败:');
    if (error instanceof Error) {
      console.error(`   错误类型: ${error.name}`);
      console.error(`   错误信息: ${error.message}`);
      console.error(`   错误代码: ${(error as any).code || 'N/A'}`);
      console.error(`   错误编号: ${(error as any).errno || 'N/A'}`);
      if ((error as any).sqlMessage) {
        console.error(`   SQL错误: ${(error as any).sqlMessage}`);
      }
      console.error(`\n   详细堆栈:\n${error.stack}`);
    } else {
      console.error(`   未知错误: ${JSON.stringify(error, null, 2)}`);
    }
    
    console.error('\n💡 故障排查建议:');
    console.error('   1. 检查 MySQL 服务是否运行');
    console.error('   2. 验证 .env 文件中的数据库配置');
    console.error('   3. 确认数据库 ZENAVA_LOCAL 是否已创建');
    console.error('   4. 测试连接: mysql -h localhost -u root -p12345 -e "SELECT 1"');
    
    process.exit(1);
  } finally {
    // 6. 关闭连接
    if (connection) {
      await connection.end();
      console.log('🔌 数据库连接已关闭');
    }
  }
}

// 执行初始化
initDatabase();
