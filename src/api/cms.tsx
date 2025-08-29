import { Hono } from 'hono'

type Bindings = {
  DB: D1Database;
}

const cmsApi = new Hono<{ Bindings: Bindings }>()

// ==================== Pages API ====================

// Get all pages
cmsApi.get('/pages', async (c) => {
  try {
    const { results } = await c.env.DB.prepare(`
      SELECT p.*, s.meta_title, s.meta_description 
      FROM pages p
      LEFT JOIN page_seo s ON p.id = s.page_id
      ORDER BY p.updated_at DESC
    `).all();
    
    return c.json({ success: true, data: results });
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Get single page with all content
cmsApi.get('/pages/:id', async (c) => {
  try {
    const pageId = c.req.param('id');
    
    // Get page details
    const page = await c.env.DB.prepare(`
      SELECT p.*, s.* 
      FROM pages p
      LEFT JOIN page_seo s ON p.id = s.page_id
      WHERE p.id = ?
    `).bind(pageId).first();
    
    if (!page) {
      return c.json({ success: false, error: 'Page not found' }, 404);
    }
    
    // Get content modules
    const { results: modules } = await c.env.DB.prepare(`
      SELECT * FROM content_modules 
      WHERE page_id = ? 
      ORDER BY position
    `).bind(pageId).all();
    
    return c.json({ 
      success: true, 
      data: { ...page, modules } 
    });
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Create or update page
cmsApi.post('/pages', async (c) => {
  try {
    const data = await c.req.json();
    const { id, slug, language, title, status, seo, modules } = data;
    
    let pageId = id;
    
    // Insert or update page
    if (id) {
      // Update existing page
      await c.env.DB.prepare(`
        UPDATE pages 
        SET slug = ?, language = ?, title = ?, status = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `).bind(slug, language, title, status, id).run();
    } else {
      // Create new page
      const result = await c.env.DB.prepare(`
        INSERT INTO pages (slug, language, title, status) 
        VALUES (?, ?, ?, ?)
      `).bind(slug, language, title, status || 'draft').run();
      
      pageId = result.meta.last_row_id;
    }
    
    // Update SEO if provided
    if (seo && pageId) {
      // Check if SEO exists
      const existingSeo = await c.env.DB.prepare(
        'SELECT id FROM page_seo WHERE page_id = ?'
      ).bind(pageId).first();
      
      if (existingSeo) {
        await c.env.DB.prepare(`
          UPDATE page_seo 
          SET meta_title = ?, meta_description = ?, meta_keywords = ?,
              og_title = ?, og_description = ?, og_image = ?,
              updated_at = CURRENT_TIMESTAMP
          WHERE page_id = ?
        `).bind(
          seo.meta_title, seo.meta_description, seo.meta_keywords,
          seo.og_title, seo.og_description, seo.og_image,
          pageId
        ).run();
      } else {
        await c.env.DB.prepare(`
          INSERT INTO page_seo (page_id, meta_title, meta_description, meta_keywords,
                               og_title, og_description, og_image)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `).bind(
          pageId, seo.meta_title, seo.meta_description, seo.meta_keywords,
          seo.og_title, seo.og_description, seo.og_image
        ).run();
      }
    }
    
    // Update modules if provided
    if (modules && pageId) {
      // Delete existing modules
      await c.env.DB.prepare('DELETE FROM content_modules WHERE page_id = ?').bind(pageId).run();
      
      // Insert new modules
      for (let i = 0; i < modules.length; i++) {
        const module = modules[i];
        await c.env.DB.prepare(`
          INSERT INTO content_modules (page_id, module_type, module_name, position, content, settings, is_visible, status)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(
          pageId, 
          module.module_type, 
          module.module_name,
          i,
          JSON.stringify(module.content),
          JSON.stringify(module.settings || {}),
          module.is_visible !== false ? 1 : 0,
          module.status || 'draft'
        ).run();
      }
    }
    
    return c.json({ success: true, data: { id: pageId } });
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Publish page
cmsApi.post('/pages/:id/publish', async (c) => {
  try {
    const pageId = c.req.param('id');
    
    // Update page status
    await c.env.DB.prepare(`
      UPDATE pages 
      SET status = 'published', published_at = CURRENT_TIMESTAMP 
      WHERE id = ?
    `).bind(pageId).run();
    
    // Update all modules status
    await c.env.DB.prepare(`
      UPDATE content_modules 
      SET status = 'published' 
      WHERE page_id = ?
    `).bind(pageId).run();
    
    // Add to publishing queue (for tracking)
    await c.env.DB.prepare(`
      INSERT INTO publishing_queue (entity_type, entity_id, action, status, executed_at)
      VALUES ('page', ?, 'publish', 'completed', CURRENT_TIMESTAMP)
    `).bind(pageId).run();
    
    return c.json({ success: true, message: 'Page published successfully' });
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500);
  }
});

// ==================== Content Modules API ====================

// Get modules for a page
cmsApi.get('/modules/page/:pageId', async (c) => {
  try {
    const pageId = c.req.param('pageId');
    
    const { results } = await c.env.DB.prepare(`
      SELECT * FROM content_modules 
      WHERE page_id = ? 
      ORDER BY position
    `).bind(pageId).all();
    
    return c.json({ success: true, data: results });
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Update single module
cmsApi.put('/modules/:id', async (c) => {
  try {
    const moduleId = c.req.param('id');
    const data = await c.req.json();
    
    await c.env.DB.prepare(`
      UPDATE content_modules 
      SET content = ?, settings = ?, is_visible = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).bind(
      JSON.stringify(data.content),
      JSON.stringify(data.settings || {}),
      data.is_visible ? 1 : 0,
      moduleId
    ).run();
    
    return c.json({ success: true, message: 'Module updated' });
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500);
  }
});

// ==================== Media API ====================

// Get all media
cmsApi.get('/media', async (c) => {
  try {
    const folder = c.req.query('folder') || '/';
    
    const { results } = await c.env.DB.prepare(`
      SELECT * FROM media 
      WHERE folder = ? 
      ORDER BY created_at DESC
    `).bind(folder).all();
    
    return c.json({ success: true, data: results });
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Upload media (metadata only - actual file handled separately)
cmsApi.post('/media', async (c) => {
  try {
    const data = await c.req.json();
    
    const result = await c.env.DB.prepare(`
      INSERT INTO media (filename, original_name, mime_type, size, url, alt_text, folder)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).bind(
      data.filename,
      data.original_name,
      data.mime_type,
      data.size,
      data.url,
      data.alt_text,
      data.folder || '/'
    ).run();
    
    return c.json({ success: true, data: { id: result.meta.last_row_id } });
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500);
  }
});

// ==================== Settings API ====================

// Get all settings
cmsApi.get('/settings', async (c) => {
  try {
    const category = c.req.query('category');
    
    let query = 'SELECT * FROM global_settings';
    if (category) {
      query += ' WHERE category = ?';
    }
    
    const stmt = category 
      ? c.env.DB.prepare(query).bind(category)
      : c.env.DB.prepare(query);
    
    const { results } = await stmt.all();
    
    // Convert to key-value object
    const settings: Record<string, any> = {};
    for (const row of results) {
      settings[row.setting_key] = row.setting_value;
    }
    
    return c.json({ success: true, data: settings });
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Update settings
cmsApi.post('/settings', async (c) => {
  try {
    const settings = await c.req.json();
    
    for (const [key, value] of Object.entries(settings)) {
      // Check if setting exists
      const existing = await c.env.DB.prepare(
        'SELECT id FROM global_settings WHERE setting_key = ?'
      ).bind(key).first();
      
      if (existing) {
        await c.env.DB.prepare(`
          UPDATE global_settings 
          SET setting_value = ?, updated_at = CURRENT_TIMESTAMP 
          WHERE setting_key = ?
        `).bind(String(value), key).run();
      } else {
        await c.env.DB.prepare(`
          INSERT INTO global_settings (setting_key, setting_value)
          VALUES (?, ?)
        `).bind(key, String(value)).run();
      }
    }
    
    return c.json({ success: true, message: 'Settings updated' });
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500);
  }
});

// ==================== Navigation API ====================

// Get navigation menu
cmsApi.get('/navigation/:name', async (c) => {
  try {
    const name = c.req.param('name');
    const language = c.req.query('lang') || 'en';
    
    const menu = await c.env.DB.prepare(`
      SELECT * FROM navigation_menus 
      WHERE name = ? AND language = ?
    `).bind(name, language).first();
    
    if (!menu) {
      return c.json({ success: true, data: { items: [] } });
    }
    
    return c.json({ 
      success: true, 
      data: { ...menu, items: JSON.parse(menu.items) } 
    });
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Update navigation menu
cmsApi.post('/navigation/:name', async (c) => {
  try {
    const name = c.req.param('name');
    const data = await c.req.json();
    const language = data.language || 'en';
    
    // Check if menu exists
    const existing = await c.env.DB.prepare(
      'SELECT id FROM navigation_menus WHERE name = ? AND language = ?'
    ).bind(name, language).first();
    
    if (existing) {
      await c.env.DB.prepare(`
        UPDATE navigation_menus 
        SET items = ?, updated_at = CURRENT_TIMESTAMP 
        WHERE name = ? AND language = ?
      `).bind(JSON.stringify(data.items), name, language).run();
    } else {
      await c.env.DB.prepare(`
        INSERT INTO navigation_menus (name, language, items)
        VALUES (?, ?, ?)
      `).bind(name, language, JSON.stringify(data.items)).run();
    }
    
    return c.json({ success: true, message: 'Navigation updated' });
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500);
  }
});

export default cmsApi;