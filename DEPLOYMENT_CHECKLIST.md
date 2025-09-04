# 🚀 Zenava WebApp 部署检查清单

## 📋 部署前检查

### 1. 服务器准备
- [ ] 阿里云ECS实例已创建（推荐：2核4G，Ubuntu 22.04）
- [ ] 安全组已配置（开放端口：22, 80, 443, 3000）
- [ ] SSH可以正常连接
- [ ] 域名已备案（如需域名访问）

### 2. 本地准备
- [ ] 源码包已生成：`webapp-backup-*.tar.gz`
- [ ] 记录Cloudflare API Token（如使用Cloudflare部署）
- [ ] 准备好域名DNS配置信息

---

## 🔧 快速部署命令

### 选项1：Cloudflare Pages部署（推荐）
```bash
# 1. 上传源码包到服务器
scp webapp-backup-*.tar.gz root@<服务器IP>:/root/

# 2. SSH连接到服务器
ssh root@<服务器IP>

# 3. 设置Cloudflare Token
export CLOUDFLARE_API_TOKEN="your_token_here"

# 4. 执行自动部署
chmod +x aliyun-deploy.sh
./aliyun-deploy.sh -f webapp-backup-*.tar.gz -m cloudflare

# 5. 访问部署后的URL
https://webapp.pages.dev
```

### 选项2：服务器本地部署
```bash
# 1. 上传源码包到服务器
scp webapp-backup-*.tar.gz root@<服务器IP>:/root/

# 2. SSH连接到服务器
ssh root@<服务器IP>

# 3. 执行自动部署（带域名和SSL）
chmod +x aliyun-deploy.sh
./aliyun-deploy.sh -f webapp-backup-*.tar.gz -m server -d your-domain.com -s -b

# 4. 访问部署后的URL
https://your-domain.com
```

---

## ✅ 部署后验证

### 1. 服务状态检查
```bash
# PM2进程状态
pm2 list

# 查看服务日志
pm2 logs webapp --lines 50

# 测试本地访问
curl http://localhost:3000

# 检查Nginx状态（如配置了Nginx）
systemctl status nginx
```

### 2. 功能验证清单
- [ ] 首页正常加载
- [ ] 导航菜单功能正常
- [ ] 语言切换功能正常
- [ ] 各场景页面可访问
- [ ] 联系表单功能正常
- [ ] Cookie同意弹窗正常
- [ ] 响应式布局正常（移动端/桌面端）

### 3. 性能检查
- [ ] 页面加载时间 < 3秒
- [ ] 静态资源已压缩（Gzip）
- [ ] 图片资源已优化
- [ ] HTTPS证书有效（如配置SSL）

---

## 🔧 常用运维命令

### PM2管理
```bash
pm2 restart webapp      # 重启服务
pm2 stop webapp        # 停止服务
pm2 delete webapp      # 删除服务
pm2 logs webapp        # 查看日志
pm2 monit             # 实时监控
```

### 更新部署
```bash
# 1. 备份现有项目
cd /home/user/webapp
tar -czf ~/webapp_backup_$(date +%Y%m%d).tar.gz .

# 2. 上传新版本
scp webapp-new.tar.gz root@<服务器IP>:/root/

# 3. 执行更新部署
./aliyun-deploy.sh -f webapp-new.tar.gz -m server -b
```

### 日志查看
```bash
# PM2日志
tail -f ~/.pm2/logs/webapp-out.log
tail -f ~/.pm2/logs/webapp-error.log

# Nginx日志
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log

# 部署日志
cat /var/log/webapp-deploy.log
```

### 数据库操作（D1）
```bash
# 查看数据库信息
npx wrangler d1 info webapp-production

# 执行SQL查询
npx wrangler d1 execute webapp-production --command="SELECT * FROM users"

# 应用新迁移
npx wrangler d1 migrations apply webapp-production
```

---

## ⚠️ 故障排查指南

### 问题1：服务无法启动
```bash
# 检查端口占用
lsof -i:3000
kill -9 <PID>

# 重新构建
cd /home/user/webapp
rm -rf node_modules dist
npm install
npm run build
pm2 restart webapp
```

### 问题2：502 Bad Gateway
```bash
# 检查后端服务
curl http://127.0.0.1:3000

# 检查PM2状态
pm2 list

# 重启服务链
pm2 restart webapp
systemctl restart nginx
```

### 问题3：数据库连接失败
```bash
# 检查D1配置
cat wrangler.jsonc | grep database_id

# 重新创建数据库
npx wrangler d1 create webapp-production

# 更新配置并重新部署
vim wrangler.jsonc  # 更新database_id
npm run build
pm2 restart webapp
```

### 问题4：SSL证书问题
```bash
# 测试证书
certbot certificates

# 手动续期
certbot renew

# 强制续期
certbot renew --force-renewal
```

---

## 📞 技术支持

遇到问题时，请收集以下信息：

1. **错误日志**
```bash
pm2 logs webapp --err --lines 200 > error.log
```

2. **系统信息**
```bash
echo "=== 系统信息 ===" > system-info.txt
uname -a >> system-info.txt
node -v >> system-info.txt
npm -v >> system-info.txt
pm2 -v >> system-info.txt
```

3. **配置文件**
- `wrangler.jsonc`
- `ecosystem.config.cjs`
- `.env`（注意隐藏敏感信息）

---

## 📊 监控建议

### 1. 设置监控告警
- 使用阿里云云监控
- 配置CPU/内存/带宽告警
- 设置服务健康检查

### 2. 定期备份
```bash
# 每日自动备份脚本
0 2 * * * /root/backup.sh
```

### 3. 安全更新
```bash
# 每周检查更新
apt update && apt upgrade -y
npm audit fix
```

---

最后更新：2025-01-03