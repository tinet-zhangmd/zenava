import { Hono } from 'hono'
import { cors } from 'hono/cors'
import type { D1Database } from '@cloudflare/workers-types'

const navigation = new Hono<{ Bindings: { DB: D1Database } }>()

navigation.use('/*', cors())

// Get navigation configuration and menu items
navigation.get('/config', async (c) => {
  try {
    // Get navigation configuration
    const configResult = await c.env.DB.prepare(`
      SELECT * FROM navigation_config WHERE id = 1 AND status = 'published'
    `).first()
    
    // Get menu items
    const menuItems = await c.env.DB.prepare(`
      SELECT * FROM navigation_menu_items 
      WHERE visible = 1 
      ORDER BY order_index
    `).all()
    
    // Get submenu items for each dropdown menu
    const menuItemsWithChildren = await Promise.all(
      menuItems.results.map(async (item) => {
        if (item.type === 'dropdown') {
          const children = await c.env.DB.prepare(`
            SELECT * FROM navigation_submenu_items 
            WHERE parent_id = ? AND visible = 1 
            ORDER BY order_index
          `).bind(item.id).all()
          
          return {
            ...item,
            children: children.results
          }
        }
        return item
      })
    )
    
    // Parse available languages
    let availableLanguages = ['en', 'jp', 'hk']
    if (configResult?.available_languages) {
      try {
        availableLanguages = JSON.parse(configResult.available_languages as string)
      } catch (e) {
        console.error('Error parsing available_languages:', e)
      }
    }
    
    return c.json({
      success: true,
      config: {
        ...configResult,
        available_languages: availableLanguages
      },
      menuItems: menuItemsWithChildren
    })
  } catch (error: any) {
    console.error('Error fetching navigation config:', error)
    return c.json({
      success: false,
      error: error.message
    }, 500)
  }
})

// Get draft navigation configuration for admin
navigation.get('/config/draft', async (c) => {
  try {
    const configResult = await c.env.DB.prepare(`
      SELECT * FROM navigation_config WHERE id = 1
    `).first()
    
    const menuItems = await c.env.DB.prepare(`
      SELECT * FROM navigation_menu_items ORDER BY order_index
    `).all()
    
    const menuItemsWithChildren = await Promise.all(
      menuItems.results.map(async (item) => {
        if (item.type === 'dropdown') {
          const children = await c.env.DB.prepare(`
            SELECT * FROM navigation_submenu_items 
            WHERE parent_id = ? 
            ORDER BY order_index
          `).bind(item.id).all()
          
          return {
            ...item,
            children: children.results
          }
        }
        return item
      })
    )
    
    let availableLanguages = ['en', 'jp', 'hk']
    if (configResult?.available_languages) {
      try {
        availableLanguages = JSON.parse(configResult.available_languages as string)
      } catch (e) {
        console.error('Error parsing available_languages:', e)
      }
    }
    
    return c.json({
      success: true,
      config: {
        ...configResult,
        available_languages: availableLanguages
      },
      menuItems: menuItemsWithChildren
    })
  } catch (error: any) {
    return c.json({
      success: false,
      error: error.message
    }, 500)
  }
})

// Update navigation configuration
navigation.post('/config', async (c) => {
  try {
    const body = await c.req.json()
    const { config, menuItems } = body
    
    // Update navigation configuration
    if (config) {
      const availableLanguages = JSON.stringify(config.available_languages || ['en', 'jp', 'hk'])
      
      await c.env.DB.prepare(`
        INSERT OR REPLACE INTO navigation_config (
          id, logo_url, logo_alt, logo_height, logo_max_width,
          nav_bg_color, nav_text_color, nav_hover_color, nav_border_color,
          nav_shadow, nav_blur, nav_fixed,
          dropdown_bg_color, dropdown_text_color, dropdown_hover_bg,
          dropdown_border_radius, dropdown_shadow,
          mobile_menu_enabled, mobile_breakpoint,
          cta_enabled, cta_text, cta_text_en, cta_text_jp, cta_text_hk,
          cta_url, cta_bg_color, cta_text_color, cta_hover_bg,
          show_language_switcher, available_languages,
          status, updated_at
        ) VALUES (
          1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP
        )
      `).bind(
        config.logo_url,
        config.logo_alt,
        config.logo_height,
        config.logo_max_width,
        config.nav_bg_color,
        config.nav_text_color,
        config.nav_hover_color,
        config.nav_border_color,
        config.nav_shadow,
        config.nav_blur ? 1 : 0,
        config.nav_fixed ? 1 : 0,
        config.dropdown_bg_color,
        config.dropdown_text_color,
        config.dropdown_hover_bg,
        config.dropdown_border_radius,
        config.dropdown_shadow,
        config.mobile_menu_enabled ? 1 : 0,
        config.mobile_breakpoint,
        config.cta_enabled ? 1 : 0,
        config.cta_text,
        config.cta_text_en,
        config.cta_text_jp,
        config.cta_text_hk,
        config.cta_url,
        config.cta_bg_color,
        config.cta_text_color,
        config.cta_hover_bg,
        config.show_language_switcher ? 1 : 0,
        availableLanguages,
        config.status || 'draft'
      ).run()
    }
    
    // Update menu items
    if (menuItems) {
      // Delete all existing items first
      await c.env.DB.prepare('DELETE FROM navigation_submenu_items').run()
      await c.env.DB.prepare('DELETE FROM navigation_menu_items').run()
      
      // Insert new menu items
      for (const item of menuItems) {
        await c.env.DB.prepare(`
          INSERT INTO navigation_menu_items (
            id, type, label, label_en, label_jp, label_hk,
            url, icon, target, order_index, visible
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(
          item.id,
          item.type,
          item.label,
          item.label_en,
          item.label_jp,
          item.label_hk,
          item.url,
          item.icon,
          item.target || '_self',
          item.order,
          item.visible ? 1 : 0
        ).run()
        
        // Insert submenu items if any
        if (item.children && item.children.length > 0) {
          for (const child of item.children) {
            await c.env.DB.prepare(`
              INSERT INTO navigation_submenu_items (
                id, parent_id, label, label_en, label_jp, label_hk,
                description, description_en, description_jp, description_hk,
                url, icon, target, order_index, visible
              ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `).bind(
              child.id,
              item.id,
              child.label,
              child.label_en,
              child.label_jp,
              child.label_hk,
              child.description,
              child.description_en,
              child.description_jp,
              child.description_hk,
              child.url,
              child.icon,
              child.target || '_self',
              child.order,
              child.visible ? 1 : 0
            ).run()
          }
        }
      }
    }
    
    return c.json({
      success: true,
      message: 'Navigation configuration updated successfully'
    })
  } catch (error: any) {
    console.error('Error updating navigation config:', error)
    return c.json({
      success: false,
      error: error.message
    }, 500)
  }
})

// Publish navigation configuration
navigation.post('/publish', async (c) => {
  try {
    await c.env.DB.prepare(`
      UPDATE navigation_config 
      SET status = 'published', updated_at = CURRENT_TIMESTAMP 
      WHERE id = 1
    `).run()
    
    return c.json({
      success: true,
      message: 'Navigation configuration published successfully'
    })
  } catch (error: any) {
    return c.json({
      success: false,
      error: error.message
    }, 500)
  }
})

export { navigation }