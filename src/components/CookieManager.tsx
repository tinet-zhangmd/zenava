import { FC } from 'hono/jsx'
import { Language } from '../utils/i18n'

interface CookieManagerProps {
  language: Language
}

// Cookie categories configuration
const cookieCategories = {
  necessary: {
    en: {
      name: 'Necessary Cookies',
      description: 'These cookies are essential for the website to function properly. They enable basic functions like page navigation and access to secure areas of the website.',
      required: true
    },
    jp: {
      name: '必須Cookie',
      description: 'これらのCookieは、ウェブサイトが適切に機能するために不可欠です。ページナビゲーションやウェブサイトの安全な領域へのアクセスなどの基本的な機能を有効にします。',
      required: true
    },
    hk: {
      name: '必要Cookie',
      description: '這些Cookie對網站的正常運作至關重要。它們啟用基本功能，如頁面導航和訪問網站的安全區域。',
      required: true
    }
  },
  analytics: {
    en: {
      name: 'Analytics Cookies',
      description: 'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.',
      required: false
    },
    jp: {
      name: '分析Cookie',
      description: 'これらのCookieは、訪問者がウェブサイトとどのようにやり取りするかを匿名で収集および報告することにより、理解するのに役立ちます。',
      required: false
    },
    hk: {
      name: '分析Cookie',
      description: '這些Cookie通過匿名收集和報告信息，幫助我們了解訪問者如何與我們的網站互動。',
      required: false
    }
  },
  marketing: {
    en: {
      name: 'Marketing Cookies',
      description: 'These cookies are used to track visitors across websites to display ads that are relevant and engaging for individual users.',
      required: false
    },
    jp: {
      name: 'マーケティングCookie',
      description: 'これらのCookieは、個々のユーザーに関連性があり魅力的な広告を表示するために、ウェブサイト間で訪問者を追跡するために使用されます。',
      required: false
    },
    hk: {
      name: '營銷Cookie',
      description: '這些Cookie用於跨網站跟踪訪問者，以顯示與個人用戶相關且具有吸引力的廣告。',
      required: false
    }
  }
}

// Translations
const translations = {
  en: {
    title: 'Cookie Preferences',
    subtitle: 'We use cookies to enhance your experience',
    description: 'We use cookies and similar technologies to help personalize content, tailor and measure ads, and provide a better experience. By clicking accept, you agree to this, as outlined in our Cookie Policy.',
    acceptAll: 'Accept All',
    rejectAll: 'Reject All',
    savePreferences: 'Save Preferences',
    cookiePolicy: 'Cookie Policy',
    privacyPolicy: 'Privacy Policy',
    manageConsent: 'Manage Cookie Preferences'
  },
  jp: {
    title: 'Cookieの設定',
    subtitle: 'より良い体験のためにCookieを使用します',
    description: '私たちは、コンテンツのパーソナライズ、広告のカスタマイズと測定、より良い体験の提供のためにCookieおよび類似の技術を使用しています。承認をクリックすることで、Cookieポリシーに記載されているとおり、これに同意することになります。',
    acceptAll: 'すべて受け入れる',
    rejectAll: 'すべて拒否',
    savePreferences: '設定を保存',
    cookiePolicy: 'Cookieポリシー',
    privacyPolicy: 'プライバシーポリシー',
    manageConsent: 'Cookie設定を管理'
  },
  hk: {
    title: 'Cookie偏好設定',
    subtitle: '我們使用Cookie來改善您的體驗',
    description: '我們使用Cookie和類似技術來幫助個性化內容、定制和衡量廣告，並提供更好的體驗。點擊接受即表示您同意我們的Cookie政策中概述的內容。',
    acceptAll: '全部接受',
    rejectAll: '全部拒絕',
    savePreferences: '保存設定',
    cookiePolicy: 'Cookie政策',
    privacyPolicy: '隱私政策',
    manageConsent: '管理Cookie偏好'
  }
}

export const CookieBanner: FC<CookieManagerProps> = ({ language }) => {
  const t = translations[language] || translations.en

  return (
    <div id="cookie-consent-banner" class="hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 transform transition-transform duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div class="flex-1">
            <h3 class="text-lg font-semibold text-gray-900 mb-1">
              {t.subtitle}
            </h3>
            <p class="text-sm text-gray-600">
              {t.description}
            </p>
            <div class="flex flex-wrap gap-2 mt-2">
              <a href="/cookie-policy" class="text-xs text-blue-600 hover:text-blue-800 underline">
                {t.cookiePolicy}
              </a>
              <span class="text-xs text-gray-400">•</span>
              <a href="/privacy-policy" class="text-xs text-blue-600 hover:text-blue-800 underline">
                {t.privacyPolicy}
              </a>
            </div>
          </div>
          <div class="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <button
              id="cookie-settings-btn"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              {t.manageConsent}
            </button>
            <button
              id="cookie-reject-btn"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              {t.rejectAll}
            </button>
            <button
              id="cookie-accept-btn"
              class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              {t.acceptAll}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export const CookiePreferencesModal: FC<CookieManagerProps> = ({ language }) => {
  const t = translations[language] || translations.en
  const categories = cookieCategories

  return (
    <div id="cookie-preferences-modal" class="hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 class="text-xl font-semibold text-gray-900">{t.title}</h2>
          <button
            id="close-cookie-modal"
            class="text-gray-400 hover:text-gray-600 focus:outline-none"
            aria-label="Close"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div class="px-6 py-4 overflow-y-auto max-h-[60vh]">
          <p class="text-sm text-gray-600 mb-6">
            {t.description}
          </p>

          {/* Cookie Categories */}
          <div class="space-y-6">
            {/* Necessary Cookies - Always On */}
            <div class="border rounded-lg p-4 bg-gray-50">
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <h3 class="font-medium text-gray-900 mb-1">
                    {categories.necessary[language].name}
                  </h3>
                  <p class="text-sm text-gray-600">
                    {categories.necessary[language].description}
                  </p>
                </div>
                <div class="ml-4">
                  <div class="relative inline-block w-12 align-middle select-none">
                    <input
                      type="checkbox"
                      id="necessary-cookies"
                      class="cookie-toggle hidden"
                      checked
                      disabled
                    />
                    <label
                      for="necessary-cookies"
                      class="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-not-allowed"
                    >
                      <span class="block h-6 w-6 rounded-full bg-blue-600 transform translate-x-6 transition-transform duration-200"></span>
                    </label>
                  </div>
                  <span class="text-xs text-gray-500 mt-1 block">Always On</span>
                </div>
              </div>
            </div>

            {/* Analytics Cookies */}
            <div class="border rounded-lg p-4">
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <h3 class="font-medium text-gray-900 mb-1">
                    {categories.analytics[language].name}
                  </h3>
                  <p class="text-sm text-gray-600">
                    {categories.analytics[language].description}
                  </p>
                </div>
                <div class="ml-4">
                  <div class="relative inline-block w-12 align-middle select-none">
                    <input
                      type="checkbox"
                      id="analytics-cookies"
                      class="cookie-toggle hidden"
                    />
                    <label
                      for="analytics-cookies"
                      class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer transition-colors"
                    >
                      <span class="toggle-switch block h-6 w-6 rounded-full bg-white shadow-md transform transition-transform duration-200"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Marketing Cookies */}
            <div class="border rounded-lg p-4">
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <h3 class="font-medium text-gray-900 mb-1">
                    {categories.marketing[language].name}
                  </h3>
                  <p class="text-sm text-gray-600">
                    {categories.marketing[language].description}
                  </p>
                </div>
                <div class="ml-4">
                  <div class="relative inline-block w-12 align-middle select-none">
                    <input
                      type="checkbox"
                      id="marketing-cookies"
                      class="cookie-toggle hidden"
                    />
                    <label
                      for="marketing-cookies"
                      class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer transition-colors"
                    >
                      <span class="toggle-switch block h-6 w-6 rounded-full bg-white shadow-md transform transition-transform duration-200"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div class="px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row gap-3 justify-end">
          <button
            id="reject-all-cookies"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            {t.rejectAll}
          </button>
          <button
            id="accept-all-cookies"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            {t.acceptAll}
          </button>
          <button
            id="save-cookie-preferences"
            class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            {t.savePreferences}
          </button>
        </div>
      </div>
    </div>
  )
}