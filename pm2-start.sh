#!/bin/bash

# PM2启动脚本 - 修复版
# 使用直接命令方式而不是配置文件

echo "====================================="
echo "    Zenava WebApp PM2 启动脚本"
echo "====================================="
echo ""

# 颜色定义
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

# 获取当前目录
CURRENT_DIR=$(pwd)
echo -e "${BLUE}当前工作目录: $CURRENT_DIR${NC}"

# 检查dist目录是否存在
if [ ! -d "dist" ]; then
    echo -e "${RED}错误: dist目录不存在${NC}"
    echo -e "${YELLOW}正在构建项目...${NC}"
    npm run build
    if [ $? -ne 0 ]; then
        echo -e "${RED}构建失败，请检查错误${NC}"
        exit 1
    fi
fi

# 创建logs目录
mkdir -p logs

# 清理函数
cleanup() {
    echo -e "${YELLOW}清理旧进程...${NC}"
    
    # 删除可能存在的PM2进程
    pm2 delete zenava-webapp 2>/dev/null || true
    pm2 delete zenava-webapp-d1 2>/dev/null || true
    pm2 delete ecosystem.config.d1 2>/dev/null || true
    pm2 delete ecosystem.config 2>/dev/null || true
    pm2 delete all 2>/dev/null || true
    
    # 清理3000端口
    echo -e "${YELLOW}清理3000端口...${NC}"
    fuser -k 3000/tcp 2>/dev/null || true
    lsof -ti:3000 | xargs kill -9 2>/dev/null || true
    
    # 等待端口释放
    sleep 2
}

# 执行清理
cleanup

echo ""
echo "请选择启动模式："
echo -e "${GREEN}1)${NC} 简单模式 (不使用D1数据库) - 推荐"
echo -e "${GREEN}2)${NC} 完整模式 (使用D1数据库)"
echo -e "${GREEN}3)${NC} 开发模式 (npm run dev:sandbox)"
echo -e "${GREEN}4)${NC} 查看现有PM2进程"
echo ""

read -p "请输入选择 (1-4): " choice

case $choice in
    1)
        echo ""
        echo -e "${GREEN}========== 启动简单模式 ==========${NC}"
        echo -e "${BLUE}执行命令:${NC}"
        echo "pm2 start npx --name zenava-webapp -- wrangler pages dev dist --ip 0.0.0.0 --port 3000"
        echo ""
        
        # 使用直接命令启动
        pm2 start npx \
            --name zenava-webapp \
            --cwd "$CURRENT_DIR" \
            --error logs/pm2-error.log \
            --output logs/pm2-out.log \
            --log logs/pm2-combined.log \
            --time \
            --max-memory-restart 1G \
            --merge-logs \
            -- wrangler pages dev dist --ip 0.0.0.0 --port 3000
            
        APP_NAME="zenava-webapp"
        ;;
        
    2)
        echo ""
        echo -e "${GREEN}========== 启动完整模式 (D1) ==========${NC}"
        
        # 检查D1配置
        if [ ! -d ".wrangler/state/v3/d1" ]; then
            echo -e "${YELLOW}警告: D1数据库未初始化${NC}"
            echo -n "是否要初始化D1数据库? (y/n): "
            read init_d1
            if [ "$init_d1" = "y" ] || [ "$init_d1" = "Y" ]; then
                echo -e "${BLUE}初始化D1数据库...${NC}"
                npm run db:migrate:local 2>/dev/null || echo -e "${YELLOW}迁移可能已存在${NC}"
            fi
        fi
        
        echo -e "${BLUE}执行命令:${NC}"
        echo "pm2 start npx --name zenava-webapp-d1 -- wrangler pages dev dist --d1=zenava-production --local --ip 0.0.0.0 --port 3000"
        echo ""
        
        # 使用直接命令启动
        pm2 start npx \
            --name zenava-webapp-d1 \
            --cwd "$CURRENT_DIR" \
            --error logs/pm2-error-d1.log \
            --output logs/pm2-out-d1.log \
            --log logs/pm2-combined-d1.log \
            --time \
            --max-memory-restart 1G \
            --merge-logs \
            -- wrangler pages dev dist --d1=zenava-production --local --ip 0.0.0.0 --port 3000
            
        APP_NAME="zenava-webapp-d1"
        ;;
        
    3)
        echo ""
        echo -e "${GREEN}========== 开发模式 ==========${NC}"
        echo -e "${BLUE}执行命令: npm run dev:sandbox${NC}"
        npm run dev:sandbox
        exit 0
        ;;
        
    4)
        echo ""
        echo -e "${BLUE}========== 现有PM2进程 ==========${NC}"
        pm2 list
        echo ""
        echo -e "${YELLOW}提示: 使用 'pm2 logs <app-name>' 查看日志${NC}"
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

# 显示启动进度
for i in {1..10}; do
    echo -n "."
    sleep 1
done
echo ""

# 检查PM2进程状态
echo ""
echo -e "${BLUE}========== PM2进程状态 ==========${NC}"
pm2 list

# 检查服务是否真正启动
echo ""
echo -e "${YELLOW}检查服务状态...${NC}"

# 多次尝试连接
SUCCESS=false
for i in {1..10}; do
    if curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 | grep -q "200\|304"; then
        SUCCESS=true
        break
    fi
    echo "尝试连接... ($i/10)"
    sleep 2
done

if [ "$SUCCESS" = true ]; then
    echo ""
    echo -e "${GREEN}===============================================${NC}"
    echo -e "${GREEN}       ✅ 服务启动成功！${NC}"
    echo -e "${GREEN}===============================================${NC}"
    echo ""
    echo -e "${BLUE}访问地址:${NC}"
    echo "  本地: http://localhost:3000"
    if [ -n "$SERVER_IP" ]; then
        echo "  远程: http://$SERVER_IP:3000"
    fi
    echo ""
    echo -e "${BLUE}管理命令:${NC}"
    echo "  查看状态: pm2 list"
    echo "  查看日志: pm2 logs $APP_NAME"
    echo "  实时日志: pm2 logs $APP_NAME -f"
    echo "  错误日志: pm2 logs $APP_NAME --err"
    echo "  重启服务: pm2 restart $APP_NAME"
    echo "  停止服务: pm2 stop $APP_NAME"
    echo "  删除服务: pm2 delete $APP_NAME"
    echo "  监控面板: pm2 monit"
    echo ""
    echo -e "${GREEN}提示: 使用 Ctrl+C 退出日志查看${NC}"
    echo ""
    
    # 显示最近的日志
    echo -e "${BLUE}========== 最近日志 (最后10行) ==========${NC}"
    pm2 logs $APP_NAME --nostream --lines 10
    
else
    echo ""
    echo -e "${RED}===============================================${NC}"
    echo -e "${RED}       ❌ 服务启动可能失败${NC}"
    echo -e "${RED}===============================================${NC}"
    echo ""
    echo -e "${YELLOW}服务可能还在启动中，或者遇到了问题${NC}"
    echo ""
    echo -e "${BLUE}诊断步骤:${NC}"
    echo "1. 查看PM2进程: pm2 list"
    echo "2. 查看详细日志: pm2 logs $APP_NAME --lines 50"
    echo "3. 查看错误日志: pm2 logs $APP_NAME --err --lines 50"
    echo "4. 检查端口占用: lsof -i:3000"
    echo "5. 手动测试: curl -v http://localhost:3000"
    echo ""
    echo -e "${BLUE}常见问题解决:${NC}"
    echo "- 端口被占用: fuser -k 3000/tcp"
    echo "- 构建问题: npm run build"
    echo "- 依赖问题: npm install"
    echo "- 直接运行测试: npm run dev:sandbox"
    echo ""
    
    # 显示错误日志
    echo -e "${RED}========== 错误日志 (如果有) ==========${NC}"
    pm2 logs $APP_NAME --err --nostream --lines 20
fi

# 结束
echo ""
echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}脚本执行完成 - $(date '+%Y-%m-%d %H:%M:%S')${NC}"
echo -e "${BLUE}========================================${NC}"