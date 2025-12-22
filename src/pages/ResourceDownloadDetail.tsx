import { FC } from 'hono/jsx'
import { Language } from '../utils/i18n'
import { getTranslations } from '../i18n/translations'

interface Category {
  id: number
  name: string
  slug: string
  category_template: string
  description?: string
}

interface Content {
  id: number
  category_id: number
  category_name: string
  category_slug: string
  title: string
  content: string
  author?: string
  author_avatar?: string
  cover_image?: string
  published_at: string
  views: number
  downloads: number
  reading_time?: number
  attachment_file?: string
  attachment_name?: string
  status: string
  meta_title?: string
  meta_description?: string
  meta_keywords?: string
  // 多语言字段
  title_zh?: string
  title_en?: string
  title_jp?: string
  title_hk?: string
  content_zh?: string
  content_en?: string
  content_jp?: string
  content_hk?: string
}

interface RecommendedContent {
  id: number
  title: string
  cover_image?: string
  published_at: string
  reading_time?: number
  author?: string
  views: number
  category_slug: string
  // 多语言字段
  title_zh?: string
  title_en?: string
  title_jp?: string
  title_hk?: string
}

interface ResourceDownloadDetailPageProps {
  language?: Language
  content: Content | null
  category: Category | null
  categories?: Category[]
  recommendedContents?: RecommendedContent[]
}

export const ResourceDownloadDetailPage: FC<ResourceDownloadDetailPageProps> = ({ 
  language = 'zh', 
  content,
  category,
  categories = [],
  recommendedContents = []
}) => {
  const trans = getTranslations(language)
  
  if (!content || !category) {
    return <div class="py-20 text-center">
      <p class="text-xl text-gray-500">
        {language === 'zh' ? '内容不存在' : language === 'en' ? 'Content not found' : language === 'jp' ? 'コンテンツが見つかりません' : '內容不存在'}
      </p>
    </div>
  }
  
  // 构建结构化数据（JSON-LD）用于 SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": content.title,
    "description": content.meta_description || content.content?.replace(/<[^>]*>/g, '').substring(0, 200) || '',
    "image": content.cover_image || '',
    "datePublished": content.published_at,
    "dateModified": content.published_at,
    "author": {
      "@type": "Person",
      "name": content.author || "ZENAVA"
    },
    "publisher": {
      "@type": "Organization",
      "name": "ZENAVA",
      "logo": {
        "@type": "ImageObject",
        "url": "https://zenava.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": ""
    }
  }

  return (
    <>
      {/* SEO 结构化数据 */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }} />
      
      {/* Resource Center Sub-Navigation */}
      <section class="bg-[#6438FF] sticky top-0 z-30">
        <div class="site-container px-4 sm:px-6 lg:px-8">
          <nav class="flex items-center justify-center space-x-6 md:space-x-8 overflow-x-auto py-4">
            {/* All Resources */}
            <a
              href={language === 'zh' ? '/resources' : `/${language}/resources`}
              class="whitespace-nowrap text-sm md:text-base font-medium text-white transition-all pb-2 relative hover:opacity-80"
            >
              {language === 'zh' ? '所有资源' : language === 'en' ? 'All Resources' : language === 'jp' ? 'すべてのリソース' : '所有資源'}
            </a>
            {/* Category Navigation */}
            {categories.map((cat) => {
              const basePath = language === 'zh' ? '/resources' : `/${language}/resources`
              const catHref = `${basePath}/${cat.slug}`
              const isActive = cat.slug === category.slug
              
              return (
                <a
                  key={cat.id}
                  href={catHref}
                  class={`whitespace-nowrap text-sm md:text-base font-medium text-white transition-all pb-2 relative ${
                    isActive
                      ? 'border-b-2 border-white'
                      : 'hover:opacity-80'
                  }`}
                >
                  {cat.name}
                </a>
              )
            })}
          </nav>
        </div>
      </section>

      {/* Header Section - 白色背景，左右布局 */}
      <section class="bg-white py-8 md:py-12 lg:py-16">
        <div class="site-container px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav class="flex items-center space-x-2 text-sm mb-6 md:mb-8">
            <a href={`${language === 'zh' ? '/resources' : `/${language}/resources`}/${category.slug}`} class="text-gray-500 hover:text-[#6438FF] transition-colors">
              {category.name}
            </a>
            <i class="fas fa-chevron-right text-gray-400 text-xs"></i>
            <span class="text-gray-900 font-medium line-clamp-1">
              {content.title}
            </span>
          </nav>
          
          {/* Header Content - 左右布局 */}
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
            {/* Left Column: Title and Download Button */}
            <div>
              <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 md:mb-8 leading-tight">
                {content.title}
              </h1>
              {content.attachment_file && (
                <a
                  href={content.attachment_file}
                  download={content.attachment_name || 'download'}
                  class="inline-flex items-center px-8 py-4 bg-[#6438FF] text-white rounded-lg font-semibold hover:bg-[#5a2ee6] transition-all transform hover:scale-105 shadow-lg hover:shadow-xl text-lg"
                >
                  <i class="fas fa-download mr-3"></i>
                  {language === 'zh' ? '立即下载' : language === 'en' ? 'Download Now' : language === 'jp' ? '今すぐダウンロード' : '立即下載'}
                </a>
              )}
            </div>
            
            {/* Right Column: Promotional Banner */}
            <div class="hidden lg:block">
              {content.cover_image ? (
                <div class="rounded-xl overflow-hidden shadow-xl">
                  <img 
                    src={content.cover_image}
                    alt={content.title}
                    class="w-full h-auto object-cover"
                    loading="eager"
                  />
                </div>
              ) : (
                <div class="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 md:p-12 shadow-xl min-h-[300px] flex items-center justify-center">
                  <div class="text-center text-white">
                    <i class="fas fa-file-pdf text-5xl md:text-6xl mb-4 opacity-50"></i>
                    <p class="text-lg md:text-xl opacity-75">
                      {language === 'zh' ? '资源封面' : language === 'en' ? 'Resource Cover' : language === 'jp' ? 'リソースカバー' : '資源封面'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content Section - 两列布局：左列内容，右列空白 */}
      <section class="bg-white py-8 md:py-12 lg:py-16">
        <div class="site-container px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* Left Column: Content */}
            <div>
              <div class="max-w-none">
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
                      max-width: 100%;
                      height: auto;
                      margin: 2rem auto;
                      display: block;
                      border-radius: 0.5rem;
                    }
                    .resource-content ol {
                      margin-bottom: 1.5rem;
                      padding-left: 1.5rem;
                    }
                    .resource-content ol li {
                      list-style-type: decimal;
                    }
                    .resource-content blockquote {
                      border-left: 4px solid #6438FF;
                      padding-left: 1rem;
                      margin: 1.5rem 0;
                      color: #4b5563;
                      font-style: italic;
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
                  dangerouslySetInnerHTML={{ __html: content.content || '' }}
                />
              </div>
            </div>
            
            {/* Right Column: Empty/Reserved for Ads or Supplementary Content */}
            <div class="hidden lg:block">
              {/* 右侧栏保留为空，可用于补充内容或广告 */}
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Reading Section */}
      {recommendedContents.length > 0 && (
        <section class="bg-white py-12 md:py-16 lg:py-20 border-t border-gray-200">
          <div class="site-container px-4 sm:px-6 lg:px-8">
            <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-8 md:mb-12">
              {language === 'zh' ? '推荐阅读' : language === 'en' ? 'Recommended Reading' : language === 'jp' ? 'おすすめ' : '推薦閱讀'}
            </h2>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {recommendedContents.map((item) => {
                // 获取多语言标题
                const getTitle = () => {
                  if (language === 'zh') return item.title_zh || item.title || '文章标题'
                  if (language === 'en') return item.title_en || item.title || 'Article Title'
                  if (language === 'jp') return item.title_jp || item.title || '記事タイトル'
                  if (language === 'hk') return item.title_hk || item.title || '文章標題'
                  return item.title || 'Article Title'
                }
                
                // 格式化日期 - 按照设计图格式 "12 Sep"
                const formatDate = () => {
                  if (!item.published_at) return ''
                  const date = new Date(item.published_at)
                  const day = date.getDate()
                  const month = date.toLocaleDateString(language === 'en' ? 'en-US' : language === 'jp' ? 'ja-JP' : 'zh-CN', { month: 'short' })
                  return `${day} ${month}`
                }
                
                // 构建链接
                const langPrefix = language === 'zh' ? '' : `/${language}`
                const contentLink = `${langPrefix}/resources/${item.category_slug}/${item.id}`
                
                return (
                  <a 
                    key={item.id}
                    href={contentLink}
                    class="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] overflow-hidden flex flex-col h-full"
                  >
                    <div class="aspect-video bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 relative overflow-hidden flex-shrink-0">
                      {item.cover_image ? (
                        <img 
                          src={item.cover_image}
                          alt={getTitle()}
                          class="w-full h-full object-cover"
                          loading="lazy"
                          onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
                        />
                      ) : null}
                      <div class={`${item.cover_image ? 'hidden' : 'flex'} w-full h-full items-center justify-center bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 absolute inset-0`}>
                        <div class="text-center">
                          <i class="fas fa-image text-3xl md:text-4xl text-gray-400 mb-2"></i>
                          <p class="text-xs md:text-sm text-gray-500">
                            {language === 'zh' ? '暂无图片' : language === 'en' ? 'No Image' : language === 'jp' ? '画像なし' : '暫無圖片'}
                          </p>
                        </div>
                      </div>
                      {/* Category Badge */}
                      <div class="absolute top-4 left-4 z-10">
                        <span class="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700 uppercase">
                          {category.name}
                        </span>
                      </div>
                    </div>
                    <div class="p-6 flex flex-col flex-grow">
                      {/* Date and Reading Time */}
                      <div class="flex items-center gap-2 text-xs md:text-sm text-gray-500 mb-3">
                        <span>{formatDate()}</span>
                        {item.reading_time && (
                          <>
                            <span>·</span>
                            <span>{item.reading_time} min</span>
                          </>
                        )}
                      </div>
                      {/* Title */}
                      <h3 class="text-lg md:text-xl font-bold text-gray-900 mb-3 line-clamp-2 flex-grow">
                        {getTitle()}
                      </h3>
                      {/* Author and Views */}
                      <div class="flex items-center justify-between text-sm text-gray-500 mt-auto">
                        {item.author && (
                          <span>{item.author}</span>
                        )}
                        <div class="flex items-center gap-1">
                          <i class="fas fa-eye"></i>
                          <span>{item.views || 0}</span>
                        </div>
                      </div>
                    </div>
                  </a>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Bottom Download CTA Section - 底部左右布局：左侧横幅，右侧标题+按钮 */}
      {content.attachment_file && (
        <section class="bg-gradient-to-br from-[#6438FF] to-[#5a2ee6] py-12 md:py-16 lg:py-20">
          <div class="site-container px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Left Column: Promotional Banner */}
              <div class="hidden lg:block">
                {content.cover_image ? (
                  <div class="rounded-xl overflow-hidden shadow-xl">
                    <img 
                      src={content.cover_image}
                      alt={content.title}
                      class="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div class="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 md:p-12 shadow-xl min-h-[300px] flex items-center justify-center">
                    <div class="text-center text-white">
                      <i class="fas fa-file-pdf text-5xl md:text-6xl mb-4 opacity-50"></i>
                      <p class="text-lg md:text-xl opacity-75">
                        {language === 'zh' ? '资源封面' : language === 'en' ? 'Resource Cover' : language === 'jp' ? 'リソースカバー' : '資源封面'}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Right Column: Title and Download Button */}
              <div class="text-center lg:text-left">
                <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6 md:mb-8">
                  {content.title}
                </h2>
                <a
                  href={content.attachment_file}
                  download={content.attachment_name || 'download'}
                  class="inline-flex items-center px-8 py-4 bg-white text-[#6438FF] rounded-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl text-lg"
                >
                  <i class="fas fa-download mr-3"></i>
                  {language === 'zh' ? '立即下载' : language === 'en' ? 'Download Now' : language === 'jp' ? '今すぐダウンロード' : '立即下載'}
                </a>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}

