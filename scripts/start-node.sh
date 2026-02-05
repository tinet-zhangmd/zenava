#!/bin/bash

# 启动 dist-node 目录中的构建文件

set -e

cd "$(dirname "$0")/.."

# 颜色输出
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🚀 启动 dist-node 构建文件${NC}"
echo "================================"
echo ""

# 检查 dist-node 目录中的构建文件（支持带 hash 的文件名）
BUILD_FILE=$(find dist-node -name "index-node*.js" -type f 2>/dev/null | head -1)
if [ -z "$BUILD_FILE" ]; then
    echo -e "${RED}❌ dist-node 目录中找不到构建文件${NC}"
    echo ""
    echo "请先运行构建命令："
    echo "  npm run build"
    exit 1
fi

BUILD_FILE_NAME=$(basename "$BUILD_FILE")
echo -e "${GREEN}✅ 找到构建文件: dist-node/${BUILD_FILE_NAME}${NC}"
echo ""

# 检查 .env 文件
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}⚠️  .env 文件不存在，将使用默认配置${NC}"
else
    echo -e "${GREEN}✅ 找到配置文件: .env${NC}"
fi

echo ""
echo -e "${BLUE}📦 启动服务器...${NC}"
echo ""

# 使用 Node.js 直接运行构建后的文件
# 注意：由于是 ES 模块，需要使用 node --loader 或者通过 server.js
# server.js 已经配置好了，会自动使用 dist-node/index-node.js

node server.js
