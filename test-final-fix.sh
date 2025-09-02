#!/bin/bash

echo "============================================="
echo "最终测试：管理后台Logo更新功能"
echo "============================================="
echo ""

# 生成测试标识
TIMESTAMP=$(date +%s)
TEST_ID="FINAL_TEST_${TIMESTAMP}"

echo "步骤 1: 创建测试Logo..."
convert -size 250x70 xc:'#10B981' \
  -fill white -font "DejaVu-Sans-Bold" -pointsize 30 \
  -gravity center -annotate +0-5 "$TEST_ID" \
  -fill '#D1FAE5' -font "DejaVu-Sans" -pointsize 12 \
  -gravity center -annotate +0+20 "Test Logo $TIMESTAMP" \
  "final-test-logo.png"
echo "✓ Logo创建成功"

echo ""
echo "步骤 2: 通过管理后台API上传Logo..."
UPLOAD_RESPONSE=$(curl -s -X POST http://localhost:3000/api/upload/image \
  -F "file=@final-test-logo.png")

LOGO_URL=$(echo "$UPLOAD_RESPONSE" | jq -r '.url')
if [ "$LOGO_URL" == "null" ] || [ -z "$LOGO_URL" ]; then
  echo "✗ 上传失败"
  echo "$UPLOAD_RESPONSE" | jq
  exit 1
fi
echo "✓ Logo上传成功"

echo ""
echo "步骤 3: 模拟点击'保存所有更改'按钮..."
# 模拟 CommonContentManagementV2 的 saveAllChanges 函数
for LANG in en jp hk; do
  echo "  - 保存 $LANG 版本..."
  
  # 保存导航配置
  NAV_RESPONSE=$(curl -s -X POST "http://localhost:3000/api/common-content/navigation?lang=$LANG" \
    -H "Content-Type: application/json" \
    -d "{
      \"logo_url\": \"$LOGO_URL\",
      \"logo_alt\": \"$TEST_ID\",
      \"status\": \"published\",
      \"language\": \"$LANG\"
    }")
  
  NAV_SUCCESS=$(echo "$NAV_RESPONSE" | jq -r '.success')
  if [ "$NAV_SUCCESS" != "true" ]; then
    echo "    ✗ 导航保存失败: $(echo "$NAV_RESPONSE" | jq -r '.error')"
  else
    echo "    ✓ 导航已保存"
  fi
  
  # 保存页脚配置
  FOOTER_RESPONSE=$(curl -s -X POST "http://localhost:3000/api/common-content/footer/config?lang=$LANG" \
    -H "Content-Type: application/json" \
    -d "{
      \"logo_url\": \"$LOGO_URL\",
      \"logo_alt\": \"$TEST_ID\",
      \"subtitle_text\": \"测试副标题 $TIMESTAMP\",
      \"copyright_text\": \"© 2025 测试 $TIMESTAMP\",
      \"status\": \"published\",
      \"language\": \"$LANG\"
    }")
  
  FOOTER_SUCCESS=$(echo "$FOOTER_RESPONSE" | jq -r '.success')
  if [ "$FOOTER_SUCCESS" != "true" ]; then
    echo "    ✗ 页脚保存失败: $(echo "$FOOTER_RESPONSE" | jq -r '.error')"
  else
    echo "    ✓ 页脚已保存"
  fi
done

echo ""
echo "步骤 4: 模拟点击'发布到生产'按钮..."
for LANG in en jp hk; do
  PUBLISH_RESPONSE=$(curl -s -X POST "http://localhost:3000/api/common-content/publish?lang=$LANG" \
    -H "Content-Type: application/json" \
    -d "{\"type\": \"all\", \"language\": \"$LANG\"}")
  
  PUBLISH_SUCCESS=$(echo "$PUBLISH_RESPONSE" | jq -r '.success')
  if [ "$PUBLISH_SUCCESS" == "true" ]; then
    echo "  ✓ $LANG 版本已发布"
  else
    echo "  ✗ $LANG 版本发布失败"
  fi
done

echo ""
echo "步骤 5: 验证更新结果..."
sleep 1

# 检查导航API
echo "  检查API响应..."
API_RESPONSE=$(curl -s http://localhost:3000/api/navigation/config)
API_ALT=$(echo "$API_RESPONSE" | jq -r '.config.logo_alt')
API_STATUS=$(echo "$API_RESPONSE" | jq -r '.config.status')

if [ "$API_ALT" == "$TEST_ID" ]; then
  echo "    ✓ Logo Alt文本正确: $API_ALT"
else
  echo "    ✗ Logo Alt文本错误: 期望 '$TEST_ID', 实际 '$API_ALT'"
fi

if [ "$API_STATUS" == "published" ]; then
  echo "    ✓ 状态正确: published"
else
  echo "    ✗ 状态错误: $API_STATUS (应该是 published)"
fi

# 检查数据库
echo "  检查数据库..."
DB_CHECK=$(npx wrangler d1 execute zenava-production --local \
  --command="SELECT logo_alt, status FROM navigation_config WHERE id = 1;" 2>/dev/null)

if echo "$DB_CHECK" | grep -q "$TEST_ID"; then
  echo "    ✓ 数据库Logo Alt正确"
else
  echo "    ✗ 数据库Logo Alt未更新"
fi

if echo "$DB_CHECK" | grep -q "published"; then
  echo "    ✓ 数据库状态为 published"
else
  echo "    ✗ 数据库状态不是 published"
fi

# 检查前端页面
echo "  检查前端页面..."
PAGE_HTML=$(curl -s http://localhost:3000/)

if echo "$PAGE_HTML" | grep -q "alt=\"$TEST_ID\""; then
  echo "    ✓ 前端页面显示新Logo"
else
  echo "    ✗ 前端页面未显示新Logo"
fi

# 检查各语言版本
echo "  检查多语言版本..."
for LANG_PATH in "" "/jp" "/hk"; do
  LANG_NAME=${LANG_PATH:-"/en"}
  LANG_PAGE=$(curl -s "http://localhost:3000$LANG_PATH")
  if echo "$LANG_PAGE" | grep -q "alt=\"$TEST_ID\""; then
    echo "    ✓ $LANG_NAME 页面已更新"
  else
    echo "    ✗ $LANG_NAME 页面未更新"
  fi
done

echo ""
echo "============================================="
echo "测试完成！"
echo ""
echo "测试标识: $TEST_ID"
echo "访问以下URL查看效果:"
echo "- 英文版: http://localhost:3000"
echo "- 日文版: http://localhost:3000/jp"
echo "- 中文版: http://localhost:3000/hk"
echo "- 管理后台: http://localhost:3000/admin/common-content"
echo "============================================="

# 清理
rm -f final-test-logo.png