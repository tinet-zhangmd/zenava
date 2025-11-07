# 🚀 Banner轮播 - 快速修改指南

## 📍 修改位置
**文件**: `src/pages/HomepageDB.tsx`  
**代码行**: 第 72-210 行  
**数据配置**: `const bannerSlides = [ ... ]`

---

## ⚡ 快速模板（复制粘贴直接用）

### 模板1：左文右图 + 图片

```typescript
{
  id: 'slide-X',  // ← 改成唯一ID，如 slide-4
  background: {
    gradient: 'from-blue-50 via-purple-50 to-pink-50',  // ← 改背景色
    pattern: false
  },
  leftContent: {
    siteName: { zh: 'ZENAVA', en: 'ZENAVA', jp: 'ZENAVA', hk: 'ZENAVA' },
    mainTitle: {
      zh: '【改成您的标题】',  // ← 只需改简体中文，其他AI自动翻译
      en: 'Your Title in English',
      jp: 'Your Title in Japanese',
      hk: '【改成您的標題】'
    },
    description: {
      zh: '【改成您的描述文字】',  // ← 只需改简体中文
      en: 'Your description in English',
      jp: 'Your description in Japanese',
      hk: '【改成您的描述文字】'
    },
    button: {
      text: { zh: '了解更多', en: 'Learn More', jp: '詳細を見る', hk: '了解更多' },
      link: '/your-page',  // ← 改链接
      icon: 'fas fa-arrow-right'  // ← 改图标
    }
  },
  rightImage: {
    type: 'image',
    src: '/assets/images/your-image.png',  // ← 改图片路径
    alt: { zh: '图片描述', en: 'Image description', jp: '画像の説明', hk: '圖片描述' }
  }
}
```

### 模板2：左文右组件（AI对话）

```typescript
{
  id: 'slide-X',
  background: {
    gradient: 'from-white via-[#f0ebff] to-[#5E3AFC]',
    pattern: true  // ← 显示网格图案
  },
  leftContent: {
    siteName: { zh: 'ZENAVA', en: 'ZENAVA', jp: 'ZENAVA', hk: 'ZENAVA' },
    mainTitle: {
      zh: '【改成您的标题】',
      en: 'Your Title',
      jp: 'Your Title',
      hk: '【改成您的標題】'
    },
    description: {
      zh: '【改成您的描述】',
      en: 'Your description',
      jp: 'Your description',
      hk: '【改成您的描述】'
    },
    button: {
      text: { zh: '预约咨询', en: 'Schedule', jp: '相談予約', hk: '預約諮詢' },
      link: '#contact',
      icon: 'fas fa-phone'
    }
  },
  rightImage: {
    type: 'component',  // ← 显示AI对话模拟组件
    component: 'ai-simulation'
  }
}
```

---

## 🎨 常用配色（直接复制）

```typescript
// 科技紫（现有默认）
gradient: 'from-white via-[#f0ebff] to-[#5E3AFC]'

// 清新蓝绿
gradient: 'from-green-50 via-teal-50 to-blue-50'

// 梦幻粉紫
gradient: 'from-blue-50 via-purple-50 to-pink-50'

// 温暖橙黄
gradient: 'from-orange-50 via-yellow-50 to-amber-50'

// 商务灰蓝
gradient: 'from-gray-50 via-blue-50 to-indigo-50'
```

---

## 🔧 常用按钮配置

```typescript
// 预约咨询
button: {
  text: { zh: '预约咨询', en: 'Schedule Consultation', jp: '相談を予約', hk: '預約諮詢' },
  link: '#contact',
  icon: 'fas fa-phone'
}

// 了解更多
button: {
  text: { zh: '了解更多', en: 'Learn More', jp: '詳細を見る', hk: '了解更多' },
  link: '/your-page',
  icon: 'fas fa-arrow-right'
}

// 免费试用
button: {
  text: { zh: '免费试用', en: 'Start Free Trial', jp: '無料トライアル', hk: '免費試用' },
  link: '/trial',
  icon: 'fas fa-rocket'
}

// 立即体验
button: {
  text: { zh: '立即体验', en: 'Try Now', jp: '今すぐ体験', hk: '立即體驗' },
  link: '/demo',
  icon: 'fas fa-play'
}
```

---

## 📌 常用图标（Font Awesome）

```typescript
icon: 'fas fa-phone'          // 电话
icon: 'fas fa-arrow-right'    // 右箭头
icon: 'fas fa-rocket'         // 火箭
icon: 'fas fa-play'           // 播放
icon: 'fas fa-check'          // 勾选
icon: 'fas fa-star'           // 星星
icon: 'fas fa-chart-line'     // 图表
icon: 'fas fa-headset'        // 耳机
icon: 'fas fa-download'       // 下载
icon: 'fas fa-briefcase'      // 公文包
```

完整图标库: https://fontawesome.com/icons

---

## 📝 修改步骤（3步搞定）

### 步骤1: 打开文件
```bash
# VS Code
code src/pages/HomepageDB.tsx

# 或直接在编辑器中打开
src/pages/HomepageDB.tsx
```

### 步骤2: 找到配置区域
按 `Cmd/Ctrl + F` 搜索：`const bannerSlides =`

### 步骤3: 修改或添加
- **修改现有Banner**: 直接改 `zh` (简体中文) 字段的内容
- **添加新Banner**: 复制上面的模板，粘贴到数组末尾，修改内容
- **删除Banner**: 删除整个 `{ id: '...', ... }` 对象

---

## ✅ 修改检查清单

修改后检查：
- [ ] 保存文件（Cmd/Ctrl + S）
- [ ] 浏览器自动刷新（Vite热重载）
- [ ] 查看Banner是否正常显示
- [ ] 点击翻页指示器测试手动切换
- [ ] 等待10秒测试自动翻页
- [ ] 切换到移动端视图测试响应式（Cmd/Ctrl + Shift + M）

---

## 🐛 常见问题（1秒解决）

**Q: 图片不显示？**  
A: 检查路径是否以 `/assets/` 或 `/images/` 开头

**Q: 翻页不工作？**  
A: 刷新页面（Cmd/Ctrl + R）

**Q: 只想要1个Banner？**  
A: 删除其他Banner，只保留1个（自动不显示翻页）

**Q: 改10秒时间？**  
A: 搜索 `10000`，改成其他值（单位：毫秒）

**Q: 如何禁用网格图案？**  
A: 改 `pattern: false`

---

## 📞 需要帮助？

完整文档: `BANNER_CAROUSEL_TEMPLATE.md`  
技术支持: marketing@zenava.ai

---

**提示**: 按照项目规则，您只需提供**简体中文**文案，AI会自动生成英文、日文、繁体中文翻译！

