import { FC } from 'hono/jsx'

interface Category {
  id: number
  sort_order: number
  name: string
  slug: string
  list_template: string
  detail_template: string
  is_visible: boolean
}

interface ResourceCategoryManagementProps {
  categories?: Category[]
}

export const ResourceCategoryManagement: FC<ResourceCategoryManagementProps> = ({ categories = [] }) => {
  return (
    <div>
      <div class="mb-6">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">栏目分类管理</h1>
        <p class="text-gray-600">管理资源中心的栏目分类</p>
      </div>

      {/* Action Bar */}
      <div class="bg-white rounded-lg shadow-sm mb-6">
        <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <div class="flex items-center space-x-4">
            {/* Batch Operations */}
            <div class="flex items-center space-x-2">
              <select id="batch-action" class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500">
                <option value="">批量操作</option>
                <option value="delete">批量删除</option>
                <option value="sort">批量排序</option>
                <option value="show">批量显示</option>
                <option value="hide">批量隐藏</option>
              </select>
              <button 
                id="apply-batch-action" 
                class="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
                应用
              </button>
            </div>

            {/* Add New Category Button */}
            <button 
              id="add-new-category-btn"
              class="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center">
              <i class="fas fa-plus mr-2"></i>
              添加新分类
            </button>
          </div>

          {/* Search and Filter */}
          <div class="flex items-center space-x-2">
            <input 
              type="text" 
              id="search-categories"
              placeholder="搜索栏目..."
              class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button class="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
              <i class="fas fa-search"></i>
            </button>
          </div>
        </div>

        {/* Categories Table */}
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50 border-b border-gray-200">
              <tr>
                <th class="px-6 py-3 text-left">
                  <input type="checkbox" id="select-all" class="rounded border-gray-300 text-teal-600 focus:ring-teal-500" />
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">排序</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">名称</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">链接</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">分类模板</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">内容模板</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">显示</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody id="categories-tbody" class="bg-white divide-y divide-gray-200">
              {categories.length === 0 ? (
                <tr>
                  <td colspan="9" class="px-6 py-12 text-center text-gray-500">
                    <div class="flex flex-col items-center">
                      <i class="fas fa-folder-open text-6xl text-gray-300 mb-4"></i>
                      <p class="text-lg font-medium">暂无栏目分类</p>
                      <p class="text-sm mt-2">点击上方"添加新分类"按钮创建第一个栏目</p>
                    </div>
                  </td>
                </tr>
              ) : (
                categories.map((category) => (
                  <tr key={category.id} class="hover:bg-gray-50 transition-colors" data-category-id={category.id}>
                    <td class="px-6 py-4">
                      <input 
                        type="checkbox" 
                        class="category-checkbox rounded border-gray-300 text-teal-600 focus:ring-teal-500" 
                        value={category.id} 
                      />
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-900">
                      <input 
                        type="number" 
                        value={category.sort_order} 
                        class="w-16 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                        data-field="sort_order"
                      />
                    </td>
                    <td class="px-6 py-4 text-sm font-medium text-teal-600">{category.id}</td>
                    <td class="px-6 py-4">
                      <div class="text-sm font-medium text-gray-900">{category.name}</div>
                    </td>
                    <td class="px-6 py-4 text-sm text-teal-600">
                      /{category.slug}
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-900">
                      <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                        {category.list_template}
                      </span>
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-900">
                      <span class="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs font-medium">
                        {category.detail_template}
                      </span>
                    </td>
                    <td class="px-6 py-4 text-sm">
                      <span class={`px-2 py-1 rounded text-xs font-medium ${
                        category.is_visible 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {category.is_visible ? '正常显示' : '隐藏'}
                      </span>
                    </td>
                    <td class="px-6 py-4 text-sm">
                      <div class="flex items-center space-x-2">
                        <button 
                          class="text-teal-600 hover:text-teal-900 edit-category-btn"
                          data-category-id={category.id}
                          title="编辑">
                          <i class="fas fa-edit"></i>
                        </button>
                        <button 
                          class="text-red-600 hover:text-red-900 delete-category-btn"
                          data-category-id={category.id}
                          title="删除">
                          <i class="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Category Modal */}
      <div id="category-modal" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
          <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 class="text-xl font-semibold text-gray-900" id="modal-title">添加新栏目</h3>
            <button id="close-modal-btn" class="text-gray-400 hover:text-gray-600">
              <i class="fas fa-times text-xl"></i>
            </button>
          </div>

          <form id="category-form" class="px-6 py-4">
            <input type="hidden" id="category-id" />

            <div class="space-y-4">
              {/* Sort Order */}
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  排序 <span class="text-red-500">*</span>
                </label>
                <input 
                  type="number" 
                  id="category-sort-order" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="数字越小越靠前"
                  required 
                />
                <p class="text-xs text-gray-500 mt-1">影响资源中心首页的展示顺序</p>
              </div>

              {/* Name */}
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  栏目名称 <span class="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  id="category-name" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="例如：公司动态、行业报告"
                  required 
                />
              </div>

              {/* Slug */}
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  链接 (Slug) <span class="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  id="category-slug" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="例如：/a/186"
                  required 
                />
                <p class="text-xs text-gray-500 mt-1">系统默认格式，建议保持不变</p>
              </div>

              {/* List Template */}
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  分类模板 <span class="text-red-500">*</span>
                </label>
                <select 
                  id="category-list-template" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required>
                  <option value="">请选择分类模板</option>
                  <option value="list_article.html">list_article.html - 文章列表</option>
                  <option value="list_video.html">list_video.html - 视频列表</option>
                  <option value="list_download.html">list_download.html - 下载列表</option>
                </select>
                <p class="text-xs text-gray-500 mt-1">用于展示该栏目下的内容列表</p>
              </div>

              {/* Detail Template */}
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  内容模板 <span class="text-red-500">*</span>
                </label>
                <select 
                  id="category-detail-template" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required>
                  <option value="">请选择内容模板</option>
                  <option value="info_article.html">info_article.html - 文章详情</option>
                  <option value="info_video.html">info_video.html - 视频详情</option>
                  <option value="info_download.html">info_download.html - 下载详情</option>
                </select>
                <p class="text-xs text-gray-500 mt-1">用于展示单个内容的详情页</p>
              </div>

              {/* Visibility */}
              <div>
                <label class="flex items-center space-x-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    id="category-is-visible" 
                    class="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                    checked 
                  />
                  <span class="text-sm font-medium text-gray-700">在前端显示此栏目</span>
                </label>
                <p class="text-xs text-gray-500 mt-1 ml-6">取消勾选后，此栏目将在前端隐藏</p>
              </div>
            </div>

            {/* Form Actions */}
            <div class="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
              <button 
                type="button" 
                id="cancel-form-btn"
                class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                取消
              </button>
              <button 
                type="submit" 
                class="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
                <i class="fas fa-save mr-2"></i>
                保存
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* JavaScript for interactions */}
      <script dangerouslySetInnerHTML={{__html: `
        // Modal controls
        const modal = document.getElementById('category-modal');
        const addNewBtn = document.getElementById('add-new-category-btn');
        const closeModalBtn = document.getElementById('close-modal-btn');
        const cancelFormBtn = document.getElementById('cancel-form-btn');
        const categoryForm = document.getElementById('category-form');
        const modalTitle = document.getElementById('modal-title');

        // Open modal for new category
        addNewBtn?.addEventListener('click', () => {
          modalTitle.textContent = '添加新栏目';
          categoryForm.reset();
          document.getElementById('category-id').value = '';
          document.getElementById('category-is-visible').checked = true;
          modal.classList.remove('hidden');
        });

        // Close modal
        const closeModal = () => {
          modal.classList.add('hidden');
        };
        closeModalBtn?.addEventListener('click', closeModal);
        cancelFormBtn?.addEventListener('click', closeModal);
        modal?.addEventListener('click', (e) => {
          if (e.target === modal) closeModal();
        });

        // Edit category
        document.querySelectorAll('.edit-category-btn').forEach(btn => {
          btn.addEventListener('click', async (e) => {
            const categoryId = e.currentTarget.dataset.categoryId;
            modalTitle.textContent = '编辑栏目';
            
            try {
              const response = await fetch(\`/api/admin/resource-categories/\${categoryId}\`);
              const category = await response.json();
              
              document.getElementById('category-id').value = category.id;
              document.getElementById('category-sort-order').value = category.sort_order;
              document.getElementById('category-name').value = category.name;
              document.getElementById('category-slug').value = category.slug;
              document.getElementById('category-list-template').value = category.list_template;
              document.getElementById('category-detail-template').value = category.detail_template;
              document.getElementById('category-is-visible').checked = category.is_visible;
              
              modal.classList.remove('hidden');
            } catch (error) {
              console.error('Error loading category:', error);
              alert('加载栏目信息失败');
            }
          });
        });

        // Delete category
        document.querySelectorAll('.delete-category-btn').forEach(btn => {
          btn.addEventListener('click', async (e) => {
            const categoryId = e.currentTarget.dataset.categoryId;
            
            if (!confirm('确定要删除此栏目吗？此操作不可恢复。')) {
              return;
            }
            
            try {
              const response = await fetch(\`/api/admin/resource-categories/\${categoryId}\`, {
                method: 'DELETE',
              });
              
              if (response.ok) {
                alert('删除成功');
                window.location.reload();
              } else {
                alert('删除失败');
              }
            } catch (error) {
              console.error('Error deleting category:', error);
              alert('删除失败');
            }
          });
        });

        // Form submission
        categoryForm?.addEventListener('submit', async (e) => {
          e.preventDefault();
          
          const categoryId = document.getElementById('category-id').value;
          const formData = {
            sort_order: parseInt(document.getElementById('category-sort-order').value),
            name: document.getElementById('category-name').value,
            slug: document.getElementById('category-slug').value,
            list_template: document.getElementById('category-list-template').value,
            detail_template: document.getElementById('category-detail-template').value,
            is_visible: document.getElementById('category-is-visible').checked,
          };
          
          try {
            const url = categoryId 
              ? \`/api/admin/resource-categories/\${categoryId}\`
              : '/api/admin/resource-categories';
            
            const response = await fetch(url, {
              method: categoryId ? 'PUT' : 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
            });
            
            if (response.ok) {
              alert(categoryId ? '更新成功' : '创建成功');
              window.location.reload();
            } else {
              alert(categoryId ? '更新失败' : '创建失败');
            }
          } catch (error) {
            console.error('Error saving category:', error);
            alert('保存失败');
          }
        });

        // Select all checkbox
        document.getElementById('select-all')?.addEventListener('change', (e) => {
          const checkboxes = document.querySelectorAll('.category-checkbox');
          checkboxes.forEach(cb => cb.checked = e.target.checked);
        });

        // Batch actions
        document.getElementById('apply-batch-action')?.addEventListener('click', async () => {
          const action = document.getElementById('batch-action').value;
          if (!action) {
            alert('请选择批量操作');
            return;
          }
          
          const selectedIds = Array.from(document.querySelectorAll('.category-checkbox:checked'))
            .map(cb => cb.value);
          
          if (selectedIds.length === 0) {
            alert('请至少选择一个栏目');
            return;
          }
          
          if (action === 'delete' && !confirm(\`确定要删除选中的 \${selectedIds.length} 个栏目吗？\`)) {
            return;
          }
          
          try {
            const response = await fetch('/api/admin/resource-categories/batch', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ action, ids: selectedIds }),
            });
            
            if (response.ok) {
              alert('操作成功');
              window.location.reload();
            } else {
              alert('操作失败');
            }
          } catch (error) {
            console.error('Error performing batch action:', error);
            alert('操作失败');
          }
        });

        // Auto-update sort order
        document.querySelectorAll('[data-field="sort_order"]').forEach(input => {
          let timeout;
          input.addEventListener('change', async (e) => {
            clearTimeout(timeout);
            timeout = setTimeout(async () => {
              const row = e.target.closest('tr');
              const categoryId = row.dataset.categoryId;
              const newSortOrder = parseInt(e.target.value);
              
              try {
                const response = await fetch(\`/api/admin/resource-categories/\${categoryId}/sort\`, {
                  method: 'PATCH',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ sort_order: newSortOrder }),
                });
                
                if (response.ok) {
                  // Optionally show success indicator
                  e.target.classList.add('border-green-500');
                  setTimeout(() => e.target.classList.remove('border-green-500'), 1000);
                }
              } catch (error) {
                console.error('Error updating sort order:', error);
              }
            }, 500);
          });
        });
      `}} />
    </div>
  )
}
