#!/bin/bash
# 清理端口占用的脚本

PORT=${1:-3000}

echo "🔍 检查端口 $PORT 占用情况..."

# 查找占用端口的进程
PIDS=$(lsof -ti:$PORT 2>/dev/null)

if [ -z "$PIDS" ]; then
    echo "✅ 端口 $PORT 未被占用"
    exit 0
fi

echo "📋 发现以下进程占用端口 $PORT:"
lsof -i:$PORT | grep LISTEN

echo ""
read -p "是否要停止这些进程？(y/N) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🛑 正在停止进程..."
    for PID in $PIDS; do
        kill -9 $PID 2>/dev/null && echo "  ✅ 已停止进程 $PID" || echo "  ❌ 无法停止进程 $PID"
    done
    
    sleep 1
    
    # 再次检查
    REMAINING=$(lsof -ti:$PORT 2>/dev/null)
    if [ -z "$REMAINING" ]; then
        echo "✅ 端口 $PORT 已释放"
    else
        echo "⚠️  仍有进程占用端口 $PORT"
        lsof -i:$PORT
    fi
else
    echo "❌ 已取消"
fi

