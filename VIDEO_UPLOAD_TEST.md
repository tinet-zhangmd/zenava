# 视频上传和播放功能测试指南

## 🎬 功能说明

在内容编辑页面上传视频后，可以立即预览播放视频。

## ✅ 已优化的功能

### 1. 视频格式支持
- **MP4** ✅ 最推荐（H.264 编码最佳兼容性）
- **WebM** ✅ 现代浏览器支持
- **MOV** ⚠️ 部分浏览器支持
- **AVI** ⚠️ 需要特定编解码器
- **WMV** ⚠️ 浏览器支持有限

### 2. 视频属性
```html
<video 
  controls          <!-- 显示播放控制 -->
  preload="auto"    <!-- 自动预加载 -->
  playsinline       <!-- iOS 内联播放 -->
  muted            <!-- 静音（避免自动播放限制）-->
>
```

### 3. 增强功能
- ✅ 自动检测视频尺寸和时长
- ✅ 显示视频详细信息（文件名、大小、尺寸、时长）
- ✅ 错误处理和提示
- ✅ 内存管理（自动释放 Blob URL）

## 🔧 测试步骤

### 步骤 1: 准备测试视频
建议使用 **MP4 格式**的视频进行测试：
```bash
# 如果有 ffmpeg，可以转换视频为 MP4
ffmpeg -i input.mov -c:v libx264 -c:a aac output.mp4
```

### 步骤 2: 测试上传
1. 访问内容管理后台
2. 点击"发布文章"
3. 选择视频类型的栏目（category_template = list_video）
4. 上传视频字段会自动显示
5. 点击"选择视频"上传

### 步骤 3: 测试播放
1. 视频选择后应立即显示
2. 点击播放按钮测试
3. 检查视频信息是否正确显示

## 🐛 常见问题

### Q1: 视频无法播放
**可能原因：**
- 视频编码格式不支持
- 文件损坏
- 浏览器不支持该格式

**解决方案：**
1. 转换为 MP4 (H.264 + AAC)
2. 使用较新的浏览器
3. 检查浏览器控制台错误信息

### Q2: 视频显示黑屏
**可能原因：**
- 视频正在加载
- 编码问题
- MIME 类型不匹配

**解决方案：**
1. 等待加载完成
2. 检查文件完整性
3. 查看控制台日志

### Q3: 文件上传失败
**可能原因：**
- 文件超过 100MB 限制
- 网络问题
- 服务器存储空间不足

**解决方案：**
1. 压缩视频文件
2. 检查网络连接
3. 查看服务器日志

## 📊 推荐的视频规格

### Web 使用最佳实践
```
格式: MP4
视频编码: H.264 (x264)
音频编码: AAC
分辨率: 1280x720 (720p) 或 1920x1080 (1080p)
比特率: 2-5 Mbps
帧率: 25-30 fps
文件大小: < 50MB (推荐)
```

### 转换命令示例
```bash
# 使用 ffmpeg 转换为 Web 友好格式
ffmpeg -i input.video \
  -c:v libx264 -preset slow -crf 22 \
  -c:a aac -b:a 128k \
  -movflags +faststart \
  output.mp4
```

## 🔍 调试信息

### 浏览器控制台输出
上传视频时，控制台会显示：
```
视频已选择: example.mp4 (15.23 MB) MIME: video/mp4
视频时长: 2:35
视频尺寸: 1920x1080
```

### 检查视频信息
```javascript
// 在浏览器控制台执行
const video = document.getElementById('video-preview');
console.log('可播放:', video.readyState >= 3);
console.log('时长:', video.duration);
console.log('尺寸:', video.videoWidth, 'x', video.videoHeight);
```

## 🚀 优化建议

1. **使用 MP4 格式** - 最佳兼容性
2. **保持文件较小** - 加快上传和加载
3. **使用现代编码器** - H.264/H.265
4. **添加 faststart 标志** - 允许边下载边播放
5. **测试多个浏览器** - 确保兼容性

## 📝 技术细节

### Blob URL
```javascript
// 创建临时预览 URL
const videoURL = URL.createObjectURL(file);

// 使用完后释放内存
URL.revokeObjectURL(videoURL);
```

### 视频元数据
```javascript
video.onloadedmetadata = function() {
  console.log('时长:', video.duration);
  console.log('尺寸:', video.videoWidth, video.videoHeight);
};
```

## ✨ 下一步

如果视频仍然无法播放，请：
1. 查看浏览器控制台的错误信息
2. 尝试不同格式的视频文件
3. 确认浏览器版本是否支持
4. 检查视频文件是否损坏

---

最后更新: 2024-12-05

