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
                {language === 'zh' && '关于ZENAVA'}
                {language === 'en' && 'About ZENAVA'}
                {language === 'jp' && 'ZENAVAについて'}
                {language === 'hk' && '關於ZENAVA'}
              </span>
            </h1>
            
            <p class="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed" data-animate="fade-in">
              {language === 'zh' && '面向营销和服务场景的对话式 AI 智能体'}
              {language === 'en' && 'AI Agent for Marketing and Service Dialogue Scenarios'}
              {language === 'jp' && 'マーケティングとサービスの対話シナリオ向けAIエージェント'}
              {language === 'hk' && '面向營銷和服務場景的對話式 AI 智能體'}
            </p>
            
            <div class="flex justify-center" data-animate="slide-up">
              <a href="/contact" class="bg-gradient-to-r from-blue-600 to-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 inline-block">
                <i class="fas fa-phone mr-2"></i>
                {language === 'zh' && '预约咨询'}
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
              {language === 'zh' && '公司介绍'}
              {language === 'en' && 'Company Introduction'}
              {language === 'jp' && '会社紹介'}
              {language === 'hk' && '公司介紹'}
            </h2>
            
            <div class="prose prose-lg max-w-none text-gray-700" data-animate="slide-up">
              <p class="mb-6 leading-relaxed">
                {language === 'zh' && 'ZENAVA是面向客服和营销场景的AI生产力平台，旨在帮助企业消除"高投入、低产出"的AI焦虑，通过AI自动化完成度、服务人力节省率等清晰可量化的指标，确保企业在极短周期内看到清晰的业务成效，破解AI焦虑。'}
                {language === 'en' && 'ZENAVA is an AI productivity platform for customer service and marketing scenarios, designed to help enterprises eliminate the "high investment, low output" AI anxiety. Through clear and quantifiable metrics such as AI automation completion rate and service manpower savings rate, it ensures enterprises see clear business results in a very short cycle, solving AI anxiety.'}
                {language === 'jp' && 'ZENAVAは、カスタマーサービスとマーケティングシーン向けのAI生産性プラットフォームで、「高投資、低出力」のAI不安を企業が解消できるよう設計されています。AI自動化完了率、サービス人件費削減率などの明確で定量化可能な指標を通じて、企業が極めて短いサイクルで明確なビジネス成果を見られるようにし、AI不安を解決します。'}
                {language === 'hk' && 'ZENAVA是面向客服和營銷場景的AI生產力平台，旨在幫助企業消除"高投入、低產出"的AI焦慮，通過AI自動化完成度、服務人力節省率等清晰可量化的指標，確保企業在極短週期內看到清晰的業務成效，破解AI焦慮。'}
              </p>
              
              <p class="mb-6 leading-relaxed">
                {language === 'zh' && 'ZENAVA致力于成为全球领先的客服与营销生产力平台。与传统AI只能按固定规则被动执行不同，ZENAVA是真正的AI员工，能沟通、能执行，更能主动学习和自我优化。无论客服场景还是营销场景，ZENAVA都能独立完成任务，让企业从依赖人力的模式中脱身，实现业务快速复制、持续落地和高效增长。'}
                {language === 'en' && 'ZENAVA is committed to becoming the world\'s leading customer service and marketing productivity platform. Unlike traditional AI that can only passively execute according to fixed rules, ZENAVA is a true AI employee that can communicate, execute, and more importantly, actively learn and self-optimize. Whether in customer service or marketing scenarios, ZENAVA can independently complete tasks, enabling enterprises to break free from human-dependent models and achieve rapid business replication, continuous implementation, and efficient growth.'}
                {language === 'jp' && 'ZENAVAは、世界をリードするカスタマーサービスとマーケティング生産性プラットフォームになることを目指しています。固定されたルールに従って受動的に実行するだけの従来のAIとは異なり、ZENAVAは真のAI従業員であり、コミュニケーション、実行ができ、さらに積極的に学習し自己最適化することができます。カスタマーサービスのシーンでもマーケティングのシーンでも、ZENAVAは独立してタスクを完了でき、企業が人的依存モデルから脱却し、ビジネスの迅速な複製、継続的な実装、効率的な成長を実現できるようにします。'}
                {language === 'hk' && 'ZENAVA致力於成為全球領先的客服與營銷生產力平台。與傳統AI只能按固定規則被動執行不同，ZENAVA是真正的AI員工，能溝通、能執行，更能主動學習和自我優化。無論客服場景還是營銷場景，ZENAVA都能獨立完成任務，讓企業從依賴人力的模式中脫身，實現業務快速複製、持續落地和高效增長。'}
              </p>
              
              <p class="mb-8 leading-relaxed">
                {language === 'zh' && '目前，ZENAVA已经在消费品零售、汽车、软件信息服务、酒店&旅游等多个行业落地应用，成为企业可触碰、可衡量的新型生产力，助力企业实现增量营收、成本结构重构与服务体验提升，在未来竞争中取得先发优势。'}
                {language === 'en' && 'Currently, ZENAVA has been successfully deployed across multiple industries including consumer retail, automotive, software information services, hotels & tourism, becoming a tangible and measurable new productivity for enterprises, helping them achieve incremental revenue, cost structure restructuring, and service experience improvement, gaining first-mover advantages in future competition.'}
                {language === 'jp' && '現在、ZENAVAは消費財小売、自動車、ソフトウェア情報サービス、ホテル・観光など複数の業界で導入され、企業にとって触れることができ、測定可能な新しい生産性となり、企業が増収、コスト構造の再構築、サービス体験の向上を実現し、将来の競争で先発優位性を獲得することを支援しています。'}
                {language === 'hk' && '目前，ZENAVA已經在消費品零售、汽車、軟件信息服務、酒店&旅遊等多個行業落地應用，成為企業可觸碰、可衡量的新型生產力，助力企業實現增量營收、成本結構重構與服務體驗提升，在未來競爭中取得先發優勢。'}
              </p>
            </div>
            
            {/* Key Metrics */}
            <div class="grid grid-cols-3 gap-6 mt-12" data-animate="fade-in">
              <div class="text-center">
                <div class="text-3xl font-bold text-primary-600 mb-2">2006</div>
                <p class="text-sm text-gray-600">
                  {language === 'zh' && 'TI Cloud成立'}
                  {language === 'en' && 'TI Cloud Founded'}
                  {language === 'jp' && 'TI Cloud設立'}
                  {language === 'hk' && 'TI Cloud成立'}
                </p>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-primary-600 mb-2">2167.HK</div>
                <p class="text-sm text-gray-600">
                  {language === 'zh' && '港交所上市'}
                  {language === 'en' && 'HKEX Listed'}
                  {language === 'jp' && '香港証券取引所上場'}
                  {language === 'hk' && '港交所上市'}
                </p>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-primary-600 mb-2">5000+</div>
                <p class="text-sm text-gray-600">
                  {language === 'zh' && '企业客户'}
                  {language === 'en' && 'Enterprise Clients'}
                  {language === 'jp' && '企業顧客'}
                  {language === 'hk' && '企業客戶'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}