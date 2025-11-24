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
      <section class="relative w-full overflow-hidden group" style="height: 740px;">
        {/* 可点击链接（可选，如果不需要链接则使用 div） */}
        <a href="/contact" class="block w-full h-full overflow-hidden">
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

      {/* Advantages Section */}
      <section class="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-white to-blue-50">
        <div class="site-container px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-8 md:mb-12 lg:mb-16">
            <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">{t.advantages.title}</h2>
          </div>
          
          <div class={`grid ${gridColsClass} gap-6 md:gap-6 lg:gap-8`}>
            {/* Card 1 */}
            <div class="group bg-white rounded-2xl p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_32px_rgba(0,0,0,0.08)] border border-gray-100/50 transition-all duration-300 transform hover:-translate-y-1">
              <div class="w-16 h-16 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200/50 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                <i class="fas fa-comments text-blue-600 text-2xl"></i>
              </div>
              <h3 class="text-xl font-bold text-gray-900 text-center mb-2 group-hover:text-blue-600 transition-colors">{t.advantages.card1.title}</h3>
              <p class="text-blue-600 font-medium text-center mb-4">{t.advantages.card1.subtitle}</p>
              <p class="text-gray-600 text-center text-sm leading-relaxed">
                {t.advantages.card1.desc}
              </p>
            </div>

            {/* Card 2 */}
            <div class="group bg-white rounded-2xl p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_32px_rgba(0,0,0,0.08)] border border-gray-100/50 transition-all duration-300 transform hover:-translate-y-1">
              <div class="w-16 h-16 bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200/50 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                <i class="fas fa-cogs text-purple-600 text-2xl"></i>
              </div>
              <h3 class="text-xl font-bold text-gray-900 text-center mb-2 group-hover:text-purple-600 transition-colors">{t.advantages.card2.title}</h3>
              <p class="text-purple-600 font-medium text-center mb-4">{t.advantages.card2.subtitle}</p>
              <p class="text-gray-600 text-center text-sm leading-relaxed">
                {t.advantages.card2.desc}
              </p>
            </div>

            {/* Card 3 */}
            <div class="group bg-white rounded-2xl p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_32px_rgba(0,0,0,0.08)] border border-gray-100/50 transition-all duration-300 transform hover:-translate-y-1">
              <div class="w-16 h-16 bg-gradient-to-br from-green-50 to-green-100 border border-green-200/50 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                <i class="fas fa-bolt text-green-600 text-2xl"></i>
              </div>
              <h3 class="text-xl font-bold text-gray-900 text-center mb-2 group-hover:text-green-600 transition-colors">{t.advantages.card3.title}</h3>
              <p class="text-green-600 font-medium text-center mb-4">{t.advantages.card3.subtitle}</p>
              <p class="text-gray-600 text-center text-sm leading-relaxed">
                {t.advantages.card3.desc}
              </p>
            </div>

            {/* Card 4 */}
            <div class="group bg-white rounded-2xl p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_32px_rgba(0,0,0,0.08)] border border-gray-100/50 transition-all duration-300 transform hover:-translate-y-1">
              <div class="w-16 h-16 bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200/50 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                <i class="fas fa-chart-line text-amber-600 text-2xl"></i>
              </div>
              <h3 class="text-xl font-bold text-gray-900 text-center mb-2 group-hover:text-amber-600 transition-colors">{t.advantages.card4.title}</h3>
              <p class="text-amber-600 font-medium text-center mb-4">{t.advantages.card4.subtitle}</p>
              <p class="text-gray-600 text-center text-sm leading-relaxed">
                {t.advantages.card4.desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Messaging Section */}
      <section class="py-12 md:py-16 lg:py-20 bg-white overflow-hidden">
        <div class="site-container px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            {/* Left Image */}
            <div class="relative rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100/50 bg-gray-50/50 p-4">
               <div class="aspect-[4/3] relative z-10">
                  <img 
                    src="/assets/images/ai-agents/person.webp" 
                    alt="即时对话功能演示图 - 打造极致客户服务体验"
                    loading="lazy"
                    decoding="async"
                    class="w-full h-full object-contain hover:scale-105 transition-transform duration-700"
                  />
               </div>
               {/* Decorative blob */}
               <div class="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-green-100/50 rounded-full blur-3xl"></div>
               <div class="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-100/50 rounded-full blur-3xl"></div>
            </div>
            
            {/* Right Content */}
            <div class="space-y-6 md:space-y-8">
              <div>
                {/* 主标题：亮色（绿色），大字体 */}
                <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold text-green-600">{t.features.messaging.title}</h2>
                {/* 副标题：如果存在，显示为黑色，相同字体大小 */}
                {t.features.messaging.subtitle && (
                  <p class="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mt-2">{t.features.messaging.subtitle}</p>
                )}
              </div>
              
              <ul class="space-y-3">
                {t.features.messaging.list.map((item: string) => (
                  <li class="flex items-start space-x-3 p-3 rounded-xl hover:bg-green-50/50 transition-colors duration-300">
                    <div class="flex-shrink-0 w-6 h-6 mt-0.5 rounded-full bg-green-100 flex items-center justify-center">
                      <i class="fas fa-check text-green-600 text-xs"></i>
                    </div>
                    <span class="text-gray-700 font-medium text-base leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              
              <div class="pt-2">
                <a 
                  href="/contact" 
                  class="inline-flex items-center px-8 py-4 border-2 border-green-600 text-base font-bold rounded-full text-green-600 bg-white hover:bg-green-600 hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-green-600/20 transform hover:-translate-y-0.5 min-h-[44px] group"
                >
                  <span>{t.features.messaging.button}</span>
                  <i class="fas fa-arrow-right ml-2 transform group-hover:translate-x-1 transition-transform"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Voice Section */}
      <section class="py-12 md:py-16 lg:py-20 bg-gray-50 overflow-hidden">
        <div class="site-container px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div class="space-y-6 md:space-y-8 order-2 lg:order-1">
              <div>
                {/* 主标题：亮色（蓝色），大字体 */}
                <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold text-blue-600">{t.features.voice.title}</h2>
                {/* 副标题：如果存在，显示为黑色，相同字体大小 */}
                {t.features.voice.subtitle && (
                  <p class="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mt-2">{t.features.voice.subtitle}</p>
                )}
              </div>
              
              <ul class="space-y-3">
                {t.features.voice.list.map((item: string) => (
                  <li class="flex items-start space-x-3 p-3 rounded-xl hover:bg-blue-50/50 transition-colors duration-300">
                    <div class="flex-shrink-0 w-6 h-6 mt-0.5 rounded-full bg-blue-100 flex items-center justify-center">
                      <i class="fas fa-check text-blue-600 text-xs"></i>
                    </div>
                    <span class="text-gray-700 font-medium text-base leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              
              <div class="pt-2">
                <a 
                  href="/contact" 
                  class="inline-flex items-center px-8 py-4 border-2 border-blue-600 text-base font-bold rounded-full text-blue-600 bg-white hover:bg-blue-600 hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/20 transform hover:-translate-y-0.5 min-h-[44px] group"
                >
                  <span>{t.features.voice.button}</span>
                  <i class="fas fa-arrow-right ml-2 transform group-hover:translate-x-1 transition-transform"></i>
                </a>
              </div>
            </div>

            {/* Right Image */}
            <div class="relative rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100/50 bg-white p-4 order-1 lg:order-2">
               <div class="aspect-[4/3] relative z-10">
                  <img 
                    src="/assets/images/ai-agents/voice.webp" 
                    alt="Voice功能演示图 - 超越真人的语音对话体验"
                    loading="lazy"
                    decoding="async"
                    class="w-full h-full object-contain hover:scale-105 transition-transform duration-700"
                  />
               </div>
               {/* Decorative blob */}
               <div class="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-100/50 rounded-full blur-3xl"></div>
               <div class="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-100/50 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
