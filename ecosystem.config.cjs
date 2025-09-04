// PM2 配置文件
// 使用方法: pm2 start ecosystem.config.cjs

module.exports = {
  apps: [
    {
      name: 'zenava-webapp',
      script: 'npx',
      // 简化版本 - 不使用D1数据库，与 npm run dev:sandbox 命令一致
      args: 'wrangler pages dev dist --ip 0.0.0.0 --port 3000',
      
      // 设置工作目录
      cwd: '/data/working/www/zenava/webapp',
      
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      
      // PM2配置选项
      watch: false,           // 禁用文件监控（wrangler自带热重载）
      instances: 1,           // 单实例运行
      exec_mode: 'fork',      // fork模式（不使用cluster）
      autorestart: true,      // 崩溃后自动重启
      max_memory_restart: '1G', // 内存超过1G自动重启
      
      // 日志配置
      error_file: './logs/pm2-error.log',
      out_file: './logs/pm2-out.log',
      log_file: './logs/pm2-combined.log',
      time: true,             // 日志添加时间戳
      merge_logs: true,       // 合并日志
      
      // 启动超时和重试
      min_uptime: '10s',      // 最小运行时间
      max_restarts: 10,       // 最大重启次数
      
      // 解释器参数
      interpreter: 'node',
      interpreter_args: '',
      
      // 如果需要使用D1数据库，取消下面这行的注释并注释上面的args
      // args: 'wrangler pages dev dist --d1=zenava-production --local --ip 0.0.0.0 --port 3000',
      
      // 环境变量（可以在这里添加更多）
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      env_development: {
        NODE_ENV: 'development',
        PORT: 3000
      }
    }
  ]
}