-- 为 resource_contents 表添加视频和附件的多语言字段
-- 支持每个语言版本上传不同的视频/音频文件和附件文件

ALTER TABLE `resource_contents` 
ADD COLUMN `video_file_zh` VARCHAR(500) DEFAULT NULL COMMENT '简体中文视频/音频文件URL' AFTER `video_description_hk`,
ADD COLUMN `video_file_en` VARCHAR(500) DEFAULT NULL COMMENT 'English video/audio file URL' AFTER `video_file_zh`,
ADD COLUMN `video_file_jp` VARCHAR(500) DEFAULT NULL COMMENT '日本語動画/音声ファイルURL' AFTER `video_file_en`,
ADD COLUMN `video_file_hk` VARCHAR(500) DEFAULT NULL COMMENT '繁體中文視頻/音頻文件URL' AFTER `video_file_jp`,
ADD COLUMN `attachment_file_zh` VARCHAR(500) DEFAULT NULL COMMENT '简体中文附件文件URL' AFTER `attachment_name`,
ADD COLUMN `attachment_file_en` VARCHAR(500) DEFAULT NULL COMMENT 'English attachment file URL' AFTER `attachment_file_zh`,
ADD COLUMN `attachment_file_jp` VARCHAR(500) DEFAULT NULL COMMENT '日本語添付ファイルURL' AFTER `attachment_file_en`,
ADD COLUMN `attachment_file_hk` VARCHAR(500) DEFAULT NULL COMMENT '繁體中文附件文件URL' AFTER `attachment_file_jp`,
ADD COLUMN `attachment_name_zh` VARCHAR(255) DEFAULT NULL COMMENT '简体中文附件文件名' AFTER `attachment_file_hk`,
ADD COLUMN `attachment_name_en` VARCHAR(255) DEFAULT NULL COMMENT 'English attachment file name' AFTER `attachment_name_zh`,
ADD COLUMN `attachment_name_jp` VARCHAR(255) DEFAULT NULL COMMENT '日本語添付ファイル名' AFTER `attachment_name_en`,
ADD COLUMN `attachment_name_hk` VARCHAR(255) DEFAULT NULL COMMENT '繁體中文附件文件名' AFTER `attachment_name_jp`;

-- 注意：
-- 1. 这些字段都是可选的，允许为 NULL
-- 2. 如果某个语言版本没有上传文件，对应的字段将为 NULL
-- 3. 系统会优先使用对应语言版本的文件，如果没有则回退到默认字段（video_file, attachment_file, attachment_name）

