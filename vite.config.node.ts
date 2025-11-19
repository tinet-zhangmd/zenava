/**
 * Node.js 构建配置
 * 用于生成可在 Node.js 环境运行的代码
 */

import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    outDir: 'dist-node',
    lib: {
      entry: resolve(__dirname, 'src/index-node.tsx'),
      formats: ['es'],
      fileName: 'index-node'
    },
    rollupOptions: {
      external: ['better-sqlite3', '@hono/node-server'],
      output: {
        format: 'es'
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})

