import { html } from 'hono/html'
import { Language } from '../utils/i18n.js'
import { UnifiedNavigation, type NavigationConfig, type NavMenuItem } from './UnifiedNavigation.js'
import { UnifiedFooter } from './UnifiedFooter.js'
import { ContactSection } from './ContactSection.js'
import { OtherResourcesSection } from './OtherResourcesSection.js'
import { CookieConsent, CookiePreferencesModal } from './CookieConsent.js'
import { ScrollToTop } from './ScrollToTop.js'
import { MobileScrollToTop } from './MobileScrollToTop.js'
import { FloatingActionButton } from './FloatingActionButton.js'
import { FooterConfig, FooterSection, PrivacyLink } from '../utils/common-content.js'
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
  ogImage?: string
  ogUrl?: string
  navigationConfig: NavigationConfig
  menuItems: NavMenuItem[]
  footerConfig: FooterConfig
  footerSections: FooterSection[]
  privacyLinks: PrivacyLink[]
  featuredContents?: any[]  // 推荐文章列表（可选，仅在首页传递）
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
  ogImage,
  ogUrl,
  navigationConfig,
  menuItems,
  footerConfig,
  footerSections,
  privacyLinks,
  featuredContents = []
}: LayoutProps) {
  const defaultTitle = language === 'jp' ? 'ZENAVA - エンタープライズ向けAIエージェント' : 
                       language === 'hk' ? 'ZENAVA - 企業級AI代理' : 
                       'ZENAVA - AI Agent for Enterprise'
  const defaultDescription = language === 'jp' ? 'マーケティングとサービスシナリオ向けの対話型AIエージェント' :
                            language === 'hk' ? '營銷和服務場景的對話型AI代理' :
                            'AI Agent for Enterprise Customer Dialogue Scenarios'
  const siteTitle = seoTitle || title || defaultTitle
  const siteDescription = seoDescription || description || defaultDescription

  return (
    <html lang={language}>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{siteTitle}</title>
        <meta name="description" content={siteDescription} />
        {seoKeywords && <meta name="keywords" content={seoKeywords} />}
        
        {/* Favicon */}
        <link rel="icon" type="image/x-icon" href="/assets/images/zenava.ico" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={siteDescription} />
        <meta property="og:type" content="article" />
        {ogUrl && <meta property="og:url" content={ogUrl} />}
        {ogImage && <meta property="og:image" content={ogImage} />}
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={siteTitle} />
        <meta name="twitter:description" content={siteDescription} />
        {ogImage && <meta name="twitter:image" content={ogImage} />}
        
        {/* Tailwind CSS */}
        <script src="https://cdn.tailwindcss.com"></script>
        
        {/* FontAwesome Icons */}
        <link href="/static/fontawesome/css/all.min.css" rel="stylesheet" />
        
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
        
        {/* Baidu Analytics */}
        <BaiduAnalyticsScript />
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
          
          {/* Other Resources Section - 资源中心版块（所有页面统一，联系表单页面、关于我们页面、资源中心页面、资源详情页面和特定产品/行业页面除外） */}
          {(() => {
            // 排除的路径列表
            const excludedPaths = [
              '/contact',
              '/about',
              '/resources',
              '/products/ai-agents',
              '/products/live-chat',
              '/products/voice-agents',
              '/industries/retail',
              '/industries/automotive',
              '/industries/software',
              '/industries/travel'
            ]
            
            // 检查当前路径是否在排除列表中（支持多语言路径）
            const shouldExclude = excludedPaths.some(path => {
              // 检查完整路径匹配（如 /products/ai-agents）
              if (currentPath === path) return true
              // 检查多语言路径（如 /zh/products/ai-agents, /en/products/ai-agents）
              // 使用 endsWith 确保精确匹配，避免误匹配（如 /products/ai-agents-new）
              if (currentPath.endsWith(path) || currentPath.includes(`/${path}`)) return true
              return false
            })
            
            // 排除资源详情页（如 /resources/blog/123 或 /zh/resources/blog/video-two）
            // 资源详情页路径格式：/resources/:slug/:id 或 /:lang/resources/:slug/:id
            // :id 可以是数字（如 123）或 slug（如 video-two）
            const isResourceDetailPage = /^(\/[a-z]{2})?\/resources\/[^\/]+\/[^\/]+$/.test(currentPath)
            
            // 排除资源列表页（如 /resources/hybg 或 /zh/resources/hybg）
            // 资源列表页路径格式：/resources/:slug 或 /:lang/resources/:slug（不包含数字ID）
            const isResourceListPage = /^(\/[a-z]{2})?\/resources\/[^\/]+$/.test(currentPath) && !isResourceDetailPage
            
            return !shouldExclude && !isResourceDetailPage && !isResourceListPage && (
              <OtherResourcesSection language={language} featuredContents={featuredContents} />
            )
          })()}
          
          {/* Contact Section - 联系表单版块（所有页面统一，联系表单页面除外，关于我们页面和资源中心页面需要显示） */}
          {!currentPath.includes('/contact') && (
          <ContactSection language={language} />
          )}
        </main>

        {/* Unified Footer */}
        <UnifiedFooter 
          language={language}
          config={footerConfig}
          sections={footerSections}
          privacyLinks={privacyLinks}
        />

        {/* Floating Action Button - 悬浮按钮（联系我们 + 返回顶部） */}
        <FloatingActionButton language={language} />

        {/* Scroll to Top Buttons - 保留作为备用 */}
        {/* <ScrollToTop /> */}
        {/* <MobileScrollToTop /> */}

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
              document.cookie = name + '=' + value + ';expires=' + expires.toUTCString() + ';path=/;SameSite=Strict;Secure';
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

            // Show cookie preferences modal
            function showCookiePreferences() {
              const modal = document.getElementById('cookie-preferences-modal');
              if (modal) {
                modal.classList.remove('hidden');
              }
            }

            // Cookie consent management
            document.addEventListener('DOMContentLoaded', function() {
              const banner = document.getElementById('cookie-consent-banner');
              const modal = document.getElementById('cookie-preferences-modal');
              
              // Show banner if no consent given
              if (!getCookie('cookie_consent_given')) {
                banner?.classList.remove('hidden');
              }

              // Cookie consent banner handlers
              document.getElementById('cookie-accept-btn')?.addEventListener('click', function() {
                setCookie('cookie_consent_given', 'true');
                setCookie('cookie_necessary', 'true');
                setCookie('cookie_analytics', 'true');
                setCookie('cookie_marketing', 'true');
                banner?.classList.add('hidden');
              });

              document.getElementById('cookie-reject-btn')?.addEventListener('click', function() {
                setCookie('cookie_consent_given', 'true');
                setCookie('cookie_necessary', 'true');
                setCookie('cookie_analytics', 'false');
                setCookie('cookie_marketing', 'false');
                banner?.classList.add('hidden');
              });

              document.getElementById('cookie-settings-btn')?.addEventListener('click', function() {
                banner?.classList.add('hidden');
                showCookiePreferences();
              });

              // Cookie preferences modal handlers
              document.getElementById('close-cookie-modal')?.addEventListener('click', function() {
                modal?.classList.add('hidden');
              });

              document.getElementById('save-cookie-preferences')?.addEventListener('click', function() {
                setCookie('cookie_consent_given', 'true');
                setCookie('cookie_necessary', 'true');
                
                const analytics = document.getElementById('analytics-cookies');
                const marketing = document.getElementById('marketing-cookies');
                
                setCookie('cookie_analytics', analytics?.checked ? 'true' : 'false');
                setCookie('cookie_marketing', marketing?.checked ? 'true' : 'false');
                
                modal?.classList.add('hidden');
              });

              document.getElementById('accept-all-cookies')?.addEventListener('click', function() {
                setCookie('cookie_consent_given', 'true');
                setCookie('cookie_necessary', 'true');
                setCookie('cookie_analytics', 'true');
                setCookie('cookie_marketing', 'true');
                
                const analytics = document.getElementById('analytics-cookies');
                const marketing = document.getElementById('marketing-cookies');
                if (analytics) analytics.checked = true;
                if (marketing) marketing.checked = true;
                
                modal?.classList.add('hidden');
              });

              // Setup cookie preference link handlers
              document.getElementById('footer-cookie-preferences')?.addEventListener('click', function() {
                showCookiePreferences();
              });

              // Set initial checkbox states based on saved preferences
              const analyticsConsent = getCookie('cookie_analytics');
              const marketingConsent = getCookie('cookie_marketing');
              
              if (analyticsConsent !== null) {
                const analytics = document.getElementById('analytics-cookies');
                if (analytics) analytics.checked = analyticsConsent === 'true';
                updateToggleSwitch(analytics);
              }
              
              if (marketingConsent !== null) {
                const marketing = document.getElementById('marketing-cookies');
                if (marketing) marketing.checked = marketingConsent === 'true';
                updateToggleSwitch(marketing);
              }
              
              // Handle toggle switch clicks
              document.querySelectorAll('.cookie-toggle').forEach(function(toggle) {
                const wrapper = toggle.parentElement;
                if (wrapper && !toggle.disabled) {
                  wrapper.addEventListener('click', function() {
                    toggle.checked = !toggle.checked;
                    updateToggleSwitch(toggle);
                  });
                }
              });
              
              function updateToggleSwitch(toggle) {
                if (!toggle) return;
                const switchEl = toggle.nextElementSibling;
                const handle = switchEl?.nextElementSibling;
                if (toggle.checked) {
                  if (switchEl) switchEl.classList.add('bg-blue-600');
                  if (switchEl) switchEl.classList.remove('bg-gray-200');
                  if (handle) handle.style.transform = 'translateX(1.5rem)';
                } else {
                  if (switchEl) switchEl.classList.remove('bg-blue-600');
                  if (switchEl) switchEl.classList.add('bg-gray-200');
                  if (handle) handle.style.transform = 'translateX(0)';
                }
              }
            });

            // Make showCookiePreferences globally available
            window.showCookiePreferences = showCookiePreferences;
          `
        }} />

        {/* JavaScript */}
        <script src="/static/app.js"></script>
      </body>
    </html>
  )
}