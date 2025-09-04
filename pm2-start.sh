#!/bin/bash

# PM2启动脚本
# 提供不同的启动选项

echo "====================================="
echo "    Zenava WebApp PM2 启动脚本"
echo "====================================="
echo ""

# 颜色定义
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# 检查dist目录是否存在
if [ ! -d "dist" ]; then
    echo -e "${RED}错误: dist目录不存在，请先运行 'npm run build'${NC}"
    exit 1
fi

# 创建logs目录
mkdir -p logs

# 清理旧进程
echo -e "${YELLOW}清理旧进程...${NC}"
pm2 delete zenava-webapp 2>/dev/null || true
pm2 delete zenava-webapp-d1 2>/dev/null || true

# 清理端口
echo -e "${YELLOW}清理3000端口...${NC}"
fuser -k 3000/tcp 2>/dev/null || true

echo ""
echo "请选择启动模式："
echo "1) 简单模式 (不使用D1数据库) - 推荐"
echo "2) 完整模式 (使用D1数据库)"
echo "3) 开发模式 (npm run dev:sandbox)"
echo ""

read -p "请输入选择 (1-3): " choice

case $choice in
    1)
        echo -e "${GREEN}启动简单模式...${NC}"
        pm2 start ecosystem.config.cjs
        ;;
    2)
        echo -e "${GREEN}启动完整模式 (D1)...${NC}"
        # 检查D1配置
        if [ ! -d ".wrangler/state/v3/d1" ]; then
            echo -e "${YELLOW}警告: D1数据库未初始化${NC}"
            echo "是否要初始化D1数据库? (y/n)"
            read -p "" init_d1
            if [ "$init_d1" = "y" ]; then
                echo "初始化D1数据库..."
                npm run db:migrate:local 2>/dev/null || echo "迁移可能已存在"
            fi
        fi
        pm2 start ecosystem.config.d1.cjs
        ;;
    3)
        echo -e "${GREEN}使用npm启动开发模式...${NC}"
        npm run dev:sandbox
        exit 0
        ;;
    *)
        echo -e "${RED}无效的选择${NC}"
        exit 1
        ;;
esac

# 等待服务启动
echo ""
echo -e "${YELLOW}等待服务启动...${NC}"
sleep 3

# 检查服务状态
if pm2 list | grep -q "online"; then
    echo -e "${GREEN}✅ 服务启动成功！${NC}"
    echo ""
    echo "访问地址:"
    echo "  本地: http://localhost:3000"
    echo ""
    echo "管理命令:"
    echo "  查看状态: pm2 list"
    echo "  查看日志: pm2 logs"
    echo "  重启服务: pm2 restart all"
    echo "  停止服务: pm2 stop all"
    echo ""
    pm2 list
else
    echo -e "${RED}❌ 服务启动失败${NC}"
    echo "查看错误日志:"
    echo "  pm2 logs --err"
    exit 1
fi