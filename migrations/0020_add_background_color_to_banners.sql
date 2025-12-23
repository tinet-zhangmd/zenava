-- 添加背景色字段到 resource_banners 和 category_banners 表
-- 用于设置Banner的背景颜色

USE ZENAVA_LOCAL;

-- 为 resource_banners 表添加 background_color 字段
SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = 'ZENAVA_LOCAL' AND TABLE_NAME = 'resource_banners' AND COLUMN_NAME = 'background_color';

SET @sql = IF(@col_exists = 0, 
    'ALTER TABLE resource_banners ADD COLUMN background_color VARCHAR(50) NULL DEFAULT NULL COMMENT \"背景颜色，格式: rgba(R,G,B,透明度) 或 #RRGGBB\" AFTER subtitle_color', 
    'SELECT \"Column background_color already exists in resource_banners\"');

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- 为 category_banners 表添加 background_color 字段
SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = 'ZENAVA_LOCAL' AND TABLE_NAME = 'category_banners' AND COLUMN_NAME = 'background_color';

SET @sql = IF(@col_exists = 0, 
    'ALTER TABLE category_banners ADD COLUMN background_color VARCHAR(50) NULL DEFAULT NULL COMMENT \"背景颜色，格式: rgba(R,G,B,透明度) 或 #RRGGBB\" AFTER subtitle_color', 
    'SELECT \"Column background_color already exists in category_banners\"');

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

