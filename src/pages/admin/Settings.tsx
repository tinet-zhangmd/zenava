interface SettingsProps {
  // Settings specific props can be added here
}

export function Settings({}: SettingsProps) {
  return (
    <div class="space-y-6">
      {/* General Settings */}
      <div class="bg-white rounded-lg shadow-sm border">
        <div class="p-6 border-b">
          <h3 class="text-lg font-semibold text-gray-900">常规设置</h3>
          <p class="text-gray-600">网站的基本配置信息</p>
        </div>
        <div class="p-6">
          <div class="grid grid-cols-1 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">网站标题</label>
              <input 
                type="text" 
                value="Zenava - AI Agent for Enterprise Customer Dialogue Scenarios"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">网站描述</label>
              <textarea 
                rows={3}
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >Compared to traditional chatbots, Zenava has stronger conversational understanding and task execution capabilities, achieving transformation from 'answering' to 'doing', helping enterprises complete intelligent upgrades.</textarea>
            </div>
            
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">联系邮箱</label>
                <input 
                  type="email" 
                  value="contact@zenava.com"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">联系电话</label>
                <input 
                  type="tel" 
                  value="+86 400-123-4567"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div class="flex justify-end">
              <button class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                <i class="fas fa-save mr-2"></i>保存设置
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Language Settings */}
      <div class="bg-white rounded-lg shadow-sm border">
        <div class="p-6 border-b">
          <h3 class="text-lg font-semibold text-gray-900">语言设置</h3>
          <p class="text-gray-600">多语言配置和默认语言设置</p>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">默认语言</label>
              <select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="en">English (英语)</option>
                <option value="jp">日本語 (日语)</option>
                <option value="hk">繁體中文 (繁体中文)</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">启用的语言</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input type="checkbox" checked class="mr-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span class="text-sm">🇺🇸 English (英语)</span>
                </label>
                <label class="flex items-center">
                  <input type="checkbox" checked class="mr-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span class="text-sm">🇯🇵 日本語 (日语)</span>
                </label>
                <label class="flex items-center">
                  <input type="checkbox" checked class="mr-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span class="text-sm">🇭🇰 繁體中文 (繁体中文)</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SEO Settings */}
      <div class="bg-white rounded-lg shadow-sm border">
        <div class="p-6 border-b">
          <h3 class="text-lg font-semibold text-gray-900">SEO 设置</h3>
          <p class="text-gray-600">搜索引擎优化相关配置</p>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Google Analytics ID</label>
              <input 
                type="text" 
                placeholder="G-XXXXXXXXXX"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Google Search Console 验证代码</label>
              <input 
                type="text" 
                placeholder="google-site-verification=..."
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label class="flex items-center">
                <input type="checkbox" class="mr-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span class="text-sm">启用自动生成sitemap.xml</span>
              </label>
            </div>
            
            <div>
              <label class="flex items-center">
                <input type="checkbox" checked class="mr-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span class="text-sm">启用robots.txt</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Cache Settings */}
      <div class="bg-white rounded-lg shadow-sm border">
        <div class="p-6 border-b">
          <h3 class="text-lg font-semibold text-gray-900">缓存设置</h3>
          <p class="text-gray-600">网站缓存和性能配置</p>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div>
              <label class="flex items-center justify-between">
                <span class="text-sm font-medium text-gray-700">启用页面缓存</span>
                <input type="checkbox" checked class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              </label>
              <p class="text-xs text-gray-500 mt-1">缓存静态页面内容以提高加载速度</p>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">缓存过期时间 (小时)</label>
              <input 
                type="number" 
                value="24"
                min="1"
                max="168"
                class="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div class="flex space-x-4">
              <button class="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors">
                <i class="fas fa-sync mr-2"></i>清除缓存
              </button>
              <button class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                <i class="fas fa-rocket mr-2"></i>预热缓存
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}