# 版块3标题链接功能说明

## ✅ 功能概述

版块3的每个子项现在支持**标题行链接功能**，点击图标或标题可以跳转到指定页面。

**更新日期**: 2025年11月6日  
**规则文档**: `.cursor/rules/config.mdc` (已更新)

---

## 🎯 功能说明

### 每个子项现在有两个链接点

```
┌──────────────────────────────────┐
│  🤖 AI驱动的营销自动化  ← 链接1 │  标题链接（新增）
│  智能获客，精准转化               │
│  通过AI智能获客识别...            │
│  ✓ 智能识别  ✓ 实时优化          │
│  ┌──────────────────────┐       │
│  │ 了解更多营销自动化 ➜│  ← 链接2 │  按钮链接（已有）
│  └──────────────────────┘       │
└──────────────────────────────────┘
```

---

## 📝 用户输入格式

### 完整格式

```
修改版块3第1项：
- 图标：fas fa-robot
- 标题：市场营销自动化
- 标题链接：/scenarios/marketing          ← 新增：标题行的链接
- 副标题：提升转化率，降低获客成本
- 描述：实时识别客户意图...
- 标签：智能识别、智能留资、多渠道整合
- 按钮：了解更多市场营销
- 按钮链接：/scenarios/marketing          ← 已有：按钮的链接
- 媒体：/images/marketing.png
- 媒体描述：市场营销界面
```

### 简化格式（标题链接可选）

如果不提供标题链接，标题将不可点击（保持纯文本）：

```
修改版块3第1项：
- 标题：市场营销自动化
- 标题链接：                    ← 留空或不提供，标题不可点击
- 按钮：了解更多市场营销
- 按钮链接：/scenarios/marketing
```

---

## 💻 代码实现

### 有标题链接的情况

```typescript
{/* 标题行（可点击） */}
<a 
  href="/scenarios/marketing"
  class="flex items-center mb-6 group cursor-pointer"
>
  <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-purple-200 transition-colors">
    <i class="fas fa-robot text-purple-600 text-xl"></i>
  </div>
  <h3 class="text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
    {language === 'zh' && 'AI驱动的营销自动化'}
    {language === 'en' && 'AI-Driven Marketing Automation'}
    {language === 'jp' && 'AI駆動のマーケティングオートメーション'}
    {language === 'hk' && 'AI驅動的營銷自動化'}
  </h3>
</a>
```

### 无标题链接的情况（保持原样）

```typescript
{/* 标题行（不可点击） */}
<div class="flex items-center mb-6">
  <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
    <i class="fas fa-robot text-purple-600 text-xl"></i>
  </div>
  <h3 class="text-2xl md:text-3xl font-bold text-gray-900">
    {language === 'zh' && 'AI驱动的营销自动化'}
    {language === 'en' && 'AI-Driven Marketing Automation'}
    {language === 'jp' && 'AI駆動のマーケティングオートメーション'}
    {language === 'hk' && 'AI驅動的營銷自動化'}
  </h3>
</div>
```

---

## 🎨 样式说明

### 标题链接的视觉效果

| 状态 | 图标背景色 | 标题颜色 | 鼠标样式 |
|------|-----------|---------|---------|
| 默认 | `bg-purple-100` | `text-gray-900` | `cursor-pointer` |
| 悬停 | `bg-purple-200` | `text-purple-600` | `cursor-pointer` |

### CSS 类名

```css
/* 容器（可点击） */
.group cursor-pointer

/* 图标背景（悬停变色） */
.group-hover:bg-purple-200 transition-colors

/* 标题（悬停变色） */
.group-hover:text-purple-600 transition-colors
```

---

## 🔗 链接类型对比

### 标题链接 vs 按钮链接

| 特性 | 标题链接 | 按钮链接 |
|------|---------|---------|
| 位置 | 顶部（图标+标题） | 底部（标签后） |
| 样式 | 文字链接 | 橙色圆角按钮 |
| 悬停效果 | 紫色高亮 | 橙色背景 + 白色文字 |
| 可选性 | 可选（可不提供） | 必需 |
| 用途 | 快速导航 | 主要行动号召 |

### 常见配置方式

#### 方式1：两个链接指向同一页面（推荐）

```
- 标题链接：/scenarios/marketing
- 按钮链接：/scenarios/marketing
```

**用途**: 提供多个点击入口，提升用户体验

#### 方式2：标题链接指向概览，按钮链接指向详情

```
- 标题链接：/scenarios/marketing
- 按钮链接：/scenarios/marketing/details
```

**用途**: 分层导航

#### 方式3：只使用按钮链接

```
- 标题链接：                    ← 留空
- 按钮链接：/scenarios/marketing
```

**用途**: 保持简洁，只有一个行动号召

---

## 📋 完整示例

### 示例1：市场营销（图片 + 标题链接）

**用户输入**:
```
修改版块3第1项：
- 图标：fas fa-robot
- 标题：AI驱动的营销自动化
- 标题链接：/scenarios/marketing
- 副标题：智能获客，精准转化
- 描述：通过AI智能识别客户意图，自动生成个性化营销内容。
- 标签：智能识别、实时优化、个性化
- 按钮：了解更多营销自动化
- 按钮链接：/scenarios/marketing
- 媒体：/images/marketing.png
- 媒体描述：营销自动化界面
```

**生成代码**:
```typescript
{/* 第1项：左文右图 */}
<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
  {/* 左侧：文字 */}
  <div data-animate="slide-up">
    {/* 标题行（可点击） */}
    <a 
      href="/scenarios/marketing"
      class="flex items-center mb-6 group cursor-pointer"
    >
      <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-purple-200 transition-colors">
        <i class="fas fa-robot text-purple-600 text-xl"></i>
      </div>
      <h3 class="text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
        {language === 'zh' && 'AI驱动的营销自动化'}
        {language === 'en' && 'AI-Driven Marketing Automation'}
        {language === 'jp' && 'AI駆動のマーケティングオートメーション'}
        {language === 'hk' && 'AI驅動的營銷自動化'}
      </h3>
    </a>
    
    {/* 副标题、描述、标签、按钮... */}
  </div>
  
  {/* 右侧：图片 */}
  <div class="relative" data-animate="slide-up">
    <img src="/images/marketing.png" />
  </div>
</div>
```

---

### 示例2：客户服务（视频 + 无标题链接）

**用户输入**:
```
修改版块3第3项：
- 图标：fas fa-headset
- 标题：7x24智能客服
- 标题链接：                    ← 留空，标题不可点击
- 副标题：全天候响应，零等待
- 描述：AI智能客服系统实现全天候服务。
- 标签：智能应答、情感识别、多轮对话
- 按钮：了解更多客户服务
- 按钮链接：/scenarios/customer-service
- 媒体：/videos/service-demo.mp4
- 媒体描述：客服演示视频
- 视频配置：自动播放、循环播放、静音
```

**生成代码**:
```typescript
{/* 标题行（不可点击） */}
<div class="flex items-center mb-6">
  <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
    <i class="fas fa-headset text-orange-600 text-xl"></i>
  </div>
  <h3 class="text-2xl md:text-3xl font-bold text-gray-900">
    {language === 'zh' && '7x24智能客服'}
    {language === 'en' && '7x24 Smart Customer Service'}
    {language === 'jp' && '7x24スマートカスタマーサービス'}
    {language === 'hk' && '7x24智能客服'}
  </h3>
</div>
```

---

## 🎯 使用建议

### 何时添加标题链接？

**✅ 推荐添加的情况**:
1. 标题对应明确的详情页
2. 希望提供快速导航入口
3. 页面有多个入口点的需求
4. 提升用户交互体验

**❌ 不推荐添加的情况**:
1. 页面只需要一个行动号召
2. 标题纯展示性，无对应页面
3. 避免过多链接造成混乱

### 链接配置建议

| 场景 | 标题链接 | 按钮链接 | 说明 |
|------|---------|---------|------|
| 场景页面 | `/scenarios/marketing` | `/scenarios/marketing` | 同一页面，多入口 |
| 分层导航 | `/scenarios/marketing` | `/scenarios/marketing#features` | 主页 vs 具体部分 |
| 外部资源 | 留空 | `https://...` | 只有按钮跳转外部 |
| 简洁模式 | 留空 | `/scenarios/marketing` | 只有按钮链接 |

---

## 📱 移动端适配

### 标题链接在移动端

```typescript
{/* 标题（响应式） */}
<h3 class="text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
  {/* 移动端 24px，桌面端 30px */}
</h3>
```

### 点击区域

```typescript
{/* 可点击区域 */}
<a class="flex items-center mb-6 group cursor-pointer">
  {/* 
    移动端：整行都可点击
    桌面端：图标 + 标题都可点击
  */}
</a>
```

---

## ✅ 修改注意事项

### 必须遵守
1. **标题链接可选**: 如果不需要，可以不提供或留空
2. **按钮链接必需**: 每个子项必须有按钮链接
3. **链接格式**: 内部链接 `/xxx` 或外部链接 `https://...`
4. **悬停效果**: 有标题链接时自动添加悬停效果
5. **语义化**: 使用 `<a>` 标签而不是 `<div onclick>`

### 禁止操作
1. ❌ 不要删除按钮链接（按钮必须存在）
2. ❌ 不要修改悬停颜色（保持紫色系统）
3. ❌ 不要使用 JavaScript onclick（使用原生 href）
4. ❌ 不要忘记添加 group 和 transition 类

---

## 🔄 AI 自动处理流程

当用户提供标题链接时，AI 会：

1. ✅ **检查是否提供标题链接**
   - 有链接 → 生成 `<a>` 标签（可点击）
   - 无链接 → 生成 `<div>` 标签（纯展示）

2. ✅ **添加悬停效果**（仅当有链接时）
   - 图标背景：`group-hover:bg-purple-200`
   - 标题颜色：`group-hover:text-purple-600`

3. ✅ **添加过渡动画**
   - `transition-colors` 平滑过渡

4. ✅ **保持响应式**
   - 标题大小：`text-2xl md:text-3xl`
   - 图标大小：固定 `w-12 h-12`

---

## 🧪 测试清单

### 功能测试
- [ ] 标题链接可以点击
- [ ] 点击后正确跳转
- [ ] 悬停时颜色变化
- [ ] 过渡动画流畅
- [ ] 按钮链接正常工作

### 响应式测试
- [ ] 移动端标题大小合适
- [ ] 移动端点击区域足够大
- [ ] 桌面端悬停效果正常
- [ ] 各断点布局正常

### 兼容性测试
- [ ] Chrome 正常
- [ ] Safari 正常
- [ ] Firefox 正常
- [ ] 移动端浏览器正常

---

## 📁 相关文档

- **规则文档**: `.cursor/rules/config.mdc` (已更新)
- **标题链接**: `SECTION3_TITLE_LINK.md` (本文件)
- **按钮规则**: `SECTION3_BUTTON_RULES.md`
- **媒体识别**: `SECTION3_MEDIA_AUTO_DETECT.md`
- **完整示例**: `SECTION3_BUTTONS_UPDATE.md`

---

## 💡 常见问题

### Q1: 标题链接和按钮链接可以不同吗？
**A**: 可以。标题链接指向概览，按钮链接指向详情页。

### Q2: 标题链接是必需的吗？
**A**: 不是。标题链接可选，不提供则标题不可点击。

### Q3: 如何让标题不可点击？
**A**: 不提供"标题链接"字段，或者留空。

### Q4: 悬停颜色可以自定义吗？
**A**: 建议保持默认紫色系统，与品牌色一致。

### Q5: 移动端点击会有问题吗？
**A**: 不会。使用原生 `<a>` 标签，完全兼容移动端。

---

**更新完成时间**: 2025年11月6日  
**规则状态**: ✅ 已更新  
**文档状态**: ✅ 已完成  
**功能状态**: ✅ 可以使用

**下一步**: 修改版块3任意子项时，可以直接提供标题链接！🔗

