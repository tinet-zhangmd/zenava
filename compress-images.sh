#!/bin/bash
# 图片压缩脚本 - 多个方案可选

echo "=== 图片压缩方案 ==="
echo ""
echo "方案 1: 不缩放，只转换格式（保留原始分辨率，质量最高）"
echo "方案 2: 缩放至 2560px（适合高分辨率屏幕，质量较高）"
echo "方案 3: 缩放至 1920px（标准网页尺寸，平衡质量和大小）"
echo "方案 4: 缩放至 1600px（更小文件，适合移动端）"
echo ""
read -p "请选择方案 (1-4): " choice

case $choice in
  1)
    echo "执行方案 1: 不缩放，只转换格式..."
    npx sharp public/assets/images/ai-agents/banner.png --quality 80 public/assets/images/ai-agents/banner.webp
    npx sharp public/assets/images/ai-agents/person.png --quality 80 public/assets/images/ai-agents/person.webp
    npx sharp public/assets/images/ai-agents/voice.png --quality 80 public/assets/images/ai-agents/voice.webp
    npx sharp public/assets/images/livechat/banner.png --quality 80 public/assets/images/livechat/banner.webp
    ;;
  2)
    echo "执行方案 2: 缩放至 2560px..."
    npx sharp public/assets/images/ai-agents/banner.png --resize 2560 --quality 75 public/assets/images/ai-agents/banner.webp
    npx sharp public/assets/images/ai-agents/person.png --resize 2560 --quality 75 public/assets/images/ai-agents/person.webp
    npx sharp public/assets/images/ai-agents/voice.png --resize 2000 --quality 75 public/assets/images/ai-agents/voice.webp
    npx sharp public/assets/images/livechat/banner.png --resize 2560 --quality 75 public/assets/images/livechat/banner.webp
    ;;
  3)
    echo "执行方案 3: 缩放至 1920px（推荐）..."
    npx sharp public/assets/images/ai-agents/banner.png --resize 1920 --quality 75 public/assets/images/ai-agents/banner.webp
    npx sharp public/assets/images/ai-agents/person.png --resize 1600 --quality 75 public/assets/images/ai-agents/person.webp
    npx sharp public/assets/images/ai-agents/voice.png --resize 1200 --quality 75 public/assets/images/ai-agents/voice.webp
    npx sharp public/assets/images/livechat/banner.png --resize 1920 --quality 75 public/assets/images/livechat/banner.webp
    ;;
  4)
    echo "执行方案 4: 缩放至 1600px..."
    npx sharp public/assets/images/ai-agents/banner.png --resize 1600 --quality 70 public/assets/images/ai-agents/banner.webp
    npx sharp public/assets/images/ai-agents/person.png --resize 1400 --quality 70 public/assets/images/ai-agents/person.webp
    npx sharp public/assets/images/ai-agents/voice.png --resize 1000 --quality 70 public/assets/images/ai-agents/voice.webp
    npx sharp public/assets/images/livechat/banner.png --resize 1600 --quality 70 public/assets/images/livechat/banner.webp
    ;;
  *)
    echo "无效选择"
    exit 1
    ;;
esac

echo ""
echo "✅ 压缩完成！"
echo ""
echo "文件大小对比："
ls -lh public/assets/images/ai-agents/*.webp public/assets/images/livechat/banner.webp 2>/dev/null | awk '{print $5, $9}'

