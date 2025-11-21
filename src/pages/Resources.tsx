import { FC } from 'hono/jsx'
import { Language } from '../utils/i18n'
import { getTranslations } from '../i18n/translations'

interface ResourcesPageProps {
  language?: Language
}

export const ResourcesPage: FC<ResourcesPageProps> = ({ language = 'zh' }) => {
  const trans = getTranslations(language)
  const t = trans.resourcesCenter || {}

  // Helper function to get resource navigation items
  const getResourceNavItems = () => {
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

  return (
    <>
      {/* Resource Center Sub-Navigation */}
      <section class="bg-[#6438FF] sticky top-0 z-30">
        <div class="site-container px-4 sm:px-6 lg:px-8">
          <nav class="flex items-center justify-center space-x-6 md:space-x-8 overflow-x-auto py-4">
            {getResourceNavItems().map((item) => (
              <a
                key={item.key}
                href={item.href}
                class={`whitespace-nowrap text-sm md:text-base font-medium text-white transition-all pb-2 relative ${
                  item.key === 'all'
                    ? 'border-b-2 border-white'
                    : 'hover:opacity-80'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* Hero Carousel Section */}
      <section class="relative bg-white overflow-hidden">
        <div id="hero-carousel" class="relative" style="min-height: 500px;">
          {/* Carousel Slides Container */}
          <div id="hero-slides" class="relative w-full" style="min-height: 500px;">
            {/* Slides will be rendered here by JavaScript */}
            {/* Fallback: Show first slide if JavaScript hasn't loaded */}
            {t.hero?.slides?.[0] && (() => {
              // 构建多语言链接
              const langPrefix = language === 'en' ? '' : `/${language}`
              const resourceLink = t.hero.slides[0].link || '#'
              const fullLink = resourceLink.startsWith('/') 
                ? (resourceLink.startsWith('/resources') 
                    ? `${langPrefix}${resourceLink}` 
                    : resourceLink)
                : resourceLink
              
              return (
              <div class="hero-slide opacity-100 z-10">
                <div class="grid grid-cols-1 lg:grid-cols-2 min-h-[500px] md:min-h-[600px]">
                  {/* Left: Image */}
                  <div class="relative overflow-hidden bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300">
                    <a href={fullLink} class="block h-full">
                      <img 
                        src={t.hero.slides[0].image || '/assets/images/resources/hero-1.jpg'} 
                        alt={t.hero.slides[0].imageAlt || ''}
                        class="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        loading="eager"
                        onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
                      />
                      {/* Placeholder when image fails to load */}
                      <div class="hidden w-full h-full items-center justify-center bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300">
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
                  <div class="flex items-center bg-white p-8 md:p-12 lg:p-16">
                    <div class="max-w-2xl">
                      <p class="text-sm md:text-base text-gray-500 mb-4">
                        {t.hero.slides[0].date || ''}
                      </p>
                      <a href={fullLink} class="block mb-4">
                        <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 hover:text-[#6438FF] transition-colors">
                          {t.hero.slides[0].title || ''}
                        </h2>
                      </a>
                      <p class="text-base md:text-lg text-gray-600 mb-6 leading-relaxed">
                        {t.hero.slides[0].description || ''}
                      </p>
                      {t.hero.slides[0].buttonText && (
                        <a 
                          href={fullLink} 
                          class="inline-flex items-center px-6 py-3 bg-[#6438FF] text-white rounded-lg font-semibold hover:bg-[#5a2ee6] transition-all transform hover:scale-105"
                        >
                          {t.hero.slides[0].buttonText}
                          <i class="fas fa-arrow-right ml-2"></i>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              )
            })()}
          </div>
          
          {/* Carousel Controls - Only show if more than 1 slide */}
          {t.hero?.slides && t.hero.slides.length > 1 && (
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
            {t.featured?.title || (language === 'zh' ? '热门推荐' : language === 'en' ? 'Featured' : language === 'jp' ? 'おすすめ' : '熱門推薦')}
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Featured Cards */}
            {(t.featured?.cards || []).slice(0, 3).map((card: any, index: number) => {
              // 构建多语言链接
              const langPrefix = language === 'en' ? '' : `/${language}`
              const resourceLink = card.link || '#'
              // 如果链接不是以 / 开头，直接使用；如果是相对路径，添加语言前缀
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
                  {/* Placeholder when image fails to load */}
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
            })}
          </div>
        </div>
      </section>

      {/* Resource Categories Sections */}
      <section class="py-12 md:py-16 lg:py-20 bg-gray-50">
        <div class="site-container px-4 sm:px-6 lg:px-8">
          {/* Resource categories will be dynamically rendered here */}
          <div id="resource-categories">
            {/* Categories will be rendered by JavaScript based on CMS data */}
          </div>
        </div>
      </section>

      {/* Hero Carousel Script */}
      <script dangerouslySetInnerHTML={{
        __html: `
          (function() {
            const heroSlides = ${JSON.stringify(t.hero?.slides || [])};
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
              if (!slide) return '';
              
              // 构建多语言链接
              const resourceLink = slide.link || '#';
              const fullLink = resourceLink.startsWith('/') 
                ? (resourceLink.startsWith('/resources') 
                    ? langPrefix + resourceLink 
                    : resourceLink)
                : resourceLink;
              
              const buttonHtml = slide.buttonText ? 
                '<a href="' + fullLink + '" class="inline-flex items-center px-6 py-3 bg-[#6438FF] text-white rounded-lg font-semibold hover:bg-[#5a2ee6] transition-all transform hover:scale-105">' +
                  slide.buttonText + 
                  '<i class="fas fa-arrow-right ml-2"></i>' +
                '</a>' : '';
              
              return '<div class="hero-slide absolute inset-0 transition-opacity duration-700 ' + 
                (index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0') + '">' +
                '<div class="grid grid-cols-1 lg:grid-cols-2 min-h-[500px] md:min-h-[600px]">' +
                  '<div class="relative overflow-hidden bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300">' +
                    '<a href="' + fullLink + '" class="block h-full">' +
                      '<img src="' + slide.image + '" alt="' + (slide.imageAlt || '') + '" ' +
                      'class="w-full h-full object-cover hover:scale-105 transition-transform duration-500" ' +
                      'loading="' + (index === 0 ? 'eager' : 'lazy') + '" ' +
                      'onerror="this.style.display=\\'none\\'; this.nextElementSibling.style.display=\\'flex\\';" />' +
                      '<div class="hidden w-full h-full items-center justify-center bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 absolute inset-0">' +
                        '<div class="text-center">' +
                          '<i class="fas fa-image text-4xl md:text-5xl text-gray-400 mb-3"></i>' +
                          '<p class="text-sm md:text-base text-gray-500">' + placeholderText + '</p>' +
                        '</div>' +
                      '</div>' +
                    '</a>' +
                  '</div>' +
                  '<div class="flex items-center bg-white p-8 md:p-12 lg:p-16">' +
                    '<div class="max-w-2xl">' +
                      '<p class="text-sm md:text-base text-gray-500 mb-4">' + (slide.date || '') + '</p>' +
                      '<a href="' + fullLink + '" class="block mb-4">' +
                        '<h2 class="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 hover:text-[#6438FF] transition-colors">' +
                          (slide.title || '') +
                        '</h2>' +
                      '</a>' +
                      '<p class="text-base md:text-lg text-gray-600 mb-6 leading-relaxed">' +
                        (slide.description || '') +
                      '</p>' +
                      buttonHtml +
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

      {/* Resource Categories Script */}
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
    </>
  )
}

