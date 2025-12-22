-- ================================================
-- 迁移文件：为 category_banners 表添加 category_id 字段
-- 文件：0017_add_category_id_to_category_banners.sql
-- 说明：添加栏目分类关联字段，支持根据栏目分类管理Banner
-- ================================================

-- 为 category_banners 表添加 category_id 字段
ALTER TABLE category_banners 
ADD COLUMN category_id INT NULL COMMENT '关联的栏目分类ID（resource_categories表）' AFTER id;

-- 添加外键约束（可选，如果不需要外键约束可以注释掉）
-- ALTER TABLE category_banners 
-- ADD CONSTRAINT fk_category_banners_category 
-- FOREIGN KEY (category_id) REFERENCES resource_categories(id) ON DELETE SET NULL;

-- 添加索引以提高查询性能
CREATE INDEX idx_category_id ON category_banners(category_id);

