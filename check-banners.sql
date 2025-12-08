-- 检查所有banner
SELECT id, title, banner_type, status, sort_order, 
       text_title, background_url, full_image_url,
       created_at, updated_at
FROM resource_banners 
ORDER BY sort_order ASC, id DESC;
