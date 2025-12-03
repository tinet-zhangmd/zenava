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
-- 插入示例数据 (Sample Data)
-- ================================================

-- 示例分类
INSERT INTO `resource_categories` (`name`, `link`, `category_template`, `page_template`, `is_displayed`, `sort_order`) VALUES
('技术文档', '/resources/tech-docs', 'list_article', 'list_article', 1, 10),
('产品视频', '/resources/videos', 'list_video', 'list_video', 1, 20),
('软件下载', '/resources/downloads', 'list_download', 'list_download', 1, 30),
('行业白皮书', '/resources/whitepapers', 'list_article', 'list_article', 1, 40),
('在线课程', '/resources/courses', 'list_video', 'list_video', 0, 50);

-- 示例内容 (技术文档)
INSERT INTO `resource_contents` (`category_id`, `title`, `content`, `author`, `cover_image`, `tags`, `status`, `published_at`, `sort_order`, `meta_title`, `meta_description`, `meta_keywords`) VALUES
(1, 'ZENAVA AI Agent 开发指南', '<h1>开发指南</h1><p>本指南将帮助您快速上手 ZENAVA AI Agent 开发...</p>', 'ZENAVA 技术团队', '/assets/images/guide-cover.jpg', 'AI,开发,指南', 'published', NOW(), 10, 'ZENAVA AI Agent 开发指南 - 技术文档', '完整的 ZENAVA AI Agent 开发文档，包含 API 参考、示例代码和最佳实践。', 'ZENAVA,AI Agent,开发指南,API'),
(1, 'REST API 参考文档', '<h1>API 文档</h1><p>ZENAVA 平台提供了完整的 REST API 接口...</p>', 'API 团队', '/assets/images/api-docs.jpg', 'API,REST,文档', 'published', NOW(), 20, 'ZENAVA REST API 参考 - 完整文档', 'ZENAVA 平台 REST API 完整参考文档，包含所有端点说明、参数和响应示例。', 'ZENAVA,REST API,API文档,接口');

-- 示例内容 (产品视频)
INSERT INTO `resource_contents` (`category_id`, `title`, `content`, `author`, `cover_image`, `video_url`, `tags`, `status`, `published_at`, `sort_order`) VALUES
(2, 'ZENAVA 平台产品介绍', '<p>了解 ZENAVA 如何帮助企业提升客户服务效率...</p>', '市场部', '/assets/images/video-thumb-1.jpg', 'https://www.youtube.com/watch?v=example1', '产品介绍,视频', 'published', NOW(), 10),
(2, 'AI Agent 配置教程', '<p>5分钟学会配置您的第一个 AI Agent...</p>', '培训团队', '/assets/images/video-thumb-2.jpg', 'https://www.youtube.com/watch?v=example2', 'AI Agent,教程,视频', 'published', NOW(), 20);

-- 示例内容 (软件下载)
INSERT INTO `resource_contents` (`category_id`, `title`, `content`, `author`, `cover_image`, `download_url`, `tags`, `status`, `published_at`, `sort_order`) VALUES
(3, 'ZENAVA Desktop Client v2.5.1', '<p>最新桌面客户端，支持 Windows/Mac/Linux...</p>', '产品团队', '/assets/images/desktop-app.jpg', 'https://download.zenava.com/desktop-v2.5.1.zip', '客户端,下载,软件', 'published', NOW(), 10),
(3, 'API SDK - Python 版', '<p>ZENAVA Python SDK，快速集成 AI 能力...</p>', '开发团队', '/assets/images/python-sdk.jpg', 'https://download.zenava.com/python-sdk-v1.2.0.tar.gz', 'SDK,Python,下载', 'published', NOW(), 20);

-- ================================================
-- 索引优化建议
-- ================================================
-- 以上表结构已包含常用索引，可根据实际查询性能需求进一步调整

-- ================================================
-- 数据库初始化完成
-- ================================================
