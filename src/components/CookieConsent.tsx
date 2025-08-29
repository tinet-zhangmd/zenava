interface CookieConsentProps {
  language: string
}

export function CookieConsent({ language }: CookieConsentProps) {
  return (
    <div id="cookie-consent-banner" class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div class="flex-1">
            <h3 class="text-lg font-semibold text-gray-900 mb-2">We use cookies</h3>
            <p class="text-sm text-gray-600 leading-relaxed">
              We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, 
              and provide personalized content. By clicking "Accept All", you consent to our use of cookies. 
              You can manage your preferences or learn more in our 
              <a href="/privacy-policy" class="text-blue-600 hover:text-blue-800 underline">Privacy Policy</a>.
            </p>
          </div>
          <div class="flex flex-col sm:flex-row gap-3 shrink-0">
            <button 
              id="cookie-settings-btn"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cookie Settings
            </button>
            <button 
              id="cookie-accept-btn"
              class="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Accept All
            </button>
            <button 
              id="cookie-reject-btn"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Reject All
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function CookiePreferencesModal({ language }: CookieConsentProps) {
  return (
    <div id="cookie-preferences-modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden">
      <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-2xl font-bold text-gray-900">Cookie Preferences</h2>
            <button id="close-cookie-modal" class="text-gray-400 hover:text-gray-600">
              <i class="fas fa-times text-xl"></i>
            </button>
          </div>
          
          <p class="text-gray-600 mb-6">
            We use cookies to enhance your experience, analyze site usage, and assist in marketing efforts. 
            You can choose which categories of cookies to allow below.
          </p>

          <div class="space-y-6">
            {/* Essential Cookies */}
            <div class="border border-gray-200 rounded-lg p-4">
              <div class="flex items-center justify-between mb-3">
                <div>
                  <h3 class="text-lg font-semibold text-gray-900">Essential Cookies</h3>
                  <p class="text-sm text-gray-600">Required for basic site functionality</p>
                </div>
                <div class="relative">
                  <input type="checkbox" id="essential-cookies" checked disabled class="sr-only" />
                  <div class="w-12 h-6 bg-blue-600 rounded-full shadow-inner cursor-not-allowed">
                    <div class="w-6 h-6 bg-white rounded-full shadow transform translate-x-6 transition-transform"></div>
                  </div>
                </div>
              </div>
              <p class="text-sm text-gray-500">
                These cookies are necessary for the website to function properly. They enable basic features 
                like page navigation and access to secure areas of the website.
              </p>
            </div>

            {/* Analytics Cookies */}
            <div class="border border-gray-200 rounded-lg p-4">
              <div class="flex items-center justify-between mb-3">
                <div>
                  <h3 class="text-lg font-semibold text-gray-900">Analytics Cookies</h3>
                  <p class="text-sm text-gray-600">Help us understand how visitors interact with our website</p>
                </div>
                <div class="relative">
                  <input type="checkbox" id="analytics-cookies" class="sr-only cookie-toggle" />
                  <div class="cookie-toggle-switch w-12 h-6 bg-gray-300 rounded-full shadow-inner cursor-pointer">
                    <div class="cookie-toggle-dot w-6 h-6 bg-white rounded-full shadow transform transition-transform"></div>
                  </div>
                </div>
              </div>
              <p class="text-sm text-gray-500">
                These cookies collect information about how visitors use our website, such as which pages 
                are visited most often and if they get error messages.
              </p>
            </div>

            {/* Marketing Cookies */}
            <div class="border border-gray-200 rounded-lg p-4">
              <div class="flex items-center justify-between mb-3">
                <div>
                  <h3 class="text-lg font-semibold text-gray-900">Marketing Cookies</h3>
                  <p class="text-sm text-gray-600">Used to deliver relevant advertisements</p>
                </div>
                <div class="relative">
                  <input type="checkbox" id="marketing-cookies" class="sr-only cookie-toggle" />
                  <div class="cookie-toggle-switch w-12 h-6 bg-gray-300 rounded-full shadow-inner cursor-pointer">
                    <div class="cookie-toggle-dot w-6 h-6 bg-white rounded-full shadow transform transition-transform"></div>
                  </div>
                </div>
              </div>
              <p class="text-sm text-gray-500">
                These cookies are used to deliver advertisements that are more relevant to you and your interests. 
                They may also be used to limit the number of times you see an advertisement.
              </p>
            </div>

            {/* Functional Cookies */}
            <div class="border border-gray-200 rounded-lg p-4">
              <div class="flex items-center justify-between mb-3">
                <div>
                  <h3 class="text-lg font-semibold text-gray-900">Functional Cookies</h3>
                  <p class="text-sm text-gray-600">Enable enhanced functionality and personalization</p>
                </div>
                <div class="relative">
                  <input type="checkbox" id="functional-cookies" class="sr-only cookie-toggle" />
                  <div class="cookie-toggle-switch w-12 h-6 bg-gray-300 rounded-full shadow-inner cursor-pointer">
                    <div class="cookie-toggle-dot w-6 h-6 bg-white rounded-full shadow transform transition-transform"></div>
                  </div>
                </div>
              </div>
              <p class="text-sm text-gray-500">
                These cookies allow the website to remember choices you make and provide enhanced, 
                more personal features such as language preference and region selection.
              </p>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-3 mt-8">
            <button 
              id="save-cookie-preferences"
              class="flex-1 px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save Preferences
            </button>
            <button 
              id="accept-all-cookies"
              class="flex-1 px-6 py-3 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}