# 全站多语言改进计划

## 当前问题分析

### 1. 硬编码文本位置
- **首页 HomepageDB.tsx**
  - AI对话模拟中的中文文本（第126-145行）
  - 输入框placeholder文本（第152行）
  - 统计数据标签（第60-66行）

### 2. 需要翻译的内容区域

#### A. 首页 (HomepageDB.tsx)
```javascript
// 需要替换的硬编码文本：
- "您好，我的订单 #A12345 想查询一下物流" 
- "正在識別問題..."
- "為您定位訂單資訊中..."
- "已找到訂單，包裹已出庫，預計 24 小時內送達。需要我發送追蹤連結嗎？"
- "好的，謝謝！請發我追蹤連結"
- "輸入訊息..."
```

#### B. 业务价值模块
- 六个业务场景的标题和描述
- 统计数据和指标

#### C. 导航栏下拉菜单
- 场景描述文本
- 功能说明

#### D. 页脚
- 公司描述
- 链接文本
- 版权信息

## 改进方案

### 第一步：扩展翻译文件
在 `src/i18n/translations.ts` 中添加缺失的翻译：

```typescript
// AI对话模拟翻译
aiSimulation: {
  en: {
    customerQuery: "Hello, I'd like to track my order #A12345",
    aiProcessing: "Identifying issue...",
    aiLocating: "Locating your order information...",
    aiResponse: "Order found. Package shipped, arriving within 24 hours. Need tracking link?",
    customerReply: "Yes, please send me the tracking link 👍",
    inputPlaceholder: "Type your message..."
  },
  jp: {
    customerQuery: "こんにちは、注文番号 #A12345 の配送状況を確認したいです",
    aiProcessing: "問題を識別中...",
    aiLocating: "ご注文情報を確認中...",
    aiResponse: "ご注文を確認しました。商品は発送済みで、24時間以内にお届け予定です。追跡リンクをお送りしますか？",
    customerReply: "はい、追跡リンクをお願いします 👍",
    inputPlaceholder: "メッセージを入力..."
  },
  hk: {
    customerQuery: "您好，我的訂單 #A12345 想查詢一下物流",
    aiProcessing: "正在識別問題...",
    aiLocating: "為您定位訂單資訊中...",
    aiResponse: "已找到訂單，包裹已出庫，預計 24 小時內送達。需要我發送追蹤連結嗎？",
    customerReply: "好的，謝謝！請發我追蹤連結 👍",
    inputPlaceholder: "輸入訊息..."
  }
}
```

### 第二步：修改组件使用翻译

#### HomepageDB.tsx 修改示例：
```typescript
// 替换硬编码文本
<p class="text-sm">{trans.aiSimulation.customerQuery}</p>
<span class="text-xs text-[#0DE0EF]">{trans.aiSimulation.aiProcessing}</span>
<input placeholder={trans.aiSimulation.inputPlaceholder} />
```

### 第三步：业务价值卡片多语言
```typescript
// 使用translations中的scenarios数据
const businessValueCards = [
  {
    title: trans.scenarios.marketing.title,
    subtitle: trans.scenarios.marketing.subtitle,
    description: trans.scenarios.marketing.description,
    features: trans.scenarios.marketing.features
  },
  // ... 其他场景
]
```

### 第四步：统计数据多语言
```typescript
const stats = [
  { number: '10M+', label: trans.stats.conversations },
  { number: '99.9%', label: trans.stats.uptime },
  { number: '5000+', label: trans.stats.enterprises },
  { number: '4.9/5', label: trans.stats.satisfaction }
]
```

## 实施优先级

### 高优先级（立即修复）
1. ✅ 首页AI对话模拟文本
2. ✅ 业务价值模块标题和描述
3. ✅ 导航栏场景描述
4. ✅ 联系表单字段标签

### 中优先级
1. ⏳ 统计数据标签
2. ⏳ 按钮文本（CTA）
3. ⏳ 错误消息和提示

### 低优先级
1. ⏳ Meta标签和SEO内容
2. ⏳ 管理后台界面
3. ⏳ 辅助说明文本

## 测试检查清单

### 英文版本检查
- [ ] 首页所有文本显示英文
- [ ] 导航菜单显示英文
- [ ] 业务场景卡片显示英文
- [ ] 页脚链接显示英文

### 日文版本检查
- [ ] 首页所有文本显示日文
- [ ] 敬语使用正确
- [ ] 专业术语准确
- [ ] 格式符合日本商务习惯

### 繁体中文版本检查
- [ ] 首页所有文本显示繁体中文
- [ ] 香港商务用语准确
- [ ] 术语本地化合适
- [ ] 格式符合香港习惯

## 代码规范

### 1. 永远不要硬编码文本
```typescript
// ❌ 错误
<h1>企业客户对话场景的AI代理</h1>

// ✅ 正确
<h1>{trans.company.tagline}</h1>
```

### 2. 使用翻译helper函数
```typescript
// 获取嵌套翻译
const title = t(language, 'scenarios.marketing.title')
```

### 3. 保持翻译文件结构清晰
- 按功能模块组织
- 使用描述性的key名称
- 保持三种语言结构一致

## 验证方法

1. **URL测试**
   - `/` - 英文版本
   - `/jp` - 日文版本
   - `/hk` - 繁体中文版本

2. **浏览器语言检测**
   - 设置浏览器语言为英文/日文/中文
   - 验证自动跳转是否正确

3. **内容完整性**
   - 检查是否有遗漏的硬编码文本
   - 验证所有动态内容都有对应翻译

## 下一步行动

1. 立即修复首页硬编码的中文文本
2. 确保所有业务场景使用翻译文件
3. 验证三种语言版本的完整性
4. 进行跨语言测试