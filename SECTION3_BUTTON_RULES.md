# 版块3按钮规则补充说明

## 📋 规则概述

**日期**: 2025年11月6日  
**状态**: ✅ 已添加到规则文档  
**文件**: `.cursor/rules/config.mdc`

---

## 🔘 按钮要求

### 核心要求
- **位置**: 每个版块3子项的文字区域下方（标签列表之后）
- **必需性**: 每个子项都必须包含按钮
- **样式**: 橙色圆角边框按钮（参考用户提供的截图红框）
- **多语言**: 按钮文字支持四种语言（zh、en、jp、hk）
- **链接**: 由用户输入提供

---

## 🎨 按钮样式规范

### Tailwind CSS 类名
```typescript
class="inline-flex items-center px-6 py-3 border-2 border-orange-500 text-orange-500 font-semibold rounded-full hover:bg-orange-500 hover:text-white transition-all duration-300"
```

### 样式详细说明

| 属性 | 类名 | 说明 |
|------|------|------|
| 布局 | `inline-flex items-center` | 行内弹性布局，内容垂直居中 |
| 内边距 | `px-6 py-3` | 左右24px，上下12px |
| 边框 | `border-2 border-orange-500` | 2px橙色边框 |
| 文字颜色 | `text-orange-500` | 橙色文字 |
| 字体粗细 | `font-semibold` | 加粗 |
| 圆角 | `rounded-full` | 完全圆角（胶囊形状） |
| 悬停背景 | `hover:bg-orange-500` | 鼠标悬停时橙色背景 |
| 悬停文字 | `hover:text-white` | 鼠标悬停时白色文字 |
| 过渡动画 | `transition-all duration-300` | 300ms平滑过渡 |

### 视觉效果

#### 默认状态
```
┌─────────────────────────┐
│  了解更多市场营销 ➜    │  ← 橙色边框 + 橙色文字
└─────────────────────────┘
```

#### 悬停状态
```
┌─────────────────────────┐
│  了解更多市场营销 ➜    │  ← 橙色背景 + 白色文字
└─────────────────────────┘
```

---

## 📝 按钮文案规范

### 文案格式

**简体中文格式**:
```
了解更多【主题名称】
```

**英文格式**:
```
Learn More About 【Topic】
```

**日文格式**:
```
【主题名称】の詳細
```

**繁体中文格式**:
```
了解更多【主題名稱】
```

### 常用按钮文案示例

| 主题 | zh (简体中文) | en (英文) | jp (日文) | hk (繁体中文) |
|------|--------------|----------|----------|--------------|
| 市场营销 | 了解更多市场营销 | Learn More About Marketing | マーケティングの詳細 | 了解更多市場營銷 |
| 智能销售 | 了解更多智能销售 | Learn More About Sales | 営業の詳細 | 了解更多智能銷售 |
| 客户服务 | 了解更多客户服务 | Learn More About Customer Service | カスタマーサービスの詳細 | 了解更多客戶服務 |
| 内部服务 | 了解更多内部服务 | Learn More About Internal Service | 社内サービスの詳細 | 了解更多內部服務 |
| 管理优化 | 了解更多管理优化 | Learn More About Management | 管理の詳細 | 了解更多管理優化 |
| AI技术 | 了解更多AI技术 | Learn More About AI Technology | AI技術の詳細 | 了解更多AI技術 |

---

## 💻 代码实现模板

### TypeScript 数据结构
```typescript
{
  id: 'item-1',
  layout: 'text-left',
  
  content: {
    icon: 'fas fa-robot',
    title: { zh: '...', en: '...', jp: '...', hk: '...' },
    subtitle: { zh: '...', en: '...', jp: '...', hk: '...' },
    description: { zh: '...', en: '...', jp: '...', hk: '...' },
    features: [
      { zh: '...', en: '...', jp: '...', hk: '...' }
    ],
    
    // 按钮配置（必需）
    button: {
      text: {
        zh: '了解更多市场营销',
        en: 'Learn More About Marketing',
        jp: 'マーケティングの詳細',
        hk: '了解更多市場營銷'
      },
      url: '/scenarios/marketing'  // 由用户提供
    }
  },
  
  image: {
    src: '/images/marketing.png',
    alt: { zh: '...', en: '...', jp: '...', hk: '...' }
  }
}
```

### JSX 代码实现
```typescript
{/* 功能标签列表 */}
<div class="flex flex-wrap gap-4 mb-6">
  {/* 标签内容 */}
</div>

{/* 按钮 */}
<a 
  href={button.url} 
  class="inline-flex items-center px-6 py-3 border-2 border-orange-500 text-orange-500 font-semibold rounded-full hover:bg-orange-500 hover:text-white transition-all duration-300"
>
  {language === 'zh' && button.text.zh}
  {language === 'en' && button.text.en}
  {language === 'jp' && button.text.jp}
  {language === 'hk' && button.text.hk}
  <i class="fas fa-arrow-right ml-2"></i>
</a>
```

---

## 📝 用户输入格式

### 完整输入格式
```
修改版块3第1项：
- 图标：fas fa-robot
- 标题：市场营销自动化
- 副标题：提升转化率，降低获客成本
- 描述：实时识别客户意图，统一话术留资，智能分配高潜线索。
- 标签：意图识别、智能留资、多渠道整合、预测分析
- 按钮：了解更多市场营销       ← 按钮文字（简体中文）
- 链接：/scenarios/marketing    ← 按钮链接（用户提供）
- 图片：/images/marketing.png
- 图片描述：市场营销自动化界面展示
```

### 简化输入格式（只提供必要字段）
```
修改版块3第1项：
- 标题：市场营销自动化
- 按钮：了解更多市场营销
- 链接：/scenarios/marketing
```

---

## 🤖 AI 自动处理流程

当用户提供按钮文字和链接后，AI 会自动：

1. ✅ **接收简体中文按钮文字**  
   例如：`了解更多市场营销`

2. 🤖 **自动生成英文按钮文字**  
   例如：`Learn More About Marketing`

3. 🤖 **自动生成日文按钮文字**  
   例如：`マーケティングの詳細`

4. 🤖 **自动生成繁体中文按钮文字**  
   例如：`了解更多市場營銷`

5. 🔗 **保存用户提供的链接**  
   例如：`/scenarios/marketing`

6. 📝 **生成完整的按钮代码**  
   包括样式、多语言文字、链接

7. 💾 **插入到文字区域下方**  
   位于功能标签列表和图片区域之间

---

## 🔗 链接格式规范

### 内部链接（相对路径）
```
/scenarios/marketing          ← 市场营销场景页
/scenarios/sales              ← 销售场景页
/scenarios/customer-service   ← 客户服务场景页
/scenarios/internal-service   ← 内部服务场景页
/scenarios/management         ← 管理场景页
/about                        ← 关于我们页
```

### 外部链接（完整 URL）
```
https://example.com/blog/marketing-ai
https://zenava.ai/resources/whitepaper
```

### 锚点链接（页面内跳转）
```
#features                     ← 跳转到本页的 features 区域
#pricing                      ← 跳转到本页的 pricing 区域
```

---

## ✅ 修改注意事项

### 必须遵守
1. ✅ **按钮必需**: 每个子项都必须包含按钮
2. ✅ **四语同步**: 按钮文字包含四种语言
3. ✅ **样式统一**: 使用统一的橙色圆角样式
4. ✅ **链接有效**: 确保链接地址正确可访问
5. ✅ **位置固定**: 按钮位于标签列表之后
6. ✅ **响应式**: 移动端正常显示

### 禁止操作
1. ❌ 不要修改按钮样式类名
2. ❌ 不要删除按钮的 hover 效果
3. ❌ 不要忘记添加箭头图标
4. ❌ 不要省略任何一种语言
5. ❌ 不要使用无效链接

---

## 📱 移动端适配

### 按钮响应式要求

```typescript
// ✅ 移动端自适应
class="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base ..."

// ✅ 移动端全宽（如果需要）
class="flex w-full justify-center items-center px-6 py-3 ..."
```

### 移动端布局
```
┌──────────────────────────┐
│  🤖 标题                  │
│  副标题                    │
│  描述文字...               │
│  ✓ 标签1  ✓ 标签2        │
│                           │
│  ┌───────────────────┐   │  ← 按钮
│  │ 了解更多市场营销 ➜│   │
│  └───────────────────┘   │
├──────────────────────────┤
│  [图片区域]               │
└──────────────────────────┘
```

---

## 🎯 实际应用示例

### 示例 1：市场营销
```typescript
button: {
  text: {
    zh: '了解更多市场营销',
    en: 'Learn More About Marketing',
    jp: 'マーケティングの詳細',
    hk: '了解更多市場營銷'
  },
  url: '/scenarios/marketing'
}
```

### 示例 2：客户服务
```typescript
button: {
  text: {
    zh: '了解更多客户服务',
    en: 'Learn More About Customer Service',
    jp: 'カスタマーサービスの詳細',
    hk: '了解更多客戶服務'
  },
  url: '/scenarios/customer-service'
}
```

### 示例 3：外部链接
```typescript
button: {
  text: {
    zh: '查看成功案例',
    en: 'View Success Stories',
    jp: '成功事例を見る',
    hk: '查看成功案例'
  },
  url: 'https://zenava.ai/case-studies'
}
```

---

## 📊 翻译质量标准

### 英文翻译
- **格式**: `Learn More About + 主题`
- **大小写**: 标题格式（每个单词首字母大写）
- **示例**: Learn More About Marketing, Learn More About Sales

### 日文翻译
- **格式**: `主题名称 + の詳細`
- **用语**: 使用商务敬语
- **示例**: マーケティングの詳細、営業の詳細

### 繁体中文翻译
- **格式**: `了解更多 + 主題名稱`
- **用语**: 港台商务用语
- **示例**: 了解更多市場營銷、了解更多客戶服務

---

## 🚀 测试验证清单

修改后必须检查：

### 功能测试
- [ ] 按钮在桌面端正常显示
- [ ] 按钮在移动端正常显示
- [ ] 四种语言切换正常
- [ ] 按钮链接可点击
- [ ] 链接跳转正确

### 样式测试
- [ ] 按钮为橙色边框
- [ ] 按钮为圆角样式
- [ ] 悬停时背景变橙色
- [ ] 悬停时文字变白色
- [ ] 过渡动画平滑

### 响应式测试
- [ ] iPhone SE (375px) 正常
- [ ] iPad (768px) 正常
- [ ] 桌面 (1024px+) 正常
- [ ] 按钮不溢出容器
- [ ] 文字清晰可读

---

## 📁 相关文档

- **规则文档**: `.cursor/rules/config.mdc` (第844-894行)
- **使用指南**: `SECTION3_RULES_SUMMARY.md`
- **按钮规则**: `SECTION3_BUTTON_RULES.md` (本文件)
- **第1项修改**: `SECTION3_ITEM1_UPDATE.md`

---

## 📞 快速参考

### 按钮类名（完整）
```css
inline-flex items-center px-6 py-3 border-2 border-orange-500 text-orange-500 font-semibold rounded-full hover:bg-orange-500 hover:text-white transition-all duration-300
```

### 按钮文案模板
```
zh: '了解更多【主题】'
en: 'Learn More About 【Topic】'
jp: '【主题】の詳細'
hk: '了解更多【主題】'
```

### JSX 实现（简化版）
```typescript
<a href={url} class="按钮类名">
  {language === 'zh' && '了解更多市场营销'}
  {language === 'en' && 'Learn More About Marketing'}
  {language === 'jp' && 'マーケティングの詳細'}
  {language === 'hk' && '了解更多市場營銷'}
  <i class="fas fa-arrow-right ml-2"></i>
</a>
```

---

**更新日期**: 2025年11月6日  
**状态**: ✅ 规则已添加到 `config.mdc`  
**下一步**: 更新版块3第1项，添加按钮

