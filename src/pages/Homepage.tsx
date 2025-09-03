import { Language, getTranslation, t } from '../utils/i18n.js'

interface HomepageProps {
  language: Language
}

export function Homepage({ language }: HomepageProps) {
  const translations = getTranslation(language)

  return (
    <div class="min-h-screen">
      {/* Hero Section */}
      <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Pattern */}
        <div class="absolute inset-0 hero-pattern opacity-30"></div>
        
        {/* Background Gradient */}
        <div class="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50"></div>
        
        <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div class="animate-fade-in" data-animate="fade-in">
            <h1 class="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              <span class="text-gradient">{t(translations, 'hero.title')}</span>
            </h1>
            
            <h2 class="text-2xl md:text-3xl text-gray-600 mb-8 font-light">
              {t(translations, 'hero.subtitle')}
            </h2>
            
            <p class="text-lg md:text-xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed">
              {t(translations, 'hero.description')}
            </p>
            
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <button class="btn-primary text-white px-8 py-4 rounded-lg font-semibold text-lg">
                <i class="fas fa-rocket mr-2"></i>
                {t(translations, 'hero.cta_primary')}
              </button>
              
              <button class="btn-secondary bg-transparent px-8 py-4 rounded-lg font-semibold text-lg">
                <i class="fas fa-play mr-2"></i>
                {t(translations, 'hero.cta_secondary')}
              </button>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div class="absolute top-20 left-10 w-20 h-20 bg-primary-100 rounded-full animate-bounce-gentle opacity-60"></div>
        <div class="absolute top-40 right-20 w-16 h-16 bg-secondary-100 rounded-full animate-bounce-gentle opacity-60" style="animation-delay: 0.5s;"></div>
        <div class="absolute bottom-20 left-20 w-12 h-12 bg-primary-200 rounded-full animate-bounce-gentle opacity-60" style="animation-delay: 1s;"></div>
      </section>

      {/* Features Section */}
      <section class="py-20 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16" data-animate="fade-in">
            <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t(translations, 'features.title')}
            </h2>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto">
              {t(translations, 'features.subtitle')}
            </p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* For Customers */}
            <div class="feature-card card-hover" data-animate="slide-up">
              <div class="text-center mb-6">
                <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i class="fas fa-users text-2xl icon-primary"></i>
                </div>
                <h3 class="text-2xl font-bold text-gray-900 mb-2">
                  {t(translations, 'features.customers.title')}
                </h3>
                <h4 class="text-lg font-semibold text-primary-600 mb-4">
                  {t(translations, 'features.customers.subtitle')}
                </h4>
              </div>
              <p class="text-gray-600 leading-relaxed">
                {t(translations, 'features.customers.description')}
              </p>
            </div>

            {/* For Employees */}
            <div class="feature-card card-hover" data-animate="slide-up" style="animation-delay: 0.2s;">
              <div class="text-center mb-6">
                <div class="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i class="fas fa-user-tie text-2xl icon-secondary"></i>
                </div>
                <h3 class="text-2xl font-bold text-gray-900 mb-2">
                  {t(translations, 'features.employees.title')}
                </h3>
                <h4 class="text-lg font-semibold text-secondary-600 mb-4">
                  {t(translations, 'features.employees.subtitle')}
                </h4>
              </div>
              <p class="text-gray-600 leading-relaxed">
                {t(translations, 'features.employees.description')}
              </p>
            </div>

            {/* For Enterprise */}
            <div class="feature-card card-hover" data-animate="slide-up" style="animation-delay: 0.4s;">
              <div class="text-center mb-6">
                <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i class="fas fa-building text-2xl icon-success"></i>
                </div>
                <h3 class="text-2xl font-bold text-gray-900 mb-2">
                  {t(translations, 'features.enterprise.title')}
                </h3>
                <h4 class="text-lg font-semibold text-green-600 mb-4">
                  {t(translations, 'features.enterprise.subtitle')}
                </h4>
              </div>
              <p class="text-gray-600 leading-relaxed">
                {t(translations, 'features.enterprise.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Zenava Brings to Enterprise Section */}
      <section class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16" data-animate="fade-in">
            <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {language === 'en' && 'What Zenava Brings to Your Enterprise'}
              {language === 'jp' && 'Zenavaが企業にもたらすもの'}
              {language === 'hk' && 'Zenava 能為企業帶來什麼'}
            </h2>
            <p class="text-xl text-gray-600">
              {language === 'en' && 'Build AI-driven future organizational forms, enhance collaborative efficiency, reshape customer experience, and drive core competitiveness leap through customer engagement data'}
              {language === 'jp' && 'AI駆動の未来組織形態を構築し、協同効率を向上させ、顧客体験を再構築し、顧客接触データで企業の核心競争力の飛躍を推進'}
              {language === 'hk' && '構建AI驅動的未來組織形態，提升協同效率、重塑客戶體驗，並以客戶聯絡數據驅動企業核心競爭力躍遷'}
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Marketing Business */}
            <div class="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-xl border border-purple-100 hover:shadow-xl transition-all duration-300 card-hover" data-animate="slide-up">
              <div class="flex items-center mb-6">
                <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                  <i class="fas fa-bullhorn text-purple-600"></i>
                </div>
                <h3 class="text-xl font-bold text-gray-900">
                  {language === 'en' && 'Enterprise Marketing Business'}
                  {language === 'jp' && '企業マーケティング業務'}
                  {language === 'hk' && '企業營銷業務'}
                </h3>
              </div>
              <h4 class="text-lg font-semibold text-purple-600 mb-4">
                {language === 'en' && 'Improve Conversion Rate, Reduce Customer Acquisition Cost'}
                {language === 'jp' && 'コンバージョン率向上、顧客獲得コスト削減'}
                {language === 'hk' && '提升轉化率，降低獲客成本'}
              </h4>
              <p class="text-gray-700 mb-4 text-sm leading-relaxed">
                {language === 'en' && 'Zenava identifies customer intent in real-time, unifies lead generation scripts, intelligently assigns high-potential leads; analyzes conversations to inform marketing strategies; automatically reactivates silent customers to improve repeat conversions; integrates multi-channel data for precise targeting.'}
                {language === 'jp' && 'Zenavaはリアルタイムで顧客意図を識別し、留資スクリプトを統一し、高ポテンシャルリードをインテリジェントに配布。会話分析でマーケティング戦略にフィードバック。沈黙顧客を自動活性化し、再転換を向上。マルチチャネルデータを統合し、精密ターゲティングを推進。'}
                {language === 'hk' && 'Zenava 實時識別客戶意圖，統一話術留資，智能分配高潛線索；基於會話分析反哺營銷策略；自動激活沉默客戶，提升二次轉化；打通多渠道數據，驅動精準觸達。'}
              </p>
              <a href={`/${language === 'en' ? '' : language + '/'}scenarios/marketing`} class="inline-flex items-center text-purple-600 font-medium hover:text-purple-700 transition-colors">
                <span class="mr-1">
                  {language === 'en' && 'Learn More'}
                  {language === 'jp' && '詳細を見る'}
                  {language === 'hk' && '了解更多'}
                </span>
                <i class="fas fa-arrow-right text-sm"></i>
              </a>
            </div>

            {/* Sales Business */}
            <div class="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl border border-blue-100 hover:shadow-xl transition-all duration-300 card-hover" data-animate="slide-up" style="animation-delay: 0.1s;">
              <div class="flex items-center mb-6">
                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <i class="fas fa-handshake text-blue-600"></i>
                </div>
                <h3 class="text-xl font-bold text-gray-900">
                  {language === 'en' && 'Enterprise Sales Business'}
                  {language === 'jp' && '企業セールス業務'}
                  {language === 'hk' && '企業銷售業務'}
                </h3>
              </div>
              <h4 class="text-lg font-semibold text-blue-600 mb-4">
                {language === 'en' && 'Raise Sales Median, Improve Conversion Capability'}
                {language === 'jp' && 'セールス中央値向上、転換能力改善'}
                {language === 'hk' && '拉高銷售中位線，提升轉化能力'}
              </h4>
              <p class="text-gray-700 mb-4 text-sm leading-relaxed">
                {language === 'en' && 'Identifies customer issues, recommends scripts, standardizes sales actions; automatically responds to customer challenges by retrieving product and competitive knowledge; extracts high-conversion scripts and failure reasons to form replicable methodologies; intelligently recommends products based on customer behavior to assist closing.'}
                {language === 'jp' && '顧客問題を識別し、スクリプトを推奨し、営業行動を標準化。顧客の挑戦に自動対応し、製品と競合知識を調取。高転換スクリプトと失敗原因を抽出し、複製可能な方法論を形成。顧客行動に基づいてインテリジェントに製品を推奨し、成約を支援。'}
                {language === 'hk' && '識別客戶問題，推薦話術，規範銷售動作；自動應對客戶挑戰，調取產品與競品知識；提煉高轉化話術與失敗原因，形成可複製方法論；結合客戶行為智能推薦產品，輔助成交。'}
              </p>
              <a href={`/${language === 'en' ? '' : language + '/'}scenarios/sales`} class="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors">
                <span class="mr-1">
                  {language === 'en' && 'Learn More'}
                  {language === 'jp' && '詳細を見る'}
                  {language === 'hk' && '了解更多'}
                </span>
                <i class="fas fa-arrow-right text-sm"></i>
              </a>
            </div>

            {/* Customer Service Business */}
            <div class="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-xl border border-green-100 hover:shadow-xl transition-all duration-300 card-hover" data-animate="slide-up" style="animation-delay: 0.2s;">
              <div class="flex items-center mb-6">
                <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <i class="fas fa-headset text-green-600"></i>
                </div>
                <h3 class="text-xl font-bold text-gray-900">
                  {language === 'en' && 'Customer Service Business'}
                  {language === 'jp' && '顧客サービス業務'}
                  {language === 'hk' && '客戶服務業務'}
                </h3>
              </div>
              <h4 class="text-lg font-semibold text-green-600 mb-4">
                {language === 'en' && 'Make Service Faster, More Accurate, More Caring'}
                {language === 'jp' && 'サービスをより速く、より正確に、より温かく'}
                {language === 'hk' && '讓服務更快、更準、更有溫度'}
              </h4>
              <p class="text-gray-700 mb-4 text-sm leading-relaxed">
                {language === 'en' && '24/7 response to common inquiries, intelligent routing for complex issues; identifies customer emotions and dynamically adjusts response strategies; integrates knowledge base and ticketing systems for quick issue location and resolution; continuously analyzes service gaps to optimize scripts and processes.'}
                {language === 'jp' && '一般的な問い合わせに24時間365日対応、複雑な問題にはインテリジェントな振り分け。顧客感情を識別し、対応戦略を動的に調整。ナレッジベースとチケットシステムを連携し、問題の迅速な特定と解決を実現。サービスの盲点を継続分析し、スクリプトとプロセスを最適化。'}
                {language === 'hk' && '全天候響應常見咨詢，復雜問題智能分流；識別客戶情緒並動態調整應對策略；聯動知識庫與工單系統，快速定位與處理問題；持續分析服務盲區，實現話術與流程優化。'}
              </p>
              <a href={`/${language === 'en' ? '' : language + '/'}scenarios/customer-service`} class="inline-flex items-center text-green-600 font-medium hover:text-green-700 transition-colors">
                <span class="mr-1">
                  {language === 'en' && 'Learn More'}
                  {language === 'jp' && '詳細を見る'}
                  {language === 'hk' && '了解更多'}
                </span>
                <i class="fas fa-arrow-right text-sm"></i>
              </a>
            </div>

            {/* Internal Service Operations */}
            <div class="bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-xl border border-orange-100 hover:shadow-xl transition-all duration-300 card-hover" data-animate="slide-up" style="animation-delay: 0.3s;">
              <div class="flex items-center mb-6">
                <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                  <i class="fas fa-cogs text-orange-600"></i>
                </div>
                <h3 class="text-xl font-bold text-gray-900">
                  {language === 'en' && 'Store/Distributor Operations'}
                  {language === 'jp' && '店舗・代理店運営'}
                  {language === 'hk' && '門店/經銷商運營'}
                </h3>
              </div>
              <h4 class="text-lg font-semibold text-orange-600 mb-4">
                {language === 'en' && 'Efficient Operations Hub for Multi-tier, Large-scale Organizations'}
                {language === 'jp' && '多層・大規模組織の効率的運営ハブ'}
                {language === 'hk' && '多級、大規模組織的高效運營中樞'}
              </h4>
              <p class="text-gray-700 mb-4 text-sm leading-relaxed">
                {language === 'en' && 'Unified service portal centrally handles equipment, inventory, training and other affairs; intelligent ticket routing and progress tracking improves workflow efficiency; identifies frequent issues and pushes knowledge to reduce headquarters burden; operational data analysis optimizes resources and standards.'}
                {language === 'jp' && '統一サービスポータルで機器、在庫、研修等の業務を集中処理。インテリジェントなチケット振り分けと進捗追跡で流転効率を向上。高頻度問題を識別し、ナレッジをプッシュして本社負担を軽減。運営データ分析でリソースと基準を最適化。'}
                {language === 'hk' && '統一服務入口，集中處理設備、庫存、培訓等事務；智能派單與進度追蹤，提高流轉效率；識別高頻問題並推送知識，減輕總部負擔；通過運營數據分析優化資源與標準。'}
              </p>
              <a href={`/${language === 'en' ? '' : language + '/'}scenarios/internal-service`} class="inline-flex items-center text-orange-600 font-medium hover:text-orange-700 transition-colors">
                <span class="mr-1">
                  {language === 'en' && 'Learn More'}
                  {language === 'jp' && '詳細を見る'}
                  {language === 'hk' && '了解更多'}
                </span>
                <i class="fas fa-arrow-right text-sm"></i>
              </a>
            </div>

            {/* Product Design & Optimization */}
            <div class="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-xl border border-indigo-100 hover:shadow-xl transition-all duration-300 card-hover" data-animate="slide-up" style="animation-delay: 0.4s;">
              <div class="flex items-center mb-6">
                <div class="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
                  <i class="fas fa-lightbulb text-indigo-600"></i>
                </div>
                <h3 class="text-xl font-bold text-gray-900">
                  {language === 'en' && 'Product Design & Optimization'}
                  {language === 'jp' && '製品設計・最適化'}
                  {language === 'hk' && '產品設計與優化'}
                </h3>
              </div>
              <h4 class="text-lg font-semibold text-indigo-600 mb-4">
                {language === 'en' && 'Turn Customer Voice into Product Iteration Direction'}
                {language === 'jp' && '顧客の声を製品反復方向に転換'}
                {language === 'hk' && '讓客戶聲音成為產品疊代方向'}
              </h4>
              <p class="text-gray-700 mb-4 text-sm leading-relaxed">
                {language === 'en' && 'Zenava identifies customer intent in real-time, unifies lead generation scripts, intelligently assigns high-potential leads; analyzes conversations to inform marketing strategies; automatically reactivates silent customers to improve repeat conversions; integrates multi-channel data for precise targeting.'}
                {language === 'jp' && 'Zenavaはリアルタイムで顧客意図を識別し、留資スクリプトを統一し、高ポテンシャルリードをインテリジェントに配布。会話分析でマーケティング戦略にフィードバック。沈黙顧客を自動活性化し、再転換を向上。マルチチャネルデータを統合し、精密ターゲティングを推進。'}
                {language === 'hk' && 'Zenava 實時識別客戶意圖，統一話術留資，智能分配高潛線索；基於會話分析反哺營銷策略；自動激活沉默客戶，提升二次轉化；打通多渠道數據，驅動精準觸達。'}
              </p>
              <a href={`/${language === 'en' ? '' : language + '/'}scenarios/management`} class="inline-flex items-center text-indigo-600 font-medium hover:text-indigo-700 transition-colors">
                <span class="mr-1">
                  {language === 'en' && 'Learn More'}
                  {language === 'jp' && '詳細を見る'}
                  {language === 'hk' && '了解更多'}
                </span>
                <i class="fas fa-arrow-right text-sm"></i>
              </a>
            </div>

            {/* Brand & Reputation Management */}
            <div class="bg-gradient-to-br from-pink-50 to-rose-50 p-8 rounded-xl border border-pink-100 hover:shadow-xl transition-all duration-300 card-hover" data-animate="slide-up" style="animation-delay: 0.5s;">
              <div class="flex items-center mb-6">
                <div class="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mr-4">
                  <i class="fas fa-shield-alt text-pink-600"></i>
                </div>
                <h3 class="text-xl font-bold text-gray-900">
                  {language === 'en' && 'Brand & Reputation Management'}
                  {language === 'jp' && 'ブランド・評判管理'}
                  {language === 'hk' && '品牌與輿情管理'}
                </h3>
              </div>
              <h4 class="text-lg font-semibold text-pink-600 mb-4">
                {language === 'en' && 'Real-time Protection of Enterprise Brand Safety'}
                {language === 'jp' && '企業ブランドの安全をリアルタイム保護'}
                {language === 'hk' && '實時守護企業品牌安全'}
              </h4>
              <p class="text-gray-700 mb-4 text-sm leading-relaxed">
                {language === 'en' && 'Integrates social and customer service data to intelligently identify reputation risks; real-time alerts for high-risk conversations with automatic response workflows; quantifies customer emotions to optimize communication strategies; automatic quality checks on service language to ensure brand consistency.'}
                {language === 'jp' && 'ソーシャルと顧客サービスデータを統合し、評判リスクをインテリジェントに識別。高リスク対話をリアルタイム警告し、自動対応フローを起動。顧客感情を定量化し、コミュニケーション戦略を最適化。サービス用語の自動品質チェックで、ブランド一貫性を保障。'}
                {language === 'hk' && '融合社交與客服數據，智能識別輿情風險；實時預警高風險對話，自動觸發應對流程；量化客戶情緒，優化溝通策略；自動質檢服務用語，保障品牌一致性。'}
              </p>
              <a href={`/${language === 'en' ? '' : language + '/'}scenarios/management`} class="inline-flex items-center text-pink-600 font-medium hover:text-pink-700 transition-colors">
                <span class="mr-1">
                  {language === 'en' && 'Learn More'}
                  {language === 'jp' && '詳細を見る'}
                  {language === 'hk' && '了解更多'}
                </span>
                <i class="fas fa-arrow-right text-sm"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* How Zenava Serves You Section */}
      <section class="py-20 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16" data-animate="fade-in">
            <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {language === 'en' && 'How Zenava Will Serve You'}
              {language === 'jp' && 'Zenavaがどのようにサービスを提供するか'}
              {language === 'hk' && 'Zenava 將如何為您服務'}
            </h2>
            <p class="text-xl text-gray-600 max-w-4xl mx-auto">
              {language === 'en' && 'Zenava integrates multiple large models with professional knowledge bases, supports seamless integration with various business systems, combined with TI Cloud customer engagement platform, to create new intelligent engagement capabilities for you'}
              {language === 'jp' && 'Zenavaは複数の大規模モデルと専門知識ベースを統合し、さまざまなビジネスシステムとのシームレスな統合をサポートし、TI Cloudカスタマーエンゲージメントプラットフォームと組み合わせて、新しいインテリジェントなエンゲージメント能力を提供します'}
              {language === 'hk' && 'Zenava 集成多種大模型與專業知識庫，支持無縫對接各類業務系統，結合天潤融通客戶聯絡平台，為您打造全新的智能化聯絡能力'}
            </p>
          </div>

          {/* Architecture Diagram */}
          <div class="bg-white rounded-2xl shadow-xl p-8 mb-12" data-animate="slide-up">
            <div class="relative">
              {/* Knowledge Sources */}
              <div class="flex justify-center mb-8">
                <div class="bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl p-6 flex items-center space-x-6">
                  <div class="text-center">
                    <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <i class="fas fa-database text-blue-600"></i>
                    </div>
                    <p class="text-sm font-medium text-gray-700">
                      {language === 'en' && 'Industry Knowledge Base'}
                      {language === 'jp' && '業界知識ベース'}
                      {language === 'hk' && '天潤融通行業知識庫'}
                    </p>
                  </div>
                  <div class="text-center">
                    <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <i class="fas fa-file-alt text-purple-600"></i>
                    </div>
                    <p class="text-sm font-medium text-gray-700">
                      {language === 'en' && 'Enterprise Materials'}
                      {language === 'jp' && '企業資料'}
                      {language === 'hk' && '企業資料知識'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Central AI Agent */}
              <div class="flex justify-center mb-8">
                <div class="bg-gradient-to-br from-primary-500 to-secondary-600 rounded-2xl p-8 text-white text-center shadow-2xl">
                  <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="fas fa-brain text-3xl"></i>
                  </div>
                  <h3 class="text-2xl font-bold mb-2">
                    {language === 'en' && 'TI Cloud Super Agent'}
                    {language === 'jp' && 'TI Cloud スーパーエージェント'}
                    {language === 'hk' && '天潤融通 Super Agent'}
                  </h3>
                  <p class="text-sm opacity-90">
                    {language === 'en' && 'Powered by Multiple LLMs'}
                    {language === 'jp' && '複数のLLMによる駆動'}
                    {language === 'hk' && '大語言模型'}
                  </p>
                </div>
              </div>

              {/* User Types & Systems */}
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Side - User Types */}
                <div class="space-y-4">
                  <h4 class="text-lg font-bold text-gray-900 mb-4 text-center">
                    {language === 'en' && 'User Types'}
                    {language === 'jp' && 'ユーザータイプ'}
                    {language === 'hk' && '用戶類型'}
                  </h4>
                  
                  <div class="space-y-3">
                    {['潛在客戶', '客戶', '員工', '外包員工', '加盟店', '經銷商'].map((userType, index) => (
                      <div class="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
                        <span class="text-sm font-medium text-blue-700">{userType}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Side - Integrated Systems */}
                <div class="space-y-4">
                  <h4 class="text-lg font-bold text-gray-900 mb-4 text-center">
                    {language === 'en' && 'Integrated Systems'}
                    {language === 'jp' && '統合システム'}
                    {language === 'hk' && '集成系統'}
                  </h4>
                  
                  <div class="grid grid-cols-2 gap-3">
                    {[
                      { name: 'APIs', icon: 'fas fa-plug' },
                      { name: 'CRM', icon: 'fas fa-users' },
                      { name: 'ERP', icon: 'fas fa-chart-line' },
                      { name: 'OA', icon: 'fas fa-building' },
                      { name: 'IM', icon: 'fas fa-comments' }
                    ].map((system, index) => (
                      <div class="bg-gray-700 text-white rounded-lg p-3 text-center">
                        <i class={`${system.icon} text-lg mb-2`}></i>
                        <p class="text-sm font-medium">{system.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* LLM Models */}
              <div class="mt-8 flex justify-center">
                <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {[
                    { name: 'ChatGPT', icon: 'fas fa-robot', color: 'green' },
                    { name: 'DeepSeek', icon: 'fas fa-search', color: 'blue' },
                    { name: 'Doubao', icon: 'fas fa-user', color: 'orange' },
                    { name: 'Qwen', icon: 'fas fa-star', color: 'purple' },
                    { name: 'Kimi', icon: 'fas fa-moon', color: 'gray' }
                  ].map((model, index) => (
                    <div class="text-center bg-white border-2 border-gray-200 rounded-lg p-4">
                      <div class={`w-10 h-10 bg-${model.color}-100 rounded-full flex items-center justify-center mx-auto mb-2`}>
                        <i class={`${model.icon} text-${model.color}-600`}></i>
                      </div>
                      <p class="text-xs font-medium text-gray-700">{model.name}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom CTA Buttons */}
              <div class="mt-8 flex justify-center space-x-4">
                <button class="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                  <i class="fas fa-phone mr-2"></i>
                  {language === 'en' && 'Instant Consultation'}
                  {language === 'jp' && '即時相談'}
                  {language === 'hk' && '立即咨詢'}
                </button>
                <button class="border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white px-6 py-3 rounded-lg font-medium transition-colors">
                  <i class="fas fa-download mr-2"></i>
                  {language === 'en' && 'Free Trial'}
                  {language === 'jp' && '無料トライアル'}
                  {language === 'hk' && '免費試用'}
                </button>
              </div>
            </div>
          </div>

          {/* Key Benefits */}
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8" data-animate="slide-up">
            <div class="text-center bg-white p-6 rounded-xl shadow-lg">
              <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i class="fas fa-rocket text-blue-600 text-2xl"></i>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">
                {language === 'en' && 'Multi-Model Integration'}
                {language === 'jp' && '多モデル統合'}
                {language === 'hk' && '多模型集成'}
              </h3>
              <p class="text-gray-600">
                {language === 'en' && 'Flexible access to domestic and international large models, ensuring optimal performance for diverse business scenarios'}
                {language === 'jp' && '国内外の大規模モデルに柔軟にアクセス、多様なビジネスシナリオで最適なパフォーマンスを保証'}
                {language === 'hk' && '靈活接入國內外大模型，確保多樣化業務場景的最優表現'}
              </p>
            </div>

            <div class="text-center bg-white p-6 rounded-xl shadow-lg">
              <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i class="fas fa-link text-green-600 text-2xl"></i>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">
                {language === 'en' && 'Seamless System Integration'}
                {language === 'jp' && 'シームレスシステム統合'}
                {language === 'hk' && '無縫系統集成'}
              </h3>
              <p class="text-gray-600">
                {language === 'en' && 'Compatible with mainstream CRM, ERP, OA systems and custom enterprise systems for unified data and smooth processes'}
                {language === 'jp' && '主流のCRM、ERP、OAシステムおよびカスタム企業システムと互換性があり、統一されたデータとスムーズなプロセスを実現'}
                {language === 'hk' && '兼容主流CRM、ERP、OA系統及企業自建系統，數據統一，流程順暢'}
              </p>
            </div>

            <div class="text-center bg-white p-6 rounded-xl shadow-lg">
              <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i class="fas fa-shield-alt text-purple-600 text-2xl"></i>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-3">
                {language === 'en' && 'Enterprise-grade Security'}
                {language === 'jp' && 'エンタープライズグレードセキュリティ'}
                {language === 'hk' && '企業級安全保障'}
              </h3>
              <p class="text-gray-600">
                {language === 'en' && 'Built on TI Cloud platform with proven security architecture, ensuring data privacy and compliance requirements'}
                {language === 'jp' && '実績のあるセキュリティアーキテクチャを備えたTI Cloudプラットフォーム上に構築され、データプライバシーとコンプライアンス要件を保証'}
                {language === 'hk' && '基於天潤融通平台的成熟安全架構，保障數據隱私與合規要求'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section class="py-20 gradient-primary text-white">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 class="text-4xl md:text-5xl font-bold mb-6" data-animate="fade-in">
            Ready to Transform Your Business?
          </h2>
          <p class="text-xl mb-8 opacity-90" data-animate="fade-in">
            Join leading enterprises who trust Zenava to enhance their customer engagement
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center" data-animate="slide-up">
            <button class="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
              <i class="fas fa-calendar-alt mr-2"></i>
              Schedule Demo
            </button>
            <button class="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary-600 transition-colors">
              <i class="fas fa-download mr-2"></i>
              Download Brochure
            </button>
          </div>
        </div>
      </section>

      {/* Scroll to top button */}
      <button data-scroll-top class="fixed bottom-8 right-8 w-12 h-12 bg-primary-600 text-white rounded-full shadow-lg hover:bg-primary-700 transition-colors hidden no-print">
        <i class="fas fa-chevron-up"></i>
      </button>
    </div>
  )
}