import { FC } from 'hono/jsx'
import { Language } from '../utils/i18n.js'

interface OtherResourcesSectionProps {
  language?: Language
}

export const OtherResourcesSection: FC<OtherResourcesSectionProps> = ({ language = 'zh' }) => {
  return (
    <section class="py-12 md:py-16 lg:py-20 bg-[#1a2332] text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div class="absolute inset-0">
        <div class="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-[#6438FF]/10 to-[#0DE0EF]/10 rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-r from-[#0DE0EF]/10 to-[#6438FF]/10 rounded-full blur-3xl"></div>
      </div>
      
      <div class="site-container px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div class="text-center mb-8 md:mb-12">
          <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            {language === 'zh' && '资源中心'}
            {language === 'en' && 'Resource Center'}
            {language === 'jp' && 'リソースセンター'}
            {language === 'hk' && '資源中心'}
          </h2>
        </div>

        {/* Resource Cards Grid */}
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {/* Card 1 - 直播 */}
          <div class="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group">
            {/* Card Image */}
            <div class="relative h-40 md:h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20"></div>
              <div class="relative z-10 transform group-hover:scale-110 transition-transform duration-300">
                <div class="w-24 h-24 md:w-32 md:h-32 bg-white/90 rounded-2xl shadow-xl flex items-center justify-center">
                  <i class="fas fa-video text-blue-500 text-3xl md:text-5xl"></i>
                </div>
              </div>
              {/* Tag */}
              <div class="absolute top-3 md:top-4 left-3 md:left-4 bg-orange-400 text-white px-2 md:px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
                <i class="fas fa-circle text-[8px]"></i>
                <span>
                  {language === 'zh' && '直播'}
                  {language === 'en' && 'Live'}
                  {language === 'jp' && 'ライブ'}
                  {language === 'hk' && '直播'}
                </span>
              </div>
            </div>
            {/* Card Content */}
            <div class="p-4 md:p-5">
              <h3 class="text-gray-900 font-bold text-sm md:text-base mb-2">
                {language === 'zh' && '《提升跨渠道沟通的AI生产力》'}
                {language === 'en' && 'Enhancing AI Productivity in Cross-Channel Communication'}
                {language === 'jp' && '《クロスチャネルコミュニケーションのAI生産性向上》'}
                {language === 'hk' && '《提升跨渠道溝通的AI生產力》'}
              </h3>
            </div>
          </div>

          {/* Card 2 - 行业报告 */}
          <div class="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group">
            <div class="relative h-40 md:h-48 bg-gradient-to-br from-green-100 to-teal-200 flex items-center justify-center overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-br from-green-400/20 to-teal-400/20"></div>
              <div class="relative z-10 transform group-hover:scale-110 transition-transform duration-300">
                <div class="w-24 h-24 md:w-32 md:h-32 bg-white/90 rounded-2xl shadow-xl flex items-center justify-center">
                  <i class="fas fa-book text-green-500 text-3xl md:text-5xl"></i>
                </div>
              </div>
              <div class="absolute top-3 md:top-4 left-3 md:left-4 bg-yellow-400 text-gray-900 px-2 md:px-3 py-1 rounded-full text-xs font-semibold">
                {language === 'zh' && '行业报告'}
                {language === 'en' && 'Report'}
                {language === 'jp' && '業界レポート'}
                {language === 'hk' && '行業報告'}
              </div>
            </div>
            <div class="p-4 md:p-5">
              <h3 class="text-gray-900 font-bold text-sm md:text-base mb-2">
                {language === 'zh' && '《提升跨渠道沟通的AI生产力》'}
                {language === 'en' && 'Enhancing AI Productivity in Cross-Channel Communication'}
                {language === 'jp' && '《クロスチャネルコミュニケーションのAI生産性向上》'}
                {language === 'hk' && '《提升跨渠道溝通的AI生產力》'}
              </h3>
            </div>
          </div>

          {/* Card 3 - 博客 */}
          <div class="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group">
            <div class="relative h-40 md:h-48 bg-gradient-to-br from-orange-100 to-amber-200 flex items-center justify-center overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-amber-400/20"></div>
              <div class="relative z-10 transform group-hover:scale-110 transition-transform duration-300">
                <div class="w-24 h-24 md:w-32 md:h-32 bg-white/90 rounded-2xl shadow-xl flex items-center justify-center">
                  <i class="fas fa-pen-fancy text-orange-500 text-3xl md:text-5xl"></i>
                </div>
              </div>
              <div class="absolute top-3 md:top-4 left-3 md:left-4 bg-blue-500 text-white px-2 md:px-3 py-1 rounded-full text-xs font-semibold">
                {language === 'zh' && '博客'}
                {language === 'en' && 'Blog'}
                {language === 'jp' && 'ブログ'}
                {language === 'hk' && '博客'}
              </div>
            </div>
            <div class="p-4 md:p-5">
              <h3 class="text-gray-900 font-bold text-sm md:text-base mb-2">
                {language === 'zh' && '《提升跨渠道沟通的AI生产力》'}
                {language === 'en' && 'Enhancing AI Productivity in Cross-Channel Communication'}
                {language === 'jp' && '《クロスチャネルコミュニケーションのAI生産性向上》'}
                {language === 'hk' && '《提升跨渠道溝通的AI生產力》'}
              </h3>
            </div>
          </div>

          {/* Card 4 - 文章 */}
          <div class="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group">
            <div class="relative h-40 md:h-48 bg-gradient-to-br from-cyan-100 to-blue-200 flex items-center justify-center overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-blue-400/20"></div>
              <div class="relative z-10 transform group-hover:scale-110 transition-transform duration-300">
                <div class="w-24 h-24 md:w-32 md:h-32 bg-white/90 rounded-2xl shadow-xl flex items-center justify-center">
                  <i class="fas fa-file-alt text-cyan-500 text-3xl md:text-5xl"></i>
                </div>
              </div>
              <div class="absolute top-3 md:top-4 left-3 md:left-4 bg-green-500 text-white px-2 md:px-3 py-1 rounded-full text-xs font-semibold">
                {language === 'zh' && '文章'}
                {language === 'en' && 'Article'}
                {language === 'jp' && '記事'}
                {language === 'hk' && '文章'}
              </div>
            </div>
            <div class="p-4 md:p-5">
              <h3 class="text-gray-900 font-bold text-sm md:text-base mb-2">
                {language === 'zh' && '《提升跨渠道沟通的AI生产力》'}
                {language === 'en' && 'Enhancing AI Productivity in Cross-Channel Communication'}
                {language === 'jp' && '《クロスチャネルコミュニケーションのAI生産性向上》'}
                {language === 'hk' && '《提升跨渠道溝通的AI生產力》'}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

