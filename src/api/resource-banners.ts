import { Hono } from 'hono'
import { query as mysqlQuery } from '../lib/mysql.js'

const bannerApi = new Hono()

// 获取已发布的Banner列表（用于前端展示）
bannerApi.get('/published', async (c) => {
  try {
    const banners = await mysqlQuery<any[]>(
      `SELECT * FROM resource_banners 
       WHERE status = 'published' 
       ORDER BY sort_order ASC, id DESC 
       LIMIT 8`
    )
    
    return c.json({
      success: true,
      data: banners
    })
  } catch (error: any) {
    console.error('获取已发布Banner列表失败:', error)
    return c.json({ success: false, message: error.message }, 500)
  }
})

// 获取Banner列表（管理后台用）
bannerApi.get('/', async (c) => {
  try {
    const page = parseInt(c.req.query('page') || '1')
    const pageSize = parseInt(c.req.query('pageSize') || '20')
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
    const countSQL = `SELECT COUNT(*) as total FROM resource_banners ${whereSQL}`
    const countResult = await mysqlQuery<any[]>(countSQL, queryParams)
    const total = countResult[0]?.total || 0
    
    // 查询列表
    const listSQL = `
      SELECT * FROM resource_banners 
      ${whereSQL}
      ORDER BY sort_order ASC, id DESC
      LIMIT ? OFFSET ?
    `
    const banners = await mysqlQuery<any[]>(listSQL, [...queryParams, pageSize, offset])
    
    return c.json({
      success: true,
      data: {
        banners,
        pagination: {
          page,
          pageSize,
          total,
          totalPages: Math.ceil(total / pageSize)
        }
      }
    })
  } catch (error: any) {
    console.error('获取Banner列表失败:', error)
    return c.json({ success: false, message: error.message }, 500)
  }
})

// 获取单个Banner
bannerApi.get('/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const banners = await mysqlQuery<any[]>(
      'SELECT * FROM resource_banners WHERE id = ?',
      [id]
    )
    
    if (banners.length === 0) {
      return c.json({ success: false, message: 'Banner不存在' }, 404)
    }
    
    return c.json({ success: true, data: banners[0] })
  } catch (error: any) {
    console.error('获取Banner失败:', error)
    return c.json({ success: false, message: error.message }, 500)
  }
})

// 创建Banner
bannerApi.post('/', async (c) => {
  try {
    const body = await c.req.json()
    console.log('📥 [POST /api/resource-center/banners] 收到数据:', JSON.stringify(body).substring(0, 500) + '...');
    
    const {
      banner_type,
      title,
      sort_order = 0,
      status = 'draft',
      
      // 文字+图片模式
      text_title,
      text_subtitle,
      text_button,
      // 多语言字段
      text_title_zh, text_title_en, text_title_jp, text_title_hk,
      text_subtitle_zh, text_subtitle_en, text_subtitle_jp, text_subtitle_hk,
      text_button_zh, text_button_en, text_button_jp, text_button_hk,
      button_link,
      button_target = '_self',
      text_position = 'left',
      text_color = 'rgba(255,255,255,1)',
      subtitle_color = 'rgba(255,255,255,0.8)',
      image_url,
      background_type = 'image',
      background_url,
      
      // 整张大图模式
      full_image_url,
      link_url,
      link_target = '_self'
    } = body
    
    // 验证必填字段
    if (!banner_type || !title) {
      return c.json({ success: false, message: '请填写必填字段' }, 400)
    }
    
    const sql = `
      INSERT INTO resource_banners (
        banner_type, title, sort_order, status,
        text_title, text_subtitle, text_button,
        text_title_zh, text_title_en, text_title_jp, text_title_hk,
        text_subtitle_zh, text_subtitle_en, text_subtitle_jp, text_subtitle_hk,
        text_button_zh, text_button_en, text_button_jp, text_button_hk,
        button_link, button_target,
        text_position, text_color, subtitle_color, image_url, background_type, background_url,
        full_image_url, link_url, link_target
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `
    
    const result = await mysqlQuery(sql, [
      banner_type, title, sort_order, status,
      text_title || null, text_subtitle || null, text_button || null,
      // 多语言字段
      text_title_zh || null, text_title_en || null, text_title_jp || null, text_title_hk || null,
      text_subtitle_zh || null, text_subtitle_en || null, text_subtitle_jp || null, text_subtitle_hk || null,
      text_button_zh || null, text_button_en || null, text_button_jp || null, text_button_hk || null,
      button_link || null, button_target,
      text_position, text_color, subtitle_color, image_url || null, background_type, background_url || null,
      full_image_url || null, link_url || null, link_target
    ])
    
    console.log('✅ 创建Banner成功，ID:', (result as any).insertId);
    
    return c.json({ 
      success: true, 
      message: 'Banner创建成功',
      data: { id: (result as any).insertId }
    })
  } catch (error: any) {
    console.error('创建Banner失败:', error)
    return c.json({ success: false, message: error.message }, 500)
  }
})

// 更新Banner
bannerApi.put('/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const body = await c.req.json()
    console.log(`📥 [PUT /api/resource-center/banners/${id}] 收到数据:`, JSON.stringify(body).substring(0, 500) + '...');
    
    const {
      banner_type,
      title,
      sort_order = 0,
      status = 'draft',
      
      // 文字+图片模式
      text_title,
      text_subtitle,
      text_button,
      // 多语言字段
      text_title_zh, text_title_en, text_title_jp, text_title_hk,
      text_subtitle_zh, text_subtitle_en, text_subtitle_jp, text_subtitle_hk,
      text_button_zh, text_button_en, text_button_jp, text_button_hk,
      button_link,
      button_target = '_self',
      text_position = 'left',
      text_color = 'rgba(255,255,255,1)',
      subtitle_color = 'rgba(255,255,255,0.8)',
      image_url,
      background_type = 'image',
      background_url,
      
      // 整张大图模式
      full_image_url,
      link_url,
      link_target = '_self'
    } = body
    
    // 验证必填字段
    if (!banner_type || !title) {
      return c.json({ success: false, message: '请填写必填字段' }, 400)
    }
    
    const sql = `
      UPDATE resource_banners SET
        banner_type = ?, title = ?, sort_order = ?, status = ?,
        text_title = ?, text_subtitle = ?, text_button = ?,
        text_title_zh = ?, text_title_en = ?, text_title_jp = ?, text_title_hk = ?,
        text_subtitle_zh = ?, text_subtitle_en = ?, text_subtitle_jp = ?, text_subtitle_hk = ?,
        text_button_zh = ?, text_button_en = ?, text_button_jp = ?, text_button_hk = ?,
        button_link = ?, button_target = ?,
        text_position = ?, text_color = ?, subtitle_color = ?, image_url = ?, background_type = ?, background_url = ?,
        full_image_url = ?, link_url = ?, link_target = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `
    
    await mysqlQuery(sql, [
      banner_type, title, sort_order, status,
      text_title || null, text_subtitle || null, text_button || null,
      // 多语言字段
      text_title_zh || null, text_title_en || null, text_title_jp || null, text_title_hk || null,
      text_subtitle_zh || null, text_subtitle_en || null, text_subtitle_jp || null, text_subtitle_hk || null,
      text_button_zh || null, text_button_en || null, text_button_jp || null, text_button_hk || null,
      button_link || null, button_target,
      text_position, text_color, subtitle_color, image_url || null, background_type, background_url || null,
      full_image_url || null, link_url || null, link_target,
      id
    ])
    
    console.log('✅ 更新Banner成功，ID:', id);
    
    return c.json({ 
      success: true, 
      message: 'Banner更新成功'
    })
  } catch (error: any) {
    console.error('更新Banner失败:', error)
    return c.json({ success: false, message: error.message }, 500)
  }
})

// 删除Banner
bannerApi.delete('/:id', async (c) => {
  try {
    const id = c.req.param('id')
    
    await mysqlQuery('DELETE FROM resource_banners WHERE id = ?', [id])
    
    return c.json({ 
      success: true, 
      message: 'Banner删除成功'
    })
  } catch (error: any) {
    console.error('删除Banner失败:', error)
    return c.json({ success: false, message: error.message }, 500)
  }
})

// 批量操作
bannerApi.post('/batch', async (c) => {
  try {
    const { action, ids } = await c.req.json()
    
    if (!action || !ids || ids.length === 0) {
      return c.json({ success: false, message: '参数错误' }, 400)
    }
    
    const placeholders = ids.map(() => '?').join(',')
    
    switch (action) {
      case 'delete':
        await mysqlQuery(
          `DELETE FROM resource_banners WHERE id IN (${placeholders})`,
          ids
        )
        break
      
      case 'publish':
        await mysqlQuery(
          `UPDATE resource_banners SET status = 'published' WHERE id IN (${placeholders})`,
          ids
        )
        break
      
      case 'draft':
        await mysqlQuery(
          `UPDATE resource_banners SET status = 'draft' WHERE id IN (${placeholders})`,
          ids
        )
        break
      
      default:
        return c.json({ success: false, message: '无效的操作' }, 400)
    }
    
    return c.json({ 
      success: true, 
      message: '批量操作成功'
    })
  } catch (error: any) {
    console.error('批量操作失败:', error)
    return c.json({ success: false, message: error.message }, 500)
  }
})

export default bannerApi

