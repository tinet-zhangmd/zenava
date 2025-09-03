import { Language, getTranslation, t } from '../utils/i18n'
import { getTranslations } from '../i18n/translations'

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
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div data-animate="slide-up">
              <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {language === 'en' && 'Company Introduction'}
                {language === 'jp' && '会社紹介'}
                {language === 'hk' && '公司介紹'}
              </h2>
              <p class="text-lg text-gray-700 mb-8 leading-relaxed">
                {language === 'en' && 'TI Cloud is a leading provider of intelligent customer engagement solutions. We specialize in cloud-native platforms that combine omnichannel contact centers with conversational AI agents, helping enterprises transform their customer interactions through advanced technology.'}
                {language === 'jp' && 'TI Cloudは、インテリジェントな顧客エンゲージメントソリューションのリーディングプロバイダーです。私たちは、オムニチャネルコンタクトセンターと対話型AIエージェントを組み合わせたクラウドネイティブプラットフォームを専門とし、先進技術を通じて企業の顧客インタラクションの変革を支援しています。'}
                {language === 'hk' && 'TI Cloud 是智能客戶互動解決方案的領先供應商。我們專注於結合全渠道聯絡中心與對話式AI智能體的雲原生平台，通過先進技術幫助企業轉型客戶互動。'}
              </p>
              
              <div class="grid grid-cols-2 gap-6">
                <div class="text-center">
                  <div class="text-3xl font-bold text-primary-600 mb-2">2006</div>
                  <p class="text-sm text-gray-600">
                    {language === 'en' && 'Founded'}
                    {language === 'jp' && '設立'}
                    {language === 'hk' && '成立年份'}
                  </p>
                </div>
                <div class="text-center">
                  <div class="text-3xl font-bold text-primary-600 mb-2">2167.HK</div>
                  <p class="text-sm text-gray-600">
                    {language === 'en' && 'HKEX Listed'}
                    {language === 'jp' && '香港上場'}
                    {language === 'hk' && '港交所上市'}
                  </p>
                </div>
                <div class="text-center">
                  <div class="text-3xl font-bold text-primary-600 mb-2">10+</div>
                  <p class="text-sm text-gray-600">
                    {language === 'en' && 'Cities Worldwide'}
                    {language === 'jp' && '世界の都市'}
                    {language === 'hk' && '全球城市'}
                  </p>
                </div>
                <div class="text-center">
                  <div class="text-3xl font-bold text-primary-600 mb-2">5000+</div>
                  <p class="text-sm text-gray-600">
                    {language === 'en' && 'Enterprise Clients'}
                    {language === 'jp' && '企業クライアント'}
                    {language === 'hk' && '企業客戶'}
                  </p>
                </div>
              </div>
            </div>
            
            <div class="bg-gray-50 p-8 rounded-xl" data-animate="slide-up">
              <h3 class="text-2xl font-bold text-gray-900 mb-6">
                {language === 'en' && 'Our Business'}
                {language === 'jp' && '私たちのビジネス'}
                {language === 'hk' && '我們的業務'}
              </h3>
              
              <div class="space-y-4">
                <div class="flex items-start space-x-3">
                  <div class="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mt-1">
                    <i class="fas fa-headset text-primary-600 text-sm"></i>
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-1">
                      {language === 'en' && 'Omnichannel Contact Center'}
                      {language === 'jp' && 'オムニチャネルコンタクトセンター'}
                      {language === 'hk' && '全渠道聯絡中心'}
                    </h4>
                    <p class="text-sm text-gray-600">
                      {language === 'en' && 'Unified platform for voice, chat, email, and social media interactions'}
                      {language === 'jp' && '音声、チャット、メール、ソーシャルメディアの統合プラットフォーム'}
                      {language === 'hk' && '語音、聊天、電郵、社交媒體的統一平台'}
                    </p>
                  </div>
                </div>
                
                <div class="flex items-start space-x-3">
                  <div class="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mt-1">
                    <i class="fas fa-robot text-purple-600 text-sm"></i>
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-1">
                      {language === 'en' && 'Conversational AI Agents'}
                      {language === 'jp' && '対話型AIエージェント'}
                      {language === 'hk' && '對話式AI智能體'}
                    </h4>
                    <p class="text-sm text-gray-600">
                      {language === 'en' && 'Advanced AI agents for intelligent customer interactions'}
                      {language === 'jp' && 'インテリジェントな顧客インタラクションのための高度なAIエージェント'}
                      {language === 'hk' && '用於智能客戶互動的高級AI智能體'}
                    </p>
                  </div>
                </div>
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