import { Hono } from 'hono'
import { query } from '../lib/mysql.js'

const app = new Hono()

// ============================================
// 栏目分类 API
// ============================================

// 获取所有栏目分类
app.get('/categories', async (c) => {
  try {
    const categories = await query<any[]>(
      `SELECT id, sort_order, name, slug, list_template, detail_template, is_visible, created_at, updated_at 
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

// 获取单个栏目
app.get('/categories/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const [category] = await query<any[]>(
      `SELECT * FROM resource_categories WHERE id = ?`,
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
    console.error('获取栏目失败:', error)
    return c.json({ 
      success: false, 
      error: error.message 
    }, 500)
  }
})

// 创建栏目
app.post('/categories', async (c) => {
  try {
    const { sort_order, name, slug, list_template, detail_template, is_visible } = await c.req.json()
    
    // 验证必填字段
    if (!name || !slug || !list_template || !detail_template) {
      return c.json({ 
        success: false, 
        error: '缺少必填字段' 
      }, 400)
    }
    
    const result: any = await query(
      `INSERT INTO resource_categories (sort_order, name, slug, list_template, detail_template, is_visible) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [sort_order || 0, name, slug, list_template, detail_template, is_visible !== false]
    )
    
    return c.json({ 
      success: true, 
      data: { 
        id: result.insertId,
        sort_order,
        name,
        slug,
        list_template,
        detail_template,
        is_visible
      }
    })
  } catch (error: any) {
    console.error('创建栏目失败:', error)
    return c.json({ 
      success: false, 
      error: error.code === 'ER_DUP_ENTRY' ? '链接(slug)已存在' : error.message 
    }, 500)
  }
})

// 更新栏目
app.put('/categories/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const { sort_order, name, slug, list_template, detail_template, is_visible } = await c.req.json()
    
    const result: any = await query(
      `UPDATE resource_categories 
       SET sort_order = ?, name = ?, slug = ?, list_template = ?, detail_template = ?, is_visible = ?
       WHERE id = ?`,
      [sort_order, name, slug, list_template, detail_template, is_visible, id]
    )
    
    if (result.affectedRows === 0) {
      return c.json({ 
        success: false, 
        error: '栏目不存在' 
      }, 404)
    }
    
    return c.json({ 
      success: true, 
      data: { id, sort_order, name, slug, list_template, detail_template, is_visible }
    })
  } catch (error: any) {
    console.error('更新栏目失败:', error)
    return c.json({ 
      success: false, 
      error: error.code === 'ER_DUP_ENTRY' ? '链接(slug)已存在' : error.message 
    }, 500)
  }
})

// 更新栏目排序
app.patch('/categories/:id/sort', async (c) => {
  try {
    const id = c.req.param('id')
    const { sort_order } = await c.req.json()
    
    await query(
      `UPDATE resource_categories SET sort_order = ? WHERE id = ?`,
      [sort_order, id]
    )
    
    return c.json({ 
      success: true 
    })
  } catch (error: any) {
    console.error('更新排序失败:', error)
    return c.json({ 
      success: false, 
      error: error.message 
    }, 500)
  }
})

// 删除栏目
app.delete('/categories/:id', async (c) => {
  try {
    const id = c.req.param('id')
    
    // 检查是否有关联内容
    const [contents] = await query<any[]>(
      `SELECT COUNT(*) as count FROM resource_contents WHERE category_id = ?`,
      [id]
    )
    
    if (contents.count > 0) {
      return c.json({ 
        success: false, 
        error: `该栏目下还有 ${contents.count} 个内容，无法删除` 
      }, 400)
    }
    
    const result: any = await query(
      `DELETE FROM resource_categories WHERE id = ?`,
      [id]
    )
    
    if (result.affectedRows === 0) {
      return c.json({ 
        success: false, 
        error: '栏目不存在' 
      }, 404)
    }
    
    return c.json({ 
      success: true 
    })
  } catch (error: any) {
    console.error('删除栏目失败:', error)
    return c.json({ 
      success: false, 
      error: error.message 
    }, 500)
  }
})

// 批量操作栏目
app.post('/categories/batch', async (c) => {
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
        // 检查是否有关联内容
        const [contentsCheck] = await query<any[]>(
          `SELECT COUNT(*) as count FROM resource_contents WHERE category_id IN (${placeholders})`,
          ids
        )
        
        if (contentsCheck.count > 0) {
          return c.json({ 
            success: false, 
            error: `选中的栏目下还有 ${contentsCheck.count} 个内容，无法删除` 
          }, 400)
        }
        
        await query(
          `DELETE FROM resource_categories WHERE id IN (${placeholders})`,
          ids
        )
        break
        
      case 'show':
        await query(
          `UPDATE resource_categories SET is_visible = TRUE WHERE id IN (${placeholders})`,
          ids
        )
        break
        
      case 'hide':
        await query(
          `UPDATE resource_categories SET is_visible = FALSE WHERE id IN (${placeholders})`,
          ids
        )
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
    console.error('批量操作失败:', error)
    return c.json({ 
      success: false, 
      error: error.message 
    }, 500)
  }
})

// ============================================
// 内容 API
// ============================================

// 获取所有内容（支持筛选和分页）
app.get('/contents', async (c) => {
  try {
    const category_id = c.req.query('category_id')
    const status = c.req.query('status')
    const search = c.req.query('search')
    const page = parseInt(c.req.query('page') || '1')
    const limit = parseInt(c.req.query('limit') || '20')
    const offset = (page - 1) * limit
    
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
    
    sql += ` ORDER BY c.created_at DESC LIMIT ? OFFSET ?`
    params.push(limit, offset)
    
    const contents = await query<any[]>(sql, params)
    
    // 获取总数
    let countSql = `SELECT COUNT(*) as total FROM resource_contents c WHERE 1=1`
    const countParams: any[] = []
    
    if (category_id) {
      countSql += ` AND c.category_id = ?`
      countParams.push(category_id)
    }
    
    if (status) {
      countSql += ` AND c.status = ?`
      countParams.push(status)
    }
    
    if (search) {
      countSql += ` AND (c.title LIKE ? OR c.author LIKE ?)`
      countParams.push(`%${search}%`, `%${search}%`)
    }
    
    const [countResult] = await query<any[]>(countSql, countParams)
    
    return c.json({ 
      success: true, 
      data: contents,
      pagination: {
        page,
        limit,
        total: countResult.total,
        totalPages: Math.ceil(countResult.total / limit)
      }
    })
  } catch (error: any) {
    console.error('获取内容列表失败:', error)
    return c.json({ 
      success: false, 
      error: error.message 
    }, 500)
  }
})

// 获取单个内容
app.get('/contents/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const [content] = await query<any[]>(
      `SELECT c.*, cat.name as category_name
       FROM resource_contents c
       LEFT JOIN resource_categories cat ON c.category_id = cat.id
       WHERE c.id = ?`,
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
    console.error('获取内容失败:', error)
    return c.json({ 
      success: false, 
      error: error.message 
    }, 500)
  }
})

// 创建内容
app.post('/contents', async (c) => {
  try {
    const data = await c.req.json()
    console.log('📥 [POST /contents] 收到原始数据:', JSON.stringify(data).substring(0, 500) + '...');
    
    // 验证必填字段
    if (!data.category_id || !data.title) {
      return c.json({ success: false, error: '缺少必填字段' }, 400)
    }
    
    // 明确定义所有允许存入数据库的字段
    const allowedColumns = [
      'category_id', 'title', 'slug', 'cover_image', 'author', 'published_at', 
      'status', 'is_featured', 'sort_order', 'reading_time',
      'title_zh', 'title_en', 'title_jp', 'title_hk',
      'content_zh', 'content_en', 'content_jp', 'content_hk',
      'cover_image_zh', 'cover_image_en', 'cover_image_jp', 'cover_image_hk',
      'meta_title_zh', 'meta_title_en', 'meta_title_jp', 'meta_title_hk',
      'meta_description_zh', 'meta_description_en', 'meta_description_jp', 'meta_description_hk',
      'meta_keywords_zh', 'meta_keywords_en', 'meta_keywords_jp', 'meta_keywords_hk',
      'meta_title', 'meta_description', 'meta_keywords',
      'content', 'video_file', 'attachment_file'
    ]
    
    // 过滤掉不在 allowedColumns 中的字段（如 id）
    const finalData: any = {}
    allowedColumns.forEach(col => {
      if (data[col] !== undefined) {
        // 处理日期
        if (col === 'published_at' && data[col]) {
          finalData[col] = data[col].replace('T', ' ');
        } else {
          finalData[col] = data[col];
        }
      }
    })

    const columns = Object.keys(finalData)
    const values = Object.values(finalData)
    const placeholders = columns.map(() => '?').join(', ')
    
    const sql = `INSERT INTO resource_contents (${columns.map(c => `\`${c}\``).join(', ')}) VALUES (${placeholders})`
    console.log('📝 执行 SQL:', sql);
    console.log('📊 字段列表 (columns):', columns);
    console.log('📊 值列表 (values):', values);
    console.log('📊 finalData 对象:', JSON.stringify(finalData, null, 2));
    
    const result: any = await query(sql, values)
    
    return c.json({ 
      success: true, 
      data: { id: result.insertId }
    })
  } catch (error: any) {
    console.error('❌ 创建内容失败:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

// 更新内容
app.put('/contents/:id', async (c) => {
  try {
    const id = c.req.param('id')
    const data = await c.req.json()
    console.log(`📥 [PUT /contents/${id}] 收到原始数据:`, JSON.stringify(data).substring(0, 500) + '...');
    
    const allowedColumns = [
      'category_id', 'title', 'slug', 'cover_image', 'author', 'published_at', 
      'status', 'is_featured', 'sort_order', 'reading_time',
      'title_zh', 'title_en', 'title_jp', 'title_hk',
      'content_zh', 'content_en', 'content_jp', 'content_hk',
      'cover_image_zh', 'cover_image_en', 'cover_image_jp', 'cover_image_hk',
      'meta_title_zh', 'meta_title_en', 'meta_title_jp', 'meta_title_hk',
      'meta_description_zh', 'meta_description_en', 'meta_description_jp', 'meta_description_hk',
      'meta_keywords_zh', 'meta_keywords_en', 'meta_keywords_jp', 'meta_keywords_hk',
      'meta_title', 'meta_description', 'meta_keywords',
      'content', 'video_file', 'attachment_file'
    ]
    
    const updateData: any = {}
    allowedColumns.forEach(col => {
      if (data[col] !== undefined) {
        if (col === 'published_at' && data[col]) {
          updateData[col] = data[col].replace('T', ' ');
        } else {
          updateData[col] = data[col];
        }
      }
    })

    const columns = Object.keys(updateData)
    const values = Object.values(updateData)
    const setClause = columns.map(col => `\`${col}\` = ?`).join(', ')
    values.push(id)
    
    const sql = `UPDATE resource_contents SET ${setClause} WHERE id = ?`
    console.log('📝 执行 SQL:', sql);
    
    const result: any = await query(sql, values)
    
    if (result.affectedRows === 0) {
      return c.json({ success: false, error: '内容不存在' }, 404)
    }
    
    return c.json({ success: true, data: { id } })
  } catch (error: any) {
    console.error('❌ 更新内容失败:', error)
    return c.json({ success: false, error: error.message }, 500)
  }
})

// 删除内容
app.delete('/contents/:id', async (c) => {
  try {
    const id = c.req.param('id')
    
    const result: any = await query(
      `DELETE FROM resource_contents WHERE id = ?`,
      [id]
    )
    
    if (result.affectedRows === 0) {
      return c.json({ 
        success: false, 
        error: '内容不存在' 
      }, 404)
    }
    
    return c.json({ 
      success: true 
    })
  } catch (error: any) {
    console.error('删除内容失败:', error)
    return c.json({ 
      success: false, 
      error: error.message 
    }, 500)
  }
})

// 批量操作内容
app.post('/contents/batch', async (c) => {
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
        await query(
          `DELETE FROM resource_contents WHERE id IN (${placeholders})`,
          ids
        )
        break
        
      case 'publish':
        await query(
          `UPDATE resource_contents SET status = 'published' WHERE id IN (${placeholders})`,
          ids
        )
        break
        
      case 'draft':
        await query(
          `UPDATE resource_contents SET status = 'draft' WHERE id IN (${placeholders})`,
          ids
        )
        break
        
      case 'feature':
        await query(
          `UPDATE resource_contents SET is_featured = TRUE WHERE id IN (${placeholders})`,
          ids
        )
        break
        
      case 'unfeature':
        await query(
          `UPDATE resource_contents SET is_featured = FALSE WHERE id IN (${placeholders})`,
          ids
        )
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
    console.error('批量操作失败:', error)
    return c.json({ 
      success: false, 
      error: error.message 
    }, 500)
  }
})

// 增加浏览次数
app.post('/contents/:id/view', async (c) => {
  try {
    const id = c.req.param('id')
    
    await query(
      `UPDATE resource_contents SET views = views + 1 WHERE id = ?`,
      [id]
    )
    
    return c.json({ 
      success: true 
    })
  } catch (error: any) {
    console.error('增加浏览次数失败:', error)
    return c.json({ 
      success: false, 
      error: error.message 
    }, 500)
  }
})

export default app
