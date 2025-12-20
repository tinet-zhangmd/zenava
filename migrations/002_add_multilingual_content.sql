-- 添加多语言字段到 resource_contents 表
-- 为标题、内容、SEO 字段添加四种语言版本

ALTER TABLE `resource_contents` 
  -- 标题多语言字段
  ADD COLUMN `title_zh` VARCHAR(255) DEFAULT NULL COMMENT '标题-简体中文' AFTER `title`,
  ADD COLUMN `title_en` VARCHAR(255) DEFAULT NULL COMMENT '标题-英文' AFTER `title_zh`,
  ADD COLUMN `title_jp` VARCHAR(255) DEFAULT NULL COMMENT '标题-日文' AFTER `title_en`,
  ADD COLUMN `title_hk` VARCHAR(255) DEFAULT NULL COMMENT '标题-繁体中文' AFTER `title_jp`,
  
  -- 内容多语言字段
  ADD COLUMN `content_zh` TEXT DEFAULT NULL COMMENT '内容-简体中文' AFTER `content`,
  ADD COLUMN `content_en` TEXT DEFAULT NULL COMMENT '内容-英文' AFTER `content_zh`,
  ADD COLUMN `content_jp` TEXT DEFAULT NULL COMMENT '内容-日文' AFTER `content_en`,
  ADD COLUMN `content_hk` TEXT DEFAULT NULL COMMENT '内容-繁体中文' AFTER `content_jp`,
  
  -- SEO 标题多语言字段
  ADD COLUMN `meta_title_zh` VARCHAR(255) DEFAULT NULL COMMENT 'SEO标题-简体中文' AFTER `meta_title`,
  ADD COLUMN `meta_title_en` VARCHAR(255) DEFAULT NULL COMMENT 'SEO标题-英文' AFTER `meta_title_zh`,
  ADD COLUMN `meta_title_jp` VARCHAR(255) DEFAULT NULL COMMENT 'SEO标题-日文' AFTER `meta_title_en`,
  ADD COLUMN `meta_title_hk` VARCHAR(255) DEFAULT NULL COMMENT 'SEO标题-繁体中文' AFTER `meta_title_jp`,
  
  -- SEO 描述多语言字段
  ADD COLUMN `meta_description_zh` TEXT DEFAULT NULL COMMENT 'SEO描述-简体中文' AFTER `meta_description`,
  ADD COLUMN `meta_description_en` TEXT DEFAULT NULL COMMENT 'SEO描述-英文' AFTER `meta_description_zh`,
  ADD COLUMN `meta_description_jp` TEXT DEFAULT NULL COMMENT 'SEO描述-日文' AFTER `meta_description_en`,
  ADD COLUMN `meta_description_hk` TEXT DEFAULT NULL COMMENT 'SEO描述-繁体中文' AFTER `meta_description_jp`,
  
  -- SEO 关键词多语言字段
  ADD COLUMN `meta_keywords_zh` VARCHAR(255) DEFAULT NULL COMMENT 'SEO关键词-简体中文' AFTER `meta_keywords`,
  ADD COLUMN `meta_keywords_en` VARCHAR(255) DEFAULT NULL COMMENT 'SEO关键词-英文' AFTER `meta_keywords_zh`,
  ADD COLUMN `meta_keywords_jp` VARCHAR(255) DEFAULT NULL COMMENT 'SEO关键词-日文' AFTER `meta_keywords_en`,
  ADD COLUMN `meta_keywords_hk` VARCHAR(255) DEFAULT NULL COMMENT 'SEO关键词-繁体中文' AFTER `meta_keywords_jp`;

-- 迁移现有数据：将原有的 title 和 content 复制到 title_zh 和 content_zh
UPDATE `resource_contents` 
SET 
  `title_zh` = `title`,
  `content_zh` = `content`,
  `meta_title_zh` = `meta_title`,
  `meta_description_zh` = `meta_description`,
  `meta_keywords_zh` = `meta_keywords`
WHERE `title_zh` IS NULL;

-- 注意：原有的 title, content, meta_title, meta_description, meta_keywords 字段保留作为默认语言（简体中文）

