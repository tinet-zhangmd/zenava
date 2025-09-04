# 🚀 Zenava WebApp 启动指南

## 快速启动（推荐）

### 方法1：使用启动脚本（最简单）
```bash
# 使用交互式启动脚本
./pm2-start.sh
# 选择 1 (标准模式)
```

### 方法2：使用npm命令
```bash
# 标准模式
npm run pm2:start

# D1数据库模式
npm run pm2:start:d1

# 开发模式（不使用PM2）
npm run dev:sandbox
```

### 方法3：直接PM2命令（最可靠）
```bash
# 清理端口
fuser -k 3000/tcp

# 标准模式
pm2 start npx --name zenava-webapp -- wrangler pages dev dist --ip 0.0.0.0 --port 3000

# D1数据库模式
pm2 start npx --name zenava-webapp-d1 -- wrangler pages dev dist --d1=zenava-production --local --ip 0.0.0.0 --port 3000
```

## ⚠️ 注意事项

### 配置文件问题
- **不要使用** `ecosystem.config.cjs` 或 `ecosystem.config.d1.cjs`
- 这些文件在某些环境下会导致PM2启动错误
- 已经重命名为 `.bak` 备份文件

### 正确的服务名称
- 标准模式：`zenava-webapp`
- D1模式：`zenava-webapp-d1`
- **不应该**出现 `ecosystem.config.d1` 这样的服务名

## 🔧 故障排查

### 问题1：服务名称显示为 ecosystem.config.d1
**原因**：PM2错误地将配置文件作为应用启动
**解决**：
```bash
# 删除错误的进程
pm2 delete all

# 使用直接命令启动
pm2 start npx --name zenava-webapp -- wrangler pages dev dist --ip 0.0.0.0 --port 3000
```

### 问题2：端口3000未启动
**检查**：
```bash
# 查看日志
pm2 logs zenava-webapp

# 检查端口
lsof -i:3000

# 清理端口并重启
fuser -k 3000/tcp
pm2 restart zenava-webapp
```

### 问题3：构建错误
```bash
# 重新构建
npm run build

# 检查dist目录
ls -la dist/
```

## 📊 服务管理

### 查看状态
```bash
pm2 list
```

### 查看日志
```bash
# 实时日志
pm2 logs zenava-webapp -f

# 最近100行
pm2 logs zenava-webapp --lines 100

# 错误日志
pm2 logs zenava-webapp --err
```

### 重启服务
```bash
pm2 restart zenava-webapp
```

### 停止服务
```bash
pm2 stop zenava-webapp
```

### 删除服务
```bash
pm2 delete zenava-webapp
```

## 🌍 环境差异

### 开发环境（E2B Sandbox）
```bash
# 已预装PM2，直接使用
pm2 start npx --name zenava-webapp -- wrangler pages dev dist --ip 0.0.0.0 --port 3000
```

### 生产环境（阿里云）
```bash
# 可能需要先安装PM2
npm install -g pm2

# 然后启动
./pm2-start.sh
```

## ✅ 验证服务

启动后验证：
```bash
# 检查进程
pm2 list
# 应显示：zenava-webapp 或 zenava-webapp-d1

# 测试访问
curl http://localhost:3000
# 应返回 HTTP 200

# 查看浏览器
# 访问 http://服务器IP:3000
```

---
最后更新：2025-01-04