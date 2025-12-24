import { FC } from 'hono/jsx'

interface DashboardProps {
  stats?: {
    totalContents: number
    totalCategories: number
    totalMedia: number
    totalViews: number
  }
  logs?: Array<{
    user_name: string
    action: string
    target_type?: string
    target_name?: string
    description?: string
    created_at: string
  }>
}

export const Dashboard: FC<DashboardProps> = ({ 
  stats = { totalContents: 124, totalCategories: 8, totalMedia: 456, totalViews: 12800 },
  logs = []
}) => {
  // 格式化时间显示
  const formatTime = (dateString: string) => {
    if (!dateString) return '未知时间'
    try {
      const date = new Date(dateString)
      const now = new Date()
      const diff = now.getTime() - date.getTime()
      const minutes = Math.floor(diff / 60000)
      const hours = Math.floor(diff / 3600000)
      const days = Math.floor(diff / 86400000)
      
      if (minutes < 1) return '刚刚'
      if (minutes < 60) return `${minutes} 分钟前`
      if (hours < 24) return `${hours} 小时前`
      if (days < 7) return `${days} 天前`
      return date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })
    } catch (e) {
      return '时间格式错误'
    }
  }
  
  // 获取操作图标和颜色
  const getActionStyle = (action: string) => {
    const styles: Record<string, { icon: string; color: string }> = {
      'login': { icon: 'fa-sign-in-alt', color: 'text-blue-500' },
      'create': { icon: 'fa-plus-circle', color: 'text-emerald-500' },
      'update': { icon: 'fa-edit', color: 'text-blue-500' },
      'delete': { icon: 'fa-trash', color: 'text-red-500' },
      'upload': { icon: 'fa-cloud-upload-alt', color: 'text-orange-500' },
      'backup': { icon: 'fa-database', color: 'text-slate-400' },
      'publish': { icon: 'fa-check-circle', color: 'text-emerald-500' }
    }
    return styles[action] || { icon: 'fa-info-circle', color: 'text-slate-400' }
  }
  
  // 获取操作描述
  const getActionDescription = (log: any) => {
    if (log.description) return log.description
    const actionMap: Record<string, string> = {
      'login': '登录了系统',
      'create': '创建了内容',
      'update': '修改了内容',
      'delete': '删除了内容',
      'upload': '上传了文件',
      'backup': '执行了备份',
      'publish': '发布了内容'
    }
    return actionMap[log.action] || '执行了操作'
  }
  
  // 默认日志数据（如果没有从数据库获取）
  const displayLogs = logs.length > 0 ? logs : [
    { user_name: 'Admin', action: 'create', target_name: '《AI 驱动的客户服务》', description: '发布了新内容', created_at: new Date(Date.now() - 10 * 60000).toISOString() },
    { user_name: 'Admin', action: 'update', target_name: '行业报告', description: '修改了栏目', created_at: new Date(Date.now() - 2 * 3600000).toISOString() },
    { user_name: 'Admin', action: 'upload', target_name: 'hero-banner-v2.jpg', description: '上传了媒体文件', created_at: new Date(Date.now() - 86400000).toISOString() },
    { user_name: 'System', action: 'backup', target_name: 'ZENAVA_DB_PROD', description: '执行了自动备份', created_at: new Date(Date.now() - 86400000 + 7200000).toISOString() }
  ]
  return (
    <div class="space-y-8 animate-in fade-in duration-500">
      {/* 欢迎语 */}
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 class="text-3xl font-black text-slate-900 tracking-tight">下午好, 管理员</h2>
          <p class="text-slate-500 font-medium mt-1">这是您网站今天的运行概况。</p>
        </div>
        <div class="flex items-center space-x-2 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm">
          <button class="px-4 py-2 text-xs font-bold bg-slate-900 text-white rounded-xl shadow-lg transition-all active:scale-95">今日</button>
          <button class="px-4 py-2 text-xs font-bold text-slate-500 hover:bg-slate-50 rounded-xl transition-all">本周</button>
          <button class="px-4 py-2 text-xs font-bold text-slate-500 hover:bg-slate-50 rounded-xl transition-all">本月</button>
        </div>
      </div>

      {/* 核心指标卡片 */}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* 指标 1 */}
        <div class="relative bg-white p-6 rounded-3xl border border-slate-200 shadow-sm overflow-hidden group">
          <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
            <i class="fas fa-file-invoice text-6xl text-blue-600"></i>
          </div>
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">文章总数</p>
          <h3 class="text-3xl font-black text-slate-900">{stats.totalContents}</h3>
          <div class="mt-4 flex items-center text-emerald-500 text-xs font-bold">
            <i class="fas fa-arrow-up mr-1"></i>
            <span>+12%</span>
            <span class="text-slate-400 font-medium ml-2 uppercase tracking-tighter">较上月</span>
          </div>
        </div>

        {/* 指标 2 */}
        <div class="relative bg-white p-6 rounded-3xl border border-slate-200 shadow-sm overflow-hidden group">
          <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
            <i class="fas fa-eye text-6xl text-purple-600"></i>
          </div>
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">内容访问量</p>
          <h3 class="text-3xl font-black text-slate-900">{stats.totalViews.toLocaleString()}</h3>
          <div class="mt-4 flex items-center text-emerald-500 text-xs font-bold">
            <i class="fas fa-arrow-up mr-1"></i>
            <span>+5.4%</span>
            <span class="text-slate-400 font-medium ml-2 uppercase tracking-tighter">实时趋势</span>
          </div>
        </div>

        {/* 指标 3 */}
        <div class="relative bg-white p-6 rounded-3xl border border-slate-200 shadow-sm overflow-hidden group">
          <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
            <i class="fas fa-photo-video text-6xl text-orange-600"></i>
          </div>
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">资产存储</p>
          <h3 class="text-3xl font-black text-slate-900">{stats.totalMedia} <span class="text-sm font-bold text-slate-400">项</span></h3>
          <div class="mt-4 flex items-center text-amber-500 text-xs font-bold">
            <i class="fas fa-hdd mr-1"></i>
            <span>已使用 1.2GB</span>
          </div>
        </div>

        {/* 指标 4 */}
        <div class="relative bg-white p-6 rounded-3xl border border-slate-200 shadow-sm overflow-hidden group">
          <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
            <i class="fas fa-layer-group text-6xl text-indigo-600"></i>
          </div>
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">活跃栏目</p>
          <h3 class="text-3xl font-black text-slate-900">{stats.totalCategories}</h3>
          <div class="mt-4 flex items-center text-blue-500 text-xs font-bold">
            <span class="px-2 py-0.5 rounded-md bg-blue-50 border border-blue-100 uppercase tracking-tighter">运行中</span>
          </div>
        </div>
      </div>

      {/* 数据可视化区域 */}
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 左侧大图表: 流量趋势 (SVG 模拟) */}
        <div class="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-200 shadow-sm p-8">
          <div class="flex items-center justify-between mb-8">
            <div>
              <h4 class="text-lg font-black text-slate-900 tracking-tight">内容热度趋势</h4>
              <p class="text-xs text-slate-400 font-medium">展示过去 7 天的全站访问波动</p>
            </div>
            <div class="flex items-center space-x-4">
              <div class="flex items-center">
                <span class="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
                <span class="text-[10px] font-black text-slate-500 uppercase tracking-widest">浏览量</span>
              </div>
            </div>
          </div>
          
          <div class="relative h-64 w-full">
            {/* 模拟图表网格线 */}
            <div class="absolute inset-0 flex flex-col justify-between opacity-5">
              {[1,2,3,4,5].map(() => <div class="w-full h-[1px] bg-black"></div>)}
            </div>
            {/* 模拟折线图 SVG */}
            <svg class="absolute inset-0 h-full w-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="gradient-area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.2" />
                  <stop offset="100%" stop-color="#3b82f6" stop-opacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,180 Q100,120 200,150 T400,80 T600,100 T800,40 T1000,120 V256 H0 Z" fill="url(#gradient-area)" />
              <path d="M0,180 Q100,120 200,150 T400,80 T600,100 T800,40 T1000,120" fill="none" stroke="#3b82f6" stroke-width="4" stroke-linecap="round" />
              {/* 数据点 */}
              <circle cx="200" cy="150" r="5" fill="#3b82f6" stroke="#fff" stroke-width="2" />
              <circle cx="400" cy="80" r="5" fill="#3b82f6" stroke="#fff" stroke-width="2" />
              <circle cx="800" cy="40" r="5" fill="#3b82f6" stroke="#fff" stroke-width="2" />
            </svg>
            <div class="absolute bottom-0 w-full flex justify-between px-2 text-[10px] font-bold text-slate-400 uppercase tracking-tighter pt-4 border-t border-slate-50">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </div>
        </div>

        {/* 右侧小图表: 语言分布 */}
        <div class="bg-slate-900 rounded-[2.5rem] p-8 text-white">
          <h4 class="text-lg font-black tracking-tight mb-1">内容多语言分布</h4>
          <p class="text-xs text-slate-400 font-medium mb-10">全站内容语言版本占比</p>
          
          <div class="space-y-6">
            <div class="space-y-2">
              <div class="flex justify-between text-xs font-bold">
                <span class="text-blue-400">简体中文 (ZH)</span>
                <span>65%</span>
              </div>
              <div class="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                <div class="h-full bg-blue-500 rounded-full" style="width: 65%"></div>
              </div>
            </div>
            
            <div class="space-y-2">
              <div class="flex justify-between text-xs font-bold">
                <span class="text-emerald-400">英文 (EN)</span>
                <span>20%</span>
              </div>
              <div class="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                <div class="h-full bg-emerald-500 rounded-full" style="width: 20%"></div>
              </div>
            </div>

            <div class="space-y-2">
              <div class="flex justify-between text-xs font-bold">
                <span class="text-purple-400">日文 (JP)</span>
                <span>10%</span>
              </div>
              <div class="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                <div class="h-full bg-purple-500 rounded-full" style="width: 10%"></div>
              </div>
            </div>

            <div class="space-y-2">
              <div class="flex justify-between text-xs font-bold">
                <span class="text-amber-400">繁体中文 (HK)</span>
                <span>5%</span>
              </div>
              <div class="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                <div class="h-full bg-amber-500 rounded-full" style="width: 5%"></div>
              </div>
            </div>
          </div>

          <div class="mt-12 p-4 bg-white/5 border border-white/10 rounded-2xl">
            <p class="text-[10px] text-slate-400 uppercase font-black mb-2">专业建议</p>
            <p class="text-xs text-slate-300 leading-relaxed">检测到英语内容的浏览量近期增长较快，建议增加相关翻译输出。</p>
          </div>
        </div>
      </div>

      {/* 底部功能区: 快速链接 & 最近动态 */}
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 最近动态 */}
        <div class="lg:col-span-2 bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
          <div class="px-8 py-6 border-b border-slate-100 flex justify-between items-center">
            <h4 class="text-lg font-black text-slate-900 tracking-tight">系统审计日志</h4>
            <a href="/ticloudadmin/logs" class="text-xs font-bold text-blue-600 hover:underline">查看全部</a>
          </div>
          <div class="divide-y divide-slate-50">
            {displayLogs.slice(0, 4).map((log) => {
              const style = getActionStyle(log.action)
              return (
                <div class="px-8 py-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                  <div class="flex items-center space-x-4">
                    <div class={`w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center ${style.color}`}>
                      <i class={`fas ${style.icon} text-sm`}></i>
                    </div>
                    <div>
                      <p class="text-sm font-bold text-slate-900">
                        <span class="text-slate-500">{log.user_name}</span> {getActionDescription(log)}
                      </p>
                      <p class="text-xs text-slate-400 mt-0.5">{log.target_name || '系统操作'}</p>
                    </div>
                  </div>
                  <span class="text-[10px] font-bold text-slate-300 uppercase">{formatTime(log.created_at)}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* 快速操作卡片 */}
        <div class="space-y-6">
          <div class="bg-blue-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-blue-200">
            <h4 class="text-xl font-black mb-6">快捷导航</h4>
            <div class="grid grid-cols-2 gap-3">
              <a href="/ticloudadmin/resource-contents/new" class="p-4 bg-white/10 hover:bg-white/20 rounded-2xl border border-white/10 transition-all text-center group">
                <i class="fas fa-feather-alt text-lg mb-2 group-hover:scale-110 transition-transform"></i>
                <p class="text-[10px] font-black uppercase">撰写</p>
              </a>
              <a href="/ticloudadmin/media" class="p-4 bg-white/10 hover:bg-white/20 rounded-2xl border border-white/10 transition-all text-center group">
                <i class="fas fa-images text-lg mb-2 group-hover:scale-110 transition-transform"></i>
                <p class="text-[10px] font-black uppercase">资产</p>
              </a>
              <a href="/ticloudadmin/settings" class="p-4 bg-white/10 hover:bg-white/20 rounded-2xl border border-white/10 transition-all text-center group">
                <i class="fas fa-cog text-lg mb-2 group-hover:scale-110 transition-transform"></i>
                <p class="text-[10px] font-black uppercase">配置</p>
              </a>
              <a href="/" target="_blank" class="p-4 bg-white/10 hover:bg-white/20 rounded-2xl border border-white/10 transition-all text-center group">
                <i class="fas fa-external-link-alt text-lg mb-2 group-hover:scale-110 transition-transform"></i>
                <p class="text-[10px] font-black uppercase">访问</p>
              </a>
            </div>
          </div>

          <div class="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm p-8">
            <h4 class="text-sm font-black text-slate-900 uppercase tracking-widest mb-4">系统健康度</h4>
            <div class="flex items-center space-x-4">
              <div class="w-12 h-12 rounded-full border-4 border-emerald-500 flex items-center justify-center">
                <span class="text-[10px] font-black text-emerald-600">99%</span>
              </div>
              <div>
                <p class="text-xs font-bold text-slate-900">所有服务正常</p>
                <p class="text-[10px] text-slate-400 mt-0.5">最后检查时间: 5 分钟前</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
