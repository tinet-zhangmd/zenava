import { FC, JSX } from 'hono/jsx'
import { Language, getTranslation } from '../utils/i18n.js'
import { getTranslations, t } from '../i18n/translations.js'

interface HomepageProps {
  language: Language
  pageData?: any
  modules?: any[]
  settings?: Record<string, string>
}

export const HomepageDB: FC<HomepageProps> = ({ language = 'en', pageData, modules = [], settings = {} }) => {
  const oldT = getTranslation(language)
  const trans = getTranslations(language)
  
  // Parse module content safely (handle double-encoded JSON)
  const getModuleContent = (module: any) => {
    try {
      if (typeof module.content !== 'string') {
        return module.content || {};
      }
      
      // Try to parse once
      let parsed = JSON.parse(module.content);
      
      // If result is still a string, it might be double-encoded
      if (typeof parsed === 'string') {
        try {
          parsed = JSON.parse(parsed);
        } catch {
          // If second parse fails, return the first parse result
        }
      }
      
      return parsed;
    } catch {
      return {};
    }
  };

  // Find specific module by name
  const findModule = (moduleName: string) => {
    const module = modules.find(m => m.module_name === moduleName);
    return module ? getModuleContent(module) : null;
  };

  // Get hero content
  const heroContent = findModule('main_hero') || {
    title: t?.hero?.title || 'AI Agent for Enterprise Customer Dialogue',
    subtitle: t?.hero?.subtitle || 'Transform your customer service with intelligent AI agents',
    cta_text: t?.hero?.cta_primary || 'Get Started',
    cta_link: '#contact',
    background_image: '/static/hero-bg.jpg'
  };



  // Get statistics content
  const statsContent = findModule('platform_stats') || {
    title: trans.stats?.title || 'Platform Performance',
    stats: [
      { number: '99.9%', label: trans.stats?.uptime || 'Uptime SLA' },
      { number: '5000+', label: trans.stats?.enterprises || 'Enterprise Clients' },
      { number: '4.9/5', label: trans.stats?.satisfaction || 'Customer Satisfaction' }
    ]
  };

  return (
    <>
      {/* Banner Configuration - 轮播横幅配置 */}
      {(() => {
        // 🎯 Banner 数据配置（支持最多8页）
        // 翻译数据已迁移到 src/i18n/translations.ts 中的 banners 配置
        const bannerSlides = [
          // Slide 1 - 全图模式
          trans.banners.slide1.src ? {
            id: 'slide-1',
            layout: 'full-image',
            fullImage: {
              src: trans.banners.slide1.src,
              mobileSrc: trans.banners.slide1.mobileSrc,
              alt: trans.banners.slide1.imageAlt,
              overlay: false,
            },
            overlayContent: {
              siteName: trans.banners.slide1.siteName,
              mainTitle: trans.banners.slide1.mainTitle,
              description: trans.banners.slide1.description,
              button: {
                text: trans.banners.slide1.buttonText,
                link: '/contact',
                icon: 'fas fa-phone'
              },
              position: 'center'
            },
            clickLink: '/contact'
          } : null,
          // Slide 2 - 全图模式
          trans.banners.slide2.src ? {
            id: 'slide-2',
            layout: 'full-image',
            fullImage: {
              src: trans.banners.slide2.src,
              mobileSrc: trans.banners.slide2.mobileSrc,
              alt: trans.banners.slide2.imageAlt,
              overlay: false,
            },
            overlayContent: {
              siteName: trans.banners.slide2.siteName,
              mainTitle: trans.banners.slide2.mainTitle,
              description: trans.banners.slide2.description,
              button: {
                text: trans.banners.slide2.buttonText,
                link: '/contact',
                icon: 'fas fa-phone'
              },
              position: 'center'
            },
            clickLink: '/contact'
          } : null,
          // Slide 3 - 全图模式
          trans.banners.slide3.src ? {
            id: 'slide-3',
            layout: 'full-image',
            fullImage: {
              src: trans.banners.slide3.src,
              mobileSrc: trans.banners.slide3.mobileSrc,
              alt: trans.banners.slide3.imageAlt,
              overlay: false,
            },
            overlayContent: {
              siteName: trans.banners.slide3.siteName,
              mainTitle: trans.banners.slide3.mainTitle,
              description: trans.banners.slide3.description,
              button: {
                text: trans.banners.slide3.buttonText,
                link: '/contact',
                icon: 'fas fa-phone'
              },
              position: 'center'
            },
            clickLink: '/contact'
          } : null,
          // Slide 4 - 全图模式
          trans.banners.slide4.src ? {
            id: 'slide-4',
            layout: 'full-image',
            fullImage: {
              src: trans.banners.slide4.src,
              mobileSrc: trans.banners.slide4.mobileSrc,
              alt: trans.banners.slide4.imageAlt,
              overlay: false,
            },
            overlayContent: {
              siteName: trans.banners.slide4.siteName,
              mainTitle: trans.banners.slide4.mainTitle,
              description: trans.banners.slide4.description,
              button: {
                text: trans.banners.slide4.buttonText,
                link: '/contact',
                icon: 'fas fa-phone'
              },
              position: 'center'
            },
            clickLink: '/contact'
          } : null,
          // Slide 5 - 全图模式
          trans.banners.slide5.src ? {
            id: 'slide-5',
            layout: 'full-image',
            fullImage: {
              src: trans.banners.slide5.src,
              mobileSrc: trans.banners.slide5.mobileSrc,
              alt: trans.banners.slide5.imageAlt,
              overlay: false,
            },
            clickLink: '/contact'
          } : null,
          // Slide 6 - 全图模式
          trans.banners.slide6.src ? {
            id: 'slide-6',
            layout: 'full-image',
            fullImage: {
              src: trans.banners.slide6.src,
              mobileSrc: trans.banners.slide6.mobileSrc,
              alt: trans.banners.slide6.imageAlt,
              overlay: false,
            },
            clickLink: '/contact'
          } : null
        ].filter(Boolean); // 过滤掉 null 值

        // 🎬 只显示最新的8个Banner（如果超过8个）
        const displaySlides = bannerSlides.slice(-8);
        const totalSlides = displaySlides.length;
        const showPagination = totalSlides > 1; // 只有多页时才显示翻页

        return (
          <>
            {/* Hero Section - Carousel Banner */}
            <section id="hero" class="relative text-white flex items-center overflow-hidden" style="height: 680px;">
              
              {/* Banner Slides Container */}
              <div id="banner-slides" class="absolute inset-0 transition-opacity duration-700">
                {displaySlides.map((slide, index) => {
                  const layout = slide.layout || 'split';  // 默认使用 split 模式（向后兼容）
                  
                  // 全图模式渲染
                  if (layout === 'full-image') {
                    const fullImageSlide = slide as any;  // 类型断言：全图模式
                    const slideContent = (
                      <>
                        {/* 全图背景 - 支持移动端专用图片 */}
        <div class="absolute inset-0">
                          {fullImageSlide.fullImage.mobileSrc ? (
                            <picture>
                              {/* 移动端图片（< 768px） */}
                              <source media="(max-width: 767px)" srcset={fullImageSlide.fullImage.mobileSrc} />
                              {/* 桌面端图片（>= 768px） */}
                          <img 
                            src={fullImageSlide.fullImage.src} 
                            alt={fullImageSlide.fullImage.alt}
                            class="w-full h-full object-cover"
                            loading="lazy"
                            onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
                          />
                            </picture>
                          ) : (
                            <img 
                              src={fullImageSlide.fullImage.src} 
                              alt={fullImageSlide.fullImage.alt}
                              class="w-full h-full object-cover"
                              loading="lazy"
                              onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
                            />
                          )}
                          {/* 占位符（图片加载失败时显示） */}
                          <div class="hidden w-full h-full items-center justify-center bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 absolute inset-0">
                            <div class="text-center">
                              <i class="fas fa-image text-4xl md:text-5xl text-gray-400 mb-3"></i>
                              <p class="text-sm md:text-base text-gray-500">{trans.common.noImage}</p>
                            </div>
                          </div>
                        </div>
                        
                        {/* 遮罩层（可选） */}
                        {fullImageSlide.fullImage.overlay && (
                          <div class={`absolute inset-0 ${fullImageSlide.fullImage.overlayColor || 'bg-black/40'}`}></div>
                        )}
                        
                        {/* 文字内容（可选） */}
                        {fullImageSlide.overlayContent && (() => {
                          // 根据 position 设置文字位置样式
                          const positionClasses: Record<string, string> = {
                            'center': 'items-center justify-center text-center',
                            'top-left': 'items-start justify-start text-left',
                            'top-right': 'items-start justify-end text-right',
                            'bottom-left': 'items-end justify-start text-left',
                            'bottom-right': 'items-end justify-end text-right',
                            'bottom-center': 'items-end justify-center text-center'
                          };
                          const position = fullImageSlide.overlayContent.position || 'center';
                          const positionClass = positionClasses[position] || positionClasses['center'];
                          
                          return (
                            <div class={`site-container px-6 relative z-10 h-full flex ${positionClass}`}>
                              <div class="max-w-4xl space-y-6">
                                {/* 官网名称（可选） */}
                                {fullImageSlide.overlayContent.siteName && (
                                  <div class="font-bold text-white tracking-wide text-3xl drop-shadow-lg">
                                    {fullImageSlide.overlayContent.siteName}
                                  </div>
                                )}
                                
                                {/* 主标题（可选） */}
                                {fullImageSlide.overlayContent.mainTitle && (
                                  <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight drop-shadow-lg">
                                    {fullImageSlide.overlayContent.mainTitle}
                                  </h1>
                                )}
                                
                                {/* 概述（可选） */}
                                {fullImageSlide.overlayContent.description && (
                                  <p class="text-lg sm:text-xl text-white leading-relaxed drop-shadow-md">
                                    {fullImageSlide.overlayContent.description}
                                  </p>
                                )}
                                
                                {/* CTA Button（可选） */}
                                {fullImageSlide.overlayContent.button && (
                                  <div class="pt-4">
                                    <a 
                                      href={fullImageSlide.overlayContent.button.link} 
                                      class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#6438FF] to-[#0DE0EF] text-white rounded-xl font-bold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                                    >
                                      <i class={`${fullImageSlide.overlayContent.button.icon} mr-3`}></i>
                                      {fullImageSlide.overlayContent.button.text}
                                    </a>
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })()}
                      </>
                    );
                    
                    // 如果有链接，使用 a 标签包裹；否则使用 div
                    if (fullImageSlide.clickLink) {
                      return (
                        <a
                          key={slide.id}
                          href={fullImageSlide.clickLink}
                          data-slide-index={index}
                          class={`banner-slide absolute inset-0 transition-opacity duration-700 block cursor-pointer ${index === 0 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                        >
                          {slideContent}
                        </a>
                      );
                    } else {
                      return (
                        <div
                          key={slide.id}
                          data-slide-index={index}
                          class={`banner-slide absolute inset-0 transition-opacity duration-700 ${index === 0 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                        >
                          {slideContent}
                        </div>
                      );
                    }
                  }
                  
                  // 左文右图模式渲染（原有逻辑）
                  return (
                    <div 
                      key={slide.id}
                      data-slide-index={index}
                      class={`banner-slide absolute inset-0 bg-gradient-to-br ${slide.background.gradient} transition-opacity duration-700 ${index === 0 ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                    >
                      {/* Background Pattern */}
                      {slide.background.pattern && (
          <div class="absolute inset-0 opacity-20">
            <div class="w-full h-full" style="background-image: radial-gradient(circle at 2px 2px, #6438FF 1px, transparent 0); background-size: 40px 40px;"></div>
          </div>
                      )}
          
          {/* Floating Elements */}
          <div class="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-[#6438FF]/20 to-[#0DE0EF]/20 rounded-full blur-3xl animate-float"></div>
          <div class="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-[#0DE0EF]/20 to-[#6438FF]/20 rounded-full blur-3xl animate-float-delayed"></div>
          
                      {/* Content Container */}
                      <div class="site-container px-6 relative z-10 h-full flex items-center">
                        <div class="grid lg:grid-cols-2 gap-12 items-center w-full min-h-[70vh]">
                          {/* 左侧：文字内容 */}
                          <div class="space-y-6">
                            {/* 官网名称 */}
                            <div class="font-bold text-gray-800 tracking-wide text-3xl">
                              {slide.leftContent.siteName}
        </div>

                            {/* 主标题 */}
    <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
                              {slide.leftContent.mainTitle}
    </h1>
                            
                            {/* 概述 */}
    <p class="text-lg sm:text-xl text-gray-700 leading-relaxed">
                              {slide.leftContent.description}
    </p>
    
    {/* CTA Button */}
    <div class="pt-4">
      <a 
                                href={slide.leftContent.button.link} 
        class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#6438FF] to-[#0DE0EF] text-white rounded-xl font-bold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
      >
                                <i class={`${slide.leftContent.button.icon} mr-3`}></i>
                                {slide.leftContent.button.text}
      </a>
    </div>
  </div>
                          
                          {/* 右侧：图片或组件 */}
  <div class="relative lg:h-[600px] flex items-center justify-center">
                            {slide.rightImage.type === 'image' ? (
                              // 显示图片
                              <div class="w-full h-full flex items-center justify-center">
                                <img 
                                  src={slide.rightImage.src} 
                                  alt={slide.rightImage.alt}
                                  class="w-full h-auto max-w-lg rounded-xl shadow-2xl object-cover"
                                  loading="lazy"
                                />
                              </div>
                            ) : (
                              // 显示AI对话模拟组件
    <div class="relative w-full max-w-md">
      <div class="rounded-3xl p-6 shadow-2xl bg-white/95 backdrop-blur-sm border-2 border-gray-200">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center space-x-3">
            <div>
              <div class="font-semibold text-[#5E3AFC]">{trans.aiSimulation.aiAssistant}</div>
              <div class="text-[#0DE0EF] text-sm">{trans.aiSimulation.status}</div>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <div class="w-2 h-2 bg-[#0DE0EF] rounded-full animate-pulse"></div>
            <span class="text-xs text-gray-600">{trans.aiSimulation.live}</span>
          </div>
        </div>

                                  <div class="space-y-4 mb-4">
                                    <div class="flex justify-end">
            <div class="text-white px-4 py-3 rounded-2xl rounded-br-sm max-w-xs bg-[#11B98F] shadow-md">
              <p class="text-sm">{trans.aiSimulation.customerQuery}</p>
            </div>
          </div>
                                    <div class="flex justify-start opacity-0 animate-fadeIn" style="animation-delay: 0.8s;">
            <div class="text-white px-4 py-3 rounded-2xl rounded-bl-sm max-w-xs bg-[#5E3AFC] shadow-md">
              <div class="flex items-center space-x-2 mb-2">
                <div class="w-4 h-4 bg-white/30 rounded-full"></div>
                <span class="text-xs text-white/80">{trans.aiSimulation.aiProcessing}</span>
              </div>
              <p class="text-sm">{trans.aiSimulation.aiLocating}</p>
            </div>
          </div>
                                    <div class="flex justify-start opacity-0 animate-fadeIn" style="animation-delay: 1.8s;">
            <div class="text-white px-4 py-3 rounded-2xl rounded-bl-sm max-w-xs bg-[#5E3AFC] shadow-md">
              <p class="text-sm">{trans.aiSimulation.aiResponse}</p>
            </div>
          </div>
                                  <div class="flex justify-end opacity-0 animate-fadeIn" style="animation-delay: 2.8s;">
            <div class="text-white px-4 py-3 rounded-2xl rounded-br-sm max-w-xs bg-[#11B98F] shadow-md">
              <p class="text-sm">{trans.aiSimulation.customerReply}</p>
            </div>
          </div>
        </div>

        <div class="flex items-center space-x-3">
          <div class="flex-1 rounded-xl px-4 py-3 bg-gray-100 border border-gray-300 opacity-75 cursor-not-allowed">
            <input 
              type="text" 
              placeholder={trans.aiSimulation.inputPlaceholder} 
              class="w-full bg-transparent text-gray-700 placeholder-gray-500 text-sm outline-none cursor-not-allowed" 
              disabled={true}
              readonly={true}
            />
          </div>
          <button class="w-12 h-12 bg-[#5E3AFC] hover:bg-[#5E3AFC] rounded-xl flex items-center justify-center shadow-md cursor-not-allowed opacity-70" disabled={true}>
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
          </button>
        </div>
      </div>

      <div class="absolute -top-4 -right-8 w-32 p-3 bg-gradient-to-r from-[#6438FF]/90 to-[#8B5CF6]/90 backdrop-blur-xl rounded-xl border border-white/20 animate-float">
        <div class="flex items-center space-x-2 mb-1">
          <div class="w-4 h-4 bg-[#0DE0EF] rounded-full"></div>
          <span class="text-white text-xs font-semibold">{trans.aiSimulation.responseTime}</span>
        </div>
        <div class="text-white text-lg font-black">{trans.aiSimulation.responseValue}</div>
      </div>

      <div class="absolute -bottom-4 -left-8 w-36 p-3 bg-gradient-to-r from-[#11B98F] to-[#0DE0EF] rounded-xl border border-[#11B98F]/50 shadow-lg animate-float-delayed">
        <div class="flex items-center space-x-2 mb-1">
          <div class="w-4 h-4 bg-white rounded-full"></div>
          <span class="text-white text-xs font-semibold">{trans.aiSimulation.satisfaction}</span>
        </div>
        <div class="text-white text-lg font-black">{trans.aiSimulation.satisfactionValue}</div>
      </div>
    </div>
                            )}
  </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
</div>

              {/* Pagination Indicators - 翻页指示器 */}
              {showPagination && (
                <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
                  {displaySlides.map((slide, index) => (
                    <button
                      key={slide.id}
                      data-slide-target={index}
                      class={`pagination-dot w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${index === 0 ? 'bg-[#6438FF] w-8' : 'bg-[#bbbfc4]'}`}
                      onclick={`bannerGoToSlide(${index})`}
                      aria-label={`Go to slide ${index + 1}`}
                    ></button>
                  ))}
            </div>
              )}

              {/* Banner Carousel Script */}
              <script dangerouslySetInnerHTML={{__html: `
                (function() {
                  const totalSlides = ${totalSlides};
                  const autoPlayEnabled = ${showPagination ? 'true' : 'false'};
                  let currentSlide = 0;
                  let autoPlayTimer = null;

                  // 切换到指定幻灯片
                  function goToSlide(index) {
                    const slides = document.querySelectorAll('.banner-slide');
                    const dots = document.querySelectorAll('.pagination-dot');
                    
                    if (!slides.length) return;

                    // 隐藏当前幻灯片
                    slides[currentSlide].style.opacity = '0';
                    slides[currentSlide].style.zIndex = '0';
                    if (dots[currentSlide]) {
                      dots[currentSlide].classList.remove('bg-[#6438FF]', 'w-8');
                      dots[currentSlide].classList.add('bg-[#bbbfc4]');
                    }

                    // 更新当前索引
                    currentSlide = index;

                    // 显示新幻灯片
                    slides[currentSlide].style.opacity = '100';
                    slides[currentSlide].style.zIndex = '10';
                    if (dots[currentSlide]) {
                      dots[currentSlide].classList.remove('bg-[#bbbfc4]');
                      dots[currentSlide].classList.add('bg-[#6438FF]', 'w-8');
                    }

                    // 重置自动播放计时器
                    resetAutoPlay();
                  }

                  // 下一张
                  function nextSlide() {
                    const nextIndex = (currentSlide + 1) % totalSlides;
                    goToSlide(nextIndex);
                  }

                  // 重置自动播放
                  function resetAutoPlay() {
                    if (!autoPlayEnabled || totalSlides <= 1) return;
                    
                    if (autoPlayTimer) {
                      clearInterval(autoPlayTimer);
                    }
                    
                    autoPlayTimer = setInterval(() => {
                      nextSlide();
                    }, 10000); // 10秒
                  }

                  // 全局函数供按钮调用
                  window.bannerGoToSlide = function(index) {
                    goToSlide(index);
                  };

                  // 初始化
                  if (autoPlayEnabled && totalSlides > 1) {
                    resetAutoPlay();
                  }

                  // 页面可见性变化时暂停/恢复自动播放
                  document.addEventListener('visibilitychange', function() {
                    if (document.hidden) {
                      if (autoPlayTimer) clearInterval(autoPlayTimer);
                    } else {
                      resetAutoPlay();
                    }
                  });
                })();
              `}} />
      </section>
          </>
        );
      })()}
      

      {/* Other Resources Section - 资源中心 */}
      <section class="py-16 md:py-20 bg-gradient-to-tr from-blue-200 via-purple-200 to-pink-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Resource Cards - 两个卡片水平排列 */}
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
            {/* Card 1 - Voice Agents */}
            <div class="bg-white rounded-3xl p-8 md:p-10 shadow-xl">
              {/* Icon 和 Title 水平排列 */}
              <div class="flex items-center mb-8">
                {/* Icon - 浅蓝紫渐变背景，白色图标 */}
                <div class="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center flex-shrink-0 mr-4">
                  <i class="fas fa-microphone text-white text-2xl"></i>
              </div>
                
                {/* Title - 在图标右侧 */}
                <h3 class="text-2xl md:text-3xl font-bold text-gray-900 flex-1">
                  {trans.otherResources.cards.voiceConnectivity.title}
                </h3>
            </div>

              {/* Buttons */}
              <div class="flex flex-col sm:flex-row gap-3">
                {/* Learn More Button - 紫色，带白色圆形图标 */}
                <a 
                  href={`${language === 'en' ? '' : `/${language}`}/products/voice-agents`}
                  class="inline-flex items-center justify-center px-6 py-3 bg-[#6438FF] text-white rounded-full font-medium hover:bg-[#5a2ee6] transition-all duration-300"
                >
                  <span class="inline-flex items-center justify-center w-5 h-5 bg-white rounded-full mr-2">
                    <i class="fas fa-arrow-right text-[#6438FF] text-xs"></i>
              </span>
                  <span>{trans.otherResources.cards.voiceConnectivity.learnMore}</span>
                </a>
                
                {/* Book Demo Button - 白色背景，黑色边框 */}
                <a 
                  href={`${language === 'en' ? '' : `/${language}`}/contact`}
                  class="inline-flex items-center justify-center px-6 py-3 bg-white border-2 border-gray-900 text-gray-900 rounded-full font-medium hover:bg-gray-50 transition-all duration-300"
                >
                  {trans.otherResources.cards.voiceConnectivity.bookDemo}
                </a>
              </div>
            </div>

            {/* Card 2 - Live Chat */}
            <div class="bg-white rounded-3xl p-8 md:p-10 shadow-xl">
              {/* Icon 和 Title 水平排列 */}
              <div class="flex items-center mb-8">
                {/* Icon - 浅蓝紫渐变背景，白色图标 */}
                <div class="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center flex-shrink-0 mr-4">
                  <i class="fas fa-comment-dots text-white text-2xl"></i>
                </div>
                
                {/* Title - 在图标右侧 */}
                <h3 class="text-2xl md:text-3xl font-bold text-gray-900 flex-1">
                  {trans.otherResources.cards.liveChat.title}
                </h3>
              </div>
              
              {/* Buttons */}
              <div class="flex flex-col sm:flex-row gap-3">
                {/* Learn More Button - 紫色，带白色圆形图标 */}
                <a 
                  href={`${language === 'en' ? '' : `/${language}`}/products/live-chat`}
                  class="inline-flex items-center justify-center px-6 py-3 bg-[#6438FF] text-white rounded-full font-medium hover:bg-[#5a2ee6] transition-all duration-300"
                >
                  <span class="inline-flex items-center justify-center w-5 h-5 bg-white rounded-full mr-2">
                    <i class="fas fa-arrow-right text-[#6438FF] text-xs"></i>
                  </span>
                  <span>{trans.otherResources.cards.liveChat.learnMore}</span>
                </a>
                
                {/* Book Demo Button - 白色背景，黑色边框 */}
                <a 
                  href={`${language === 'en' ? '' : `/${language}`}/contact`}
                  class="inline-flex items-center justify-center px-6 py-3 bg-white border-2 border-gray-900 text-gray-900 rounded-full font-medium hover:bg-gray-50 transition-all duration-300"
                >
                  {trans.otherResources.cards.liveChat.bookDemo}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Zenava Business Value Section - Alternating-Text-Media-List Format */}
      <section class="py-12 md:py-16 lg:py-20 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12 md:mb-16">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {trans.businessValue.title}
            </h2>
            <p class="text-xl text-gray-600">
              {trans.businessValue.subtitle}
            </p>
          </div>

          <div class="space-y-12 md:space-y-16 lg:space-y-20">
            {/* 版块3 - 第1项：左图右文（奇数项） */}
            {trans.businessValue.capabilities && (
              <>
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
                  {/* 左侧：图片 */}
                  <div class="order-1" data-animate="slide-up">
                <div class="rounded-xl overflow-hidden">
                  <img 
                        src="/assets/images/01.webp" 
                        alt={trans.businessValue.capabilities.item1.imageAlt || '即时响应服务'}
                        class="w-full h-auto object-contain"
                    loading="lazy"
                  />
              </div>
            </div>

                  {/* 右侧：文字内容 */}
                  <div class="order-2 space-y-4 md:space-y-6" data-animate="slide-up">
                    <h3 class="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                      {trans.businessValue.capabilities.item1.title}
                    </h3>
                  
                    <ul class="space-y-3 md:space-y-4">
                      {trans.businessValue.capabilities.item1.list.map((item: string) => (
                        <li class="flex items-start space-x-2 md:space-x-3">
                          <div class="flex-shrink-0 w-5 h-5 md:w-6 md:h-6 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                            <i class="fas fa-check text-blue-600 text-xs"></i>
                      </div>
                          <span class="text-gray-700 font-medium text-sm md:text-base leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div class="pt-2">
                <a 
                  href="/contact"
                        class="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 transition-colors min-h-[44px]"
                      >
                        {trans.businessValue.capabilities.item1.button}
                      </a>
                  </div>
                  </div>
                </div>
                
                {/* 版块3 - 第2项：左文右图（偶数项） */}
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
                  {/* 左侧：文字内容 */}
                  <div class="order-2 lg:order-1 space-y-4 md:space-y-6" data-animate="slide-up">
                    <h3 class="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                      {trans.businessValue.capabilities.item2.title}
                    </h3>
                    
                    <ul class="space-y-3 md:space-y-4">
                      {trans.businessValue.capabilities.item2.list.map((item: string) => (
                        <li class="flex items-start space-x-2 md:space-x-3">
                          <div class="flex-shrink-0 w-5 h-5 md:w-6 md:h-6 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                            <i class="fas fa-check text-green-600 text-xs"></i>
                  </div>
                          <span class="text-gray-700 font-medium text-sm md:text-base leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div class="pt-2">
                <a 
                  href="/contact" 
                        class="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 transition-colors min-h-[44px]"
                      >
                        {trans.businessValue.capabilities.item2.button}
                      </a>
                    </div>
                  </div>
                  
                  {/* 右侧：图片 */}
                  <div class="order-1 lg:order-2" data-animate="slide-up">
                    <div class="rounded-xl overflow-hidden">
                      <img 
                        src="/assets/images/02.webp" 
                        alt={trans.businessValue.capabilities.item2.imageAlt || '自然沟通体验'}
                        class="w-full h-auto object-contain"
                        loading="lazy"
                      />
                    </div>
                    </div>
                  </div>
                  
                {/* 版块3 - 第3项：左图右文（奇数项） */}
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* 左侧：图片 */}
                  <div class="order-1" data-animate="slide-up">
                <div class="rounded-xl overflow-hidden">
                  <img 
                        src="/assets/images/03.webp" 
                        alt={trans.businessValue.capabilities.item3.imageAlt || '客户服务自动化'}
                        class="w-full h-auto object-contain"
                    loading="lazy"
                  />
                </div>
              </div>
              
                  {/* 右侧：文字内容 */}
                  <div class="order-2 space-y-4 md:space-y-6" data-animate="slide-up">
                    <h3 class="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                      {trans.businessValue.capabilities.item3.title}
                    </h3>
                    
                    <ul class="space-y-3 md:space-y-4">
                      {trans.businessValue.capabilities.item3.list.map((item: string) => (
                        <li class="flex items-start space-x-2 md:space-x-3">
                          <div class="flex-shrink-0 w-5 h-5 md:w-6 md:h-6 rounded-full bg-purple-100 flex items-center justify-center mt-0.5">
                            <i class="fas fa-check text-purple-600 text-xs"></i>
              </div>
                          <span class="text-gray-700 font-medium text-sm md:text-base leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div class="pt-2">
                <a 
                  href="/contact"
                        class="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 transition-colors min-h-[44px]"
                      >
                        {trans.businessValue.capabilities.item3.button}
                      </a>
                  </div>
                  </div>
                  </div>

                {/* 版块3 - 第4项：左文右图（偶数项） */}
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
                  {/* 左侧：文字内容 */}
                  <div class="order-2 lg:order-1 space-y-4 md:space-y-6" data-animate="slide-up">
                    <h3 class="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                      {trans.businessValue.capabilities.item4.title}
                    </h3>
                    
                    <ul class="space-y-3 md:space-y-4">
                      {trans.businessValue.capabilities.item4.list.map((item: string) => (
                        <li class="flex items-start space-x-2 md:space-x-3">
                          <div class="flex-shrink-0 w-5 h-5 md:w-6 md:h-6 rounded-full bg-orange-100 flex items-center justify-center mt-0.5">
                            <i class="fas fa-check text-orange-600 text-xs"></i>
                </div>
                          <span class="text-gray-700 font-medium text-sm md:text-base leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                
                    <div class="pt-2">
                <a 
                  href="/contact" 
                        class="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 transition-colors min-h-[44px]"
                      >
                        {trans.businessValue.capabilities.item4.button}
                      </a>
                    </div>
                  </div>
                  
                  {/* 右侧：图片 */}
                  <div class="order-1 lg:order-2" data-animate="slide-up">
                    <div class="rounded-xl overflow-hidden">
                      <img 
                        src="/assets/images/04.webp" 
                        alt={trans.businessValue.capabilities.item4.imageAlt || '智能引导访客留资'}
                        class="w-full h-auto object-contain"
                        loading="lazy"
                      />
                    </div>
                    </div>
                  </div>
                  
                {/* 版块3 - 第5项：左图右文（奇数项） */}
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
                  {/* 左侧：图片 */}
                  <div class="order-1" data-animate="slide-up">
                    <div class="rounded-xl overflow-hidden">
                      <img 
                        src="/assets/images/05.webp" 
                        alt={trans.businessValue.capabilities.item5.imageAlt || '效果可量化'}
                        class="w-full h-auto object-contain"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  
                  {/* 右侧：文字内容 */}
                  <div class="order-2 space-y-4 md:space-y-6" data-animate="slide-up">
                    <h3 class="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                      {trans.businessValue.capabilities.item5.title}
                    </h3>
                    
                    <ul class="space-y-3 md:space-y-4">
                      {trans.businessValue.capabilities.item5.list.map((item: string) => (
                        <li class="flex items-start space-x-2 md:space-x-3">
                          <div class="flex-shrink-0 w-5 h-5 md:w-6 md:h-6 rounded-full bg-indigo-100 flex items-center justify-center mt-0.5">
                            <i class="fas fa-check text-indigo-600 text-xs"></i>
                    </div>
                          <span class="text-gray-700 font-medium text-sm md:text-base leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div class="pt-2">
                <a 
                  href="/contact"
                        class="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 transition-colors min-h-[44px]"
                      >
                        {trans.businessValue.capabilities.item5.button}
                      </a>
                  </div>
                  </div>
                  </div>
              </>
            )}

              </div>
            </div>
      </section>

      {/* Job Image Section - 招聘图片 */}
      <section class="py-0">
        <div class="w-full">
          <img 
            src="/assets/images/job.jpg" 
            alt="招聘信息"
            class="w-full h-auto object-cover"
            loading="lazy"
          />
        </div>
      </section>

      {/* Render additional dynamic modules */}
      {modules.filter(m => !['main_hero', 'key_features', 'platform_stats'].includes(m.module_name)).map((module, index) => {
        const content = getModuleContent(module);
        
        // Generic module renderer based on module type
        if (module.module_type === 'text_block') {
          return (
            <section key={index} class="py-20 bg-white">
              <div class="site-container px-6">
                <div class="max-w-4xl mx-auto">
                  {content.title && <h2 class="text-4xl font-bold text-gray-900 mb-6">{content.title}</h2>}
                  {content.content && <div class="prose prose-lg" dangerouslySetInnerHTML={{ __html: content.content }}></div>}
                </div>
              </div>
            </section>
          );
        }
        
        if (module.module_type === 'cta') {
          return (
            <section key={index} class="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
              <div class="container mx-auto px-6 text-center">
                {content.title && <h2 class="text-4xl font-bold text-white mb-4">{content.title}</h2>}
                {content.subtitle && <p class="text-xl text-gray-100 mb-8">{content.subtitle}</p>}
                {content.button_text && (
                  <a href={content.button_link || '#'} class="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg inline-block">
                    {content.button_text}
                  </a>
                )}
              </div>
            </section>
          );
        }
        
        return null;
      })}
      
      <script dangerouslySetInnerHTML={{__html: `
        // Smooth scrolling for anchor links
        document.addEventListener('DOMContentLoaded', function() {
          const anchorLinks = document.querySelectorAll('a[href^="#"]');
          anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
              e.preventDefault();
              const targetId = this.getAttribute('href').substring(1);
              const targetElement = document.getElementById(targetId);
              if (targetElement) {
                targetElement.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
                });
              }
            });
          });
        });
        
        // Contact form submission
        document.getElementById('contact-form')?.addEventListener('submit', async (e) => {
          e.preventDefault();
          
          const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            company: document.getElementById('company').value,
            message: document.getElementById('message').value,
          };
          
          try {
            const response = await fetch('/api/contact', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData)
            });
            
            if (response.ok) {
              alert('${language === 'zh' ? '消息已发送成功！' : language === 'jp' ? 'メッセージが送信されました！' : 'Message sent successfully!'}');
              e.target.reset();
            } else {
              alert('${language === 'zh' ? '发送失败，请重试。' : language === 'jp' ? '送信に失敗しました。' : 'Failed to send message. Please try again.'}');
            }
          } catch (error) {
            console.error('Error:', error);
            alert('${language === 'zh' ? '发生错误，请稍后重试。' : language === 'jp' ? 'エラーが発生しました。' : 'An error occurred. Please try again later.'}');
          }
        });
      `}} />

      {/* Zenava Brand Animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(2deg); }
          }
          
          @keyframes float-delayed {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-15px) rotate(-2deg); }
          }
          
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          
          .animate-float-delayed {
            animation: float-delayed 6s ease-in-out infinite 2s;
          }
          
          .animate-fadeIn {
            animation: fadeIn 0.6s ease forwards;
          }
        `
      }} />
    </>
  )
}