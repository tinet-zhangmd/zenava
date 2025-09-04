// PM2 配置文件 - 简化版本（仅作参考，实际使用pm2-start.sh）
// 这个配置文件演示了如何配置，但建议直接使用pm2命令

module.exports = {
  apps: [
    {
      name: 'zenava-webapp',
      // 直接使用shell命令
      script: 'bash',
      args: '-c "npx wrangler pages dev dist --ip 0.0.0.0 --port 3000"',
      
      // 或者使用npm脚本
      // script: 'npm',
      // args: 'run dev:sandbox',
      
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      
      // 基本配置
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      
      // 日志
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      error_file: 'logs/error.log',
      out_file: 'logs/out.log',
      merge_logs: true,
      
      // 重启策略
      min_uptime: '10s',
      max_restarts: 10
    }
  ]
}

// 注意：如果这个配置文件不工作，请使用以下命令直接启动：
// pm2 start npx --name zenava-webapp -- wrangler pages dev dist --ip 0.0.0.0 --port 3000