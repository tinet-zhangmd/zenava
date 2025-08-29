interface TranslationKey {
  key: string
  category: string
  values: { en: string; jp: string; hk: string }
  lastModified: string
  status: 'complete' | 'partial' | 'missing'
}

export function I18nManagement() {
  // Mock translation data
  const translationKeys: TranslationKey[] = [
    {
      key: 'nav.home',
      category: 'Navigation',
      values: { en: 'Home', jp: 'ホーム', hk: '首頁' },
      lastModified: '2024-01-15',
      status: 'complete'
    },
    {
      key: 'nav.scenarios',
      category: 'Navigation',
      values: { en: 'Scenarios', jp: 'シナリオ', hk: '場景' },
      lastModified: '2024-01-15',
      status: 'complete'
    },
    {
      key: 'hero.title',
      category: 'Homepage',
      values: { en: 'Zenava', jp: 'Zenava', hk: 'Zenava' },
      lastModified: '2024-01-10',
      status: 'complete'
    },
    {
      key: 'hero.subtitle',
      category: 'Homepage',
      values: { 
        en: 'AI-Powered Customer Engagement Solutions for Enterprise',
        jp: '企業向けAI駆動顧客エンゲージメントソリューション',
        hk: '企業級 AI 驅動客戶參與解決方案'
      },
      lastModified: '2024-01-14',
      status: 'complete'
    },
    {
      key: 'features.new_feature',
      category: 'Features',
      values: { en: 'New Feature Coming Soon', jp: '', hk: '即將推出新功能' },
      lastModified: '2024-01-12',
      status: 'partial'
    }
  ]
  
  const categories = Array.from(new Set(translationKeys.map(k => k.category)))
  
  return (
    <div class="space-y-6">
      {/* Header */}
      <div class="flex justify-between items-center">
        <div>
          <h2 class="text-2xl font-bold text-gray-900">Multi-language Management</h2>
          <p class="text-gray-600">Manage translations for all supported languages</p>
        </div>
        <div class="flex space-x-3">
          <button class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            <i class="fas fa-upload mr-2"></i>
            Import Translations
          </button>
          <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <i class="fas fa-download mr-2"></i>
            Export Translations
          </button>
          <button class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
            <i class="fas fa-plus mr-2"></i>
            Add Translation Key
          </button>
        </div>
      </div>
      
      {/* Language Status Cards */}
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white rounded-lg shadow-sm p-6 border">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <span class="text-2xl mr-3">🇺🇸</span>
              <div>
                <h3 class="text-lg font-semibold text-gray-900">English</h3>
                <p class="text-sm text-gray-600">Base Language</p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-2xl font-bold text-green-600">100%</p>
              <p class="text-sm text-gray-500">Complete</p>
            </div>
          </div>
          <div class="mt-4">
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-green-600 h-2 rounded-full" style="width: 100%"></div>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow-sm p-6 border">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <span class="text-2xl mr-3">🇯🇵</span>
              <div>
                <h3 class="text-lg font-semibold text-gray-900">Japanese</h3>
                <p class="text-sm text-gray-600">日本語</p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-2xl font-bold text-yellow-600">85%</p>
              <p class="text-sm text-gray-500">In Progress</p>
            </div>
          </div>
          <div class="mt-4">
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-yellow-600 h-2 rounded-full" style="width: 85%"></div>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow-sm p-6 border">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <span class="text-2xl mr-3">🇭🇰</span>
              <div>
                <h3 class="text-lg font-semibold text-gray-900">Traditional Chinese</h3>
                <p class="text-sm text-gray-600">繁體中文</p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-2xl font-bold text-blue-600">92%</p>
              <p class="text-sm text-gray-500">Nearly Complete</p>
            </div>
          </div>
          <div class="mt-4">
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-blue-600 h-2 rounded-full" style="width: 92%"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Translation Tools */}
      <div class="bg-white rounded-lg shadow-sm border p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Translation Tools</h3>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button class="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-left">
            <i class="fas fa-robot text-blue-600 text-xl mr-3"></i>
            <div>
              <p class="font-medium text-gray-900">Auto Translate</p>
              <p class="text-sm text-gray-600">AI-powered translation</p>
            </div>
          </button>
          
          <button class="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors text-left">
            <i class="fas fa-spell-check text-green-600 text-xl mr-3"></i>
            <div>
              <p class="font-medium text-gray-900">Translation Review</p>
              <p class="text-sm text-gray-600">Quality assurance</p>
            </div>
          </button>
          
          <button class="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors text-left">
            <i class="fas fa-sync text-purple-600 text-xl mr-3"></i>
            <div>
              <p class="font-medium text-gray-900">Sync Languages</p>
              <p class="text-sm text-gray-600">Keep translations in sync</p>
            </div>
          </button>
          
          <button class="flex items-center p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors text-left">
            <i class="fas fa-search text-yellow-600 text-xl mr-3"></i>
            <div>
              <p class="font-medium text-gray-900">Find Missing</p>
              <p class="text-sm text-gray-600">Detect untranslated keys</p>
            </div>
          </button>
        </div>
      </div>
      
      {/* Filters */}
      <div class="bg-white rounded-lg shadow-sm border p-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Search Keys</label>
            <div class="relative">
              <input 
                type="text" 
                placeholder="Search translation keys..."
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <i class="fas fa-search absolute left-3 top-3 text-gray-400"></i>
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">All Status</option>
              <option value="complete">Complete</option>
              <option value="partial">Partial</option>
              <option value="missing">Missing</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Language</label>
            <select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">All Languages</option>
              <option value="en">English</option>
              <option value="jp">Japanese</option>
              <option value="hk">Traditional Chinese</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Translation Editor */}
      <div class="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div class="p-6 border-b">
          <h3 class="text-lg font-semibold text-gray-900">Translation Keys</h3>
          <p class="text-gray-600">Edit translations for all supported languages</p>
        </div>
        
        <div class="divide-y divide-gray-200">
          {translationKeys.map((item) => (
            <div key={item.key} class="p-6 hover:bg-gray-50">
              <div class="flex justify-between items-start mb-4">
                <div class="flex-1">
                  <div class="flex items-center space-x-3 mb-2">
                    <h4 class="text-sm font-medium text-gray-900 font-mono">{item.key}</h4>
                    <span class="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">{item.category}</span>
                    <span class={`px-2 py-1 text-xs rounded-full ${
                      item.status === 'complete' ? 'bg-green-100 text-green-800' :
                      item.status === 'partial' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  <p class="text-sm text-gray-500">Last modified: {item.lastModified}</p>
                </div>
                <div class="flex space-x-2">
                  <button class="text-blue-600 hover:text-blue-800 text-sm">
                    <i class="fas fa-save mr-1"></i>Save
                  </button>
                  <button class="text-gray-600 hover:text-gray-800 text-sm">
                    <i class="fas fa-undo mr-1"></i>Reset
                  </button>
                  <button class="text-red-600 hover:text-red-800 text-sm">
                    <i class="fas fa-trash mr-1"></i>Delete
                  </button>
                </div>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">🇺🇸 English</label>
                  <textarea 
                    rows={3}
                    value={item.values.en}
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="English translation"
                  ></textarea>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">🇯🇵 Japanese</label>
                  <textarea 
                    rows={3}
                    value={item.values.jp}
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="日本語翻訳"
                  ></textarea>
                  {!item.values.jp && (
                    <button class="mt-1 text-xs text-blue-600 hover:text-blue-800">
                      <i class="fas fa-robot mr-1"></i>Auto translate
                    </button>
                  )}
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">🇭🇰 Traditional Chinese</label>
                  <textarea 
                    rows={3}
                    value={item.values.hk}
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="繁體中文翻譯"
                  ></textarea>
                  {!item.values.hk && (
                    <button class="mt-1 text-xs text-blue-600 hover:text-blue-800">
                      <i class="fas fa-robot mr-1"></i>Auto translate
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Add New Translation Key */}
        <div class="p-6 border-t bg-gray-50">
          <button class="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors">
            <i class="fas fa-plus mr-2"></i>
            Add New Translation Key
          </button>
        </div>
      </div>
    </div>
  )
}