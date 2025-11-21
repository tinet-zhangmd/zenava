interface AdminLoginProps {
  error?: string
}

export function AdminLogin({ error }: AdminLoginProps) {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>管理后台登录 - Zenava</title>
        
        {/* Tailwind CSS */}
        <script src="https://cdn.tailwindcss.com"></script>
        
        {/* FontAwesome Icons */}
        <link href="/static/fontawesome/css/all.min.css" rel="stylesheet" />
        
        <style dangerouslySetInnerHTML={{
          __html: `
            .login-bg { 
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              min-height: 100vh;
            }
          `
        }} />
        
        {/* Baidu Analytics */}
        <script dangerouslySetInnerHTML={{
          __html: `
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?7948de4d0f78a0d3290eb6d24d2b1696";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
          `
        }} />
      </head>
      <body class="login-bg">
        <div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div class="max-w-md w-full space-y-8">
            {/* Header */}
            <div>
              <div class="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-white shadow-lg">
                <i class="fas fa-cog text-2xl text-blue-600"></i>
              </div>
              <h2 class="mt-6 text-center text-3xl font-extrabold text-white">
                管理后台
              </h2>
              <p class="mt-2 text-center text-sm text-blue-100">
                登录以管理您的 Zenava 网站
              </p>
            </div>
            
            {/* Login Form */}
            <form class="mt-8 space-y-6" method="post" action="/ticloudadmin/login">
              <input type="hidden" name="remember" value="true" />
              
              {/* Error Message */}
              {error && (
                <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                  <div class="flex items-center">
                    <i class="fas fa-exclamation-triangle mr-2"></i>
                    <span>{error}</span>
                  </div>
                </div>
              )}
              
              <div class="rounded-md shadow-sm space-y-4">
                <div>
                  <label for="email" class="block text-sm font-medium text-white mb-2">
                    邮箱地址
                  </label>
                  <input 
                    id="email" 
                    name="email" 
                    type="email" 
                    autocomplete="email" 
                    required 
                    class="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="请输入邮箱"
                  />
                </div>
                
                <div>
                  <label for="password" class="block text-sm font-medium text-white mb-2">
                    密码
                  </label>
                  <div class="relative">
                    <input 
                      id="password" 
                      name="password" 
                      type="password" 
                      autocomplete="current-password" 
                      required 
                      class="appearance-none relative block w-full px-3 py-2 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                      placeholder="请输入密码"
                    />
                    <button 
                      type="button" 
                      class="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onclick="togglePassword()"
                    >
                      <i id="password-icon" class="fas fa-eye text-gray-400 hover:text-gray-600"></i>
                    </button>
                  </div>
                </div>
              </div>
              
              <div class="flex items-center">
                <input 
                  id="remember-me" 
                  name="remember-me" 
                  type="checkbox" 
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label for="remember-me" class="ml-2 block text-sm text-white">
                  记住我
                </label>
              </div>
              
              <div>
                <button 
                  type="submit" 
                  class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-blue-900 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                    <i class="fas fa-sign-in-alt text-blue-500 group-hover:text-blue-400"></i>
                  </span>
                  登录管理后台
                </button>
              </div>
            </form>
            
            {/* Footer */}
            <div class="text-center">
              <a href="/" class="text-sm text-blue-200 hover:text-white">
                <i class="fas fa-arrow-left mr-2"></i>
                返回网站
              </a>
            </div>
          </div>
        </div>
        
        <script dangerouslySetInnerHTML={{
          __html: `
            function togglePassword() {
              const passwordField = document.getElementById('password');
              const passwordIcon = document.getElementById('password-icon');
              
              if (passwordField.type === 'password') {
                passwordField.type = 'text';
                passwordIcon.classList.remove('fa-eye');
                passwordIcon.classList.add('fa-eye-slash');
              } else {
                passwordField.type = 'password';
                passwordIcon.classList.remove('fa-eye-slash');
                passwordIcon.classList.add('fa-eye');
              }
            }
          `
        }} />
      </body>
    </html>
  )
}