import { Language, getTranslation, t } from '../utils/i18n.js'

interface CustomerServiceScenarioProps {
  language: Language
}

export function CustomerServiceScenario({ language }: CustomerServiceScenarioProps) {
  const translations = getTranslation(language)

  return (
    <div class="min-h-screen">
      {/* Hero Banner */}
      <section class="relative py-20 lg:py-32 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 overflow-hidden">
        {/* Background Pattern */}
        <div class="absolute inset-0 opacity-30">
          <div class="absolute inset-0" style="background-image: radial-gradient(circle, rgba(34, 197, 94, 0.1) 1px, transparent 1px); background-size: 40px 40px;"></div>
        </div>
        
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6" data-animate="fade-in">
              <span class="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                {language === 'en' && 'Zenava Customer Service AI'}
                {language === 'jp' && 'Zenava カスタマーサービス AI'}
                {language === 'hk' && 'Zenava 客戶服務 AI'}
              </span>
            </h1>
            
            <p class="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed" data-animate="fade-in">
              {language === 'en' && 'Deliver exceptional customer experiences with intelligent automation and human-like support'}
              {language === 'jp' && 'インテリジェント自動化と人間らしいサポートで優れた顧客体験を提供'}
              {language === 'hk' && '通過智能自動化和人性化支援提供卓越的客戶體驗'}
            </p>
            
            <div class="flex flex-col sm:flex-row gap-4 justify-center" data-animate="slide-up">
              <a href="#transformation-journey" class="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 inline-block">
                <i class="fas fa-phone mr-2"></i>
                {language === 'en' && 'Schedule Consultation'}
                {language === 'jp' && '相談を予約'}
                {language === 'hk' && '預約溝通'}
              </a>
              <button class="border-2 border-green-600 text-green-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-600 hover:text-white transition-all duration-300">
                <i class="fas fa-calendar mr-2"></i>
                {language === 'en' && 'Schedule Demo'}
                {language === 'jp' && 'デモ予約'}
                {language === 'hk' && '預約演示'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Current Challenges Section */}
      <section class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16" data-animate="fade-in">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {language === 'en' && 'Customer Service Challenges Today'}
              {language === 'jp' && '今日のカスタマーサービス課題'}
              {language === 'hk' && '客戶服務現狀挑戰'}
            </h2>
            <p class="text-xl text-gray-600">
              {language === 'en' && 'Common pain points in customer support operations'}
              {language === 'jp' && 'カスタマーサポート運営でよくある課題'}
              {language === 'hk' && '客戶支援運營的常見痛點'}
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Challenge 1: Response Time */}
            <div class="bg-red-50 border-l-4 border-red-400 p-6 rounded-lg" data-animate="slide-up">
              <div class="flex items-center mb-4">
                <div class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
                  <i class="fas fa-hourglass-half text-red-600"></i>
                </div>
                <h3 class="text-lg font-bold text-gray-900">
                  {language === 'en' && 'Slow Response Times'}
                  {language === 'jp' && '応答時間の遅れ'}
                  {language === 'hk' && '響應時間慢'}
                </h3>
              </div>
              <p class="text-gray-700 text-sm leading-relaxed">
                {language === 'en' && 'Long wait times lead to customer frustration and churn, especially during peak periods and off-hours.'}
                {language === 'jp' && '長い待機時間が顧客のフラストレーションと離脱を招く、特にピーク時間や営業時間外。'}
                {language === 'hk' && '長等待時間導致客戶不滿和流失，特別是在繁忙時段和非工作時間。'}
              </p>
            </div>

            {/* Challenge 2: Consistency */}
            <div class="bg-orange-50 border-l-4 border-orange-400 p-6 rounded-lg" data-animate="slide-up" style="animation-delay: 0.1s;">
              <div class="flex items-center mb-4">
                <div class="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                  <i class="fas fa-balance-scale text-orange-600"></i>
                </div>
                <h3 class="text-lg font-bold text-gray-900">
                  {language === 'en' && 'Inconsistent Service'}
                  {language === 'jp' && '一貫性のないサービス'}
                  {language === 'hk' && '服務不一致'}
                </h3>
              </div>
              <p class="text-gray-700 text-sm leading-relaxed">
                {language === 'en' && 'Different agents provide varying levels of service quality, creating unpredictable customer experiences.'}
                {language === 'jp' && '異なる担当者が様々なレベルのサービス品質を提供し、予測不可能な顧客体験を生み出す。'}
                {language === 'hk' && '不同客服人員提供不同水平的服務質量，造成不可預測的客戶體驗。'}
              </p>
            </div>

            {/* Challenge 3: Scalability */}
            <div class="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg" data-animate="slide-up" style="animation-delay: 0.2s;">
              <div class="flex items-center mb-4">
                <div class="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                  <i class="fas fa-chart-line text-yellow-600"></i>
                </div>
                <h3 class="text-lg font-bold text-gray-900">
                  {language === 'en' && 'Scalability Issues'}
                  {language === 'jp' && 'スケーラビリティ問題'}
                  {language === 'hk' && '擴展性問題'}
                </h3>
              </div>
              <p class="text-gray-700 text-sm leading-relaxed">
                {language === 'en' && 'Manual processes cannot scale with business growth, requiring continuous hiring and training.'}
                {language === 'jp' && '手動プロセスはビジネス成長に対応できず、継続的な採用と研修が必要。'}
                {language === 'hk' && '手動流程無法隨業務增長而擴展，需要持續招聘和培訓。'}
              </p>
            </div>

            {/* Challenge 4: Cost Management */}
            <div class="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg" data-animate="slide-up" style="animation-delay: 0.3s;">
              <div class="flex items-center mb-4">
                <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <i class="fas fa-dollar-sign text-blue-600"></i>
                </div>
                <h3 class="text-lg font-bold text-gray-900">
                  {language === 'en' && 'High Operational Costs'}
                  {language === 'jp' && '高い運営コスト'}
                  {language === 'hk' && '運營成本高'}
                </h3>
              </div>
              <p class="text-gray-700 text-sm leading-relaxed">
                {language === 'en' && 'Large support teams required to handle volume, driving up labor costs and management complexity.'}
                {language === 'jp' && '大量のボリュームを処理するために大規模なサポートチームが必要で、人件費と管理の複雑さが増大。'}
                {language === 'hk' && '需要大量支援團隊處理業務量，推高人力成本和管理複雜度。'}
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
              {language === 'en' && 'Zenava Customer Service Solutions'}
              {language === 'jp' && 'Zenava カスタマーサービスソリューション'}
              {language === 'hk' && 'Zenava 客戶服務解決方案'}
            </h2>
            <p class="text-xl text-gray-600">
              {language === 'en' && 'Enhance customer satisfaction while reducing operational costs'}
              {language === 'jp' && '運営コストを削減しながら顧客満足度を向上'}
              {language === 'hk' && '提升客戶滿意度的同時降低運營成本'}
            </p>
          </div>

          <div class="space-y-16">
            {/* Solution 1: 24/7 Intelligent Support */}
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div data-animate="slide-up">
                <div class="flex items-center mb-6">
                  <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <i class="fas fa-clock text-green-600 text-xl"></i>
                  </div>
                  <h3 class="text-2xl font-bold text-gray-900">
                    {language === 'en' && '24/7 Intelligent Support'}
                    {language === 'jp' && '24/7 インテリジェントサポート'}
                    {language === 'hk' && '24/7 智能支援'}
                  </h3>
                </div>
                <h4 class="text-lg font-semibold text-green-600 mb-4">
                  {language === 'en' && 'Instant Response, Always Available'}
                  {language === 'jp' && '即座の応答、常に利用可能'}
                  {language === 'hk' && '即時響應，永遠在線'}
                </h4>
                <p class="text-gray-700 mb-6 leading-relaxed">
                  {language === 'en' && 'Zenava provides instant, intelligent responses to customer inquiries around the clock. Unlike traditional chatbots, it understands context, emotion, and complex queries, delivering human-like interactions that resolve issues quickly and effectively. It seamlessly handles routine inquiries while escalating complex issues to human agents with full context.'}
                  {language === 'jp' && 'Zenavaは24時間体制で顧客の問い合わせに対して即座にインテリジェントな応答を提供します。従来のチャットボットとは異なり、文脈、感情、複雑なクエリを理解し、問題を迅速かつ効果的に解決する人間らしいインタラクションを提供します。ルーチン的な問い合わせをシームレスに処理し、複雑な問題は完全なコンテキストと共に人間の担当者にエスカレーションします。'}
                  {language === 'hk' && 'Zenava 24小時為客戶詢問提供即時、智能的回應。與傳統聊天機器人不同，它理解上下文、情感和複雜查詢，提供人性化互動，快速有效地解決問題。它無縫處理日常詢問，同時將複雜問題升級給具有完整上下文的人工代理。'}
                </p>
                <div class="flex space-x-4">
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>
                      {language === 'en' && 'Context Awareness'}
                      {language === 'jp' && '文脈認識'}
                      {language === 'hk' && '上下文感知'}
                    </span>
                  </div>
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>
                      {language === 'en' && 'Emotion Detection'}
                      {language === 'jp' && '感情検出'}
                      {language === 'hk' && '情感檢測'}
                    </span>
                  </div>
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>
                      {language === 'en' && 'Smart Escalation'}
                      {language === 'jp' && 'スマートエスカレーション'}
                      {language === 'hk' && '智能升級'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div class="bg-white p-8 rounded-xl shadow-lg" data-animate="slide-up">
                <div class="border-2 border-gray-100 rounded-lg p-6">
                  <h4 class="font-bold text-gray-900 mb-4">
                    {language === 'en' && 'Live Customer Interaction'}
                    {language === 'jp' && 'ライブカスタマーインタラクション'}
                    {language === 'hk' && '即時客戶互動'}
                  </h4>
                  
                  <div class="space-y-4">
                    <div class="flex items-start space-x-4">
                      <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <i class="fas fa-user text-white"></i>
                      </div>
                      <div class="flex-1">
                        <p class="bg-gray-100 rounded-lg p-3 mb-2">
                          {language === 'en' && '"My order is delayed, I\'m really anxious, when will it arrive?"'}
                          {language === 'jp' && '"注文が遅れています。とても不安です。いつ届きますか？"'}
                          {language === 'hk' && '"我的訂單遲了，很著急，什麼時候能到？"'}
                        </p>
                        <p class="text-xs text-gray-500">
                          {language === 'en' && 'Customer emotion: Anxious 😟'}
                          {language === 'jp' && '顧客の感情：不安 😟'}
                          {language === 'hk' && '客戶情緒：著急 😟'}
                        </p>
                      </div>
                    </div>
                    
                    <div class="flex items-start space-x-4">
                      <div class="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                        <i class="fas fa-robot text-white"></i>
                      </div>
                      <div class="flex-1">
                        <p class="bg-green-50 border border-green-200 rounded-lg p-3">
                          <strong>Zenava:</strong> 
                          {language === 'en' && 'I completely understand your concern. Let me immediately check the status of order #12345 for you...'}
                          {language === 'jp' && 'ご心配をおかけして申し訳ございません。すぐに注文番号#12345の状態を確認いたします...'}
                          {language === 'hk' && '我完全理解您的擔心。讓我立即為您查詢訂單 #12345 的狀態...'}
                        </p>
                        <p class="text-xs text-green-600 mt-2">✓ 情緒識別 ✓ 即時查詢 ✓ 同理回應</p>
                      </div>
                    </div>
                    
                    <div class="flex items-start space-x-4">
                      <div class="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                        <i class="fas fa-robot text-white"></i>
                      </div>
                      <div class="flex-1">
                        <p class="bg-green-50 border border-green-200 rounded-lg p-3">
                          {language === 'en' && 'Your order has been shipped and is expected to arrive tomorrow before 3 PM. I\'ve arranged priority delivery and sent you a real-time tracking link.'}
                          {language === 'jp' && 'ご注文商品は発送済みで、明日午後３時までにお届け予定です。優先配送を手配し、リアルタイム追跡リンクをお送りしました。'}
                          {language === 'hk' && '您的訂單已發貨，預計明天下午3點前送達。我已安排優先配送，並為您發送了實時追蹤鏈接。'}
                        </p>
                        <p class="text-xs text-green-600 mt-2">
                          {language === 'en' && '✓ Problem Solved ✓ Compensation Measure ✓ Follow-up'}
                          {language === 'jp' && '✓ 問題解決 ✓ 補償措置 ✓ フォローアップ'}
                          {language === 'hk' && '✓ 問題解決 ✓ 補償措施 ✓ 後續跟進'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Solution 2: Consistent Service Quality */}
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div class="order-2 lg:order-1 bg-white p-8 rounded-xl shadow-lg" data-animate="slide-up">
                <div class="space-y-4">
                  <h4 class="font-bold text-gray-900 mb-4">
                    {language === 'en' && 'Service Quality Metrics'}
                    {language === 'jp' && 'サービス品質メトリクス'}
                    {language === 'hk' && '服務品質指標'}
                  </h4>
                  
                  {/* Quality Metrics */}
                  <div class="space-y-3">
                    <div class="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div class="flex items-center">
                        <i class="fas fa-smile text-green-600 mr-3"></i>
                        <div>
                          <p class="font-medium">
                            {language === 'en' && 'Customer Satisfaction'}
                            {language === 'jp' && '顧客満足度'}
                            {language === 'hk' && '客戶滿意度'}
                          </p>
                          <p class="text-sm text-gray-600">
                            {language === 'en' && 'Average CSAT Score'}
                            {language === 'jp' && '平均CSAT スコア'}
                            {language === 'hk' && '平均CSAT評分'}
                          </p>
                        </div>
                      </div>
                      <div class="text-right">
                        <span class="text-2xl font-bold text-green-600">96%</span>
                      </div>
                    </div>
                    
                    <div class="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div class="flex items-center">
                        <i class="fas fa-clock text-blue-600 mr-3"></i>
                        <div>
                          <p class="font-medium">
                            {language === 'en' && 'Response Time'}
                            {language === 'jp' && '応答時間'}
                            {language === 'hk' && '響應時間'}
                          </p>
                          <p class="text-sm text-gray-600">
                            {language === 'en' && 'Average first response'}
                            {language === 'jp' && '平均初回応答'}
                            {language === 'hk' && '平均首次響應'}
                          </p>
                        </div>
                      </div>
                      <div class="text-right">
                        <span class="text-xl font-bold text-blue-600">&lt;30s</span>
                      </div>
                    </div>
                    
                    <div class="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <div class="flex items-center">
                        <i class="fas fa-check-circle text-purple-600 mr-3"></i>
                        <div>
                          <p class="font-medium">
                            {language === 'en' && 'Resolution Rate'}
                            {language === 'jp' && '解決率'}
                            {language === 'hk' && '解決率'}
                          </p>
                          <p class="text-sm text-gray-600">
                            {language === 'en' && 'First-contact resolution'}
                            {language === 'jp' && '初回コンタクト解決'}
                            {language === 'hk' && '首次接觸解決'}
                          </p>
                        </div>
                      </div>
                      <div class="text-right">
                        <span class="text-2xl font-bold text-purple-600">89%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="order-1 lg:order-2" data-animate="slide-up">
                <div class="flex items-center mb-6">
                  <div class="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mr-4">
                    <i class="fas fa-award text-emerald-600 text-xl"></i>
                  </div>
                  <h3 class="text-2xl font-bold text-gray-900">
                    {language === 'en' && 'Consistent Service Excellence'}
                    {language === 'jp' && '一貫したサービスの卓越性'}
                    {language === 'hk' && '一致的服務卓越性'}
                  </h3>
                </div>
                <h4 class="text-lg font-semibold text-emerald-600 mb-4">
                  {language === 'en' && 'Every Interaction Meets the Highest Standards'}
                  {language === 'jp' && 'すべてのインタラクションが最高水準を満たす'}
                  {language === 'hk' && '每次互動都達到最高標準'}
                </h4>
                <p class="text-gray-700 mb-6 leading-relaxed">
                  {language === 'en' && 'Zenava ensures consistent service quality by following standardized protocols, maintaining up-to-date knowledge bases, and applying uniform communication standards across all interactions. Every customer receives the same level of professional, accurate, and empathetic service regardless of when they contact you or which channel they use.'}
                  {language === 'jp' && 'Zenavaは標準化されたプロトコルに従い、最新の知識ベースを維持し、すべてのインタラクションで統一されたコミュニケーション基準を適用することで一貫したサービス品質を確保します。すべての顧客は、連絡を取る時期やどのチャネルを使用するかに関係なく、同じレベルの専門的で正確で共感的なサービスを受けます。'}
                  {language === 'hk' && 'Zenava 通過遵循標準化協議、維護最新知識庫和在所有互動中應用統一溝通標準來確保一致的服務質量。無論客戶何時聯繫您或使用哪個渠道，每位客戶都能獲得相同水準的專業、準確和同情的服務。'}
                </p>
                <div class="flex space-x-4">
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>
                      {language === 'en' && 'Standard Protocols'}
                      {language === 'jp' && '標準プロトコル'}
                      {language === 'hk' && '標準協議'}
                    </span>
                  </div>
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>
                      {language === 'en' && 'Uniform Quality'}
                      {language === 'jp' && '統一品質'}
                      {language === 'hk' && '統一質量'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Solution 3: Intelligent Escalation & Human Collaboration */}
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div data-animate="slide-up">
                <div class="flex items-center mb-6">
                  <div class="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mr-4">
                    <i class="fas fa-users text-teal-600 text-xl"></i>
                  </div>
                  <h3 class="text-2xl font-bold text-gray-900">
                    {language === 'en' && 'Smart Human-AI Collaboration'}
                    {language === 'jp' && 'スマート人間-AI コラボレーション'}
                    {language === 'hk' && '智能人機協作'}
                  </h3>
                </div>
                <h4 class="text-lg font-semibold text-teal-600 mb-4">
                  {language === 'en' && 'Seamless Handoff, Enhanced Productivity'}
                  {language === 'jp' && 'シームレスな引き継ぎ、生産性向上'}
                  {language === 'hk' && '無縫交接，生產力提升'}
                </h4>
                <p class="text-gray-700 mb-6 leading-relaxed">
                  {language === 'en' && 'Zenava intelligently determines when human intervention is needed and provides complete context transfer to human agents. It continues to assist human agents during complex interactions, suggesting responses, retrieving relevant information, and handling follow-up tasks automatically to maximize team efficiency.'}
                  {language === 'jp' && 'Zenavaは人間の介入が必要な時期を知的に判断し、人間の担当者への完全なコンテキスト転送を提供します。複雑なインタラクション中も人間の担当者をサポートし続け、応答提案、関連情報の取得、フォローアップタスクの自動処理を行い、チーム効率を最大化します。'}
                  {language === 'hk' && 'Zenava 智能判斷何時需要人工介入，並為人工代理提供完整的上下文轉移。它在複雜互動過程中繼續協助人工代理，建議回應、檢索相關信息並自動處理後續任務，以最大化團隊效率。'}
                </p>
                <div class="flex space-x-4">
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>
                      {language === 'en' && 'Context Transfer'}
                      {language === 'jp' && 'コンテキスト転送'}
                      {language === 'hk' && '上下文轉移'}
                    </span>
                  </div>
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>
                      {language === 'en' && 'Agent Assistance'}
                      {language === 'jp' && 'エージェント支援'}
                      {language === 'hk' && '代理協助'}
                    </span>
                  </div>
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>
                      {language === 'en' && 'Auto Follow-up'}
                      {language === 'jp' && '自動フォローアップ'}
                      {language === 'hk' && '自動跟進'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div class="bg-white p-8 rounded-xl shadow-lg" data-animate="slide-up">
                <h4 class="font-bold text-gray-900 mb-6">
                  {language === 'en' && 'Escalation Decision Matrix'}
                  {language === 'jp' && 'エスカレーション決定マトリックス'}
                  {language === 'hk' && '升級決策矩陣'}
                </h4>
                
                <div class="space-y-4">
                  <div class="flex items-start space-x-4">
                    <div class="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">AI</div>
                    <div class="flex-1">
                      <p class="font-medium text-gray-900">
                        {language === 'en' && 'Auto-Resolve (80%)'}
                        {language === 'jp' && '自動解決 (80%)'}
                        {language === 'hk' && '自動解決 (80%)'}
                      </p>
                      <p class="text-sm text-gray-600">
                        {language === 'en' && 'FAQ, order status, basic account changes'}
                        {language === 'jp' && 'FAQ、注文状況、基本アカウント変更'}
                        {language === 'hk' && 'FAQ、訂單狀態、基本帳戶更改'}
                      </p>
                    </div>
                  </div>
                  
                  <div class="flex items-start space-x-4">
                    <div class="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">↑</div>
                    <div class="flex-1">
                      <p class="font-medium text-gray-900">
                        {language === 'en' && 'Smart Escalation (15%)'}
                        {language === 'jp' && 'スマートエスカレーション (15%)'}
                        {language === 'hk' && '智能升級 (15%)'}
                      </p>
                      <p class="text-sm text-gray-600">
                        {language === 'en' && 'Complex issues, emotions detected, policy exceptions'}
                        {language === 'jp' && '複雑な問題、感情検出、ポリシー例外'}
                        {language === 'hk' && '複雜問題、情緒檢測、政策例外'}
                      </p>
                    </div>
                  </div>
                  
                  <div class="flex items-start space-x-4">
                    <div class="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">👥</div>
                    <div class="flex-1">
                      <p class="font-medium text-gray-900">
                        {language === 'en' && 'AI-Assisted Human (5%)'}
                        {language === 'jp' && 'AI支援人間 (5%)'}
                        {language === 'hk' && 'AI協助人工 (5%)'}
                      </p>
                      <p class="text-sm text-gray-600">
                        {language === 'en' && 'VIP customers, legal issues, escalations'}
                        {language === 'jp' && 'VIP顧客、法的問題、エスカレーション'}
                        {language === 'hk' && 'VIP客戶、法律問題、升級'}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div class="mt-6 p-4 bg-gradient-to-r from-teal-50 to-green-50 border border-teal-200 rounded-lg">
                  <div class="flex items-center justify-between">
                    <span class="text-sm font-medium text-gray-700">
                      {language === 'en' && 'Customer Satisfaction'}
                      {language === 'jp' && '顧客満足度'}
                      {language === 'hk' && '客戶滿意度'}
                    </span>
                    <span class="text-lg font-bold text-teal-600">96.5%</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div class="bg-gradient-to-r from-teal-600 to-green-600 h-2 rounded-full" style="width: 96.5%;"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Solution 4: Predictive Support & Proactive Service */}
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div class="order-2 lg:order-1 bg-white p-8 rounded-xl shadow-lg" data-animate="slide-up">
                <div class="space-y-6">
                  <h4 class="font-bold text-gray-900 mb-4">
                    {language === 'en' && 'Proactive Support Dashboard'}
                    {language === 'jp' && 'プロアクティブサポートダッシュボード'}
                    {language === 'hk' && '主動支援儀表板'}
                  </h4>
                  
                  {/* Proactive Actions */}
                  <div class="space-y-4">
                    <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div class="flex items-center justify-between mb-2">
                        <i class="fas fa-exclamation-triangle text-yellow-600 text-lg"></i>
                        <span class="text-xs font-bold text-yellow-600 bg-yellow-100 px-2 py-1 rounded">
                          {language === 'en' && 'PREDICTED'}
                          {language === 'jp' && '予測済み'}
                          {language === 'hk' && '已預測'}
                        </span>
                      </div>
                      <p class="text-sm font-medium text-gray-900">
                        {language === 'en' && 'Shipping Delay Alert'}
                        {language === 'jp' && '配送遅延アラート'}
                        {language === 'hk' && '運送延遲警報'}
                      </p>
                      <p class="text-xs text-gray-600">
                        {language === 'en' && 'Customer will be notified before they ask'}
                        {language === 'jp' && '顧客が問い合わせる前に通知'}
                        {language === 'hk' && '在客戶詢問前主動通知'}
                      </p>
                    </div>
                    
                    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div class="flex items-center justify-between mb-2">
                        <i class="fas fa-lightbulb text-blue-600 text-lg"></i>
                        <span class="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded">
                          {language === 'en' && 'SUGGESTED'}
                          {language === 'jp' && '提案済み'}
                          {language === 'hk' && '已建議'}
                        </span>
                      </div>
                      <p class="text-sm font-medium text-gray-900">
                        {language === 'en' && 'Usage Optimization Tips'}
                        {language === 'jp' && '使用最適化のヒント'}
                        {language === 'hk' && '使用優化建議'}
                      </p>
                      <p class="text-xs text-gray-600">
                        {language === 'en' && 'Based on usage patterns analysis'}
                        {language === 'jp' && '使用パターン分析に基づく'}
                        {language === 'hk' && '基於使用模式分析'}
                      </p>
                    </div>
                    
                    <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div class="flex items-center justify-between mb-2">
                        <i class="fas fa-heart text-green-600 text-lg"></i>
                        <span class="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded">
                          {language === 'en' && 'AUTOMATED'}
                          {language === 'jp' && '自動化済み'}
                          {language === 'hk' && '已自動化'}
                        </span>
                      </div>
                      <p class="text-sm font-medium text-gray-900">
                        {language === 'en' && 'Loyalty Reward Notification'}
                        {language === 'jp' && 'ロイヤルティ報酬通知'}
                        {language === 'hk' && '忠誠度獎勵通知'}
                      </p>
                      <p class="text-xs text-gray-600">
                        {language === 'en' && 'Milestone achievement celebration'}
                        {language === 'jp' && 'マイルストーン達成の祝福'}
                        {language === 'hk' && '里程碑成就慶祝'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="order-1 lg:order-2" data-animate="slide-up">
                <div class="flex items-center mb-6">
                  <div class="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
                    <i class="fas fa-crystal-ball text-indigo-600 text-xl"></i>
                  </div>
                  <h3 class="text-2xl font-bold text-gray-900">
                    {language === 'en' && 'Predictive & Proactive Support'}
                    {language === 'jp' && '予測・プロアクティブサポート'}
                    {language === 'hk' && '預測性主動支援'}
                  </h3>
                </div>
                <h4 class="text-lg font-semibold text-indigo-600 mb-4">
                  {language === 'en' && 'Solve Problems Before They Occur'}
                  {language === 'jp' && '問題が発生する前に解決'}
                  {language === 'hk' && '在問題發生前就解決'}
                </h4>
                <p class="text-gray-700 mb-6 leading-relaxed">
                  {language === 'en' && 'Zenava analyzes patterns in customer behavior, system performance, and historical data to predict potential issues and proactively address them. It sends preventive notifications, suggests optimizations, and automatically implements solutions before customers even realize there might be a problem, creating an exceptionally smooth user experience.'}
                  {language === 'jp' && 'Zenavaは顧客行動、システムパフォーマンス、履歴データのパターンを分析し、潜在的な問題を予測してプロアクティブに対処します。予防通知を送信し、最適化を提案し、顧客が問題に気付く前に自動的にソリューションを実装し、極めてスムーズなユーザー体験を創出します。'}
                  {language === 'hk' && 'Zenava 分析客戶行為、系統性能和歷史數據的模式，預測潛在問題並主動解決。它發送預防性通知，建議優化，並在客戶意識到可能存在問題之前自動實施解決方案，創造極其流暢的用戶體驗。'}
                </p>
                <div class="flex space-x-4">
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>
                      {language === 'en' && 'Pattern Analysis'}
                      {language === 'jp' && 'パターン分析'}
                      {language === 'hk' && '模式分析'}
                    </span>
                  </div>
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>
                      {language === 'en' && 'Preventive Actions'}
                      {language === 'jp' && '予防措置'}
                      {language === 'hk' && '預防措施'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI & Benefits Section */}
      <section class="py-20 bg-gradient-to-br from-green-600 to-emerald-600 text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16" data-animate="fade-in">
            <h2 class="text-3xl md:text-4xl font-bold mb-4">
              {language === 'en' && 'Customer Service ROI Results'}
              {language === 'jp' && 'カスタマーサービス ROI 結果'}
              {language === 'hk' && '客戶服務投入回報實證'}
            </h2>
            <p class="text-xl opacity-90">
              {language === 'en' && 'Measurable impact on customer satisfaction and operational efficiency'}
              {language === 'jp' && '顧客満足度と運営効率への測定可能な影響'}
              {language === 'hk' && '客戶滿意度和運營效率的可測量影響'}
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div class="text-center bg-white/10 backdrop-blur-sm rounded-xl p-8" data-animate="slide-up">
              <div class="text-4xl md:text-5xl font-bold mb-2">96%</div>
              <p class="text-lg opacity-90">
                {language === 'en' && 'Customer Satisfaction'}
                {language === 'jp' && '顧客満足度'}
                {language === 'hk' && '客戶滿意度'}
              </p>
            </div>
            
            <div class="text-center bg-white/10 backdrop-blur-sm rounded-xl p-8" data-animate="slide-up" style="animation-delay: 0.1s;">
              <div class="text-4xl md:text-5xl font-bold mb-2">-70%</div>
              <p class="text-lg opacity-90">
                {language === 'en' && 'Response Time'}
                {language === 'jp' && '応答時間'}
                {language === 'hk' && '響應時間'}
              </p>
            </div>
            
            <div class="text-center bg-white/10 backdrop-blur-sm rounded-xl p-8" data-animate="slide-up" style="animation-delay: 0.2s;">
              <div class="text-4xl md:text-5xl font-bold mb-2">+200%</div>
              <p class="text-lg opacity-90">
                {language === 'en' && 'Agent Productivity'}
                {language === 'jp' && 'エージェント生産性'}
                {language === 'hk' && '代理生產力'}
              </p>
            </div>
            
            <div class="text-center bg-white/10 backdrop-blur-sm rounded-xl p-8" data-animate="slide-up" style="animation-delay: 0.3s;">
              <div class="text-4xl md:text-5xl font-bold mb-2">-55%</div>
              <p class="text-lg opacity-90">
                {language === 'en' && 'Support Costs'}
                {language === 'jp' && 'サポートコスト'}
                {language === 'hk' && '支援成本'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section class="py-20 bg-gray-900 text-white">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 class="text-3xl md:text-4xl font-bold mb-6" data-animate="fade-in">
            {language === 'en' && 'Ready to Transform Customer Service?'}
            {language === 'jp' && 'カスタマーサービスを変革する準備はできていますか？'}
            {language === 'hk' && '準備好變革客戶服務了嗎？'}
          </h2>
          <p class="text-xl mb-8 opacity-90" data-animate="fade-in">
            {language === 'en' && 'Deliver exceptional experiences with AI-powered customer support'}
            {language === 'jp' && 'AI駆動のカスタマーサポートで優れた体験を提供'}
            {language === 'hk' && '用AI驅動的客戶支援提供卓越體驗'}
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center" data-animate="slide-up">
            <button class="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
              <i class="fas fa-calendar-alt mr-2"></i>
              {language === 'en' && 'Schedule Demo'}
              {language === 'jp' && 'デモ予約'}
              {language === 'hk' && '預約演示'}
            </button>
            <button class="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300">
              <i class="fas fa-info-circle mr-2"></i>
              {language === 'en' && 'Learn More'}
              {language === 'jp' && '詳細情報'}
              {language === 'hk' && '了解更多'}
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}