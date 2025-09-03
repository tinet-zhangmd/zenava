import { Language, getTranslation, t } from '../utils/i18n.js'

interface SalesScenarioProps {
  language: Language
}

export function SalesScenario({ language }: SalesScenarioProps) {
  const translations = getTranslation(language)

  return (
    <div class="min-h-screen">
      {/* Hero Banner */}
      <section class="relative py-20 lg:py-32 bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 overflow-hidden">
        {/* Background Pattern */}
        <div class="absolute inset-0 opacity-30">
          <div class="absolute inset-0" style="background-image: radial-gradient(circle, rgba(59, 130, 246, 0.1) 1px, transparent 1px); background-size: 40px 40px;"></div>
        </div>
        
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6" data-animate="fade-in">
              <span class="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                {language === 'en' && 'Zenava Sales AI'}
                {language === 'jp' && 'Zenava セールス AI'}
                {language === 'hk' && 'Zenava 銷售 AI'}
              </span>
            </h1>
            
            <p class="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed" data-animate="fade-in">
              {language === 'en' && 'Intelligent sales assistant that accelerates deal closure and improves conversion rates'}
              {language === 'jp' && '取引成約を加速し、コンバージョン率を向上させるインテリジェント営業アシスタント'}
              {language === 'hk' && '加速成交，提升轉化率的智能銷售助手'}
            </p>
            
            <div class="flex flex-col sm:flex-row gap-4 justify-center" data-animate="slide-up">
              <a href="#transformation-journey" class="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 inline-block">
                <i class="fas fa-phone mr-2"></i>
                {language === 'en' && 'Schedule Consultation'}
                {language === 'jp' && '相談を予約'}
                {language === 'hk' && '預約溝通'}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Current Challenges Section */}
      <section class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16" data-animate="fade-in">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {language === 'en' && 'Current Sales Challenges'}
              {language === 'jp' && '現在の営業課題'}
              {language === 'hk' && '企業銷售現狀'}
            </h2>
            <p class="text-xl text-gray-600">
              {language === 'en' && 'Common pain points in enterprise sales today'}
              {language === 'jp' && '現在の企業営業でよくある課題'}
              {language === 'hk' && '企業銷售面臨的常見挑戰'}
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Challenge 1: Follow-up Efficiency */}
            <div class="bg-red-50 border-l-4 border-red-400 p-6 rounded-lg" data-animate="slide-up">
              <div class="flex items-center mb-4">
                <div class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
                  <i class="fas fa-clock text-red-600"></i>
                </div>
                <h3 class="text-lg font-bold text-gray-900">
                  {language === 'en' && 'Follow-up Delays'}
                  {language === 'jp' && 'フォローアップの遅れ'}
                  {language === 'hk' && '跟進效率低'}
                </h3>
              </div>
              <p class="text-gray-700 text-sm leading-relaxed">
                {language === 'en' && 'Sales reps struggle with timely follow-ups, leading to missed opportunities and deal slippage.'}
                {language === 'jp' && '営業担当者のタイムリーなフォローアップが困難で、機会の逸失や取引の滑り落ちを招く。'}
                {language === 'hk' && '銷售人員跟進不及時，話術不標準，客戶體驗不一致，導致銷售機會流失。'}
              </p>
            </div>

            {/* Challenge 2: Lead Qualification */}
            <div class="bg-orange-50 border-l-4 border-orange-400 p-6 rounded-lg" data-animate="slide-up" style="animation-delay: 0.1s;">
              <div class="flex items-center mb-4">
                <div class="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                  <i class="fas fa-funnel-dollar text-orange-600"></i>
                </div>
                <h3 class="text-lg font-bold text-gray-900">
                  {language === 'en' && 'Poor Lead Qualification'}
                  {language === 'jp' && 'リード資格の判定不良'}
                  {language === 'hk' && '線索質量難判斷'}
                </h3>
              </div>
              <p class="text-gray-700 text-sm leading-relaxed">
                {language === 'en' && 'Sales teams waste time on unqualified leads, reducing productivity and revenue potential.'}
                {language === 'jp' && '営業チームが不適格なリードに時間を浪費し、生産性と収益ポテンシャルを低下させる。'}
                {language === 'hk' && '缺乏有效的線索質量評估機制，銷售人員精力分散，成交週期延長。'}
              </p>
            </div>

            {/* Challenge 3: Sales Process Inconsistency */}
            <div class="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg" data-animate="slide-up" style="animation-delay: 0.2s;">
              <div class="flex items-center mb-4">
                <div class="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                  <i class="fas fa-exclamation-triangle text-yellow-600"></i>
                </div>
                <h3 class="text-lg font-bold text-gray-900">
                  {language === 'en' && 'Process Inconsistency'}
                  {language === 'jp' && 'プロセスの不整合'}
                  {language === 'hk' && '銷售流程不規範'}
                </h3>
              </div>
              <p class="text-gray-700 text-sm leading-relaxed">
                {language === 'en' && 'Inconsistent sales processes and messaging lead to unpredictable results and customer confusion.'}
                {language === 'jp' && '一貫性のない営業プロセスとメッセージングが、予測不可能な結果と顧客の混乱を招く。'}
                {language === 'hk' && '銷售流程標準化程度低，不同銷售人員表現差異大，影響整體成交率。'}
              </p>
            </div>

            {/* Challenge 4: Customer Intelligence */}
            <div class="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg" data-animate="slide-up" style="animation-delay: 0.3s;">
              <div class="flex items-center mb-4">
                <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <i class="fas fa-user-secret text-blue-600"></i>
                </div>
                <h3 class="text-lg font-bold text-gray-900">
                  {language === 'en' && 'Limited Customer Insight'}
                  {language === 'jp' && '顧客洞察の不足'}
                  {language === 'hk' && '客戶洞察不足'}
                </h3>
              </div>
              <p class="text-gray-700 text-sm leading-relaxed">
                {language === 'en' && 'Lack of deep customer insights makes it difficult to personalize sales approaches and close deals.'}
                {language === 'jp' && '深い顧客洞察の欠如により、営業アプローチのパーソナライゼーションと取引成約が困難。'}
                {language === 'hk' && '缺乏深度客戶分析，無法精準把握客戶需求，難以制定針對性銷售策略。'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Zenava Solutions Section */}
      <section class="py-20 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16" data-animate="fade-in">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {language === 'en' && 'Zenava Sales Solutions'}
              {language === 'jp' && 'Zenava セールスソリューション'}
              {language === 'hk' && 'Zenava 銷售解決方案'}
            </h2>
            <p class="text-xl text-gray-600">
              {language === 'en' && 'Accelerate sales cycles, improve conversion rates, maximize revenue'}
              {language === 'jp' && '営業サイクルを加速し、コンバージョン率を向上させ、収益を最大化'}
              {language === 'hk' && '加速銷售週期，提升成交率，最大化收益'}
            </p>
          </div>

          <div class="space-y-16">
            {/* Solution 1: Intelligent Lead Follow-up */}
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div data-animate="slide-up">
                <div class="flex items-center mb-6">
                  <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <i class="fas fa-robot text-blue-600 text-xl"></i>
                  </div>
                  <h3 class="text-2xl font-bold text-gray-900">
                    {language === 'en' && 'Intelligent Follow-up Assistant'}
                    {language === 'jp' && 'インテリジェントフォローアップアシスタント'}
                    {language === 'hk' && '智能跟進助手'}
                  </h3>
                </div>
                <h4 class="text-lg font-semibold text-blue-600 mb-4">
                  {language === 'en' && 'Never Miss a Follow-up, Accelerate Deal Progress'}
                  {language === 'jp' && 'フォローアップを逃さず、取引進行を加速'}
                  {language === 'hk' && '跟進永不遺漏，加速成交進程'}
                </h4>
                <p class="text-gray-700 mb-6 leading-relaxed">
                  {language === 'en' && 'Zenava automatically identifies optimal follow-up timing based on customer interactions, engagement levels, and behavioral patterns. It generates personalized follow-up messages, schedules touchpoints, and provides sales reps with conversation guidance to maintain consistent, professional communication throughout the sales process.'}
                  {language === 'jp' && 'Zenavaは顧客のインタラクション、エンゲージメントレベル、行動パターンに基づいて最適なフォローアップタイミングを自動識別します。パーソナライズされたフォローアップメッセージを生成し、タッチポイントをスケジューリングし、営業担当者に対話ガイダンスを提供し、営業プロセス全体で一貫したプロフェッショナルなコミュニケーションを維持します。'}
                  {language === 'hk' && 'Zenava 基於客戶互動情況、參與度和行為模式自動識別最佳跟進時機，生成個性化跟進內容，安排觸達節點，為銷售人員提供對話指導，確保整個銷售過程中保持一致、專業的溝通。'}
                </p>
                <div class="flex space-x-4">
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>
                      {language === 'en' && 'Auto Timing'}
                      {language === 'jp' && '自動タイミング'}
                      {language === 'hk' && '自動時機'}
                    </span>
                  </div>
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>
                      {language === 'en' && 'Personalized Messages'}
                      {language === 'jp' && 'パーソナライズされたメッセージ'}
                      {language === 'hk' && '個性化消息'}
                    </span>
                  </div>
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>
                      {language === 'en' && 'Smart Scheduling'}
                      {language === 'jp' && 'スマートスケジューリング'}
                      {language === 'hk' && '智能排程'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div class="bg-white p-8 rounded-xl shadow-lg" data-animate="slide-up">
                <div class="border-2 border-gray-100 rounded-lg p-6">
                  <h4 class="font-bold text-gray-900 mb-4">
                    {language === 'en' && 'Smart Follow-up Timeline'}
                    {language === 'jp' && 'スマートフォローアップタイムライン'}
                    {language === 'hk' && '智能跟進時間線'}
                  </h4>
                  
                  <div class="space-y-3">
                    <div class="flex items-start p-3 bg-green-50 rounded-lg">
                      <div class="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1">✓</div>
                      <div>
                        <p class="font-medium">
                          {language === 'en' && 'Initial Contact - Day 0'}
                          {language === 'jp' && '初回コンタクト - 0日目'}
                          {language === 'hk' && '首次接觸 - 第0天'}
                        </p>
                        <p class="text-sm text-gray-600">
                          {language === 'en' && 'Welcome message sent, needs assessment scheduled'}
                          {language === 'jp' && 'ウェルカムメッセージ送信、ニーズ評価スケジュール済み'}
                          {language === 'hk' && '歡迎信息已發送，需求評估已安排'}
                        </p>
                      </div>
                    </div>
                    
                    <div class="flex items-start p-3 bg-blue-50 rounded-lg">
                      <div class="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1">2</div>
                      <div>
                        <p class="font-medium">
                          {language === 'en' && 'Value Proposition - Day 3'}
                          {language === 'jp' && '価値提案 - 3日目'}
                          {language === 'hk' && '價值提案 - 第3天'}
                        </p>
                        <p class="text-sm text-gray-600">
                          {language === 'en' && 'Customized solution proposal based on needs'}
                          {language === 'jp' && 'ニーズに基づくカスタマイズソリューション提案'}
                          {language === 'hk' && '基於需求的定制化解決方案'}
                        </p>
                      </div>
                    </div>
                    
                    <div class="flex items-start p-3 bg-orange-50 rounded-lg">
                      <div class="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1">7</div>
                      <div>
                        <p class="font-medium">
                          {language === 'en' && 'Demo Follow-up - Day 7'}
                          {language === 'jp' && 'デモフォローアップ - 7日目'}
                          {language === 'hk' && 'Demo跟進 - 第7天'}
                        </p>
                        <p class="text-sm text-gray-600">
                          {language === 'en' && 'Schedule product demo, address concerns'}
                          {language === 'jp' && 'プロダクトデモスケジュール、懸念事項への対応'}
                          {language === 'hk' && '安排產品演示，解答疑慮'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Solution 2: Lead Qualification & Scoring */}
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div class="order-2 lg:order-1 bg-white p-8 rounded-xl shadow-lg" data-animate="slide-up">
                <div class="space-y-4">
                  <h4 class="font-bold text-gray-900 mb-4">
                    {language === 'en' && 'Lead Qualification Matrix'}
                    {language === 'jp' && 'リード資格評価マトリックス'}
                    {language === 'hk' && '線索資格評估矩陣'}
                  </h4>
                  
                  {/* Qualification Criteria */}
                  <div class="space-y-3">
                    <div class="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div>
                        <p class="font-medium">
                          {language === 'en' && 'Budget Authority'}
                          {language === 'jp' && '予算権限'}
                          {language === 'hk' && '預算權限'}
                        </p>
                        <p class="text-sm text-gray-600">
                          {language === 'en' && 'Decision maker identified'}
                          {language === 'jp' && '意思決定者特定済み'}
                          {language === 'hk' && '決策者已確認'}
                        </p>
                      </div>
                      <div class="text-right">
                        <span class="text-lg font-bold text-green-600">A+</span>
                      </div>
                    </div>
                    
                    <div class="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div>
                        <p class="font-medium">
                          {language === 'en' && 'Timeline Need'}
                          {language === 'jp' && 'タイムラインニーズ'}
                          {language === 'hk' && '時間需求'}
                        </p>
                        <p class="text-sm text-gray-600">
                          {language === 'en' && 'Urgency level assessed'}
                          {language === 'jp' && '緊急度レベル評価済み'}
                          {language === 'hk' && '緊急程度已評估'}
                        </p>
                      </div>
                      <div class="text-right">
                        <span class="text-lg font-bold text-blue-600">A</span>
                      </div>
                    </div>
                    
                    <div class="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <div>
                        <p class="font-medium">
                          {language === 'en' && 'Pain Points'}
                          {language === 'jp' && 'ペインポイント'}
                          {language === 'hk' && '痛點'}
                        </p>
                        <p class="text-sm text-gray-600">
                          {language === 'en' && 'Clear business challenges'}
                          {language === 'jp' && '明確なビジネス課題'}
                          {language === 'hk' && '明確業務挑戰'}
                        </p>
                      </div>
                      <div class="text-right">
                        <span class="text-lg font-bold text-yellow-600">B+</span>
                      </div>
                    </div>
                  </div>
                  
                  <div class="mt-6 p-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg text-center">
                    <p class="font-bold text-lg">
                      {language === 'en' && 'Overall Score: 92/100'}
                      {language === 'jp' && '総合スコア: 92/100'}
                      {language === 'hk' && '綜合評分：92/100'}
                    </p>
                    <p class="text-sm opacity-90">
                      {language === 'en' && 'High Priority Lead'}
                      {language === 'jp' && '高優先度リード'}
                      {language === 'hk' && '高優先級線索'}
                    </p>
                  </div>
                </div>
              </div>

              <div class="order-1 lg:order-2" data-animate="slide-up">
                <div class="flex items-center mb-6">
                  <div class="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mr-4">
                    <i class="fas fa-search-plus text-cyan-600 text-xl"></i>
                  </div>
                  <h3 class="text-2xl font-bold text-gray-900">
                    {language === 'en' && 'Smart Lead Qualification'}
                    {language === 'jp' && 'スマートリード資格評価'}
                    {language === 'hk' && '智能線索資格評估'}
                  </h3>
                </div>
                <h4 class="text-lg font-semibold text-cyan-600 mb-4">
                  {language === 'en' && 'Focus on High-Value Opportunities'}
                  {language === 'jp' && '高価値機会への集中'}
                  {language === 'hk' && '聚焦高價值機會'}
                </h4>
                <p class="text-gray-700 mb-6 leading-relaxed">
                  {language === 'en' && 'Zenava automatically evaluates lead quality using advanced scoring algorithms that consider budget authority, decision timeline, pain points severity, and engagement behavior. This intelligent qualification system ensures sales teams prioritize high-potential prospects, reducing time waste and improving overall conversion rates.'}
                  {language === 'jp' && 'Zenavaは予算権限、意思決定のタイムライン、ペインポイントの重要度、エンゲージメント行動を考慮した高度なスコアリングアルゴリズムを使用してリードの質を自動評価します。このインテリジェント資格評価システムにより、営業チームが高ポテンシャルの見込み客に優先順位を付け、時間の浪費を削減し、全体のコンバージョン率を向上させます。'}
                  {language === 'hk' && 'Zenava 使用先進的評分算法自動評估線索質量，考慮預算權限、決策時間線、痛點嚴重程度和參與行為。這個智能資格評估系統確保銷售團隊優先處理高潛力的前景，減少時間浪費並提高整體轉化率。'}
                </p>
                <div class="flex space-x-4">
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>
                      {language === 'en' && 'Auto Scoring'}
                      {language === 'jp' && '自動スコアリング'}
                      {language === 'hk' && '自動評分'}
                    </span>
                  </div>
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>
                      {language === 'en' && 'Priority Queue'}
                      {language === 'jp' && '優先順位キュー'}
                      {language === 'hk' && '優先級隊列'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Solution 3: Sales Process Standardization */}
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div data-animate="slide-up">
                <div class="flex items-center mb-6">
                  <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                    <i class="fas fa-route text-purple-600 text-xl"></i>
                  </div>
                  <h3 class="text-2xl font-bold text-gray-900">
                    {language === 'en' && 'Standardized Sales Process'}
                    {language === 'jp' && '標準化営業プロセス'}
                    {language === 'hk' && '標準化銷售流程'}
                  </h3>
                </div>
                <h4 class="text-lg font-semibold text-purple-600 mb-4">
                  {language === 'en' && 'Consistent Excellence Across All Sales Teams'}
                  {language === 'jp' && '全営業チームでの一貫した優秀さ'}
                  {language === 'hk' && '全銷售團隊一致卓越表現'}
                </h4>
                <p class="text-gray-700 mb-6 leading-relaxed">
                  {language === 'en' && 'Zenava guides sales reps through proven methodologies, providing real-time suggestions, objection handling scripts, and next-best-action recommendations. This ensures consistent messaging, reduces onboarding time for new hires, and elevates the performance of the entire sales organization.'}
                  {language === 'jp' && 'Zenavaは実証済みの方法論を通じて営業担当者をガイドし、リアルタイムの提案、異議処理スクリプト、次善のアクション推奨を提供します。これにより一貫したメッセージングを確保し、新規採用者のオンボーディング時間を短縮し、営業組織全体のパフォーマンスを向上させます。'}
                  {language === 'hk' && 'Zenava 通過經過驗證的方法論指導銷售代表，提供實時建議、異議處理腳本和下一步最佳行動建議。這確保了一致的信息傳遞，減少新員工的入職時間，並提升整個銷售組織的績效。'}
                </p>
                <div class="flex space-x-4">
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>
                      {language === 'en' && 'Playbook Guidance'}
                      {language === 'jp' && 'プレイブックガイダンス'}
                      {language === 'hk' && '操作手冊指導'}
                    </span>
                  </div>
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>
                      {language === 'en' && 'Script Library'}
                      {language === 'jp' && 'スクリプトライブラリ'}
                      {language === 'hk' && '話術庫'}
                    </span>
                  </div>
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>
                      {language === 'en' && 'Real-time Coaching'}
                      {language === 'jp' && 'リアルタイムコーチング'}
                      {language === 'hk' && '即時指導'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div class="bg-white p-8 rounded-xl shadow-lg" data-animate="slide-up">
                <h4 class="font-bold text-gray-900 mb-6">
                  {language === 'en' && 'Sales Process Stages'}
                  {language === 'jp' && '営業プロセスステージ'}
                  {language === 'hk' && '銷售流程階段'}
                </h4>
                
                <div class="space-y-4">
                  <div class="flex items-start space-x-4">
                    <div class="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">1</div>
                    <div>
                      <p class="font-medium text-gray-900">
                        {language === 'en' && 'Discovery & Qualification'}
                        {language === 'jp' && '発見と資格評価'}
                        {language === 'hk' && '發現與資格評估'}
                      </p>
                      <p class="text-sm text-gray-600">
                        {language === 'en' && 'Guided questioning framework, BANT criteria'}
                        {language === 'jp' && 'ガイド付き質問フレームワーク、BANT基準'}
                        {language === 'hk' && '引導式提問框架，BANT標準'}
                      </p>
                    </div>
                  </div>
                  
                  <div class="flex items-start space-x-4">
                    <div class="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">2</div>
                    <div>
                      <p class="font-medium text-gray-900">
                        {language === 'en' && 'Needs Analysis'}
                        {language === 'jp' && 'ニーズ分析'}
                        {language === 'hk' && '需求分析'}
                      </p>
                      <p class="text-sm text-gray-600">
                        {language === 'en' && 'Deep-dive questions, pain point mapping'}
                        {language === 'jp' && '詳細質問、ペインポイントマッピング'}
                        {language === 'hk' && '深度提問，痛點映射'}
                      </p>
                    </div>
                  </div>
                  
                  <div class="flex items-start space-x-4">
                    <div class="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">3</div>
                    <div>
                      <p class="font-medium text-gray-900">
                        {language === 'en' && 'Solution Presentation'}
                        {language === 'jp' && 'ソリューション提案'}
                        {language === 'hk' && '解決方案展示'}
                      </p>
                      <p class="text-sm text-gray-600">
                        {language === 'en' && 'Customized demo, ROI calculation'}
                        {language === 'jp' && 'カスタマイズデモ、ROI計算'}
                        {language === 'hk' && '定制化演示，ROI計算'}
                      </p>
                    </div>
                  </div>
                  
                  <div class="flex items-start space-x-4">
                    <div class="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">4</div>
                    <div>
                      <p class="font-medium text-gray-900">
                        {language === 'en' && 'Objection Handling'}
                        {language === 'jp' && '異議処理'}
                        {language === 'hk' && '異議處理'}
                      </p>
                      <p class="text-sm text-gray-600">
                        {language === 'en' && 'Proven responses, negotiation tactics'}
                        {language === 'jp' && '実証済み回答、交渉戦術'}
                        {language === 'hk' && '實證回應，談判策略'}
                      </p>
                    </div>
                  </div>
                  
                  <div class="flex items-start space-x-4">
                    <div class="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">5</div>
                    <div>
                      <p class="font-medium text-gray-900">
                        {language === 'en' && 'Deal Closure'}
                        {language === 'jp' && '取引成約'}
                        {language === 'hk' && '成交'}
                      </p>
                      <p class="text-sm text-gray-600">
                        {language === 'en' && 'Closing techniques, contract management'}
                        {language === 'jp' && 'クロージングテクニック、契約管理'}
                        {language === 'hk' && '成交技巧，合同管理'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Solution 4: Customer Intelligence & Insights */}
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div class="order-2 lg:order-1 bg-white p-8 rounded-xl shadow-lg" data-animate="slide-up">
                <div class="space-y-6">
                  <h4 class="font-bold text-gray-900 mb-4">
                    {language === 'en' && 'Customer Intelligence Dashboard'}
                    {language === 'jp' && '顧客インテリジェンスダッシュボード'}
                    {language === 'hk' && '客戶智能儀表板'}
                  </h4>
                  
                  {/* Intelligence Cards */}
                  <div class="grid grid-cols-1 gap-4">
                    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div class="flex items-center justify-between mb-2">
                        <i class="fas fa-user-tie text-blue-600 text-2xl"></i>
                        <span class="text-sm font-bold text-blue-600">
                          {language === 'en' && 'Decision Maker'}
                          {language === 'jp' && '意思決定者'}
                          {language === 'hk' && '決策者'}
                        </span>
                      </div>
                      <p class="text-sm text-gray-700">
                        {language === 'en' && 'John Smith - IT Director'}
                        {language === 'jp' && 'John Smith - IT部長'}
                        {language === 'hk' && 'John Smith - IT總監'}
                      </p>
                      <p class="text-xs text-gray-500">
                        {language === 'en' && 'Budget authority: $500K+'}
                        {language === 'jp' && '予算権限: $500K+'}
                        {language === 'hk' && '預算權限：$500K+'}
                      </p>
                    </div>
                    
                    <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div class="flex items-center justify-between mb-2">
                        <i class="fas fa-chart-line text-green-600 text-2xl"></i>
                        <span class="text-sm font-bold text-green-600">
                          {language === 'en' && 'Engagement Score'}
                          {language === 'jp' && 'エンゲージメントスコア'}
                          {language === 'hk' && '參與度評分'}
                        </span>
                      </div>
                      <p class="text-lg font-bold text-green-600">85/100</p>
                      <p class="text-xs text-gray-500">
                        {language === 'en' && 'High engagement, ready to buy'}
                        {language === 'jp' && '高エンゲージメント、購入準備完了'}
                        {language === 'hk' && '高參與度，準備購買'}
                      </p>
                    </div>
                    
                    <div class="bg-orange-50 border border-orange-200 rounded-lg p-4">
                      <div class="flex items-center justify-between mb-2">
                        <i class="fas fa-exclamation-circle text-orange-600 text-2xl"></i>
                        <span class="text-sm font-bold text-orange-600">
                          {language === 'en' && 'Key Pain Points'}
                          {language === 'jp' && '主要ペインポイント'}
                          {language === 'hk' && '關鍵痛點'}
                        </span>
                      </div>
                      <p class="text-sm text-gray-700">
                        {language === 'en' && 'Manual processes, scalability issues'}
                        {language === 'jp' && '手動プロセス、スケーラビリティ問題'}
                        {language === 'hk' && '手動流程，擴展性問題'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="order-1 lg:order-2" data-animate="slide-up">
                <div class="flex items-center mb-6">
                  <div class="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
                    <i class="fas fa-brain text-indigo-600 text-xl"></i>
                  </div>
                  <h3 class="text-2xl font-bold text-gray-900">
                    {language === 'en' && 'Deep Customer Intelligence'}
                    {language === 'jp' && '深層顧客インテリジェンス'}
                    {language === 'hk' && '深度客戶洞察'}
                  </h3>
                </div>
                <h4 class="text-lg font-semibold text-indigo-600 mb-4">
                  {language === 'en' && 'Know Your Customer Better Than They Know Themselves'}
                  {language === 'jp' && '顧客を彼ら自身より深く理解'}
                  {language === 'hk' && '比客戶更了解客戶'}
                </h4>
                <p class="text-gray-700 mb-6 leading-relaxed">
                  {language === 'en' && 'Zenava aggregates and analyzes customer data from multiple touchpoints to create comprehensive intelligence profiles. It identifies decision makers, maps organizational structures, tracks engagement patterns, and predicts buying behavior to help sales reps personalize their approach and timing for maximum impact.'}
                  {language === 'jp' && 'Zenavaは複数のタッチポイントから顧客データを集約・分析し、包括的なインテリジェンスプロファイルを作成します。意思決定者を特定し、組織構造をマッピングし、エンゲージメントパターンを追跡し、購買行動を予測して、営業担当者が最大のインパクトのためにアプローチとタイミングをパーソナライズできるよう支援します。'}
                  {language === 'hk' && 'Zenava 匯總和分析來自多個接觸點的客戶數據，創建全面的智能檔案。它識別決策者，映射組織結構，追蹤參與模式，並預測購買行為，幫助銷售代表個性化他們的方法和時機以獲得最大影響。'}
                </p>
                <div class="flex space-x-4">
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>
                      {language === 'en' && 'Multi-source Data'}
                      {language === 'jp' && 'マルチソースデータ'}
                      {language === 'hk' && '多源數據'}
                    </span>
                  </div>
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>
                      {language === 'en' && 'Predictive Analytics'}
                      {language === 'jp' && '予測分析'}
                      {language === 'hk' && '預測分析'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI & Benefits Section */}
      <section class="py-20 bg-gradient-to-br from-blue-600 to-cyan-600 text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16" data-animate="fade-in">
            <h2 class="text-3xl md:text-4xl font-bold mb-4">
              {language === 'en' && 'Proven Sales ROI'}
              {language === 'jp' && '実証された営業ROI'}
              {language === 'hk' && '銷售投入回報實證'}
            </h2>
            <p class="text-xl opacity-90">
              {language === 'en' && 'Real results from sales teams worldwide'}
              {language === 'jp' && '世界中の営業チームからの実際の結果'}
              {language === 'hk' && '全球銷售團隊真實效果'}
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div class="text-center bg-white/10 backdrop-blur-sm rounded-xl p-8" data-animate="slide-up">
              <div class="text-4xl md:text-5xl font-bold mb-2">+120%</div>
              <p class="text-lg opacity-90">
                {language === 'en' && 'Sales Productivity'}
                {language === 'jp' && '営業生産性'}
                {language === 'hk' && '銷售生產力'}
              </p>
            </div>
            
            <div class="text-center bg-white/10 backdrop-blur-sm rounded-xl p-8" data-animate="slide-up" style="animation-delay: 0.1s;">
              <div class="text-4xl md:text-5xl font-bold mb-2">-45%</div>
              <p class="text-lg opacity-90">
                {language === 'en' && 'Sales Cycle Time'}
                {language === 'jp' && '営業サイクル時間'}
                {language === 'hk' && '銷售週期'}
              </p>
            </div>
            
            <div class="text-center bg-white/10 backdrop-blur-sm rounded-xl p-8" data-animate="slide-up" style="animation-delay: 0.2s;">
              <div class="text-4xl md:text-5xl font-bold mb-2">+95%</div>
              <p class="text-lg opacity-90">
                {language === 'en' && 'Close Rate'}
                {language === 'jp' && '成約率'}
                {language === 'hk' && '成交率'}
              </p>
            </div>
            
            <div class="text-center bg-white/10 backdrop-blur-sm rounded-xl p-8" data-animate="slide-up" style="animation-delay: 0.3s;">
              <div class="text-4xl md:text-5xl font-bold mb-2">30%</div>
              <p class="text-lg opacity-90">
                {language === 'en' && 'Revenue Growth'}
                {language === 'jp' && '収益成長'}
                {language === 'hk' && '收益增長'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <TransformationCTA language={language} />
    </div>
  )
}