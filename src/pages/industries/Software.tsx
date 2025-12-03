import { FC } from 'hono/jsx'
import { Language } from '../../utils/i18n'
import { getTranslations } from '../../i18n/translations'

interface SoftwarePageProps {
  language?: Language
}

export const SoftwarePage: FC<SoftwarePageProps> = ({ language = 'zh' }) => {
  const trans = getTranslations(language)
  const t = trans.industries?.software || {}

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

      {/* Core Business Scenarios Section - 核心业务场景（卡片式设计） */}
      {t.scenariosList && (
        <section class="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-white via-gray-50 to-white">
          <div class="site-container px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            {t.scenariosList.title && (
              <div class="text-center mb-12 md:mb-16">
                <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                  {t.scenariosList.title}
                </h2>
                {t.scenariosList.subtitle && (
                  <p class="text-xl md:text-2xl text-gray-600">
                    {t.scenariosList.subtitle}
                  </p>
                )}
              </div>
            )}

            {/* Business Scenario Cards */}
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
              {t.scenariosList.items?.map((item: any, index: number) => {
                // 为每个场景分配不同的主题色
                const colorSchemes = [
                  { bg: 'bg-blue-50', icon: 'bg-blue-100', iconColor: 'text-blue-600', accent: 'text-blue-600', border: 'border-blue-200' },
                  { bg: 'bg-purple-50', icon: 'bg-purple-100', iconColor: 'text-purple-600', accent: 'text-purple-600', border: 'border-purple-200' },
                  { bg: 'bg-green-50', icon: 'bg-green-100', iconColor: 'text-green-600', accent: 'text-green-600', border: 'border-green-200' }
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
                        <h3 class="text-xl md:text-2xl font-bold text-gray-900 flex-1">
                          {item.title}
                        </h3>
                      </div>
                      
                      {/* Description */}
                      {item.description && (
                        <p class="text-gray-700 text-sm md:text-base leading-relaxed">
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
                      {item.effects && item.effects.length > 0 && (
                        <div class={`mt-6 p-5 md:p-6 ${colors.bg} rounded-xl border-2 ${colors.border}`}>
                          <h4 class={`text-lg md:text-xl font-bold ${colors.accent} mb-4 flex items-center`}>
                            <i class="fas fa-chart-line mr-2"></i>
                            {language === 'zh' ? '效果' : language === 'en' ? 'Effects' : language === 'jp' ? '効果' : '效果'}
                          </h4>
                          <div class="space-y-2">
                            {item.effects.map((effect: string, effectIndex: number) => {
                              // 提取数字和百分比
                              const match = effect.match(/(\d+(?:\.\d+)?)\s*%?\+?/)
                              const number = match ? match[1] : null
                              const hasPercent = effect.includes('%')
                              
                              return (
                                <div key={effectIndex} class="bg-white rounded-lg p-3 md:p-4 border border-gray-200 hover:border-gray-300 transition-colors">
                                  <div class="flex items-start space-x-2">
                                    {number && (
                                      <div class={`text-xl md:text-2xl font-bold ${colors.accent} flex-shrink-0`}>
                                        {number}{hasPercent ? '%' : ''}
                                      </div>
                                    )}
                                    <p class="text-gray-700 text-sm md:text-base leading-relaxed flex-1">
                                      {effect.replace(/\d+(?:\.\d+)?\s*%?\+?\s*/, '').trim()}
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

      {/* Case Studies Section - 应用案例与量化效果（左右交替布局） */}
      {t.casesList && (
        <section class="py-12 md:py-16 lg:py-20 bg-white">
          <div class="site-container px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            {t.casesList.title && (
              <div class="text-center mb-12 md:mb-16">
                <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                  {t.casesList.title}
                </h2>
                {t.casesList.subtitle && (
                  <p class="text-xl md:text-2xl text-gray-600">
                    {t.casesList.subtitle}
                  </p>
                )}
              </div>
            )}

            {/* Case Study Items */}
            <div class="space-y-16 md:space-y-20">
              {t.casesList.items?.map((item: any, index: number) => {
                const isEven = index % 2 === 1
                return (
                  <div key={index} class={`grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start ${isEven ? 'lg:flex-row-reverse' : ''}`}>
                    {/* Content Area */}
                    <div class={`space-y-4 md:space-y-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                      {/* Title */}
                      <div>
                        <h3 class="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                          {item.title}
                        </h3>
                      </div>

                      {/* Challenge */}
                      {item.challenge && (
                        <div class="bg-red-50 border-l-4 border-red-500 p-4 md:p-5 rounded-r-lg">
                          <h4 class="text-lg md:text-xl font-bold text-red-700 mb-2">
                            {language === 'zh' ? '挑战：' : language === 'en' ? 'Challenge:' : language === 'jp' ? '課題：' : '挑戰：'}
                          </h4>
                          <ul class="space-y-2">
                            {item.challenge.map((challenge: string, challengeIndex: number) => (
                              <li key={challengeIndex} class="flex items-start space-x-2">
                                <span class="text-red-600 mt-1">•</span>
                                <span class="text-gray-700 text-sm md:text-base leading-relaxed">{challenge}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Solution */}
                      {item.solution && (
                        <div class="bg-blue-50 border-l-4 border-blue-500 p-4 md:p-5 rounded-r-lg">
                          <h4 class="text-lg md:text-xl font-bold text-blue-700 mb-2">
                            {language === 'zh' ? '解决方案：' : language === 'en' ? 'Solution:' : language === 'jp' ? '解決策：' : '解決方案：'}
                          </h4>
                          <p class="text-gray-700 text-sm md:text-base leading-relaxed">
                            {item.solution}
                          </p>
                        </div>
                      )}

                      {/* Quantified Effects */}
                      {item.effects && item.effects.length > 0 && (
                        <div class="bg-green-50 border-l-4 border-green-500 p-4 md:p-5 rounded-r-lg">
                          <h4 class="text-lg md:text-xl font-bold text-green-700 mb-3">
                            {language === 'zh' ? '量化效果：' : language === 'en' ? 'Quantified Effects:' : language === 'jp' ? '定量化された効果：' : '量化效果：'}
                          </h4>
                          <ul class="space-y-2">
                            {item.effects.map((effect: string, effectIndex: number) => {
                              // 提取数字和百分比
                              const match = effect.match(/(\d+(?:\.\d+)?)\s*%?\+?/)
                              const number = match ? match[1] : null
                              const hasPercent = effect.includes('%')
                              
                              return (
                                <li key={effectIndex} class="flex items-start space-x-2">
                                  {number && (
                                    <span class="text-2xl md:text-3xl font-bold text-green-600 flex-shrink-0">{number}{hasPercent ? '%' : ''}</span>
                                  )}
                                  <span class="text-gray-700 text-sm md:text-base leading-relaxed flex-1">
                                    {effect.replace(/\d+(?:\.\d+)?\s*%?\+?\s*/, '').trim()}
                                  </span>
                                </li>
                              )
                            })}
                          </ul>
                        </div>
                      )}

                      {/* Button */}
                      {item.buttonText && (
                        <div class="pt-4">
                          <a 
                            href={item.buttonLink || '/contact'}
                            class="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 transition-colors min-h-[44px]"
                          >
                            {item.buttonText}
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Media Area */}
                    <div class={`${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                      <div class="rounded-xl overflow-hidden">
                        <div class="aspect-[4/3] flex items-center justify-center">
                          {item.imagePath ? (
                            <img 
                              src={item.imagePath}
                              alt={item.imageAlt || item.title}
                              class="w-full h-full object-contain"
                              loading="lazy"
                            />
                          ) : (
                            <div class="text-center">
                              <i class="fas fa-image text-4xl md:text-5xl text-gray-400 mb-3"></i>
                              <p class="text-sm md:text-base text-gray-500">
                                {language === 'zh' ? '暂无图片' : language === 'en' ? 'No Image' : language === 'jp' ? '画像なし' : '暫無圖片'}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
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

