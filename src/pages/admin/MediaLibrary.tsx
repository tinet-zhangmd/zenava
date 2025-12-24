import { FC } from 'hono/jsx'

interface MediaFile {
  id: string
  name: string
  url: string
  type: 'image' | 'video' | 'document'
  size: number
  uploadedAt: string
  uploadedBy: string
  tags: string[]
  width?: number
  height?: number
}

export const MediaLibrary: FC = () => {
  // Mock media files with varied heights for masonry effect
  const mediaFiles: MediaFile[] = [
    { id: '1', name: 'zenava-hero-bg.jpg', url: 'https://picsum.photos/seed/1/400/600', type: 'image', size: 2048576, uploadedAt: '2024-01-15 10:30', uploadedBy: 'Admin', tags: ['hero', 'background'] },
    { id: '2', name: 'ai-demo.mp4', url: '', type: 'video', size: 15728640, uploadedAt: '2024-01-14 16:45', uploadedBy: 'Admin', tags: ['demo', 'ai'] },
    { id: '3', name: 'marketing.pdf', url: '', type: 'document', size: 1048576, uploadedAt: '2024-01-13 14:20', uploadedBy: 'Admin', tags: ['product'] },
    { id: '4', name: 'ui-screenshot.png', url: 'https://picsum.photos/seed/4/400/300', type: 'image', size: 512000, uploadedAt: '2024-01-12 11:15', uploadedBy: 'Admin', tags: ['ui'] },
    { id: '5', name: 'office-vibe.jpg', url: 'https://picsum.photos/seed/5/400/800', type: 'image', size: 1048576, uploadedAt: '2024-01-11 09:00', uploadedBy: 'Editor', tags: ['office'] },
    { id: '6', name: 'team-photo.jpg', url: 'https://picsum.photos/seed/6/400/400', type: 'image', size: 3048576, uploadedAt: '2024-01-10 15:30', uploadedBy: 'Admin', tags: ['team'] },
    { id: '7', name: 'abstract-art.jpg', url: 'https://picsum.photos/seed/7/400/700', type: 'image', size: 2048576, uploadedAt: '2024-01-09 12:00', uploadedBy: 'Admin', tags: ['abstract'] },
    { id: '8', name: 'data-chart.png', url: 'https://picsum.photos/seed/8/400/500', type: 'image', size: 848576, uploadedAt: '2024-01-08 14:00', uploadedBy: 'Admin', tags: ['data'] },
  ]

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
  }

  return (
    <div class="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* 顶部标题与主要操作 */}
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 class="text-3xl font-black text-slate-900 tracking-tight">媒体资产库</h2>
          <p class="text-slate-500 font-medium mt-1">管理您的图片、视频及文档素材。</p>
        </div>
        <div class="flex items-center space-x-3">
          <button class="flex items-center px-6 py-3 bg-white text-slate-700 font-bold rounded-2xl border border-slate-200 shadow-sm hover:bg-slate-50 transition-all active:scale-95">
            <i class="fas fa-folder-plus mr-2 text-blue-500"></i>
            新建目录
          </button>
          <button class="flex items-center px-6 py-3 bg-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95">
            <i class="fas fa-cloud-upload-alt mr-2"></i>
            上传素材
          </button>
        </div>
      </div>

      {/* 统计指标 */}
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex items-center space-x-4">
          <div class="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500">
            <i class="fas fa-image"></i>
          </div>
          <div>
            <p class="text-[10px] font-black text-slate-400 uppercase">图片</p>
            <p class="text-lg font-black text-slate-900">256 <span class="text-xs text-slate-400 font-bold">张</span></p>
          </div>
        </div>
        <div class="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex items-center space-x-4">
          <div class="w-10 h-10 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-500">
            <i class="fas fa-video"></i>
          </div>
          <div>
            <p class="text-[10px] font-black text-slate-400 uppercase">视频</p>
            <p class="text-lg font-black text-slate-900">42 <span class="text-xs text-slate-400 font-bold">个</span></p>
          </div>
        </div>
        <div class="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex items-center space-x-4">
          <div class="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-500">
            <i class="fas fa-file-alt"></i>
          </div>
          <div>
            <p class="text-[10px] font-black text-slate-400 uppercase">文档</p>
            <p class="text-lg font-black text-slate-900">18 <span class="text-xs text-slate-400 font-bold">份</span></p>
          </div>
        </div>
        <div class="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex items-center space-x-4">
          <div class="w-10 h-10 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-500">
            <i class="fas fa-hdd"></i>
          </div>
          <div>
            <p class="text-[10px] font-black text-slate-400 uppercase">已用空间</p>
            <p class="text-lg font-black text-slate-900">1.4 <span class="text-xs text-slate-400 font-bold">GB</span></p>
          </div>
        </div>
      </div>

      {/* 筛选与搜索 */}
      <div class="bg-white p-4 rounded-[2rem] border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-4">
        <div class="relative flex-1 w-full">
          <i class="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
          <input 
            type="text" 
            placeholder="搜索素材名称、标签..." 
            class="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all text-sm font-medium"
          />
        </div>
        <div class="flex items-center space-x-2 w-full md:w-auto">
          <select class="flex-1 md:flex-none px-4 py-3 bg-slate-50 border-none rounded-2xl text-sm font-bold text-slate-600 focus:ring-2 focus:ring-blue-500">
            <option>所有类型</option>
            <option>图片</option>
            <option>视频</option>
            <option>文档</option>
          </select>
          <button class="p-3 bg-slate-900 text-white rounded-2xl shadow-lg active:scale-95 transition-all">
            <i class="fas fa-filter"></i>
          </button>
        </div>
      </div>

      {/* 瀑布流媒体网格 */}
      <div class="columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
        {mediaFiles.map((file) => (
          <div key={file.id} class="break-inside-avoid group relative bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500">
            {/* 预览区域 */}
            <div class="relative">
              {file.type === 'image' ? (
                <img src={file.url} alt={file.name} class="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110" />
              ) : (
                <div class="aspect-video bg-slate-100 flex items-center justify-center">
                  <i class={`fas ${file.type === 'video' ? 'fa-video text-orange-400' : 'fa-file-pdf text-emerald-400'} text-4xl`}></i>
                </div>
              )}
              
              {/* 悬停操作层 */}
              <div class="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center space-x-3 backdrop-blur-sm">
                <button class="w-10 h-10 rounded-xl bg-white text-slate-900 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300">
                  <i class="fas fa-eye text-sm"></i>
                </button>
                <button class="w-10 h-10 rounded-xl bg-white text-slate-900 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 delay-75 duration-300">
                  <i class="fas fa-copy text-sm"></i>
                </button>
                <button class="w-10 h-10 rounded-xl bg-white text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 delay-150 duration-300">
                  <i class="fas fa-trash-alt text-sm"></i>
                </button>
              </div>

              {/* 类型标识 */}
              <div class="absolute top-4 left-4">
                <span class="px-3 py-1 rounded-lg bg-white/90 backdrop-blur text-[10px] font-black uppercase tracking-widest text-slate-900 shadow-sm">
                  {file.type}
                </span>
              </div>
            </div>

            {/* 信息区域 */}
            <div class="p-5">
              <h4 class="text-sm font-bold text-slate-900 truncate mb-1">{file.name}</h4>
              <div class="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                <span>{formatFileSize(file.size)}</span>
                <span>{file.uploadedAt.split(' ')[0]}</span>
              </div>
              
              {file.tags.length > 0 && (
                <div class="mt-4 flex flex-wrap gap-2">
                  {file.tags.map(tag => (
                    <span key={tag} class="px-2 py-0.5 rounded-md bg-slate-50 border border-slate-100 text-[9px] font-bold text-slate-500 uppercase tracking-tighter">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 分页器 */}
      <div class="flex items-center justify-between bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
        <p class="text-xs font-bold text-slate-400">显示 1 到 8 项，共 45 项素材</p>
        <div class="flex items-center space-x-2">
          <button class="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-slate-100 transition-all cursor-not-allowed">
            <i class="fas fa-chevron-left text-xs"></i>
          </button>
          <button class="w-10 h-10 rounded-xl bg-slate-900 text-white font-bold text-xs shadow-lg shadow-slate-200">1</button>
          <button class="w-10 h-10 rounded-xl bg-white text-slate-600 font-bold text-xs border border-slate-100 hover:bg-slate-50 transition-all">2</button>
          <button class="w-10 h-10 rounded-xl bg-white text-slate-600 font-bold text-xs border border-slate-100 hover:bg-slate-50 transition-all">3</button>
          <button class="w-10 h-10 rounded-xl bg-white text-slate-600 flex items-center justify-center border border-slate-100 hover:bg-slate-50 transition-all">
            <i class="fas fa-chevron-right text-xs"></i>
          </button>
        </div>
      </div>
    </div>
  )
}
