/**
 * 创建 resource_banners 表的脚本
 * Create resource_banners Table Script
 * 
 * Usage: 
 *   npm run create-banners-table
 *   或
 *   node --loader tsx scripts/create-resource-banners-table.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import * as readline from 'readline';
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
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '12345',
  multipleStatements: true, // 允许执行多条 SQL 语句
};

async function createResourceBannersTable() {
  console.log('🚀 开始创建 resource_banners 表...\n');
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
    const sqlFilePath = path.join(__dirname, '../migrations/0010_resource_banners.sql');
    console.log(`📄 读取 SQL 文件: ${sqlFilePath}`);
    
    if (!fs.existsSync(sqlFilePath)) {
      throw new Error(`SQL 文件不存在: ${sqlFilePath}`);
    }

    const sqlScript = fs.readFileSync(sqlFilePath, 'utf-8');
    console.log(`✅ SQL 文件读取成功 (${sqlScript.length} 字符)\n`);

    // 3. 检查表是否已存在
    console.log('🔍 检查表是否已存在...');
    const [existingTables]: any = await connection.query(
      "SHOW TABLES LIKE 'resource_banners'"
    );
    
    if (existingTables.length > 0) {
      console.log('⚠️  表 resource_banners 已存在');
      let response = 'n';
      
      if (process.argv.includes('--force')) {
        response = 'y';
      } else {
        const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout
        });
        response = await new Promise<string>((resolve) => {
          rl.question('是否删除并重新创建？(y/n): ', (answer: string) => {
            rl.close();
            resolve(answer.toLowerCase());
          });
        });
      }
      
      if (response === 'y' || response === 'yes') {
        console.log('🗑️  删除现有表...');
        await connection.query('DROP TABLE IF EXISTS resource_banners');
        console.log('✅ 表已删除\n');
      } else {
        console.log('❌ 操作已取消');
        return;
      }
    } else {
      console.log('✅ 表不存在，可以创建\n');
    }

    // 4. 执行 SQL 脚本
    console.log('⚙️  正在执行数据库迁移...');
    await connection.query(sqlScript);
    console.log('✅ 数据库迁移执行成功\n');

    // 5. 验证表是否创建成功
    console.log('🔍 验证表结构...');
    const [tables]: any = await connection.query(
      "SHOW TABLES LIKE 'resource_banners'"
    );
    
    if (tables.length > 0) {
      console.log('✅ 表 resource_banners 创建成功\n');
      
      // 显示表结构
      const [columns]: any = await connection.query(
        "DESCRIBE resource_banners"
      );
      
      console.log('📋 表结构:');
      console.table(columns.map((col: any) => ({
        字段: col.Field,
        类型: col.Type,
        允许NULL: col.Null,
        键: col.Key,
        默认值: col.Default,
        额外: col.Extra
      })));
      
      // 显示索引
      const [indexes]: any = await connection.query(
        "SHOW INDEXES FROM resource_banners"
      );
      
      if (indexes.length > 0) {
        console.log('\n📊 索引信息:');
        const indexMap = new Map<string, string[]>();
        indexes.forEach((idx: any) => {
          if (!indexMap.has(idx.Key_name)) {
            indexMap.set(idx.Key_name, []);
          }
          indexMap.get(idx.Key_name)!.push(idx.Column_name);
        });
        indexMap.forEach((columns, indexName) => {
          console.log(`   ✓ ${indexName}: ${columns.join(', ')}`);
        });
      }
    } else {
      throw new Error('表创建失败：验证时未找到表');
    }

    console.log('\n✨ resource_banners 表创建完成！\n');
    console.log('🎯 下一步操作:');
    console.log('   1. 访问管理后台: http://localhost:3000/ticloudadmin/resource-banners');
    console.log('   2. 开始创建和管理 Banner\n');

  } catch (error) {
    console.error('\n❌ 创建表失败:');
    if (error instanceof Error) {
      console.error(`   错误类型: ${error.name}`);
      console.error(`   错误信息: ${error.message}`);
      console.error(`   错误代码: ${(error as any).code || 'N/A'}`);
      console.error(`   错误编号: ${(error as any).errno || 'N/A'}`);
      if ((error as any).sqlMessage) {
        console.error(`   SQL错误: ${(error as any).sqlMessage}`);
      }
      if ((error as any).sql) {
        console.error(`   SQL语句: ${(error as any).sql.substring(0, 200)}...`);
      }
      console.error(`\n   详细堆栈:\n${error.stack}`);
    } else {
      console.error(`   未知错误: ${JSON.stringify(error, null, 2)}`);
    }
    
    console.error('\n💡 故障排查建议:');
    console.error('   1. 检查 MySQL 服务是否运行');
    console.error('   2. 验证 .env 文件中的数据库配置');
    console.error(`   3. 确认数据库 ${DB_CONFIG.database} 是否已创建`);
    console.error(`   4. 测试连接: mysql -h ${DB_CONFIG.host} -u ${DB_CONFIG.user} -p${DB_CONFIG.password} -e "SELECT 1"`);
    console.error('   5. 检查数据库用户是否有 CREATE TABLE 权限');
    
    process.exit(1);
  } finally {
    // 6. 关闭连接
    if (connection) {
      await connection.end();
      console.log('\n🔌 数据库连接已关闭');
    }
  }
}

// 执行创建表操作
createResourceBannersTable();

