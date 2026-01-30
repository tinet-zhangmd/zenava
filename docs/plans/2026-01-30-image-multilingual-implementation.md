# 图片多语言支持实施计划

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 为所有静态页面、导航、页脚和通用组件的图片实现多语言支持，确保每张图片都有四个语言版本（zh/en/jp/hk），图片路径和alt文本根据当前语言动态切换。

**Architecture:** 图片路径作为翻译数据统一在 `translations.ts` 中管理，组件通过 `getTranslations(language)` 获取当前语言的图片路径和alt文本。文件命名规范：基础文件名 + 语言后缀（-zh/-en/-jp/-hk）+ 扩展名。

**Tech Stack:** TypeScript, Hono JSX, translations.ts

---

## Task 1: 添加通用图片配置到 translations.ts

**Files:**
- Modify: `src/i18n/translations.ts` (在四个语言对象的根级别添加 common 对象)

**Step 1: 在 zh 语言对象中添加 common 配置**

在 `siteTranslations.zh` 对象的末尾（banners 对象之后）添加：

```typescript
common: {
  logo: {
    src: '/assets/images/common/logo-zh.webp',
    alt: 'Zenava Logo'
  },
  noImage: '暂无图片'
}
```

**Step 2: 在 en 语言对象中添加 common 配置**

在 `siteTranslations.en` 对象的末尾添加：

```typescript
common: {
  logo: {
    src: '/assets/images/common/logo-en.webp',
    alt: 'Zenava Logo'
  },
  noImage: 'No Image'
}
```

**Step 3: 在 jp 语言对象中添加 common 配置**

在 `siteTranslations.jp` 对象的末尾添加：

```typescript
common: {
  logo: {
    src: '/assets/images/common/logo-jp.webp',
    alt: 'Zenava Logo'
  },
  noImage: '画像なし'
}
```

**Step 4: 在 hk 语言对象中添加 common 配置**

在 `siteTranslations.hk` 对象的末尾添加：

```typescript
common: {
  logo: {
    src: '/assets/images/common/logo-hk.webp',
    alt: 'Zenava Logo'
  },
  noImage: '暫無圖片'
}
```

**Step 5: 验证 translations.ts 语法**

Run: `npm run build` 或 `tsc --noEmit`
Expected: 无语法错误

**Step 6: Commit**

```bash
git add src/i18n/translations.ts
git commit -m "feat: add common logo and noImage translations for all languages"
```

---

## Task 2: 更新 UnifiedNavigation.tsx 使用多语言 Logo

**Files:**
- Modify: `src/components/UnifiedNavigation.tsx:195-212`

**Step 1: 导入 getTranslations**

在文件顶部导入部分添加：

```typescript
import { getTranslations } from '../i18n/translations.js'
```

**Step 2: 获取翻译对象**

在组件函数开始处（获取 config 之后）添加：

```typescript
const trans = getTranslations(currentLanguage)
```

**Step 3: 更新 Logo img 标签**

将第 200-208 行的 Logo img 标签修改为：

```typescript
<img 
  src={trans.common.logo.src}
  alt={trans.common.logo.alt}
  class="w-auto object-contain transition-all duration-300 hover:opacity-80"
  style={{
    height: config.logo_height || '2.5rem',
    maxWidth: config.logo_max_width || '200px'
  }}
  onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
/>
```

**Step 4: 添加 Logo 占位符**

在 Logo img 标签后添加占位符 div：

```typescript
<div class="hidden w-full h-full items-center justify-center bg-gray-100">
  <i class="fas fa-image text-gray-400"></i>
  <span class="ml-2 text-sm text-gray-500">{trans.common.noImage}</span>
</div>
```

**Step 5: 验证组件语法**

Run: `npm run build` 或 `tsc --noEmit`
Expected: 无语法错误

**Step 6: Commit**

```bash
git add src/components/UnifiedNavigation.tsx
git commit -m "feat: update UnifiedNavigation to use multilingual logo from translations"
```

---

## Task 3: 更新 UnifiedFooter.tsx 使用多语言 Logo

**Files:**
- Modify: `src/components/UnifiedFooter.tsx:145-154`

**Step 1: 导入 getTranslations**

在文件顶部导入部分添加：

```typescript
import { getTranslations } from '../i18n/translations.js'
```

**Step 2: 获取翻译对象**

在组件函数开始处（获取 t 之后）添加：

```typescript
const trans = getTranslations(language)
```

**Step 3: 更新 Logo img 标签**

将第 148-153 行的 Logo img 标签修改为：

```typescript
<img 
  src={trans.common.logo.src}
  alt={trans.common.logo.alt}
  class="h-10 md:h-12 w-auto object-contain hover:opacity-80 transition-opacity"
  style="max-width: 160px; filter: brightness(0) invert(1);"
  onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
/>
```

**Step 4: 添加 Logo 占位符**

在 Logo img 标签后添加占位符 div：

```typescript
<div class="hidden w-full h-full items-center justify-center bg-gray-100">
  <i class="fas fa-image text-gray-400"></i>
  <span class="ml-2 text-sm text-gray-500">{trans.common.noImage}</span>
</div>
```

**Step 5: 验证组件语法**

Run: `npm run build` 或 `tsc --noEmit`
Expected: 无语法错误

**Step 6: Commit**

```bash
git add src/components/UnifiedFooter.tsx
git commit -m "feat: update UnifiedFooter to use multilingual logo from translations"
```

---

## Task 4: 添加首页 Banner 图片路径到 translations.ts

**Files:**
- Modify: `src/i18n/translations.ts` (在四个语言对象的 banners 配置中添加 src 和 mobileSrc)

**Step 1: 检查现有 banners 结构**

查看 `src/i18n/translations.ts` 中 `banners.slide1` 到 `banners.slide6` 的结构

**Step 2: 在 zh 语言对象的 banners 中添加图片路径**

为每个 slide（slide1 到 slide6）添加 `src` 和 `mobileSrc`（可选）：

```typescript
banners: {
  slide1: {
    siteName: 'ZENAVA',
    mainTitle: '企业级AI对话解决方案',
    description: '通过智能AI助手转变您的客户服务，提升客户体验，降低运营成本',
    buttonText: '预约咨询',
    imageAlt: '横幅图片1',
    src: '/assets/images/banners/slide1-zh.webp',
    mobileSrc: '/assets/images/banners/slide1-mobile-zh.webp' // 可选
  },
  // ... 其他 slide
}
```

**Step 3: 在 en 语言对象的 banners 中添加图片路径**

为每个 slide 添加对应的英文版图片路径（-en 后缀）

**Step 4: 在 jp 语言对象的 banners 中添加图片路径**

为每个 slide 添加对应的日文版图片路径（-jp 后缀）

**Step 5: 在 hk 语言对象的 banners 中添加图片路径**

为每个 slide 添加对应的繁体中文版图片路径（-hk 后缀）

**Step 6: 验证 translations.ts 语法**

Run: `npm run build` 或 `tsc --noEmit`
Expected: 无语法错误

**Step 7: Commit**

```bash
git add src/i18n/translations.ts
git commit -m "feat: add banner image paths to translations for all languages"
```

---

## Task 5: 更新 HomepageDB.tsx 使用多语言 Banner 图片

**Files:**
- Modify: `src/pages/HomepageDB.tsx` (查找所有使用 banner 图片的地方)

**Step 1: 查找 Banner 图片使用位置**

搜索文件中所有包含 `fullImageSlide.fullImage.src` 或类似图片路径的地方

**Step 2: 更新 Banner 配置读取方式**

将硬编码的图片路径替换为从 translations 获取：

```typescript
// 在获取 trans 之后，更新 bannerSlides 配置
// 将 fullImageSlide.fullImage.src 改为 trans.banners.slide1.src
// 将 fullImageSlide.fullImage.mobileSrc 改为 trans.banners.slide1.mobileSrc
// 将 fullImageSlide.fullImage.alt 改为 trans.banners.slide1.imageAlt
```

**Step 3: 更新 img 标签使用翻译路径**

将所有 `<img src={fullImageSlide.fullImage.src}>` 替换为使用 translations 中的路径

**Step 4: 添加图片加载失败处理**

为所有 Banner 图片添加 `onerror` 事件和占位符

**Step 5: 验证组件语法**

Run: `npm run build` 或 `tsc --noEmit`
Expected: 无语法错误

**Step 6: Commit**

```bash
git add src/pages/HomepageDB.tsx
git commit -m "feat: update HomepageDB to use multilingual banner images from translations"
```

---

## Task 6: 添加产品页面图片路径到 translations.ts

**Files:**
- Modify: `src/i18n/translations.ts` (在四个语言对象的 products 配置中添加图片路径)

**Step 1: 在 zh 语言对象的 products.aiAgents 中添加图片路径**

```typescript
products: {
  aiAgents: {
    banner: {
      src: '/assets/images/ai-agents/banner-zh.webp',
      mobileSrc: '/assets/images/ai-agents/banner-mobile-zh.webp',
      alt: 'AI Agents Banner'
    },
    // ... 其他配置
  }
}
```

**Step 2: 在 en/jp/hk 语言对象中添加对应的图片路径**

为每个语言添加对应的图片路径（使用对应的语言后缀）

**Step 3: 为 LiveChat 和 VoiceAgents 添加图片路径**

同样在 products 对象下为 liveChat 和 voiceAgents 添加 banner 图片路径

**Step 4: 验证 translations.ts 语法**

Run: `npm run build` 或 `tsc --noEmit`
Expected: 无语法错误

**Step 5: Commit**

```bash
git add src/i18n/translations.ts
git commit -m "feat: add product page banner image paths to translations"
```

---

## Task 7: 更新 AiAgents.tsx 使用多语言 Banner 图片

**Files:**
- Modify: `src/pages/products/AiAgents.tsx:30-46`

**Step 1: 更新 Banner 图片路径**

将第 32-36 行的硬编码图片路径替换为：

```typescript
<picture>
  <source media="(max-width: 767px)" srcset={t.banner.mobileSrc || t.banner.src} />
  <img 
    src={t.banner.src}
    alt={t.banner.alt}
    class="w-full h-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-105"
    loading="eager"
    decoding="async"
    onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
  />
</picture>
```

**Step 2: 添加占位符**

在 picture 标签后添加占位符 div

**Step 3: 验证组件语法**

Run: `npm run build` 或 `tsc --noEmit`
Expected: 无语法错误

**Step 4: Commit**

```bash
git add src/pages/products/AiAgents.tsx
git commit -m "feat: update AiAgents banner to use multilingual images"
```

---

## Task 8: 更新 LiveChat.tsx 使用多语言 Banner 图片

**Files:**
- Modify: `src/pages/products/LiveChat.tsx` (查找 Banner 图片使用位置)

**Step 1: 查找 Banner 图片位置**

搜索文件中包含 `banner` 或图片路径的地方

**Step 2: 更新 Banner 图片路径**

将硬编码的图片路径替换为从 `t.banner.src` 和 `t.banner.alt` 获取

**Step 3: 添加图片加载失败处理**

添加 `onerror` 事件和占位符

**Step 4: 验证组件语法**

Run: `npm run build` 或 `tsc --noEmit`
Expected: 无语法错误

**Step 5: Commit**

```bash
git add src/pages/products/LiveChat.tsx
git commit -m "feat: update LiveChat banner to use multilingual images"
```

---

## Task 9: 更新 VoiceAgents.tsx 使用多语言 Banner 图片

**Files:**
- Modify: `src/pages/products/VoiceAgents.tsx` (查找 Banner 图片使用位置)

**Step 1: 查找 Banner 图片位置**

搜索文件中包含 `banner` 或图片路径的地方

**Step 2: 更新 Banner 图片路径**

将硬编码的图片路径替换为从 `t.banner.src` 和 `t.banner.alt` 获取

**Step 3: 添加图片加载失败处理**

添加 `onerror` 事件和占位符

**Step 4: 验证组件语法**

Run: `npm run build` 或 `tsc --noEmit`
Expected: 无语法错误

**Step 5: Commit**

```bash
git add src/pages/products/VoiceAgents.tsx
git commit -m "feat: update VoiceAgents banner to use multilingual images"
```

---

## Task 10: 添加行业页面图片路径到 translations.ts

**Files:**
- Modify: `src/i18n/translations.ts` (在四个语言对象的 industries 配置中添加图片路径)

**Step 1: 在 zh 语言对象的 industries 中添加图片路径**

为 retail、automotive、software、travel 四个行业页面添加 banner 图片路径：

```typescript
industries: {
  retail: {
    banner: {
      src: '/assets/images/industries/retail/banner-zh.webp',
      mobileSrc: '/assets/images/industries/retail/banner-mobile-zh.webp',
      alt: '零售行业解决方案'
    },
    // ... 其他配置
  },
  // ... 其他行业
}
```

**Step 2: 在 en/jp/hk 语言对象中添加对应的图片路径**

**Step 3: 验证 translations.ts 语法**

Run: `npm run build` 或 `tsc --noEmit`
Expected: 无语法错误

**Step 4: Commit**

```bash
git add src/i18n/translations.ts
git commit -m "feat: add industry page banner image paths to translations"
```

---

## Task 11: 更新行业页面使用多语言 Banner 图片

**Files:**
- Modify: `src/pages/industries/Retail.tsx:20-46`
- Modify: `src/pages/industries/Automotive.tsx`
- Modify: `src/pages/industries/Software.tsx`
- Modify: `src/pages/industries/Travel.tsx`

**Step 1: 更新 Retail.tsx**

将第 22-29 行的图片路径替换为 `t.banner.src` 和 `t.banner.alt`

**Step 2: 更新 Automotive.tsx**

查找并更新 Banner 图片路径

**Step 3: 更新 Software.tsx**

查找并更新 Banner 图片路径

**Step 4: 更新 Travel.tsx**

查找并更新 Banner 图片路径

**Step 5: 为所有行业页面添加图片加载失败处理**

添加 `onerror` 事件和占位符

**Step 6: 验证所有组件语法**

Run: `npm run build` 或 `tsc --noEmit`
Expected: 无语法错误

**Step 7: Commit**

```bash
git add src/pages/industries/*.tsx
git commit -m "feat: update industry pages to use multilingual banner images"
```

---

## Task 12: 添加场景页面图片路径到 translations.ts

**Files:**
- Modify: `src/i18n/translations.ts` (在四个语言对象的 scenarios 配置中添加图片路径)

**Step 1: 在 zh 语言对象的 scenarios 中添加图片路径**

为 marketing、sales、customerService、internalService、management 五个场景页面添加 banner 图片路径

**Step 2: 在 en/jp/hk 语言对象中添加对应的图片路径**

**Step 3: 验证 translations.ts 语法**

Run: `npm run build` 或 `tsc --noEmit`
Expected: 无语法错误

**Step 4: Commit**

```bash
git add src/i18n/translations.ts
git commit -m "feat: add scenario page banner image paths to translations"
```

---

## Task 13: 更新场景页面使用多语言 Banner 图片

**Files:**
- Modify: `src/pages/MarketingScenario.tsx`
- Modify: `src/pages/SalesScenario.tsx`
- Modify: `src/pages/CustomerServiceScenario.tsx`
- Modify: `src/pages/InternalServiceScenario.tsx`
- Modify: `src/pages/ManagementScenario.tsx`

**Step 1: 更新 MarketingScenario.tsx**

查找并更新 Banner 图片路径为从 translations 获取

**Step 2: 更新其他场景页面**

依次更新 SalesScenario、CustomerServiceScenario、InternalServiceScenario、ManagementScenario

**Step 3: 为所有场景页面添加图片加载失败处理**

**Step 4: 验证所有组件语法**

Run: `npm run build` 或 `tsc --noEmit`
Expected: 无语法错误

**Step 5: Commit**

```bash
git add src/pages/*Scenario.tsx
git commit -m "feat: update scenario pages to use multilingual banner images"
```

---

## Task 14: 添加其他页面图片路径到 translations.ts

**Files:**
- Modify: `src/i18n/translations.ts` (添加 aboutUs、contact、privacyPolicy、termsAndConditions 的图片路径)

**Step 1: 在四个语言对象中添加其他页面的图片路径**

为 aboutUs、contact、privacyPolicy、termsAndConditions 添加 banner 或相关图片路径

**Step 2: 验证 translations.ts 语法**

Run: `npm run build` 或 `tsc --noEmit`
Expected: 无语法错误

**Step 3: Commit**

```bash
git add src/i18n/translations.ts
git commit -m "feat: add other page image paths to translations"
```

---

## Task 15: 更新其他页面使用多语言图片

**Files:**
- Modify: `src/pages/AboutUs.tsx`
- Modify: `src/pages/Contact.tsx`
- Modify: `src/pages/PrivacyPolicy.tsx`
- Modify: `src/pages/TermsAndConditions.tsx`

**Step 1: 更新 AboutUs.tsx**

查找并更新所有图片路径为从 translations 获取

**Step 2: 更新 Contact.tsx**

查找并更新所有图片路径

**Step 3: 更新 PrivacyPolicy.tsx**

查找并更新所有图片路径

**Step 4: 更新 TermsAndConditions.tsx**

查找并更新所有图片路径

**Step 5: 为所有页面添加图片加载失败处理**

**Step 6: 验证所有组件语法**

Run: `npm run build` 或 `tsc --noEmit`
Expected: 无语法错误

**Step 7: Commit**

```bash
git add src/pages/AboutUs.tsx src/pages/Contact.tsx src/pages/PrivacyPolicy.tsx src/pages/TermsAndConditions.tsx
git commit -m "feat: update other pages to use multilingual images"
```

---

## Task 16: 添加产品页面功能演示图路径到 translations.ts

**Files:**
- Modify: `src/i18n/translations.ts` (在 products 配置中添加功能演示图路径)

**Step 1: 检查产品页面中的功能演示图**

查看 AiAgents.tsx、LiveChat.tsx、VoiceAgents.tsx 中所有功能演示图的硬编码路径

**Step 2: 在 translations.ts 中添加功能演示图路径**

为每个功能演示图添加 `imageSrc` 和 `imageAlt` 字段

**Step 3: 验证 translations.ts 语法**

Run: `npm run build` 或 `tsc --noEmit`
Expected: 无语法错误

**Step 4: Commit**

```bash
git add src/i18n/translations.ts
git commit -m "feat: add product feature demo image paths to translations"
```

---

## Task 17: 更新产品页面功能演示图使用多语言图片

**Files:**
- Modify: `src/pages/products/AiAgents.tsx` (查找所有功能演示图)
- Modify: `src/pages/products/LiveChat.tsx`
- Modify: `src/pages/products/VoiceAgents.tsx`

**Step 1: 更新 AiAgents.tsx 中的功能演示图**

将所有硬编码的图片路径替换为从 `t.features.featureX.imageSrc` 获取

**Step 2: 更新 LiveChat.tsx 中的功能演示图**

**Step 3: 更新 VoiceAgents.tsx 中的功能演示图**

**Step 4: 为所有功能演示图添加图片加载失败处理**

**Step 5: 验证所有组件语法**

Run: `npm run build` 或 `tsc --noEmit`
Expected: 无语法错误

**Step 6: Commit**

```bash
git add src/pages/products/*.tsx
git commit -m "feat: update product feature demo images to use multilingual paths"
```

---

## Task 18: 添加首页核心能力图片路径到 translations.ts

**Files:**
- Modify: `src/i18n/translations.ts` (在 businessValue.capabilities 中添加图片路径)

**Step 1: 检查 HomepageDB.tsx 中的核心能力图片**

查看第 573、642、657、726、741 行附近的图片使用

**Step 2: 在 translations.ts 中添加图片路径**

为每个 capability item 添加 `imageSrc` 字段（如果还没有）

**Step 3: 验证 translations.ts 语法**

Run: `npm run build` 或 `tsc --noEmit`
Expected: 无语法错误

**Step 4: Commit**

```bash
git add src/i18n/translations.ts
git commit -m "feat: add homepage capability image paths to translations"
```

---

## Task 19: 更新 HomepageDB.tsx 核心能力图片使用多语言路径

**Files:**
- Modify: `src/pages/HomepageDB.tsx` (查找所有核心能力图片)

**Step 1: 更新核心能力图片路径**

将所有硬编码的图片路径替换为从 `trans.businessValue.capabilities.itemX.imageSrc` 获取

**Step 2: 更新图片 alt 文本**

使用 `trans.businessValue.capabilities.itemX.imageAlt`

**Step 3: 添加图片加载失败处理**

**Step 4: 验证组件语法**

Run: `npm run build` 或 `tsc --noEmit`
Expected: 无语法错误

**Step 5: Commit**

```bash
git add src/pages/HomepageDB.tsx
git commit -m "feat: update homepage capability images to use multilingual paths"
```

---

## Task 20: 最终测试和验证

**Files:**
- Test: 所有修改的文件

**Step 1: 运行完整构建**

Run: `npm run build`
Expected: 构建成功，无错误

**Step 2: 启动开发服务器**

Run: `npm run dev` 或 `npm start`
Expected: 服务器正常启动

**Step 3: 手动测试语言切换**

1. 访问首页，切换语言，检查 Logo 是否正确更新
2. 访问产品页面，切换语言，检查 Banner 图片是否正确更新
3. 访问行业页面，切换语言，检查 Banner 图片是否正确更新
4. 访问场景页面，切换语言，检查 Banner 图片是否正确更新

**Step 4: 检查图片加载失败处理**

1. 故意使用错误的图片路径，检查占位符是否正确显示
2. 检查占位符文本是否使用正确的语言

**Step 5: 提交最终更改**

```bash
git add .
git commit -m "feat: complete image multilingual support implementation

- All static pages now support multilingual images
- Logo in navigation and footer use translations
- All banners and feature images support 4 languages
- Added proper error handling with placeholders"
```

---

## 实施注意事项

1. **图片文件准备**：确保所有图片文件按照命名规范（-zh/-en/-jp/-hk）准备好
2. **路径一致性**：确保 translations.ts 中的图片路径与实际文件路径一致
3. **测试覆盖**：每个任务完成后都要测试对应功能
4. **渐进式提交**：每个任务完成后立即提交，便于回滚
5. **错误处理**：所有图片都要添加 onerror 处理和占位符

---

**计划完成日期**: 待定  
**预计工作量**: 20 个任务，每个任务 5-15 分钟
