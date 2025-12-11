import { FC } from 'hono/jsx'
import { Language } from '../utils/i18n'
import { getTranslations } from '../i18n/translations'

interface Category {
  id: number
  name: string
  slug: string
  category_template: string
  description?: string
  cover_image?: string
}

interface ResourceContent {
  id: number
  title: string
  content: string
  author?: string
  cover_image?: string
  tags?: string
  download_url?: string
  video_url?: string
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
  button_link?: string
  button_target?: string
  text_position?: string
  text_color?: string
  subtitle_color?: string
  background_type?: string
  background_url?: string
  full_image_url?: string
  link_url?: string
  link_target?: string
}

interface ResourcesPageProps {
  language?: Language
  categories?: Category[]
  currentCategory?: Category | null  // 当前选中的栏目
  categoryContents?: ResourceContent[]  // 当前栏目的内容列表
  banners?: Banner[]  // Banner数据
  featuredContents?: any[]  // 热门推荐内容
  categoryContentsMap?: Record<number, any[]>  // 各个栏目的内容映射
}

export const ResourcesPage: FC<ResourcesPageProps> = ({ 
  language = 'zh', 
  categories = [], 
  currentCategory = null,
  categoryContents = [],
  banners = [],
  featuredContents = [],
  categoryContentsMap = {}
}) => {
  const trans = getTranslations(language)
  const t = trans.resourcesCenter || {}

  // 将数据库Banner数据转换为轮播格式
  const convertBannersToSlides = (banners: Banner[]) => {
    return banners.map((banner, index) => {
      // 调试信息
      if (typeof window === 'undefined') {
        console.log(`🔄 转换 Banner ${index + 1} (ID: ${banner.id}):`, {
          type: banner.banner_type,
          title: banner.text_title || banner.title,
          image: banner.background_url || banner.full_image_url,
          status: banner.status
        })
      }
      if (banner.banner_type === 'full_image') {
        // 整张大图模式
        return {
          id: `banner-${banner.id}`,
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
        
        // 判断背景是图片还是视频
        const isVideo = banner.background_type === 'video' || 
          (banner.background_url && /\.(mp4|webm|ogg|mov|avi|wmv)$/i.test(banner.background_url))
        
        // 处理文字颜色：如果数据库中是白色或未设置，使用深色默认值（因为右侧背景是白色）
        let textColor = banner.text_color || 'rgba(31, 41, 55, 1)'
        let subtitleColor = banner.subtitle_color || 'rgba(75, 85, 99, 1)'
        
        // 如果颜色是白色或接近白色，自动改为深色
        if (textColor && (
          textColor.includes('255,255,255') || 
          textColor.toLowerCase() === '#ffffff' || 
          textColor.toLowerCase() === '#fff' ||
          textColor.toLowerCase() === 'white'
        )) {
          textColor = 'rgba(31, 41, 55, 1)' // 深灰色
        }
        
        if (subtitleColor && (
          subtitleColor.includes('255,255,255') || 
          subtitleColor.toLowerCase() === '#ffffff' || 
          subtitleColor.toLowerCase() === '#fff' ||
          subtitleColor.toLowerCase() === 'white'
        )) {
          subtitleColor = 'rgba(75, 85, 99, 1)' // 中灰色
        }
        
        return {
          id: `banner-${banner.id}`,
          layout: 'text-image',
          title: banner.text_title || '',
          description: banner.text_subtitle || '',
          buttonText: banner.text_button || '',
          image: banner.background_url || '',
          isVideo: isVideo,
          link: fullLink,
          target: banner.button_target || '_self',
          textPosition: banner.text_position || 'left',
          // 右侧内容区域是白色背景，所以使用深色文字
          textColor: textColor,
          subtitleColor: subtitleColor
        }
      }
    })
  }

  // 使用数据库banner数据，如果没有则使用翻译文件数据
  const heroSlides = banners.length > 0 
    ? convertBannersToSlides(banners) 
    : (t.hero?.slides || [])
  
  // 调试信息（开发环境）
  if (typeof window === 'undefined') {
    console.log(`📊 Banner数据统计: 数据库=${banners.length}个, 最终使用=${heroSlides.length}个`)
    if (banners.length > 0) {
      console.log('数据库Banner:', banners.map(b => ({ 
        id: b.id, 
        title: b.title || b.text_title, 
        type: b.banner_type, 
        status: b.status,
        image: b.background_url || b.full_image_url || '无图片',
        text_title: b.text_title || '无标题',
        text_subtitle: b.text_subtitle || '无副标题'
      })))
    }
    if (heroSlides.length > 0) {
      console.log('转换后的Slides:', heroSlides.map((s, i) => ({
        index: i,
        id: s.id,
        layout: s.layout,
        title: s.title || '无标题',
        description: s.description || '无描述',
        image: s.image || '无图片'
      })))
    }
    console.log(`📊 栏目数据统计: categories=${categories.length}个, categoryContentsMap keys=${Object.keys(categoryContentsMap).length}个`)
    if (categories.length > 0) {
      console.log('栏目列表:', categories.map(c => ({ id: c.id, name: c.name, slug: c.slug })))
      categories.forEach(cat => {
        const contents = categoryContentsMap[cat.id] || []
        console.log(`  栏目 "${cat.name}" (ID: ${cat.id}): ${contents.length} 篇文章`)
      })
    }
    console.log(`📊 当前栏目: ${currentCategory ? currentCategory.name : '无'}, 栏目内容: ${categoryContents.length} 篇`)
  }

  // Helper function to get resource navigation items from database
  const getResourceNavItems = () => {
    const basePath = language === 'zh' ? '/resources' : `/${language}/resources`
    
    // 添加"所有资源"作为第一项
    const allItem = {
      key: 'all',
      label: language === 'zh' ? '所有资源' : language === 'en' ? 'All Resources' : language === 'jp' ? 'すべてのリソース' : '所有資源',
      href: basePath
    }
    
    // 从数据库获取的栏目转换为导航项
    const dbItems = categories.map(cat => {
      // 如果 link 已经是完整路径（以 / 开头），直接使用
      // 否则拼接 basePath
      const href = cat.slug.startsWith('/') 
        ? cat.slug 
        : `${basePath}/${cat.slug}`
      
      return {
        key: cat.slug,
        label: cat.name,
        href: href
      }
    })
    
    return [allItem, ...dbItems]
  }

  return (
    <>
      {/* Resource Center Sub-Navigation */}
      <section class="bg-[#6438FF] sticky top-0 z-30">
        <div class="site-container px-4 sm:px-6 lg:px-8">
          <nav class="flex items-center justify-center space-x-6 md:space-x-8 overflow-x-auto py-4">
            {getResourceNavItems().map((item) => {
              // 判断是否是当前激活的导航项
              const isActive = currentCategory 
                ? item.key === currentCategory.slug 
                : item.key === 'all'
              
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

      {/* 如果是栏目列表页，显示栏目内容 */}
      {currentCategory ? (
        <>
          {/* 栏目标题和描述 */}
          <section class="bg-gradient-to-br from-purple-50 to-blue-50 py-12 md:py-16">
            <div class="site-container px-4 sm:px-6 lg:px-8">
              <div class="max-w-4xl mx-auto text-center">
                <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                  {currentCategory.name}
                </h1>
                {currentCategory.description && (
                  <p class="text-lg md:text-xl text-gray-600 leading-relaxed">
                    {currentCategory.description}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* 栏目内容列表 */}
          <section class="py-12 md:py-16 lg:py-20 bg-white">
            <div class="site-container px-4 sm:px-6 lg:px-8">
              {categoryContents.length > 0 ? (
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {categoryContents.map((content) => {
                    const basePath = language === 'zh' ? '/resources' : `/${language}/resources`
                    const contentLink = `${basePath}/${currentCategory.slug}/${content.id}`
                    
                    return (
                      <a 
                        key={content.id}
                        href={contentLink}
                        class="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] overflow-hidden block"
                      >
                        <div class="aspect-video bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 relative overflow-hidden">
                          {content.cover_image ? (
                            <img 
                              src={content.cover_image}
                              alt={content.title}
                              class="w-full h-full object-cover"
                              loading="lazy"
                            />
                          ) : (
                            <div class="w-full h-full flex items-center justify-center">
                              <div class="text-center">
                                <i class="fas fa-image text-3xl md:text-4xl text-gray-400 mb-2"></i>
                                <p class="text-xs md:text-sm text-gray-500">
                                  {language === 'zh' ? '暂无图片' : language === 'en' ? 'No Image' : language === 'jp' ? '画像なし' : '暫無圖片'}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                        <div class="p-6">
                          <p class="text-sm text-gray-500 mb-2">
                            {new Date(content.published_at).toLocaleDateString(language === 'en' ? 'en-US' : 'zh-CN')}
                          </p>
                          <h3 class="text-lg md:text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                            {content.title}
                          </h3>
                          <p class="text-gray-600 text-sm md:text-base line-clamp-3">
                            {content.content.replace(/<[^>]*>/g, '').substring(0, 150)}...
                          </p>
                          <div class="mt-4 flex items-center justify-between text-sm text-gray-500">
                            <span><i class="fas fa-eye mr-1"></i> {content.views}</span>
                            {content.downloads > 0 && (
                              <span><i class="fas fa-download mr-1"></i> {content.downloads}</span>
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
            </div>
          </section>
        </>
      ) : (
        <>
          {/* 首页：显示 Hero 轮播 */}
          {/* Hero Carousel Section */}
          <section class="relative bg-white overflow-hidden">
        <div id="hero-carousel" class="relative" style="min-height: 500px;">
          {/* Carousel Slides Container */}
          <div id="hero-slides" class="relative w-full" style="min-height: 500px;">
            {/* Slides will be rendered here by JavaScript */}
            {/* Fallback: Show first slide if JavaScript hasn't loaded */}
            {heroSlides?.[0] && (() => {
              const firstSlide = heroSlides[0]
              if (!firstSlide) return null
              
              // 整张大图模式
              if (firstSlide.layout === 'full-image') {
                const fullLink = firstSlide.link || '#'
                const target = firstSlide.target || '_self'
                
                return (
                  <div class="hero-slide opacity-100 z-10">
                    <a href={fullLink} target={target} class="block w-full h-full">
                      <img 
                        src={firstSlide.image || '/assets/images/resources/hero-1.jpg'} 
                        alt="Banner"
                        class="w-full h-full object-cover"
                        style="min-height: 500px;"
                        loading="eager"
                        onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
                      />
                      <div class="hidden w-full h-full items-center justify-center bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 absolute inset-0" style="min-height: 500px;">
                        <div class="text-center">
                          <i class="fas fa-image text-4xl md:text-5xl text-gray-400 mb-3"></i>
                          <p class="text-sm md:text-base text-gray-500">
                            {language === 'zh' ? '暂无图片' : language === 'en' ? 'No Image' : language === 'jp' ? '画像なし' : '暫無圖片'}
                          </p>
                        </div>
                      </div>
                    </a>
                  </div>
                )
              }
              
              // 文字+图片模式
              const langPrefix = language === 'en' ? '' : `/${language}`
              const resourceLink = firstSlide.link || '#'
              const fullLink = resourceLink.startsWith('/') 
                ? (resourceLink.startsWith('/resources') 
                    ? `${langPrefix}${resourceLink}` 
                    : resourceLink)
                : resourceLink
              
              // 判断是视频还是图片
              const isVideo = firstSlide.isVideo || false
              const hasImage = firstSlide.image && firstSlide.image.trim() !== ''
              
              return (
                <div class="hero-slide opacity-100 z-10">
                  <div class="bg-gradient-to-br from-orange-200 via-yellow-200 to-teal-300 min-h-[500px] md:min-h-[500px] flex items-center justify-center">
                    <div class="container mx-auto px-8 md:px-12 lg:px-16 w-full">
                      <div class="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 md:gap-12">
                        {/* Left: Square Image */}
                        <div class="flex items-center justify-center lg:justify-start w-full">
                          <a href={fullLink} class="block w-full max-w-md mx-auto lg:mx-0">
                            {hasImage ? (
                              isVideo ? (
                                <video 
                                  src={firstSlide.image} 
                                  class="w-full aspect-square object-cover rounded-2xl shadow-2xl"
                                  autoplay
                                  muted
                                  loop
                                  playsinline
                                  style="pointer-events: none;"
                                  onerror="this.style.display='none'; this.nextElementSibling.classList.remove('hidden');"
                                />
                              ) : (
                                <img 
                                  src={firstSlide.image} 
                                  alt={firstSlide.title || 'Banner'}
                                  class="w-full aspect-square object-cover rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500"
                                  loading="eager"
                                  onerror="this.style.display='none'; this.nextElementSibling.classList.remove('hidden');"
                                />
                              )
                            ) : null}
                            {/* Placeholder when image fails to load or no image */}
                            <div class={`${hasImage ? 'hidden' : 'flex'} w-full aspect-square items-center justify-center bg-white/50 rounded-2xl shadow-2xl`}>
                              <div class="text-center">
                                <i class="fas fa-image text-4xl md:text-5xl text-gray-400 mb-3"></i>
                                <p class="text-sm md:text-base text-gray-500">
                                  {language === 'zh' ? '暂无图片' : language === 'en' ? 'No Image' : language === 'jp' ? '画像なし' : '暫無圖片'}
                                </p>
                              </div>
                            </div>
                          </a>
                        </div>
                        
                        {/* Right: Content */}
                        <div class="flex items-center justify-center lg:justify-start w-full">
                          <div class="max-w-2xl">
                            <a href={fullLink} class="block mb-4">
                              <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold hover:opacity-80 transition-opacity" style={{ color: firstSlide.textColor || '#1f2937' }}>
                                {firstSlide.title || 'Banner Title'}
                              </h2>
                            </a>
                            <p class="text-base md:text-lg mb-6 leading-relaxed" style={{ color: firstSlide.subtitleColor || '#4b5563' }}>
                              {firstSlide.description || 'Banner description'}
                            </p>
                            {firstSlide.buttonText && (
                              <a 
                                href={fullLink} 
                                class="inline-flex items-center px-6 py-3 bg-[#6438FF] text-white rounded-lg font-semibold hover:bg-[#5a2ee6] transition-all transform hover:scale-105"
                              >
                                {firstSlide.buttonText}
                                <i class="fas fa-arrow-right ml-2"></i>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })()}
          </div>
          
          {/* Carousel Controls - Only show if more than 1 slide */}
          {heroSlides && heroSlides.length > 1 && (
            <>
              {/* Pagination Progress Bar */}
              <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
                <div id="hero-pagination" class="flex items-center space-x-2">
                  {/* Pagination dots will be rendered here by JavaScript */}
                </div>
              </div>
              
              {/* Navigation Arrows */}
              <button 
                id="hero-prev" 
                class="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/80 hover:bg-white rounded-full p-3 shadow-lg transition-all"
                aria-label="Previous"
              >
                <i class="fas fa-chevron-left text-gray-700"></i>
              </button>
              <button 
                id="hero-next" 
                class="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/80 hover:bg-white rounded-full p-3 shadow-lg transition-all"
                aria-label="Next"
              >
                <i class="fas fa-chevron-right text-gray-700"></i>
              </button>
            </>
          )}
        </div>
      </section>

      {/* Featured Recommendations Section */}
      <section class="py-12 md:py-16 lg:py-20 bg-white">
        <div class="site-container px-4 sm:px-6 lg:px-8">
          <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-8 md:mb-12">
            {language === 'zh' ? '热门推荐' : language === 'en' ? 'Featured' : language === 'jp' ? 'おすすめ' : '熱門推薦'}
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Featured Cards - 使用数据库数据 */}
            {featuredContents.length > 0 ? (
              featuredContents.slice(0, 3).map((content: any, index: number) => {
                // 构建多语言链接
                const langPrefix = language === 'en' ? '' : `/${language}`
                const categorySlug = content.category_slug || ''
                // 构建内容详情页链接：/语言/resources/栏目slug/内容id
                let contentLink
                if (categorySlug) {
                  // 移除 category_slug 开头的 /resources（如果有）
                  let slug = categorySlug.replace(/^\/resources\//, '').replace(/^\/resources$/, '')
                  // 移除开头的斜杠（如果有）
                  slug = slug.replace(/^\//, '')
                  // 构建完整路径
                  contentLink = `${langPrefix}/resources/${slug}/${content.id}`
                } else {
                  contentLink = `${langPrefix}/resources/${content.id}`
                }
                
                // 格式化日期
                const formatDate = (dateStr: string) => {
                  if (!dateStr) return ''
                  const date = new Date(dateStr)
                  if (language === 'zh') {
                    return date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })
                  } else if (language === 'en') {
                    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                  } else if (language === 'jp') {
                    return date.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })
                  } else {
                    return date.toLocaleDateString('zh-TW', { year: 'numeric', month: 'long', day: 'numeric' })
                  }
                }
                
                // 提取纯文本描述（去除HTML标签）
                const getDescription = (htmlContent: string) => {
                  if (!htmlContent) return ''
                  return htmlContent.replace(/<[^>]*>/g, '').substring(0, 150) + '...'
                }
                
                return (
                  <a 
                    key={content.id}
                    href={contentLink}
                    class="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] overflow-hidden block"
                  >
                    <div class="aspect-video bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 relative overflow-hidden">
                      {content.cover_image ? (
                        <img 
                          src={content.cover_image}
                          alt={content.title || 'Featured resource'}
                          class="w-full h-full object-cover"
                          loading={index === 0 ? 'eager' : 'lazy'}
                          onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
                        />
                      ) : null}
                      {/* Placeholder when image fails to load */}
                      <div class={`${content.cover_image ? 'hidden' : 'flex'} w-full h-full items-center justify-center bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 absolute inset-0`}>
                        <div class="text-center">
                          <i class="fas fa-image text-3xl md:text-4xl text-gray-400 mb-2"></i>
                          <p class="text-xs md:text-sm text-gray-500">
                            {language === 'zh' ? '暂无图片' : language === 'en' ? 'No Image' : language === 'jp' ? '画像なし' : '暫無圖片'}
                          </p>
                        </div>
                      </div>
                      <div class="absolute top-4 left-4 z-10">
                        <span class="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700">
                          {content.category_name || 'Article'}
                        </span>
                      </div>
                      {content.views > 100 && (
                        <div class="absolute top-4 right-4 z-10">
                          <span class="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                            {language === 'zh' ? '热门' : language === 'en' ? 'Hot' : language === 'jp' ? '人気' : '熱門'}
                          </span>
                        </div>
                      )}
                    </div>
                    <div class="p-6">
                      <p class="text-sm text-gray-500 mb-2">
                        {formatDate(content.published_at)}
                      </p>
                      <h3 class="text-lg md:text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                        {content.title || 'Resource Title'}
                      </h3>
                      <p class="text-gray-600 text-sm md:text-base line-clamp-3">
                        {getDescription(content.content)}
                      </p>
                    </div>
                  </a>
                )
              })
            ) : (
              // 如果没有数据库数据，回退到翻译文件数据
              (t.featured?.cards || []).slice(0, 3).map((card: any, index: number) => {
                const langPrefix = language === 'en' ? '' : `/${language}`
                const resourceLink = card.link || '#'
                const fullLink = resourceLink.startsWith('/') 
                  ? (resourceLink.startsWith('/resources') 
                      ? `${langPrefix}${resourceLink}` 
                      : resourceLink)
                  : resourceLink
                
                return (
                  <a 
                    key={index}
                    href={fullLink}
                    class="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] overflow-hidden block"
                  >
                    <div class="aspect-video bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 relative overflow-hidden">
                      <img 
                        src={card.image || `/assets/images/resources/featured-${index + 1}.jpg`}
                        alt={card.imageAlt || card.title || 'Featured resource'}
                        class="w-full h-full object-cover"
                        loading={index === 0 ? 'eager' : 'lazy'}
                        onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
                      />
                      <div class="hidden w-full h-full items-center justify-center bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 absolute inset-0">
                        <div class="text-center">
                          <i class="fas fa-image text-3xl md:text-4xl text-gray-400 mb-2"></i>
                          <p class="text-xs md:text-sm text-gray-500">
                            {language === 'zh' ? '暂无图片' : language === 'en' ? 'No Image' : language === 'jp' ? '画像なし' : '暫無圖片'}
                          </p>
                        </div>
                      </div>
                      <div class="absolute top-4 left-4 z-10">
                        <span class="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700">
                          {card.category || 'Article'}
                        </span>
                      </div>
                      {card.badge && (
                        <div class="absolute top-4 right-4 z-10">
                          <span class="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                            {card.badge}
                          </span>
                        </div>
                      )}
                    </div>
                    <div class="p-6">
                      <p class="text-sm text-gray-500 mb-2">
                        {card.date || 'September 6, 2023'}
                      </p>
                      <h3 class="text-lg md:text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                        {card.title || 'Resource Title'}
                      </h3>
                      <p class="text-gray-600 text-sm md:text-base line-clamp-3">
                        {card.description || 'Resource description text here...'}
                      </p>
                    </div>
                  </a>
                )
              })
            )}
          </div>
        </div>
      </section>

      {/* Resource Categories Sections */}
      <section class="py-12 md:py-16 lg:py-20 bg-gray-50">
        <div class="site-container px-4 sm:px-6 lg:px-8">
          {/* 使用数据库数据渲染栏目分类 */}
          {categories.length > 0 ? (
            categories.map((category) => {
              const categoryContents = categoryContentsMap[category.id] || []
              // 如果栏目下没有文章，则不显示该栏目
              if (categoryContents.length === 0) return null
              
              const langPrefix = language === 'en' ? '' : `/${language}`
              const categoryLink = category.slug?.startsWith('/') 
                ? (category.slug.startsWith('/resources') 
                    ? `${langPrefix}${category.slug}` 
                    : category.slug)
                : `${langPrefix}/resources/${category.slug}`
              
              return (
                <div key={category.id} class="mb-16 md:mb-20">
                  <div class="flex items-center justify-between mb-6 md:mb-8">
                    <h3 class="text-2xl md:text-3xl font-bold text-gray-900">
                      {category.name}
                    </h3>
                    <a 
                      href={categoryLink}
                      class="text-[#6438FF] hover:text-[#5a2ee6] font-medium flex items-center"
                    >
                      {language === 'zh' ? '查看更多' : language === 'en' ? 'View More' : language === 'jp' ? 'もっと見る' : '查看更多'}
                      <i class="fas fa-arrow-right ml-2"></i>
                    </a>
                  </div>
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {categoryContents.slice(0, 3).map((content: any) => {
                      const contentLink = categoryLink 
                        ? `${categoryLink}/${content.id}`
                        : `${langPrefix}/resources/${content.id}`
                      
                      // 格式化日期
                      const formatDate = (dateStr: string) => {
                        if (!dateStr) return ''
                        const date = new Date(dateStr)
                        if (language === 'zh') {
                          return date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })
                        } else if (language === 'en') {
                          return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                        } else if (language === 'jp') {
                          return date.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })
                        } else {
                          return date.toLocaleDateString('zh-TW', { year: 'numeric', month: 'long', day: 'numeric' })
                        }
                      }
                      
                      // 提取纯文本描述
                      const getDescription = (htmlContent: string) => {
                        if (!htmlContent) return ''
                        return htmlContent.replace(/<[^>]*>/g, '').substring(0, 150) + '...'
                      }
                      
                      return (
                        <a 
                          key={content.id}
                          href={contentLink}
                          class="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] overflow-hidden block"
                        >
                          <div class="aspect-video bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 relative overflow-hidden">
                            {content.cover_image ? (
                              <img 
                                src={content.cover_image}
                                alt={content.title || ''}
                                class="w-full h-full object-cover"
                                loading="lazy"
                                onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
                              />
                            ) : null}
                            <div class={`${content.cover_image ? 'hidden' : 'flex'} w-full h-full items-center justify-center bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 absolute inset-0`}>
                              <div class="text-center">
                                <i class="fas fa-image text-2xl md:text-3xl text-gray-400 mb-2"></i>
                                <p class="text-xs md:text-sm text-gray-500">
                                  {language === 'zh' ? '暂无图片' : language === 'en' ? 'No Image' : language === 'jp' ? '画像なし' : '暫無圖片'}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div class="p-6">
                            <p class="text-sm text-gray-500 mb-2">
                              {formatDate(content.published_at)}
                            </p>
                            <h4 class="text-lg md:text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                              {content.title || 'Resource Title'}
                            </h4>
                            <p class="text-gray-600 text-sm md:text-base line-clamp-3">
                              {getDescription(content.content)}
                            </p>
                          </div>
                        </a>
                      )
                    })}
                  </div>
                </div>
              )
            })
          ) : (
            // 如果没有数据库数据，使用JavaScript渲染翻译文件数据
            <div id="resource-categories">
              {/* Categories will be rendered by JavaScript based on CMS data */}
            </div>
          )}
        </div>
      </section>
        </>
      )}

      {/* Hero Carousel Script - 只在首页加载 */}
      {!currentCategory && (
      <script dangerouslySetInnerHTML={{
        __html: `
          (function() {
            const heroSlides = ${JSON.stringify(heroSlides)};
            const currentLanguage = ${JSON.stringify(language)};
            const slidesContainer = document.getElementById('hero-slides');
            const paginationContainer = document.getElementById('hero-pagination');
            const prevBtn = document.getElementById('hero-prev');
            const nextBtn = document.getElementById('hero-next');
            
            if (!slidesContainer || heroSlides.length === 0) return;
            
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
              const slide = heroSlides[index];
              if (!slide) {
                console.warn('⚠️ Slide ' + index + ' 不存在');
                return '';
              }
              
              // 调试信息
              console.log('🎨 渲染 Slide ' + index + ':', {
                id: slide.id,
                layout: slide.layout,
                title: slide.title || '无标题',
                description: slide.description || '无描述',
                image: slide.image || '无图片',
                hasImage: !!(slide.image && slide.image.trim())
              });
              
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
                return '<div class="hero-slide absolute inset-0 transition-opacity duration-700 ' + 
                  (index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0') + '">' +
                  '<a href="' + fullLink + '" target="' + target + '" class="block w-full h-full">' +
                    '<img src="' + slide.image + '" alt="Banner" ' +
                    'class="w-full h-full object-cover" ' +
                    'style="min-height: 500px;" ' +
                    'loading="' + (index === 0 ? 'eager' : 'lazy') + '" ' +
                    'onerror="this.style.display=\\'none\\'; this.nextElementSibling.style.display=\\'flex\\';" />' +
                    '<div class="hidden w-full h-full items-center justify-center bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 absolute inset-0" style="min-height: 500px;">' +
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
                '<a href="' + fullLink + '" class="inline-flex items-center px-6 py-3 bg-[#6438FF] text-white rounded-lg font-semibold hover:bg-[#5a2ee6] transition-all transform hover:scale-105">' +
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
                    'class="w-full aspect-square object-cover rounded-2xl shadow-2xl" ' +
                    'autoplay muted loop playsinline ' +
                    'style="pointer-events: none;" ' +
                    'onerror="this.style.display=\\'none\\'; this.nextElementSibling.classList.remove(\\'hidden\\');"></video>';
                } else {
                  mediaHtml = '<img src="' + slide.image + '" alt="' + (slide.title || 'Banner') + '" ' +
                    'class="w-full aspect-square object-cover rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500" ' +
                    'loading="' + (index === 0 ? 'eager' : 'lazy') + '" ' +
                    'onerror="this.style.display=\\'none\\'; this.nextElementSibling.classList.remove(\\'hidden\\');" />';
                }
              }
              
              // 占位符（如果图片为空或加载失败时显示）
              const placeholderClass = hasImage ? 'hidden' : 'flex';
              const placeholderHtml = '<div class="' + placeholderClass + ' w-full aspect-square items-center justify-center bg-white/50 rounded-2xl shadow-2xl">' +
                '<div class="text-center">' +
                  '<i class="fas fa-image text-4xl md:text-5xl text-gray-400 mb-3"></i>' +
                  '<p class="text-sm md:text-base text-gray-500">' + placeholderText + '</p>' +
                '</div>' +
              '</div>';
              
              return '<div class="hero-slide absolute inset-0 transition-opacity duration-700 ' + 
                (index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0') + '">' +
                '<div class="bg-gradient-to-br from-orange-200 via-yellow-200 to-teal-300 min-h-[500px] md:min-h-[500px] flex items-center justify-center">' +
                  '<div class="container mx-auto px-8 md:px-12 lg:px-16 w-full">' +
                    '<div class="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 md:gap-12">' +
                      '<div class="flex items-center justify-center lg:justify-start w-full">' +
                        '<a href="' + fullLink + '" class="block w-full max-w-md mx-auto lg:mx-0">' +
                          mediaHtml +
                          placeholderHtml +
                        '</a>' +
                      '</div>' +
                      '<div class="flex items-center justify-center lg:justify-start w-full">' +
                        '<div class="max-w-2xl">' +
                          '<a href="' + fullLink + '" class="block mb-4">' +
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
            
            function renderPagination() {
              if (!paginationContainer) return;
              paginationContainer.innerHTML = heroSlides.map(function(_, index) {
                return '<button class="w-12 h-1 rounded-full transition-all ' +
                  (index === currentSlide ? 'bg-[#6438FF]' : 'bg-gray-300') + '" ' +
                  'onclick="goToSlide(' + index + ')" ' +
                  'aria-label="Go to slide ' + (index + 1) + '"></button>';
              }).join('');
            }
            
            function goToSlide(index) {
              if (index < 0 || index >= heroSlides.length) return;
              currentSlide = index;
              updateSlides();
              resetAutoPlay();
            }
            
            function updateSlides() {
              if (!slidesContainer) return;
              slidesContainer.innerHTML = heroSlides.map(function(_, index) {
                return renderSlide(index);
              }).join('');
              renderPagination();
            }
            
            function nextSlide() {
              goToSlide((currentSlide + 1) % heroSlides.length);
            }
            
            function prevSlide() {
              goToSlide((currentSlide - 1 + heroSlides.length) % heroSlides.length);
            }
            
            function startAutoPlay() {
              if (heroSlides.length <= 1) return;
              autoPlayInterval = setInterval(nextSlide, 5000);
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
            
            // Event listeners
            if (prevBtn) prevBtn.addEventListener('click', prevSlide);
            if (nextBtn) nextBtn.addEventListener('click', nextSlide);
            
            // Pause on hover
            const carousel = document.getElementById('hero-carousel');
            if (carousel) {
              carousel.addEventListener('mouseenter', stopAutoPlay);
              carousel.addEventListener('mouseleave', startAutoPlay);
            }
            
            // Make goToSlide available globally
            window.goToSlide = goToSlide;
          })();
        `
      }} />
      )}

      {/* Resource Categories Script - 只在首页加载且没有数据库数据时使用 */}
      {!currentCategory && categories.length === 0 && (
      <script dangerouslySetInnerHTML={{
        __html: `
          (function() {
            const categories = ${JSON.stringify(t.categories || [])};
            const currentLanguage = ${JSON.stringify(language)};
            const container = document.getElementById('resource-categories');
            
            if (!container || categories.length === 0) return;
            
            const placeholderTexts = {
              'zh': '暂无图片',
              'en': 'No Image',
              'jp': '画像なし',
              'hk': '暫無圖片'
            };
            const placeholderText = placeholderTexts[currentLanguage] || placeholderTexts['zh'];
            
            function renderCategory(category) {
              const placeholderTexts = {
                'zh': '暂无图片',
                'en': 'No Image',
                'jp': '画像なし',
                'hk': '暫無圖片'
              };
              const placeholderText = placeholderTexts[currentLanguage] || placeholderTexts['zh'];
              
              // 构建语言前缀
              const langPrefix = currentLanguage === 'en' ? '' : '/' + currentLanguage;
              
              const itemsHtml = (category.items || []).slice(0, 3).map(function(item) {
                // 构建多语言链接
                const resourceLink = item.link || '#';
                const fullLink = resourceLink.startsWith('/') 
                  ? (resourceLink.startsWith('/resources') 
                      ? langPrefix + resourceLink 
                      : resourceLink)
                  : resourceLink;
                
                return '<a href="' + fullLink + '" ' +
                  'class="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] overflow-hidden block">' +
                  '<div class="aspect-video bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 relative overflow-hidden">' +
                    '<img src="' + (item.image || '/assets/images/placeholder.jpg') + '" ' +
                    'alt="' + (item.imageAlt || item.title || '') + '" ' +
                    'class="w-full h-full object-cover" loading="lazy" ' +
                    'onerror="this.style.display=\\'none\\'; this.nextElementSibling.style.display=\\'flex\\';" />' +
                    '<div class="hidden w-full h-full items-center justify-center bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 absolute inset-0">' +
                      '<div class="text-center">' +
                        '<i class="fas fa-image text-2xl md:text-3xl text-gray-400 mb-2"></i>' +
                        '<p class="text-xs md:text-sm text-gray-500">' + placeholderText + '</p>' +
                      '</div>' +
                    '</div>' +
                  '</div>' +
                  '<div class="p-6">' +
                    '<p class="text-sm text-gray-500 mb-2">' + (item.date || '') + '</p>' +
                    '<h4 class="text-lg md:text-xl font-bold text-gray-900 mb-3 line-clamp-2">' +
                      (item.title || 'Resource Title') +
                    '</h4>' +
                    '<p class="text-gray-600 text-sm md:text-base line-clamp-3">' +
                      (item.description || 'Resource description...') +
                    '</p>' +
                  '</div>' +
                '</a>';
              }).join('');
              
              // 构建"查看更多"链接的语言前缀
              const moreLink = category.moreLink || '#';
              const fullMoreLink = moreLink.startsWith('/') 
                ? (moreLink.startsWith('/resources') 
                    ? langPrefix + moreLink 
                    : moreLink)
                : moreLink;
              
              return '<div class="mb-16 md:mb-20">' +
                '<div class="flex items-center justify-between mb-6 md:mb-8">' +
                  '<h3 class="text-2xl md:text-3xl font-bold text-gray-900">' +
                    (category.title || 'Category') +
                  '</h3>' +
                  '<a href="' + fullMoreLink + '" ' +
                  'class="text-[#6438FF] hover:text-[#5a2ee6] font-medium flex items-center">' +
                    (category.moreText || '查看更多') +
                    '<i class="fas fa-arrow-right ml-2"></i>' +
                  '</a>' +
                '</div>' +
                '<div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">' +
                  itemsHtml +
                '</div>' +
              '</div>';
            }
            
            container.innerHTML = categories.map(function(category) {
              return renderCategory(category);
            }).join('');
          })();
        `
      }} />
      )}
    </>
  )
}

