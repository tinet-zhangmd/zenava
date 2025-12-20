// 添加多语言字段到 resource_contents 表的迁移脚本
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// 加载环境变量
dotenv.config();

async function runMigration() {
  console.log('🌐 开始添加多语言字段...\n');
  
  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST || 'localhost',
    port: parseInt(process.env.MYSQL_PORT || '3306'),
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '12345',
    database: process.env.MYSQL_DATABASE || 'ZENAVA_LOCAL',
    charset: 'utf8mb4'
  });

  try {
    console.log('📊 数据库连接成功\n');
    
    // 定义所有需要添加的字段
    const fieldsToAdd = [
      // 标题多语言字段
      { name: 'title_zh', type: 'VARCHAR(255)', comment: '标题-简体中文', after: 'title' },
      { name: 'title_en', type: 'VARCHAR(255)', comment: '标题-英文', after: 'title_zh' },
      { name: 'title_jp', type: 'VARCHAR(255)', comment: '标题-日文', after: 'title_en' },
      { name: 'title_hk', type: 'VARCHAR(255)', comment: '标题-繁体中文', after: 'title_jp' },
      
      // 内容多语言字段
      { name: 'content_zh', type: 'TEXT', comment: '内容-简体中文', after: 'content' },
      { name: 'content_en', type: 'TEXT', comment: '内容-英文', after: 'content_zh' },
      { name: 'content_jp', type: 'TEXT', comment: '内容-日文', after: 'content_en' },
      { name: 'content_hk', type: 'TEXT', comment: '内容-繁体中文', after: 'content_jp' },
      
      // SEO 标题多语言字段
      { name: 'meta_title_zh', type: 'VARCHAR(255)', comment: 'SEO标题-简体中文', after: 'meta_title' },
      { name: 'meta_title_en', type: 'VARCHAR(255)', comment: 'SEO标题-英文', after: 'meta_title_zh' },
      { name: 'meta_title_jp', type: 'VARCHAR(255)', comment: 'SEO标题-日文', after: 'meta_title_en' },
      { name: 'meta_title_hk', type: 'VARCHAR(255)', comment: 'SEO标题-繁体中文', after: 'meta_title_jp' },
      
      // SEO 描述多语言字段
      { name: 'meta_description_zh', type: 'TEXT', comment: 'SEO描述-简体中文', after: 'meta_description' },
      { name: 'meta_description_en', type: 'TEXT', comment: 'SEO描述-英文', after: 'meta_description_zh' },
      { name: 'meta_description_jp', type: 'TEXT', comment: 'SEO描述-日文', after: 'meta_description_en' },
      { name: 'meta_description_hk', type: 'TEXT', comment: 'SEO描述-繁体中文', after: 'meta_description_jp' },
      
      // SEO 关键词多语言字段
      { name: 'meta_keywords_zh', type: 'VARCHAR(255)', comment: 'SEO关键词-简体中文', after: 'meta_keywords' },
      { name: 'meta_keywords_en', type: 'VARCHAR(255)', comment: 'SEO关键词-英文', after: 'meta_keywords_zh' },
      { name: 'meta_keywords_jp', type: 'VARCHAR(255)', comment: 'SEO关键词-日文', after: 'meta_keywords_en' },
      { name: 'meta_keywords_hk', type: 'VARCHAR(255)', comment: 'SEO关键词-繁体中文', after: 'meta_keywords_jp' }
    ];

    console.log(`📝 共有 ${fieldsToAdd.length} 个字段需要添加\n`);

    let addedCount = 0;
    let skippedCount = 0;

    for (const field of fieldsToAdd) {
      try {
        const sql = `ALTER TABLE \`resource_contents\` 
          ADD COLUMN \`${field.name}\` ${field.type} DEFAULT NULL COMMENT '${field.comment}' AFTER \`${field.after}\``;
        
        await connection.query(sql);
        console.log(`✅ 添加字段: ${field.name}`);
        addedCount++;
      } catch (error) {
        if (error.code === 'ER_DUP_FIELDNAME') {
          console.log(`⚠️  字段已存在: ${field.name}`);
          skippedCount++;
        } else {
          console.error(`❌ 添加字段失败: ${field.name}`, error.message);
          throw error;
        }
      }
    }

    console.log('\n📊 执行结果统计:');
    console.log(`  ✅ 成功添加: ${addedCount} 个字段`);
    console.log(`  ⚠️  已存在跳过: ${skippedCount} 个字段`);

    // 迁移现有数据
    if (addedCount > 0) {
      console.log('\n📦 迁移现有数据到简体中文字段...');
      try {
        await connection.query(`
          UPDATE \`resource_contents\` 
          SET 
            \`title_zh\` = \`title\`,
            \`content_zh\` = \`content\`,
            \`meta_title_zh\` = \`meta_title\`,
            \`meta_description_zh\` = \`meta_description\`,
            \`meta_keywords_zh\` = \`meta_keywords\`
          WHERE \`title_zh\` IS NULL
        `);
        console.log('✅ 数据迁移完成');
      } catch (error) {
        console.log('⚠️  数据迁移失败（可能字段不存在）:', error.message);
      }
    }

    console.log('\n✅ 多语言字段迁移完成！\n');
    console.log('已添加的字段:');
    console.log('  - title_zh, title_en, title_jp, title_hk');
    console.log('  - content_zh, content_en, content_jp, content_hk');
    console.log('  - meta_title_zh/en/jp/hk');
    console.log('  - meta_description_zh/en/jp/hk');
    console.log('  - meta_keywords_zh/en/jp/hk\n');

  } catch (error) {
    console.error('\n❌ 迁移失败:', error.message);
    process.exit(1);
  } finally {
    await connection.end();
  }
}

runMigration();
