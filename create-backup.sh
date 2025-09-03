#!/bin/bash

# 智能备份脚本 - 自动处理SQLite临时文件问题

TIMESTAMP=$(date +%Y%m%d-%H%M%S)
BACKUP_NAME="webapp-backup-${TIMESTAMP}.tar.gz"
PROJECT_DIR="/home/user/webapp"

echo "================================================"
echo "📦 Zenava Web应用备份工具"
echo "================================================"
echo ""

# 步骤1: 预处理SQLite临时文件
echo "🔧 步骤1: 预处理数据库文件..."
DB_DIR="${PROJECT_DIR}/.wrangler/state/v3/d1/miniflare-D1DatabaseObject"

if [ -d "$DB_DIR" ]; then
    for sqlite_file in "$DB_DIR"/*.sqlite; do
        if [ -f "$sqlite_file" ]; then
            base_name="${sqlite_file%.sqlite}"
            [ ! -f "${base_name}.sqlite-shm" ] && touch "${base_name}.sqlite-shm"
            [ ! -f "${base_name}.sqlite-wal" ] && touch "${base_name}.sqlite-wal"
        fi
    done
    echo "   ✅ 数据库文件准备完成"
else
    echo "   ℹ️ 未找到数据库目录，跳过"
fi

# 步骤2: 创建备份
echo ""
echo "📂 步骤2: 创建备份文件..."
cd /home/user

# 使用排除选项创建备份，避免包含不必要的大文件
tar -czf "$BACKUP_NAME" \
    --exclude='webapp/node_modules' \
    --exclude='webapp/.pm2' \
    --exclude='webapp/dist/_worker.js.map' \
    webapp/ 2>/dev/null

if [ $? -eq 0 ]; then
    SIZE=$(du -h "$BACKUP_NAME" | cut -f1)
    echo "   ✅ 备份创建成功！"
    echo ""
    echo "================================================"
    echo "✅ 备份完成！"
    echo "================================================"
    echo "📁 备份文件: /home/user/$BACKUP_NAME"
    echo "📊 文件大小: $SIZE"
    echo ""
    echo "💾 保存备份到AI Drive:"
    echo "   cp /home/user/$BACKUP_NAME /mnt/aidrive/"
    echo ""
    echo "🔄 恢复备份:"
    echo "   cd /home/user"
    echo "   tar -xzf $BACKUP_NAME"
    echo "   cd webapp"
    echo "   npm install"
    echo "   npm run build"
    echo "================================================"
else
    echo "   ❌ 备份创建失败"
    exit 1
fi