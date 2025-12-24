interface Log {
  id: number
  user_id?: number
  user_name?: string
  action: string
  target_type?: string
  target_id?: number
  target_name?: string
  description?: string
  ip_address?: string
  user_agent?: string
  created_at: string
}

interface LogsProps {
  logs?: Log[]
  currentPage?: number
  totalPages?: number
  total?: number
}

export function Logs({ logs = [], currentPage = 1, totalPages = 1, total = 0 }: LogsProps) {
  // 格式化时间
  const formatTime = (dateString: string) => {
    if (!dateString) return '未知时间'
    try {
      const date = new Date(dateString)
      if (isNaN(date.getTime())) return '时间格式错误'
      return date.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      })
    } catch (e) {
      return '时间解析错误'
    }
  }

  // 根据操作类型返回标签样式和文本
  const getActionBadge = (action: string) => {
    const badges: Record<string, { text: string; class: string }> = {
      'login': { text: '登录', class: 'bg-blue-100 text-blue-800' },
      'create': { text: '创建', class: 'bg-purple-100 text-purple-800' },
      'update': { text: '更新', class: 'bg-green-100 text-green-800' },
      'delete': { text: '删除', class: 'bg-red-100 text-red-800' },
      'upload': { text: '上传', class: 'bg-orange-100 text-orange-800' },
      'system': { text: '系统', class: 'bg-gray-100 text-gray-800' }
    }
    return badges[action] || { text: action, class: 'bg-gray-100 text-gray-800' }
  }
  return (
    <div class="space-y-6">
      {/* Filters */}
      <div class="bg-white rounded-lg shadow-sm border p-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">日志类型</label>
            <select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="all">全部日志</option>
              <option value="login">登录日志</option>
              <option value="content">内容操作</option>
              <option value="seo">SEO操作</option>
              <option value="i18n">多语言操作</option>
              <option value="media">媒体操作</option>
              <option value="system">系统操作</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">操作用户</label>
            <select class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="all">全部用户</option>
              <option value="admin">Admin User</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">开始日期</label>
            <input 
              type="date" 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">结束日期</label>
            <input 
              type="date" 
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div class="mt-4 flex space-x-2">
          <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            <i class="fas fa-search mr-2"></i>筛选
          </button>
          <button class="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            <i class="fas fa-redo mr-2"></i>重置
          </button>
          <button class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            <i class="fas fa-download mr-2"></i>导出
          </button>
        </div>
      </div>

      {/* Activity Logs */}
      <div class="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div class="p-6 border-b">
          <div class="flex justify-between items-center">
            <div>
              <h3 class="text-lg font-semibold text-gray-900">操作日志</h3>
              <p class="text-gray-600">系统操作记录和用户活动日志</p>
            </div>
            <div class="flex items-center space-x-2">
              <span class="text-sm text-gray-500">自动刷新</span>
              <input type="checkbox" checked class="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
            </div>
          </div>
        </div>
        
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">时间</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">类型</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">用户</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP地址</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              {logs.length === 0 ? (
                <tr>
                  <td colspan="6" class="px-6 py-8 text-center text-slate-500">
                    <i class="fas fa-clipboard-list text-4xl mb-2 opacity-30"></i>
                    <p>暂无操作日志</p>
                  </td>
                </tr>
              ) : (
                logs.map((log) => {
                  const badge = getActionBadge(log.action)
                  return (
                    <tr key={log.id} class="hover:bg-gray-50">
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatTime(log.created_at)}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <span class={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${badge.class}`}>
                          {badge.text}
                        </span>
                      </td>
                      <td class="px-6 py-4 text-sm text-gray-900">
                        {log.description || `${badge.text}操作`}
                        {log.target_name && ` - "${log.target_name}"`}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {log.user_name || 'Unknown'}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {log.ip_address || 'N/A'}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          成功
                        </span>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div class="bg-white px-6 py-4 border-t border-gray-200">
            <div class="flex items-center justify-between">
              <div class="text-sm text-gray-700">
                显示 <span class="font-medium">{(currentPage - 1) * 20 + 1}</span> 到 <span class="font-medium">{Math.min(currentPage * 20, total)}</span> 条，共 <span class="font-medium">{total}</span> 条记录
              </div>
              <div class="flex space-x-2">
                <a 
                  href={`/ticloudadmin/logs?page=${currentPage - 1}`}
                  class={`px-3 py-2 text-sm rounded-lg ${currentPage === 1 ? 'text-gray-500 bg-gray-100 cursor-not-allowed pointer-events-none' : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'}`}
                >
                  上一页
                </a>
                {[...Array(totalPages)].map((_, i) => {
                  const pageNum = i + 1
                  // 只显示当前页前后2页
                  if (pageNum === 1 || pageNum === totalPages || (pageNum >= currentPage - 2 && pageNum <= currentPage + 2)) {
                    return (
                      <a
                        key={pageNum}
                        href={`/ticloudadmin/logs?page=${pageNum}`}
                        class={`px-3 py-2 text-sm rounded-lg ${pageNum === currentPage ? 'bg-blue-600 text-white' : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'}`}
                      >
                        {pageNum}
                      </a>
                    )
                  } else if (pageNum === currentPage - 3 || pageNum === currentPage + 3) {
                    return <span key={pageNum} class="px-2 text-gray-500">...</span>
                  }
                  return null
                })}
                <a 
                  href={`/ticloudadmin/logs?page=${currentPage + 1}`}
                  class={`px-3 py-2 text-sm rounded-lg ${currentPage === totalPages ? 'text-gray-500 bg-gray-100 cursor-not-allowed pointer-events-none' : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'}`}
                >
                  下一页
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* System Status */}
      <div class="bg-white rounded-lg shadow-sm border">
        <div class="p-6 border-b">
          <h3 class="text-lg font-semibold text-gray-900">系统状态</h3>
          <p class="text-gray-600">实时系统监控和状态信息</p>
        </div>
        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="text-center">
              <div class="text-3xl font-bold text-green-600">99.9%</div>
              <div class="text-sm text-gray-500">系统正常运行时间</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-blue-600">156</div>
              <div class="text-sm text-gray-500">今日访问量</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-purple-600">23</div>
              <div class="text-sm text-gray-500">今日操作次数</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}