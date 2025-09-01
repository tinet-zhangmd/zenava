import { FC, JSX } from 'hono/jsx'

interface ContentManagementDBProps {
  initialPage?: any
  initialModules?: any[]
}

export const ContentManagementDB: FC<ContentManagementDBProps> = ({ initialPage, initialModules }) => {
  return (
    <div>
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">内容管理</h1>
        <p class="text-gray-600">管理网站页面内容和SEO设置</p>
      </div>

      {/* Pages List */}
      <div id="pages-list-container" class="bg-white rounded-lg shadow-sm mb-8">
        <div class="px-6 py-4 border-b border-gray-200">
          <div class="flex justify-between items-center">
            <h2 class="text-lg font-semibold text-gray-900">页面列表</h2>
            <button id="btn-new-page" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              <i class="fas fa-plus mr-2"></i>新建页面
            </button>
          </div>
        </div>
        
        <div id="pages-list" class="p-6">
          <div class="text-gray-500">加载中...</div>
        </div>
      </div>

      {/* Page Editor */}
      <div id="page-editor" class={initialPage ? '' : 'hidden'}>
        <div class="bg-white rounded-lg shadow-sm">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-xl font-semibold">页面编辑器</h3>
          </div>
          
          <div class="p-6">
            <form id="page-form">
              {/* Basic Info */}
              <div class="mb-8">
                <h4 class="text-lg font-medium mb-4 text-gray-900">基本信息</h4>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">页面标题</label>
                    <input type="text" id="page-title" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">URL Slug</label>
                    <input type="text" id="page-slug" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">语言</label>
                    <select id="page-language" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="en">English</option>
                      <option value="zh">中文</option>
                      <option value="jp">日本語</option>
                      <option value="hk">繁體中文</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">状态</label>
                    <select id="page-status" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="draft">草稿</option>
                      <option value="published">已发布</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* SEO Settings */}
              <div class="mb-8">
                <h4 class="text-lg font-medium mb-4 text-gray-900">SEO 设置</h4>
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">页面标题 (Meta Title)</label>
                    <input type="text" id="seo-title" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                           placeholder="显示在浏览器标签和搜索结果中的标题" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">页面描述 (Meta Description)</label>
                    <textarea id="seo-description" rows="3" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="显示在搜索结果中的描述文字"></textarea>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">关键词 (Keywords)</label>
                    <input type="text" id="seo-keywords" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                           placeholder="用逗号分隔多个关键词" />
                  </div>
                </div>
              </div>

              {/* Content Modules */}
              <div class="mb-8">
                <div class="flex justify-between items-center mb-4">
                  <h4 class="text-lg font-medium text-gray-900">内容模块</h4>
                  <button type="button" id="btn-add-module" class="text-blue-600 hover:text-blue-700 font-medium">
                    <i class="fas fa-plus mr-2"></i>添加模块
                  </button>
                </div>
                <div id="modules-container" class="space-y-4">
                  {/* Modules will be added here dynamically */}
                </div>
              </div>
            </form>
          </div>
          
          <div class="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
            <button type="button" id="btn-cancel" class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              取消
            </button>
            <button type="button" id="btn-save-draft" class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              保存草稿
            </button>
            <button type="button" id="btn-publish" class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
              <i class="fas fa-cloud-upload-alt mr-2"></i>发布
            </button>
          </div>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{__html: `
        let currentPageId = ${initialPage ? initialPage.id : 'null'};
        let modules = ${initialModules ? JSON.stringify(initialModules) : '[]'};

        // Module templates for different types
        const moduleTemplates = {
          hero: {
            title: '标题',
            subtitle: '副标题',
            cta_text: '按钮文字',
            cta_link: '按钮链接',
            background_image: '背景图片URL'
          },
          features: {
            title: '特性标题',
            items: [
              { icon: '图标类名', title: '特性标题', description: '特性描述' }
            ]
          },
          statistics: {
            title: '统计标题',
            stats: [
              { number: '数值', label: '标签' }
            ]
          }
        };

        // Initialize page if editing
        if (${initialPage ? 'true' : 'false'}) {
          initializeEditForm();
        } else {
          loadPages();
        }

        function initializeEditForm() {
          const page = ${initialPage ? JSON.stringify(initialPage) : 'null'};
          if (page) {
            document.getElementById('page-title').value = page.title || '';
            document.getElementById('page-slug').value = page.slug || '';
            document.getElementById('page-language').value = page.language || 'en';
            document.getElementById('page-status').value = page.status || 'draft';
            
            document.getElementById('seo-title').value = page.meta_title || '';
            document.getElementById('seo-description').value = page.meta_description || '';
            document.getElementById('seo-keywords').value = page.meta_keywords || '';
            
            displayModules();
            document.getElementById('pages-list-container').style.display = 'none';
          }
        }

        async function loadPages() {
          try {
            const response = await fetch('/api/cms/pages');
            const data = await response.json();
            
            if (data.success) {
              displayPages(data.data);
            }
          } catch (error) {
            console.error('Error loading pages:', error);
          }
        }

        function displayPages(pages) {
          const container = document.getElementById('pages-list');
          
          if (pages.length === 0) {
            container.innerHTML = '<div class="text-gray-500">没有找到页面，请创建第一个页面！</div>';
            return;
          }
          
          container.innerHTML = \`
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="border-b border-gray-200">
                    <th class="text-left py-3 px-4 font-medium text-gray-700">标题</th>
                    <th class="text-left py-3 px-4 font-medium text-gray-700">Slug</th>
                    <th class="text-left py-3 px-4 font-medium text-gray-700">语言</th>
                    <th class="text-left py-3 px-4 font-medium text-gray-700">状态</th>
                    <th class="text-left py-3 px-4 font-medium text-gray-700">更新时间</th>
                    <th class="text-left py-3 px-4 font-medium text-gray-700">操作</th>
                  </tr>
                </thead>
                <tbody>
                  \${pages.map(page => \`
                    <tr class="border-b border-gray-100 hover:bg-gray-50">
                      <td class="py-3 px-4">\${page.title}</td>
                      <td class="py-3 px-4"><code class="text-sm bg-gray-100 px-2 py-1 rounded">\${page.slug}</code></td>
                      <td class="py-3 px-4">\${page.language}</td>
                      <td class="py-3 px-4">
                        <span class="px-2 py-1 text-xs rounded-full \${
                          page.status === 'published' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }">
                          \${page.status === 'published' ? '已发布' : '草稿'}
                        </span>
                      </td>
                      <td class="py-3 px-4 text-sm text-gray-600">\${new Date(page.updated_at).toLocaleDateString('zh-CN')}</td>
                      <td class="py-3 px-4">
                        <a href="/cms/content/edit/\${page.id}" class="text-blue-600 hover:text-blue-700 mr-3">
                          <i class="fas fa-edit"></i> 编辑
                        </a>
                      </td>
                    </tr>
                  \`).join('')}
                </tbody>
              </table>
            </div>
          \`;
        }

        // Display modules with user-friendly form fields
        function displayModules() {
          const container = document.getElementById('modules-container');
          
          container.innerHTML = modules.map((module, index) => {
            let fieldsHtml = '';
            
            // Parse content if it's a string
            let content = module.content;
            if (typeof content === 'string') {
              try {
                // Handle double-encoded JSON
                content = JSON.parse(content);
                if (typeof content === 'string') {
                  content = JSON.parse(content);
                }
              } catch (e) {
                content = {};
              }
            }
            
            // Generate form fields based on module type
            if (module.module_type === 'hero') {
              fieldsHtml = \`
                <div class="grid grid-cols-2 gap-3">
                  <div>
                    <label class="block text-xs font-medium text-gray-600 mb-1">标题</label>
                    <input type="text" id="module-\${index}-title" value="\${content.title || ''}" 
                           class="w-full px-2 py-1 border rounded text-sm" placeholder="主标题">
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-gray-600 mb-1">副标题</label>
                    <input type="text" id="module-\${index}-subtitle" value="\${content.subtitle || ''}" 
                           class="w-full px-2 py-1 border rounded text-sm" placeholder="副标题">
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-gray-600 mb-1">按钮文字</label>
                    <input type="text" id="module-\${index}-cta_text" value="\${content.cta_text || ''}" 
                           class="w-full px-2 py-1 border rounded text-sm" placeholder="按钮文字">
                  </div>
                  <div>
                    <label class="block text-xs font-medium text-gray-600 mb-1">按钮链接</label>
                    <input type="text" id="module-\${index}-cta_link" value="\${content.cta_link || ''}" 
                           class="w-full px-2 py-1 border rounded text-sm" placeholder="按钮链接">
                  </div>
                </div>
              \`;
            } else if (module.module_type === 'features') {
              const items = content.items || [];
              fieldsHtml = \`
                <div class="space-y-3">
                  <div>
                    <label class="block text-xs font-medium text-gray-600 mb-1">特性标题</label>
                    <input type="text" id="module-\${index}-title" value="\${content.title || ''}" 
                           class="w-full px-2 py-1 border rounded text-sm" placeholder="特性区域标题">
                  </div>
                  <div class="space-y-2">
                    <label class="block text-xs font-medium text-gray-600">特性项目</label>
                    <div id="module-\${index}-items" class="space-y-2">
                      \${items.map((item, itemIndex) => \`
                        <div class="flex gap-2 p-2 bg-gray-50 rounded">
                          <input type="text" id="module-\${index}-item-\${itemIndex}-icon" value="\${item.icon || ''}" 
                                 class="w-1/4 px-2 py-1 border rounded text-sm" placeholder="图标">
                          <input type="text" id="module-\${index}-item-\${itemIndex}-title" value="\${item.title || ''}" 
                                 class="w-1/4 px-2 py-1 border rounded text-sm" placeholder="标题">
                          <input type="text" id="module-\${index}-item-\${itemIndex}-description" value="\${item.description || ''}" 
                                 class="flex-1 px-2 py-1 border rounded text-sm" placeholder="描述">
                          <button type="button" onclick="removeFeatureItem(\${index}, \${itemIndex})" 
                                  class="text-red-500 hover:text-red-700">
                            <i class="fas fa-times"></i>
                          </button>
                        </div>
                      \`).join('')}
                    </div>
                    <button type="button" onclick="addFeatureItem(\${index})" 
                            class="text-blue-600 hover:text-blue-700 text-sm">
                      <i class="fas fa-plus mr-1"></i>添加特性
                    </button>
                  </div>
                </div>
              \`;
            } else if (module.module_type === 'statistics') {
              const stats = content.stats || [];
              fieldsHtml = \`
                <div class="space-y-3">
                  <div>
                    <label class="block text-xs font-medium text-gray-600 mb-1">统计标题</label>
                    <input type="text" id="module-\${index}-title" value="\${content.title || ''}" 
                           class="w-full px-2 py-1 border rounded text-sm" placeholder="统计区域标题">
                  </div>
                  <div class="space-y-2">
                    <label class="block text-xs font-medium text-gray-600">统计项目</label>
                    <div id="module-\${index}-stats" class="grid grid-cols-2 gap-2">
                      \${stats.map((stat, statIndex) => \`
                        <div class="flex gap-2 p-2 bg-gray-50 rounded">
                          <input type="text" id="module-\${index}-stat-\${statIndex}-number" value="\${stat.number || ''}" 
                                 class="w-1/2 px-2 py-1 border rounded text-sm" placeholder="数值">
                          <input type="text" id="module-\${index}-stat-\${statIndex}-label" value="\${stat.label || ''}" 
                                 class="w-1/2 px-2 py-1 border rounded text-sm" placeholder="标签">
                        </div>
                      \`).join('')}
                    </div>
                  </div>
                </div>
              \`;
            } else {
              // Default JSON editor for unknown module types
              fieldsHtml = \`
                <textarea id="module-\${index}-raw" class="w-full px-2 py-1 border rounded text-sm font-mono" 
                          rows="4" placeholder="模块内容 (JSON)">\${JSON.stringify(content, null, 2)}</textarea>
              \`;
            }
            
            return \`
              <div class="border rounded-lg p-4 bg-white">
                <div class="flex justify-between items-start mb-3">
                  <div>
                    <span class="font-medium text-gray-900">\${module.module_name || '未命名模块'}</span>
                    <span class="ml-2 text-sm text-gray-500">(\${module.module_type})</span>
                  </div>
                  <button type="button" onclick="removeModule(\${index})" class="text-red-600 hover:text-red-700">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
                \${fieldsHtml}
              </div>
            \`;
          }).join('');
        }

        // Add feature item
        function addFeatureItem(moduleIndex) {
          const module = modules[moduleIndex];
          let content = module.content;
          if (typeof content === 'string') {
            try {
              content = JSON.parse(content);
              if (typeof content === 'string') {
                content = JSON.parse(content);
              }
            } catch (e) {
              content = {};
            }
          }
          
          if (!content.items) content.items = [];
          content.items.push({ icon: 'fas fa-star', title: '', description: '' });
          module.content = content;
          displayModules();
        }

        // Remove feature item
        function removeFeatureItem(moduleIndex, itemIndex) {
          const module = modules[moduleIndex];
          let content = module.content;
          if (typeof content === 'string') {
            try {
              content = JSON.parse(content);
              if (typeof content === 'string') {
                content = JSON.parse(content);
              }
            } catch (e) {
              content = {};
            }
          }
          
          if (content.items) {
            content.items.splice(itemIndex, 1);
            module.content = content;
            displayModules();
          }
        }

        // Add module
        document.getElementById('btn-add-module')?.addEventListener('click', () => {
          const moduleType = prompt('模块类型 (hero, features, statistics):');
          const moduleName = prompt('模块名称:');
          
          if (moduleType && moduleName) {
            const template = moduleTemplates[moduleType] || {};
            modules.push({
              module_type: moduleType,
              module_name: moduleName,
              content: template,
              is_visible: true,
              status: 'draft'
            });
            displayModules();
          }
        });

        // Remove module
        function removeModule(index) {
          if (confirm('确定要删除这个模块吗？')) {
            modules.splice(index, 1);
            displayModules();
          }
        }

        // Collect module data from form fields
        function collectModuleData() {
          modules.forEach((module, index) => {
            if (module.module_type === 'hero') {
              module.content = {
                title: document.getElementById(\`module-\${index}-title\`)?.value || '',
                subtitle: document.getElementById(\`module-\${index}-subtitle\`)?.value || '',
                cta_text: document.getElementById(\`module-\${index}-cta_text\`)?.value || '',
                cta_link: document.getElementById(\`module-\${index}-cta_link\`)?.value || ''
              };
            } else if (module.module_type === 'features') {
              const items = [];
              let itemIndex = 0;
              while (document.getElementById(\`module-\${index}-item-\${itemIndex}-title\`)) {
                items.push({
                  icon: document.getElementById(\`module-\${index}-item-\${itemIndex}-icon\`)?.value || '',
                  title: document.getElementById(\`module-\${index}-item-\${itemIndex}-title\`)?.value || '',
                  description: document.getElementById(\`module-\${index}-item-\${itemIndex}-description\`)?.value || ''
                });
                itemIndex++;
              }
              module.content = {
                title: document.getElementById(\`module-\${index}-title\`)?.value || '',
                items: items
              };
            } else if (module.module_type === 'statistics') {
              const stats = [];
              let statIndex = 0;
              while (document.getElementById(\`module-\${index}-stat-\${statIndex}-number\`)) {
                stats.push({
                  number: document.getElementById(\`module-\${index}-stat-\${statIndex}-number\`)?.value || '',
                  label: document.getElementById(\`module-\${index}-stat-\${statIndex}-label\`)?.value || ''
                });
                statIndex++;
              }
              module.content = {
                title: document.getElementById(\`module-\${index}-title\`)?.value || '',
                stats: stats
              };
            } else {
              // Handle raw JSON for unknown types
              const rawTextarea = document.getElementById(\`module-\${index}-raw\`);
              if (rawTextarea) {
                try {
                  module.content = JSON.parse(rawTextarea.value);
                } catch (e) {
                  console.error('Invalid JSON in module', index);
                }
              }
            }
          });
        }

        // Save page
        async function savePage(publish = false) {
          collectModuleData();
          
          const pageData = {
            id: currentPageId,
            title: document.getElementById('page-title').value,
            slug: document.getElementById('page-slug').value,
            language: document.getElementById('page-language').value,
            status: publish ? 'published' : document.getElementById('page-status').value,
            seo: {
              meta_title: document.getElementById('seo-title').value,
              meta_description: document.getElementById('seo-description').value,
              meta_keywords: document.getElementById('seo-keywords').value,
              og_title: document.getElementById('seo-title').value,
              og_description: document.getElementById('seo-description').value
            },
            modules: modules
          };
          
          try {
            const response = await fetch('/api/cms/pages', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(pageData)
            });
            
            const data = await response.json();
            
            if (data.success) {
              if (publish && data.data.id) {
                // Also call publish endpoint
                await fetch(\`/api/cms/pages/\${data.data.id}/publish\`, { method: 'POST' });
              }
              
              alert(publish ? '页面已成功发布！' : '页面已保存为草稿！');
              
              // Redirect to list or stay on page
              if (!currentPageId) {
                window.location.href = '/cms/content';
              } else {
                // Reload to show updated data
                window.location.reload();
              }
            } else {
              alert('错误: ' + data.error);
            }
          } catch (error) {
            console.error('Error saving page:', error);
            alert('保存页面时出错');
          }
        }

        // Event listeners
        document.getElementById('btn-new-page')?.addEventListener('click', () => {
          currentPageId = null;
          modules = [];
          document.getElementById('page-form').reset();
          document.getElementById('modules-container').innerHTML = '';
          document.getElementById('page-editor').classList.remove('hidden');
          document.getElementById('pages-list-container').style.display = 'none';
        });

        document.getElementById('btn-cancel')?.addEventListener('click', () => {
          if (${initialPage ? 'true' : 'false'}) {
            window.location.href = '/cms/content';
          } else {
            document.getElementById('page-editor').classList.add('hidden');
            document.getElementById('pages-list-container').style.display = 'block';
            loadPages();
          }
        });

        document.getElementById('btn-save-draft')?.addEventListener('click', () => {
          savePage(false);
        });

        document.getElementById('btn-publish')?.addEventListener('click', () => {
          savePage(true);
        });
      `}} />
    </div>
  )
}