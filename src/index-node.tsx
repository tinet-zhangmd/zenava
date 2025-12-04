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
import { query as mysqlQuery } from './lib/mysql.js'
import { saveUploadedImage, deleteUploadedImage } from './lib/upload.js'

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
import { ResourceCategoryManagement } from './pages/admin/ResourceCategoryManagement.js'
import { ResourceContentManagement } from './pages/admin/ResourceContentManagement.js'
import { CategoryEditor } from './pages/admin/CategoryEditor.js'

// 导入 CMS API
import cmsApi from './api/cms.js'
import publishApi from './api/publish.js'
import commonContentApi from './api/common-content.js'
import uploadApi from './api/upload.js'
import ticketApi from './api/ticket.js'
import { navigation } from './api/navigation.js'
import resourceCenterApi from './api/resource-center.js'

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

// Resource Center API - 映射到正确的路径
// 注意：API 文件中的路由是 /categories 和 /contents
// 前端调用的是 /api/admin/resource-categories 和 /api/admin/resource-contents
// 所以我们需要创建别名路由

// Serve static files
// 使用绝对路径确保文件能正确访问
app.use('/uploads/*', serveStatic({ 
  root: join(process.cwd(), 'public')
}))
app.use('/static/*', serveStatic({ 
  root: join(process.cwd(), 'public')
}))
app.use('/assets/*', serveStatic({ 
  root: join(process.cwd(), 'dist')
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

// ==================== Admin Routes ====================

// Admin login page
app.get('/ticloudadmin/login', (c) => {
  const error = c.req.query('error')
  return c.html(<AdminLogin error={error} />)
})

// Admin login handler
app.post('/ticloudadmin/login', async (c) => {
  const body = await c.req.formData()
  const email = body.get('email') as string
  const password = body.get('password') as string
  
  const adminEmail = process.env.ADMIN_EMAIL || 'ticloudhoutai@zenava.ai'
  const adminPassword = process.env.ADMIN_PASSWORD || 'tinet.Az2167Hk'
  
  if (email === adminEmail && password === adminPassword) {
    const sessionToken = crypto.randomUUID()
    setSecureCookie(c, 'admin_session', sessionToken)
    
    const csrfToken = generateCSRFToken()
    setSecureCookie(c, 'csrf_token', csrfToken)
    
    return c.redirect('/ticloudadmin')
  } else {
    return c.redirect('/ticloudadmin/login?error=Invalid credentials')
  }
})

// Admin logout
app.get('/ticloudadmin/logout', (c) => {
  deleteCookie(c, 'admin_session', { path: '/ticloudadmin' })
  return c.redirect('/ticloudadmin/login')
})

// Dashboard
app.get('/ticloudadmin', requireAuth(), (c) => {
  return c.html(
    <AdminLayout title="控制台" currentPath="/ticloudadmin" user={{ name: '管理员', email: 'admin@zenava.com' }}>
      <Dashboard />
    </AdminLayout>
  )
})

// Content Management
app.get('/ticloudadmin/content', requireAuth(), (c) => {
  return c.html(
    <AdminLayout title="内容管理" currentPath="/ticloudadmin/content">
      <ContentManagementDB />
    </AdminLayout>
  )
})

// Content Editor - New
app.get('/ticloudadmin/content/new', requireAuth(), (c) => {
  return c.html(
    <AdminLayout title="创建新内容" currentPath="/ticloudadmin/content">
      <ContentEditor mode="create" />
    </AdminLayout>
  )
})

// Content Editor - Edit
app.get('/ticloudadmin/content/edit/:id', requireAuth(), (c) => {
  const contentId = c.req.param('id')
  
  return c.html(
    <AdminLayout title="编辑内容" currentPath="/ticloudadmin/content">
      <ContentEditor mode="edit" contentId={contentId} />
    </AdminLayout>
  )
})

// SEO Management
app.get('/ticloudadmin/seo', requireAuth(), (c) => {
  return c.html(
    <AdminLayout title="SEO 管理" currentPath="/ticloudadmin/seo">
      <SEOManagement />
    </AdminLayout>
  )
})

// I18n Management
app.get('/ticloudadmin/i18n', requireAuth(), (c) => {
  return c.html(
    <AdminLayout title="多语言管理" currentPath="/ticloudadmin/i18n">
      <I18nManagement />
    </AdminLayout>
  )
})

// Media Library
app.get('/ticloudadmin/media', requireAuth(), (c) => {
  return c.html(
    <AdminLayout title="媒体库" currentPath="/ticloudadmin/media">
      <MediaLibrary />
    </AdminLayout>
  )
})

// Settings
app.get('/ticloudadmin/settings', requireAuth(), (c) => {
  return c.html(
    <AdminLayout title="系统设置" currentPath="/ticloudadmin/settings">
      <Settings />
    </AdminLayout>
  )
})

// Common Content Management
app.get('/ticloudadmin/common-content', requireAuth(), (c) => {
  return c.html(
    <AdminLayout title="公共内容管理" currentPath="/ticloudadmin/common-content">
      <CommonContentManagementV2 />
    </AdminLayout>
  )
})

// Logs
app.get('/ticloudadmin/logs', requireAuth(), (c) => {
  return c.html(
    <AdminLayout title="操作日志" currentPath="/ticloudadmin/logs">
      <Logs />
    </AdminLayout>
  )
})

// Publish Manager
app.get('/ticloudadmin/publish', requireAuth(), (c) => {
  return c.html(
    <AdminLayout title="发布管理" currentPath="/ticloudadmin/publish">
      <PublishManager />
    </AdminLayout>
  )
})

// Resource Center - Categories
app.get('/ticloudadmin/resource-categories', requireAuth(), async (c) => {
  try {
    // 获取分页参数
    const page = parseInt(c.req.query('page') || '1')
    const pageSize = 10
    const offset = (page - 1) * pageSize
    
    // 查询总数
    const [countResult] = await mysqlQuery<any[]>(
      'SELECT COUNT(*) as total FROM resource_categories'
    )
    const total = countResult.total || 0
    const totalPages = Math.ceil(total / pageSize)
    
    // 查询当前页数据（LIMIT 直接拼接，因为 MySQL 预处理语句不支持 LIMIT 占位符）
    const categories = await mysqlQuery<any[]>(
      `SELECT id, sort_order, name, link as slug, 
              description, cover_image, cover_image_size, cover_image_type,
              category_template as list_template, 
              page_template as detail_template, 
              is_displayed as is_visible, created_at, updated_at 
       FROM resource_categories 
       ORDER BY sort_order ASC, id ASC
       LIMIT ${offset}, ${pageSize}`
    )
    
    return c.html(
      <AdminLayout title="栏目分类管理" currentPath="/ticloudadmin/resource-categories">
        <ResourceCategoryManagement 
          categories={categories}
          currentPage={page}
          totalPages={totalPages}
          total={total}
        />
      </AdminLayout>
    )
  } catch (error) {
    console.error('获取栏目列表失败:', error)
    // 如果出错，返回空列表
    return c.html(
      <AdminLayout title="栏目分类管理" currentPath="/ticloudadmin/resource-categories">
        <ResourceCategoryManagement 
          categories={[]}
          currentPage={1}
          totalPages={1}
          total={0}
        />
      </AdminLayout>
    )
  }
})

// 创建栏目页面
app.get('/ticloudadmin/resource-categories/new', requireAuth(), (c) => {
  return c.html(
    <AdminLayout title="创建新栏目" currentPath="/ticloudadmin/resource-categories">
      <CategoryEditor mode="create" />
    </AdminLayout>
  )
})

// 编辑栏目页面
app.get('/ticloudadmin/resource-categories/edit/:id', requireAuth(), async (c) => {
  try {
    const id = c.req.param('id')
    const [category] = await mysqlQuery<any[]>(
      `SELECT id, sort_order, name, link as slug, 
              description, cover_image, cover_image_size, cover_image_type,
              category_template as list_template, 
              page_template as detail_template, 
              is_displayed as is_visible 
       FROM resource_categories WHERE id = ?`,
      [id]
    )
    
    if (!category) {
      return c.html(
        <AdminLayout title="栏目不存在" currentPath="/ticloudadmin/resource-categories">
          <div class="text-center py-12">
            <i class="fas fa-exclamation-circle text-6xl text-gray-300 mb-4"></i>
            <p class="text-lg text-gray-600">栏目不存在</p>
            <a href="/ticloudadmin/resource-categories" 
               class="inline-block mt-4 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700">
              返回列表
            </a>
          </div>
        </AdminLayout>
      )
    }
    
    return c.html(
      <AdminLayout title="编辑栏目" currentPath="/ticloudadmin/resource-categories">
        <CategoryEditor mode="edit" category={category} />
      </AdminLayout>
    )
  } catch (error) {
    console.error('获取栏目信息失败:', error)
    return c.text('加载失败', 500)
  }
})

// Resource Center - Contents
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
    { id: 189, name: '案例研究' },
    { id: 191, name: '行业报告' },
    { id: 195, name: '技术答疑' }
  ]

  return c.html(
    <AdminLayout title="内容列表管理" currentPath="/ticloudadmin/resource-contents">
      <ResourceContentManagement contents={mockContents} categories={mockCategories} />
    </AdminLayout>
  )
})

// ==================== Admin API Routes ====================

// 图片上传接口
app.post('/api/admin/upload/image', requireAuth(), async (c) => {
  try {
    const formData = await c.req.formData()
    const file = formData.get('file') as File
    const category = (formData.get('category') as string) || 'categories'

    if (!file) {
      return c.json({
        success: false,
        error: '没有接收到文件'
      }, 400)
    }

    // 验证 category 参数
    const validCategories = ['categories', 'contents', 'temp']
    if (!validCategories.includes(category)) {
      return c.json({
        success: false,
        error: '无效的分类参数'
      }, 400)
    }

    const result = await saveUploadedImage(file, category as any)
    
    if (result.success) {
      return c.json({
        success: true,
        data: {
          url: result.url,
          path: result.path,
          size: result.size,
          type: result.type
        }
      })
    } else {
      return c.json({
        success: false,
        error: result.error
      }, 400)
    }
  } catch (error: any) {
    console.error('❌ 上传失败:', error)
    return c.json({
      success: false,
      error: '服务器错误'
    }, 500)
  }
})

// Resource Center API Proxy - 直接代理到资源中心 API
// 前端调用 /api/admin/resource-categories，我们转发到资源中心 API

// 获取所有栏目分类
app.get('/api/admin/resource-categories', async (c) => {
  try {
    const categories = await mysqlQuery<any[]>(
      `SELECT id, sort_order, name, link as slug, 
              description, cover_image, cover_image_size, cover_image_type,
              category_template as list_template, 
              page_template as detail_template, 
              is_displayed as is_visible, created_at, updated_at 
       FROM resource_categories 
       ORDER BY sort_order ASC, id ASC`
    )
    
    return c.json({ 
      success: true, 
      data: categories
    })
  } catch (error: any) {
    console.error('获取栏目列表失败:', error)
    return c.json({ 
      success: false, 
      error: error.message 
    }, 500)
  }
})

// 创建栏目
app.post('/api/admin/resource-categories', async (c) => {
  try {
    const { 
      sort_order, 
      name, 
      slug, 
      description,
      cover_image,
      cover_image_size,
      cover_image_type,
      list_template, 
      detail_template, 
      is_visible 
    } = await c.req.json()
    
    if (!name || !slug || !list_template || !detail_template) {
      return c.json({ 
        success: false, 
        error: '缺少必填字段' 
      }, 400)
    }
    
    // 验证值是否有效
    const validTemplates = ['list_article', 'list_video', 'list_download']
    if (!validTemplates.includes(list_template) || !validTemplates.includes(detail_template)) {
      return c.json({ 
        success: false, 
        error: `模板值无效。允许的值: ${validTemplates.join(', ')}` 
      }, 400)
    }
    
    const result: any = await mysqlQuery(
      `INSERT INTO resource_categories 
       (sort_order, name, link, description, cover_image, cover_image_size, cover_image_type, 
        category_template, page_template, is_displayed) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        sort_order || 0, 
        name, 
        slug, 
        description || null,
        cover_image || null,
        cover_image_size || null,
        cover_image_type || null,
        list_template, 
        detail_template, 
        is_visible !== false
      ]
    )
    
    return c.json({ 
      success: true, 
      data: { 
        id: result.insertId,
        sort_order,
        name,
        slug,
        description,
        cover_image,
        list_template,
        detail_template,
        is_visible
      }
    })
  } catch (error: any) {
    console.error('创建栏目失败:', error)
    return c.json({ 
      success: false, 
      error: error.message
    }, 500)
  }
})

// 获取单个栏目
app.get('/api/admin/resource-categories/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const [category] = await mysqlQuery<any[]>(
      `SELECT id, sort_order, name, link as slug, 
              description, cover_image, cover_image_size, cover_image_type,
              category_template as list_template, 
              page_template as detail_template, 
              is_displayed as is_visible, created_at, updated_at 
       FROM resource_categories WHERE id = ?`,
      [id]
    )
    
    if (!category) {
      return c.json({ 
        success: false, 
        error: '栏目不存在' 
      }, 404)
    }
    
    return c.json({ 
      success: true, 
      data: category 
    })
  } catch (error: any) {
    return c.json({ 
      success: false, 
      error: error.message 
    }, 500)
  }
})

// 更新栏目
app.put('/api/admin/resource-categories/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const body = await c.req.json()
    
    // 获取当前栏目数据
    const [currentCategory] = await mysqlQuery<any[]>(
      `SELECT * FROM resource_categories WHERE id = ?`,
      [id]
    )
    
    if (!currentCategory) {
      return c.json({ 
        success: false, 
        error: '栏目不存在' 
      }, 404)
    }
    
    // 合并数据：使用提交的数据，如果没有则使用当前数据
    const sort_order = body.sort_order !== undefined ? body.sort_order : currentCategory.sort_order
    const name = body.name !== undefined ? body.name : currentCategory.name
    const slug = body.slug !== undefined ? body.slug : currentCategory.link
    const description = body.description !== undefined ? body.description : currentCategory.description
    const cover_image = body.cover_image !== undefined ? body.cover_image : currentCategory.cover_image
    const cover_image_size = body.cover_image_size !== undefined ? body.cover_image_size : currentCategory.cover_image_size
    const cover_image_type = body.cover_image_type !== undefined ? body.cover_image_type : currentCategory.cover_image_type
    const list_template = body.list_template !== undefined ? body.list_template : currentCategory.category_template
    const detail_template = body.detail_template !== undefined ? body.detail_template : currentCategory.page_template
    const is_visible = body.is_visible !== undefined ? body.is_visible : currentCategory.is_displayed
    
    // 验证模板值（如果提供了模板）
    if (body.list_template !== undefined || body.detail_template !== undefined) {
      const validTemplates = ['list_article', 'list_video', 'list_download']
      if (!validTemplates.includes(list_template) || !validTemplates.includes(detail_template)) {
        return c.json({ 
          success: false, 
          error: `模板值无效。允许的值: ${validTemplates.join(', ')}` 
        }, 400)
      }
    }
    
    // 更新栏目
    await mysqlQuery(
      `UPDATE resource_categories 
       SET sort_order = ?, name = ?, link = ?, description = ?, 
           cover_image = ?, cover_image_size = ?, cover_image_type = ?,
           category_template = ?, page_template = ?, is_displayed = ?
       WHERE id = ?`,
      [
        sort_order, 
        name, 
        slug, 
        description || null,
        cover_image || null,
        cover_image_size || null,
        cover_image_type || null,
        list_template, 
        detail_template, 
        is_visible, 
        id
      ]
    )
    
    // 如果更换了图片，删除旧图片
    if (currentCategory.cover_image && cover_image && currentCategory.cover_image !== cover_image) {
      await deleteUploadedImage(currentCategory.cover_image)
    }
    
    return c.json({ 
      success: true, 
      message: '栏目更新成功' 
    })
  } catch (error: any) {
    return c.json({ 
      success: false, 
      error: error.message 
    }, 500)
  }
})

// 删除栏目
app.delete('/api/admin/resource-categories/:id', async (c) => {
  try {
    const id = c.req.param('id')
    
    // 检查是否有关联内容
    const [contents] = await mysqlQuery<any[]>(
      `SELECT COUNT(*) as count FROM resource_contents WHERE category_id = ?`,
      [id]
    )
    
    if (contents && contents.count > 0) {
      return c.json({ 
        success: false, 
        error: `该栏目下还有 ${contents.count} 个内容，无法删除` 
      }, 400)
    }
    
    // 获取栏目信息（用于删除图片）
    const [category] = await mysqlQuery<any[]>(
      'SELECT cover_image FROM resource_categories WHERE id = ?',
      [id]
    )
    
    // 删除栏目记录
    await mysqlQuery(
      `DELETE FROM resource_categories WHERE id = ?`,
      [id]
    )
    
    // 删除关联的图片
    if (category?.cover_image) {
      await deleteUploadedImage(category.cover_image)
    }
    
    return c.json({ 
      success: true, 
      message: '栏目删除成功' 
    })
  } catch (error: any) {
    return c.json({ 
      success: false, 
      error: error.message 
    }, 500)
  }
})

// 批量操作栏目
app.post('/api/admin/resource-categories/batch', async (c) => {
  try {
    const { action, ids } = await c.req.json()
    
    if (!action || !ids || ids.length === 0) {
      return c.json({ 
        success: false, 
        error: '缺少必要参数' 
      }, 400)
    }
    
    const placeholders = ids.map(() => '?').join(',')
    
    switch (action) {
      case 'delete':
        // 先删除内容再删除分类
        await c.env.DB.prepare(
          `DELETE FROM resource_contents WHERE category_id IN (${placeholders})`
        ).bind(...ids).run()
        
        await c.env.DB.prepare(
          `DELETE FROM resource_categories WHERE id IN (${placeholders})`
        ).bind(...ids).run()
        break
        
      case 'show':
        await c.env.DB.prepare(
          `UPDATE resource_categories SET is_visible = 1 WHERE id IN (${placeholders})`
        ).bind(...ids).run()
        break
        
      case 'hide':
        await c.env.DB.prepare(
          `UPDATE resource_categories SET is_visible = 0 WHERE id IN (${placeholders})`
        ).bind(...ids).run()
        break
        
      default:
        return c.json({ 
          success: false, 
          error: '未知操作' 
        }, 400)
    }
    
    return c.json({ 
      success: true 
    })
  } catch (error: any) {
    return c.json({ 
      success: false, 
      error: error.message 
    }, 500)
  }
})

// 获取所有资源内容
app.get('/api/admin/resource-contents', async (c) => {
  try {
    const category_id = c.req.query('category_id')
    const status = c.req.query('status')
    const search = c.req.query('search')
    
    let sql = `
      SELECT 
        c.*,
        cat.name as category_name
      FROM resource_contents c
      LEFT JOIN resource_categories cat ON c.category_id = cat.id
      WHERE 1=1
    `
    const params: any[] = []
    
    if (category_id) {
      sql += ` AND c.category_id = ?`
      params.push(category_id)
    }
    
    if (status) {
      sql += ` AND c.status = ?`
      params.push(status)
    }
    
    if (search) {
      sql += ` AND (c.title LIKE ? OR c.author LIKE ?)`
      params.push(`%${search}%`, `%${search}%`)
    }
    
    sql += ` ORDER BY c.created_at DESC`
    
    const result = await c.env.DB.prepare(sql).bind(...params).all()
    
    return c.json({ 
      success: true, 
      data: result.results || []
    })
  } catch (error: any) {
    return c.json({ 
      success: false, 
      error: error.message 
    }, 500)
  }
})

// 创建资源内容
app.post('/api/admin/resource-contents', async (c) => {
  try {
    const { 
      category_id, 
      title, 
      slug, 
      thumbnail, 
      author, 
      publish_date, 
      summary, 
      body, 
      tags, 
      status, 
      is_featured 
    } = await c.req.json()
    
    if (!category_id || !title || !slug) {
      return c.json({ 
        success: false, 
        error: '缺少必填字段' 
      }, 400)
    }
    
    const result = await c.env.DB.prepare(
      `INSERT INTO resource_contents 
       (category_id, title, slug, thumbnail, author, publish_date, summary, body, tags, status, is_featured) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      category_id, 
      title, 
      slug, 
      thumbnail || null, 
      author || null, 
      publish_date || null, 
      summary || null, 
      body || null, 
      tags || null, 
      status || 'draft', 
      is_featured || false
    ).run()
    
    return c.json({ 
      success: true, 
      data: { 
        id: result.meta.last_row_id,
        category_id,
        title,
        slug,
        status
      }
    })
  } catch (error: any) {
    return c.json({ 
      success: false, 
      error: error.message 
    }, 500)
  }
})

// 获取单个资源内容
app.get('/api/admin/resource-contents/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const content = await c.env.DB.prepare(
      `SELECT * FROM resource_contents WHERE id = ?`
    ).bind(id).first()
    
    if (!content) {
      return c.json({ 
        success: false, 
        error: '内容不存在' 
      }, 404)
    }
    
    return c.json({ 
      success: true, 
      data: content 
    })
  } catch (error: any) {
    return c.json({ 
      success: false, 
      error: error.message 
    }, 500)
  }
})

// 更新资源内容
app.put('/api/admin/resource-contents/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const data = await c.req.json()
    
    await c.env.DB.prepare(
      `UPDATE resource_contents 
       SET category_id = ?, title = ?, slug = ?, thumbnail = ?, author = ?, 
           publish_date = ?, summary = ?, body = ?, tags = ?, status = ?, 
           is_featured = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`
    ).bind(
      data.category_id,
      data.title,
      data.slug,
      data.thumbnail,
      data.author,
      data.publish_date,
      data.summary,
      data.body,
      data.tags,
      data.status,
      data.is_featured,
      id
    ).run()
    
    return c.json({ 
      success: true, 
      message: '内容更新成功' 
    })
  } catch (error: any) {
    return c.json({ 
      success: false, 
      error: error.message 
    }, 500)
  }
})

// 删除资源内容
app.delete('/api/admin/resource-contents/:id', async (c) => {
  try {
    const id = c.req.param('id')
    
    await c.env.DB.prepare(
      `DELETE FROM resource_contents WHERE id = ?`
    ).bind(id).run()
    
    return c.json({ 
      success: true, 
      message: '内容删除成功' 
    })
  } catch (error: any) {
    return c.json({ 
      success: false, 
      error: error.message 
    }, 500)
  }
})

// Delete content
app.delete('/ticloudadmin/api/content/:id', requireAuth(), async (c) => {
  const id = c.req.param('id')
  // In real app, delete from database
  return c.json({ success: true, message: 'Content deleted' })
})

// Publish content
app.post('/ticloudadmin/api/content/:id/publish', requireAuth(), async (c) => {
  const id = c.req.param('id')
  // In real app, update database
  return c.json({ success: true, message: 'Content published' })
})

// SEO Analysis
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

// Translation
app.post('/ticloudadmin/api/translate', requireAuth(), async (c) => {
  const { text, from, to } = await c.req.json()
  
  // Mock translation
  const mockTranslations: Record<string, string> = {
    'en-jp': 'これはモック翻訳です',
    'en-hk': '這是模擬翻譯',
    'jp-en': 'This is a mock translation',
    'jp-hk': '這是模擬翻譯',
    'hk-en': 'This is a mock translation', 
    'hk-jp': 'これはモック翻訳です'
  }
  
  const key = `${from}-${to}`
  const translation = mockTranslations[key] || text
  
  return c.json({ success: true, translation })
})

// Update i18n
app.put('/ticloudadmin/api/i18n/:key', requireAuth(), async (c) => {
  const key = c.req.param('key')
  const { translations } = await c.req.json()
  
  // In real app, save to database or i18n files
  return c.json({ success: true, message: 'Translation saved' })
})

export function createApp() {
  return app
}

export default app
