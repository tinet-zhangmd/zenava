-- ================================================
-- 迁移文件：为 resource_contents 表添加多语言封面图字段
-- 文件：0024_add_multilingual_cover_image.sql
-- 说明：添加封面图的多语言字段（zh, en, jp, hk），支持每个语言版本使用不同的封面图
-- ================================================

-- 检查并添加多语言封面图字段
SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'resource_contents' AND COLUMN_NAME = 'cover_image_zh';

SET @sql = IF(@col_exists = 0, 
  'ALTER TABLE resource_contents ADD COLUMN cover_image_zh VARCHAR(500) NULL COMMENT "封面图-简体中文" AFTER cover_image',
  'SELECT "Column cover_image_zh already exists"'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'resource_contents' AND COLUMN_NAME = 'cover_image_en';

SET @sql = IF(@col_exists = 0, 
  'ALTER TABLE resource_contents ADD COLUMN cover_image_en VARCHAR(500) NULL COMMENT "封面图-英文" AFTER cover_image_zh',
  'SELECT "Column cover_image_en already exists"'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'resource_contents' AND COLUMN_NAME = 'cover_image_jp';

SET @sql = IF(@col_exists = 0, 
  'ALTER TABLE resource_contents ADD COLUMN cover_image_jp VARCHAR(500) NULL COMMENT "封面图-日文" AFTER cover_image_en',
  'SELECT "Column cover_image_jp already exists"'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'resource_contents' AND COLUMN_NAME = 'cover_image_hk';

SET @sql = IF(@col_exists = 0, 
  'ALTER TABLE resource_contents ADD COLUMN cover_image_hk VARCHAR(500) NULL COMMENT "封面图-繁体中文" AFTER cover_image_jp',
  'SELECT "Column cover_image_hk already exists"'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- 迁移现有数据：将 cover_image 复制到 cover_image_zh（作为默认值）
UPDATE resource_contents 
SET cover_image_zh = cover_image 
WHERE cover_image_zh IS NULL AND cover_image IS NOT NULL;

-- 注意：
-- 1. 这些字段都是可选的，允许为 NULL
-- 2. 如果某个语言版本没有上传封面图，对应的字段将为 NULL
-- 3. 系统会优先使用对应语言版本的封面图，如果没有则回退到 cover_image_zh，最后回退到 cover_image
