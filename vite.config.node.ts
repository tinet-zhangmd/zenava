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
      external: (id) => {
        // 将 Node.js 内置模块标记为 external
        const nodeBuiltins = [
          'fs', 'fs/promises', 'path', 'crypto', 'node:crypto',
          'events', 'process', 'net', 'tls', 'timers', 'stream',
          'buffer', 'zlib', 'util', 'url', 'os', 'string_decoder'
        ]
        if (nodeBuiltins.includes(id) || id.startsWith('node:')) {
          return true
        }
        // 将所有 node_modules 中的包标记为 external（不以 . 或 / 开头的都是外部包）
        if (!id.startsWith('.') && !id.startsWith('/')) {
          return true
        }
        return false
      },
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

