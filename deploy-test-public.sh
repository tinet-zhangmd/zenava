#!/bin/bash
# 测试环境公网访问部署脚本

set -e

PORT=3000
SERVER_IP=$(curl -s ifconfig.me 2>/dev/null || curl -s ip.sb 2>/dev/null || echo "未知")

echo "🚀 部署测试环境（公网访问）"
echo "================================"
echo ""

# 检查 Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未安装"
    exit 1
fi

# 1. 构建
echo "🔨 构建项目..."
npm run build

if [ ! -d "dist" ]; then
    echo "❌ 构建失败，dist 目录不存在"
    exit 1
fi

# 2. 停止旧进程
echo "🛑 停止旧进程..."
pm2 stop zenava-test 2>/dev/null || true
pm2 delete zenava-test 2>/dev/null || true

# 3. 启动应用（绑定到 0.0.0.0 允许外部访问）
echo "🚀 启动应用（公网访问）..."
pm2 start npx --name zenava-test -- wrangler pages dev dist --ip 0.0.0.0 --port $PORT

# 等待启动
sleep 3

# 4. 配置防火墙（Ubuntu/Debian）
if command -v ufw &> /dev/null; then
    echo "🔥 配置防火墙（UFW）..."
    sudo ufw allow $PORT/tcp 2>/dev/null || true
    sudo ufw reload 2>/dev/null || true
    echo "✅ 防火墙已配置"
fi

# 5. 配置防火墙（CentOS/RHEL）
if command -v firewall-cmd &> /dev/null; then
    echo "🔥 配置防火墙（firewalld）..."
    sudo firewall-cmd --permanent --add-port=$PORT/tcp 2>/dev/null || true
    sudo firewall-cmd --reload 2>/dev/null || true
    echo "✅ 防火墙已配置"
fi

# 6. 健康检查
echo ""
echo "🏥 健康检查..."
sleep 2
if curl -f http://localhost:$PORT > /dev/null 2>&1; then
    echo "✅ 应用运行正常"
else
    echo "⚠️  应用可能未正常启动，请检查日志: pm2 logs zenava-test"
fi

# 7. 显示访问信息
echo ""
echo "================================"
echo "✅ 部署完成！"
echo "================================"
echo ""
echo "📋 访问地址:"
if [ "$SERVER_IP" != "未知" ]; then
    echo "  🌐 公网访问: http://$SERVER_IP:$PORT"
    echo "  🌐 中文首页: http://$SERVER_IP:$PORT/zh"
    echo "  🌐 AI Agents: http://$SERVER_IP:$PORT/products/ai-agents"
else
    echo "  ⚠️  无法获取服务器 IP，请手动查看"
    echo "  💡 使用命令: curl ifconfig.me"
fi
echo ""
echo "📝 管理命令:"
echo "  - 查看状态: pm2 status"
echo "  - 查看日志: pm2 logs zenava-test"
echo "  - 重启应用: pm2 restart zenava-test"
echo "  - 停止应用: pm2 stop zenava-test"
echo ""
echo "🔒 安全提示:"
echo "  - 测试环境建议使用 Nginx 反向代理"
echo "  - 生产环境必须配置 HTTPS"
echo "  - 建议配置 IP 访问限制"
echo ""

