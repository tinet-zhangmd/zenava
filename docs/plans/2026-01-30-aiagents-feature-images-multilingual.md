# AiAgents 功能演示图多语言支持实施计划

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 为 AiAgents 页面的功能演示图（person.webp 和 voice.webp）添加多语言支持，将硬编码的静态路径替换为从 translations.ts 动态获取的多语言路径。

**Architecture:** 在 translations.ts 的四个语言对象（zh/en/jp/hk）中为 `aiAgents.features.messaging` 和 `aiAgents.features.voice` 添加 `image` 配置对象，包含 `src` 和 `alt` 字段。在 AiAgents.tsx 中将硬编码路径替换为动态路径，并添加图片加载失败处理。

**Tech Stack:** TypeScript, Hono JSX, translations.ts

---

## Task 1: 添加英文（en）语言的功能演示图配置

**Files:**
- Modify: `src/i18n/translations.ts:816-840`

**Step 1: 在 en 语言对象的 voice 配置中添加 image 字段**

在 `siteTranslations.en.products.aiAgents.features.voice` 对象中，在 `button` 字段之后添加：

```typescript
voice: {
  label: 'Voice Agents',
  title: 'Beyond Human Voice Conversation Experience',
  subtitle: '',
  list: [
    'Human-like Timbre: Voice rich with emotion and expressiveness, delivering communication experiences that surpass real humans',
    'Low-latency Interaction: Fast response, real-time conversation without lag',
    'Precise Intelligent Interruption: Can interrupt and interject at any time, as natural as face-to-face conversation with real people',
    'Complete Business Loop, Significantly Improving Service Efficiency and Customer Experience'
  ],
  button: 'Learn More About Voice Agents',
  image: {
    src: '/assets/images/ai-agents/voice-en.webp',
    alt: 'Voice Feature Demo - Beyond Human Voice Conversation Experience'
  }
},
```

**Step 2: 在 en 语言对象的 messaging 配置中添加 image 字段**

在 `siteTranslations.en.products.aiAgents.features.messaging` 对象中，在 `button` 字段之后添加：

```typescript
messaging: {
  label: 'Live Chat',
  title: 'Create Ultimate Customer Service Experience',
  subtitle: '',
  list: [
    '7x24 hours omnichannel online, never miss any communication with customers',
    'Support rich media communication including text, images, and videos, accurately identifying customer intent',
    'Able to sense customer emotions from expressions and respond in a friendly and respectful manner',
    'Create ultimate customer service experience, flexibly meeting customer needs',
    'Possess empathy and judgment, driving complete business process loop'
  ],
  button: 'Learn More About Live Chat',
  image: {
    src: '/assets/images/ai-agents/person-en.webp',
    alt: 'Instant Messaging Feature Demo - Create Ultimate Customer Service Experience'
  }
},
```

**Step 3: 验证 TypeScript 语法**

Run: `cd /Users/zhangmd/Desktop/zenava\ 2/webapp && npm run build 2>&1 | head -30`
Expected: Build succeeds without TypeScript errors

---

## Task 2: 添加日文（jp）语言的功能演示图配置

**Files:**
- Modify: `src/i18n/translations.ts:1985-2009`

**Step 1: 在 jp 语言对象的 voice 配置中添加 image 字段**

在 `siteTranslations.jp.products.aiAgents.features.voice` 对象中，在 `button` 字段之后添加：

```typescript
voice: {
  label: 'Voice Agents',
  title: '人間を超える音声対話体験',
  subtitle: '',
  list: [
    '人間のような声色：感情と表現力に富んだ声で、人間を超えるコミュニケーション体験を提供',
    '低遅延インタラクション：迅速な応答、リアルタイム対話でラグなし',
    '精密なインテリジェント割り込み：いつでも割り込みや発言が可能で、人間との対面会話のように自然',
    '完全なビジネスループ、サービス効率と顧客体験を大幅に向上'
  ],
  button: 'Voice Agents機能の詳細',
  image: {
    src: '/assets/images/ai-agents/voice-jp.webp',
    alt: 'Voice機能デモ - 人間を超える音声対話体験'
  }
},
```

**Step 2: 在 jp 语言对象的 messaging 配置中添加 image 字段**

在 `siteTranslations.jp.products.aiAgents.features.messaging` 对象中，在 `button` 字段之后添加：

```typescript
messaging: {
  label: 'Live Chat',
  title: '究極のカスタマーサービス体験を創出',
  subtitle: '',
  list: [
    '7x24時間オムニチャネルオンライン、お客様とのすべてのコミュニケーションを見逃さない',
    'テキスト、画像、動画などのリッチメディアコミュニケーションをサポートし、お客様の意図を正確に識別',
    '表現からお客様の感情を感知し、友好的で尊重ある方法で応答',
    '究極のカスタマーサービス体験を創出し、柔軟にお客様のニーズに対応',
    '共感力と判断力を備え、完全なビジネスプロセスループを推進'
  ],
  button: 'Live Chat機能の詳細',
  image: {
    src: '/assets/images/ai-agents/person-jp.webp',
    alt: 'インスタントメッセージ機能デモ - 究極のカスタマーサービス体験を創出'
  }
},
```

**Step 3: 验证 TypeScript 语法**

Run: `cd /Users/zhangmd/Desktop/zenava\ 2/webapp && npm run build 2>&1 | head -30`
Expected: Build succeeds without TypeScript errors

---

## Task 3: 添加繁体中文（hk）语言的功能演示图配置

**Files:**
- Modify: `src/i18n/translations.ts:3155-3179`

**Step 2: 在 hk 语言对象的 voice 配置中添加 image 字段**

在 `siteTranslations.hk.products.aiAgents.features.voice` 对象中，在 `button` 字段之后添加：

```typescript
voice: {
  label: 'Voice Agents',
  title: '超越真人的語音對話體驗',
  subtitle: '',
  list: [
    '擬人化音色：聲音富有情緒與表達力，溝通體驗超越真人',
    '低延遲交互：快速響應，實時對話無卡頓',
    '精準智能打斷：可隨時打斷和插話，像真人面對面聊天那樣自然',
    '完整業務閉環，大幅提升服務效率與客戶體驗'
  ],
  button: '了解更多Voice Agents功能',
  image: {
    src: '/assets/images/ai-agents/voice-hk.webp',
    alt: 'Voice功能演示圖 - 超越真人的語音對話體驗'
  }
},
```

**Step 3: 在 hk 语言对象的 messaging 配置中添加 image 字段**

在 `siteTranslations.hk.products.aiAgents.features.messaging` 对象中，在 `button` 字段之后添加：

```typescript
messaging: {
  label: 'Live Chat',
  title: '打造極致客戶服務體驗',
  subtitle: '',
  list: [
    '7x24小時全渠道在線，不錯失與客戶的每一次溝通',
    '支持文字、圖片、視頻等富媒體溝通，精準識別客戶意圖',
    '能夠從表述中感知客戶情緒，以友好、尊重的方式回應',
    '打造極致客戶服務體驗，靈活滿足客戶訴求',
    '具備同理心與判斷力，驅動業務全流程閉環'
  ],
  button: '了解更多Live Chat功能',
  image: {
    src: '/assets/images/ai-agents/person-hk.webp',
    alt: '即時對話功能演示圖 - 打造極致客戶服務體驗'
  }
},
```

**Step 4: 验证 TypeScript 语法**

Run: `cd /Users/zhangmd/Desktop/zenava\ 2/webapp && npm run build 2>&1 | head -30`
Expected: Build succeeds without TypeScript errors

---

## Task 4: 添加简体中文（zh）语言的功能演示图配置

**Files:**
- Modify: `src/i18n/translations.ts:4374-4397`

**Step 1: 在 zh 语言对象的 voice 配置中添加 image 字段**

在 `siteTranslations.zh.products.aiAgents.features.voice` 对象中，在 `button` 字段之后添加：

```typescript
voice: {
  label: 'Voice Agents',
  title: '超越真人的语音对话体验',
  subtitle: '',
  list: [
    '拟人化音色：声音富有情绪与表达力，沟通体验超越真人',
    '低延迟交互：快速响应，实时对话无卡顿',
    '精准智能打断：可随时打断和插话，像真人面对面聊天那样自然',
    '完整业务闭环，大幅提升服务效率与客户体验'
  ],
  button: '了解更多Voice Agents功能',
  image: {
    src: '/assets/images/ai-agents/voice.webp',
    alt: 'Voice功能演示图 - 超越真人的语音对话体验'
  }
},
```

**Step 2: 在 zh 语言对象的 messaging 配置中添加 image 字段**

在 `siteTranslations.zh.products.aiAgents.features.messaging` 对象中，在 `button` 字段之后添加：

```typescript
messaging: {
  label: 'Live Chat',
  title: '打造极致客户服务体验',
  subtitle: '',
  list: [
    '7x24小时全渠道在线，不错失与客户的每一次沟通',
    '支持文字、图片、视频等富媒体沟通，精准识别客户意图',
    '能够从表述中感知客户情绪，以友好、尊重的方式回应',
    '打造极致客户服务体验，灵活满足客户诉求',
    '具备同理心与判断力，驱动业务全流程闭环'
  ],
  button: '了解更多Live Chat功能',
  image: {
    src: '/assets/images/ai-agents/person.webp',
    alt: '即时对话功能演示图 - 打造极致客户服务体验'
  }
},
```

**Step 3: 验证 TypeScript 语法**

Run: `cd /Users/zhangmd/Desktop/zenava\ 2/webapp && npm run build 2>&1 | head -30`
Expected: Build succeeds without TypeScript errors

---

## Task 5: 更新 AiAgents.tsx 使用多语言 Messaging 图片

**Files:**
- Modify: `src/pages/products/AiAgents.tsx:120-129`

**Step 1: 替换硬编码的图片路径和 alt 文本**

将第 120-129 行的代码：

```typescript
<div class="rounded-xl overflow-hidden">
  <div class="aspect-[4/3] flex items-center justify-center">
    <img 
      src="/assets/images/ai-agents/person.webp" 
      alt="即时对话功能演示图 - 打造极致客户服务体验"
      loading="lazy"
      decoding="async"
      class="w-full h-full object-contain"
    />
  </div>
</div>
```

替换为：

```typescript
<div class="rounded-xl overflow-hidden">
  <div class="aspect-[4/3] flex items-center justify-center relative">
    <img 
      src={t.features.messaging.image.src}
      alt={t.features.messaging.image.alt}
      loading="lazy"
      decoding="async"
      class="w-full h-full object-contain"
      onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
    />
    {/* 占位符（图片加载失败时显示） */}
    <div class="hidden w-full h-full items-center justify-center bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 absolute inset-0">
      <div class="text-center">
        <i class="fas fa-image text-4xl md:text-5xl text-gray-400 mb-3"></i>
        <p class="text-sm md:text-base text-gray-500">{trans.common.noImage}</p>
      </div>
    </div>
  </div>
</div>
```

**Step 2: 验证 TypeScript 语法**

Run: `cd /Users/zhangmd/Desktop/zenava\ 2/webapp && npm run build 2>&1 | head -30`
Expected: Build succeeds without TypeScript errors

---

## Task 6: 更新 AiAgents.tsx 使用多语言 Voice 图片

**Files:**
- Modify: `src/pages/products/AiAgents.tsx:217-228`

**Step 1: 替换硬编码的图片路径和 alt 文本**

将第 217-228 行的代码：

```typescript
<div class="rounded-xl overflow-hidden order-1 lg:order-2">
  <div class="aspect-[4/3] flex items-center justify-center">
    <img 
      src="/assets/images/ai-agents/voice.webp" 
      alt="Voice功能演示图 - 超越真人的语音对话体验"
      loading="lazy"
      decoding="async"
      class="w-full h-full object-contain"
    />
  </div>
</div>
```

替换为：

```typescript
<div class="rounded-xl overflow-hidden order-1 lg:order-2">
  <div class="aspect-[4/3] flex items-center justify-center relative">
    <img 
      src={t.features.voice.image.src}
      alt={t.features.voice.image.alt}
      loading="lazy"
      decoding="async"
      class="w-full h-full object-contain"
      onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
    />
    {/* 占位符（图片加载失败时显示） */}
    <div class="hidden w-full h-full items-center justify-center bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 absolute inset-0">
      <div class="text-center">
        <i class="fas fa-image text-4xl md:text-5xl text-gray-400 mb-3"></i>
        <p class="text-sm md:text-base text-gray-500">{trans.common.noImage}</p>
      </div>
    </div>
  </div>
</div>
```

**Step 2: 验证 TypeScript 语法**

Run: `cd /Users/zhangmd/Desktop/zenava\ 2/webapp && npm run build 2>&1 | head -30`
Expected: Build succeeds without TypeScript errors

---

## Task 7: 最终验证和测试

**Files:**
- Test: `src/pages/products/AiAgents.tsx`
- Test: `src/i18n/translations.ts`

**Step 1: 验证所有语言对象的配置完整性**

Run: `grep -A 2 "image:" src/i18n/translations.ts | grep -E "(src|alt)" | head -16`
Expected: 看到 16 行输出（4个语言 × 2个功能 × 2个字段）

**Step 2: 验证构建成功**

Run: `cd /Users/zhangmd/Desktop/zenava\ 2/webapp && npm run build`
Expected: Build completes successfully without errors

**Step 3: 检查 AiAgents.tsx 中是否还有硬编码路径**

Run: `grep -n "assets/images/ai-agents" src/pages/products/AiAgents.tsx`
Expected: 没有输出（所有硬编码路径已替换）

**Step 4: 验证图片路径格式正确**

Run: `grep "person\|voice" src/i18n/translations.ts | grep "src:" | head -8`
Expected: 
- zh: `person.webp`, `voice.webp` (无后缀)
- en: `person-en.webp`, `voice-en.webp`
- jp: `person-jp.webp`, `voice-jp.webp`
- hk: `person-hk.webp`, `voice-hk.webp`

---

## 实施注意事项

1. **图片文件准备**：确保所有图片文件按照命名规范准备好（简体无后缀，其他语言使用 -en/-jp/-hk 后缀）
2. **降级策略**：如果多语言版本的图片文件不存在，translations.ts 中该语言的图片路径应使用简体中文版本（无后缀）作为回退
3. **代码审核**：所有代码更改完成后，由用户审核后自行提交，不自动提交
4. **错误处理**：所有图片都已添加 onerror 处理和占位符

---

**计划完成日期**: 待定  
**预计工作量**: 7 个任务，每个任务 5-10 分钟
