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
      <section class="relative w-full overflow-hidden" style="height: 740px;">
        <a href="/contact" class="block w-full h-full">
          <div class="absolute inset-0 bg-gray-100">
            {/* 全图背景 - 支持移动端专用图片 */}
            <picture>
              {/* 移动端图片（< 768px） */}
              <source media="(max-width: 767px)" srcset="/assets/images/livechat/banner-mobile.webp" />
              {/* 桌面端图片（>= 768px） */}
            <img 
              src="/assets/images/livechat/banner.webp" 
              alt="LiveChat Banner"
              class="w-full h-full object-cover"
              loading="eager"
              decoding="async"
            />
            </picture>
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
                const bgColors = [
                  'bg-blue-100',      // item1
                  'bg-purple-100',    // item2
                  'bg-pink-100',      // item3
                  'bg-green-100',     // item4
                  'bg-indigo-100'     // item5
                ]
                const textColors = [
                  'text-blue-600',    // item1
                  'text-purple-600',  // item2
                  'text-pink-600',    // item3
                  'text-green-600',   // item4
                  'text-indigo-600'   // item5
                ]

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
                        <div class={`w-10 h-10 md:w-12 md:h-12 ${bgColors[index]} rounded-lg flex items-center justify-center mr-3 md:mr-4 group-hover:opacity-80 transition-colors`}>
                          <i class={`${iconClasses[index]} ${textColors[index]} text-lg md:text-xl`}></i>
                </div>
                        <h3 class={`text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 transition-colors ${index === 0 ? 'group-hover:text-blue-600' : index === 1 ? 'group-hover:text-purple-600' : index === 2 ? 'group-hover:text-pink-600' : index === 3 ? 'group-hover:text-green-600' : 'group-hover:text-indigo-600'}`}>
                          {item.mainTitle}
                        </h3>
                      </a>
                      <h4 class={`text-base md:text-lg lg:text-xl font-semibold ${textColors[index]} mb-3 md:mb-4`}>
                        {item.subtitle}
                      </h4>
                      <p class="text-sm md:text-base lg:text-lg text-gray-700 mb-4 md:mb-6 leading-relaxed">
                        {item.description}
                      </p>
                      <div class="flex flex-wrap gap-3 md:gap-4 mb-4 md:mb-6">
                        {item.tag1 && (
                          <div class="flex items-center text-xs md:text-sm text-gray-600">
                            <i class="fas fa-check text-green-500 mr-2"></i>
                            <span>{item.tag1}</span>
                          </div>
                        )}
                        {item.tag2 && (
                          <div class="flex items-center text-xs md:text-sm text-gray-600">
                            <i class="fas fa-check text-green-500 mr-2"></i>
                            <span>{item.tag2}</span>
                          </div>
                        )}
                        {item.tag3 && (
                          <div class="flex items-center text-xs md:text-sm text-gray-600">
                            <i class="fas fa-check text-green-500 mr-2"></i>
                            <span>{item.tag3}</span>
              </div>
            )}
                      </div>
                      
                      {/* 按钮 */}
                      <a 
                        href="/contact" 
                        class="inline-flex items-center px-5 py-2.5 md:px-6 md:py-3 border-2 border-orange-500 text-orange-500 font-semibold rounded-full hover:bg-orange-500 hover:text-white transition-all duration-300 text-sm md:text-base"
                      >
                        <span>{item.buttonText}</span>
                        <i class="fas fa-arrow-right ml-2"></i>
                      </a>
                    </div>
                    
                    {/* 图片区域 */}
                    <div 
                      data-animate="slide-up"
                      class={`relative ${isEven ? 'lg:col-start-1 lg:order-1' : 'lg:order-2'}`}
                    >
                      <div class="rounded-xl overflow-hidden">
                        <img 
                          src={item.imageSrc || '/assets/images/livechat/default.webp'} 
                          alt={item.imageAlt}
                          class="w-full h-auto object-contain"
                          loading="lazy"
                          decoding="async"
                        />
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
                  <div class="relative rounded-2xl overflow-hidden">
                    <div class="aspect-[4/3] flex items-center justify-center">
                      <img 
                        src={t.caseStudies.case1.imageSrc || '/assets/images/livechat/case1-b2b.webp'} 
                        alt={t.caseStudies.case1.imageAlt || t.caseStudies.case1.mainTitle}
                        class="w-full h-full object-contain"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  </div>
                  
                  {/* Right Content */}
                  <div class="space-y-4 md:space-y-6 lg:space-y-8">
                    <div>
                      {/* 主标题：黑色，大字体 */}
                      <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                        {t.caseStudies.case1.mainTitle}
                      </h2>
                    </div>
                    
                    <p class="text-sm md:text-base text-gray-700 leading-relaxed">
                      {t.caseStudies.case1.description}
                    </p>
                    
                    <ul class="space-y-3 md:space-y-4">
                      {t.caseStudies.case1.points.map((point: string, idx: number) => (
                        <li key={idx} class="flex items-center space-x-2 md:space-x-3">
                          <div class="flex-shrink-0 w-5 h-5 md:w-6 md:h-6 rounded-full bg-blue-100 flex items-center justify-center">
                            <i class="fas fa-check text-blue-600 text-xs"></i>
                          </div>
                          <span class="text-gray-700 font-medium text-sm md:text-base">{point}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {t.caseStudies.case1.button && (
                      <div>
                        <a 
                          href="/contact" 
                          class="inline-flex items-center px-6 py-3 md:px-6 md:py-3 border border-gray-300 shadow-sm text-base md:text-base font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 transition-colors min-h-[44px]"
                        >
                          {t.caseStudies.case1.button}
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
                  <div class="space-y-4 md:space-y-6 lg:space-y-8 order-2 lg:order-1">
                    <div>
                      {/* 主标题：黑色，大字体 */}
                      <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                        {t.caseStudies.case2.mainTitle}
                      </h2>
                    </div>
                    
                    <p class="text-sm md:text-base text-gray-700 leading-relaxed">
                      {t.caseStudies.case2.description}
                    </p>
                    
                    <ul class="space-y-3 md:space-y-4">
                      {t.caseStudies.case2.points.map((point: string, idx: number) => (
                        <li key={idx} class="flex items-center space-x-2 md:space-x-3">
                          <div class="flex-shrink-0 w-5 h-5 md:w-6 md:h-6 rounded-full bg-green-100 flex items-center justify-center">
                            <i class="fas fa-check text-green-600 text-xs"></i>
                          </div>
                          <span class="text-gray-700 font-medium text-sm md:text-base">{point}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {t.caseStudies.case2.button && (
                      <div>
                        <a 
                          href="/contact" 
                          class="inline-flex items-center px-6 py-3 md:px-6 md:py-3 border border-gray-300 shadow-sm text-base md:text-base font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 transition-colors min-h-[44px]"
                        >
                          {t.caseStudies.case2.button}
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Right Image */}
                  <div class="relative rounded-2xl overflow-hidden order-1 lg:order-2">
                    <div class="aspect-[4/3] flex items-center justify-center">
                      <img 
                        src={t.caseStudies.case2.imageSrc || '/assets/images/livechat/case2-smartlock.webp'} 
                        alt={t.caseStudies.case2.imageAlt || t.caseStudies.case2.mainTitle}
                        class="w-full h-full object-contain"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
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

