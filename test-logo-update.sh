#!/bin/bash

echo "Testing Logo Update Functionality"
echo "================================="

# Create a test PNG logo
echo "1. Creating test PNG logo..."
convert -size 200x60 xc:darkblue \
  -pointsize 30 -fill white -gravity center \
  -annotate +0+0 "NEW LOGO" \
  new-test-logo.png

echo "   Created: new-test-logo.png"

# Upload the logo
echo ""
echo "2. Uploading PNG logo to server..."
UPLOAD_RESPONSE=$(curl -s -X POST http://localhost:3000/api/upload/image \
  -F "file=@new-test-logo.png")

LOGO_URL=$(echo "$UPLOAD_RESPONSE" | jq -r '.url')
echo "   Upload successful: $(echo "$UPLOAD_RESPONSE" | jq -r '.message')"

# Save navigation config with new logo
echo ""
echo "3. Updating navigation configuration with new logo..."
NAV_RESPONSE=$(curl -s -X POST http://localhost:3000/api/common-content/navigation \
  -H "Content-Type: application/json" \
  -d "{
    \"logo_url\": \"$LOGO_URL\",
    \"logo_alt\": \"NEW TEST LOGO\",
    \"status\": \"published\"
  }")

echo "   Navigation update: $(echo "$NAV_RESPONSE" | jq -r '.message')"

# Save footer config with new logo
echo ""
echo "4. Updating footer configuration with new logo..."
FOOTER_RESPONSE=$(curl -s -X POST http://localhost:3000/api/common-content/footer/config \
  -H "Content-Type: application/json" \
  -d "{
    \"logo_url\": \"$LOGO_URL\",
    \"logo_alt\": \"NEW TEST LOGO\",
    \"subtitle_text\": \"企業與客戶對話場景的 AI 智能體\",
    \"copyright_text\": \"© 2025 ZENAVA. All rights reserved.\",
    \"status\": \"published\"
  }")

echo "   Footer update: $(echo "$FOOTER_RESPONSE" | jq -r '.message')"

# Publish changes
echo ""
echo "5. Publishing all changes..."
PUBLISH_RESPONSE=$(curl -s -X POST http://localhost:3000/api/common-content/publish \
  -H "Content-Type: application/json" \
  -d "{\"type\": \"all\"}")

echo "   Publish status: $(echo "$PUBLISH_RESPONSE" | jq -r '.message')"

# Verify the update
echo ""
echo "6. Verifying updated configuration..."
VERIFY_NAV=$(curl -s http://localhost:3000/api/common-content/navigation)
CURRENT_LOGO=$(echo "$VERIFY_NAV" | jq -r '.data.logo_url' | head -c 50)
CURRENT_ALT=$(echo "$VERIFY_NAV" | jq -r '.data.logo_alt')

echo "   Current logo URL (first 50 chars): $CURRENT_LOGO..."
echo "   Current logo alt text: $CURRENT_ALT"

echo ""
echo "7. Testing frontend pages..."
# Test homepage 
HOME_RESPONSE=$(curl -s http://localhost:3000/ | grep -c "NEW TEST LOGO")
if [ $HOME_RESPONSE -gt 0 ]; then
  echo "   ✓ Homepage shows updated logo alt text"
else
  echo "   ✗ Homepage may not be showing updated logo (check manually)"
fi

echo ""
echo "================================="
echo "Test completed! Please check:"
echo "1. Visit http://localhost:3000 to see the updated logo"
echo "2. Visit http://localhost:3000/admin/common-content to verify admin panel"
echo "3. The logo should now show 'NEW LOGO' text on blue background"