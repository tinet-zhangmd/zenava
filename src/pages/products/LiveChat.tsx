import { FC } from 'hono/jsx'
import { Language } from '../../utils/i18n'
import { getTranslations } from '../../i18n/translations'

interface LiveChatPageProps {
  language?: Language
}

export const LiveChatPage: FC<LiveChatPageProps> = ({ language = 'zh' }) => {
  const trans = getTranslations(language)
  const t = trans.products.liveChat

  return (
    <>
      {/* Banner Section - 全图布局模式（仅图片和链接） */}
      <section class="relative w-full overflow-hidden group" style="height: 740px;">
        <a href="/contact" class="block w-full h-full overflow-hidden">
          <div class="absolute inset-0 bg-gray-100">
            {/* 全图背景 - 支持移动端专用图片 */}
            <picture>
              {/* 移动端图片（< 768px） */}
              <source media="(max-width: 767px)" srcset="/assets/images/livechat/banner-mobile.webp" />
              {/* 桌面端图片（>= 768px） */}
            <img 
              src="/assets/images/livechat/banner.webp" 
              alt="LiveChat Banner"
              class="w-full h-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-105"
              loading="eager"
              decoding="async"
            />
            </picture>
            {/* Subtle Overlay for better depth */}
            <div class="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/10 pointer-events-none"></div>
          </div>
        </a>
      </section>

      {/* Section 3: Core Capabilities - 版块3：核心能力 */}
      {t.section3 && (
        <section class="py-12 md:py-16 lg:py-20 bg-gray-50">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-8 md:mb-12 lg:mb-16">
              <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {t.section3.title}
              </h2>
              <p class="text-lg md:text-xl text-gray-600">
                {t.section3.subtitle}
              </p>
          </div>
          
            <div class="space-y-12 md:space-y-16">
              {/* 渲染所有子项，根据索引决定布局方向 */}
              {[t.section3.item1, t.section3.item2, t.section3.item3, t.section3.item4, t.section3.item5].map((item, index) => {
                if (!item) return null
                const isEven = (index + 1) % 2 === 0 // 偶数项右文左图
                const iconClasses = [
                  'fas fa-clock',      // item1: 7x24小时
                  'fas fa-images',     // item2: 富媒体
                  'fas fa-heart',      // item3: 情绪感知
                  'fas fa-balance-scale', // item4: 平衡
                  'fas fa-brain'       // item5: 同理心
                ]
                
                // 定义每项的主题色配置
                const themes = [
                  { // item1: Blue
                    gradient: 'from-blue-50 to-blue-100',
                    border: 'border-blue-200/50',
                    text: 'text-blue-600',
                    bg: 'bg-blue-500', // for tag dot
                    btnBorder: 'border-blue-600',
                    btnText: 'text-blue-600',
                    btnHoverBg: 'hover:bg-blue-600',
                    shadow: 'hover:shadow-blue-600/20',
                    blob: 'bg-blue-100/50'
                  },
                  { // item2: Purple
                    gradient: 'from-purple-50 to-purple-100',
                    border: 'border-purple-200/50',
                    text: 'text-purple-600',
                    bg: 'bg-purple-500',
                    btnBorder: 'border-purple-600',
                    btnText: 'text-purple-600',
                    btnHoverBg: 'hover:bg-purple-600',
                    shadow: 'hover:shadow-purple-600/20',
                    blob: 'bg-purple-100/50'
                  },
                  { // item3: Pink
                    gradient: 'from-pink-50 to-pink-100',
                    border: 'border-pink-200/50',
                    text: 'text-pink-600',
                    bg: 'bg-pink-500',
                    btnBorder: 'border-pink-600',
                    btnText: 'text-pink-600',
                    btnHoverBg: 'hover:bg-pink-600',
                    shadow: 'hover:shadow-pink-600/20',
                    blob: 'bg-pink-100/50'
                  },
                  { // item4: Green
                    gradient: 'from-green-50 to-green-100',
                    border: 'border-green-200/50',
                    text: 'text-green-600',
                    bg: 'bg-green-500',
                    btnBorder: 'border-green-600',
                    btnText: 'text-green-600',
                    btnHoverBg: 'hover:bg-green-600',
                    shadow: 'hover:shadow-green-600/20',
                    blob: 'bg-green-100/50'
                  },
                  { // item5: Indigo
                    gradient: 'from-indigo-50 to-indigo-100',
                    border: 'border-indigo-200/50',
                    text: 'text-indigo-600',
                    bg: 'bg-indigo-500',
                    btnBorder: 'border-indigo-600',
                    btnText: 'text-indigo-600',
                    btnHoverBg: 'hover:bg-indigo-600',
                    shadow: 'hover:shadow-indigo-600/20',
                    blob: 'bg-indigo-100/50'
                  }
                ]
                
                const theme = themes[index]

                return (
                  <div 
                    key={`item-${index + 1}`}
                    class={`grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center ${isEven ? 'lg:grid-flow-dense' : ''}`}
                  >
                    {/* 文字内容区域 */}
                    <div 
                      data-animate="slide-up"
                      class={`${isEven ? 'lg:col-start-2 lg:order-2' : 'lg:order-1'}`}
                    >
                      {/* 标题行（可点击） */}
                      <a 
                        href="/contact"
                        class="flex items-center mb-4 md:mb-6 group cursor-pointer"
                      >
                        <div class={`w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br ${theme.gradient} border ${theme.border} rounded-2xl flex items-center justify-center mr-4 md:mr-5 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                          <i class={`${iconClasses[index]} ${theme.text} text-xl md:text-2xl`}></i>
                        </div>
                        <h3 class={`text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 transition-colors group-hover:${theme.text}`}>
                          {item.mainTitle}
                        </h3>
                      </a>
                      <h4 class={`text-base md:text-lg lg:text-xl font-semibold ${theme.text} mb-3 md:mb-4`}>
                        {item.subtitle}
                      </h4>
                      <p class="text-sm md:text-base lg:text-lg text-gray-700 mb-6 md:mb-8 leading-relaxed">
                        {item.description}
                      </p>
                      <div class="flex flex-wrap gap-3 mb-6 md:mb-8">
                        {[item.tag1, item.tag2, item.tag3].filter(Boolean).map((tag, idx) => (
                          <div class={`flex items-center px-3 py-1.5 rounded-full bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-sm transition-all duration-300`}>
                            <div class={`w-1.5 h-1.5 rounded-full ${theme.bg} mr-2`}></div>
                            <span class="text-xs md:text-sm text-gray-600 font-medium">{tag}</span>
                          </div>
                        ))}
                      </div>
                      
                      {/* 按钮 */}
                      <a 
                        href="/contact" 
                        class={`inline-flex items-center px-6 py-3 border-2 ${theme.btnBorder} ${theme.btnText} font-bold rounded-full bg-white ${theme.btnHoverBg} hover:text-white transition-all duration-300 hover:shadow-lg ${theme.shadow} transform hover:-translate-y-0.5 min-h-[44px] group`}
                      >
                        <span>{item.buttonText}</span>
                        <i class="fas fa-arrow-right ml-2 transform group-hover:translate-x-1 transition-transform"></i>
                      </a>
                    </div>
                    
                    {/* 图片区域 */}
                    <div 
                      data-animate="slide-up"
                      class={`relative ${isEven ? 'lg:col-start-1 lg:order-1' : 'lg:order-2'}`}
                    >
                      <div class="relative rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100/50 bg-white p-2 group">
                        <div class="aspect-[4/3] relative z-10 rounded-2xl overflow-hidden">
                          <img 
                            src={item.imageSrc || '/assets/images/livechat/default.webp'} 
                            alt={item.imageAlt}
                            class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                        {/* Decorative blob */}
                        <div class={`absolute top-[-10%] ${isEven ? 'left-[-10%]' : 'right-[-10%]'} w-[50%] h-[50%] ${theme.blob} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Case Studies Section - Alternating-Text-Media-List 成功案例版块 */}
      {t.caseStudies && (
        <>
          {/* Case 1: B2B Enterprise Website - 左图右文 */}
          {t.caseStudies.case1 && (
            <section class="py-12 md:py-16 lg:py-20 bg-white">
              <div class="site-container px-4 sm:px-6 lg:px-8">
                {/* Section Header - 版块级别的主标题 */}
                {t.caseStudies.title && (
                  <div class="text-center mb-12 md:mb-16">
                    <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                      {t.caseStudies.title}
                    </h2>
                    {t.caseStudies.subtitle && (
                      <p class="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                        {t.caseStudies.subtitle}
                      </p>
                    )}
                  </div>
                )}
                
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
                  {/* Left Image */}
                  <div class="relative rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100/50 bg-gray-50/50 p-4 group">
                    <div class="aspect-[4/3] relative z-10 rounded-2xl overflow-hidden">
                      <img 
                        src={t.caseStudies.case1.imageSrc || '/assets/images/livechat/case1-b2b.webp'} 
                        alt={t.caseStudies.case1.imageAlt || t.caseStudies.case1.mainTitle}
                        class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    {/* Decorative blob */}
                    <div class="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-100/50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  </div>
                  
                  {/* Right Content */}
                  <div class="space-y-6 md:space-y-8">
                    <div>
                      {/* 主标题：黑色，大字体 */}
                      <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                        {t.caseStudies.case1.mainTitle}
                      </h2>
                    </div>
                    
                    <p class="text-sm md:text-base text-gray-700 leading-relaxed">
                      {t.caseStudies.case1.description}
                    </p>
                    
                    <ul class="space-y-3">
                      {t.caseStudies.case1.points.map((point: string, idx: number) => (
                        <li key={idx} class="flex items-start space-x-3 p-3 rounded-xl hover:bg-blue-50/50 transition-colors duration-300">
                          <div class="flex-shrink-0 w-6 h-6 mt-0.5 rounded-full bg-blue-100 flex items-center justify-center">
                            <i class="fas fa-check text-blue-600 text-xs"></i>
                          </div>
                          <span class="text-gray-700 font-medium text-base leading-relaxed">{point}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {t.caseStudies.case1.button && (
                      <div class="pt-2">
                        <a 
                          href="/contact" 
                          class="inline-flex items-center px-8 py-4 border-2 border-blue-600 text-base font-bold rounded-full text-blue-600 bg-white hover:bg-blue-600 hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/20 transform hover:-translate-y-0.5 min-h-[44px] group"
                        >
                          <span>{t.caseStudies.case1.button}</span>
                          <i class="fas fa-arrow-right ml-2 transform group-hover:translate-x-1 transition-transform"></i>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Case 2: Smart Lock - 左文右图 */}
          {t.caseStudies.case2 && (
            <section class="py-12 md:py-16 lg:py-20 bg-gray-50">
              <div class="site-container px-4 sm:px-6 lg:px-8">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
                  {/* Left Content */}
                  <div class="space-y-6 md:space-y-8 order-2 lg:order-1">
                    <div>
                      {/* 主标题：黑色，大字体 */}
                      <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                        {t.caseStudies.case2.mainTitle}
                      </h2>
                    </div>
                    
                    <p class="text-sm md:text-base text-gray-700 leading-relaxed">
                      {t.caseStudies.case2.description}
                    </p>
                    
                    <ul class="space-y-3">
                      {t.caseStudies.case2.points.map((point: string, idx: number) => (
                        <li key={idx} class="flex items-start space-x-3 p-3 rounded-xl hover:bg-green-50/50 transition-colors duration-300">
                          <div class="flex-shrink-0 w-6 h-6 mt-0.5 rounded-full bg-green-100 flex items-center justify-center">
                            <i class="fas fa-check text-green-600 text-xs"></i>
                          </div>
                          <span class="text-gray-700 font-medium text-base leading-relaxed">{point}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {t.caseStudies.case2.button && (
                      <div class="pt-2">
                        <a 
                          href="/contact" 
                          class="inline-flex items-center px-8 py-4 border-2 border-green-600 text-base font-bold rounded-full text-green-600 bg-white hover:bg-green-600 hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-green-600/20 transform hover:-translate-y-0.5 min-h-[44px] group"
                        >
                          <span>{t.caseStudies.case2.button}</span>
                          <i class="fas fa-arrow-right ml-2 transform group-hover:translate-x-1 transition-transform"></i>
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Right Image */}
                  <div class="relative rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100/50 bg-white p-4 order-1 lg:order-2 group">
                    <div class="aspect-[4/3] relative z-10 rounded-2xl overflow-hidden">
                      <img 
                        src={t.caseStudies.case2.imageSrc || '/assets/images/livechat/case2-smartlock.webp'} 
                        alt={t.caseStudies.case2.imageAlt || t.caseStudies.case2.mainTitle}
                        class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    {/* Decorative blob */}
                    <div class="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-green-100/50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  </div>
                </div>
              </div>
            </section>
          )}
        </>
            )}

    </>
  )
}

