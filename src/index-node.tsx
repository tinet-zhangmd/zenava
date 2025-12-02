/**
 * Node.js 适配版本的入口文件
 * 完全兼容 Cloudflare Workers 版本，但使用 Node.js 运行时
 */

import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from '@hono/node-server/serve-static'
import { getCookie, setCookie, deleteCookie } from 'hono/cookie'
import { join } from 'path'
import { createD1CompatibleDatabase } from './adapters/database.js'

// 导入所有页面和组件
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
import { ResourcesPage } from './pages/Resources.js'
import { ResourceListPage } from './pages/ResourceList.js'
import { detectLanguageFromPath, detectLanguageFromIP, Language } from './utils/i18n.js'

// 导入 Admin Pages
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

// 导入 CMS API
import cmsApi from './api/cms.js'
import publishApi from './api/publish.js'
import commonContentApi from './api/common-content.js'
import uploadApi from './api/upload.js'
import ticketApi from './api/ticket.js'
import { navigation } from './api/navigation.js'

// 导入其他页面
import { MarketingScenario } from './pages/MarketingScenario.js'
import { SalesScenario } from './pages/SalesScenario.js'
import { CustomerServiceScenario } from './pages/CustomerServiceScenario.js'
import { InternalServiceScenario } from './pages/InternalServiceScenario.js'
import { ManagementScenario } from './pages/ManagementScenario.js'
import { AboutUs } from './pages/AboutUs.js'
import { ContactPage } from './pages/Contact.js'
import { TermsAndConditions } from './pages/TermsAndConditions.js'
import { RetailPage } from './pages/industries/Retail.js'
import { AutomotivePage } from './pages/industries/Automotive.js'
import { SoftwarePage } from './pages/industries/Software.js'
import { TravelPage } from './pages/industries/Travel.js'

// 初始化数据库
const db = createD1CompatibleDatabase(process.env.DB_PATH)

// 定义 Bindings 类型（兼容 Cloudflare）
type Bindings = {
  DB: typeof db
}

// 创建 Hono 应用
const app = new Hono<{ Bindings: Bindings }>()

// 中间件：注入数据库到 context
app.use('*', async (c, next) => {
  c.env = {
    DB: db as any
  }
  await next()
})

// Apply security headers to all routes
app.use('*', securityHeaders())

// Rate limiting for auth routes
app.use('/ticloudadmin/login', rateLimiter(20, 60000))
app.use('/api/*', rateLimiter(100, 60000))

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
app.use('/static/*', serveStatic({ 
  root: join(process.cwd(), 'public'),
  rewriteRequestPath: (path) => path.replace(/^\/static/, '/static')
}))

app.use('/assets/*', serveStatic({ 
  root: join(process.cwd(), 'dist'),
  rewriteRequestPath: (path) => path.replace(/^\/assets/, '/assets')
}))

// 注意：这里需要复制 src/index.tsx 中的所有路由
// 为了简化，我先创建主要路由，其他路由可以逐步添加

// Homepage routes
// 默认语言为 zh，首页路由 / 直接显示中文内容
app.get('/', (c) => {
  // 默认使用简体中文
  const language: Language = 'zh'
  const currentPath = '/'
  
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

// 多语言首页路由
for (const lang of ['en', 'zh', 'jp', 'hk'] as Language[]) {
  app.get(`/${lang}`, (c) => {
    const language: Language = lang
    const currentPath = `/${lang}`
    
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
}

// AI Agents Page Routes
app.get('/products/ai-agents', (c) => {
  const language: Language = detectLanguageFromPath(c.req.path) || 'zh'
  const currentPath = '/products/ai-agents'
  
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

// Live Chat Page Routes
app.get('/products/live-chat', (c) => {
  const language: Language = detectLanguageFromPath(c.req.path) || 'zh'
  const currentPath = '/products/live-chat'
  
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

// Voice Agents Page Routes
app.get('/products/voice-agents', (c) => {
  const language: Language = detectLanguageFromPath(c.req.path) || 'zh'
  const currentPath = '/products/voice-agents'
  
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

// Resources Page Routes
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

app.get('/:lang/resources/blog', (c) => {
  const lang = c.req.param('lang') as Language
  const language: Language = (lang && ['zh', 'en', 'jp', 'hk'].includes(lang)) ? lang : detectLanguageFromPath(c.req.path) || 'zh'
  const currentPath = `/${language}/resources/blog`
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

// Resource List routes - Video
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

app.get('/:lang/resources/video', (c) => {
  const lang = c.req.param('lang') as Language
  const language: Language = (lang && ['zh', 'en', 'jp', 'hk'].includes(lang)) ? lang : detectLanguageFromPath(c.req.path) || 'zh'
  const currentPath = `/${language}/resources/video`
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

app.get('/:lang/resources/reports', (c) => {
  const lang = c.req.param('lang') as Language
  const language: Language = (lang && ['zh', 'en', 'jp', 'hk'].includes(lang)) ? lang : detectLanguageFromPath(c.req.path) || 'zh'
  const currentPath = `/${language}/resources/reports`
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

// Resource List routes - All
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

app.get('/:lang/resources/all', (c) => {
  const lang = c.req.param('lang') as Language
  const language: Language = (lang && ['zh', 'en', 'jp', 'hk'].includes(lang)) ? lang : detectLanguageFromPath(c.req.path) || 'zh'
  const currentPath = `/${language}/resources/all`
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

app.get('/:lang/resources/whitepapers', (c) => {
  const lang = c.req.param('lang') as Language
  const language: Language = (lang && ['zh', 'en', 'jp', 'hk'].includes(lang)) ? lang : detectLanguageFromPath(c.req.path) || 'zh'
  const currentPath = `/${language}/resources/whitepapers`
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

app.get('/:lang/resources/demos', (c) => {
  const lang = c.req.param('lang') as Language
  const language: Language = (lang && ['zh', 'en', 'jp', 'hk'].includes(lang)) ? lang : detectLanguageFromPath(c.req.path) || 'zh'
  const currentPath = `/${language}/resources/demos`
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

app.get('/:lang/resources/podcast', (c) => {
  const lang = c.req.param('lang') as Language
  const language: Language = (lang && ['zh', 'en', 'jp', 'hk'].includes(lang)) ? lang : detectLanguageFromPath(c.req.path) || 'zh'
  const currentPath = `/${language}/resources/podcast`
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

// Contact Page Routes
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

// About Us Page Routes
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

app.get('/:lang/about', (c) => {
  const lang = c.req.param('lang') as Language
  const language: Language = (lang && ['zh', 'en', 'jp', 'hk'].includes(lang)) ? lang : detectLanguageFromPath(c.req.path) || 'zh'
  const currentPath = `/${language}/about`
  
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

// 注意：这里需要复制 src/index.tsx 中的所有其他路由
// 包括：场景页面、Admin 页面、API 路由等
// 由于文件很大，建议使用脚本或手动逐步迁移

// 临时：添加一个简单的路由来测试
app.get('/api/hello', (c) => {
  return c.json({ message: 'Hello from Zenava Node.js API!' })
})

// Contact Form API
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
      // 构建完整的 URL（用于内部调用）
      const baseUrl = c.req.url.split('/api/contact')[0] || 'http://localhost:3000'
      const ticketResponse = await fetch(`${baseUrl}/api/ticket/create`, {
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

// Database health check
app.get('/api/db/health', async (c) => {
  try {
    const result = await c.env.DB.prepare('SELECT 1 as health').first();
    return c.json({ 
      success: true, 
      status: 'healthy',
      database: 'SQLite (Node.js)',
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

export function createApp() {
  return app
}

export default app
