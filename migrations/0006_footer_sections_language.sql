-- Add language support to footer_sections and footer_privacy_links
ALTER TABLE footer_sections ADD COLUMN language TEXT DEFAULT 'en';
ALTER TABLE footer_privacy_links ADD COLUMN language TEXT DEFAULT 'en';

-- Create indexes
CREATE INDEX idx_footer_sections_language ON footer_sections(language);
CREATE INDEX idx_footer_privacy_links_language ON footer_privacy_links(language);

-- Insert Japanese footer sections
INSERT INTO footer_sections (footer_config_id, title, position, is_visible, language) VALUES 
(2, 'シナリオ', 1, 1, 'jp'),
(2, '私たちについて', 2, 1, 'jp');

-- Insert Hong Kong footer sections  
INSERT INTO footer_sections (footer_config_id, title, position, is_visible, language) VALUES 
(3, '場景', 1, 1, 'hk'),
(3, '關於我們', 2, 1, 'hk');

-- Insert Japanese footer links for Scenarios section
INSERT INTO footer_links (section_id, link_text, link_url, target, position, is_visible) VALUES 
(3, 'マーケティング', '/jp/scenarios/marketing', '_self', 1, 1),
(3, 'セールス', '/jp/scenarios/sales', '_self', 2, 1),
(3, 'カスタマーサービス', '/jp/scenarios/customer-service', '_self', 3, 1),
(3, '内部サービス', '/jp/scenarios/internal-service', '_self', 4, 1),
(3, '管理最適化', '/jp/scenarios/management', '_self', 5, 1);

-- Insert Japanese footer links for About Us section
INSERT INTO footer_links (section_id, link_text, link_url, target, position, is_visible) VALUES 
(4, '私たちについて', '/jp/about', '_self', 1, 1);

-- Insert Hong Kong footer links for Scenarios section
INSERT INTO footer_links (section_id, link_text, link_url, target, position, is_visible) VALUES 
(5, '營銷', '/hk/scenarios/marketing', '_self', 1, 1),
(5, '銷售', '/hk/scenarios/sales', '_self', 2, 1),
(5, '客戶服務', '/hk/scenarios/customer-service', '_self', 3, 1),
(5, '內部服務', '/hk/scenarios/internal-service', '_self', 4, 1),
(5, '管理優化', '/hk/scenarios/management', '_self', 5, 1);

-- Insert Hong Kong footer links for About Us section
INSERT INTO footer_links (section_id, link_text, link_url, target, position, is_visible) VALUES 
(6, '關於我們', '/hk/about', '_self', 1, 1);

-- Insert Japanese privacy links
INSERT INTO footer_privacy_links (footer_config_id, link_type, link_text, link_url, is_visible, language) VALUES 
(2, 'privacy', 'プライバシーポリシー', '/jp/privacy-policy', 1, 'jp'),
(2, 'terms', '利用規約', '/jp/terms-and-conditions', 1, 'jp'),
(2, 'cookies', 'クッキー設定', NULL, 1, 'jp');

-- Insert Hong Kong privacy links
INSERT INTO footer_privacy_links (footer_config_id, link_type, link_text, link_url, is_visible, language) VALUES 
(3, 'privacy', '隱私政策', '/hk/privacy-policy', 1, 'hk'),
(3, 'terms', '條款與條件', '/hk/terms-and-conditions', 1, 'hk'),
(3, 'cookies', 'Cookie偏好設置', NULL, 1, 'hk');