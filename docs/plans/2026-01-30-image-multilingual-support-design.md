# 图片多语言支持设计方案

**日期**: 2026-01-30  
**状态**: 设计完成  
**范围**: 静态页面、导航、页脚、通用组件的图片多语言支持

---

## 📋 需求概述

### 目标
为所有静态页面、导航、页脚和通用组件的图片实现多语言支持，确保：
1. 每张图片都有四个语言版本（中文、英文、日文、繁体中文）
2. 图片路径根据当前语言动态切换
3. 图片 alt 文本支持多语言

### 范围
- ✅ **包含**：静态页面、导航、页脚、通用组件
- ❌ **排除**：资源中心相关页面（保持现状，不优化）

---

## 🏗️ 架构设计

### 核心原则

1. **图片路径作为翻译数据**
   - 图片路径随语言变化，应放在 `translations.ts` 中
   - 遵循项目规范：翻译数据统一在 `translations.ts` 管理

2. **文件命名规范**
   - 基础文件名 + 语言后缀 + 扩展名
   - 语言后缀：`-zh`（简体中文）、`-en`（英文）、`-jp`（日文）、`-hk`（繁体中文）
   - 移动端图片：基础文件名 + `-mobile` + 语言后缀 + 扩展名

3. **动态路径生成**
   - 组件中根据当前语言从 translations 获取对应图片路径
   - 使用 `getTranslations(language)` 获取翻译对象

### 文件命名示例

```
banner.webp             # 简体中文版桌面端（默认，无后缀）
banner-en.webp          # 英文版桌面端
banner-jp.webp          # 日文版桌面端
banner-hk.webp          # 繁体中文版桌面端
banner-mobile.webp      # 简体中文版移动端（默认，无后缀）
banner-mobile-en.webp   # 英文版移动端
banner-mobile-jp.webp   # 日文版移动端
banner-mobile-hk.webp   # 繁体中文版移动端
```

**重要说明：** 简体中文（zh）作为默认语言，图片文件名不使用 `-zh` 后缀。

---

## 📁 数据结构规范

### translations.ts 标准结构

```typescript
// 每个语言对象（zh/en/jp/hk）中
{
  // 首页 Banner
  banners: {
    slide1: {
      src: '/assets/images/banners/slide1.webp',              // zh: 无后缀
      mobileSrc: '/assets/images/banners/slide1-mobile.webp',  // zh: 无后缀
      alt: '横幅图片1'
    }
  },
  
  // 产品页面
  products: {
    aiAgents: {
      banner: {
        src: '/assets/images/ai-agents/banner.webp',              // zh: 无后缀
        mobileSrc: '/assets/images/ai-agents/banner-mobile.webp', // zh: 无后缀
        alt: 'AI Agents Banner'
      },
      features: {
        feature1: {
          imageSrc: '/assets/images/ai-agents/feature1.webp',    // zh: 无后缀
          imageAlt: '即时对话功能演示图'
        }
      }
    }
  },
  
  // 通用组件
  common: {
    logo: {
      src: '/assets/images/common/logo.webp',  // zh: 无后缀
      alt: 'Zenava Logo'
    },
    noImage: '暂无图片' // 占位符文本
  }
}
```

### 组件使用示例

```typescript
// 在组件中
const trans = getTranslations(language)

// 使用图片路径和 alt 文本
<img 
  src={trans.products.aiAgents.banner.src}
  alt={trans.products.aiAgents.banner.alt}
  onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
/>

// 占位符（图片加载失败时显示）
<div class="hidden w-full h-full items-center justify-center bg-gray-100">
  <i class="fas fa-image text-gray-400"></i>
  <span>{trans.common.noImage}</span>
</div>
```

---

## 📝 需要处理的页面和组件清单

### 静态页面（7类）

1. **首页** (`HomepageDB.tsx`)
   - Banner 轮播图（多个 slide）
   - 核心能力图片（5个）

2. **产品页面**（3个）
   - `AiAgents.tsx` - Banner、功能演示图
   - `LiveChat.tsx` - Banner、案例图片
   - `VoiceAgents.tsx` - Banner、核心功能图片、客户案例图片

3. **行业页面**（4个）
   - `Retail.tsx` - Banner、业务场景图片
   - `Automotive.tsx` - Banner、业务场景图片
   - `Software.tsx` - Banner、业务场景图片
   - `Travel.tsx` - Banner、业务场景图片

4. **场景页面**（5个）
   - `MarketingScenario.tsx` - Banner、功能图片
   - `SalesScenario.tsx` - Banner、功能图片
   - `CustomerServiceScenario.tsx` - Banner、功能图片
   - `InternalServiceScenario.tsx` - Banner、功能图片
   - `ManagementScenario.tsx` - Banner、功能图片

5. **关于我们** (`AboutUs.tsx`)
   - 公司介绍图片、团队图片等

6. **联系我们** (`Contact.tsx`)
   - 联系页面相关图片

7. **法律页面**（2个）
   - `PrivacyPolicy.tsx` - 隐私政策相关图片
   - `TermsAndConditions.tsx` - 条款相关图片

### 通用组件（2个）

1. **UnifiedNavigation.tsx**
   - Logo 图片路径和 alt 文本

2. **UnifiedFooter.tsx**
   - Logo 图片路径和 alt 文本

---

## 🔧 实施步骤

### 步骤1：在 translations.ts 中添加图片路径

1. 为每个图片位置添加 `src` 和 `mobileSrc`（如需要）
2. 确保四种语言（zh、en、jp、hk）都有对应的图片路径
3. 同时添加 `alt` 文本
4. 添加 `common.noImage` 占位符文本（四种语言）

### 步骤2：修改组件代码

1. 将硬编码的图片路径替换为从 translations 获取
2. 使用 `getTranslations(language)` 获取翻译对象
3. 更新 `<img>` 标签的 `src` 和 `alt` 属性
4. 添加图片加载失败的占位符处理

### 步骤3：处理特殊情况

1. **Logo**：统一使用 `t.common.logo.src` 和 `t.common.logo.alt`
2. **占位符图片**：如果图片不存在，使用占位符（图标 + 多语言提示文本）
3. **移动端响应式**：使用 `<picture>` 标签和 `mobileSrc` 属性

---

## 🛡️ 错误处理和降级策略

### 图片加载失败处理

1. **使用 `onerror` 事件**
   - 图片加载失败时隐藏图片，显示占位符
   - 占位符包含图标和多语言提示文本

2. **降级策略（在 translations.ts 中设置）**
   - **主要策略**：如果多语言版本的图片文件不存在，`translations.ts` 中该语言的图片路径直接使用简体中文版本（无后缀）
   - 例如：如果 `banner-en.webp` 不存在，`en.banner.src` 设为 `'/assets/images/ai-agents/banner.webp'`
   - 这样可以确保即使某些语言的图片文件还没准备好，页面也能正常显示简体中文版本的图片
   - 如果简体中文版本也不存在，显示占位符

### 代码示例

```typescript
<img 
  src={trans.products.aiAgents.banner.src}
  alt={trans.products.aiAgents.banner.alt}
  onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
/>
<div class="hidden w-full h-full items-center justify-center bg-gray-100">
  <i class="fas fa-image text-gray-400"></i>
  <span>{trans.common.noImage}</span>
</div>
```

---

## ✅ 测试验证

### 测试清单

1. **语言切换测试**
   - ✅ 切换语言时，图片路径是否正确更新
   - ✅ 四种语言的图片文件是否都存在
   - ✅ 图片 alt 文本是否正确显示

2. **响应式测试**
   - ✅ 移动端响应式图片（mobileSrc）是否正确切换
   - ✅ 桌面端和移动端图片是否正确显示

3. **错误处理测试**
   - ✅ 图片加载失败时，占位符是否正确显示
   - ✅ 占位符文本是否使用正确的语言

4. **组件测试**
   - ✅ Logo 在导航栏和页脚中是否正确显示
   - ✅ Logo 图片路径和 alt 文本是否正确

5. **页面完整性测试**
   - ✅ 所有静态页面的图片是否正确显示
   - ✅ 所有图片都有对应的四种语言版本

---

## 📊 实施优先级

### 高优先级（核心功能）
1. Logo（导航栏和页脚）
2. 首页 Banner 轮播图
3. 产品页面 Banner

### 中优先级（重要功能）
4. 产品页面功能演示图
5. 行业页面 Banner 和业务场景图片
6. 场景页面 Banner 和功能图片

### 低优先级（补充功能）
7. 关于我们页面图片
8. 联系我们页面图片
9. 法律页面图片

---

## 📌 注意事项

1. **文件命名一致性**
   - 确保所有图片文件按照命名规范命名
   - 语言后缀必须准确（-zh、-en、-jp、-hk）

2. **图片文件准备**
   - 需要准备所有图片的四种语言版本
   - 移动端图片（如需要）也需要四种语言版本

3. **性能考虑**
   - 图片格式优先使用 WebP
   - 确保图片文件大小合理（< 500KB）

4. **SEO 优化**
   - 确保所有图片都有准确的 alt 文本
   - alt 文本应该描述图片内容，而不是装饰性描述

5. **可访问性**
   - 图片加载失败时，确保有合适的占位符
   - 占位符文本应该清晰说明图片缺失

---

## 🔄 后续优化建议

1. **图片懒加载**
   - 考虑使用 `loading="lazy"` 属性优化性能

2. **图片 CDN**
   - 考虑将图片上传到 CDN，提高加载速度

3. **图片格式优化**
   - 考虑使用 AVIF 格式（如果浏览器支持）

4. **图片尺寸优化**
   - 考虑使用响应式图片（srcset）提供不同尺寸

---

## 📚 相关文档

- [多语言处理规则](../.cursor/rules/2-multilingual.mdc)
- [编码规范](../.cursor/rules/1-coding-standards.mdc)
- [产品页面规范](../.cursor/rules/10-product-page.mdc)

---

**设计完成日期**: 2026-01-30  
**下一步**: 准备实施计划
