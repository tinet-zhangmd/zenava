-- 添加视频简介多语言字段到 resource_contents 表
-- 用于视频模板类型的内容多语言支持

-- 检查并添加 video_description_zh 列
SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'resource_contents' AND COLUMN_NAME = 'video_description_zh';

SET @sql = IF(@col_exists = 0, 
    'ALTER TABLE resource_contents ADD COLUMN video_description_zh TEXT NULL COMMENT "视频简介-简体中文" AFTER video_description', 
    'SELECT "Column video_description_zh already exists"');

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- 检查并添加 video_description_en 列
SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'resource_contents' AND COLUMN_NAME = 'video_description_en';

SET @sql = IF(@col_exists = 0, 
    'ALTER TABLE resource_contents ADD COLUMN video_description_en TEXT NULL COMMENT "视频简介-英文" AFTER video_description_zh', 
    'SELECT "Column video_description_en already exists"');

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- 检查并添加 video_description_jp 列
SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'resource_contents' AND COLUMN_NAME = 'video_description_jp';

SET @sql = IF(@col_exists = 0, 
    'ALTER TABLE resource_contents ADD COLUMN video_description_jp TEXT NULL COMMENT "视频简介-日文" AFTER video_description_en', 
    'SELECT "Column video_description_jp already exists"');

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- 检查并添加 video_description_hk 列
SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'resource_contents' AND COLUMN_NAME = 'video_description_hk';

SET @sql = IF(@col_exists = 0, 
    'ALTER TABLE resource_contents ADD COLUMN video_description_hk TEXT NULL COMMENT "视频简介-繁体中文" AFTER video_description_jp', 
    'SELECT "Column video_description_hk already exists"');

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SELECT '✅ Migration 005 completed: video_description multilingual fields added' as status;

