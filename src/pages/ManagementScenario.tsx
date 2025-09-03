import { Language, getTranslation, t } from '../utils/i18n.js'
import { TransformationCTA } from '../components/TransformationCTA.js'

interface ManagementScenarioProps {
  language: Language
}

export function ManagementScenario({ language }: ManagementScenarioProps) {
  const translations = getTranslation(language)

  return (
    <div class="min-h-screen">
      {/* Hero Banner */}
      <section class="relative py-20 lg:py-32 bg-gradient-to-br from-rose-50 via-amber-50 to-orange-50 overflow-hidden">
        {/* Background Pattern */}
        <div class="absolute inset-0 opacity-30">
          <div class="absolute inset-0" style="background-image: radial-gradient(circle, rgba(239, 68, 68, 0.1) 1px, transparent 1px); background-size: 40px 40px;"></div>
        </div>
        
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6" data-animate="fade-in">
              <span class="bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent">
                {language === 'en' && 'Zenava Management AI'}
                {language === 'jp' && 'Zenava マネジメント AI'}
                {language === 'hk' && 'Zenava 管理 AI'}
              </span>
            </h1>
            
            <p class="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed" data-animate="fade-in">
              {language === 'en' && 'Optimize business operations with intelligent insights and automated decision support'}
              {language === 'jp' && 'インテリジェントな洞察と自動化された意思決定支援でビジネス運営を最適化'}
              {language === 'hk' && '通過智能洞察和自動化決策支持優化業務運營'}
            </p>
            
            <div class="flex flex-col sm:flex-row gap-4 justify-center" data-animate="slide-up">
              <a href="#transformation-journey" class="bg-gradient-to-r from-rose-600 to-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 inline-block">
                <i class="fas fa-phone mr-2"></i>
                {language === 'en' && 'Schedule Consultation'}
                {language === 'jp' && '相談を予約'}
                {language === 'hk' && '預約溝通'}
              </a>
              <button class="border-2 border-rose-600 text-rose-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-rose-600 hover:text-white transition-all duration-300">
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
              {language === 'en' && 'Management & Operations Challenges'}
              {language === 'jp' && '管理・運営の課題'}
              {language === 'hk' && '管理運營挑戰'}
            </h2>
            <p class="text-xl text-gray-600">
              {language === 'en' && 'Common obstacles in modern business management and decision-making'}
              {language === 'jp' && '現代のビジネス管理と意思決定でよくある障害'}
              {language === 'hk' && '現代企業管理和決策制定的常見障礙'}
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Challenge 1: Data Fragmentation */}
            <div class="bg-red-50 border-l-4 border-red-400 p-6 rounded-lg" data-animate="slide-up">
              <div class="flex items-center mb-4">
                <div class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
                  <i class="fas fa-puzzle-piece text-red-600"></i>
                </div>
                <h3 class="text-lg font-bold text-gray-900">
                  {language === 'en' && 'Data Fragmentation'}
                  {language === 'jp' && 'データの断片化'}
                  {language === 'hk' && '數據碎片化'}
                </h3>
              </div>
              <p class="text-gray-700 text-sm leading-relaxed">
                {language === 'en' && 'Critical business data scattered across multiple systems, making it difficult to get comprehensive insights for strategic decisions.'}
                {language === 'jp' && '重要なビジネスデータが複数のシステムに分散しており、戦略的決定のための包括的な洞察を得ることが困難。'}
                {language === 'hk' && '關鍵業務數據分散在多個系統中，難以獲得戰略決策所需的全面洞察。'}
              </p>
            </div>

            {/* Challenge 2: Manual Reporting */}
            <div class="bg-orange-50 border-l-4 border-orange-400 p-6 rounded-lg" data-animate="slide-up" style="animation-delay: 0.1s;">
              <div class="flex items-center mb-4">
                <div class="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                  <i class="fas fa-file-alt text-orange-600"></i>
                </div>
                <h3 class="text-lg font-bold text-gray-900">
                  {language === 'en' && 'Manual Reporting'}
                  {language === 'jp' && '手動レポート作成'}
                  {language === 'hk' && '手動報告'}
                </h3>
              </div>
              <p class="text-gray-700 text-sm leading-relaxed">
                {language === 'en' && 'Time-consuming manual report generation leads to delayed decision-making and reduced agility in responding to market changes.'}
                {language === 'jp' && '時間のかかる手動レポート作成により、意思決定が遅れ、市場変化への対応敏捷性が低下。'}
                {language === 'hk' && '耗時的手動報告生成導致決策延遲，降低了對市場變化的響應敏捷性。'}
              </p>
            </div>

            {/* Challenge 3: Performance Visibility */}
            <div class="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg" data-animate="slide-up" style="animation-delay: 0.2s;">
              <div class="flex items-center mb-4">
                <div class="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                  <i class="fas fa-eye-slash text-yellow-600"></i>
                </div>
                <h3 class="text-lg font-bold text-gray-900">
                  {language === 'en' && 'Limited Performance Visibility'}
                  {language === 'jp' && 'パフォーマンス可視性の限界'}
                  {language === 'hk' && '績效可見性有限'}
                </h3>
              </div>
              <p class="text-gray-700 text-sm leading-relaxed">
                {language === 'en' && 'Lack of real-time visibility into team performance, resource utilization, and operational efficiency metrics.'}
                {language === 'jp' && 'チームパフォーマンス、リソース利用、運営効率メトリクスへのリアルタイム可視性の欠如。'}
                {language === 'hk' && '缺乏對團隊績效、資源利用和運營效率指標的即時可見性。'}
              </p>
            </div>

            {/* Challenge 4: Strategic Planning */}
            <div class="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg" data-animate="slide-up" style="animation-delay: 0.3s;">
              <div class="flex items-center mb-4">
                <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <i class="fas fa-chess text-blue-600"></i>
                </div>
                <h3 class="text-lg font-bold text-gray-900">
                  {language === 'en' && 'Reactive Decision Making'}
                  {language === 'jp' && '反応的意思決定'}
                  {language === 'hk' && '被動決策制定'}
                </h3>
              </div>
              <p class="text-gray-700 text-sm leading-relaxed">
                {language === 'en' && 'Reactive approach to problem-solving instead of proactive strategic planning based on predictive analytics.'}
                {language === 'jp' && '予測分析に基づくプロアクティブな戦略計画ではなく、問題解決への反応的アプローチ。'}
                {language === 'hk' && '採用被動解決問題的方法，而非基於預測分析的主動戰略規劃。'}
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
              {language === 'en' && 'Zenava Management Solutions'}
              {language === 'jp' && 'Zenava マネジメントソリューション'}
              {language === 'hk' && 'Zenava 管理解決方案'}
            </h2>
            <p class="text-xl text-gray-600">
              {language === 'en' && 'Empower leadership with AI-driven insights and automated operational excellence'}
              {language === 'jp' && 'AI駆動の洞察と自動化された運営エクセレンスでリーダーシップをエンパワー'}
              {language === 'hk' && '以AI驅動的洞察和自動化運營卓越性賦能領導力'}
            </p>
          </div>

          <div class="space-y-16">
            {/* Solution 1: Unified Business Intelligence */}
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div data-animate="slide-up">
                <div class="flex items-center mb-6">
                  <div class="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center mr-4">
                    <i class="fas fa-chart-pie text-rose-600 text-xl"></i>
                  </div>
                  <h3 class="text-2xl font-bold text-gray-900">
                    {language === 'en' && 'Unified Business Intelligence'}
                    {language === 'jp' && '統合ビジネスインテリジェンス'}
                    {language === 'hk' && '統一商業智能'}
                  </h3>
                </div>
                <h4 class="text-lg font-semibold text-rose-600 mb-4">
                  {language === 'en' && 'One Dashboard, Complete Business View'}
                  {language === 'jp' && '一つのダッシュボード、完全なビジネスビュー'}
                  {language === 'hk' && '一個儀表板，完整業務視圖'}
                </h4>
                <p class="text-gray-700 mb-6 leading-relaxed">
                  {language === 'en' && 'Zenava integrates data from all business systems to create a unified view of organizational performance. It automatically generates executive dashboards with real-time KPIs, trend analysis, and predictive insights, enabling data-driven decision making at every level of management.'}
                  {language === 'jp' && 'Zenavaはすべてのビジネスシステムからデータを統合し、組織パフォーマンスの統一的なビューを作成します。リアルタイムKPI、トレンド分析、予測洞察を含む経営ダッシュボードを自動生成し、管理のあらゆるレベルでデータ駆動の意思決定を可能にします。'}
                  {language === 'hk' && 'Zenava 整合來自所有業務系統的數據，創建組織績效的統一視圖。它自動生成包含即時KPI、趨勢分析和預測洞察的執行儀表板，實現管理各層級的數據驅動決策。'}
                </p>
                <div class="flex space-x-4">
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>
                      {language === 'en' && 'Real-time KPIs'}
                      {language === 'jp' && 'リアルタイムKPI'}
                      {language === 'hk' && '即時KPI'}
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
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>
                      {language === 'en' && 'Executive Reporting'}
                      {language === 'jp' && 'エグゼクティブレポート'}
                      {language === 'hk' && '高管報告'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div class="bg-white p-8 rounded-xl shadow-lg" data-animate="slide-up">
                <div class="border-2 border-gray-100 rounded-lg p-6">
                  <h4 class="font-bold text-gray-900 mb-4">
                    {language === 'en' && 'Executive Dashboard Overview'}
                    {language === 'jp' && 'エグゼクティブダッシュボード概要'}
                    {language === 'hk' && '高管儀表板概覽'}
                  </h4>
                  
                  <div class="grid grid-cols-2 gap-4 mb-4">
                    <div class="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                      <i class="fas fa-arrow-up text-green-600 mb-1"></i>
                      <p class="text-lg font-bold text-green-600">+23%</p>
                      <p class="text-xs text-gray-600">
                        {language === 'en' && 'Revenue Growth'}
                        {language === 'jp' && '収益成長'}
                        {language === 'hk' && '收益增長'}
                      </p>
                    </div>
                    
                    <div class="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
                      <i class="fas fa-users text-blue-600 mb-1"></i>
                      <p class="text-lg font-bold text-blue-600">94%</p>
                      <p class="text-xs text-gray-600">
                        {language === 'en' && 'Employee Satisfaction'}
                        {language === 'jp' && '従業員満足度'}
                        {language === 'hk' && '員工滿意度'}
                      </p>
                    </div>
                    
                    <div class="bg-orange-50 border border-orange-200 rounded-lg p-3 text-center">
                      <i class="fas fa-cog text-orange-600 mb-1"></i>
                      <p class="text-lg font-bold text-orange-600">87%</p>
                      <p class="text-xs text-gray-600">
                        {language === 'en' && 'Operational Efficiency'}
                        {language === 'jp' && '運営効率'}
                        {language === 'hk' && '運營效率'}
                      </p>
                    </div>
                    
                    <div class="bg-purple-50 border border-purple-200 rounded-lg p-3 text-center">
                      <i class="fas fa-heart text-purple-600 mb-1"></i>
                      <p class="text-lg font-bold text-purple-600">91%</p>
                      <p class="text-xs text-gray-600">
                        {language === 'en' && 'Customer Retention'}
                        {language === 'jp' && '顧客維持率'}
                        {language === 'hk' && '客戶保留率'}
                      </p>
                    </div>
                  </div>
                  
                  <div class="space-y-2">
                    <div class="flex items-center justify-between p-2 bg-yellow-50 rounded text-sm">
                      <div class="flex items-center">
                        <i class="fas fa-exclamation-triangle text-yellow-600 mr-2"></i>
                        <span>
                          {language === 'en' && 'Q3 Budget Alert'}
                          {language === 'jp' && 'Q3予算アラート'}
                          {language === 'hk' && 'Q3預算警報'}
                        </span>
                      </div>
                      <span class="text-yellow-700 font-medium">
                        {language === 'en' && 'Review Required'}
                        {language === 'jp' && 'レビュー必要'}
                        {language === 'hk' && '需要審查'}
                      </span>
                    </div>
                    
                    <div class="flex items-center justify-between p-2 bg-green-50 rounded text-sm">
                      <div class="flex items-center">
                        <i class="fas fa-chart-line text-green-600 mr-2"></i>
                        <span>
                          {language === 'en' && 'Sales Target Progress'}
                          {language === 'jp' && '売上目標進捗'}
                          {language === 'hk' && '銷售目標進度'}
                        </span>
                      </div>
                      <span class="text-green-700 font-medium">108%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Solution 2: Automated Performance Monitoring */}
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div class="order-2 lg:order-1 bg-white p-8 rounded-xl shadow-lg" data-animate="slide-up">
                <div class="space-y-4">
                  <h4 class="font-bold text-gray-900 mb-4">
                    {language === 'en' && 'Performance Monitoring Categories'}
                    {language === 'jp' && 'パフォーマンス監視カテゴリー'}
                    {language === 'hk' && '績效監控類別'}
                  </h4>
                  
                  {/* Performance Categories */}
                  <div class="space-y-3">
                    <div class="flex items-center p-3 bg-blue-50 rounded-lg">
                      <div class="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center mr-3">
                        <i class="fas fa-users text-sm"></i>
                      </div>
                      <div class="flex-1">
                        <p class="font-medium text-gray-900">
                          {language === 'en' && 'Team Performance'}
                          {language === 'jp' && 'チームパフォーマンス'}
                          {language === 'hk' && '團隊績效'}
                        </p>
                        <p class="text-sm text-gray-600">
                          {language === 'en' && 'Individual & team metrics, goal tracking'}
                          {language === 'jp' && '個人・チームメトリクス、目標追跡'}
                          {language === 'hk' && '個人和團隊指標、目標追蹤'}
                        </p>
                      </div>
                      <div class="text-right">
                        <span class="text-lg font-bold text-blue-600">89%</span>
                      </div>
                    </div>
                    
                    <div class="flex items-center p-3 bg-green-50 rounded-lg">
                      <div class="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center mr-3">
                        <i class="fas fa-dollar-sign text-sm"></i>
                      </div>
                      <div class="flex-1">
                        <p class="font-medium text-gray-900">
                          {language === 'en' && 'Financial Health'}
                          {language === 'jp' && '財務健全性'}
                          {language === 'hk' && '財務健康'}
                        </p>
                        <p class="text-sm text-gray-600">
                          {language === 'en' && 'Cash flow, profitability, budget variance'}
                          {language === 'jp' && 'キャッシュフロー、収益性、予算差異'}
                          {language === 'hk' && '現金流、盈利能力、預算差異'}
                        </p>
                      </div>
                      <div class="text-right">
                        <span class="text-lg font-bold text-green-600">92%</span>
                      </div>
                    </div>
                    
                    <div class="flex items-center p-3 bg-purple-50 rounded-lg">
                      <div class="w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center mr-3">
                        <i class="fas fa-cog text-sm"></i>
                      </div>
                      <div class="flex-1">
                        <p class="font-medium text-gray-900">
                          {language === 'en' && 'Operations Efficiency'}
                          {language === 'jp' && '運営効率'}
                          {language === 'hk' && '運營效率'}
                        </p>
                        <p class="text-sm text-gray-600">
                          {language === 'en' && 'Process optimization, resource utilization'}
                          {language === 'jp' && 'プロセス最適化、リソース利用'}
                          {language === 'hk' && '流程優化、資源利用'}
                        </p>
                      </div>
                      <div class="text-right">
                        <span class="text-lg font-bold text-purple-600">85%</span>
                      </div>
                    </div>
                    
                    <div class="flex items-center p-3 bg-orange-50 rounded-lg">
                      <div class="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center mr-3">
                        <i class="fas fa-heart text-sm"></i>
                      </div>
                      <div class="flex-1">
                        <p class="font-medium text-gray-900">
                          {language === 'en' && 'Customer Health'}
                          {language === 'jp' && '顧客健全性'}
                          {language === 'hk' && '客戶健康'}
                        </p>
                        <p class="text-sm text-gray-600">
                          {language === 'en' && 'Satisfaction scores, churn risk, NPS'}
                          {language === 'jp' && '満足度スコア、離脱リスク、NPS'}
                          {language === 'hk' && '滿意度評分、流失風險、NPS'}
                        </p>
                      </div>
                      <div class="text-right">
                        <span class="text-lg font-bold text-orange-600">91%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="order-1 lg:order-2" data-animate="slide-up">
                <div class="flex items-center mb-6">
                  <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                    <i class="fas fa-radar text-orange-600 text-xl"></i>
                  </div>
                  <h3 class="text-2xl font-bold text-gray-900">
                    {language === 'en' && 'Automated Performance Monitoring'}
                    {language === 'jp' && '自動パフォーマンス監視'}
                    {language === 'hk' && '自動化績效監控'}
                  </h3>
                </div>
                <h4 class="text-lg font-semibold text-orange-600 mb-4">
                  {language === 'en' && 'Continuous Performance Optimization'}
                  {language === 'jp' && '継続的パフォーマンス最適化'}
                  {language === 'hk' && '持續績效優化'}
                </h4>
                <p class="text-gray-700 mb-6 leading-relaxed">
                  {language === 'en' && 'Zenava continuously monitors key performance indicators across all business functions, automatically identifying trends, anomalies, and optimization opportunities. It sends proactive alerts for potential issues and provides actionable recommendations to maintain operational excellence.'}
                  {language === 'jp' && 'Zenavaはすべてのビジネス機能にわたって主要業績指標を継続的に監視し、トレンド、異常、最適化機会を自動的に識別します。潜在的な問題に対してプロアクティブなアラートを送信し、運営エクセレンスを維持するための実行可能な推奨事項を提供します。'}
                  {language === 'hk' && 'Zenava 持續監控所有業務功能的關鍵績效指標，自動識別趨勢、異常和優化機會。它為潛在問題發送主動警報，並提供可操作的建議以維持運營卓越性。'}
                </p>
                <div class="flex space-x-4">
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>
                      {language === 'en' && 'Proactive Alerts'}
                      {language === 'jp' && 'プロアクティブアラート'}
                      {language === 'hk' && '主動警報'}
                    </span>
                  </div>
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>
                      {language === 'en' && 'Anomaly Detection'}
                      {language === 'jp' && '異常検出'}
                      {language === 'hk' && '異常檢測'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Solution 3: Strategic Planning Assistant */}
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div data-animate="slide-up">
                <div class="flex items-center mb-6">
                  <div class="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mr-4">
                    <i class="fas fa-lightbulb text-amber-600 text-xl"></i>
                  </div>
                  <h3 class="text-2xl font-bold text-gray-900">
                    {language === 'en' && 'Strategic Planning Assistant'}
                    {language === 'jp' && '戦略計画アシスタント'}
                    {language === 'hk' && '戰略規劃助手'}
                  </h3>
                </div>
                <h4 class="text-lg font-semibold text-amber-600 mb-4">
                  {language === 'en' && 'From Reactive to Proactive Strategy'}
                  {language === 'jp' && '反応的から主体的な戦略へ'}
                  {language === 'hk' && '從被動到主動戰略'}
                </h4>
                <p class="text-gray-700 mb-6 leading-relaxed">
                  {language === 'en' && 'Zenava analyzes market trends, competitive landscape, and internal capabilities to provide strategic recommendations. It helps executives identify growth opportunities, assess risks, and develop data-driven strategies that align with business objectives and market dynamics.'}
                  {language === 'jp' && 'Zenavaは市場トレンド、競争環境、内部能力を分析して戦略的推奨事項を提供します。経営陣が成長機会を識別し、リスクを評価し、ビジネス目標と市場ダイナミクスに合致したデータ駆動の戦略を開発するのを支援します。'}
                  {language === 'hk' && 'Zenava 分析市場趨勢、競爭格局和內部能力，提供戰略建議。它幫助高管識別增長機會、評估風險，並制定與業務目標和市場動態相符的數據驅動戰略。'}
                </p>
                <div class="flex space-x-4">
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>
                      {language === 'en' && 'Market Analysis'}
                      {language === 'jp' && '市場分析'}
                      {language === 'hk' && '市場分析'}
                    </span>
                  </div>
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>
                      {language === 'en' && 'Risk Assessment'}
                      {language === 'jp' && 'リスク評価'}
                      {language === 'hk' && '風險評估'}
                    </span>
                  </div>
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>
                      {language === 'en' && 'Opportunity Identification'}
                      {language === 'jp' && '機会識別'}
                      {language === 'hk' && '機會識別'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div class="bg-white p-8 rounded-xl shadow-lg" data-animate="slide-up">
                <h4 class="font-bold text-gray-900 mb-6">
                  {language === 'en' && 'Strategic Planning Framework'}
                  {language === 'jp' && '戦略計画フレームワーク'}
                  {language === 'hk' && '戰略規劃框架'}
                </h4>
                
                <div class="space-y-4">
                  <div class="flex items-start space-x-4">
                    <div class="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">1</div>
                    <div class="flex-1">
                      <p class="font-medium text-gray-900">
                        {language === 'en' && 'Market Intelligence'}
                        {language === 'jp' && 'マーケットインテリジェンス'}
                        {language === 'hk' && '市場情報'}
                      </p>
                      <p class="text-sm text-gray-600">
                        {language === 'en' && 'Competitive analysis, trend identification, customer insights'}
                        {language === 'jp' && '競争分析、トレンド識別、顧客洞察'}
                        {language === 'hk' && '競爭分析、趨勢識別、客戶洞察'}
                      </p>
                    </div>
                  </div>
                  
                  <div class="flex items-start space-x-4">
                    <div class="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">2</div>
                    <div class="flex-1">
                      <p class="font-medium text-gray-900">
                        {language === 'en' && 'SWOT Analysis'}
                        {language === 'jp' && 'SWOT分析'}
                        {language === 'hk' && 'SWOT分析'}
                      </p>
                      <p class="text-sm text-gray-600">
                        {language === 'en' && 'Strengths, weaknesses, opportunities, threats assessment'}
                        {language === 'jp' && '強み、弱み、機会、脅威の評価'}
                        {language === 'hk' && '優勢、劣勢、機會、威脅評估'}
                      </p>
                    </div>
                  </div>
                  
                  <div class="flex items-start space-x-4">
                    <div class="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">3</div>
                    <div class="flex-1">
                      <p class="font-medium text-gray-900">
                        {language === 'en' && 'Strategic Options'}
                        {language === 'jp' && '戦略オプション'}
                        {language === 'hk' && '戰略選項'}
                      </p>
                      <p class="text-sm text-gray-600">
                        {language === 'en' && 'Growth strategies, investment priorities, resource allocation'}
                        {language === 'jp' && '成長戦略、投資優先順位、リソース配分'}
                        {language === 'hk' && '增長策略、投資優先級、資源配置'}
                      </p>
                    </div>
                  </div>
                  
                  <div class="flex items-start space-x-4">
                    <div class="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-1">4</div>
                    <div class="flex-1">
                      <p class="font-medium text-gray-900">
                        {language === 'en' && 'Implementation Roadmap'}
                        {language === 'jp' && '実装ロードマップ'}
                        {language === 'hk' && '實施路線圖'}
                      </p>
                      <p class="text-sm text-gray-600">
                        {language === 'en' && 'Timeline, milestones, KPIs, risk mitigation'}
                        {language === 'jp' && 'タイムライン、マイルストーン、KPI、リスク軽減'}
                        {language === 'hk' && '時間線、里程碑、KPI、風險緩解'}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div class="mt-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg">
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="font-medium text-gray-900">
                        {language === 'en' && 'Next Strategic Review'}
                        {language === 'jp' && '次の戦略レビュー'}
                        {language === 'hk' && '下次戰略審查'}
                      </p>
                      <p class="text-sm text-gray-600">
                        {language === 'en' && 'Quarterly Business Planning Session'}
                        {language === 'jp' && '四半期ビジネス計画セッション'}
                        {language === 'hk' && '季度業務規劃會議'}
                      </p>
                    </div>
                    <div class="text-right">
                      <p class="font-bold text-amber-600">Dec 15</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Solution 4: Automated Decision Support */}
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div class="order-2 lg:order-1 bg-white p-8 rounded-xl shadow-lg" data-animate="slide-up">
                <div class="space-y-6">
                  <h4 class="font-bold text-gray-900 mb-4">
                    {language === 'en' && 'Decision Support Examples'}
                    {language === 'jp' && '意思決定支援例'}
                    {language === 'hk' && '決策支援示例'}
                  </h4>
                  
                  {/* Decision Support Examples */}
                  <div class="space-y-4">
                    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div class="flex items-center justify-between mb-2">
                        <div class="flex items-center">
                          <i class="fas fa-money-bill-wave text-blue-600 mr-2"></i>
                          <span class="font-medium text-gray-900">
                            {language === 'en' && 'Budget Allocation'}
                            {language === 'jp' && '予算配分'}
                            {language === 'hk' && '預算分配'}
                          </span>
                        </div>
                        <span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          {language === 'en' && 'RECOMMENDED'}
                          {language === 'jp' && '推奨'}
                          {language === 'hk' && '推薦'}
                        </span>
                      </div>
                      <p class="text-sm text-gray-600 mb-2">
                        {language === 'en' && 'Increase marketing budget by 15% based on Q3 ROI analysis'}
                        {language === 'jp' && 'Q3 ROI分析に基づきマーケティング予算を15%増額'}
                        {language === 'hk' && '基於Q3 ROI分析建議增加15%營銷預算'}
                      </p>
                      <div class="flex items-center text-xs text-blue-600">
                        <i class="fas fa-chart-line mr-1"></i>
                        <span>
                          {language === 'en' && 'Expected 28% revenue increase'}
                          {language === 'jp' && '期待される28%の収益増加'}
                          {language === 'hk' && '預期收益增長28%'}
                        </span>
                      </div>
                    </div>
                    
                    <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div class="flex items-center justify-between mb-2">
                        <div class="flex items-center">
                          <i class="fas fa-user-plus text-green-600 mr-2"></i>
                          <span class="font-medium text-gray-900">
                            {language === 'en' && 'Hiring Decision'}
                            {language === 'jp' && '採用決定'}
                            {language === 'hk' && '招聘決定'}
                          </span>
                        </div>
                        <span class="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                          {language === 'en' && 'URGENT'}
                          {language === 'jp' && '緊急'}
                          {language === 'hk' && '緊急'}
                        </span>
                      </div>
                      <p class="text-sm text-gray-600 mb-2">
                        {language === 'en' && 'Hire 2 senior developers to meet Q4 delivery commitments'}
                        {language === 'jp' && 'Q4納期コミットメントを満たすため2名のシニア開発者を採用'}
                        {language === 'hk' && '招聘2名高級開發人員以滿足Q4交付承諾'}
                      </p>
                      <div class="flex items-center text-xs text-green-600">
                        <i class="fas fa-clock mr-1"></i>
                        <span>
                          {language === 'en' && 'Start recruiting within 48 hours'}
                          {language === 'jp' && '48時間以内に採用開始'}
                          {language === 'hk' && '48小時內開始招募'}
                        </span>
                      </div>
                    </div>
                    
                    <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div class="flex items-center justify-between mb-2">
                        <div class="flex items-center">
                          <i class="fas fa-exclamation-triangle text-yellow-600 mr-2"></i>
                          <span class="font-medium text-gray-900">
                            {language === 'en' && 'Risk Mitigation'}
                            {language === 'jp' && 'リスク軽減'}
                            {language === 'hk' && '風險緩解'}
                          </span>
                        </div>
                        <span class="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                          {language === 'en' && 'ACTION NEEDED'}
                          {language === 'jp' && 'アクション必要'}
                          {language === 'hk' && '需要行動'}
                        </span>
                      </div>
                      <p class="text-sm text-gray-600 mb-2">
                        {language === 'en' && 'Diversify supplier base - 60% dependency on single vendor'}
                        {language === 'jp' && 'サプライヤベースの多様化 - 単一ベンダーへの60%依存'}
                        {language === 'hk' && '多元化供應商基礎 - 對單一供應商依賴60%'}
                      </p>
                      <div class="flex items-center text-xs text-yellow-600">
                        <i class="fas fa-shield-alt mr-1"></i>
                        <span>
                          {language === 'en' && 'Reduce risk exposure by 40%'}
                          {language === 'jp' && 'リスクエクスポージャーを40%削減'}
                          {language === 'hk' && '降低風險敞口40%'}
                        </span>
                      </div>
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
                    {language === 'en' && 'Automated Decision Support'}
                    {language === 'jp' && '自動意思決定支援'}
                    {language === 'hk' && '自動化決策支援'}
                  </h3>
                </div>
                <h4 class="text-lg font-semibold text-indigo-600 mb-4">
                  {language === 'en' && 'Intelligent Recommendations for Better Decisions'}
                  {language === 'jp' && 'より良い決定のためのインテリジェント推奨'}
                  {language === 'hk' && '更好決策的智能建議'}
                </h4>
                <p class="text-gray-700 mb-6 leading-relaxed">
                  {language === 'en' && 'Zenava provides AI-powered decision support by analyzing complex business scenarios, evaluating multiple options, and recommending optimal courses of action. It considers financial impact, risk factors, resource constraints, and strategic alignment to help executives make informed, data-driven decisions quickly and confidently.'}
                  {language === 'jp' && 'Zenavaは複雑なビジネスシナリオを分析し、複数の選択肢を評価し、最適な行動方針を推奨することで、AI駆動の意思決定支援を提供します。財務的影響、リスク要因、リソース制約、戦略的整合性を考慮して、経営陣が迅速かつ自信を持って情報に基づいたデータ駆動の意思決定を行えるよう支援します。'}
                  {language === 'hk' && 'Zenava 通過分析複雜的業務場景、評估多個選項並推薦最佳行動方案，提供AI驅動的決策支援。它考慮財務影響、風險因素、資源限制和戰略一致性，幫助高管快速、自信地做出知情的數據驅動決策。'}
                </p>
                <div class="flex space-x-4">
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>
                      {language === 'en' && 'Scenario Analysis'}
                      {language === 'jp' && 'シナリオ分析'}
                      {language === 'hk' && '場景分析'}
                    </span>
                  </div>
                  <div class="flex items-center text-sm text-gray-600">
                    <i class="fas fa-check text-green-500 mr-2"></i>
                    <span>
                      {language === 'en' && 'Impact Assessment'}
                      {language === 'jp' && 'インパクト評価'}
                      {language === 'hk' && '影響評估'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI & Benefits Section */}
      <section class="py-20 bg-gradient-to-br from-rose-600 to-orange-600 text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16" data-animate="fade-in">
            <h2 class="text-3xl md:text-4xl font-bold mb-4">
              {language === 'en' && 'Management Optimization ROI'}
              {language === 'jp' && '管理最適化 ROI'}
              {language === 'hk' && '管理優化投入回報'}
            </h2>
            <p class="text-xl opacity-90">
              {language === 'en' && 'Proven results in operational excellence and strategic effectiveness'}
              {language === 'jp' && '運営エクセレンスと戦略的効果の実証された結果'}
              {language === 'hk' && '運營卓越性和戰略有效性的實證結果'}
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div class="text-center bg-white/10 backdrop-blur-sm rounded-xl p-8" data-animate="slide-up">
              <div class="text-4xl md:text-5xl font-bold mb-2">+150%</div>
              <p class="text-lg opacity-90">
                {language === 'en' && 'Decision Speed'}
                {language === 'jp' && '意思決定速度'}
                {language === 'hk' && '決策速度'}
              </p>
            </div>
            
            <div class="text-center bg-white/10 backdrop-blur-sm rounded-xl p-8" data-animate="slide-up" style="animation-delay: 0.1s;">
              <div class="text-4xl md:text-5xl font-bold mb-2">-65%</div>
              <p class="text-lg opacity-90">
                {language === 'en' && 'Operational Costs'}
                {language === 'jp' && '運営コスト'}
                {language === 'hk' && '運營成本'}
              </p>
            </div>
            
            <div class="text-center bg-white/10 backdrop-blur-sm rounded-xl p-8" data-animate="slide-up" style="animation-delay: 0.2s;">
              <div class="text-4xl md:text-5xl font-bold mb-2">35%</div>
              <p class="text-lg opacity-90">
                {language === 'en' && 'Strategy Success Rate'}
                {language === 'jp' && '戦略成功率'}
                {language === 'hk' && '戰略成功率'}
              </p>
            </div>
            
            <div class="text-center bg-white/10 backdrop-blur-sm rounded-xl p-8" data-animate="slide-up" style="animation-delay: 0.3s;">
              <div class="text-4xl md:text-5xl font-bold mb-2">+280%</div>
              <p class="text-lg opacity-90">
                {language === 'en' && 'ROI on Decisions'}
                {language === 'jp' && '意思決定ROI'}
                {language === 'hk' && '決策ROI'}
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