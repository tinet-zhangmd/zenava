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
          // 第1页 - 新增全图Banner（全图模式）
          {
            id: 'slide-6',
            layout: 'full-image',
            fullImage: {
              src: '/assets/images/banner-full-marketing.webp',
              mobileSrc: '/assets/images/banner-full-marketing-mobile.webp',  // 移动端图片路径
              alt: trans.banners.slide6.imageAlt,
              overlay: false,  // 不显示遮罩层
            },
            // 不提供 overlayContent，表示不显示文字内容
            // 整个Banner可点击跳转（可选）
            clickLink: '/contact'
          }
        ];

        // 🎬 只显示最新的8个Banner（如果超过8个）
        const displaySlides = bannerSlides.slice(-8);
        const totalSlides = displaySlides.length;
        const showPagination = totalSlides > 1; // 只有多页时才显示翻页

        return (
          <>
            {/* Hero Section - Carousel Banner */}
            <section id="hero" class="relative text-white flex items-center overflow-hidden" style="height: 740px;">
              
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
                              />
                            </picture>
                          ) : (
                            <img 
                              src={fullImageSlide.fullImage.src} 
                              alt={fullImageSlide.fullImage.alt}
                              class="w-full h-full object-cover"
                              loading="lazy"
                            />
                          )}
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
            {/* Card 1 - Voice Connectivity */}
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
                  href="/contact"
                  class="inline-flex items-center justify-center px-6 py-3 bg-[#6438FF] text-white rounded-full font-medium hover:bg-[#5a2ee6] transition-all duration-300"
                >
                  <span class="inline-flex items-center justify-center w-5 h-5 bg-white rounded-full mr-2">
                    <span class="text-[#6438FF] text-xs font-bold">+</span>
              </span>
                  <span>{trans.otherResources.cards.voiceConnectivity.learnMore}</span>
                </a>
                
                {/* Book Demo Button - 白色背景，黑色边框 */}
                <a 
                  href="/contact"
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
                  href="/contact"
                  class="inline-flex items-center justify-center px-6 py-3 bg-[#6438FF] text-white rounded-full font-medium hover:bg-[#5a2ee6] transition-all duration-300"
                >
                  <span class="inline-flex items-center justify-center w-5 h-5 bg-white rounded-full mr-2">
                    <span class="text-[#6438FF] text-xs font-bold">+</span>
                  </span>
                  <span>{trans.otherResources.cards.liveChat.learnMore}</span>
                </a>
                
                {/* Book Demo Button - 白色背景，黑色边框 */}
                <a 
                  href="/contact"
                  class="inline-flex items-center justify-center px-6 py-3 bg-white border-2 border-gray-900 text-gray-900 rounded-full font-medium hover:bg-gray-50 transition-all duration-300"
                >
                  {trans.otherResources.cards.liveChat.bookDemo}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Zenava Business Value Section - Matching Marketing Solutions Style */}
      <section class="py-20 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {trans.businessValue.title}
            </h2>
            <p class="text-xl text-gray-600">
              {trans.businessValue.subtitle}
            </p>
          </div>

          <div class="space-y-16">
            {/* 版块3 - 第1项：左文右图 */}
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* 左侧：文字内容 */}
              <div data-animate="slide-up">
                {/* 标题行（可点击） */}
                <a 
                  href="/contact"
                  class="flex items-center mb-6 group cursor-pointer"
                >
                  <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-purple-200 transition-colors">
                    <i class="fas fa-robot text-purple-600 text-xl"></i>
                  </div>
                  <h3 class="text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                    {trans.scenarios.marketing.section3?.mainTitle || trans.scenarios.marketing.title}
                  </h3>
                </a>
                <h4 class="text-lg md:text-xl font-semibold text-purple-600 mb-4">
                  {trans.scenarios.marketing.section3?.subtitle || trans.scenarios.marketing.subtitle}
                </h4>
                <p class="text-base md:text-lg text-gray-700 mb-6 leading-relaxed">
                  {trans.scenarios.marketing.section3?.description || trans.scenarios.marketing.description}
                </p>
                <div class="flex flex-wrap gap-4 mb-6">
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>{trans.scenarios.marketing.section3?.tag1 || trans.scenarios.marketing.features?.[0] || '智能识别'}</span>
                  </div>
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>{trans.scenarios.marketing.section3?.tag2 || trans.scenarios.marketing.features?.[1] || '实时优化'}</span>
                  </div>
                </div>
                
                {/* 按钮 */}
                <a 
                  href="/contact" 
                  class="inline-flex items-center px-6 py-3 border-2 border-orange-500 text-orange-500 font-semibold rounded-full hover:bg-orange-500 hover:text-white transition-all duration-300"
                >
                  <span>{trans.scenarios.marketing.section3?.buttonText || trans.scenarios.marketing.title}</span>
                  <i class="fas fa-arrow-right ml-2"></i>
                </a>
              </div>
              
              {/* 右侧：图片 */}
              <div class="relative" data-animate="slide-up">
                <div class="rounded-xl overflow-hidden">
                  <img 
                    src="/assets/images/right-one.webp" 
                    alt={trans.scenarios.marketing.section3?.imageAlt || 'Marketing Automation'}
                    class="w-full h-auto object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Sales Business - Solution 2 */}
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div class="order-2 lg:order-1 bg-white p-8 rounded-xl shadow-lg" data-animate="slide-up">
                  <div class="space-y-4">
                  <h4 class="font-bold text-gray-900 mb-4">{trans.salesProcess.title}</h4>
                  
                  <div class="space-y-3">
                    <div class="flex items-center p-3 bg-blue-50 rounded-lg">
                      <div class="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">1</div>
                      <div class="flex-1">
                        <p class="font-medium">{trans.salesProcess.step1.title}</p>
                        <p class="text-sm text-gray-600">{trans.salesProcess.step1.description}</p>
                      </div>
                      <div class="text-right">
                        <span class="text-lg font-bold text-blue-600">{trans.salesProcess.step1.value}</span>
                      </div>
                    </div>
                    
                    <div class="flex items-center p-3 bg-green-50 rounded-lg">
                      <div class="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">2</div>
                      <div class="flex-1">
                        <p class="font-medium">{trans.salesProcess.step2.title}</p>
                        <p class="text-sm text-gray-600">{trans.salesProcess.step2.description}</p>
                      </div>
                      <div class="text-right">
                        <span class="text-lg font-bold text-green-600">{trans.salesProcess.step2.value}</span>
                      </div>
                    </div>
                    
                    <div class="flex items-center p-3 bg-purple-50 rounded-lg">
                      <div class="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">3</div>
                      <div class="flex-1">
                        <p class="font-medium">{trans.salesProcess.step3.title}</p>
                        <p class="text-sm text-gray-600">{trans.salesProcess.step3.description}</p>
                      </div>
                      <div class="text-right">
                        <span class="text-lg font-bold text-purple-600">{trans.salesProcess.step3.value}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="order-1 lg:order-2" data-animate="slide-up">
                {/* 标题行（可点击） */}
                <a 
                  href="/contact"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center mb-6 group cursor-pointer"
                >
                  <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-blue-200 transition-colors">
                    <i class="fas fa-chart-line text-blue-600 text-xl"></i>
                  </div>
                  <h3 class="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{trans.scenarios.sales.title}</h3>
                </a>
                <h4 class="text-lg font-semibold text-blue-600 mb-4">
                  {trans.scenarios.sales.subtitle}
                </h4>
                <p class="text-gray-700 mb-6 leading-relaxed">
                  {trans.scenarios.sales.description}
                </p>
                <div class="flex space-x-4 mb-6">
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>{trans.scenarios.sales.featureShort?.[0] || trans.scenarios.sales.features?.[0] || 'Talk Track'}</span>
                  </div>
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>{trans.scenarios.sales.featureShort?.[1] || trans.scenarios.sales.features?.[1] || 'Competitive Analysis'}</span>
                  </div>
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>{trans.scenarios.sales.featureShort?.[2] || trans.scenarios.sales.features?.[2] || 'Smart Closing'}</span>
                  </div>
                </div>
                
                {/* 按钮 */}
                <a 
                  href="/contact" 
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center px-6 py-3 border-2 border-orange-500 text-orange-500 font-semibold rounded-full hover:bg-orange-500 hover:text-white transition-all duration-300"
                >
                  <span>{trans.scenarios.sales.buttonText || trans.scenarios.sales.title}</span>
                  <i class="fas fa-arrow-right ml-2"></i>
                </a>
              </div>
            </div>

            {/* Customer Service Business - Solution 3 */}
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div data-animate="slide-up">
                {/* 标题行（可点击） */}
                <a 
                  href="/contact"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center mb-6 group cursor-pointer"
                >
                  <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-orange-200 transition-colors">
                    <i class="fas fa-headset text-orange-600 text-xl"></i>
                  </div>
                  <h3 class="text-2xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">{trans.scenarios.customerService.title}</h3>
                </a>
                <h4 class="text-lg font-semibold text-orange-600 mb-4">
                  {trans.scenarios.customerService.subtitle}
                </h4>
                <p class="text-gray-700 mb-6 leading-relaxed">
                  {trans.scenarios.customerService.description}
                </p>
                <div class="flex space-x-4 mb-6">
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>{trans.scenarios.customerService.featureShort?.[0] || trans.scenarios.customerService.features?.[0] || '24/7 Response'}</span>
                  </div>
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>{trans.scenarios.customerService.featureShort?.[1] || trans.scenarios.customerService.features?.[1] || 'Emotion Recognition'}</span>
                  </div>
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>{trans.scenarios.customerService.featureShort?.[2] || trans.scenarios.customerService.features?.[2] || 'Smart Ticketing'}</span>
                  </div>
                </div>
                
                {/* 按钮 */}
                <a 
                  href="/contact" 
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center px-6 py-3 border-2 border-orange-500 text-orange-500 font-semibold rounded-full hover:bg-orange-500 hover:text-white transition-all duration-300"
                >
                  <span>{trans.scenarios.customerService.buttonText || trans.scenarios.customerService.title}</span>
                  <i class="fas fa-arrow-right ml-2"></i>
                </a>
              </div>
              
              <div class="bg-white p-8 rounded-xl shadow-lg" data-animate="slide-up">
                <h4 class="font-bold text-gray-900 mb-6">{trans.ticketProcess.title}</h4>
                
                <div class="space-y-4">
                  <div class="flex items-start space-x-4">
                    <div class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-bold mt-1">1</div>
                    <div>
                      <p class="font-medium text-gray-900">{trans.ticketProcess.step1.title}</p>
                      <p class="text-sm text-gray-600">{trans.ticketProcess.step1.description}</p>
                    </div>
                  </div>
                  
                  <div class="flex items-start space-x-4">
                    <div class="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-sm font-bold mt-1">2</div>
                    <div>
                      <p class="font-medium text-gray-900">{trans.ticketProcess.step2.title}</p>
                      <p class="text-sm text-gray-600">{trans.ticketProcess.step2.description}</p>
                    </div>
                  </div>
                  
                  <div class="flex items-start space-x-4">
                    <div class="w-8 h-8 bg-orange-200 rounded-full flex items-center justify-center text-sm font-bold mt-1">3</div>
                    <div>
                      <p class="font-medium text-gray-900">{trans.ticketProcess.step3.title}</p>
                      <p class="text-sm text-gray-600">{trans.ticketProcess.step3.description}</p>
                    </div>
                  </div>
                  
                  <div class="flex items-start space-x-4">
                    <div class="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">4</div>
                    <div>
                      <p class="font-medium text-gray-900">{trans.ticketProcess.step4.title}</p>
                      <p class="text-sm text-gray-600">{trans.ticketProcess.step4.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Internal Service - Solution 4 */}
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* 左侧：视频 */}
              <div class="order-2 lg:order-1 relative" data-animate="slide-up">
                <div class="rounded-xl overflow-hidden">
                  <video 
                    src="/assets/video/codegen.mov"
                    class="w-full h-auto"
                    autoplay
                    loop
                    muted
                    controls
                    playsinline
                  >
                    <p class="p-8 bg-gray-100 text-center">
                      {trans.scenarios.internalService.videoError || 'Your browser does not support video playback'}
                    </p>
                  </video>
                </div>
              </div>
              
              <div class="order-1 lg:order-2" data-animate="slide-up">
                {/* 标题行（可点击） */}
                <a 
                  href="/contact"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center mb-6 group cursor-pointer"
                >
                  <div class="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-indigo-200 transition-colors">
                    <i class="fas fa-network-wired text-indigo-600 text-xl"></i>
                  </div>
                  <h3 class="text-2xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{trans.scenarios.internalService.title}</h3>
                </a>
                <h4 class="text-lg font-semibold text-indigo-600 mb-4">
                  {trans.scenarios.internalService.subtitle}
                </h4>
                <p class="text-gray-700 mb-6 leading-relaxed">
                  {trans.scenarios.internalService.description}
                </p>
                <div class="flex space-x-4 mb-6">
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>{trans.scenarios.internalService.featureShort?.[0] || trans.scenarios.internalService.features?.[0] || '统一入口'}</span>
                  </div>
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>{trans.scenarios.internalService.featureShort?.[1] || trans.scenarios.internalService.features?.[1] || '智能派单'}</span>
                  </div>
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>{trans.scenarios.internalService.featureShort?.[2] || trans.scenarios.internalService.features?.[2] || '数据分析'}</span>
                  </div>
                </div>
                
                {/* 按钮 */}
                <a 
                  href="/contact" 
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center px-6 py-3 border-2 border-orange-500 text-orange-500 font-semibold rounded-full hover:bg-orange-500 hover:text-white transition-all duration-300"
                >
                  <span>{trans.scenarios.internalService.buttonText || trans.scenarios.internalService.title}</span>
                  <i class="fas fa-arrow-right ml-2"></i>
                </a>
              </div>
            </div>

            {/* Product Design & Optimization - Solution 5 */}
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div data-animate="slide-up">
                {/* 标题行（可点击） */}
                <a 
                  href="/contact"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center mb-6 group cursor-pointer"
                >
                  <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-purple-200 transition-colors">
                    <i class="fas fa-pencil-ruler text-purple-600 text-xl"></i>
                  </div>
                  <h3 class="text-2xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">{trans.scenarios.management.title}</h3>
                </a>
                <h4 class="text-lg font-semibold text-purple-600 mb-4">
                  {trans.scenarios.management.subtitle}
                </h4>
                <p class="text-gray-700 mb-6 leading-relaxed">
                  {trans.scenarios.management.description}
                </p>
                <div class="flex space-x-4 mb-6">
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>{trans.scenarios.management.featureShort?.[0] || trans.scenarios.management.features?.[0] || '痛点识别'}</span>
                  </div>
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>{trans.scenarios.management.featureShort?.[1] || trans.scenarios.management.features?.[1] || '需求提取'}</span>
                  </div>
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>{trans.scenarios.management.featureShort?.[2] || trans.scenarios.management.features?.[2] || '迭代闭环'}</span>
                  </div>
                </div>
                
                {/* 按钮 */}
                <a 
                  href="/contact" 
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center px-6 py-3 border-2 border-orange-500 text-orange-500 font-semibold rounded-full hover:bg-orange-500 hover:text-white transition-all duration-300"
                >
                  <span>{trans.scenarios.management.buttonText || trans.scenarios.management.title}</span>
                  <i class="fas fa-arrow-right ml-2"></i>
                </a>
              </div>
              
              <div class="bg-white p-8 rounded-xl shadow-lg" data-animate="slide-up">
                <h4 class="font-bold text-gray-900 mb-6">{trans.productFeedbackPanel?.title || 'Customer Feedback Analysis Panel'}</h4>
                
                <div class="space-y-4">
                  <div class="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                    <div>
                      <p class="text-sm text-gray-600">{trans.productFeedbackPanel?.painPoints || 'Product Pain Points'}</p>
                      <p class="text-2xl font-bold text-purple-600">{trans.productFeedbackPanel?.painPointCount || '1,842'}</p>
                    </div>
                    <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <i class="fas fa-comments text-purple-600"></i>
                    </div>
                  </div>
                  
                  <div class="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <div>
                      <p class="text-sm text-gray-600">{trans.productFeedbackPanel?.featureAdoption || 'Feature Adoption'}</p>
                      <p class="text-2xl font-bold text-green-600">{trans.productFeedbackPanel?.adoptionRate || '78%'}</p>
                    </div>
                    <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <i class="fas fa-lightbulb text-green-600"></i>
                    </div>
                  </div>
                  
                  <div class="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <div>
                      <p class="text-sm text-gray-600">{trans.productFeedbackPanel?.fixCycle || 'Issue Fix Cycle'}</p>
                      <p class="text-2xl font-bold text-blue-600">{trans.productFeedbackPanel?.fixTime || '3.2 days'}</p>
                    </div>
                    <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <i class="fas fa-tools text-blue-600"></i>
                    </div>
                  </div>
                  
                  <div class="border-t pt-4">
                    <div class="flex items-center justify-between">
                      <span class="text-sm text-gray-600">{trans.productFeedbackPanel?.monthlyIterations || 'Monthly Iterations'}</span>
                      <span class="text-sm font-bold text-gray-900">{trans.productFeedbackPanel?.iterationCount || '12 versions'}</span>
                    </div>
                    <div class="flex items-center justify-between mt-2">
                      <span class="text-sm text-gray-600">{trans.productFeedbackPanel?.satisfactionIncrease || 'Satisfaction Increase'}</span>
                      <span class="text-sm font-bold text-gray-900">{trans.productFeedbackPanel?.satisfactionGrowth || '+18%'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Brand & Sentiment Management - Solution 6 */}
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div class="order-2 lg:order-1 bg-white p-8 rounded-xl shadow-lg" data-animate="slide-up">
                <h4 class="font-bold text-gray-900 mb-6">{trans.sentimentPanel?.title || 'Real-time Sentiment Monitoring'}</h4>
                
                <div class="space-y-4">
                  <div class="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                    <div>
                      <p class="text-sm text-gray-600">{trans.sentimentPanel?.negativeAlert || 'Negative Sentiment Alert'}</p>
                      <p class="text-2xl font-bold text-red-600">{trans.sentimentPanel?.alertCount || '3 items'}</p>
                    </div>
                    <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <i class="fas fa-exclamation-triangle text-red-600"></i>
                    </div>
                  </div>
                  
                  <div class="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                    <div>
                      <p class="text-sm text-gray-600">{trans.sentimentPanel?.sensitiveWords || 'Sensitive Word Detection'}</p>
                      <p class="text-2xl font-bold text-yellow-600">{trans.sentimentPanel?.detectionRate || '99.8%'}</p>
                    </div>
                    <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <i class="fas fa-shield-alt text-yellow-600"></i>
                    </div>
                  </div>
                  
                  <div class="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <div>
                      <p class="text-sm text-gray-600">{trans.sentimentPanel?.brandSentiment || 'Brand Favorability'}</p>
                      <p class="text-2xl font-bold text-green-600">{trans.sentimentPanel?.sentimentGrowth || '+12%'}</p>
                    </div>
                    <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <i class="fas fa-chart-line text-green-600"></i>
                    </div>
                  </div>
                  
                  <div class="border-t pt-4">
                    <div class="flex items-center justify-between">
                      <span class="text-sm text-gray-600">{trans.sentimentPanel?.responseTime || 'Response Time'}</span>
                      <span class="text-sm font-bold text-gray-900">{trans.sentimentPanel?.responseSpeed || '<5 minutes'}</span>
                    </div>
                    <div class="flex items-center justify-between mt-2">
                      <span class="text-sm text-gray-600">{trans.sentimentPanel?.crisisSuccess || 'Crisis Success Rate'}</span>
                      <span class="text-sm font-bold text-gray-900">{trans.sentimentPanel?.successRate || '98%'}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="order-1 lg:order-2" data-animate="slide-up">
                {/* 标题行（可点击） */}
                <a 
                  href="/contact"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center mb-6 group cursor-pointer"
                >
                  <div class="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-teal-200 transition-colors">
                    <i class="fas fa-shield-alt text-teal-600 text-xl"></i>
                  </div>
                  <h3 class="text-2xl font-bold text-gray-900 group-hover:text-teal-600 transition-colors">{language === 'en' ? 'Brand & Reputation Management' : language === 'jp' ? 'ブランド・評判管理' : '品牌與輿情管理'}</h3>
                </a>
                <h4 class="text-lg font-semibold text-teal-600 mb-4">
                  {language === 'en' ? 'Real-time Brand Protection' : language === 'jp' ? 'リアルタイムブランド保護' : '實時守護企業品牌安全'}
                </h4>
                <p class="text-gray-700 mb-6 leading-relaxed">
                  {language === 'en' 
                    ? 'Integrate social and service data for intelligent risk detection. Real-time alerts for high-risk conversations with automated response workflows.Quantify customer sentiment to optimize communication strategies. Automatically perform quality checks on service language to ensure brand consistency.'
                    : language === 'jp'
                    ? 'ソーシャルとサービスデータを統合し、インテリジェントなリスク検出を実現。高リスク会話のリアルタイムアラートと自動対応ワークフロー。顧客感情を定量化し、コミュニケーション戦略を最適化。'
                    : '融合社交與客服數據，智能識別輿情風險；實時預警高風險對話，自動觸發應對流程；量化客戶情緒，優化溝通策略；自動質檢服務用語，保障品牌一致性。'}
                </p>
                <div class="flex space-x-4 mb-6">
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>{trans.scenarios.management?.brandFeatures?.[0] || 'Risk Alert'}</span>
                  </div>
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>{trans.scenarios.management?.brandFeatures?.[1] || 'Sentiment Analysis'}</span>
                  </div>
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>{trans.scenarios.management?.brandFeatures?.[2] || 'Quality Control'}</span>
                  </div>
                </div>
                
                {/* 按钮 */}
                <a 
                  href="/contact" 
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center px-6 py-3 border-2 border-orange-500 text-orange-500 font-semibold rounded-full hover:bg-orange-500 hover:text-white transition-all duration-300"
                >
                  <span>
                    {language === 'zh' && '了解更多品牌管理'}
                    {language === 'en' && 'Learn More About Brand Management'}
                    {language === 'jp' && 'ブランド管理の詳細'}
                    {language === 'hk' && '了解更多品牌管理'}
                  </span>
                  <i class="fas fa-arrow-right ml-2"></i>
                </a>
              </div>
            </div>
          </div>
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