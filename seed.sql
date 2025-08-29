-- Seed data for development

-- Insert test users
INSERT OR IGNORE INTO users (email, name, company, role, password_hash) VALUES 
  ('admin@zenava.com', 'Admin User', 'Zenava', 'admin', 'hashed_password_1'),
  ('demo@example.com', 'Demo User', 'Example Corp', 'manager', 'hashed_password_2'),
  ('test@company.com', 'Test User', 'Test Company', 'operator', 'hashed_password_3');

-- Insert AI agents
INSERT OR IGNORE INTO agents (name, description, type, status, config, user_id) VALUES 
  ('Customer Service Bot', 'Professional customer service AI agent', 'customer_service', 'active', 
   '{"language": "zh-CN", "response_style": "professional", "max_tokens": 500}', 1),
  ('Sales Assistant', 'AI-powered sales assistant', 'sales', 'active',
   '{"language": "en-US", "response_style": "friendly", "max_tokens": 600}', 2),
  ('Technical Support', 'Technical support specialist', 'support', 'training',
   '{"language": "zh-CN", "response_style": "technical", "max_tokens": 800}', 1);

-- Insert sample conversations
INSERT OR IGNORE INTO conversations (agent_id, customer_id, customer_name, status, metadata) VALUES
  (1, 'cust_001', 'Zhang Wei', 'completed', '{"source": "web_chat", "region": "China"}'),
  (1, 'cust_002', 'Li Ming', 'active', '{"source": "mobile_app", "region": "China"}'),
  (2, 'cust_003', 'John Smith', 'completed', '{"source": "email", "region": "USA"}');

-- Insert sample messages
INSERT OR IGNORE INTO messages (conversation_id, sender_type, content, metadata) VALUES
  (1, 'customer', 'Hello, I need help with my order', '{"intent": "order_inquiry"}'),
  (1, 'agent', 'Hello! I would be happy to help you with your order. Could you provide your order number?', '{"sentiment": "positive"}'),
  (2, 'customer', 'My product is not working', '{"intent": "technical_support"}'),
  (2, 'agent', 'I understand you are having issues. Let me help you troubleshoot.', '{"sentiment": "neutral"}');

-- Insert sample analytics
INSERT OR IGNORE INTO analytics (agent_id, date, total_conversations, resolved_issues, avg_response_time, customer_satisfaction) VALUES
  (1, date('now', '-1 day'), 45, 42, 3.5, 4.8),
  (1, date('now'), 38, 35, 3.2, 4.9),
  (2, date('now', '-1 day'), 30, 28, 4.1, 4.6);