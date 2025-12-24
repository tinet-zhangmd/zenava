-- 为 resource_contents 表添加 slug 字段
-- 用于支持通过 slug 访问内容详情页

ALTER TABLE `resource_contents` 
ADD COLUMN `slug` VARCHAR(255) DEFAULT NULL COMMENT 'URL友好标识符（可选，用于SEO友好的URL）' AFTER `id`,
ADD UNIQUE KEY `idx_slug` (`slug`);

-- 注意：slug 字段是可选的，如果未设置，系统将使用 id 作为标识符

