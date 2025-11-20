import { FC } from 'hono/jsx'
import { Language } from '../../utils/i18n'
import { getTranslations } from '../../i18n/translations'

interface LiveChatPageProps {
  language?: Language
}

export const LiveChatPage: FC<LiveChatPageProps> = ({ language = 'zh' }) => {
  const trans = getTranslations(language)
  const t = trans.products.liveChat

  // 计算卡片数量，实现智能布局（≤4个时平分，>4个时每行4列）
  const cardCount = [t.advantages.card1, t.advantages.card2, t.advantages.card3].filter(Boolean).length
  const gridColsClass = 
    cardCount === 1 ? 'grid-cols-1 md:grid-cols-1 lg:grid-cols-1' :
    cardCount === 2 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2' :
    cardCount === 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' :
    'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' // 4个或更多时，最多4列

  return (
    <>
      {/* Banner Section - 全图布局模式（仅图片和链接） */}
      <section class="relative w-full overflow-hidden" style="min-height: 70vh;">
        <a href="/products/live-chat" class="block w-full h-full">
          <div class="absolute inset-0 bg-gradient-to-br from-purple-600 via-indigo-600 to-pink-600">
            <img 
              src="/assets/images/livechat/banner.png" 
              alt="LiveChat Banner"
              class="w-full h-full object-cover"
              loading="eager"
            />
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
            {t.advantages.card1 && (
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
            )}

            {t.advantages.card2 && (
              <div class="bg-white rounded-2xl p-6 md:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div class="w-14 h-14 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-5 md:mb-5 lg:mb-6 mx-auto">
                  <i class="fas fa-bolt text-purple-600 text-2xl md:text-2xl"></i>
                </div>
                <h3 class="text-xl md:text-xl font-bold text-gray-900 text-center mb-2">{t.advantages.card2.title}</h3>
                <p class="text-purple-600 font-medium text-center mb-4 text-base">{t.advantages.card2.subtitle}</p>
                <p class="text-gray-600 text-center text-base md:text-sm leading-relaxed">
                  {t.advantages.card2.desc}
                </p>
              </div>
            )}

            {t.advantages.card3 && (
              <div class="bg-white rounded-2xl p-6 md:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div class="w-14 h-14 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-green-100 rounded-xl flex items-center justify-center mb-5 md:mb-5 lg:mb-6 mx-auto">
                  <i class="fas fa-chart-line text-green-600 text-2xl md:text-2xl"></i>
                </div>
                <h3 class="text-xl md:text-xl font-bold text-gray-900 text-center mb-2">{t.advantages.card3.title}</h3>
                <p class="text-green-600 font-medium text-center mb-4 text-base">{t.advantages.card3.subtitle}</p>
                <p class="text-gray-600 text-center text-base md:text-sm leading-relaxed">
                  {t.advantages.card3.desc}
                </p>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* Features Section - 如果有功能特性 */}
      {t.features && Object.keys(t.features).length > 0 && (
        <>
          {t.features.feature1 && (
            <section class="py-12 md:py-16 lg:py-20 bg-white">
              <div class="site-container px-4 sm:px-6 lg:px-8">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
                  {/* Left Image */}
                  <div class="relative rounded-2xl overflow-hidden shadow-xl">
                    <div class="aspect-[4/3] bg-gray-200">
                      <img 
                        src="/assets/images/live-chat/feature1.png" 
                        alt={t.features.feature1.subtitle}
                        class="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  
                  {/* Right Content */}
                  <div class="space-y-4 md:space-y-6 lg:space-y-8">
                    <div>
                      {t.features.feature1.title && (
                        <span class="text-blue-600 font-semibold tracking-wider uppercase text-xs md:text-sm">{t.features.feature1.title}</span>
                      )}
                      <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mt-1 md:mt-2">{t.features.feature1.subtitle}</h2>
                    </div>
                    
                    <ul class="space-y-3 md:space-y-4">
                      {t.features.feature1.list.map((item: string) => (
                        <li class="flex items-center space-x-2 md:space-x-3">
                          <div class="flex-shrink-0 w-5 h-5 md:w-6 md:h-6 rounded-full bg-blue-100 flex items-center justify-center">
                            <i class="fas fa-check text-blue-600 text-xs"></i>
                          </div>
                          <span class="text-gray-700 font-medium text-sm md:text-base">{item}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {t.features.feature1.button && (
                      <div>
                        <a 
                          href={t.features.feature1.buttonLink || "/products/live-chat"} 
                          class="inline-flex items-center px-6 py-3 md:px-6 md:py-3 border border-gray-300 shadow-sm text-base md:text-base font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 transition-colors min-h-[44px]"
                        >
                          {t.features.feature1.button}
                        </a>
                      </div>
                    )}
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

