-- ================================================
-- 资源中心数据库表结构
-- Resource Center Database Tables
-- ================================================

-- 1. 创建资源栏目分类表 (Resource Categories)
CREATE TABLE IF NOT EXISTS `resource_categories` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '分类ID',
  `name` VARCHAR(100) NOT NULL COMMENT '分类名称',
  `link` VARCHAR(255) DEFAULT NULL COMMENT '链接地址（可选）',
  `category_template` ENUM('list_article', 'list_video', 'list_download') DEFAULT 'list_article' COMMENT '分类模板类型',
  `page_template` ENUM('list_article', 'list_video', 'list_download') DEFAULT 'list_article' COMMENT '页面模板类型',
  `is_displayed` TINYINT(1) DEFAULT 1 COMMENT '是否显示（1=显示，0=隐藏）',
  `sort_order` INT UNSIGNED DEFAULT 0 COMMENT '排序权重（数值越小越靠前）',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `idx_sort_order` (`sort_order`),
  KEY `idx_is_displayed` (`is_displayed`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='资源栏目分类表';

-- 2. 创建资源内容表 (Resource Contents)
CREATE TABLE IF NOT EXISTS `resource_contents` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '内容ID',
  `category_id` INT UNSIGNED NOT NULL COMMENT '所属分类ID',
  `title` VARCHAR(255) NOT NULL COMMENT '内容标题',
  `content` TEXT DEFAULT NULL COMMENT '内容详情（富文本）',
  `author` VARCHAR(100) DEFAULT NULL COMMENT '作者',
  `cover_image` VARCHAR(255) DEFAULT NULL COMMENT '封面图片URL',
  `tags` VARCHAR(255) DEFAULT NULL COMMENT '标签（逗号分隔）',
  `download_url` VARCHAR(255) DEFAULT NULL COMMENT '下载链接（仅下载类型）',
  `video_url` VARCHAR(255) DEFAULT NULL COMMENT '视频链接（仅视频类型）',
  `status` ENUM('draft', 'published', 'archived') DEFAULT 'draft' COMMENT '发布状态',
  `published_at` TIMESTAMP NULL DEFAULT NULL COMMENT '发布时间',
  `views` INT UNSIGNED DEFAULT 0 COMMENT '浏览次数',
  `downloads` INT UNSIGNED DEFAULT 0 COMMENT '下载次数',
  `sort_order` INT UNSIGNED DEFAULT 0 COMMENT '排序权重（数值越小越靠前）',
  -- SEO字段
  `meta_title` VARCHAR(255) DEFAULT NULL COMMENT 'SEO标题',
  `meta_description` TEXT DEFAULT NULL COMMENT 'SEO描述',
  `meta_keywords` VARCHAR(255) DEFAULT NULL COMMENT 'SEO关键词',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `idx_category_id` (`category_id`),
  KEY `idx_status` (`status`),
  KEY `idx_published_at` (`published_at`),
  KEY `idx_sort_order` (`sort_order`),
  CONSTRAINT `fk_resource_contents_category` FOREIGN KEY (`category_id`) REFERENCES `resource_categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='资源内容表';

-- ================================================
-- 数据库初始化完成
-- ================================================
