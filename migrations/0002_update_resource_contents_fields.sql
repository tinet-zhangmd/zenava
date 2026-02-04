-- 资源内容表字段更新迁移脚本
-- 日期: 2024-12-05
-- 说明: 添加视频上传、附件上传功能，移除标签和链接字段

-- 1. 添加封面图片相关字段
SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'resource_contents' AND COLUMN_NAME = 'cover_image_size';
SET @sql = IF(@col_exists = 0, 'ALTER TABLE resource_contents ADD COLUMN cover_image_size INT NULL COMMENT "封面图片大小（字节）" AFTER cover_image', 'SELECT "Column cover_image_size already exists"');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'resource_contents' AND COLUMN_NAME = 'cover_image_type';
SET @sql = IF(@col_exists = 0, 'ALTER TABLE resource_contents ADD COLUMN cover_image_type VARCHAR(100) NULL COMMENT "封面图片类型" AFTER cover_image_size', 'SELECT "Column cover_image_type already exists"');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- 2. 添加视频相关字段
SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'resource_contents' AND COLUMN_NAME = 'video_file';
SET @sql = IF(@col_exists = 0, 'ALTER TABLE resource_contents ADD COLUMN video_file VARCHAR(500) NULL COMMENT "视频文件URL" AFTER cover_image_type', 'SELECT "Column video_file already exists"');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'resource_contents' AND COLUMN_NAME = 'video_size';
SET @sql = IF(@col_exists = 0, 'ALTER TABLE resource_contents ADD COLUMN video_size INT NULL COMMENT "视频文件大小（字节）" AFTER video_file', 'SELECT "Column video_size already exists"');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'resource_contents' AND COLUMN_NAME = 'video_type';
SET @sql = IF(@col_exists = 0, 'ALTER TABLE resource_contents ADD COLUMN video_type VARCHAR(100) NULL COMMENT "视频文件类型" AFTER video_size', 'SELECT "Column video_type already exists"');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- 3. 添加附件相关字段
SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'resource_contents' AND COLUMN_NAME = 'attachment_file';
SET @sql = IF(@col_exists = 0, 'ALTER TABLE resource_contents ADD COLUMN attachment_file VARCHAR(500) NULL COMMENT "附件文件URL" AFTER video_type', 'SELECT "Column attachment_file already exists"');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'resource_contents' AND COLUMN_NAME = 'attachment_size';
SET @sql = IF(@col_exists = 0, 'ALTER TABLE resource_contents ADD COLUMN attachment_size INT NULL COMMENT "附件文件大小（字节）" AFTER attachment_file', 'SELECT "Column attachment_size already exists"');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'resource_contents' AND COLUMN_NAME = 'attachment_type';
SET @sql = IF(@col_exists = 0, 'ALTER TABLE resource_contents ADD COLUMN attachment_type VARCHAR(100) NULL COMMENT "附件文件类型" AFTER attachment_size', 'SELECT "Column attachment_type already exists"');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'resource_contents' AND COLUMN_NAME = 'attachment_name';
SET @sql = IF(@col_exists = 0, 'ALTER TABLE resource_contents ADD COLUMN attachment_name VARCHAR(255) NULL COMMENT "附件原始文件名" AFTER attachment_type', 'SELECT "Column attachment_name already exists"');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- 4. 添加阅读时间字段
SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'resource_contents' AND COLUMN_NAME = 'reading_time';
SET @sql = IF(@col_exists = 0, 'ALTER TABLE resource_contents ADD COLUMN reading_time INT NULL COMMENT "阅读时间（分钟）" AFTER author', 'SELECT "Column reading_time already exists"');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- 5. 更新 status 字段的 ENUM 值
ALTER TABLE resource_contents 
MODIFY COLUMN status ENUM('draft', 'unpublished', 'published') NOT NULL DEFAULT 'draft' COMMENT '状态：草稿/未发布/已发布';

-- 6. 删除不再使用的字段（安全删除）
SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'resource_contents' AND COLUMN_NAME = 'tags';
SET @sql = IF(@col_exists > 0, 'ALTER TABLE resource_contents DROP COLUMN tags', 'SELECT "Column tags does not exist"');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'resource_contents' AND COLUMN_NAME = 'download_url';
SET @sql = IF(@col_exists > 0, 'ALTER TABLE resource_contents DROP COLUMN download_url', 'SELECT "Column download_url does not exist"');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'resource_contents' AND COLUMN_NAME = 'video_url';
SET @sql = IF(@col_exists > 0, 'ALTER TABLE resource_contents DROP COLUMN video_url', 'SELECT "Column video_url does not exist"');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- 7. 显示更新结果
SELECT 'Migration completed successfully!' as status;

-- 8. 查看更新后的表结构
DESCRIBE resource_contents;
