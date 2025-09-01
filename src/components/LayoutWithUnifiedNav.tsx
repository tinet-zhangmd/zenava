import { html } from 'hono/html'
import { Language } from '../utils/i18n'
import { UnifiedNavigation, type NavigationConfig, type NavMenuItem } from './UnifiedNavigation'
import { CookieConsent, CookiePreferencesModal } from './CookieConsent'
import { FooterConfig, FooterSection, PrivacyLink } from '../utils/common-content'

interface LayoutProps {
  children: any
  language: Language
  currentPath: string
  title?: string
  description?: string
  seoTitle?: string
  seoDescription?: string
  seoKeywords?: string
  navigationConfig: NavigationConfig
  menuItems: NavMenuItem[]
  footerConfig: FooterConfig
  footerSections: FooterSection[]
  privacyLinks: PrivacyLink[]
}

export function LayoutWithUnifiedNav({ 
  children, 
  language, 
  currentPath, 
  title, 
  description, 
  seoTitle, 
  seoDescription, 
  seoKeywords,
  navigationConfig,
  menuItems,
  footerConfig,
  footerSections,
  privacyLinks
}: LayoutProps) {
  const siteTitle = seoTitle || title || 'ZENAVA - AI Agent for Enterprise'
  const siteDescription = seoDescription || description || 'AI Agent for Enterprise Customer Dialogue Scenarios'

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
                    },
                    brand: {
                      primary: '#3b82f6',
                      secondary: '#6366f1'
                    }
                  }
                }
              }
            }
          `
        }} />
      </head>
      <body class="bg-white">
        {/* Unified Navigation */}
        <UnifiedNavigation 
          config={navigationConfig}
          menuItems={menuItems}
          currentLanguage={language}
          currentPath={currentPath}
        />

        {/* Main Content */}
        <main class={navigationConfig.nav_fixed !== false ? 'pt-16' : ''}>
          {children}
        </main>

        {/* Footer */}
        <footer class="bg-gray-900 text-white">
          <div class="site-container px-4 sm:px-6 lg:px-8 py-12">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Logo and Description */}
              <div class="md:col-span-1">
                {footerConfig.logo_url ? (
                  <img 
                    src={footerConfig.logo_url}
                    alt={footerConfig.logo_alt}
                    class="h-10 w-auto object-contain mb-4"
                    style="max-width: 160px; filter: brightness(0) invert(1);"
                  />
                ) : (
                  <div class="text-2xl font-bold mb-4">ZENAVA</div>
                )}
                <p class="text-gray-300 text-sm">{footerConfig.subtitle}</p>
              </div>
              
              {/* Footer Sections */}
              {footerSections.map((section) => (
                <div key={section.id}>
                  <h4 class="text-lg font-semibold mb-4">{section.title}</h4>
                  <ul class="space-y-2">
                    {section.links?.map((link) => (
                      <li key={link.id}>
                        <a 
                          href={link.url}
                          target={link.target || '_self'}
                          class="text-gray-300 hover:text-white transition-colors text-sm"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            
            {/* Footer Bottom */}
            <div class="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p class="text-gray-400 text-sm">{footerConfig.copyright}</p>
              <div class="flex flex-wrap gap-4 mt-4 md:mt-0">
                {privacyLinks.map((link) => (
                  link.url ? (
                    <a 
                      href={link.url}
                      target={link.target || '_self'}
                      class="text-gray-400 hover:text-white transition-colors text-sm"
                      key={link.id}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <button 
                      id={link.id === 'cookie-preferences' ? 'footer-cookie-preferences' : undefined}
                      class="text-gray-400 hover:text-white transition-colors cursor-pointer text-sm"
                      key={link.id}
                    >
                      {link.label}
                    </button>
                  )
                ))}
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

            // Cookie consent management
            document.addEventListener('DOMContentLoaded', function() {
              if (!getCookie('cookie_consent_given')) {
                document.getElementById('cookie-consent-banner')?.classList.remove('hidden');
              }

              // Setup cookie preference handlers
              document.getElementById('footer-cookie-preferences')?.addEventListener('click', function() {
                document.getElementById('cookie-preferences-modal')?.classList.remove('hidden');
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