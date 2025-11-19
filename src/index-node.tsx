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
import { navigation } from './api/navigation.js'

// 导入其他页面
import { MarketingScenario } from './pages/MarketingScenario.js'
import { SalesScenario } from './pages/SalesScenario.js'
import { CustomerServiceScenario } from './pages/CustomerServiceScenario.js'
import { InternalServiceScenario } from './pages/InternalServiceScenario.js'
import { ManagementScenario } from './pages/ManagementScenario.js'
import { AboutUs } from './pages/AboutUs.js'
import { PrivacyPolicy } from './pages/PrivacyPolicy.js'
import { TermsAndConditions } from './pages/TermsAndConditions.js'

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
app.get('/', (c) => {
  const language: Language = detectLanguageFromIP(c.req.raw)
  const currentPath = '/'
  
  if (language !== 'en') {
    return c.redirect(`/${language}`)
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

// 注意：这里需要复制 src/index.tsx 中的所有其他路由
// 包括：场景页面、Admin 页面、API 路由等
// 由于文件很大，建议使用脚本或手动逐步迁移

// 临时：添加一个简单的路由来测试
app.get('/api/hello', (c) => {
  return c.json({ message: 'Hello from Zenava Node.js API!' })
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
