/**
 * Node.js 适配版本的入口文件
 * 完全兼容 Cloudflare Workers 版本，但使用 Node.js 运行时
 */

import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from '@hono/node-server/serve-static'
import { getCookie, setCookie, deleteCookie } from 'hono/cookie'
import { join } from 'path'
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
import { ResourceDetailPage } from './pages/ResourceDetail.js'
import { VideoPodcastDetailPage } from './pages/VideoPodcastDetail.js'
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
import { ResourceBannerManagement } from './pages/admin/ResourceBannerManagement.js'
import { BannerEditor } from './pages/admin/BannerEditor.js'

// 导入 CMS API
import cmsApi from './api/cms.js'
import publishApi from './api/publish.js'
import commonContentApi from './api/common-content.js'
import uploadApi from './api/upload.js'
import ticketApi from './api/ticket.js'
import { navigation } from './api/navigation.js'
import resourceCenterApi from './api/resource-center.js'
import resourceBannerApi from './api/resource-banners.js'

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

// 定义 Bindings 类型（兼容 Cloudflare）
type Bindings = {
  // 移除 DB binding，项目已完全使用 MySQL
}

// 创建 Hono 应用
const app = new Hono<{ Bindings: Bindings }>()

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
app.route('/api/resource-center', resourceCenterApi)
app.route('/api/resource-center/banners', resourceBannerApi)

// Resource Center API - 映射到正确的路径
// 注意：API 文件中的路由是 /categories 和 /contents
// 前端调用的是 /api/admin/resource-categories 和 /api/admin/resource-contents
// 所以我们需要创建别名路由

// Serve static files
// 使用绝对路径确保文件能正确访问
app.use('/uploads/*', serveStatic({ 
  root: join(process.cwd(), 'public'),
  rewriteRequestPath: (path) => path.replace(/^\/uploads/, '/uploads')
}))
app.use('/static/*', serveStatic({ 
  root: join(process.cwd(), 'public'),
  rewriteRequestPath: (path) => path.replace(/^\/static/, '/static')
}))
app.use('/assets/*', serveStatic({ 
  root: join(process.cwd(), 'public'),
  rewriteRequestPath: (path) => path.replace(/^\/assets/, '/assets')
}))

// 注意：这里需要复制 src/index.tsx 中的所有路由
// 为了简化，我先创建主要路由，其他路由可以逐步添加

// Homepage routes
// 默认语言为 zh，首页路由 / 直接显示中文内容
app.get('/', async (c) => {
  // 默认使用简体中文
  const language: Language = 'zh'
  const currentPath = '/'
  
  const { config: navConfig, menuItems } = getNavigationData(language);
  const { config: footerConfig, sections: footerSections, privacyLinks } = getFooterConfig(language);
  
  // 获取推荐文章（已发布且推荐的内容，按浏览次数和发布时间排序，取前4条）
  let featuredContents = []
  try {
    featuredContents = await mysqlQuery<any[]>(
      `SELECT rc.id, rc.category_id, rc.title, rc.content, rc.author, 
              rc.cover_image, rc.published_at, rc.views, rc.downloads,
              rc.title_zh, rc.title_en, rc.title_jp, rc.title_hk,
              rc.content_zh, rc.content_en, rc.content_jp, rc.content_hk,
              rc.cover_image_zh, rc.cover_image_en, rc.cover_image_jp, rc.cover_image_hk,
              rcat.name as category_name, rcat.link as category_slug
       FROM resource_contents rc
       LEFT JOIN resource_categories rcat ON rc.category_id = rcat.id
       WHERE rc.status = 'published' AND rc.is_featured = 1
       ORDER BY rc.views DESC, rc.published_at DESC
       LIMIT 4`
    )
    console.log(`✅ 首页获取到 ${featuredContents.length} 条推荐文章`)
  } catch (error) {
    console.error('❌ 首页获取推荐文章失败:', error)
  }
  
  return c.html(
    <LayoutWithUnifiedNav 
      language={language} 
      currentPath={currentPath}
      navigationConfig={navConfig}
      menuItems={menuItems}
      footerConfig={footerConfig}
      footerSections={footerSections}
      privacyLinks={privacyLinks}
      featuredContents={featuredContents}
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
  app.get(`/${lang}`, async (c) => {
    const language: Language = lang
    const currentPath = `/${lang}`
    
    const { config: navConfig, menuItems } = getNavigationData(language);
    const { config: footerConfig, sections: footerSections, privacyLinks } = getFooterConfig(language);
    
    // 获取推荐文章（已发布且推荐的内容，按浏览次数和发布时间排序，取前4条）
    let featuredContents = []
    try {
      featuredContents = await mysqlQuery<any[]>(
        `SELECT rc.id, rc.category_id, rc.title, rc.content, rc.author, 
                rc.cover_image, rc.published_at, rc.views, rc.downloads,
                rc.title_zh, rc.title_en, rc.title_jp, rc.title_hk,
                rc.content_zh, rc.content_en, rc.content_jp, rc.content_hk,
                rc.cover_image_zh, rc.cover_image_en, rc.cover_image_jp, rc.cover_image_hk,
                rcat.name as category_name, rcat.link as category_slug
         FROM resource_contents rc
         LEFT JOIN resource_categories rcat ON rc.category_id = rcat.id
         WHERE rc.status = 'published' AND rc.is_featured = 1
         ORDER BY rc.views DESC, rc.published_at DESC
         LIMIT 4`
      )
      console.log(`✅ 首页(${language})获取到 ${featuredContents.length} 条推荐文章`)
    } catch (error) {
      console.error(`❌ 首页(${language})获取推荐文章失败:`, error)
    }
    
    return c.html(
      <LayoutWithUnifiedNav 
        language={language} 
        currentPath={currentPath}
        navigationConfig={navConfig}
        menuItems={menuItems}
        footerConfig={footerConfig}
        footerSections={footerSections}
        privacyLinks={privacyLinks}
        featuredContents={featuredContents}
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
app.get('/resources', async (c) => {
  const language: Language = detectLanguageFromPath(c.req.path) || 'zh'
  const currentPath = '/resources'
  
  const { config: navConfig, menuItems } = getNavigationData(language);
  const { config: footerConfig, sections: footerSections, privacyLinks } = getFooterConfig(language);
  
  // 从数据库获取栏目分类（只获取显示的栏目）
  let categories = []
  try {
    categories = await mysqlQuery<any[]>(
      `SELECT id, name, link as slug, category_template 
       FROM resource_categories 
       WHERE is_displayed = 1 
       ORDER BY sort_order ASC, id ASC`
    )
    console.log(`✅ 获取到 ${categories.length} 个栏目`)
    if (categories.length > 0) {
      console.log('栏目列表:', categories.map(c => ({ id: c.id, name: c.name, slug: c.slug })))
    } else {
      console.log('⚠️  没有找到任何栏目，检查 is_displayed = 1 条件')
      // 检查是否有未显示的栏目
      const allCategories = await mysqlQuery<any[]>(
        `SELECT COUNT(*) as count, GROUP_CONCAT(DISTINCT is_displayed) as display_statuses
         FROM resource_categories`
      )
      if (allCategories.length > 0 && allCategories[0].count > 0) {
        console.log(`   数据库中共有 ${allCategories[0].count} 个栏目，is_displayed 状态: ${allCategories[0].display_statuses}`)
      }
    }
  } catch (error) {
    console.error('获取栏目分类失败:', error)
  }
  
  // 从数据库获取已发布的Banner（最多8个）
  let banners = []
  try {
    banners = await mysqlQuery<any[]>(
      `SELECT * FROM resource_banners 
       WHERE status = 'published' 
       ORDER BY sort_order ASC, id DESC 
       LIMIT 8`
    )
    console.log(`✅ 获取到 ${banners.length} 个已发布的Banner`)
    if (banners.length > 0) {
      console.log('Banner数据:', banners.map(b => ({ id: b.id, title: b.title, type: b.banner_type })))
    }
  } catch (error) {
    console.error('❌ 获取Banner失败:', error)
  }
  
  // 获取热门推荐内容（已发布且热门的内容，按浏览次数和发布时间排序，取前3条）
  let featuredContents = []
  try {
    featuredContents = await mysqlQuery<any[]>(
      `SELECT rc.id, rc.category_id, rc.title, rc.content, rc.author, 
              rc.cover_image, rc.published_at, rc.views, rc.downloads, rc.reading_time,
              rc.title_zh, rc.title_en, rc.title_jp, rc.title_hk,
              rc.content_zh, rc.content_en, rc.content_jp, rc.content_hk,
              rc.cover_image_zh, rc.cover_image_en, rc.cover_image_jp, rc.cover_image_hk,
              rcat.name as category_name, rcat.link as category_slug
       FROM resource_contents rc
       LEFT JOIN resource_categories rcat ON rc.category_id = rcat.id
       WHERE rc.status = 'published' AND rc.is_hot = 1
       ORDER BY rc.views DESC, rc.published_at DESC
       LIMIT 3`
    )
    console.log(`✅ 获取到 ${featuredContents.length} 条热门推荐内容（is_hot=1）`)
  } catch (error) {
    console.error('❌ 获取热门推荐失败:', error)
  }
  
  // 获取各个栏目的内容（每个栏目取前3条已发布的内容）
  let categoryContentsMap: Record<number, any[]> = {}
  try {
    console.log(`📋 开始获取栏目内容，共有 ${categories.length} 个栏目`)
    for (const category of categories) {
      // 先查询所有状态的内容用于调试
      const allContentsCheck = await mysqlQuery<any[]>(
        `SELECT COUNT(*) as count, GROUP_CONCAT(DISTINCT status) as statuses, GROUP_CONCAT(id) as ids
         FROM resource_contents 
         WHERE category_id = ?`,
        [category.id]
      )
      if (allContentsCheck.length > 0 && allContentsCheck[0].count > 0) {
        console.log(`  栏目 "${category.name}" (ID: ${category.id}): 共有 ${allContentsCheck[0].count} 条内容，状态: ${allContentsCheck[0].statuses}, IDs: ${allContentsCheck[0].ids}`)
      }
      
      const contents = await mysqlQuery<any[]>(
        `SELECT rc.id, rc.category_id, rc.title, rc.content, rc.author,
                rc.cover_image, rc.published_at, rc.views, rc.downloads, rc.reading_time,
                rc.title_zh, rc.title_en, rc.title_jp, rc.title_hk,
                rc.content_zh, rc.content_en, rc.content_jp, rc.content_hk,
                rc.cover_image_zh, rc.cover_image_en, rc.cover_image_jp, rc.cover_image_hk,
                rcat.name as category_name, rcat.link as category_slug, rc.status
         FROM resource_contents rc
         LEFT JOIN resource_categories rcat ON rc.category_id = rcat.id
         WHERE rc.category_id = ? AND rc.status = 'published'
         ORDER BY rc.sort_order ASC, rc.published_at DESC
         LIMIT 3`,
        [category.id]
      )
      console.log(`  栏目 "${category.name}" (ID: ${category.id}): 查询到 ${contents.length} 条已发布内容`)
      if (contents.length > 0) {
        categoryContentsMap[category.id] = contents
        console.log(`    ✅ 已添加到 categoryContentsMap`)
      } else {
        console.log(`    ⚠️  该栏目没有已发布的内容，无法显示`)
      }
    }
    console.log(`✅ 获取到 ${Object.keys(categoryContentsMap).length} 个栏目的内容数据`)
    console.log(`📊 categoryContentsMap 详情:`, Object.keys(categoryContentsMap).map(id => ({
      categoryId: id,
      categoryName: categories.find(c => c.id === parseInt(id))?.name,
      contentCount: categoryContentsMap[parseInt(id)].length
    })))
  } catch (error) {
    console.error('❌ 获取栏目内容失败:', error)
  }
  
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
      <ResourcesPage 
        language={language} 
        categories={categories} 
        banners={banners}
        featuredContents={featuredContents}
        categoryContentsMap={categoryContentsMap}
      />
    </LayoutWithUnifiedNav>
  )
})

// 动态栏目列表页路由（中文）
app.get('/resources/:slug', async (c) => {
  const slug = c.req.param('slug')
  const language: Language = 'zh'
  const currentPath = `/resources/${slug}`
  const page = parseInt(c.req.query('page') || '1')
  
  const { config: navConfig, menuItems } = getNavigationData(language);
  const { config: footerConfig, sections: footerSections, privacyLinks } = getFooterConfig(language);
  
  // 查询栏目信息
  let category = null
  try {
    const result = await mysqlQuery<any[]>(
      `SELECT id, name, link as slug, description, cover_image, category_template 
       FROM resource_categories 
       WHERE link = ? AND is_displayed = 1 
       LIMIT 1`,
      [slug]
    )
    category = result[0] || null
  } catch (error) {
    console.error('获取栏目信息失败:', error)
  }
  
  // 如果栏目不存在，返回 404
  if (!category) {
    return c.notFound()
  }
  
  // 获取该栏目下的内容列表（全部数据，组件内部分页）
  let contents = []
  try {
    contents = await mysqlQuery<any[]>(
      `SELECT id, title, content, author, cover_image, reading_time,
              video_file, attachment_file, attachment_name, 
              published_at, views, downloads,
              title_zh, title_en, title_jp, title_hk,
              content_zh, content_en, content_jp, content_hk,
              cover_image_zh, cover_image_en, cover_image_jp, cover_image_hk
       FROM resource_contents 
       WHERE category_id = ? AND status = 'published' 
       ORDER BY sort_order ASC, published_at DESC`,
      [category.id]
    )
  } catch (error) {
    console.error('获取栏目内容失败:', error)
  }
  
  // 获取所有栏目用于导航
  let categories = []
  try {
    categories = await mysqlQuery<any[]>(
      `SELECT id, name, link as slug, category_template 
       FROM resource_categories 
       WHERE is_displayed = 1 
       ORDER BY sort_order ASC, id ASC`
    )
  } catch (error) {
    console.error('获取栏目分类失败:', error)
  }
  
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
      <ResourceListPage 
        language={language} 
        resourceType={slug}
        page={page}
        category={category}
        contents={contents}
        categories={categories}
      />
    </LayoutWithUnifiedNav>
  )
})

app.get('/:lang/resources', async (c) => {
  const lang = c.req.param('lang') as Language
  const language: Language = (lang && ['zh', 'en', 'jp', 'hk'].includes(lang)) ? lang : detectLanguageFromPath(c.req.path) || 'zh'
  const currentPath = `/${language}/resources`
  
  const { config: navConfig, menuItems } = getNavigationData(language);
  const { config: footerConfig, sections: footerSections, privacyLinks } = getFooterConfig(language);
  
  // 从数据库获取栏目分类（只获取显示的栏目）
  let categories = []
  try {
    categories = await mysqlQuery<any[]>(
      `SELECT id, name, link as slug, category_template 
       FROM resource_categories 
       WHERE is_displayed = 1 
       ORDER BY sort_order ASC, id ASC`
    )
    console.log(`✅ 获取到 ${categories.length} 个栏目 (${language})`)
    if (categories.length > 0) {
      console.log('栏目列表:', categories.map(c => ({ id: c.id, name: c.name, slug: c.slug })))
    } else {
      console.log('⚠️  没有找到任何栏目，检查 is_displayed = 1 条件')
      // 检查是否有未显示的栏目
      const allCategories = await mysqlQuery<any[]>(
        `SELECT COUNT(*) as count, GROUP_CONCAT(DISTINCT is_displayed) as display_statuses
         FROM resource_categories`
      )
      if (allCategories.length > 0 && allCategories[0].count > 0) {
        console.log(`   数据库中共有 ${allCategories[0].count} 个栏目，is_displayed 状态: ${allCategories[0].display_statuses}`)
      }
    }
  } catch (error) {
    console.error('获取栏目分类失败:', error)
  }
  
  // 从数据库获取已发布的Banner（最多8个）
  let banners = []
  try {
    banners = await mysqlQuery<any[]>(
      `SELECT * FROM resource_banners 
       WHERE status = 'published' 
       ORDER BY sort_order ASC, id DESC 
       LIMIT 8`
    )
    console.log(`✅ 获取到 ${banners.length} 个已发布的Banner (${language})`)
    if (banners.length > 0) {
      console.log('Banner数据:', banners.map(b => ({ id: b.id, title: b.title, type: b.banner_type })))
    }
  } catch (error) {
    console.error('❌ 获取Banner失败:', error)
  }
  
  // 获取热门推荐内容（已发布且热门的内容，按浏览次数和发布时间排序，取前3条）
  let featuredContents = []
  try {
    featuredContents = await mysqlQuery<any[]>(
      `SELECT rc.id, rc.category_id, rc.title, rc.content, rc.author, 
              rc.cover_image, rc.published_at, rc.views, rc.downloads, rc.reading_time,
              rc.title_zh, rc.title_en, rc.title_jp, rc.title_hk,
              rc.content_zh, rc.content_en, rc.content_jp, rc.content_hk,
              rc.cover_image_zh, rc.cover_image_en, rc.cover_image_jp, rc.cover_image_hk,
              rcat.name as category_name, rcat.link as category_slug
       FROM resource_contents rc
       LEFT JOIN resource_categories rcat ON rc.category_id = rcat.id
       WHERE rc.status = 'published' AND rc.is_hot = 1
       ORDER BY rc.views DESC, rc.published_at DESC
       LIMIT 3`
    )
    console.log(`✅ 获取到 ${featuredContents.length} 条热门推荐内容 (${language}, is_hot=1)`)
  } catch (error) {
    console.error('❌ 获取热门推荐失败:', error)
  }
  
  // 获取各个栏目的内容（每个栏目取前3条已发布的内容）
  let categoryContentsMap: Record<number, any[]> = {}
  try {
    console.log(`📋 开始获取栏目内容 (${language})，共有 ${categories.length} 个栏目`)
    for (const category of categories) {
      // 先查询所有状态的内容用于调试
      const allContentsCheck = await mysqlQuery<any[]>(
        `SELECT COUNT(*) as count, GROUP_CONCAT(DISTINCT status) as statuses, GROUP_CONCAT(id) as ids
         FROM resource_contents 
         WHERE category_id = ?`,
        [category.id]
      )
      if (allContentsCheck.length > 0 && allContentsCheck[0].count > 0) {
        console.log(`  栏目 "${category.name}" (ID: ${category.id}): 共有 ${allContentsCheck[0].count} 条内容，状态: ${allContentsCheck[0].statuses}, IDs: ${allContentsCheck[0].ids}`)
      }
      
      const contents = await mysqlQuery<any[]>(
        `SELECT rc.id, rc.category_id, rc.title, rc.content, rc.author,
                rc.cover_image, rc.published_at, rc.views, rc.downloads, rc.reading_time,
                rc.title_zh, rc.title_en, rc.title_jp, rc.title_hk,
                rc.content_zh, rc.content_en, rc.content_jp, rc.content_hk,
                rc.cover_image_zh, rc.cover_image_en, rc.cover_image_jp, rc.cover_image_hk,
                rcat.name as category_name, rcat.link as category_slug, rc.status
         FROM resource_contents rc
         LEFT JOIN resource_categories rcat ON rc.category_id = rcat.id
         WHERE rc.category_id = ? AND rc.status = 'published'
         ORDER BY rc.sort_order ASC, rc.published_at DESC
         LIMIT 3`,
        [category.id]
      )
      console.log(`  栏目 "${category.name}" (ID: ${category.id}): 查询到 ${contents.length} 条已发布内容`)
      if (contents.length > 0) {
        categoryContentsMap[category.id] = contents
        console.log(`    ✅ 已添加到 categoryContentsMap`)
      } else {
        console.log(`    ⚠️  该栏目没有已发布的内容，无法显示`)
      }
    }
    console.log(`✅ 获取到 ${Object.keys(categoryContentsMap).length} 个栏目的内容数据 (${language})`)
    console.log(`📊 categoryContentsMap 详情:`, Object.keys(categoryContentsMap).map(id => ({
      categoryId: id,
      categoryName: categories.find(c => c.id === parseInt(id))?.name,
      contentCount: categoryContentsMap[parseInt(id)].length
    })))
  } catch (error) {
    console.error('❌ 获取栏目内容失败:', error)
  }
  
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
      <ResourcesPage 
        language={language} 
        categories={categories} 
        banners={banners}
        featuredContents={featuredContents}
        categoryContentsMap={categoryContentsMap}
      />
    </LayoutWithUnifiedNav>
  )
})

// 动态栏目列表页路由（多语言）
app.get('/:lang/resources/:slug', async (c) => {
  const lang = c.req.param('lang') as Language
  const slug = c.req.param('slug')
  const language: Language = (lang && ['zh', 'en', 'jp', 'hk'].includes(lang)) ? lang : 'zh'
  const currentPath = `/${language}/resources/${slug}`
  const page = parseInt(c.req.query('page') || '1')
  
  const { config: navConfig, menuItems } = getNavigationData(language);
  const { config: footerConfig, sections: footerSections, privacyLinks } = getFooterConfig(language);
  
  // 查询栏目信息
  let category = null
  try {
    const result = await mysqlQuery<any[]>(
      `SELECT id, name, link as slug, description, cover_image, category_template 
       FROM resource_categories 
       WHERE link = ? AND is_displayed = 1 
       LIMIT 1`,
      [slug]
    )
    category = result[0] || null
  } catch (error) {
    console.error('获取栏目信息失败:', error)
  }
  
  // 如果栏目不存在，返回 404
  if (!category) {
    return c.notFound()
  }
  
  // 获取该栏目下的内容列表（全部数据，组件内部分页）
  let contents = []
  try {
    contents = await mysqlQuery<any[]>(
      `SELECT id, title, content, author, cover_image, reading_time,
              video_file, attachment_file, attachment_name, 
              published_at, views, downloads,
              title_zh, title_en, title_jp, title_hk,
              content_zh, content_en, content_jp, content_hk,
              cover_image_zh, cover_image_en, cover_image_jp, cover_image_hk
       FROM resource_contents 
       WHERE category_id = ? AND status = 'published' 
       ORDER BY sort_order ASC, published_at DESC`,
      [category.id]
    )
  } catch (error) {
    console.error('获取栏目内容失败:', error)
  }
  
  // 获取所有栏目用于导航
  let categories = []
  try {
    categories = await mysqlQuery<any[]>(
      `SELECT id, name, link as slug, category_template 
       FROM resource_categories 
       WHERE is_displayed = 1 
       ORDER BY sort_order ASC, id ASC`
    )
  } catch (error) {
    console.error('获取栏目分类失败:', error)
  }
  
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
      <ResourceListPage 
        language={language} 
        resourceType={slug}
        page={page}
        category={category}
        contents={contents}
        categories={categories}
      />
    </LayoutWithUnifiedNav>
  )
})

// 内容详情页路由（中文）
app.get('/resources/:slug/:id', async (c) => {
  const slug = c.req.param('slug')
  const id = parseInt(c.req.param('id'))
  const language: Language = 'zh'
  const currentPath = `/resources/${slug}/${id}`
  
  const { config: navConfig, menuItems } = getNavigationData(language);
  const { config: footerConfig, sections: footerSections, privacyLinks } = getFooterConfig(language);
  
  // 查询内容详情
  let content = null
  let category = null
  
  try {
    // 获取内容详情
    const contentResult = await mysqlQuery<any[]>(
      `SELECT rc.*, rcat.name as category_name, rcat.link as category_slug 
       FROM resource_contents rc
       LEFT JOIN resource_categories rcat ON rc.category_id = rcat.id
       WHERE rc.id = ? AND rc.status = 'published'
       LIMIT 1`,
      [id]
    )
    
    if (contentResult.length === 0) {
      return c.notFound()
    }
    
    content = contentResult[0]
    
    // 验证 slug 是否匹配
    if (content.category_slug !== slug) {
      return c.notFound()
    }
    
    // 增加访问量
    await mysqlQuery(
      `UPDATE resource_contents SET views = views + 1 WHERE id = ?`,
      [id]
    )
    
    // 获取栏目信息
    const categoryResult = await mysqlQuery<any[]>(
      `SELECT id, name, link as slug, description, category_template 
       FROM resource_categories 
       WHERE link = ? AND is_displayed = 1 
       LIMIT 1`,
      [slug]
    )
    category = categoryResult[0] || null
    
  } catch (error) {
    console.error('获取内容详情失败:', error)
    return c.notFound()
  }
  
  // 获取所有栏目用于导航
  let categories = []
  try {
    categories = await mysqlQuery<any[]>(
      `SELECT id, name, link as slug, category_template 
       FROM resource_categories 
       WHERE is_displayed = 1 
       ORDER BY sort_order ASC, id ASC`
    )
  } catch (error) {
    console.error('获取栏目分类失败:', error)
  }
  
  // 获取推荐阅读（同一栏目下的其他文章，排除当前文章，按阅读量/发布时间排序）
  let recommendedContents = []
  if (content && category) {
    try {
      recommendedContents = await mysqlQuery<any[]>(
        `SELECT rc.id, rc.title, rc.cover_image, rc.published_at, rc.reading_time, 
                rc.author, rc.views,
                rc.title_zh, rc.title_en, rc.title_jp, rc.title_hk,
                rcat.link as category_slug
         FROM resource_contents rc
         LEFT JOIN resource_categories rcat ON rc.category_id = rcat.id
         WHERE rc.category_id = ? AND rc.id != ? AND rc.status = 'published'
         ORDER BY rc.views DESC, rc.published_at DESC
         LIMIT 3`,
        [category.id, id]
      )
      console.log(`✅ 获取到 ${recommendedContents.length} 条推荐阅读内容`)
    } catch (error) {
      console.error('❌ 获取推荐阅读失败:', error)
    }
  }
  
  // 根据 category_template 决定使用哪个页面组件
  const isVideoTemplate = category?.category_template === 'list_video'
  
  // 构建 SEO 数据
  const protocol = c.req.header('x-forwarded-proto') || 'http'
  const host = c.req.header('host') || 'localhost'
  const baseUrl = `${protocol}://${host}`
  const fullUrl = `${baseUrl}${currentPath}`
  const seoTitle = content.meta_title || content.title
  const seoDescription = content.meta_description || content.content?.replace(/<[^>]*>/g, '').substring(0, 160).trim() || ''
  const seoKeywords = content.meta_keywords || ''
  const ogImage = content.cover_image ? (content.cover_image.startsWith('http') ? content.cover_image : `${baseUrl}${content.cover_image}`) : undefined
  
  return c.html(
    <LayoutWithUnifiedNav
      language={language}
      currentPath={currentPath}
      title={content.title}
      description={content.content?.replace(/<[^>]*>/g, '').substring(0, 200).trim() || ''}
      seoTitle={seoTitle}
      seoDescription={seoDescription}
      seoKeywords={seoKeywords}
      ogImage={ogImage}
      ogUrl={fullUrl}
      navigationConfig={navConfig}
      menuItems={menuItems}
      footerConfig={footerConfig}
      footerSections={footerSections}
      privacyLinks={privacyLinks}
    >
      {isVideoTemplate ? (
        <VideoPodcastDetailPage 
          language={language}
          content={content}
          category={category}
          categories={categories}
        />
      ) : (
        <ResourceDetailPage 
          language={language}
          content={content}
          category={category}
          categories={categories}
          recommendedContents={recommendedContents}
        />
      )}
    </LayoutWithUnifiedNav>
  )
})

// 内容详情页路由（多语言）
app.get('/:lang/resources/:slug/:id', async (c) => {
  const lang = c.req.param('lang') as Language
  const slug = c.req.param('slug')
  const id = parseInt(c.req.param('id'))
  const language: Language = (lang && ['zh', 'en', 'jp', 'hk'].includes(lang)) ? lang : 'zh'
  const currentPath = `/${language}/resources/${slug}/${id}`
  
  const { config: navConfig, menuItems } = getNavigationData(language);
  const { config: footerConfig, sections: footerSections, privacyLinks } = getFooterConfig(language);
  
  // 查询内容详情
  let content = null
  let category = null
  
  try {
    // 获取内容详情
    const contentResult = await mysqlQuery<any[]>(
      `SELECT rc.*, rcat.name as category_name, rcat.link as category_slug 
       FROM resource_contents rc
       LEFT JOIN resource_categories rcat ON rc.category_id = rcat.id
       WHERE rc.id = ? AND rc.status = 'published'
       LIMIT 1`,
      [id]
    )
    
    if (contentResult.length === 0) {
      return c.notFound()
    }
    
    content = contentResult[0]
    
    // 验证 slug 是否匹配
    if (content.category_slug !== slug) {
      return c.notFound()
    }
    
    // 增加访问量
    await mysqlQuery(
      `UPDATE resource_contents SET views = views + 1 WHERE id = ?`,
      [id]
    )
    
    // 获取栏目信息
    const categoryResult = await mysqlQuery<any[]>(
      `SELECT id, name, link as slug, description, category_template 
       FROM resource_categories 
       WHERE link = ? AND is_displayed = 1 
       LIMIT 1`,
      [slug]
    )
    category = categoryResult[0] || null
    
  } catch (error) {
    console.error('获取内容详情失败:', error)
    return c.notFound()
  }
  
  // 获取所有栏目用于导航
  let categories = []
  try {
    categories = await mysqlQuery<any[]>(
      `SELECT id, name, link as slug, category_template 
       FROM resource_categories 
       WHERE is_displayed = 1 
       ORDER BY sort_order ASC, id ASC`
    )
  } catch (error) {
    console.error('获取栏目分类失败:', error)
  }
  
  // 获取推荐阅读（同一栏目下的其他文章，排除当前文章，按阅读量/发布时间排序）
  let recommendedContents = []
  if (content && category) {
    try {
      recommendedContents = await mysqlQuery<any[]>(
        `SELECT rc.id, rc.title, rc.cover_image, rc.published_at, rc.reading_time, 
                rc.author, rc.views,
                rc.title_zh, rc.title_en, rc.title_jp, rc.title_hk,
                rcat.link as category_slug
         FROM resource_contents rc
         LEFT JOIN resource_categories rcat ON rc.category_id = rcat.id
         WHERE rc.category_id = ? AND rc.id != ? AND rc.status = 'published'
         ORDER BY rc.views DESC, rc.published_at DESC
         LIMIT 3`,
        [category.id, id]
      )
      console.log(`✅ 获取到 ${recommendedContents.length} 条推荐阅读内容 (${language})`)
    } catch (error) {
      console.error(`❌ 获取推荐阅读失败 (${language}):`, error)
    }
  }
  
  // 根据 category_template 决定使用哪个页面组件
  const isVideoTemplate = category?.category_template === 'list_video'
  
  // 构建 SEO 数据
  const protocol = c.req.header('x-forwarded-proto') || 'http'
  const host = c.req.header('host') || 'localhost'
  const baseUrl = `${protocol}://${host}`
  const fullUrl = `${baseUrl}${currentPath}`
  const seoTitle = content.meta_title || content.title
  const seoDescription = content.meta_description || content.content?.replace(/<[^>]*>/g, '').substring(0, 160).trim() || ''
  const seoKeywords = content.meta_keywords || ''
  const ogImage = content.cover_image ? (content.cover_image.startsWith('http') ? content.cover_image : `${baseUrl}${content.cover_image}`) : undefined
  
  return c.html(
    <LayoutWithUnifiedNav
      language={language}
      currentPath={currentPath}
      title={content.title}
      description={content.content?.replace(/<[^>]*>/g, '').substring(0, 200).trim() || ''}
      seoTitle={seoTitle}
      seoDescription={seoDescription}
      seoKeywords={seoKeywords}
      ogImage={ogImage}
      ogUrl={fullUrl}
      navigationConfig={navConfig}
      menuItems={menuItems}
      footerConfig={footerConfig}
      footerSections={footerSections}
      privacyLinks={privacyLinks}
    >
      {isVideoTemplate ? (
        <VideoPodcastDetailPage 
          language={language}
          content={content}
          category={category}
          categories={categories}
        />
      ) : (
        <ResourceDetailPage 
          language={language}
          content={content}
          category={category}
          categories={categories}
          recommendedContents={recommendedContents}
        />
      )}
    </LayoutWithUnifiedNav>
  )
})

// Resource List routes - Blog
// 注意：/resources/blog 和 /:lang/resources/blog 路由已删除
// 这些路由现在由动态路由 /resources/:slug 和 /:lang/resources/:slug 处理
// 这样可以自动获取数据库数据并支持分页

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
    
    // 存储管理员邮箱用于自动填充作者
    setSecureCookie(c, 'admin_email', email)
    
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
    // 排序：sort_order 升序（数字越小越靠前），相同时按 created_at 降序（最新的在前）
    const categories = await mysqlQuery<any[]>(
      `SELECT id, sort_order, name, link as slug, 
              description,
              name_zh, name_en, name_jp, name_hk,
              description_zh, description_en, description_jp, description_hk,
              category_template as list_template, 
              page_template as detail_template, 
              is_displayed as is_visible, created_at, updated_at 
       FROM resource_categories 
       ORDER BY sort_order ASC, created_at DESC
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
              description,
              name_zh, name_en, name_jp, name_hk,
              description_zh, description_en, description_jp, description_hk,
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
  try {
    const page = parseInt(c.req.query('page') || '1')
    const pageSize = 10
    const offset = (page - 1) * pageSize
    
    const category = c.req.query('category')
    const status = c.req.query('status')
    const search = c.req.query('search')
    const is_featured = c.req.query('is_featured') // 推荐筛选
    const is_hot = c.req.query('is_hot') // 热门筛选
    
    // 构建WHERE条件
    let whereConditions = []
    let queryParams: any[] = []
    
    if (category) {
      whereConditions.push('rc.category_id = ?')
      queryParams.push(parseInt(category))
    }
    if (status) {
      whereConditions.push('rc.status = ?')
      queryParams.push(status)
    }
    if (is_featured !== undefined && is_featured !== '') {
      whereConditions.push('rc.is_featured = ?')
      queryParams.push(is_featured === 'true' || is_featured === '1' ? 1 : 0)
    }
    if (is_hot !== undefined && is_hot !== '') {
      whereConditions.push('rc.is_hot = ?')
      queryParams.push(is_hot === 'true' || is_hot === '1' ? 1 : 0)
    }
    if (search) {
      whereConditions.push('(rc.title LIKE ? OR rc.author LIKE ?)')
      const searchPattern = `%${search}%`
      queryParams.push(searchPattern, searchPattern)
    }
    
    const whereClause = whereConditions.length > 0 
      ? 'WHERE ' + whereConditions.join(' AND ')
      : ''
    
    // 查询总数
    const [countResult] = await mysqlQuery<any[]>(
      `SELECT COUNT(*) as total FROM resource_contents rc ${whereClause}`,
      queryParams
    )
    const total = countResult.total || 0
    const totalPages = Math.ceil(total / pageSize)
    
    // 查询内容列表
    const contents = await mysqlQuery<any[]>(
      `SELECT rc.id, rc.category_id, rcat.name as category_name, 
              rc.title, rc.cover_image, rc.author, 
              rc.published_at, rc.views, rc.status, rc.is_featured, rc.is_hot
       FROM resource_contents rc
       LEFT JOIN resource_categories rcat ON rc.category_id = rcat.id
       ${whereClause}
       ORDER BY rc.sort_order ASC, rc.published_at DESC
       LIMIT ${offset}, ${pageSize}`,
      queryParams
    )
    
    // 查询所有栏目用于筛选
    const categories = await mysqlQuery<any[]>(
      'SELECT id, name FROM resource_categories WHERE is_displayed = 1 ORDER BY sort_order ASC'
    )
    
    return c.html(
      <AdminLayout title="内容列表管理" currentPath="/ticloudadmin/resource-contents">
        <ResourceContentManagement 
          contents={contents}
          categories={categories}
          currentPage={page}
          totalPages={totalPages}
          total={total}
        />
      </AdminLayout>
    )
  } catch (error: any) {
    console.error('获取内容列表失败:', error)
    return c.html(
      <AdminLayout title="内容列表管理" currentPath="/ticloudadmin/resource-contents">
        <div class="p-4 text-red-600">加载失败：{error.message}</div>
      </AdminLayout>
    )
  }
})

// 新增内容页面
app.get('/ticloudadmin/resource-contents/new', requireAuth(), async (c) => {
  try {
    const categories = await mysqlQuery<any[]>(
      'SELECT id, name, category_template FROM resource_categories WHERE is_displayed = 1 ORDER BY sort_order ASC'
    )
    
    // 获取当前登录的管理员邮箱作为默认作者
    const defaultAuthor = getCookie(c, 'admin_email') || ''
    
    return c.html(
      <AdminLayout title="发布新内容" currentPath="/ticloudadmin/resource-contents">
        <ContentEditor mode="create" categories={categories} defaultAuthor={defaultAuthor} />
      </AdminLayout>
    )
  } catch (error: any) {
    console.error('加载新增页失败:', error)
    return c.text('加载失败', 500)
  }
})

// 编辑内容页面
app.get('/ticloudadmin/resource-contents/edit/:id', requireAuth(), async (c) => {
  try {
    const id = c.req.param('id')
    
    const [content] = await mysqlQuery<any[]>(
      `SELECT * FROM resource_contents WHERE id = ?`,
      [id]
    )
    
    if (!content) {
      return c.text('内容不存在', 404)
    }
    
    const categories = await mysqlQuery<any[]>(
      'SELECT id, name, category_template FROM resource_categories WHERE is_displayed = 1 ORDER BY sort_order ASC'
    )
    
    return c.html(
      <AdminLayout title="编辑内容" currentPath="/ticloudadmin/resource-contents">
        <ContentEditor mode="edit" content={content} categories={categories} defaultAuthor="" />
      </AdminLayout>
    )
  } catch (error: any) {
    console.error('加载编辑页失败:', error)
    return c.text('加载失败', 500)
  }
})

// ==================== Resource Banner Routes ====================

// Banner列表页面
app.get('/ticloudadmin/resource-banners', requireAuth(), async (c) => {
  try {
    const page = parseInt(c.req.query('page') || '1')
    const pageSize = 20
    const search = c.req.query('search') || ''
    const offset = (page - 1) * pageSize
    
    let whereClauses = []
    let queryParams: any[] = []
    
    if (search) {
      whereClauses.push('(title LIKE ? OR text_title LIKE ?)')
      queryParams.push(`%${search}%`, `%${search}%`)
    }
    
    const whereSQL = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : ''
    
    // 查询总数
    const [countResult] = await mysqlQuery<any[]>(
      `SELECT COUNT(*) as total FROM resource_banners ${whereSQL}`,
      queryParams
    )
    const total = countResult.total || 0
    const totalPages = Math.ceil(total / pageSize)
    
    // 查询列表
    const banners = await mysqlQuery<any[]>(
      `SELECT * FROM resource_banners 
       ${whereSQL}
       ORDER BY sort_order ASC, id DESC
       LIMIT ${offset}, ${pageSize}`,
      queryParams
    )
    
    return c.html(
      <AdminLayout title="Banner管理" currentPath="/ticloudadmin/resource-banners">
        <ResourceBannerManagement 
          banners={banners}
          currentPage={page}
          totalPages={totalPages}
          total={total}
        />
      </AdminLayout>
    )
  } catch (error) {
    console.error('获取Banner列表失败:', error)
    return c.html(
      <AdminLayout title="Banner管理" currentPath="/ticloudadmin/resource-banners">
        <ResourceBannerManagement 
          banners={[]}
          currentPage={1}
          totalPages={1}
          total={0}
        />
      </AdminLayout>
    )
  }
})

// 创建Banner页面
app.get('/ticloudadmin/resource-banners/new', requireAuth(), (c) => {
  return c.html(
    <AdminLayout title="添加新Banner" currentPath="/ticloudadmin/resource-banners">
      <BannerEditor mode="create" />
    </AdminLayout>
  )
})

// 编辑Banner页面
app.get('/ticloudadmin/resource-banners/edit/:id', requireAuth(), async (c) => {
  try {
    const id = c.req.param('id')
    
    const [banner] = await mysqlQuery<any[]>(
      `SELECT * FROM resource_banners WHERE id = ?`,
      [id]
    )
    
    if (!banner) {
      return c.text('Banner不存在', 404)
    }
    
    return c.html(
      <AdminLayout title="编辑Banner" currentPath="/ticloudadmin/resource-banners">
        <BannerEditor mode="edit" banner={banner} />
      </AdminLayout>
    )
  } catch (error: any) {
    console.error('加载编辑页失败:', error)
    return c.text('加载失败', 500)
  }
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

// 文件上传接口（视频和附件）
app.post('/api/admin/upload/file', requireAuth(), async (c) => {
  try {
    const formData = await c.req.formData()
    const file = formData.get('file') as File
    const category = (formData.get('category') as string) || 'attachments'

    if (!file) {
      return c.json({
        success: false,
        error: '没有接收到文件'
      }, 400)
    }

    // 验证 category 参数
    const validCategories = ['videos', 'attachments']
    if (!validCategories.includes(category)) {
      return c.json({
        success: false,
        error: '无效的分类参数'
      }, 400)
    }

    // 验证文件大小
    const maxSize = category === 'videos' ? 100 * 1024 * 1024 : 50 * 1024 * 1024 // 视频100MB，附件50MB
    if (file.size > maxSize) {
      return c.json({
        success: false,
        error: `文件大小不能超过 ${maxSize / 1024 / 1024}MB`
      }, 400)
    }

    // 验证文件类型
    if (category === 'videos') {
      const allowedTypes = ['video/mp4', 'video/avi', 'video/quicktime', 'video/x-ms-wmv']
      if (!allowedTypes.includes(file.type)) {
        return c.json({
          success: false,
          error: '只支持 MP4、AVI、MOV、WMV 格式的视频'
        }, 400)
      }
    } else if (category === 'attachments') {
      const allowedExts = ['.xls', '.xlsx', '.doc', '.docx', '.pdf', '.zip', '.rar', '.ppt', '.pptx']
      const fileName = file.name.toLowerCase()
      const hasAllowedExt = allowedExts.some(ext => fileName.endsWith(ext))
      if (!hasAllowedExt) {
        return c.json({
          success: false,
          error: '只支持 XLS/XLSX/DOC/DOCX/PDF/ZIP/RAR/PPT/PPTX 格式的文件'
        }, 400)
      }
    }

    // 使用与图片上传相同的逻辑保存文件
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
    console.error('❌ 文件上传失败:', error)
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
    // 排序：sort_order 升序（数字越小越靠前），相同时按 created_at 降序（最新的在前）
    const categories = await mysqlQuery<any[]>(
      `SELECT id, sort_order, name, link as slug, 
              description,
              name_zh, name_en, name_jp, name_hk,
              description_zh, description_en, description_jp, description_hk,
              category_template as list_template, 
              page_template as detail_template, 
              is_displayed as is_visible, created_at, updated_at 
       FROM resource_categories 
       ORDER BY sort_order ASC, created_at DESC`
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
    const data = await c.req.json()
    console.log('📥 [POST /api/admin/resource-categories] 收到数据:', JSON.stringify(data).substring(0, 500) + '...');
    
    const { 
      sort_order, 
      name, 
      slug, 
      description,
      list_template, 
      detail_template, 
      is_visible,
      // 多语言字段
      name_zh, name_en, name_jp, name_hk,
      description_zh, description_en, description_jp, description_hk
    } = data
    
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
       (sort_order, name, link, description,
        name_zh, name_en, name_jp, name_hk,
        description_zh, description_en, description_jp, description_hk,
        category_template, page_template, is_displayed) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        sort_order || 0, 
        name || '', 
        slug, 
        description || null,
        // 多语言字段
        name_zh || null, name_en || null, name_jp || null, name_hk || null,
        description_zh || null, description_en || null, description_jp || null, description_hk || null,
        list_template, 
        detail_template, 
        is_visible !== false
      ]
    )
    
    console.log('✅ 创建栏目成功，ID:', result.insertId);
    
    return c.json({ 
      success: true, 
      data: { 
        id: result.insertId,
        sort_order,
        name,
        slug,
        description,
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
              description,
              name_zh, name_en, name_jp, name_hk,
              description_zh, description_en, description_jp, description_hk,
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
    console.log(`📥 [PUT /api/admin/resource-categories/${id}] 收到数据:`, JSON.stringify(body).substring(0, 500) + '...');
    
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
    const list_template = body.list_template !== undefined ? body.list_template : currentCategory.category_template
    const detail_template = body.detail_template !== undefined ? body.detail_template : currentCategory.page_template
    const is_visible = body.is_visible !== undefined ? body.is_visible : currentCategory.is_displayed
    
    // 多语言字段
    const name_zh = body.name_zh !== undefined ? body.name_zh : currentCategory.name_zh
    const name_en = body.name_en !== undefined ? body.name_en : currentCategory.name_en
    const name_jp = body.name_jp !== undefined ? body.name_jp : currentCategory.name_jp
    const name_hk = body.name_hk !== undefined ? body.name_hk : currentCategory.name_hk
    const description_zh = body.description_zh !== undefined ? body.description_zh : currentCategory.description_zh
    const description_en = body.description_en !== undefined ? body.description_en : currentCategory.description_en
    const description_jp = body.description_jp !== undefined ? body.description_jp : currentCategory.description_jp
    const description_hk = body.description_hk !== undefined ? body.description_hk : currentCategory.description_hk
    
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
    
    // 更新栏目（包含多语言字段）
    await mysqlQuery(
      `UPDATE resource_categories 
       SET sort_order = ?, name = ?, link = ?, description = ?,
           name_zh = ?, name_en = ?, name_jp = ?, name_hk = ?,
           description_zh = ?, description_en = ?, description_jp = ?, description_hk = ?,
           category_template = ?, page_template = ?, is_displayed = ?
       WHERE id = ?`,
      [
        sort_order, 
        name || '', 
        slug, 
        description || null,
        // 多语言字段
        name_zh || null, name_en || null, name_jp || null, name_hk || null,
        description_zh || null, description_en || null, description_jp || null, description_hk || null,
        list_template, 
        detail_template, 
        is_visible, 
        id
      ]
    )
    
    console.log('✅ 更新栏目成功，ID:', id);
    
    return c.json({ 
      success: true, 
      message: '栏目更新成功' 
    })
  } catch (error: any) {
    console.error('❌ 更新栏目失败:', error);
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
    
    if (!action || !ids || !Array.isArray(ids) || ids.length === 0) {
      return c.json({ 
        success: false, 
        error: '缺少必要参数' 
      }, 400)
    }
    
    const placeholders = ids.map(() => '?').join(',')
    let affectedCount = 0
    
    switch (action) {
      case 'delete':
        // 检查每个栏目是否有关联内容
        const [contentCountResult] = await mysqlQuery<any[]>(
          `SELECT COUNT(*) as count FROM resource_contents WHERE category_id IN (${placeholders})`,
          ids
        )
        
        if (contentCountResult && contentCountResult.count > 0) {
          return c.json({ 
            success: false, 
            error: `选中的栏目中有 ${contentCountResult.count} 个关联内容，请先删除这些内容后再删除栏目` 
          }, 400)
        }
        
        // 获取所有要删除栏目的封面图片
        const categories = await mysqlQuery<any[]>(
          `SELECT cover_image FROM resource_categories WHERE id IN (${placeholders})`,
          ids
        )
        
        // 删除栏目
        const deleteResult = await mysqlQuery(
          `DELETE FROM resource_categories WHERE id IN (${placeholders})`,
          ids
        )
        
        affectedCount = (deleteResult as any).affectedRows || 0
        
        // 删除关联的封面图片
        for (const category of categories) {
          if (category?.cover_image) {
            await deleteUploadedImage(category.cover_image)
          }
        }
        
        return c.json({ 
          success: true,
          message: `成功删除 ${affectedCount} 个栏目`
        })
        
      case 'show':
        const showResult = await mysqlQuery(
          `UPDATE resource_categories SET is_displayed = 1 WHERE id IN (${placeholders})`,
          ids
        )
        affectedCount = (showResult as any).affectedRows || 0
        
        return c.json({ 
          success: true,
          message: `成功显示 ${affectedCount} 个栏目`
        })
        
      case 'hide':
        const hideResult = await mysqlQuery(
          `UPDATE resource_categories SET is_displayed = 0 WHERE id IN (${placeholders})`,
          ids
        )
        affectedCount = (hideResult as any).affectedRows || 0
        
        return c.json({ 
          success: true,
          message: `成功隐藏 ${affectedCount} 个栏目`
        })
        
      default:
        return c.json({ 
          success: false, 
          error: '未知操作类型' 
        }, 400)
    }
  } catch (error: any) {
    console.error('批量操作失败:', error)
    return c.json({ 
      success: false, 
      error: error.message || '批量操作失败'
    }, 500)
  }
})

// 获取所有资源内容 (MySQL版本)
app.get('/api/admin/resource-contents', async (c) => {
  try {
    const category_id = c.req.query('category_id')
    const status = c.req.query('status')
    const search = c.req.query('search')
    
    let whereConditions = []
    let queryParams: any[] = []
    
    if (category_id) {
      whereConditions.push('c.category_id = ?')
      queryParams.push(category_id)
    }
    
    if (status) {
      whereConditions.push('c.status = ?')
      queryParams.push(status)
    }
    
    if (search) {
      whereConditions.push('(c.title LIKE ? OR c.author LIKE ?)')
      queryParams.push(`%${search}%`, `%${search}%`)
    }
    
    const whereClause = whereConditions.length > 0 
      ? 'WHERE ' + whereConditions.join(' AND ')
      : ''
    
    const contents = await mysqlQuery<any[]>(
      `SELECT c.*, cat.name as category_name
       FROM resource_contents c
       LEFT JOIN resource_categories cat ON c.category_id = cat.id
       ${whereClause}
       ORDER BY c.sort_order ASC, c.published_at DESC`,
      queryParams
    )
    
    return c.json({ 
      success: true, 
      data: contents
    })
  } catch (error: any) {
    console.error('获取内容列表失败:', error)
    return c.json({ 
      success: false, 
      error: error.message 
    }, 500)
  }
})

// 创建资源内容 (MySQL版本)
app.post('/api/admin/resource-contents', async (c) => {
  try {
    const data = await c.req.json()
    console.log('📥 [POST /api/admin/resource-contents] 收到数据:', JSON.stringify(data).substring(0, 500) + '...');
    
    const {
      category_id, title, slug, content, author,
      cover_image, cover_image_size, cover_image_type,
      video_file, video_size, video_type, video_description,
      attachment_file, attachment_size, attachment_type, attachment_name,
      reading_time, status, published_at, sort_order, is_featured, is_hot,
      meta_title, meta_description, meta_keywords,
      // 多语言字段
      title_zh, title_en, title_jp, title_hk,
      content_zh, content_en, content_jp, content_hk,
      cover_image_zh, cover_image_en, cover_image_jp, cover_image_hk,
      meta_title_zh, meta_title_en, meta_title_jp, meta_title_hk,
      meta_description_zh, meta_description_en, meta_description_jp, meta_description_hk,
      meta_keywords_zh, meta_keywords_en, meta_keywords_jp, meta_keywords_hk
    } = data
    
    // 验证必填字段
    if (!title || !category_id) {
      return c.json({ 
        success: false, 
        error: '标题和栏目为必填项' 
      }, 400)
    }
    
    // 处理发布时间
    const publishTime = published_at ? published_at.replace('T', ' ').slice(0, 19) : new Date().toISOString().slice(0, 19).replace('T', ' ')
    
    const result = await mysqlQuery(
      `INSERT INTO resource_contents 
       (category_id, title, slug, content, author, cover_image, cover_image_size, cover_image_type,
        video_file, video_size, video_type, video_description,
        attachment_file, attachment_size, attachment_type, attachment_name,
        reading_time, status, published_at, sort_order, is_featured, is_hot,
        meta_title, meta_description, meta_keywords,
        title_zh, title_en, title_jp, title_hk,
        content_zh, content_en, content_jp, content_hk,
        cover_image_zh, cover_image_en, cover_image_jp, cover_image_hk,
        meta_title_zh, meta_title_en, meta_title_jp, meta_title_hk,
        meta_description_zh, meta_description_en, meta_description_jp, meta_description_hk,
        meta_keywords_zh, meta_keywords_en, meta_keywords_jp, meta_keywords_hk)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        category_id, title || '', slug || null, content || '', author || null,
        cover_image || null, cover_image_size || null, cover_image_type || null,
        video_file || null, video_size || null, video_type || null, video_description || null,
        attachment_file || null, attachment_size || null, attachment_type || null, attachment_name || null,
        reading_time || null, status || 'draft', publishTime, sort_order || 0, 
        (is_featured === true || is_featured === 1 || is_featured === 'true' || is_featured === '1') ? 1 : 0,
        (is_hot === true || is_hot === 1 || is_hot === 'true' || is_hot === '1') ? 1 : 0,
        meta_title || null, meta_description || null, meta_keywords || null,
        // 多语言字段值
        title_zh || null, title_en || null, title_jp || null, title_hk || null,
        content_zh || null, content_en || null, content_jp || null, content_hk || null,
        cover_image_zh || null, cover_image_en || null, cover_image_jp || null, cover_image_hk || null,
        meta_title_zh || null, meta_title_en || null, meta_title_jp || null, meta_title_hk || null,
        meta_description_zh || null, meta_description_en || null, meta_description_jp || null, meta_description_hk || null,
        meta_keywords_zh || null, meta_keywords_en || null, meta_keywords_jp || null, meta_keywords_hk || null
      ]
    )
    
    console.log('✅ 创建成功，ID:', (result as any).insertId);
    
    return c.json({ 
      success: true, 
      message: '内容创建成功',
      data: { id: (result as any).insertId }
    })
  } catch (error: any) {
    console.error('❌ 创建内容失败:', error)
    return c.json({ 
      success: false, 
      error: error.message 
    }, 500)
  }
})

// 获取单个资源内容 (MySQL版本)
app.get('/api/admin/resource-contents/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const [content] = await mysqlQuery<any[]>(
      'SELECT * FROM resource_contents WHERE id = ?',
      [id]
    )
    
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
    console.error('获取内容详情失败:', error)
    return c.json({ 
      success: false, 
      error: error.message 
    }, 500)
  }
})

// 更新资源内容 (MySQL版本)
app.put('/api/admin/resource-contents/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const data = await c.req.json()
    console.log(`📥 [PUT /api/admin/resource-contents/${id}] 收到数据:`, JSON.stringify(data).substring(0, 500) + '...');
    
    const {
      category_id, title, slug, content, author,
      cover_image, cover_image_size, cover_image_type,
      video_file, video_size, video_type, video_description,
      attachment_file, attachment_size, attachment_type, attachment_name,
      reading_time, status, published_at, sort_order, is_featured, is_hot,
      meta_title, meta_description, meta_keywords,
      // 多语言字段
      title_zh, title_en, title_jp, title_hk,
      content_zh, content_en, content_jp, content_hk,
      cover_image_zh, cover_image_en, cover_image_jp, cover_image_hk,
      meta_title_zh, meta_title_en, meta_title_jp, meta_title_hk,
      meta_description_zh, meta_description_en, meta_description_jp, meta_description_hk,
      meta_keywords_zh, meta_keywords_en, meta_keywords_jp, meta_keywords_hk
    } = data
    
    // 获取当前内容
    const [currentContent] = await mysqlQuery<any[]>(
      'SELECT * FROM resource_contents WHERE id = ?',
      [id]
    )
    
    if (!currentContent) {
      return c.json({ 
        success: false, 
        error: '内容不存在' 
      }, 404)
    }
    
    // 处理发布时间
    const publishTime = published_at ? published_at.replace('T', ' ').slice(0, 19) : currentContent.published_at
    
    // 更新内容（包含所有多语言字段）
    await mysqlQuery(
      `UPDATE resource_contents 
       SET category_id = ?, title = ?, slug = ?, content = ?, author = ?,
           cover_image = ?, cover_image_size = ?, cover_image_type = ?,
           video_file = ?, video_size = ?, video_type = ?, video_description = ?,
           attachment_file = ?, attachment_size = ?, attachment_type = ?, attachment_name = ?,
           reading_time = ?, status = ?, published_at = ?, sort_order = ?, is_featured = ?, is_hot = ?,
           meta_title = ?, meta_description = ?, meta_keywords = ?,
           title_zh = ?, title_en = ?, title_jp = ?, title_hk = ?,
           content_zh = ?, content_en = ?, content_jp = ?, content_hk = ?,
           cover_image_zh = ?, cover_image_en = ?, cover_image_jp = ?, cover_image_hk = ?,
           meta_title_zh = ?, meta_title_en = ?, meta_title_jp = ?, meta_title_hk = ?,
           meta_description_zh = ?, meta_description_en = ?, meta_description_jp = ?, meta_description_hk = ?,
           meta_keywords_zh = ?, meta_keywords_en = ?, meta_keywords_jp = ?, meta_keywords_hk = ?
       WHERE id = ?`,
      [
        category_id, title || '', slug || null, content || '', author || null,
        cover_image || null, cover_image_size || null, cover_image_type || null,
        video_file || null, video_size || null, video_type || null, video_description || null,
        attachment_file || null, attachment_size || null, attachment_type || null, attachment_name || null,
        reading_time || null, status || 'draft', publishTime, sort_order || 0, 
        (is_featured === true || is_featured === 1 || is_featured === 'true' || is_featured === '1') ? 1 : 0,
        (is_hot === true || is_hot === 1 || is_hot === 'true' || is_hot === '1') ? 1 : 0,
        meta_title || null, meta_description || null, meta_keywords || null,
        // 多语言字段值
        title_zh || null, title_en || null, title_jp || null, title_hk || null,
        content_zh || null, content_en || null, content_jp || null, content_hk || null,
        cover_image_zh || null, cover_image_en || null, cover_image_jp || null, cover_image_hk || null,
        meta_title_zh || null, meta_title_en || null, meta_title_jp || null, meta_title_hk || null,
        meta_description_zh || null, meta_description_en || null, meta_description_jp || null, meta_description_hk || null,
        meta_keywords_zh || null, meta_keywords_en || null, meta_keywords_jp || null, meta_keywords_hk || null,
        id
      ]
    )
    
    console.log('✅ 更新成功，ID:', id);
    
    // 如果更换了图片，删除旧图片
    if (currentContent.cover_image && cover_image && currentContent.cover_image !== cover_image) {
      await deleteUploadedImage(currentContent.cover_image)
    }
    
    // 如果更换了视频，删除旧视频
    if (currentContent.video_file && video_file && currentContent.video_file !== video_file) {
      await deleteUploadedImage(currentContent.video_file)
    }
    
    // 如果更换了附件，删除旧附件
    if (currentContent.attachment_file && attachment_file && currentContent.attachment_file !== attachment_file) {
      await deleteUploadedImage(currentContent.attachment_file)
    }
    
    return c.json({ 
      success: true, 
      message: '内容更新成功' 
    })
  } catch (error: any) {
    console.error('更新内容失败:', error)
    return c.json({ 
      success: false, 
      error: error.message 
    }, 500)
  }
})

// 删除资源内容 (MySQL版本)
app.delete('/api/admin/resource-contents/:id', async (c) => {
  try {
    const id = c.req.param('id')
    
    // 获取内容信息（用于删除文件）
    const [content] = await mysqlQuery<any[]>(
      'SELECT cover_image, video_file, attachment_file FROM resource_contents WHERE id = ?',
      [id]
    )
    
    if (!content) {
      return c.json({ 
        success: false, 
        error: '内容不存在' 
      }, 404)
    }
    
    // 删除关联文件
    if (content.cover_image) {
      await deleteUploadedImage(content.cover_image)
    }
    if (content.video_file) {
      await deleteUploadedImage(content.video_file)
    }
    if (content.attachment_file) {
      await deleteUploadedImage(content.attachment_file)
    }
    
    // 删除内容
    await mysqlQuery(
      'DELETE FROM resource_contents WHERE id = ?',
      [id]
    )
    
    return c.json({ 
      success: true, 
      message: '内容删除成功' 
    })
  } catch (error: any) {
    console.error('删除内容失败:', error)
    return c.json({ 
      success: false, 
      error: error.message 
    }, 500)
  }
})

// 批量删除资源内容
app.post('/api/admin/resource-contents/batch-delete', async (c) => {
  try {
    const { ids } = await c.req.json()
    
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return c.json({ 
        success: false, 
        error: '请提供要删除的内容ID列表' 
      }, 400)
    }
    
    let deletedCount = 0
    const errors: string[] = []
    
    // 逐个删除内容
    for (const id of ids) {
      try {
        // 获取内容信息（用于删除文件）
        const [content] = await mysqlQuery<any[]>(
          'SELECT cover_image, video_file, attachment_file FROM resource_contents WHERE id = ?',
          [id]
        )
        
        if (content) {
          // 删除关联文件
          if (content.cover_image) {
            await deleteUploadedImage(content.cover_image).catch(err => {
              console.warn(`删除封面图片失败 (ID: ${id}):`, err)
            })
          }
          if (content.video_file) {
            await deleteUploadedImage(content.video_file).catch(err => {
              console.warn(`删除视频文件失败 (ID: ${id}):`, err)
            })
          }
          if (content.attachment_file) {
            await deleteUploadedImage(content.attachment_file).catch(err => {
              console.warn(`删除附件文件失败 (ID: ${id}):`, err)
            })
          }
          
          // 删除内容记录
          await mysqlQuery(
            'DELETE FROM resource_contents WHERE id = ?',
            [id]
          )
          
          deletedCount++
        } else {
          errors.push(`内容不存在 (ID: ${id})`)
        }
      } catch (error: any) {
        console.error(`删除内容失败 (ID: ${id}):`, error)
        errors.push(`删除失败 (ID: ${id}): ${error.message}`)
      }
    }
    
    // 返回结果
    if (deletedCount === ids.length) {
      return c.json({ 
        success: true, 
        message: `成功删除 ${deletedCount} 项内容`,
        deleted: deletedCount
      })
    } else if (deletedCount > 0) {
      return c.json({ 
        success: true, 
        message: `成功删除 ${deletedCount}/${ids.length} 项内容`,
        deleted: deletedCount,
        errors: errors
      })
    } else {
      return c.json({ 
        success: false, 
        error: '批量删除失败',
        errors: errors
      }, 500)
    }
  } catch (error: any) {
    console.error('批量删除失败:', error)
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
