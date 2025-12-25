#!/bin/bash
# 停止本地测试应用

TEST_DIR="test-local-deploy"

if [ -f "$TEST_DIR/.pid" ]; then
  PID=$(cat "$TEST_DIR/.pid")
  if kill -0 "$PID" 2>/dev/null; then
    echo "停止应用 (PID: $PID)..."
    kill "$PID"
    sleep 2
    if kill -0 "$PID" 2>/dev/null; then
      echo "强制停止..."
      kill -9 "$PID"
    fi
    echo "✓ 应用已停止"
  else
    echo "应用未运行"
  fi
  rm -f "$TEST_DIR/.pid"
else
  echo "未找到 PID 文件，尝试查找进程..."
  pkill -f "tsx.*server.js" && echo "✓ 已停止相关进程" || echo "未找到运行中的进程"
  pkill -f "npx.*tsx.*server.js" && echo "✓ 已停止相关进程" || true
fi

