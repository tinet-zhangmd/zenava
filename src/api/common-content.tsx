import { Hono } from 'hono';
import { cors } from 'hono/cors';

type Bindings = {
  DB: D1Database;
};

const commonContentApi = new Hono<{ Bindings: Bindings }>();

// Enable CORS
commonContentApi.use('/*', cors());

// ==================== Navigation Config API ====================

// Get navigation config
commonContentApi.get('/navigation', async (c) => {
  const { env } = c;
  const language = c.req.query('lang') || 'en';
  
  try {
    // Always get id=1 config (primary configuration)
    const config = await env.DB.prepare(`
      SELECT * FROM navigation_config 
      WHERE id = 1
      LIMIT 1
    `).first();
    
    return c.json({
      success: true,
      data: config || {
        logo_url: null,
        logo_alt: 'Logo',
        status: 'published'
      }
    });
  } catch (error: any) {
    console.error('Error fetching navigation config:', error);
    return c.json({ 
      success: false, 
      error: error.message || 'Failed to fetch navigation config' 
    }, 500);
  }
});

// Update navigation config
commonContentApi.post('/navigation', async (c) => {
  const { env } = c;
  const body = await c.req.json();
  
  try {
    const { logo_url, logo_alt, status } = body;
    
    // Always update id=1 config (primary configuration)
    const existing = await env.DB.prepare(`
      SELECT id FROM navigation_config WHERE id = 1 LIMIT 1
    `).first();
    
    if (existing) {
      // Update existing config
      await env.DB.prepare(`
        UPDATE navigation_config 
        SET logo_url = ?, logo_alt = ?, status = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = 1
      `).bind(
        logo_url || null,
        logo_alt || 'ZENAVA',
        status || 'published' // Default to published for immediate reflection
      ).run();
    } else {
      // Create new config with id=1
      await env.DB.prepare(`
        INSERT INTO navigation_config (id, logo_url, logo_alt, status)
        VALUES (1, ?, ?, ?)
      `).bind(
        logo_url || null,
        logo_alt || 'ZENAVA',
        status || 'published' // Default to published for immediate reflection
      ).run();
    }
    
    return c.json({ 
      success: true, 
      message: 'Navigation configuration updated successfully' 
    });
  } catch (error: any) {
    console.error('Error updating navigation config:', error);
    return c.json({ 
      success: false, 
      error: error.message || 'Failed to update navigation config' 
    }, 500);
  }
});

// ==================== Footer Config API ====================

// Get footer config with sections and links
commonContentApi.get('/footer', async (c) => {
  const { env } = c;
  const language = c.req.query('lang') || 'en';
  
  try {
    // Get footer config (get the latest regardless of language for consistency)
    const config = await env.DB.prepare(`
      SELECT * FROM footer_config 
      ORDER BY updated_at DESC 
      LIMIT 1
    `).first();
    
    // Get footer sections for the language
    const sections = await env.DB.prepare(`
      SELECT * FROM footer_sections
      WHERE is_visible = 1 AND language = ?
      ORDER BY position
    `).bind(language).all();
    
    // Get links for each section
    const parsedSections = await Promise.all(sections.results.map(async (section) => {
      const links = await env.DB.prepare(`
        SELECT 
          id,
          link_text as label,
          link_url as url,
          target,
          position,
          is_visible
        FROM footer_links
        WHERE section_id = ? AND is_visible = 1
        ORDER BY position
      `).bind(section.id).all();
      
      return {
        ...section,
        links: links.results || []
      };
    }));
    
    // Get privacy links for the language
    const privacyLinks = await env.DB.prepare(`
      SELECT 
        id,
        link_type,
        link_text as label,
        link_url as url,
        target,
        is_visible
      FROM footer_privacy_links
      WHERE is_visible = 1 AND language = ?
      ORDER BY link_type
    `).bind(language).all();
    
    return c.json({
      success: true,
      data: {
        config: config || {
          logo_url: null,
          logo_alt: 'Logo',
          subtitle_text: '',
          copyright_text: `© ${new Date().getFullYear()} Zenava. All rights reserved.`,
          status: 'draft'
        },
        sections: parsedSections,
        privacyLinks: privacyLinks.results
      }
    });
  } catch (error: any) {
    console.error('Error fetching footer config:', error);
    return c.json({ 
      success: false, 
      error: error.message || 'Failed to fetch footer config' 
    }, 500);
  }
});

// Update footer config
commonContentApi.post('/footer/config', async (c) => {
  const { env } = c;
  const language = c.req.query('lang') || 'en';
  const body = await c.req.json();
  
  try {
    const { logo_url, logo_alt, subtitle_text, copyright_text, status } = body;
    
    // Check if any config exists
    const existing = await env.DB.prepare(`
      SELECT id FROM footer_config ORDER BY id LIMIT 1
    `).first();
    
    if (existing) {
      // Update first/primary config
      await env.DB.prepare(`
        UPDATE footer_config 
        SET logo_url = ?, logo_alt = ?, logo_subtitle = ?, copyright_text = ?, status = ?, language = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `).bind(
        logo_url || null,
        logo_alt || 'ZENAVA',
        subtitle_text || '企業與客戶對話場景的 AI 智能體',
        copyright_text || `© ${new Date().getFullYear()} ZENAVA. All rights reserved.`,
        status || 'published', // Default to published for immediate reflection
        language,
        existing.id
      ).run();
    } else {
      // Create new config
      await env.DB.prepare(`
        INSERT INTO footer_config (logo_url, logo_alt, logo_subtitle, copyright_text, status, language)
        VALUES (?, ?, ?, ?, ?, ?)
      `).bind(
        logo_url || null,
        logo_alt || 'ZENAVA',
        subtitle_text || '企業與客戶對話場景的 AI 智能體',
        copyright_text || `© ${new Date().getFullYear()} ZENAVA. All rights reserved.`,
        status || 'published', // Default to published for immediate reflection
        language
      ).run();
    }
    
    return c.json({ 
      success: true,
      message: 'Footer configuration updated successfully'
    });
  } catch (error: any) {
    console.error('Error updating footer config:', error);
    return c.json({ 
      success: false, 
      error: error.message || 'Failed to update footer config' 
    }, 500);
  }
});

// Update footer section
commonContentApi.post('/footer/section/:id', async (c) => {
  const { env } = c;
  const sectionId = c.req.param('id');
  const language = c.req.query('lang') || 'en';
  const body = await c.req.json();
  
  try {
    const { title, position, is_visible } = body;
    
    await env.DB.prepare(`
      UPDATE footer_sections 
      SET title = ?, position = ?, is_visible = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).bind(
      title,
      position,
      is_visible ? 1 : 0,
      sectionId
    ).run();
    
    return c.json({ success: true });
  } catch (error: any) {
    console.error('Error updating footer section:', error);
    return c.json({ 
      success: false, 
      error: error.message || 'Failed to update footer section' 
    }, 500);
  }
});

// Add footer link
commonContentApi.post('/footer/section/:id/link', async (c) => {
  const { env } = c;
  const sectionId = c.req.param('id');
  const language = c.req.query('lang') || 'en';
  const body = await c.req.json();
  
  try {
    const { label, url, target, position } = body;
    
    const result = await env.DB.prepare(`
      INSERT INTO footer_links (section_id, link_text, link_url, target, position)
      VALUES (?, ?, ?, ?, ?)
    `).bind(
      sectionId,
      label,
      url,
      target || '_self',
      position || 0
    ).run();
    
    return c.json({ 
      success: true, 
      id: result.meta.last_row_id 
    });
  } catch (error: any) {
    console.error('Error adding footer link:', error);
    return c.json({ 
      success: false, 
      error: error.message || 'Failed to add footer link' 
    }, 500);
  }
});

// Update footer link
commonContentApi.put('/footer/link/:id', async (c) => {
  const { env } = c;
  const linkId = c.req.param('id');
  const body = await c.req.json();
  
  try {
    const { label, url, target, position, is_visible } = body;
    
    await env.DB.prepare(`
      UPDATE footer_links 
      SET link_text = ?, link_url = ?, target = ?, position = ?, is_visible = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).bind(
      label,
      url,
      target || '_self',
      position || 0,
      is_visible ? 1 : 0,
      linkId
    ).run();
    
    return c.json({ success: true });
  } catch (error: any) {
    console.error('Error updating footer link:', error);
    return c.json({ 
      success: false, 
      error: error.message || 'Failed to update footer link' 
    }, 500);
  }
});

// Delete footer link
commonContentApi.delete('/footer/link/:id', async (c) => {
  const { env } = c;
  const linkId = c.req.param('id');
  
  try {
    await env.DB.prepare(`
      DELETE FROM footer_links WHERE id = ?
    `).bind(linkId).run();
    
    return c.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting footer link:', error);
    return c.json({ 
      success: false, 
      error: error.message || 'Failed to delete footer link' 
    }, 500);
  }
});

// Update privacy links
commonContentApi.post('/footer/privacy-links', async (c) => {
  const { env } = c;
  const language = c.req.query('lang') || 'en';
  const body = await c.req.json();
  
  try {
    const { links } = body; // Array of { id, label, url, target, position, is_visible }
    
    // Update each link
    for (const link of links) {
      await env.DB.prepare(`
        UPDATE footer_privacy_links 
        SET link_text = ?, link_url = ?, target = ?, is_visible = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `).bind(
        link.label,
        link.url,
        link.target || '_self',
        link.is_visible ? 1 : 0,
        link.id
      ).run();
    }
    
    return c.json({ success: true });
  } catch (error: any) {
    console.error('Error updating privacy links:', error);
    return c.json({ 
      success: false, 
      error: error.message || 'Failed to update privacy links' 
    }, 500);
  }
});

// Publish common content (change status from draft to published and regenerate pages)
commonContentApi.post('/publish', async (c) => {
  const { env } = c;
  const body = await c.req.json();
  const { type } = body; // 'navigation', 'footer', or 'all'
  
  try {
    // Update status to published for all languages
    if (type === 'navigation' || type === 'all') {
      await env.DB.prepare(`
        UPDATE navigation_config 
        SET status = 'published', updated_at = CURRENT_TIMESTAMP
      `).run();
    }
    
    if (type === 'footer' || type === 'all') {
      await env.DB.prepare(`
        UPDATE footer_config 
        SET status = 'published', updated_at = CURRENT_TIMESTAMP
      `).run();
    }
    
    // Clear any cached data by updating timestamps
    // This ensures immediate reflection of changes
    try {
      await env.DB.prepare(`
        UPDATE page_content 
        SET updated_at = CURRENT_TIMESTAMP
      `).run();
    } catch (e) {
      // Table might not exist, ignore error
      console.log('page_content table might not exist, skipping update');
    }
    
    return c.json({ 
      success: true,
      message: 'Content published successfully. Changes will be reflected immediately.'
    });
  } catch (error: any) {
    console.error('Error publishing content:', error);
    return c.json({ 
      success: false, 
      error: error.message || 'Failed to publish content' 
    }, 500);
  }
});

export default commonContentApi;