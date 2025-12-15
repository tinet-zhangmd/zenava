import { FC } from 'hono/jsx'
import { Language } from '../utils/i18n'
import { getTranslations } from '../i18n/translations'

interface ContactPageProps {
  language?: Language
}

export const ContactPage: FC<ContactPageProps> = ({ language = 'zh' }) => {
  const trans = getTranslations(language)
  const t = trans.contactForm || {}

  return (
    <>
      <div class="min-h-screen bg-[#6438FF] flex items-center justify-center">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16 w-full">
          <div class="flex flex-col lg:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-16">
            {/* 左侧文案区 */}
            <div class="flex-1 lg:max-w-md xl:max-w-lg text-center lg:text-left">
              {/* 一级标题 - 白色大字号 */}
              <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 md:mb-12">
                {t.title || (language === 'zh' ? '联系我们' : language === 'en' ? 'Contact Us' : language === 'jp' ? 'お問い合わせ' : '聯繫我們')}
              </h1>
              
              {/* 一行白色文字 */}
              <div>
                <p class="text-white text-lg md:text-xl leading-relaxed">
                  {t.description?.split('\n')[0] || (language === 'zh' ? '我们的专业顾问将尽快与您联系' : language === 'en' ? 'Our professional consultant will contact you soon.' : language === 'jp' ? '私たちの専門コンサルタントがまもなくご連絡いたします。' : '我們的專業顧問將盡快與您聯繫。')}
                </p>
              </div>
            </div>

            {/* 右侧表单区 */}
            <div class="flex-1 lg:flex-none lg:w-[500px] xl:w-[550px] w-full">
              <div class="bg-white rounded-2xl shadow-lg p-8 md:p-10 lg:p-12">
              <form id="contact-form" class="space-y-6">
                {/* 姓名 - 必填项 */}
                  <div>
                  <label for="fullName" class="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'zh' ? '姓名' : language === 'en' ? 'Full Name' : language === 'jp' ? '氏名' : '姓名'}
                    <span class="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="text"
                    id="fullName"
                    name="fullName"
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder={language === 'zh' ? '请输入您的姓名' : language === 'en' ? 'Enter your full name' : language === 'jp' ? '氏名を入力してください' : '請輸入您的姓名'}
                  />
                  <p id="fullName-error" class="hidden mt-1 text-sm text-red-600"></p>
                </div>

                {/* Job Title */}
                <div>
                  <label for="jobTitle" class="block text-sm font-medium text-gray-700 mb-2">
                    {t.jobTitle || 'Job title'}
                  </label>
                  <input
                    type="text"
                    id="jobTitle"
                    name="jobTitle"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder={t.jobTitle || 'Job title'}
                  />
                </div>

                {/* Company Email - 必填项 */}
                <div>
                  <label for="companyEmail" class="block text-sm font-medium text-gray-700 mb-2">
                    {t.companyEmail || 'Company email'}
                    <span class="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="email"
                    id="companyEmail"
                    name="companyEmail"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder={t.companyEmailPlaceholder || 'Company email'}
                  />
                  <p id="companyEmail-error" class="hidden mt-1 text-sm text-red-600"></p>
                </div>

                {/* Company Name - 必填项 */}
                <div>
                  <label for="companyName" class="block text-sm font-medium text-gray-700 mb-2">
                    {t.companyName || 'Company name'}
                    <span class="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder={t.companyName || 'Company name'}
                  />
                  <p id="companyName-error" class="hidden mt-1 text-sm text-red-600"></p>
                </div>

                {/* Industry */}
                <div>
                  <label for="industry" class="block text-sm font-medium text-gray-700 mb-2">
                    {t.industry || 'Industry'}
                  </label>
                  <div class="relative">
                    <select
                      id="industry"
                      name="industry"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white appearance-none pr-10"
                    >
                      <option value="">{t.selectIndustry || 'Select your industry'}</option>
                      <option value="technology">{t.industryTech || 'Technology'}</option>
                      <option value="finance">{t.industryFinance || 'Finance'}</option>
                      <option value="healthcare">{t.industryHealthcare || 'Healthcare'}</option>
                      <option value="retail">{t.industryRetail || 'Retail'}</option>
                      <option value="manufacturing">{t.industryManufacturing || 'Manufacturing'}</option>
                      <option value="education">{t.industryEducation || 'Education'}</option>
                      <option value="other">{t.industryOther || 'Other'}</option>
                    </select>
                    <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Company Size - 公司规模 */}
                <div>
                  <label for="companySize" class="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'zh' ? '公司规模' : language === 'en' ? 'Company Size' : language === 'jp' ? '会社規模' : '公司規模'}
                  </label>
                  <div class="relative">
                    <select
                      id="companySize"
                      name="companySize"
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white appearance-none pr-10"
                    >
                      <option value="">{language === 'zh' ? '请选择公司规模' : language === 'en' ? 'Select company size' : language === 'jp' ? '会社規模を選択' : '請選擇公司規模'}</option>
                      <option value="0-49">{language === 'zh' ? '0-49' : language === 'en' ? '0-49' : language === 'jp' ? '0-49' : '0-49'}</option>
                      <option value="50-99">{language === 'zh' ? '50-99' : language === 'en' ? '50-99' : language === 'jp' ? '50-99' : '50-99'}</option>
                      <option value="100-149">{language === 'zh' ? '100-149' : language === 'en' ? '100-149' : language === 'jp' ? '100-149' : '100-149'}</option>
                      <option value="150-199">{language === 'zh' ? '150-199' : language === 'en' ? '150-199' : language === 'jp' ? '150-199' : '150-199'}</option>
                      <option value="200+">{language === 'zh' ? '200以上' : language === 'en' ? '200+' : language === 'jp' ? '200以上' : '200以上'}</option>
                    </select>
                    <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Submit Button - 浅灰色，圆角 */}
                <button
                  type="submit"
                  id="submit-btn"
                  class="w-full px-6 py-3 bg-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-400 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
                >
                  <span id="submit-text">{t.submit || 'Submit'}</span>
                  <span id="submit-loading" class="hidden">
                    <i class="fas fa-spinner fa-spin mr-2"></i>
                    {t.submitting || 'Submitting...'}
                  </span>
                </button>

                {/* Privacy Notice - 在Submit按钮下方，小字体 */}
                <p class="text-xs text-gray-500 text-center">
                  {t.privacyNotice || 'By clicking submit, you acknowledge your data will be processed according to our'} <a href="/privacy-policy" class="text-blue-600 underline">{t.privacyLink || 'Privacy Policy'}</a>
                </p>
                </form>

                {/* Success Message - 全屏覆盖样式 */}
                <div id="success-message" class="hidden fixed inset-0 bg-purple-600 z-50 flex items-center justify-center">
                  <div class="text-center px-4">
                    {/* 绿色对勾图标 */}
                    <div class="mb-8">
                      <div class="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full">
                        <svg class="w-12 h-12 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                        </svg>
                      </div>
                    </div>
                    
                    {/* 个性化标题 - 谢谢,姓名XXX */}
                    <h2 id="success-greeting" class="text-3xl md:text-4xl font-bold text-white mb-4">
                      {language === 'zh' ? '谢谢,姓名XXX' : language === 'en' ? 'Thank you, XXX' : language === 'jp' ? 'ありがとうございます、XXX' : '謝謝,姓名XXX'}
                    </h2>
                    
                    {/* 副标题 */}
                    <p class="text-xl md:text-2xl text-white mb-3">
                      {language === 'zh' ? '我们已收到您的请求' : language === 'en' ? 'We have received your request' : language === 'jp' ? 'お問い合わせを受け付けました' : '我們已收到您的請求'}
                    </p>
                    
                    {/* 说明文字 */}
                    <p class="text-lg md:text-xl text-white mb-8">
                      {language === 'zh' ? 'ZENAVA客户服务团队将会尽快联系您。' : language === 'en' ? 'The ZENAVA customer service team will contact you soon.' : language === 'jp' ? 'ZENAVAカスタマーサービスチームがまもなくご連絡いたします。' : 'ZENAVA客戶服務團隊將會盡快聯繫您。'}
                    </p>
                    
                    {/* 返回首页按钮 */}
                    <a href="/" class="inline-block px-8 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
                      {language === 'zh' ? '返回首页' : language === 'en' ? 'Back to Home' : language === 'jp' ? 'ホームに戻る' : '返回首頁'}
                    </a>
                  </div>
                </div>

                {/* Download Section (for whitepaper) */}
                <div id="download-section" class="hidden mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center">
                      <i class="fas fa-download text-blue-500 text-xl mr-3"></i>
                      <p class="text-blue-800 font-medium">
                        {t.downloadReady || 'Your download is ready'}
                      </p>
                    </div>
                    <button
                      id="download-btn"
                      class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      {t.download || 'Download'}
                    </button>
                  </div>
                </div>

                {/* Error Message */}
                <div id="error-message" class="hidden mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div class="flex items-center">
                    <i class="fas fa-exclamation-circle text-red-500 text-xl mr-3"></i>
                    <p class="text-red-800 font-medium">
                      {t.errorMessage || 'Submission failed. Please try again.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Submission Script */}
      <script dangerouslySetInnerHTML={{
        __html: `
          (function() {
            const form = document.getElementById('contact-form');
            const submitBtn = document.getElementById('submit-btn');
            const submitText = document.getElementById('submit-text');
            const submitLoading = document.getElementById('submit-loading');
            const successMessage = document.getElementById('success-message');
            const errorMessage = document.getElementById('error-message');
            const downloadSection = document.getElementById('download-section');
            const downloadBtn = document.getElementById('download-btn');

            if (!form) {
              console.error('Contact form not found');
              return;
            }

            // 添加错误处理，确保所有必需的元素都存在
            const requiredElements = {
              fullName: document.getElementById('fullName'),
              companyEmail: document.getElementById('companyEmail'),
              companyName: document.getElementById('companyName')
            };

            for (const [name, element] of Object.entries(requiredElements)) {
              if (!element) {
                console.error('Required form element not found:', name);
              }
            }

            // 获取 URL 参数
            function getUrlParam(name) {
              const urlParams = new URLSearchParams(window.location.search);
              return urlParams.get(name);
            }

            // 清除字段错误状态的函数
            function clearFieldError(fieldId) {
              const inputEl = document.getElementById(fieldId);
              const errorEl = document.getElementById(fieldId + '-error');
              if (inputEl) {
                inputEl.classList.remove('border-red-500');
                inputEl.classList.add('border-gray-300');
              }
              if (errorEl) {
                errorEl.classList.add('hidden');
                errorEl.textContent = '';
              }
            }

            // 获取当前语言（从 URL 或默认值）
            function getCurrentLanguage() {
              const path = window.location.pathname;
              const langPattern = new RegExp('^/(zh|en|jp|hk)/');
              const langMatch = path.match(langPattern);
              if (langMatch) {
                return langMatch[1];
              }
              // 默认返回中文
              return 'zh';
            }

            // 为必填项添加输入事件监听器，清除错误状态
            const requiredFields = ['fullName', 'companyEmail', 'companyName'];
            const currentLang = getCurrentLanguage();
            const errorMessages = {
              zh: {
                fullName: '请输入您的姓名',
                companyEmail: '请输入企业邮箱',
                companyEmailInvalid: '请输入有效的邮箱地址',
                companyName: '请输入公司名称'
              },
              en: {
                fullName: 'Please enter your full name',
                companyEmail: 'Please enter company email',
                companyEmailInvalid: 'Please enter a valid email address',
                companyName: 'Please enter company name'
              },
              jp: {
                fullName: '氏名を入力してください',
                companyEmail: '会社メールを入力してください',
                companyEmailInvalid: '有効なメールアドレスを入力してください',
                companyName: '会社名を入力してください'
              },
              hk: {
                fullName: '請輸入您的姓名',
                companyEmail: '請輸入企業郵箱',
                companyEmailInvalid: '請輸入有效的郵箱地址',
                companyName: '請輸入公司名稱'
              }
            };
            
            requiredFields.forEach(fieldId => {
              const field = document.getElementById(fieldId);
              if (field) {
                field.addEventListener('input', () => {
                  clearFieldError(fieldId);
                });
                field.addEventListener('blur', () => {
                  // 失去焦点时进行验证
                  const value = field.value.trim();
                  const messages = errorMessages[currentLang] || errorMessages.zh;
                  
                  if (!value && fieldId === 'fullName') {
                    const errorEl = document.getElementById(fieldId + '-error');
                    if (errorEl) {
                      errorEl.textContent = messages.fullName;
                      errorEl.classList.remove('hidden');
                    }
                    field.classList.remove('border-gray-300');
                    field.classList.add('border-red-500');
                  } else if (!value && fieldId === 'companyEmail') {
                    const errorEl = document.getElementById(fieldId + '-error');
                    if (errorEl) {
                      errorEl.textContent = messages.companyEmail;
                      errorEl.classList.remove('hidden');
                    }
                    field.classList.remove('border-gray-300');
                    field.classList.add('border-red-500');
                  } else if (!value && fieldId === 'companyName') {
                    const errorEl = document.getElementById(fieldId + '-error');
                    if (errorEl) {
                      errorEl.textContent = messages.companyName;
                      errorEl.classList.remove('hidden');
                    }
                    field.classList.remove('border-gray-300');
                    field.classList.add('border-red-500');
                  } else if (fieldId === 'companyEmail' && value) {
                    // 验证邮箱格式
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(value)) {
                      const errorEl = document.getElementById(fieldId + '-error');
                      if (errorEl) {
                        errorEl.textContent = messages.companyEmailInvalid;
                        errorEl.classList.remove('hidden');
                      }
                      field.classList.remove('border-gray-300');
                      field.classList.add('border-red-500');
                    }
                  }
                });
              }
            });

            form.addEventListener('submit', async (e) => {
              e.preventDefault();
              
              // 隐藏之前的消息
              successMessage.classList.add('hidden');
              errorMessage.classList.add('hidden');
              downloadSection.classList.add('hidden');

              // 清除之前的验证错误
              const errorElements = ['fullName-error', 'companyEmail-error', 'companyName-error'];
              errorElements.forEach(id => {
                const errorEl = document.getElementById(id);
                if (errorEl) {
                  errorEl.classList.add('hidden');
                  errorEl.textContent = '';
                }
              });

              // 清除输入框的错误样式
              const inputElements = ['fullName', 'companyEmail', 'companyName'];
              inputElements.forEach(id => {
                const inputEl = document.getElementById(id);
                if (inputEl) {
                  inputEl.classList.remove('border-red-500');
                  inputEl.classList.add('border-gray-300');
                }
              });

              // 前端必填项验证
              const fullName = document.getElementById('fullName').value.trim();
              const companyEmail = document.getElementById('companyEmail').value.trim();
              const companyName = document.getElementById('companyName').value.trim();
              
              // 获取当前语言和错误消息
              const currentLang = getCurrentLanguage();
              const messages = errorMessages[currentLang] || errorMessages.zh;
              
              let hasError = false;
              
              // 验证姓名
              if (!fullName) {
                const errorEl = document.getElementById('fullName-error');
                const inputEl = document.getElementById('fullName');
                if (errorEl) {
                  errorEl.textContent = messages.fullName;
                  errorEl.classList.remove('hidden');
                }
                if (inputEl) {
                  inputEl.classList.remove('border-gray-300');
                  inputEl.classList.add('border-red-500');
                }
                hasError = true;
              }
              
              // 验证企业邮箱
              if (!companyEmail) {
                const errorEl = document.getElementById('companyEmail-error');
                const inputEl = document.getElementById('companyEmail');
                if (errorEl) {
                  errorEl.textContent = messages.companyEmail;
                  errorEl.classList.remove('hidden');
                }
                if (inputEl) {
                  inputEl.classList.remove('border-gray-300');
                  inputEl.classList.add('border-red-500');
                }
                hasError = true;
              } else {
                // 验证邮箱格式
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(companyEmail)) {
                  const errorEl = document.getElementById('companyEmail-error');
                  const inputEl = document.getElementById('companyEmail');
                  if (errorEl) {
                    errorEl.textContent = messages.companyEmailInvalid;
                    errorEl.classList.remove('hidden');
                  }
                  if (inputEl) {
                    inputEl.classList.remove('border-gray-300');
                    inputEl.classList.add('border-red-500');
                  }
                  hasError = true;
                }
              }
              
              // 验证公司名称
              if (!companyName) {
                const errorEl = document.getElementById('companyName-error');
                const inputEl = document.getElementById('companyName');
                if (errorEl) {
                  errorEl.textContent = messages.companyName;
                  errorEl.classList.remove('hidden');
                }
                if (inputEl) {
                  inputEl.classList.remove('border-gray-300');
                  inputEl.classList.add('border-red-500');
                }
                hasError = true;
              }
              
              // 如果有验证错误，停止提交
              if (hasError) {
                // 滚动到第一个错误字段
                const firstErrorInput = document.querySelector('.border-red-500');
                if (firstErrorInput) {
                  firstErrorInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  firstErrorInput.focus();
                }
                return;
              }

              // 显示加载状态
              submitBtn.disabled = true;
              submitText.classList.add('hidden');
              submitLoading.classList.remove('hidden');

              // 收集表单数据（以 ticket.tsx 接口数据格式为准）
              const formData = {
                name: fullName,
                jobTitle: document.getElementById('jobTitle').value || '',
                companyEmail: document.getElementById('companyEmail').value,
                companyName: document.getElementById('companyName').value,
                industry: document.getElementById('industry').value || '',
                companySize: document.getElementById('companySize').value || '0-49',
                source: getUrlParam('source') || 'contact_page',
                file: getUrlParam('file') || null,
                description: '', // 表单中没有此字段，设为空字符串
                subject: '' // 表单中没有此字段，设为空字符串
              };

              try {
                console.log('Submitting form data:', formData);
                
                // 直接调用创建工单接口
                const response = await fetch('/api/ticket/create', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(formData)
                });

                console.log('Response status:', response.status);
                const result = await response.json();
                console.log('Response data:', result);

                // 检查响应是否成功（以 ticket.tsx 接口返回的 success 字段为准）
                if (result.success) {
                  // 更新成功消息中的用户姓名
                  const greetingEl = document.getElementById('success-greeting');
                  if (greetingEl) {
                    const userName = fullName || 'XXX';
                    if (currentLang === 'zh') {
                      greetingEl.textContent = '谢谢,' + userName;
                    } else if (currentLang === 'en') {
                      greetingEl.textContent = 'Thank you, ' + userName;
                    } else if (currentLang === 'jp') {
                      greetingEl.textContent = 'ありがとうございます、' + userName;
                    } else {
                      greetingEl.textContent = '謝謝,' + userName;
                    }
                  }
                  
                  // 显示成功消息
                  successMessage.classList.remove('hidden');
                  
                  // 如果是白皮书下载，显示下载按钮
                  const source = getUrlParam('source');
                  const fileId = getUrlParam('file');
                  
                  if (source === 'whitepaper_download' && fileId) {
                    // 设置cookie标记用户已提交表单（30天有效期）
                    const expiryDate = new Date();
                    expiryDate.setTime(expiryDate.getTime() + (30 * 24 * 60 * 60 * 1000));
                    document.cookie = 'resource_download_' + fileId + '=true; expires=' + expiryDate.toUTCString() + '; path=/';
                    
                    // 自动触发下载
                    const downloadUrl = '/resources/download/' + fileId;
                    setTimeout(() => {
                      window.location.href = downloadUrl;
                    }, 500);
                  } else if (source === 'whitepaper_download' && result.downloadUrl) {
                    // 兼容旧版本逻辑
                    downloadSection.classList.remove('hidden');
                    
                    downloadBtn.onclick = function() {
                      // 触发下载
                      const link = document.createElement('a');
                      link.href = result.downloadUrl;
                      link.download = result.fileName || 'download';
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    };
                  }

                  // 重置表单
                  form.reset();
                  if (privacyAgreeElement) {
                    privacyAgreeElement.checked = true;
                  }
                  
                  // 滚动到成功消息
                  successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                } else {
                  // 显示错误消息（使用 ticket.tsx 返回的 message）
                  const errorText = result.message || (getCurrentLanguage() === 'zh' ? '提交失败，请重试' : 'Submission failed, please try again');
                  const errorTextEl = errorMessage.querySelector('p');
                  if (errorTextEl) {
                    errorTextEl.textContent = errorText;
                  }
                  errorMessage.classList.remove('hidden');
                  errorMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
              } catch (error) {
                console.error('Error:', error);
                errorMessage.classList.remove('hidden');
                errorMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
              } finally {
                // 恢复按钮状态
                submitBtn.disabled = false;
                submitText.classList.remove('hidden');
                submitLoading.classList.add('hidden');
              }
            });
          })();
        `
      }} />
    </>
  )
}

