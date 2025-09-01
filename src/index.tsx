import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'
import { getCookie, setCookie, deleteCookie } from 'hono/cookie'
import { Layout } from './components/Layout'
import { LayoutWithCommonContent } from './components/LayoutWithCommonContent'
import { LayoutWithUnifiedNav } from './components/LayoutWithUnifiedNav'
import { Homepage } from './pages/Homepage'
import { HomepageDB } from './pages/HomepageDB'
import { getNavigationConfig, getFooterConfig } from './utils/common-content'
import { getNavigationData } from './utils/navigation-helper'
import { AIHomepage } from './pages/AIHomepage'
import { ZenavaHomepage } from './pages/ZenavaHomepage'
import { detectLanguageFromPath, detectLanguageFromIP, Language } from './utils/i18n'

// Import Admin Pages
import { AdminLayout } from './pages/admin/AdminLayout'
import { AdminLogin } from './pages/admin/AdminLogin'
import { Dashboard } from './pages/admin/Dashboard'
import { ContentManagement } from './pages/admin/ContentManagement'
import { ContentManagementDB } from './pages/admin/ContentManagementDB'
import { ContentEditor } from './pages/admin/ContentEditor'
import { SEOManagement } from './pages/admin/SEOManagement'
import { I18nManagement } from './pages/admin/I18nManagement'
import { MediaLibrary } from './pages/admin/MediaLibrary'
import { Settings } from './pages/admin/Settings'
import { Logs } from './pages/admin/Logs'
import { PublishManager } from './pages/admin/PublishManager'
import { CommonContentManagement } from './pages/admin/CommonContentManagement'
import { CommonContentManagementV2 } from './pages/admin/CommonContentManagementV2'

// Import CMS API
import cmsApi from './api/cms'
import publishApi from './api/publish'
import commonContentApi from './api/common-content'
import uploadApi from './api/upload'
import { navigation } from './api/navigation'

// Define Cloudflare Bindings
type Bindings = {
  DB: D1Database;
}

const app = new Hono<{ Bindings: Bindings }>()

// Enable CORS for API routes
app.use('/api/*', cors())

// Mount CMS API routes
app.route('/api/cms', cmsApi)
app.route('/api/publish', publishApi)
app.route('/api/common-content', commonContentApi)
app.route('/api/upload', uploadApi)
app.route('/api/navigation', navigation)

// Serve static files
app.use('/static/*', serveStatic({ root: './public' }))

// Homepage routes - Load content from database
app.get('/', async (c) => {
  try {
    // Detect language from IP geolocation
    const language: Language = detectLanguageFromIP(c.req.raw)
    const currentPath = '/'
    
    // If not English, redirect to appropriate language path
    if (language !== 'en') {
      return c.redirect(`/${language}`)
    }
    
    // Load page content from database
    const pageData = await c.env.DB.prepare(`
      SELECT p.*, s.meta_title, s.meta_description, s.meta_keywords
      FROM pages p
      LEFT JOIN page_seo s ON p.id = s.page_id
      WHERE p.slug = ? AND p.language = ? AND p.status = 'published'
    `).bind('home', 'en').first();
    
    // Load content modules if page exists
    let modules = [];
    if (pageData) {
      const { results } = await c.env.DB.prepare(`
        SELECT * FROM content_modules
        WHERE page_id = ? AND status = 'published' AND is_visible = 1
        ORDER BY position
      `).bind(pageData.id).all();
      modules = results || [];
    }
    
    // Load global settings
    const { results: settings } = await c.env.DB.prepare(`
      SELECT setting_key, setting_value FROM global_settings
    `).all();
    
    const globalSettings: Record<string, string> = {};
    if (settings) {
      for (const setting of settings) {
        globalSettings[setting.setting_key] = setting.setting_value;
      }
    }
    
    // Load unified navigation data
    const { config: navConfig, menuItems } = await getNavigationData(c.env.DB, language);
    const { config: footerConfig, sections: footerSections, privacyLinks } = await getFooterConfig(c.env.DB, language);
    
    return c.html(
      <LayoutWithUnifiedNav 
        language={language} 
        currentPath={currentPath}
        seoTitle={pageData?.meta_title}
        seoDescription={pageData?.meta_description}
        seoKeywords={pageData?.meta_keywords}
        navigationConfig={navConfig}
        menuItems={menuItems}
        footerConfig={footerConfig}
        footerSections={footerSections}
        privacyLinks={privacyLinks}
      >
        <HomepageDB 
          language={language}
          pageData={pageData}
          modules={modules}
          settings={globalSettings}
        />
      </LayoutWithUnifiedNav>
    )
  } catch (error: any) {
    console.error('Homepage error:', error);
    // Fallback to original homepage if database fails
    return c.html(
      <Layout language="en" currentPath="/">
        <HomepageDB 
          language="en"
          pageData={null}
          modules={[]}
          settings={{}}
        />
      </Layout>
    )
  }
})

app.get('/jp', async (c) => {
  const language: Language = 'jp'
  const currentPath = '/jp'
  
  try {
    // Load basic data for consistency
    const pageData = null // JP version uses default content
    const modules = []
    const globalSettings = {}
    
    // Load unified navigation data for Japanese
    const { config: navConfig, menuItems } = await getNavigationData(c.env.DB, language);
    const { config: footerConfig, sections: footerSections, privacyLinks } = await getFooterConfig(c.env.DB, language);
    
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
          pageData={pageData}
          modules={modules}
          settings={globalSettings}
        />
      </LayoutWithUnifiedNav>
    )
  } catch (error: any) {
    return c.html(
      <Layout language={language} currentPath={currentPath}>
        <ZenavaHomepage 
          language={language}
          pageData={null}
          modules={[]}
          settings={{}}
        />
      </Layout>
    )
  }
})

app.get('/hk', async (c) => {
  const language: Language = 'hk'
  const currentPath = '/hk'
  
  try {
    // Load basic data for consistency
    const pageData = null // HK version uses default content
    const modules = []
    const globalSettings = {}
    
    // Load unified navigation data for Hong Kong
    const { config: navConfig, menuItems } = await getNavigationData(c.env.DB, language);
    const { config: footerConfig, sections: footerSections, privacyLinks } = await getFooterConfig(c.env.DB, language);
    
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
          pageData={pageData}
          modules={modules}
          settings={globalSettings}
        />
      </LayoutWithUnifiedNav>
    )
  } catch (error: any) {
    return c.html(
      <Layout language={language} currentPath={currentPath}>
        <ZenavaHomepage 
          language={language}
          pageData={null}
          modules={[]}
          settings={{}}
        />
      </Layout>
    )
  }
})

// Add support for trailing slash routes
app.get('/jp/', (c) => {
  return c.redirect('/jp')
})

app.get('/hk/', (c) => {
  return c.redirect('/hk')
})

// Import pages
import { MarketingScenario } from './pages/MarketingScenario'
import { SalesScenario } from './pages/SalesScenario'
import { CustomerServiceScenario } from './pages/CustomerServiceScenario'
import { InternalServiceScenario } from './pages/InternalServiceScenario'
import { ManagementScenario } from './pages/ManagementScenario'
import { AboutUs } from './pages/AboutUs'
import { PrivacyPolicy } from './pages/PrivacyPolicy'
import { TermsAndConditions } from './pages/TermsAndConditions'
import { renderScenarioPage } from './utils/scenario-route-helper'

// Privacy Policy routes
app.get('/privacy-policy', (c) => {
  const language: Language = 'en'
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

app.get('/jp/terms-and-conditions', (c) => {
  const language: Language = 'jp'
  return c.html(<TermsAndConditions language={language} />)
})

app.get('/hk/terms-and-conditions', (c) => {
  const language: Language = 'hk'
  return c.html(<TermsAndConditions language={language} />)
})

// Marketing Scenario routes
app.get('/scenarios/marketing', async (c) => {
  return renderScenarioPage(c, MarketingScenario, 'en', '/scenarios/marketing', 'Zenava for Marketing')
})

app.get('/jp/scenarios/marketing', async (c) => {
  return renderScenarioPage(c, MarketingScenario, 'jp', '/jp/scenarios/marketing', 'マーケティング向けZenava')
})

app.get('/hk/scenarios/marketing', async (c) => {
  return renderScenarioPage(c, MarketingScenario, 'hk', '/hk/scenarios/marketing', '營銷場景')
})

// Sales Scenario routes
app.get('/scenarios/sales', async (c) => {
  return renderScenarioPage(c, SalesScenario, 'en', '/scenarios/sales', 'Zenava for Sales')
})

app.get('/jp/scenarios/sales', async (c) => {
  return renderScenarioPage(c, SalesScenario, 'jp', '/jp/scenarios/sales', '営業向けZenava')
})

app.get('/hk/scenarios/sales', async (c) => {
  return renderScenarioPage(c, SalesScenario, 'hk', '/hk/scenarios/sales', '銷售場景')
})

// Customer Service Scenario routes
app.get('/scenarios/customer-service', async (c) => {
  return renderScenarioPage(c, CustomerServiceScenario, 'en', '/scenarios/customer-service', 'Zenava for Customer Service')
})

app.get('/jp/scenarios/customer-service', async (c) => {
  return renderScenarioPage(c, CustomerServiceScenario, 'jp', '/jp/scenarios/customer-service', 'カスタマーサービス向けZenava')
})

app.get('/hk/scenarios/customer-service', async (c) => {
  return renderScenarioPage(c, CustomerServiceScenario, 'hk', '/hk/scenarios/customer-service', '客服場景')
})

// Internal Service Scenario routes
app.get('/scenarios/internal-service', async (c) => {
  return renderScenarioPage(c, InternalServiceScenario, 'en', '/scenarios/internal-service', 'Zenava for Internal Service')
})

app.get('/jp/scenarios/internal-service', async (c) => {
  return renderScenarioPage(c, InternalServiceScenario, 'jp', '/jp/scenarios/internal-service', '社内サービス向けZenava')
})

app.get('/hk/scenarios/internal-service', async (c) => {
  return renderScenarioPage(c, InternalServiceScenario, 'hk', '/hk/scenarios/internal-service', '內部服務')
})

// Management Scenario routes
app.get('/scenarios/management', async (c) => {
  return renderScenarioPage(c, ManagementScenario, 'en', '/scenarios/management', 'Zenava for Management')
})

app.get('/jp/scenarios/management', async (c) => {
  return renderScenarioPage(c, ManagementScenario, 'jp', '/jp/scenarios/management', '管理最適化向けZenava')
})

app.get('/hk/scenarios/management', async (c) => {
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
app.get('/about', async (c) => {
  return renderScenarioPage(c, AboutUs, 'en', '/about', 'About Us')
})

app.get('/jp/about', async (c) => {
  return renderScenarioPage(c, AboutUs, 'jp', '/jp/about', '私たちについて')
})

app.get('/hk/about', async (c) => {
  return renderScenarioPage(c, AboutUs, 'hk', '/hk/about', '關於我們')
})

// Admin Authentication Middleware
async function requireAuth(c: any, next: any) {
  const session = c.req.header('Authorization') || getCookie(c, 'admin_session')
  
  // Simple session check - in production, use proper JWT validation
  if (!session || session !== 'admin-authenticated') {
    return c.redirect('/admin/login')
  }
  
  await next()
}

// Admin Routes
app.get('/admin/login', (c) => {
  const error = c.req.query('error')
  return c.html(<AdminLogin error={error} />)
})

app.post('/admin/login', async (c) => {
  const body = await c.req.formData()
  const email = body.get('email')
  const password = body.get('password')
  
  // Simple authentication - in production, use proper password hashing and validation
  if (email === 'admin@zenava.com' && password === 'admin123') {
    // Set session cookie
    setCookie(c, 'admin_session', 'admin-authenticated', {
      path: '/admin',
      httpOnly: true,
      maxAge: 86400 // 24 hours
    })
    return c.redirect('/admin')
  } else {
    return c.redirect('/admin/login?error=Invalid credentials')
  }
})

app.get('/admin/logout', (c) => {
  deleteCookie(c, 'admin_session', { path: '/admin' })
  return c.redirect('/admin/login')
})

// Protected Admin Routes
app.get('/admin', requireAuth, (c) => {
  return c.html(
    <AdminLayout title="控制台" currentPath="/admin" user={{ name: '管理员', email: 'admin@zenava.com' }}>
      <Dashboard />
    </AdminLayout>
  )
})

app.get('/admin/content', requireAuth, (c) => {
  const searchQuery = c.req.query('search') || ''
  const contentType = c.req.query('type') || 'all'
  const status = c.req.query('status') || 'all'
  
  return c.html(
    <AdminLayout title="内容管理" currentPath="/admin/content">
      <ContentManagementDB />
    </AdminLayout>
  )
})

app.get('/admin/content/new', requireAuth, (c) => {
  return c.html(
    <AdminLayout title="创建新内容" currentPath="/admin/content">
      <ContentEditor mode="create" />
    </AdminLayout>
  )
})

app.get('/admin/content/edit/:id', requireAuth, (c) => {
  const contentId = c.req.param('id')
  
  return c.html(
    <AdminLayout title="编辑内容" currentPath="/admin/content">
      <ContentEditor mode="edit" contentId={contentId} />
    </AdminLayout>
  )
})

app.get('/admin/seo', requireAuth, (c) => {
  return c.html(
    <AdminLayout title="SEO 管理" currentPath="/admin/seo">
      <SEOManagement />
    </AdminLayout>
  )
})

app.get('/admin/i18n', requireAuth, (c) => {
  return c.html(
    <AdminLayout title="多语言管理" currentPath="/admin/i18n">
      <I18nManagement />
    </AdminLayout>
  )
})

app.get('/admin/media', requireAuth, (c) => {
  return c.html(
    <AdminLayout title="媒体库" currentPath="/admin/media">
      <MediaLibrary />
    </AdminLayout>
  )
})

app.get('/admin/settings', requireAuth, (c) => {
  return c.html(
    <AdminLayout title="系统设置" currentPath="/admin/settings">
      <Settings />
    </AdminLayout>
  )
})

app.get('/admin/common-content', requireAuth, (c) => {
  return c.html(
    <AdminLayout title="公共内容管理" currentPath="/admin/common-content">
      <CommonContentManagementV2 />
    </AdminLayout>
  )
})

app.get('/admin/logs', requireAuth, (c) => {
  return c.html(
    <AdminLayout title="操作日志" currentPath="/admin/logs">
      <Logs />
    </AdminLayout>
  )
})

app.get('/admin/publish', requireAuth, (c) => {
  return c.html(
    <AdminLayout title="发布管理" currentPath="/admin/publish">
      <PublishManager />
    </AdminLayout>
  )
})

// Admin API Routes
app.delete('/admin/api/content/:id', requireAuth, async (c) => {
  const id = c.req.param('id')
  // In real app, delete from database
  return c.json({ success: true, message: 'Content deleted' })
})

app.post('/admin/api/content/:id/publish', requireAuth, async (c) => {
  const id = c.req.param('id')
  // In real app, update database
  return c.json({ success: true, message: 'Content published' })
})

app.post('/admin/api/seo/analyze/:id', requireAuth, async (c) => {
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

app.post('/admin/api/translate', requireAuth, async (c) => {
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

app.put('/admin/api/i18n/:key', requireAuth, async (c) => {
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
app.get('/cms', (c) => {
  return c.html(
    <html lang="zh-CN">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Zenava AI CMS - 智能内容管理平台</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
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
                  <a href="/cms/dashboard" class="group relative p-6 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 backdrop-blur-sm rounded-2xl border border-blue-400/30 hover:from-blue-600/30 hover:to-indigo-600/30 transition-all duration-300 hover:scale-105">
                    <div class="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-indigo-600/0 group-hover:from-blue-600/10 group-hover:to-indigo-600/10 rounded-2xl transition-all duration-300"></div>
                    <div class="relative z-10">
                      <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <i class="fas fa-chart-line text-white"></i>
                      </div>
                      <h4 class="text-white font-semibold mb-2">智能控制台</h4>
                      <p class="text-gray-300 text-sm">实时监控与分析</p>
                    </div>
                  </a>

                  <a href="/cms/content" class="group relative p-6 bg-gradient-to-br from-green-600/20 to-emerald-600/20 backdrop-blur-sm rounded-2xl border border-green-400/30 hover:from-green-600/30 hover:to-emerald-600/30 transition-all duration-300 hover:scale-105">
                    <div class="absolute inset-0 bg-gradient-to-br from-green-600/0 to-emerald-600/0 group-hover:from-green-600/10 group-hover:to-emerald-600/10 rounded-2xl transition-all duration-300"></div>
                    <div class="relative z-10">
                      <div class="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <i class="fas fa-edit text-white"></i>
                      </div>
                      <h4 class="text-white font-semibold mb-2">内容管理</h4>
                      <p class="text-gray-300 text-sm">AI辅助编辑</p>
                    </div>
                  </a>

                  <a href="/cms/ai-tools" class="group relative p-6 bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-2xl border border-purple-400/30 hover:from-purple-600/30 hover:to-pink-600/30 transition-all duration-300 hover:scale-105">
                    <div class="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-pink-600/0 group-hover:from-purple-600/10 group-hover:to-pink-600/10 rounded-2xl transition-all duration-300"></div>
                    <div class="relative z-10">
                      <div class="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <i class="fas fa-robot text-white"></i>
                      </div>
                      <h4 class="text-white font-semibold mb-2">AI工具箱</h4>
                      <p class="text-gray-300 text-sm">智能生成助手</p>
                    </div>
                  </a>

                  <a href="/cms/settings" class="group relative p-6 bg-gradient-to-br from-gray-600/20 to-slate-600/20 backdrop-blur-sm rounded-2xl border border-gray-400/30 hover:from-gray-600/30 hover:to-slate-600/30 transition-all duration-300 hover:scale-105">
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
                  <a href="/api/cms/pages" class="group flex items-center text-indigo-300 hover:text-indigo-100 transition-colors">
                    <i class="fas fa-code text-xs mr-2 group-hover:scale-110 transition-transform"></i>
                    <span class="text-sm">页面管理 API</span>
                  </a>
                  <a href="/api/cms/sites" class="group flex items-center text-purple-300 hover:text-purple-100 transition-colors">
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
app.get('/cms/dashboard', async (c) => {
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
          <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
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
                <a href="/cms/content/new" class="group relative p-4 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 backdrop-blur-sm rounded-xl border border-blue-400/30 hover:from-blue-600/30 hover:to-indigo-600/30 transition-all duration-300 hover:scale-105 text-center">
                  <i class="fas fa-plus text-2xl text-blue-400 mb-3"></i>
                  <div class="text-white font-medium text-sm">新建页面</div>
                </a>
                
                <a href="/cms/content" class="group relative p-4 bg-gradient-to-br from-green-600/20 to-emerald-600/20 backdrop-blur-sm rounded-xl border border-green-400/30 hover:from-green-600/30 hover:to-emerald-600/30 transition-all duration-300 hover:scale-105 text-center">
                  <i class="fas fa-edit text-2xl text-green-400 mb-3"></i>
                  <div class="text-white font-medium text-sm">内容管理</div>
                </a>
                
                <a href="/cms/media" class="group relative p-4 bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-xl border border-purple-400/30 hover:from-purple-600/30 hover:to-pink-600/30 transition-all duration-300 hover:scale-105 text-center">
                  <i class="fas fa-images text-2xl text-purple-400 mb-3"></i>
                  <div class="text-white font-medium text-sm">媒体库</div>
                </a>
                
                <a href="/cms/publish" class="group relative p-4 bg-gradient-to-br from-red-600/20 to-orange-600/20 backdrop-blur-sm rounded-xl border border-red-400/30 hover:from-red-600/30 hover:to-orange-600/30 transition-all duration-300 hover:scale-105 text-center">
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
app.get('/cms/content', async (c) => {
  try {
    const { results: pages } = await c.env.DB.prepare(`
      SELECT p.*, s.domain
      FROM pages p
      LEFT JOIN sites s ON p.site_id = s.id
      ORDER BY p.updated_at DESC
      LIMIT 20
    `).all();

    return c.html(
      <AdminLayout currentPath="/cms/content" title="内容管理">
        <div class="min-h-screen bg-gray-50 p-8">
          <div class="max-w-7xl mx-auto">
            <div class="flex justify-between items-center mb-8">
              <h1 class="text-3xl font-bold text-gray-900">📝 内容管理</h1>
              <a href="/cms/content/new" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
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
      <AdminLayout currentPath="/cms/content" title="错误">
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
app.get('/cms/content/edit/:id', async (c) => {
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
        <AdminLayout currentPath="/cms/content" title="页面不存在">
          <div class="min-h-screen bg-gray-50 p-8">
            <div class="max-w-4xl mx-auto">
              <h1 class="text-2xl font-bold text-red-600">页面不存在</h1>
              <a href="/cms/content" class="text-blue-600 hover:text-blue-700 mt-4 inline-block">返回内容列表</a>
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
      <AdminLayout currentPath="/cms/content" title={`编辑: ${page.title}`}>
        <ContentManagementDB 
          initialPage={page}
          initialModules={modules}
        />
      </AdminLayout>
    )
  } catch (error: any) {
    return c.html(
      <AdminLayout currentPath="/cms/content" title="错误">
        <div class="min-h-screen bg-gray-50 p-8">
          <div class="max-w-4xl mx-auto">
            <h1 class="text-2xl font-bold text-red-600">加载错误</h1>
            <p class="text-gray-700 mt-4">无法加载页面内容: {error.message}</p>
            <a href="/cms/content" class="text-blue-600 hover:text-blue-700 mt-4 inline-block">返回内容列表</a>
          </div>
        </div>
      </AdminLayout>
    )
  }
})

// CMS Dashboard
app.get('/cms/dashboard', async (c) => {
  try {
    // Get statistics from database
    const [pagesCount, modulesCount, mediaCount] = await Promise.all([
      c.env.DB.prepare('SELECT COUNT(*) as count FROM pages').first(),
      c.env.DB.prepare('SELECT COUNT(*) as count FROM content_modules').first(),
      c.env.DB.prepare('SELECT COUNT(*) as count FROM media').first()
    ]);
    
    return c.html(
      <AdminLayout currentPath="/cms/dashboard" title="控制台">
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
      <AdminLayout currentPath="/cms/dashboard" title="错误">
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
  const body = await c.req.json()
  // Handle contact form submission
  return c.json({ success: true, message: 'Message received' })
})

export default app
