#!/bin/bash

echo "================================================"
echo "修复管理后台数据持久化问题"
echo "================================================"
echo ""

echo "1. 清理并重置数据库状态..."
npx wrangler d1 execute zenava-production --local \
  --command="DELETE FROM navigation_config WHERE id != 1;" 2>/dev/null

echo "2. 创建新的测试Logo..."
convert -size 250x70 xc:'#4F46E5' \
  -fill white -font "DejaVu-Sans-Bold" -pointsize 32 \
  -gravity center -annotate +0+0 "FIXED" \
  fixed-logo.png

echo "3. 上传Logo..."
UPLOAD_RESPONSE=$(curl -s -X POST http://localhost:3000/api/upload/image \
  -F "file=@fixed-logo.png")

LOGO_URL=$(echo "$UPLOAD_RESPONSE" | jq -r '.url')
echo "   Logo已上传"

echo "4. 直接更新数据库..."
# 使用 SQL 直接更新，避免 API 层的问题
SQL_CMD="UPDATE navigation_config SET 
  logo_url = '$LOGO_URL',
  logo_alt = 'FIXED LOGO',
  status = 'published',
  updated_at = CURRENT_TIMESTAMP
WHERE id = 1;"

npx wrangler d1 execute zenava-production --local \
  --command="$SQL_CMD" 2>/dev/null

echo "5. 验证更新..."
echo "   通过 API 检查："
API_CHECK=$(curl -s "http://localhost:3000/api/common-content/navigation?lang=en")
API_ALT=$(echo "$API_CHECK" | jq -r '.data.logo_alt')
echo "   - API 返回 logo_alt: $API_ALT"

echo "   通过数据库检查："
DB_CHECK=$(npx wrangler d1 execute zenava-production --local \
  --command="SELECT logo_alt, status FROM navigation_config WHERE id = 1;" 2>/dev/null)
echo "$DB_CHECK" | grep -o "FIXED LOGO" > /dev/null
if [ $? -eq 0 ]; then
  echo "   - 数据库已更新: FIXED LOGO"
else
  echo "   - 数据库未更新"
fi

echo "6. 检查前端显示..."
PAGE_CHECK=$(curl -s http://localhost:3000/)
echo "$PAGE_CHECK" | grep -o "FIXED LOGO" > /dev/null
if [ $? -eq 0 ]; then
  echo "   - 前端页面已更新"
else
  echo "   - 前端页面未更新"
fi

echo ""
echo "================================================"
echo "测试完成！"
echo "访问以下地址查看："
echo "- 前端: http://localhost:3000"
echo "- 管理后台: http://localhost:3000/admin/common-content"
echo "================================================"

# 清理
rm -f fixed-logo.png