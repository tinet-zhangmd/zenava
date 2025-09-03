#!/bin/bash

# 修复备份问题的脚本
# 问题：SQLite的临时文件(.sqlite-shm 和 .sqlite-wal)可能不存在，导致备份失败

echo "=== 修复备份问题 ==="
echo "正在检查和修复SQLite临时文件..."

# 定位到数据库目录
DB_DIR="/home/user/webapp/.wrangler/state/v3/d1/miniflare-D1DatabaseObject"

# 如果目录存在
if [ -d "$DB_DIR" ]; then
    echo "找到数据库目录: $DB_DIR"
    
    # 查找所有的.sqlite文件
    for sqlite_file in "$DB_DIR"/*.sqlite; do
        if [ -f "$sqlite_file" ]; then
            # 获取基础文件名（不含扩展名）
            base_name="${sqlite_file%.sqlite}"
            
            # 创建对应的-shm和-wal文件（如果不存在）
            if [ ! -f "${base_name}.sqlite-shm" ]; then
                touch "${base_name}.sqlite-shm"
                echo "创建占位文件: ${base_name}.sqlite-shm"
            fi
            
            if [ ! -f "${base_name}.sqlite-wal" ]; then
                touch "${base_name}.sqlite-wal"
                echo "创建占位文件: ${base_name}.sqlite-wal"
            fi
        fi
    done
    
    echo "✅ SQLite临时文件修复完成"
else
    echo "⚠️ 数据库目录不存在，跳过修复"
fi

echo ""
echo "=== 创建备份 ==="
echo "您现在可以尝试以下方法创建备份："
echo ""
echo "方法1: 使用tar命令创建本地备份"
echo "cd /home/user"
echo "tar -czf webapp-backup-$(date +%Y%m%d-%H%M%S).tar.gz webapp/"
echo ""
echo "方法2: 排除临时文件的备份"
echo "cd /home/user"
echo "tar -czf webapp-backup-$(date +%Y%m%d-%H%M%S).tar.gz \\"
echo "  --exclude='webapp/node_modules' \\"
echo "  --exclude='webapp/.wrangler/state/v3/d1/miniflare-D1DatabaseObject/*.sqlite-shm' \\"
echo "  --exclude='webapp/.wrangler/state/v3/d1/miniflare-D1DatabaseObject/*.sqlite-wal' \\"
echo "  webapp/"
echo ""
echo "✅ 修复脚本执行完成！"