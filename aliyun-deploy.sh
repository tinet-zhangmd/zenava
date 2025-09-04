#!/bin/bash

#==============================================================================
# Zenava WebApp 阿里云自动化部署脚本
# 版本: 1.0.0
# 作者: Zenava Team
# 用法: ./aliyun-deploy.sh [选项]
#==============================================================================

set -e  # 遇到错误立即退出

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 默认配置
PROJECT_DIR="/home/user/webapp"
BACKUP_DIR="/root/backups"
LOG_FILE="/var/log/webapp-deploy.log"
DEPLOY_MODE="cloudflare"  # cloudflare 或 server

# 函数：打印带颜色的消息
print_msg() {
    echo -e "${2}[$(date '+%Y-%m-%d %H:%M:%S')] $1${NC}" | tee -a $LOG_FILE
}

# 函数：检查命令是否存在
check_command() {
    if ! command -v $1 &> /dev/null; then
        print_msg "错误: $1 未安装" "$RED"
        return 1
    fi
    return 0
}

# 函数：显示使用帮助
show_help() {
    echo "Zenava WebApp 阿里云部署脚本"
    echo ""
    echo "用法: $0 [选项]"
    echo ""
    echo "选项:"
    echo "  -f, --file <tar文件>     指定源码包文件"
    echo "  -m, --mode <模式>        部署模式: cloudflare 或 server (默认: cloudflare)"
    echo "  -d, --domain <域名>      配置域名"
    echo "  -s, --ssl               配置SSL证书"
    echo "  -b, --backup            部署前备份现有项目"
    echo "  -h, --help              显示帮助信息"
    echo ""
    echo "示例:"
    echo "  $0 -f webapp-backup.tar.gz -m cloudflare"
    echo "  $0 -f webapp-backup.tar.gz -m server -d example.com -s"
}

# 函数：环境检查
check_environment() {
    print_msg "=== 环境检查 ===" "$BLUE"
    
    local errors=0
    
    # 检查必要命令
    for cmd in node npm git tar; do
        if check_command $cmd; then
            print_msg "✓ $cmd 已安装" "$GREEN"
        else
            errors=$((errors + 1))
        fi
    done
    
    # 检查Node版本
    if command -v node &> /dev/null; then
        NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
        if [ "$NODE_VERSION" -ge 18 ]; then
            print_msg "✓ Node.js版本: $(node -v)" "$GREEN"
        else
            print_msg "⚠ Node.js版本过低，需要18.x或更高版本" "$YELLOW"
            errors=$((errors + 1))
        fi
    fi
    
    # 检查PM2
    if check_command pm2; then
        print_msg "✓ PM2 已安装" "$GREEN"
    else
        print_msg "正在安装PM2..." "$YELLOW"
        npm install -g pm2
    fi
    
    # 检查Wrangler
    if check_command wrangler; then
        print_msg "✓ Wrangler 已安装" "$GREEN"
    else
        print_msg "正在安装Wrangler..." "$YELLOW"
        npm install -g wrangler
    fi
    
    if [ $errors -gt 0 ]; then
        print_msg "环境检查失败，请先解决上述问题" "$RED"
        exit 1
    fi
    
    print_msg "环境检查通过！" "$GREEN"
    echo ""
}

# 函数：备份现有项目
backup_project() {
    if [ -d "$PROJECT_DIR" ]; then
        print_msg "=== 备份现有项目 ===" "$BLUE"
        
        mkdir -p $BACKUP_DIR
        BACKUP_FILE="$BACKUP_DIR/webapp_backup_$(date +%Y%m%d_%H%M%S).tar.gz"
        
        cd $PROJECT_DIR
        tar -czf $BACKUP_FILE \
            --exclude=node_modules \
            --exclude=.wrangler \
            --exclude=dist \
            . 2>/dev/null || true
            
        print_msg "备份完成: $BACKUP_FILE" "$GREEN"
        echo ""
    fi
}

# 函数：解压并安装项目
install_project() {
    print_msg "=== 安装项目 ===" "$BLUE"
    
    # 解压源码
    print_msg "解压源码包..." "$YELLOW"
    tar -xzf $TAR_FILE -C /
    
    # 进入项目目录
    cd $PROJECT_DIR
    
    # 安装依赖
    print_msg "安装项目依赖..." "$YELLOW"
    npm install --production
    
    # 构建项目
    print_msg "构建项目..." "$YELLOW"
    npm run build
    
    print_msg "项目安装完成！" "$GREEN"
    echo ""
}

# 函数：Cloudflare Pages部署
deploy_cloudflare() {
    print_msg "=== Cloudflare Pages 部署 ===" "$BLUE"
    
    # 检查API Token
    if [ -z "$CLOUDFLARE_API_TOKEN" ]; then
        print_msg "请设置CLOUDFLARE_API_TOKEN环境变量" "$RED"
        echo "export CLOUDFLARE_API_TOKEN='your_token_here'"
        exit 1
    fi
    
    cd $PROJECT_DIR
    
    # 创建D1数据库（如果需要）
    if grep -q "d1_databases" wrangler.jsonc; then
        print_msg "创建D1数据库..." "$YELLOW"
        npx wrangler d1 create webapp-production || true
        
        # 应用迁移
        if [ -d "migrations" ]; then
            print_msg "应用数据库迁移..." "$YELLOW"
            npx wrangler d1 migrations apply webapp-production
        fi
    fi
    
    # 部署到Cloudflare Pages
    print_msg "部署到Cloudflare Pages..." "$YELLOW"
    npx wrangler pages deploy dist --project-name webapp
    
    print_msg "Cloudflare Pages部署完成！" "$GREEN"
    echo ""
}

# 函数：服务器本地部署
deploy_server() {
    print_msg "=== 服务器本地部署 ===" "$BLUE"
    
    cd $PROJECT_DIR
    
    # 停止现有服务
    print_msg "停止现有服务..." "$YELLOW"
    pm2 delete webapp 2>/dev/null || true
    
    # 启动新服务
    print_msg "启动服务..." "$YELLOW"
    pm2 start ecosystem.config.cjs
    pm2 save
    
    # 检查服务状态
    sleep 3
    if pm2 list | grep -q "webapp.*online"; then
        print_msg "服务启动成功！" "$GREEN"
        pm2 list
    else
        print_msg "服务启动失败，请查看日志" "$RED"
        pm2 logs webapp --lines 50
        exit 1
    fi
    
    echo ""
}

# 函数：配置Nginx
configure_nginx() {
    print_msg "=== 配置Nginx ===" "$BLUE"
    
    if [ -z "$DOMAIN" ]; then
        print_msg "未指定域名，跳过Nginx配置" "$YELLOW"
        return
    fi
    
    # 创建Nginx配置
    cat > /etc/nginx/sites-available/webapp << EOF
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;
    
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    }
    
    location /static/ {
        alias $PROJECT_DIR/public/static/;
        expires 30d;
    }
    
    gzip on;
    gzip_types text/css application/javascript application/json;
}
EOF
    
    # 启用站点
    ln -sf /etc/nginx/sites-available/webapp /etc/nginx/sites-enabled/
    
    # 测试配置
    if nginx -t; then
        systemctl reload nginx
        print_msg "Nginx配置成功！" "$GREEN"
    else
        print_msg "Nginx配置错误，请检查" "$RED"
        exit 1
    fi
    
    echo ""
}

# 函数：配置SSL证书
configure_ssl() {
    print_msg "=== 配置SSL证书 ===" "$BLUE"
    
    if [ -z "$DOMAIN" ]; then
        print_msg "未指定域名，跳过SSL配置" "$YELLOW"
        return
    fi
    
    # 安装Certbot
    if ! check_command certbot; then
        apt-get update
        apt-get install -y certbot python3-certbot-nginx
    fi
    
    # 获取证书
    print_msg "获取Let's Encrypt证书..." "$YELLOW"
    certbot --nginx -d $DOMAIN -d www.$DOMAIN --non-interactive --agree-tos --email admin@$DOMAIN
    
    # 设置自动续期
    echo "0 2 * * * /usr/bin/certbot renew --quiet" | crontab -
    
    print_msg "SSL证书配置成功！" "$GREEN"
    echo ""
}

# 函数：显示部署结果
show_result() {
    print_msg "=== 部署完成 ===" "$GREEN"
    echo ""
    echo "项目信息："
    echo "  项目目录: $PROJECT_DIR"
    echo "  部署模式: $DEPLOY_MODE"
    
    if [ "$DEPLOY_MODE" = "server" ]; then
        echo "  本地访问: http://localhost:3000"
        if [ ! -z "$DOMAIN" ]; then
            echo "  域名访问: http://$DOMAIN"
            if [ "$CONFIGURE_SSL" = true ]; then
                echo "  HTTPS访问: https://$DOMAIN"
            fi
        fi
        echo ""
        echo "管理命令："
        echo "  查看状态: pm2 list"
        echo "  查看日志: pm2 logs webapp"
        echo "  重启服务: pm2 restart webapp"
        echo "  停止服务: pm2 stop webapp"
    else
        echo "  访问地址: https://webapp.pages.dev"
        echo ""
        echo "管理命令："
        echo "  查看项目: npx wrangler pages project list"
        echo "  查看部署: npx wrangler pages deployment list --project-name webapp"
    fi
    
    echo ""
    print_msg "部署日志已保存到: $LOG_FILE" "$BLUE"
}

# 主函数
main() {
    # 解析命令行参数
    while [[ $# -gt 0 ]]; do
        case $1 in
            -f|--file)
                TAR_FILE="$2"
                shift 2
                ;;
            -m|--mode)
                DEPLOY_MODE="$2"
                shift 2
                ;;
            -d|--domain)
                DOMAIN="$2"
                shift 2
                ;;
            -s|--ssl)
                CONFIGURE_SSL=true
                shift
                ;;
            -b|--backup)
                DO_BACKUP=true
                shift
                ;;
            -h|--help)
                show_help
                exit 0
                ;;
            *)
                echo "未知选项: $1"
                show_help
                exit 1
                ;;
        esac
    done
    
    # 检查tar文件
    if [ -z "$TAR_FILE" ]; then
        print_msg "错误: 请指定源码包文件 (-f webapp-backup.tar.gz)" "$RED"
        show_help
        exit 1
    fi
    
    if [ ! -f "$TAR_FILE" ]; then
        print_msg "错误: 文件不存在: $TAR_FILE" "$RED"
        exit 1
    fi
    
    # 创建日志目录
    mkdir -p $(dirname $LOG_FILE)
    
    # 开始部署
    print_msg "========================================" "$BLUE"
    print_msg "   Zenava WebApp 自动化部署" "$BLUE"
    print_msg "========================================" "$BLUE"
    echo ""
    
    # 执行部署步骤
    check_environment
    
    if [ "$DO_BACKUP" = true ]; then
        backup_project
    fi
    
    install_project
    
    if [ "$DEPLOY_MODE" = "cloudflare" ]; then
        deploy_cloudflare
    else
        deploy_server
        configure_nginx
        
        if [ "$CONFIGURE_SSL" = true ]; then
            configure_ssl
        fi
    fi
    
    show_result
}

# 执行主函数
main "$@"