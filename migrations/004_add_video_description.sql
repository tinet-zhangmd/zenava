-- 添加视频简介字段到 resource_contents 表
-- 用于视频模板类型的内容

USE ZENAVA_LOCAL;

-- 检查并添加 video_description 列
SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = 'ZENAVA_LOCAL' AND TABLE_NAME = 'resource_contents' AND COLUMN_NAME = 'video_description';

SET @sql = IF(@col_exists = 0, 
    'ALTER TABLE resource_contents ADD COLUMN video_description TEXT NULL COMMENT "视频简介（用于视频模板）" AFTER video_type', 
    'SELECT "Column video_description already exists"');

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SELECT '✅ Migration 004 completed: video_description field added' as status;

