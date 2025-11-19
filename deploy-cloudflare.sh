#!/bin/bash
# Cloudflare Pages 部署脚本

set -e

PROJECT_NAME="${PROJECT_NAME:-zenava-official}"
BUILD_DIR="dist"

echo "🚀 部署到 Cloudflare Pages"
echo "================================"
echo "项目名称: $PROJECT_NAME"
echo ""

# 检查 Wrangler
if ! command -v npx &> /dev/null; then
    echo "❌ npx 未安装，请先安装 Node.js"
    exit 1
fi

# 检查是否登录
echo "🔐 检查 Cloudflare 登录状态..."
if ! npx wrangler whoami &> /dev/null; then
    echo "⚠️  未登录 Cloudflare，正在登录..."
    npx wrangler login
fi

# 1. 构建项目
echo ""
echo "🔨 构建项目..."
npm run build

if [ ! -d "$BUILD_DIR" ]; then
    echo "❌ 构建失败，$BUILD_DIR 目录不存在"
    exit 1
fi

echo "✅ 构建成功！"

# 2. 检查项目是否存在
echo ""
echo "📋 检查项目..."
if npx wrangler pages project list 2>/dev/null | grep -q "$PROJECT_NAME"; then
    echo "✅ 项目已存在: $PROJECT_NAME"
else
    echo "📦 创建新项目: $PROJECT_NAME"
    npx wrangler pages project create "$PROJECT_NAME" \
        --production-branch main \
        --compatibility-date 2024-01-01 || echo "⚠️  项目创建失败，可能已存在"
fi

# 3. 部署
echo ""
echo "🚀 部署到 Cloudflare Pages..."
npx wrangler pages deploy "$BUILD_DIR" --project-name "$PROJECT_NAME"

# 4. 显示部署信息
echo ""
echo "================================"
echo "✅ 部署完成！"
echo "================================"
echo ""
echo "📋 访问地址:"
echo "  🌐 https://$PROJECT_NAME.pages.dev"
echo ""
echo "📝 后续操作:"
echo "  - 查看部署列表: npx wrangler pages deployment list --project-name $PROJECT_NAME"
echo "  - 查看实时日志: npx wrangler tail --project-name $PROJECT_NAME"
echo "  - 配置自定义域名: 在 Cloudflare Dashboard 中设置"
echo ""

