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
  video_file?: string
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

interface ResourceDetailPageProps {
  language?: Language
  content: Content | null
  category: Category | null
  categories?: Category[]
  recommendedContents?: RecommendedContent[]
}

export const ResourceDetailPage: FC<ResourceDetailPageProps> = ({ 
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
  
  // 根据语言获取内容字段（双重保险，确保使用正确的多语言数据）
  const getContentField = (field: 'title' | 'content' | 'cover_image' | 'meta_title' | 'meta_description' | 'meta_keywords') => {
    if (field === 'title') {
      if (language === 'zh') return content.title_zh || content.title || ''
      if (language === 'en') return content.title_en || content.title_zh || content.title || ''
      if (language === 'jp') return content.title_jp || content.title_zh || content.title || ''
      if (language === 'hk') return content.title_hk || content.title_zh || content.title || ''
      return content.title || ''
    }
    if (field === 'content') {
      if (language === 'zh') return content.content_zh || content.content || ''
      if (language === 'en') return content.content_en || content.content_zh || content.content || ''
      if (language === 'jp') return content.content_jp || content.content_zh || content.content || ''
      if (language === 'hk') return content.content_hk || content.content_zh || content.content || ''
      return content.content || ''
    }
    if (field === 'cover_image') {
      if (language === 'zh') return content.cover_image_zh || content.cover_image || ''
      if (language === 'en') return content.cover_image_en || content.cover_image_zh || content.cover_image || ''
      if (language === 'jp') return content.cover_image_jp || content.cover_image_zh || content.cover_image || ''
      if (language === 'hk') return content.cover_image_hk || content.cover_image_zh || content.cover_image || ''
      return content.cover_image || ''
    }
    if (field === 'meta_title') {
      if (language === 'zh') return content.meta_title_zh || content.meta_title || ''
      if (language === 'en') return content.meta_title_en || content.meta_title_zh || content.meta_title || ''
      if (language === 'jp') return content.meta_title_jp || content.meta_title_zh || content.meta_title || ''
      if (language === 'hk') return content.meta_title_hk || content.meta_title_zh || content.meta_title || ''
      return content.meta_title || ''
    }
    if (field === 'meta_description') {
      if (language === 'zh') return content.meta_description_zh || content.meta_description || ''
      if (language === 'en') return content.meta_description_en || content.meta_description_zh || content.meta_description || ''
      if (language === 'jp') return content.meta_description_jp || content.meta_description_zh || content.meta_description || ''
      if (language === 'hk') return content.meta_description_hk || content.meta_description_zh || content.meta_description || ''
      return content.meta_description || ''
    }
    if (field === 'meta_keywords') {
      if (language === 'zh') return content.meta_keywords_zh || content.meta_keywords || ''
      if (language === 'en') return content.meta_keywords_en || content.meta_keywords_zh || content.meta_keywords || ''
      if (language === 'jp') return content.meta_keywords_jp || content.meta_keywords_zh || content.meta_keywords || ''
      if (language === 'hk') return content.meta_keywords_hk || content.meta_keywords_zh || content.meta_keywords || ''
      return content.meta_keywords || ''
    }
    return ''
  }
  
  // 获取处理后的内容字段
  const displayTitle = getContentField('title')
  const displayContent = getContentField('content')
  const displayCoverImage = getContentField('cover_image')
  const displayMetaTitle = getContentField('meta_title')
  const displayMetaDescription = getContentField('meta_description')
  
  // 构建下载和联系 URL
  const downloadUrl = content.attachment_file || `/resources/download/${content.id}`
  const contactUrl = `/contact?source=resource_download&file=${content.id}`

  // 构建结构化数据（JSON-LD）用于 SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": category.category_template === 'list_download' ? "Article" : "Article",
    "headline": displayTitle,
    "description": displayMetaDescription || displayContent?.replace(/<[^>]*>/g, '').substring(0, 200) || '',
    "image": displayCoverImage || '',
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
            <a href={`${language === 'zh' ? '/resources' : `/${language}/resources`}/${category.slug}`} class="text-gray-500 hover:text-[#6438FF] transition-colors">
              {category.name}
            </a>
            <i class="fas fa-chevron-right text-gray-400 text-xs"></i>
            <span class="text-gray-900 font-medium line-clamp-1">
              {displayTitle}
            </span>
          </nav>
        </div>
      </section>

      {/* Article Content Section - Left/Right Layout */}
      <section class="bg-white py-8 md:py-12 lg:py-20">
        <div class="site-container px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            {/* Left Column: Title, Author Info, Share Buttons, Date */}
            <div class="lg:col-span-1">
              {/* Title */}
              <h1 class="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 md:mb-8 leading-tight">
                {displayTitle}
              </h1>
              
              {/* Author Info */}
              {content.author && (
                <div class="mb-6">
                  <div class="flex items-center gap-3 md:gap-4">
                    {/* Author Avatar */}
                    <div class="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                      {content.author_avatar ? (
                        <img 
                          src={content.author_avatar}
                          alt={content.author}
                          class="w-full h-full object-cover"
                        />
                      ) : (
                        <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#6438FF] to-[#5a2ee6]">
                          <span class="text-white font-semibold text-sm md:text-base">
                            {content.author.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>
                    {/* Author Name */}
                    <div>
                      <p class="text-sm md:text-base font-medium text-gray-900">
                        {content.author}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Divider between Author and Share */}
              {content.author && (
                <div class="border-t border-gray-200 mb-6 mt-6"></div>
              )}
              
              {/* Share Section */}
              <div class="mb-6">
                {/* Share Label */}
                <p class="text-sm font-medium text-gray-700 mb-4">
                  {language === 'zh' ? '分享' : language === 'en' ? 'Share' : language === 'jp' ? 'シェア' : '分享'}
                </p>
                
                {/* Social Media Share Buttons */}
                <div class="flex items-center gap-2 md:gap-3">
                  <button
                    onclick={`navigator.clipboard.writeText(window.location.href).then(() => alert('${language === 'zh' ? '链接已复制' : language === 'en' ? 'Link copied' : language === 'jp' ? 'リンクをコピーしました' : '連結已複製'}'));`}
                    class="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                    aria-label="Copy link"
                  >
                    <i class="fas fa-link text-gray-600 text-sm md:text-base"></i>
                  </button>
                  <a 
                    href={`mailto:?subject=${encodeURIComponent(displayTitle)}&body=`}
                    onclick={`this.href = 'mailto:?subject=' + encodeURIComponent(${JSON.stringify(displayTitle)}) + '&body=' + encodeURIComponent(window.location.href);`}
                    class="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                    aria-label="Share via Email"
                  >
                    <i class="fas fa-envelope text-gray-600 text-sm md:text-base"></i>
                  </a>
                  <a 
                    href="#"
                    onclick={`const url = window.location.href; const title = ${JSON.stringify(displayTitle)}; window.open('https://twitter.com/intent/tweet?url=' + encodeURIComponent(url) + '&text=' + encodeURIComponent(title), '_blank', 'noopener,noreferrer'); return false;`}
                    class="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                    aria-label="Share on X (Twitter)"
                  >
                    <i class="fab fa-twitter text-gray-600 text-sm md:text-base"></i>
                  </a>
                  <a 
                    href="#"
                    onclick="const url = window.location.href; window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url), '_blank', 'noopener,noreferrer'); return false;"
                    class="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                    aria-label="Share on Facebook"
                  >
                    <i class="fab fa-facebook text-gray-600 text-sm md:text-base"></i>
                  </a>
                  <a 
                    href="#"
                    onclick="const url = window.location.href; window.open('https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(url), '_blank', 'noopener,noreferrer'); return false;"
                    class="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                    aria-label="Share on LinkedIn"
                  >
                    <i class="fab fa-linkedin text-gray-600 text-sm md:text-base"></i>
                  </a>
                </div>
              </div>
              
              {/* Divider between Share and Date */}
              <div class="border-t border-gray-200 mb-6 mt-6"></div>
              
              {/* Publication Date */}
              <div class="mb-6">
                <div class="text-sm text-gray-500">
                  <span>{new Date(content.published_at).toLocaleDateString(language === 'en' ? 'en-US' : language === 'jp' ? 'ja-JP' : 'zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
              </div>
              
              {/* Download Button (if applicable) */}
              {category.category_template === 'list_download' && content.attachment_file && (
                <div class="mb-6">
                  <a
                    href={content.attachment_file}
                    download={content.attachment_name || 'download'}
                    class="inline-flex items-center px-6 py-3 bg-[#6438FF] text-white rounded-lg font-semibold hover:bg-[#5a2ee6] transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <i class="fas fa-download mr-2"></i>
                    {language === 'zh' ? '立即下载' : language === 'en' ? 'Download Now' : language === 'jp' ? '今すぐダウンロード' : '立即下載'}
                  </a>
                </div>
              )}
            </div>
            
            {/* Right Column: Content Only */}
            <div class="lg:col-span-2">
              {/* Content */}
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
                      max-width: 80%;
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
                  dangerouslySetInnerHTML={{ __html: displayContent || '' }}
                />
              </div>
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
                      {/* Category Badge - 按照设计图显示分类标签 */}
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

      {/* Bottom Download Section - Only for download template */}
      {category.category_template === 'list_download' && content.attachment_file && (
        <section class="bg-gradient-to-br from-[#6438FF] to-[#5a2ee6] py-12 md:py-16 lg:py-20">
          <div class="site-container px-4 sm:px-6 lg:px-8">
            <div class="max-w-4xl mx-auto text-center">
              <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 md:mb-6">
                {language === 'zh' ? '立即下载完整报告' : language === 'en' ? 'Download Full Report Now' : language === 'jp' ? '完全レポートを今すぐダウンロード' : '立即下載完整報告'}
              </h2>
              <p class="text-lg md:text-xl text-white/90 mb-8 md:mb-10">
                {language === 'zh' ? '获取完整版文档，深入了解详细内容' : language === 'en' ? 'Get the full document for detailed insights' : language === 'jp' ? '完全版ドキュメントを取得して、詳細な内容を理解する' : '獲取完整版文檔，深入了解詳細內容'}
              </p>
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
        </section>
      )}
    </>
  )
}

