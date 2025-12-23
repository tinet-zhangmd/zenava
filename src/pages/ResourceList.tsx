import { FC } from 'hono/jsx'
import { Language } from '../utils/i18n'
import { getTranslations } from '../i18n/translations'

interface Category {
  id: number
  name: string
  slug: string
  description?: string
  cover_image?: string
  category_template: string
}

interface ResourceContent {
  id: number
  title: string
  content: string
  author?: string
  cover_image?: string
  reading_time?: number
  video_file?: string
  attachment_file?: string
  attachment_name?: string
  published_at: string
  views: number
  downloads: number
}

interface Banner {
  id: number
  banner_type: 'text_image' | 'full_image'
  title: string
  sort_order: number
  status: 'draft' | 'published'
  text_title?: string
  text_subtitle?: string
  text_button?: string
  text_title_zh?: string
  text_title_en?: string
  text_title_jp?: string
  text_title_hk?: string
  text_subtitle_zh?: string
  text_subtitle_en?: string
  text_subtitle_jp?: string
  text_subtitle_hk?: string
  text_button_zh?: string
  text_button_en?: string
  text_button_jp?: string
  text_button_hk?: string
  button_link?: string
  button_target?: string
  text_position?: string
  text_color?: string
  subtitle_color?: string
  background_type?: string
  background_url?: string
  background_url_zh?: string
  background_url_en?: string
  background_url_jp?: string
  background_url_hk?: string
  full_image_url?: string
  link_url?: string
  link_target?: string
}

interface ResourceListPageProps {
  language?: Language
  resourceType?: string
  page?: number
  category?: Category | null  // 当前栏目信息
  contents?: ResourceContent[]  // 当前栏目的内容列表
  categories?: Category[]  // 所有栏目（用于导航）
  categoryBanners?: Banner[]  // 栏目Banner数据（用于轮播）
}

// 辅助函数：处理内容，移除图片和视频，只保留文字
function extractTextContent(htmlContent: string): string {
  if (!htmlContent) return ''
  let textContent = htmlContent
  
  // 第一步：先移除所有包含 base64 图片数据的内容（在移除HTML标签之前）
  // 这样可以确保即使标签格式不完整，base64数据也能被移除
  
  // 移除完整的 <img> 标签（包括包含 base64 的，使用非贪婪匹配处理跨行）
  textContent = textContent.replace(/<img[\s\S]*?>/gi, '')
  
  // 移除可能不完整的 <img 标签片段（包括跨行的情况，匹配到字符串结束或遇到 >）
  textContent = textContent.replace(/<img[\s\S]*?(?=>|$)/gi, '')
  
  // 移除所有包含 data:image 的内容（无论是否在标签内，匹配到空格、引号、<、>或字符串结束）
  // 使用更宽松的匹配，包括可能被截断的 base64 字符串
  textContent = textContent.replace(/data:image\/[^"'\s<>]*/gi, '')
  
  // 移除 base64 字符串（常见的图片格式标识符，包括可能被截断的）
  // 匹配 /9j/ 开头的 base64 字符串（JPEG格式）
  textContent = textContent.replace(/\/9j\/[A-Za-z0-9+/=\s\n\r]*/gi, '')
  // 匹配 iVBORw0KGgo 开头的 base64 字符串（PNG格式）
  textContent = textContent.replace(/iVBORw0KGgo[A-Za-z0-9+/=\s\n\r]*/gi, '')
  
  // 移除包含 "base64" 关键词的文本片段（包括可能被截断的）
  textContent = textContent.replace(/base64[,:][A-Za-z0-9+/=\s\n\r]*/gi, '')
  
  // 移除 src="data:image..." 这样的属性片段
  textContent = textContent.replace(/src\s*=\s*["']?\s*data:image[^"'\s<>]*/gi, '')
  
  // 第二步：移除所有视频相关的标签
  textContent = textContent.replace(/<video[\s\S]*?<\/video>/gi, '')
  textContent = textContent.replace(/<video[\s\S]*?>/gi, '')
  
  // 第三步：移除所有其他HTML标签（包括多行标签）
  textContent = textContent.replace(/<[^>]+>/g, '')
  
  // 第四步：再次清理可能残留的 base64 相关内容（在移除HTML标签后）
  // 移除任何看起来像 base64 的长字符串（至少20个字符）
  textContent = textContent.replace(/[A-Za-z0-9+/=]{20,}/g, (match) => {
    // 如果匹配的字符串看起来像 base64（包含很多 = 或 / 或 +），则移除
    const base64Chars = (match.match(/[+/=]/g) || []).length
    const totalLength = match.length
    // 如果 base64 特征字符占比超过 5%，很可能是 base64 数据
    if (base64Chars > 2 && base64Chars / totalLength > 0.05) {
      return ''
    }
    return match
  })
  
  // 移除可能残留的 "data:image" 或 "base64" 文本（包括可能被截断的）
  textContent = textContent.replace(/data:image[^\s]*/gi, '')
  textContent = textContent.replace(/base64[^\s]*/gi, '')
  
  // 移除可能残留的 <img 文本（即使标签已被部分移除）
  textContent = textContent.replace(/<img[^\s>]*/gi, '')
  
  // 解码HTML实体（如 &nbsp; &lt; &gt; 等）
  textContent = textContent
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
  
  // 清理多余的空白字符（包括换行符、制表符等）
  textContent = textContent.replace(/[\s\n\r\t]+/g, ' ').trim()
  
  return textContent
}

export const ResourceListPage: FC<ResourceListPageProps> = ({ 
  language = 'zh', 
  resourceType = 'all',
  page = 1,
  category = null,
  contents = [],
  categories = [],
  categoryBanners = []
}) => {
  const trans = getTranslations(language)
  const t = trans.resourcesCenter || {}
  
  // 如果有 category，使用栏目数据；否则使用默认配置
  const resourceTypeConfig = category 
    ? {
        heroTitle: category.name,
        heroDescription: category.description || '',
        heroImage: category.cover_image || '/assets/images/resources/hero-default.jpg',
        heroImageAlt: category.name,
        heroLink: '#'
      }
    : getResourceTypeConfig(resourceType, language)
  
  // 使用实际的内容数据
  const itemsPerPage = 9
  const totalItems = contents.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const currentPage = Math.min(Math.max(1, page || 1), totalPages)
  
  // 对 contents 进行分页切片，每页显示9条
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = contents.slice(startIndex, endIndex)

  // 将栏目Banner数据转换为轮播格式
  const convertCategoryBannersToSlides = (banners: Banner[]) => {
    return banners.map((banner) => {
      if (banner.banner_type === 'full_image') {
        // 整张大图模式
        return {
          id: `category-banner-${banner.id}`,
          layout: 'full-image',
          image: banner.full_image_url || '',
          link: banner.link_url || '#',
          target: banner.link_target || '_self'
        }
      } else {
        // 文字+图片模式
        const langPrefix = language === 'en' ? '' : `/${language}`
        const buttonLink = banner.button_link || '#'
        const fullLink = buttonLink.startsWith('/') 
          ? (buttonLink.startsWith('/resources') 
              ? `${langPrefix}${buttonLink}` 
              : buttonLink)
          : buttonLink
        
        // 根据语言获取对应的背景URL
        const backgroundUrl = banner[`background_url_${language}`] || banner.background_url_zh || banner.background_url || ''
        
        // 判断背景是图片还是视频
        const isVideo = banner.background_type === 'video' || 
          (backgroundUrl && /\.(mp4|webm|ogg|mov|avi|wmv)$/i.test(backgroundUrl))
        
        // 处理文字颜色
        let textColor = banner.text_color || 'rgba(31, 41, 55, 1)'
        let subtitleColor = banner.subtitle_color || 'rgba(75, 85, 99, 1)'
        
        // 如果颜色是白色或接近白色，自动改为深色
        if (textColor && (
          textColor.includes('255,255,255') || 
          textColor.toLowerCase() === '#ffffff' || 
          textColor.toLowerCase() === '#fff' ||
          textColor.toLowerCase() === 'white'
        )) {
          textColor = 'rgba(31, 41, 55, 1)'
        }
        
        if (subtitleColor && (
          subtitleColor.includes('255,255,255') || 
          subtitleColor.toLowerCase() === '#ffffff' || 
          subtitleColor.toLowerCase() === '#fff' ||
          subtitleColor.toLowerCase() === 'white'
        )) {
          subtitleColor = 'rgba(75, 85, 99, 1)'
        }
        
        // 根据语言获取文字内容
        const textTitle = banner[`text_title_${language}`] || banner.text_title_zh || banner.text_title || ''
        const textSubtitle = banner[`text_subtitle_${language}`] || banner.text_subtitle_zh || banner.text_subtitle || ''
        const textButton = banner[`text_button_${language}`] || banner.text_button_zh || banner.text_button || ''
        
        return {
          id: `category-banner-${banner.id}`,
          layout: 'text-image',
          title: textTitle,
          description: textSubtitle,
          buttonText: textButton,
          image: backgroundUrl,
          isVideo: isVideo,
          link: fullLink,
          target: banner.button_target || '_self',
          textPosition: banner.text_position || 'left',
          textColor: textColor,
          subtitleColor: subtitleColor
        }
      }
    })
  }

  // 转换栏目Banner为轮播数据（最多8个）
  const categoryBannerSlides = categoryBanners.length > 0 
    ? convertCategoryBannersToSlides(categoryBanners).slice(-8)
    : []
  const showCategoryBanner = categoryBannerSlides.length > 0

  return (
    <>
      {/* Resource Center Sub-Navigation */}
      <section class="bg-[#6438FF] sticky top-0 z-30">
        <div class="site-container px-4 sm:px-6 lg:px-8">
          <nav class="flex items-center justify-center space-x-6 md:space-x-8 overflow-x-auto py-4">
            {/* 所有资源 */}
            <a
              href={language === 'zh' ? '/resources' : `/${language}/resources`}
              class={`whitespace-nowrap text-sm md:text-base font-medium text-white transition-all pb-2 relative ${
                !category ? 'border-b-2 border-white' : 'hover:opacity-80'
              }`}
            >
              {language === 'zh' ? '所有资源' : language === 'en' ? 'All Resources' : language === 'jp' ? 'すべてのリソース' : '所有資源'}
            </a>
            
            {/* 动态栏目 */}
            {categories.map((cat) => {
              const basePath = language === 'zh' ? '/resources' : `/${language}/resources`
              const href = cat.slug.startsWith('/') ? cat.slug : `${basePath}/${cat.slug}`
              const isActive = category && cat.id === category.id
              
              return (
                <a
                  key={cat.id}
                  href={href}
                  class={`whitespace-nowrap text-sm md:text-base font-medium text-white transition-all pb-2 relative ${
                    isActive ? 'border-b-2 border-white' : 'hover:opacity-80'
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
            {category && (
              <>
                <i class="fas fa-chevron-right text-gray-400 text-xs"></i>
                <span class="text-gray-900 font-medium">
                  {category.name}
                </span>
              </>
            )}
          </nav>
        </div>
      </section>

      {/* Hero Section */}
      <section class="relative bg-white overflow-hidden py-12 md:py-16 lg:py-20">
        <div class="site-container px-4 sm:px-6 lg:px-8">
          {/* 第一行：栏目标题 */}
          <h1 class="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">
            {category?.name || resourceTypeConfig.heroTitle}
          </h1>
          
          {/* 第二行：栏目描述 */}
          <p class="text-xs md:text-sm text-gray-600 leading-relaxed mb-8 md:mb-12">
            {category?.description || resourceTypeConfig.heroDescription}
          </p>
          
          {/* Category Banner Carousel - 栏目Banner轮播（原来的Banner位置） */}
          {showCategoryBanner ? (
            <div id="category-banner-carousel" class="relative overflow-hidden mb-8 md:mb-12" style="height: 500px;">
              {/* Banner Slides Container */}
              <div id="category-banner-slides" class="absolute inset-0"></div>
            </div>
          ) : null}
        </div>
      </section>

      {/* Resource List Section */}
      <section class="py-12 md:py-16 lg:py-20 bg-white">
        <div class="site-container px-4 sm:px-6 lg:px-8">
          <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-8 md:mb-12">
            {resourceTypeConfig.listTitle || (language === 'zh' ? '所有信息展示' : language === 'en' ? 'All Resources' : language === 'jp' ? 'すべての情報' : '所有資訊展示')}
          </h2>
          
          {/* Resource Cards Grid */}
          {currentItems.length > 0 ? (
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
              {currentItems.map((item, index) => {
                const basePath = language === 'zh' ? '/resources' : `/${language}/resources`
                const itemLink = category ? `${basePath}/${category.slug}/${item.id}` : '#'
                
                return (
                  <a
                    key={item.id}
                    href={itemLink}
                    class="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] overflow-hidden block group"
                  >
                    {/* Cover Image */}
                    <div class="aspect-video bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 relative overflow-hidden">
                      {item.cover_image ? (
                        <img 
                          src={item.cover_image}
                          alt={item.title}
                          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading={index < 3 ? 'eager' : 'lazy'}
                        />
                      ) : (
                        <div class="w-full h-full flex items-center justify-center">
                          <div class="text-center">
                            <i class="fas fa-image text-2xl md:text-3xl text-gray-400 mb-2"></i>
                            <p class="text-xs md:text-sm text-gray-500">
                              {language === 'zh' ? '暂无图片' : language === 'en' ? 'No Image' : language === 'jp' ? '画像なし' : '暫無圖片'}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Card Content */}
                    <div class="p-6">
                      {/* Meta Info: 发布时间和阅读时间 */}
                      <div class="flex items-center justify-between text-xs md:text-sm text-gray-500 mb-3">
                        <div class="flex items-center flex-wrap gap-2">
                          <span>{new Date(item.published_at).toLocaleDateString(language === 'en' ? 'en-US' : 'zh-CN')}</span>
                          {item.reading_time && (
                            <>
                              <span>·</span>
                              <span>{item.reading_time} min</span>
                            </>
                          )}
                        </div>
                        {item.author && (
                          <span class="text-gray-600">
                            {language === 'zh' ? '作者：' : language === 'en' ? 'Author: ' : language === 'jp' ? '著者：' : '作者：'}
                            {item.author}
                          </span>
                        )}
                      </div>
                      
                      {/* Title */}
                      <h3 class="text-lg md:text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-[#6438FF] transition-colors">
                        {item.title}
                      </h3>
                      
                      {/* Description */}
                      {(() => {
                        const textContent = extractTextContent(item.content || '')
                        return textContent ? (
                          <p class="text-gray-600 text-sm md:text-base line-clamp-3 mb-4">
                            {textContent}
                          </p>
                        ) : null
                      })()}
                      
                      {/* Stats */}
                      <div class="flex items-center justify-between text-sm text-gray-500">
                        <span><i class="fas fa-eye mr-1"></i> {item.views}</span>
                        {item.downloads > 0 && (
                          <span><i class="fas fa-download mr-1"></i> {item.downloads}</span>
                        )}
                      </div>
                    </div>
                  </a>
                )
              })}
            </div>
          ) : (
            <div class="text-center py-16">
              <i class="fas fa-inbox text-5xl text-gray-300 mb-4"></i>
              <p class="text-xl text-gray-500">
                {language === 'zh' ? '暂无内容' : language === 'en' ? 'No content yet' : language === 'jp' ? 'コンテンツがありません' : '暫無內容'}
              </p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div class="flex items-center justify-center space-x-2">
              {/* Previous Button */}
              <a
                href={currentPage > 1 ? getPageUrl(resourceType, language, currentPage - 1) : '#'}
                class={`px-4 py-2 rounded-lg font-medium transition-all ${
                  currentPage > 1
                    ? 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-[#6438FF] hover:text-[#6438FF]'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
                aria-label={language === 'zh' ? '上一页' : language === 'en' ? 'Previous' : language === 'jp' ? '前へ' : '上一頁'}
              >
                <i class="fas fa-chevron-left mr-2"></i>
                {language === 'zh' ? '上一页' : language === 'en' ? 'Previous' : language === 'jp' ? '前へ' : '上一頁'}
              </a>

              {/* Page Numbers */}
              <div class="flex items-center space-x-2">
                {getPaginationPages(currentPage, totalPages).map((pageNum) => {
                  if (pageNum === '...') {
                    return (
                      <span key="ellipsis" class="px-2 text-gray-400">
                        ...
                      </span>
                    )
                  }
                  return (
                    <a
                      key={pageNum}
                      href={getPageUrl(resourceType, language, pageNum as number)}
                      class={`min-w-[40px] px-4 py-2 rounded-lg font-medium text-center transition-all ${
                        pageNum === currentPage
                          ? 'bg-[#6438FF] text-white cursor-default'
                          : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-[#6438FF] hover:text-[#6438FF]'
                      }`}
                      aria-label={`${language === 'zh' ? '第' : language === 'en' ? 'Page ' : language === 'jp' ? 'ページ' : '第'} ${pageNum} ${language === 'zh' ? '页' : language === 'en' ? '' : language === 'jp' ? '' : '頁'}`}
                    >
                      {pageNum}
                    </a>
                  )
                })}
              </div>

              {/* Next Button */}
              <a
                href={currentPage < totalPages ? getPageUrl(resourceType, language, currentPage + 1) : '#'}
                class={`px-4 py-2 rounded-lg font-medium transition-all ${
                  currentPage < totalPages
                    ? 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-[#6438FF] hover:text-[#6438FF]'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
                aria-label={language === 'zh' ? '下一页' : language === 'en' ? 'Next' : language === 'jp' ? '次へ' : '下一頁'}
              >
                {language === 'zh' ? '下一页' : language === 'en' ? 'Next' : language === 'jp' ? '次へ' : '下一頁'}
                <i class="fas fa-chevron-right ml-2"></i>
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Category Banner Carousel Script - 栏目Banner轮播脚本 */}
      {showCategoryBanner && (
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              const categoryBannerSlides = ${JSON.stringify(categoryBannerSlides)};
              const currentLanguage = ${JSON.stringify(language)};
              const slidesContainer = document.getElementById('category-banner-slides');
              
              if (!slidesContainer || categoryBannerSlides.length === 0) return;
              
              let currentSlide = 0;
              let autoPlayInterval = null;
              
              const placeholderTexts = {
                'zh': '暂无图片',
                'en': 'No Image',
                'jp': '画像なし',
                'hk': '暫無圖片'
              };
              const placeholderText = placeholderTexts[currentLanguage] || placeholderTexts['zh'];
              
              // 构建语言前缀
              const langPrefix = currentLanguage === 'en' ? '' : '/' + currentLanguage;
              
              function renderSlide(index) {
                const slide = categoryBannerSlides[index];
                if (!slide) return '';
                
                // 构建多语言链接
                const resourceLink = slide.link || '#';
                const fullLink = resourceLink.startsWith('/') 
                  ? (resourceLink.startsWith('/resources') 
                      ? langPrefix + resourceLink 
                      : resourceLink)
                  : resourceLink;
                
                // 整张大图模式
                if (slide.layout === 'full-image') {
                  const target = slide.target || '_self';
                  return '<div class="category-banner-slide absolute inset-0 transition-opacity duration-700 ' + 
                    (index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0') + '">' +
                    '<a href="' + fullLink + '" target="' + target + '" class="block w-full h-full">' +
                      '<img src="' + slide.image + '" alt="Category Banner" ' +
                      'class="w-full h-full object-cover" ' +
                      'loading="' + (index === 0 ? 'eager' : 'lazy') + '" ' +
                      'onerror="this.style.display=\\'none\\'; this.nextElementSibling.style.display=\\'flex\\';" />' +
                      '<div class="hidden w-full h-full items-center justify-center bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 absolute inset-0">' +
                        '<div class="text-center">' +
                          '<i class="fas fa-image text-4xl md:text-5xl text-gray-400 mb-3"></i>' +
                          '<p class="text-sm md:text-base text-gray-500">' + placeholderText + '</p>' +
                        '</div>' +
                      '</div>' +
                    '</a>' +
                  '</div>';
                }
                
                // 文字+图片模式
                const buttonHtml = slide.buttonText ? 
                  '<a href="' + fullLink + '" target="' + (slide.target || '_self') + '" class="inline-flex items-center px-6 py-3 bg-[#6438FF] text-white rounded-lg font-semibold hover:bg-[#5a2ee6] transition-all transform hover:scale-105">' +
                    slide.buttonText + 
                    '<i class="fas fa-arrow-right ml-2"></i>' +
                  '</a>' : '';
                
                const textColor = slide.textColor || 'rgba(31, 41, 55, 1)';
                const subtitleColor = slide.subtitleColor || 'rgba(75, 85, 99, 1)';
                
                // 判断是视频还是图片
                const isVideo = slide.isVideo || false;
                const hasImage = slide.image && slide.image.trim() !== '';
                
                // 构建图片/视频 HTML
                let mediaHtml = '';
                if (hasImage) {
                  if (isVideo) {
                    mediaHtml = '<video src="' + slide.image + '" ' +
                      'class="w-full aspect-square object-cover rounded-2xl" ' +
                      'autoplay muted loop playsinline ' +
                      'style="pointer-events: none;" ' +
                      'onerror="this.style.display=\\'none\\'; this.nextElementSibling.classList.remove(\\'hidden\\');"></video>';
                  } else {
                    mediaHtml = '<img src="' + slide.image + '" alt="' + (slide.title || 'Banner') + '" ' +
                      'class="w-full aspect-square object-cover rounded-2xl hover:scale-105 transition-transform duration-500" ' +
                      'loading="' + (index === 0 ? 'eager' : 'lazy') + '" ' +
                      'onerror="this.style.display=\\'none\\'; this.nextElementSibling.classList.remove(\\'hidden\\');" />';
                  }
                }
                
                // 占位符
                const placeholderClass = hasImage ? 'hidden' : 'flex';
                const placeholderHtml = '<div class="' + placeholderClass + ' w-full aspect-square items-center justify-center bg-white/50 rounded-2xl">' +
                  '<div class="text-center">' +
                    '<i class="fas fa-image text-4xl md:text-5xl text-gray-400 mb-3"></i>' +
                    '<p class="text-sm md:text-base text-gray-500">' + placeholderText + '</p>' +
                  '</div>' +
                '</div>';
                
                // Pagination dots HTML（放在图片下方最左边，只在当前slide显示）
                const paginationHtml = (categoryBannerSlides.length > 1 && index === currentSlide) ? 
                  '<div class="category-banner-pagination-container flex items-center justify-start space-x-2 mt-4">' +
                    categoryBannerSlides.map(function(_, idx) {
                      return '<button class="w-12 h-1 rounded-full transition-all ' +
                        (idx === currentSlide ? 'bg-[#6438FF]' : 'bg-gray-300') + '" ' +
                        'onclick="categoryBannerGoToSlide(' + idx + ')" ' +
                        'aria-label="Go to slide ' + (idx + 1) + '"></button>';
                    }).join('') +
                  '</div>' : '';
                
                return '<div class="category-banner-slide absolute inset-0 transition-opacity duration-700 ' + 
                  (index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0') + '">' +
                  '<div class="min-h-[500px] flex items-center justify-center">' +
                    '<div class="container mx-auto px-8 md:px-12 lg:px-16 w-full">' +
                      '<div class="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 md:gap-12">' +
                        '<div class="flex flex-col items-center justify-center lg:justify-start w-full">' +
                          '<a href="' + fullLink + '" target="' + (slide.target || '_self') + '" class="block w-full max-w-md mx-auto lg:mx-0">' +
                            mediaHtml +
                            placeholderHtml +
                          '</a>' +
                          paginationHtml +
                        '</div>' +
                        '<div class="flex items-center justify-center lg:justify-start w-full">' +
                          '<div class="max-w-2xl">' +
                            '<a href="' + fullLink + '" target="' + (slide.target || '_self') + '" class="block mb-4">' +
                              '<h2 class="text-2xl md:text-3xl lg:text-4xl font-bold hover:opacity-80 transition-opacity" style="color: ' + textColor + ' !important;">' +
                                (slide.title || 'Banner Title') +
                              '</h2>' +
                            '</a>' +
                            '<p class="text-base md:text-lg mb-6 leading-relaxed" style="color: ' + subtitleColor + ' !important;">' +
                              (slide.description || 'Banner description') +
                            '</p>' +
                            buttonHtml +
                          '</div>' +
                        '</div>' +
                      '</div>' +
                    '</div>' +
                  '</div>' +
                '</div>';
              }
              
              function categoryBannerGoToSlide(index) {
                if (index < 0 || index >= categoryBannerSlides.length) return;
                currentSlide = index;
                updateSlides();
                resetAutoPlay();
              }
              
              function updateSlides() {
                if (!slidesContainer) return;
                slidesContainer.innerHTML = categoryBannerSlides.map(function(_, index) {
                  return renderSlide(index);
                }).join('');
              }
              
              function nextSlide() {
                categoryBannerGoToSlide((currentSlide + 1) % categoryBannerSlides.length);
              }
              
              function startAutoPlay() {
                if (categoryBannerSlides.length <= 1) return;
                autoPlayInterval = setInterval(nextSlide, 10000); // 10秒自动切换
              }
              
              function stopAutoPlay() {
                if (autoPlayInterval) {
                  clearInterval(autoPlayInterval);
                  autoPlayInterval = null;
                }
              }
              
              function resetAutoPlay() {
                stopAutoPlay();
                startAutoPlay();
              }
              
              // Initialize
              updateSlides();
              startAutoPlay();
              
              // Pause on hover
              const carousel = document.getElementById('category-banner-carousel');
              if (carousel) {
                carousel.addEventListener('mouseenter', stopAutoPlay);
                carousel.addEventListener('mouseleave', startAutoPlay);
              }
              
              // Page visibility change
              document.addEventListener('visibilitychange', function() {
                if (document.hidden) {
                  stopAutoPlay();
                } else {
                  startAutoPlay();
                }
              });
              
              // Make goToSlide available globally
              window.categoryBannerGoToSlide = categoryBannerGoToSlide;
            })();
          `
        }} />
      )}

      {/* Pagination Script - Scroll to top on page change */}
      <script dangerouslySetInnerHTML={{
        __html: `
          (function() {
            // Scroll to top smoothly when page changes
            const urlParams = new URLSearchParams(window.location.search);
            const pageParam = urlParams.get('page');
            if (pageParam && parseInt(pageParam) > 1) {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          })();
        `
      }} />
    </>
  )
}

// Helper function to get resource type configuration
function getResourceTypeConfig(resourceType: string, language: Language) {
  const configs: Record<string, Record<Language, any>> = {
    all: {
      zh: {
        title: '所有资源',
        heroTitle: '所有资源',
        heroDescription: '探索 Zenava 的所有资源，包括白皮书、视频、行业报告、产品演示、博客和播客。',
        heroImage: '/assets/images/resources/hero-all.jpg',
        heroImageAlt: '所有资源',
        heroLink: '/contact',
        listTitle: '所有信息展示'
      },
      en: {
        title: 'All Resources',
        heroTitle: 'All Resources',
        heroDescription: 'Explore all Zenava resources including whitepapers, videos, industry reports, product demos, blog posts, and podcasts.',
        heroImage: '/assets/images/resources/hero-all.jpg',
        heroImageAlt: 'All Resources',
        heroLink: '/contact',
        listTitle: 'All Resources'
      },
      jp: {
        title: 'すべてのリソース',
        heroTitle: 'すべてのリソース',
        heroDescription: 'ホワイトペーパー、ビデオ、業界レポート、製品デモ、ブログ投稿、ポッドキャストを含むZenavaのすべてのリソースを探索してください。',
        heroImage: '/assets/images/resources/hero-all.jpg',
        heroImageAlt: 'すべてのリソース',
        heroLink: '/contact',
        listTitle: 'すべての情報'
      },
      hk: {
        title: '所有資源',
        heroTitle: '所有資源',
        heroDescription: '探索 Zenava 的所有資源，包括白皮書、視頻、行業報告、產品演示、博客和播客。',
        heroImage: '/assets/images/resources/hero-all.jpg',
        heroImageAlt: '所有資源',
        heroLink: '/contact',
        listTitle: '所有資訊展示'
      }
    },
    whitepapers: {
      zh: {
        title: '白皮书',
        heroTitle: '白皮书',
        heroDescription: '深入了解行业趋势、最佳实践和技术洞察，通过我们的白皮书获取专业知识和实用指南。',
        heroImage: '/assets/images/resources/hero-whitepapers.jpg',
        heroImageAlt: '白皮书',
        heroLink: '/contact',
        listTitle: '白皮书'
      },
      en: {
        title: 'Whitepapers',
        heroTitle: 'Whitepapers',
        heroDescription: 'Dive deep into industry trends, best practices, and technical insights with our comprehensive whitepapers.',
        heroImage: '/assets/images/resources/hero-whitepapers.jpg',
        heroImageAlt: 'Whitepapers',
        heroLink: '/contact',
        listTitle: 'Whitepapers'
      },
      jp: {
        title: 'ホワイトペーパー',
        heroTitle: 'ホワイトペーパー',
        heroDescription: '業界のトレンド、ベストプラクティス、技術的洞察を深く掘り下げる包括的なホワイトペーパーをご覧ください。',
        heroImage: '/assets/images/resources/hero-whitepapers.jpg',
        heroImageAlt: 'ホワイトペーパー',
        heroLink: '/contact',
        listTitle: 'ホワイトペーパー'
      },
      hk: {
        title: '白皮書',
        heroTitle: '白皮書',
        heroDescription: '深入了解行業趨勢、最佳實踐和技術洞察，通過我們的白皮書獲取專業知識和實用指南。',
        heroImage: '/assets/images/resources/hero-whitepapers.jpg',
        heroImageAlt: '白皮書',
        heroLink: '/contact',
        listTitle: '白皮書'
      }
    },
    video: {
      zh: {
        title: '视频',
        heroTitle: '视频资源',
        heroDescription: '观看产品演示、客户案例和教程视频，直观了解 Zenava AI 如何帮助您的业务。',
        heroImage: '/assets/images/resources/hero-videos.jpg',
        heroImageAlt: '视频',
        heroLink: '/contact',
        listTitle: '视频'
      },
      en: {
        title: 'Videos',
        heroTitle: 'Video Resources',
        heroDescription: 'Watch product demos, customer stories, and tutorial videos to see how Zenava AI can help your business.',
        heroImage: '/assets/images/resources/hero-videos.jpg',
        heroImageAlt: 'Videos',
        heroLink: '/contact',
        listTitle: 'Videos'
      },
      jp: {
        title: 'ビデオ',
        heroTitle: 'ビデオリソース',
        heroDescription: '製品デモ、顧客ストーリー、チュートリアルビデオを視聴して、Zenava AIがビジネスをどのように支援できるかを確認してください。',
        heroImage: '/assets/images/resources/hero-videos.jpg',
        heroImageAlt: 'ビデオ',
        heroLink: '/contact',
        listTitle: 'ビデオ'
      },
      hk: {
        title: '視頻',
        heroTitle: '視頻資源',
        heroDescription: '觀看產品演示、客戶案例和教程視頻，直觀了解 Zenava AI 如何幫助您的業務。',
        heroImage: '/assets/images/resources/hero-videos.jpg',
        heroImageAlt: '視頻',
        heroLink: '/contact',
        listTitle: '視頻'
      }
    },
    reports: {
      zh: {
        title: '行业报告',
        heroTitle: '行业报告',
        heroDescription: '获取最新的行业分析报告和市场洞察，了解 AI 技术在各行业中的应用趋势。',
        heroImage: '/assets/images/resources/hero-reports.jpg',
        heroImageAlt: '行业报告',
        heroLink: '/contact',
        listTitle: '行业报告'
      },
      en: {
        title: 'Industry Reports',
        heroTitle: 'Industry Reports',
        heroDescription: 'Get the latest industry analysis reports and market insights on AI technology trends across industries.',
        heroImage: '/assets/images/resources/hero-reports.jpg',
        heroImageAlt: 'Industry Reports',
        heroLink: '/contact',
        listTitle: 'Industry Reports'
      },
      jp: {
        title: '業界レポート',
        heroTitle: '業界レポート',
        heroDescription: '最新の業界分析レポートと市場洞察を取得し、AI技術の各業界での応用トレンドを理解してください。',
        heroImage: '/assets/images/resources/hero-reports.jpg',
        heroImageAlt: '業界レポート',
        heroLink: '/contact',
        listTitle: '業界レポート'
      },
      hk: {
        title: '行業報告',
        heroTitle: '行業報告',
        heroDescription: '獲取最新的行業分析報告和市場洞察，了解 AI 技術在各行業中的應用趨勢。',
        heroImage: '/assets/images/resources/hero-reports.jpg',
        heroImageAlt: '行業報告',
        heroLink: '/contact',
        listTitle: '行業報告'
      }
    },
    demos: {
      zh: {
        title: '产品演示',
        heroTitle: '产品演示',
        heroDescription: '通过交互式产品演示，亲身体验 Zenava AI 的强大功能和易用性。',
        heroImage: '/assets/images/resources/hero-demos.jpg',
        heroImageAlt: '产品演示',
        heroLink: '/contact',
        listTitle: '产品演示'
      },
      en: {
        title: 'Product Demos',
        heroTitle: 'Product Demos',
        heroDescription: 'Experience the power and ease of use of Zenava AI through interactive product demonstrations.',
        heroImage: '/assets/images/resources/hero-demos.jpg',
        heroImageAlt: 'Product Demos',
        heroLink: '/contact',
        listTitle: 'Product Demos'
      },
      jp: {
        title: '製品デモ',
        heroTitle: '製品デモ',
        heroDescription: 'インタラクティブな製品デモを通じて、Zenava AIの強力な機能と使いやすさを体験してください。',
        heroImage: '/assets/images/resources/hero-demos.jpg',
        heroImageAlt: '製品デモ',
        heroLink: '/contact',
        listTitle: '製品デモ'
      },
      hk: {
        title: '產品演示',
        heroTitle: '產品演示',
        heroDescription: '通過交互式產品演示，親身體驗 Zenava AI 的強大功能和易用性。',
        heroImage: '/assets/images/resources/hero-demos.jpg',
        heroImageAlt: '產品演示',
        heroLink: '/contact',
        listTitle: '產品演示'
      }
    },
    blog: {
      zh: {
        title: '博客',
        heroTitle: '博客',
        heroDescription: '阅读最新的技术文章、行业见解和客户成功故事，了解 AI 技术的最新动态。',
        heroImage: '/assets/images/resources/hero-blog.jpg',
        heroImageAlt: '博客',
        heroLink: '/contact',
        listTitle: '博客'
      },
      en: {
        title: 'Blog',
        heroTitle: 'Blog',
        heroDescription: 'Read the latest technical articles, industry insights, and customer success stories about AI technology.',
        heroImage: '/assets/images/resources/hero-blog.jpg',
        heroImageAlt: 'Blog',
        heroLink: '/contact',
        listTitle: 'Blog'
      },
      jp: {
        title: 'ブログ',
        heroTitle: 'ブログ',
        heroDescription: 'AI技術に関する最新の技術記事、業界の洞察、顧客の成功事例をお読みください。',
        heroImage: '/assets/images/resources/hero-blog.jpg',
        heroImageAlt: 'ブログ',
        heroLink: '/contact',
        listTitle: 'ブログ'
      },
      hk: {
        title: '博客',
        heroTitle: '博客',
        heroDescription: '閱讀最新的技術文章、行業見解和客戶成功故事，了解 AI 技術的最新動態。',
        heroImage: '/assets/images/resources/hero-blog.jpg',
        heroImageAlt: '博客',
        heroLink: '/contact',
        listTitle: '博客'
      }
    },
    podcast: {
      zh: {
        title: '播客',
        heroTitle: '播客',
        heroDescription: '收听行业专家访谈、技术讨论和案例分享，深入了解 AI 技术的实际应用。',
        heroImage: '/assets/images/resources/hero-podcast.jpg',
        heroImageAlt: '播客',
        heroLink: '/contact',
        listTitle: '播客'
      },
      en: {
        title: 'Podcast',
        heroTitle: 'Podcast',
        heroDescription: 'Listen to industry expert interviews, technical discussions, and case studies on AI technology applications.',
        heroImage: '/assets/images/resources/hero-podcast.jpg',
        heroImageAlt: 'Podcast',
        heroLink: '/contact',
        listTitle: 'Podcast'
      },
      jp: {
        title: 'ポッドキャスト',
        heroTitle: 'ポッドキャスト',
        heroDescription: '業界の専門家へのインタビュー、技術的な議論、AI技術の応用に関するケーススタディをお聞きください。',
        heroImage: '/assets/images/resources/hero-podcast.jpg',
        heroImageAlt: 'ポッドキャスト',
        heroLink: '/contact',
        listTitle: 'ポッドキャスト'
      },
      hk: {
        title: '播客',
        heroTitle: '播客',
        heroDescription: '收聽行業專家訪談、技術討論和案例分享，深入了解 AI 技術的實際應用。',
        heroImage: '/assets/images/resources/hero-podcast.jpg',
        heroImageAlt: '播客',
        heroLink: '/contact',
        listTitle: '播客'
      }
    }
  }

  return configs[resourceType]?.[language] || configs.all[language]
}

// Helper function to get resource navigation items
function getResourceNavItems(language: Language) {
  const basePath = language === 'zh' ? '/resources' : `/${language}/resources`
  
  return [
    { key: 'all', label: language === 'zh' ? '所有资源' : language === 'en' ? 'All Resources' : language === 'jp' ? 'すべてのリソース' : '所有資源', href: basePath },
    { key: 'whitepapers', label: language === 'zh' ? '白皮书' : language === 'en' ? 'Whitepapers' : language === 'jp' ? 'ホワイトペーパー' : '白皮書', href: `${basePath}/whitepapers` },
    { key: 'video', label: language === 'zh' ? '视频' : language === 'en' ? 'Videos' : language === 'jp' ? 'ビデオ' : '視頻', href: `${basePath}/video` },
    { key: 'reports', label: language === 'zh' ? '行业报告' : language === 'en' ? 'Industry Reports' : language === 'jp' ? '業界レポート' : '行業報告', href: `${basePath}/reports` },
    { key: 'demos', label: language === 'zh' ? '产品演示' : language === 'en' ? 'Product Demos' : language === 'jp' ? '製品デモ' : '產品演示', href: `${basePath}/demos` },
    { key: 'blog', label: language === 'zh' ? '博客' : language === 'en' ? 'Blog' : language === 'jp' ? 'ブログ' : '博客', href: `${basePath}/blog` },
    { key: 'podcast', label: language === 'zh' ? '播客' : language === 'en' ? 'Podcast' : language === 'jp' ? 'ポッドキャスト' : '播客', href: `${basePath}/podcast` }
  ]
}

// Helper function to get page URL
function getPageUrl(resourceType: string, language: Language, page: number) {
  const basePath = language === 'zh' ? '/resources' : `/${language}/resources`
  const typePath = resourceType === 'all' ? '/all' : `/${resourceType}`
  return `${basePath}${typePath}?page=${page}`
}

// Helper function to get pagination page numbers
function getPaginationPages(currentPage: number, totalPages: number): (number | string)[] {
  const pages: (number | string)[] = []
  const maxVisible = 5

  if (totalPages <= maxVisible) {
    // Show all pages if total is less than max visible
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i)
    }
  } else {
    // Always show first page
    pages.push(1)

    if (currentPage > 3) {
      pages.push('...')
    }

    // Show pages around current page
    const start = Math.max(2, currentPage - 1)
    const end = Math.min(totalPages - 1, currentPage + 1)

    for (let i = start; i <= end; i++) {
      if (i !== 1 && i !== totalPages) {
        pages.push(i)
      }
    }

    if (currentPage < totalPages - 2) {
      pages.push('...')
    }

    // Always show last page
    pages.push(totalPages)
  }

  return pages
}

// Mock function to get resource items (replace with API call)
function getMockResourceItems(resourceType: string, page: number, itemsPerPage: number, language: Language = 'zh') {
  const mockItems = []
  const startIndex = (page - 1) * itemsPerPage
  
  // 构建语言前缀
  const langPrefix = language === 'en' ? '' : `/${language}`
  
  for (let i = 0; i < itemsPerPage; i++) {
    const itemId = startIndex + i + 1
    
    // 根据资源类型生成正确的链接
    let link = '#'
    if (resourceType === 'video') {
      // 视频使用特殊路由：/resources/video/:id
      link = `${langPrefix}/resources/video/${itemId}`
    } else if (resourceType === 'podcast') {
      // 播客使用特殊路由：/resources/podcast/:id
      link = `${langPrefix}/resources/podcast/${itemId}`
    } else if (resourceType === 'all') {
      // 所有资源：根据索引决定类型（示例逻辑）
      const typeIndex = itemId % 6
      const types = ['whitepapers', 'video', 'reports', 'demos', 'blog', 'podcast']
      const type = types[typeIndex]
      if (type === 'video') {
        link = `${langPrefix}/resources/video/${itemId}`
      } else if (type === 'podcast') {
        link = `${langPrefix}/resources/podcast/${itemId}`
      } else {
        link = `${langPrefix}/resources/${type}/${itemId}`
      }
    } else {
      // 其他资源类型：/resources/:type/:id
      link = `${langPrefix}/resources/${resourceType}/${itemId}`
    }
    
    mockItems.push({
      image: `/assets/images/resources/item-${itemId}.jpg`,
      imageAlt: `Resource ${itemId}`,
      date: '12 Sep',
      category: 'Migration Cases',
      readTime: '4min',
      title: `Resource Title ${itemId}: Be-Mag: Reinventing the wheel, one spin at a time`,
      description: 'Resource description text here. This is a sample description that provides more details about the resource content and what users can expect to learn.',
      author: 'By Nadia Maya Ardiani',
      link: link
    })
  }
  
  return mockItems
}

