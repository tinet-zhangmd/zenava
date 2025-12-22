-- ================================================
-- 迁移文件：创建 category_banners 表
-- 文件：0015_create_category_banners.sql
-- 说明：创建栏目Banner管理表，结构与 resource_banners 相同
-- ================================================

-- 栏目Banner表（与 resource_banners 结构相同）
CREATE TABLE IF NOT EXISTS category_banners (
  id INT AUTO_INCREMENT PRIMARY KEY,
  banner_type VARCHAR(20) NOT NULL DEFAULT 'text_image' COMMENT 'Banner类型: text_image(文字+图片), full_image(整张大图)',
  
  -- 公共字段
  title VARCHAR(255) NOT NULL COMMENT '标题/说明',
  sort_order INT DEFAULT 0 COMMENT '排序',
  status VARCHAR(20) DEFAULT 'draft' COMMENT '状态: draft(草稿), published(已发布)',
  
  -- 文字+图片模式字段
  text_title VARCHAR(255) COMMENT '文字标题(text_image模式)',
  text_subtitle TEXT COMMENT '文字副标题(text_image模式)',
  text_button VARCHAR(100) COMMENT '按钮文字(text_image模式)',
  button_link VARCHAR(500) COMMENT '按钮链接(text_image模式)',
  button_target VARCHAR(20) DEFAULT '_self' COMMENT '打开方式: _self(当前页), _blank(新页面)',
  text_position VARCHAR(20) DEFAULT 'left' COMMENT '文字位置: left(左), center(中), right(右), no-text(无文字)',
  text_color VARCHAR(50) DEFAULT 'rgba(255,255,255,1)' COMMENT '文字颜色',
  subtitle_color VARCHAR(50) DEFAULT 'rgba(255,255,255,0.8)' COMMENT '副标题颜色',
  image_url VARCHAR(500) COMMENT '图片/动图URL(text_image模式)',
  background_type VARCHAR(20) DEFAULT 'image' COMMENT '背景类型: image(图片/动图), video(视频)',
  background_url VARCHAR(500) COMMENT '背景URL',
  
  -- 整张大图模式字段
  full_image_url VARCHAR(500) COMMENT '完整Banner图URL(full_image模式)',
  link_url VARCHAR(500) COMMENT '链接地址(full_image模式)',
  link_target VARCHAR(20) DEFAULT '_self' COMMENT '打开方式(full_image模式)',
  
  -- 多语言字段：文字标题
  text_title_zh VARCHAR(255) NULL COMMENT '文字标题-简体中文',
  text_title_en VARCHAR(255) NULL COMMENT '文字标题-英文',
  text_title_jp VARCHAR(255) NULL COMMENT '文字标题-日文',
  text_title_hk VARCHAR(255) NULL COMMENT '文字标题-繁体中文',
  
  -- 多语言字段：文字副标题
  text_subtitle_zh TEXT NULL COMMENT '文字副标题-简体中文',
  text_subtitle_en TEXT NULL COMMENT '文字副标题-英文',
  text_subtitle_jp TEXT NULL COMMENT '文字副标题-日文',
  text_subtitle_hk TEXT NULL COMMENT '文字副标题-繁体中文',
  
  -- 多语言字段：按钮文字
  text_button_zh VARCHAR(100) NULL COMMENT '按钮文字-简体中文',
  text_button_en VARCHAR(100) NULL COMMENT '按钮文字-英文',
  text_button_jp VARCHAR(100) NULL COMMENT '按钮文字-日文',
  text_button_hk VARCHAR(100) NULL COMMENT '按钮文字-繁体中文',
  
  -- 时间戳
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_sort_order (sort_order),
  INDEX idx_status (status),
  INDEX idx_banner_type (banner_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='栏目Banner管理表';

