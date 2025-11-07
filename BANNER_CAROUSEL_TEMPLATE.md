# 🎨 Banner 轮播系统配置模板

## 📋 目录
- [功能特性](#功能特性)
- [快速开始](#快速开始)
- [配置说明](#配置说明)
- [完整模板](#完整模板)
- [常见问题](#常见问题)

---

## ✨ 功能特性

✅ **自动翻页**：每隔10秒自动切换到下一页  
✅ **手动控制**：点击底部翻页指示器可直接跳转  
✅ **智能计时**：手动点击后重新开始10秒计时  
✅ **最多8页**：超过8个Banner时自动显示最新的8个  
✅ **单页优化**：只有1页时不显示翻页指示器，不自动播放  
✅ **多语言支持**：简体中文、英文、日文、繁体中文  
✅ **响应式设计**：自适应桌面端和移动端  
✅ **图片或组件**：支持显示图片或自定义组件  

---

## 🚀 快速开始

### 修改位置
- **文件路径**: `src/pages/HomepageDB.tsx`
- **代码行数**: 第 72-210 行左右
- **数据配置**: `const bannerSlides = [ ... ]`

### 修改步骤
1. 打开 `src/pages/HomepageDB.tsx` 文件
2. 找到 `const bannerSlides = [` 这一行
3. 按照下面的模板添加或修改Banner数据
4. 保存文件，Vite会自动热重载

---

## 📖 配置说明

### Banner 数据结构

每个Banner包含以下部分：

```typescript
{
  id: 'slide-X',           // 唯一标识符（必需）
  background: { ... },     // 背景配置
  leftContent: { ... },    // 左侧文字内容
  rightImage: { ... }      // 右侧图片或组件
}
```

---

### 1️⃣ 背景配置 (background)

```typescript
background: {
  gradient: 'from-white via-[#f0ebff] to-[#5E3AFC]',  // Tailwind CSS 渐变类名
  pattern: true                                        // 是否显示网格图案（true/false）
}
```

**常用渐变色组合**：
```typescript
// 紫色系（科技感）
'from-white via-[#f0ebff] to-[#5E3AFC]'

// 蓝紫粉系（梦幻感）
'from-blue-50 via-purple-50 to-pink-50'

// 绿蓝系（清新感）
'from-green-50 via-teal-50 to-blue-50'

// 橙黄系（温暖感）
'from-orange-50 via-yellow-50 to-amber-50'

// 深色系（专业感）
'from-gray-900 via-purple-900 to-blue-900'
```

**自定义颜色**：
```typescript
// 使用 Tailwind 任意值语法
'from-[#FF6B6B] via-[#4ECDC4] to-[#45B7D1]'
```

---

### 2️⃣ 左侧文字内容 (leftContent)

#### 2.1 官网名称 (siteName)
```typescript
siteName: {
  zh: 'ZENAVA',      // 简体中文
  en: 'ZENAVA',      // 英文
  jp: 'ZENAVA',      // 日文
  hk: 'ZENAVA'       // 繁体中文
}
```

#### 2.2 主标题 (mainTitle)
```typescript
mainTitle: {
  zh: '【简体中文标题】',
  en: '【AI自动生成】',   // 根据规则，AI会自动翻译
  jp: '【AI自动生成】',
  hk: '【AI自动生成】'
}
```

#### 2.3 概述 (description)
```typescript
description: {
  zh: '【简体中文描述，建议50-80字】',
  en: '【AI自动生成】',
  jp: '【AI自动生成】',
  hk: '【AI自动生成】'
}
```

#### 2.4 按钮 (button)
```typescript
button: {
  text: {
    zh: '预约咨询',           // 按钮文字
    en: 'Schedule Consultation',
    jp: '相談を予約',
    hk: '預約諮詢'
  },
  link: '#contact',           // 链接地址（内部链接或外部链接）
  icon: 'fas fa-phone'        // Font Awesome 图标类名
}
```

**常用按钮文字**：
- `预约咨询` / `Schedule Consultation`
- `了解更多` / `Learn More`
- `查看详情` / `View Details`
- `立即体验` / `Try Now`
- `免费试用` / `Start Free Trial`

**常用图标**：
```typescript
'fas fa-phone'          // 电话
'fas fa-arrow-right'    // 右箭头
'fas fa-rocket'         // 火箭
'fas fa-star'           // 星星
'fas fa-play'           // 播放
'fas fa-check'          // 勾选
'fas fa-download'       // 下载
```

---

### 3️⃣ 右侧图片或组件 (rightImage)

#### 选项1：显示图片
```typescript
rightImage: {
  type: 'image',                                    // 类型：图片
  src: '/assets/images/banner-1.png',               // 图片路径
  alt: {                                            // 图片描述（四种语言）
    zh: '横幅图片描述',
    en: 'Banner Image Description',
    jp: 'バナー画像の説明',
    hk: '橫幅圖片描述'
  }
}
```

**图片要求**：
- **推荐尺寸**: 宽度 800-1200px，高度 600-800px
- **推荐格式**: PNG（透明背景）、JPG、WebP
- **文件大小**: < 500KB（优化后）
- **长宽比**: 4:3 或 16:9

#### 选项2：显示组件（如AI对话模拟）
```typescript
rightImage: {
  type: 'component',                // 类型：组件
  component: 'ai-simulation'        // 组件标识符
}
```

---

## 📝 完整模板

### 模板1：左文右图（图片）

```typescript
{
  id: 'slide-1',
  
  // 背景配置
  background: {
    gradient: 'from-blue-50 via-purple-50 to-pink-50',
    pattern: false
  },
  
  // 左侧文字内容
  leftContent: {
    siteName: {
      zh: 'ZENAVA',
      en: 'ZENAVA',
      jp: 'ZENAVA',
      hk: 'ZENAVA'
    },
    mainTitle: {
      zh: '【您的主标题】',
      en: '【AI自动生成】',
      jp: '【AI自动生成】',
      hk: '【AI自动生成】'
    },
    description: {
      zh: '【您的描述文字，建议50-80字】',
      en: '【AI自动生成】',
      jp: '【AI自动生成】',
      hk: '【AI自动生成】'
    },
    button: {
      text: {
        zh: '了解更多',
        en: 'Learn More',
        jp: '詳細を見る',
        hk: '了解更多'
      },
      link: '/your-link',
      icon: 'fas fa-arrow-right'
    }
  },
  
  // 右侧图片
  rightImage: {
    type: 'image',
    src: '/assets/images/your-image.png',
    alt: {
      zh: '您的图片描述',
      en: 'Your Image Description',
      jp: '画像の説明',
      hk: '您的圖片描述'
    }
  }
}
```

### 模板2：左文右组件（AI对话模拟）

```typescript
{
  id: 'slide-2',
  
  background: {
    gradient: 'from-white via-[#f0ebff] to-[#5E3AFC]',
    pattern: true
  },
  
  leftContent: {
    siteName: {
      zh: 'ZENAVA',
      en: 'ZENAVA',
      jp: 'ZENAVA',
      hk: 'ZENAVA'
    },
    mainTitle: {
      zh: '【您的主标题】',
      en: '【AI自动生成】',
      jp: '【AI自动生成】',
      hk: '【AI自动生成】'
    },
    description: {
      zh: '【您的描述文字】',
      en: '【AI自动生成】',
      jp: '【AI自动生成】',
      hk: '【AI自动生成】'
    },
    button: {
      text: {
        zh: '预约咨询',
        en: 'Schedule Consultation',
        jp: '相談を予約',
        hk: '預約諮詢'
      },
      link: '#contact',
      icon: 'fas fa-phone'
    }
  },
  
  rightImage: {
    type: 'component',
    component: 'ai-simulation'
  }
}
```

---

## 🎯 实战示例

### 示例1：添加"智能营销"Banner

```typescript
// 在 bannerSlides 数组中添加：
{
  id: 'slide-marketing',
  background: {
    gradient: 'from-orange-50 via-pink-50 to-red-50',
    pattern: false
  },
  leftContent: {
    siteName: {
      zh: 'ZENAVA',
      en: 'ZENAVA',
      jp: 'ZENAVA',
      hk: 'ZENAVA'
    },
    mainTitle: {
      zh: '智能营销自动化',
      en: 'Intelligent Marketing Automation',
      jp: 'インテリジェントマーケティングオートメーション',
      hk: '智能營銷自動化'
    },
    description: {
      zh: '实时识别客户意图，智能分配高潜线索，基于会话分析优化营销策略',
      en: 'Real-time customer intent recognition, intelligent lead allocation, optimize marketing strategies based on conversation analysis',
      jp: 'リアルタイムで顧客の意図を認識し、スマートにリードを配分し、会話分析に基づいてマーケティング戦略を最適化',
      hk: '實時識別客戶意圖，智能分配高潛線索，基於會話分析優化營銷策略'
    },
    button: {
      text: {
        zh: '了解更多',
        en: 'Learn More',
        jp: '詳細を見る',
        hk: '了解更多'
      },
      link: '/scenarios/marketing',
      icon: 'fas fa-chart-line'
    }
  },
  rightImage: {
    type: 'image',
    src: '/assets/images/marketing-automation.png',
    alt: {
      zh: '营销自动化界面',
      en: 'Marketing Automation Interface',
      jp: 'マーケティングオートメーションインターフェース',
      hk: '營銷自動化界面'
    }
  }
}
```

### 示例2：修改现有Banner的背景色

**修改前**：
```typescript
background: {
  gradient: 'from-white via-[#f0ebff] to-[#5E3AFC]',
  pattern: true
}
```

**修改后**（改为绿色系）：
```typescript
background: {
  gradient: 'from-green-50 via-teal-50 to-blue-50',
  pattern: false
}
```

### 示例3：修改按钮文字和链接

**修改前**：
```typescript
button: {
  text: {
    zh: '预约咨询',
    en: 'Schedule Consultation',
    jp: '相談を予約',
    hk: '預約諮詢'
  },
  link: '#contact',
  icon: 'fas fa-phone'
}
```

**修改后**（改为"免费试用"）：
```typescript
button: {
  text: {
    zh: '免费试用',
    en: 'Start Free Trial',
    jp: '無料トライアル',
    hk: '免費試用'
  },
  link: '/free-trial',
  icon: 'fas fa-rocket'
}
```

---

## ❓ 常见问题

### Q1: 如何添加新的Banner？
**A**: 在 `bannerSlides` 数组末尾添加新对象，复制上面的模板，修改内容即可。

### Q2: 如何删除某个Banner？
**A**: 找到对应的 `{ id: 'slide-X', ... }` 对象，删除整个对象（包括大括号和逗号）。

### Q3: 如何修改翻页时间（默认10秒）？
**A**: 找到第 455 行左右的 `}, 10000);`，将 `10000` 改为其他值（单位：毫秒）。
例如：`5000` = 5秒，`15000` = 15秒。

### Q4: 只想显示1个Banner，不要自动翻页？
**A**: 删除其他Banner，只保留1个。系统会自动检测，不显示翻页指示器，不启动自动播放。

### Q5: 如何更改翻页指示器的颜色？
**A**: 找到第 393 行左右的 `bg-[#6438FF]`，改为其他颜色，如 `bg-blue-500`、`bg-red-500` 等。

### Q6: 图片不显示怎么办？
**A**: 检查：
1. 图片路径是否正确（相对于 `public/` 目录）
2. 图片文件是否存在
3. 文件名大小写是否匹配
4. 浏览器控制台是否有404错误

### Q7: 如何使用外部图片链接？
**A**: 直接使用完整URL，例如：
```typescript
src: 'https://example.com/images/banner.png'
```

### Q8: 移动端显示不正常？
**A**: 确保：
1. 图片使用响应式类名（已内置）
2. 文字长度适中（主标题 < 20字，描述 < 80字）
3. 在移动端测试（Chrome DevTools: Cmd/Ctrl+Shift+M）

### Q9: 如何禁用自动播放？
**A**: 方法1：只保留1个Banner（推荐）  
方法2：找到第 405 行，改为：
```typescript
const autoPlayEnabled = false;
```

### Q10: 如何修改翻页方向（改为从右到左）？
**A**: 找到第 440-443 行的 `nextSlide()` 函数，改为：
```typescript
function nextSlide() {
  const nextIndex = (currentSlide - 1 + totalSlides) % totalSlides;
  goToSlide(nextIndex);
}
```

---

## 🎨 配色推荐

### 商务专业风格
```typescript
'from-gray-50 via-blue-50 to-indigo-50'
'from-slate-100 via-gray-100 to-zinc-100'
```

### 科技未来风格
```typescript
'from-purple-900 via-blue-900 to-indigo-900'
'from-cyan-500 via-blue-500 to-purple-500'
```

### 清新自然风格
```typescript
'from-green-50 via-emerald-50 to-teal-50'
'from-lime-100 via-green-100 to-emerald-100'
```

### 温暖活力风格
```typescript
'from-orange-50 via-amber-50 to-yellow-50'
'from-red-100 via-orange-100 to-yellow-100'
```

### 梦幻浪漫风格
```typescript
'from-pink-50 via-purple-50 to-indigo-50'
'from-fuchsia-100 via-pink-100 to-rose-100'
```

---

## 📱 响应式测试清单

修改Banner后，必须测试：

✅ **桌面端**（1024px+）
- [ ] 左右布局正常
- [ ] 图片清晰不变形
- [ ] 文字大小合适
- [ ] 按钮可点击

✅ **平板端**（768px - 1023px）
- [ ] 布局自适应
- [ ] 图片不溢出
- [ ] 文字无换行异常

✅ **移动端**（< 768px）
- [ ] 上下堆叠布局
- [ ] 文字清晰可读
- [ ] 按钮大小足够（至少44px）
- [ ] 翻页指示器可点击

**测试方法**：
1. 打开 Chrome DevTools（F12 或 Cmd+Option+I）
2. 切换到设备模式（Cmd+Shift+M）
3. 选择不同设备尺寸测试

---

## 🛠️ 故障排除

### 问题1：翻页不工作
**可能原因**：
- JavaScript未正确加载
- 浏览器控制台有错误

**解决方案**：
1. 打开浏览器控制台（F12）
2. 查看是否有红色错误信息
3. 刷新页面（Cmd/Ctrl+R）

### 问题2：翻页指示器不显示
**可能原因**：
- 只有1个Banner（正常行为）
- CSS类名冲突

**解决方案**：
1. 确认 `bannerSlides` 数组有多个元素
2. 检查是否有自定义CSS覆盖了样式

### 问题3：图片加载慢
**解决方案**：
1. 压缩图片（使用 TinyPNG 等工具）
2. 使用 WebP 格式
3. 添加 `loading="lazy"` 属性（已内置）
4. 使用CDN托管图片

---

## 📞 技术支持

如有问题，请联系：
- 邮箱：marketing@zenava.ai
- 文档位置：`BANNER_CAROUSEL_TEMPLATE.md`
- 代码位置：`src/pages/HomepageDB.tsx` (第 72-478 行)

---

**最后更新**: 2025-11-07  
**版本**: v1.0.0  
**维护**: Zenava 开发团队

