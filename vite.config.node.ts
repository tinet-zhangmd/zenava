/**
 * Node.js 构建配置
 * 用于生成可在 Node.js 环境运行的代码
 */

import { defineConfig } from 'vite'
import { resolve, normalize } from 'path'

const entryPath = normalize(resolve(__dirname, 'src/index-node.tsx'))

export default defineConfig({
  build: {
    outDir: 'dist-node',
    lib: {
      entry: entryPath,
      formats: ['es'],
      fileName: (format) => {
        // 使用 hash 生成文件名，避免缓存问题
        // format 参数在这里是 'es'，但我们不使用它
        return 'index-node.[hash]'
      }
    },
    rollupOptions: {
      external: (id) => {
        // 入口模块不能被标记为 external
        // 检查是否是入口文件的路径（支持相对路径和绝对路径）
        const normalizedId = normalize(id)
        if (normalizedId === entryPath || normalizedId.includes('index-node.tsx')) {
          return false
        }
        
        // 本地源文件（src/ 目录下的文件）不能被标记为 external
        if (id.startsWith('src/') || id.startsWith('./src/') || id.startsWith('../src/')) {
          return false
        }
        
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
        // 但排除本地源文件
        if (!id.startsWith('.') && !id.startsWith('/')) {
          return true
        }
        return false
      },
      output: {
        format: 'es',
        // 启用文件名的 hash，避免缓存问题
        entryFileNames: 'index-node.[hash].js'
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})

