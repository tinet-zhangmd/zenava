#!/bin/bash

# 简单启动脚本 - 直接使用PM2启动wrangler
# 这个脚本避免了配置文件解析问题

echo "====================================="
echo "    Zenava WebApp 简单启动脚本"
echo "====================================="
echo ""

# 颜色定义
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# 清理旧进程
echo -e "${YELLOW}清理旧进程和端口...${NC}"
pm2 delete all 2>/dev/null || true
fuser -k 3000/tcp 2>/dev/null || true
lsof -ti:3000 | xargs kill -9 2>/dev/null || true

# 检查dist目录
if [ ! -d "dist" ]; then
    echo -e "${RED}错误: dist目录不存在${NC}"
    echo "正在构建项目..."
    npm run build
fi

# 创建logs目录
mkdir -p logs

echo ""
echo "选择启动模式:"
echo "1) 标准模式（无D1数据库）"
echo "2) D1数据库模式"
echo ""
read -p "请选择 (1-2) [默认: 1]: " mode

if [ "$mode" = "2" ]; then
    echo -e "${GREEN}启动D1数据库模式...${NC}"
    pm2 start npx \
        --name zenava-webapp \
        --cwd $(pwd) \
        --log logs/pm2.log \
        --error logs/pm2-error.log \
        --output logs/pm2-out.log \
        --time \
        -- wrangler pages dev dist --d1=zenava-production --local --ip 0.0.0.0 --port 3000
else
    echo -e "${GREEN}启动标准模式...${NC}"
    pm2 start npx \
        --name zenava-webapp \
        --cwd $(pwd) \
        --log logs/pm2.log \
        --error logs/pm2-error.log \
        --output logs/pm2-out.log \
        --time \
        -- wrangler pages dev dist --ip 0.0.0.0 --port 3000
fi

# 等待启动
echo -e "${YELLOW}等待服务启动...${NC}"
sleep 5

# 检查状态
pm2 list

# 测试服务
echo ""
echo -e "${YELLOW}测试服务...${NC}"
for i in {1..10}; do
    if curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 | grep -q "200"; then
        echo -e "${GREEN}✅ 服务启动成功！${NC}"
        echo ""
        echo "访问地址: http://localhost:3000"
        echo ""
        echo "常用命令:"
        echo "  查看日志: pm2 logs zenava-webapp"
        echo "  查看状态: pm2 list"
        echo "  重启服务: pm2 restart zenava-webapp"
        echo "  停止服务: pm2 stop zenava-webapp"
        exit 0
    fi
    echo "等待中... ($i/10)"
    sleep 2
done

echo -e "${RED}服务启动超时，请查看日志：${NC}"
echo "pm2 logs zenava-webapp --lines 50"
exit 1