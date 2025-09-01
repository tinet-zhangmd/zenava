-- Unified Navigation Configuration
-- Drop old navigation_config table if exists
DROP TABLE IF EXISTS navigation_config;

-- Create new comprehensive navigation configuration table
CREATE TABLE IF NOT EXISTS navigation_config (
  id INTEGER PRIMARY KEY DEFAULT 1,
  
  -- Logo settings
  logo_url TEXT,
  logo_alt TEXT DEFAULT 'ZENAVA',
  logo_height TEXT DEFAULT '2.5rem',
  logo_max_width TEXT DEFAULT '200px',
  
  -- Navigation bar styles
  nav_bg_color TEXT DEFAULT 'rgba(255, 255, 255, 0.95)',
  nav_text_color TEXT DEFAULT '#374151',
  nav_hover_color TEXT DEFAULT '#3b82f6',
  nav_border_color TEXT DEFAULT '#f3f4f6',
  nav_shadow TEXT DEFAULT '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
  nav_blur BOOLEAN DEFAULT 1,
  nav_fixed BOOLEAN DEFAULT 1,
  
  -- Dropdown menu styles
  dropdown_bg_color TEXT DEFAULT '#ffffff',
  dropdown_text_color TEXT DEFAULT '#374151',
  dropdown_hover_bg TEXT DEFAULT '#f9fafb',
  dropdown_border_radius TEXT DEFAULT '0.75rem',
  dropdown_shadow TEXT DEFAULT '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
  
  -- Mobile menu settings
  mobile_menu_enabled BOOLEAN DEFAULT 1,
  mobile_breakpoint TEXT DEFAULT 'md',
  
  -- CTA Button settings
  cta_enabled BOOLEAN DEFAULT 0,
  cta_text TEXT DEFAULT 'Get Started',
  cta_text_en TEXT DEFAULT 'Get Started',
  cta_text_jp TEXT DEFAULT '始める',
  cta_text_hk TEXT DEFAULT '開始使用',
  cta_url TEXT DEFAULT '/contact',
  cta_bg_color TEXT DEFAULT '#3b82f6',
  cta_text_color TEXT DEFAULT '#ffffff',
  cta_hover_bg TEXT DEFAULT '#2563eb',
  
  -- Language switcher
  show_language_switcher BOOLEAN DEFAULT 1,
  available_languages TEXT DEFAULT '["en", "jp", "hk"]',
  
  -- Status
  status TEXT DEFAULT 'draft' CHECK(status IN ('draft', 'published')),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  -- Ensure only one configuration exists
  CHECK (id = 1)
);

-- Navigation menu items table
CREATE TABLE IF NOT EXISTS navigation_menu_items (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL CHECK(type IN ('link', 'dropdown')),
  
  -- Labels for different languages
  label TEXT NOT NULL,
  label_en TEXT,
  label_jp TEXT,
  label_hk TEXT,
  
  -- Link properties
  url TEXT,
  icon TEXT,
  target TEXT DEFAULT '_self' CHECK(target IN ('_self', '_blank')),
  
  -- Display properties
  order_index INTEGER DEFAULT 0,
  visible BOOLEAN DEFAULT 1,
  
  -- Timestamps
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Navigation submenu items table
CREATE TABLE IF NOT EXISTS navigation_submenu_items (
  id TEXT PRIMARY KEY,
  parent_id TEXT NOT NULL,
  
  -- Labels for different languages
  label TEXT NOT NULL,
  label_en TEXT,
  label_jp TEXT,
  label_hk TEXT,
  
  -- Descriptions for different languages
  description TEXT,
  description_en TEXT,
  description_jp TEXT,
  description_hk TEXT,
  
  -- Link properties
  url TEXT NOT NULL,
  icon TEXT,
  target TEXT DEFAULT '_self' CHECK(target IN ('_self', '_blank')),
  
  -- Display properties
  order_index INTEGER DEFAULT 0,
  visible BOOLEAN DEFAULT 1,
  
  -- Timestamps
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  -- Foreign key
  FOREIGN KEY (parent_id) REFERENCES navigation_menu_items(id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_menu_items_order ON navigation_menu_items(order_index);
CREATE INDEX IF NOT EXISTS idx_menu_items_visible ON navigation_menu_items(visible);
CREATE INDEX IF NOT EXISTS idx_submenu_items_parent ON navigation_submenu_items(parent_id);
CREATE INDEX IF NOT EXISTS idx_submenu_items_order ON navigation_submenu_items(order_index);
CREATE INDEX IF NOT EXISTS idx_submenu_items_visible ON navigation_submenu_items(visible);

-- Insert default navigation configuration
INSERT OR REPLACE INTO navigation_config (
  id,
  logo_url,
  logo_alt,
  nav_bg_color,
  nav_text_color,
  nav_hover_color,
  show_language_switcher,
  cta_enabled,
  cta_text,
  cta_url,
  status
) VALUES (
  1,
  'https://page.gensparksite.com/v1/base64_upload/1476812a0b97e2ad48a012ceb5c7946e',
  'ZENAVA',
  'rgba(255, 255, 255, 0.95)',
  '#374151',
  '#3b82f6',
  1,
  0,
  'Get Started',
  '/contact',
  'published'
);

-- Insert default menu items
INSERT OR REPLACE INTO navigation_menu_items (id, type, label, label_en, label_jp, label_hk, url, order_index, visible) VALUES
('home', 'link', 'Home', 'Home', 'ホーム', '首頁', '/', 1, 1),
('scenarios', 'dropdown', 'Scenarios', 'Scenarios', 'シナリオ', '場景', NULL, 2, 1),
('about', 'link', 'About Us', 'About Us', '私たちについて', '關於我們', '/about', 3, 1);

-- Insert scenario submenu items
INSERT OR REPLACE INTO navigation_submenu_items (
  id, parent_id, label, label_en, label_jp, label_hk,
  description, description_en, description_jp, description_hk,
  url, icon, order_index, visible
) VALUES
('marketing', 'scenarios', 
  'Zenava for Marketing', 'Zenava for Marketing', 'マーケティング向けZenava', '營銷場景',
  'AI-driven lead generation and conversion optimization', 
  'AI-driven lead generation and conversion optimization',
  'AI駆動のリード生成とコンバージョン最適化',
  'AI驅動的潛在客戶生成和轉化優化',
  '/scenarios/marketing', 'fas fa-bullhorn', 1, 1),

('sales', 'scenarios',
  'Zenava for Sales', 'Zenava for Sales', '営業向けZenava', '銷售場景',
  'AI-powered sales guidance and recommendations',
  'AI-powered sales guidance and recommendations',
  'AI駆動の営業ガイダンスと推奨',
  'AI驅動的銷售指導和推薦',
  '/scenarios/sales', 'fas fa-chart-line', 2, 1),

('customer-service', 'scenarios',
  'Zenava for Customer Service', 'Zenava for Customer Service', 'カスタマーサービス向けZenava', '客服場景',
  'Intelligent support with 24/7 availability',
  'Intelligent support with 24/7 availability',
  '24時間365日対応のインテリジェントサポート',
  '全天候智能支持服務',
  '/scenarios/customer-service', 'fas fa-headset', 3, 1),

('internal-service', 'scenarios',
  'Zenava for Internal Service', 'Zenava for Internal Service', '社内サービス向けZenava', '內部服務',
  'AI-powered employee support and automation',
  'AI-powered employee support and automation',
  'AI駆動の従業員サポートと自動化',
  'AI驅動的員工支持和自動化',
  '/scenarios/internal-service', 'fas fa-users-cog', 4, 1),

('management', 'scenarios',
  'Zenava for Management', 'Zenava for Management', '管理最適化向けZenava', '管理優化',
  'Customer insights for competitive advantage',
  'Customer insights for competitive advantage',
  '競争優位のための顧客インサイト',
  '客戶洞察驅動競爭優勢',
  '/scenarios/management', 'fas fa-tasks', 5, 1);