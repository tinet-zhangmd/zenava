import { html } from 'hono/html'
import { Language, getTranslation, t, languageFlags, languageNames, getLocalizedPath } from '../utils/i18n.js'
import { CookieConsent, CookiePreferencesModal } from './CookieConsent.js'
import { NavigationConfig, FooterConfig, FooterSection, PrivacyLink } from '../utils/common-content.js'
import { BaiduAnalyticsScript } from './BaiduAnalytics.js'

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
  footerConfig: FooterConfig
  footerSections: FooterSection[]
  privacyLinks: PrivacyLink[]
}

export function LayoutWithCommonContent({ 
  children, 
  language, 
  currentPath, 
  title, 
  description, 
  seoTitle, 
  seoDescription, 
  seoKeywords,
  navigationConfig,
  footerConfig,
  footerSections,
  privacyLinks
}: LayoutProps) {
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
        
        {/* Tailwind Custom Config */}
        <script dangerouslySetInnerHTML={{
          __html: `
            tailwind.config = {
              theme: {
                extend: {
                  colors: {
                    brand: {
                      primary: '#6366F1',
                      secondary: '#8B5CF6',
                      accent: '#EC4899',
                      dark: '#1E293B',
                      light: '#F8FAFC'
                    }
                  },
                  animation: {
                    'fade-in': 'fadeIn 0.5s ease-in-out',
                    'slide-up': 'slideUp 0.5s ease-out',
                    'slide-down': 'slideDown 0.3s ease-out'
                  }
                }
              }
            }
          `
        }} />
        
        {/* Baidu Analytics */}
        <BaiduAnalyticsScript />
      </head>
      <body class="bg-white font-sans" style={{
        ...(navigationConfig?.text_color ? { ['--nav-text' as any]: navigationConfig.text_color } : {}),
        ...(navigationConfig?.hover_color ? { ['--nav-hover' as any]: navigationConfig.hover_color } : {}),
        ...(navigationConfig?.bg_color ? { ['--nav-bg' as any]: navigationConfig.bg_color } : {}),
        ...(navigationConfig?.border_color ? { ['--nav-border' as any]: navigationConfig.border_color } : {}),
        ...(navigationConfig?.font_family ? { fontFamily: navigationConfig.font_family } : {}),
      }}>
        {/* Navigation */}
        <nav class="fixed top-0 w-full global-nav backdrop-blur-md shadow-sm z-50 transition-all duration-300 border-b">
          <div class="site-container px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center py-4">
              <div class="flex items-center space-x-8">
                <a href={getLocalizedPath('/', language)} class="flex items-center space-x-2 group">
                  {navigationConfig.logo_url ? (
                    <img 
                      src={navigationConfig.logo_url}
                      alt={navigationConfig.logo_alt}
                      class="h-10 sm:h-12 w-auto object-contain transition-all duration-300 hover:opacity-80"
                      style="max-width: 200px;"
                    />
                  ) : (
                    <span class="text-2xl font-bold bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
                      Zenava
                    </span>
                  )}
                </a>
                
                <div class="hidden md:flex items-center" style={{ columnGap: navigationConfig?.gap_x || undefined }}>
                  <div class="relative group">
                    <button class="text-gray-700 hover:text-brand-primary transition-colors flex items-center space-x-1 py-2">
                      <span>{t(translations, 'nav.scenarios')}</span>
                      <i class="fas fa-chevron-down text-xs"></i>
                    </button>
                    <div class="absolute top-full left-0 mt-1 w-72 bg-white rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2">
                      <div class="p-2">
                        <a href={getLocalizedPath('/scenarios/marketing', language)} class="nav-link block px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                          <div class="flex items-center space-x-3">
                            <i class="fas fa-bullhorn text-brand-primary"></i>
                            <div>
                              <div class="font-medium text-gray-900">Zenava for Marketing</div>
                              <div class="text-xs text-gray-500 line-clamp-2">AI-driven lead generation, qualification, and conversion optimization.</div>
                            </div>
                          </div>
                        </a>
                        <a href={getLocalizedPath('/scenarios/sales', language)} class="nav-link block px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                          <div class="flex items-center space-x-3">
                            <i class="fas fa-chart-line text-brand-primary"></i>
                            <div>
                              <div class="font-medium text-gray-900">Zenava for Sales</div>
                              <div class="text-xs text-gray-500 line-clamp-2">AI-powered sales guidance, personalized recommendations, and conversion optimization.</div>
                            </div>
                          </div>
                        </a>
                        <a href={getLocalizedPath('/scenarios/customer-service', language)} class="nav-link block px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                          <div class="flex items-center space-x-3">
                            <i class="fas fa-headset text-brand-primary"></i>
                            <div>
                              <div class="font-medium text-gray-900">Zenava for Customer Service</div>
                              <div class="text-xs text-gray-500 line-clamp-2">Intelligent customer support, 24/7 availability, multi-channel integration.</div>
                            </div>
                          </div>
                        </a>
                        <a href={getLocalizedPath('/scenarios/internal-service', language)} class="nav-link block px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                          <div class="flex items-center space-x-3">
                            <i class="fas fa-users-cog text-brand-primary"></i>
                            <div>
                              <div class="font-medium text-gray-900">Zenava for Internal Service</div>
                              <div class="text-xs text-gray-500 line-clamp-2">AI-powered employee support, knowledge base, and process automation.</div>
                            </div>
                          </div>
                        </a>
                        <a href={getLocalizedPath('/scenarios/management', language)} class="nav-link block px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                          <div class="flex items-center space-x-3">
                            <i class="fas fa-tasks text-brand-primary"></i>
                            <div>
                              <div class="font-medium text-gray-900">Zenava for Management</div>
                              <div class="text-xs text-gray-500 line-clamp-2">Customer insights driving actionable optimization for competitive advantage.</div>
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <a href={getLocalizedPath('/about', language)} class="nav-link text-gray-700 hover:text-brand-primary transition-colors">
                    {t(translations, 'nav.about')}
                  </a>
                </div>
              </div>
              
              <div class="flex items-center space-x-4">
                {/* Language Selector */}
                <div class="relative group">
                  <button class="inline-flex items-center align-middle space-x-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <span class="inline-flex items-center" style="font-size: 1.25rem; line-height: 1;">{languageFlags[language]}</span>
                    <span class="inline-flex items-center text-sm font-medium text-gray-700" style="line-height: 1;">{languageNames[language]}</span>
                    <i class="fas fa-chevron-down text-xs text-gray-500 inline-flex items-center" style="line-height: 1;"></i>
                  </button>
                  <div class="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div class="p-2">
                      {(['en', 'jp', 'hk'] as Language[]).map((lang) => (
                        <a 
                          href={getLocalizedPath(currentPath, lang)}
                          class={`inline-flex items-center align-middle space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors ${lang === language ? 'bg-gray-50' : ''}`}
                        >
                          <span class="inline-flex items-center" style="font-size: 1.25rem; line-height: 1;">{languageFlags[lang]}</span>
                          <span class="inline-flex items-center text-sm font-medium text-gray-700" style="line-height: 1;">{languageNames[lang]}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Mobile Menu Button */}
                <button class="md:hidden p-2 rounded-lg hover:bg-gray-50" onclick="toggleMobileMenu()">
                  <i class="fas fa-bars text-gray-700"></i>
                </button>
              </div>
            </div>
          </div>
        </nav>
        
        {/* Mobile Menu */}
        <div id="mobileMenu" class="fixed inset-0 bg-black/50 z-40 md:hidden opacity-0 invisible transition-all duration-300">
          <div class="absolute right-0 top-0 h-full w-80 bg-white shadow-xl transform translate-x-full transition-transform duration-300">
            <div class="p-4 border-b">
              <div class="flex justify-between items-center">
                <h3 class="text-lg font-semibold">Menu</h3>
                <button onclick="toggleMobileMenu()" class="p-2 rounded-lg hover:bg-gray-50">
                  <i class="fas fa-times text-gray-700"></i>
                </button>
              </div>
            </div>
            <div class="p-4 space-y-4">
              <a href={getLocalizedPath('/scenarios/marketing', language)} class="block px-4 py-3 rounded-lg hover:bg-gray-50">
                <i class="fas fa-bullhorn text-brand-primary mr-3"></i>
                Zenava for Marketing
              </a>
              <a href={getLocalizedPath('/scenarios/sales', language)} class="block px-4 py-3 rounded-lg hover:bg-gray-50">
                <i class="fas fa-chart-line text-brand-primary mr-3"></i>
                Zenava for Sales
              </a>
              <a href={getLocalizedPath('/scenarios/customer-service', language)} class="block px-4 py-3 rounded-lg hover:bg-gray-50">
                <i class="fas fa-headset text-brand-primary mr-3"></i>
                Zenava for Customer Service
              </a>
              <a href={getLocalizedPath('/scenarios/internal-service', language)} class="block px-4 py-3 rounded-lg hover:bg-gray-50">
                <i class="fas fa-users-cog text-brand-primary mr-3"></i>
                Zenava for Internal Service
              </a>
              <a href={getLocalizedPath('/scenarios/management', language)} class="block px-4 py-3 rounded-lg hover:bg-gray-50">
                <i class="fas fa-tasks text-brand-primary mr-3"></i>
                Zenava for Management
              </a>
              <a href={getLocalizedPath('/about', language)} class="block px-4 py-3 rounded-lg hover:bg-gray-50">
                <i class="fas fa-info-circle text-brand-primary mr-3"></i>
                {t(translations, 'nav.about')}
              </a>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <main class="pt-16">
          {children}
        </main>
        
        {/* Footer */}
        <footer class="bg-gray-900 text-white mt-20">
          <div class="site-container px-4 sm:px-6 lg:px-8 py-12">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Logo and Description */}
              <div class="md:col-span-1">
                {footerConfig.logo_url ? (
                  <img 
                    src={footerConfig.logo_url}
                    alt={footerConfig.logo_alt}
                    class="h-10 w-auto mb-4 object-contain"
                    style="max-width: 160px; filter: brightness(0) invert(1);"
                  />
                ) : (
                  <h3 class="text-2xl font-bold mb-4">Zenava</h3>
                )}
                <p class="text-gray-400 text-sm">
                  {footerConfig.logo_subtitle || 'AI Agent for Enterprise Customer Dialogue Scenarios'}
                </p>
              </div>
              
              {/* Dynamic Footer Sections */}
              {footerSections.map(section => (
                <div>
                  <h4 class="font-semibold mb-4">{section.title}</h4>
                  <ul class="space-y-2">
                    {section.links.map(link => (
                      <li>
                        <a 
                          href={getLocalizedPath(link.url, language)} 
                          target={link.target}
                          class="text-gray-400 hover:text-white transition-colors text-sm"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            
            <div class="border-t border-gray-800 mt-8 pt-8">
              <div class="flex flex-col md:flex-row justify-between items-center">
                <p class="text-gray-400 text-sm">
                  {footerConfig.copyright_text || `© ${new Date().getFullYear()} TI Cloud. All rights reserved.`}
                </p>
                <div class="flex space-x-6 mt-4 md:mt-0">
                  {privacyLinks.map(link => {
                    if (link.link_type === 'cookies' && !link.url) {
                      // Cookie Preferences - trigger modal
                      return (
                        <button 
                          onclick="openCookiePreferences()"
                          class="text-gray-400 hover:text-white transition-colors text-sm"
                        >
                          {link.label}
                        </button>
                      );
                    } else if (link.url) {
                      // Regular link
                      return (
                        <a 
                          href={getLocalizedPath(link.url, language)}
                          target={link.target}
                          class="text-gray-400 hover:text-white transition-colors text-sm"
                        >
                          {link.label}
                        </a>
                      );
                    }
                  })}
                </div>
              </div>
            </div>
          </div>
        </footer>
        
        {/* Cookie Consent Banner */}
        <CookieConsent language={language} />
        
        {/* Cookie Preferences Modal */}
        <CookiePreferencesModal language={language} />
        
        {/* Scripts */}
        <script src="/static/app.js"></script>
        
        <script dangerouslySetInnerHTML={{
          __html: `
            function toggleMobileMenu() {
              const menu = document.getElementById('mobileMenu');
              const menuPanel = menu.querySelector('div');
              
              if (menu.classList.contains('opacity-0')) {
                menu.classList.remove('opacity-0', 'invisible');
                menu.classList.add('opacity-100', 'visible');
                menuPanel.classList.remove('translate-x-full');
                menuPanel.classList.add('translate-x-0');
              } else {
                menu.classList.remove('opacity-100', 'visible');
                menu.classList.add('opacity-0', 'invisible');
                menuPanel.classList.remove('translate-x-0');
                menuPanel.classList.add('translate-x-full');
              }
            }
            
            // Close mobile menu when clicking outside
            document.getElementById('mobileMenu').addEventListener('click', function(e) {
              if (e.target === this) {
                toggleMobileMenu();
              }
            });
          `
        }} />
      </body>
    </html>
  )
}