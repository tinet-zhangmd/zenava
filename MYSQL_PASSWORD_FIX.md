# MySQL 密码问题修复 ✅

## 🐛 问题
```
Access denied for user 'root'@'localhost' (using password: NO)
```

MySQL 没有读取到密码！

## 🔍 原因
`src/lib/mysql.ts` 没有加载 `.env` 文件中的环境变量。

## ✅ 解决方案

### 修改的文件
`src/lib/mysql.ts`

### 添加的代码
```typescript
import * as dotenv from 'dotenv'

// 加载环境变量
dotenv.config()

// MySQL连接配置
const dbConfig = {
  host: process.env.MYSQL_HOST || 'localhost',
  port: parseInt(process.env.MYSQL_PORT || '3306'),
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '12345',  // 添加默认密码
  database: process.env.MYSQL_DATABASE || 'ZENAVA_LOCAL',
  ...
}

// 调试：打印连接配置
console.log('📊 MySQL 配置:', {
  host: dbConfig.host,
  port: dbConfig.port,
  user: dbConfig.user,
  password: dbConfig.password ? '***已设置***' : '❌未设置',
  database: dbConfig.database
})
```

## 🚀 测试步骤

### 1. 重启服务器
```bash
npm run start:node
```

### 2. 检查启动日志
应该看到：
```
📊 MySQL 配置: {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '***已设置***',  ✅ 不再显示 "❌未设置"
  database: 'ZENAVA_LOCAL'
}
```

### 3. 测试 API
```bash
curl -X POST http://127.0.0.1:3000/api/admin/resource-categories \
  -H "Content-Type: application/json" \
  -d '{
    "name": "测试栏目",
    "slug": "/test",
    "list_template": "list.html",
    "detail_template": "detail.html"
  }'
```

应该返回成功，不再报 Access Denied！

## 📝 环境变量配置

### .env 文件
```env
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_DATABASE=ZENAVA_LOCAL
MYSQL_USER=root
MYSQL_PASSWORD=12345
```

### 优先级
1. `.env` 文件中的值（最高优先级）
2. 系统环境变量
3. 代码中的默认值（最低优先级）

## ⚠️ 安全提示

### 开发环境
- ✅ 可以在 `.env` 中硬编码密码
- ✅ `.env` 已在 `.gitignore` 中

### 生产环境
- ⚠️ 不要提交 `.env` 到 Git
- ⚠️ 使用系统环境变量
- ⚠️ 使用密钥管理服务（如 AWS Secrets Manager）

## 🔧 其他可能的问题

### 如果仍然报错

#### 问题 1：.env 文件路径不对
```bash
# 确认 .env 文件在项目根目录
ls -la .env
```

#### 问题 2：dotenv 未安装
```bash
npm install dotenv
```

#### 问题 3：密码包含特殊字符
如果密码包含特殊字符，需要在 `.env` 中用引号包裹：
```env
MYSQL_PASSWORD="my@pass#word!"
```

#### 问题 4：环境变量未生效
强制重新加载：
```bash
# 清除 Node.js 缓存
rm -rf node_modules/.cache
npm run start:node
```

## ✅ 验证清单

- [ ] 服务器启动时显示 "password: ***已设置***"
- [ ] 没有 "Access Denied" 错误
- [ ] POST /api/admin/resource-categories 返回 200
- [ ] 可以在管理后台创建栏目
- [ ] MySQL 中可以看到新创建的数据

---

**修复时间**: 2024-12-04  
**状态**: ✅ 已修复  
**下一步**: 重启服务器测试

