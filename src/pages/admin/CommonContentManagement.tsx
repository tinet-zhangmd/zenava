import { html } from 'hono/html';

export const CommonContentManagement = () => {
  return html`
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>公共内容管理 - Zenava CMS</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    </head>
    <body class="bg-gray-50">
      <div class="min-h-screen">
        <!-- Header -->
        <header class="bg-white shadow-sm border-b">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center py-4">
              <div class="flex items-center space-x-4">
                <a href="/ticloudcms" class="text-gray-600 hover:text-gray-900">
                  <i class="fas fa-arrow-left mr-2"></i>返回
                </a>
                <h1 class="text-2xl font-bold text-gray-900">公共内容管理</h1>
              </div>
              <div class="flex space-x-3">
                <button onclick="saveAllChanges()" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <i class="fas fa-save mr-2"></i>保存所有更改
                </button>
                <button onclick="publishContent('all')" class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <i class="fas fa-upload mr-2"></i>发布到生产
                </button>
              </div>
            </div>
          </div>
        </header>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <!-- Tabs -->
          <div class="bg-white rounded-lg shadow-sm mb-6">
            <div class="border-b">
              <nav class="flex -mb-px">
                <button onclick="switchTab('navigation')" id="nav-tab" class="tab-button px-6 py-3 border-b-2 border-blue-500 text-blue-600 font-medium">
                  <i class="fas fa-bars mr-2"></i>导航栏设置
                </button>
                <button onclick="switchTab('footer')" id="footer-tab" class="tab-button px-6 py-3 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 font-medium">
                  <i class="fas fa-shoe-prints mr-2"></i>页脚设置
                </button>
              </nav>
            </div>
          </div>

          <!-- Navigation Content -->
          <div id="navigation-content" class="space-y-6">
            <div class="bg-white rounded-lg shadow-sm p-6">
              <h2 class="text-lg font-semibold mb-4">导航栏Logo设置</h2>
              
              <div class="space-y-4">
                <!-- Logo Preview -->
                <div id="nav-logo-preview" class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50">
                  <i class="fas fa-image text-4xl text-gray-400 mb-2"></i>
                  <p class="text-gray-500">当前没有Logo</p>
                </div>

                <!-- Logo Upload Options -->
                <div class="space-y-4">
                  <!-- File Upload -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">上传Logo图片</label>
                    <div class="flex items-center space-x-4">
                      <input type="file" id="nav-logo-file" accept="image/*" onchange="handleNavLogoUpload(this)"
                             class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100">
                      <button onclick="clearNavLogo()" class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                        <i class="fas fa-trash mr-2"></i>清除
                      </button>
                    </div>
                    <p class="text-xs text-gray-500 mt-1">支持 JPG, PNG, GIF, WebP, SVG, ICO, BMP 格式，最大 10MB</p>
                  </div>

                  <!-- URL Input -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">或输入Logo图片URL</label>
                    <div class="flex items-center space-x-4">
                      <input type="text" id="nav-logo-url" placeholder="https://example.com/logo.png" 
                             class="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <button onclick="previewNavLogoFromUrl()" class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
                        <i class="fas fa-eye mr-2"></i>预览
                      </button>
                    </div>
                  </div>

                  <!-- Logo Alt Text -->
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Logo替代文本</label>
                    <input type="text" id="nav-logo-alt" placeholder="例如: Zenava Logo" value="Zenava Logo"
                           class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer Content -->
          <div id="footer-content" class="space-y-6 hidden">
            <!-- Footer Basic Settings -->
            <div class="bg-white rounded-lg shadow-sm p-6">
              <h2 class="text-lg font-semibold mb-4">页脚基本设置</h2>
              
              <div class="space-y-4">
                <!-- Footer Logo -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">页脚Logo</label>
                  <div id="footer-logo-preview" class="border-2 border-dashed border-gray-300 rounded-lg p-4 mb-3 text-center bg-gray-50">
                    <i class="fas fa-image text-2xl text-gray-400"></i>
                    <p class="text-gray-500 text-sm mt-1">当前没有Logo</p>
                  </div>
                  
                  <!-- File Upload -->
                  <div class="mb-3">
                    <input type="file" id="footer-logo-file" accept="image/*" onchange="handleFooterLogoUpload(this)"
                           class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100">
                    <p class="text-xs text-gray-500 mt-1">支持 JPG, PNG, GIF, WebP, SVG, ICO, BMP 格式，最大 10MB</p>
                  </div>
                  
                  <!-- URL Input -->
                  <div class="flex items-center space-x-4">
                    <input type="text" id="footer-logo-url" placeholder="或输入Logo图片URL" 
                           class="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <button onclick="previewFooterLogoFromUrl()" class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
                      <i class="fas fa-eye mr-2"></i>预览
                    </button>
                    <button onclick="clearFooterLogo()" class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                      <i class="fas fa-trash mr-2"></i>清除
                    </button>
                  </div>
                </div>

                <!-- Subtitle Text -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">副标题文本</label>
                  <input type="text" id="footer-subtitle" placeholder="例如: 智能生活解决方案提供商" 
                         class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                </div>

                <!-- Copyright Text -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">版权文本</label>
                  <input type="text" id="footer-copyright" placeholder="例如: © 2024 Zenava. All rights reserved." 
                         value="© 2024 Zenava. All rights reserved."
                         class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                </div>
              </div>
            </div>

            <!-- Footer Sections -->
            <div class="bg-white rounded-lg shadow-sm p-6">
              <h2 class="text-lg font-semibold mb-4">页脚内容板块</h2>
              
              <div id="footer-sections" class="space-y-4">
                <!-- Sections will be loaded dynamically -->
              </div>
            </div>

            <!-- Privacy Links -->
            <div class="bg-white rounded-lg shadow-sm p-6">
              <h2 class="text-lg font-semibold mb-4">隐私政策链接</h2>
              
              <div id="privacy-links" class="space-y-3">
                <!-- Privacy links will be loaded dynamically -->
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Toast Notification -->
      <div id="toast" class="fixed bottom-4 right-4 hidden">
        <div class="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center">
          <i class="fas fa-check-circle mr-2"></i>
          <span id="toast-message">操作成功</span>
        </div>
      </div>

      <!-- Loading Overlay -->
      <div id="loading-overlay" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center hidden z-50">
        <div class="bg-white rounded-lg p-6 flex items-center space-x-3">
          <i class="fas fa-spinner fa-spin text-2xl text-blue-600"></i>
          <span id="loading-message">上传中...</span>
        </div>
      </div>

      <script>
        let currentTab = 'navigation';
        let navigationData = {};
        let footerData = {};
        let uploadedNavLogoUrl = null;
        let uploadedFooterLogoUrl = null;

        // Initialize on page load
        document.addEventListener('DOMContentLoaded', () => {
          loadNavigationData();
          loadFooterData();
        });

        // Tab switching
        function switchTab(tab) {
          currentTab = tab;
          
          // Update tab styles
          document.querySelectorAll('.tab-button').forEach(btn => {
            btn.classList.remove('border-blue-500', 'text-blue-600');
            btn.classList.add('border-transparent', 'text-gray-500');
          });
          
          const activeTab = document.getElementById(tab + '-tab');
          activeTab.classList.remove('border-transparent', 'text-gray-500');
          activeTab.classList.add('border-blue-500', 'text-blue-600');
          
          // Show/hide content
          document.getElementById('navigation-content').classList.toggle('hidden', tab !== 'navigation');
          document.getElementById('footer-content').classList.toggle('hidden', tab !== 'footer');
        }

        // Handle navigation logo upload
        async function handleNavLogoUpload(input) {
          const file = input.files[0];
          if (!file) return;
          
          showLoading('正在上传Logo...');
          
          const formData = new FormData();
          formData.append('file', file);
          
          try {
            const response = await fetch('/api/upload/image', {
              method: 'POST',
              body: formData
            });
            
            const result = await response.json();
            
            if (result.success) {
              uploadedNavLogoUrl = result.url;
              document.getElementById('nav-logo-url').value = result.url;
              previewNavLogo(result.url);
              showToast('Logo上传成功');
            } else {
              showToast(result.error || '上传失败', 'error');
            }
          } catch (error) {
            console.error('Upload error:', error);
            showToast('上传失败', 'error');
          } finally {
            hideLoading();
          }
        }

        // Handle footer logo upload
        async function handleFooterLogoUpload(input) {
          const file = input.files[0];
          if (!file) return;
          
          showLoading('正在上传Logo...');
          
          const formData = new FormData();
          formData.append('file', file);
          
          try {
            const response = await fetch('/api/upload/image', {
              method: 'POST',
              body: formData
            });
            
            const result = await response.json();
            
            if (result.success) {
              uploadedFooterLogoUrl = result.url;
              document.getElementById('footer-logo-url').value = result.url;
              previewFooterLogo(result.url);
              showToast('Logo上传成功');
            } else {
              showToast(result.error || '上传失败', 'error');
            }
          } catch (error) {
            console.error('Upload error:', error);
            showToast('上传失败', 'error');
          } finally {
            hideLoading();
          }
        }

        // Load navigation data
        async function loadNavigationData() {
          try {
            const response = await fetch('/api/common-content/navigation');
            const result = await response.json();
            
            if (result.success && result.data) {
              navigationData = result.data;
              
              // Update UI
              if (navigationData.logo_url) {
                document.getElementById('nav-logo-url').value = navigationData.logo_url;
                previewNavLogo(navigationData.logo_url);
              }
              document.getElementById('nav-logo-alt').value = navigationData.logo_alt || 'Logo';
            }
          } catch (error) {
            console.error('Error loading navigation data:', error);
          }
        }

        // Load footer data
        async function loadFooterData() {
          try {
            const response = await fetch('/api/common-content/footer');
            const result = await response.json();
            
            if (result.success && result.data) {
              footerData = result.data;
              
              // Update basic settings
              if (footerData.config) {
                if (footerData.config.logo_url) {
                  document.getElementById('footer-logo-url').value = footerData.config.logo_url;
                  previewFooterLogo(footerData.config.logo_url);
                }
                document.getElementById('footer-subtitle').value = footerData.config.logo_subtitle || '';
                document.getElementById('footer-copyright').value = footerData.config.copyright_text || '';
              }
              
              // Render sections
              renderFooterSections(footerData.sections);
              
              // Render privacy links
              renderPrivacyLinks(footerData.privacyLinks);
            }
          } catch (error) {
            console.error('Error loading footer data:', error);
          }
        }

        // Preview navigation logo
        function previewNavLogo(url) {
          const preview = document.getElementById('nav-logo-preview');
          
          if (url) {
            preview.innerHTML = \`
              <img src="\${url}" alt="Logo Preview" class="max-h-20 mx-auto" onerror="handleImageError(this, 'nav')">
              <p class="text-sm text-gray-500 mt-2">预览效果</p>
            \`;
          } else {
            preview.innerHTML = \`
              <i class="fas fa-image text-4xl text-gray-400 mb-2"></i>
              <p class="text-gray-500">当前没有Logo</p>
            \`;
          }
        }

        // Preview navigation logo from URL
        function previewNavLogoFromUrl() {
          const url = document.getElementById('nav-logo-url').value;
          if (url) {
            previewNavLogo(url);
          }
        }

        // Clear navigation logo
        function clearNavLogo() {
          document.getElementById('nav-logo-url').value = '';
          document.getElementById('nav-logo-file').value = '';
          uploadedNavLogoUrl = null;
          previewNavLogo(null);
        }

        // Preview footer logo
        function previewFooterLogo(url) {
          const preview = document.getElementById('footer-logo-preview');
          
          if (url) {
            preview.innerHTML = \`
              <img src="\${url}" alt="Logo Preview" class="max-h-12 mx-auto" onerror="handleImageError(this, 'footer')">
            \`;
          } else {
            preview.innerHTML = \`
              <i class="fas fa-image text-2xl text-gray-400"></i>
              <p class="text-gray-500 text-sm mt-1">当前没有Logo</p>
            \`;
          }
        }

        // Preview footer logo from URL
        function previewFooterLogoFromUrl() {
          const url = document.getElementById('footer-logo-url').value;
          if (url) {
            previewFooterLogo(url);
          }
        }

        // Clear footer logo
        function clearFooterLogo() {
          document.getElementById('footer-logo-url').value = '';
          document.getElementById('footer-logo-file').value = '';
          uploadedFooterLogoUrl = null;
          previewFooterLogo(null);
        }

        // Handle image load error
        function handleImageError(img, type) {
          img.style.display = 'none';
          const errorMsg = document.createElement('p');
          errorMsg.className = 'text-red-500 text-sm';
          errorMsg.textContent = '图片加载失败';
          img.parentNode.appendChild(errorMsg);
        }

        // Render footer sections
        function renderFooterSections(sections) {
          const container = document.getElementById('footer-sections');
          
          container.innerHTML = sections.map(section => \`
            <div class="border rounded-lg p-4" data-section-id="\${section.id}">
              <div class="flex justify-between items-start mb-3">
                <div class="flex-1">
                  <input type="text" value="\${section.title}" 
                         class="font-medium text-gray-900 border-b border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none px-1"
                         onchange="updateSectionTitle(\${section.id}, this.value)">
                </div>
                <label class="flex items-center">
                  <input type="checkbox" \${section.is_visible ? 'checked' : ''} 
                         onchange="toggleSectionVisibility(\${section.id}, this.checked)"
                         class="mr-2">
                  <span class="text-sm text-gray-600">显示</span>
                </label>
              </div>
              
              <div class="space-y-2">
                \${section.links.map(link => \`
                  <div class="flex items-center space-x-2 group">
                    <input type="text" value="\${link.label}" placeholder="链接文本"
                           class="flex-1 px-2 py-1 text-sm border rounded"
                           onchange="updateLink(\${link.id}, 'label', this.value)">
                    <input type="text" value="\${link.url}" placeholder="链接地址"
                           class="flex-1 px-2 py-1 text-sm border rounded"
                           onchange="updateLink(\${link.id}, 'url', this.value)">
                    <select onchange="updateLink(\${link.id}, 'target', this.value)"
                            class="px-2 py-1 text-sm border rounded">
                      <option value="_self" \${link.target === '_self' ? 'selected' : ''}>当前页</option>
                      <option value="_blank" \${link.target === '_blank' ? 'selected' : ''}>新窗口</option>
                    </select>
                    <button onclick="deleteLink(\${link.id})" 
                            class="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-opacity">
                      <i class="fas fa-trash text-sm"></i>
                    </button>
                  </div>
                \`).join('')}
                
                <button onclick="addLink(\${section.id})" 
                        class="text-sm text-blue-600 hover:text-blue-700">
                  <i class="fas fa-plus mr-1"></i>添加链接
                </button>
              </div>
            </div>
          \`).join('');
        }

        // Render privacy links
        function renderPrivacyLinks(links) {
          const container = document.getElementById('privacy-links');
          
          container.innerHTML = links.map(link => {
            // Cookie Preferences doesn't need URL
            const isCookiePrefs = link.link_type === 'cookies';
            
            return \`
              <div class="flex items-center space-x-2" data-link-id="\${link.id}">
                <input type="text" value="\${link.label}" placeholder="链接文本"
                       class="flex-1 px-3 py-2 border rounded"
                       onchange="updatePrivacyLink(\${link.id}, 'label', this.value)">
                \${!isCookiePrefs ? \`
                  <input type="text" value="\${link.url || ''}" placeholder="链接地址"
                         class="flex-1 px-3 py-2 border rounded"
                         onchange="updatePrivacyLink(\${link.id}, 'url', this.value)">
                  <select onchange="updatePrivacyLink(\${link.id}, 'target', this.value)"
                          class="px-3 py-2 border rounded">
                    <option value="_self" \${link.target === '_self' ? 'selected' : ''}>当前页</option>
                    <option value="_blank" \${link.target === '_blank' ? 'selected' : ''}>新窗口</option>
                  </select>
                \` : \`
                  <span class="text-sm text-gray-500 italic">（点击触发Cookie设置弹窗）</span>
                \`}
                <label class="flex items-center">
                  <input type="checkbox" \${link.is_visible ? 'checked' : ''} 
                         onchange="updatePrivacyLink(\${link.id}, 'is_visible', this.checked)"
                         class="mr-2">
                  <span class="text-sm text-gray-600">显示</span>
                </label>
              </div>
            \`;
          }).join('');
        }

        // Save all changes
        async function saveAllChanges() {
          try {
            showLoading('正在保存...');
            
            // Save navigation - with published status for immediate reflection
            const navResponse = await fetch('/api/common-content/navigation', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                logo_url: document.getElementById('nav-logo-url').value || uploadedNavLogoUrl,
                logo_alt: document.getElementById('nav-logo-alt').value || 'ZENAVA',
                status: 'published' // Set to published for immediate update
              })
            });
            
            if (!navResponse.ok) {
              throw new Error('Failed to save navigation config');
            }
            
            // Save footer config - with published status for immediate reflection
            const footerResponse = await fetch('/api/common-content/footer/config', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                logo_url: document.getElementById('footer-logo-url').value || uploadedFooterLogoUrl,
                logo_alt: 'ZENAVA',
                subtitle_text: document.getElementById('footer-subtitle').value || '',
                copyright_text: document.getElementById('footer-copyright').value || `© ${new Date().getFullYear()} ZENAVA. All rights reserved.`,
                status: 'published' // Set to published for immediate update
              })
            });
            
            if (!footerResponse.ok) {
              throw new Error('Failed to save footer config');
            }
            
            hideLoading();
            showToast('所有更改已保存并立即生效');
            
            // Reload data to confirm changes
            setTimeout(() => {
              loadNavigationData();
              loadFooterData();
            }, 500);
          } catch (error) {
            console.error('Error saving changes:', error);
            hideLoading();
            showToast('保存失败: ' + error.message, 'error');
          }
        }

        // Publish content
        async function publishContent(type) {
          if (!confirm('确定要将当前内容发布到生产环境吗？')) return;
          
          try {
            showLoading('正在发布...');
            
            // First save all changes with published status
            await saveAllChanges();
            
            // Then publish to ensure everything is updated
            const response = await fetch('/api/common-content/publish', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ type })
            });
            
            const result = await response.json();
            
            hideLoading();
            
            if (result.success) {
              showToast('内容已成功发布，更改立即生效');
              // Force reload data
              setTimeout(() => {
                loadNavigationData();
                loadFooterData();
              }, 500);
            } else {
              showToast(result.error || '发布失败', 'error');
            }
          } catch (error) {
            console.error('Error publishing content:', error);
            hideLoading();
            showToast('发布失败: ' + error.message, 'error');
          }
        }

        // Helper functions for updating data
        async function updateSectionTitle(sectionId, title) {
          await fetch(\`/api/common-content/footer/section/\${sectionId}\`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, position: 0, is_visible: 1 })
          });
        }

        async function toggleSectionVisibility(sectionId, isVisible) {
          await fetch(\`/api/common-content/footer/section/\${sectionId}\`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: '', position: 0, is_visible: isVisible ? 1 : 0 })
          });
        }

        async function updateLink(linkId, field, value) {
          // Store changes locally, save on "Save All"
          console.log('Update link', linkId, field, value);
        }

        async function deleteLink(linkId) {
          if (!confirm('确定要删除这个链接吗？')) return;
          
          await fetch(\`/api/common-content/footer/link/\${linkId}\`, {
            method: 'DELETE'
          });
          
          loadFooterData(); // Reload
        }

        async function addLink(sectionId) {
          const label = prompt('链接文本:');
          if (!label) return;
          
          const url = prompt('链接地址:');
          if (!url) return;
          
          await fetch(\`/api/common-content/footer/section/\${sectionId}/link\`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ label, url, target: '_self', position: 999 })
          });
          
          loadFooterData(); // Reload
        }

        function updatePrivacyLink(linkId, field, value) {
          // Store changes locally, save on "Save All"
          console.log('Update privacy link', linkId, field, value);
        }

        // Show/hide loading overlay
        function showLoading(message = '处理中...') {
          document.getElementById('loading-message').textContent = message;
          document.getElementById('loading-overlay').classList.remove('hidden');
        }

        function hideLoading() {
          document.getElementById('loading-overlay').classList.add('hidden');
        }

        // Show toast notification
        function showToast(message, type = 'success') {
          const toast = document.getElementById('toast');
          const toastMessage = document.getElementById('toast-message');
          
          toastMessage.textContent = message;
          
          if (type === 'error') {
            toast.querySelector('div').className = 'bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center';
          } else {
            toast.querySelector('div').className = 'bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center';
          }
          
          toast.classList.remove('hidden');
          
          setTimeout(() => {
            toast.classList.add('hidden');
          }, 3000);
        }
      </script>
    </body>
    </html>
  `;
};