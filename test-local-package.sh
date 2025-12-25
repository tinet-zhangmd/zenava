#!/bin/bash
# Zenava 本地验证脚本
# 用于在本地测试部署包是否正常工作

set -e

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 配置
TEST_DIR="test-local-deploy"
PACKAGE_NAME=$(ls -t zenava-production-*.tar.gz 2>/dev/null | head -1)
PORT=3001  # 使用不同的端口避免冲突

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  Zenava 本地部署包验证${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

# 检查部署包是否存在
if [ ! -f "$PACKAGE_NAME" ]; then
  echo -e "${RED}✗ 错误: 找不到部署包文件${NC}"
  echo -e "${YELLOW}请先运行: ./build-production.sh${NC}"
  exit 1
fi

echo -e "${BLUE}📦 部署包: ${PACKAGE_NAME}${NC}"
echo ""

# 1. 清理旧的测试目录
echo -e "${YELLOW}[1/7] 清理旧的测试目录...${NC}"
if [ -d "$TEST_DIR" ]; then
  # 尝试停止可能正在运行的进程
  if [ -f "$TEST_DIR/.pid" ]; then
    OLD_PID=$(cat "$TEST_DIR/.pid" 2>/dev/null || echo "")
    if [ ! -z "$OLD_PID" ] && kill -0 "$OLD_PID" 2>/dev/null; then
      echo -e "${YELLOW}  停止旧进程 (PID: $OLD_PID)...${NC}"
      kill "$OLD_PID" 2>/dev/null || true
      sleep 2
    fi
  fi
  rm -rf "$TEST_DIR"
fi
mkdir -p "$TEST_DIR"
echo -e "${GREEN}✓ 清理完成${NC}"
echo ""

# 2. 解压部署包
echo -e "${YELLOW}[2/7] 解压部署包...${NC}"
cd "$TEST_DIR"
tar -xzf "../$PACKAGE_NAME"
if [ ! -d "deploy-package" ]; then
  echo -e "${RED}✗ 错误: 解压后找不到 deploy-package 目录${NC}"
  exit 1
fi
cd deploy-package
echo -e "${GREEN}✓ 解压完成${NC}"
echo ""

# 3. 检查必要文件
echo -e "${YELLOW}[3/7] 检查必要文件...${NC}"
REQUIRED_FILES=("dist-node" "server.js" "package.json")
for file in "${REQUIRED_FILES[@]}"; do
  if [ ! -e "$file" ]; then
    echo -e "${RED}✗ 错误: 缺少必要文件: $file${NC}"
    exit 1
  fi
done
echo -e "${GREEN}✓ 文件检查通过${NC}"
echo ""

# 4. 设置环境变量
echo -e "${YELLOW}[4/7] 设置环境变量...${NC}"
if [ ! -f ".env" ]; then
  if [ -f ".env.example" ]; then
    cp .env.example .env
    echo -e "${GREEN}✓ 已从 .env.example 创建 .env 文件${NC}"
  else
    echo -e "${YELLOW}⚠ 警告: 未找到 .env.example，创建基本 .env 文件${NC}"
    cat > .env << 'ENV_BASIC'
NODE_ENV=production
PORT=3001
HOST=0.0.0.0

# MySQL 数据库配置（请根据实际情况修改）
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_DATABASE=ZENAVA_LOCAL
MYSQL_USER=root
MYSQL_PASSWORD=12345
ENV_BASIC
  fi
else
  echo -e "${GREEN}✓ .env 文件已存在${NC}"
fi

# 更新端口为测试端口
if grep -q "^PORT=" .env; then
  sed -i.bak "s/^PORT=.*/PORT=$PORT/" .env
else
  echo "PORT=$PORT" >> .env
fi

echo -e "${YELLOW}  当前环境变量配置:${NC}"
grep -E "^(NODE_ENV|PORT|MYSQL_|HOST)" .env | sed 's/\(PASSWORD\)=.*/\1=***/' || true
echo ""
echo -e "${YELLOW}⚠ 提示: 如果数据库配置不正确，请编辑 .env 文件${NC}"
echo ""

# 5. 安装依赖
echo -e "${YELLOW}[5/7] 安装依赖...${NC}"
if [ ! -d "node_modules" ]; then
  # 需要安装 tsx 作为开发依赖来运行应用
  npm install
else
  # 检查是否有 tsx
  if [ ! -f "node_modules/.bin/tsx" ]; then
    echo -e "${YELLOW}  安装 tsx...${NC}"
    npm install tsx --save-dev
  fi
  echo -e "${GREEN}✓ node_modules 已存在${NC}"
fi
echo -e "${GREEN}✓ 依赖检查完成${NC}"
echo ""

# 6. 检查数据库连接（可选）
echo -e "${YELLOW}[6/7] 检查数据库连接...${NC}"
MYSQL_HOST=$(grep "^MYSQL_HOST=" .env | cut -d'=' -f2 || echo "localhost")
MYSQL_PORT=$(grep "^MYSQL_PORT=" .env | cut -d'=' -f2 || echo "3306")
MYSQL_DATABASE=$(grep "^MYSQL_DATABASE=" .env | cut -d'=' -f2 || echo "ZENAVA_LOCAL")

if command -v mysql &> /dev/null; then
  echo -e "${BLUE}  尝试连接数据库: ${MYSQL_HOST}:${MYSQL_PORT}/${MYSQL_DATABASE}${NC}"
  # 这里可以添加数据库连接测试，但为了简化，我们跳过
  echo -e "${YELLOW}  ⚠ 数据库连接测试已跳过，将在启动时验证${NC}"
else
  echo -e "${YELLOW}  ⚠ MySQL 客户端未安装，跳过数据库连接测试${NC}"
fi
echo ""

# 7. 启动应用
echo -e "${YELLOW}[7/7] 启动应用...${NC}"
echo -e "${BLUE}  应用将在端口 $PORT 上运行${NC}"
echo -e "${BLUE}  访问地址: http://localhost:$PORT${NC}"
echo ""

# 启动应用（后台运行）
# 使用 npx tsx 确保能找到 tsx 命令
nohup npx tsx server.js > ../app.log 2>&1 &
APP_PID=$!
echo $APP_PID > ../.pid

echo -e "${GREEN}✓ 应用已启动 (PID: $APP_PID)${NC}"
echo ""

# 等待应用启动
echo -e "${YELLOW}等待应用启动...${NC}"
sleep 5

# 检查应用是否运行
if ! kill -0 $APP_PID 2>/dev/null; then
  echo -e "${RED}✗ 应用启动失败！${NC}"
  echo -e "${YELLOW}查看日志:${NC}"
  tail -50 ../app.log
  exit 1
fi

# 测试应用响应
echo -e "${YELLOW}测试应用响应...${NC}"
for i in {1..10}; do
  if curl -f -s http://localhost:$PORT > /dev/null 2>&1; then
    echo -e "${GREEN}✓ 应用响应正常！${NC}"
    echo ""
    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}  ✅ 验证成功！${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo ""
    echo -e "${BLUE}📋 应用信息:${NC}"
    echo -e "  PID: $APP_PID"
    echo -e "  端口: $PORT"
    echo -e "  访问地址: http://localhost:$PORT"
    echo -e "  日志文件: $TEST_DIR/app.log"
    echo ""
    echo -e "${YELLOW}📝 常用命令:${NC}"
    echo -e "  查看日志: tail -f $TEST_DIR/app.log"
    echo -e "  停止应用: kill $APP_PID 或运行 ./stop-local-test.sh"
    echo -e "  查看进程: ps aux | grep tsx"
    echo ""
    exit 0
  fi
  sleep 2
done

echo -e "${RED}✗ 应用启动超时或无法响应${NC}"
echo -e "${YELLOW}查看日志:${NC}"
tail -50 ../app.log
echo ""
echo -e "${YELLOW}应用进程仍在运行 (PID: $APP_PID)，请手动检查${NC}"
exit 1
