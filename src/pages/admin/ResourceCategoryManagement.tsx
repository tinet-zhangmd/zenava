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
    <div>
      {/* 操作栏 */}
      <div class="bg-white border-b mb-4">
        <div class="px-4 py-3 flex justify-between items-center">
          <div class="flex items-center space-x-3">
            {/* 批量操作 */}
            <select id="batch-action" class="px-3 py-1.5 text-sm border border-gray-300 rounded">
              <option value="">批量操作</option>
              <option value="delete">批量删除</option>
              <option value="show">批量显示</option>
              <option value="hide">批量隐藏</option>
            </select>
            <button 
              id="apply-batch-action" 
              class="px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded">
              应用
            </button>

            {/* 添加按钮 */}
            <a 
              href="/ticloudadmin/resource-categories/new"
              class="px-3 py-1.5 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded">
              添加新栏目
            </a>
          </div>

          {/* 搜索 */}
          <input 
            type="text" 
            id="search-categories"
            placeholder="搜索栏目..."
            class="px-3 py-1.5 text-sm w-64 border border-gray-300 rounded"
          />
        </div>
      </div>

      {/* 列表 */}
      <div class="bg-white border">
        <table class="w-full text-sm">
          <thead class="bg-gray-50 border-b">
            <tr>
              <th class="px-4 py-2 w-10">
                <input type="checkbox" id="select-all" />
              </th>
              <th class="px-4 py-2 text-left font-medium text-gray-600">ID</th>
              <th class="px-4 py-2 text-left font-medium text-gray-600">封面</th>
              <th class="px-4 py-2 text-left font-medium text-gray-600">栏目名称</th>
              <th class="px-4 py-2 text-left font-medium text-gray-600">标识</th>
              <th class="px-4 py-2 text-left font-medium text-gray-600">模板</th>
              <th class="px-4 py-2 text-left font-medium text-gray-600">排序</th>
              <th class="px-4 py-2 text-left font-medium text-gray-600">状态</th>
              <th class="px-4 py-2 text-left font-medium text-gray-600">操作</th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td colspan="9" class="px-4 py-12 text-center text-gray-500">
                  <p class="mb-3">暂无栏目</p>
                  <a 
                    href="/ticloudadmin/resource-categories/new"
                    class="inline-block px-4 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded">
                    添加新栏目
                  </a>
                </td>
              </tr>
            ) : (
              categories.map((category) => (
                <tr key={category.id} class="border-b hover:bg-gray-50" data-category-id={category.id}>
                  <td class="px-4 py-2">
                    <input type="checkbox" class="category-checkbox" value={category.id} />
                  </td>
                  
                  <td class="px-4 py-2 text-gray-600">
                    #{category.id}
                  </td>
                  
                  <td class="px-4 py-2">
                    {category.cover_image ? (
                      <img 
                        src={category.cover_image} 
                        alt={category.name}
                        class="w-16 h-10 object-cover border"
                      />
                    ) : (
                      <div class="w-16 h-10 bg-gray-100 border flex items-center justify-center">
                        <i class="fas fa-image text-gray-400 text-xs"></i>
                      </div>
                    )}
                  </td>
                  
                  <td class="px-4 py-2">
                    <div class="font-medium">{category.name}</div>
                    {category.description && (
                      <div class="text-xs text-gray-500 mt-1 line-clamp-1">{category.description}</div>
                    )}
                  </td>
                  
                  <td class="px-4 py-2">
                    <code class="text-xs text-blue-600">{category.slug}</code>
                  </td>
                  
                  <td class="px-4 py-2">
                    <span class="text-xs px-2 py-1 bg-gray-100 rounded">
                      {category.list_template.replace('list_', '')}
                    </span>
                  </td>
                  
                  <td class="px-4 py-2">
                    <input 
                      type="number" 
                      value={category.sort_order} 
                      class="w-16 px-2 py-1 text-sm border rounded text-center"
                      data-field="sort_order"
                    />
                  </td>
                  
                  <td class="px-4 py-2">
                    <span class={`text-xs px-2 py-1 rounded ${
                      category.is_visible ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {category.is_visible ? '显示' : '隐藏'}
                    </span>
                  </td>
                  
                  <td class="px-4 py-2">
                    <div class="flex items-center space-x-2">
                      <a 
                        href={`/ticloudadmin/resource-categories/edit/${category.id}`}
                        class="text-blue-600 hover:text-blue-800">
                        编辑
                      </a>
                      <button 
                        class="delete-category-btn text-red-600 hover:text-red-800"
                        data-category-id={category.id}>
                        删除
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
        <div class="mt-4 px-4 py-3 bg-white border flex justify-between items-center text-sm">
          <div class="text-gray-600">
            显示 {(currentPage - 1) * 10 + 1} 到 {Math.min(currentPage * 10, total)} 条，共 {total} 条
          </div>
          <div class="flex items-center space-x-2">
            {currentPage > 1 ? (
              <a
                href={`/ticloudadmin/resource-categories?page=${currentPage - 1}`}
                class="px-3 py-1 border hover:bg-gray-50 rounded">
                上一页
              </a>
            ) : (
              <span class="px-3 py-1 border text-gray-400 rounded">上一页</span>
            )}

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 2 && page <= currentPage + 2)
              ) {
                return page === currentPage ? (
                  <span key={page} class="px-3 py-1 bg-blue-600 text-white rounded">
                    {page}
                  </span>
                ) : (
                  <a
                    key={page}
                    href={`/ticloudadmin/resource-categories?page=${page}`}
                    class="px-3 py-1 border hover:bg-gray-50 rounded">
                    {page}
                  </a>
                )
              } else if (
                (page === currentPage - 3 && currentPage > 4) ||
                (page === currentPage + 3 && currentPage < totalPages - 3)
              ) {
                return <span key={`ellipsis-${page}`} class="px-2">...</span>
              }
              return null
            })}

            {currentPage < totalPages ? (
              <a
                href={`/ticloudadmin/resource-categories?page=${currentPage + 1}`}
                class="px-3 py-1 border hover:bg-gray-50 rounded">
                下一页
              </a>
            ) : (
              <span class="px-3 py-1 border text-gray-400 rounded">下一页</span>
            )}
          </div>
        </div>
      )}

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

        // 搜索
        document.getElementById('search-categories')?.addEventListener('input', (e) => {
          const term = e.target.value.toLowerCase();
          document.querySelectorAll('tbody tr[data-category-id]').forEach(row => {
            row.style.display = row.textContent.toLowerCase().includes(term) ? '' : 'none';
          });
        });

        // 批量操作
        document.getElementById('apply-batch-action')?.addEventListener('click', async () => {
          const action = document.getElementById('batch-action').value;
          if (!action) {
            alert('请选择批量操作');
            return;
          }
          
          const selected = Array.from(document.querySelectorAll('.category-checkbox:checked')).map(cb => cb.value);
          if (selected.length === 0) {
            alert('请至少选择一个栏目');
            return;
          }
          
          if (action === 'delete' && !confirm('确定要删除选中的 ' + selected.length + ' 个栏目吗？')) {
            return;
          }
          
          try {
            for (const id of selected) {
              await fetch('/api/admin/resource-categories/' + id, { method: 'DELETE' });
            }
            window.location.reload();
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
