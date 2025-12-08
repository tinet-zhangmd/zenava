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
}

interface ResourceDetailPageProps {
  language?: Language
  content: Content | null
  category: Category | null
  categories?: Category[]
}

export const ResourceDetailPage: FC<ResourceDetailPageProps> = ({ 
  language = 'zh', 
  content,
  category,
  categories = []
}) => {
  const trans = getTranslations(language)
  
  if (!content || !category) {
    return <div class="py-20 text-center">
      <p class="text-xl text-gray-500">
        {language === 'zh' ? '内容不存在' : language === 'en' ? 'Content not found' : language === 'jp' ? 'コンテンツが見つかりません' : '內容不存在'}
      </p>
    </div>
  }
  
  // 构建下载和联系 URL
  const downloadUrl = content.attachment_file || `/resources/download/${content.id}`
  const contactUrl = `/contact?source=resource_download&file=${content.id}`

  // 构建结构化数据（JSON-LD）用于 SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": category.category_template === 'list_download' ? "Article" : "Article",
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
      "@id": typeof window !== 'undefined' ? window.location.href : ''
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
              {content.title}
            </span>
          </nav>
        </div>
      </section>

      {/* Top Cover Section */}
      <section class="bg-white py-12 md:py-16 lg:py-20">
        <div class="site-container px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
            {/* Left: Title and Meta Info */}
            <div class="order-2 lg:order-1">
              {/* Meta Info */}
              <div class="flex items-center flex-wrap gap-3 text-sm text-gray-500 mb-4">
                <span>{new Date(content.published_at).toLocaleDateString(language === 'en' ? 'en-US' : 'zh-CN')}</span>
                {content.reading_time && (
                  <>
                    <span>·</span>
                    <span>{content.reading_time} min</span>
                  </>
                )}
                {content.author && (
                  <>
                    <span>·</span>
                    <span>
                      {language === 'zh' ? '作者：' : language === 'en' ? 'Author: ' : language === 'jp' ? '著者：' : '作者：'}
                      {content.author}
                    </span>
                  </>
                )}
              </div>
              
              <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 md:mb-8 leading-tight">
                {content.title}
              </h1>
              
              {/* Download or View buttons based on category template */}
              {category.category_template === 'list_download' && content.attachment_file && (
                <a
                  href={content.attachment_file}
                  download={content.attachment_name || 'download'}
                  class="inline-flex items-center px-6 py-3 bg-[#6438FF] text-white rounded-lg font-semibold hover:bg-[#5a2ee6] transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <i class="fas fa-download mr-2"></i>
                  {language === 'zh' ? '立即下载' : language === 'en' ? 'Download Now' : language === 'jp' ? '今すぐダウンロード' : '立即下載'}
                </a>
              )}
            </div>
            
            {/* Right: Cover Image or Video */}
            <div class="order-1 lg:order-2">
              {category.category_template === 'list_video' && content.video_file ? (
                <div class="relative overflow-hidden rounded-xl bg-black">
                  <video 
                    controls
                    class="w-full h-auto"
                    poster={content.cover_image || ''}
                  >
                    <source src={content.video_file} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              ) : (
                <div class="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300">
                  {content.cover_image ? (
                    <img 
                      src={content.cover_image}
                      alt={content.title}
                      class="w-full h-auto object-cover"
                      loading="eager"
                      onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
                    />
                  ) : null}
                  {/* Placeholder when image fails to load or no image */}
                  {!content.cover_image && (
                    <div class="w-full aspect-[4/3] flex items-center justify-center bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300">
                      <div class="text-center">
                        <i class="fas fa-image text-4xl md:text-5xl text-gray-400 mb-3"></i>
                        <p class="text-sm md:text-base text-gray-500">
                          {language === 'zh' ? '暂无图片' : language === 'en' ? 'No Image' : language === 'jp' ? '画像なし' : '暫無圖片'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
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
      </section>

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

