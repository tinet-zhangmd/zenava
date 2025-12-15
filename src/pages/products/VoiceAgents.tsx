import { FC } from 'hono/jsx'
import { Language } from '../../utils/i18n'
import { getTranslations } from '../../i18n/translations'

interface VoiceAgentsPageProps {
  language?: Language
}

export const VoiceAgentsPage: FC<VoiceAgentsPageProps> = ({ language = 'zh' }) => {
  const trans = getTranslations(language)
  const t = trans.products.voiceAgents

  return (
    <>
      {/* Banner Section - 全图布局模式（仅图片和链接） */}
      <section class="relative w-full overflow-hidden" style="height: 680px;">
        <a href="/contact" class="block w-full h-full">
          <div class="absolute inset-0 bg-gray-100">
            {/* 全图背景 - 支持移动端专用图片 */}
            <picture>
              {/* 移动端图片（< 768px） */}
              <source media="(max-width: 767px)" srcset="/assets/images/voice-agents/banner-mobile.webp" />
              {/* 桌面端图片（>= 768px） */}
            <img 
              src="/assets/images/voice-agents/banner.webp" 
              alt={t.banner.imageAlt}
              class="w-full h-full object-cover"
              loading="eager"
              decoding="async"
            />
            </picture>
          </div>
        </a>
      </section>

      {/* Section: Core Features - Alternating-Text-Media-Tags 左右交替图文（带标签版） */}
      <section class="py-12 md:py-16 lg:py-20 bg-white">
        <div class="site-container px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div class="text-center mb-12 md:mb-16">
            <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {t.coreFeatures.title}
            </h2>
          </div>

          {/* Feature 1: 拟人化音色 - 左文右图 */}
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center mb-16 md:mb-20 lg:mb-24">
            {/* Left Content */}
            <div class="space-y-4 md:space-y-6 lg:space-y-8 order-2 lg:order-1">
              <div class="flex items-start space-x-3 md:space-x-4">
                <div class="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                  <i class="fas fa-user-circle text-blue-600 text-xl md:text-2xl"></i>
                </div>
                <div>
                  <h3 class="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                    {t.coreFeatures.feature1.title}
                  </h3>
                </div>
              </div>
              
              <p class="text-base md:text-lg text-gray-700 leading-relaxed">
                {t.coreFeatures.feature1.description}
              </p>
              
              <div>
                <a 
                  href="/contact" 
                  class="inline-flex items-center px-6 py-3 border-2 border-orange-500 text-orange-500 font-semibold rounded-full hover:bg-orange-500 hover:text-white transition-all duration-300 min-h-[44px]"
                >
                  {t.coreFeatures.feature1.button}
                  <i class="fas fa-arrow-right ml-2"></i>
                </a>
              </div>
            </div>

            {/* Right Media */}
            <div class="relative rounded-2xl overflow-hidden order-1 lg:order-2">
              <div class="aspect-[4/3] flex items-center justify-center">
                <img 
                  src="/assets/images/voice-agents/humanized-voice.webp" 
                  alt={t.coreFeatures.feature1.mediaAlt}
                  class="w-full h-full object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>

          {/* Feature 2: 低延迟交互 - 右文左图 */}
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center mb-16 md:mb-20 lg:mb-24">
            {/* Left Media */}
            <div class="relative rounded-2xl overflow-hidden">
              <div class="aspect-[4/3] flex items-center justify-center">
                <img 
                  src="/assets/images/voice-agents/low-latency.webp" 
                  alt={t.coreFeatures.feature2.mediaAlt}
                  class="w-full h-full object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>

            {/* Right Content */}
            <div class="space-y-4 md:space-y-6 lg:space-y-8">
              <div class="flex items-start space-x-3 md:space-x-4">
                <div class="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 bg-green-100 rounded-xl flex items-center justify-center">
                  <i class="fas fa-bolt text-green-600 text-xl md:text-2xl"></i>
                </div>
                <div>
                  <h3 class="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                    {t.coreFeatures.feature2.title}
                  </h3>
                </div>
              </div>
              
              <p class="text-base md:text-lg text-gray-700 leading-relaxed">
                {t.coreFeatures.feature2.description}
              </p>
              
              <div>
                <a 
                  href="/contact" 
                  class="inline-flex items-center px-6 py-3 border-2 border-orange-500 text-orange-500 font-semibold rounded-full hover:bg-orange-500 hover:text-white transition-all duration-300 min-h-[44px]"
                >
                  {t.coreFeatures.feature2.button}
                  <i class="fas fa-arrow-right ml-2"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Feature 3: 精准智能打断 - 左文右图 */}
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center mb-16 md:mb-20 lg:mb-24">
            {/* Left Content */}
            <div class="space-y-4 md:space-y-6 lg:space-y-8 order-2 lg:order-1">
              <div class="flex items-start space-x-3 md:space-x-4">
                <div class="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 bg-purple-100 rounded-xl flex items-center justify-center">
                  <i class="fas fa-brain text-purple-600 text-xl md:text-2xl"></i>
                </div>
                <div>
                  <h3 class="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                    {t.coreFeatures.feature3.title}
                  </h3>
                </div>
              </div>
              
              <p class="text-base md:text-lg text-gray-700 leading-relaxed">
                {t.coreFeatures.feature3.description}
              </p>
              
              <div>
                <a 
                  href="/contact" 
                  class="inline-flex items-center px-6 py-3 border-2 border-orange-500 text-orange-500 font-semibold rounded-full hover:bg-orange-500 hover:text-white transition-all duration-300 min-h-[44px]"
                >
                  {t.coreFeatures.feature3.button}
                  <i class="fas fa-arrow-right ml-2"></i>
                </a>
              </div>
            </div>

            {/* Right Media */}
            <div class="relative rounded-2xl overflow-hidden order-1 lg:order-2">
              <div class="aspect-[4/3] flex items-center justify-center">
                <img 
                  src="/assets/images/voice-agents/intelligent-interruption.webp" 
                  alt={t.coreFeatures.feature3.mediaAlt}
                  class="w-full h-full object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>

          {/* Feature 4: 完整业务闭环 - 右文左图 */}
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            {/* Left Media */}
            <div class="relative rounded-2xl overflow-hidden">
              <div class="aspect-[4/3] flex items-center justify-center">
                <img 
                  src="/assets/images/voice-agents/business-loop.webp" 
                  alt={t.coreFeatures.feature4.mediaAlt}
                  class="w-full h-full object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>

            {/* Right Content */}
            <div class="space-y-4 md:space-y-6 lg:space-y-8">
              <div class="flex items-start space-x-3 md:space-x-4">
                <div class="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 bg-indigo-100 rounded-xl flex items-center justify-center">
                  <i class="fas fa-sync-alt text-indigo-600 text-xl md:text-2xl"></i>
                </div>
                <div>
                  <h3 class="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                    {t.coreFeatures.feature4.title}
                  </h3>
                </div>
              </div>
              
              <p class="text-base md:text-lg text-gray-700 leading-relaxed">
                {t.coreFeatures.feature4.description}
              </p>
              
              <div>
                <a 
                  href="/contact" 
                  class="inline-flex items-center px-6 py-3 border-2 border-orange-500 text-orange-500 font-semibold rounded-full hover:bg-orange-500 hover:text-white transition-all duration-300 min-h-[44px]"
                >
                  {t.coreFeatures.feature4.button}
                  <i class="fas fa-arrow-right ml-2"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Customer Cases - Alternating-Text-Media-List 左右交替图文（带列表版） */}
      <section class="py-12 md:py-16 lg:py-20 bg-gray-50">
        <div class="site-container px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div class="text-center mb-12 md:mb-16">
            <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {t.customerCases.title}
            </h2>
            <p class="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              {t.customerCases.subtitle}
            </p>
          </div>

          {/* Case 1: 厨电客户 - 左图右文 */}
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center mb-16 md:mb-20 lg:mb-24">
            {/* Left Image */}
            <div class="relative rounded-2xl overflow-hidden">
              <div class="aspect-[4/3] flex items-center justify-center p-4 md:p-6 lg:p-8">
                <img 
                  src="/assets/images/voice-agents/case-kitchen-appliances.webp" 
                  alt={t.customerCases.case1.imageAlt}
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
                <h3 class="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                  {t.customerCases.case1.title}
                </h3>
              </div>
              
              {t.customerCases.case1.description && (
                <p class="text-sm md:text-base text-gray-700 leading-relaxed">
                  {t.customerCases.case1.description}
                </p>
              )}
              
              <ul class="space-y-3 md:space-y-4">
                {t.customerCases.case1.features.map((feature: string) => (
                  <li class="flex items-center space-x-2 md:space-x-3">
                    <div class="flex-shrink-0 w-5 h-5 md:w-6 md:h-6 rounded-full bg-blue-100 flex items-center justify-center">
                      <i class="fas fa-check text-blue-600 text-xs"></i>
                    </div>
                    <span class="text-gray-700 font-medium text-sm md:text-base">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div>
                <a 
                  href="/cases/kitchen-appliances" 
                  class="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 transition-colors min-h-[44px]"
                >
                  {t.customerCases.case1.button}
                </a>
              </div>
            </div>
          </div>

          {/* Case 2: 汽车客户 - 左文右图 */}
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center mb-16 md:mb-20 lg:mb-24">
            {/* Left Content */}
            <div class="space-y-4 md:space-y-6 lg:space-y-8 order-2 lg:order-1">
              <div>
                {/* 主标题：黑色，大字体 */}
                <h3 class="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                  {t.customerCases.case2.title}
                </h3>
              </div>
              
              {t.customerCases.case2.description && (
                <p class="text-sm md:text-base text-gray-700 leading-relaxed">
                  {t.customerCases.case2.description}
                </p>
              )}
              
              <ul class="space-y-3 md:space-y-4">
                {t.customerCases.case2.features.map((feature: string) => (
                  <li class="flex items-center space-x-2 md:space-x-3">
                    <div class="flex-shrink-0 w-5 h-5 md:w-6 md:h-6 rounded-full bg-green-100 flex items-center justify-center">
                      <i class="fas fa-check text-green-600 text-xs"></i>
                    </div>
                    <span class="text-gray-700 font-medium text-sm md:text-base">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div>
                <a 
                  href="/cases/automotive" 
                  class="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 transition-colors min-h-[44px]"
                >
                  {t.customerCases.case2.button}
                </a>
              </div>
            </div>

            {/* Right Image */}
            <div class="relative rounded-2xl overflow-hidden order-1 lg:order-2">
              <div class="aspect-[4/3] flex items-center justify-center p-4 md:p-6 lg:p-8">
                <img 
                  src="/assets/images/voice-agents/case-automotive.webp" 
                  alt={t.customerCases.case2.imageAlt}
                  class="w-full h-full object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>

          {/* Case 3: 酒店集团 - 左图右文 */}
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            {/* Left Image */}
            <div class="relative rounded-2xl overflow-hidden">
              <div class="aspect-[4/3] flex items-center justify-center p-4 md:p-6 lg:p-8">
                <img 
                  src="/assets/images/voice-agents/case-hotel.webp" 
                  alt={t.customerCases.case3.imageAlt}
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
                <h3 class="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                  {t.customerCases.case3.title}
                </h3>
              </div>
              
              {t.customerCases.case3.description && (
                <p class="text-sm md:text-base text-gray-700 leading-relaxed">
                  {t.customerCases.case3.description}
                </p>
              )}
              
              <ul class="space-y-3 md:space-y-4">
                {t.customerCases.case3.features.map((feature: string) => (
                  <li class="flex items-center space-x-2 md:space-x-3">
                    <div class="flex-shrink-0 w-5 h-5 md:w-6 md:h-6 rounded-full bg-purple-100 flex items-center justify-center">
                      <i class="fas fa-check text-purple-600 text-xs"></i>
                    </div>
                    <span class="text-gray-700 font-medium text-sm md:text-base">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div>
                <a 
                  href="/cases/hotel" 
                  class="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 transition-colors min-h-[44px]"
                >
                  {t.customerCases.case3.button}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

