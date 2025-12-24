-- ================================================
-- 迁移文件：为 Banner 表添加多语言链接字段
-- 文件：0023_add_multilingual_links_to_banners.sql
-- 说明：为 resource_banners 和 category_banners 表添加多语言链接字段
-- ================================================

-- 为 resource_banners 表添加多语言链接字段
ALTER TABLE resource_banners
ADD COLUMN IF NOT EXISTS button_link_zh VARCHAR(500) NULL COMMENT '按钮链接-简体中文' AFTER button_link,
ADD COLUMN IF NOT EXISTS button_link_en VARCHAR(500) NULL COMMENT '按钮链接-英文' AFTER button_link_zh,
ADD COLUMN IF NOT EXISTS button_link_jp VARCHAR(500) NULL COMMENT '按钮链接-日文' AFTER button_link_en,
ADD COLUMN IF NOT EXISTS button_link_hk VARCHAR(500) NULL COMMENT '按钮链接-繁体中文' AFTER button_link_jp,
ADD COLUMN IF NOT EXISTS link_url_zh VARCHAR(500) NULL COMMENT '链接地址-简体中文(full_image模式)' AFTER link_url,
ADD COLUMN IF NOT EXISTS link_url_en VARCHAR(500) NULL COMMENT '链接地址-英文(full_image模式)' AFTER link_url_zh,
ADD COLUMN IF NOT EXISTS link_url_jp VARCHAR(500) NULL COMMENT '链接地址-日文(full_image模式)' AFTER link_url_en,
ADD COLUMN IF NOT EXISTS link_url_hk VARCHAR(500) NULL COMMENT '链接地址-繁体中文(full_image模式)' AFTER link_url_jp;

-- 为 category_banners 表添加多语言链接字段
ALTER TABLE category_banners
ADD COLUMN IF NOT EXISTS button_link_zh VARCHAR(500) NULL COMMENT '按钮链接-简体中文' AFTER button_link,
ADD COLUMN IF NOT EXISTS button_link_en VARCHAR(500) NULL COMMENT '按钮链接-英文' AFTER button_link_zh,
ADD COLUMN IF NOT EXISTS button_link_jp VARCHAR(500) NULL COMMENT '按钮链接-日文' AFTER button_link_en,
ADD COLUMN IF NOT EXISTS button_link_hk VARCHAR(500) NULL COMMENT '按钮链接-繁体中文' AFTER button_link_jp,
ADD COLUMN IF NOT EXISTS link_url_zh VARCHAR(500) NULL COMMENT '链接地址-简体中文(full_image模式)' AFTER link_url,
ADD COLUMN IF NOT EXISTS link_url_en VARCHAR(500) NULL COMMENT '链接地址-英文(full_image模式)' AFTER link_url_zh,
ADD COLUMN IF NOT EXISTS link_url_jp VARCHAR(500) NULL COMMENT '链接地址-日文(full_image模式)' AFTER link_url_en,
ADD COLUMN IF NOT EXISTS link_url_hk VARCHAR(500) NULL COMMENT '链接地址-繁体中文(full_image模式)' AFTER link_url_jp;

