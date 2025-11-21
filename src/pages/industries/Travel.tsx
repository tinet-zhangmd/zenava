import { FC } from 'hono/jsx'
import { Language } from '../../utils/i18n'
import { getTranslations } from '../../i18n/translations'

interface TravelPageProps {
  language?: Language
}

export const TravelPage: FC<TravelPageProps> = ({ language = 'zh' }) => {
  const trans = getTranslations(language)
  const t = trans.industries?.travel || {}

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

      {/* Alternating-Text-Media-Tags Section - 左右交替图文（带标签版） */}
      {t.alternatingTags && (
        <section class="py-12 md:py-16 lg:py-20 bg-white">
          <div class="site-container px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            {t.alternatingTags.title && (
              <div class="text-center mb-12 md:mb-16">
                <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                  {t.alternatingTags.title}
                </h2>
                {t.alternatingTags.subtitle && (
                  <p class="text-xl md:text-2xl text-gray-600">
                    {t.alternatingTags.subtitle}
                  </p>
                )}
              </div>
            )}

            {/* Items */}
            <div class="space-y-16 md:space-y-20">
              {t.alternatingTags.items?.map((item: any, index: number) => {
                const isEven = index % 2 === 1
                return (
                  <div key={index} class={`grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center ${isEven ? 'lg:flex-row-reverse' : ''}`}>
                    {/* Content Area */}
                    <div class={`space-y-4 md:space-y-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                      {/* Icon + Title */}
                      <div class="flex items-center mb-4">
                        <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                          <i class={`${item.icon || 'fas fa-robot'} text-blue-600 text-xl`}></i>
                        </div>
                        {item.titleLink ? (
                          <a href={item.titleLink} class="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
                            {item.title}
                          </a>
                        ) : (
                          <h3 class="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                            {item.title}
                          </h3>
                        )}
                      </div>

                      {/* Subtitle */}
                      {item.subtitle && (
                        <h4 class="text-lg md:text-xl font-semibold text-blue-600 mb-4">
                          {item.subtitle}
                        </h4>
                      )}

                      {/* Description */}
                      {item.description && (
                        <p class="text-gray-700 mb-6 leading-relaxed text-base md:text-lg">
                          {item.description}
                        </p>
                      )}

                      {/* Button */}
                      {item.buttonText && (
                        <a 
                          href={item.buttonLink || '/contact'}
                          class="inline-flex items-center px-6 py-3 border-2 border-orange-500 text-orange-500 font-semibold rounded-full hover:bg-orange-500 hover:text-white transition-all duration-300"
                        >
                          {item.buttonText}
                          <i class="fas fa-arrow-right ml-2"></i>
                        </a>
                      )}
                    </div>

                    {/* Media Area */}
                    <div class={`${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                      <div class="rounded-xl overflow-hidden">
                        <div class="aspect-[4/3] bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 flex items-center justify-center">
                          {item.mediaPath ? (
                            <img 
                              src={item.mediaPath}
                              alt={item.mediaAlt || item.title}
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

      {/* Alternating-Text-Media-List Section - 左右交替图文（带列表版） */}
      {t.alternatingList && (
        <section class="py-12 md:py-16 lg:py-20 bg-gray-50">
          <div class="site-container px-4 sm:px-6 lg:px-8">
            {/* Section Header (if title exists) */}
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

            {/* Items */}
            <div class="space-y-16 md:space-y-20">
              {t.alternatingList.items?.map((item: any, index: number) => {
                const isEven = index % 2 === 1
                return (
                  <div key={index} class={`grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center ${isEven ? 'lg:flex-row-reverse' : ''}`}>
                    {/* Content Area */}
                    <div class={`space-y-4 md:space-y-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                      {/* Title */}
                      <div>
                        <h3 class="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                          {item.title}
                        </h3>
                      </div>

                      {/* Feature List / Effects List */}
                      {item.features && item.features.length > 0 && (
                        <ul class="space-y-3 md:space-y-4">
                          {item.features.map((feature: string, featureIndex: number) => {
                            // 提取数字和百分比
                            const match = feature.match(/(\d+(?:\.\d+)?)\s*%?\+?/)
                            const number = match ? match[1] : null
                            const hasPercent = feature.includes('%')
                            
                            return (
                              <li key={featureIndex} class="flex items-start space-x-2 md:space-x-3">
                                <div class="flex-shrink-0 w-5 h-5 md:w-6 md:h-6 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                                  <i class="fas fa-check text-blue-600 text-xs"></i>
                                </div>
                                <span class="text-gray-700 font-medium text-sm md:text-base leading-relaxed flex-1">
                                  {number && (
                                    <span class="text-2xl md:text-3xl font-bold text-blue-600 mr-2">
                                      {number}{hasPercent ? '%' : ''}
                                    </span>
                                  )}
                                  {feature.replace(/\d+(?:\.\d+)?\s*%?\+?\s*/, '').trim()}
                                </span>
                              </li>
                            )
                          })}
                        </ul>
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
                        <div class="aspect-[4/3] bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 flex items-center justify-center">
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

