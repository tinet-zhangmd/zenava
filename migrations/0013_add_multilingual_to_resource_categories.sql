-- ================================================
-- 迁移文件：为 resource_categories 表添加多语言字段
-- 文件：0013_add_multilingual_to_resource_categories.sql
-- 说明：添加栏目名称和描述的多语言字段（zh, en, jp, hk）
-- ================================================

-- 1. 添加多语言字段：栏目名称
SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'resource_categories' AND COLUMN_NAME = 'name_zh';

SET @sql = IF(@col_exists = 0, 
  'ALTER TABLE resource_categories ADD COLUMN name_zh VARCHAR(100) NULL COMMENT "栏目名称-简体中文" AFTER name',
  'SELECT "Column name_zh already exists"'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'resource_categories' AND COLUMN_NAME = 'name_en';

SET @sql = IF(@col_exists = 0, 
  'ALTER TABLE resource_categories ADD COLUMN name_en VARCHAR(100) NULL COMMENT "栏目名称-英文" AFTER name_zh',
  'SELECT "Column name_en already exists"'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'resource_categories' AND COLUMN_NAME = 'name_jp';

SET @sql = IF(@col_exists = 0, 
  'ALTER TABLE resource_categories ADD COLUMN name_jp VARCHAR(100) NULL COMMENT "栏目名称-日文" AFTER name_en',
  'SELECT "Column name_jp already exists"'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'resource_categories' AND COLUMN_NAME = 'name_hk';

SET @sql = IF(@col_exists = 0, 
  'ALTER TABLE resource_categories ADD COLUMN name_hk VARCHAR(100) NULL COMMENT "栏目名称-繁体中文" AFTER name_jp',
  'SELECT "Column name_hk already exists"'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- 2. 添加多语言字段：栏目描述
-- 首先检查 description 列是否存在
SET @description_exists = 0;
SELECT COUNT(*) INTO @description_exists FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'resource_categories' AND COLUMN_NAME = 'description';

SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'resource_categories' AND COLUMN_NAME = 'description_zh';

SET @sql = IF(@col_exists = 0, 
  IF(@description_exists > 0,
    'ALTER TABLE resource_categories ADD COLUMN description_zh TEXT NULL COMMENT "栏目描述-简体中文" AFTER description',
    'ALTER TABLE resource_categories ADD COLUMN description_zh TEXT NULL COMMENT "栏目描述-简体中文" AFTER name_hk'
  ),
  'SELECT "Column description_zh already exists"'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'resource_categories' AND COLUMN_NAME = 'description_en';

SET @sql = IF(@col_exists = 0, 
  'ALTER TABLE resource_categories ADD COLUMN description_en TEXT NULL COMMENT "栏目描述-英文" AFTER description_zh',
  'SELECT "Column description_en already exists"'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'resource_categories' AND COLUMN_NAME = 'description_jp';

SET @sql = IF(@col_exists = 0, 
  'ALTER TABLE resource_categories ADD COLUMN description_jp TEXT NULL COMMENT "栏目描述-日文" AFTER description_en',
  'SELECT "Column description_jp already exists"'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @col_exists = 0;
SELECT COUNT(*) INTO @col_exists FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'resource_categories' AND COLUMN_NAME = 'description_hk';

SET @sql = IF(@col_exists = 0, 
  'ALTER TABLE resource_categories ADD COLUMN description_hk TEXT NULL COMMENT "栏目描述-繁体中文" AFTER description_jp',
  'SELECT "Column description_hk already exists"'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- 3. 迁移现有数据：将 name 复制到 name_zh
UPDATE resource_categories 
SET name_zh = name 
WHERE name_zh IS NULL AND name IS NOT NULL;

-- 如果 description 列存在，则迁移数据到 description_zh
SET @description_exists = 0;
SELECT COUNT(*) INTO @description_exists FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'resource_categories' AND COLUMN_NAME = 'description';

SET @sql = IF(@description_exists > 0,
  'UPDATE resource_categories SET description_zh = description WHERE description_zh IS NULL AND description IS NOT NULL',
  'SELECT "Description column does not exist, skipping data migration"'
);
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

