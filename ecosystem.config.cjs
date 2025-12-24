// PM2 配置文件 - 仅供参考
// 注意：在某些环境下，PM2可能无法正确解析此文件
// 推荐使用 pm2-start.sh 脚本或直接命令方式启动

module.exports = {
  apps: [
    {
      name: 'zenava-webapp',
      script: 'tsx',
      args: 'server.js',
      cwd: process.cwd(),
      env: {
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
      error_file: './logs/pm2-error.log',
      out_file: './logs/pm2-out.log',
      log_file: './logs/pm2-combined.log',
      time: true,
      merge_logs: true,
      
      // 启动超时和重试
      min_uptime: '10s',
      max_restarts: 10
    }
  ]
}