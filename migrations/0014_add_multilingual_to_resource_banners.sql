-- ================================================
-- 迁移文件：为 resource_banners 表添加多语言字段
-- 文件：0014_add_multilingual_to_resource_banners.sql
-- 说明：为文字+图片模式的字段添加多语言支持（zh, en, jp, hk）
-- ================================================

-- 1. 添加多语言字段：文字标题 (text_title)
SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'resource_banners' AND COLUMN_NAME = 'text_title_zh';

SET @sql = IF(@col_exists = 0, 
  'ALTER TABLE resource_banners ADD COLUMN text_title_zh VARCHAR(255) NULL COMMENT "文字标题-简体中文" AFTER text_title',
  'SELECT "Column text_title_zh already exists"'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'resource_banners' AND COLUMN_NAME = 'text_title_en';

SET @sql = IF(@col_exists = 0, 
  'ALTER TABLE resource_banners ADD COLUMN text_title_en VARCHAR(255) NULL COMMENT "文字标题-英文" AFTER text_title_zh',
  'SELECT "Column text_title_en already exists"'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'resource_banners' AND COLUMN_NAME = 'text_title_jp';

SET @sql = IF(@col_exists = 0, 
  'ALTER TABLE resource_banners ADD COLUMN text_title_jp VARCHAR(255) NULL COMMENT "文字标题-日文" AFTER text_title_en',
  'SELECT "Column text_title_jp already exists"'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'resource_banners' AND COLUMN_NAME = 'text_title_hk';

SET @sql = IF(@col_exists = 0, 
  'ALTER TABLE resource_banners ADD COLUMN text_title_hk VARCHAR(255) NULL COMMENT "文字标题-繁体中文" AFTER text_title_jp',
  'SELECT "Column text_title_hk already exists"'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- 2. 添加多语言字段：文字副标题 (text_subtitle)
SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'resource_banners' AND COLUMN_NAME = 'text_subtitle_zh';

SET @sql = IF(@col_exists = 0, 
  'ALTER TABLE resource_banners ADD COLUMN text_subtitle_zh TEXT NULL COMMENT "文字副标题-简体中文" AFTER text_subtitle',
  'SELECT "Column text_subtitle_zh already exists"'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'resource_banners' AND COLUMN_NAME = 'text_subtitle_en';

SET @sql = IF(@col_exists = 0, 
  'ALTER TABLE resource_banners ADD COLUMN text_subtitle_en TEXT NULL COMMENT "文字副标题-英文" AFTER text_subtitle_zh',
  'SELECT "Column text_subtitle_en already exists"'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'resource_banners' AND COLUMN_NAME = 'text_subtitle_jp';

SET @sql = IF(@col_exists = 0, 
  'ALTER TABLE resource_banners ADD COLUMN text_subtitle_jp TEXT NULL COMMENT "文字副标题-日文" AFTER text_subtitle_en',
  'SELECT "Column text_subtitle_jp already exists"'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'resource_banners' AND COLUMN_NAME = 'text_subtitle_hk';

SET @sql = IF(@col_exists = 0, 
  'ALTER TABLE resource_banners ADD COLUMN text_subtitle_hk TEXT NULL COMMENT "文字副标题-繁体中文" AFTER text_subtitle_jp',
  'SELECT "Column text_subtitle_hk already exists"'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- 3. 添加多语言字段：按钮文字 (text_button)
SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'resource_banners' AND COLUMN_NAME = 'text_button_zh';

SET @sql = IF(@col_exists = 0, 
  'ALTER TABLE resource_banners ADD COLUMN text_button_zh VARCHAR(100) NULL COMMENT "按钮文字-简体中文" AFTER text_button',
  'SELECT "Column text_button_zh already exists"'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'resource_banners' AND COLUMN_NAME = 'text_button_en';

SET @sql = IF(@col_exists = 0, 
  'ALTER TABLE resource_banners ADD COLUMN text_button_en VARCHAR(100) NULL COMMENT "按钮文字-英文" AFTER text_button_zh',
  'SELECT "Column text_button_en already exists"'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'resource_banners' AND COLUMN_NAME = 'text_button_jp';

SET @sql = IF(@col_exists = 0, 
  'ALTER TABLE resource_banners ADD COLUMN text_button_jp VARCHAR(100) NULL COMMENT "按钮文字-日文" AFTER text_button_en',
  'SELECT "Column text_button_jp already exists"'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'resource_banners' AND COLUMN_NAME = 'text_button_hk';

SET @sql = IF(@col_exists = 0, 
  'ALTER TABLE resource_banners ADD COLUMN text_button_hk VARCHAR(100) NULL COMMENT "按钮文字-繁体中文" AFTER text_button_jp',
  'SELECT "Column text_button_hk already exists"'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- 4. 迁移现有数据：将 text_title, text_subtitle, text_button 复制到对应的 _zh 字段
UPDATE resource_banners 
SET text_title_zh = text_title 
WHERE text_title_zh IS NULL AND text_title IS NOT NULL;

UPDATE resource_banners 
SET text_subtitle_zh = text_subtitle 
WHERE text_subtitle_zh IS NULL AND text_subtitle IS NOT NULL;

UPDATE resource_banners 
SET text_button_zh = text_button 
WHERE text_button_zh IS NULL AND text_button IS NOT NULL;

