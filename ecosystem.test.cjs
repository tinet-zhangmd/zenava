// PM2 配置文件 - 测试环境
module.exports = {
  apps: [
    {
      name: 'zenava-webapp-test',
      script: 'npx',
      args: 'wrangler pages dev dist --ip 0.0.0.0 --port 3000',
      cwd: process.cwd(),
      env: {
        NODE_ENV: 'test',
        PORT: 3000
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      // PM2配置选项
      watch: false,
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      max_memory_restart: '1G',
      
      // 日志配置
      error_file: './logs/pm2-error-test.log',
      out_file: './logs/pm2-out-test.log',
      log_file: './logs/pm2-combined-test.log',
      time: true,
      merge_logs: true,
      
      // 启动超时和重试
      min_uptime: '10s',
      max_restarts: 10,
      
      // 测试环境特定配置
      kill_timeout: 5000,
      listen_timeout: 10000
    }
  ]
}

