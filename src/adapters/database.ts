/**
 * 数据库适配器
 * 将 better-sqlite3 适配为 Cloudflare D1 兼容的 API
 */

import Database from 'better-sqlite3'

// D1 兼容的数据库接口
export interface D1CompatibleDatabase {
  prepare(query: string): {
    bind(...params: any[]): {
      all(): Promise<{ results: any[]; success: boolean }>
      first(): Promise<any>
      run(): Promise<{ success: boolean; meta: { last_row_id?: number; changes?: number } }>
    }
    all(): Promise<{ results: any[]; success: boolean }>
    first(): Promise<any>
    run(): Promise<{ success: boolean; meta: { last_row_id?: number; changes?: number } }>
  }
  exec(query: string): Promise<void>
  batch(statements: any[]): Promise<any[]>
}

// SQLite 适配器 - 模拟 D1 API
export class SQLiteD1Adapter implements D1CompatibleDatabase {
  constructor(private db: Database.Database) {}

  prepare(query: string) {
    const stmt = this.db.prepare(query)
    
    return {
      bind: (...params: any[]) => ({
        all: async () => {
          const results = stmt.all(...params) as any[]
          return { results, success: true }
        },
        first: async () => {
          return stmt.get(...params) as any
        },
        run: async () => {
          const result = stmt.run(...params) as Database.RunResult
          return {
            success: true,
            meta: {
              last_row_id: Number(result.lastInsertRowid),
              changes: result.changes
            }
          }
        }
      }),
      all: async () => {
        const results = stmt.all() as any[]
        return { results, success: true }
      },
      first: async () => {
        return stmt.get() as any
      },
      run: async () => {
        const result = stmt.run() as Database.RunResult
        return {
          success: true,
          meta: {
            last_row_id: Number(result.lastInsertRowid),
            changes: result.changes
          }
        }
      }
    }
  }

  async exec(query: string) {
    this.db.exec(query)
  }

  async batch(statements: any[]) {
    const results = []
    for (const stmt of statements) {
      if (stmt.bind) {
        results.push(await stmt.bind(...(stmt.params || [])).run())
      } else {
        results.push(await stmt.run())
      }
    }
    return results
  }
}

// 创建适配器实例
export function createD1CompatibleDatabase(dbPath?: string): D1CompatibleDatabase {
  const path = dbPath || process.env.DB_PATH || 'data/zenava.db'
  const db = new Database(path)
  
  // 启用外键约束
  db.pragma('foreign_keys = ON')
  
  return new SQLiteD1Adapter(db)
}

