import { html } from 'hono/html'
import { Language } from '../../utils/i18n.js'

interface AdminLayoutProps {
  children: any
  title?: string
  currentPath: string
  user?: { name: string; email: string; lastLogin?: string }
}

export function AdminLayout({ children, title, currentPath, user }: AdminLayoutProps) {
  const siteTitle = title ? `${title} - Zenava Admin` : 'Zenava Admin'
  
  return (
    <html lang="zh-CN">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{siteTitle}</title>
        
        {/* Tailwind CSS */}
        <script src="https://cdn.tailwindcss.com"></script>
        
        {/* FontAwesome Icons */}
        <link href="/static/fontawesome/css/all.min.css" rel="stylesheet" />
        
        {/* Google Fonts - Inter */}
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        
        {/* Quill Editor for Rich Text */}
        <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet" />
        <script src="https://cdn.quilljs.com/1.3.6/quill.min.js"></script>
        
        <style dangerouslySetInnerHTML={{
          __html: `
            body { 
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
              -webkit-font-smoothing: antialiased;
            }
            .admin-sidebar { 
              background: #0f172a;
              border-right: 1px solid rgba(255, 255, 255, 0.05);
              transition: all 0.3s ease;
            }
            .nav-link {
              margin: 0.25rem 0.875rem;
              padding: 0.75rem 1rem;
              border-radius: 0.75rem;
              color: #94a3b8;
              transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
              display: flex;
              align-items: center;
              font-size: 0.875rem;
              font-weight: 500;
              text-decoration: none;
            }
            .nav-link:hover {
              background: rgba(255, 255, 255, 0.05);
              color: #f8fafc;
            }
            .nav-link.active {
              background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
              color: #ffffff;
              box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
            }
            .nav-link i {
              width: 1.5rem;
              margin-right: 0.75rem;
              font-size: 1.1rem;
              text-align: center;
              opacity: 0.8;
            }
            .nav-link.active i {
              opacity: 1;
            }
            .nav-group-title {
              padding: 1.75rem 1.75rem 0.5rem;
              font-size: 0.7rem;
              font-weight: 700;
              text-transform: uppercase;
              letter-spacing: 0.1em;
              color: #475569;
            }
            .top-bar {
              background: rgba(255, 255, 255, 0.85);
              backdrop-filter: blur(12px);
              border-bottom: 1px solid #e2e8f0;
            }
            .custom-scrollbar::-webkit-scrollbar {
              width: 5px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: transparent;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: #334155;
              border-radius: 10px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: #475569;
            }
            .main-container {
              background-color: #f8fafc;
            }
            /* 页面进入动画 */
            .page-fade-in {
              animation: fadeIn 0.4s ease-out;
            }
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(8px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `
        }} />
      </head>
      <body class="bg-gray-50 text-slate-900 antialiased">
        <div class="flex h-screen overflow-hidden">
          {/* Sidebar */}
          <aside class="w-64 admin-sidebar flex flex-col flex-shrink-0 z-30">
            <div class="p-7 mb-2">
              <div class="flex items-center space-x-3">
                <div class="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/20">
                  <i class="fas fa-bolt text-white text-base"></i>
                </div>
                <h1 class="text-xl font-bold text-white tracking-tight">
                  Zenava<span class="text-blue-500">.</span>
                </h1>
              </div>
            </div>
            
            <div class="flex-1 overflow-y-auto custom-scrollbar pb-8">
              <nav>
                <div class="nav-group-title">内容引擎</div>
                <div class="space-y-0.5">
                  <a href="/ticloudadmin/resource-categories"
                     class={`nav-link ${currentPath.startsWith('/ticloudadmin/resource-categories') ? 'active' : ''}`}>
                    <i class="fas fa-layer-group"></i>
                    <span>栏目分类</span>
                  </a>
                  <a href="/ticloudadmin/resource-contents"
                     class={`nav-link ${currentPath.startsWith('/ticloudadmin/resource-contents') ? 'active' : ''}`}>
                    <i class="fas fa-file-invoice"></i>
                    <span>内容管理</span>
                  </a>
                  <a href="/ticloudadmin/resource-banners"
                     class={`nav-link ${currentPath.startsWith('/ticloudadmin/resource-banners') && !currentPath.startsWith('/ticloudadmin/category-banners') ? 'active' : ''}`}>
                    <i class="fas fa-pager"></i>
                    <span>首页 Banner</span>
                  </a>
                  <a href="/ticloudadmin/category-banners"
                     class={`nav-link ${currentPath.startsWith('/ticloudadmin/category-banners') ? 'active' : ''}`}>
                    <i class="fas fa-images"></i>
                    <span>栏目 Banner</span>
                  </a>
                </div>

                <div class="nav-group-title">系统工具</div>
                <div class="space-y-0.5">
                  <a href="/ticloudadmin/media"
                     class={`nav-link ${currentPath.startsWith('/ticloudadmin/media') ? 'active' : ''}`}>
                    <i class="fas fa-photo-video"></i>
                    <span>媒体资产</span>
                  </a>
                  <a href="/ticloudadmin/users"
                     class={`nav-link ${currentPath.startsWith('/ticloudadmin/users') ? 'active' : ''}`}>
                    <i class="fas fa-user-shield"></i>
                    <span>管理员</span>
                  </a>
                  <a href="/ticloudadmin/settings"
                     class={`nav-link ${currentPath.startsWith('/ticloudadmin/settings') ? 'active' : ''}`}>
                    <i class="fas fa-sliders-h"></i>
                    <span>全局设置</span>
                  </a>
                  <a href="/ticloudadmin/logs"
                     class={`nav-link ${currentPath.startsWith('/ticloudadmin/logs') ? 'active' : ''}`}>
                    <i class="fas fa-terminal"></i>
                    <span>审计日志</span>
                  </a>
                </div>
              </nav>
            </div>

            {/* Sidebar User Card */}
            <div class="p-4 border-t border-white/5 bg-black/20">
              <div class="p-3 rounded-xl bg-white/5 group border border-white/5">
                <div class="flex items-center">
                  <div class="w-9 h-9 rounded-lg bg-blue-500/20 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-sm mr-3">
                    {user?.name?.[0] || 'A'}
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-xs font-bold text-white truncate leading-tight">{user?.name || 'Administrator'}</p>
                    <p class="text-[10px] text-slate-500 truncate mt-0.5">{user?.email || 'admin@zenava.com'}</p>
                  </div>
                  <a href="/ticloudadmin/logout" class="p-2 text-slate-500 hover:text-red-400 transition-colors" title="退出登录">
                    <i class="fas fa-sign-out-alt text-sm"></i>
                  </a>
                </div>
                {user?.lastLogin && (
                  <div class="mt-2 pt-2 border-t border-white/5">
                    <p class="text-[10px] text-slate-500">
                      <i class="fas fa-clock mr-1"></i>
                      <span id="last-login-time" data-time={user.lastLogin}>加载中...</span>
                    </p>
                  </div>
                )}
              </div>
              
              {user?.lastLogin && (
                <script dangerouslySetInnerHTML={{
                  __html: `
                    (function() {
                      const el = document.getElementById('last-login-time');
                      if (!el) return;
                      
                      const dateString = el.dataset.time;
                      if (!dateString) return;
                      
                      try {
                        const date = new Date(dateString);
                        if (isNaN(date.getTime())) {
                          el.textContent = '时间格式错误';
                          return;
                        }
                        
                        const now = new Date();
                        const diff = now.getTime() - date.getTime();
                        const minutes = Math.floor(diff / 60000);
                        const hours = Math.floor(diff / 3600000);
                        const days = Math.floor(diff / 86400000);
                        
                        if (minutes < 1) el.textContent = '刚刚登录';
                        else if (minutes < 60) el.textContent = minutes + ' 分钟前登录';
                        else if (hours < 24) el.textContent = hours + ' 小时前登录';
                        else if (days < 7) el.textContent = days + ' 天前登录';
                        else el.textContent = date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
                      } catch (e) {
                        el.textContent = '时间解析失败';
                      }
                    })();
                  `
                }} />
              )}
            </div>
          </aside>
          
          {/* Main Content Area */}
          <main class="flex-1 flex flex-col min-w-0 overflow-hidden main-container">
            {/* Top Bar Navigation */}
            <header class="h-16 top-bar flex items-center justify-between px-8 flex-shrink-0 z-20">
              <div class="flex items-center">
                <div class="flex items-center text-slate-400 text-xs font-medium uppercase tracking-wider">
                  <span class="hover:text-slate-600 cursor-default">Admin</span>
                  <i class="fas fa-chevron-right mx-3 text-[8px] opacity-50"></i>
                  <span class="text-blue-600 font-bold">{title}</span>
                </div>
              </div>
              
              <div class="flex items-center space-x-5">
                <a href="/" target="_blank" class="flex items-center text-xs font-bold text-slate-600 hover:text-blue-600 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-sm transition-all active:scale-95">
                  <i class="fas fa-external-link-alt mr-2 text-[10px]"></i>
                  预览站点
                </a>
                
                <div class="h-6 w-[1px] bg-slate-200"></div>
                
                <div class="flex items-center space-x-2">
                  <button class="relative p-2 text-slate-400 hover:text-blue-600 transition-colors">
                    <i class="fas fa-bell"></i>
                    <span class="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                  </button>
                </div>
              </div>
            </header>
            
            {/* Page Body */}
            <div class="flex-1 overflow-y-auto p-8 custom-scrollbar">
              <div class="max-w-7xl mx-auto page-fade-in">
                {/* Dynamic Content */}
                {children}
              </div>
            </div>
          </main>
        </div>
      </body>
    </html>
  )
}
