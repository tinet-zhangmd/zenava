import { FC } from 'hono/jsx'
import { Language } from '../../utils/i18n'
import { getTranslations } from '../../i18n/translations'

interface AutomotivePageProps {
  language?: Language
}

export const AutomotivePage: FC<AutomotivePageProps> = ({ language = 'zh' }) => {
  const trans = getTranslations(language)
  const t = trans.industries?.automotive || {}

  return (
    <>
      {/* Banner-FullImage Section - 全图横幅 */}
      {t.banner && (
        <section class="relative w-full overflow-hidden" style="height: 740px;">
          {t.banner.link && t.banner.link !== '无' ? (
            <a href={t.banner.link} class="block w-full h-full">
              <div class="absolute inset-0 bg-gray-100">
                <picture>
                  <source media="(max-width: 767px)" srcset={t.banner.mobileSrc || t.banner.src} />
                  <img 
                    src={t.banner.src}
                    alt={t.banner.alt}
                    class="w-full h-full object-cover"
                    loading="eager"
                    decoding="async"
                  />
                </picture>
              </div>
            </a>
          ) : (
            <div class="absolute inset-0 bg-gray-100">
              <picture>
                <source media="(max-width: 767px)" srcset={t.banner.mobileSrc || t.banner.src} />
                <img 
                  src={t.banner.src}
                  alt={t.banner.alt}
                  class="w-full h-full object-cover"
                  loading="eager"
                  decoding="async"
                />
              </picture>
            </div>
          )}
        </section>
      )}

      {/* Core Business Scenarios Section - 核心业务场景（重新设计） */}
      {t.alternatingList && (
        <section class="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-white via-gray-50 to-white">
          <div class="site-container px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            {t.alternatingList.title && (
              <div class="text-center mb-12 md:mb-16">
                <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                  {t.alternatingList.title}
                </h2>
                {t.alternatingList.subtitle && (
                  <p class="text-xl md:text-2xl text-gray-600">
                    {t.alternatingList.subtitle}
                  </p>
                )}
              </div>
            )}

            {/* Business Scenario Cards */}
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
              {t.alternatingList.items?.map((item: any, index: number) => {
                // 为每个场景分配不同的主题色
                const colorSchemes = [
                  { bg: 'bg-blue-50', icon: 'bg-blue-100', iconColor: 'text-blue-600', accent: 'text-blue-600', border: 'border-blue-200' },
                  { bg: 'bg-purple-50', icon: 'bg-purple-100', iconColor: 'text-purple-600', accent: 'text-purple-600', border: 'border-purple-200' }
                ]
                const colors = colorSchemes[index % colorSchemes.length]
                
                return (
                  <div key={index} class={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border-2 ${colors.border}`}>
                    {/* Card Header with Icon */}
                    <div class={`${colors.bg} px-6 md:px-8 pt-6 md:pt-8 pb-4`}>
                      <div class="flex items-center mb-4">
                        <div class={`w-14 h-14 ${colors.icon} rounded-xl flex items-center justify-center mr-4 flex-shrink-0`}>
                          <i class={`${item.icon || 'fas fa-chart-line'} ${colors.iconColor} text-2xl`}></i>
                        </div>
                        <h3 class="text-2xl md:text-3xl font-bold text-gray-900 flex-1">
                          {item.title}
                        </h3>
                      </div>
                      
                      {/* Description */}
                      {item.description && (
                        <p class="text-gray-700 text-base md:text-lg leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>

                    {/* Card Body */}
                    <div class="px-6 md:px-8 py-6 md:py-8">
                      {/* Feature List */}
                      {item.features && item.features.length > 0 && (
                        <div class="mb-6">
                          <ul class="space-y-3 md:space-y-4">
                            {item.features.map((feature: string, featureIndex: number) => (
                              <li key={featureIndex} class="flex items-start space-x-3">
                                <div class={`flex-shrink-0 w-5 h-5 md:w-6 md:h-6 rounded-full ${colors.icon} flex items-center justify-center mt-0.5`}>
                                  <i class={`fas fa-check ${colors.iconColor} text-xs`}></i>
                                </div>
                                <span class="text-gray-700 font-medium text-sm md:text-base leading-relaxed flex-1">
                                  {feature}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Business Value - 数据卡片形式 */}
                      {item.businessValue && item.businessValue.length > 0 && (
                        <div class={`mt-6 p-5 md:p-6 ${colors.bg} rounded-xl border-2 ${colors.border}`}>
                          <h4 class={`text-lg md:text-xl font-bold ${colors.accent} mb-4 flex items-center`}>
                            <i class="fas fa-chart-line mr-2"></i>
                            {language === 'zh' ? '业务价值' : language === 'en' ? 'Business Value' : language === 'jp' ? 'ビジネス価値' : '業務價值'}
                          </h4>
                          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                            {item.businessValue.map((value: string, valueIndex: number) => {
                              // 提取数字和百分比
                              const match = value.match(/(\d+(?:\.\d+)?)\s*%?\+?/)
                              const number = match ? match[1] : null
                              const hasPercent = value.includes('%')
                              
                              return (
                                <div key={valueIndex} class="bg-white rounded-lg p-3 md:p-4 border border-gray-200 hover:border-gray-300 transition-colors">
                                  <div class="flex items-start space-x-2">
                                    {number && (
                                      <div class={`text-2xl md:text-3xl font-bold ${colors.accent} flex-shrink-0`}>
                                        {number}{hasPercent ? '%' : ''}
                                      </div>
                                    )}
                                    <p class="text-gray-700 text-sm md:text-base leading-relaxed flex-1">
                                      {value.replace(/\d+(?:\.\d+)?\s*%?\+?\s*/, '').trim()}
                                    </p>
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )}

                      {/* Button */}
                      {item.buttonText && (
                        <div class="mt-6">
                          <a 
                            href={item.buttonLink || '/contact'}
                            class={`inline-flex items-center justify-center w-full px-6 py-3 ${colors.icon} ${colors.iconColor} rounded-lg font-semibold hover:opacity-90 transition-all duration-300 transform hover:scale-105 min-h-[44px]`}
                          >
                            {item.buttonText}
                            <i class="fas fa-arrow-right ml-2"></i>
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

