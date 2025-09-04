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

# 获取当前目录
CURRENT_DIR=$(pwd)
echo -e "${YELLOW}当前工作目录: $CURRENT_DIR${NC}"

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
pm2 delete ecosystem.config.d1 2>/dev/null || true
pm2 delete ecosystem.config 2>/dev/null || true

# 清理端口
echo -e "${YELLOW}清理3000端口...${NC}"
fuser -k 3000/tcp 2>/dev/null || true
lsof -ti:3000 | xargs kill -9 2>/dev/null || true

echo ""
echo "请选择启动模式："
echo "1) 简单模式 (不使用D1数据库) - 推荐"
echo "2) 完整模式 (使用D1数据库)"
echo "3) 开发模式 (npm run dev:sandbox)"
echo "4) 直接命令模式 (手动输入wrangler命令)"
echo ""

read -p "请输入选择 (1-4): " choice

case $choice in
    1)
        echo -e "${GREEN}启动简单模式...${NC}"
        # 更新配置文件中的cwd路径
        sed -i "s|cwd:.*|cwd: '$CURRENT_DIR',|" ecosystem.config.cjs
        pm2 start ecosystem.config.cjs
        APP_NAME="zenava-webapp"
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
        # 更新配置文件中的cwd路径
        sed -i "s|cwd:.*|cwd: '$CURRENT_DIR',|" ecosystem.config.d1.cjs
        pm2 start ecosystem.config.d1.cjs
        APP_NAME="zenava-webapp-d1"
        ;;
    3)
        echo -e "${GREEN}使用npm启动开发模式...${NC}"
        npm run dev:sandbox
        exit 0
        ;;
    4)
        echo -e "${GREEN}直接使用PM2启动wrangler...${NC}"
        echo "请输入wrangler命令参数（例如: dist --ip 0.0.0.0 --port 3000）:"
        read -p "wrangler pages dev " wrangler_args
        pm2 start npx --name zenava-webapp -- wrangler pages dev $wrangler_args
        APP_NAME="zenava-webapp"
        ;;
    *)
        echo -e "${RED}无效的选择${NC}"
        exit 1
        ;;
esac

# 等待服务启动
echo ""
echo -e "${YELLOW}等待服务启动...${NC}"
sleep 5

# 检查服务状态
if pm2 list | grep -q "$APP_NAME.*online"; then
    echo -e "${GREEN}✅ 服务启动成功！${NC}"
    echo ""
    
    # 测试服务
    echo -e "${YELLOW}测试服务连接...${NC}"
    if curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 | grep -q "200"; then
        echo -e "${GREEN}✅ 服务响应正常！${NC}"
    else
        echo -e "${YELLOW}⚠️  服务可能还在启动中，请稍后再试${NC}"
        echo "查看日志: pm2 logs $APP_NAME"
    fi
    
    echo ""
    echo "访问地址:"
    echo "  本地: http://localhost:3000"
    echo ""
    echo "管理命令:"
    echo "  查看状态: pm2 list"
    echo "  查看日志: pm2 logs $APP_NAME"
    echo "  实时日志: pm2 logs $APP_NAME -f"
    echo "  重启服务: pm2 restart $APP_NAME"
    echo "  停止服务: pm2 stop $APP_NAME"
    echo "  删除服务: pm2 delete $APP_NAME"
    echo ""
    pm2 list
else
    echo -e "${RED}❌ 服务启动失败${NC}"
    echo "查看错误日志:"
    echo "  pm2 logs --err"
    echo ""
    echo "可能的解决方案:"
    echo "1. 检查端口是否被占用: lsof -i:3000"
    echo "2. 检查构建是否完成: npm run build"
    echo "3. 尝试直接运行: npm run dev:sandbox"
    exit 1
fi