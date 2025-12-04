#!/bin/bash

# Zenava 数据库初始化脚本
# 用于快速设置 MySQL 数据库

echo "🚀 Zenava 数据库初始化脚本"
echo "================================"
echo ""

# 配置变量
DB_USER="root"
DB_PASSWORD="12345"
DB_NAME="ZENAVA_LOCAL"
DB_HOST="localhost"

# 颜色输出
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 检查 MySQL 是否安装
if ! command -v mysql &> /dev/null; then
    echo -e "${RED}❌ MySQL 未安装，请先安装 MySQL${NC}"
    exit 1
fi

echo -e "${GREEN}✓${NC} MySQL 已安装"
echo ""

# 提示用户确认配置
echo "数据库配置："
echo "  用户: $DB_USER"
echo "  密码: $DB_PASSWORD"
echo "  数据库: $DB_NAME"
echo "  主机: $DB_HOST"
echo ""
read -p "是否使用以上配置？(y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "已取消"
    exit 0
fi

# 步骤 1: 创建数据库
echo ""
echo "步骤 1/3: 创建数据库..."
mysql -u $DB_USER -p$DB_PASSWORD -h $DB_HOST -e "CREATE DATABASE IF NOT EXISTS $DB_NAME CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;" 2>&1 | grep -v "mysql: \[Warning\]"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓${NC} 数据库创建成功"
else
    echo -e "${RED}❌ 数据库创建失败${NC}"
    exit 1
fi

# 步骤 2: 导入表结构
echo ""
echo "步骤 2/3: 导入表结构..."

migrations=(
    "migrations/0001_initial_schema.sql"
    "migrations/0002_cms_schema.sql"
    "migrations/0004_common_content.sql"
    "migrations/0008_unified_navigation.sql"
    "migrations/001_create_resource_center_tables.sql"
)

for migration in "${migrations[@]}"; do
    if [ -f "$migration" ]; then
        echo "  导入: $migration"
        mysql -u $DB_USER -p$DB_PASSWORD -h $DB_HOST $DB_NAME < "$migration" 2>&1 | grep -v "mysql: \[Warning\]"
        
        if [ $? -eq 0 ]; then
            echo -e "  ${GREEN}✓${NC} 导入成功"
        else
            echo -e "  ${RED}❌ 导入失败${NC}"
            exit 1
        fi
    else
        echo -e "  ${YELLOW}⚠${NC} 文件不存在: $migration (跳过)"
    fi
done

# 步骤 3: 导入种子数据（可选）
echo ""
read -p "是否导入种子数据（测试数据）？(y/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "步骤 3/3: 导入种子数据..."
    
    if [ -f "seed-cms.sql" ]; then
        mysql -u $DB_USER -p$DB_PASSWORD -h $DB_HOST $DB_NAME < seed-cms.sql 2>&1 | grep -v "mysql: \[Warning\]"
        
        if [ $? -eq 0 ]; then
            echo -e "${GREEN}✓${NC} 种子数据导入成功"
        else
            echo -e "${YELLOW}⚠${NC} 种子数据导入失败（可能已存在）"
        fi
    else
        echo -e "${YELLOW}⚠${NC} seed-cms.sql 文件不存在"
    fi
else
    echo "跳过种子数据导入"
fi

# 完成
echo ""
echo "================================"
echo -e "${GREEN}✅ 数据库初始化完成！${NC}"
echo ""
echo "下一步："
echo "1. 配置 .env 文件中的数据库连接信息"
echo "2. 启动应用: npm run dev"
echo "3. 访问管理后台: http://localhost:3000/ticloudadmin"
echo ""
echo "管理员登录信息："
echo "  用户名: ticloudhoutai@zenava.ai"
echo "  密码: tinet.Az2167Hk"
echo ""
echo -e "${YELLOW}⚠ 生产环境请务必修改默认密码！${NC}"
echo ""

