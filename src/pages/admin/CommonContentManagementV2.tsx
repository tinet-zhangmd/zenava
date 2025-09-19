import { html } from 'hono/html';

export const CommonContentManagementV2 = () => {
  return html`
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>公共内容管理 - Zenava CMS</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
      
      <!-- Baidu Analytics -->
      <script>
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?7948de4d0f78a0d3290eb6d24d2b1696";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
      </script>
    </head>
    <body class="bg-gray-50">
      <div class="min-h-screen">
        <!-- Header -->
        <header class="bg-white shadow-sm border-b">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center py-4">
              <div class="flex items-center space-x-4">
                <a href="/ticloudadmin" class="text-gray-600 hover:text-gray-900">
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
          <!-- Language Selector -->
          <div class="bg-white rounded-lg shadow-sm mb-6 p-4">
            <div class="flex items-center space-x-4">
              <label class="font-medium text-gray-700">选择语言版本：</label>
              <div class="flex space-x-2">
                <button onclick="switchLanguage('en')" id="lang-en" class="lang-button px-4 py-2 rounded-lg border-2 border-blue-500 bg-blue-50 text-blue-600 font-medium">
                  🇺🇸 英语
                </button>
                <button onclick="switchLanguage('jp')" id="lang-jp" class="lang-button px-4 py-2 rounded-lg border-2 border-gray-300 text-gray-600 hover:border-gray-400">
                  🇯🇵 日语
                </button>
                <button onclick="switchLanguage('hk')" id="lang-hk" class="lang-button px-4 py-2 rounded-lg border-2 border-gray-300 text-gray-600 hover:border-gray-400">
                  🇭🇰 繁体中文
                </button>
              </div>
            </div>
          </div>

          <!-- Tabs -->
          <div class="bg-white rounded-lg shadow-sm mb-6">
            <div class="border-b">
              <nav class="flex -mb-px">
                <button type="button" onclick="switchTab('navigation')" id="nav-tab" class="tab-button px-6 py-3 border-b-2 border-blue-500 text-blue-600 font-medium transition-colors">
                  <i class="fas fa-bars mr-2"></i>导航栏设置
                </button>
                <button type="button" onclick="switchTab('footer')" id="footer-tab" class="tab-button px-6 py-3 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 font-medium transition-colors">
                  <i class="fas fa-shoe-prints mr-2"></i>页脚设置
                </button>
              </nav>
            </div>
          </div>

          <!-- Navigation Content -->
          <div id="navigation-content" class="space-y-6">
            <div class="bg-white rounded-lg shadow-sm p-6">
              <div class="flex items-center justify-between mb-4">
                <h2 class="text-lg font-semibold">导航栏Logo设置</h2>
                <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  <span id="nav-lang-indicator">英语版本</span>
                </span>
              </div>
              
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
                    <p class="text-xs text-gray-500 mt-1">支持 JPG, PNG, GIF, WebP, SVG 格式，最大 5MB</p>
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
              <div class="flex items-center justify-between mb-4">
                <h2 class="text-lg font-semibold">页脚基本设置</h2>
                <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  <span id="footer-lang-indicator">英语版本</span>
                </span>
              </div>
              
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
                    <p class="text-xs text-gray-500 mt-1">支持 JPG, PNG, GIF, WebP, SVG 格式，最大 5MB</p>
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
          <span id="loading-message">处理中...</span>
        </div>
      </div>

      <script>
        let currentTab = 'navigation';
        let currentLanguage = 'en';
        let navigationData = {};
        let footerData = {};
        let allLanguageData = {
          en: { navigation: {}, footer: {} },
          jp: { navigation: {}, footer: {} },
          hk: { navigation: {}, footer: {} }
        };

        const languageLabels = {
          en: '英语版本',
          jp: '日语版本',
          hk: '繁体中文版本'
        };

        const languageTexts = {
          en: {
            subtitle: 'AI Agent for Enterprise Customer Dialogue Scenarios',
            copyright: '© 2024 TI Cloud. All rights reserved.',
            scenarios: 'Scenarios',
            aboutUs: 'About Us',
            privacyPolicy: 'Privacy Policy',
            termsConditions: 'Terms & Conditions',
            cookiePreferences: 'Cookie Preferences'
          },
          jp: {
            subtitle: 'エンタープライズ顧客対話シナリオのためのAIエージェント',
            copyright: '© 2024 TI Cloud. 全著作権所有。',
            scenarios: 'シナリオ',
            aboutUs: '私たちについて',
            privacyPolicy: 'プライバシーポリシー',
            termsConditions: '利用規約',
            cookiePreferences: 'クッキー設定'
          },
          hk: {
            subtitle: '企業客戶對話場景的AI代理',
            copyright: '© 2024 TI Cloud. 保留所有權利。',
            scenarios: '場景',
            aboutUs: '關於我們',
            privacyPolicy: '隱私政策',
            termsConditions: '條款與條件',
            cookiePreferences: 'Cookie偏好設置'
          }
        };

        // Initialize on page load
        document.addEventListener('DOMContentLoaded', () => {
          loadAllLanguageData();
        });

        // Language switching
        function switchLanguage(lang) {
          currentLanguage = lang;
          
          // Update language buttons
          document.querySelectorAll('.lang-button').forEach(btn => {
            btn.classList.remove('border-blue-500', 'bg-blue-50', 'text-blue-600', 'font-medium');
            btn.classList.add('border-gray-300', 'text-gray-600');
          });
          
          const activeBtn = document.getElementById('lang-' + lang);
          activeBtn.classList.remove('border-gray-300', 'text-gray-600');
          activeBtn.classList.add('border-blue-500', 'bg-blue-50', 'text-blue-600', 'font-medium');
          
          // Update language indicators
          document.getElementById('nav-lang-indicator').textContent = languageLabels[lang];
          document.getElementById('footer-lang-indicator').textContent = languageLabels[lang];
          
          // Load data for selected language
          loadLanguageData(lang);
        }

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

        // Load all language data
        async function loadAllLanguageData() {
          // First load data for each language
          for (const lang of ['en', 'jp', 'hk']) {
            await loadLanguageDataForLang(lang);
          }
          
          // Synchronize logos across all languages (single logo configuration)
          // Navigation logo - use the first non-null logo found
          let navLogo = null;
          for (const lang of ['en', 'jp', 'hk']) {
            if (allLanguageData[lang].navigation?.logo_url) {
              navLogo = allLanguageData[lang].navigation.logo_url;
              break;
            }
          }
          // Apply the same logo to all languages
          if (navLogo) {
            for (const lang of ['en', 'jp', 'hk']) {
              if (!allLanguageData[lang].navigation) {
                allLanguageData[lang].navigation = {};
              }
              allLanguageData[lang].navigation.logo_url = navLogo;
            }
          }
          
          // Footer logo - use the first non-null logo found
          let footerLogo = null;
          for (const lang of ['en', 'jp', 'hk']) {
            if (allLanguageData[lang].footer?.config?.logo_url) {
              footerLogo = allLanguageData[lang].footer.config.logo_url;
              break;
            }
          }
          // Apply the same logo to all languages
          if (footerLogo) {
            for (const lang of ['en', 'jp', 'hk']) {
              if (!allLanguageData[lang].footer) {
                allLanguageData[lang].footer = {};
              }
              if (!allLanguageData[lang].footer.config) {
                allLanguageData[lang].footer.config = {};
              }
              allLanguageData[lang].footer.config.logo_url = footerLogo;
            }
          }
          
          // Load current language data to UI
          loadLanguageData(currentLanguage);
        }

        // Load data for specific language
        async function loadLanguageDataForLang(lang) {
          try {
            // Load navigation data
            const navResponse = await fetch('/api/common-content/navigation?lang=' + lang);
            const navResult = await navResponse.json();
            
            if (navResult.success && navResult.data) {
              allLanguageData[lang].navigation = navResult.data;
            }
            
            // Load footer data
            const footerResponse = await fetch('/api/common-content/footer?lang=' + lang);
            const footerResult = await footerResponse.json();
            
            if (footerResult.success && footerResult.data) {
              allLanguageData[lang].footer = footerResult.data;
            }
          } catch (error) {
            console.error('Error loading language data for ' + lang + ':', error);
          }
        }

        // Load language data to UI
        function loadLanguageData(lang) {
          const data = allLanguageData[lang];
          
          // Load navigation data
          if (data.navigation) {
            navigationData = data.navigation;
            if (navigationData.logo_url) {
              document.getElementById('nav-logo-url').value = navigationData.logo_url;
              previewNavLogo(navigationData.logo_url);
            } else {
              document.getElementById('nav-logo-url').value = '';
              clearNavLogoPreview();
            }
            document.getElementById('nav-logo-alt').value = navigationData.logo_alt || 'Logo';
          }
          
          // Load footer data
          if (data.footer) {
            footerData = data.footer;
            
            // Update basic settings
            if (footerData.config) {
              if (footerData.config.logo_url) {
                document.getElementById('footer-logo-url').value = footerData.config.logo_url;
                previewFooterLogo(footerData.config.logo_url);
              } else {
                document.getElementById('footer-logo-url').value = '';
                clearFooterLogoPreview();
              }
              document.getElementById('footer-subtitle').value = footerData.config.logo_subtitle || languageTexts[lang].subtitle;
              document.getElementById('footer-copyright').value = footerData.config.copyright_text || languageTexts[lang].copyright;
            }
            
            // Render sections with language-specific labels
            renderFooterSections(footerData.sections || [], lang);
            
            // Render privacy links with language-specific labels
            renderPrivacyLinks(footerData.privacyLinks || [], lang);
          }
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
              document.getElementById('nav-logo-url').value = result.url;
              previewNavLogo(result.url);
              // Update logo for ALL languages (single logo configuration)
              for (const lang of ['en', 'jp', 'hk']) {
                if (!allLanguageData[lang].navigation) {
                  allLanguageData[lang].navigation = {};
                }
                allLanguageData[lang].navigation.logo_url = result.url;
              }
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
              document.getElementById('footer-logo-url').value = result.url;
              previewFooterLogo(result.url);
              // Update logo for ALL languages (single logo configuration)
              for (const lang of ['en', 'jp', 'hk']) {
                if (!allLanguageData[lang].footer) {
                  allLanguageData[lang].footer = {};
                }
                if (!allLanguageData[lang].footer.config) {
                  allLanguageData[lang].footer.config = {};
                }
                allLanguageData[lang].footer.config.logo_url = result.url;
              }
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

        // Preview navigation logo
        function previewNavLogo(url) {
          const preview = document.getElementById('nav-logo-preview');
          
          if (url) {
            preview.innerHTML = \`
              <img src="\${url}" alt="Logo Preview" class="max-h-20 mx-auto" onerror="handleImageError(this, 'nav')">
              <p class="text-sm text-gray-500 mt-2">预览效果</p>
            \`;
          } else {
            clearNavLogoPreview();
          }
        }

        function clearNavLogoPreview() {
          const preview = document.getElementById('nav-logo-preview');
          preview.innerHTML = \`
            <i class="fas fa-image text-4xl text-gray-400 mb-2"></i>
            <p class="text-gray-500">当前没有Logo</p>
          \`;
        }

        // Preview navigation logo from URL
        function previewNavLogoFromUrl() {
          const url = document.getElementById('nav-logo-url').value;
          if (url) {
            previewNavLogo(url);
            // Update logo for ALL languages (single logo configuration)
            for (const lang of ['en', 'jp', 'hk']) {
              if (!allLanguageData[lang].navigation) {
                allLanguageData[lang].navigation = {};
              }
              allLanguageData[lang].navigation.logo_url = url;
            }
          }
        }

        // Clear navigation logo
        function clearNavLogo() {
          document.getElementById('nav-logo-url').value = '';
          document.getElementById('nav-logo-file').value = '';
          clearNavLogoPreview();
          // Clear logo for ALL languages (single logo configuration)
          for (const lang of ['en', 'jp', 'hk']) {
            if (allLanguageData[lang].navigation) {
              allLanguageData[lang].navigation.logo_url = null;
            }
          }
        }

        // Preview footer logo
        function previewFooterLogo(url) {
          const preview = document.getElementById('footer-logo-preview');
          
          if (url) {
            preview.innerHTML = \`
              <img src="\${url}" alt="Logo Preview" class="max-h-12 mx-auto" onerror="handleImageError(this, 'footer')">
            \`;
          } else {
            clearFooterLogoPreview();
          }
        }

        function clearFooterLogoPreview() {
          const preview = document.getElementById('footer-logo-preview');
          preview.innerHTML = \`
            <i class="fas fa-image text-2xl text-gray-400"></i>
            <p class="text-gray-500 text-sm mt-1">当前没有Logo</p>
          \`;
        }

        // Preview footer logo from URL
        function previewFooterLogoFromUrl() {
          const url = document.getElementById('footer-logo-url').value;
          if (url) {
            previewFooterLogo(url);
            // Update logo for ALL languages (single logo configuration)
            for (const lang of ['en', 'jp', 'hk']) {
              if (!allLanguageData[lang].footer) {
                allLanguageData[lang].footer = {};
              }
              if (!allLanguageData[lang].footer.config) {
                allLanguageData[lang].footer.config = {};
              }
              allLanguageData[lang].footer.config.logo_url = url;
            }
          }
        }

        // Clear footer logo
        function clearFooterLogo() {
          document.getElementById('footer-logo-url').value = '';
          document.getElementById('footer-logo-file').value = '';
          clearFooterLogoPreview();
          // Clear logo for ALL languages (single logo configuration)
          for (const lang of ['en', 'jp', 'hk']) {
            if (allLanguageData[lang].footer && allLanguageData[lang].footer.config) {
              allLanguageData[lang].footer.config.logo_url = null;
            }
          }
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
        function renderFooterSections(sections, lang) {
          const container = document.getElementById('footer-sections');
          const texts = languageTexts[lang];
          
          // Default sections if empty
          if (!sections || sections.length === 0) {
            sections = [
              { id: 1, title: texts.scenarios, links: [], is_visible: 1 },
              { id: 2, title: texts.aboutUs, links: [], is_visible: 1 }
            ];
          }
          
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
                \${(section.links || []).map(link => \`
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
        function renderPrivacyLinks(links, lang) {
          const container = document.getElementById('privacy-links');
          const texts = languageTexts[lang];
          
          // Default privacy links if empty
          if (!links || links.length === 0) {
            links = [
              { id: 1, link_type: 'privacy', label: texts.privacyPolicy, url: '/privacy-policy', is_visible: 1 },
              { id: 2, link_type: 'terms', label: texts.termsConditions, url: '/terms-and-conditions', is_visible: 1 },
              { id: 3, link_type: 'cookies', label: texts.cookiePreferences, url: null, is_visible: 1 }
            ];
          }
          
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
            
            // Save navigation config (single logo for all languages)
            const navLogoUrl = document.getElementById('nav-logo-url').value || 
                              allLanguageData['en'].navigation?.logo_url || 
                              allLanguageData['jp'].navigation?.logo_url || 
                              allLanguageData['hk'].navigation?.logo_url;
            
            await fetch('/api/common-content/navigation', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                logo_url: navLogoUrl,
                logo_alt: document.getElementById('nav-logo-alt').value || 'ZENAVA',
                status: 'published'  // Changed from 'draft' to 'published' for immediate effect
              })
            });
            
            // Save footer config for each language (logo is shared, but text is language-specific)
            for (const lang of ['en', 'jp', 'hk']) {
              const footerLogoUrl = document.getElementById('footer-logo-url').value || 
                                   allLanguageData['en'].footer?.config?.logo_url || 
                                   allLanguageData['jp'].footer?.config?.logo_url || 
                                   allLanguageData['hk'].footer?.config?.logo_url;
              
              const footerSubtitle = lang === currentLanguage ? document.getElementById('footer-subtitle').value : 
                                   (allLanguageData[lang].footer?.config?.logo_subtitle || languageTexts[lang].subtitle);
              const footerCopyright = lang === currentLanguage ? document.getElementById('footer-copyright').value :
                                     (allLanguageData[lang].footer?.config?.copyright_text || languageTexts[lang].copyright);
              
              await fetch('/api/common-content/footer/config?lang=' + lang, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  logo_url: footerLogoUrl,
                  logo_alt: 'Footer Logo',
                  subtitle_text: footerSubtitle,
                  copyright_text: footerCopyright,
                  status: 'published',  // Changed from 'draft' to 'published' for immediate effect
                  language: lang
                })
              });
            }
            
            hideLoading();
            showToast('所有更改已保存');
          } catch (error) {
            console.error('Error saving changes:', error);
            hideLoading();
            showToast('保存失败', 'error');
          }
        }

        // Publish content
        async function publishContent(type) {
          if (!confirm('确定要将当前内容发布到生产环境吗？发布后所有页面将重新生成以应用新的导航栏和页脚。')) return;
          
          try {
            showLoading('正在发布并重新生成页面...');
            
            // Publish for all languages
            for (const lang of ['en', 'jp', 'hk']) {
              await fetch('/api/common-content/publish?lang=' + lang, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type, language: lang })
              });
            }
            
            hideLoading();
            showToast('内容已成功发布到生产环境（所有语言版本）');
          } catch (error) {
            console.error('Error publishing content:', error);
            hideLoading();
            showToast('发布失败', 'error');
          }
        }

        // Helper functions for updating data
        async function updateSectionTitle(sectionId, title) {
          // Store changes locally
          const section = allLanguageData[currentLanguage].footer.sections?.find(s => s.id === sectionId);
          if (section) {
            section.title = title;
          }
        }

        async function toggleSectionVisibility(sectionId, isVisible) {
          // Store changes locally
          const section = allLanguageData[currentLanguage].footer.sections?.find(s => s.id === sectionId);
          if (section) {
            section.is_visible = isVisible ? 1 : 0;
          }
        }

        async function updateLink(linkId, field, value) {
          // Store changes locally
          console.log('Update link', linkId, field, value);
        }

        async function deleteLink(linkId) {
          if (!confirm('确定要删除这个链接吗？')) return;
          
          await fetch(\`/api/common-content/footer/link/\${linkId}\`, {
            method: 'DELETE'
          });
          
          loadLanguageDataForLang(currentLanguage).then(() => {
            loadLanguageData(currentLanguage);
          });
        }

        async function addLink(sectionId) {
          const label = prompt('链接文本:');
          if (!label) return;
          
          const url = prompt('链接地址:');
          if (!url) return;
          
          await fetch(\`/api/common-content/footer/section/\${sectionId}/link\`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ label, url, target: '_self', position: 999, language: currentLanguage })
          });
          
          loadLanguageDataForLang(currentLanguage).then(() => {
            loadLanguageData(currentLanguage);
          });
        }

        function updatePrivacyLink(linkId, field, value) {
          // Store changes locally
          const link = allLanguageData[currentLanguage].footer.privacyLinks?.find(l => l.id === linkId);
          if (link) {
            if (field === 'is_visible') {
              link[field] = value ? 1 : 0;
            } else {
              link[field] = value;
            }
          }
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