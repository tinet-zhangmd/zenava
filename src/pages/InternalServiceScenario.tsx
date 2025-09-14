import { Language, getTranslation, t } from '../utils/i18n.js'
import { TransformationCTA } from '../components/TransformationCTA.js'

interface InternalServiceScenarioProps {
  language: Language
}

export function InternalServiceScenario({ language }: InternalServiceScenarioProps) {
  const translations = getTranslation(language)

  return (
    <div class="min-h-screen">
      {/* Hero Banner */}
      <section class="relative py-20 lg:py-32 bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 overflow-hidden">
        {/* Background Pattern */}
        <div class="absolute inset-0 opacity-30">
          <div class="absolute inset-0" style="background-image: radial-gradient(circle, rgba(99, 102, 241, 0.1) 1px, transparent 1px); background-size: 40px 40px;"></div>
        </div>
        
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6" data-animate="fade-in">
              <span class="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {language === 'en' && 'Zenava Internal Service AI'}
                {language === 'jp' && 'Zenava 内部サービス AI'}
                {language === 'hk' && 'Zenava 內部服務 AI'}
              </span>
            </h1>
            
            <p class="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed" data-animate="fade-in">
              {language === 'en' && 'Empower your employees with intelligent internal support and streamlined operations'}
              {language === 'jp' && 'インテリジェントな内部サポートと合理化された運営で従業員をエンパワー'}
              {language === 'hk' && '以智能內部支援和流程化運營賦能您的員工'}
            </p>
            
            <div class="flex flex-col sm:flex-row gap-4 justify-center" data-animate="slide-up">
              <a href="#transformation-journey" class="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 inline-block">
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
              {language === 'en' && 'Internal Operations Challenges'}
              {language === 'jp' && '内部運営の課題'}
              {language === 'hk' && '內部運營挑戰'}
            </h2>
            <p class="text-xl text-gray-600">
              {language === 'en' && 'Common inefficiencies in internal business processes'}
              {language === 'jp' && '内部ビジネスプロセスでよくある非効率性'}
              {language === 'hk' && '內部業務流程的常見低效問題'}
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Challenge 1: Information Silos */}
            <div class="bg-red-50 border-l-4 border-red-400 p-6 rounded-lg" data-animate="slide-up">
              <div class="flex items-center mb-4">
                <div class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
                  <i class="fas fa-database text-red-600"></i>
                </div>
                <h3 class="text-lg font-bold text-gray-900">
                  {language === 'en' && 'Information Silos'}
                  {language === 'jp' && '情報サイロ'}
                  {language === 'hk' && '信息孤島'}
                </h3>
              </div>
              <p class="text-gray-700 text-sm leading-relaxed">
                {language === 'en' && 'Critical business information scattered across different systems, making it difficult for employees to find answers quickly.'}
                {language === 'jp' && '重要なビジネス情報が異なるシステムに分散しており、従業員が迅速に答えを見つけることが困難。'}
                {language === 'hk' && '關鍵業務信息分散在不同系統中，員工難以快速找到答案。'}
              </p>
            </div>

            {/* Challenge 2: Manual Processes */}
            <div class="bg-orange-50 border-l-4 border-orange-400 p-6 rounded-lg" data-animate="slide-up" style="animation-delay: 0.1s;">
              <div class="flex items-center mb-4">
                <div class="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                  <i class="fas fa-hand-paper text-orange-600"></i>
                </div>
                <h3 class="text-lg font-bold text-gray-900">
                  {language === 'en' && 'Manual Repetitive Tasks'}
                  {language === 'jp' && '手動繰り返しタスク'}
                  {language === 'hk' && '手動重複任務'}
                </h3>
              </div>
              <p class="text-gray-700 text-sm leading-relaxed">
                {language === 'en' && 'Time-consuming manual processes for routine requests like IT support, HR inquiries, and administrative tasks.'}
                {language === 'jp' && 'ITサポート、HR問い合わせ、管理タスクなどの日常的なリクエストに対する時間のかかる手動プロセス。'}
                {language === 'hk' && 'IT支援、HR查詢和行政任務等日常請求的耗時手動流程。'}
              </p>
            </div>

            {/* Challenge 3: Knowledge Management */}
            <div class="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg" data-animate="slide-up" style="animation-delay: 0.2s;">
              <div class="flex items-center mb-4">
                <div class="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                  <i class="fas fa-brain text-yellow-600"></i>
                </div>
                <h3 class="text-lg font-bold text-gray-900">
                  {language === 'en' && 'Knowledge Management'}
                  {language === 'jp' && 'ナレッジマネジメント'}
                  {language === 'hk' && '知識管理'}
                </h3>
              </div>
              <p class="text-gray-700 text-sm leading-relaxed">
                {language === 'en' && 'Institutional knowledge trapped in individual minds, leading to dependency on specific employees and knowledge loss.'}
                {language === 'jp' && '組織的知識が個人の頭脳に閉じ込められ、特定の従業員への依存と知識の喪失を招く。'}
                {language === 'hk' && '機構知識被困在個人腦中，導致對特定員工的依賴和知識流失。'}
              </p>
            </div>

            {/* Challenge 4: Employee Efficiency */}
            <div class="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg" data-animate="slide-up" style="animation-delay: 0.3s;">
              <div class="flex items-center mb-4">
                <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <i class="fas fa-users-cog text-blue-600"></i>
                </div>
                <h3 class="text-lg font-bold text-gray-900">
                  {language === 'en' && 'Low Employee Efficiency'}
                  {language === 'jp' && '従業員効率の低さ'}
                  {language === 'hk' && '員工效率低'}
                </h3>
              </div>
              <p class="text-gray-700 text-sm leading-relaxed">
                {language === 'en' && 'Employees spend excessive time on administrative tasks instead of focusing on high-value strategic work.'}
                {language === 'jp' && '従業員が高価値な戦略的業務に集中する代わりに、管理業務に過度の時間を費やす。'}
                {language === 'hk' && '員工在行政任務上花費過多時間，而非專注於高價值戰略工作。'}
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
              {language === 'en' && 'Zenava Internal Service Solutions'}
              {language === 'jp' && 'Zenava 内部サービスソリューション'}
              {language === 'hk' && 'Zenava 內部服務解決方案'}
            </h2>
            <p class="text-xl text-gray-600">
              {language === 'en' && 'Transform internal operations with intelligent automation and knowledge management'}
              {language === 'jp' && 'インテリジェント自動化とナレッジマネジメントで内部運営を変革'}
              {language === 'hk' && '用智能自動化和知識管理變革內部運營'}
            </p>
          </div>

          <div class="space-y-16">
            {/* Solution 1: Unified Knowledge Hub */}
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div data-animate="slide-up">
                <div class="flex items-center mb-6">
                  <div class="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
                    <i class="fas fa-search text-indigo-600 text-xl"></i>
                  </div>
                  <h3 class="text-2xl font-bold text-gray-900">
                    {language === 'en' && 'Unified Knowledge Hub'}
                    {language === 'jp' && '統合ナレッジハブ'}
                    {language === 'hk' && '統一知識中心'}
                  </h3>
                </div>
                <h4 class="text-lg font-semibold text-indigo-600 mb-4">
                  {language === 'en' && 'One Search, All Answers'}
                  {language === 'jp' && '一回の検索、すべての回答'}
                  {language === 'hk' && '一次搜索，全部答案'}
                </h4>
                <p class="text-gray-700 mb-6 leading-relaxed">
                  {language === 'en' && 'Zenava creates a centralized knowledge hub that aggregates information from all internal systems, documents, and databases. Employees can ask questions in natural language and instantly receive accurate, contextual answers from anywhere in the organization, eliminating time wasted searching across multiple systems.'}
                  {language === 'jp' && 'Zenavaは、すべての内部システム、文書、データベースから情報を集約する中央集権的なナレッジハブを作成します。従業員は自然言語で質問をし、組織内のどこからでも正確で文脈的な回答を即座に受け取ることができ、複数のシステム間での検索に費やされる時間を削減します。'}
                  {language === 'hk' && 'Zenava 創建一個集中的知識中心，匯總來自所有內部系統、文檔和數據庫的信息。員工可以用自然語言提問，並立即從組織內任何地方獲得準確、上下文相關的答案，消除在多個系統間搜索浪費的時間。'}
                </p>
                <div class="flex space-x-4">
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>
                      {language === 'en' && 'Natural Language Query'}
                      {language === 'jp' && '自然言語クエリ'}
                      {language === 'hk' && '自然語言查詢'}
                    </span>
                  </div>
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>
                      {language === 'en' && 'Multi-System Integration'}
                      {language === 'jp' && 'マルチシステム統合'}
                      {language === 'hk' && '多系統集成'}
                    </span>
                  </div>
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>
                      {language === 'en' && 'Instant Results'}
                      {language === 'jp' && '即座の結果'}
                      {language === 'hk' && '即時結果'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div class="bg-white p-8 rounded-xl shadow-lg" data-animate="slide-up">
                <div class="border-2 border-gray-100 rounded-lg p-6">
                  <h4 class="font-bold text-gray-900 mb-4">
                    {language === 'en' && 'Employee Query Examples'}
                    {language === 'jp' && '従業員クエリ例'}
                    {language === 'hk' && '員工查詢示例'}
                  </h4>
                  
                  <div class="space-y-4">
                    <div class="flex items-start space-x-4">
                      <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <i class="fas fa-user text-white"></i>
                      </div>
                      <div class="flex-1">
                        <p class="bg-gray-100 rounded-lg p-3 mb-2 text-sm">
                          {language === 'en' && '"What is our remote work policy for international employees?"'}
                          {language === 'jp' && '「海外従業員のリモートワークポリシーは何ですか？」'}
                          {language === 'hk' && '"國際員工的遠程工作政策是什麼？"'}
                        </p>
                      </div>
                    </div>
                    
                    <div class="flex items-start space-x-4">
                      <div class="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center">
                        <i class="fas fa-robot text-white"></i>
                      </div>
                      <div class="flex-1">
                        <p class="bg-indigo-50 border border-indigo-200 rounded-lg p-3 text-sm">
                          <strong>Zenava:</strong> {language === 'en' && 'Based on HR Policy Doc v2.3: International employees can work remotely up to 180 days per year with manager approval...'}
                          {language === 'jp' && 'HR ポリシー文書 v2.3 に基づく：国際従業員は管理者の承認により年間最大180日間リモートワーク可能...'}
                          {language === 'hk' && '基於人事政策文檔 v2.3：國際員工可在經理批准下每年遠程工作最多180天...'}
                        </p>
                        <p class="text-xs text-indigo-600 mt-2">
                          {language === 'en' && '✓ Found in: HR Database, Legal Docs, Manager Guidelines'}
                          {language === 'jp' && '✓ 見つかった場所：HRデータベース、法的文書、管理者ガイドライン'}
                          {language === 'hk' && '✓ 來源：人事數據庫、法律文件、經理指南'}
                        </p>
                      </div>
                    </div>
                    
                    <div class="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div class="flex items-center justify-between text-sm">
                        <span class="text-gray-700">
                          {language === 'en' && 'Search Time'}
                          {language === 'jp' && '検索時間'}
                          {language === 'hk' && '搜索時間'}
                        </span>
                        <span class="font-bold text-green-600">2.3s</span>
                      </div>
                      <div class="flex items-center justify-between text-sm mt-1">
                        <span class="text-gray-700">
                          {language === 'en' && 'Sources Searched'}
                          {language === 'jp' && '検索したソース'}
                          {language === 'hk' && '搜索來源'}
                        </span>
                        <span class="font-bold text-green-600">12 systems</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Solution 2: Intelligent Process Automation */}
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div class="order-2 lg:order-1 bg-white p-8 rounded-xl shadow-lg" data-animate="slide-up">
                <div class="space-y-4">
                  <h4 class="font-bold text-gray-900 mb-4">
                    {language === 'en' && 'Automated Workflow Examples'}
                    {language === 'jp' && '自動ワークフロー例'}
                    {language === 'hk' && '自動化工作流程示例'}
                  </h4>
                  
                  {/* Workflow Examples */}
                  <div class="space-y-3">
                    <div class="flex items-start p-3 bg-blue-50 rounded-lg">
                      <div class="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1">IT</div>
                      <div class="flex-1">
                        <p class="font-medium text-gray-900">
                          {language === 'en' && 'Software Access Request'}
                          {language === 'jp' && 'ソフトウェアアクセス要求'}
                          {language === 'hk' && '軟件訪問申請'}
                        </p>
                        <p class="text-sm text-gray-600">
                          {language === 'en' && 'Auto-approval for standard tools, escalation for specialized software'}
                          {language === 'jp' && '標準ツールの自動承認、専門ソフトウェアのエスカレーション'}
                          {language === 'hk' && '標準工具自動批准，專業軟件升級處理'}
                        </p>
                        <div class="flex items-center mt-2">
                          <i class="fas fa-clock text-blue-600 mr-1"></i>
                          <span class="text-xs text-blue-600 font-medium">
                            {language === 'en' && '5 min avg completion'}
                            {language === 'jp' && '平均5分で完了'}
                            {language === 'hk' && '平均5分鐘完成'}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div class="flex items-start p-3 bg-green-50 rounded-lg">
                      <div class="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1">HR</div>
                      <div class="flex-1">
                        <p class="font-medium text-gray-900">
                          {language === 'en' && 'Leave Request Processing'}
                          {language === 'jp' && '休暇申請処理'}
                          {language === 'hk' && '請假申請處理'}
                        </p>
                        <p class="text-sm text-gray-600">
                          {language === 'en' && 'Calendar check, coverage arrangement, automatic approval'}
                          {language === 'jp' && 'カレンダーチェック、カバレッジ手配、自動承認'}
                          {language === 'hk' && '日曆檢查、覆蓋安排、自動批准'}
                        </p>
                        <div class="flex items-center mt-2">
                          <i class="fas fa-clock text-green-600 mr-1"></i>
                          <span class="text-xs text-green-600 font-medium">
                            {language === 'en' && '15 min avg completion'}
                            {language === 'jp' && '平均15分で完了'}
                            {language === 'hk' && '平均15分鐘完成'}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div class="flex items-start p-3 bg-purple-50 rounded-lg">
                      <div class="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1">FC</div>
                      <div class="flex-1">
                        <p class="font-medium text-gray-900">
                          {language === 'en' && 'Expense Report Review'}
                          {language === 'jp' && '経費報告レビュー'}
                          {language === 'hk' && '費用報告審查'}
                        </p>
                        <p class="text-sm text-gray-600">
                          {language === 'en' && 'Receipt validation, policy compliance, approval routing'}
                          {language === 'jp' && 'レシート検証、ポリシー準拠、承認ルーティング'}
                          {language === 'hk' && '收據驗證、政策合規、批准路由'}
                        </p>
                        <div class="flex items-center mt-2">
                          <i class="fas fa-clock text-purple-600 mr-1"></i>
                          <span class="text-xs text-purple-600 font-medium">
                            {language === 'en' && '30 min avg completion'}
                            {language === 'jp' && '平均30分で完了'}
                            {language === 'hk' && '平均30分鐘完成'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="order-1 lg:order-2" data-animate="slide-up">
                <div class="flex items-center mb-6">
                  <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                    <i class="fas fa-cogs text-purple-600 text-xl"></i>
                  </div>
                  <h3 class="text-2xl font-bold text-gray-900">
                    {language === 'en' && 'Intelligent Process Automation'}
                    {language === 'jp' && 'インテリジェントプロセス自動化'}
                    {language === 'hk' && '智能流程自動化'}
                  </h3>
                </div>
                <h4 class="text-lg font-semibold text-purple-600 mb-4">
                  {language === 'en' && 'Automate Routine, Focus on Strategic'}
                  {language === 'jp' && 'ルーチンを自動化、戦略に集中'}
                  {language === 'hk' && '自動化常規，專注戰略'}
                </h4>
                <p class="text-gray-700 mb-6 leading-relaxed">
                  {language === 'en' && 'Zenava automates repetitive administrative tasks across HR, IT, Finance, and Operations. It handles routine requests like access permissions, leave approvals, expense processing, and equipment requests through intelligent workflows that understand context, apply business rules, and route exceptions appropriately.'}
                  {language === 'jp' && 'ZenavaはHR、IT、財務、運営全体で繰り返し管理タスクを自動化します。アクセス許可、休暇承認、経費処理、機器要求などの日常的なリクエストを、文脈を理解し、ビジネスルールを適用し、例外を適切にルーティングするインテリジェントワークフローを通じて処理します。'}
                  {language === 'hk' && 'Zenava 自動化人事、IT、財務和運營全面的重複管理任務。它通過理解上下文、應用業務規則並適當路由例外的智能工作流程處理訪問權限、請假批准、費用處理和設備申請等日常請求。'}
                </p>
                <div class="flex space-x-4">
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>
                      {language === 'en' && 'Workflow Automation'}
                      {language === 'jp' && 'ワークフロー自動化'}
                      {language === 'hk' && '工作流程自動化'}
                    </span>
                  </div>
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>
                      {language === 'en' && 'Business Rules Engine'}
                      {language === 'jp' && 'ビジネスルールエンジン'}
                      {language === 'hk' && '業務規則引擎'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Solution 3: Employee Self-Service Portal */}
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div data-animate="slide-up">
                <div class="flex items-center mb-6">
                  <div class="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mr-4">
                    <i class="fas fa-user-circle text-teal-600 text-xl"></i>
                  </div>
                  <h3 class="text-2xl font-bold text-gray-900">
                    {language === 'en' && 'Employee Self-Service Portal'}
                    {language === 'jp' && '従業員セルフサービスポータル'}
                    {language === 'hk' && '員工自助服務門戶'}
                  </h3>
                </div>
                <h4 class="text-lg font-semibold text-teal-600 mb-4">
                  {language === 'en' && 'Empower Employees, Reduce Support Tickets'}
                  {language === 'jp' && '従業員をエンパワー、サポートチケットを削減'}
                  {language === 'hk' && '賦能員工，減少支援工單'}
                </h4>
                <p class="text-gray-700 mb-6 leading-relaxed">
                  {language === 'en' && 'Zenava provides an intelligent self-service portal where employees can instantly access information, complete requests, and solve problems without waiting for support. The AI assistant guides users through complex processes, provides personalized recommendations, and ensures compliance with company policies.'}
                  {language === 'jp' && 'Zenavaは、従業員が情報に即座にアクセスし、リクエストを完了し、サポートを待つことなく問題を解決できるインテリジェントセルフサービスポータルを提供します。AIアシスタントは複雑なプロセスを通じてユーザーをガイドし、パーソナライズされた推奨事項を提供し、会社のポリシーへの準拠を確保します。'}
                  {language === 'hk' && 'Zenava 提供一個智能自助服務門戶，員工可以即時訪問信息、完成請求並解決問題，無需等待支援。AI助手引導用戶通過複雜流程，提供個性化建議，並確保符合公司政策。'}
                </p>
                <div class="flex space-x-4">
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>
                      {language === 'en' && 'Instant Access'}
                      {language === 'jp' && '即座のアクセス'}
                      {language === 'hk' && '即時訪問'}
                    </span>
                  </div>
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>
                      {language === 'en' && 'Guided Processes'}
                      {language === 'jp' && 'ガイド付きプロセス'}
                      {language === 'hk' && '引導流程'}
                    </span>
                  </div>
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>
                      {language === 'en' && 'Policy Compliance'}
                      {language === 'jp' && 'ポリシー準拠'}
                      {language === 'hk' && '政策合規'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div class="bg-white p-8 rounded-xl shadow-lg" data-animate="slide-up">
                <h4 class="font-bold text-gray-900 mb-6">
                  {language === 'en' && 'Self-Service Capabilities'}
                  {language === 'jp' && 'セルフサービス機能'}
                  {language === 'hk' && '自助服務功能'}
                </h4>
                
                <div class="grid grid-cols-1 gap-4">
                  <div class="flex items-center p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <i class="fas fa-id-card text-blue-600 text-2xl mr-4"></i>
                    <div>
                      <p class="font-medium text-gray-900">
                        {language === 'en' && 'HR Services'}
                        {language === 'jp' && 'HRサービス'}
                        {language === 'hk' && 'HR服務'}
                      </p>
                      <p class="text-sm text-gray-600">
                        {language === 'en' && 'Benefits, payroll, time-off, documents'}
                        {language === 'jp' && '福利厚生、給与、休暇、文書'}
                        {language === 'hk' && '福利、薪資、休假、文件'}
                      </p>
                    </div>
                  </div>
                  
                  <div class="flex items-center p-4 bg-green-50 border border-green-200 rounded-lg">
                    <i class="fas fa-laptop text-green-600 text-2xl mr-4"></i>
                    <div>
                      <p class="font-medium text-gray-900">
                        {language === 'en' && 'IT Support'}
                        {language === 'jp' && 'ITサポート'}
                        {language === 'hk' && 'IT支援'}
                      </p>
                      <p class="text-sm text-gray-600">
                        {language === 'en' && 'Password resets, software, hardware requests'}
                        {language === 'jp' && 'パスワードリセット、ソフトウェア、ハードウェア要求'}
                        {language === 'hk' && '密碼重置、軟件、硬件申請'}
                      </p>
                    </div>
                  </div>
                  
                  <div class="flex items-center p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <i class="fas fa-building text-purple-600 text-2xl mr-4"></i>
                    <div>
                      <p class="font-medium text-gray-900">
                        {language === 'en' && 'Facilities'}
                        {language === 'jp' && 'ファシリティ'}
                        {language === 'hk' && '設施'}
                      </p>
                      <p class="text-sm text-gray-600">
                        {language === 'en' && 'Room booking, maintenance, parking'}
                        {language === 'jp' && '部屋予約、メンテナンス、駐車場'}
                        {language === 'hk' && '會議室預訂、維護、停車'}
                      </p>
                    </div>
                  </div>
                  
                  <div class="flex items-center p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <i class="fas fa-chart-bar text-orange-600 text-2xl mr-4"></i>
                    <div>
                      <p class="font-medium text-gray-900">
                        {language === 'en' && 'Reports & Analytics'}
                        {language === 'jp' && 'レポート・分析'}
                        {language === 'hk' && '報告與分析'}
                      </p>
                      <p class="text-sm text-gray-600">
                        {language === 'en' && 'Performance data, team metrics, insights'}
                        {language === 'jp' && 'パフォーマンスデータ、チームメトリクス、洞察'}
                        {language === 'hk' && '績效數據、團隊指標、洞察'}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div class="mt-6 p-4 bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-200 rounded-lg">
                  <div class="text-center">
                    <p class="text-sm text-gray-600 mb-1">
                      {language === 'en' && 'Support Ticket Reduction'}
                      {language === 'jp' && 'サポートチケット削減'}
                      {language === 'hk' && '支援工單減少'}
                    </p>
                    <p class="text-2xl font-bold text-teal-600">75%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Solution 4: Real-time Performance Insights */}
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div class="order-2 lg:order-1 bg-white p-8 rounded-xl shadow-lg" data-animate="slide-up">
                <div class="space-y-6">
                  <h4 class="font-bold text-gray-900 mb-4">
                    {language === 'en' && 'Performance Dashboard'}
                    {language === 'jp' && 'パフォーマンスダッシュボード'}
                    {language === 'hk' && '績效儀表板'}
                  </h4>
                  
                  {/* Performance Metrics */}
                  <div class="grid grid-cols-2 gap-4">
                    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                      <i class="fas fa-clock text-blue-600 text-2xl mb-2"></i>
                      <p class="text-2xl font-bold text-blue-600">2.3x</p>
                      <p class="text-sm text-gray-700">
                        {language === 'en' && 'Faster Resolution'}
                        {language === 'jp' && '迅速な解決'}
                        {language === 'hk' && '更快解決'}
                      </p>
                    </div>
                    
                    <div class="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                      <i class="fas fa-users text-green-600 text-2xl mb-2"></i>
                      <p class="text-2xl font-bold text-green-600">94%</p>
                      <p class="text-sm text-gray-700">
                        {language === 'en' && 'Employee Satisfaction'}
                        {language === 'jp' && '従業員満足度'}
                        {language === 'hk' && '員工滿意度'}
                      </p>
                    </div>
                    
                    <div class="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
                      <i class="fas fa-chart-line text-purple-600 text-2xl mb-2"></i>
                      <p class="text-2xl font-bold text-purple-600">+180%</p>
                      <p class="text-sm text-gray-700">
                        {language === 'en' && 'Process Efficiency'}
                        {language === 'jp' && 'プロセス効率'}
                        {language === 'hk' && '流程效率'}
                      </p>
                    </div>
                    
                    <div class="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
                      <i class="fas fa-dollar-sign text-orange-600 text-2xl mb-2"></i>
                      <p class="text-2xl font-bold text-orange-600">-45%</p>
                      <p class="text-sm text-gray-700">
                        {language === 'en' && 'Admin Costs'}
                        {language === 'jp' && '管理コスト'}
                        {language === 'hk' && '行政成本'}
                      </p>
                    </div>
                  </div>
                  
                  <div class="mt-6">
                    <h5 class="font-medium text-gray-900 mb-3">
                      {language === 'en' && 'Top Insights This Week'}
                      {language === 'jp' && '今週のトップインサイト'}
                      {language === 'hk' && '本週熱點洞察'}
                    </h5>
                    <div class="space-y-2">
                      <div class="flex items-start space-x-3 p-2 bg-yellow-50 rounded">
                        <i class="fas fa-lightbulb text-yellow-600 mt-1"></i>
                        <p class="text-sm text-gray-700">
                          {language === 'en' && 'IT requests peak on Mondays - consider pre-weekend automation'}
                          {language === 'jp' && 'ITリクエストは月曜日にピーク - 週末前の自動化を検討'}
                          {language === 'hk' && 'IT請求在周一達到高峰 - 考慮周末前自動化'}
                        </p>
                      </div>
                      <div class="flex items-start space-x-3 p-2 bg-blue-50 rounded">
                        <i class="fas fa-info-circle text-blue-600 mt-1"></i>
                        <p class="text-sm text-gray-700">
                          {language === 'en' && 'Employee handbook searches increased 40% - update FAQ'}
                          {language === 'jp' && '従業員ハンドブック検索が40%増加 - FAQ更新'}
                          {language === 'hk' && '員工手冊搜索增加40% - 更新FAQ'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="order-1 lg:order-2" data-animate="slide-up">
                <div class="flex items-center mb-6">
                  <div class="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
                    <i class="fas fa-chart-bar text-indigo-600 text-xl"></i>
                  </div>
                  <h3 class="text-2xl font-bold text-gray-900">
                    {language === 'en' && 'Real-time Performance Insights'}
                    {language === 'jp' && 'リアルタイムパフォーマンス洞察'}
                    {language === 'hk' && '即時績效洞察'}
                  </h3>
                </div>
                <h4 class="text-lg font-semibold text-indigo-600 mb-4">
                  {language === 'en' && 'Data-Driven Internal Operations Optimization'}
                  {language === 'jp' && 'データ駆動型内部運営最適化'}
                  {language === 'hk' && '數據驅動內部運營優化'}
                </h4>
                <p class="text-gray-700 mb-6 leading-relaxed">
                  {language === 'en' && 'Zenava continuously analyzes internal operations to provide actionable insights for improvement. It tracks process bottlenecks, identifies training needs, measures employee satisfaction, and recommends optimizations to enhance overall organizational efficiency and employee experience.'}
                  {language === 'jp' && 'Zenavaは内部運営を継続的に分析し、改善のための実行可能な洞察を提供します。プロセスのボトルネックを追跡し、研修ニーズを特定し、従業員満足度を測定し、組織全体の効率性と従業員体験を向上させるための最適化を推奨します。'}
                  {language === 'hk' && 'Zenava 持續分析內部運營，為改進提供可操作的洞察。它追蹤流程瓶頸，識別培訓需求，衡量員工滿意度，並推薦優化以提升整體組織效率和員工體驗。'}
                </p>
                <div class="flex space-x-4">
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>
                      {language === 'en' && 'Bottleneck Detection'}
                      {language === 'jp' && 'ボトルネック検出'}
                      {language === 'hk' && '瓶頸檢測'}
                    </span>
                  </div>
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>
                      {language === 'en' && 'Optimization Recommendations'}
                      {language === 'jp' && '最適化推奨'}
                      {language === 'hk' && '優化建議'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI & Benefits Section */}
      <section class="py-20 bg-gradient-to-br from-indigo-600 to-purple-600 text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16" data-animate="fade-in">
            <h2 class="text-3xl md:text-4xl font-bold mb-4">
              {language === 'en' && 'Internal Service ROI Results'}
              {language === 'jp' && '内部サービス ROI 結果'}
              {language === 'hk' && '內部服務投入回報實證'}
            </h2>
            <p class="text-xl opacity-90">
              {language === 'en' && 'Measurable improvements in employee productivity and operational efficiency'}
              {language === 'jp' && '従業員生産性と運営効率の測定可能な改善'}
              {language === 'hk' && '員工生產力和運營效率的可測量改進'}
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div class="text-center bg-white/10 backdrop-blur-sm rounded-xl p-8" data-animate="slide-up">
              <div class="text-4xl md:text-5xl font-bold mb-2">+230%</div>
              <p class="text-lg opacity-90">
                {language === 'en' && 'Employee Productivity'}
                {language === 'jp' && '従業員生産性'}
                {language === 'hk' && '員工生產力'}
              </p>
            </div>
            
            <div class="text-center bg-white/10 backdrop-blur-sm rounded-xl p-8" data-animate="slide-up" style="animation-delay: 0.1s;">
              <div class="text-4xl md:text-5xl font-bold mb-2">-80%</div>
              <p class="text-lg opacity-90">
                {language === 'en' && 'Request Processing Time'}
                {language === 'jp' && 'リクエスト処理時間'}
                {language === 'hk' && '請求處理時間'}
              </p>
            </div>
            
            <div class="text-center bg-white/10 backdrop-blur-sm rounded-xl p-8" data-animate="slide-up" style="animation-delay: 0.2s;">
              <div class="text-4xl md:text-5xl font-bold mb-2">75%</div>
              <p class="text-lg opacity-90">
                {language === 'en' && 'Self-Service Adoption'}
                {language === 'jp' && 'セルフサービス採用'}
                {language === 'hk' && '自助服務採用'}
              </p>
            </div>
            
            <div class="text-center bg-white/10 backdrop-blur-sm rounded-xl p-8" data-animate="slide-up" style="animation-delay: 0.3s;">
              <div class="text-4xl md:text-5xl font-bold mb-2">-60%</div>
              <p class="text-lg opacity-90">
                {language === 'en' && 'Administrative Overhead'}
                {language === 'jp' && '管理オーバーヘッド'}
                {language === 'hk' && '管理開銷'}
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