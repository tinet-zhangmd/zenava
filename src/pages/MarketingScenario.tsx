import { Language, getTranslation, t } from '../utils/i18n.js'

interface MarketingScenarioProps {
  language: Language
}

export function MarketingScenario({ language }: MarketingScenarioProps) {
  const translations = getTranslation(language)

  return (
    <div class="min-h-screen">
      {/* Hero Banner */}
      <section class="relative py-20 lg:py-32 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 overflow-hidden">
        {/* Background Pattern */}
        <div class="absolute inset-0 opacity-30">
          <div class="absolute inset-0" style="background-image: radial-gradient(circle, rgba(147, 51, 234, 0.1) 1px, transparent 1px); background-size: 40px 40px;"></div>
        </div>
        
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6" data-animate="fade-in">
              <span class="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {t(translations, 'scenarios.marketing.title')}
              </span>
            </h1>
            
            <p class="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed" data-animate="fade-in">
              {t(translations, 'scenarios.marketing.subtitle')}
            </p>
            
            <div class="flex flex-col sm:flex-row gap-4 justify-center" data-animate="slide-up">
              <button class="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                <i class="fas fa-play mr-2"></i>
                {language === 'en' && 'Watch Demo'}
                {language === 'jp' && 'デモを見る'}
                {language === 'hk' && '觀看演示'}
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
              {language === 'en' && 'Current Marketing Challenges'}
              {language === 'jp' && '現在のマーケティング課題'}
              {language === 'hk' && '企業營銷現狀'}
            </h2>
            <p class="text-xl text-gray-600">
              {language === 'en' && 'Common pain points in enterprise marketing today'}
              {language === 'jp' && '現在の企業マーケティングでよくある課題'}
              {language === 'hk' && '企業營銷面臨的常見挑戰'}
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Challenge 1: Conversion Rate */}
            <div class="bg-red-50 border-l-4 border-red-400 p-6 rounded-lg" data-animate="slide-up">
              <div class="flex items-center mb-4">
                <div class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
                  <i class="fas fa-chart-line-down text-red-600"></i>
                </div>
                <h3 class="text-lg font-bold text-gray-900">
                  {language === 'en' && 'Low Conversion Rate'}
                  {language === 'jp' && '転換率が低い'}
                  {language === 'hk' && '留資轉化率'}
                </h3>
              </div>
              <p class="text-gray-700 text-sm leading-relaxed">
                {language === 'en' && 'Untimely lead guidance, inconsistent messaging, and broken conversion paths cause massive lead loss.'}
                {language === 'jp' && 'リードガイダンスの遅れ、一貫性のないメッセージング、転換パスの断絶により大量のリード損失。'}
                {language === 'hk' && '用戶咨詢未能及時引導留資，話術不統一，轉化路徑斷裂，導致大量意向客戶流失。'}
              </p>
            </div>

            {/* Challenge 2: Lead Assignment */}
            <div class="bg-orange-50 border-l-4 border-orange-400 p-6 rounded-lg" data-animate="slide-up" style="animation-delay: 0.1s;">
              <div class="flex items-center mb-4">
                <div class="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                  <i class="fas fa-user-slash text-orange-600"></i>
                </div>
                <h3 class="text-lg font-bold text-gray-900">
                  {language === 'en' && 'Poor Lead Assignment'}
                  {language === 'jp' && 'リード配布の問題'}
                  {language === 'hk' && '線索分配與評級'}
                </h3>
              </div>
              <p class="text-gray-700 text-sm leading-relaxed">
                {language === 'en' && 'Lack of intelligent scoring and assignment mechanisms, wasting sales resources on low-potential leads.'}
                {language === 'jp' && 'インテリジェントなスコアリングと配布メカニズムの不足、営業リソースの浪費。'}
                {language === 'hk' && '缺乏智能打分與分配機制，銷售資源浪費，高潛客戶得不到及時跟進。'}
              </p>
            </div>

            {/* Challenge 3: Lead Reactivation */}
            <div class="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg" data-animate="slide-up" style="animation-delay: 0.2s;">
              <div class="flex items-center mb-4">
                <div class="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                  <i class="fas fa-clock text-yellow-600"></i>
                </div>
                <h3 class="text-lg font-bold text-gray-900">
                  {language === 'en' && 'Lost Lead Reactivation'}
                  {language === 'jp' && '失注リードの再活性化'}
                  {language === 'hk' && '戰敗線索難激活'}
                </h3>
              </div>
              <p class="text-gray-700 text-sm leading-relaxed">
                {language === 'en' && 'Silent leads remain untouched, lacking reactivation mechanisms and missing repeat purchase opportunities.'}
                {language === 'jp' && '静寂なリードへのアプローチ不足、再活性化メカニズムの欠如、再購入機会の逸失。'}
                {language === 'hk' && '沉寂線索無人觸達，缺乏喚醒機制，複購與二次轉化機會頻頻錯失。'}
              </p>
            </div>

            {/* Challenge 4: Data-Driven Strategy */}
            <div class="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg" data-animate="slide-up" style="animation-delay: 0.3s;">
              <div class="flex items-center mb-4">
                <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <i class="fas fa-database text-blue-600"></i>
                </div>
                <h3 class="text-lg font-bold text-gray-900">
                  {language === 'en' && 'Lack of Data Support'}
                  {language === 'jp' && 'データ支援不足'}
                  {language === 'hk' && '營銷策略缺乏數據支撐'}
                </h3>
              </div>
              <p class="text-gray-700 text-sm leading-relaxed">
                {language === 'en' && 'Marketing strategies lack data support, with blind targeting and unclear optimization direction.'}
                {language === 'jp' && 'マーケティング戦略のデータ支援不足、明確な最適化方向性のない盲目的ターゲティング。'}
                {language === 'hk' && '客戶行為與互動數據未被充分利用，營銷內容與節奏盲打，優化方向不清。'}
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
              {language === 'en' && 'Zenava Marketing Solutions'}
              {language === 'jp' && 'Zenavaマーケティングソリューション'}
              {language === 'hk' && 'Zenava營銷解決方案'}
            </h2>
            <p class="text-xl text-gray-600">
              {language === 'en' && 'Improve lead conversion rates, reduce comprehensive customer acquisition costs'}
              {language === 'jp' && 'リード転換率の向上、包括的顧客獲得コストの削減'}
              {language === 'hk' && '提升線索轉化率，降低綜合獲客成本'}
            </p>
          </div>

          <div class="space-y-16">
            {/* Solution 1: Intelligent Lead Guidance */}
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div data-animate="slide-up">
                <div class="flex items-center mb-6">
                  <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                    <i class="fas fa-brain text-purple-600 text-xl"></i>
                  </div>
                  <h3 class="text-2xl font-bold text-gray-900">
                    {language === 'en' && 'Intelligent Lead Guidance'}
                    {language === 'jp' && 'インテリジェントなリードガイダンス'}
                    {language === 'hk' && '智能引導留資'}
                  </h3>
                </div>
                <h4 class="text-lg font-semibold text-purple-600 mb-4">
                  {language === 'en' && '24/7 Response, Reduced Manual Reception Costs'}
                  {language === 'jp' && '24時間対応、人的接客コストの削減'}
                  {language === 'hk' && '全時域響應上級，降低人工接待成本'}
                </h4>
                <p class="text-gray-700 mb-6 leading-relaxed">
                  {language === 'en' && 'Zenava can judge user intent based on conversations, avoid repeated input and waiting, achieving smoother consultation experiences. Whether during work hours or off-hours, Zenava responds 24/7 online, effectively capturing business opportunities from advertising and organic traffic. Lead information automatically enters the lead pool, combined with tags and intent information for subsequent intelligent assignment and re-marketing touchpoints.'}
                  {language === 'jp' && 'Zenavaは対話に基づいてユーザーの意図を判断し、繰り返し入力や待機を避け、よりスムーズな相談体験を実現します。勤務時間内外を問わず、Zenavaは24時間365日オンラインで対応し、広告や自然流入からのビジネスチャンスを効果的にキャッチします。リード情報は自動的にリードプールに入り、タグや意図情報と組み合わせて、後続のインテリジェントな配布や再マーケティング接点を実現します。'}
                  {language === 'hk' && 'Zenava 可基於用戶對話判斷意圖，避免訪客重複輸入與等待，實現更流暢的咨詢體驗。無論是工作時間還是非工作時間，Zenava 均可 7x24 小時在線響應，有效承接廣告流量和自然流量帶來的商機。留資信息自動進入線索池，結合標簽、意圖等信息實現後續智能分配與再營銷觸達。'}
                </p>
                <div class="flex space-x-4">
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>
                      {language === 'en' && 'Intent Recognition'}
                      {language === 'jp' && '意図認識'}
                      {language === 'hk' && '意圖識別'}
                    </span>
                  </div>
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>
                      {language === 'en' && 'Smart Forms'}
                      {language === 'jp' && 'スマートフォーム'}
                      {language === 'hk' && '智能表單'}
                    </span>
                  </div>
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>24/7</span>
                  </div>
                </div>
              </div>
              
              <div class="bg-white p-8 rounded-xl shadow-lg" data-animate="slide-up">
                <div class="border-2 border-gray-100 rounded-lg p-6">
                  <div class="flex items-start space-x-4">
                    <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <i class="fas fa-user text-white"></i>
                    </div>
                    <div class="flex-1">
                      <p class="bg-gray-100 rounded-lg p-3 mb-3">
                        "我想了解您們的AI產品價格和功能"
                      </p>
                    </div>
                  </div>
                  
                  <div class="flex items-start space-x-4 mt-4">
                    <div class="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                      <i class="fas fa-robot text-white"></i>
                    </div>
                    <div class="flex-1">
                      <p class="bg-purple-50 border border-purple-200 rounded-lg p-3 mb-3">
                        <strong>Zenava:</strong> 
                        {language === 'en' && 'I\'ve identified your interest in AI products. To provide you with the most suitable solution, please fill in the following information:'}
                        {language === 'jp' && 'AI製品へのあなたの関心を識別しました。最適なソリューションを提供するため、以下の情報を入力してください：'}
                        {language === 'hk' && '我已經識別到您對AI產品的興趣。為了給您最合適的方案，請填寫以下信息：'}
                      </p>
                      <div class="bg-white border-2 border-purple-200 rounded-lg p-4 mt-2">
                        <div class="grid grid-cols-2 gap-3 text-sm">
                          <input type="text" placeholder={
                            language === 'en' ? 'Company Name' :
                            language === 'jp' ? '会社名' :
                            '公司名稱'
                          } class="border border-gray-300 rounded px-3 py-2" />
                          <input type="text" placeholder={
                            language === 'en' ? 'Contact Person' :
                            language === 'jp' ? '担当者' :
                            '聯繫人'
                          } class="border border-gray-300 rounded px-3 py-2" />
                          <input type="text" placeholder={
                            language === 'en' ? 'Phone Number' :
                            language === 'jp' ? '電話番号' :
                            '手機號碼'
                          } class="border border-gray-300 rounded px-3 py-2" />
                          <select class="border border-gray-300 rounded px-3 py-2">
                            <option>
                              {language === 'en' ? 'Company Size' :
                               language === 'jp' ? '企業規模' :
                               '企業規模'}
                            </option>
                            <option>
                              {language === 'en' ? 'Under 50 employees' :
                               language === 'jp' ? '50人以下' :
                               '50人以下'}
                            </option>
                            <option>
                              {language === 'en' ? '50-200 employees' :
                               language === 'jp' ? '50-200人' :
                               '50-200人'}
                            </option>
                            <option>
                              {language === 'en' ? 'Over 200 employees' :
                               language === 'jp' ? '200人以上' :
                               '200人以上'}
                            </option>
                          </select>
                        </div>
                        <button class="w-full mt-3 bg-purple-600 text-white py-2 rounded font-medium">
                          {language === 'en' && 'Get Custom Solution'}
                          {language === 'jp' && 'カスタムソリューションを取得'}
                          {language === 'hk' && '獲取專屬方案'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Solution 2: Lead Scoring & Assignment */}
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div class="order-2 lg:order-1 bg-white p-8 rounded-xl shadow-lg" data-animate="slide-up">
                <div class="space-y-4">
                  <h4 class="font-bold text-gray-900 mb-4">
                    {language === 'en' && 'Lead Scoring Process'}
                    {language === 'jp' && 'リードスコアリングプロセス'}
                    {language === 'hk' && '線索評級流程'}
                  </h4>
                  
                  {/* Scoring Steps */}
                  <div class="space-y-3">
                    <div class="flex items-center p-3 bg-blue-50 rounded-lg">
                      <div class="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">1</div>
                      <div class="flex-1">
                        <p class="font-medium">
                          {language === 'en' && 'Conversation Analysis'}
                          {language === 'jp' && '会話分析'}
                          {language === 'hk' && '對話內容分析'}
                        </p>
                        <p class="text-sm text-gray-600">
                          {language === 'en' && 'Intent, urgency, budget signals'}
                          {language === 'jp' && '意図、緊急性、予算シグナル'}
                          {language === 'hk' && '意圖、緊急程度、預算信號'}
                        </p>
                      </div>
                      <div class="text-right">
                        <span class="text-lg font-bold text-blue-600">85分</span>
                      </div>
                    </div>
                    
                    <div class="flex items-center p-3 bg-green-50 rounded-lg">
                      <div class="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">2</div>
                      <div class="flex-1">
                        <p class="font-medium">
                          {language === 'en' && 'Source Channel'}
                          {language === 'jp' && 'ソースチャネル'}
                          {language === 'hk' && '來源渠道'}
                        </p>
                        <p class="text-sm text-gray-600">
                          {language === 'en' && 'Paid ads, organic search, referral'}
                          {language === 'jp' && '有料広告、オーガニック検索、紹介'}
                          {language === 'hk' && '付費廣告、自然搜索、轉介'}
                        </p>
                      </div>
                      <div class="text-right">
                        <span class="text-lg font-bold text-green-600">+10分</span>
                      </div>
                    </div>
                    
                    <div class="flex items-center p-3 bg-purple-50 rounded-lg">
                      <div class="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">3</div>
                      <div class="flex-1">
                        <p class="font-medium">
                          {language === 'en' && 'Smart Assignment'}
                          {language === 'jp' && 'スマート配布'}
                          {language === 'hk' && '智能分配'}
                        </p>
                        <p class="text-sm text-gray-600">
                          {language === 'en' && 'High score → Senior sales'}
                          {language === 'jp' && '高得点 → シニア営業'}
                          {language === 'hk' && '高分 → 資深銷售'}
                        </p>
                      </div>
                      <div class="text-right">
                        <span class="text-lg font-bold text-purple-600">95分</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="order-1 lg:order-2" data-animate="slide-up">
                <div class="flex items-center mb-6">
                  <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <i class="fas fa-chart-bar text-blue-600 text-xl"></i>
                  </div>
                  <h3 class="text-2xl font-bold text-gray-900">
                    {language === 'en' && 'Lead Scoring & Intelligent Assignment'}
                    {language === 'jp' && 'リードスコアリング&インテリジェント配布'}
                    {language === 'hk' && '線索評級與智能分配'}
                  </h3>
                </div>
                <h4 class="text-lg font-semibold text-blue-600 mb-4">
                  {language === 'en' && 'Accelerate Conversion, Seize Closing Opportunities'}
                  {language === 'jp' && '転換加速、成約先機の獲得'}
                  {language === 'hk' && '加速轉化，搶占成交先機'}
                </h4>
                <p class="text-gray-700 mb-6 leading-relaxed">
                  {language === 'en' && 'Based on conversation content, source channels, and past interaction behavioral data, Zenava automatically builds customer profiles for more precise lead understanding and identification. The system evaluates customer intent levels through scoring mechanisms, instantly pushing high-intent leads to sales personnel while low-intent leads enter continuous nurturing paths, improving overall conversion efficiency. From lead identification to assignment, the entire process is intelligentized, shortening response chains, avoiding lead loss, and significantly improving first-touch success rates and customer satisfaction.'}
                  {language === 'jp' && '対話内容、ソースチャネル、過去のインタラクション行動データに基づき、Zenavaは自動的に顧客プロファイルを構築し、より精密なリード理解と識別を実現します。システムはスコアリングメカニズムを通じてリアルタイムで顧客意向レベルを評価し、高意向リードを営業担当者に即座にプッシュし、低意向リードは継続的な育成パスに入り、全体の転換効率を向上させます。リード識別から配布まで全プロセスがインテリジェント化され、応答チェーンを短縮し、リード流失を避け、初回接触成功率と顧客満足度を大幅に向上させます。'}
                  {language === 'hk' && 'Zenava 基於對話內容、來源渠道、過往互動等行為數據，自動構建客戶畫像，實現更精準的線索理解與識別。系統通過評分機制實時評估客戶意向等級，高意向線索即時推送給銷售人員，低意向線索則進入持續培育路徑，提升整體轉化效率。從線索識別到分配全流程智能化，縮短響應鏈路，避免線索流失，顯著提升首輪觸達成功率與客戶滿意度。'}
                </p>
                <div class="flex space-x-4">
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>
                      {language === 'en' && 'Auto Scoring'}
                      {language === 'jp' && '自動スコアリング'}
                      {language === 'hk' && '自動打分'}
                    </span>
                  </div>
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>
                      {language === 'en' && 'Smart Routing'}
                      {language === 'jp' && 'スマートルーティング'}
                      {language === 'hk' && '智能分配'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Solution 3: Lead Reactivation */}
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div data-animate="slide-up">
                <div class="flex items-center mb-6">
                  <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                    <i class="fas fa-redo text-orange-600 text-xl"></i>
                  </div>
                  <h3 class="text-2xl font-bold text-gray-900">
                    {language === 'en' && 'Reactivate Lost Leads'}
                    {language === 'jp' && '失注リードの再活性化'}
                    {language === 'hk' && '激活戰敗線索'}
                  </h3>
                </div>
                <h4 class="text-lg font-semibold text-orange-600 mb-4">
                  {language === 'en' && 'Reawaken Silent Customers'}
                  {language === 'jp' && '沈黙顧客の再覚醒'}
                  {language === 'hk' && '喚醒沉默客戶'}
                </h4>
                <p class="text-gray-700 mb-6 leading-relaxed">
                  {language === 'en' && 'Based on customer interest points and past demands, generate personalized conversation content, combined with multi-round, multi-channel reactivation strategies to effectively improve customer reactivation rates. Combine holiday nodes, new product launches, limited-time activities and other triggers to activate mechanisms, seize key marketing opportunities, and improve the possibility of customer re-engagement and conversion.'}
                  {language === 'jp' && '顧客の関心点と過去の需要に基づき、個別化された対話内容を生成し、多ラウンド、多チャネル再活性化戦略と組み合わせて顧客再活性化率を効果的に向上させます。祝日ノード、新製品発売、期間限定活動などのトリガーを組み合わせて活性化メカニズムを起動し、重要なマーケティング機会を捉え、顧客の再エンゲージメントと転換の可能性を向上させます。'}
                  {language === 'hk' && '基於客戶興趣點和過往訴求，生成個性化對話內容，結合多輪、多通道喚醒策略，有效提升客戶喚醒率。結合節日節點、產品上新、限時活動等觸發激活機制，把握關鍵營銷時機，提升客戶重新互動和轉化的可能性。'}
                </p>
                <div class="flex space-x-4">
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>
                      {language === 'en' && 'Personalized Content'}
                      {language === 'jp' && 'パーソナライズされたコンテンツ'}
                      {language === 'hk' && '個性化內容'}
                    </span>
                  </div>
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>
                      {language === 'en' && 'Multi-Channel'}
                      {language === 'jp' && 'マルチチャネル'}
                      {language === 'hk' && '多通道'}
                    </span>
                  </div>
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>
                      {language === 'en' && 'Smart Timing'}
                      {language === 'jp' && 'スマートタイミング'}
                      {language === 'hk' && '智能時機'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div class="bg-white p-8 rounded-xl shadow-lg" data-animate="slide-up">
                <h4 class="font-bold text-gray-900 mb-6">
                  {language === 'en' && 'Customer Journey Reactivation'}
                  {language === 'jp' && 'カスタマージャーニー再活性化'}
                  {language === 'hk' && '客戶旅程喚醒'}
                </h4>
                
                <div class="space-y-4">
                  <div class="flex items-start space-x-4">
                    <div class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-bold mt-1">1</div>
                    <div>
                      <p class="font-medium text-gray-900">
                        {language === 'en' && 'Silent Customer Identification'}
                        {language === 'jp' && '沈黙顧客の識別'}
                        {language === 'hk' && '沉默客戶識別'}
                      </p>
                      <p class="text-sm text-gray-600">
                        {language === 'en' && 'Auto-detect customers with no activity for 30+ days'}
                        {language === 'jp' && '30日以上活動のない顧客を自動検出'}
                        {language === 'hk' && '自動檢測30+天無活動客戶'}
                      </p>
                    </div>
                  </div>
                  
                  <div class="flex items-start space-x-4">
                    <div class="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-sm font-bold mt-1">2</div>
                    <div>
                      <p class="font-medium text-gray-900">
                        {language === 'en' && 'Interest Analysis'}
                        {language === 'jp' && '関心分析'}
                        {language === 'hk' && '興趣分析'}
                      </p>
                      <p class="text-sm text-gray-600">
                        {language === 'en' && 'Analyze past interactions and preferences'}
                        {language === 'jp' && '過去のインタラクションと嗜好を分析'}
                        {language === 'hk' && '分析過往互動和偏好'}
                      </p>
                    </div>
                  </div>
                  
                  <div class="flex items-start space-x-4">
                    <div class="w-8 h-8 bg-orange-200 rounded-full flex items-center justify-center text-sm font-bold mt-1">3</div>
                    <div>
                      <p class="font-medium text-gray-900">
                        {language === 'en' && 'Personalized Outreach'}
                        {language === 'jp' && 'パーソナライズされたアウトリーチ'}
                        {language === 'hk' && '個性化外展'}
                      </p>
                      <p class="text-sm text-gray-600">
                        {language === 'en' && 'SMS, email, or call with tailored message'}
                        {language === 'jp' && 'カスタマイズされたメッセージでSMS、メール、通話'}
                        {language === 'hk' && '短信、郵件或電話個性化信息'}
                      </p>
                    </div>
                  </div>
                  
                  <div class="flex items-start space-x-4">
                    <div class="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">4</div>
                    <div>
                      <p class="font-medium text-gray-900">
                        {language === 'en' && 'Re-engagement Success'}
                        {language === 'jp' && '再エンゲージメント成功'}
                        {language === 'hk' && '重新互動成功'}
                      </p>
                      <p class="text-sm text-gray-600">
                        {language === 'en' && 'Customer responds and enters new conversion path'}
                        {language === 'jp' && '顧客が応答し、新しい転換パスに入る'}
                        {language === 'hk' && '客戶響應並進入新轉化路徑'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Solution 4: Conversation Analysis */}
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div class="order-2 lg:order-1 bg-white p-8 rounded-xl shadow-lg" data-animate="slide-up">
                <div class="space-y-6">
                  <h4 class="font-bold text-gray-900 mb-4">
                    {language === 'en' && 'Conversation Analytics Dashboard'}
                    {language === 'jp' && '会話分析ダッシュボード'}
                    {language === 'hk' && '對話分析儀表板'}
                  </h4>
                  
                  {/* Analytics Cards */}
                  <div class="grid grid-cols-2 gap-4">
                    <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div class="flex items-center justify-between">
                        <i class="fas fa-comments text-green-600 text-2xl"></i>
                        <span class="text-2xl font-bold text-green-600">92%</span>
                      </div>
                      <p class="text-sm text-gray-700 mt-2">
                        {language === 'en' && 'High-converting phrases'}
                        {language === 'jp' && '高転換フレーズ'}
                        {language === 'hk' && '高轉化話術'}
                      </p>
                    </div>
                    
                    <div class="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div class="flex items-center justify-between">
                        <i class="fas fa-exclamation-triangle text-red-600 text-2xl"></i>
                        <span class="text-2xl font-bold text-red-600">8%</span>
                      </div>
                      <p class="text-sm text-gray-700 mt-2">
                        {language === 'en' && 'Negative emotion signals'}
                        {language === 'jp' && '負の感情シグナル'}
                        {language === 'hk' && '負面情緒信號'}
                      </p>
                    </div>
                    
                    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div class="flex items-center justify-between">
                        <i class="fas fa-clock text-blue-600 text-2xl"></i>
                        <span class="text-lg font-bold text-blue-600">3.2min</span>
                      </div>
                      <p class="text-sm text-gray-700 mt-2">
                        {language === 'en' && 'Avg. conversion time'}
                        {language === 'jp' && '平均転換時間'}
                        {language === 'hk' && '平均轉化時間'}
                      </p>
                    </div>
                    
                    <div class="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <div class="flex items-center justify-between">
                        <i class="fas fa-lightbulb text-purple-600 text-2xl"></i>
                        <span class="text-lg font-bold text-purple-600">15+</span>
                      </div>
                      <p class="text-sm text-gray-700 mt-2">
                        {language === 'en' && 'Optimization suggestions'}
                        {language === 'jp' && '最適化提案'}
                        {language === 'hk' && '優化建議'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="order-1 lg:order-2" data-animate="slide-up">
                <div class="flex items-center mb-6">
                  <div class="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
                    <i class="fas fa-chart-line text-indigo-600 text-xl"></i>
                  </div>
                  <h3 class="text-2xl font-bold text-gray-900">
                    {language === 'en' && 'Conversation Analysis Drives Optimization'}
                    {language === 'jp' && '会話分析による最適化推進'}
                    {language === 'hk' && '會話分析驅動優化'}
                  </h3>
                </div>
                <h4 class="text-lg font-semibold text-indigo-600 mb-4">
                  {language === 'en' && 'Find Key Conversion Scripts'}
                  {language === 'jp' && '重要な転換スクリプトの発見'}
                  {language === 'hk' && '找到關鍵轉化話術'}
                </h4>
                <p class="text-gray-700 mb-6 leading-relaxed">
                  {language === 'en' && 'Automatically extract high-quality scripts and mark contextual scenarios, enabling marketing and customer service teams to quickly update and optimize unified script libraries, achieving transformation from "individual experience" to "organizational capability". Can identify customer negative emotional expressions, rejection signals and churn warning signs, support timely strategy adjustments or trigger manual intervention to reduce customer churn risks.'}
                  {language === 'jp' && '高品質なスクリプトを自動抽出し、文脈シナリオをマークし、マーケティングと顧客サービスチームが統一スクリプトライブラリを迅速に更新・最適化できるようにし、「個人経験」から「組織能力」への飛躍を実現します。顧客の負の感情表現、拒否シグナル、離脱予兆を識別し、タイムリーな戦略調整や手動介入のトリガーをサポートし、顧客離脱リスクを削減します。'}
                  {language === 'hk' && '自動沉澱優質話術並標記上下文語境，支持營銷與客服團隊快速更新和優化統一話術庫，實現從「個人經驗」到「組織能力」的躍遷。可識別客戶負面情緒表達、拒絕信號及流失征兆，支持及時調整策略或觸發人工介入，降低客戶流失風險。'}
                </p>
                <div class="flex space-x-4">
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
                      {language === 'en' && 'Emotion Detection'}
                      {language === 'jp' && '感情検出'}
                      {language === 'hk' && '情緒識別'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI & Benefits Section */}
      <section class="py-20 bg-gradient-to-br from-purple-600 to-pink-600 text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16" data-animate="fade-in">
            <h2 class="text-3xl md:text-4xl font-bold mb-4">
              {language === 'en' && 'Proven Marketing ROI'}
              {language === 'jp' && '実証されたマーケティングROI'}
              {language === 'hk' && '營銷投入回報實證'}
            </h2>
            <p class="text-xl opacity-90">
              {language === 'en' && 'Real results from enterprise customers'}
              {language === 'jp' && '企業顧客からの実際の結果'}
              {language === 'hk' && '企業客戶真實效果'}
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="text-center bg-white/10 backdrop-blur-sm rounded-xl p-8" data-animate="slide-up">
              <div class="text-4xl md:text-5xl font-bold mb-2">+85%</div>
              <p class="text-lg opacity-90">
                {language === 'en' && 'Lead Conversion Rate'}
                {language === 'jp' && 'リード転換率'}
                {language === 'hk' && '線索轉化率'}
              </p>
            </div>
            
            <div class="text-center bg-white/10 backdrop-blur-sm rounded-xl p-8" data-animate="slide-up" style="animation-delay: 0.1s;">
              <div class="text-4xl md:text-5xl font-bold mb-2">-60%</div>
              <p class="text-lg opacity-90">
                {language === 'en' && 'Customer Acquisition Cost'}
                {language === 'jp' && '顧客獲得コスト'}
                {language === 'hk' && '獲客成本'}
              </p>
            </div>
            
            <div class="text-center bg-white/10 backdrop-blur-sm rounded-xl p-8" data-animate="slide-up" style="animation-delay: 0.2s;">
              <div class="text-4xl md:text-5xl font-bold mb-2">24/7</div>
              <p class="text-lg opacity-90">
                {language === 'en' && 'Response Availability'}
                {language === 'jp' && '応答可用性'}
                {language === 'hk' && '響應可用性'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section class="py-20 bg-gray-900 text-white">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 class="text-3xl md:text-4xl font-bold mb-6" data-animate="fade-in">
            {language === 'en' && 'Ready to Transform Your Marketing?'}
            {language === 'jp' && 'マーケティングを変革する準備はできていますか？'}
            {language === 'hk' && '準備好變革您的營銷了嗎？'}
          </h2>
          <p class="text-xl mb-8 opacity-90" data-animate="fade-in">
            {language === 'en' && 'Start your AI-powered marketing transformation today'}
            {language === 'jp' && '今すぐAI駆動のマーケティング変革を始めましょう'}
            {language === 'hk' && '立即開始您的AI驅動營銷變革'}
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center" data-animate="slide-up">
            <button class="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
              <i class="fas fa-calendar-alt mr-2"></i>
              {language === 'en' && 'Schedule Demo'}
              {language === 'jp' && 'デモ予約'}
              {language === 'hk' && '預約演示'}
            </button>

          </div>
        </div>
      </section>
    </div>
  )
}