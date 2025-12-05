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

      {/* Core Business Scenarios Section - 核心业务场景（左右交替图文布局） */}
      {t.alternatingList && t.alternatingList.items && (
        <>
          {/* Section Header */}
          {t.alternatingList.title && (
            <div class="py-12 md:py-16 bg-white">
              <div class="site-container px-4 sm:px-6 lg:px-8">
                <div class="text-center">
                  <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                    {t.alternatingList.title}
                  </h2>
                  {t.alternatingList.subtitle && (
                    <p class="text-xl md:text-2xl text-gray-600">
                      {t.alternatingList.subtitle}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Alternating Layout Items */}
          {t.alternatingList.items.map((item: any, index: number) => {
            const isOdd = index % 2 === 1
            
            // 为每个场景分配不同的主题色
            const colorSchemes = [
              { bg: 'bg-blue-100', color: 'text-blue-600' },
              { bg: 'bg-green-100', color: 'text-green-600' },
              { bg: 'bg-purple-100', color: 'text-purple-600' },
              { bg: 'bg-orange-100', color: 'text-orange-600' }
            ]
            const colors = colorSchemes[index % colorSchemes.length]
            
            // 图片路径数组
            const imagePaths = [
              '/assets/images/automotive/01.webp',
              '/assets/images/automotive/02.webp'
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

                      {/* Business Value Section - 更小尺寸 */}
                      {item.businessValue && item.businessValue.length > 0 && (
                        <div class="bg-blue-50 rounded-lg p-3 md:p-4 border border-blue-100">
                          {/* Section Title */}
                          <h4 class="text-sm md:text-base font-bold text-blue-600 flex items-center mb-3">
                            <i class="fas fa-chart-line mr-1.5 text-xs"></i>
                            {language === 'zh' ? '业务价值' : language === 'en' ? 'Business Value' : language === 'jp' ? 'ビジネス価値' : '業務價値'}
                          </h4>
                          
                          {/* Value Cards Grid - 2列布局 */}
                          <div class="grid grid-cols-2 gap-2 md:gap-3">
                            {item.businessValue.map((value: string, valueIndex: number) => {
                              // 提取数字和百分比
                              const match = value.match(/(\d+(?:\.\d+)?)\s*%?\+?/)
                              const number = match ? match[1] : null
                              const hasPercent = value.includes('%')
                              const text = value.replace(/\d+(?:\.\d+)?\s*%?\+?\s*/, '').trim()
                              
                              return (
                                <div key={valueIndex} class="bg-white rounded p-2 md:p-3">
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
    </>
  )
}
