#!/bin/bash

# Zenava AI Web Application - 快速部署脚本
# Quick deployment script for Zenava AI Web Application

set -e  # Exit on error

echo "================================================"
echo "🚀 Zenava AI Web Application - 部署脚本"
echo "================================================"
echo ""

# 检查 Node.js
echo "📋 检查环境..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未安装，请先安装 Node.js >= 16"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo "❌ Node.js 版本过低，需要 >= 16，当前版本: $(node -v)"
    exit 1
fi
echo "✅ Node.js 版本: $(node -v)"

# 检查 npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm 未安装"
    exit 1
fi
echo "✅ npm 版本: $(npm -v)"

# 安装依赖
echo ""
echo "📦 安装项目依赖..."
npm install

# 构建项目
echo ""
echo "🔨 构建项目..."
npm run build

if [ -d "dist" ]; then
    echo "✅ 构建成功！"
else
    echo "❌ 构建失败，dist 目录不存在"
    exit 1
fi

# 选择部署方式
echo ""
echo "================================================"
echo "请选择部署方式："
echo "================================================"
echo "1) 本地开发运行 (使用 wrangler dev)"
echo "2) 部署到 Cloudflare Pages (需要 API Token)"
echo "3) 仅构建，不运行"
echo ""
read -p "请输入选项 (1-3): " choice

case $choice in
    1)
        echo ""
        echo "🖥️  启动本地开发服务器..."
        
        # 检查端口 3000 是否被占用
        if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null ; then
            echo "⚠️  端口 3000 已被占用，正在关闭..."
            fuser -k 3000/tcp 2>/dev/null || true
            sleep 2
        fi
        
        echo "访问地址: http://localhost:3000"
        echo "按 Ctrl+C 停止服务器"
        echo ""
        
        # 启动开发服务器
        npx wrangler pages dev dist --d1=webapp-production --local --ip 0.0.0.0 --port 3000
        ;;
        
    2)
        echo ""
        echo "☁️  部署到 Cloudflare Pages..."
        
        # 检查 API Token
        if [ -z "$CLOUDFLARE_API_TOKEN" ]; then
            echo "请输入您的 Cloudflare API Token:"
            read -s CLOUDFLARE_API_TOKEN
            export CLOUDFLARE_API_TOKEN
        fi
        
        # 获取项目名称
        echo ""
        read -p "请输入 Cloudflare Pages 项目名称 (默认: zenava-webapp): " PROJECT_NAME
        PROJECT_NAME=${PROJECT_NAME:-zenava-webapp}
        
        # 创建项目（如果不存在）
        echo ""
        echo "📝 创建/更新 Cloudflare Pages 项目..."
        npx wrangler pages project create $PROJECT_NAME \
            --production-branch main \
            --compatibility-date 2024-01-01 2>/dev/null || true
        
        # 部署
        echo ""
        echo "🚀 部署中..."
        npx wrangler pages deploy dist --project-name $PROJECT_NAME
        
        echo ""
        echo "================================================"
        echo "✅ 部署成功！"
        echo "================================================"
        echo "访问地址:"
        echo "  生产环境: https://$PROJECT_NAME.pages.dev"
        echo "  预览环境: https://<commit-hash>.$PROJECT_NAME.pages.dev"
        echo "================================================"
        ;;
        
    3)
        echo ""
        echo "✅ 构建完成！"
        echo "输出目录: ./dist"
        echo ""
        echo "您可以手动部署："
        echo "  npx wrangler pages deploy dist --project-name <your-project-name>"
        ;;
        
    *)
        echo "❌ 无效选项"
        exit 1
        ;;
esac

echo ""
echo "================================================"
echo "📚 更多信息请查看 DEPLOYMENT_GUIDE.md"
echo "================================================"