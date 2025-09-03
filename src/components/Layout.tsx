import { html } from 'hono/html'
import { Language, getTranslation, t, languageFlags, languageNames, getLocalizedPath } from '../utils/i18n'
import { CookieConsent, CookiePreferencesModal } from './CookieConsent'

interface LayoutProps {
  children: any
  language: Language
  currentPath: string
  title?: string
  description?: string
  seoTitle?: string
  seoDescription?: string
  seoKeywords?: string
}

export function Layout({ children, language, currentPath, title, description, seoTitle, seoDescription, seoKeywords }: LayoutProps) {
  const translations = getTranslation(language)
  const siteTitle = seoTitle || title || t(translations, 'site.title')
  const siteDescription = seoDescription || description || t(translations, 'site.description')

  return (
    <html lang={language}>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{siteTitle}</title>
        <meta name="description" content={siteDescription} />
        {seoKeywords && <meta name="keywords" content={seoKeywords} />}
        
        {/* Open Graph Tags */}
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={siteDescription} />
        <meta property="og:type" content="website" />
        
        {/* Tailwind CSS */}
        <script src="https://cdn.tailwindcss.com"></script>
        
        {/* FontAwesome Icons */}
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
        
        {/* Custom Styles */}
        <link href="/static/styles.css" rel="stylesheet" />
        <link href="/static/cookie-styles.css" rel="stylesheet" />
        
        {/* Tailwind Custom Config */}
        <script dangerouslySetInnerHTML={{
          __html: `
            tailwind.config = {
              theme: {
                extend: {
                  colors: {
                    primary: {
                      50: '#eff6ff',
                      100: '#dbeafe', 
                      500: '#3b82f6',
                      600: '#2563eb',
                      700: '#1d4ed8',
                    },
                    secondary: {
                      500: '#6366f1',
                      600: '#4f46e5',
                    }
                  },
                  animation: {
                    'fade-in': 'fadeIn 0.5s ease-in-out',
                    'slide-up': 'slideUp 0.6s ease-out',
                  }
                }
              }
            }
          `
        }} />
      </head>
      <body class="bg-white">
        {/* Navigation */}
        <nav class="fixed top-0 w-full global-nav backdrop-blur-sm border-b z-50">
          <div class="site-container px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
              {/* Logo */}
              <div class="flex-shrink-0">
                <a href={getLocalizedPath('/', language)} class="flex items-center">
                  <img 
                    src="https://page.gensparksite.com/v1/base64_upload/1476812a0b97e2ad48a012ceb5c7946e" 
                    alt="ZENAVA" 
                    class="h-10 sm:h-12 w-auto object-contain transition-all duration-300 hover:opacity-80"
                    style="max-width: 200px;"
                  />
                </a>
              </div>

              {/* Navigation Links */}
              <div class="hidden md:block">
                <div class="ml-10 flex items-baseline space-x-8">
                  {/* Scenarios Dropdown */}
                  <div class="relative group">
                    <button class="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors flex items-center">
                      {t(translations, 'nav.scenarios')}
                      <i class="fas fa-chevron-down ml-1 text-xs"></i>
                    </button>
                    <div class="absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <div class="py-2">
                        <a href={getLocalizedPath('/scenarios/marketing', language)} 
                           class="nav-link block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600">
                          {t(translations, 'nav.marketing')}
                        </a>
                        <a href={getLocalizedPath('/scenarios/sales', language)}
                           class="nav-link block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600">
                          {t(translations, 'nav.sales')}
                        </a>
                        <a href={getLocalizedPath('/scenarios/customer-service', language)}
                           class="nav-link block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600">
                          {t(translations, 'nav.customer_service')}
                        </a>
                        <a href={getLocalizedPath('/scenarios/internal-service', language)}
                           class="nav-link block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600">
                          {t(translations, 'nav.internal_service')}
                        </a>
                        <a href={getLocalizedPath('/scenarios/management', language)}
                           class="nav-link block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600">
                          {t(translations, 'nav.management')}
                        </a>
                      </div>
                    </div>
                  </div>

                  <a href={getLocalizedPath('/about', language)}
                     class="nav-link text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors">
                    {t(translations, 'nav.about')}
                  </a>
                </div>
              </div>

              {/* Language Switcher */}
              <div class="flex items-center space-x-4">
                <div class="relative group">
                  <button class="flex items-center space-x-1 text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium">
                    <span>{languageFlags[language]}</span>
                    <span>{languageNames[language]}</span>
                    <i class="fas fa-chevron-down text-xs"></i>
                  </button>
                  <div class="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div class="py-2">
                      <a href={getLocalizedPath(currentPath, 'en')} 
                         class="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 flex items-center space-x-2">
                        <span>🇺🇸</span>
                        <span>English</span>
                      </a>
                      <a href={getLocalizedPath(currentPath, 'jp')}
                         class="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 flex items-center space-x-2">
                        <span>🇯🇵</span>
                        <span>日本語</span>
                      </a>
                      <a href={getLocalizedPath(currentPath, 'hk')}
                         class="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 flex items-center space-x-2">
                        <span>🇭🇰</span>
                        <span>繁體中文</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Mobile menu button */}
                <button class="md:hidden text-gray-700 hover:text-primary-600">
                  <i class="fas fa-bars"></i>
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main class="pt-16">
          {children}
        </main>

        {/* Footer */}
        <footer class="bg-gray-900 text-white">
          <div class="site-container px-4 sm:px-6 lg:px-8 py-12">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div class="col-span-1 md:col-span-2">
                <div class="mb-4">
                  <img 
                    src="https://page.gensparksite.com/v1/base64_upload/1476812a0b97e2ad48a012ceb5c7946e" 
                    alt="ZENAVA" 
                    class="h-10 w-auto object-contain"
                    style="max-width: 160px; filter: brightness(0) invert(1);"
                  />
                </div>
                <p class="text-gray-300 mb-4">{t(translations, 'site.description')}</p>
              </div>
              
              <div>
                <h4 class="text-lg font-semibold mb-4">{t(translations, 'nav.scenarios')}</h4>
                <ul class="space-y-2 text-gray-300">
                  <li><a href={getLocalizedPath('/scenarios/marketing', language)} class="hover:text-white transition-colors">{t(translations, 'nav.marketing')}</a></li>
                  <li><a href={getLocalizedPath('/scenarios/sales', language)} class="hover:text-white transition-colors">{t(translations, 'nav.sales')}</a></li>
                  <li><a href={getLocalizedPath('/scenarios/customer-service', language)} class="hover:text-white transition-colors">{t(translations, 'nav.customer_service')}</a></li>
                  <li><a href={getLocalizedPath('/scenarios/internal-service', language)} class="hover:text-white transition-colors">{t(translations, 'nav.internal_service')}</a></li>
                  <li><a href={getLocalizedPath('/scenarios/management', language)} class="hover:text-white transition-colors">{t(translations, 'nav.management')}</a></li>
                </ul>
              </div>
              
              <div>
                <h4 class="text-lg font-semibold mb-4">{t(translations, 'nav.about')}</h4>
                <ul class="space-y-2 text-gray-300">
                  <li><a href={getLocalizedPath('/about', language)} class="hover:text-white transition-colors">{t(translations, 'nav.about')}</a></li>
                  <li><a href={getLocalizedPath('/contact', language)} class="hover:text-white transition-colors">{t(translations, 'nav.contact')}</a></li>
                </ul>
              </div>
            </div>
            
            <div class="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p class="text-gray-400">{t(translations, 'footer.copyright')}</p>
              <div class="flex flex-wrap gap-4 mt-4 md:mt-0 text-center">
                <a href={getLocalizedPath('/privacy-policy', language)} class="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                <a href={getLocalizedPath('/terms-and-conditions', language)} class="text-gray-400 hover:text-white transition-colors">Terms & Conditions</a>
                <button id="footer-cookie-preferences" class="text-gray-400 hover:text-white transition-colors cursor-pointer">Cookie Preferences</button>
              </div>
            </div>
          </div>
        </footer>

        {/* Cookie Consent Components */}
        <CookieConsent language={language} />
        <CookiePreferencesModal language={language} />

        {/* Cookie Management JavaScript */}
        <script dangerouslySetInnerHTML={{
          __html: `
            // Cookie utility functions
            function setCookie(name, value, days = 365) {
              const expires = new Date();
              expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
              document.cookie = name + '=' + value + ';expires=' + expires.toUTCString() + ';path=/;SameSite=Lax';
            }

            function getCookie(name) {
              const nameEQ = name + '=';
              const ca = document.cookie.split(';');
              for (let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) === ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
              }
              return null;
            }

            function deleteCookie(name) {
              document.cookie = name + '=; Max-Age=-99999999; path=/;';
            }

            // Cookie categories management
            const cookiePreferences = {
              essential: true,    // Always true, cannot be disabled
              analytics: false,
              marketing: false,
              functional: false
            };

            // Load existing preferences
            function loadCookiePreferences() {
              const stored = getCookie('cookie_preferences');
              if (stored) {
                try {
                  const preferences = JSON.parse(stored);
                  Object.assign(cookiePreferences, preferences);
                } catch (e) {
                  console.error('Error parsing cookie preferences:', e);
                }
              }
            }

            // Save preferences
            function saveCookiePreferences() {
              setCookie('cookie_preferences', JSON.stringify(cookiePreferences));
              setCookie('cookie_consent_given', 'true');
            }

            // Update toggle switches in modal
            function updateToggleSwitches() {
              const toggles = [
                { id: 'analytics-cookies', preference: 'analytics' },
                { id: 'marketing-cookies', preference: 'marketing' },
                { id: 'functional-cookies', preference: 'functional' }
              ];

              toggles.forEach(toggle => {
                const checkbox = document.getElementById(toggle.id);
                const switchEl = checkbox.nextElementSibling;
                const dot = switchEl.querySelector('.cookie-toggle-dot');
                
                if (cookiePreferences[toggle.preference]) {
                  checkbox.checked = true;
                  switchEl.classList.remove('bg-gray-300');
                  switchEl.classList.add('bg-blue-600');
                  dot.classList.add('translate-x-6');
                } else {
                  checkbox.checked = false;
                  switchEl.classList.remove('bg-blue-600');
                  switchEl.classList.add('bg-gray-300');
                  dot.classList.remove('translate-x-6');
                }
              });
            }

            // Check if consent banner should be shown
            function shouldShowConsentBanner() {
              return !getCookie('cookie_consent_given');
            }

            // Show/hide elements
            function showElement(id) {
              const el = document.getElementById(id);
              if (el) el.classList.remove('hidden');
            }

            function hideElement(id) {
              const el = document.getElementById(id);
              if (el) el.classList.add('hidden');
            }

            // Accept all cookies
            function acceptAllCookies() {
              cookiePreferences.analytics = true;
              cookiePreferences.marketing = true;
              cookiePreferences.functional = true;
              saveCookiePreferences();
              hideElement('cookie-consent-banner');
              hideElement('cookie-preferences-modal');
              updateToggleSwitches();
            }

            // Reject all cookies (except essential)
            function rejectAllCookies() {
              cookiePreferences.analytics = false;
              cookiePreferences.marketing = false;
              cookiePreferences.functional = false;
              saveCookiePreferences();
              hideElement('cookie-consent-banner');
              hideElement('cookie-preferences-modal');
              updateToggleSwitches();
            }

            // Show cookie preferences modal
            function showCookiePreferences() {
              updateToggleSwitches();
              showElement('cookie-preferences-modal');
              hideElement('cookie-consent-banner');
            }

            // Initialize on page load
            document.addEventListener('DOMContentLoaded', function() {
              loadCookiePreferences();

              // Show consent banner if needed
              if (shouldShowConsentBanner()) {
                showElement('cookie-consent-banner');
              }

              // Banner buttons
              const acceptBtn = document.getElementById('cookie-accept-btn');
              const rejectBtn = document.getElementById('cookie-reject-btn');
              const settingsBtn = document.getElementById('cookie-settings-btn');

              if (acceptBtn) acceptBtn.addEventListener('click', acceptAllCookies);
              if (rejectBtn) rejectBtn.addEventListener('click', rejectAllCookies);
              if (settingsBtn) settingsBtn.addEventListener('click', showCookiePreferences);

              // Modal buttons
              const closeBtn = document.getElementById('close-cookie-modal');
              const saveBtn = document.getElementById('save-cookie-preferences');
              const acceptAllModalBtn = document.getElementById('accept-all-cookies');
              const footerBtn = document.getElementById('footer-cookie-preferences');

              if (closeBtn) closeBtn.addEventListener('click', () => hideElement('cookie-preferences-modal'));
              if (saveBtn) saveBtn.addEventListener('click', function() {
                saveCookiePreferences();
                hideElement('cookie-preferences-modal');
              });
              if (acceptAllModalBtn) acceptAllModalBtn.addEventListener('click', acceptAllCookies);
              if (footerBtn) footerBtn.addEventListener('click', showCookiePreferences);

              // Toggle switches
              const toggles = document.querySelectorAll('.cookie-toggle');
              toggles.forEach(toggle => {
                const switchEl = toggle.nextElementSibling;
                if (switchEl) {
                  switchEl.addEventListener('click', function() {
                    const isChecked = toggle.checked;
                    toggle.checked = !isChecked;
                    
                    const preference = toggle.id.replace('-cookies', '');
                    cookiePreferences[preference] = toggle.checked;
                    
                    updateToggleSwitches();
                  });
                }
              });

              // Close modal when clicking outside
              document.getElementById('cookie-preferences-modal')?.addEventListener('click', function(e) {
                if (e.target === this) {
                  hideElement('cookie-preferences-modal');
                }
              });
            });
          `
        }} />

        {/* JavaScript */}
        <script src="/static/app.js"></script>
      </body>
    </html>
  )
}