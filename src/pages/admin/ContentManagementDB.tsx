import { FC, JSX } from 'hono/jsx'

export const ContentManagementDB: FC = () => {
  return (
    <div>
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Content Management</h1>
        <p class="text-gray-600">Manage all website content from database</p>
      </div>

      {/* Pages List */}
      <div class="bg-white rounded-lg shadow-sm">
        <div class="px-6 py-4 border-b border-gray-200">
          <div class="flex justify-between items-center">
            <h2 class="text-lg font-semibold text-gray-900">Pages</h2>
            <button id="btn-new-page" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              <i class="fas fa-plus mr-2"></i>New Page
            </button>
          </div>
        </div>
        
        <div id="pages-list" class="p-6">
          <div class="text-gray-500">Loading pages...</div>
        </div>
      </div>

      {/* Page Editor Modal */}
      <div id="page-editor" class="hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div class="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
          <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 class="text-xl font-semibold">Page Editor</h3>
            <button id="btn-close-editor" class="text-gray-500 hover:text-gray-700">
              <i class="fas fa-times text-xl"></i>
            </button>
          </div>
          
          <div class="flex-1 overflow-auto p-6">
            <form id="page-form">
              {/* Basic Info */}
              <div class="mb-6">
                <h4 class="text-lg font-medium mb-4">Basic Information</h4>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Page Title</label>
                    <input type="text" id="page-title" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">URL Slug</label>
                    <input type="text" id="page-slug" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Language</label>
                    <select id="page-language" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="en">English</option>
                      <option value="zh">中文</option>
                      <option value="jp">日本語</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select id="page-status" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* SEO Settings */}
              <div class="mb-6">
                <h4 class="text-lg font-medium mb-4">SEO Settings</h4>
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Meta Title</label>
                    <input type="text" id="seo-title" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
                    <textarea id="seo-description" rows="3" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Keywords</label>
                    <input type="text" id="seo-keywords" class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Separate with commas" />
                  </div>
                </div>
              </div>

              {/* Content Modules */}
              <div class="mb-6">
                <div class="flex justify-between items-center mb-4">
                  <h4 class="text-lg font-medium">Content Modules</h4>
                  <button type="button" id="btn-add-module" class="text-blue-600 hover:text-blue-700">
                    <i class="fas fa-plus mr-2"></i>Add Module
                  </button>
                </div>
                <div id="modules-container" class="space-y-4">
                  {/* Modules will be added here dynamically */}
                </div>
              </div>
            </form>
          </div>
          
          <div class="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
            <button type="button" id="btn-save-draft" class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Save as Draft
            </button>
            <button type="button" id="btn-publish" class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
              <i class="fas fa-cloud-upload-alt mr-2"></i>Publish
            </button>
          </div>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{__html: `
        let currentPageId = null;
        let modules = [];

        // Load pages on init
        loadPages();

        async function loadPages() {
          try {
            const response = await fetch('/api/cms/pages');
            const data = await response.json();
            
            if (data.success) {
              displayPages(data.data);
            } else {
              console.error('Failed to load pages:', data.error);
            }
          } catch (error) {
            console.error('Error loading pages:', error);
          }
        }

        function displayPages(pages) {
          const container = document.getElementById('pages-list');
          
          if (pages.length === 0) {
            container.innerHTML = '<div class="text-gray-500">No pages found. Create your first page!</div>';
            return;
          }
          
          container.innerHTML = \`
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="border-b border-gray-200">
                    <th class="text-left py-3 px-4 font-medium text-gray-700">Title</th>
                    <th class="text-left py-3 px-4 font-medium text-gray-700">Slug</th>
                    <th class="text-left py-3 px-4 font-medium text-gray-700">Language</th>
                    <th class="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                    <th class="text-left py-3 px-4 font-medium text-gray-700">Updated</th>
                    <th class="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
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
                          \${page.status}
                        </span>
                      </td>
                      <td class="py-3 px-4 text-sm text-gray-600">\${new Date(page.updated_at).toLocaleDateString()}</td>
                      <td class="py-3 px-4">
                        <button onclick="editPage(\${page.id})" class="text-blue-600 hover:text-blue-700 mr-3">
                          <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="deletePage(\${page.id})" class="text-red-600 hover:text-red-700">
                          <i class="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  \`).join('')}
                </tbody>
              </table>
            </div>
          \`;
        }

        // Edit page
        async function editPage(pageId) {
          currentPageId = pageId;
          
          try {
            const response = await fetch(\`/api/cms/pages/\${pageId}\`);
            const data = await response.json();
            
            if (data.success) {
              const page = data.data;
              
              // Fill form
              document.getElementById('page-title').value = page.title || '';
              document.getElementById('page-slug').value = page.slug || '';
              document.getElementById('page-language').value = page.language || 'en';
              document.getElementById('page-status').value = page.status || 'draft';
              
              // Fill SEO
              document.getElementById('seo-title').value = page.meta_title || '';
              document.getElementById('seo-description').value = page.meta_description || '';
              document.getElementById('seo-keywords').value = page.meta_keywords || '';
              
              // Load modules
              modules = page.modules || [];
              displayModules();
              
              // Show editor
              document.getElementById('page-editor').classList.remove('hidden');
            }
          } catch (error) {
            console.error('Error loading page:', error);
          }
        }

        // Display modules
        function displayModules() {
          const container = document.getElementById('modules-container');
          
          container.innerHTML = modules.map((module, index) => \`
            <div class="border rounded-lg p-4 bg-gray-50">
              <div class="flex justify-between items-start mb-3">
                <div>
                  <span class="font-medium">\${module.module_name}</span>
                  <span class="ml-2 text-sm text-gray-500">(\${module.module_type})</span>
                </div>
                <button type="button" onclick="removeModule(\${index})" class="text-red-600 hover:text-red-700">
                  <i class="fas fa-trash"></i>
                </button>
              </div>
              <textarea 
                id="module-content-\${index}"
                class="w-full px-3 py-2 border rounded-lg text-sm font-mono"
                rows="4"
                placeholder="Module content (JSON)"
              >\${JSON.stringify(module.content, null, 2)}</textarea>
            </div>
          \`).join('');
        }

        // Add module
        document.getElementById('btn-add-module').addEventListener('click', () => {
          const moduleType = prompt('Module type (hero, features, statistics, etc.):');
          const moduleName = prompt('Module name:');
          
          if (moduleType && moduleName) {
            modules.push({
              module_type: moduleType,
              module_name: moduleName,
              content: {},
              is_visible: true,
              status: 'draft'
            });
            displayModules();
          }
        });

        // Remove module
        function removeModule(index) {
          modules.splice(index, 1);
          displayModules();
        }

        // Save page
        async function savePage(publish = false) {
          // Collect module content
          modules.forEach((module, index) => {
            const textarea = document.getElementById(\`module-content-\${index}\`);
            if (textarea) {
              try {
                module.content = JSON.parse(textarea.value);
              } catch (e) {
                console.error('Invalid JSON in module', index);
              }
            }
          });
          
          const pageData = {
            id: currentPageId,
            title: document.getElementById('page-title').value,
            slug: document.getElementById('page-slug').value,
            language: document.getElementById('page-language').value,
            status: publish ? 'published' : document.getElementById('page-status').value,
            seo: {
              meta_title: document.getElementById('seo-title').value,
              meta_description: document.getElementById('seo-description').value,
              meta_keywords: document.getElementById('seo-keywords').value
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
                // Publish the page
                await fetch(\`/api/cms/pages/\${data.data.id}/publish\`, { method: 'POST' });
              }
              
              alert(publish ? 'Page published successfully!' : 'Page saved successfully!');
              document.getElementById('page-editor').classList.add('hidden');
              loadPages();
            } else {
              alert('Error: ' + data.error);
            }
          } catch (error) {
            console.error('Error saving page:', error);
            alert('Error saving page');
          }
        }

        // Event listeners
        document.getElementById('btn-new-page').addEventListener('click', () => {
          currentPageId = null;
          modules = [];
          document.getElementById('page-form').reset();
          document.getElementById('modules-container').innerHTML = '';
          document.getElementById('page-editor').classList.remove('hidden');
        });

        document.getElementById('btn-close-editor').addEventListener('click', () => {
          document.getElementById('page-editor').classList.add('hidden');
        });

        document.getElementById('btn-save-draft').addEventListener('click', () => {
          savePage(false);
        });

        document.getElementById('btn-publish').addEventListener('click', () => {
          savePage(true);
        });

        // Delete page
        async function deletePage(pageId) {
          if (!confirm('Are you sure you want to delete this page?')) return;
          
          try {
            // For now, just remove from display
            alert('Delete functionality to be implemented');
            loadPages();
          } catch (error) {
            console.error('Error deleting page:', error);
          }
        }
      `}} />
    </div>
  )
}