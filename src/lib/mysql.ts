import mysql from 'mysql2/promise'
import * as dotenv from 'dotenv'

// 加载环境变量
dotenv.config()

// MySQL连接配置
const dbConfig = {
  host: process.env.MYSQL_HOST || 'localhost',
  port: parseInt(process.env.MYSQL_PORT || '3306'),
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '12345',  // 默认密码
  database: process.env.MYSQL_DATABASE || 'ZENAVA_LOCAL',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
}

// 调试：打印连接配置（不显示完整密码）
console.log('📊 MySQL 配置:', {
  host: dbConfig.host,
  port: dbConfig.port,
  user: dbConfig.user,
  password: dbConfig.password ? '***已设置***' : '❌未设置',
  database: dbConfig.database
})

// 创建连接池
let pool: mysql.Pool | null = null

export function getPool(): mysql.Pool {
  if (!pool) {
    pool = mysql.createPool(dbConfig)
  }
  return pool
}

// 获取数据库连接
export async function getConnection() {
  const pool = getPool()
  return await pool.getConnection()
}

// 执行查询（带自动释放连接）
export async function query<T = any>(sql: string, params?: any[]): Promise<T> {
  const connection = await getConnection()
  try {
    const [results] = await connection.execute(sql, params)
    return results as T
  } finally {
    connection.release()
  }
}

// 测试数据库连接
export async function testConnection(): Promise<boolean> {
  try {
    const connection = await getConnection()
    await connection.ping()
    connection.release()
    console.log('✅ MySQL数据库连接成功')
    return true
  } catch (error) {
    console.error('❌ MySQL数据库连接失败:', error)
    return false
  }
}

// 初始化数据库表
export async function initializeTables(): Promise<void> {
  const connection = await getConnection()
  
  try {
    // 创建栏目分类表
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS resource_categories (
        id INT PRIMARY KEY AUTO_INCREMENT,
        sort_order INT DEFAULT 0 COMMENT '排序序号，数字越小越靠前',
        name VARCHAR(255) NOT NULL COMMENT '栏目名称',
        slug VARCHAR(255) UNIQUE NOT NULL COMMENT 'URL路径',
        list_template VARCHAR(100) NOT NULL COMMENT '分类模板',
        detail_template VARCHAR(100) NOT NULL COMMENT '内容模板',
        is_visible BOOLEAN DEFAULT TRUE COMMENT '是否在前端显示',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_sort_order (sort_order),
        INDEX idx_is_visible (is_visible)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='资源中心栏目分类表';
    `)
    console.log('✅ resource_categories 表创建成功')

    // 创建内容表
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS resource_contents (
        id INT PRIMARY KEY AUTO_INCREMENT,
        category_id INT NOT NULL COMMENT '所属栏目ID',
        title VARCHAR(500) NOT NULL COMMENT '内容标题',
        slug VARCHAR(255) UNIQUE NOT NULL COMMENT 'URL路径',
        thumbnail VARCHAR(500) COMMENT '缩略图URL',
        author VARCHAR(100) COMMENT '作者',
        publish_date DATE COMMENT '发布日期',
        summary TEXT COMMENT '内容摘要',
        body LONGTEXT COMMENT '内容正文',
        tags VARCHAR(500) COMMENT '标签（逗号分隔）',
        views INT DEFAULT 0 COMMENT '浏览次数',
        status ENUM('draft', 'published') DEFAULT 'draft' COMMENT '状态：草稿/已发布',
        is_featured BOOLEAN DEFAULT FALSE COMMENT '是否推荐',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (category_id) REFERENCES resource_categories(id) ON DELETE CASCADE,
        INDEX idx_category_id (category_id),
        INDEX idx_status (status),
        INDEX idx_is_featured (is_featured),
        INDEX idx_publish_date (publish_date),
        FULLTEXT INDEX idx_fulltext_search (title, summary, body)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='资源中心内容表';
    `)
    console.log('✅ resource_contents 表创建成功')

    // 插入示例栏目数据
    const [categories]: any = await connection.execute(
      'SELECT COUNT(*) as count FROM resource_categories'
    )
    
    if (categories[0].count === 0) {
      await connection.execute(`
        INSERT INTO resource_categories (id, sort_order, name, slug, list_template, detail_template, is_visible) VALUES
        (186, 0, '公司动态', '/a/186', 'list_article.html', 'info_article.html', TRUE),
        (187, 0, '博客', '/a/187', 'list_article.html', 'info_article.html', TRUE),
        (188, 0, '白皮书', '/a/188', 'list_article.html', 'info_article.html', TRUE),
        (189, 0, '拉感', '/a/189', 'list_article.html', 'info_article.html', TRUE),
        (190, 0, '博客', '/a/190', 'list_article.html', 'info_article.html', TRUE),
        (191, 0, '行业报告', '/a/191', 'list_article.html', 'info_article.html', TRUE),
        (195, 0, '技术答疑', '/a/195', 'list_article.html', 'info_article.html', TRUE)
      `)
      console.log('✅ 示例栏目数据插入成功')
    }

    console.log('✅ 数据库表初始化完成')
  } catch (error) {
    console.error('❌ 数据库表初始化失败:', error)
    throw error
  } finally {
    connection.release()
  }
}

// 关闭连接池
export async function closePool(): Promise<void> {
  if (pool) {
    await pool.end()
    pool = null
    console.log('✅ MySQL连接池已关闭')
  }
}
