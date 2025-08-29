-- CMS Schema for Content Management System

-- Pages table - 页面管理
CREATE TABLE IF NOT EXISTS pages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL, -- URL路径，如 'home', 'about', 'jp/home'
  language TEXT DEFAULT 'en', -- 语言: en, zh, jp
  title TEXT NOT NULL,
  status TEXT DEFAULT 'draft', -- draft, published
  version INTEGER DEFAULT 1, -- 版本号
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  published_at DATETIME,
  created_by INTEGER,
  updated_by INTEGER,
  FOREIGN KEY (created_by) REFERENCES users(id),
  FOREIGN KEY (updated_by) REFERENCES users(id)
);

-- Page SEO table - 页面SEO设置
CREATE TABLE IF NOT EXISTS page_seo (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  page_id INTEGER NOT NULL,
  meta_title TEXT, -- SEO标题
  meta_description TEXT, -- SEO描述
  meta_keywords TEXT, -- SEO关键词
  og_title TEXT, -- Open Graph标题
  og_description TEXT, -- Open Graph描述
  og_image TEXT, -- Open Graph图片URL
  twitter_title TEXT, -- Twitter卡片标题
  twitter_description TEXT, -- Twitter卡片描述
  twitter_image TEXT, -- Twitter卡片图片
  canonical_url TEXT, -- 规范URL
  robots TEXT DEFAULT 'index,follow', -- 搜索引擎指令
  schema_markup TEXT, -- 结构化数据JSON
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (page_id) REFERENCES pages(id) ON DELETE CASCADE
);

-- Content Modules table - 内容模块
CREATE TABLE IF NOT EXISTS content_modules (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  page_id INTEGER NOT NULL,
  module_type TEXT NOT NULL, -- hero, features, testimonials, etc.
  module_name TEXT NOT NULL, -- 模块名称标识
  position INTEGER DEFAULT 0, -- 排序位置
  content JSON NOT NULL, -- 模块内容JSON
  settings JSON, -- 模块设置JSON
  is_visible BOOLEAN DEFAULT 1, -- 是否显示
  status TEXT DEFAULT 'draft', -- draft, published
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (page_id) REFERENCES pages(id) ON DELETE CASCADE
);

-- Media Library table - 媒体库
CREATE TABLE IF NOT EXISTS media (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  filename TEXT NOT NULL,
  original_name TEXT,
  mime_type TEXT,
  size INTEGER, -- 文件大小(bytes)
  url TEXT NOT NULL, -- CDN URL或本地URL
  thumbnail_url TEXT, -- 缩略图URL
  alt_text TEXT, -- 替代文本
  caption TEXT, -- 图片说明
  folder TEXT DEFAULT '/', -- 文件夹路径
  metadata JSON, -- 额外元数据
  uploaded_by INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (uploaded_by) REFERENCES users(id)
);

-- Navigation Menus table - 导航菜单
CREATE TABLE IF NOT EXISTS navigation_menus (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL, -- header, footer, sidebar
  language TEXT DEFAULT 'en',
  items JSON NOT NULL, -- 菜单项JSON数组
  status TEXT DEFAULT 'published',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Global Settings table - 全局设置
CREATE TABLE IF NOT EXISTS global_settings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  setting_key TEXT UNIQUE NOT NULL,
  setting_value TEXT,
  setting_type TEXT DEFAULT 'text', -- text, json, boolean, number
  category TEXT DEFAULT 'general', -- general, seo, social, analytics
  description TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Content Versions table - 内容版本控制
CREATE TABLE IF NOT EXISTS content_versions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  entity_type TEXT NOT NULL, -- page, module, menu
  entity_id INTEGER NOT NULL,
  version_number INTEGER NOT NULL,
  content JSON NOT NULL, -- 完整内容快照
  change_summary TEXT, -- 修改摘要
  created_by INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Publishing Queue table - 发布队列
CREATE TABLE IF NOT EXISTS publishing_queue (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  entity_type TEXT NOT NULL, -- page, module, menu
  entity_id INTEGER NOT NULL,
  action TEXT NOT NULL, -- publish, unpublish, schedule
  scheduled_at DATETIME, -- 计划发布时间
  executed_at DATETIME, -- 实际执行时间
  status TEXT DEFAULT 'pending', -- pending, processing, completed, failed
  error_message TEXT,
  created_by INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Audit Log table - 审计日志
CREATE TABLE IF NOT EXISTS audit_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  action TEXT NOT NULL, -- create, update, delete, publish
  entity_type TEXT NOT NULL,
  entity_id INTEGER,
  old_value TEXT, -- JSON of old values
  new_value TEXT, -- JSON of new values
  ip_address TEXT,
  user_agent TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_pages_slug ON pages(slug);
CREATE INDEX IF NOT EXISTS idx_pages_language ON pages(language);
CREATE INDEX IF NOT EXISTS idx_pages_status ON pages(status);
CREATE INDEX IF NOT EXISTS idx_content_modules_page ON content_modules(page_id);
CREATE INDEX IF NOT EXISTS idx_content_modules_type ON content_modules(module_type);
CREATE INDEX IF NOT EXISTS idx_media_folder ON media(folder);
CREATE INDEX IF NOT EXISTS idx_navigation_menus_name ON navigation_menus(name, language);
CREATE INDEX IF NOT EXISTS idx_global_settings_key ON global_settings(setting_key);
CREATE INDEX IF NOT EXISTS idx_content_versions_entity ON content_versions(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_entity ON audit_logs(entity_type, entity_id);