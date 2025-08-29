import { Hono } from 'hono'
import { cors } from 'hono/cors'

// Define the Cloudflare Bindings
type Bindings = {
  DB: D1Database;
}

const app = new Hono<{ Bindings: Bindings }>()

// Enable CORS
app.use('/api/*', cors())

// API: Get all agents
app.get('/api/agents', async (c) => {
  try {
    const { results } = await c.env.DB.prepare(
      `SELECT id, name, description, type, status 
       FROM agents 
       WHERE status = 'active'`
    ).all();
    
    return c.json({ success: true, data: results });
  } catch (error) {
    return c.json({ success: false, error: error.message }, 500);
  }
});

// API: Create new agent
app.post('/api/agents', async (c) => {
  try {
    const { name, description, type, config, user_id } = await c.req.json();
    
    const result = await c.env.DB.prepare(
      `INSERT INTO agents (name, description, type, config, user_id) 
       VALUES (?, ?, ?, ?, ?)`
    ).bind(name, description, type, JSON.stringify(config), user_id).run();
    
    return c.json({ 
      success: true, 
      data: { id: result.meta.last_row_id, name, description, type }
    });
  } catch (error) {
    return c.json({ success: false, error: error.message }, 500);
  }
});

// API: Get conversation history
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
  } catch (error) {
    return c.json({ success: false, error: error.message }, 500);
  }
});

// API: Save message
app.post('/api/messages', async (c) => {
  try {
    const { conversation_id, sender_type, content, metadata } = await c.req.json();
    
    const result = await c.env.DB.prepare(
      `INSERT INTO messages (conversation_id, sender_type, content, metadata) 
       VALUES (?, ?, ?, ?)`
    ).bind(conversation_id, sender_type, content, JSON.stringify(metadata)).run();
    
    return c.json({ 
      success: true, 
      data: { id: result.meta.last_row_id, conversation_id, sender_type, content }
    });
  } catch (error) {
    return c.json({ success: false, error: error.message }, 500);
  }
});

// API: Get analytics
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
  } catch (error) {
    return c.json({ success: false, error: error.message }, 500);
  }
});

// API: Database health check
app.get('/api/db/health', async (c) => {
  try {
    const result = await c.env.DB.prepare('SELECT 1 as health').first();
    return c.json({ 
      success: true, 
      status: 'healthy',
      database: 'D1 SQLite',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return c.json({ 
      success: false, 
      status: 'unhealthy',
      error: error.message 
    }, 500);
  }
});

export default app;