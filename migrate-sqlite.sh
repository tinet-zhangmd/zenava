#!/bin/bash
# SQLite 数据库迁移脚本

set -e

DB_PATH="${DB_PATH:-data/zenava.db}"

echo "📦 初始化 SQLite 数据库..."
echo "数据库路径: $DB_PATH"

# 检查 sqlite3 命令
if ! command -v sqlite3 &> /dev/null; then
    echo "❌ sqlite3 未安装"
    echo "安装方法:"
    echo "  macOS: brew install sqlite3"
    echo "  Ubuntu: sudo apt install sqlite3"
    exit 1
fi

# 创建数据库目录
mkdir -p data

# 删除旧数据库（如果存在且需要重置）
if [ "$1" = "--reset" ] && [ -f "$DB_PATH" ]; then
    echo "🗑️  删除旧数据库..."
    rm -f "$DB_PATH"
fi

# 执行所有迁移文件
echo ""
echo "📋 执行数据库迁移..."
for file in migrations/*.sql; do
    if [ -f "$file" ]; then
        echo "  → $(basename $file)"
        sqlite3 "$DB_PATH" < "$file" || {
            echo "  ❌ 迁移失败: $file"
            exit 1
        }
    fi
done

# 执行种子数据
if [ -f "seed.sql" ]; then
    echo ""
    echo "🌱 填充种子数据..."
    sqlite3 "$DB_PATH" < seed.sql || echo "⚠️  种子数据填充失败（可能已存在）"
fi

# 执行 CMS 种子数据
if [ -f "seed-cms.sql" ]; then
    echo ""
    echo "🌱 填充 CMS 种子数据..."
    sqlite3 "$DB_PATH" < seed-cms.sql || echo "⚠️  CMS 种子数据填充失败（可能已存在）"
fi

echo ""
echo "✅ 数据库初始化完成！"
echo "📁 数据库文件: $DB_PATH"
echo ""
echo "📝 验证数据库:"
echo "  sqlite3 $DB_PATH '.tables'"

