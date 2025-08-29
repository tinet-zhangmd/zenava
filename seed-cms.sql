-- Seed CMS data

-- Insert default pages
INSERT OR IGNORE INTO pages (slug, language, title, status, version) VALUES 
  ('home', 'en', 'Home', 'published', 1),
  ('home', 'zh', '首页', 'published', 1),
  ('home', 'jp', 'ホーム', 'published', 1),
  ('about', 'en', 'About', 'draft', 1),
  ('products', 'en', 'Products', 'draft', 1);

-- Insert SEO data for home page
INSERT OR IGNORE INTO page_seo (page_id, meta_title, meta_description, meta_keywords, og_title, og_description) VALUES
  (1, 'Zenava - AI Agent Platform for Enterprise', 
   'Transform your customer service with Zenava AI agents. Professional, intelligent, and scalable solutions for enterprise dialogue scenarios.',
   'AI agent, customer service, enterprise AI, dialogue system, chatbot',
   'Zenava - Next-Gen AI Customer Service',
   'Professional AI agents for enterprise customer dialogue scenarios');

-- Insert content modules for home page
INSERT OR IGNORE INTO content_modules (page_id, module_type, module_name, position, content, is_visible, status) VALUES
  (1, 'hero', 'main_hero', 0, 
   '{"title": "AI Agent for Enterprise Customer Dialogue", "subtitle": "Transform your customer service with intelligent AI agents", "cta_text": "Get Started", "cta_link": "#contact", "background_image": "/static/hero-bg.jpg"}',
   1, 'published'),
  
  (1, 'features', 'key_features', 1,
   '{"title": "Why Choose Zenava", "items": [{"icon": "fas fa-brain", "title": "Intelligent Understanding", "description": "Advanced NLP for accurate intent recognition"}, {"icon": "fas fa-comments", "title": "Multi-Channel Support", "description": "Seamless integration across all platforms"}, {"icon": "fas fa-chart-line", "title": "Real-Time Analytics", "description": "Comprehensive insights and performance metrics"}]}',
   1, 'published'),
  
  (1, 'statistics', 'platform_stats', 2,
   '{"title": "Platform Performance", "stats": [{"number": "10M+", "label": "Conversations Handled"}, {"number": "99.9%", "label": "Uptime SLA"}, {"number": "500+", "label": "Enterprise Clients"}, {"number": "4.9/5", "label": "Customer Satisfaction"}]}',
   1, 'published');

-- Insert navigation menus
INSERT OR IGNORE INTO navigation_menus (name, language, items, status) VALUES
  ('header', 'en', 
   '[{"label": "Home", "url": "/", "order": 0}, {"label": "Products", "url": "/products", "order": 1}, {"label": "Solutions", "url": "/solutions", "order": 2}, {"label": "About", "url": "/about", "order": 3}, {"label": "Contact", "url": "/contact", "order": 4}]',
   'published'),
  
  ('footer', 'en',
   '[{"label": "Privacy Policy", "url": "/privacy", "order": 0}, {"label": "Terms of Service", "url": "/terms", "order": 1}, {"label": "Documentation", "url": "/docs", "order": 2}]',
   'published');

-- Insert global settings
INSERT OR IGNORE INTO global_settings (setting_key, setting_value, setting_type, category, description) VALUES
  ('site_name', 'Zenava', 'text', 'general', 'Website name'),
  ('site_logo', '/static/logo.png', 'text', 'general', 'Logo URL'),
  ('contact_email', 'contact@zenava.com', 'text', 'general', 'Contact email'),
  ('analytics_id', 'G-XXXXXXXXXX', 'text', 'analytics', 'Google Analytics ID'),
  ('social_twitter', 'https://twitter.com/zenava', 'text', 'social', 'Twitter URL'),
  ('social_linkedin', 'https://linkedin.com/company/zenava', 'text', 'social', 'LinkedIn URL'),
  ('enable_maintenance', 'false', 'boolean', 'general', 'Maintenance mode'),
  ('default_language', 'en', 'text', 'general', 'Default language');

-- Insert sample media
INSERT OR IGNORE INTO media (filename, original_name, mime_type, size, url, alt_text, folder) VALUES
  ('hero-bg.jpg', 'hero-background.jpg', 'image/jpeg', 256000, '/static/hero-bg.jpg', 'AI technology background', '/backgrounds'),
  ('logo.png', 'zenava-logo.png', 'image/png', 12000, '/static/logo.png', 'Zenava logo', '/logos'),
  ('feature-1.svg', 'ai-brain.svg', 'image/svg+xml', 4000, '/static/icons/brain.svg', 'AI brain icon', '/icons');