-- ================================================
-- 迁移文件：添加 is_featured 字段到 resource_contents 表
-- 文件：0011_add_is_featured_to_resource_contents.sql
-- 说明：为资源内容表添加推荐字段
-- ================================================

-- 检查并添加 is_featured 字段
SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'resource_contents' AND COLUMN_NAME = 'is_featured';

SET @sql = IF(@col_exists = 0, 
  'ALTER TABLE resource_contents ADD COLUMN is_featured BOOLEAN DEFAULT FALSE COMMENT "是否推荐" AFTER sort_order',
  'SELECT "Column is_featured already exists"'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- 添加索引以优化查询
SET @idx_exists = 0;
SELECT COUNT(*) INTO @idx_exists FROM INFORMATION_SCHEMA.STATISTICS 
WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'resource_contents' AND INDEX_NAME = 'idx_is_featured';

SET @sql = IF(@idx_exists = 0,
  'CREATE INDEX idx_is_featured ON resource_contents(is_featured)',
  'SELECT "Index idx_is_featured already exists"'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;
