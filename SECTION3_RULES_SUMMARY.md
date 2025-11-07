# 版块3修改规则总结

## 📅 创建时间
2025年11月6日

## 🎯 规则目标
为首页"版块3：核心能力与成效"建立标准化修改模板，支持左右交替布局，用户只需提供简体中文，AI自动生成四种语言版本。

---

## ✅ 新规则特点

### 1. 🎨 左右交替布局
- **第1项**: 左边文字 → 右边图片
- **第2项**: 右边文字 → 左边图片  
- **第3项**: 左边文字 → 右边图片
- **第4项**: 右边文字 → 左边图片
- 以此类推，奇数项左文右图，偶数项右文左图

### 2. 📍 每个子项包含
**文字区域：**
- 图标 (Font Awesome)
- 主标题
- 副标题
- 功能描述（1-2句话）
- 功能标签（3-5个）

**图片区域：**
- 图片路径（本地或 CDN）
- 图片描述（alt）
- 支持产品截图、数据可视化、使用场景等

### 3. 🌍 自动翻译机制
- 用户只需提供**简体中文**
- AI 自动生成 **English**
- AI 自动生成 **日本語**
- AI 自动生成 **繁體中文**

### 4. 📱 响应式设计
- 桌面端：左右布局，文字和图片各占 50%
- 移动端：上下堆叠，文字在上，图片在下
- 自动适配各种屏幕尺寸

---

## 🚀 如何使用

### 方式1：修改单个子项

```
修改版块3第1项：
- 图标：fas fa-robot
- 标题：市场营销自动化
- 副标题：提升转化率，降低获客成本
- 描述：实时识别客户意图，统一话术留资，智能分配高潜线索，基于会话分析反哺营销策略优化。
- 标签：意图识别、智能留资、多渠道整合、预测分析
- 图片：/images/marketing-automation.png
- 图片描述：市场营销自动化界面展示
```

### 方式2：添加新子项

```
添加版块3新项：
- 图标：fas fa-headset
- 标题：7x24智能客服
- 副标题：全天候响应，零等待
- 描述：AI智能客服系统实现全天候服务，自动处理常见问题，情感识别提升体验。
- 标签：智能应答、情感识别、多轮对话
- 图片：/images/customer-service.png
- 图片描述：智能客服对话界面
```

### 方式3：修改完整版块3

```
修改版块3完整内容，包含3个子项：

第1项：
- 标题：市场营销自动化
- 副标题：提升转化率，降低获客成本
- 描述：实时识别客户意图，统一话术留资，智能分配高潜线索。
- 标签：意图识别、智能留资、多渠道整合
- 图片：/images/marketing.png

第2项：
- 标题：智能销售赋能
- 副标题：缩短销售周期，提升成单率
- 描述：AI自动分析客户画像，提供精准销售建议，智能跟进提醒。
- 标签：客户画像、智能推荐、跟进提醒
- 图片：/images/sales.png

第3项：
- 标题：7x24智能客服
- 副标题：全天候响应，零等待
- 描述：AI智能客服系统实现全天候服务，自动处理常见问题。
- 标签：智能应答、情感识别、多轮对话
- 图片：/images/service.png
```

---

## 📊 数据结构

### TypeScript 类型定义

```typescript
interface CapabilityItem {
  id: string
  layout: 'text-left' | 'text-right'  // 自动判断奇偶数
  
  content: {
    icon: string  // Font Awesome 类名
    title: {
      zh: string
      en: string
      jp: string
      hk: string
    }
    subtitle: {
      zh: string
      en: string
      jp: string
      hk: string
    }
    description: {
      zh: string
      en: string
      jp: string
      hk: string
    }
    features: Array<{
      zh: string
      en: string
      jp: string
      hk: string
    }>
  }
  
  image: {
    src: string  // 图片路径
    alt: {
      zh: string
      en: string
      jp: string
      hk: string
    }
  }
}
```

---

## 🎨 可用资源

### Font Awesome 图标（常用）

| 图标类名 | 用途 | 示例场景 |
|---------|------|---------|
| `fas fa-robot` | AI/机器人 | 智能客服、AI助手 |
| `fas fa-bullhorn` | 营销 | 市场营销、广告 |
| `fas fa-chart-line` | 销售/增长 | 销售管理、数据分析 |
| `fas fa-headset` | 客服 | 客户服务、支持 |
| `fas fa-users-cog` | 内部服务 | 员工管理、HR |
| `fas fa-tasks` | 管理 | 任务管理、项目 |
| `fas fa-comments` | 对话 | 消息、聊天 |
| `fas fa-microphone` | 语音 | 语音通话、录音 |
| `fas fa-brain` | 智能 | AI、机器学习 |
| `fas fa-magic` | 自动化 | 自动化流程 |
| `fas fa-rocket` | 快速/增长 | 业务增长、加速 |

### 图片要求

| 要求 | 规格 |
|------|------|
| **格式** | PNG（透明背景）或 JPG |
| **尺寸** | 宽度 800-1200px，高度 600-800px |
| **长宽比** | 4:3 或 16:9 |
| **文件大小** | < 500KB（优化后）|
| **路径格式** | `/images/xxx.png` 或 `https://cdn.../xxx.png` |

### 内容长度建议

| 元素 | 简体中文 | 英文 |
|------|---------|------|
| **主标题** | 4-8个汉字 | 2-5 个单词 |
| **副标题** | 8-15个汉字 | 5-10 个单词 |
| **描述段落** | 30-50个汉字 | 20-40 个单词 |
| **功能标签** | 2-5个汉字/个 | 1-3 个单词/个 |
| **图片alt** | 10-20个汉字 | 5-15 个单词 |

---

## ✅ AI 自动处理流程

当用户提供简体中文后，AI会：

1. ✅ **接收简体中文输入**
2. 🤖 **自动生成英文翻译**（符合国际企业级标准，参考 Salesforce、HubSpot）
3. 🤖 **自动生成日文翻译**（使用敬语和商务用语，符合日本企业习惯）
4. 🤖 **自动生成繁体中文翻译**（使用港台商务用语，避免简体直译）
5. 📍 **自动判断布局方向**（奇数项左文右图，偶数项右文左图）
6. 📂 **打开对应文件**（`src/pages/HomepageDB.tsx` 或组件文件）
7. 📝 **更新或添加对应的子项数据**
8. 💾 **保存文件**，Vite 自动热重载

---

## 📱 响应式测试清单

修改版块3后，必须检查：

### 布局响应式
- ✅ 桌面端（>= 768px）：左右布局，文字和图片各占 50%
- ✅ 移动端（< 768px）：上下堆叠，文字在上，图片在下
- ✅ 第1、3、5项在桌面端为左文右图
- ✅ 第2、4、6项在桌面端为右文左图
- ✅ 所有项在移动端统一为文字在上

### 文字响应式
- ✅ 主标题：`text-2xl md:text-3xl lg:text-4xl`
- ✅ 副标题：`text-lg md:text-xl`
- ✅ 描述：`text-base md:text-lg`
- ✅ 功能标签自动换行，不溢出容器

### 图片响应式
- ✅ 移动端宽度 100%（`w-full`）
- ✅ 桌面端宽度 50%（`md:w-1/2`）
- ✅ 保持长宽比，不变形
- ✅ 圆角和阴影正常（`rounded-lg shadow-lg`）

### 多语言测试
- ✅ 简体中文：`http://localhost:5173`
- ✅ 英文：`http://localhost:5173/en`
- ✅ 日文：`http://localhost:5173/jp`
- ✅ 繁体中文：`http://localhost:5173/hk`

---

## ⚠️ 注意事项

### ✅ 必须遵守
1. **四语同步**: 所有文字内容必须包含 zh、en、jp、hk 四个语言版本
2. **自动翻译**: 用户只提供简体中文，AI 自动生成其他三种语言
3. **保持格式**: 不要修改 JSX 结构、CSS 类名
4. **品牌名称**: "Zenava" 不翻译，保持统一
5. **响应式**: 确保移动端正常显示
6. **布局交替**: 自动判断奇偶数，设置正确的布局方向

### ❌ 禁止操作
1. ❌ 不要修改组件结构（div、section 等）
2. ❌ 不要删除响应式类名（md:、lg: 等）
3. ❌ 不要手动设置布局方向（由奇偶数自动判断）
4. ❌ 不要修改图片容器的响应式样式
5. ❌ 不要破坏左右交替的规则

---

## 🎯 完整示例

### 用户输入（简体中文）

```
修改版块3完整内容，包含4个子项：

第1项：
- 标题：市场营销自动化
- 副标题：提升转化率，降低获客成本
- 描述：实时识别客户意图，统一话术留资，智能分配高潜线索，基于会话分析反哺营销策略优化。
- 标签：意图识别、智能留资、多渠道整合、预测分析
- 图片：/images/marketing-automation.png

第2项：
- 标题：智能销售赋能
- 副标题：缩短销售周期，提升成单率
- 描述：AI自动分析客户画像，提供精准销售建议，智能跟进提醒，帮助销售团队聚焦高价值客户。
- 标签：客户画像、智能推荐、跟进提醒、销售预测
- 图片：/images/sales-enablement.png

第3项：
- 标题：7x24智能客服
- 副标题：全天候响应，零等待
- 描述：AI智能客服系统实现全天候服务，自动处理常见问题，情感识别提升体验，工单自动分配。
- 标签：智能应答、情感识别、多轮对话、自动工单
- 图片：/images/customer-service.png

第4项：
- 标题：内部服务中台
- 副标题：提升员工效率，降低运营成本
- 描述：统一内部服务入口，AI自动回答员工问题，智能分配工单，数据分析优化流程。
- 标签：知识库、智能分配、流程优化、数据分析
- 图片：/images/internal-service.png
```

### AI 自动生成结果

```typescript
const capabilitiesItems = [
  // 第1项：左文右图
  {
    id: 'item-1',
    layout: 'text-left',
    content: {
      icon: 'fas fa-bullhorn',
      title: {
        zh: '市场营销自动化',
        en: 'Marketing Automation',
        jp: 'マーケティングオートメーション',
        hk: '市場營銷自動化'
      },
      subtitle: {
        zh: '提升转化率，降低获客成本',
        en: 'Boost Conversion Rate, Reduce Customer Acquisition Cost',
        jp: 'コンバージョン率向上、顧客獲得コスト削減',
        hk: '提升轉化率，降低獲客成本'
      },
      description: {
        zh: '实时识别客户意图，统一话术留资，智能分配高潜线索，基于会话分析反哺营销策略优化。',
        en: 'Real-time intent recognition, unified messaging for lead capture, intelligent allocation of high-potential leads, and marketing strategy optimization based on conversation analysis.',
        jp: 'リアルタイムでの顧客意図認識、統一されたメッセージングによるリード獲得、高ポテンシャルリードのインテリジェント配分、会話分析に基づくマーケティング戦略最適化。',
        hk: '實時識別客戶意圖，統一話術留資，智能分配高潛線索，基於對話分析反哺營銷策略優化。'
      },
      features: [
        { zh: '意图识别', en: 'Intent Recognition', jp: '意図認識', hk: '意圖識別' },
        { zh: '智能留资', en: 'Smart Lead Capture', jp: 'スマートリード獲得', hk: '智能留資' },
        { zh: '多渠道整合', en: 'Multi-channel Integration', jp: 'マルチチャネル統合', hk: '多渠道整合' },
        { zh: '预测分析', en: 'Predictive Analytics', jp: '予測分析', hk: '預測分析' }
      ]
    },
    image: {
      src: '/images/marketing-automation.png',
      alt: {
        zh: '市场营销自动化界面展示',
        en: 'Marketing automation interface display',
        jp: 'マーケティングオートメーションインターフェース表示',
        hk: '市場營銷自動化界面展示'
      }
    }
  },
  
  // 第2项：右文左图
  {
    id: 'item-2',
    layout: 'text-right',
    // ... 类似结构，AI自动生成四种语言
  },
  
  // 第3项：左文右图
  // 第4项：右文左图
  // ...
]
```

---

## 📂 相关文件

- **规则文件**: `.cursor/rules/config.mdc` (第617-1031行)
- **页面文件**: `src/pages/HomepageDB.tsx` 或 `src/components/CapabilitiesSection.tsx`
- **类型定义**: 待创建或在页面文件中定义
- **图片目录**: `public/images/` 或使用 CDN

---

## 🚀 下一步

1. ✅ 规则已建立完成
2. ⏳ 需要在实际页面文件中实现这个数据结构
3. ⏳ 需要创建对应的组件渲染这些数据
4. ⏳ 需要准备图片资源（产品截图、数据可视化等）

---

## 📞 支持

如有疑问，请联系开发团队：marketing@zenava.ai

---

**最后更新**: 2025年11月6日  
**版本**: v1.0  
**状态**: ✅ 已完成

