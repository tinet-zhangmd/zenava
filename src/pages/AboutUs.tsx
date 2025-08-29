import { Language, getTranslation, t } from '../utils/i18n'

interface AboutUsProps {
  language: Language
}

export function AboutUs({ language }: AboutUsProps) {
  const translations = getTranslation(language)

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
                {language === 'en' && 'About TI Cloud'}
                {language === 'jp' && 'TI Cloudについて'}
                {language === 'hk' && '關於天潤融通'}
              </span>
            </h1>
            
            <p class="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed" data-animate="fade-in">
              {language === 'en' && 'Empowering enterprises worldwide with intelligent customer engagement solutions through cloud-native AI platforms'}
              {language === 'jp' && 'クラウドネイティブAIプラットフォームによるインテリジェントな顧客エンゲージメントソリューションで世界中の企業を支援'}
              {language === 'hk' && '科技賦能、成就客戶 - 透過雲原生AI平台為全球企業提供智能客戶聯絡解決方案'}
            </p>
            
            <div class="flex flex-col sm:flex-row gap-4 justify-center" data-animate="slide-up">
              <button class="bg-gradient-to-r from-blue-600 to-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                <i class="fas fa-calendar-alt mr-2"></i>
                {language === 'en' && 'Schedule Demo'}
                {language === 'jp' && 'デモ予約'}
                {language === 'hk' && '預約演示'}
              </button>
              <button class="border-2 border-primary-600 text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-600 hover:text-white transition-all duration-300">
                <i class="fas fa-download mr-2"></i>
                {language === 'en' && 'Company Profile'}
                {language === 'jp' && '会社概要資料'}
                {language === 'hk' && '企業簡介'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div data-animate="slide-up">
              <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {language === 'en' && 'Our Mission'}
                {language === 'jp' && '私たちの使命'}
                {language === 'hk' && '我們的使命'}
              </h2>
              <p class="text-lg text-gray-700 mb-8 leading-relaxed">
                {language === 'en' && 'To transform enterprise customer engagement through AI-powered cloud platforms, enabling seamless, intelligent, and scalable customer interactions that drive measurable business results across global markets.'}
                {language === 'jp' && 'AI駆動のクラウドプラットフォームを通じて企業の顧客エンゲージメントを変革し、グローバル市場において測定可能なビジネス成果をもたらすシームレス、インテリジェント、スケーラブルな顧客インタラクションを実現することです。'}
                {language === 'hk' && '透過AI驅動的雲平台變革企業客戶互動，在全球市場中實現無縫、智能、可擴展的客戶互動，推動可衡量的業務成果。'}
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
                  <div class="text-3xl font-bold text-primary-600 mb-2">1000+</div>
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
                {language === 'en' && 'What We Do'}
                {language === 'jp' && '私たちが行うこと'}
                {language === 'hk' && '我們的業務'}
              </h3>
              
              <div class="space-y-4">
                <div class="flex items-start space-x-3">
                  <div class="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center mt-1">
                    <i class="fas fa-cloud text-primary-600 text-sm"></i>
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-1">
                      {language === 'en' && 'Cloud-Native AI Platform'}
                      {language === 'jp' && 'クラウドネイティブAIプラットフォーム'}
                      {language === 'hk' && '雲原生AI平台'}
                    </h4>
                    <p class="text-sm text-gray-600">
                      {language === 'en' && 'Scalable, secure, and intelligent customer engagement solutions'}
                      {language === 'jp' && 'スケーラブル、セキュア、インテリジェントな顧客エンゲージメントソリューション'}
                      {language === 'hk' && '可擴展、安全、智能的客戶互動解決方案'}
                    </p>
                  </div>
                </div>
                
                <div class="flex items-start space-x-3">
                  <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mt-1">
                    <i class="fas fa-headset text-green-600 text-sm"></i>
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-1">
                      {language === 'en' && 'Omnichannel Contact Center'}
                      {language === 'jp' && 'オムニチャネルコンタクトセンター'}
                      {language === 'hk' && '全渠道聯絡中心'}
                    </h4>
                    <p class="text-sm text-gray-600">
                      {language === 'en' && 'Unified platform for voice, chat, email, and social media'}
                      {language === 'jp' && '音声、チャット、メール、ソーシャルメディア統合プラットフォーム'}
                      {language === 'hk' && '語音、聊天、電郵、社交媒體統一平台'}
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
                      {language === 'jp' && '会話型AIエージェント'}
                      {language === 'hk' && '對話式AI智能體'}
                    </h4>
                    <p class="text-sm text-gray-600">
                      {language === 'en' && 'Advanced AI agents powered by large language models'}
                      {language === 'jp' && '大規模言語モデルによる高度なAIエージェント'}
                      {language === 'hk' && '基於大語言模型的高級AI智能體'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section class="py-20 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16" data-animate="fade-in">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {language === 'en' && 'Our Journey'}
              {language === 'jp' && '私たちの歩み'}
              {language === 'hk' && '發展歷程'}
            </h2>
            <p class="text-xl text-gray-600">
              {language === 'en' && 'From startup to global leader in customer engagement AI'}
              {language === 'jp' && 'スタートアップからカスタマーエンゲージメントAIのグローバルリーダーへ'}
              {language === 'hk' && '從初創企業成長為客戶互動AI的全球領導者'}
            </p>
          </div>

          <div class="relative">
            {/* Timeline Line */}
            <div class="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-primary-200"></div>
            
            <div class="space-y-16">
              {/* 2006 - Founded */}
              <div class="relative flex items-center justify-between" data-animate="slide-up">
                <div class="w-5/12 text-right pr-8">
                  <div class="bg-white p-6 rounded-lg shadow-lg">
                    <h3 class="text-xl font-bold text-gray-900 mb-2">2006</h3>
                    <p class="text-gray-600">
                      {language === 'en' && 'TI Cloud founded in Beijing, focusing on enterprise communication solutions'}
                      {language === 'jp' && '北京でTI Cloud設立、企業通信ソリューションに特化'}
                      {language === 'hk' && '天潤融通於北京成立，專注企業通信解決方案'}
                    </p>
                  </div>
                </div>
                <div class="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary-600 rounded-full border-4 border-white shadow"></div>
                <div class="w-5/12"></div>
              </div>

              {/* 2022 - IPO */}
              <div class="relative flex items-center justify-between" data-animate="slide-up">
                <div class="w-5/12"></div>
                <div class="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary-600 rounded-full border-4 border-white shadow"></div>
                <div class="w-5/12 text-left pl-8">
                  <div class="bg-white p-6 rounded-lg shadow-lg">
                    <h3 class="text-xl font-bold text-gray-900 mb-2">2022</h3>
                    <p class="text-gray-600">
                      {language === 'en' && 'First customer contact cloud platform company listed on Hong Kong Stock Exchange (2167.HK)'}
                      {language === 'jp' && '香港証券取引所に上場した初の顧客コンタクトクラウドプラットフォーム会社（2167.HK）'}
                      {language === 'hk' && '首家在香港聯交所主板上市的客戶聯絡雲平台公司（2167.HK）'}
                    </p>
                  </div>
                </div>
              </div>

              {/* 2024 - Zenava Launch */}
              <div class="relative flex items-center justify-between" data-animate="slide-up">
                <div class="w-5/12 text-right pr-8">
                  <div class="bg-white p-6 rounded-lg shadow-lg">
                    <h3 class="text-xl font-bold text-gray-900 mb-2">2024</h3>
                    <p class="text-gray-600">
                      {language === 'en' && 'Launched Zenava AI Agent platform, powered by advanced large language models'}
                      {language === 'jp' && '高度な大規模言語モデルを搭載したZenava AIエージェントプラットフォームを発売'}
                      {language === 'hk' && '推出基於先進大語言模型的Zenava AI智能體平台'}
                    </p>
                  </div>
                </div>
                <div class="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary-600 rounded-full border-4 border-white shadow"></div>
                <div class="w-5/12"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team Section */}
      <section class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16" data-animate="fade-in">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {language === 'en' && 'Leadership Team'}
              {language === 'jp' && 'リーダーシップチーム'}
              {language === 'hk' && '領導團隊'}
            </h2>
            <p class="text-xl text-gray-600">
              {language === 'en' && 'Experienced leaders driving innovation in AI and customer engagement'}
              {language === 'jp' && 'AIと顧客エンゲージメントにおけるイノベーションを推進する経験豊富なリーダー'}
              {language === 'hk' && '在AI和客戶互動領域推動創新的資深領導者'}
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* CEO */}
            <div class="text-center bg-gray-50 p-8 rounded-xl" data-animate="slide-up">
              <div class="w-24 h-24 bg-gradient-to-br from-blue-500 to-primary-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                <i class="fas fa-user text-white text-2xl"></i>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">
                {language === 'en' && 'Chief Executive Officer'}
                {language === 'jp' && '最高経営責任者'}
                {language === 'hk' && '首席執行官'}
              </h3>
              <p class="text-gray-600 mb-4">
                {language === 'en' && 'Leading TI Cloud\'s strategic vision and global expansion, with 18+ years in enterprise software and cloud platforms'}
                {language === 'jp' && 'TI Cloudの戦略的ビジョンとグローバル展開をリード、企業ソフトウェアとクラウドプラットフォームで18年以上の経験'}
                {language === 'hk' && '領導天潤融通戰略願景和全球擴張，在企業軟件和雲平台領域擁有18+年經驗'}
              </p>
            </div>

            {/* CTO */}
            <div class="text-center bg-gray-50 p-8 rounded-xl" data-animate="slide-up">
              <div class="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                <i class="fas fa-user text-white text-2xl"></i>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">
                {language === 'en' && 'Chief Technology Officer'}
                {language === 'jp' && '最高技術責任者'}
                {language === 'hk' && '首席技術官'}
              </h3>
              <p class="text-gray-600 mb-4">
                {language === 'en' && 'Driving AI innovation and platform architecture, former AI researcher with expertise in NLP and machine learning'}
                {language === 'jp' && 'AIイノベーションとプラットフォームアーキテクチャを推進、NLPと機械学習の専門知識を持つ元AI研究者'}
                {language === 'hk' && '推動AI創新和平台架構，前AI研究員，在NLP和機器學習領域擁有專業知識'}
              </p>
            </div>

            {/* VP Global */}
            <div class="text-center bg-gray-50 p-8 rounded-xl" data-animate="slide-up">
              <div class="w-24 h-24 bg-gradient-to-br from-green-500 to-blue-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                <i class="fas fa-user text-white text-2xl"></i>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">
                {language === 'en' && 'VP Global Operations'}
                {language === 'jp' && 'グローバル事業担当副社長'}
                {language === 'hk' && '全球運營副總裁'}
              </h3>
              <p class="text-gray-600 mb-4">
                {language === 'en' && 'Managing international markets and partnerships, with experience scaling enterprise software across Asia-Pacific and North America'}
                {language === 'jp' && '国際市場とパートナーシップを管理、アジア太平洋と北米での企業ソフトウェア拡張経験'}
                {language === 'hk' && '管理國際市場和合作夥伴關係，在亞太和北美地區擴展企業軟件方面經驗豐富'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Recognition Section */}
      <section class="py-20 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16" data-animate="fade-in">
            <h2 class="text-3xl md:text-4xl font-bold mb-4">
              {language === 'en' && 'Trusted by Industry Leaders'}
              {language === 'jp' && '業界リーダーから信頼'}
              {language === 'hk' && '獲得行業領袖信任'}
            </h2>
            <p class="text-xl opacity-90">
              {language === 'en' && 'Serving 1000+ enterprises across 10+ industries worldwide'}
              {language === 'jp' && '世界10以上の業界で1000以上の企業にサービス提供'}
              {language === 'hk' && '為全球10+行業的1000+企業提供服務'}
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            <div class="text-center" data-animate="slide-up">
              <div class="text-3xl md:text-4xl font-bold mb-2">10+</div>
              <p class="opacity-90">
                {language === 'en' && 'Industries Served'}
                {language === 'jp' && 'サービス業界'}
                {language === 'hk' && '服務行業'}
              </p>
            </div>
            
            <div class="text-center" data-animate="slide-up">
              <div class="text-3xl md:text-4xl font-bold mb-2">1000+</div>
              <p class="opacity-90">
                {language === 'en' && 'Enterprise Clients'}
                {language === 'jp' && '企業クライアント'}
                {language === 'hk' && '企業客戶'}
              </p>
            </div>
            
            <div class="text-center" data-animate="slide-up">
              <div class="text-3xl md:text-4xl font-bold mb-2">99.9%</div>
              <p class="opacity-90">
                {language === 'en' && 'Platform Uptime'}
                {language === 'jp' && 'プラットフォーム稼働率'}
                {language === 'hk' && '平台正常運行時間'}
              </p>
            </div>
            
            <div class="text-center" data-animate="slide-up">
              <div class="text-3xl md:text-4xl font-bold mb-2">24/7</div>
              <p class="opacity-90">
                {language === 'en' && 'Global Support'}
                {language === 'jp' && 'グローバルサポート'}
                {language === 'hk' && '全球支持'}
              </p>
            </div>
          </div>

          {/* Customer Industries */}
          <div class="text-center">
            <h3 class="text-2xl font-bold mb-8">
              {language === 'en' && 'Industries We Serve'}
              {language === 'jp' && 'サービス提供業界'}
              {language === 'hk' && '服務行業'}
            </h3>
            
            <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 text-sm">
              <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <i class="fas fa-car text-2xl mb-2"></i>
                <p>
                  {language === 'en' && 'Automotive'}
                  {language === 'jp' && '自動車'}
                  {language === 'hk' && '汽車'}
                </p>
              </div>
              
              <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <i class="fas fa-university text-2xl mb-2"></i>
                <p>
                  {language === 'en' && 'Financial Services'}
                  {language === 'jp' && '金融サービス'}
                  {language === 'hk' && '金融服務'}
                </p>
              </div>
              
              <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <i class="fas fa-shopping-cart text-2xl mb-2"></i>
                <p>
                  {language === 'en' && 'Retail'}
                  {language === 'jp' && '小売'}
                  {language === 'hk' && '零售'}
                </p>
              </div>
              
              <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <i class="fas fa-laptop text-2xl mb-2"></i>
                <p>
                  {language === 'en' && 'Technology'}
                  {language === 'jp' && 'テクノロジー'}
                  {language === 'hk' && '科技'}
                </p>
              </div>
              
              <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <i class="fas fa-heartbeat text-2xl mb-2"></i>
                <p>
                  {language === 'en' && 'Healthcare'}
                  {language === 'jp' && 'ヘルスケア'}
                  {language === 'hk' && '醫療保健'}
                </p>
              </div>
              
              <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <i class="fas fa-graduation-cap text-2xl mb-2"></i>
                <p>
                  {language === 'en' && 'Education'}
                  {language === 'jp' && '教育'}
                  {language === 'hk' && '教育'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Presence Section */}
      <section class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16" data-animate="fade-in">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {language === 'en' && 'Global Presence'}
              {language === 'jp' && 'グローバルプレゼンス'}
              {language === 'hk' && '全球據點'}
            </h2>
            <p class="text-xl text-gray-600">
              {language === 'en' && 'Supporting customers across multiple continents with local expertise'}
              {language === 'jp' && '現地の専門知識で複数大陸の顧客をサポート'}
              {language === 'hk' && '憑藉本地專業知識為多個大洲的客戶提供支持'}
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Asia Pacific */}
            <div class="bg-gradient-to-br from-blue-50 to-primary-50 p-8 rounded-xl" data-animate="slide-up">
              <h3 class="text-xl font-bold text-gray-900 mb-4">
                {language === 'en' && 'Asia Pacific Headquarters'}
                {language === 'jp' && 'アジア太平洋本社'}
                {language === 'hk' && '亞太區總部'}
              </h3>
              <div class="space-y-3 text-sm text-gray-600">
                <p><i class="fas fa-map-marker-alt mr-2"></i>Beijing, Shanghai, Shenzhen</p>
                <p><i class="fas fa-map-marker-alt mr-2"></i>Guangzhou, Hangzhou, Nanjing</p>
                <p><i class="fas fa-map-marker-alt mr-2"></i>Chengdu, Xi'an, Jinan, Zhengzhou</p>
              </div>
            </div>

            {/* Operations Centers */}
            <div class="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-xl" data-animate="slide-up">
              <h3 class="text-xl font-bold text-gray-900 mb-4">
                {language === 'en' && 'Global Operations'}
                {language === 'jp' && 'グローバルオペレーション'}
                {language === 'hk' && '全球運營'}
              </h3>
              <div class="space-y-3 text-sm text-gray-600">
                <p><i class="fas fa-clock mr-2"></i>24/7 Support Coverage</p>
                <p><i class="fas fa-globe mr-2"></i>Multi-language Support</p>
                <p><i class="fas fa-shield-alt mr-2"></i>Local Data Compliance</p>
              </div>
            </div>

            {/* Contact */}
            <div class="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-xl" data-animate="slide-up">
              <h3 class="text-xl font-bold text-gray-900 mb-4">
                {language === 'en' && 'Get in Touch'}
                {language === 'jp' && 'お問い合わせ'}
                {language === 'hk' && '聯繫我們'}
              </h3>
              <div class="space-y-3">
                <button class="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors">
                  <i class="fas fa-envelope mr-2"></i>
                  {language === 'en' && 'Contact Sales'}
                  {language === 'jp' && '営業に連絡'}
                  {language === 'hk' && '聯繫銷售'}
                </button>
                <button class="w-full border-2 border-primary-600 text-primary-600 py-3 px-4 rounded-lg font-medium hover:bg-primary-600 hover:text-white transition-colors">
                  <i class="fas fa-phone mr-2"></i>
                  {language === 'en' && 'Request Demo'}
                  {language === 'jp' && 'デモ依頼'}
                  {language === 'hk' && '申請演示'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}