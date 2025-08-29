interface ContentEditorProps {
  contentId?: string
  mode: 'create' | 'edit'
}

interface ContentData {
  id: string
  title: string
  slug: string
  type: 'page' | 'post' | 'component'
  status: 'published' | 'draft' | 'archived'
  content: {
    en: string
    jp: string
    hk: string
  }
  seo: {
    title: { en: string; jp: string; hk: string }
    description: { en: string; jp: string; hk: string }
    keywords: { en: string; jp: string; hk: string }
  }
}

export function ContentEditor({ contentId, mode }: ContentEditorProps) {
  // Mock data - in real app this would come from database
  const contentData: ContentData = {
    id: contentId || '',
    title: mode === 'create' ? '' : 'Homepage',
    slug: mode === 'create' ? '' : '/',
    type: 'page',
    status: 'draft',
    content: {
      en: '<h1>Welcome to Zenava</h1><p>AI-Powered Customer Engagement Solutions for Enterprise</p>',
      jp: '<h1>Zenavaへようこそ</h1><p>企業向けAI駆動顧客エンゲージメントソリューション</p>',
      hk: '<h1>歡迎使用 Zenava</h1><p>企業級 AI 驅動客戶參與解決方案</p>'
    },
    seo: {
      title: {
        en: 'Zenava - AI-Powered Customer Engagement Solutions',
        jp: 'Zenava - AI駆動顧客エンゲージメントソリューション',
        hk: 'Zenava - AI 驅動客戶參與解決方案'
      },
      description: {
        en: 'Transform your enterprise with AI-powered customer engagement solutions. Zenava delivers intelligent automation for marketing, sales, and customer service.',
        jp: 'AI駆動の顧客エンゲージメントソリューションで企業を変革。Zenavaはマーケティング、営業、カスタマーサービスのインテリジェント自動化を提供します。',
        hk: '以AI驅動的客戶參與解決方案變革您的企業。Zenava為營銷、銷售和客戶服務提供智能自動化。'
      },
      keywords: {
        en: 'AI, customer engagement, automation, enterprise, marketing, sales, customer service',
        jp: 'AI, 顧客エンゲージメント, 自動化, 企業, マーケティング, 営業, カスタマーサービス',
        hk: 'AI, 客戶參與, 自動化, 企業, 營銷, 銷售, 客戶服務'
      }
    }
  }
  
  return (
    <div class="space-y-6">
      {/* Header */}
      <div class="flex justify-between items-center">
        <div>
          <h2 class="text-2xl font-bold text-gray-900">
            {mode === 'create' ? 'Create New Content' : `Edit: ${contentData.title}`}
          </h2>
          <p class="text-gray-600">
            {mode === 'create' ? 'Create a new page or content item' : 'Edit existing content and manage translations'}
          </p>
        </div>
        <div class="flex space-x-3">
          <a href="/admin/content" class="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
            <i class="fas fa-times mr-2"></i>Cancel
          </a>
          <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <i class="fas fa-save mr-2"></i>
            {mode === 'create' ? 'Create' : 'Save Changes'}
          </button>
        </div>
      </div>
      
      <form class="space-y-6">
        {/* Basic Information */}
        <div class="bg-white rounded-lg shadow-sm border p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input 
                type="text" 
                value={contentData.title}
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter content title"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Slug</label>
              <input 
                type="text" 
                value={contentData.slug}
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="/page-url"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Content Type</label>
              <select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="page">Page</option>
                <option value="post">Post</option>
                <option value="component">Component</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Multi-language Content Tabs */}
        <div class="bg-white rounded-lg shadow-sm border">
          <div class="border-b">
            <div class="p-6 pb-0">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Content & Translations</h3>
              <div class="flex space-x-4">
                <button type="button" class="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-medium active-tab" onclick="showTab('en')">
                  🇺🇸 English
                </button>
                <button type="button" class="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium" onclick="showTab('jp')">
                  🇯🇵 Japanese
                </button>
                <button type="button" class="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium" onclick="showTab('hk')">
                  🇭🇰 Traditional Chinese
                </button>
              </div>
            </div>
          </div>
          
          <div class="p-6">
            {/* English Content */}
            <div id="tab-en" class="content-tab">
              <label class="block text-sm font-medium text-gray-700 mb-2">English Content</label>
              <div id="editor-en" class="quill-editor" style="height: 400px;">
                {contentData.content.en}
              </div>
            </div>
            
            {/* Japanese Content */}
            <div id="tab-jp" class="content-tab hidden">
              <label class="block text-sm font-medium text-gray-700 mb-2">Japanese Content</label>
              <div id="editor-jp" class="quill-editor" style="height: 400px;">
                {contentData.content.jp}
              </div>
            </div>
            
            {/* Traditional Chinese Content */}
            <div id="tab-hk" class="content-tab hidden">
              <label class="block text-sm font-medium text-gray-700 mb-2">Traditional Chinese Content</label>
              <div id="editor-hk" class="quill-editor" style="height: 400px;">
                {contentData.content.hk}
              </div>
            </div>
          </div>
        </div>
        
        {/* SEO Settings */}
        <div class="bg-white rounded-lg shadow-sm border">
          <div class="border-b">
            <div class="p-6 pb-0">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">SEO Settings</h3>
              <div class="flex space-x-4">
                <button type="button" class="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-medium active-seo-tab" onclick="showSeoTab('en')">
                  🇺🇸 English SEO
                </button>
                <button type="button" class="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium" onclick="showSeoTab('jp')">
                  🇯🇵 Japanese SEO
                </button>
                <button type="button" class="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium" onclick="showSeoTab('hk')">
                  🇭🇰 Traditional Chinese SEO
                </button>
              </div>
            </div>
          </div>
          
          <div class="p-6">
            {/* English SEO */}
            <div id="seo-tab-en" class="seo-tab space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">SEO Title (English)</label>
                <input 
                  type="text" 
                  value={contentData.seo.title.en}
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="SEO optimized title"
                />
                <p class="text-xs text-gray-500 mt-1">60 characters recommended</p>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Meta Description (English)</label>
                <textarea 
                  rows={3}
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Brief description for search engines"
                >{contentData.seo.description.en}</textarea>
                <p class="text-xs text-gray-500 mt-1">160 characters recommended</p>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Keywords (English)</label>
                <input 
                  type="text" 
                  value={contentData.seo.keywords.en}
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="keyword1, keyword2, keyword3"
                />
                <p class="text-xs text-gray-500 mt-1">Separate keywords with commas</p>
              </div>
            </div>
            
            {/* Japanese SEO */}
            <div id="seo-tab-jp" class="seo-tab hidden space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">SEO Title (Japanese)</label>
                <input 
                  type="text" 
                  value={contentData.seo.title.jp}
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="SEO最適化されたタイトル"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Meta Description (Japanese)</label>
                <textarea 
                  rows={3}
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="検索エンジン向けの簡潔な説明"
                >{contentData.seo.description.jp}</textarea>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Keywords (Japanese)</label>
                <input 
                  type="text" 
                  value={contentData.seo.keywords.jp}
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="キーワード1, キーワード2, キーワード3"
                />
              </div>
            </div>
            
            {/* Traditional Chinese SEO */}
            <div id="seo-tab-hk" class="seo-tab hidden space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">SEO Title (Traditional Chinese)</label>
                <input 
                  type="text" 
                  value={contentData.seo.title.hk}
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="SEO 優化標題"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Meta Description (Traditional Chinese)</label>
                <textarea 
                  rows={3}
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="搜索引擎優化描述"
                >{contentData.seo.description.hk}</textarea>
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Keywords (Traditional Chinese)</label>
                <input 
                  type="text" 
                  value={contentData.seo.keywords.hk}
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="關鍵詞1, 關鍵詞2, 關鍵詞3"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}