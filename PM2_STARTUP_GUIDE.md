# PM2 启动指南

## ⚠️ 重要说明
由于PM2在某些环境下无法正确解析 `ecosystem.config.cjs` 配置文件（会把配置文件本身当作应用启动），
我们推荐使用**直接命令方式**启动服务。

## 🚀 推荐启动方式

### 方式1：使用修复后的启动脚本
```bash
chmod +x pm2-start.sh
./pm2-start.sh
# 选择对应的模式
```

### 方式2：直接PM2命令（最可靠）

#### 简单模式（无D1数据库）
```bash
# 清理旧进程
pm2 delete all
fuser -k 3000/tcp

# 启动服务
pm2 start npx \
  --name zenava-webapp \
  --cwd $(pwd) \
  -- wrangler pages dev dist --ip 0.0.0.0 --port 3000
```

#### D1数据库模式
```bash
# 清理旧进程
pm2 delete all
fuser -k 3000/tcp

# 启动服务
pm2 start npx \
  --name zenava-webapp-d1 \
  --cwd $(pwd) \
  -- wrangler pages dev dist --d1=zenava-production --local --ip 0.0.0.0 --port 3000
```

### 方式3：使用简单启动脚本
```bash
chmod +x start-simple.sh
./start-simple.sh
```

### 方式4：NPM命令（开发模式）
```bash
npm run dev:sandbox
```

## 📝 PM2 常用命令

```bash
# 查看所有进程
pm2 list

# 查看日志
pm2 logs zenava-webapp          # 所有日志
pm2 logs zenava-webapp --err     # 仅错误日志
pm2 logs zenava-webapp -f        # 实时日志

# 进程管理
pm2 restart zenava-webapp        # 重启
pm2 stop zenava-webapp           # 停止
pm2 delete zenava-webapp         # 删除

# 监控
pm2 monit                        # 实时监控面板

# 保存配置
pm2 save                         # 保存当前进程列表
pm2 startup                      # 设置开机自启
```

## 🔧 故障排查

### 1. 端口被占用
```bash
# 查看3000端口占用
lsof -i:3000

# 强制释放端口
fuser -k 3000/tcp
```

### 2. 服务启动失败
```bash
# 查看详细错误
pm2 logs zenava-webapp --err --lines 100

# 直接运行测试
npx wrangler pages dev dist --ip 0.0.0.0 --port 3000
```

### 3. PM2进程名称错误
如果看到进程名是 `ecosystem.config.d1` 而不是 `zenava-webapp`：
- 这说明PM2错误地启动了配置文件
- 请使用直接命令方式启动（见上方）

## 🎯 最佳实践

1. **总是先清理旧进程**
   ```bash
   pm2 delete all
   fuser -k 3000/tcp
   ```

2. **使用明确的进程名称**
   ```bash
   pm2 start npx --name zenava-webapp ...
   ```

3. **指定工作目录**
   ```bash
   pm2 start npx --cwd $(pwd) ...
   ```

4. **配置日志输出**
   ```bash
   pm2 start npx \
     --error logs/error.log \
     --output logs/out.log \
     ...
   ```

5. **设置自动重启**
   ```bash
   pm2 start npx \
     --max-memory-restart 1G \
     --restart-delay 3000 \
     ...
   ```

## 📊 验证服务状态

```bash
# 1. 检查PM2进程
pm2 list
# 应该看到 zenava-webapp 或 zenava-webapp-d1

# 2. 测试HTTP响应
curl -I http://localhost:3000
# 应该返回 HTTP/1.1 200 OK

# 3. 查看页面内容
curl http://localhost:3000 | grep ZENAVA
# 应该看到ZENAVA品牌标识
```

## 💡 提示

- 如果 `ecosystem.config.cjs` 方式不工作，请始终使用直接命令方式
- 生产环境建议使用 `pm2 save` 和 `pm2 startup` 设置持久化
- 定期使用 `pm2 logs` 检查日志，及时发现问题

---

最后更新: 2025-01-04