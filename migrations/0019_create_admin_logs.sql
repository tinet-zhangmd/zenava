-- Admin Logs Table - 管理员操作审计日志表
-- 用于记录管理后台的所有操作日志

CREATE TABLE IF NOT EXISTS admin_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NULL COMMENT '操作用户ID（NULL表示系统操作）',
  user_name VARCHAR(100) NULL COMMENT '操作用户名',
  action VARCHAR(50) NOT NULL COMMENT '操作类型（login, create, update, delete, upload等）',
  target_type VARCHAR(50) NULL COMMENT '目标类型（content, category, banner, user等）',
  target_id INT NULL COMMENT '目标ID',
  target_name VARCHAR(255) NULL COMMENT '目标名称',
  description TEXT NULL COMMENT '操作描述',
  ip_address VARCHAR(45) NULL COMMENT 'IP地址',
  user_agent TEXT NULL COMMENT '用户代理',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  INDEX idx_user_id (user_id),
  INDEX idx_action (action),
  INDEX idx_target_type (target_type),
  INDEX idx_created_at (created_at),
  FOREIGN KEY (user_id) REFERENCES admin_users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='管理员操作审计日志表';

-- 插入一些示例数据
INSERT INTO admin_logs (user_id, user_name, action, target_type, target_id, target_name, description, created_at) VALUES
(1, 'Admin', 'login', NULL, NULL, NULL, '管理员登录系统', DATE_SUB(NOW(), INTERVAL 10 MINUTE)),
(1, 'Admin', 'create', 'content', 1, '《AI 驱动的客户服务》', '发布了新内容', DATE_SUB(NOW(), INTERVAL 10 MINUTE)),
(1, 'Admin', 'update', 'category', 2, '行业报告', '修改了栏目', DATE_SUB(NOW(), INTERVAL 2 HOUR)),
(1, 'Admin', 'upload', 'media', NULL, 'hero-banner-v2.jpg', '上传了媒体文件', DATE_SUB(NOW(), INTERVAL 1 DAY)),
(NULL, 'System', 'backup', 'database', NULL, 'ZENAVA_DB_PROD', '执行了自动备份', DATE_SUB(NOW(), INTERVAL 1 DAY) + INTERVAL 2 HOUR);

