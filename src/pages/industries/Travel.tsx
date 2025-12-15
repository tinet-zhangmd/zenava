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
        <section class="relative w-full overflow-hidden" style="height: 680px;">
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
                        <div class="aspect-[4/3] flex items-center justify-center">
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

      {/* Quantified Effects Section - 量化效果（左图右文） */}
      {t.quantifiedEffects && (
        <section class="py-12 md:py-16 lg:py-20 bg-gray-50">
          <div class="site-container px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            {t.quantifiedEffects.title && (
              <div class="text-center mb-12 md:mb-16">
                <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                  {t.quantifiedEffects.title}
                </h2>
                {t.quantifiedEffects.subtitle && (
                  <p class="text-xl md:text-2xl text-gray-600">
                    {t.quantifiedEffects.subtitle}
                  </p>
                )}
              </div>
            )}

            {/* Left Image, Right Content */}
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
              {/* Left Image */}
              <div class="rounded-xl overflow-hidden">
                <div class="aspect-[4/3] flex items-center justify-center">
                  <img 
                    src="/assets/images/travel/05.webp"
                    alt={t.quantifiedEffects.imageAlt || language === 'zh' ? '量化效果' : language === 'en' ? 'Quantified Effects' : language === 'jp' ? '定量化された効果' : '量化效果'}
                    class="w-full h-full object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>

              {/* Right Content */}
              <div class="space-y-6 md:space-y-8">
                {/* Description */}
                {t.quantifiedEffects.description && (
                  <p class="text-lg md:text-xl text-gray-700 leading-relaxed">
                    {t.quantifiedEffects.description}
                  </p>
                )}

                {/* Effects List */}
                {t.quantifiedEffects.effects && t.quantifiedEffects.effects.length > 0 && (
                  <div class="space-y-4">
                    {t.quantifiedEffects.effects.map((effect: string, index: number) => {
                      // 将文本按数字分割，匹配: 数字、百分比、范围(10%~30%)、带单位(100万、3S)
                      const parts = effect.split(/(\d+(?:\.\d+)?(?:%|万|S|倍)?(?:~\d+%)?)/g).filter(Boolean)
                      
                      return (
                        <div key={index} class="flex items-start space-x-3">
                          <div class="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mt-1">
                            <i class="fas fa-check text-blue-600 text-xs"></i>
                          </div>
                          <p class="text-base md:text-lg leading-relaxed">
                            {parts.map((part: string, partIndex: number) => {
                              // 检查是否是数字（包含%、万、S、倍、或范围~）
                              if (/^\d+(?:\.\d+)?(?:%|万|S|倍)?(?:~\d+%)?$/.test(part)) {
                                return (
                                  <span key={partIndex} class="text-2xl md:text-3xl font-bold text-blue-600">
                                    {part}
                                  </span>
                                )
                              }
                              return <span key={partIndex} class="text-gray-700">{part}</span>
                            })}
                          </p>
                        </div>
                      )
                    })}
                  </div>
                )}

                {/* Button */}
                {t.quantifiedEffects.buttonText && (
                  <div class="pt-4">
                    <a 
                      href={t.quantifiedEffects.buttonLink || '/contact'}
                      class="inline-flex items-center px-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300"
                    >
                      {t.quantifiedEffects.buttonText}
                      <i class="fas fa-arrow-right ml-2"></i>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}

