-- Extended CMS Schema for Static Site Generation and Version Management

-- Page Templates table - 页面模板管理
CREATE TABLE IF NOT EXISTS page_templates (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE NOT NULL, -- 模板名称: home, about, product, blog-post, etc.
  description TEXT,
  template_code TEXT NOT NULL, -- HTML模板代码
  schema_definition JSON, -- 字段定义schema
  preview_image TEXT, -- 模板预览图
  is_active BOOLEAN DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Site Versions table - 站点版本管理
CREATE TABLE IF NOT EXISTS site_versions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  version_number TEXT NOT NULL, -- v1.0.0, v1.0.1, etc.
  version_name TEXT, -- Release name
  description TEXT, -- Version description
  status TEXT DEFAULT 'draft', -- draft, published, archived
  snapshot_data JSON NOT NULL, -- Complete site snapshot
  pages_count INTEGER DEFAULT 0,
  created_by INTEGER,
  published_by INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  published_at DATETIME,
  FOREIGN KEY (created_by) REFERENCES users(id),
  FOREIGN KEY (published_by) REFERENCES users(id)
);

-- Static Builds table - 静态构建记录
CREATE TABLE IF NOT EXISTS static_builds (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  version_id INTEGER NOT NULL,
  build_status TEXT DEFAULT 'pending', -- pending, building, success, failed
  build_type TEXT DEFAULT 'full', -- full, incremental, page
  pages_built INTEGER DEFAULT 0,
  total_pages INTEGER DEFAULT 0,
  build_time_ms INTEGER, -- Build duration in milliseconds
  output_path TEXT, -- Build output directory
  error_log TEXT, -- Error messages if failed
  metadata JSON, -- Additional build metadata
  started_at DATETIME,
  completed_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (version_id) REFERENCES site_versions(id)
);

-- Page Snapshots table - 页面快照（用于版本管理）
CREATE TABLE IF NOT EXISTS page_snapshots (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  version_id INTEGER NOT NULL,
  page_id INTEGER NOT NULL,
  page_data JSON NOT NULL, -- Complete page data snapshot
  modules_data JSON NOT NULL, -- Complete modules snapshot
  seo_data JSON NOT NULL, -- SEO snapshot
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (version_id) REFERENCES site_versions(id),
  FOREIGN KEY (page_id) REFERENCES pages(id)
);

-- Static Files table - 静态文件管理
CREATE TABLE IF NOT EXISTS static_files (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  version_id INTEGER,
  file_path TEXT NOT NULL, -- /index.html, /about.html, etc.
  file_type TEXT NOT NULL, -- html, css, js, image
  content_hash TEXT, -- MD5 or SHA256 hash for caching
  content TEXT, -- Actual file content (for HTML/CSS/JS)
  content_url TEXT, -- CDN URL for binary files
  size_bytes INTEGER,
  is_compressed BOOLEAN DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (version_id) REFERENCES site_versions(id)
);

-- Publishing History table - 发布历史
CREATE TABLE IF NOT EXISTS publishing_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  version_id INTEGER NOT NULL,
  action TEXT NOT NULL, -- publish, rollback, archive
  environment TEXT DEFAULT 'production', -- production, staging, preview
  deployment_url TEXT,
  deployment_status TEXT DEFAULT 'pending', -- pending, deploying, success, failed
  cdn_purge_status TEXT, -- pending, success, failed
  rollback_from_version INTEGER, -- If this is a rollback, which version it rolled back from
  metadata JSON,
  executed_by INTEGER,
  executed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (version_id) REFERENCES site_versions(id),
  FOREIGN KEY (executed_by) REFERENCES users(id)
);

-- SEO Meta Templates table - SEO元标签模板
CREATE TABLE IF NOT EXISTS seo_templates (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  template_name TEXT NOT NULL,
  page_type TEXT, -- home, product, blog, category
  title_template TEXT, -- {site_name} - {page_title}
  description_template TEXT,
  keywords_template TEXT,
  og_title_template TEXT,
  og_description_template TEXT,
  twitter_title_template TEXT,
  twitter_description_template TEXT,
  schema_template JSON, -- JSON-LD schema template
  is_default BOOLEAN DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Cache Management table - 缓存管理
CREATE TABLE IF NOT EXISTS cache_management (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  cache_key TEXT UNIQUE NOT NULL,
  cache_type TEXT, -- page, api, asset
  cache_value TEXT,
  expires_at DATETIME,
  purged_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Deployment Configurations - 部署配置
CREATE TABLE IF NOT EXISTS deployment_configs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  config_name TEXT UNIQUE NOT NULL,
  config_type TEXT, -- cloudflare, vercel, netlify, s3
  config_data JSON NOT NULL, -- API keys, endpoints, etc (encrypted)
  is_active BOOLEAN DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_site_versions_status ON site_versions(status);
CREATE INDEX IF NOT EXISTS idx_site_versions_published_at ON site_versions(published_at);
CREATE INDEX IF NOT EXISTS idx_static_builds_version ON static_builds(version_id);
CREATE INDEX IF NOT EXISTS idx_static_builds_status ON static_builds(build_status);
CREATE INDEX IF NOT EXISTS idx_page_snapshots_version ON page_snapshots(version_id);
CREATE INDEX IF NOT EXISTS idx_static_files_version ON static_files(version_id);
CREATE INDEX IF NOT EXISTS idx_static_files_path ON static_files(file_path);
CREATE INDEX IF NOT EXISTS idx_publishing_history_version ON publishing_history(version_id);
CREATE INDEX IF NOT EXISTS idx_cache_management_key ON cache_management(cache_key);
CREATE INDEX IF NOT EXISTS idx_cache_management_expires ON cache_management(expires_at);

-- Add new columns to existing pages table for template support
-- This is safe to run multiple times (IF NOT EXISTS)
ALTER TABLE pages ADD COLUMN template_id INTEGER REFERENCES page_templates(id);
ALTER TABLE pages ADD COLUMN is_indexed BOOLEAN DEFAULT 1; -- For sitemap/robots
ALTER TABLE pages ADD COLUMN cache_duration INTEGER DEFAULT 3600; -- Cache duration in seconds
ALTER TABLE pages ADD COLUMN last_static_build DATETIME; -- Last successful static build

-- Add new columns to content_modules for better version control
ALTER TABLE content_modules ADD COLUMN version_number INTEGER DEFAULT 1;
ALTER TABLE content_modules ADD COLUMN locked_by INTEGER REFERENCES users(id);
ALTER TABLE content_modules ADD COLUMN locked_at DATETIME;