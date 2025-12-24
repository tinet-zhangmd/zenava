import { FC } from 'hono/jsx'

interface Content {
  id: number
  category_id: number
  category_name: string
  title: string
  cover_image?: string
  author?: string
  published_at: string
  views: number
  status: 'draft' | 'unpublished' | 'published'
  is_featured?: boolean | number
  is_hot?: boolean | number
}

interface Category {
  id: number
  name: string
}

interface ResourceContentManagementProps {
  contents?: Content[]
  categories?: Category[]
  currentPage?: number
  totalPages?: number
  total?: number
}

export const ResourceContentManagement: FC<ResourceContentManagementProps> = ({ 
  contents = [], 
  categories = [],
  currentPage = 1,
  totalPages = 1,
  total = 0
}) => {
  return (
    <div class="space-y-6">
      {/* 顶部统计与主要操作 */}
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 class="text-2xl font-black text-slate-900 tracking-tight">内容列表</h2>
          <p class="text-xs text-slate-500 font-medium mt-1">管理资源中心的所有文章与多媒体内容</p>
        </div>
        <div class="flex items-center space-x-3">
          <button 
            id="filter-btn"
            class="flex items-center px-4 py-2.5 text-sm font-bold bg-white text-slate-700 border border-slate-200 rounded-xl shadow-sm hover:bg-slate-50 transition-all active:scale-95">
            <i class="fas fa-filter mr-2 text-slate-400"></i>
            高级筛选
          </button>
          <a 
            href="/ticloudadmin/resource-contents/new"
            class="flex items-center px-5 py-2.5 text-sm font-bold bg-blue-600 text-white hover:bg-blue-700 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-95">
            <i class="fas fa-plus mr-2 text-xs"></i>
            发布新文章
          </a>
        </div>
      </div>

      {/* 筛选面板卡片 (默认隐藏) */}
      <div id="filter-panel" class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hidden animate-in fade-in slide-in-from-top-4 duration-300">
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <div class="space-y-1.5">
            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">分类栏目</label>
            <select id="filter-category" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all">
              <option value="">全部栏目</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div class="space-y-1.5">
            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">发布状态</label>
            <select id="filter-status" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all">
              <option value="">全部状态</option>
              <option value="draft">草稿</option>
              <option value="unpublished">未发布</option>
              <option value="published">已发布</option>
            </select>
          </div>

          <div class="space-y-1.5">
            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">关键词搜索</label>
            <div class="relative">
              <i class="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
              <input type="text" id="filter-search" placeholder="标题、作者..." class="w-full pl-11 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all" />
            </div>
          </div>

          <div class="space-y-1.5">
            <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">属性筛选</label>
            <div class="grid grid-cols-2 gap-2">
              <select id="filter-featured" class="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all">
                <option value="">推荐</option>
                <option value="1">是</option>
                <option value="0">否</option>
              </select>
              <select id="filter-hot" class="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all">
                <option value="">热门</option>
                <option value="1">是</option>
                <option value="0">否</option>
              </select>
            </div>
          </div>

          <div class="flex items-end space-x-2">
            <button id="reset-filter-btn" class="flex-1 px-4 py-2.5 text-sm font-bold text-slate-500 hover:text-slate-700 bg-slate-100 rounded-xl transition-all">重置</button>
            <button id="apply-filter-btn" class="flex-1 px-4 py-2.5 text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-lg transition-all active:scale-95">查询</button>
          </div>
        </div>
      </div>

      {/* 内容表格卡片 */}
      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div class="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
          <div class="flex items-center space-x-3">
            <div class="flex items-center bg-white border border-slate-200 rounded-xl px-2 shadow-sm">
              <select id="batch-action" class="bg-transparent px-3 py-2 text-xs font-bold text-slate-600 focus:outline-none min-w-[110px]">
                <option value="">批量操作</option>
                <option value="feature">设为推荐</option>
                <option value="unfeature">取消推荐</option>
                <option value="hot">设为热门</option>
                <option value="unhot">取消热门</option>
                <option value="publish">立即发布</option>
                <option value="draft">转为草稿</option>
                <option value="delete">批量删除</option>
              </select>
            </div>
            <span class="text-[10px] font-bold text-slate-400 uppercase">共 {total} 篇内容</span>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="text-slate-500 border-b border-slate-100 text-[10px] font-black uppercase tracking-widest">
                <th class="px-6 py-4 w-12">
                  <input type="checkbox" id="select-all" class="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500/20" />
                </th>
                <th class="px-6 py-4 text-left">文章内容</th>
                <th class="px-6 py-4 text-left">分类与作者</th>
                <th class="px-6 py-4 text-center">发布时间</th>
                <th class="px-6 py-4 text-center">数据指标</th>
                <th class="px-6 py-4 text-center">属性标签</th>
                <th class="px-6 py-4 text-right">操作</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-50">
              {contents.length === 0 ? (
                <tr>
                  <td colSpan={7} class="px-6 py-20 text-center">
                    <div class="flex flex-col items-center space-y-3">
                      <div class="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
                        <i class="fas fa-inbox text-2xl"></i>
                      </div>
                      <p class="text-slate-400 text-sm font-medium">暂无匹配的文章内容</p>
                    </div>
                  </td>
                </tr>
              ) : (
                contents.map((content) => (
                  <tr key={content.id} class="hover:bg-slate-50/50 transition-colors group">
                    <td class="px-6 py-4">
                      <input type="checkbox" class="content-checkbox w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500/20" data-id={content.id} />
                    </td>
                    
                    <td class="px-6 py-4">
                      <div class="flex items-center space-x-4">
                        <div class="flex-shrink-0 w-12 h-12 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                          {content.cover_image ? (
                            <img src={content.cover_image} class="w-full h-full object-cover transition-transform group-hover:scale-110" />
                          ) : (
                            <div class="w-full h-full flex items-center justify-center text-slate-300">
                              <i class="fas fa-image"></i>
                            </div>
                          )}
                        </div>
                        <div class="min-w-0 max-w-md">
                          <a href={`/ticloudadmin/resource-contents/edit/${content.id}`} class="font-bold text-slate-900 hover:text-blue-600 block truncate">
                            {content.title}
                          </a>
                          <div class="flex items-center mt-1 space-x-2">
                            {content.status === 'draft' ? (
                              <span class="px-1.5 py-0.5 rounded text-[9px] font-black uppercase bg-slate-100 text-slate-500">草稿</span>
                            ) : content.status === 'published' ? (
                              <span class="px-1.5 py-0.5 rounded text-[9px] font-black uppercase bg-emerald-50 text-emerald-600">已发布</span>
                            ) : (
                              <span class="px-1.5 py-0.5 rounded text-[9px] font-black uppercase bg-amber-50 text-amber-600">未发布</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    
                    <td class="px-6 py-4">
                      <div class="text-[11px] font-bold text-slate-600">{content.category_name}</div>
                      <div class="text-[10px] text-slate-400 mt-0.5">作者: {content.author || '系统'}</div>
                    </td>
                    
                    <td class="px-6 py-4 text-center">
                      <div class="text-xs font-medium text-slate-500">{new Date(content.published_at).toLocaleDateString('zh-CN')}</div>
                    </td>
                    
                    <td class="px-6 py-4 text-center">
                      <div class="inline-flex items-center space-x-3 text-slate-400">
                        <div class="flex items-center" title="访问量">
                          <i class="fas fa-eye text-[10px] mr-1.5"></i>
                          <span class="text-xs font-bold text-slate-600">{content.views}</span>
                        </div>
                      </div>
                    </td>
                    
                    <td class="px-6 py-4 text-center">
                      <div class="flex items-center justify-center space-x-2">
                        {(content.is_featured === true || content.is_featured === 1) && (
                          <span class="w-5 h-5 flex items-center justify-center rounded-lg bg-blue-50 text-blue-500 border border-blue-100" title="首页推荐">
                            <i class="fas fa-award text-[10px]"></i>
                          </span>
                        )}
                        {(content.is_hot === true || content.is_hot === 1) && (
                          <span class="w-5 h-5 flex items-center justify-center rounded-lg bg-red-50 text-red-500 border border-red-100" title="热门文章">
                            <i class="fas fa-fire text-[10px]"></i>
                          </span>
                        )}
                      </div>
                    </td>
                    
                    <td class="px-6 py-4 text-right">
                      <div class="flex items-center justify-end space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <a href={`/ticloudadmin/resource-contents/edit/${content.id}`} class="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                          <i class="fas fa-edit text-xs"></i>
                        </a>
                        <button class="delete-content-btn p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" data-id={content.id} data-title={content.title}>
                          <i class="fas fa-trash-alt text-xs"></i>
                        </button>
                        <button class="copy-content-btn p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all" data-id={content.id}>
                          <i class="fas fa-copy text-xs"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* 分页 */}
        {totalPages > 1 && (
          <div class="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <div class="text-xs font-medium text-slate-500">
              显示 <span class="text-slate-900 font-bold">{(currentPage - 1) * 10 + 1}</span> 到 <span class="text-slate-900 font-bold">{Math.min(currentPage * 10, total)}</span> 条，共 <span class="text-slate-900 font-bold">{total}</span> 条
            </div>
            <div class="flex items-center space-x-1">
              {currentPage > 1 ? (
                <a href={`/ticloudadmin/resource-contents?page=${currentPage - 1}`} class="p-2 text-xs font-bold text-slate-600 hover:bg-white border border-transparent hover:border-slate-200 rounded-lg transition-all"><i class="fas fa-chevron-left"></i></a>
              ) : (
                <span class="p-2 text-xs text-slate-300 cursor-not-allowed"><i class="fas fa-chevron-left"></i></span>
              )}
              <div class="flex items-center px-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                  if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                    return page === currentPage ? (
                      <span key={page} class="w-8 h-8 flex items-center justify-center text-xs font-black bg-blue-600 text-white rounded-lg shadow-md shadow-blue-200">{page}</span>
                    ) : (
                      <a key={page} href={`/ticloudadmin/resource-contents?page=${page}`} class="w-8 h-8 flex items-center justify-center text-xs font-bold text-slate-600 hover:bg-white hover:border-slate-200 border border-transparent rounded-lg transition-all">{page}</a>
                    )
                  } else if ((page === currentPage - 2 && currentPage > 3) || (page === currentPage + 2 && currentPage < totalPages - 2)) {
                    return <span key={page} class="w-8 h-8 flex items-center justify-center text-slate-400">...</span>
                  }
                  return null
                })}
              </div>
              {currentPage < totalPages ? (
                <a href={`/ticloudadmin/resource-contents?page=${currentPage + 1}`} class="p-2 text-xs font-bold text-slate-600 hover:bg-white border border-transparent hover:border-slate-200 rounded-lg transition-all"><i class="fas fa-chevron-right"></i></a>
              ) : (
                <span class="p-2 text-xs text-slate-300 cursor-not-allowed"><i class="fas fa-chevron-right"></i></span>
              )}
            </div>
          </div>
        )}
      </div>

      <script dangerouslySetInnerHTML={{__html: `
        // 筛选面板切换
        document.getElementById('filter-btn')?.addEventListener('click', function() {
          const panel = document.getElementById('filter-panel');
          panel.classList.toggle('hidden');
        });
        
        // 全选
        document.getElementById('select-all')?.addEventListener('change', function(e) {
          const checkboxes = document.querySelectorAll('.content-checkbox');
          checkboxes.forEach(cb => cb.checked = e.target.checked);
        });
              
        // 批量操作逻辑
        document.getElementById('batch-action')?.addEventListener('change', async function(e) {
          if (!e.target.value) return;
          
          const selected = Array.from(document.querySelectorAll('.content-checkbox:checked')).map(cb => cb.dataset.id);
          if (selected.length === 0) { 
            alert('请先选择要操作的内容'); 
            e.target.value = ''; 
            return; 
          }
          
          const action = e.target.value;
          const actionNames = {
            'feature': '设为推荐',
            'unfeature': '取消推荐',
            'hot': '设为热门',
            'unhot': '取消热门',
            'publish': '立即发布',
            'draft': '转为草稿',
            'delete': '批量删除'
          };
          
          const selectedCount = selected.length;
          const actionName = actionNames[action] || '执行操作';
          const confirmMessage = '确定要将选中的 ' + selectedCount + ' 项内容' + actionName + '吗？';
          
          if (!confirm(confirmMessage)) {
            e.target.value = '';
            return;
          }
          
          try {
            const response = await fetch('/api/admin/resource-contents/batch', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                action: action,
                ids: selected.map(id => parseInt(id))
              })
            });
            
            const result = await response.json();
            
            if (result.success) {
              alert(result.message || '操作成功');
              // 刷新页面
              window.location.reload();
            } else {
              alert('操作失败: ' + (result.error || '未知错误'));
            }
          } catch (error) {
            console.error('批量操作失败:', error);
            alert('操作失败，请稍后重试');
          }
          
          e.target.value = '';
        });

        // 绑定删除按钮
        document.querySelectorAll('.delete-content-btn').forEach(btn => {
          btn.addEventListener('click', async function() {
            const contentId = this.dataset.id;
            const contentTitle = this.dataset.title;
            
            const confirmMessage = '确定要删除内容"' + contentTitle + '"吗？';
            if (!confirm(confirmMessage)) {
              return;
            }
            
            try {
              const response = await fetch('/api/admin/resource-contents/' + contentId, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json'
                }
              });
              
              const result = await response.json();
              
              if (result.success) {
                alert('删除成功');
                // 刷新页面
                window.location.reload();
              } else {
                alert('删除失败: ' + (result.error || '未知错误'));
              }
            } catch (error) {
              console.error('删除失败:', error);
              alert('删除失败，请稍后重试');
            }
          });
        });
        
        // 绑定复制按钮
        document.querySelectorAll('.copy-content-btn').forEach(btn => {
          btn.addEventListener('click', async function() {
            const contentId = this.dataset.id;
            
            try {
              const response = await fetch('/api/admin/resource-contents/' + contentId + '/copy', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                }
              });
              
              const result = await response.json();
              
              if (result.success) {
                alert('复制成功，正在跳转到编辑页面...');
                const newId = result.data && result.data.id ? result.data.id : contentId;
                window.location.href = '/ticloudadmin/resource-contents/edit/' + newId;
              } else {
                alert('复制失败: ' + (result.error || '未知错误'));
              }
            } catch (error) {
              console.error('复制失败:', error);
              alert('复制失败，请稍后重试');
            }
          });
        });
      `}} />
    </div>
  )
}
