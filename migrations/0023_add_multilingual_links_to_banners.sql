-- ================================================
-- 迁移文件：为 Banner 表添加多语言链接字段
-- 文件：0023_add_multilingual_links_to_banners.sql
-- 说明：为 resource_banners 和 category_banners 表添加多语言链接字段
-- ================================================

-- 为 resource_banners 表添加多语言链接字段
-- MySQL 不支持 IF NOT EXISTS，需要使用动态 SQL 检查列是否存在

-- button_link_zh
SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'resource_banners' AND COLUMN_NAME = 'button_link_zh';
SET @sql = IF(@col_exists = 0, 
  'ALTER TABLE resource_banners ADD COLUMN button_link_zh VARCHAR(500) NULL COMMENT "按钮链接-简体中文" AFTER button_link',
  'SELECT "Column button_link_zh already exists"'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- button_link_en
SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'resource_banners' AND COLUMN_NAME = 'button_link_en';
SET @sql = IF(@col_exists = 0, 
  'ALTER TABLE resource_banners ADD COLUMN button_link_en VARCHAR(500) NULL COMMENT "按钮链接-英文" AFTER button_link_zh',
  'SELECT "Column button_link_en already exists"'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- button_link_jp
SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'resource_banners' AND COLUMN_NAME = 'button_link_jp';
SET @sql = IF(@col_exists = 0, 
  'ALTER TABLE resource_banners ADD COLUMN button_link_jp VARCHAR(500) NULL COMMENT "按钮链接-日文" AFTER button_link_en',
  'SELECT "Column button_link_jp already exists"'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- button_link_hk
SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'resource_banners' AND COLUMN_NAME = 'button_link_hk';
SET @sql = IF(@col_exists = 0, 
  'ALTER TABLE resource_banners ADD COLUMN button_link_hk VARCHAR(500) NULL COMMENT "按钮链接-繁体中文" AFTER button_link_jp',
  'SELECT "Column button_link_hk already exists"'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- link_url_zh
SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'resource_banners' AND COLUMN_NAME = 'link_url_zh';
SET @sql = IF(@col_exists = 0, 
  'ALTER TABLE resource_banners ADD COLUMN link_url_zh VARCHAR(500) NULL COMMENT "链接地址-简体中文(full_image模式)" AFTER link_url',
  'SELECT "Column link_url_zh already exists"'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- link_url_en
SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'resource_banners' AND COLUMN_NAME = 'link_url_en';
SET @sql = IF(@col_exists = 0, 
  'ALTER TABLE resource_banners ADD COLUMN link_url_en VARCHAR(500) NULL COMMENT "链接地址-英文(full_image模式)" AFTER link_url_zh',
  'SELECT "Column link_url_en already exists"'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- link_url_jp
SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'resource_banners' AND COLUMN_NAME = 'link_url_jp';
SET @sql = IF(@col_exists = 0, 
  'ALTER TABLE resource_banners ADD COLUMN link_url_jp VARCHAR(500) NULL COMMENT "链接地址-日文(full_image模式)" AFTER link_url_en',
  'SELECT "Column link_url_jp already exists"'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- link_url_hk
SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'resource_banners' AND COLUMN_NAME = 'link_url_hk';
SET @sql = IF(@col_exists = 0, 
  'ALTER TABLE resource_banners ADD COLUMN link_url_hk VARCHAR(500) NULL COMMENT "链接地址-繁体中文(full_image模式)" AFTER link_url_jp',
  'SELECT "Column link_url_hk already exists"'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- 为 category_banners 表添加多语言链接字段

-- button_link_zh
SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'category_banners' AND COLUMN_NAME = 'button_link_zh';
SET @sql = IF(@col_exists = 0, 
  'ALTER TABLE category_banners ADD COLUMN button_link_zh VARCHAR(500) NULL COMMENT "按钮链接-简体中文" AFTER button_link',
  'SELECT "Column button_link_zh already exists"'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- button_link_en
SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'category_banners' AND COLUMN_NAME = 'button_link_en';
SET @sql = IF(@col_exists = 0, 
  'ALTER TABLE category_banners ADD COLUMN button_link_en VARCHAR(500) NULL COMMENT "按钮链接-英文" AFTER button_link_zh',
  'SELECT "Column button_link_en already exists"'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- button_link_jp
SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'category_banners' AND COLUMN_NAME = 'button_link_jp';
SET @sql = IF(@col_exists = 0, 
  'ALTER TABLE category_banners ADD COLUMN button_link_jp VARCHAR(500) NULL COMMENT "按钮链接-日文" AFTER button_link_en',
  'SELECT "Column button_link_jp already exists"'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- button_link_hk
SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'category_banners' AND COLUMN_NAME = 'button_link_hk';
SET @sql = IF(@col_exists = 0, 
  'ALTER TABLE category_banners ADD COLUMN button_link_hk VARCHAR(500) NULL COMMENT "按钮链接-繁体中文" AFTER button_link_jp',
  'SELECT "Column button_link_hk already exists"'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- link_url_zh
SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'category_banners' AND COLUMN_NAME = 'link_url_zh';
SET @sql = IF(@col_exists = 0, 
  'ALTER TABLE category_banners ADD COLUMN link_url_zh VARCHAR(500) NULL COMMENT "链接地址-简体中文(full_image模式)" AFTER link_url',
  'SELECT "Column link_url_zh already exists"'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- link_url_en
SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'category_banners' AND COLUMN_NAME = 'link_url_en';
SET @sql = IF(@col_exists = 0, 
  'ALTER TABLE category_banners ADD COLUMN link_url_en VARCHAR(500) NULL COMMENT "链接地址-英文(full_image模式)" AFTER link_url_zh',
  'SELECT "Column link_url_en already exists"'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- link_url_jp
SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'category_banners' AND COLUMN_NAME = 'link_url_jp';
SET @sql = IF(@col_exists = 0, 
  'ALTER TABLE category_banners ADD COLUMN link_url_jp VARCHAR(500) NULL COMMENT "链接地址-日文(full_image模式)" AFTER link_url_en',
  'SELECT "Column link_url_jp already exists"'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- link_url_hk
SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'category_banners' AND COLUMN_NAME = 'link_url_hk';
SET @sql = IF(@col_exists = 0, 
  'ALTER TABLE category_banners ADD COLUMN link_url_hk VARCHAR(500) NULL COMMENT "链接地址-繁体中文(full_image模式)" AFTER link_url_jp',
  'SELECT "Column link_url_hk already exists"'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

