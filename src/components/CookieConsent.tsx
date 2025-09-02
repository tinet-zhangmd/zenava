import { FC } from 'hono/jsx'
import { Language } from '../utils/i18n'

interface CookieConsentProps {
  language: Language
}

interface CookiePreferencesModalProps {
  language: Language
}

// Cookie consent banner that appears at bottom of page
export const CookieConsent: FC<CookieConsentProps> = ({ language }) => {
  const translations = {
    en: {
      title: 'Cookie Settings',
      description: 'We use cookies to enhance your experience and analyze our traffic. Please choose your preferences below.',
      necessary: 'Necessary',
      necessaryDesc: 'Essential for the website to function properly. Cannot be disabled.',
      analytics: 'Analytics',
      analyticsDesc: 'Help us understand how visitors interact with our website.',
      marketing: 'Marketing',
      marketingDesc: 'Used to deliver personalized advertisements and track campaign effectiveness.',
      acceptAll: 'Accept All',
      acceptSelected: 'Accept Selected',
      declineAll: 'Decline All',
      customize: 'Customize',
      privacyPolicy: 'Privacy Policy'
    },
    jp: {
      title: 'Cookieの設定',
      description: '私たちはお客様の体験を向上させ、トラフィックを分析するためにCookieを使用しています。以下でお好みを選択してください。',
      necessary: '必須',
      necessaryDesc: 'ウェブサイトが正常に機能するために不可欠です。無効にできません。',
      analytics: '分析',
      analyticsDesc: '訪問者がウェブサイトとどのようにやり取りするかを理解するのに役立ちます。',
      marketing: 'マーケティング',
      marketingDesc: 'パーソナライズされた広告の配信とキャンペーン効果の追跡に使用されます。',
      acceptAll: 'すべて受け入れる',
      acceptSelected: '選択したものを受け入れる',
      declineAll: 'すべて拒否',
      customize: 'カスタマイズ',
      privacyPolicy: 'プライバシーポリシー'
    },
    hk: {
      title: 'Cookie 設定',
      description: '我們使用 Cookie 來增強您的體驗並分析我們的流量。請在下面選擇您的偏好。',
      necessary: '必要',
      necessaryDesc: '網站正常運作所必需。無法禁用。',
      analytics: '分析',
      analyticsDesc: '幫助我們了解訪客如何與我們的網站互動。',
      marketing: '營銷',
      marketingDesc: '用於提供個性化廣告並追踪活動效果。',
      acceptAll: '全部接受',
      acceptSelected: '接受選定',
      declineAll: '全部拒絕',
      customize: '自訂',
      privacyPolicy: '隱私政策'
    }
  }

  const t = translations[language] || translations.en

  return (
    <div id="cookie-consent-banner" class="hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div class="flex-1">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">{t.title}</h3>
            <p class="text-sm text-gray-600">{t.description}</p>
          </div>
          <div class="flex flex-wrap gap-3">
            <button
              id="cookie-settings-btn"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {t.customize}
            </button>
            <button
              id="cookie-reject-btn"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {t.declineAll}
            </button>
            <button
              id="cookie-accept-btn"
              class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {t.acceptAll}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Cookie preferences modal for detailed settings
export const CookiePreferencesModal: FC<CookiePreferencesModalProps> = ({ language }) => {
  const translations = {
    en: {
      title: 'Cookie Preferences',
      description: 'We use cookies and similar technologies to help personalize content, tailor and measure ads, and provide a better experience. You can customize your choices below.',
      necessary: 'Necessary Cookies',
      necessaryDesc: 'These cookies are essential for the website to function and cannot be switched off in our systems.',
      analytics: 'Analytics Cookies',
      analyticsDesc: 'These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site.',
      marketing: 'Marketing Cookies',
      marketingDesc: 'These cookies may be set through our site by our advertising partners to build a profile of your interests.',
      savePreferences: 'Save Preferences',
      acceptAll: 'Accept All Cookies',
      close: 'Close'
    },
    jp: {
      title: 'Cookieの設定',
      description: 'コンテンツのパーソナライズ、広告の調整と測定、より良い体験の提供のためにCookieおよび類似の技術を使用しています。以下でお好みをカスタマイズできます。',
      necessary: '必須Cookie',
      necessaryDesc: 'これらのCookieはウェブサイトが機能するために不可欠であり、システムでオフにすることはできません。',
      analytics: '分析Cookie',
      analyticsDesc: 'これらのCookieにより、訪問数とトラフィックソースをカウントして、サイトのパフォーマンスを測定および改善できます。',
      marketing: 'マーケティングCookie',
      marketingDesc: 'これらのCookieは、広告パートナーによって当サイトを通じて設定され、お客様の興味のプロファイルを構築する可能性があります。',
      savePreferences: '設定を保存',
      acceptAll: 'すべてのCookieを受け入れる',
      close: '閉じる'
    },
    hk: {
      title: 'Cookie 偏好設定',
      description: '我們使用 Cookie 和類似技術來幫助個性化內容、定制和衡量廣告，並提供更好的體驗。您可以在下面自訂您的選擇。',
      necessary: '必要 Cookie',
      necessaryDesc: '這些 Cookie 對網站運作至關重要，無法在我們的系統中關閉。',
      analytics: '分析 Cookie',
      analyticsDesc: '這些 Cookie 使我們能夠計算訪問量和流量來源，以便衡量和改善網站性能。',
      marketing: '營銷 Cookie',
      marketingDesc: '這些 Cookie 可能由我們的廣告合作夥伴通過我們的網站設置，用於建立您的興趣檔案。',
      savePreferences: '保存偏好設定',
      acceptAll: '接受所有 Cookie',
      close: '關閉'
    }
  }

  const t = translations[language] || translations.en

  return (
    <div id="cookie-preferences-modal" class="hidden fixed inset-0 bg-gray-500 bg-opacity-75 z-50">
      <div class="flex items-center justify-center min-h-screen p-4">
        <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div class="px-6 py-4 border-b border-gray-200">
            <div class="flex items-center justify-between">
              <h2 class="text-xl font-semibold text-gray-900">{t.title}</h2>
              <button
                id="close-cookie-modal"
                class="text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div class="px-6 py-4">
            <p class="text-sm text-gray-600 mb-6">{t.description}</p>

            <div class="space-y-6">
              {/* Necessary Cookies - Always enabled */}
              <div class="flex items-start">
                <div class="flex-1">
                  <h3 class="text-sm font-medium text-gray-900">{t.necessary}</h3>
                  <p class="text-sm text-gray-500 mt-1">{t.necessaryDesc}</p>
                </div>
                <div class="ml-4">
                  <div class="relative">
                    <input
                      type="checkbox"
                      id="necessary-cookies"
                      class="cookie-toggle sr-only"
                      checked
                      disabled
                    />
                    <div class="w-14 h-8 bg-blue-600 rounded-full cursor-not-allowed opacity-50"></div>
                    <div class="absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition transform translate-x-6"></div>
                  </div>
                </div>
              </div>

              {/* Analytics Cookies */}
              <div class="flex items-start">
                <div class="flex-1">
                  <h3 class="text-sm font-medium text-gray-900">{t.analytics}</h3>
                  <p class="text-sm text-gray-500 mt-1">{t.analyticsDesc}</p>
                </div>
                <div class="ml-4">
                  <div class="relative">
                    <input
                      type="checkbox"
                      id="analytics-cookies"
                      class="cookie-toggle sr-only"
                    />
                    <div class="cookie-switch w-14 h-8 bg-gray-200 rounded-full cursor-pointer transition-colors"></div>
                    <div class="cookie-switch-handle absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition transform shadow"></div>
                  </div>
                </div>
              </div>

              {/* Marketing Cookies */}
              <div class="flex items-start">
                <div class="flex-1">
                  <h3 class="text-sm font-medium text-gray-900">{t.marketing}</h3>
                  <p class="text-sm text-gray-500 mt-1">{t.marketingDesc}</p>
                </div>
                <div class="ml-4">
                  <div class="relative">
                    <input
                      type="checkbox"
                      id="marketing-cookies"
                      class="cookie-toggle sr-only"
                    />
                    <div class="cookie-switch w-14 h-8 bg-gray-200 rounded-full cursor-pointer transition-colors"></div>
                    <div class="cookie-switch-handle absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition transform shadow"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row gap-3 justify-end">
            <button
              id="save-cookie-preferences"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {t.savePreferences}
            </button>
            <button
              id="accept-all-cookies"
              class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {t.acceptAll}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}