interface UserManagementProps {
  // UserManagement specific props can be added here
}

export function UserManagement({}: UserManagementProps) {
  return (
    <div class="space-y-6">
      {/* Page Header */}
      <div class="bg-white rounded-lg shadow-sm border">
        <div class="p-6 border-b">
          <h3 class="text-lg font-semibold text-gray-900">管理员账户</h3>
          <p class="text-gray-600">管理后台登录账户</p>
        </div>
        <div class="p-6">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">头像</th>
                  <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">用户名</th>
                  <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">邮箱</th>
                  <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">角色</th>
                  <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">最后登录</th>
                  <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">操作</th>
                </tr>
              </thead>
              <tbody id="admin-users-table" class="divide-y divide-gray-200">
                <tr>
                  <td colspan="5" class="px-4 py-8 text-center text-gray-500">
                    <i class="fas fa-spinner fa-spin mr-2"></i>加载中...
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div class="mt-4">
            <button id="btn-add-admin" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              <i class="fas fa-plus mr-2"></i>添加管理员
            </button>
          </div>
        </div>
      </div>

      {/* Add/Edit Admin Modal */}
      <div id="admin-modal" class="hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div class="bg-white rounded-lg w-full max-w-md">
          <div class="px-6 py-4 border-b border-gray-200">
            <div class="flex justify-between items-center">
              <h3 id="modal-title" class="text-xl font-semibold">添加管理员</h3>
              <button onclick="closeAdminModal()" class="text-gray-400 hover:text-gray-600">
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>
          
          <form id="admin-form" class="p-6">
            <input type="hidden" id="admin-user-id" value="" />
            
            {/* Avatar Upload */}
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-2">头像</label>
              <div class="flex items-center space-x-4">
                <div class="relative">
                  <img 
                    id="avatar-preview" 
                    src="data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20448%20512%22%3E%3Cpath%20fill%3D%22%23999%22%20d%3D%22M224%20256c70.7%200%20128-57.3%20128-128S294.7%200%20224%200%2096%2057.3%2096%20128s57.3%20128%20128%20128zm89.6%2032h-16.7c-22.2%2010.2-46.9%2016-72.9%2016s-50.6-5.8-72.9-16h-16.7C60.2%20288%200%20348.2%200%20422.4V464c0%2026.5%2021.5%2048%2048%2048h352c26.5%200%2048-21.5%2048-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z%22%2F%3E%3C%2Fsvg%3E"
                    alt="头像预览"
                    class="w-20 h-20 rounded-full border-2 border-gray-300 object-cover bg-gray-100"
                  />
                  <input type="hidden" id="admin-avatar" value="" />
                </div>
                <div class="flex-1">
                  <label for="avatar-upload" class="cursor-pointer inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                    <i class="fas fa-cloud-upload-alt mr-2"></i>
                    上传头像
                  </label>
                  <input 
                    type="file" 
                    id="avatar-upload" 
                    accept="image/*" 
                    class="hidden"
                  />
                  <p class="mt-1 text-xs text-gray-500">支持 JPG、PNG、GIF 格式，最大 10MB</p>
                </div>
              </div>
            </div>
            
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">用户名</label>
              <input 
                type="text" 
                id="admin-username" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder="请输入用户名"
                required
              />
            </div>
            
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
              <input 
                type="email" 
                id="admin-email" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder="admin@zenava.com"
                required
              />
            </div>
            
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">密码</label>
              <input 
                type="password" 
                id="admin-password" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder="请输入密码"
                required
              />
            </div>
            
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">角色</label>
              <select 
                id="admin-role" 
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="super_admin">超级管理员</option>
                <option value="admin">管理员</option>
                <option value="editor">编辑</option>
              </select>
            </div>
          </form>
          
          <div class="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
            <button 
              onclick="closeAdminModal()" 
              class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              取消
            </button>
            <button 
              id="btn-save-admin" 
              class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              保存
            </button>
          </div>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{
        __html: `
          (function() {
            // 等待DOM加载完成
            if (document.readyState === 'loading') {
              document.addEventListener('DOMContentLoaded', init);
            } else {
              init();
            }
            
            function init() {
              const addBtn = document.getElementById('btn-add-admin');
              const modal = document.getElementById('admin-modal');
              const form = document.getElementById('admin-form');
              const saveBtn = document.getElementById('btn-save-admin');
              const modalTitle = document.getElementById('modal-title');
              const tableBody = document.getElementById('admin-users-table');
              
              if (!tableBody) {
                console.error('admin-users-table 元素未找到');
                return;
              }
              
              if (!addBtn || !modal || !form || !saveBtn || !modalTitle) {
                console.error('必要的DOM元素未找到');
                return;
              }
              
              // 显示通知
              function showNotification(message, type = 'success') {
              const notification = document.createElement('div');
              notification.className = \`fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 \${
                type === 'success' ? 'bg-green-500' : 'bg-red-500'
              } text-white\`;
              notification.textContent = message;
              document.body.appendChild(notification);
              
              setTimeout(() => {
                notification.remove();
              }, 3000);
            }
            
            // 格式化时间
            function formatTime(dateString) {
              if (!dateString) return '从未登录';
              try {
                const date = new Date(dateString);
                if (isNaN(date.getTime())) return '时间格式错误';
                
                const now = new Date();
                const diff = now.getTime() - date.getTime();
                const minutes = Math.floor(diff / 60000);
                const hours = Math.floor(diff / 3600000);
                const days = Math.floor(diff / 86400000);
                
                if (minutes < 1) return '刚刚';
                if (minutes < 60) return minutes + ' 分钟前';
                if (hours < 24) return hours + ' 小时前';
                if (days < 7) return days + ' 天前';
                return date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
              } catch (e) {
                console.error('时间格式化错误:', e);
                return '时间格式错误';
              }
            }
            
              // 获取角色显示文本和样式
              function getRoleDisplay(role) {
              const roles = {
                'super_admin': { text: '超级管理员', class: 'bg-green-100 text-green-800' },
                'admin': { text: '管理员', class: 'bg-blue-100 text-blue-800' },
                'editor': { text: '编辑', class: 'bg-gray-100 text-gray-800' }
              };
              return roles[role] || roles['admin'];
            }
            
              // 加载用户列表
              async function loadUsers() {
              try {
                if (!tableBody) {
                  console.error('tableBody 元素未找到');
                  return;
                }
                
                tableBody.innerHTML = '<tr><td colspan="6" class="px-4 py-8 text-center text-gray-500"><i class="fas fa-spinner fa-spin mr-2"></i>加载中...</td></tr>';
                
                const response = await fetch('/api/admin/users');
                
                if (!response.ok) {
                  throw new Error('HTTP错误: ' + response.status);
                }
                
                const result = await response.json();
                
                if (!result.success) {
                  throw new Error(result.error || '加载失败');
                }
                
                if (!result.data || result.data.length === 0) {
                  tableBody.innerHTML = '<tr><td colspan="6" class="px-4 py-8 text-center text-gray-500">暂无管理员</td></tr>';
                  return;
                }
                
                // 使用更简单的默认头像SVG，避免CSP问题
                const defaultAvatarSvg = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#999" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"/></svg>');
                
                const rows = result.data.map(function(user) {
                  const roleDisplay = getRoleDisplay(user.role);
                  const avatarUrl = user.avatar || defaultAvatarSvg;
                  const username = (user.username || '').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
                  const email = (user.email || '').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
                  // 转义 defaultAvatarSvg 中的引号，避免在 onerror 中出错
                  const safeDefaultAvatar = defaultAvatarSvg.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
                  
                  return '<tr>' +
                    '<td class="px-4 py-2">' +
                      '<img src="' + avatarUrl + '" alt="' + username + '" ' +
                      'class="w-10 h-10 rounded-full object-cover border border-gray-300" ' +
                      'onerror="this.src=&quot;' + safeDefaultAvatar + '&quot;" />' +
                    '</td>' +
                    '<td class="px-4 py-2 text-sm font-medium text-gray-900">' + username + '</td>' +
                    '<td class="px-4 py-2 text-sm text-gray-500">' + email + '</td>' +
                    '<td class="px-4 py-2">' +
                      '<span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ' + roleDisplay.class + '">' +
                        roleDisplay.text +
                      '</span>' +
                    '</td>' +
                    '<td class="px-4 py-2 text-sm text-gray-500">' + formatTime(user.last_login_at) + '</td>' +
                    '<td class="px-4 py-2 text-sm">' +
                      '<button onclick="editAdminUser(' + user.id + ')" class="text-blue-600 hover:text-blue-900 mr-3" title="编辑">' +
                        '<i class="fas fa-edit"></i>' +
                      '</button>' +
                      '<button onclick="deleteAdminUser(' + user.id + ', &quot;' + email + '&quot;)" class="text-red-600 hover:text-red-900" title="删除">' +
                        '<i class="fas fa-trash"></i>' +
                      '</button>' +
                    '</td>' +
                  '</tr>';
                }).join('');
                
                tableBody.innerHTML = rows;
              } catch (error) {
                console.error('加载用户列表失败:', error);
                if (tableBody) {
                  tableBody.innerHTML = '<tr><td colspan="6" class="px-4 py-8 text-center text-red-500">加载失败: ' + (error.message || '未知错误') + '</td></tr>';
                }
              }
            }
            
              // 设置头像预览
              function setAvatarPreview(url) {
              const preview = document.getElementById('avatar-preview');
              const avatarInput = document.getElementById('admin-avatar');
              // 使用更简单的默认头像SVG，避免CSP问题
              const defaultAvatar = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="#999" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"/></svg>');
              if (preview) {
                preview.src = url || defaultAvatar;
              }
              if (avatarInput) {
                avatarInput.value = url || '';
              }
            }
            
              // 处理头像上传
              async function handleAvatarUpload(file) {
              if (!file) return null;
              
              // 验证文件类型
              const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
              if (!allowedTypes.includes(file.type)) {
                showNotification('不支持的图片格式，请上传 JPG、PNG、GIF 或 WebP 格式', 'error');
                return null;
              }
              
              // 验证文件大小（10MB）
              const maxSize = 10 * 1024 * 1024;
              if (file.size > maxSize) {
                showNotification('图片大小不能超过 10MB', 'error');
                return null;
              }
              
              try {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('category', 'temp');
                
                const response = await fetch('/api/admin/upload/image', {
                  method: 'POST',
                  body: formData
                });
                
                const result = await response.json();
                
                if (!result.success) {
                  throw new Error(result.error || '上传失败');
                }
                
                return result.data.url;
              } catch (error) {
                console.error('头像上传失败:', error);
                showNotification('头像上传失败: ' + error.message, 'error');
                return null;
              }
            }
            
              // 打开模态框
              function openAdminModal(isEdit = false, userData = null) {
              if (isEdit && userData) {
                modalTitle.textContent = '编辑管理员';
                document.getElementById('admin-user-id').value = userData.id || '';
                document.getElementById('admin-username').value = userData.username || '';
                document.getElementById('admin-email').value = userData.email || '';
                document.getElementById('admin-password').required = false;
                document.getElementById('admin-password').placeholder = '留空则不修改密码';
                document.getElementById('admin-password').value = '';
                document.getElementById('admin-role').value = userData.role || 'admin';
                setAvatarPreview(userData.avatar || '');
              } else {
                modalTitle.textContent = '添加管理员';
                form.reset();
                document.getElementById('admin-user-id').value = '';
                document.getElementById('admin-password').required = true;
                document.getElementById('admin-password').placeholder = '请输入密码';
                setAvatarPreview('');
              }
              modal.classList.remove('hidden');
            }
            
              window.closeAdminModal = function() {
                modal.classList.add('hidden');
                form.reset();
                setAvatarPreview('');
              };
              
              // 头像上传事件
              const avatarUpload = document.getElementById('avatar-upload');
              if (avatarUpload) {
                avatarUpload.addEventListener('change', async function(e) {
                  const file = e.target.files[0];
                  if (file) {
                    const url = await handleAvatarUpload(file);
                    if (url) {
                      setAvatarPreview(url);
                    }
                  }
                });
              }
              
              window.editAdminUser = async function(userId) {
                try {
                  const response = await fetch('/api/admin/users/' + userId);
                  const result = await response.json();
                  
                  if (!result.success) {
                    throw new Error(result.error || '获取用户信息失败');
                  }
                  
                  openAdminModal(true, result.data);
                } catch (error) {
                  console.error('获取用户信息失败:', error);
                  showNotification('获取用户信息失败: ' + error.message, 'error');
                }
              };
              
              window.deleteAdminUser = async function(userId, email) {
                if (!confirm('确定要删除管理员 ' + email + ' 吗？\\n\\n此操作不可恢复！')) {
                  return;
                }
                
                try {
                  const response = await fetch('/api/admin/users/' + userId, {
                    method: 'DELETE'
                  });
                  const result = await response.json();
                  
                  if (!result.success) {
                    throw new Error(result.error || '删除失败');
                  }
                  
                  showNotification('删除成功');
                  loadUsers();
                } catch (error) {
                  console.error('删除用户失败:', error);
                  showNotification('删除失败: ' + error.message, 'error');
                }
              };
              
              addBtn.addEventListener('click', function() {
                openAdminModal(false);
              });
              
              saveBtn.addEventListener('click', async function() {
              const userId = document.getElementById('admin-user-id').value;
              const formData = {
                username: document.getElementById('admin-username').value.trim(),
                email: document.getElementById('admin-email').value.trim(),
                password: document.getElementById('admin-password').value,
                role: document.getElementById('admin-role').value,
                avatar: document.getElementById('admin-avatar').value || null
              };
              
              if (!formData.username || !formData.email) {
                showNotification('请填写用户名和邮箱', 'error');
                return;
              }
              
              const isEdit = userId !== '';
              if (!isEdit && !formData.password) {
                showNotification('请填写密码', 'error');
                return;
              }
              
              try {
                saveBtn.disabled = true;
                saveBtn.textContent = '保存中...';
                
                const url = isEdit ? '/api/admin/users/' + userId : '/api/admin/users';
                const method = isEdit ? 'PUT' : 'POST';
                
                const requestData = {
                  username: formData.username,
                  email: formData.email,
                  role: formData.role
                };
                
                if (formData.password) {
                  requestData.password = formData.password;
                }
                
                // 添加头像字段
                // 创建模式：如果有头像就添加，没有就不添加（使用默认值 null）
                // 编辑模式：总是发送 avatar 字段，以便更新或清除
                if (isEdit) {
                  // 编辑模式：总是发送 avatar 字段
                  requestData.avatar = formData.avatar || null;
                } else if (formData.avatar) {
                  // 创建模式：只有在上传了头像时才添加
                  requestData.avatar = formData.avatar;
                }
                
                const response = await fetch(url, {
                  method: method,
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(requestData)
                });
                
                const result = await response.json();
                
                if (!result.success) {
                  throw new Error(result.error || '保存失败');
                }
                
                showNotification(isEdit ? '更新成功' : '添加成功');
                closeAdminModal();
                loadUsers();
              } catch (error) {
                console.error('保存用户失败:', error);
                showNotification('保存失败: ' + error.message, 'error');
              } finally {
                saveBtn.disabled = false;
                saveBtn.textContent = '保存';
              }
              });
              
              // 点击模态框外部关闭
              modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                  closeAdminModal();
                }
              });
              
              // 页面加载时获取用户列表
              loadUsers();
            }
          })();
        `
      }} />
    </div>
  )
}

