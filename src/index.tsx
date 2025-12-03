import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'
import { getCookie, setCookie, deleteCookie } from 'hono/cookie'
import { securityHeaders, setSecureCookie, sanitizeInputs, requireAuth, rateLimiter, generateCSRFToken, validateCSRFToken, hashPassword, verifyPassword } from './utils/security.js'
import { Layout } from './components/Layout.js'
import { LayoutWithCommonContent } from './components/LayoutWithCommonContent.js'
import { LayoutWithUnifiedNav } from './components/LayoutWithUnifiedNav.js'
import { Homepage } from './pages/Homepage.js'
import { HomepageDB } from './pages/HomepageDB.js'
import { getNavigationConfig, getFooterConfig } from './utils/common-content.js'
import { getNavigationData } from './utils/navigation-helper.js'
import { AIHomepage } from './pages/AIHomepage.js'
import { ZenavaHomepage } from './pages/ZenavaHomepage.js'
import { AiAgentsPage } from './pages/products/AiAgents.js'
import { LiveChatPage } from './pages/products/LiveChat.js'
import { VoiceAgentsPage } from './pages/products/VoiceAgents.js'
import { ContactPage } from './pages/Contact.js'
import { ResourcesPage } from './pages/Resources.js'
import { ResourceListPage } from './pages/ResourceList.js'
import { ResourceDetailPage } from './pages/ResourceDetail.js'
import { VideoPodcastDetailPage } from './pages/VideoPodcastDetail.js'
import { RetailPage } from './pages/industries/Retail.js'
import { AutomotivePage } from './pages/industries/Automotive.js'
import { SoftwarePage } from './pages/industries/Software.js'
import { TravelPage } from './pages/industries/Travel.js'
import { detectLanguageFromPath, detectLanguageFromIP, Language } from './utils/i18n.js'

// Import Admin Pages
import { AdminLayout } from './pages/admin/AdminLayout.js'
import { AdminLogin } from './pages/admin/AdminLogin.js'
import { Dashboard } from './pages/admin/Dashboard.js'
import { ContentManagement } from './pages/admin/ContentManagement.js'
import { ContentManagementDB } from './pages/admin/ContentManagementDB.js'
import { ContentEditor } from './pages/admin/ContentEditor.js'
import { SEOManagement } from './pages/admin/SEOManagement.js'
import { I18nManagement } from './pages/admin/I18nManagement.js'
import { MediaLibrary } from './pages/admin/MediaLibrary.js'
import { Settings } from './pages/admin/Settings.js'
import { Logs } from './pages/admin/Logs.js'
import { PublishManager } from './pages/admin/PublishManager.js'
import { CommonContentManagement } from './pages/admin/CommonContentManagement.js'
import { CommonContentManagementV2 } from './pages/admin/CommonContentManagementV2.js'
import { ResourceCategoryManagement } from './pages/admin/ResourceCategoryManagement.js'
import { ResourceContentManagement } from './pages/admin/ResourceContentManagement.js'

// Import CMS API
import cmsApi from './api/cms.js'
import publishApi from './api/publish.js'
import commonContentApi from './api/common-content.js'
import uploadApi from './api/upload.js'
import ticketApi from './api/ticket.js'
import { navigation } from './api/navigation.js'

// Define Cloudflare Bindings
type Bindings = {
  DB: D1Database;
}

const app = new Hono<{ Bindings: Bindings }>()

// Apply security headers to all routes
app.use('*', securityHeaders())

// Rate limiting for auth routes
app.use('/ticloudadmin/login', rateLimiter(20, 60000)) // 20 attempts per minute (more lenient for testing)
app.use('/api/*', rateLimiter(100, 60000)) // 100 requests per minute for API

// Enable CORS for API routes
app.use('/api/*', cors())

// Mount CMS API routes
app.route('/api/ticloudcms', cmsApi)
app.route('/api/publish', publishApi)
app.route('/api/common-content', commonContentApi)
app.route('/api/upload', uploadApi)
app.route('/api/ticket', ticketApi)
app.route('/api/navigation', navigation)

// Serve static files
// Note: In Cloudflare Pages, static files in dist/ are served automatically by Pages
// We only need to handle /static/* if it's not in dist/
app.use('/static/*', serveStatic({ root: './public' }))
// /assets/* files are automatically served by Cloudflare Pages from dist/assets/
// No need to handle them in Worker

// Homepage routes - Use static data (no database queries for frontend pages)
// 默认语言为 zh，首页路由 / 直接显示中文内容
app.get('/', (c) => {
  // 默认使用简体中文
  const language: Language = 'zh'
  const currentPath = '/'
  
  // Use static data for navigation and footer
  const { config: navConfig, menuItems } = getNavigationData(language);
  const { config: footerConfig, sections: footerSections, privacyLinks } = getFooterConfig(language);
  
  return c.html(
    <LayoutWithUnifiedNav 
      language={language} 
      currentPath={currentPath}
      navigationConfig={navConfig}
      menuItems={menuItems}
      footerConfig={footerConfig}
      footerSections={footerSections}
      privacyLinks={privacyLinks}
    >
      <HomepageDB 
        language={language}
        pageData={null}
        modules={[]}
        settings={{}}
      />
    </LayoutWithUnifiedNav>
  )
})

app.get('/en', (c) => {
  const language: Language = 'en'
  const currentPath = '/en'
  
  // Use static data for navigation and footer
  const { config: navConfig, menuItems } = getNavigationData(language);
  const { config: footerConfig, sections: footerSections, privacyLinks } = getFooterConfig(language);
  
  return c.html(
    <LayoutWithUnifiedNav 
      language={language} 
      currentPath={currentPath}
      navigationConfig={navConfig}
      menuItems={menuItems}
      footerConfig={footerConfig}
      footerSections={footerSections}
      privacyLinks={privacyLinks}
    >
      <HomepageDB 
        language={language}
        pageData={null}
        modules={[]}
        settings={{}}
      />
    </LayoutWithUnifiedNav>
  )
})

app.get('/zh', (c) => {
  const language: Language = 'zh'
  const currentPath = '/zh'
  
  // Use static data for navigation and footer
  const { config: navConfig, menuItems } = getNavigationData(language);
  const { config: footerConfig, sections: footerSections, privacyLinks } = getFooterConfig(language);
  
  return c.html(
    <LayoutWithUnifiedNav 
      language={language} 
      currentPath={currentPath}
      navigationConfig={navConfig}
      menuItems={menuItems}
      footerConfig={footerConfig}
      footerSections={footerSections}
      privacyLinks={privacyLinks}
    >
      <HomepageDB 
        language={language}
        pageData={null}
        modules={[]}
        settings={{}}
      />
    </LayoutWithUnifiedNav>
  )
})

app.get('/jp', (c) => {
  const language: Language = 'jp'
  const currentPath = '/jp'
  
  // Use static data for navigation and footer
  const { config: navConfig, menuItems } = getNavigationData(language);
  const { config: footerConfig, sections: footerSections, privacyLinks } = getFooterConfig(language);
  
  return c.html(
    <LayoutWithUnifiedNav 
      language={language} 
      currentPath={currentPath}
      navigationConfig={navConfig}
      menuItems={menuItems}
      footerConfig={footerConfig}
      footerSections={footerSections}
      privacyLinks={privacyLinks}
    >
      <HomepageDB 
        language={language}
        pageData={null}
        modules={[]}
        settings={{}}
      />
    </LayoutWithUnifiedNav>
  )
})

app.get('/hk', (c) => {
  const language: Language = 'hk'
  const currentPath = '/hk'
  
  // Use static data for navigation and footer
  const { config: navConfig, menuItems } = getNavigationData(language);
  const { config: footerConfig, sections: footerSections, privacyLinks } = getFooterConfig(language);
  
  return c.html(
    <LayoutWithUnifiedNav 
      language={language} 
      currentPath={currentPath}
      navigationConfig={navConfig}
      menuItems={menuItems}
      footerConfig={footerConfig}
      footerSections={footerSections}
      privacyLinks={privacyLinks}
    >
      <HomepageDB 
        language={language}
        pageData={null}
        modules={[]}
        settings={{}}
      />
    </LayoutWithUnifiedNav>
  )
})

// AI Agents Page Routes
app.get('/products/ai-agents', (c) => {
  const language: Language = detectLanguageFromPath(c.req.path) || 'zh'
  const currentPath = '/products/ai-agents'
  
  // Use static data for navigation and footer
  const { config: navConfig, menuItems } = getNavigationData(language);
  const { config: footerConfig, sections: footerSections, privacyLinks } = getFooterConfig(language);
  
  return c.html(
    <LayoutWithUnifiedNav 
      language={language} 
      currentPath={currentPath}
      navigationConfig={navConfig}
      menuItems={menuItems}
      footerConfig={footerConfig}
      footerSections={footerSections}
      privacyLinks={privacyLinks}
    >
      <AiAgentsPage language={language} />
    </LayoutWithUnifiedNav>
  )
})

app.get('/:lang/products/ai-agents', (c) => {
  const lang = c.req.param('lang') as Language
  const language: Language = (lang && ['zh', 'en', 'jp', 'hk'].includes(lang)) ? lang : detectLanguageFromPath(c.req.path) || 'zh'
  const currentPath = `/${language}/products/ai-agents`
  
  // Use static data for navigation and footer
  const { config: navConfig, menuItems } = getNavigationData(language);
  const { config: footerConfig, sections: footerSections, privacyLinks } = getFooterConfig(language);
  
  return c.html(
    <LayoutWithUnifiedNav 
      language={language} 
      currentPath={currentPath}
      navigationConfig={navConfig}
      menuItems={menuItems}
      footerConfig={footerConfig}
      footerSections={footerSections}
      privacyLinks={privacyLinks}
    >
      <AiAgentsPage language={language} />
    </LayoutWithUnifiedNav>
  )
})

// LiveChat Page Routes
app.get('/products/live-chat', (c) => {
  const language: Language = detectLanguageFromPath(c.req.path) || 'zh'
  const currentPath = '/products/live-chat'
  
  // Use static data for navigation and footer
  const { config: navConfig, menuItems } = getNavigationData(language);
  const { config: footerConfig, sections: footerSections, privacyLinks } = getFooterConfig(language);
  
  return c.html(
    <LayoutWithUnifiedNav 
      language={language} 
      currentPath={currentPath}
      navigationConfig={navConfig}
      menuItems={menuItems}
      footerConfig={footerConfig}
      footerSections={footerSections}
      privacyLinks={privacyLinks}
    >
      <LiveChatPage language={language} />
    </LayoutWithUnifiedNav>
  )
})

app.get('/:lang/products/live-chat', (c) => {
  const lang = c.req.param('lang') as Language
  const language: Language = (lang && ['zh', 'en', 'jp', 'hk'].includes(lang)) ? lang : detectLanguageFromPath(c.req.path) || 'zh'
  const currentPath = `/${language}/products/live-chat`
  
  // Use static data for navigation and footer
  const { config: navConfig, menuItems } = getNavigationData(language);
  const { config: footerConfig, sections: footerSections, privacyLinks } = getFooterConfig(language);
  
  return c.html(
    <LayoutWithUnifiedNav 
      language={language} 
      currentPath={currentPath}
      navigationConfig={navConfig}
      menuItems={menuItems}
      footerConfig={footerConfig}
      footerSections={footerSections}
      privacyLinks={privacyLinks}
    >
      <LiveChatPage language={language} />
    </LayoutWithUnifiedNav>
  )
})

// VoiceAgents Page Routes
app.get('/products/voice-agents', (c) => {
  const language: Language = detectLanguageFromPath(c.req.path) || 'zh'
  const currentPath = '/products/voice-agents'
  
  // Use static data for navigation and footer
  const { config: navConfig, menuItems } = getNavigationData(language);
  const { config: footerConfig, sections: footerSections, privacyLinks } = getFooterConfig(language);
  
  return c.html(
    <LayoutWithUnifiedNav 
      language={language} 
      currentPath={currentPath}
      navigationConfig={navConfig}
      menuItems={menuItems}
      footerConfig={footerConfig}
      footerSections={footerSections}
      privacyLinks={privacyLinks}
    >
      <VoiceAgentsPage language={language} />
    </LayoutWithUnifiedNav>
  )
})

app.get('/:lang/products/voice-agents', (c) => {
  const lang = c.req.param('lang') as Language
  const language: Language = (lang && ['zh', 'en', 'jp', 'hk'].includes(lang)) ? lang : detectLanguageFromPath(c.req.path) || 'zh'
  const currentPath = `/${language}/products/voice-agents`
  
  // Use static data for navigation and footer
  const { config: navConfig, menuItems } = getNavigationData(language);
  const { config: footerConfig, sections: footerSections, privacyLinks } = getFooterConfig(language);
  
  return c.html(
    <LayoutWithUnifiedNav 
      language={language} 
      currentPath={currentPath}
      navigationConfig={navConfig}
      menuItems={menuItems}
      footerConfig={footerConfig}
      footerSections={footerSections}
      privacyLinks={privacyLinks}
    >
      <VoiceAgentsPage language={language} />
    </LayoutWithUnifiedNav>
  )
})

// Industry Pages Routes - Retail
app.get('/industries/retail', (c) => {
  const language: Language = detectLanguageFromPath(c.req.path) || 'zh'
  const currentPath = '/industries/retail'
  
  const { config: navConfig, menuItems } = getNavigationData(language);
  const { config: footerConfig, sections: footerSections, privacyLinks } = getFooterConfig(language);
  
  return c.html(
    <LayoutWithUnifiedNav 
      language={language} 
      currentPath={currentPath}
      seoTitle="AI Agents for Retail"
      navigationConfig={navConfig}
      menuItems={menuItems}
      footerConfig={footerConfig}
      footerSections={footerSections}
      privacyLinks={privacyLinks}
    >
      <RetailPage language={language} />
    </LayoutWithUnifiedNav>
  )
})

app.get('/:lang/industries/retail', (c) => {
  const lang = c.req.param('lang') as Language
  const language: Language = (lang && ['zh', 'en', 'jp', 'hk'].includes(lang)) ? lang : detectLanguageFromPath(c.req.path) || 'zh'
  const currentPath = `/${language}/industries/retail`
  
  const { config: navConfig, menuItems } = getNavigationData(language);
  const { config: footerConfig, sections: footerSections, privacyLinks } = getFooterConfig(language);
  
  return c.html(
    <LayoutWithUnifiedNav 
      language={language} 
      currentPath={currentPath}
      seoTitle="AI Agents for Retail"
      navigationConfig={navConfig}
      menuItems={menuItems}
      footerConfig={footerConfig}
      footerSections={footerSections}
      privacyLinks={privacyLinks}
    >
      <RetailPage language={language} />
    </LayoutWithUnifiedNav>
  )
})

// Industry Pages Routes - Automotive
app.get('/industries/automotive', (c) => {
  const language: Language = detectLanguageFromPath(c.req.path) || 'zh'
  const currentPath = '/industries/automotive'
  
  const { config: navConfig, menuItems } = getNavigationData(language);
  const { config: footerConfig, sections: footerSections, privacyLinks } = getFooterConfig(language);
  
  return c.html(
    <LayoutWithUnifiedNav 
      language={language} 
      currentPath={currentPath}
      seoTitle="AI Agents for Automotive"
      navigationConfig={navConfig}
      menuItems={menuItems}
      footerConfig={footerConfig}
      footerSections={footerSections}
      privacyLinks={privacyLinks}
    >
      <AutomotivePage language={language} />
    </LayoutWithUnifiedNav>
  )
})

app.get('/:lang/industries/automotive', (c) => {
  const lang = c.req.param('lang') as Language
  const language: Language = (lang && ['zh', 'en', 'jp', 'hk'].includes(lang)) ? lang : detectLanguageFromPath(c.req.path) || 'zh'
  const currentPath = `/${language}/industries/automotive`
  
  const { config: navConfig, menuItems } = getNavigationData(language);
  const { config: footerConfig, sections: footerSections, privacyLinks } = getFooterConfig(language);
  
  return c.html(
    <LayoutWithUnifiedNav 
      language={language} 
      currentPath={currentPath}
      seoTitle="AI Agents for Automotive"
      navigationConfig={navConfig}
      menuItems={menuItems}
      footerConfig={footerConfig}
      footerSections={footerSections}
      privacyLinks={privacyLinks}
    >
      <AutomotivePage language={language} />
    </LayoutWithUnifiedNav>
  )
})

// Industry Pages Routes - Software
app.get('/industries/software', (c) => {
  const language: Language = detectLanguageFromPath(c.req.path) || 'zh'
  const currentPath = '/industries/software'
  
  const { config: navConfig, menuItems } = getNavigationData(language);
  const { config: footerConfig, sections: footerSections, privacyLinks } = getFooterConfig(language);
  
  return c.html(
    <LayoutWithUnifiedNav 
      language={language} 
      currentPath={currentPath}
      seoTitle="AI Agents for Software"
      navigationConfig={navConfig}
      menuItems={menuItems}
      footerConfig={footerConfig}
      footerSections={footerSections}
      privacyLinks={privacyLinks}
    >
      <SoftwarePage language={language} />
    </LayoutWithUnifiedNav>
  )
})

app.get('/:lang/industries/software', (c) => {
  const lang = c.req.param('lang') as Language
  const language: Language = (lang && ['zh', 'en', 'jp', 'hk'].includes(lang)) ? lang : detectLanguageFromPath(c.req.path) || 'zh'
  const currentPath = `/${language}/industries/software`
  
  const { config: navConfig, menuItems } = getNavigationData(language);
  const { config: footerConfig, sections: footerSections, privacyLinks } = getFooterConfig(language);
  
  return c.html(
    <LayoutWithUnifiedNav 
      language={language} 
      currentPath={currentPath}
      seoTitle="AI Agents for Software"
      navigationConfig={navConfig}
      menuItems={menuItems}
      footerConfig={footerConfig}
      footerSections={footerSections}
      privacyLinks={privacyLinks}
    >
      <SoftwarePage language={language} />
    </LayoutWithUnifiedNav>
  )
})

// Industry Pages Routes - Travel
app.get('/industries/travel', (c) => {
  const language: Language = detectLanguageFromPath(c.req.path) || 'zh'
  const currentPath = '/industries/travel'
  
  const { config: navConfig, menuItems } = getNavigationData(language);
  const { config: footerConfig, sections: footerSections, privacyLinks } = getFooterConfig(language);
  
  return c.html(
    <LayoutWithUnifiedNav 
      language={language} 
      currentPath={currentPath}
      seoTitle="AI Agents for Travel and Hotel"
      navigationConfig={navConfig}
      menuItems={menuItems}
      footerConfig={footerConfig}
      footerSections={footerSections}
      privacyLinks={privacyLinks}
    >
      <TravelPage language={language} />
    </LayoutWithUnifiedNav>
  )
})

app.get('/:lang/industries/travel', (c) => {
  const lang = c.req.param('lang') as Language
  const language: Language = (lang && ['zh', 'en', 'jp', 'hk'].includes(lang)) ? lang : detectLanguageFromPath(c.req.path) || 'zh'
  const currentPath = `/${language}/industries/travel`
  
  const { config: navConfig, menuItems } = getNavigationData(language);
  const { config: footerConfig, sections: footerSections, privacyLinks } = getFooterConfig(language);
  
  return c.html(
    <LayoutWithUnifiedNav 
      language={language} 
      currentPath={currentPath}
      seoTitle="AI Agents for Travel and Hotel"
      navigationConfig={navConfig}
      menuItems={menuItems}
      footerConfig={footerConfig}
      footerSections={footerSections}
      privacyLinks={privacyLinks}
    >
      <TravelPage language={language} />
    </LayoutWithUnifiedNav>
  )
})

// Contact Form Page Routes
app.get('/contact', (c) => {
  const language: Language = detectLanguageFromPath(c.req.path) || 'zh'
  const currentPath = '/contact'
  
  const { config: navConfig, menuItems } = getNavigationData(language);
  const { config: footerConfig, sections: footerSections, privacyLinks } = getFooterConfig(language);
  
  return c.html(
    <LayoutWithUnifiedNav 
      language={language} 
      currentPath={currentPath}
      navigationConfig={navConfig}
      menuItems={menuItems}
      footerConfig={footerConfig}
      footerSections={footerSections}
      privacyLinks={privacyLinks}
    >
      <ContactPage language={language} />
    </LayoutWithUnifiedNav>
  )
})

app.get('/:lang/contact', (c) => {
  const lang = c.req.param('lang') as Language
  const language: Language = (lang && ['zh', 'en', 'jp', 'hk'].includes(lang)) ? lang : detectLanguageFromPath(c.req.path) || 'zh'
  const currentPath = `/${language}/contact`
  
  const { config: navConfig, menuItems } = getNavigationData(language);
  const { config: footerConfig, sections: footerSections, privacyLinks } = getFooterConfig(language);
  
  return c.html(
    <LayoutWithUnifiedNav 
      language={language} 
      currentPath={currentPath}
      navigationConfig={navConfig}
      menuItems={menuItems}
      footerConfig={footerConfig}
      footerSections={footerSections}
      privacyLinks={privacyLinks}
    >
      <ContactPage language={language} />
    </LayoutWithUnifiedNav>
  )
})

// Add support for trailing slash routes
app.get('/en/', (c) => {
  return c.redirect('/en')
})

app.get('/zh/', (c) => {
  return c.redirect('/zh')
})

app.get('/jp/', (c) => {
  return c.redirect('/jp')
})

app.get('/hk/', (c) => {
  return c.redirect('/hk')
})

// Import pages
import { MarketingScenario } from './pages/MarketingScenario.js'
import { SalesScenario } from './pages/SalesScenario.js'
import { CustomerServiceScenario } from './pages/CustomerServiceScenario.js'
import { InternalServiceScenario } from './pages/InternalServiceScenario.js'
import { ManagementScenario } from './pages/ManagementScenario.js'
import { PrivacyPolicy } from './pages/PrivacyPolicy.js'
import { TermsConditions } from './pages/TermsConditions.js'
import { AboutUs } from './pages/AboutUs.js'
import { TermsAndConditions } from './pages/TermsAndConditions.js'
import { renderScenarioPage } from './utils/scenario-route-helper.js'

// Privacy Policy routes
app.get('/privacy-policy', (c) => {
  const language: Language = 'en'
  return c.html(<PrivacyPolicy language={language} />)
})

app.get('/en/privacy-policy', (c) => {
  const language: Language = 'en'
  return c.html(<PrivacyPolicy language={language} />)
})

app.get('/zh/privacy-policy', (c) => {
  const language: Language = 'zh'
  return c.html(<PrivacyPolicy language={language} />)
})

app.get('/jp/privacy-policy', (c) => {
  const language: Language = 'jp'
  return c.html(<PrivacyPolicy language={language} />)
})

app.get('/hk/privacy-policy', (c) => {
  const language: Language = 'hk'
  return c.html(<PrivacyPolicy language={language} />)
})

// Terms and Conditions routes
app.get('/terms-and-conditions', (c) => {
  const language: Language = 'en'
  return c.html(<TermsAndConditions language={language} />)
})

app.get('/en/terms-and-conditions', (c) => {
  const language: Language = 'en'
  return c.html(<TermsAndConditions language={language} />)
})

app.get('/zh/terms-and-conditions', (c) => {
  const language: Language = 'zh'
  return c.html(<TermsAndConditions language={language} />)
})

app.get('/jp/terms-and-conditions', (c) => {
  const language: Language = 'jp'
  return c.html(<TermsAndConditions language={language} />)
})

app.get('/hk/terms-and-conditions', (c) => {
  const language: Language = 'hk'
  return c.html(<TermsAndConditions language={language} />)
})

// Marketing Scenario routes
app.get('/scenarios/marketing', (c) => {
  return renderScenarioPage(c, MarketingScenario, 'en', '/scenarios/marketing', 'Zenava for Marketing')
})

app.get('/en/scenarios/marketing', (c) => {
  return renderScenarioPage(c, MarketingScenario, 'en', '/en/scenarios/marketing', 'Zenava for Marketing')
})

app.get('/zh/scenarios/marketing', (c) => {
  return renderScenarioPage(c, MarketingScenario, 'zh', '/zh/scenarios/marketing', 'Zenava 营销场景')
})

app.get('/jp/scenarios/marketing', (c) => {
  return renderScenarioPage(c, MarketingScenario, 'jp', '/jp/scenarios/marketing', 'マーケティング向けZenava')
})

app.get('/hk/scenarios/marketing', (c) => {
  return renderScenarioPage(c, MarketingScenario, 'hk', '/hk/scenarios/marketing', '營銷場景')
})

// Sales Scenario routes
app.get('/scenarios/sales', (c) => {
  return renderScenarioPage(c, SalesScenario, 'en', '/scenarios/sales', 'Zenava for Sales')
})

app.get('/en/scenarios/sales', (c) => {
  return renderScenarioPage(c, SalesScenario, 'en', '/en/scenarios/sales', 'Zenava for Sales')
})

app.get('/zh/scenarios/sales', (c) => {
  return renderScenarioPage(c, SalesScenario, 'zh', '/zh/scenarios/sales', 'Zenava 销售场景')
})

app.get('/jp/scenarios/sales', (c) => {
  return renderScenarioPage(c, SalesScenario, 'jp', '/jp/scenarios/sales', '営業向けZenava')
})

app.get('/hk/scenarios/sales', (c) => {
  return renderScenarioPage(c, SalesScenario, 'hk', '/hk/scenarios/sales', '銷售場景')
})

// Customer Service Scenario routes
app.get('/scenarios/customer-service', (c) => {
  return renderScenarioPage(c, CustomerServiceScenario, 'en', '/scenarios/customer-service', 'Zenava for Customer Service')
})

app.get('/en/scenarios/customer-service', (c) => {
  return renderScenarioPage(c, CustomerServiceScenario, 'en', '/en/scenarios/customer-service', 'Zenava for Customer Service')
})

app.get('/zh/scenarios/customer-service', (c) => {
  return renderScenarioPage(c, CustomerServiceScenario, 'zh', '/zh/scenarios/customer-service', 'Zenava 客服场景')
})

app.get('/jp/scenarios/customer-service', (c) => {
  return renderScenarioPage(c, CustomerServiceScenario, 'jp', '/jp/scenarios/customer-service', 'カスタマーサービス向けZenava')
})

app.get('/hk/scenarios/customer-service', (c) => {
  return renderScenarioPage(c, CustomerServiceScenario, 'hk', '/hk/scenarios/customer-service', '客服場景')
})

// Internal Service Scenario routes
app.get('/scenarios/internal-service', (c) => {
  return renderScenarioPage(c, InternalServiceScenario, 'en', '/scenarios/internal-service', 'Zenava for Internal Service')
})

app.get('/en/scenarios/internal-service', (c) => {
  return renderScenarioPage(c, InternalServiceScenario, 'en', '/en/scenarios/internal-service', 'Zenava for Internal Service')
})

app.get('/zh/scenarios/internal-service', (c) => {
  return renderScenarioPage(c, InternalServiceScenario, 'zh', '/zh/scenarios/internal-service', 'Zenava 内部服务')
})

app.get('/jp/scenarios/internal-service', (c) => {
  return renderScenarioPage(c, InternalServiceScenario, 'jp', '/jp/scenarios/internal-service', '社内サービス向けZenava')
})

app.get('/hk/scenarios/internal-service', (c) => {
  return renderScenarioPage(c, InternalServiceScenario, 'hk', '/hk/scenarios/internal-service', '內部服務')
})

// Management Scenario routes
app.get('/scenarios/management', (c) => {
  return renderScenarioPage(c, ManagementScenario, 'en', '/scenarios/management', 'Zenava for Management')
})

app.get('/en/scenarios/management', (c) => {
  return renderScenarioPage(c, ManagementScenario, 'en', '/en/scenarios/management', 'Zenava for Management')
})

app.get('/zh/scenarios/management', (c) => {
  return renderScenarioPage(c, ManagementScenario, 'zh', '/zh/scenarios/management', 'Zenava 管理优化')
})

app.get('/jp/scenarios/management', (c) => {
  return renderScenarioPage(c, ManagementScenario, 'jp', '/jp/scenarios/management', '管理最適化向けZenava')
})

app.get('/hk/scenarios/management', (c) => {
  return renderScenarioPage(c, ManagementScenario, 'hk', '/hk/scenarios/management', '管理優化')
})

// Other scenario routes placeholder
app.get('/scenarios/:scenario', (c) => {
  const scenario = c.req.param('scenario')
  if (scenario === 'marketing') return c.redirect('/scenarios/marketing')
  if (scenario === 'sales') return c.redirect('/scenarios/sales')
  if (scenario === 'customer-service') return c.redirect('/scenarios/customer-service')
  if (scenario === 'internal-service') return c.redirect('/scenarios/internal-service')
  if (scenario === 'management') return c.redirect('/scenarios/management')
  return c.html(`<h1>Scenario: ${scenario} (EN) - Coming Soon</h1>`)
})

app.get('/en/scenarios/:scenario', (c) => {
  const scenario = c.req.param('scenario')
  if (scenario === 'marketing') return c.redirect('/en/scenarios/marketing')
  if (scenario === 'sales') return c.redirect('/en/scenarios/sales')
  if (scenario === 'customer-service') return c.redirect('/en/scenarios/customer-service')
  if (scenario === 'internal-service') return c.redirect('/en/scenarios/internal-service')
  if (scenario === 'management') return c.redirect('/en/scenarios/management')
  return c.html(`<h1>Scenario: ${scenario} (EN) - Coming Soon</h1>`)
})

app.get('/zh/scenarios/:scenario', (c) => {
  const scenario = c.req.param('scenario')
  if (scenario === 'marketing') return c.redirect('/zh/scenarios/marketing')
  if (scenario === 'sales') return c.redirect('/zh/scenarios/sales')
  if (scenario === 'customer-service') return c.redirect('/zh/scenarios/customer-service')
  if (scenario === 'internal-service') return c.redirect('/zh/scenarios/internal-service')
  if (scenario === 'management') return c.redirect('/zh/scenarios/management')
  return c.html(`<h1>场景: ${scenario} (ZH) - 即将推出</h1>`)
})

app.get('/jp/scenarios/:scenario', (c) => {
  const scenario = c.req.param('scenario')
  if (scenario === 'marketing') return c.redirect('/jp/scenarios/marketing')
  if (scenario === 'sales') return c.redirect('/jp/scenarios/sales')
  if (scenario === 'customer-service') return c.redirect('/jp/scenarios/customer-service')
  if (scenario === 'internal-service') return c.redirect('/jp/scenarios/internal-service')
  if (scenario === 'management') return c.redirect('/jp/scenarios/management')
  return c.html(`<h1>シナリオ: ${scenario} (JP) - Coming Soon</h1>`)
})

app.get('/hk/scenarios/:scenario', (c) => {
  const scenario = c.req.param('scenario')
  if (scenario === 'marketing') return c.redirect('/hk/scenarios/marketing')
  if (scenario === 'sales') return c.redirect('/hk/scenarios/sales')
  if (scenario === 'customer-service') return c.redirect('/hk/scenarios/customer-service')
  if (scenario === 'internal-service') return c.redirect('/hk/scenarios/internal-service')
  if (scenario === 'management') return c.redirect('/hk/scenarios/management')
  return c.html(`<h1>場景: ${scenario} (HK) - Coming Soon</h1>`)
})

// About Us routes
app.get('/about', (c) => {
  const language: Language = detectLanguageFromPath(c.req.path) || 'zh'
  const currentPath = '/about'
  
  const { config: navConfig, menuItems } = getNavigationData(language);
  const { config: footerConfig, sections: footerSections, privacyLinks } = getFooterConfig(language);
  
  return c.html(
    <LayoutWithUnifiedNav
      language={language}
      currentPath={currentPath}
      navigationConfig={navConfig}
      menuItems={menuItems}
      footerConfig={footerConfig}
      footerSections={footerSections}
      privacyLinks={privacyLinks}
    >
      <AboutUs language={language} />
    </LayoutWithUnifiedNav>
  )
})

app.get('/en/about', (c) => {
  return renderScenarioPage(c, AboutUs, 'en', '/en/about', 'About Us')
})

app.get('/zh/about', (c) => {
  return renderScenarioPage(c, AboutUs, 'zh', '/zh/about', '关于我们')
})

app.get('/jp/about', (c) => {
  return renderScenarioPage(c, AboutUs, 'jp', '/jp/about', '私たちについて')
})

app.get('/hk/about', (c) => {
  return renderScenarioPage(c, AboutUs, 'hk', '/hk/about', '關於我們')
})

// Resource Center routes (Homepage)
app.get('/resources', (c) => {
  const language: Language = detectLanguageFromPath(c.req.path) || 'zh'
  const currentPath = '/resources'
  
  const { config: navConfig, menuItems } = getNavigationData(language);
  const { config: footerConfig, sections: footerSections, privacyLinks } = getFooterConfig(language);
  
  return c.html(
    <LayoutWithUnifiedNav
      language={language}
      currentPath={currentPath}
      navigationConfig={navConfig}
      menuItems={menuItems}
      footerConfig={footerConfig}
      footerSections={footerSections}
      privacyLinks={privacyLinks}
    >
      <ResourcesPage language={language} />
    </LayoutWithUnifiedNav>
  )
})

// Resource List routes - Default (All resources) - redirect to /resources/all
app.get('/resources/all', (c) => {
  const language: Language = detectLanguageFromPath(c.req.path) || 'zh'
  const currentPath = '/resources/all'
  const page = parseInt(c.req.query('page') || '1')
  
  const { config: navConfig, menuItems } = getNavigationData(language);
  const { config: footerConfig, sections: footerSections, privacyLinks } = getFooterConfig(language);
  
  return c.html(
    <LayoutWithUnifiedNav
      language={language}
      currentPath={currentPath}
      navigationConfig={navConfig}
      menuItems={menuItems}
      footerConfig={footerConfig}
      footerSections={footerSections}
      privacyLinks={privacyLinks}
    >
      <ResourceListPage language={language} resourceType="all" page={page} />
    </LayoutWithUnifiedNav>
  )
})

app.get('/:lang/resources', (c) => {
  const lang = c.req.param('lang') as Language
  const language: Language = (lang && ['zh', 'en', 'jp', 'hk'].includes(lang)) ? lang : detectLanguageFromPath(c.req.path) || 'zh'
  const currentPath = `/${language}/resources`
  
  const { config: navConfig, menuItems } = getNavigationData(language);
  const { config: footerConfig, sections: footerSections, privacyLinks } = getFooterConfig(language);
  
  return c.html(
    <LayoutWithUnifiedNav
      language={language}
      currentPath={currentPath}
      navigationConfig={navConfig}
      menuItems={menuItems}
      footerConfig={footerConfig}
      footerSections={footerSections}
      privacyLinks={privacyLinks}
    >
      <ResourcesPage language={language} />
    </LayoutWithUnifiedNav>
  )
})

// Resource List routes - All resources
app.get('/resources/all', (c) => {
  const language: Language = detectLanguageFromPath(c.req.path) || 'zh'
  const currentPath = '/resources/all'
  const page = parseInt(c.req.query('page') || '1')
  
  const { config: navConfig, menuItems } = getNavigationData(language);
  const { config: footerConfig, sections: footerSections, privacyLinks } = getFooterConfig(language);
  
  return c.html(
    <LayoutWithUnifiedNav
      language={language}
      currentPath={currentPath}
      navigationConfig={navConfig}
      menuItems={menuItems}
      footerConfig={footerConfig}
      footerSections={footerSections}
      privacyLinks={privacyLinks}
    >
      <ResourceListPage language={language} resourceType="all" page={page} />
    </LayoutWithUnifiedNav>
  )
})

// Resource List routes - Whitepapers
app.get('/resources/whitepapers', (c) => {
  const language: Language = detectLanguageFromPath(c.req.path) || 'zh'
  const currentPath = '/resources/whitepapers'
  const page = parseInt(c.req.query('page') || '1')
  
  const { config: navConfig, menuItems } = getNavigationData(language);
  const { config: footerConfig, sections: footerSections, privacyLinks } = getFooterConfig(language);
  
  return c.html(
    <LayoutWithUnifiedNav
      language={language}
      currentPath={currentPath}
      navigationConfig={navConfig}
      menuItems={menuItems}
      footerConfig={footerConfig}
      footerSections={footerSections}
      privacyLinks={privacyLinks}
    >
      <ResourceListPage language={language} resourceType="whitepapers" page={page} />
    </LayoutWithUnifiedNav>
  )
})

// Resource List routes - Videos
app.get('/resources/video', (c) => {
  const language: Language = detectLanguageFromPath(c.req.path) || 'zh'
  const currentPath = '/resources/video'
  const page = parseInt(c.req.query('page') || '1')
  
  const { config: navConfig, menuItems } = getNavigationData(language);
  const { config: footerConfig, sections: footerSections, privacyLinks } = getFooterConfig(language);
  
  return c.html(
    <LayoutWithUnifiedNav
      language={language}
      currentPath={currentPath}
      navigationConfig={navConfig}
      menuItems={menuItems}
      footerConfig={footerConfig}
      footerSections={footerSections}
      privacyLinks={privacyLinks}
    >
      <ResourceListPage language={language} resourceType="video" page={page} />
    </LayoutWithUnifiedNav>
  )
})

// Resource List routes - Reports
app.get('/resources/reports', (c) => {
  const language: Language = detectLanguageFromPath(c.req.path) || 'zh'
  const currentPath = '/resources/reports'
  const page = parseInt(c.req.query('page') || '1')
  
  const { config: navConfig, menuItems } = getNavigationData(language);
  const { config: footerConfig, sections: footerSections, privacyLinks } = getFooterConfig(language);
  
  return c.html(
    <LayoutWithUnifiedNav
      language={language}
      currentPath={currentPath}
      navigationConfig={navConfig}
      menuItems={menuItems}
      footerConfig={footerConfig}
      footerSections={footerSections}
      privacyLinks={privacyLinks}
    >
      <ResourceListPage language={language} resourceType="reports" page={page} />
    </LayoutWithUnifiedNav>
  )
})

// Resource List routes - Demos
app.get('/resources/demos', (c) => {
  const language: Language = detectLanguageFromPath(c.req.path) || 'zh'
  const currentPath = '/resources/demos'
  const page = parseInt(c.req.query('page') || '1')
  
  const { config: navConfig, menuItems } = getNavigationData(language);
  const { config: footerConfig, sections: footerSections, privacyLinks } = getFooterConfig(language);
  
  return c.html(
    <LayoutWithUnifiedNav
      language={language}
      currentPath={currentPath}
      navigationConfig={navConfig}
      menuItems={menuItems}
      footerConfig={footerConfig}
      footerSections={footerSections}
      privacyLinks={privacyLinks}
    >
      <ResourceListPage language={language} resourceType="demos" page={page} />
    </LayoutWithUnifiedNav>
  )
})

// Resource List routes - Blog
app.get('/resources/blog', (c) => {
  const language: Language = detectLanguageFromPath(c.req.path) || 'zh'
  const currentPath = '/resources/blog'
  const page = parseInt(c.req.query('page') || '1')
  
  const { config: navConfig, menuItems } = getNavigationData(language);
  const { config: footerConfig, sections: footerSections, privacyLinks } = getFooterConfig(language);
  
  return c.html(
    <LayoutWithUnifiedNav
      language={language}
      currentPath={currentPath}
      navigationConfig={navConfig}
      menuItems={menuItems}
      footerConfig={footerConfig}
      footerSections={footerSections}
      privacyLinks={privacyLinks}
    >
      <ResourceListPage language={language} resourceType="blog" page={page} />
    </LayoutWithUnifiedNav>
  )
})

// Resource List routes - Podcast
app.get('/resources/podcast', (c) => {
  const language: Language = detectLanguageFromPath(c.req.path) || 'zh'
  const currentPath = '/resources/podcast'
  const page = parseInt(c.req.query('page') || '1')
  
  const { config: navConfig, menuItems } = getNavigationData(language);
  const { config: footerConfig, sections: footerSections, privacyLinks } = getFooterConfig(language);
  
  return c.html(
    <LayoutWithUnifiedNav
      language={language}
      currentPath={currentPath}
      navigationConfig={navConfig}
      menuItems={menuItems}
      footerConfig={footerConfig}
      footerSections={footerSections}
      privacyLinks={privacyLinks}
    >
      <ResourceListPage language={language} resourceType="podcast" page={page} />
    </LayoutWithUnifiedNav>
  )
})

// Multi-language Resource List routes
const resourceTypes = ['all', 'whitepapers', 'video', 'reports', 'demos', 'blog', 'podcast']
for (const lang of ['zh', 'en', 'jp', 'hk'] as Language[]) {
  for (const resourceType of resourceTypes) {
    app.get(`/${lang}/resources/${resourceType}`, (c) => {
      const language: Language = lang
      const currentPath = `/${lang}/resources/${resourceType}`
      const page = parseInt(c.req.query('page') || '1')
      
      const { config: navConfig, menuItems } = getNavigationData(language);
      const { config: footerConfig, sections: footerSections, privacyLinks } = getFooterConfig(language);
      
      return c.html(
        <LayoutWithUnifiedNav
          language={language}
          currentPath={currentPath}
          navigationConfig={navConfig}
          menuItems={menuItems}
          footerConfig={footerConfig}
          footerSections={footerSections}
          privacyLinks={privacyLinks}
        >
          <ResourceListPage language={language} resourceType={resourceType} page={page} />
        </LayoutWithUnifiedNav>
      )
    })
  }
}

// Video/Podcast Detail routes - Default language (must be before generic :type/:id route)
app.get('/resources/video/:id', (c) => {
  const language: Language = detectLanguageFromPath(c.req.path) || 'zh'
  const contentId = c.req.param('id')
  const currentPath = `/resources/video/${contentId}`
  
  const { config: navConfig, menuItems } = getNavigationData(language);
  const { config: footerConfig, sections: footerSections, privacyLinks } = getFooterConfig(language);
  
  return c.html(
    <LayoutWithUnifiedNav
      language={language}
      currentPath={currentPath}
      navigationConfig={navConfig}
      menuItems={menuItems}
      footerConfig={footerConfig}
      footerSections={footerSections}
      privacyLinks={privacyLinks}
    >
      <VideoPodcastDetailPage language={language} contentType="video" contentId={contentId} />
    </LayoutWithUnifiedNav>
  )
})

app.get('/resources/podcast/:id', (c) => {
  const language: Language = detectLanguageFromPath(c.req.path) || 'zh'
  const contentId = c.req.param('id')
  const currentPath = `/resources/podcast/${contentId}`
  
  const { config: navConfig, menuItems } = getNavigationData(language);
  const { config: footerConfig, sections: footerSections, privacyLinks } = getFooterConfig(language);
  
  return c.html(
    <LayoutWithUnifiedNav
      language={language}
      currentPath={currentPath}
      navigationConfig={navConfig}
      menuItems={menuItems}
      footerConfig={footerConfig}
      footerSections={footerSections}
      privacyLinks={privacyLinks}
    >
      <VideoPodcastDetailPage language={language} contentType="podcast" contentId={contentId} />
    </LayoutWithUnifiedNav>
  )
})

// Video/Podcast Detail routes - Multi-language
for (const lang of ['zh', 'en', 'jp', 'hk'] as Language[]) {
  app.get(`/${lang}/resources/video/:id`, (c) => {
    const language: Language = lang
    const contentId = c.req.param('id')
    const currentPath = `/${lang}/resources/video/${contentId}`
    
    const { config: navConfig, menuItems } = getNavigationData(language);
    const { config: footerConfig, sections: footerSections, privacyLinks } = getFooterConfig(language);
    
    return c.html(
      <LayoutWithUnifiedNav
        language={language}
        currentPath={currentPath}
        navigationConfig={navConfig}
        menuItems={menuItems}
        footerConfig={footerConfig}
        footerSections={footerSections}
        privacyLinks={privacyLinks}
      >
        <VideoPodcastDetailPage language={language} contentType="video" contentId={contentId} />
      </LayoutWithUnifiedNav>
    )
  })
  
  app.get(`/${lang}/resources/podcast/:id`, (c) => {
    const language: Language = lang
    const contentId = c.req.param('id')
    const currentPath = `/${lang}/resources/podcast/${contentId}`
    
    const { config: navConfig, menuItems } = getNavigationData(language);
    const { config: footerConfig, sections: footerSections, privacyLinks } = getFooterConfig(language);
    
    return c.html(
      <LayoutWithUnifiedNav
        language={language}
        currentPath={currentPath}
        navigationConfig={navConfig}
        menuItems={menuItems}
        footerConfig={footerConfig}
        footerSections={footerSections}
        privacyLinks={privacyLinks}
      >
        <VideoPodcastDetailPage language={language} contentType="podcast" contentId={contentId} />
      </LayoutWithUnifiedNav>
    )
  })
}

// Resource Detail routes - Default language (for whitepaper, report, case-study, etc.)
app.get('/resources/:type/:id', (c) => {
  const language: Language = detectLanguageFromPath(c.req.path) || 'zh'
  const resourceType = c.req.param('type')
  const resourceId = c.req.param('id')
  const currentPath = `/resources/${resourceType}/${resourceId}`
  
  // Skip if it's video or podcast (handled by specific routes above)
  if (resourceType === 'video' || resourceType === 'podcast') {
    return c.notFound()
  }
  
  const { config: navConfig, menuItems } = getNavigationData(language);
  const { config: footerConfig, sections: footerSections, privacyLinks } = getFooterConfig(language);
  
  return c.html(
    <LayoutWithUnifiedNav
      language={language}
      currentPath={currentPath}
      navigationConfig={navConfig}
      menuItems={menuItems}
      footerConfig={footerConfig}
      footerSections={footerSections}
      privacyLinks={privacyLinks}
    >
      <ResourceDetailPage language={language} resourceType={resourceType} resourceId={resourceId} />
    </LayoutWithUnifiedNav>
  )
})

// Resource Detail routes - Multi-language (for whitepaper, report, case-study, etc.)
for (const lang of ['zh', 'en', 'jp', 'hk'] as Language[]) {
  app.get(`/${lang}/resources/:type/:id`, (c) => {
    const language: Language = lang
    const resourceType = c.req.param('type')
    const resourceId = c.req.param('id')
    const currentPath = `/${lang}/resources/${resourceType}/${resourceId}`
    
    // Skip if it's video or podcast (handled by specific routes above)
    if (resourceType === 'video' || resourceType === 'podcast') {
      return c.notFound()
    }
    
    const { config: navConfig, menuItems } = getNavigationData(language);
    const { config: footerConfig, sections: footerSections, privacyLinks } = getFooterConfig(language);
    
    return c.html(
      <LayoutWithUnifiedNav
        language={language}
        currentPath={currentPath}
        navigationConfig={navConfig}
        menuItems={menuItems}
        footerConfig={footerConfig}
        footerSections={footerSections}
        privacyLinks={privacyLinks}
      >
        <ResourceDetailPage language={language} resourceType={resourceType} resourceId={resourceId} />
      </LayoutWithUnifiedNav>
    )
  })
}

// Resource Download API endpoint
app.get('/resources/download/:id', async (c) => {
  const resourceId = c.req.param('id')
  
  // Check if user has submitted form (check cookie)
  const downloadCookie = getCookie(c, `resource_download_${resourceId}`)
  
  if (!downloadCookie) {
    // User hasn't submitted form, redirect to contact page
    return c.redirect(`/contact?source=whitepaper_download&file=${resourceId}`)
  }
  
  // TODO: Fetch file path from database based on resourceId
  // Example query: SELECT file_path, file_name, file_type FROM resources WHERE id = ?
  // For now, return a mock response
  const filePath = `/assets/files/whitepaper-${resourceId}.pdf`
  const fileName = `whitepaper-${resourceId}.pdf`
  
  // In production, this would:
  // 1. Query database for file information
  // 2. Check if file exists
  // 3. Determine MIME type based on file extension
  // 4. Stream the file to the client
  
  // For now, we'll redirect to the static file
  // In production, use: return c.body(fileStream, { headers: { 'Content-Type': mimeType, 'Content-Disposition': `attachment; filename="${fileName}"` } })
  
  // Set headers for file download
  c.header('Content-Type', 'application/pdf')
  c.header('Content-Disposition', `attachment; filename="${fileName}"`)
  
  // Redirect to static file (in production, serve the file directly)
  return c.redirect(filePath)
})

// Privacy Policy routes
app.get('/privacy', (c) => {
  return renderScenarioPage(c, PrivacyPolicy, 'en', '/privacy', 'Privacy Policy')
})

app.get('/en/privacy', (c) => {
  return renderScenarioPage(c, PrivacyPolicy, 'en', '/en/privacy', 'Privacy Policy')
})

app.get('/zh/privacy', (c) => {
  return renderScenarioPage(c, PrivacyPolicy, 'zh', '/zh/privacy', '隐私政策')
})

app.get('/jp/privacy', (c) => {
  return renderScenarioPage(c, PrivacyPolicy, 'jp', '/jp/privacy', 'プライバシーポリシー')
})

app.get('/hk/privacy', (c) => {
  return renderScenarioPage(c, PrivacyPolicy, 'hk', '/hk/privacy', '隱私政策')
})

// Terms & Conditions routes
app.get('/terms', (c) => {
  return renderScenarioPage(c, TermsConditions, 'en', '/terms', 'Terms & Conditions')
})

app.get('/jp/terms', (c) => {
  return renderScenarioPage(c, TermsConditions, 'jp', '/jp/terms', '利用規約')
})

app.get('/hk/terms', (c) => {
  return renderScenarioPage(c, TermsConditions, 'hk', '/hk/terms', '條款與條件')
})

// Admin Routes
// Note: Using requireAuth middleware imported from utils/security.js
app.get('/ticloudadmin/login', (c) => {
  const error = c.req.query('error')
  return c.html(<AdminLogin error={error} />)
})

app.post('/ticloudadmin/login', async (c) => {
  const body = await c.req.formData()
  const email = body.get('email') as string // Don't sanitize email for admin login
  const password = body.get('password') as string // Don't sanitize password
  
  // Get credentials from environment (in production, these should be in KV or D1)
  const adminEmail = c.env?.ADMIN_EMAIL || 'ticloudhoutai@zenava.ai'
  // In production, store hashed password, not plain text
  const adminPassword = c.env?.ADMIN_PASSWORD || 'tinet.Az2167Hk'
  
  if (email === adminEmail && password === adminPassword) {
    // Generate secure session token
    const sessionToken = crypto.randomUUID()
    
    // Set secure session cookie
    setSecureCookie(c, 'admin_session', sessionToken)
    
    // Generate new CSRF token for admin panel
    const csrfToken = generateCSRFToken()
    setSecureCookie(c, 'csrf_token', csrfToken)
    
    return c.redirect('/ticloudadmin')
  } else {
    return c.redirect('/ticloudadmin/login?error=Invalid credentials')
  }
})

app.get('/ticloudadmin/logout', (c) => {
  deleteCookie(c, 'admin_session', { path: '/ticloudadmin' })
  return c.redirect('/ticloudadmin/login')
})

// Protected Admin Routes
app.get('/ticloudadmin', requireAuth(), (c) => {
  return c.html(
    <AdminLayout title="控制台" currentPath="/admin" user={{ name: '管理员', email: 'admin@zenava.com' }}>
      <Dashboard />
    </AdminLayout>
  )
})

app.get('/ticloudadmin/content', requireAuth(), (c) => {
  const searchQuery = c.req.query('search') || ''
  const contentType = c.req.query('type') || 'all'
  const status = c.req.query('status') || 'all'
  
  return c.html(
    <AdminLayout title="内容管理" currentPath="/admin/content">
      <ContentManagementDB />
    </AdminLayout>
  )
})

app.get('/ticloudadmin/content/new', requireAuth(), (c) => {
  return c.html(
    <AdminLayout title="创建新内容" currentPath="/admin/content">
      <ContentEditor mode="create" />
    </AdminLayout>
  )
})

app.get('/ticloudadmin/content/edit/:id', requireAuth(), (c) => {
  const contentId = c.req.param('id')
  
  return c.html(
    <AdminLayout title="编辑内容" currentPath="/admin/content">
      <ContentEditor mode="edit" contentId={contentId} />
    </AdminLayout>
  )
})

app.get('/ticloudadmin/seo', requireAuth(), (c) => {
  return c.html(
    <AdminLayout title="SEO 管理" currentPath="/admin/seo">
      <SEOManagement />
    </AdminLayout>
  )
})

app.get('/ticloudadmin/i18n', requireAuth(), (c) => {
  return c.html(
    <AdminLayout title="多语言管理" currentPath="/admin/i18n">
      <I18nManagement />
    </AdminLayout>
  )
})

app.get('/ticloudadmin/media', requireAuth(), (c) => {
  return c.html(
    <AdminLayout title="媒体库" currentPath="/admin/media">
      <MediaLibrary />
    </AdminLayout>
  )
})

app.get('/ticloudadmin/settings', requireAuth(), (c) => {
  return c.html(
    <AdminLayout title="系统设置" currentPath="/admin/settings">
      <Settings />
    </AdminLayout>
  )
})

app.get('/ticloudadmin/common-content', requireAuth(), (c) => {
  return c.html(
    <AdminLayout title="公共内容管理" currentPath="/admin/common-content">
      <CommonContentManagementV2 />
    </AdminLayout>
  )
})

app.get('/ticloudadmin/logs', requireAuth(), (c) => {
  return c.html(
    <AdminLayout title="操作日志" currentPath="/admin/logs">
      <Logs />
    </AdminLayout>
  )
})

app.get('/ticloudadmin/publish', requireAuth(), (c) => {
  return c.html(
    <AdminLayout title="发布管理" currentPath="/admin/publish">
      <PublishManager />
    </AdminLayout>
  )
})

// Resource Center Routes
app.get('/ticloudadmin/resource-categories', requireAuth(), async (c) => {
  // Mock data - replace with actual database query
  const mockCategories = [
    {
      id: 186,
      sort_order: 0,
      name: '公司动态',
      slug: '/a/186',
      list_template: 'list_article.html',
      detail_template: 'info_article.html',
      is_visible: true
    },
    {
      id: 187,
      sort_order: 0,
      name: '博客',
      slug: '/a/187',
      list_template: 'list_article.html',
      detail_template: 'info_article.html',
      is_visible: true
    },
    {
      id: 188,
      sort_order: 0,
      name: '白皮书',
      slug: '/a/188',
      list_template: 'list_article.html',
      detail_template: 'info_article.html',
      is_visible: true
    },
    {
      id: 189,
      sort_order: 0,
      name: '拉感',
      slug: '/a/189',
      list_template: 'list_article.html',
      detail_template: 'info_article.html',
      is_visible: true
    },
    {
      id: 190,
      sort_order: 0,
      name: '博客',
      slug: '/a/190',
      list_template: 'list_article.html',
      detail_template: 'info_article.html',
      is_visible: true
    },
    {
      id: 191,
      sort_order: 0,
      name: '行业报告',
      slug: '/a/191',
      list_template: 'list_article.html',
      detail_template: 'info_article.html',
      is_visible: true
    },
    {
      id: 195,
      sort_order: 0,
      name: '技术答疑',
      slug: '/a/195',
      list_template: 'list_article.html',
      detail_template: 'info_article.html',
      is_visible: true
    },
  ]

  return c.html(
    <AdminLayout title="栏目分类管理" currentPath="/ticloudadmin/resource-categories">
      <ResourceCategoryManagement categories={mockCategories} />
    </AdminLayout>
  )
})

app.get('/ticloudadmin/resource-contents', requireAuth(), async (c) => {
  // Mock data - replace with actual database query
  const mockContents = [
    {
      id: 1,
      category_id: 186,
      category_name: '公司动态',
      title: '示例文章标题',
      slug: 'example-article',
      thumbnail: '/assets/images/example.jpg',
      author: '张三',
      publish_date: '2024-01-15',
      views: 1250,
      status: 'published' as const,
      is_featured: true
    },
    {
      id: 2,
      category_id: 187,
      category_name: '博客',
      title: '另一篇文章',
      slug: 'another-article',
      author: '李四',
      publish_date: '2024-01-10',
      views: 856,
      status: 'draft' as const,
      is_featured: false
    }
  ]

  const mockCategories = [
    { id: 186, name: '公司动态' },
    { id: 187, name: '博客' },
    { id: 188, name: '白皮书' },
    { id: 189, name: '拉感' },
    { id: 190, name: '博客' },
    { id: 191, name: '行业报告' },
    { id: 195, name: '技术答疑' }
  ]

  return c.html(
    <AdminLayout title="内容列表管理" currentPath="/ticloudadmin/resource-contents">
      <ResourceContentManagement contents={mockContents} categories={mockCategories} />
    </AdminLayout>
  )
})

// Admin API Routes
app.delete('/ticloudadmin/api/content/:id', requireAuth(), async (c) => {
  const id = c.req.param('id')
  // In real app, delete from database
  return c.json({ success: true, message: 'Content deleted' })
})

app.post('/ticloudadmin/api/content/:id/publish', requireAuth(), async (c) => {
  const id = c.req.param('id')
  // In real app, update database
  return c.json({ success: true, message: 'Content published' })
})

app.post('/ticloudadmin/api/seo/analyze/:id', requireAuth(), async (c) => {
  const id = c.req.param('id')
  // Mock SEO analysis
  return c.json({ 
    success: true, 
    analysis: {
      score: Math.floor(Math.random() * 40) + 60,
      recommendations: [
        'Add more descriptive meta titles',
        'Optimize image alt text',
        'Improve page loading speed',
        'Add structured data markup'
      ]
    }
  })
})

app.post('/ticloudadmin/api/translate', requireAuth(), async (c) => {
  const { text, from, to } = await c.req.json()
  
  // Mock translation - in real app, use Google Translate API or similar
  const mockTranslations = {
    'en-jp': 'これはモック翻訳です',
    'en-hk': '這是模擬翻譯',
    'jp-en': 'This is a mock translation',
    'jp-hk': '這是模擬翻譯',
    'hk-en': 'This is a mock translation', 
    'hk-jp': 'これはモック翻訳です'
  }
  
  const translationKey = `${from}-${to}`
  const translation = mockTranslations[translationKey] || `Mock translation of: ${text}`
  
  return c.json({ success: true, translation })
})

app.put('/ticloudadmin/api/i18n/:key', requireAuth(), async (c) => {
  const key = c.req.param('key')
  const { translations } = await c.req.json()
  
  // In real app, save to database or i18n files
  return c.json({ success: true, message: 'Translation saved' })
})

// ==================== Database API Routes ====================

// Database health check
app.get('/api/db/health', async (c) => {
  try {
    const result = await c.env.DB.prepare('SELECT 1 as health').first();
    return c.json({ 
      success: true, 
      status: 'healthy',
      database: 'D1 SQLite',
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    return c.json({ 
      success: false, 
      status: 'unhealthy',
      error: error.message 
    }, 500);
  }
});

// Get all active agents
app.get('/api/agents', async (c) => {
  try {
    const { results } = await c.env.DB.prepare(
      `SELECT id, name, description, type, status, created_at 
       FROM agents 
       WHERE status = 'active'
       ORDER BY created_at DESC`
    ).all();
    
    return c.json({ success: true, data: results });
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Create new agent
app.post('/api/agents', async (c) => {
  try {
    const { name, description, type, config, user_id } = await c.req.json();
    
    const result = await c.env.DB.prepare(
      `INSERT INTO agents (name, description, type, config, user_id) 
       VALUES (?, ?, ?, ?, ?)`
    ).bind(name, description, type, JSON.stringify(config || {}), user_id || 1).run();
    
    return c.json({ 
      success: true, 
      data: { id: result.meta.last_row_id, name, description, type }
    });
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Get conversation history
app.get('/api/conversations/:agentId', async (c) => {
  try {
    const agentId = c.req.param('agentId');
    
    const { results } = await c.env.DB.prepare(
      `SELECT c.*, 
              COUNT(m.id) as message_count,
              MAX(m.created_at) as last_message_at
       FROM conversations c
       LEFT JOIN messages m ON c.id = m.conversation_id
       WHERE c.agent_id = ?
       GROUP BY c.id
       ORDER BY c.started_at DESC
       LIMIT 20`
    ).bind(agentId).all();
    
    return c.json({ success: true, data: results });
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Get analytics data
app.get('/api/analytics/:agentId', async (c) => {
  try {
    const agentId = c.req.param('agentId');
    
    const { results } = await c.env.DB.prepare(
      `SELECT * FROM analytics 
       WHERE agent_id = ? 
       ORDER BY date DESC 
       LIMIT 30`
    ).bind(agentId).all();
    
    return c.json({ success: true, data: results });
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500);
  }
});

// ==================== CMS Management Routes ====================

// CMS Login Route
app.get('/ticloudcms', (c) => {
  return c.html(
    <html lang="zh-CN">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Zenava AI CMS - 智能内容管理平台</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="/static/fontawesome/css/all.min.css" rel="stylesheet" />
        <script dangerouslySetInnerHTML={{
          __html: `
            tailwind.config = {
              theme: {
                extend: {
                  animation: {
                    'gradient': 'gradient 6s ease infinite',
                    'float': 'float 3s ease-in-out infinite',
                    'glow': 'glow 2s ease-in-out infinite alternate',
                  }
                }
              }
            }
          `
        }}></script>
        
        {/* Baidu Analytics */}
        <script dangerouslySetInnerHTML={{
          __html: `
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?7948de4d0f78a0d3290eb6d24d2b1696";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
          `
        }} />
      </head>
      <body class="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        {/* Background Effects */}
        <div class="absolute inset-0">
          <div class="absolute inset-0 opacity-30">
            <div class="w-full h-full" style="background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iNyIgY3k9IjciIHI9IjIiLz48Y2lyY2xlIGN4PSIzNyIgY3k9IjciIHI9IjIiLz48Y2lyY2xlIGN4PSI3IiBjeT0iMzciIHI9IjIiLz48Y2lyY2xlIGN4PSIzNyIgY3k9IjM3IiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')"></div>
          </div>
          <div class="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
          <div class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-float delay-1000"></div>
        </div>

        <div class="relative z-10 min-h-screen flex items-center justify-center p-6">
          <div class="max-w-5xl w-full">
            
            {/* Header */}
            <div class="text-center mb-12">
              <div class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-full border border-blue-400/30 mb-6">
                <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-3"></div>
                <span class="text-blue-100 text-sm font-medium">AI-Powered CMS Platform</span>
              </div>
              
              <h1 class="text-5xl lg:text-6xl font-black mb-4">
                <span class="bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                  Zenava AI CMS
                </span>
              </h1>
              <p class="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                智能内容管理平台 - 为企业级AI对话场景而设计
              </p>
            </div>

            {/* Main Dashboard */}
            <div class="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-8 animate-glow">
              
              {/* System Status */}
              <div class="mb-8">
                <h2 class="text-2xl font-bold text-white mb-6 flex items-center">
                  <div class="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-3">
                    <i class="fas fa-heartbeat text-white text-sm"></i>
                  </div>
                  系统状态监控
                </h2>
                
                <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div class="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-2xl p-4 border border-green-400/30">
                    <div class="flex items-center justify-between mb-2">
                      <span class="text-green-100 text-sm">应用状态</span>
                      <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                    <div class="text-green-300 font-bold text-lg">运行中</div>
                  </div>
                  
                  <div class="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm rounded-2xl p-4 border border-blue-400/30">
                    <div class="flex items-center justify-between mb-2">
                      <span class="text-blue-100 text-sm">数据库</span>
                      <i class="fas fa-database text-blue-400 text-sm"></i>
                    </div>
                    <div class="text-blue-300 font-bold text-lg">已连接</div>
                  </div>
                  
                  <div class="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-2xl p-4 border border-purple-400/30">
                    <div class="flex items-center justify-between mb-2">
                      <span class="text-purple-100 text-sm">API服务</span>
                      <i class="fas fa-rocket text-purple-400 text-sm"></i>
                    </div>
                    <div class="text-purple-300 font-bold text-lg">正常</div>
                  </div>
                  
                  <div class="bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-sm rounded-2xl p-4 border border-orange-400/30">
                    <div class="flex items-center justify-between mb-2">
                      <span class="text-orange-100 text-sm">响应时间</span>
                      <i class="fas fa-tachometer-alt text-orange-400 text-sm"></i>
                    </div>
                    <div class="text-orange-300 font-bold text-lg">&lt; 50ms</div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div class="mb-8">
                <h3 class="text-xl font-semibold text-white mb-6 flex items-center">
                  <div class="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
                    <i class="fas fa-bolt text-white text-xs"></i>
                  </div>
                  快速操作中心
                </h3>
                
                <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <a href="/ticloudcms/dashboard" class="group relative p-6 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 backdrop-blur-sm rounded-2xl border border-blue-400/30 hover:from-blue-600/30 hover:to-indigo-600/30 transition-all duration-300 hover:scale-105">
                    <div class="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-indigo-600/0 group-hover:from-blue-600/10 group-hover:to-indigo-600/10 rounded-2xl transition-all duration-300"></div>
                    <div class="relative z-10">
                      <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <i class="fas fa-chart-line text-white"></i>
                      </div>
                      <h4 class="text-white font-semibold mb-2">智能控制台</h4>
                      <p class="text-gray-300 text-sm">实时监控与分析</p>
                    </div>
                  </a>

                  <a href="/ticloudcms/content" class="group relative p-6 bg-gradient-to-br from-green-600/20 to-emerald-600/20 backdrop-blur-sm rounded-2xl border border-green-400/30 hover:from-green-600/30 hover:to-emerald-600/30 transition-all duration-300 hover:scale-105">
                    <div class="absolute inset-0 bg-gradient-to-br from-green-600/0 to-emerald-600/0 group-hover:from-green-600/10 group-hover:to-emerald-600/10 rounded-2xl transition-all duration-300"></div>
                    <div class="relative z-10">
                      <div class="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <i class="fas fa-edit text-white"></i>
                      </div>
                      <h4 class="text-white font-semibold mb-2">内容管理</h4>
                      <p class="text-gray-300 text-sm">AI辅助编辑</p>
                    </div>
                  </a>

                  <a href="/ticloudcms/ai-tools" class="group relative p-6 bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-2xl border border-purple-400/30 hover:from-purple-600/30 hover:to-pink-600/30 transition-all duration-300 hover:scale-105">
                    <div class="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-pink-600/0 group-hover:from-purple-600/10 group-hover:to-pink-600/10 rounded-2xl transition-all duration-300"></div>
                    <div class="relative z-10">
                      <div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <i class="fas fa-robot text-white"></i>
                      </div>
                      <h4 class="text-white font-semibold mb-2">AI工具箱</h4>
                      <p class="text-gray-300 text-sm">智能生成助手</p>
                    </div>
                  </a>

                  <a href="/ticloudcms/settings" class="group relative p-6 bg-gradient-to-br from-gray-600/20 to-slate-600/20 backdrop-blur-sm rounded-2xl border border-gray-400/30 hover:from-gray-600/30 hover:to-slate-600/30 transition-all duration-300 hover:scale-105">
                    <div class="absolute inset-0 bg-gradient-to-br from-gray-600/0 to-slate-600/0 group-hover:from-gray-600/10 group-hover:to-slate-600/10 rounded-2xl transition-all duration-300"></div>
                    <div class="relative z-10">
                      <div class="w-12 h-12 bg-gradient-to-r from-gray-500 to-slate-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <i class="fas fa-cogs text-white"></i>
                      </div>
                      <h4 class="text-white font-semibold mb-2">系统配置</h4>
                      <p class="text-gray-300 text-sm">平台设置管理</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* API Links */}
              <div class="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 backdrop-blur-sm rounded-2xl p-6 border border-indigo-400/30">
                <h4 class="text-lg font-semibold text-white mb-4 flex items-center">
                  <div class="w-5 h-5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded mr-3"></div>
                  API 开发者中心
                </h4>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <a href="/api/ticloudcms/pages" class="group flex items-center text-indigo-300 hover:text-indigo-100 transition-colors">
                    <i class="fas fa-code text-xs mr-2 group-hover:scale-110 transition-transform"></i>
                    <span class="text-sm">页面管理 API</span>
                  </a>
                  <a href="/api/ticloudcms/sites" class="group flex items-center text-purple-300 hover:text-purple-100 transition-colors">
                    <i class="fas fa-server text-xs mr-2 group-hover:scale-110 transition-transform"></i>
                    <span class="text-sm">站点配置 API</span>
                  </a>
                  <a href="/api/publish/versions" class="group flex items-center text-blue-300 hover:text-blue-100 transition-colors">
                    <i class="fas fa-upload text-xs mr-2 group-hover:scale-110 transition-transform"></i>
                    <span class="text-sm">发布管理 API</span>
                  </a>
                </div>
              </div>

              {/* Footer */}
              <div class="text-center mt-8 pt-6 border-t border-white/10">
                <p class="text-gray-300 text-sm mb-2">
                  Zenava AI 企业对话平台 CMS v3.0
                </p>
                <p class="text-gray-400 text-xs">
                  基于AI驱动的下一代内容管理系统 | 为未来而构建
                </p>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
})

// CMS Dashboard
app.get('/ticloudcms/dashboard', async (c) => {
  try {
    // Get system statistics
    const [pagesCount, sitesCount, mediaCount] = await Promise.all([
      c.env.DB.prepare("SELECT COUNT(*) as count FROM pages").first(),
      c.env.DB.prepare("SELECT COUNT(*) as count FROM sites").first(),
      c.env.DB.prepare("SELECT COUNT(*) as count FROM media_library").first()
    ]);

    return c.html(
      <html lang="zh-CN">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Zenava AI CMS - 智能控制台</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <link href="/static/fontawesome/css/all.min.css" rel="stylesheet" />
          <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
          <style dangerouslySetInnerHTML={{
            __html: `
              @keyframes gradient { 
                0%, 100% { background-position: 0% 50%; } 
                50% { background-position: 100% 50%; } 
              }
              @keyframes float { 
                0%, 100% { transform: translateY(0px); } 
                50% { transform: translateY(-10px); } 
              }
              @keyframes pulse-glow { 
                0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); } 
                50% { box-shadow: 0 0 40px rgba(139, 92, 246, 0.5); } 
              }
              .bg-gradient-animate { 
                background-size: 400% 400%; 
                animation: gradient 6s ease infinite; 
              }
              .animate-float { 
                animation: float 3s ease-in-out infinite; 
              }
              .animate-pulse-glow { 
                animation: pulse-glow 2s ease-in-out infinite; 
              }
            `
          }} />
          
          {/* Baidu Analytics */}
          <script dangerouslySetInnerHTML={{
            __html: `
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?7948de4d0f78a0d3290eb6d24d2b1696";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
            `
          }} />
        </head>
        <body class="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
          
          {/* Navigation Bar */}
          <nav class="bg-black/20 backdrop-blur-lg border-b border-white/10">
            <div class="max-w-7xl mx-auto px-6 py-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                  <a href="/cms" class="flex items-center space-x-3">
                    <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <i class="fas fa-brain text-white text-sm"></i>
                    </div>
                    <span class="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      Zenava AI CMS
                    </span>
                  </a>
                </div>
                
                <div class="flex items-center space-x-6">
                  <a href="/" target="_blank" class="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
                    <i class="fas fa-external-link-alt text-xs"></i>
                    <span class="text-sm">查看网站</span>
                  </a>
                  
                  <div class="flex items-center space-x-2">
                    <div class="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                      <i class="fas fa-user text-white text-xs"></i>
                    </div>
                    <span class="text-sm text-gray-300">管理员</span>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          <div class="max-w-7xl mx-auto px-6 py-8">
            
            {/* Page Header */}
            <div class="mb-8">
              <h1 class="text-4xl font-black mb-2">
                <span class="bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                  智能控制台
                </span>
              </h1>
              <p class="text-gray-300 text-lg">实时监控与AI驱动的内容分析</p>
            </div>

            {/* Statistics Grid */}
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              
              {/* Pages Count */}
              <div class="group relative p-6 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 backdrop-blur-sm rounded-2xl border border-blue-400/30 hover:from-blue-600/30 hover:to-indigo-600/30 transition-all duration-300 animate-pulse-glow">
                <div class="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-indigo-600/0 group-hover:from-blue-600/10 group-hover:to-indigo-600/10 rounded-2xl transition-all duration-300"></div>
                <div class="relative z-10">
                  <div class="flex items-center justify-between mb-4">
                    <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                      <i class="fas fa-file-alt text-white"></i>
                    </div>
                    <div class="text-right">
                      <div class="text-2xl font-bold text-white">{pagesCount?.count || 0}</div>
                      <div class="text-xs text-blue-300">+12% 本月</div>
                    </div>
                  </div>
                  <h3 class="text-blue-100 font-semibold mb-1">内容页面</h3>
                  <p class="text-blue-200/70 text-sm">AI优化内容</p>
                </div>
              </div>

              {/* Sites Count */}
              <div class="group relative p-6 bg-gradient-to-br from-green-600/20 to-emerald-600/20 backdrop-blur-sm rounded-2xl border border-green-400/30 hover:from-green-600/30 hover:to-emerald-600/30 transition-all duration-300">
                <div class="relative z-10">
                  <div class="flex items-center justify-between mb-4">
                    <div class="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                      <i class="fas fa-globe text-white"></i>
                    </div>
                    <div class="text-right">
                      <div class="text-2xl font-bold text-white">{sitesCount?.count || 0}</div>
                      <div class="text-xs text-green-300">稳定运行</div>
                    </div>
                  </div>
                  <h3 class="text-green-100 font-semibold mb-1">站点配置</h3>
                  <p class="text-green-200/70 text-sm">多语言支持</p>
                </div>
              </div>

              {/* Media Count */}
              <div class="group relative p-6 bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-2xl border border-purple-400/30 hover:from-purple-600/30 hover:to-pink-600/30 transition-all duration-300">
                <div class="relative z-10">
                  <div class="flex items-center justify-between mb-4">
                    <div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                      <i class="fas fa-images text-white"></i>
                    </div>
                    <div class="text-right">
                      <div class="text-2xl font-bold text-white">{mediaCount?.count || 0}</div>
                      <div class="text-xs text-purple-300">智能压缩</div>
                    </div>
                  </div>
                  <h3 class="text-purple-100 font-semibold mb-1">媒体资源</h3>
                  <p class="text-purple-200/70 text-sm">AI处理优化</p>
                </div>
              </div>

              {/* AI Performance */}
              <div class="group relative p-6 bg-gradient-to-br from-orange-600/20 to-red-600/20 backdrop-blur-sm rounded-2xl border border-orange-400/30 hover:from-orange-600/30 hover:to-red-600/30 transition-all duration-300">
                <div class="relative z-10">
                  <div class="flex items-center justify-between mb-4">
                    <div class="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                      <i class="fas fa-robot text-white"></i>
                    </div>
                    <div class="text-right">
                      <div class="text-2xl font-bold text-white">98.7%</div>
                      <div class="text-xs text-orange-300">AI准确率</div>
                    </div>
                  </div>
                  <h3 class="text-orange-100 font-semibold mb-1">AI性能</h3>
                  <p class="text-orange-200/70 text-sm">实时监控</p>
                </div>
              </div>
            </div>

            {/* Main Dashboard Grid */}
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Analytics Chart */}
              <div class="lg:col-span-2">
                <div class="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
                  <div class="flex items-center justify-between mb-6">
                    <h3 class="text-xl font-semibold text-white flex items-center">
                      <div class="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded mr-3"></div>
                      实时分析
                    </h3>
                    <div class="flex items-center space-x-2">
                      <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span class="text-sm text-gray-300">实时数据</span>
                    </div>
                  </div>
                  
                  <div class="h-80 bg-gradient-to-br from-gray-900/50 to-black/50 rounded-xl p-4 border border-gray-700/30">
                    <canvas id="analyticsChart" class="w-full h-full"></canvas>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div class="space-y-6">
                
                {/* AI Tools */}
                <div class="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
                  <h3 class="text-lg font-semibold text-white mb-4 flex items-center">
                    <div class="w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded mr-3"></div>
                    AI工具箱
                  </h3>
                  
                  <div class="space-y-3">
                    <button class="w-full group relative p-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl border border-blue-400/30 hover:from-blue-600/30 hover:to-purple-600/30 transition-all duration-300 text-left">
                      <div class="flex items-center">
                        <i class="fas fa-magic text-blue-400 mr-3"></i>
                        <span class="text-white text-sm font-medium">内容AI生成</span>
                      </div>
                    </button>
                    
                    <button class="w-full group relative p-3 bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-xl border border-green-400/30 hover:from-green-600/30 hover:to-emerald-600/30 transition-all duration-300 text-left">
                      <div class="flex items-center">
                        <i class="fas fa-language text-green-400 mr-3"></i>
                        <span class="text-white text-sm font-medium">智能翻译</span>
                      </div>
                    </button>
                    
                    <button class="w-full group relative p-3 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl border border-purple-400/30 hover:from-purple-600/30 hover:to-pink-600/30 transition-all duration-300 text-left">
                      <div class="flex items-center">
                        <i class="fas fa-search text-purple-400 mr-3"></i>
                        <span class="text-white text-sm font-medium">SEO优化</span>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Recent Activity */}
                <div class="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
                  <h3 class="text-lg font-semibold text-white mb-4 flex items-center">
                    <div class="w-5 h-5 bg-gradient-to-r from-indigo-500 to-blue-500 rounded mr-3"></div>
                    最新活动
                  </h3>
                  
                  <div class="space-y-3">
                    <div class="flex items-center text-sm">
                      <div class="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                      <span class="text-gray-300">页面发布成功</span>
                      <span class="ml-auto text-xs text-gray-400">2分钟前</span>
                    </div>
                    <div class="flex items-center text-sm">
                      <div class="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                      <span class="text-gray-300">AI内容优化完成</span>
                      <span class="ml-auto text-xs text-gray-400">5分钟前</span>
                    </div>
                    <div class="flex items-center text-sm">
                      <div class="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                      <span class="text-gray-300">媒体文件上传</span>
                      <span class="ml-auto text-xs text-gray-400">10分钟前</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions Grid */}
            <div class="mt-8">
              <h3 class="text-2xl font-bold text-white mb-6 flex items-center">
                <div class="w-6 h-6 bg-gradient-to-r from-yellow-500 to-orange-500 rounded mr-3"></div>
                快速操作
              </h3>
              
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <a href="/ticloudcms/content/new" class="group relative p-4 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 backdrop-blur-sm rounded-xl border border-blue-400/30 hover:from-blue-600/30 hover:to-indigo-600/30 transition-all duration-300 hover:scale-105 text-center">
                  <i class="fas fa-plus text-2xl text-blue-400 mb-3"></i>
                  <div class="text-white font-medium text-sm">新建页面</div>
                </a>
                
                <a href="/ticloudcms/content" class="group relative p-4 bg-gradient-to-br from-green-600/20 to-emerald-600/20 backdrop-blur-sm rounded-xl border border-green-400/30 hover:from-green-600/30 hover:to-emerald-600/30 transition-all duration-300 hover:scale-105 text-center">
                  <i class="fas fa-edit text-2xl text-green-400 mb-3"></i>
                  <div class="text-white font-medium text-sm">内容管理</div>
                </a>
                
                <a href="/ticloudcms/media" class="group relative p-4 bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-xl border border-purple-400/30 hover:from-purple-600/30 hover:to-pink-600/30 transition-all duration-300 hover:scale-105 text-center">
                  <i class="fas fa-images text-2xl text-purple-400 mb-3"></i>
                  <div class="text-white font-medium text-sm">媒体库</div>
                </a>
                
                <a href="/ticloudcms/publish" class="group relative p-4 bg-gradient-to-br from-red-600/20 to-orange-600/20 backdrop-blur-sm rounded-xl border border-red-400/30 hover:from-red-600/30 hover:to-orange-600/30 transition-all duration-300 hover:scale-105 text-center">
                  <i class="fas fa-rocket text-2xl text-red-400 mb-3"></i>
                  <div class="text-white font-medium text-sm">发布管理</div>
                </a>
              </div>
            </div>
          </div>

          {/* Chart.js Script */}
          <script dangerouslySetInnerHTML={{
            __html: `
              // Initialize analytics chart
              document.addEventListener('DOMContentLoaded', function() {
                const ctx = document.getElementById('analyticsChart').getContext('2d');
                const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                gradient.addColorStop(0, 'rgba(59, 130, 246, 0.8)');
                gradient.addColorStop(1, 'rgba(139, 92, 246, 0.2)');
                
                new Chart(ctx, {
                  type: 'line',
                  data: {
                    labels: ['06:00', '09:00', '12:00', '15:00', '18:00', '21:00', '00:00'],
                    datasets: [{
                      label: '页面访问量',
                      data: [120, 190, 300, 500, 420, 380, 250],
                      borderColor: 'rgba(59, 130, 246, 1)',
                      backgroundColor: gradient,
                      borderWidth: 3,
                      fill: true,
                      tension: 0.4,
                      pointBackgroundColor: 'rgba(59, 130, 246, 1)',
                      pointBorderColor: 'rgba(255, 255, 255, 1)',
                      pointBorderWidth: 2,
                      pointRadius: 6
                    }]
                  },
                  options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false
                      }
                    },
                    scales: {
                      x: {
                        grid: {
                          color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                          color: 'rgba(255, 255, 255, 0.7)'
                        }
                      },
                      y: {
                        grid: {
                          color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                          color: 'rgba(255, 255, 255, 0.7)'
                        }
                      }
                    }
                  }
                });
              });
            `
          }}></script>
        </body>
      </html>
    )
  } catch (error: any) {
    return c.html(
      <html lang="zh-CN">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>系统错误 - Zenava AI CMS</title>
          <script src="https://cdn.tailwindcss.com"></script>
          
          {/* Baidu Analytics */}
          <script dangerouslySetInnerHTML={{
            __html: `
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?7948de4d0f78a0d3290eb6d24d2b1696";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
            `
          }} />
        </head>
        <body class="min-h-screen bg-gradient-to-br from-red-900 to-gray-900 text-white flex items-center justify-center">
          <div class="max-w-md mx-auto text-center p-8">
            <div class="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <i class="fas fa-exclamation-triangle text-white text-2xl"></i>
            </div>
            <h1 class="text-3xl font-bold text-white mb-4">系统错误</h1>
            <p class="text-red-200 mb-6">无法加载控制台数据: {error.message}</p>
            <a href="/cms" class="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
              返回主页
            </a>
          </div>
        </body>
      </html>
    )
  }
})

// CMS Content Management
app.get('/ticloudcms/content', async (c) => {
  try {
    const { results: pages } = await c.env.DB.prepare(`
      SELECT p.*, s.domain
      FROM pages p
      LEFT JOIN sites s ON p.site_id = s.id
      ORDER BY p.updated_at DESC
      LIMIT 20
    `).all();

    return c.html(
      <AdminLayout currentPath="/ticloudcms/content" title="内容管理">
        <div class="min-h-screen bg-gray-50 p-8">
          <div class="max-w-7xl mx-auto">
            <div class="flex justify-between items-center mb-8">
              <h1 class="text-3xl font-bold text-gray-900">📝 内容管理</h1>
              <a href="/ticloudcms/content/new" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
                ➕ 新建页面
              </a>
            </div>
            
            <div class="bg-white rounded-lg shadow overflow-hidden">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">页面</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">语言</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">更新时间</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  {pages && pages.map((page: any) => (
                    <tr key={page.id}>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm font-medium text-gray-900">{page.title}</div>
                        <div class="text-sm text-gray-500">{page.slug}</div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{page.language}</td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <span class={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          page.status === 'published' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {page.status === 'published' ? '已发布' : '草稿'}
                        </span>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(page.updated_at).toLocaleDateString('zh-CN')}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <a href={`/cms/content/edit/${page.id}`} class="text-blue-600 hover:text-blue-900 mr-3">
                          编辑
                        </a>
                        <button class="text-red-600 hover:text-red-900">删除</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </AdminLayout>
    )
  } catch (error: any) {
    return c.html(
      <AdminLayout currentPath="/ticloudcms/content" title="错误">
        <div class="min-h-screen bg-gray-50 p-8">
          <div class="max-w-4xl mx-auto">
            <h1 class="text-2xl font-bold text-red-600">加载错误</h1>
            <p class="text-gray-700 mt-4">无法加载内容列表: {error.message}</p>
          </div>
        </div>
      </AdminLayout>
    )
  }
})

// CMS Content Edit Page
app.get('/ticloudcms/content/edit/:id', async (c) => {
  try {
    const pageId = c.req.param('id');
    
    // Get page data with SEO
    const page = await c.env.DB.prepare(`
      SELECT p.*, s.* 
      FROM pages p
      LEFT JOIN page_seo s ON p.id = s.page_id
      WHERE p.id = ?
    `).bind(pageId).first();
    
    if (!page) {
      return c.html(
        <AdminLayout currentPath="/ticloudcms/content" title="页面不存在">
          <div class="min-h-screen bg-gray-50 p-8">
            <div class="max-w-4xl mx-auto">
              <h1 class="text-2xl font-bold text-red-600">页面不存在</h1>
              <a href="/ticloudcms/content" class="text-blue-600 hover:text-blue-700 mt-4 inline-block">返回内容列表</a>
            </div>
          </div>
        </AdminLayout>
      )
    }
    
    // Get content modules
    const { results: modules } = await c.env.DB.prepare(`
      SELECT * FROM content_modules 
      WHERE page_id = ? 
      ORDER BY position
    `).bind(pageId).all();
    
    return c.html(
      <AdminLayout currentPath="/ticloudcms/content" title={`编辑: ${page.title}`}>
        <ContentManagementDB 
          initialPage={page}
          initialModules={modules}
        />
      </AdminLayout>
    )
  } catch (error: any) {
    return c.html(
      <AdminLayout currentPath="/ticloudcms/content" title="错误">
        <div class="min-h-screen bg-gray-50 p-8">
          <div class="max-w-4xl mx-auto">
            <h1 class="text-2xl font-bold text-red-600">加载错误</h1>
            <p class="text-gray-700 mt-4">无法加载页面内容: {error.message}</p>
            <a href="/ticloudcms/content" class="text-blue-600 hover:text-blue-700 mt-4 inline-block">返回内容列表</a>
          </div>
        </div>
      </AdminLayout>
    )
  }
})

// CMS Dashboard
app.get('/ticloudcms/dashboard', async (c) => {
  try {
    // Get statistics from database
    const [pagesCount, modulesCount, mediaCount] = await Promise.all([
      c.env.DB.prepare('SELECT COUNT(*) as count FROM pages').first(),
      c.env.DB.prepare('SELECT COUNT(*) as count FROM content_modules').first(),
      c.env.DB.prepare('SELECT COUNT(*) as count FROM media').first()
    ]);
    
    return c.html(
      <AdminLayout currentPath="/ticloudcms/dashboard" title="控制台">
        <Dashboard 
          stats={{
            pages: pagesCount?.count || 0,
            modules: modulesCount?.count || 0,
            media: mediaCount?.count || 0
          }}
        />
      </AdminLayout>
    )
  } catch (error: any) {
    return c.html(
      <AdminLayout currentPath="/ticloudcms/dashboard" title="错误">
        <div class="min-h-screen bg-gray-50 p-8">
          <div class="max-w-4xl mx-auto">
            <h1 class="text-2xl font-bold text-red-600">加载错误</h1>
            <p class="text-gray-700 mt-4">无法加载仪表盘数据: {error.message}</p>
          </div>
        </div>
      </AdminLayout>
    )
  }
})

// ==================== Original API Routes ====================

app.get('/api/hello', (c) => {
  return c.json({ message: 'Hello from Zenava API!' })
})

app.post('/api/contact', async (c) => {
  try {
    const body = await c.req.json()
    const { firstName, lastName, jobTitle, companyEmail, companyName, industry, privacyAgree, source, file } = body

    // 验证必填字段
    if (!firstName || !lastName || !companyEmail) {
      return c.json({ 
        success: false, 
        message: 'Missing required fields: firstName, lastName, companyEmail' 
      }, 400)
    }

    // 验证隐私协议（如果存在）
    if (privacyAgree === false) {
      return c.json({ 
        success: false, 
        message: 'Please agree to the privacy policy' 
      }, 400)
    }

    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(companyEmail)) {
      return c.json({ 
        success: false, 
        message: 'Invalid email format' 
      }, 400)
    }

    // 调用 Clink 工单创建接口
    try {
      const ticketResponse = await fetch(`${c.req.url.split('/api/contact')[0]}/api/ticket/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName,
          lastName,
          jobTitle,
          companyEmail,
          companyName,
          industry,
          source: source || 'contact_page',
          file,
          subject: `${firstName} ${lastName} - ${companyName || '咨询'}`,
          description: `联系表单提交\n来源: ${source || 'contact_page'}\n行业: ${industry || '未选择'}`
        })
      })

      const ticketResult = await ticketResponse.json()

      if (!ticketResult.success) {
        console.error('Ticket creation failed:', ticketResult)
        // 即使工单创建失败，也返回成功（避免用户看到错误）
        // 但记录错误日志以便后续处理
      }
    } catch (ticketError: any) {
      console.error('Ticket API error:', ticketError)
      // 工单创建失败不影响表单提交成功
    }

    // 如果是白皮书下载，返回下载信息
    if (source === 'whitepaper_download' && file) {
      // TODO: 从数据库或配置中获取文件下载信息
      // 这里先返回示例数据，实际应该从后台配置中获取
      return c.json({ 
        success: true, 
        message: 'Form submitted successfully',
        downloadUrl: `/resources/download/${file}`,  // 下载接口路径
        fileName: `${file}.pdf`  // 文件名
      })
    }

    return c.json({ 
      success: true, 
      message: 'Form submitted successfully' 
    })
  } catch (error: any) {
    console.error('Contact form submission error:', error)
    return c.json({ 
      success: false, 
      message: 'Internal server error',
      error: error.message 
    }, 500)
  }
})

export default app
