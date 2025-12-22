-- Add avatar field to admin_users table
-- 为管理员用户表添加头像字段

ALTER TABLE admin_users 
ADD COLUMN avatar VARCHAR(500) NULL COMMENT '头像URL' AFTER role;

