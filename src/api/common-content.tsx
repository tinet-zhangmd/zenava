import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { query as mysqlQuery } from '../lib/mysql.js';

const commonContentApi = new Hono();

// Enable CORS
commonContentApi.use('/*', cors());

// ==================== Navigation Config API ====================

// Get navigation config
commonContentApi.get('/navigation', async (c) => {
  const language = c.req.query('lang') || 'zh';
  
  try {
    // Always get id=1 config (primary configuration)
    const configs = await mysqlQuery<any[]>(`
      SELECT * FROM navigation_config 
      WHERE id = 1
      LIMIT 1
    `);
    
    const config = configs[0] || null;
    
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
  const body = await c.req.json();
  
  try {
    const { logo_url, logo_alt, status } = body;
    
    // Always update id=1 config (primary configuration)
    const existing = await mysqlQuery<any[]>(`
      SELECT id FROM navigation_config WHERE id = 1 LIMIT 1
    `);
    
    if (existing && existing.length > 0) {
      // Update existing config
      await mysqlQuery(`
        UPDATE navigation_config 
        SET logo_url = ?, logo_alt = ?, status = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = 1
      `, [
        logo_url || null,
        logo_alt || 'ZENAVA',
        status || 'published' // Default to published for immediate reflection
      ]);
    } else {
      // Create new config with id=1
      await mysqlQuery(`
        INSERT INTO navigation_config (id, logo_url, logo_alt, status)
        VALUES (1, ?, ?, ?)
      `, [
        logo_url || null,
        logo_alt || 'ZENAVA',
        status || 'published' // Default to published for immediate reflection
      ]);
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
  const language = c.req.query('lang') || 'zh';
  
  try {
    // Get footer config (get the latest regardless of language for consistency)
    const configs = await mysqlQuery<any[]>(`
      SELECT * FROM footer_config 
      ORDER BY updated_at DESC 
      LIMIT 1
    `);
    const config = configs[0] || null;
    
    // Get footer sections for the language
    const sections = await mysqlQuery<any[]>(`
      SELECT * FROM footer_sections
      WHERE is_visible = 1 AND language = ?
      ORDER BY position
    `, [language]);
    
    // Get links for each section
    const parsedSections = await Promise.all(sections.map(async (section) => {
      const links = await mysqlQuery<any[]>(`
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
      `, [section.id]);
      
      return {
        ...section,
        links: links || []
      };
    }));
    
    // Get privacy links for the language
    const privacyLinks = await mysqlQuery<any[]>(`
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
    `, [language]);
    
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
        privacyLinks: privacyLinks || []
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
  const language = c.req.query('lang') || 'zh';
  const body = await c.req.json();
  
  try {
    const { logo_url, logo_alt, subtitle_text, copyright_text, status } = body;
    
    // Check if config exists for this language
    const existing = await mysqlQuery<any[]>(`
      SELECT id FROM footer_config WHERE language = ? LIMIT 1
    `, [language]);
    
    if (existing && existing.length > 0) {
      // Update existing language-specific config
      await mysqlQuery(`
        UPDATE footer_config 
        SET logo_url = ?, logo_alt = ?, logo_subtitle = ?, copyright_text = ?, status = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `, [
        logo_url || null,
        logo_alt || 'ZENAVA',
        subtitle_text || '企業與客戶對話場景的 AI 智能體',
        copyright_text || `© ${new Date().getFullYear()} ZENAVA. All rights reserved.`,
        status || 'published', // Default to published for immediate reflection
        existing[0].id
      ]);
      
      // IMPORTANT: Sync logo to all other languages (logo should be consistent across languages)
      if (logo_url !== undefined) {
        await mysqlQuery(`
          UPDATE footer_config 
          SET logo_url = ?, logo_alt = ?, updated_at = CURRENT_TIMESTAMP
          WHERE language != ?
        `, [
          logo_url || null,
          logo_alt || 'ZENAVA',
          language
        ]);
      }
    } else {
      // Create new language-specific config
      await mysqlQuery(`
        INSERT INTO footer_config (logo_url, logo_alt, logo_subtitle, copyright_text, status, language)
        VALUES (?, ?, ?, ?, ?, ?)
      `, [
        logo_url || null,
        logo_alt || 'ZENAVA',
        subtitle_text || '企業與客戶對話場景的 AI 智能體',
        copyright_text || `© ${new Date().getFullYear()} ZENAVA. All rights reserved.`,
        status || 'published', // Default to published for immediate reflection
        language
      ]);
      
      // IMPORTANT: Also create records for other languages with the same logo
      const languages = ['en', 'jp', 'hk'].filter(l => l !== language);
      for (const lang of languages) {
        const langExists = await mysqlQuery<any[]>(`
          SELECT id FROM footer_config WHERE language = ? LIMIT 1
        `, [lang]);
        
        if (!langExists || langExists.length === 0) {
          await mysqlQuery(`
            INSERT INTO footer_config (logo_url, logo_alt, logo_subtitle, copyright_text, status, language)
            VALUES (?, ?, ?, ?, ?, ?)
          `, [
            logo_url || null,
            logo_alt || 'ZENAVA',
            subtitle_text || '企業與客戶對話場景的 AI 智能體',
            copyright_text || `© ${new Date().getFullYear()} ZENAVA. All rights reserved.`,
            status || 'published',
            lang
          ]);
        }
      }
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
  const sectionId = c.req.param('id');
  const language = c.req.query('lang') || 'zh';
  const body = await c.req.json();
  
  try {
    const { title, position, is_visible } = body;
    
    await mysqlQuery(`
      UPDATE footer_sections 
      SET title = ?, position = ?, is_visible = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [
      title,
      position,
      is_visible ? 1 : 0,
      sectionId
    ]);
    
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
  const sectionId = c.req.param('id');
  const language = c.req.query('lang') || 'zh';
  const body = await c.req.json();
  
  try {
    const { label, url, target, position } = body;
    
    const result: any = await mysqlQuery(`
      INSERT INTO footer_links (section_id, link_text, link_url, target, position)
      VALUES (?, ?, ?, ?, ?)
    `, [
      sectionId,
      label,
      url,
      target || '_self',
      position || 0
    ]);
    
    return c.json({ 
      success: true, 
      id: result.insertId 
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
  const linkId = c.req.param('id');
  const body = await c.req.json();
  
  try {
    const { label, url, target, position, is_visible } = body;
    
    await mysqlQuery(`
      UPDATE footer_links 
      SET link_text = ?, link_url = ?, target = ?, position = ?, is_visible = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [
      label,
      url,
      target || '_self',
      position || 0,
      is_visible ? 1 : 0,
      linkId
    ]);
    
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
  const linkId = c.req.param('id');
  
  try {
    await mysqlQuery(`
      DELETE FROM footer_links WHERE id = ?
    `, [linkId]);
    
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
  const language = c.req.query('lang') || 'zh';
  const body = await c.req.json();
  
  try {
    const { links } = body; // Array of { id, label, url, target, position, is_visible }
    
    // Update each link
    for (const link of links) {
      await mysqlQuery(`
        UPDATE footer_privacy_links 
        SET link_text = ?, link_url = ?, target = ?, is_visible = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `, [
        link.label,
        link.url,
        link.target || '_self',
        link.is_visible ? 1 : 0,
        link.id
      ]);
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
  const body = await c.req.json();
  const { type } = body; // 'navigation', 'footer', or 'all'
  
  try {
    // Update status to published for all languages
    if (type === 'navigation' || type === 'all') {
      await mysqlQuery(`
        UPDATE navigation_config 
        SET status = 'published', updated_at = CURRENT_TIMESTAMP
      `);
    }
    
    if (type === 'footer' || type === 'all') {
      await mysqlQuery(`
        UPDATE footer_config 
        SET status = 'published', updated_at = CURRENT_TIMESTAMP
      `);
    }
    
    // Clear any cached data by updating timestamps
    // This ensures immediate reflection of changes
    try {
      await mysqlQuery(`
        UPDATE page_content 
        SET updated_at = CURRENT_TIMESTAMP
      `);
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