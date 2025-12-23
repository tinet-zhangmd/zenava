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
  cover_image_zh?: string
  cover_image_en?: string
  cover_image_jp?: string
  cover_image_hk?: string
  meta_title_zh?: string
  meta_title_en?: string
  meta_title_jp?: string
  meta_title_hk?: string
  meta_description_zh?: string
  meta_description_en?: string
  meta_description_jp?: string
  meta_description_hk?: string
  meta_keywords_zh?: string
  meta_keywords_en?: string
  meta_keywords_jp?: string
  meta_keywords_hk?: string
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
  
  // 清理和修复 HTML 内容中的图片标签
  // 特别处理 base64 图片（可能很长）
  const cleanImageTags = (html: string): string => {
    if (!html) return ''
    
    // 使用更精确的方法：先找到所有 <img 标签的开始位置
    let result = html
    let searchIndex = 0
    
    while (true) {
      // 查找 <img 标签的开始位置（不区分大小写）
      const imgStartIndex = result.indexOf('<img', searchIndex)
      if (imgStartIndex === -1) break
      
      // 从 <img 开始查找第一个 > 的位置
      const tagEndIndex = result.indexOf('>', imgStartIndex)
      if (tagEndIndex === -1) {
        // 如果没有找到 >，说明标签格式有问题，跳过
        searchIndex = imgStartIndex + 4
        continue
      }
      
      // 提取完整的标签内容（包括 <img 和 >）
      const fullTag = result.substring(imgStartIndex, tagEndIndex + 1)
      
      // 提取标签属性部分（不包括 <img 和 >）
      const tagContent = fullTag.substring(4, fullTag.length - 1).trim()
      
      // 提取 src 属性值
      let src: string | null = null
      
      // 1. 优先处理 src="..." 格式（双引号）- 对于 base64，需要匹配到引号结束
      const doubleQuoteStart = tagContent.indexOf('src="')
      if (doubleQuoteStart !== -1) {
        const srcValueStart = doubleQuoteStart + 5 // "src=\"" 的长度
        const srcValueEnd = tagContent.indexOf('"', srcValueStart)
        if (srcValueEnd !== -1) {
          src = tagContent.substring(srcValueStart, srcValueEnd)
        }
      }
      
      // 2. 如果没找到，尝试 src='...' 格式（单引号）
      if (!src) {
        const singleQuoteStart = tagContent.indexOf("src='")
        if (singleQuoteStart !== -1) {
          const srcValueStart = singleQuoteStart + 5 // "src='" 的长度
          const srcValueEnd = tagContent.indexOf("'", srcValueStart)
          if (srcValueEnd !== -1) {
            src = tagContent.substring(srcValueStart, srcValueEnd)
          }
        }
      }
      
      // 3. 如果还没找到，尝试 src=... 格式（无引号，取到空格或 > 之前）
      if (!src) {
        const noQuoteMatch = tagContent.match(/src\s*=\s*([^\s>]+)/i)
        if (noQuoteMatch && noQuoteMatch[1]) {
          src = noQuoteMatch[1].trim()
          // 移除可能包含的引号
          src = src.replace(/^["']+|["']+$/g, '')
        }
      }
      
      // 如果找到了有效的 src，重建标签
      if (src && src.length > 0) {
        // 清理 src：确保不包含标签字符
        src = src
          .split('>')[0]  // 移除 > 之后的内容
          .split('<')[0]  // 移除 < 之后的内容
          .trim()
        
        // 验证 src 是否有效
        if (src && src.length > 0 && !src.includes('<') && !src.includes('>')) {
          // 提取其他属性（排除 src）
          let otherAttributes = tagContent
            .replace(/src\s*=\s*"[^"]*"/gi, '') // 移除带双引号的 src
            .replace(/src\s*=\s*'[^']*'/gi, '') // 移除带单引号的 src
            .replace(/src\s*=\s*[^\s>]+/gi, '') // 移除不带引号的 src
            .replace(/\s+/g, ' ') // 规范化空格
            .trim()
          
          // 构建新的图片标签
          const newTag = `<img src="${src}"${otherAttributes ? ' ' + otherAttributes : ''} alt="">`
          
          // 替换原标签
          result = result.substring(0, imgStartIndex) + newTag + result.substring(tagEndIndex + 1)
          
          // 更新搜索索引（从新标签之后开始）
          searchIndex = imgStartIndex + newTag.length
        } else {
          // src 无效，跳过这个标签
          searchIndex = tagEndIndex + 1
        }
      } else {
        // 没有找到 src，跳过这个标签
        searchIndex = tagEndIndex + 1
      }
    }
    
    return result
  }
  
  // 获取处理后的内容字段
  const displayTitle = getContentField('title')
  const rawContent = getContentField('content')
  const displayContent = cleanImageTags(rawContent) // 清理图片标签
  const displayCoverImage = getContentField('cover_image')
  const displayMetaTitle = getContentField('meta_title')
  const displayMetaDescription = getContentField('meta_description')
  
  // 构建结构化数据（JSON-LD）用于 SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
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

      {/* Header Section - 白色背景，左右布局 */}
      <section class="bg-white py-8 md:py-12 lg:py-16">
        <div class="site-container px-4 sm:px-6 lg:px-8">
          
          {/* Header Content - 左右布局 */}
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
            {/* Left Column: Title and Download Button */}
            <div>
              <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 md:mb-8 leading-tight">
                {displayTitle}
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
              {displayCoverImage ? (
                <div class="rounded-xl overflow-hidden shadow-xl">
                  <img 
                    src={displayCoverImage}
                    alt={displayTitle}
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

      {/* Content Section - 正文居中 */}
      <section class="bg-white py-8 md:py-12 lg:py-16">
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
              dangerouslySetInnerHTML={{ __html: displayContent || '' }}
            />
          </div>
        </div>
      </section>

      {/* Bottom Download CTA Section - 底部左右布局：左侧横幅，右侧标题+按钮 */}
      {content.attachment_file && (
        <section class="bg-gradient-to-br from-[#6438FF] to-[#5a2ee6] py-12 md:py-16 lg:py-20">
          <div class="site-container px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Left Column: Promotional Banner */}
              <div class="hidden lg:block">
                {displayCoverImage ? (
                  <div class="rounded-xl overflow-hidden shadow-xl">
                    <img 
                      src={displayCoverImage}
                      alt={displayTitle}
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
                  {displayTitle}
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

