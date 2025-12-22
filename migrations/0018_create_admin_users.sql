-- Admin Users Table - 管理员用户表
-- 用于管理后台登录账户

CREATE TABLE IF NOT EXISTS admin_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL COMMENT '用户名',
  email VARCHAR(255) UNIQUE NOT NULL COMMENT '邮箱（登录账号）',
  password_hash VARCHAR(255) NOT NULL COMMENT '密码哈希',
  role ENUM('super_admin', 'admin', 'editor') DEFAULT 'admin' COMMENT '角色：超级管理员、管理员、编辑',
  last_login_at DATETIME NULL COMMENT '最后登录时间',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  INDEX idx_email (email),
  INDEX idx_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='管理员用户表';

