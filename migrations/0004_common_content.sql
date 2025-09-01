-- Common Content Management Tables

-- Navigation configuration table
DROP TABLE IF EXISTS navigation_config;
CREATE TABLE navigation_config (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  logo_url TEXT,
  logo_alt TEXT DEFAULT 'Logo',
  status TEXT DEFAULT 'draft' CHECK(status IN ('draft', 'published')),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  created_by INTEGER,
  updated_by INTEGER
);

-- Footer configuration table
DROP TABLE IF EXISTS footer_config;
CREATE TABLE footer_config (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  logo_url TEXT,
  logo_alt TEXT DEFAULT 'Logo',
  logo_subtitle TEXT,
  copyright_text TEXT DEFAULT '© 2024 TI Cloud. All rights reserved.',
  status TEXT DEFAULT 'draft' CHECK(status IN ('draft', 'published')),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  created_by INTEGER,
  updated_by INTEGER
);

-- Footer sections table
DROP TABLE IF EXISTS footer_sections;
CREATE TABLE footer_sections (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  footer_config_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  position INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (footer_config_id) REFERENCES footer_config(id) ON DELETE CASCADE
);

-- Footer links table
DROP TABLE IF EXISTS footer_links;
CREATE TABLE footer_links (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  section_id INTEGER NOT NULL,
  link_text TEXT NOT NULL,
  link_url TEXT NOT NULL,
  target TEXT DEFAULT '_self' CHECK(target IN ('_self', '_blank')),
  position INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (section_id) REFERENCES footer_sections(id) ON DELETE CASCADE
);

-- Footer privacy links table
DROP TABLE IF EXISTS footer_privacy_links;
CREATE TABLE footer_privacy_links (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  footer_config_id INTEGER NOT NULL,
  link_type TEXT NOT NULL CHECK(link_type IN ('privacy', 'terms', 'cookies')),
  link_text TEXT NOT NULL,
  link_url TEXT,
  target TEXT DEFAULT '_self' CHECK(target IN ('_self', '_blank')),
  is_visible BOOLEAN DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (footer_config_id) REFERENCES footer_config(id) ON DELETE CASCADE
);

-- Insert default navigation config
INSERT INTO navigation_config (logo_url, status) 
VALUES ('https://page.gensparksite.com/v1/base64_upload/5e1aceb131c0da67ee3eee4d55e36029', 'published');

-- Insert default footer config
INSERT INTO footer_config (
  logo_url, 
  logo_subtitle, 
  copyright_text, 
  status
) VALUES (
  'https://page.gensparksite.com/v1/base64_upload/5e1aceb131c0da67ee3eee4d55e36029',
  'AI Agent for Enterprise Customer Dialogue Scenarios',
  '© 2024 TI Cloud. All rights reserved.',
  'published'
);

-- Insert default footer sections
INSERT INTO footer_sections (footer_config_id, title, position) VALUES 
(1, 'Scenarios', 1),
(1, 'About Us', 2);

-- Insert default footer links for Scenarios section
INSERT INTO footer_links (section_id, link_text, link_url, position) VALUES 
(1, 'Marketing', '/scenarios/marketing', 1),
(1, 'Sales', '/scenarios/sales', 2),
(1, 'Customer Service', '/scenarios/customer-service', 3),
(1, 'Internal Service', '/scenarios/internal-service', 4),
(1, 'Management Optimization', '/scenarios/management', 5);

-- Insert default footer links for About Us section
INSERT INTO footer_links (section_id, link_text, link_url, position) VALUES 
(2, 'About Us', '/about', 1),
(2, 'Contact', '/contact', 2);

-- Insert default privacy links
INSERT INTO footer_privacy_links (footer_config_id, link_type, link_text, link_url) VALUES 
(1, 'privacy', 'Privacy Policy', '/privacy-policy'),
(1, 'terms', 'Terms & Conditions', '/terms-and-conditions'),
(1, 'cookies', 'Cookie Preferences', NULL);

-- Create indexes
CREATE INDEX idx_footer_sections_config ON footer_sections(footer_config_id);
CREATE INDEX idx_footer_links_section ON footer_links(section_id);
CREATE INDEX idx_footer_privacy_config ON footer_privacy_links(footer_config_id);