-- Initial schema for Zenava AI Agent Platform

-- Users table - 用户表
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  company TEXT,
  role TEXT,
  password_hash TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- AI Agents table - AI代理表
CREATE TABLE IF NOT EXISTS agents (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL, -- 'customer_service', 'sales', 'support', etc.
  status TEXT DEFAULT 'active', -- 'active', 'inactive', 'training'
  config JSON, -- AI configuration and parameters
  user_id INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Conversations table - 对话记录表
CREATE TABLE IF NOT EXISTS conversations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  agent_id INTEGER NOT NULL,
  customer_id TEXT,
  customer_name TEXT,
  status TEXT DEFAULT 'active', -- 'active', 'completed', 'archived'
  started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  ended_at DATETIME,
  metadata JSON, -- Additional conversation metadata
  FOREIGN KEY (agent_id) REFERENCES agents(id)
);

-- Messages table - 消息记录表
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  conversation_id INTEGER NOT NULL,
  sender_type TEXT NOT NULL, -- 'agent', 'customer', 'system'
  content TEXT NOT NULL,
  metadata JSON, -- Intent, sentiment, etc.
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (conversation_id) REFERENCES conversations(id)
);

-- Analytics table - 分析数据表
CREATE TABLE IF NOT EXISTS analytics (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  agent_id INTEGER,
  date DATE NOT NULL,
  total_conversations INTEGER DEFAULT 0,
  resolved_issues INTEGER DEFAULT 0,
  avg_response_time REAL, -- in seconds
  customer_satisfaction REAL, -- 0-5 rating
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (agent_id) REFERENCES agents(id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_agents_user_id ON agents(user_id);
CREATE INDEX IF NOT EXISTS idx_conversations_agent_id ON conversations(agent_id);
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_analytics_agent_date ON analytics(agent_id, date);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);