#!/bin/bash
# 本地部署脚本 - 快速测试
# 用于在本地环境快速部署和启动应用

set -e

echo "🚀 Zenava 本地部署脚本"
echo "========================"
echo ""

# 检查 Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未安装，请先安装 Node.js >= 18"
    exit 1
fi
echo "✅ Node.js: $(node -v)"

# 检查端口
PORT=3000
if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "⚠️  端口 $PORT 已被占用"
    read -p "是否要停止占用该端口的进程? (y/n): " kill_port
    if [ "$kill_port" = "y" ]; then
        echo "🛑 停止占用端口的进程..."
        lsof -ti:$PORT | xargs kill -9 2>/dev/null || fuser -k $PORT/tcp 2>/dev/null || true
        sleep 2
    else
        read -p "请输入其他端口号 (默认 3001): " new_port
        PORT=${new_port:-3001}
    fi
fi

# 1. 安装依赖
echo ""
echo "📦 安装依赖..."
if [ ! -d "node_modules" ]; then
    npm install
else
    echo "✅ 依赖已安装"
fi

# 2. 构建项目
echo ""
echo "🔨 构建项目..."
npm run build

if [ ! -d "dist" ]; then
    echo "❌ 构建失败，dist 目录不存在"
    exit 1
fi
echo "✅ 构建成功！"

# 3. 选择启动方式
echo ""
echo "========================"
echo "请选择启动方式："
echo "========================"
echo "1) 直接运行 (前台，Ctrl+C 停止)"
echo "2) 使用 PM2 运行 (后台，推荐)"
echo "3) 仅构建，不启动"
echo ""
read -p "请输入选项 (1-3，默认 1): " choice
choice=${choice:-1}

case $choice in
    1)
        echo ""
        echo "🖥️  启动开发服务器..."
        echo "访问地址: http://localhost:$PORT"
        echo "按 Ctrl+C 停止服务器"
        echo ""
        npx wrangler pages dev dist --ip 0.0.0.0 --port $PORT
        ;;
        
    2)
        echo ""
        echo "📦 检查 PM2..."
        if ! command -v pm2 &> /dev/null; then
            echo "📥 安装 PM2..."
            npm install -g pm2
        fi
        
        echo "🔄 停止旧进程..."
        pm2 stop zenava-webapp-local 2>/dev/null || true
        pm2 delete zenava-webapp-local 2>/dev/null || true
        
        echo "🚀 启动应用 (PM2)..."
        pm2 start npx --name zenava-webapp-local -- wrangler pages dev dist --ip 0.0.0.0 --port $PORT
        
        echo ""
        echo "✅ 应用已启动！"
        echo ""
        echo "📋 访问地址: http://localhost:$PORT"
        echo ""
        echo "📝 常用命令:"
        echo "  - 查看状态: pm2 status"
        echo "  - 查看日志: pm2 logs zenava-webapp-local"
        echo "  - 停止应用: pm2 stop zenava-webapp-local"
        echo "  - 重启应用: pm2 restart zenava-webapp-local"
        echo ""
        
        # 等待一下，然后显示状态
        sleep 2
        pm2 status
        ;;
        
    3)
        echo ""
        echo "✅ 构建完成！"
        echo "输出目录: ./dist"
        echo ""
        echo "手动启动命令:"
        echo "  npx wrangler pages dev dist --ip 0.0.0.0 --port $PORT"
        ;;
        
    *)
        echo "❌ 无效选项"
        exit 1
        ;;
esac

