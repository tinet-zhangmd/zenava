import { Hono } from 'hono'
import { StaticSiteGenerator } from '../lib/static-generator.js'

// ⚠️ 警告: 此 API 仍在使用 D1/SQLite
// TODO: 需要迁移到 MySQL (参考 resource-center.ts 的实现)
// 当前状态: 部分管理后台功能仍依赖此 API

type Bindings = {
  DB: D1Database
}

const publishApi = new Hono<{ Bindings: Bindings }>()

// ==================== Version Management ====================

// Get all versions
publishApi.get('/versions', async (c) => {
  try {
    const { results } = await c.env.DB.prepare(`
      SELECT v.*, 
             COUNT(DISTINCT ps.page_id) as pages_count,
             MAX(ph.executed_at) as last_published_at
      FROM site_versions v
      LEFT JOIN page_snapshots ps ON v.id = ps.version_id
      LEFT JOIN publishing_history ph ON v.id = ph.version_id AND ph.action = 'publish'
      GROUP BY v.id
      ORDER BY v.created_at DESC
      LIMIT 10
    `).all()
    
    return c.json({ success: true, data: results })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// Create a new version (snapshot current state)
publishApi.post('/versions/create', async (c) => {
  try {
    const { versionName, description } = await c.req.json()
    
    // Generate version number
    const { results: lastVersion } = await c.env.DB.prepare(`
      SELECT version_number FROM site_versions 
      ORDER BY id DESC LIMIT 1
    `).all()
    
    let versionNumber = 'v1.0.0'
    if (lastVersion?.[0]) {
      const parts = lastVersion[0].version_number.replace('v', '').split('.')
      const patch = parseInt(parts[2]) + 1
      versionNumber = `v${parts[0]}.${parts[1]}.${patch}`
    }
    
    // Create version
    const versionResult = await c.env.DB.prepare(`
      INSERT INTO site_versions (version_number, version_name, description, status)
      VALUES (?, ?, ?, 'draft')
    `).bind(versionNumber, versionName || `Release ${versionNumber}`, description).run()
    
    const versionId = versionResult.meta.last_row_id
    
    // Snapshot all current pages
    const { results: pages } = await c.env.DB.prepare(`
      SELECT * FROM pages WHERE status = 'published'
    `).all()
    
    for (const page of pages) {
      // Get page SEO
      const seo = await c.env.DB.prepare(`
        SELECT * FROM page_seo WHERE page_id = ?
      `).bind(page.id).first()
      
      // Get page modules
      const { results: modules } = await c.env.DB.prepare(`
        SELECT * FROM content_modules 
        WHERE page_id = ? AND status = 'published'
        ORDER BY position
      `).bind(page.id).all()
      
      // Create snapshot
      await c.env.DB.prepare(`
        INSERT INTO page_snapshots (version_id, page_id, page_data, modules_data, seo_data)
        VALUES (?, ?, ?, ?, ?)
      `).bind(
        versionId,
        page.id,
        JSON.stringify(page),
        JSON.stringify(modules),
        JSON.stringify(seo || {})
      ).run()
    }
    
    // Update pages count
    await c.env.DB.prepare(`
      UPDATE site_versions 
      SET pages_count = ? 
      WHERE id = ?
    `).bind(pages.length, versionId).run()
    
    // Snapshot complete site data
    const siteSnapshot = {
      pages: pages.length,
      timestamp: new Date().toISOString(),
      settings: await getGlobalSettings(c.env.DB),
      navigation: await getNavigationMenus(c.env.DB)
    }
    
    await c.env.DB.prepare(`
      UPDATE site_versions 
      SET snapshot_data = ? 
      WHERE id = ?
    `).bind(JSON.stringify(siteSnapshot), versionId).run()
    
    return c.json({ 
      success: true, 
      data: { 
        id: versionId, 
        version_number: versionNumber,
        pages_count: pages.length 
      } 
    })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// ==================== Static Site Generation ====================

// Build static site for a version
publishApi.post('/build/:versionId', async (c) => {
  try {
    const versionId = parseInt(c.req.param('versionId'))
    const { baseUrl = 'https://zenava.pages.dev', minify = true } = await c.req.json()
    
    // Check version exists
    const version = await c.env.DB.prepare(`
      SELECT * FROM site_versions WHERE id = ?
    `).bind(versionId).first()
    
    if (!version) {
      return c.json({ success: false, error: 'Version not found' }, 404)
    }
    
    // Create build record
    const buildResult = await c.env.DB.prepare(`
      INSERT INTO static_builds (version_id, build_status, build_type, started_at)
      VALUES (?, 'building', 'full', CURRENT_TIMESTAMP)
    `).bind(versionId).run()
    
    const buildId = buildResult.meta.last_row_id
    const startTime = Date.now()
    
    try {
      // Initialize generator
      const generator = new StaticSiteGenerator(c.env.DB, {
        baseUrl,
        outputDir: `/static/v${versionId}`,
        minify,
        generateSitemap: true,
        generateRobots: true
      })
      
      // Generate all pages
      const result = await generator.generateAllPages(versionId)
      
      // Update build record
      const buildTime = Date.now() - startTime
      await c.env.DB.prepare(`
        UPDATE static_builds 
        SET build_status = ?, pages_built = ?, total_pages = ?, 
            build_time_ms = ?, completed_at = CURRENT_TIMESTAMP,
            metadata = ?
        WHERE id = ?
      `).bind(
        result.success ? 'success' : 'failed',
        result.pagesBuilt,
        result.pagesBuilt,
        buildTime,
        JSON.stringify({ errors: result.errors }),
        buildId
      ).run()
      
      if (result.success) {
        // Update version status
        await c.env.DB.prepare(`
          UPDATE site_versions SET status = 'built' WHERE id = ?
        `).bind(versionId).run()
      }
      
      return c.json({ 
        success: result.success, 
        data: {
          buildId,
          pagesBuilt: result.pagesBuilt,
          buildTime: `${buildTime}ms`,
          errors: result.errors
        }
      })
    } catch (error: any) {
      // Update build as failed
      await c.env.DB.prepare(`
        UPDATE static_builds 
        SET build_status = 'failed', error_log = ?, completed_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `).bind(error.message, buildId).run()
      
      throw error
    }
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// ==================== Publishing & Deployment ====================

// Publish a version (deploy to production)
publishApi.post('/publish/:versionId', async (c) => {
  try {
    const versionId = parseInt(c.req.param('versionId'))
    const { environment = 'production' } = await c.req.json()
    
    // Check if version is built
    const version = await c.env.DB.prepare(`
      SELECT * FROM site_versions WHERE id = ?
    `).bind(versionId).first()
    
    if (!version) {
      return c.json({ success: false, error: 'Version not found' }, 404)
    }
    
    if (version.status !== 'built' && version.status !== 'published') {
      return c.json({ success: false, error: 'Version must be built before publishing' }, 400)
    }
    
    // Create publishing record
    const publishResult = await c.env.DB.prepare(`
      INSERT INTO publishing_history (version_id, action, environment, deployment_status)
      VALUES (?, 'publish', ?, 'deploying')
    `).bind(versionId, environment).run()
    
    const publishId = publishResult.meta.last_row_id
    
    try {
      // Get all static files for this version
      const { results: files } = await c.env.DB.prepare(`
        SELECT file_path, content FROM static_files 
        WHERE version_id = ?
      `).bind(versionId).all()
      
      // In production, these would be deployed to CDN/edge
      // For now, we'll mark them as deployed
      const deploymentUrl = `https://zenava.pages.dev/v${versionId}`
      
      // Update publishing record
      await c.env.DB.prepare(`
        UPDATE publishing_history 
        SET deployment_status = 'success', 
            deployment_url = ?,
            cdn_purge_status = 'success'
        WHERE id = ?
      `).bind(deploymentUrl, publishId).run()
      
      // Update version status
      await c.env.DB.prepare(`
        UPDATE site_versions 
        SET status = 'published', published_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `).bind(versionId).run()
      
      // Mark all other versions as archived
      await c.env.DB.prepare(`
        UPDATE site_versions 
        SET status = 'archived' 
        WHERE id != ? AND status = 'published'
      `).bind(versionId).run()
      
      // Purge CDN cache (simulated)
      await purgeCDNCache(c.env.DB)
      
      return c.json({ 
        success: true, 
        data: {
          publishId,
          deploymentUrl,
          filesDeployed: files.length
        }
      })
    } catch (error: any) {
      // Update publishing as failed
      await c.env.DB.prepare(`
        UPDATE publishing_history 
        SET deployment_status = 'failed', metadata = ?
        WHERE id = ?
      `).bind(JSON.stringify({ error: error.message }), publishId).run()
      
      throw error
    }
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// ==================== Rollback ====================

// Rollback to a previous version
publishApi.post('/rollback/:versionId', async (c) => {
  try {
    const targetVersionId = parseInt(c.req.param('versionId'))
    
    // Get current published version
    const currentVersion = await c.env.DB.prepare(`
      SELECT id FROM site_versions 
      WHERE status = 'published' 
      LIMIT 1
    `).first()
    
    if (!currentVersion) {
      return c.json({ success: false, error: 'No currently published version' }, 404)
    }
    
    // Get target version
    const targetVersion = await c.env.DB.prepare(`
      SELECT * FROM site_versions WHERE id = ?
    `).bind(targetVersionId).first()
    
    if (!targetVersion) {
      return c.json({ success: false, error: 'Target version not found' }, 404)
    }
    
    // Restore snapshots to current tables
    const { results: snapshots } = await c.env.DB.prepare(`
      SELECT * FROM page_snapshots WHERE version_id = ?
    `).bind(targetVersionId).all()
    
    for (const snapshot of snapshots) {
      const pageData = JSON.parse(snapshot.page_data)
      const modulesData = JSON.parse(snapshot.modules_data)
      const seoData = JSON.parse(snapshot.seo_data)
      
      // Update page
      await c.env.DB.prepare(`
        UPDATE pages 
        SET title = ?, slug = ?, language = ?, status = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `).bind(
        pageData.title,
        pageData.slug,
        pageData.language,
        pageData.status,
        pageData.id
      ).run()
      
      // Update SEO
      if (seoData.id) {
        await c.env.DB.prepare(`
          UPDATE page_seo 
          SET meta_title = ?, meta_description = ?, meta_keywords = ?,
              og_title = ?, og_description = ?, og_image = ?
          WHERE page_id = ?
        `).bind(
          seoData.meta_title,
          seoData.meta_description,
          seoData.meta_keywords,
          seoData.og_title,
          seoData.og_description,
          seoData.og_image,
          pageData.id
        ).run()
      }
      
      // Clear and restore modules
      await c.env.DB.prepare(`
        DELETE FROM content_modules WHERE page_id = ?
      `).bind(pageData.id).run()
      
      for (const module of modulesData) {
        await c.env.DB.prepare(`
          INSERT INTO content_modules (
            page_id, module_type, module_name, position, 
            content, settings, is_visible, status
          )
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(
          pageData.id,
          module.module_type,
          module.module_name,
          module.position,
          module.content,
          module.settings,
          module.is_visible,
          module.status
        ).run()
      }
    }
    
    // Create rollback record
    await c.env.DB.prepare(`
      INSERT INTO publishing_history (
        version_id, action, environment, 
        rollback_from_version, deployment_status
      )
      VALUES (?, 'rollback', 'production', ?, 'success')
    `).bind(targetVersionId, currentVersion.id).run()
    
    // Update version statuses
    await c.env.DB.prepare(`
      UPDATE site_versions SET status = 'published' WHERE id = ?
    `).bind(targetVersionId).run()
    
    await c.env.DB.prepare(`
      UPDATE site_versions SET status = 'archived' WHERE id = ?
    `).bind(currentVersion.id).run()
    
    // Purge CDN cache
    await purgeCDNCache(c.env.DB)
    
    return c.json({ 
      success: true, 
      message: `Successfully rolled back to version ${targetVersion.version_number}`
    })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// ==================== Cache Management ====================

// Clear CDN cache
publishApi.post('/cache/purge', async (c) => {
  try {
    await purgeCDNCache(c.env.DB)
    return c.json({ success: true, message: 'Cache purged successfully' })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// ==================== Helper Functions ====================

async function getGlobalSettings(db: D1Database): Promise<any> {
  const { results } = await db.prepare(`
    SELECT setting_key, setting_value FROM global_settings
  `).all()
  
  const settings: Record<string, any> = {}
  for (const row of results) {
    settings[row.setting_key] = row.setting_value
  }
  return settings
}

async function getNavigationMenus(db: D1Database): Promise<any> {
  const { results } = await db.prepare(`
    SELECT * FROM navigation_menus
  `).all()
  return results
}

async function purgeCDNCache(db: D1Database): Promise<void> {
  // Record cache purge
  await db.prepare(`
    INSERT INTO cache_management (cache_key, cache_type, purged_at)
    VALUES ('all', 'cdn', CURRENT_TIMESTAMP)
  `).run()
  
  // In production, this would call Cloudflare API to purge cache
  // For now, we'll just mark it as purged
}

export default publishApi