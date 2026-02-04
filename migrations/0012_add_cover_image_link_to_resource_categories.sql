-- ================================================
-- 迁移文件：添加 cover_image_link 字段到 resource_categories 表
-- 文件：0012_add_cover_image_link_to_resource_categories.sql
-- 说明：为资源栏目表添加封面图跳转链接字段
-- ================================================

-- 检查并添加 cover_image_link 字段
SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'resource_categories' AND COLUMN_NAME = 'cover_image_link';

-- 检查 cover_image_type 列是否存在，如果存在则在其后添加，否则在 sort_order 之后添加
SET @cover_image_type_exists = 0;
SELECT COUNT(*) INTO @cover_image_type_exists FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'resource_categories' AND COLUMN_NAME = 'cover_image_type';

SET @sql = IF(@col_exists = 0, 
  IF(@cover_image_type_exists > 0,
    'ALTER TABLE resource_categories ADD COLUMN cover_image_link VARCHAR(500) NULL COMMENT "栏目封面图跳转链接" AFTER cover_image_type',
    'ALTER TABLE resource_categories ADD COLUMN cover_image_link VARCHAR(500) NULL COMMENT "栏目封面图跳转链接" AFTER sort_order'
  ),
  'SELECT "Column cover_image_link already exists"'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;
