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
  video_description?: string
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
  // 视频简介多语言字段
  video_description_zh?: string
  video_description_en?: string
  video_description_jp?: string
  video_description_hk?: string
}

interface RecommendedContent {
  id: number
  title: string
  title_zh?: string
  title_en?: string
  title_jp?: string
  title_hk?: string
  cover_image?: string
  published_at: string
  reading_time?: number
  author?: string
  views: number
  category_slug: string
  category_name: string
}

interface VideoPodcastDetailPageProps {
  language?: Language
  content: Content | null
  category: Category | null
  categories?: Category[]
  recommendedContents?: RecommendedContent[]
}

export const VideoPodcastDetailPage: FC<VideoPodcastDetailPageProps> = ({ 
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
  const getContentField = (field: 'title' | 'content' | 'cover_image' | 'meta_title' | 'meta_description' | 'meta_keywords' | 'video_description') => {
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
    if (field === 'video_description') {
      if (language === 'zh') return content.video_description_zh || content.video_description || ''
      if (language === 'en') return content.video_description_en || content.video_description_zh || content.video_description || ''
      if (language === 'jp') return content.video_description_jp || content.video_description_zh || content.video_description || ''
      if (language === 'hk') return content.video_description_hk || content.video_description_zh || content.video_description || ''
      return content.video_description || ''
    }
    return ''
  }
  
  // 获取处理后的内容字段
  const displayTitle = getContentField('title')
  const displayContent = getContentField('content')
  const displayCoverImage = getContentField('cover_image')
  const displayMetaTitle = getContentField('meta_title')
  const displayMetaDescription = getContentField('meta_description')
  const displayVideoDescription = getContentField('video_description')
  
  // 根据 category_template 确定内容类型
  const contentType: 'video' | 'podcast' = category.category_template === 'list_video' ? 'video' : 'podcast'
  
  // 检测文件类型（音频或视频）
  const isAudioFile = (url?: string): boolean => {
    if (!url) return false
    const audioExtensions = ['.mp3', '.wav', '.ogg', '.aac', '.m4a', '.webm']
    const lowerUrl = url.toLowerCase()
    return audioExtensions.some(ext => lowerUrl.includes(ext))
  }
  
  const isVideoFile = (url?: string): boolean => {
    if (!url) return false
    const videoExtensions = ['.mp4', '.avi', '.mov', '.wmv', '.webm']
    const lowerUrl = url.toLowerCase()
    return videoExtensions.some(ext => lowerUrl.includes(ext))
  }
  
  const mediaFileType = content.video_file 
    ? (isAudioFile(content.video_file) ? 'audio' : isVideoFile(content.video_file) ? 'video' : 'unknown')
    : 'none'

  // 构建结构化数据（JSON-LD）用于 SEO
  const structuredData = contentType === 'video' ? {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": displayTitle,
    "description": displayMetaDescription || displayVideoDescription || displayContent?.replace(/<[^>]*>/g, '').substring(0, 200) || '',
    "thumbnailUrl": displayCoverImage || '',
    "uploadDate": content.published_at,
    "contentUrl": content.video_file || '',
    "author": {
      "@type": "Person",
      "name": content.author || "ZENAVA"
    }
  } : {
    "@context": "https://schema.org",
    "@type": "PodcastEpisode",
    "name": displayTitle,
    "description": displayMetaDescription || displayVideoDescription || displayContent?.replace(/<[^>]*>/g, '').substring(0, 200) || '',
    "image": displayCoverImage || '',
    "datePublished": content.published_at,
    "author": {
      "@type": "Person",
      "name": content.author || "ZENAVA"
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

      {/* Main Content Section - Two Column Layout */}
      <section class="bg-white py-8 md:py-12 lg:py-16">
        <div class="site-container px-4 sm:px-6 lg:px-8">
          {/* Title and Author Section - Full Width */}
          <div class="mb-6 md:mb-8">
            <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
              {displayTitle}
            </h1>
            
            {/* Author and Publication Info - Left: Avatar, Right: Author (top) and Published Date (bottom) */}
            <div class="flex items-start gap-4 mb-4">
              {/* Left: Avatar */}
              <div class="flex-shrink-0">
                <div class="w-12 h-12 md:w-14 md:h-14 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                  {content.author_avatar ? (
                    <img 
                      src={content.author_avatar}
                      alt={content.author || 'Author'}
                      class="w-full h-full object-cover"
                    />
                  ) : content.author ? (
                    <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#6438FF] to-[#5a2ee6]">
                      <span class="text-white font-semibold text-lg md:text-xl">
                        {content.author.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  ) : (
                    <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#6438FF] to-[#5a2ee6]">
                      <i class="fas fa-user text-white text-xl md:text-2xl"></i>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Right: Author Name (top) and Published Date (bottom) */}
              <div class="flex flex-col">
                {/* Author Name */}
                {content.author && (
                  <div class="mb-1">
                    <span class="text-gray-900 font-semibold text-base md:text-lg">
                      {content.author}
                    </span>
                  </div>
                )}
                
                {/* Published Date */}
                <div class="text-gray-600 text-sm md:text-base">
                  <span>
                    {new Date(content.published_at).toLocaleDateString(
                      language === 'en' ? 'en-US' : language === 'jp' ? 'ja-JP' : 'zh-CN',
                      { year: 'numeric', month: 'long', day: 'numeric' }
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Video Player and Sidebar - Two Column Layout */}
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            {/* Left Column: Main Content */}
            <div class="lg:col-span-2">
              {/* Video/Podcast Player Section */}
              <div class="mb-8 md:mb-12">
                {contentType === 'video' && content.video_file ? (
                  mediaFileType === 'audio' ? (
                    <AudioPlayer 
                      audioFile={content.video_file}
                      coverImage={displayCoverImage}
                      language={language}
                    />
                  ) : mediaFileType === 'video' ? (
                    <VideoPlayer 
                      videoFile={content.video_file}
                      coverImage={displayCoverImage}
                      language={language}
                    />
                  ) : (
                    <div class="aspect-video bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 rounded-xl flex items-center justify-center">
                      <div class="text-center">
                        <i class="fas fa-file text-4xl md:text-5xl text-gray-400 mb-3"></i>
                        <p class="text-sm md:text-base text-gray-500">
                          {language === 'zh' ? '不支持的文件格式' : language === 'en' ? 'Unsupported file format' : language === 'jp' ? 'サポートされていないファイル形式' : '不支援的檔案格式'}
                        </p>
                      </div>
                    </div>
                  )
                ) : (
                  <div class="aspect-video bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 rounded-xl flex items-center justify-center">
                    <div class="text-center">
                      <i class="fas fa-video text-4xl md:text-5xl text-gray-400 mb-3"></i>
                      <p class="text-sm md:text-base text-gray-500">
                        {language === 'zh' ? '暂无视频' : language === 'en' ? 'No Video' : language === 'jp' ? 'ビデオなし' : '暫無視頻'}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Sidebar - Aligned with Video Player */}
            <div class="lg:col-span-1">
              {/* Video Description Section (Black Card) */}
              <div class="bg-black rounded-xl p-6 md:p-8 text-white">
                <h3 class="text-xl md:text-2xl font-bold mb-4 whitespace-pre-line">
                  {displayVideoDescription || (
                    language === 'zh' ? '上传、编辑和分享您的视频 - 不允许广告' : language === 'en' ? 'Upload, edit, and share your videos - no ads allowed' : language === 'jp' ? '動画をアップロード、編集、共有 - 広告なし' : '上傳、編輯和分享您的視頻 - 不允許廣告'
                  )}
                </h3>
                <p class="text-gray-300 mb-6 text-sm md:text-base leading-relaxed">
                  {!displayVideoDescription && (
                    language === 'zh' ? '无论您的经验如何，都可以轻松上传、创建或录制视频。然后快速编辑并按您想要的方式分享它们。' : language === 'en' ? 'Easily upload, create, or record videos, regardless of your experience. Then quickly edit and share them exactly how you want.' : language === 'jp' ? '経験に関係なく、簡単に動画をアップロード、作成、または録画できます。次に、迅速に編集して、希望どおりに共有します。' : '無論您的經驗如何，都可以輕鬆上傳、創建或錄製視頻。然後快速編輯並按您想要的方式分享它們。'
                  )}
                </p>
                
                {/* Social Icons - Optional, can be removed if not needed */}
                <div class="flex items-center space-x-4 mb-6">
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" class="text-white hover:text-[#00D9FF] transition-colors" aria-label="Twitter">
                    <i class="fab fa-twitter text-xl md:text-2xl"></i>
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="text-white hover:text-[#00D9FF] transition-colors" aria-label="LinkedIn">
                    <i class="fab fa-linkedin text-xl md:text-2xl"></i>
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" class="text-white hover:text-[#00D9FF] transition-colors" aria-label="YouTube">
                    <i class="fab fa-youtube text-xl md:text-2xl"></i>
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="text-white hover:text-[#00D9FF] transition-colors" aria-label="Instagram">
                    <i class="fab fa-instagram text-xl md:text-2xl"></i>
                  </a>
                  <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" class="text-white hover:text-[#00D9FF] transition-colors" aria-label="TikTok">
                    <i class="fab fa-tiktok text-xl md:text-2xl"></i>
                  </a>
                </div>
                
                {/* Contact Button */}
                <a
                  href={language === 'zh' ? '/contact' : `/${language}/contact`}
                  class="inline-flex items-center justify-center w-full px-6 py-3 bg-[#00D9FF] text-white rounded-lg font-semibold hover:bg-[#00C5E6] transition-all transform hover:scale-105"
                >
                  {language === 'zh' ? '联系我们' : language === 'en' ? 'Contact Us' : language === 'jp' ? 'お問い合わせ' : '聯繫我們'}
                  <i class="fas fa-arrow-right ml-2"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Content Description Section - Centered across full width */}
          <div class="mt-8 md:mt-12">
            <div class="resource-content max-w-4xl mx-auto">
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
                    .resource-content ul, .resource-content ol {
                      margin-bottom: 1.5rem;
                      padding-left: 1.5rem;
                    }
                    .resource-content li {
                      margin-bottom: 0.75rem;
                    }
                    .resource-content a {
                      color: #6438FF;
                      text-decoration: underline;
                      transition: color 0.2s;
                    }
                    .resource-content a:hover {
                      color: #5a2ee6;
                    }
                    .resource-content img {
                      max-width: 90%;
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
                  dangerouslySetInnerHTML={{ __html: displayContent || '' }}
                />
              </div>
          </div>
        </div>
      </section>

      {/* Related Recommendations Section */}
      {recommendedContents && recommendedContents.length > 0 && (
        <section class="bg-gray-50 py-12 md:py-16 lg:py-20">
          <div class="site-container px-4 sm:px-6 lg:px-8">
            <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-8 md:mb-12 text-center">
              {language === 'zh' ? '相关推荐' : language === 'en' ? 'Related Recommendations' : language === 'jp' ? '関連おすすめ' : '相關推薦'}
            </h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {recommendedContents.map((item: RecommendedContent) => {
                // 获取多语言标题
                const getTitle = () => {
                  if (language === 'zh') return item.title_zh || item.title || '文章标题'
                  if (language === 'en') return item.title_en || item.title || 'Article Title'
                  if (language === 'jp') return item.title_jp || item.title || '記事タイトル'
                  if (language === 'hk') return item.title_hk || item.title || '文章標題'
                  return item.title || 'Article Title'
                }
                
                // 格式化日期 - 按照设计图格式 "August 14th, 2025"
                const formatDate = () => {
                  if (!item.published_at) return ''
                  const date = new Date(item.published_at)
                  const day = date.getDate()
                  const month = date.toLocaleDateString(language === 'en' ? 'en-US' : language === 'jp' ? 'ja-JP' : 'zh-CN', { month: 'long' })
                  const year = date.getFullYear()
                  
                  if (language === 'en') {
                    const daySuffix = day === 1 ? 'st' : day === 2 ? 'nd' : day === 3 ? 'rd' : 'th'
                    return `${month} ${day}${daySuffix}, ${year}`
                  } else if (language === 'jp') {
                    return `${year}年${date.getMonth() + 1}月${day}日`
                  } else {
                    return `${year}年${date.getMonth() + 1}月${day}日`
                  }
                }
                
                // 构建链接
                const langPrefix = language === 'zh' ? '' : `/${language}`
                const contentLink = `${langPrefix}/resources/${item.category_slug}/${item.id}`
                
                return (
                  <a
                    key={item.id}
                    href={contentLink}
                    class="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] overflow-hidden block group"
                  >
                    {/* Cover Image with Play Icon */}
                    <div class="aspect-video bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 relative overflow-hidden">
                      {item.cover_image ? (
                        <img 
                          src={item.cover_image}
                          alt={getTitle()}
                          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                          onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
                        />
                      ) : null}
                      {/* Placeholder */}
                      <div class={`${item.cover_image ? 'hidden' : 'flex'} w-full h-full items-center justify-center bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 absolute inset-0`}>
                        <div class="text-center">
                          <i class="fas fa-image text-2xl md:text-3xl text-gray-400 mb-2"></i>
                          <p class="text-xs md:text-sm text-gray-500">
                            {language === 'zh' ? '暂无图片' : language === 'en' ? 'No Image' : language === 'jp' ? '画像なし' : '暫無圖片'}
                          </p>
                        </div>
                      </div>
                      {/* Play Icon Overlay */}
                      <div class="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-all">
                        <div class="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/90 flex items-center justify-center">
                          <i class="fas fa-play text-[#6438FF] text-lg md:text-xl ml-1"></i>
                        </div>
                      </div>
                      {/* Category Badge */}
                      {item.category_name && (
                        <div class="absolute top-2 left-2">
                          <span class="bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium text-gray-700 border border-gray-300">
                            {item.category_name}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    {/* Card Content */}
                    <div class="p-4 md:p-6">
                      <h3 class="text-base md:text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#6438FF] transition-colors">
                        {getTitle()}
                      </h3>
                      <p class="text-xs md:text-sm text-gray-500">
                        {formatDate()}
                      </p>
                    </div>
                  </a>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Video Player Script */}
      <script dangerouslySetInnerHTML={{
        __html: `
          (function() {
            // Handle video play button click
            window.handlePlayVideo = function() {
              const videoPlayer = document.getElementById('video-player');
              const playButton = document.getElementById('play-button');
              const errorMessage = document.getElementById('error-message');
              
              if (videoPlayer) {
                // Show video player
                videoPlayer.classList.remove('hidden');
                videoPlayer.classList.add('relative', 'z-20');
                
                // Hide play button
                if (playButton) {
                  playButton.style.display = 'none';
                }
                
                // Try to play video
                try {
                  const playPromise = videoPlayer.play();
                  
                  if (playPromise !== undefined) {
                    playPromise.catch(function(error) {
                      console.error('Video play error:', error);
                      if (errorMessage) {
                        errorMessage.classList.remove('hidden');
                      }
                      // Show play button again on error
                      if (playButton) {
                        playButton.style.display = 'flex';
                      }
                      videoPlayer.classList.add('hidden');
                    });
                  }
                } catch (error) {
                  console.error('Video play error:', error);
                  if (errorMessage) {
                    errorMessage.classList.remove('hidden');
                  }
                  // Show play button again on error
                  if (playButton) {
                    playButton.style.display = 'flex';
                  }
                  videoPlayer.classList.add('hidden');
                }
              }
            };
            
            // Handle video error
            const videoPlayer = document.getElementById('video-player');
            if (videoPlayer) {
              videoPlayer.addEventListener('error', function() {
                const errorMessage = document.getElementById('error-message');
                if (errorMessage) {
                  errorMessage.classList.remove('hidden');
                }
              });
            }
            
            // Handle podcast player error
            const podcastPlayer = document.getElementById('podcast-player');
            if (podcastPlayer) {
              podcastPlayer.addEventListener('error', function() {
                console.error('Podcast playback error');
                // Show error message if needed
              });
            }
          })();
        `
      }} />
    </>
  )
}

// Video Player Component
const VideoPlayer: FC<{ videoFile?: string; coverImage?: string; language: Language }> = ({ videoFile, coverImage, language }) => {
  return (
    <div class="relative w-full aspect-video bg-black rounded-xl overflow-hidden">
      {videoFile ? (
        // HTML5 Video Player
        <video
          id="video-player"
          class="w-full h-full"
          controls
          preload="metadata"
          poster={coverImage || ''}
        >
          <source src={videoFile} type="video/mp4" />
          {language === 'zh' ? '您的浏览器不支持视频播放。' : language === 'en' ? 'Your browser does not support video playback.' : language === 'jp' ? 'お使いのブラウザは動画再生をサポートしていません。' : '您的瀏覽器不支持視頻播放。'}
        </video>
      ) : (
        // Placeholder
        <div class="relative w-full h-full bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300">
          {coverImage ? (
            <img 
              src={coverImage}
              alt="Video Cover"
              class="w-full h-full object-cover absolute inset-0"
              onerror="this.style.display='none';"
            />
          ) : (
            <div class="w-full h-full flex items-center justify-center">
              <div class="text-center">
                <i class="fas fa-video text-4xl md:text-5xl text-gray-400 mb-3"></i>
                <p class="text-sm md:text-base text-gray-500">
                  {language === 'zh' ? '暂无视频' : language === 'en' ? 'No Video' : language === 'jp' ? 'ビデオなし' : '暫無視頻'}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// Audio Player Component with Waveform Cover
const AudioPlayer: FC<{ audioFile?: string; coverImage?: string; language: Language }> = ({ audioFile, coverImage, language }) => {
  return (
    <div class="relative w-full aspect-video bg-gradient-to-br from-[#6438FF] via-[#5a2ee6] to-[#4a1fd4] rounded-xl overflow-hidden shadow-xl">
      {/* Waveform Cover Image */}
      <div class="absolute inset-0 flex items-center justify-center">
        {coverImage ? (
          <img 
            src={coverImage}
            alt="Audio Cover"
            class="w-full h-full object-cover opacity-30"
            onerror="this.style.display='none';"
          />
        ) : null}
        {/* Waveform SVG Overlay */}
        <div class="absolute inset-0 flex items-center justify-center">
          <svg class="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
            {/* Background gradient */}
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:#00D9FF;stop-opacity:0.8" />
                <stop offset="50%" style="stop-color:#6438FF;stop-opacity:0.8" />
                <stop offset="100%" style="stop-color:#00D9FF;stop-opacity:0.8" />
              </linearGradient>
            </defs>
            {/* Waveform bars */}
            <rect x="20" y="80" width="8" height="40" fill="url(#waveGradient)" rx="4">
              <animate attributeName="height" values="40;80;40" dur="1s" repeatCount="indefinite" />
            </rect>
            <rect x="40" y="70" width="8" height="60" fill="url(#waveGradient)" rx="4">
              <animate attributeName="height" values="60;100;60" dur="1.2s" repeatCount="indefinite" />
            </rect>
            <rect x="60" y="60" width="8" height="80" fill="url(#waveGradient)" rx="4">
              <animate attributeName="height" values="80;120;80" dur="0.8s" repeatCount="indefinite" />
            </rect>
            <rect x="80" y="50" width="8" height="100" fill="url(#waveGradient)" rx="4">
              <animate attributeName="height" values="100;140;100" dur="1s" repeatCount="indefinite" />
            </rect>
            <rect x="100" y="40" width="8" height="120" fill="url(#waveGradient)" rx="4">
              <animate attributeName="height" values="120;160;120" dur="0.9s" repeatCount="indefinite" />
            </rect>
            <rect x="120" y="50" width="8" height="100" fill="url(#waveGradient)" rx="4">
              <animate attributeName="height" values="100;140;100" dur="1.1s" repeatCount="indefinite" />
            </rect>
            <rect x="140" y="60" width="8" height="80" fill="url(#waveGradient)" rx="4">
              <animate attributeName="height" values="80;120;80" dur="0.7s" repeatCount="indefinite" />
            </rect>
            <rect x="160" y="70" width="8" height="60" fill="url(#waveGradient)" rx="4">
              <animate attributeName="height" values="60;100;60" dur="1s" repeatCount="indefinite" />
            </rect>
            <rect x="180" y="80" width="8" height="40" fill="url(#waveGradient)" rx="4">
              <animate attributeName="height" values="40;80;40" dur="1.2s" repeatCount="indefinite" />
            </rect>
            <rect x="200" y="70" width="8" height="60" fill="url(#waveGradient)" rx="4">
              <animate attributeName="height" values="60;100;60" dur="0.9s" repeatCount="indefinite" />
            </rect>
            <rect x="220" y="60" width="8" height="80" fill="url(#waveGradient)" rx="4">
              <animate attributeName="height" values="80;120;80" dur="1s" repeatCount="indefinite" />
            </rect>
            <rect x="240" y="50" width="8" height="100" fill="url(#waveGradient)" rx="4">
              <animate attributeName="height" values="100;140;100" dur="1.1s" repeatCount="indefinite" />
            </rect>
            <rect x="260" y="40" width="8" height="120" fill="url(#waveGradient)" rx="4">
              <animate attributeName="height" values="120;160;120" dur="0.8s" repeatCount="indefinite" />
            </rect>
            <rect x="280" y="50" width="8" height="100" fill="url(#waveGradient)" rx="4">
              <animate attributeName="height" values="100;140;100" dur="1s" repeatCount="indefinite" />
            </rect>
            <rect x="300" y="60" width="8" height="80" fill="url(#waveGradient)" rx="4">
              <animate attributeName="height" values="80;120;80" dur="1.2s" repeatCount="indefinite" />
            </rect>
            <rect x="320" y="70" width="8" height="60" fill="url(#waveGradient)" rx="4">
              <animate attributeName="height" values="60;100;60" dur="0.9s" repeatCount="indefinite" />
            </rect>
            <rect x="340" y="80" width="8" height="40" fill="url(#waveGradient)" rx="4">
              <animate attributeName="height" values="40;80;40" dur="1s" repeatCount="indefinite" />
            </rect>
            <rect x="360" y="75" width="8" height="50" fill="url(#waveGradient)" rx="4">
              <animate attributeName="height" values="50;90;50" dur="1.1s" repeatCount="indefinite" />
            </rect>
          </svg>
        </div>
        
        {/* Audio Icon */}
        <div class="relative z-10 flex flex-col items-center justify-center text-white">
          <div class="mb-4">
            <i class="fas fa-music text-5xl md:text-6xl opacity-90"></i>
          </div>
          <p class="text-sm md:text-base font-medium opacity-80">
            {language === 'zh' ? '音频播放' : language === 'en' ? 'Audio Player' : language === 'jp' ? 'オーディオプレーヤー' : '音頻播放'}
          </p>
        </div>
      </div>
      
      {/* Audio Player Controls - Bottom */}
      <div class="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-sm p-4 md:p-6">
        <audio
          id="audio-player"
          class="w-full"
          controls
          preload="metadata"
          style="height: 48px;"
        >
          <source src={audioFile || ''} type="audio/mpeg" />
          <source src={audioFile || ''} type="audio/mp3" />
          <source src={audioFile || ''} type="audio/wav" />
          <source src={audioFile || ''} type="audio/ogg" />
          <source src={audioFile || ''} type="audio/aac" />
          <source src={audioFile || ''} type="audio/mp4" />
          <source src={audioFile || ''} type="audio/webm" />
          <source src={audioFile || ''} type="audio/x-m4a" />
          {language === 'zh' ? '您的浏览器不支持音频播放。' : language === 'en' ? 'Your browser does not support audio playback.' : language === 'jp' ? 'お使いのブラウザは音声再生をサポートしていません。' : '您的瀏覽器不支持音頻播放。'}
        </audio>
      </div>
    </div>
  )
}

// Podcast Player Component
const PodcastPlayer: FC<{ podcastData: any; language: Language }> = ({ podcastData, language }) => {
  return (
    <div class="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Cover Image */}
      <div class="aspect-square bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 relative">
        <img 
          src={podcastData?.coverImage || '/assets/images/resources/podcast-cover.jpg'}
          alt="Podcast Cover"
          class="w-full h-full object-cover"
          loading="eager"
          onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
        />
        {/* Placeholder */}
        <div class="hidden w-full h-full items-center justify-center bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 absolute inset-0">
          <div class="text-center">
            <i class="fas fa-microphone text-4xl md:text-5xl text-gray-400 mb-3"></i>
            <p class="text-sm md:text-base text-gray-500">
              {language === 'zh' ? '暂无图片' : language === 'en' ? 'No Image' : language === 'jp' ? '画像なし' : '暫無圖片'}
            </p>
          </div>
        </div>
      </div>
      
      {/* Audio Player Controls */}
      <div class="p-4 md:p-6 bg-gray-50">
        <audio
          id="podcast-player"
          class="w-full"
          controls
          preload="metadata"
        >
          <source src={podcastData?.audioUrl || ''} type="audio/mpeg" />
          <source src={podcastData?.audioUrl || ''} type="audio/mp3" />
          {language === 'zh' ? '您的浏览器不支持音频播放。' : language === 'en' ? 'Your browser does not support audio playback.' : language === 'jp' ? 'お使いのブラウザは音声再生をサポートしていません。' : '您的瀏覽器不支持音頻播放。'}
        </audio>
      </div>
    </div>
  )
}


