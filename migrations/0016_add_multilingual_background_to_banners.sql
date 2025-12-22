-- ================================================
-- 迁移文件：为 Banner 表添加背景多语言字段
-- 文件：0016_add_multilingual_background_to_banners.sql
-- 说明：为 resource_banners 和 category_banners 表添加背景多语言支持
-- ================================================

-- 1. 为 resource_banners 表添加多语言背景字段
SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'resource_banners' AND COLUMN_NAME = 'background_url_zh';

SET @sql = IF(@col_exists = 0, 
  'ALTER TABLE resource_banners ADD COLUMN background_url_zh VARCHAR(500) NULL COMMENT "背景URL-简体中文" AFTER background_url',
  'SELECT "Column background_url_zh already exists"'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'resource_banners' AND COLUMN_NAME = 'background_url_en';

SET @sql = IF(@col_exists = 0, 
  'ALTER TABLE resource_banners ADD COLUMN background_url_en VARCHAR(500) NULL COMMENT "背景URL-英文" AFTER background_url_zh',
  'SELECT "Column background_url_en already exists"'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'resource_banners' AND COLUMN_NAME = 'background_url_jp';

SET @sql = IF(@col_exists = 0, 
  'ALTER TABLE resource_banners ADD COLUMN background_url_jp VARCHAR(500) NULL COMMENT "背景URL-日文" AFTER background_url_en',
  'SELECT "Column background_url_jp already exists"'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'resource_banners' AND COLUMN_NAME = 'background_url_hk';

SET @sql = IF(@col_exists = 0, 
  'ALTER TABLE resource_banners ADD COLUMN background_url_hk VARCHAR(500) NULL COMMENT "背景URL-繁体中文" AFTER background_url_jp',
  'SELECT "Column background_url_hk already exists"'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- 2. 迁移现有数据：将 background_url 复制到 background_url_zh
UPDATE resource_banners 
SET background_url_zh = background_url 
WHERE background_url_zh IS NULL AND background_url IS NOT NULL;

-- 3. 为 category_banners 表添加多语言背景字段
SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'category_banners' AND COLUMN_NAME = 'background_url_zh';

SET @sql = IF(@col_exists = 0, 
  'ALTER TABLE category_banners ADD COLUMN background_url_zh VARCHAR(500) NULL COMMENT "背景URL-简体中文" AFTER background_url',
  'SELECT "Column background_url_zh already exists"'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'category_banners' AND COLUMN_NAME = 'background_url_en';

SET @sql = IF(@col_exists = 0, 
  'ALTER TABLE category_banners ADD COLUMN background_url_en VARCHAR(500) NULL COMMENT "背景URL-英文" AFTER background_url_zh',
  'SELECT "Column background_url_en already exists"'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'category_banners' AND COLUMN_NAME = 'background_url_jp';

SET @sql = IF(@col_exists = 0, 
  'ALTER TABLE category_banners ADD COLUMN background_url_jp VARCHAR(500) NULL COMMENT "背景URL-日文" AFTER background_url_en',
  'SELECT "Column background_url_jp already exists"'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'category_banners' AND COLUMN_NAME = 'background_url_hk';

SET @sql = IF(@col_exists = 0, 
  'ALTER TABLE category_banners ADD COLUMN background_url_hk VARCHAR(500) NULL COMMENT "背景URL-繁体中文" AFTER background_url_jp',
  'SELECT "Column background_url_hk already exists"'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- 4. 迁移现有数据：将 background_url 复制到 background_url_zh（category_banners表）
UPDATE category_banners 
SET background_url_zh = background_url 
WHERE background_url_zh IS NULL AND background_url IS NOT NULL;

