#!/bin/bash

echo "==========================================="
echo "测试管理后台Logo更新流程"
echo "==========================================="
echo ""

# 生成唯一的测试标识
TIMESTAMP=$(date +%s)
TEST_ALT="TEST_LOGO_${TIMESTAMP}"

echo "1. 创建测试PNG Logo..."
convert -size 200x60 xc:'#10B981' \
  -fill white -font "DejaVu-Sans-Bold" -pointsize 28 \
  -gravity center -annotate +0+0 "TEST ${TIMESTAMP}" \
  "test-logo-${TIMESTAMP}.png"
echo "   ✓ 创建成功: test-logo-${TIMESTAMP}.png"

echo ""
echo "2. 通过API上传Logo..."
UPLOAD_RESPONSE=$(curl -s -X POST http://localhost:3000/api/upload/image \
  -F "file=@test-logo-${TIMESTAMP}.png")

if [ $? -ne 0 ]; then
  echo "   ✗ 上传失败"
  exit 1
fi

LOGO_URL=$(echo "$UPLOAD_RESPONSE" | jq -r '.url')
if [ "$LOGO_URL" == "null" ]; then
  echo "   ✗ 上传失败: $(echo "$UPLOAD_RESPONSE" | jq -r '.error')"
  exit 1
fi
echo "   ✓ 上传成功"

echo ""
echo "3. 保存导航栏配置..."
NAV_RESPONSE=$(curl -s -X POST http://localhost:3000/api/common-content/navigation \
  -H "Content-Type: application/json" \
  -d "{
    \"logo_url\": \"$LOGO_URL\",
    \"logo_alt\": \"$TEST_ALT\",
    \"status\": \"published\"
  }")

NAV_SUCCESS=$(echo "$NAV_RESPONSE" | jq -r '.success')
if [ "$NAV_SUCCESS" != "true" ]; then
  echo "   ✗ 保存失败: $(echo "$NAV_RESPONSE" | jq -r '.error')"
  exit 1
fi
echo "   ✓ 导航栏配置已保存"

echo ""
echo "4. 保存页脚配置..."
FOOTER_RESPONSE=$(curl -s -X POST http://localhost:3000/api/common-content/footer/config \
  -H "Content-Type: application/json" \
  -d "{
    \"logo_url\": \"$LOGO_URL\",
    \"logo_alt\": \"$TEST_ALT\",
    \"subtitle_text\": \"测试副标题 ${TIMESTAMP}\",
    \"copyright_text\": \"© 2025 测试版权 ${TIMESTAMP}\",
    \"status\": \"published\"
  }")

FOOTER_SUCCESS=$(echo "$FOOTER_RESPONSE" | jq -r '.success')
if [ "$FOOTER_SUCCESS" != "true" ]; then
  echo "   ✗ 保存失败: $(echo "$FOOTER_RESPONSE" | jq -r '.error')"
  exit 1
fi
echo "   ✓ 页脚配置已保存"

echo ""
echo "5. 发布内容..."
PUBLISH_RESPONSE=$(curl -s -X POST http://localhost:3000/api/common-content/publish \
  -H "Content-Type: application/json" \
  -d "{\"type\": \"all\"}")

PUBLISH_SUCCESS=$(echo "$PUBLISH_RESPONSE" | jq -r '.success')
if [ "$PUBLISH_SUCCESS" != "true" ]; then
  echo "   ✗ 发布失败: $(echo "$PUBLISH_RESPONSE" | jq -r '.error')"
  exit 1
fi
echo "   ✓ 内容已发布"

echo ""
echo "6. 验证前端页面..."
sleep 1  # 等待一秒让服务处理请求

# 检查导航栏logo
NAV_CHECK=$(curl -s http://localhost:3000/ | grep -c "alt=\"$TEST_ALT\"")
if [ $NAV_CHECK -gt 0 ]; then
  echo "   ✓ 导航栏Logo已更新"
else
  echo "   ✗ 导航栏Logo未更新"
fi

# 检查API返回
API_ALT=$(curl -s http://localhost:3000/api/navigation/config | jq -r '.config.logo_alt')
if [ "$API_ALT" == "$TEST_ALT" ]; then
  echo "   ✓ API返回正确的Logo配置"
else
  echo "   ✗ API返回的Logo配置不正确: $API_ALT"
fi

# 检查数据库
DB_ALT=$(npx wrangler d1 execute zenava-production --local --command="SELECT logo_alt FROM navigation_config WHERE id = 1;" 2>/dev/null | grep -o "\"$TEST_ALT\"" | head -1)
if [ ! -z "$DB_ALT" ]; then
  echo "   ✓ 数据库已更新"
else
  echo "   ✗ 数据库未更新"
fi

echo ""
echo "==========================================="
echo "测试完成！"
echo ""
echo "总结："
echo "- Logo文件: test-logo-${TIMESTAMP}.png"
echo "- Alt文本: $TEST_ALT"
echo "- 如需查看效果，请访问: http://localhost:3000"
echo "- 管理后台: http://localhost:3000/admin/common-content"
echo "==========================================="

# 清理测试文件
rm -f "test-logo-${TIMESTAMP}.png"