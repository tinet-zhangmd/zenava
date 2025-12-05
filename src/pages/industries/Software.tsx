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

      {/* Core Business Scenarios Section - 核心业务场景（左右交替图文布局） */}
      {t.scenariosList && t.scenariosList.items && (
        <>
          {/* Section Header */}
          {t.scenariosList.title && (
            <div class="py-12 md:py-16 bg-white">
              <div class="site-container px-4 sm:px-6 lg:px-8">
                <div class="text-center">
                  <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                    {t.scenariosList.title}
                  </h2>
                  {t.scenariosList.subtitle && (
                    <p class="text-xl md:text-2xl text-gray-600">
                      {t.scenariosList.subtitle}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Alternating Layout Items */}
          {t.scenariosList.items.map((item: any, index: number) => {
            const isOdd = index % 2 === 1
            
            // 为每个场景分配不同的主题色
            const colorSchemes = [
              { bg: 'bg-blue-100', color: 'text-blue-600' },
              { bg: 'bg-purple-100', color: 'text-purple-600' },
              { bg: 'bg-green-100', color: 'text-green-600' },
              { bg: 'bg-orange-100', color: 'text-orange-600' }
            ]
            const colors = colorSchemes[index % colorSchemes.length]
            
            // 图片路径数组
            const imagePaths = [
              '/assets/images/software/01.webp',
              '/assets/images/software/02.webp',
              '/assets/images/software/03.webp'
            ]
            const imagePath = imagePaths[index] || item.imagePath
            
            return (
              <section key={index} class={`py-12 md:py-16 lg:py-20 ${isOdd ? 'bg-gray-50' : 'bg-white'}`}>
                <div class="site-container px-4 sm:px-6 lg:px-8">
                  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
                    {/* Image Section - Right for first (0,2,4...), Left for second (1,3,5...) */}
                    <div class={`${isOdd ? 'order-1 lg:order-1' : 'order-1 lg:order-2'}`}>
                      {imagePath ? (
                        <img 
                          src={imagePath}
                          alt={item.imageAlt || item.title}
                          class="w-full h-auto"
                          loading="lazy"
                          decoding="async"
                        />
                      ) : (
                        <div class={`aspect-[4/3] flex items-center justify-center`}>
                          <div class={`w-20 h-20 md:w-24 md:h-24 ${colors.bg} rounded-2xl flex items-center justify-center`}>
                            <i class={`${item.icon || 'fas fa-image'} ${colors.color} text-4xl md:text-5xl`}></i>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Content Section - Left for first, Right for second */}
                    <div class={`space-y-3 md:space-y-4 lg:space-y-5 ${isOdd ? 'order-2 lg:order-2' : 'order-2 lg:order-1'}`}>
                      <div>
                        {/* Main Title */}
                        <h2 class={`text-xl md:text-2xl lg:text-3xl font-bold ${colors.color}`}>
                          {item.title}
                        </h2>
                        {/* Subtitle / Description */}
                        {item.description && (
                          <p class="text-sm md:text-base lg:text-lg font-bold text-gray-900 mt-1">
                            {item.description}
                          </p>
                        )}
                      </div>

                      {/* Feature List */}
                      {item.features && item.features.length > 0 && (
                        <ul class="space-y-2 md:space-y-2.5">
                          {item.features.map((feature: string, featureIndex: number) => (
                            <li key={featureIndex} class="flex items-center space-x-2">
                              <div class={`flex-shrink-0 w-4 h-4 md:w-5 md:h-5 rounded-full ${colors.bg} flex items-center justify-center`}>
                                <i class={`fas fa-check ${colors.color} text-xs`}></i>
                              </div>
                              <span class="text-gray-700 font-medium text-xs md:text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Business Value Section - 效果 */}
                      {item.effects && item.effects.length > 0 && (
                        <div class="bg-blue-50 rounded-lg p-3 md:p-4 border border-blue-100">
                          {/* Section Title */}
                          <h4 class="text-sm md:text-base font-bold text-blue-600 flex items-center mb-3">
                            <i class="fas fa-chart-line mr-1.5 text-xs"></i>
                            {language === 'zh' ? '效果' : language === 'en' ? 'Effects' : language === 'jp' ? '効果' : '效果'}
                          </h4>
                          
                          {/* Value Cards Grid - 2列布局 */}
                          <div class="grid grid-cols-2 gap-2 md:gap-3">
                            {item.effects.map((effect: string, effectIndex: number) => {
                              // 提取数字和百分比
                              const match = effect.match(/(\d+(?:\.\d+)?)\s*%?\+?/)
                              const number = match ? match[1] : null
                              const hasPercent = effect.includes('%')
                              const text = effect.replace(/\d+(?:\.\d+)?\s*%?\+?\s*/, '').trim()
                              
                              return (
                                <div key={effectIndex} class="bg-white rounded p-2 md:p-3">
                                  {number && (
                                    <div class="text-2xl md:text-3xl font-bold text-blue-600 mb-0.5">
                                      {number}{hasPercent ? '%' : ''}
                                    </div>
                                  )}
                                  <p class="text-gray-700 text-xs leading-snug">
                                    {text}
                                  </p>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )}

                      {/* Button */}
                      {item.buttonText && (
                        <div>
                          <a 
                            href={item.buttonLink || '/contact'}
                            class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                          >
                            {item.buttonText}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            )
          })}
        </>
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
                
                // 图片路径数组
                const caseImagePaths = [
                  '/assets/images/software/04.webp',
                  '/assets/images/software/05.webp'
                ]
                const caseImagePath = caseImagePaths[index] || item.imagePath
                
                return (
                  <div key={index} class={`grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start ${isEven ? 'lg:flex-row-reverse' : ''}`}>
                    {/* Content Area */}
                    <div class={`space-y-2 md:space-y-3 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                      {/* Title */}
                      <div>
                        <h3 class="text-xl md:text-2xl font-bold text-gray-900 mb-1">
                          {item.title}
                        </h3>
                      </div>

                      {/* Challenge */}
                      {item.challenge && (
                        <div class="bg-red-50 border-l-4 border-red-500 p-2 md:p-3 rounded-r-lg">
                          <h4 class="text-sm md:text-base font-bold text-red-700 mb-1">
                            {language === 'zh' ? '挑战：' : language === 'en' ? 'Challenge:' : language === 'jp' ? '課題：' : '挑戰：'}
                          </h4>
                          <ul class="space-y-1">
                            {item.challenge.map((challenge: string, challengeIndex: number) => (
                              <li key={challengeIndex} class="flex items-start space-x-1">
                                <span class="text-red-600 mt-0.5 text-xs">•</span>
                                <span class="text-gray-700 text-xs md:text-sm leading-snug">{challenge}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Solution */}
                      {item.solution && (
                        <div class="bg-blue-50 border-l-4 border-blue-500 p-2 md:p-3 rounded-r-lg">
                          <h4 class="text-sm md:text-base font-bold text-blue-700 mb-1">
                            {language === 'zh' ? '解决方案：' : language === 'en' ? 'Solution:' : language === 'jp' ? '解決策：' : '解決方案：'}
                          </h4>
                          <p class="text-gray-700 text-xs md:text-sm leading-snug">
                            {item.solution}
                          </p>
                        </div>
                      )}

                      {/* Quantified Effects */}
                      {item.effects && item.effects.length > 0 && (
                        <div class="bg-green-50 border-l-4 border-green-500 p-2 md:p-3 rounded-r-lg">
                          <h4 class="text-sm md:text-base font-bold text-green-700 mb-2">
                            {language === 'zh' ? '量化效果：' : language === 'en' ? 'Quantified Effects:' : language === 'jp' ? '定量化された効果：' : '量化效果：'}
                          </h4>
                          <ul class="space-y-1">
                            {item.effects.map((effect: string, effectIndex: number) => {
                              // 提取数字和百分比
                              const match = effect.match(/(\d+(?:\.\d+)?)\s*%?\+?/)
                              const number = match ? match[1] : null
                              const hasPercent = effect.includes('%')
                              
                              return (
                                <li key={effectIndex} class="flex items-start space-x-2">
                                  {number && (
                                    <span class="text-xl md:text-2xl font-bold text-green-600 flex-shrink-0">{number}{hasPercent ? '%' : ''}</span>
                                  )}
                                  <span class="text-gray-700 text-xs md:text-sm leading-snug flex-1">
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
                        <div class="pt-2">
                          <a 
                            href={item.buttonLink || '/contact'}
                            class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 transition-colors"
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
                          {caseImagePath ? (
                            <img 
                              src={caseImagePath}
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
