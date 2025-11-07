# 版块3媒体类型自动识别功能说明

## ✅ 功能概述

版块3现在支持**图片和视频**两种媒体类型，AI 会根据用户提供的文件后缀名自动识别媒体类型。

**更新日期**: 2025年11月6日  
**规则文档**: `.cursor/rules/config.mdc` (第781-1103行)

---

## 🎬 媒体类型自动识别

### 识别逻辑

AI 会自动根据文件后缀名判断媒体类型：

| 后缀名 | 媒体类型 | 说明 |
|-----|----|---|
| `.png`, `.jpg`, `.jpeg` | 图片 | 常用图片格式 |
| `.gif`, `.webp`, `.svg` | 图片 | 动图和矢量图 |
| `.mp4`, `.webm`, `.ogg` | 视频 | Web 常用视频格式 |
| `.mov`, `.avi` | 视频 | 其他视频格式 |

### 自动识别代码

```typescript
const isVideo = /\.(mp4|webm|ogg|mov|avi)$/i.test(src);
const isImage = /\.(png|jpg|jpeg|gif|webp|svg)$/i.test(src);
```

---

## 📝 用户输入格式

### 图片示例

```
修改版块3第1项：
- 图标：fas fa-robot
- 标题：市场营销自动化
- 副标题：提升转化率，降低获客成本
- 描述：实时识别客户意图，统一话术留资，智能分配高潜线索。
- 标签：意图识别、智能留资、多渠道整合
- 按钮：了解更多市场营销
- 链接：/scenarios/marketing
- 媒体：/images/marketing-automation.png  ← AI 识别为图片
- 媒体描述：市场营销自动化界面展示
```

### 视频示例

```
修改版块3第2项：
- 图标：fas fa-headset
- 标题：7x24智能客服
- 副标题：全天候响应，零等待
- 描述：AI智能客服系统实现全天候服务，自动处理常见问题。
- 标签：智能应答、情感识别、多轮对话
- 按钮：了解更多客户服务
- 链接：/scenarios/customer-service
- 媒体：/videos/customer-service-demo.mp4  ← AI 识别为视频
- 媒体描述：智能客服对话演示视频
- 视频配置：自动播放、循环播放、静音
```

---

## 🎨 图片规范

### 推荐格式
- **PNG**: 透明背景，适合图标、截图
- **JPG/JPEG**: 照片、场景图
- **WebP**: 高压缩比，现代浏览器支持
- **GIF**: 简单动画
- **SVG**: 矢量图，支持无损缩放

### 尺寸要求
- **推荐宽度**: 800-1200px
- **推荐高度**: 600-800px
- **长宽比**: 4:3 或 16:9
- **文件大小**: < 500KB（优化后）

### 路径格式
```typescript
// ✅ 本地图片
'/images/marketing.png'
'/assets/images/product-screenshot.jpg'

// ✅ 外部图片（CDN）
'https://cdn.example.com/images/marketing.webp'

// ❌ 不推荐：相对路径
'../images/marketing.png'
```

### 内容建议
1. **产品界面截图** - 展示实际功能界面
2. **数据可视化** - 图表、仪表板、KPI展示
3. **使用场景插画** - 业务场景示意图
4. **3D渲染图** - 高端科技感视觉
5. **客户案例图** - 真实客户使用场景

---

## 🎥 视频规范

### 推荐格式
- **MP4 (H.264编码)**: 最佳兼容性
- **WebM**: 开源格式，Chrome/Firefox 支持
- **OGG**: 开源格式，较少使用

### 尺寸要求
- **推荐尺寸**: 1920x1080 (1080p) 或 1280x720 (720p)
- **长宽比**: 16:9
- **文件大小**: < 10MB（优化后）
- **时长**: 建议 15-60 秒

### 路径格式
```typescript
// ✅ 本地视频
'/videos/product-demo.mp4'
'/assets/videos/customer-service-intro.webm'

// ✅ 外部视频（CDN）
'https://cdn.example.com/videos/marketing-demo.mp4'

// ❌ 不推荐：相对路径
'../videos/demo.mp4'
```

### 视频配置选项

| 配置项 | 说明 | 默认值 | 用途 |
|--------|------|--------|------|
| 自动播放 | `autoplay` | `false` | 页面加载时自动播放 |
| 循环播放 | `loop` | `false` | 视频结束后重新播放 |
| 静音 | `muted` | `true` | 静音播放（自动播放时必须） |
| 显示控制条 | `controls` | `true` | 显示播放/暂停按钮 |

### 视频配置输入格式

```
- 视频配置：自动播放、循环播放、静音
```

AI 会自动解析为：
```typescript
{
  autoplay: true,
  loop: true,
  muted: true,
  controls: true  // 默认
}
```

### 内容建议
1. **产品演示** - 展示核心功能操作流程
2. **功能介绍** - 讲解产品特点和优势
3. **客户案例** - 真实客户使用视频
4. **动画效果** - 数据流转、系统架构可视化
5. **宣传片** - 品牌形象展示

---

## 🤖 AI 自动处理流程

当用户提供媒体文件时，AI 会自动：

1. ✅ **接收媒体文件路径** - 如 `/images/demo.png` 或 `/videos/intro.mp4`
2. 🔍 **识别文件后缀** - 提取 `.png` 或 `.mp4`
3. 📋 **判断媒体类型**:
   - 图片后缀 → 生成 `<img>` 标签
   - 视频后缀 → 生成 `<video>` 标签
4. 🎨 **生成对应代码**:
   - 图片：添加 `alt`、`loading="lazy"`
   - 视频：添加 `autoplay`、`loop`、`muted`、`controls`
5. 🌐 **生成四语言描述** - 自动翻译媒体描述（alt/title）
6. 💾 **插入到页面** - 更新 `HomepageDB.tsx`

---

## 💻 生成的代码对比

### 图片代码
```typescript
{/* 右侧：图片 */}
<div class="relative" data-animate="slide-up">
  <div class="rounded-xl overflow-hidden shadow-xl">
    <img 
      src="/images/marketing.png" 
      alt={
        language === 'zh' ? '市场营销界面' :
        language === 'en' ? 'Marketing Interface' :
        language === 'jp' ? 'マーケティングインターフェース' :
        '市場營銷界面'
      }
      class="w-full h-auto object-cover"
      loading="lazy"
    />
  </div>
</div>
```

### 视频代码
```typescript
{/* 右侧：视频 */}
<div class="relative" data-animate="slide-up">
  <div class="rounded-xl overflow-hidden shadow-xl">
    <video 
      src="/videos/demo.mp4"
      class="w-full h-auto"
      autoplay
      loop
      muted
      controls
      playsinline
    >
      <p>
        {language === 'zh' && '您的浏览器不支持视频播放'}
        {language === 'en' && 'Your browser does not support video playback'}
        {language === 'jp' && 'お使いのブラウザは動画再生に対応していません'}
        {language === 'hk' && '您的瀏覽器不支持視頻播放'}
      </p>
    </video>
  </div>
</div>
```

---

## 📊 媒体类型对比

| 特性 | 图片 | 视频 |
|------|------|------|
| 文件大小 | 较小 (< 500KB) | 较大 (< 10MB) |
| 加载速度 | 快 | 慢 |
| 交互性 | 静态 | 动态，可播放/暂停 |
| SEO | 需要 alt 文本 | 需要字幕/描述 |
| 适用场景 | 截图、图表、插画 | 演示、案例、动画 |
| 浏览器兼容 | 极好 | 好（需 fallback） |

---

## 🎯 使用建议

### 何时使用图片
- ✅ 产品界面截图
- ✅ 数据可视化图表
- ✅ 使用场景插画
- ✅ 简单的功能展示
- ✅ 需要快速加载的内容

### 何时使用视频
- ✅ 产品功能演示
- ✅ 复杂操作流程
- ✅ 客户案例故事
- ✅ 品牌宣传片
- ✅ 动态效果展示

### 混合使用策略
```
版块3 - 6个子项建议：
- 第1项：图片（营销界面截图）
- 第2项：视频（销售演示视频）
- 第3项：图片（客服数据面板）
- 第4项：视频（内部服务流程）
- 第5项：图片（管理报表截图）
- 第6项：图片（品牌安全示例）
```

---

## 🔧 视频优化技巧

### 1. 文件压缩
```bash
# 使用 FFmpeg 压缩视频
ffmpeg -i input.mp4 -c:v libx264 -crf 28 -c:a aac -b:a 128k output.mp4
```

### 2. 格式转换
```bash
# MP4 转 WebM
ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 30 output.webm
```

### 3. 生成封面图
```bash
# 提取第1秒作为封面
ffmpeg -i input.mp4 -ss 00:00:01 -vframes 1 poster.jpg
```

### 4. 添加封面（推荐）
```typescript
<video 
  src="/videos/demo.mp4"
  poster="/images/video-poster.jpg"  // 视频封面
  class="w-full h-auto"
  controls
>
</video>
```

---

## 📱 移动端适配

### 图片响应式
```typescript
<img 
  src="/images/marketing.png"
  srcset="
    /images/marketing-mobile.png 480w,
    /images/marketing-tablet.png 768w,
    /images/marketing-desktop.png 1200w
  "
  sizes="(max-width: 768px) 100vw, 50vw"
  class="w-full h-auto"
  loading="lazy"
/>
```

### 视频响应式
```typescript
<video 
  src="/videos/demo.mp4"
  class="w-full h-auto"
  playsinline  // iOS 内联播放（重要！）
  muted        // 移动端自动播放必须静音
  controls
>
</video>
```

### 移动端注意事项
- ⚠️ **iOS Safari**: 必须添加 `playsinline` 属性
- ⚠️ **自动播放**: 移动端必须 `muted=true`
- ⚠️ **文件大小**: 移动端建议 < 5MB
- ⚠️ **流量消耗**: 考虑用户流量，提供低分辨率版本

---

## ✅ 完整示例

### 示例1：图片子项（第1项）

**用户输入**:
```
修改版块3第1项：
- 图标：fas fa-robot
- 标题：AI驱动的营销自动化
- 副标题：智能获客，精准转化
- 描述：通过AI智能识别客户意图，自动生成个性化营销内容，实时优化投放策略。
- 标签：智能识别、实时优化、个性化
- 按钮：了解更多营销自动化
- 链接：/scenarios/marketing
- 媒体：/images/marketing-automation.png
- 媒体描述：营销自动化系统界面
```

**AI 生成**:
- ✅ 识别为图片（`.png` 后缀）
- ✅ 生成 `<img>` 标签
- ✅ 添加四语言 `alt` 属性
- ✅ 添加 `loading="lazy"` 懒加载

---

### 示例2：视频子项（第2项）

**用户输入**:
```
修改版块3第2项：
- 图标：fas fa-video
- 标题：产品功能演示
- 副标题：一分钟了解核心功能
- 描述：通过视频演示快速了解产品核心功能和使用场景，直观展示业务价值。
- 标签：功能演示、快速上手、场景展示
- 按钮：观看完整演示
- 链接：/videos/full-demo
- 媒体：/videos/product-demo.mp4
- 媒体描述：产品功能演示视频
- 视频配置：自动播放、循环播放、静音
```

**AI 生成**:
- ✅ 识别为视频（`.mp4` 后缀）
- ✅ 生成 `<video>` 标签
- ✅ 添加 `autoplay`、`loop`、`muted`
- ✅ 添加四语言不支持提示
- ✅ 添加 `playsinline` 移动端支持

---

## 🚀 测试清单

### 图片测试
- [ ] 图片正常加载显示
- [ ] 图片尺寸适配容器
- [ ] 图片不变形
- [ ] 移动端响应式正常
- [ ] alt 文字正确显示（四语言）
- [ ] 懒加载生效

### 视频测试
- [ ] 视频正常加载播放
- [ ] 播放控制条正常
- [ ] 自动播放配置生效
- [ ] 循环播放配置生效
- [ ] 静音配置生效
- [ ] 移动端内联播放正常（iOS）
- [ ] 视频不超出容器
- [ ] 不支持提示正常显示（四语言）

---

## 📁 相关文档

- **规则文档**: `.cursor/rules/config.mdc` (第781-1103行)
- **按钮规则**: `SECTION3_BUTTON_RULES.md`
- **媒体识别**: `SECTION3_MEDIA_AUTO_DETECT.md` (本文件)
- **完整示例**: `SECTION3_BUTTONS_UPDATE.md`

---

## 💡 常见问题

### Q1: 如何知道AI会识别为图片还是视频？
**A**: 看文件后缀名。`.png`、`.jpg` 等是图片，`.mp4`、`.webm` 等是视频。

### Q2: 可以使用 GIF 动图吗？
**A**: 可以。GIF 会被识别为图片类型，使用 `<img>` 标签。

### Q3: 视频必须配置自动播放吗？
**A**: 不必须。如果不提供"视频配置"，使用默认值（不自动播放，显示控制条）。

### Q4: 可以使用外部视频链接（如 YouTube）吗？
**A**: 可以使用自己 CDN 上的视频文件，但不支持 YouTube 嵌入。如需 YouTube，使用 iframe。

### Q5: 视频太大加载慢怎么办？
**A**: 
1. 压缩视频文件（使用 FFmpeg）
2. 降低分辨率（720p 即可）
3. 使用 CDN 加速
4. 添加封面图（poster）

---

**更新完成时间**: 2025年11月6日  
**规则状态**: ✅ 已更新  
**文档状态**: ✅ 已完成

