#!/bin/bash

# 执行多语言字段迁移

echo "🌐 添加多语言字段到 resource_contents 表"
echo "========================================"
echo ""

DB_USER="root"
DB_PASSWORD="12345"
DB_NAME="ZENAVA_LOCAL"

echo "正在执行迁移..."
mysql -u $DB_USER -p$DB_PASSWORD $DB_NAME < migrations/002_add_multilingual_content.sql 2>&1 | grep -v "mysql: \[Warning\]"

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ 多语言字段添加成功！"
    echo ""
    echo "已添加的字段："
    echo "  - title_zh, title_en, title_jp, title_hk"
    echo "  - content_zh, content_en, content_jp, content_hk"
    echo "  - meta_title_zh/en/jp/hk"
    echo "  - meta_description_zh/en/jp/hk"
    echo "  - meta_keywords_zh/en/jp/hk"
    echo ""
else
    echo ""
    echo "❌ 迁移失败，请检查错误信息"
    echo ""
    exit 1
fi

