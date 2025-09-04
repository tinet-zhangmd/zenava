// PM2 配置文件 - D1数据库版本
// 使用方法: pm2 start ecosystem.config.d1.cjs

module.exports = {
  apps: [
    {
      name: 'zenava-webapp-d1',
      script: 'npx',
      // 完整版本 - 包含D1数据库支持
      args: 'wrangler pages dev dist --d1=zenava-production --local --ip 0.0.0.0 --port 3000',
      
      // 设置工作目录
      cwd: '/data/working/www/zenava/webapp',
      
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      
      // PM2配置选项
      watch: false,           // 禁用文件监控
      instances: 1,           // 单实例运行
      exec_mode: 'fork',      // fork模式
      autorestart: true,      // 崩溃后自动重启
      max_memory_restart: '1G', // 内存超过1G自动重启
      
      // 日志配置
      error_file: './logs/pm2-error-d1.log',
      out_file: './logs/pm2-out-d1.log',
      log_file: './logs/pm2-combined-d1.log',
      time: true,             // 日志添加时间戳
      merge_logs: true,       // 合并日志
      
      // 启动超时和重试
      min_uptime: '10s',      // 最小运行时间
      max_restarts: 10,       // 最大重启次数
      
      // 解释器参数
      interpreter: 'node',
      interpreter_args: '',
      
      // 环境变量
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