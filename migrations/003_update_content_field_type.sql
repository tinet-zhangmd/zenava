-- 更新 content 字段类型为 LONGTEXT
-- 日期: 2024-12-05
-- 说明: TEXT 类型最大 65,535 字节，对于富文本内容可能不够，改为 LONGTEXT（最大 4GB）

USE ZENAVA_LOCAL;

-- 1. 更新 content 字段类型
ALTER TABLE resource_contents 
MODIFY COLUMN content LONGTEXT NULL COMMENT '内容（富文本）';

-- 2. 同时更新 meta_description 为 TEXT（原来也可能太小）
ALTER TABLE resource_contents 
MODIFY COLUMN meta_description TEXT NULL COMMENT 'SEO描述';

-- 3. 显示更新结果
SELECT 'Content field type updated to LONGTEXT!' as status;

-- 4. 查看更新后的字段类型
SELECT 
  COLUMN_NAME, 
  DATA_TYPE, 
  CHARACTER_MAXIMUM_LENGTH,
  COLUMN_TYPE,
  COLUMN_COMMENT
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = 'ZENAVA_LOCAL' 
  AND TABLE_NAME = 'resource_contents' 
  AND COLUMN_NAME IN ('content', 'meta_description');

