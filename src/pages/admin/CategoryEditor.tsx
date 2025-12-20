import { FC } from 'hono/jsx'

interface Category {
  id?: number
  sort_order: number
  name: string
  slug: string
  description?: string
  // 多语言字段
  name_zh?: string
  name_en?: string
  name_jp?: string
  name_hk?: string
  description_zh?: string
  description_en?: string
  description_jp?: string
  description_hk?: string
  list_template: string
  detail_template: string
  is_visible: boolean
}

interface CategoryEditorProps {
  category?: Category
  mode: 'create' | 'edit'
}

export const CategoryEditor: FC<CategoryEditorProps> = ({ category, mode }) => {
  const isEdit = mode === 'edit'
  const pageTitle = isEdit ? '编辑栏目' : '创建新栏目'
  
  return (
    <div class="p-6 bg-gray-50 min-h-screen">
      <div class="max-w-5xl mx-auto">
        <div class="flex items-center justify-between mb-8">
          <a href="/ticloudadmin/resource-categories" class="inline-flex items-center px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-gray-600 hover:text-blue-600 hover:border-blue-200 shadow-sm transition-all text-sm font-medium">
            <i class="fas fa-chevron-left mr-2 text-xs"></i> 返回列表
          </a>
          <h1 class="text-2xl font-black text-gray-900 tracking-tight">{pageTitle}</h1>
          <div class="w-24"></div>
        </div>

        <form id="category-form" class="space-y-8">
          <input type="hidden" id="category-id" value={category?.id || ''} />

          {/* 卡片 1: 基础设置 */}
          <div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div class="bg-gray-50/80 px-6 py-4 border-b border-gray-200 flex items-center">
              <i class="fas fa-sliders-h mr-3 text-gray-400"></i>
              <h3 class="text-sm font-black text-gray-700 uppercase tracking-widest">基础配置 (所有语言通用)</h3>
            </div>
            <div class="p-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              <div class="space-y-5">
                <div>
                  <label class="block text-xs font-black text-gray-400 uppercase mb-2">链接标识 (Slug)</label>
                  <div class="relative">
                    <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 text-sm italic">/resources/</span>
                    <input type="text" id="category-slug" class="w-full pl-24 pr-4 py-2.5 bg-blue-50/30 border-2 border-blue-100 rounded-xl focus:border-blue-500 outline-none font-mono text-sm text-blue-700" 
                      placeholder="e.g. tech-docs" value={category?.slug || ''} required />
                  </div>
                </div>
              </div>
              <div class="space-y-5">
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-black text-gray-400 uppercase mb-2">排序权重</label>
                    <input type="number" id="category-sort-order" class="w-full px-4 py-2.5 bg-white border-2 border-gray-100 rounded-xl focus:border-blue-500 outline-none text-sm font-bold text-blue-600" 
                      value={category?.sort_order || 0} required />
                  </div>
                  <div>
                    <label class="block text-xs font-black text-gray-400 uppercase mb-2">是否显示</label>
                    <select id="category-is-visible" class="w-full px-4 py-2.5 bg-white border-2 border-gray-100 rounded-xl focus:border-blue-500 outline-none text-sm font-black text-blue-600">
                      <option value="1" selected={category?.is_visible !== false && category?.is_visible !== 0}>显示</option>
                      <option value="0" selected={category?.is_visible === false || category?.is_visible === 0}>隐藏</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label class="block text-xs font-black text-gray-400 uppercase mb-2">分类模板</label>
                  <select id="category-list-template" class="w-full px-4 py-2.5 bg-white border-2 border-gray-100 rounded-xl focus:border-blue-500 outline-none text-sm font-bold" required>
                    <option value="">请选择分类模板...</option>
                    <option value="list_article" selected={category?.list_template === 'list_article'}>list_article - 文章列表</option>
                    <option value="list_video" selected={category?.list_template === 'list_video'}>list_video - 视频列表</option>
                    <option value="list_download" selected={category?.list_template === 'list_download'}>list_download - 下载列表</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* 卡片 2: 多语言切换区 */}
          <div class="bg-white rounded-2xl shadow-xl border-2 border-blue-500 overflow-hidden relative">
            <div class="bg-blue-600 px-6 pt-4 pb-0 flex justify-between items-end">
              <div class="flex items-center text-white mb-4">
                <i class="fas fa-language mr-3 text-blue-200"></i>
                <h3 class="text-sm font-black uppercase tracking-widest">栏目信息与多语言设定</h3>
              </div>
              <nav class="flex space-x-1" aria-label="语言切换">
                {['zh', 'en', 'jp', 'hk'].map((lang, idx) => (
                  <button type="button" data-lang={lang} 
                    class={`lang-tab px-6 py-3 text-xs font-black uppercase tracking-tighter transition-all rounded-t-xl ${idx === 0 ? 'bg-white text-blue-600' : 'text-blue-100 hover:bg-blue-500'}`}>
                    {lang === 'zh' ? '简体中文' : lang === 'en' ? 'English' : lang === 'jp' ? '日本語' : '繁體中文'}
                  </button>
                ))}
              </nav>
            </div>
            
            <div class="p-10">
              {[
                { id: 'zh', label: '简体中文' },
                { id: 'en', label: 'English' },
                { id: 'jp', label: '日本語' },
                { id: 'hk', label: '繁體中文' }
              ].map((lang, idx) => (
                <div class={`lang-content space-y-6 ${idx !== 0 ? 'hidden' : ''}`} data-lang={lang.id}>
                  {/* 1. 栏目名称 */}
                  <div class="flex items-center">
                    <label class="w-32 text-sm text-gray-700 font-black text-right mr-6">栏目名称</label>
                    <input type="text" id={`category-name-${lang.id}`} 
                      class="flex-1 px-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:bg-white focus:border-blue-500 outline-none transition-all text-xl font-bold placeholder-gray-300"
                      placeholder={`请输入${lang.label}栏目名称...`}
                      value={(category as any)?.[`name_${lang.id}`] || (lang.id === 'zh' ? category?.name : '')} 
                      required={lang.id === 'zh'} />
                  </div>

                  {/* 2. 栏目描述 */}
                  <div class="flex items-start">
                    <label class="w-32 text-sm text-gray-700 font-black text-right mr-6 pt-3">栏目描述</label>
                    <textarea id={`category-description-${lang.id}`} 
                      rows="4"
                      class="flex-1 px-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:bg-white focus:border-blue-500 outline-none transition-all text-sm placeholder-gray-300 resize-none"
                      placeholder={`请输入${lang.label}栏目描述...`}
                    >{(category as any)?.[`description_${lang.id}`] || (lang.id === 'zh' ? category?.description : '')}</textarea>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 底部固定操作栏 */}
          <div class="flex justify-center space-x-6 py-12">
            <button type="submit" class="group px-12 py-4 bg-blue-600 text-white rounded-2xl font-black shadow-xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 active:scale-95 transition-all">
              <i class="fas fa-check-circle mr-3 opacity-50 group-hover:opacity-100"></i>
              保存所有语言版本
            </button>
            <a href="/ticloudadmin/resource-categories" class="px-12 py-4 bg-white border-2 border-gray-100 text-gray-500 rounded-2xl font-bold hover:bg-gray-50 hover:text-gray-700 transition-all">
              取消并返回
            </a>
          </div>
        </form>
      </div>

      <script dangerouslySetInnerHTML={{
        __html: `
          const languages = ['zh', 'en', 'jp', 'hk'];
          
          // Tab 切换逻辑
          document.querySelectorAll('.lang-tab').forEach(tab => {
            tab.addEventListener('click', function() {
              const lang = this.dataset.lang;
              document.querySelectorAll('.lang-tab').forEach(t => {
                t.classList.remove('bg-white', 'text-blue-600');
                t.classList.add('text-blue-100', 'hover:bg-blue-500');
              });
              this.classList.add('bg-white', 'text-blue-600');
              this.classList.remove('text-blue-100', 'hover:bg-blue-500');
              
              document.querySelectorAll('.lang-content').forEach(c => c.classList.add('hidden'));
              document.querySelector(\`.lang-content[data-lang="\${lang}"]\`).classList.remove('hidden');
            });
          });
          
          // Slug 自动生成 (根据简体中文名称生成)
          const nameZhInput = document.getElementById('category-name-zh');
          const slugInput = document.getElementById('category-slug');
          nameZhInput.addEventListener('blur', () => {
            if (!slugInput.value && nameZhInput.value) {
              slugInput.value = nameZhInput.value
                .toLowerCase()
                .replace(/[^\\u4e00-\\u9fa5a-zA-Z0-9\\s]/g, '')
                .replace(/\\s+/g, '-');
            }
          });

          // 提交处理
          document.getElementById('category-form').addEventListener('submit', async function(e) {
            e.preventDefault();
            console.log('🚀 开始提交多语言栏目表单...');
            
            const submitBtn = this.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> 正在处理中...';

            try {
              const formData = {
                id: document.getElementById('category-id').value || undefined,
                slug: document.getElementById('category-slug').value,
                sort_order: parseInt(document.getElementById('category-sort-order').value) || 0,
                list_template: document.getElementById('category-list-template').value,
                detail_template: document.getElementById('category-list-template').value, // 使用相同的模板
                is_visible: document.getElementById('category-is-visible').value === '1',
              };
              
              // 收集并处理所有语言字段
              for (const lang of languages) {
                formData['name_' + lang] = document.getElementById('category-name-' + lang).value;
                formData['description_' + lang] = document.getElementById('category-description-' + lang).value || '';
              }
              
              // 同步核心字段 (Fallback 为简体中文)
              formData.name = formData.name_zh || formData.name_en || 'Untitled';
              formData.description = formData.description_zh || formData.description_en || '';

              console.log('📦 准备发送到后端的数据:', formData);

              const isEdit = !!formData.id;
              const res = await fetch(isEdit ? \`/api/admin/resource-categories/\${formData.id}\` : '/api/admin/resource-categories', {
                method: isEdit ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
              });
              
              const result = await res.json();
              if (result.success) {
                console.log('✅ 保存成功:', result);
                alert('🎉 保存成功！');
                window.location.href = '/ticloudadmin/resource-categories';
              } else {
                console.error('❌ 保存失败:', result);
                alert('❌ 保存失败：' + (result.error || '未知错误'));
              }
            } catch (err) {
              console.error('💥 提交异常:', err);
              alert('💥 系统错误：' + err.message);
            } finally {
              submitBtn.disabled = false;
              submitBtn.innerHTML = '<i class="fas fa-check-circle mr-3"></i> 保存所有语言版本';
            }
          });
        `
      }} />
    </div>
  )
}
