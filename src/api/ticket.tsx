/**
 * Clink 工单 API
 * 用于创建工单，调用 Clink 外部接口
 */

import { Hono } from 'hono'
import { cors } from 'hono/cors'

// 兼容 Node.js 和 Cloudflare Workers 环境
// 在 Node.js 中使用 Node.js crypto 模块
// 在 Cloudflare Workers 中使用全局 crypto (Web Crypto API)

// 获取 Node.js crypto 模块的函数（异步）
async function getNodeCrypto() {
  if (typeof process !== 'undefined' && process.versions?.node) {
    try {
      // 使用动态 import 导入 Node.js crypto 模块（ES 模块方式）
      const cryptoModule = await import('node:crypto')
      return cryptoModule.default || cryptoModule
    } catch (e) {
      // 如果 node: 前缀失败，尝试不带前缀
      try {
        const cryptoModule = await import('crypto')
        return cryptoModule.default || cryptoModule
      } catch (e2) {
        // 如果都失败，返回 null，将使用 Web Crypto API
        return null
      }
    }
  }
  return null
}

const ticketApi = new Hono()

// Enable CORS
ticketApi.use('/*', cors())

// Clink API 配置
// 支持环境变量配置，默认使用提供的凭证
const getEnvVar = (key: string, defaultValue: string): string => {
  if (typeof process !== 'undefined' && process.env) {
    return process.env[key] || defaultValue
  }
  // Cloudflare Workers 环境可以通过 c.env 获取
  return defaultValue
}

const CLINK_CONFIG = {
  accessKeyId: getEnvVar('CLINK_ACCESS_KEY_ID', '3c4c0da45ebe45396a0eed60d2c07e1c'),
  accessKeySecret: getEnvVar('CLINK_ACCESS_KEY_SECRET', '218d09Phuc35kD0siJAn'),
  expires: getEnvVar('CLINK_EXPIRES', '86400'), // 字符串格式，24小时
  baseUrl: getEnvVar('CLINK_BASE_URL', 'https://api-bj.clink.cn'),
  // 从 baseUrl 提取 host（去掉协议）
  get host() {
    const url = new URL(this.baseUrl)
    return url.host // 例如: api-bj.clink.cn
  }
}

/**
 * 生成 Clink API 签名（HMAC-SHA1）
 * 根据 Clink API 文档实现签名算法
 * 参考: https://develop.clink.cn/develop/api/ticket.html#_%E7%B3%BB%E7%BB%9F%E6%8E%A5%E5%85%A5
 * 
 * 签名格式: METHOD + HOST + PATH + "?" + SORTED_PARAMS
 * 算法: HMAC-SHA1
 */
async function generateSignature(
  method: string,
  host: string,
  path: string,
  params: Record<string, any>,
  accessKeySecret: string
): Promise<string> {
  // 1. 将参数按 key 排序（排除 Signature 本身）
  const sortedParams = Object.keys(params)
    .filter(key => key !== 'Signature')
    .sort()
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(String(params[key]))}`)
    .join('&')

  // 2. 构建待签名字符串：METHOD + HOST + PATH + "?" + SORTED_PARAMS
  const stringToSign = `${method}${host}${path}?${sortedParams}`
  
  // 调试日志
  console.log('Signature Debug:', {
    method,
    host,
    path,
    sortedParams,
    stringToSign
  })

  // 3. 使用 HMAC-SHA1 计算签名（注意：Clink API 使用 SHA1，不是 SHA256）
  if (typeof process !== 'undefined' && process.versions?.node) {
    // Node.js 环境 - 使用 Node.js crypto 模块
    const nodeCrypto = await getNodeCrypto()
    if (nodeCrypto) {
      const signature = nodeCrypto
        .createHmac('sha1', accessKeySecret) // 使用 SHA1
        .update(stringToSign, 'utf8')
        .digest('base64')
      // 签名需要 URL 编码
      return encodeURIComponent(signature)
    }
    // 如果无法加载 crypto 模块，fallback 到 Web Crypto API
  }
  
  // Cloudflare Workers 环境或 Node.js crypto 加载失败时使用 Web Crypto API
  {
    // Cloudflare Workers 环境（使用 Web Crypto API）
    const encoder = new TextEncoder()
    const keyData = encoder.encode(accessKeySecret)
    const dataBytes = encoder.encode(stringToSign)
    
    // @ts-ignore - Cloudflare Workers 环境
    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: 'SHA-1' }, // 使用 SHA-1
      false,
      ['sign']
    )
    // @ts-ignore - Cloudflare Workers 环境
    const signature = await crypto.subtle.sign('HMAC', cryptoKey, dataBytes)
    // @ts-ignore - btoa 在 Workers 环境中可用
    const base64 = btoa(String.fromCharCode(...new Uint8Array(signature)))
    // 签名需要 URL 编码
    return encodeURIComponent(base64)
  }
}

/**
 * 将日期转换为 Clink API 要求的格式: yyyy-MM-ddTHH:mm:ssZ
 * 注意：需要考虑时区偏移（示例代码中使用了 getTimezoneOffset）
 */
function formatClinkTimestamp(date: Date = new Date()): string {
  // 根据示例代码，需要调整时区
  const adjustedDate = new Date(
    date.getTime() + date.getTimezoneOffset() * 60 * 1000
  )
  const year = adjustedDate.getUTCFullYear()
  const month = String(adjustedDate.getUTCMonth() + 1).padStart(2, '0')
  const day = String(adjustedDate.getUTCDate()).padStart(2, '0')
  const hours = String(adjustedDate.getUTCHours()).padStart(2, '0')
  const minutes = String(adjustedDate.getUTCMinutes()).padStart(2, '0')
  const seconds = String(adjustedDate.getUTCSeconds()).padStart(2, '0')
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`
}

/**
 * 创建 Clink API 请求参数（包含签名）
 * 注意：签名只包含认证参数（AccessKeyId, Expires, Timestamp），不包含业务参数
 */
async function buildClinkRequestParams(
  method: string,
  path: string,
  bodyParams: Record<string, any>
): Promise<Record<string, any>> {
  // Clink API 要求使用 ISO 8601 格式: yyyy-MM-ddTHH:mm:ssZ
  const timestamp = formatClinkTimestamp()
  const expires = CLINK_CONFIG.expires // 字符串格式

  // 构建认证参数（只对认证参数进行签名）
  const authParams: Record<string, any> = {
    AccessKeyId: CLINK_CONFIG.accessKeyId,
    Expires: expires,
    Timestamp: timestamp
  }

  // 生成签名（只对认证参数签名）
  // 签名格式: METHOD + HOST + PATH + "?" + SORTED_PARAMS
  const signature = await generateSignature(
    method,
    CLINK_CONFIG.host,
    path,
    authParams,
    CLINK_CONFIG.accessKeySecret
  )
  
  // 返回包含签名的认证参数
  return {
    ...authParams,
    Signature: signature
  }
}

/**
 * 创建工单接口
 * POST /api/ticket/create
 */
ticketApi.post('/create', async (c) => {
  try {
    const body = await c.req.json()
    const {
      name: customerName,
      jobTitle,
      companyEmail,
      companyName,
      industry,
      companySize,
      source,
      file,
      description,
      subject
    } = body

    // 验证必填字段
    // 必填项：姓名（customerName）、企业邮箱（companyEmail）、公司名称（companyName）
    if (!customerName || !companyEmail || !companyName) {
      return c.json({
        success: false,
        message: 'Missing required fields: name, companyEmail, companyName'
      }, 400)
    }

    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(companyEmail)) {
      return c.json({
        success: false,
        message: 'Invalid email format'
      }, 400)
    }

    // 构建 Clink API 请求参数
    // 根据 Clink API 文档: https://develop.clink.cn/develop/api/ticket.html#%E5%B7%A5%E5%8D%95%E5%88%9B%E5%BB%BA%E6%8E%A5%E5%8F%A3
    const clinkPath = '/ticket/save_ticket' // Clink API 工单创建接口路径
    
    // 构建表单数据（根据 ApiFox 测试成功的格式）
    // 注意：model 参数的值是 JSON 字符串
    
    // 行业映射：将英文值转换为中文
    const industryMap: Record<string, string> = {
      'technology': '科技',
      'finance': '金融',
      'healthcare': '医疗',
      'retail': '零售',
      'manufacturing': '制造',
      'education': '教育',
      'other': '其他'
    }
    const industryValue = industry ? (industryMap[industry] || industry) : ''
    
    const formData = {
        "form": {
            "id": 37675,
            "name": "ZENAVA官网自动注册表单",
            "fields": [
              {
                "id": 226845,
                "type": 1,
                "name": "姓名",
                "required":1,
                "value": customerName,
              },
              {
                "id":127286,
                "required":1,
                "type": 5,
                "name": "客户所属行业",
                "value": jobTitle || "",
              },
              {
                "id": 234530,
                "required":1,
                "type": 3,
                "name": "客户邮箱",
                "value": companyEmail,
              },
              {
                "id": 191886,
                "required":1,
                "type": 1,
                "name": "公司名称",
                "value": companyName || "",
               
              },
              {
                "id": 331263,
                "required":0,
                "type": 6,
                "name": "公司规模",
                "value": companySize || "0-49",
              
              },
              {
                "id": 331260,
                "required":0,
                "type": 6,
                "name": "行业分类",
                "value": industryValue,
              }
            ]
        },
        "workflowId": 15710,
        "tags":[{name:'zenava注册',color: 3}]
    }
    
    // 将表单数据转换为 JSON 字符串（作为 model 参数的值）
    const modelValue = JSON.stringify(formData)

    // 生成签名并构建完整请求参数（注意：签名只包含认证参数，不包含 model）
    const requestParams = await buildClinkRequestParams('POST', clinkPath, {})

    // 调用 Clink API
    // 根据 Clink API 文档，签名参数放在查询字符串中，业务参数放在请求体中
    const clinkUrl = `${CLINK_CONFIG.baseUrl}${clinkPath}`
    
    // 将签名相关参数转换为查询字符串（参数值需要 URL 编码）
    const authParams = {
      AccessKeyId: requestParams.AccessKeyId,
      Expires: requestParams.Expires,
      Timestamp: requestParams.Timestamp,
      Signature: requestParams.Signature
    }
    
    const queryString = Object.keys(authParams)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(String(authParams[key as keyof typeof authParams]))}`)
      .join('&')
    
    // 构建 form-data 格式的 body
    // 根据 ApiFox 测试成功的格式，使用 multipart/form-data
    // Node.js 18+ 和 Cloudflare Workers 都支持 FormData
    const formDataObj = new FormData()
    formDataObj.append('model', modelValue)
    
    console.log('Clink API Request:', {
      url: `${clinkUrl}?${queryString}`,
      method: 'POST',
      bodyType: 'multipart/form-data',
      modelValue: modelValue.substring(0, 200) + '...' // 只显示前200字符
    })
    
    // 调用 Clink API（签名参数在 URL，业务参数在 Body 中使用 form-data）
    const response = await fetch(`${clinkUrl}?${queryString}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json'
        // 注意：使用 FormData 时，不要手动设置 Content-Type
        // fetch API 会自动设置 Content-Type: multipart/form-data; boundary=...
      },
      body: formDataObj
    })
    
    const responseData = await response.json()
    
    if (!response.ok) {
      console.error('Clink API Error:', responseData)
      return c.json({
        success: false,
        message: responseData.message || 'Failed to create ticket',
        error: responseData
      }, response.status || 500)
    }

    // 返回成功响应
    return c.json({
      success: true,
      message: 'Ticket created successfully',
      data: responseData,
      ticketId: responseData.id || responseData.ticket_id || null
    })

  } catch (error: any) {
    console.error('Ticket creation error:', error)
    return c.json({
      success: false,
      message: 'Internal server error',
      error: error.message
    }, 500)
  }
})

export default ticketApi

