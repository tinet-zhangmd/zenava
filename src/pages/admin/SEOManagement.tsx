interface SEOItem {
  id: string
  page: string
  url: string
  title: { en: string; jp: string; hk: string }
  description: { en: string; jp: string; hk: string }
  keywords: { en: string; jp: string; hk: string }
  status: 'optimized' | 'needs_review' | 'missing'
  score: number
  lastUpdated: string
}

export function SEOManagement() {
  // Mock SEO data
  const seoItems: SEOItem[] = [
    {
      id: '1',
      page: 'Homepage',
      url: '/',
      title: {
        en: 'Zenava - AI-Powered Customer Engagement Solutions',
        jp: 'Zenava - AI駆動顧客エンゲージメントソリューション',
        hk: 'Zenava - AI 驅動客戶參與解決方案'
      },
      description: {
        en: 'Transform your enterprise with AI-powered customer engagement solutions.',
        jp: 'AI駆動の顧客エンゲージメントソリューションで企業を変革。',
        hk: '以AI驅動的客戶參與解決方案變革您的企業。'
      },
      keywords: {
        en: 'AI, customer engagement, automation, enterprise',
        jp: 'AI, 顧客エンゲージメント, 自動化, 企業',
        hk: 'AI, 客戶參與, 自動化, 企業'
      },
      status: 'optimized',
      score: 92,
      lastUpdated: '2024-01-15'
    },
    {
      id: '2',
      page: 'Marketing Scenario',
      url: '/scenarios/marketing',
      title: {
        en: 'AI Marketing Solutions - Zenava',
        jp: 'AIマーケティングソリューション - Zenava',
        hk: 'AI 營銷解決方案 - Zenava'
      },
      description: {
        en: 'Boost marketing ROI with AI-powered lead generation and customer engagement.',
        jp: 'AI駆動のリード生成と顧客エンゲージメントでマーケティングROIを向上。',
        hk: '通過AI驅動的潛客生成和客戶參與提升營銷投資回報率。'
      },
      keywords: {
        en: 'marketing automation, lead generation, AI marketing',
        jp: 'マーケティング自動化, リード生成, AIマーケティング',
        hk: '營銷自動化, 潛客開發, AI營銷'
      },
      status: 'needs_review',
      score: 78,
      lastUpdated: '2024-01-10'
    },
    {
      id: '3',
      page: 'Sales Scenario',
      url: '/scenarios/sales',
      title: {
        en: 'AI Sales Automation - Zenava',
        jp: 'AI営業自動化 - Zenava', 
        hk: 'AI 銷售自動化 - Zenava'
      },
      description: {
        en: '',
        jp: '',
        hk: ''
      },
      keywords: {
        en: 'sales automation, CRM, AI sales',
        jp: '営業自動化, CRM, AI営業',
        hk: '銷售自動化, CRM, AI銷售'
      },
      status: 'missing',
      score: 45,
      lastUpdated: '2024-01-05'
    }
  ]
  
  return (
    <div class="space-y-6">
      {/* Header */}
      <div class="flex justify-between items-center">
        <div>
          <h2 class="text-2xl font-bold text-gray-900">SEO Management</h2>
          <p class="text-gray-600">Optimize search engine rankings for all pages and languages</p>
        </div>
        <div class="flex space-x-3">
          <button class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            <i class="fas fa-download mr-2"></i>
            SEO Report
          </button>
          <button class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <i class="fas fa-plus mr-2"></i>
            Bulk SEO Update
          </button>
        </div>
      </div>
      
      {/* SEO Overview Cards */}
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div class="bg-white rounded-lg shadow-sm p-6 border">
          <div class="flex items-center">
            <div class="p-2 bg-green-100 rounded-lg">
              <i class="fas fa-check-circle text-green-600 text-xl"></i>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Optimized Pages</p>
              <p class="text-2xl font-semibold text-gray-900">8</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow-sm p-6 border">
          <div class="flex items-center">
            <div class="p-2 bg-yellow-100 rounded-lg">
              <i class="fas fa-exclamation-triangle text-yellow-600 text-xl"></i>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Needs Review</p>
              <p class="text-2xl font-semibold text-gray-900">3</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow-sm p-6 border">
          <div class="flex items-center">
            <div class="p-2 bg-red-100 rounded-lg">
              <i class="fas fa-times-circle text-red-600 text-xl"></i>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Missing SEO</p>
              <p class="text-2xl font-semibold text-gray-900">2</p>
            </div>
          </div>
        </div>
        
        <div class="bg-white rounded-lg shadow-sm p-6 border">
          <div class="flex items-center">
            <div class="p-2 bg-blue-100 rounded-lg">
              <i class="fas fa-chart-line text-blue-600 text-xl"></i>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-600">Average Score</p>
              <p class="text-2xl font-semibold text-gray-900">84</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* SEO Tools */}
      <div class="bg-white rounded-lg shadow-sm border p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">SEO Tools</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button class="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-left">
            <i class="fas fa-sitemap text-blue-600 text-xl mr-3"></i>
            <div>
              <p class="font-medium text-gray-900">Generate Sitemap</p>
              <p class="text-sm text-gray-600">Create XML sitemap for all languages</p>
            </div>
          </button>
          
          <button class="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors text-left">
            <i class="fas fa-robot text-green-600 text-xl mr-3"></i>
            <div>
              <p class="font-medium text-gray-900">Robots.txt</p>
              <p class="text-sm text-gray-600">Configure search engine crawling</p>
            </div>
          </button>
          
          <button class="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors text-left">
            <i class="fas fa-share-alt text-purple-600 text-xl mr-3"></i>
            <div>
              <p class="font-medium text-gray-900">Social Media Tags</p>
              <p class="text-sm text-gray-600">Manage Open Graph & Twitter Cards</p>
            </div>
          </button>
        </div>
      </div>
      
      {/* SEO Table */}
      <div class="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div class="p-6 border-b">
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-semibold text-gray-900">Page SEO Status</h3>
            <div class="flex space-x-2">
              <select class="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option>All Pages</option>
                <option>Optimized</option>
                <option>Needs Review</option>
                <option>Missing SEO</option>
              </select>
              <select class="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option>All Languages</option>
                <option>English</option>
                <option>Japanese</option>
                <option>Traditional Chinese</option>
              </select>
            </div>
          </div>
        </div>
        
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Page</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SEO Score</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title Optimization</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              {seoItems.map((item) => (
                <tr key={item.id} class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div class="text-sm font-medium text-gray-900">{item.page}</div>
                      <div class="text-sm text-gray-500">{item.url}</div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class={`w-16 h-2 rounded-full mr-2 ${
                        item.score >= 90 ? 'bg-green-200' :
                        item.score >= 70 ? 'bg-yellow-200' : 'bg-red-200'
                      }`}>
                        <div class={`h-2 rounded-full ${
                          item.score >= 90 ? 'bg-green-600' :
                          item.score >= 70 ? 'bg-yellow-600' : 'bg-red-600'
                        }`} style={`width: ${item.score}%`}></div>
                      </div>
                      <span class="text-sm font-medium text-gray-900">{item.score}</span>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      item.status === 'optimized' ? 'bg-green-100 text-green-800' :
                      item.status === 'needs_review' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {item.status === 'optimized' ? 'Optimized' :
                       item.status === 'needs_review' ? 'Needs Review' :
                       'Missing SEO'}
                    </span>
                  </td>
                  <td class="px-6 py-4">
                    <div class="space-y-1">
                      <div class="flex items-center text-xs">
                        <span class="w-6">🇺🇸</span>
                        <span class={`truncate max-w-xs ${item.title.en ? 'text-gray-900' : 'text-red-500'}`}>
                          {item.title.en || 'Missing title'}
                        </span>
                      </div>
                      <div class="flex items-center text-xs">
                        <span class="w-6">🇯🇵</span>
                        <span class={`truncate max-w-xs ${item.title.jp ? 'text-gray-900' : 'text-red-500'}`}>
                          {item.title.jp || 'Missing title'}
                        </span>
                      </div>
                      <div class="flex items-center text-xs">
                        <span class="w-6">🇭🇰</span>
                        <span class={`truncate max-w-xs ${item.title.hk ? 'text-gray-900' : 'text-red-500'}`}>
                          {item.title.hk || 'Missing title'}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <div class="space-y-1">
                      <div class="flex items-center text-xs">
                        <span class={`w-2 h-2 rounded-full mr-2 ${item.description.en ? 'bg-green-400' : 'bg-red-400'}`}></span>
                        <span class="text-gray-600">English</span>
                      </div>
                      <div class="flex items-center text-xs">
                        <span class={`w-2 h-2 rounded-full mr-2 ${item.description.jp ? 'bg-green-400' : 'bg-red-400'}`}></span>
                        <span class="text-gray-600">Japanese</span>
                      </div>
                      <div class="flex items-center text-xs">
                        <span class={`w-2 h-2 rounded-full mr-2 ${item.description.hk ? 'bg-green-400' : 'bg-red-400'}`}></span>
                        <span class="text-gray-600">Chinese</span>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.lastUpdated}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div class="flex space-x-2">
                      <a href={`/admin/seo/edit/${item.id}`} class="text-blue-600 hover:text-blue-900">
                        <i class="fas fa-edit"></i>
                      </a>
                      <button class="text-green-600 hover:text-green-900" onclick={`analyzeSEO('${item.id}')`}>
                        <i class="fas fa-search"></i>
                      </button>
                      <a href={item.url} target="_blank" class="text-purple-600 hover:text-purple-900">
                        <i class="fas fa-external-link-alt"></i>
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}