import { FC } from 'hono/jsx'

interface Category {
  id: number
  sort_order: number
  name: string
  slug: string
  description?: string
  cover_image?: string
  cover_image_size?: number
  cover_image_type?: string
  list_template: string
  detail_template: string
  is_visible: boolean
}

interface ResourceCategoryManagementProps {
  categories?: Category[]
  currentPage?: number
  totalPages?: number
  total?: number
}

export const ResourceCategoryManagement: FC<ResourceCategoryManagementProps> = ({ 
  categories = [],
  currentPage = 1,
  totalPages = 1,
  total = 0
}) => {
  return (
    <div class="space-y-6">
      {/* 统计概览 */}
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <p class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">总栏目数</p>
          <div class="flex items-end justify-between">
            <h3 class="text-2xl font-black text-slate-900">{total}</h3>
            <div class="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
              <i class="fas fa-folder text-sm"></i>
            </div>
          </div>
        </div>
      </div>

      {/* 操作栏卡片 */}
      <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div class="px-6 py-4 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <div class="flex items-center space-x-3 w-full md:w-auto">
            {/* 批量操作 */}
            <div class="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-2">
              <select id="batch-action" class="bg-transparent px-3 py-2 text-sm font-medium text-slate-600 focus:outline-none min-w-[120px]">
                <option value="">批量操作</option>
                <option value="delete">批量删除</option>
                <option value="show">批量显示</option>
                <option value="hide">批量隐藏</option>
              </select>
              <button 
                id="apply-batch-action" 
                class="ml-1 px-4 py-1.5 text-xs font-bold bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 rounded-lg shadow-sm transition-all active:scale-95">
                应用
              </button>
            </div>

            <div class="h-6 w-[1px] bg-slate-200 hidden md:block"></div>

            {/* 添加按钮 */}
            <a 
              href="/ticloudadmin/resource-categories/new"
              class="flex items-center px-5 py-2.5 text-sm font-bold bg-blue-600 text-white hover:bg-blue-700 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-95 whitespace-nowrap">
              <i class="fas fa-plus mr-2 text-xs"></i>
              创建新栏目
            </a>
          </div>

          {/* 搜索 */}
          <div class="relative w-full md:w-80">
            <i class="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
            <input 
              type="text" 
              id="search-categories"
              placeholder="按名称、标识或描述搜索..."
              class="w-full pl-11 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* 列表表格 */}
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="bg-slate-50/50 text-slate-500 border-b border-slate-100">
                <th class="px-6 py-4 w-12">
                  <input type="checkbox" id="select-all" class="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500/20" />
                </th>
                <th class="px-6 py-4 text-left font-bold uppercase tracking-wider text-[10px]">栏目信息</th>
                <th class="px-6 py-4 text-left font-bold uppercase tracking-wider text-[10px]">标识与路径</th>
                <th class="px-6 py-4 text-center font-bold uppercase tracking-wider text-[10px]">内容模板</th>
                <th class="px-6 py-4 text-center font-bold uppercase tracking-wider text-[10px]">排序值</th>
                <th class="px-6 py-4 text-center font-bold uppercase tracking-wider text-[10px]">发布状态</th>
                <th class="px-6 py-4 text-right font-bold uppercase tracking-wider text-[10px]">操作</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              {categories.length === 0 ? (
                <tr>
                  <td colspan="7" class="px-6 py-20 text-center">
                    <div class="flex flex-col items-center justify-center space-y-4">
                      <div class="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
                        <i class="fas fa-inbox text-2xl"></i>
                      </div>
                      <div class="text-slate-400">暂无栏目数据</div>
                      <a 
                        href="/ticloudadmin/resource-categories/new"
                        class="text-sm font-bold text-blue-600 hover:underline">
                        立即创建第一个栏目
                      </a>
                    </div>
                  </td>
                </tr>
              ) : (
                categories.map((category) => (
                  <tr key={category.id} class="hover:bg-slate-50/50 transition-colors group" data-category-id={category.id}>
                    <td class="px-6 py-4">
                      <input type="checkbox" class="category-checkbox w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500/20" value={category.id} />
                    </td>
                    
                    <td class="px-6 py-4">
                      <div class="flex items-center space-x-4">
                        <div class="flex-shrink-0 w-12 h-12 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                          {category.cover_image ? (
                            <img 
                              src={category.cover_image} 
                              alt={category.name}
                              class="w-full h-full object-cover transition-transform group-hover:scale-110"
                            />
                          ) : (
                            <div class="w-full h-full flex items-center justify-center">
                              <i class="fas fa-image text-slate-300"></i>
                            </div>
                          )}
                        </div>
                        <div class="min-w-0">
                          <div class="font-bold text-slate-900 truncate">{category.name}</div>
                          <div class="text-[11px] text-slate-400 mt-0.5 line-clamp-1 max-w-[200px]">{category.description || '暂无描述信息'}</div>
                        </div>
                      </div>
                    </td>
                    
                    <td class="px-6 py-4">
                      <div class="inline-flex items-center px-2 py-1 bg-blue-50 rounded-lg border border-blue-100">
                        <code class="text-[11px] font-bold text-blue-600">/{category.slug}</code>
                      </div>
                    </td>
                    
                    <td class="px-6 py-4 text-center">
                      <span class="inline-block px-2.5 py-1 text-[10px] font-black uppercase bg-slate-100 text-slate-600 rounded-md border border-slate-200">
                        {category.list_template.replace('list_', '')}
                      </span>
                    </td>
                    
                    <td class="px-6 py-4 text-center">
                      <input 
                        type="number" 
                        value={category.sort_order} 
                        class="w-14 px-2 py-1.5 text-xs font-bold text-center bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:bg-white transition-all"
                        data-field="sort_order"
                      />
                    </td>
                    
                    <td class="px-6 py-4 text-center">
                      {category.is_visible ? (
                        <span class="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                          <span class="w-1 h-1 rounded-full bg-emerald-500 mr-1.5"></span>
                          显示中
                        </span>
                      ) : (
                        <span class="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-500 border border-slate-200">
                          <span class="w-1 h-1 rounded-full bg-slate-400 mr-1.5"></span>
                          已隐藏
                        </span>
                      )}
                    </td>
                    
                    <td class="px-6 py-4 text-right">
                      <div class="flex items-center justify-end space-x-1">
                        <a 
                          href={`/ticloudadmin/resource-categories/edit/${category.id}`}
                          class="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                          title="编辑">
                          <i class="fas fa-edit text-xs"></i>
                        </a>
                        <button 
                          class="delete-category-btn p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                          data-category-id={category.id}
                          title="删除">
                          <i class="fas fa-trash-alt text-xs"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* 分页卡片脚部 */}
        {totalPages > 1 && (
          <div class="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <div class="text-xs font-medium text-slate-500">
              显示 <span class="text-slate-900 font-bold">{(currentPage - 1) * 10 + 1}</span> 到 <span class="text-slate-900 font-bold">{Math.min(currentPage * 10, total)}</span> 条，共 <span class="text-slate-900 font-bold">{total}</span> 条
            </div>
            <div class="flex items-center space-x-1">
              {currentPage > 1 ? (
                <a
                  href={`/ticloudadmin/resource-categories?page=${currentPage - 1}`}
                  class="p-2 text-xs font-bold text-slate-600 hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200 rounded-lg transition-all">
                  <i class="fas fa-chevron-left"></i>
                </a>
              ) : (
                <span class="p-2 text-xs text-slate-300 cursor-not-allowed">
                  <i class="fas fa-chevron-left"></i>
                </span>
              )}

              <div class="flex items-center px-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return page === currentPage ? (
                      <span key={page} class="w-8 h-8 flex items-center justify-center text-xs font-black bg-blue-600 text-white rounded-lg shadow-md shadow-blue-200">
                        {page}
                      </span>
                    ) : (
                      <a
                        key={page}
                        href={`/ticloudadmin/resource-categories?page=${page}`}
                        class="w-8 h-8 flex items-center justify-center text-xs font-bold text-slate-600 hover:bg-white hover:border-slate-200 border border-transparent rounded-lg transition-all">
                        {page}
                      </a>
                    )
                  } else if (
                    (page === currentPage - 2 && currentPage > 3) ||
                    (page === currentPage + 2 && currentPage < totalPages - 2)
                  ) {
                    return <span key={`ellipsis-${page}`} class="w-8 h-8 flex items-center justify-center text-slate-400">...</span>
                  }
                  return null
                })}
              </div>

              {currentPage < totalPages ? (
                <a
                  href={`/ticloudadmin/resource-categories?page=${currentPage + 1}`}
                  class="p-2 text-xs font-bold text-slate-600 hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200 rounded-lg transition-all">
                  <i class="fas fa-chevron-right"></i>
                </a>
              ) : (
                <span class="p-2 text-xs text-slate-300 cursor-not-allowed">
                  <i class="fas fa-chevron-right"></i>
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* JavaScript */}
      <script dangerouslySetInnerHTML={{__html: `
        // 全选
        document.getElementById('select-all')?.addEventListener('change', (e) => {
          document.querySelectorAll('.category-checkbox').forEach(cb => {
            cb.checked = e.target.checked;
          });
        });

        // 删除
        document.querySelectorAll('.delete-category-btn').forEach(btn => {
          btn.addEventListener('click', async () => {
            if (!confirm('确定要删除此栏目吗？')) return;
            
            try {
              const id = btn.getAttribute('data-category-id');
              const res = await fetch('/api/admin/resource-categories/' + id, { method: 'DELETE' });
              const result = await res.json();
              
              if (res.ok && result.success) {
                window.location.reload();
              } else {
                alert('删除失败: ' + result.error);
              }
            } catch (error) {
              alert('删除失败: ' + error.message);
            }
          });
        });

        // 搜索 (前端简易过滤)
        document.getElementById('search-categories')?.addEventListener('input', (e) => {
          const term = e.target.value.toLowerCase();
          document.querySelectorAll('tbody tr[data-category-id]').forEach(row => {
            const text = row.innerText.toLowerCase();
            row.style.display = text.includes(term) ? '' : 'none';
          });
        });

        // 批量操作
        document.getElementById('apply-batch-action')?.addEventListener('click', async () => {
          const action = document.getElementById('batch-action').value;
          if (!action) {
            alert('请选择批量操作');
            return;
          }
          
          const selected = Array.from(document.querySelectorAll('.category-checkbox:checked')).map(cb => parseInt(cb.value));
          if (selected.length === 0) {
            alert('请至少选择一个栏目');
            return;
          }
          
          // 确认操作
          let confirmMsg = '';
          if (action === 'delete') {
            confirmMsg = '确定要删除选中的 ' + selected.length + ' 个栏目吗？此操作不可恢复！';
          } else if (action === 'show') {
            confirmMsg = '确定要显示选中的 ' + selected.length + ' 个栏目吗？';
          } else if (action === 'hide') {
            confirmMsg = '确定要隐藏选中的 ' + selected.length + ' 个栏目吗？';
          }
          
          if (!confirm(confirmMsg)) {
            return;
          }
          
          try {
            const res = await fetch('/api/admin/resource-categories/batch', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                action: action,
                ids: selected
              })
            });
            
            const result = await res.json();
            
            if (res.ok && result.success) {
              alert(result.message || '操作成功');
              window.location.reload();
            } else {
              alert('操作失败: ' + (result.error || '未知错误'));
            }
          } catch (error) {
            alert('操作失败: ' + error.message);
          }
        });

        // 快速排序
        document.querySelectorAll('input[data-field="sort_order"]').forEach(input => {
          let originalValue = input.value;
          
          input.addEventListener('focus', () => {
            originalValue = input.value;
          });
          
          input.addEventListener('blur', async () => {
            if (input.value === originalValue) return;
            
            try {
              const row = input.closest('tr');
              const id = row.getAttribute('data-category-id');
              
              const res = await fetch('/api/admin/resource-categories/' + id, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sort_order: parseInt(input.value) })
              });
              
              if (res.ok) {
                // 成功后轻微延迟刷新，让用户看到数值变化
                setTimeout(() => window.location.reload(), 300);
              }
            } catch (error) {
              input.value = originalValue;
              alert('更新失败');
            }
          });
        });
      `}} />
    </div>
  )
}
