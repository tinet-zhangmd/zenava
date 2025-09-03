import { Language, getTranslation, t } from '../utils/i18n.js'
import { getTranslations } from '../i18n/translations.js'

interface AboutUsProps {
  language: Language
}

export function AboutUs({ language }: AboutUsProps) {
  const translations = getTranslation(language)
  const trans = getTranslations(language)

  return (
    <div class="min-h-screen">
      {/* Hero Section */}
      <section class="relative py-20 lg:py-32 bg-gradient-to-br from-blue-50 via-white to-primary-50 overflow-hidden">
        <div class="absolute inset-0 opacity-30">
          <div class="absolute inset-0" style="background-image: radial-gradient(circle, rgba(59, 130, 246, 0.1) 1px, transparent 1px); background-size: 40px 40px;"></div>
        </div>
        
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6" data-animate="fade-in">
              <span class="bg-gradient-to-r from-blue-600 to-primary-600 bg-clip-text text-transparent">
                {language === 'en' && 'About ZENAVA'}
                {language === 'jp' && 'ZENAVAについて'}
                {language === 'hk' && '關於ZENAVA'}
              </span>
            </h1>
            
            <p class="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed" data-animate="fade-in">
              {language === 'en' && 'AI Agent for Marketing and Service Dialogue Scenarios'}
              {language === 'jp' && 'マーケティングとサービスの対話シナリオ向けAIエージェント'}
              {language === 'hk' && '面向營銷和服務場景的對話式 AI 智能體'}
            </p>
            
            <div class="flex justify-center" data-animate="slide-up">
              <a href="#contact" class="bg-gradient-to-r from-blue-600 to-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 inline-block">
                <i class="fas fa-phone mr-2"></i>
                {language === 'en' && 'Schedule Consultation'}
                {language === 'jp' && '相談を予約'}
                {language === 'hk' && '預約溝通'}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Company Introduction Section */}
      <section class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="max-w-4xl mx-auto">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center" data-animate="fade-in">
              {language === 'en' && 'Company Introduction'}
              {language === 'jp' && '会社紹介'}
              {language === 'hk' && '公司介紹'}
            </h2>
            
            <div class="prose prose-lg max-w-none text-gray-700" data-animate="slide-up">
              <p class="mb-6 leading-relaxed">
                {language === 'en' && 'ZENAVA is the flagship product of TI Cloud, a leading intelligent contact center platform provider. It deeply integrates AI Agent technology, AI operational capabilities, and cloud-native contact center capabilities, helping enterprises achieve the leap from "Human-Driven" to "AI-Driven" in productivity and organizational transformation.'}
                {language === 'jp' && 'ZENAVAは、インテリジェントコンタクトセンタープラットフォームの大手プロバイダーであるTI Cloudの主力製品です。AIエージェント技術、AI運用能力、クラウドネイティブコンタクトセンター機能を深く統合し、企業が「人力駆動」から「AI駆動」への生産性と組織形態の飛躍を実現することを支援します。'}
                {language === 'hk' && 'ZENAVA 是領先的智能聯絡中心平台供應商 TI Cloud 旗下的核心產品。它將 AI Agent 技術、AI 運營能力、雲原生聯絡中心能力深度融合，幫助企業完成從「人力驅動」向「AI驅動」的生產力與組織形態跨越。'}
              </p>
              
              <p class="mb-6 leading-relaxed">
                {language === 'en' && 'Unlike traditional AI tools that merely "assist humans," ZENAVA can independently handle end-to-end business tasks while forming a continuously optimized and efficient collaboration with human experts.'}
                {language === 'jp' && '従来の「人を補助する」だけのAIツールとは異なり、ZENAVAはエンドツーエンドのビジネスタスクを独立して処理でき、人間の専門家と継続的に最適化される効率的な協働を形成します。'}
                {language === 'hk' && '不同於傳統僅「輔助人」的 AI 工具，ZENAVA 能夠獨立承擔端到端的業務任務，並與人類專家形成持續優化的高效協同。'}
              </p>
              
              <p class="mb-8 leading-relaxed">
                {language === 'en' && 'Currently, ZENAVA has been successfully deployed across multiple industries including retail, chain stores, manufacturing, automotive, and finance, continuously creating measurable business value and driving comprehensive enterprise transformation in both organizational efficiency upgrades and customer experience enhancement.'}
                {language === 'jp' && '現在、ZENAVAは小売、チェーン店、製造業、自動車、金融など複数の業界で導入され、測定可能なビジネス価値を継続的に創出し、組織効率の向上と顧客体験の向上の両面で企業の包括的な変革を推進しています。'}
                {language === 'hk' && '目前，ZENAVA 已在零售、連鎖、製造、汽車、金融等多個行業落地應用，持續創造可衡量的業務價值，在組織效能升級與客戶體驗提升兩個維度推動企業全面變革。'}
              </p>
            </div>
            
            {/* Key Metrics */}
            <div class="grid grid-cols-3 gap-6 mt-12" data-animate="fade-in">
              <div class="text-center">
                <div class="text-3xl font-bold text-primary-600 mb-2">2006</div>
                <p class="text-sm text-gray-600">
                  {language === 'en' && 'TI Cloud Founded'}
                  {language === 'jp' && 'TI Cloud設立'}
                  {language === 'hk' && 'TI Cloud成立'}
                </p>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-primary-600 mb-2">2167.HK</div>
                <p class="text-sm text-gray-600">
                  {language === 'en' && 'HKEX Listed'}
                  {language === 'jp' && '香港証券取引所上場'}
                  {language === 'hk' && '港交所上市'}
                </p>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-primary-600 mb-2">5000+</div>
                <p class="text-sm text-gray-600">
                  {language === 'en' && 'Enterprise Clients'}
                  {language === 'jp' && '企業顧客'}
                  {language === 'hk' && '企業客戶'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - Same as Homepage */}
      <section id="contact" class="relative py-20 bg-gradient-to-r from-[#6438FF] to-[#0DE0EF] overflow-hidden">
        {/* Decorative elements */}
        <div class="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        <div class="absolute -bottom-20 -left-20 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        
        <div class="site-container px-6 relative z-10">
          <div class="max-w-4xl mx-auto text-center">
            <h2 class="text-4xl md:text-5xl font-black text-white mb-6">
              {trans.contact.title}
            </h2>
            <p class="text-xl text-white/90 mb-8">
              {trans.contact.subtitle}
            </p>
            
            {/* Email Only */}
            <div class="flex justify-center items-center">
              <a 
                href="mailto:marketing@zenava.ai" 
                class="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/30 transition-all transform hover:scale-105 shadow-lg inline-flex items-center"
              >
                <i class="fas fa-envelope mr-3"></i>
                marketing@zenava.ai
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}