import { FC } from 'hono/jsx'

interface Content {
  id: number
  category_id: number
  category_name: string
  title: string
  slug: string
  thumbnail?: string
  author?: string
  publish_date: string
  views: number
  status: 'draft' | 'published'
  is_featured: boolean
}

interface ResourceContentManagementProps {
  contents?: Content[]
  categories?: Array<{ id: number; name: string }>
}

export const ResourceContentManagement: FC<ResourceContentManagementProps> = ({ 
  contents = [], 
  categories = [] 
}) => {
  return (
    <div>
      <div class="mb-6">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">内容列表管理</h1>
        <p class="text-gray-600">管理资源中心的所有内容</p>
      </div>

      {/* Action Bar */}
      <div class="bg-white rounded-lg shadow-sm mb-6">
        <div class="px-6 py-4 border-b border-gray-200">
          <div class="flex justify-between items-center mb-4">
            <div class="flex items-center space-x-4">
              {/* Batch Operations */}
              <div class="flex items-center space-x-2">
                <select id="batch-action" class="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500">
                  <option value="">批量操作</option>
                  <option value="delete">批量删除</option>
                  <option value="publish">批量发布</option>
                  <option value="draft">批量设为草稿</option>
                  <option value="feature">批量设为推荐</option>
                  <option value="unfeature">批量取消推荐</option>
                </select>
                <button 
                  id="apply-batch-action" 
                  class="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
                  应用
                </button>
              </div>

              {/* Add New Content Button */}
              <button 
                id="add-new-content-btn"
                class="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors flex items-center">
                <i class="fas fa-plus mr-2"></i>
                添加新内容
              </button>
            </div>
          </div>

          {/* Filters */}
          <div class="flex items-center space-x-4">
            {/* Category Filter */}
            <div class="flex-1">
              <select id="filter-category" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500">
                <option value="">所有栏目</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div class="flex-1">
              <select id="filter-status" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500">
                <option value="">所有状态</option>
                <option value="published">已发布</option>
                <option value="draft">草稿</option>
              </select>
            </div>

            {/* Search */}
            <div class="flex-1">
              <div class="flex items-center space-x-2">
                <input 
                  type="text" 
                  id="search-content"
                  placeholder="搜索标题或作者..."
                  class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <button class="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
                  <i class="fas fa-search"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Contents Table */}
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50 border-b border-gray-200">
              <tr>
                <th class="px-6 py-3 text-left">
                  <input type="checkbox" id="select-all" class="rounded border-gray-300 text-teal-600 focus:ring-teal-500" />
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">缩略图</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">标题</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">栏目</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">作者</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">发布日期</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">浏览量</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody id="contents-tbody" class="bg-white divide-y divide-gray-200">
              {contents.length === 0 ? (
                <tr>
                  <td colspan="10" class="px-6 py-12 text-center text-gray-500">
                    <div class="flex flex-col items-center">
                      <i class="fas fa-file-alt text-6xl text-gray-300 mb-4"></i>
                      <p class="text-lg font-medium">暂无内容</p>
                      <p class="text-sm mt-2">点击上方"添加新内容"按钮创建第一个内容</p>
                    </div>
                  </td>
                </tr>
              ) : (
                contents.map((content) => (
                  <tr key={content.id} class="hover:bg-gray-50 transition-colors" data-content-id={content.id}>
                    <td class="px-6 py-4">
                      <input 
                        type="checkbox" 
                        class="content-checkbox rounded border-gray-300 text-teal-600 focus:ring-teal-500" 
                        value={content.id} 
                      />
                    </td>
                    <td class="px-6 py-4 text-sm font-medium text-teal-600">{content.id}</td>
                    <td class="px-6 py-4">
                      {content.thumbnail ? (
                        <img 
                          src={content.thumbnail} 
                          alt={content.title}
                          class="w-16 h-16 object-cover rounded"
                        />
                      ) : (
                        <div class="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                          <i class="fas fa-image text-gray-400"></i>
                        </div>
                      )}
                    </td>
                    <td class="px-6 py-4">
                      <div class="flex items-center space-x-2">
                        <div class="text-sm font-medium text-gray-900">
                          {content.title}
                          {content.is_featured && (
                            <span class="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded">
                              <i class="fas fa-star mr-1"></i>推荐
                            </span>
                          )}
                        </div>
                      </div>
                      <div class="text-xs text-gray-500 mt-1">{content.slug}</div>
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-900">
                      <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                        {content.category_name}
                      </span>
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-900">{content.author || '-'}</td>
                    <td class="px-6 py-4 text-sm text-gray-500">{content.publish_date}</td>
                    <td class="px-6 py-4 text-sm text-gray-900">
                      <i class="fas fa-eye mr-1 text-gray-400"></i>
                      {content.views}
                    </td>
                    <td class="px-6 py-4 text-sm">
                      <span class={`px-2 py-1 rounded text-xs font-medium ${
                        content.status === 'published' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {content.status === 'published' ? '已发布' : '草稿'}
                      </span>
                    </td>
                    <td class="px-6 py-4 text-sm">
                      <div class="flex items-center space-x-2">
                        <button 
                          class="text-teal-600 hover:text-teal-900 edit-content-btn"
                          data-content-id={content.id}
                          title="编辑">
                          <i class="fas fa-edit"></i>
                        </button>
                        <button 
                          class="text-blue-600 hover:text-blue-900 view-content-btn"
                          data-content-id={content.id}
                          title="查看">
                          <i class="fas fa-eye"></i>
                        </button>
                        <button 
                          class="text-red-600 hover:text-red-900 delete-content-btn"
                          data-content-id={content.id}
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

        {/* Pagination */}
        {contents.length > 0 && (
          <div class="px-6 py-4 border-t border-gray-200">
            <div class="flex justify-between items-center">
              <div class="text-sm text-gray-700">
                显示 <span class="font-medium">1</span> 到 <span class="font-medium">{contents.length}</span> 共 <span class="font-medium">{contents.length}</span> 条
              </div>
              <div class="flex space-x-2">
                <button class="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50" disabled>
                  上一页
                </button>
                <button class="px-3 py-1 bg-teal-600 text-white rounded">1</button>
                <button class="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50" disabled>
                  下一页
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Content Modal */}
      <div id="content-modal" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
        <div class="bg-white rounded-lg shadow-xl w-full max-w-4xl mx-4 my-8">
          <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 class="text-xl font-semibold text-gray-900" id="modal-title">添加新内容</h3>
            <button id="close-modal-btn" class="text-gray-400 hover:text-gray-600">
              <i class="fas fa-times text-xl"></i>
            </button>
          </div>

          <form id="content-form" class="px-6 py-4 max-h-[calc(100vh-200px)] overflow-y-auto">
            <input type="hidden" id="content-id" />

            <div class="space-y-6">
              {/* Category */}
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  所属栏目 <span class="text-red-500">*</span>
                </label>
                <select 
                  id="content-category" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required>
                  <option value="">请选择栏目</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              {/* Title */}
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  标题 <span class="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  id="content-title" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="输入内容标题"
                  required 
                />
              </div>

              {/* Slug */}
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  URL Slug <span class="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  id="content-slug" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="例如：article-title"
                  required 
                />
              </div>

              {/* Thumbnail */}
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  缩略图
                </label>
                <div class="flex items-center space-x-4">
                  <input 
                    type="text" 
                    id="content-thumbnail" 
                    class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="图片URL或路径"
                  />
                  <button 
                    type="button" 
                    class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                    <i class="fas fa-upload mr-2"></i>上传
                  </button>
                </div>
              </div>

              {/* Author and Date */}
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    作者
                  </label>
                  <input 
                    type="text" 
                    id="content-author" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="作者名称"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    发布日期
                  </label>
                  <input 
                    type="date" 
                    id="content-publish-date" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              {/* Summary */}
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  摘要
                </label>
                <textarea 
                  id="content-summary" 
                  rows="3"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="输入内容摘要"
                ></textarea>
              </div>

              {/* Content */}
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  内容 <span class="text-red-500">*</span>
                </label>
                <div id="content-editor" class="border border-gray-300 rounded-lg" style="min-height: 300px;"></div>
                <input type="hidden" id="content-body" />
              </div>

              {/* Tags */}
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  标签
                </label>
                <input 
                  type="text" 
                  id="content-tags" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="多个标签用逗号分隔"
                />
              </div>

              {/* Options */}
              <div class="space-y-2">
                <label class="flex items-center space-x-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    id="content-is-featured" 
                    class="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                  />
                  <span class="text-sm font-medium text-gray-700">设为推荐内容</span>
                </label>
                <label class="flex items-center space-x-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    id="content-is-published" 
                    class="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                    checked
                  />
                  <span class="text-sm font-medium text-gray-700">立即发布</span>
                </label>
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

      {/* Initialize Quill Editor */}
      <script dangerouslySetInnerHTML={{__html: `
        let quillEditor;
        
        // Initialize Quill when modal opens
        const initQuillEditor = () => {
          if (!quillEditor && document.getElementById('content-editor')) {
            quillEditor = new Quill('#content-editor', {
              theme: 'snow',
              modules: {
                toolbar: [
                  [{ 'header': [1, 2, 3, false] }],
                  ['bold', 'italic', 'underline', 'strike'],
                  ['blockquote', 'code-block'],
                  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                  [{ 'color': [] }, { 'background': [] }],
                  ['link', 'image'],
                  ['clean']
                ]
              }
            });
          }
        };

        // Modal controls
        const modal = document.getElementById('content-modal');
        const addNewBtn = document.getElementById('add-new-content-btn');
        const closeModalBtn = document.getElementById('close-modal-btn');
        const cancelFormBtn = document.getElementById('cancel-form-btn');
        const contentForm = document.getElementById('content-form');
        const modalTitle = document.getElementById('modal-title');

        // Open modal for new content
        addNewBtn?.addEventListener('click', () => {
          modalTitle.textContent = '添加新内容';
          contentForm.reset();
          document.getElementById('content-id').value = '';
          document.getElementById('content-is-published').checked = true;
          modal.classList.remove('hidden');
          initQuillEditor();
          if (quillEditor) {
            quillEditor.setContents([]);
          }
        });

        // Close modal
        const closeModal = () => {
          modal.classList.add('hidden');
        };
        closeModalBtn?.addEventListener('click', closeModal);
        cancelFormBtn?.addEventListener('click', closeModal);

        // Edit content
        document.querySelectorAll('.edit-content-btn').forEach(btn => {
          btn.addEventListener('click', async (e) => {
            const contentId = e.currentTarget.dataset.contentId;
            modalTitle.textContent = '编辑内容';
            
            try {
              const response = await fetch(\`/api/admin/resource-contents/\${contentId}\`);
              const content = await response.json();
              
              document.getElementById('content-id').value = content.id;
              document.getElementById('content-category').value = content.category_id;
              document.getElementById('content-title').value = content.title;
              document.getElementById('content-slug').value = content.slug;
              document.getElementById('content-thumbnail').value = content.thumbnail || '';
              document.getElementById('content-author').value = content.author || '';
              document.getElementById('content-publish-date').value = content.publish_date;
              document.getElementById('content-summary').value = content.summary || '';
              document.getElementById('content-tags').value = content.tags || '';
              document.getElementById('content-is-featured').checked = content.is_featured;
              document.getElementById('content-is-published').checked = content.status === 'published';
              
              modal.classList.remove('hidden');
              initQuillEditor();
              if (quillEditor && content.body) {
                quillEditor.root.innerHTML = content.body;
              }
            } catch (error) {
              console.error('Error loading content:', error);
              alert('加载内容失败');
            }
          });
        });

        // Delete content
        document.querySelectorAll('.delete-content-btn').forEach(btn => {
          btn.addEventListener('click', async (e) => {
            const contentId = e.currentTarget.dataset.contentId;
            
            if (!confirm('确定要删除此内容吗？此操作不可恢复。')) {
              return;
            }
            
            try {
              const response = await fetch(\`/api/admin/resource-contents/\${contentId}\`, {
                method: 'DELETE',
              });
              
              if (response.ok) {
                alert('删除成功');
                window.location.reload();
              } else {
                alert('删除失败');
              }
            } catch (error) {
              console.error('Error deleting content:', error);
              alert('删除失败');
            }
          });
        });

        // Form submission
        contentForm?.addEventListener('submit', async (e) => {
          e.preventDefault();
          
          const contentId = document.getElementById('content-id').value;
          const formData = {
            category_id: parseInt(document.getElementById('content-category').value),
            title: document.getElementById('content-title').value,
            slug: document.getElementById('content-slug').value,
            thumbnail: document.getElementById('content-thumbnail').value,
            author: document.getElementById('content-author').value,
            publish_date: document.getElementById('content-publish-date').value,
            summary: document.getElementById('content-summary').value,
            body: quillEditor ? quillEditor.root.innerHTML : '',
            tags: document.getElementById('content-tags').value,
            is_featured: document.getElementById('content-is-featured').checked,
            status: document.getElementById('content-is-published').checked ? 'published' : 'draft',
          };
          
          try {
            const url = contentId 
              ? \`/api/admin/resource-contents/\${contentId}\`
              : '/api/admin/resource-contents';
            
            const response = await fetch(url, {
              method: contentId ? 'PUT' : 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
            });
            
            if (response.ok) {
              alert(contentId ? '更新成功' : '创建成功');
              window.location.reload();
            } else {
              alert(contentId ? '更新失败' : '创建失败');
            }
          } catch (error) {
            console.error('Error saving content:', error);
            alert('保存失败');
          }
        });

        // Select all checkbox
        document.getElementById('select-all')?.addEventListener('change', (e) => {
          const checkboxes = document.querySelectorAll('.content-checkbox');
          checkboxes.forEach(cb => cb.checked = e.target.checked);
        });

        // Batch actions
        document.getElementById('apply-batch-action')?.addEventListener('click', async () => {
          const action = document.getElementById('batch-action').value;
          if (!action) {
            alert('请选择批量操作');
            return;
          }
          
          const selectedIds = Array.from(document.querySelectorAll('.content-checkbox:checked'))
            .map(cb => cb.value);
          
          if (selectedIds.length === 0) {
            alert('请至少选择一个内容');
            return;
          }
          
          if (action === 'delete' && !confirm(\`确定要删除选中的 \${selectedIds.length} 个内容吗？\`)) {
            return;
          }
          
          try {
            const response = await fetch('/api/admin/resource-contents/batch', {
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

        // Filter functionality
        const applyFilters = () => {
          const categoryFilter = document.getElementById('filter-category').value;
          const statusFilter = document.getElementById('filter-status').value;
          const searchText = document.getElementById('search-content').value.toLowerCase();
          
          const rows = document.querySelectorAll('#contents-tbody tr[data-content-id]');
          rows.forEach(row => {
            let show = true;
            
            // Apply filters logic here
            // This is a placeholder - actual implementation would filter based on data attributes
            
            row.style.display = show ? '' : 'none';
          });
        };

        document.getElementById('filter-category')?.addEventListener('change', applyFilters);
        document.getElementById('filter-status')?.addEventListener('change', applyFilters);
        document.getElementById('search-content')?.addEventListener('input', applyFilters);
      `}} />
    </div>
  )
}
