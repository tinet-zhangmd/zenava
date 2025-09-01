-- Add language column to navigation_config
ALTER TABLE navigation_config ADD COLUMN language TEXT DEFAULT 'en';

-- Add language column to footer_config
ALTER TABLE footer_config ADD COLUMN language TEXT DEFAULT 'en';

-- Create indexes for language queries
CREATE INDEX idx_navigation_config_language ON navigation_config(language);
CREATE INDEX idx_footer_config_language ON footer_config(language);

-- Insert Japanese version of navigation config
INSERT INTO navigation_config (logo_url, logo_alt, status, language) 
VALUES 
('https://page.gensparksite.com/v1/base64_upload/5e1aceb131c0da67ee3eee4d55e36029', 'Zenava Logo', 'published', 'jp');

-- Insert Hong Kong version of navigation config
INSERT INTO navigation_config (logo_url, logo_alt, status, language) 
VALUES 
('https://page.gensparksite.com/v1/base64_upload/5e1aceb131c0da67ee3eee4d55e36029', 'Zenava Logo', 'published', 'hk');

-- Insert Japanese version of footer config
INSERT INTO footer_config (logo_url, logo_alt, logo_subtitle, copyright_text, status, language) 
VALUES 
('https://page.gensparksite.com/v1/base64_upload/5e1aceb131c0da67ee3eee4d55e36029', 'Logo', 
'エンタープライズ顧客対話シナリオのためのAIエージェント', 
'© 2024 TI Cloud. 全著作権所有。', 'published', 'jp');

-- Insert Hong Kong version of footer config
INSERT INTO footer_config (logo_url, logo_alt, logo_subtitle, copyright_text, status, language) 
VALUES 
('https://page.gensparksite.com/v1/base64_upload/5e1aceb131c0da67ee3eee4d55e36029', 'Logo', 
'企業客戶對話場景的AI代理', 
'© 2024 TI Cloud. 保留所有權利。', 'published', 'hk');