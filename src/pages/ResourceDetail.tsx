import { FC } from 'hono/jsx'
import { Language } from '../utils/i18n'
import { getTranslations } from '../i18n/translations'

interface ResourceDetailPageProps {
  language?: Language
  resourceType?: string // 'whitepaper' | 'report' | 'case-study' | etc.
  resourceId?: string // Resource ID
}

export const ResourceDetailPage: FC<ResourceDetailPageProps> = ({ 
  language = 'zh', 
  resourceType = 'whitepaper',
  resourceId = '1'
}) => {
  const trans = getTranslations(language)
  
  // Get resource type configuration
  const typeConfig = getResourceTypeConfig(resourceType, language)
  
  // Mock resource data - in production, this would come from CMS/API
  const resourceData = getMockResourceData(resourceType, resourceId, language)
  
  // Check if user has already submitted form (check cookie)
  const downloadUrl = `/resources/download/${resourceId}`
  const contactUrl = `/contact?source=whitepaper_download&file=${resourceId}`

  return (
    <>
      {/* Resource Center Sub-Navigation */}
      <section class="bg-[#6438FF] sticky top-0 z-30">
        <div class="site-container px-4 sm:px-6 lg:px-8">
          <nav class="flex items-center justify-center space-x-6 md:space-x-8 overflow-x-auto py-4">
            {getResourceNavItems(language).map((item) => {
              // Map resourceType to navigation key
              const typeMap: Record<string, string> = {
                whitepaper: 'whitepapers',
                report: 'reports',
                'case-study': 'reports'
              }
              const navKey = typeMap[resourceType] || resourceType
              const isActive = navKey === item.key
              
              return (
                <a
                  key={item.key}
                  href={item.href}
                  class={`whitespace-nowrap text-sm md:text-base font-medium text-white transition-all pb-2 relative ${
                    isActive
                      ? 'border-b-2 border-white'
                      : 'hover:opacity-80'
                  }`}
                >
                  {item.label}
                </a>
              )
            })}
          </nav>
        </div>
      </section>

      {/* Breadcrumb Navigation */}
      <section class="bg-white border-b border-gray-200">
        <div class="site-container px-4 sm:px-6 lg:px-8 py-4">
          <nav class="flex items-center space-x-2 text-sm">
            <a href={language === 'zh' ? '/' : `/${language}`} class="text-gray-500 hover:text-[#6438FF] transition-colors">
              {language === 'zh' ? '首页' : language === 'en' ? 'Home' : language === 'jp' ? 'ホーム' : '首頁'}
            </a>
            <i class="fas fa-chevron-right text-gray-400 text-xs"></i>
            <a href={language === 'zh' ? '/resources' : `/${language}/resources`} class="text-gray-500 hover:text-[#6438FF] transition-colors">
              {language === 'zh' ? '资源中心' : language === 'en' ? 'Resource Center' : language === 'jp' ? 'リソースセンター' : '資源中心'}
            </a>
            <i class="fas fa-chevron-right text-gray-400 text-xs"></i>
            <a href={getResourceTypeListUrl(resourceType, language)} class="text-gray-500 hover:text-[#6438FF] transition-colors">
              {typeConfig.title}
            </a>
            <i class="fas fa-chevron-right text-gray-400 text-xs"></i>
            <span class="text-gray-900 font-medium line-clamp-1">
              {resourceData.title}
            </span>
          </nav>
        </div>
      </section>

      {/* Top Cover Section */}
      <section class="bg-white py-12 md:py-16 lg:py-20">
        <div class="site-container px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
            {/* Left: Title and Content */}
            <div class="order-2 lg:order-1">
              <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                {resourceData.title}
              </h1>
              {resourceData.subtitle && (
                <p class="text-lg md:text-xl text-gray-600 mb-6 md:mb-8 line-clamp-2">
                  {resourceData.subtitle}
                </p>
              )}
              <button
                id="download-btn-top"
                onclick={`handleDownload('${contactUrl}', '${downloadUrl}')`}
                class="inline-flex items-center px-6 py-3 bg-[#6438FF] text-white rounded-lg font-semibold hover:bg-[#5a2ee6] transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <i class="fas fa-download mr-2"></i>
                {language === 'zh' ? '立即下载' : language === 'en' ? 'Download Now' : language === 'jp' ? '今すぐダウンロード' : '立即下載'}
              </button>
            </div>
            
            {/* Right: Cover Image */}
            <div class="order-1 lg:order-2">
              <div class="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300">
                <img 
                  src={resourceData.coverImage || '/assets/images/resources/cover-placeholder.jpg'}
                  alt={resourceData.title || 'Resource Cover'}
                  class="w-full h-auto object-cover"
                  loading="eager"
                  onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
                />
                {/* Placeholder when image fails to load */}
                <div class="hidden w-full aspect-[4/3] items-center justify-center bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300">
                  <div class="text-center">
                    <i class="fas fa-image text-4xl md:text-5xl text-gray-400 mb-3"></i>
                    <p class="text-sm md:text-base text-gray-500">
                      {language === 'zh' ? '暂无图片' : language === 'en' ? 'No Image' : language === 'jp' ? '画像なし' : '暫無圖片'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Introduction Section */}
      <section class="bg-gray-50 py-12 md:py-16 lg:py-20">
        <div class="site-container px-4 sm:px-6 lg:px-8">
          <div class="max-w-4xl mx-auto">
            <style dangerouslySetInnerHTML={{
              __html: `
                .resource-content {
                  line-height: 1.8;
                  color: #374151;
                }
                .resource-content h2 {
                  font-size: 1.875rem;
                  font-weight: 700;
                  color: #111827;
                  margin-top: 2rem;
                  margin-bottom: 1rem;
                }
                .resource-content h3 {
                  font-size: 1.5rem;
                  font-weight: 600;
                  color: #1f2937;
                  margin-top: 1.5rem;
                  margin-bottom: 0.75rem;
                }
                .resource-content p {
                  margin-bottom: 1.5rem;
                  font-size: 1rem;
                }
                .resource-content ul {
                  margin-bottom: 1.5rem;
                  padding-left: 1.5rem;
                }
                .resource-content li {
                  margin-bottom: 0.75rem;
                  list-style-type: disc;
                }
                .resource-content img {
                  max-width: 80%;
                  height: auto;
                  margin: 2rem auto;
                  display: block;
                  border-radius: 0.5rem;
                }
                @media (max-width: 768px) {
                  .resource-content h2 {
                    font-size: 1.5rem;
                  }
                  .resource-content h3 {
                    font-size: 1.25rem;
                  }
                  .resource-content img {
                    max-width: 100%;
                  }
                }
              `
            }} />
            <div 
              class="resource-content"
              dangerouslySetInnerHTML={{ __html: resourceData.content || '' }}
            />
          </div>
        </div>
      </section>

      {/* Summary and Highlights Section */}
      {resourceData.highlights && resourceData.highlights.length > 0 && (
        <section class="bg-white py-12 md:py-16 lg:py-20">
          <div class="site-container px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
              {/* Left: Title and Description */}
              <div>
                <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
                  {resourceData.highlightsTitle || (language === 'zh' ? '了解提升敏捷性的方式' : language === 'en' ? 'Ways to Improve Agility' : language === 'jp' ? '敏捷性向上の方法' : '了解提升敏捷性的方式')}
                </h2>
                {resourceData.highlightsDescription && (
                  <p class="text-base md:text-lg text-gray-600 leading-relaxed">
                    {resourceData.highlightsDescription}
                  </p>
                )}
              </div>
              
              {/* Right: Highlights List */}
              <div>
                <ul class="space-y-4 md:space-y-6">
                  {resourceData.highlights.map((highlight: string, index: number) => (
                    <li 
                      key={index}
                      class="flex items-start space-x-3 md:space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-all transform hover:scale-[1.02]"
                    >
                      <div class="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#6438FF] text-white flex items-center justify-center font-bold text-sm md:text-base">
                        {index + 1}
                      </div>
                      <p class="text-base md:text-lg text-gray-700 flex-1">
                        {highlight}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Bottom Download Section */}
      <section class="bg-gradient-to-br from-[#6438FF] to-[#5a2ee6] py-12 md:py-16 lg:py-20">
        <div class="site-container px-4 sm:px-6 lg:px-8">
          <div class="max-w-4xl mx-auto text-center">
            <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 md:mb-6">
              {language === 'zh' ? '立即下载完整报告' : language === 'en' ? 'Download Full Report Now' : language === 'jp' ? '完全レポートを今すぐダウンロード' : '立即下載完整報告'}
            </h2>
            <p class="text-lg md:text-xl text-white/90 mb-8 md:mb-10">
              {language === 'zh' ? '获取完整版白皮书，深入了解行业趋势和最佳实践' : language === 'en' ? 'Get the full whitepaper to dive deep into industry trends and best practices' : language === 'jp' ? '完全版ホワイトペーパーを取得して、業界のトレンドとベストプラクティスを深く理解する' : '獲取完整版白皮書，深入了解行業趨勢和最佳實踐'}
            </p>
            <button
              id="download-btn-bottom"
              onclick={`handleDownload('${contactUrl}', '${downloadUrl}')`}
              class="inline-flex items-center px-8 py-4 bg-white text-[#6438FF] rounded-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl text-lg"
            >
              <i class="fas fa-download mr-3"></i>
              {language === 'zh' ? '立即下载' : language === 'en' ? 'Download Now' : language === 'jp' ? '今すぐダウンロード' : '立即下載'}
            </button>
          </div>
        </div>
      </section>

      {/* Download Script */}
      <script dangerouslySetInnerHTML={{
        __html: `
          (function() {
            // Check if user has already submitted form (check cookie)
            function hasSubmittedForm() {
              const cookies = document.cookie.split(';');
              for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.startsWith('resource_download_')) {
                  return true;
                }
              }
              return false;
            }
            
            // Handle download button click
            window.handleDownload = function(contactUrl, downloadUrl) {
              if (hasSubmittedForm()) {
                // User has already submitted form, trigger download directly
                window.location.href = downloadUrl;
              } else {
                // User hasn't submitted form, redirect to contact page
                window.location.href = contactUrl;
              }
            };
          })();
        `
      }} />
    </>
  )
}

// Helper function to get resource type configuration
function getResourceTypeConfig(resourceType: string, language: Language) {
  const configs: Record<string, Record<Language, any>> = {
    whitepaper: {
      zh: { title: '白皮书' },
      en: { title: 'Whitepaper' },
      jp: { title: 'ホワイトペーパー' },
      hk: { title: '白皮書' }
    },
    report: {
      zh: { title: '行业报告' },
      en: { title: 'Industry Report' },
      jp: { title: '業界レポート' },
      hk: { title: '行業報告' }
    },
    'case-study': {
      zh: { title: '案例分析' },
      en: { title: 'Case Study' },
      jp: { title: 'ケーススタディ' },
      hk: { title: '案例分析' }
    }
  }

  return configs[resourceType]?.[language] || configs.whitepaper[language]
}

// Helper function to get resource navigation items
function getResourceNavItems(language: Language) {
  const basePath = language === 'zh' ? '/resources' : `/${language}/resources`
  
  return [
    { key: 'all', label: language === 'zh' ? '所有资源' : language === 'en' ? 'All Resources' : language === 'jp' ? 'すべてのリソース' : '所有資源', href: `${basePath}/all` },
    { key: 'whitepapers', label: language === 'zh' ? '白皮书' : language === 'en' ? 'Whitepapers' : language === 'jp' ? 'ホワイトペーパー' : '白皮書', href: `${basePath}/whitepapers` },
    { key: 'videos', label: language === 'zh' ? '视频' : language === 'en' ? 'Videos' : language === 'jp' ? 'ビデオ' : '視頻', href: `${basePath}/videos` },
    { key: 'reports', label: language === 'zh' ? '行业报告' : language === 'en' ? 'Industry Reports' : language === 'jp' ? '業界レポート' : '行業報告', href: `${basePath}/reports` },
    { key: 'demos', label: language === 'zh' ? '产品演示' : language === 'en' ? 'Product Demos' : language === 'jp' ? '製品デモ' : '產品演示', href: `${basePath}/demos` },
    { key: 'blog', label: language === 'zh' ? '博客' : language === 'en' ? 'Blog' : language === 'jp' ? 'ブログ' : '博客', href: `${basePath}/blog` },
    { key: 'podcast', label: language === 'zh' ? '播客' : language === 'en' ? 'Podcast' : language === 'jp' ? 'ポッドキャスト' : '播客', href: `${basePath}/podcast` }
  ]
}

// Helper function to get resource type list URL
function getResourceTypeListUrl(resourceType: string, language: Language) {
  const basePath = language === 'zh' ? '/resources' : `/${language}/resources`
  
  const typeMap: Record<string, string> = {
    whitepaper: 'whitepapers',
    report: 'reports',
    'case-study': 'reports'
  }
  
  const mappedType = typeMap[resourceType] || 'all'
  return `${basePath}/${mappedType}`
}

// Mock function to get resource data (replace with API call)
function getMockResourceData(resourceType: string, resourceId: string, language: Language) {
  return {
    title: language === 'zh' 
      ? '《报告标题标题文字描述标题文字描述 标题文字描述标题文字描述》'
      : language === 'en'
      ? 'Report Title: Title Text Description Title Text Description'
      : language === 'jp'
      ? 'レポートタイトル：タイトルテキスト説明タイトルテキスト説明'
      : '《報告標題標題文字描述標題文字描述 標題文字描述標題文字描述》',
    subtitle: language === 'zh'
      ? '本报告深入分析了中小企业如何通过敏捷实践提升业务效率，包含详细的实施指南和最佳实践案例。'
      : language === 'en'
      ? 'This report provides an in-depth analysis of how SMEs can improve business efficiency through agile practices, including detailed implementation guides and best practice cases.'
      : language === 'jp'
      ? 'このレポートは、中小企業がアジャイル実践を通じてビジネス効率をどのように向上させることができるかを詳細に分析し、詳細な実装ガイドとベストプラクティスケースを含みます。'
      : '本報告深入分析了中小企業如何通過敏捷實踐提升業務效率，包含詳細的實施指南和最佳實踐案例。',
    coverImage: '/assets/images/resources/whitepaper-cover.jpg',
    content: language === 'zh'
      ? `
        <h2>报告简介</h2>
        <p>本白皮书深入探讨了敏捷实践在中小企业中的应用，帮助企业实现数字化转型和业务增长。通过实际案例和数据分析，我们展示了敏捷方法论如何提升团队协作效率、加快产品交付速度，并最终改善客户满意度。</p>
        
        <h3>核心内容</h3>
        <ul>
          <li>敏捷实践的基础理论和方法论</li>
          <li>中小企业实施敏捷的挑战与解决方案</li>
          <li>成功案例分析</li>
          <li>实施路线图和最佳实践</li>
        </ul>
        
        <h2>为什么选择敏捷？</h2>
        <p>在快速变化的市场环境中，中小企业需要更灵活、更快速的响应能力。敏捷实践不仅是一种项目管理方法，更是一种组织文化和思维方式的转变。</p>
      `
      : language === 'en'
      ? `
        <h2>Report Introduction</h2>
        <p>This whitepaper provides an in-depth exploration of agile practices in SMEs, helping businesses achieve digital transformation and business growth. Through real-world case studies and data analysis, we demonstrate how agile methodologies can improve team collaboration efficiency, accelerate product delivery, and ultimately enhance customer satisfaction.</p>
        
        <h3>Core Content</h3>
        <ul>
          <li>Fundamental theories and methodologies of agile practices</li>
          <li>Challenges and solutions for SMEs implementing agile</li>
          <li>Success case studies</li>
          <li>Implementation roadmap and best practices</li>
        </ul>
        
        <h2>Why Choose Agile?</h2>
        <p>In a rapidly changing market environment, SMEs need more flexible and faster response capabilities. Agile practices are not just a project management method, but a transformation of organizational culture and mindset.</p>
      `
      : language === 'jp'
      ? `
        <h2>レポート紹介</h2>
        <p>このホワイトペーパーは、中小企業におけるアジャイル実践の詳細な探求を提供し、企業がデジタル変革とビジネス成長を実現するのを支援します。実際のケーススタディとデータ分析を通じて、アジャイル方法論がチームの協力効率を向上させ、製品の提供速度を加速し、最終的に顧客満足度を向上させる方法を示します。</p>
        
        <h3>コアコンテンツ</h3>
        <ul>
          <li>アジャイル実践の基礎理論と方法論</li>
          <li>アジャイルを実装する中小企業の課題と解決策</li>
          <li>成功ケーススタディ</li>
          <li>実装ロードマップとベストプラクティス</li>
        </ul>
        
        <h2>なぜアジャイルを選ぶのか？</h2>
        <p>急速に変化する市場環境において、中小企業はより柔軟で迅速な対応能力が必要です。アジャイル実践は単なるプロジェクト管理方法ではなく、組織文化と思考様式の変革です。</p>
      `
      : `
        <h2>報告簡介</h2>
        <p>本白皮書深入探討了敏捷實踐在中小企業中的應用，幫助企業實現數字化轉型和業務增長。通過實際案例和數據分析，我們展示了敏捷方法論如何提升團隊協作效率、加快產品交付速度，並最終改善客戶滿意度。</p>
        
        <h3>核心內容</h3>
        <ul>
          <li>敏捷實踐的基礎理論和方法論</li>
          <li>中小企業實施敏捷的挑戰與解決方案</li>
          <li>成功案例分析</li>
          <li>實施路線圖和最佳實踐</li>
        </ul>
        
        <h2>為什麼選擇敏捷？</h2>
        <p>在快速變化的市場環境中，中小企業需要更靈活、更快速的反應能力。敏捷實踐不僅是一種項目管理方法，更是一種組織文化和思維方式的轉變。</p>
      `,
    highlightsTitle: language === 'zh' 
      ? '了解提升敏捷性的方式'
      : language === 'en'
      ? 'Ways to Improve Agility'
      : language === 'jp'
      ? '敏捷性向上の方法'
      : '了解提升敏捷性的方式',
    highlightsDescription: language === 'zh'
      ? '通过以下方式，中小企业可以快速提升业务敏捷性和响应速度：'
      : language === 'en'
      ? 'SMEs can quickly improve business agility and response speed through the following methods:'
      : language === 'jp'
      ? '以下の方法により、中小企業はビジネスの敏捷性と対応速度を迅速に向上させることができます：'
      : '通過以下方式，中小企業可以快速提升業務敏捷性和反應速度：',
    highlights: language === 'zh'
      ? [
          '提供顺畅的沟通渠道，确保团队信息同步和协作效率',
          '构建高效团队，培养敏捷思维和快速响应能力',
          '投资灵活的技术基础设施，支持快速迭代和扩展'
        ]
      : language === 'en'
      ? [
          'Provide smooth communication channels to ensure team information synchronization and collaboration efficiency',
          'Build efficient teams and cultivate agile thinking and rapid response capabilities',
          'Invest in flexible technology infrastructure to support rapid iteration and scaling'
        ]
      : language === 'jp'
      ? [
          'スムーズなコミュニケーションチャネルを提供し、チームの情報同期と協力効率を確保する',
          '効率的なチームを構築し、アジャイル思考と迅速な対応能力を育成する',
          '迅速な反復と拡張をサポートする柔軟な技術インフラストラクチャに投資する'
        ]
      : [
          '提供順暢的溝通渠道，確保團隊信息同步和協作效率',
          '構建高效團隊，培養敏捷思維和快速反應能力',
          '投資靈活的技術基礎設施，支持快速迭代和擴展'
        ]
  }
}

