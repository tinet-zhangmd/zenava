import { FC } from 'hono/jsx'
import { Language } from '../../utils/i18n'
import { getTranslations } from '../../i18n/translations'

interface AiAgentsPageProps {
  language?: Language
}

export const AiAgentsPage: FC<AiAgentsPageProps> = ({ language = 'zh' }) => {
  const trans = getTranslations(language)
  const t = trans.products.aiAgents

  // 计算卡片数量，实现智能布局（≤4个时平分，>4个时每行4列）
  const cardCount = [t.advantages.card1, t.advantages.card2, t.advantages.card3, t.advantages.card4].filter(Boolean).length
  const gridColsClass = 
    cardCount === 1 ? 'grid-cols-1 md:grid-cols-1 lg:grid-cols-1' :
    cardCount === 2 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2' :
    cardCount === 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' :
    'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' // 4个或更多时，最多4列

  return (
    <>
      {/* Banner Section - 全图布局模式（仅图片和链接） */}
      <section class="relative w-full overflow-hidden" style="height: 740px;">
        {/* 可点击链接（可选，如果不需要链接则使用 div） */}
        <a href="/contact" class="block w-full h-full">
          {/* 背景层：渐变背景 + 图片覆盖 */}
          <div class="absolute inset-0 bg-gray-100">
            {/* 全图背景 - 支持移动端专用图片 */}
            <picture>
              {/* 移动端图片（< 768px） */}
              <source media="(max-width: 767px)" srcset="/assets/images/ai-agents/banner-mobile.webp" />
              {/* 桌面端图片（>= 768px） */}
            <img 
              src="/assets/images/ai-agents/banner.webp" 
              alt="AIAgents Banner"
              class="w-full h-full object-cover"
              loading="eager"
              decoding="async"
            />
            </picture>
          </div>
        </a>
      </section>

      {/* Advantages Section */}
      <section class="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-white to-blue-50">
        <div class="site-container px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-8 md:mb-12 lg:mb-16">
            <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">{t.advantages.title}</h2>
          </div>
          
          <div class={`grid ${gridColsClass} gap-6 md:gap-6 lg:gap-8`}>
            {/* Card 1 */}
            <div class="bg-white rounded-2xl p-6 md:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div class="w-14 h-14 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-5 md:mb-5 lg:mb-6 mx-auto">
                <i class="fas fa-comments text-blue-600 text-2xl md:text-2xl"></i>
              </div>
              <h3 class="text-xl md:text-xl font-bold text-gray-900 text-center mb-2">{t.advantages.card1.title}</h3>
              <p class="text-blue-600 font-medium text-center mb-4 text-base">{t.advantages.card1.subtitle}</p>
              <p class="text-gray-600 text-center text-base md:text-sm leading-relaxed">
                {t.advantages.card1.desc}
              </p>
            </div>

            {/* Card 2 */}
            <div class="bg-white rounded-2xl p-6 md:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div class="w-14 h-14 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-5 md:mb-5 lg:mb-6 mx-auto">
                <i class="fas fa-cogs text-purple-600 text-2xl md:text-2xl"></i>
              </div>
              <h3 class="text-xl md:text-xl font-bold text-gray-900 text-center mb-2">{t.advantages.card2.title}</h3>
              <p class="text-purple-600 font-medium text-center mb-4 text-base">{t.advantages.card2.subtitle}</p>
              <p class="text-gray-600 text-center text-base md:text-sm leading-relaxed">
                {t.advantages.card2.desc}
              </p>
            </div>

            {/* Card 3 */}
            <div class="bg-white rounded-2xl p-6 md:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div class="w-14 h-14 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-green-100 rounded-xl flex items-center justify-center mb-5 md:mb-5 lg:mb-6 mx-auto">
                <i class="fas fa-bolt text-green-600 text-2xl md:text-2xl"></i>
              </div>
              <h3 class="text-xl md:text-xl font-bold text-gray-900 text-center mb-2">{t.advantages.card3.title}</h3>
              <p class="text-green-600 font-medium text-center mb-4 text-base">{t.advantages.card3.subtitle}</p>
              <p class="text-gray-600 text-center text-base md:text-sm leading-relaxed">
                {t.advantages.card3.desc}
              </p>
            </div>

            {/* Card 4 */}
            <div class="bg-white rounded-2xl p-6 md:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div class="w-14 h-14 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-amber-100 rounded-xl flex items-center justify-center mb-5 md:mb-5 lg:mb-6 mx-auto">
                <i class="fas fa-chart-line text-amber-600 text-2xl md:text-2xl"></i>
              </div>
              <h3 class="text-xl md:text-xl font-bold text-gray-900 text-center mb-2">{t.advantages.card4.title}</h3>
              <p class="text-amber-600 font-medium text-center mb-4 text-base">{t.advantages.card4.subtitle}</p>
              <p class="text-gray-600 text-center text-base md:text-sm leading-relaxed">
                {t.advantages.card4.desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Messaging Section */}
      <section class="py-12 md:py-16 lg:py-20 bg-white">
        <div class="site-container px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            {/* Left Image */}
            <div class="relative rounded-2xl overflow-hidden">
               <div class="aspect-[4/3]">
                  <img 
                    src="/assets/images/ai-agents/person.webp" 
                    alt="即时对话功能演示图 - 打造极致客户服务体验"
                    loading="lazy"
                    decoding="async"
                    class="w-full h-full object-contain"
                  />
               </div>
            </div>
            
            {/* Right Content */}
            <div class="space-y-4 md:space-y-6 lg:space-y-8">
              <div>
                {/* 主标题：亮色（绿色），大字体 */}
                <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold text-green-600">{t.features.messaging.title}</h2>
                {/* 副标题：如果存在，显示为黑色，相同字体大小 */}
                {t.features.messaging.subtitle && (
                  <p class="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mt-1 md:mt-2">{t.features.messaging.subtitle}</p>
                )}
              </div>
              
              <ul class="space-y-3 md:space-y-4">
                {t.features.messaging.list.map((item: string) => (
                  <li class="flex items-center space-x-2 md:space-x-3">
                    <div class="flex-shrink-0 w-5 h-5 md:w-6 md:h-6 rounded-full bg-green-100 flex items-center justify-center">
                      <i class="fas fa-check text-green-600 text-xs"></i>
                    </div>
                    <span class="text-gray-700 font-medium text-sm md:text-base">{item}</span>
                  </li>
                ))}
              </ul>
              
              <div>
                <a 
                  href="/contact" 
                  class="inline-flex items-center px-6 py-3 md:px-6 md:py-3 border border-gray-300 shadow-sm text-base md:text-base font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 transition-colors min-h-[44px]"
                >
                  {t.features.messaging.button}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Voice Section */}
      <section class="py-12 md:py-16 lg:py-20 bg-gray-50">
        <div class="site-container px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div class="space-y-4 md:space-y-6 lg:space-y-8 order-2 lg:order-1">
              <div>
                {/* 主标题：亮色（蓝色），大字体 */}
                <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold text-blue-600">{t.features.voice.title}</h2>
                {/* 副标题：如果存在，显示为黑色，相同字体大小 */}
                {t.features.voice.subtitle && (
                  <p class="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mt-1 md:mt-2">{t.features.voice.subtitle}</p>
                )}
              </div>
              
              <ul class="space-y-3 md:space-y-4">
                {t.features.voice.list.map((item: string) => (
                  <li class="flex items-center space-x-2 md:space-x-3">
                    <div class="flex-shrink-0 w-5 h-5 md:w-6 md:h-6 rounded-full bg-blue-100 flex items-center justify-center">
                      <i class="fas fa-check text-blue-600 text-xs"></i>
                    </div>
                    <span class="text-gray-700 font-medium text-sm md:text-base">{item}</span>
                  </li>
                ))}
              </ul>
              
              <div>
                <a 
                  href="/contact" 
                  class="inline-flex items-center px-6 py-3 md:px-6 md:py-3 border border-gray-300 shadow-sm text-base md:text-base font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 transition-colors min-h-[44px]"
                >
                  {t.features.voice.button}
                </a>
              </div>
            </div>

            {/* Right Image */}
            <div class="relative rounded-2xl overflow-hidden order-1 lg:order-2">
               <div class="aspect-[4/3]">
                  <img 
                    src="/assets/images/ai-agents/voice.webp" 
                    alt="Voice功能演示图 - 超越真人的语音对话体验"
                    loading="lazy"
                    decoding="async"
                    class="w-full h-full object-contain"
                  />
               </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
