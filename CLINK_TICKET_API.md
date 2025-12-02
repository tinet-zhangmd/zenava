# Clink 工单 API 集成说明

## 📋 概述

已集成 Clink 工单创建接口，当用户提交联系表单时，会自动在 Clink 系统中创建工单。

## 🔧 配置说明

### 环境变量（可选）

可以通过环境变量覆盖默认配置：

```bash
# .env 文件
CLINK_ACCESS_KEY_ID=your-access-key-id
CLINK_ACCESS_KEY_SECRET=your-access-key-secret
CLINK_EXPIRES=86400
CLINK_BASE_URL=https://api.clink.cn
```

### 默认配置

如果未设置环境变量，将使用以下默认值：

- **AccessKeyId**: `3c4c0da45ebe45396a0eed60d2c07e1c`
- **AccessKeySecret**: `218d09Phuc35kD0siJAn`
- **Expires**: `86400` (24小时)
- **BaseUrl**: `https://api.clink.cn`

## 📡 API 接口

### 创建工单

**接口路径**: `POST /api/ticket/create`

**请求参数**:

```json
{
  "firstName": "张",
  "lastName": "三",
  "jobTitle": "产品经理",
  "companyEmail": "zhangsan@example.com",
  "companyName": "示例公司",
  "industry": "technology",
  "source": "contact_page",
  "subject": "咨询产品信息",
  "description": "详细描述..."
}
```

**响应格式**:

```json
{
  "success": true,
  "message": "Ticket created successfully",
  "data": { ... },
  "ticketId": "12345"
}
```

## 🔐 签名认证

接口使用 HMAC-SHA256 签名算法进行认证：

1. **参数排序**: 将所有参数（除 Signature）按 key 排序
2. **构建待签名字符串**: `METHOD + PATH + SORTED_PARAMS`
3. **计算签名**: 使用 `AccessKeySecret` 对字符串进行 HMAC-SHA256 签名
4. **Base64 编码**: 将签名结果进行 Base64 编码

## 🔄 工作流程

1. 用户提交联系表单 (`/contact`)
2. 前端调用 `/api/contact` 接口
3. `/api/contact` 验证表单数据
4. `/api/contact` 调用 `/api/ticket/create` 创建工单
5. `/api/ticket/create` 调用 Clink API 创建工单
6. 返回成功响应给用户

## ⚠️ 注意事项

1. **API 路径**: 当前使用的路径是 `/api/ticket/create`，如果 Clink API 文档中的实际路径不同，需要修改 `src/api/ticket.tsx` 中的 `clinkPath` 变量

2. **参数格式**: 根据 Clink API 文档，可能需要调整：
   - 请求参数格式（查询字符串 vs 请求体）
   - 字段名称（subject, content, email 等）
   - 签名算法细节

3. **错误处理**: 
   - 如果 Clink API 调用失败，不会影响表单提交的成功响应
   - 错误会记录在服务器日志中

4. **环境兼容性**:
   - ✅ Node.js 环境：完全支持
   - ✅ Cloudflare Workers：完全支持（使用 Web Crypto API）

## 🧪 测试

### 测试工单创建接口

```bash
curl -X POST http://localhost:3000/api/ticket/create \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "测试",
    "lastName": "用户",
    "companyEmail": "test@example.com",
    "companyName": "测试公司",
    "industry": "technology"
  }'
```

### 测试联系表单

访问 `http://localhost:3000/contact`，填写表单并提交，检查：
1. 表单是否成功提交
2. Clink 系统中是否创建了工单
3. 服务器日志中是否有错误信息

## 📚 参考文档

- Clink API 文档: https://develop.clink.cn/develop/api/ticket.html
- 工单创建接口: https://develop.clink.cn/develop/api/ticket.html#%E5%B7%A5%E5%8D%95%E5%88%9B%E5%BB%BA%E6%8E%A5%E5%8F%A3
- 系统接入: https://develop.clink.cn/develop/api/ticket.html#_%E7%B3%BB%E7%BB%9F%E6%8E%A5%E5%85%A5

## 🔧 故障排查

### 问题1: 签名验证失败

**可能原因**:
- 签名算法实现不正确
- 参数排序或编码方式不对
- AccessKeySecret 错误

**解决方法**:
1. 检查 Clink API 文档中的签名算法说明
2. 对比签名生成的每一步
3. 验证 AccessKeySecret 是否正确

### 问题2: API 路径错误

**可能原因**:
- Clink API 的实际路径与代码中的不同

**解决方法**:
1. 查看 Clink API 文档确认正确的路径
2. 修改 `src/api/ticket.tsx` 中的 `clinkPath` 变量

### 问题3: 参数格式不匹配

**可能原因**:
- Clink API 要求的参数格式与代码中的不同

**解决方法**:
1. 查看 Clink API 文档中的参数说明
2. 调整 `clinkBodyParams` 中的字段名称和格式

