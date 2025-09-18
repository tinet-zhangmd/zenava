# 百度统计集成文档

## 📅 集成日期
2025年01月18日

## 📊 统计代码信息
- **统计ID**: `7948de4d0f78a0d3290eb6d24d2b1696`
- **脚本URL**: `https://hm.baidu.com/hm.js?7948de4d0f78a0d3290eb6d24d2b1696`

## ✅ 集成范围

### 1. 核心布局组件
所有使用以下布局组件的页面都会自动包含百度统计代码：
- `src/components/Layout.tsx` - 基础布局组件
- `src/components/LayoutWithCommonContent.tsx` - 带公共内容的布局
- `src/components/LayoutWithUnifiedNav.tsx` - 统一导航布局

### 2. 独立页面
以下独立页面也已添加百度统计代码：
- `src/index.tsx` - CMS登录页、控制台、错误页面
- `src/pages/admin/AdminLogin.tsx` - 管理员登录页
- `src/pages/admin/AdminLayout.tsx` - 管理后台布局
- `src/pages/admin/CommonContentManagement.tsx` - 公共内容管理
- `src/pages/admin/CommonContentManagementV2.tsx` - 公共内容管理V2

### 3. 百度统计组件
创建了可重用的百度统计组件：
- **文件路径**: `src/components/BaiduAnalytics.tsx`
- **使用方式**: `import { BaiduAnalyticsScript } from './BaiduAnalytics.js'`

## 📈 数据追踪功能

百度统计将自动追踪以下数据：
1. **访客分析**
   - 实时访客
   - 新老访客
   - 访客地域分布
   - 访客系统环境

2. **流量来源**
   - 搜索引擎来源
   - 外部链接来源
   - 直接访问

3. **页面分析**
   - 页面浏览量(PV)
   - 独立访客(UV)
   - 平均访问时长
   - 跳出率

4. **转化分析**
   - 自定义转化目标
   - 路径分析
   - 热力图分析

## 🔧 技术实现细节

### 代码插入位置
所有百度统计代码都插入在 `</head>` 标签之前，确保在页面加载早期就开始追踪。

### JSX组件实现
```tsx
export const BaiduAnalyticsScript = () => {
  return (
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
  )
}
```

### HTML模板实现
```html
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
```

## 🚀 部署注意事项

1. **构建项目**：修改后需要重新构建
   ```bash
   npm run build
   ```

2. **重启服务**：构建后重启PM2服务
   ```bash
   pm2 restart zenava-webapp
   ```

3. **验证集成**：检查页面源代码确认代码存在
   ```bash
   curl -s http://localhost:3000 | grep "hm.baidu.com"
   ```

## 📊 查看统计数据

1. 登录百度统计后台：https://tongji.baidu.com
2. 选择对应的网站
3. 查看实时访客、流量分析等数据

## 🔍 故障排查

如果统计数据未显示，请检查：
1. 统计代码ID是否正确
2. 网站是否已在百度统计中验证
3. 浏览器控制台是否有错误信息
4. 是否被广告拦截插件拦截

## 📝 更新记录

- **2025-01-18**: 初次集成百度统计代码到所有页面
- **统计ID**: 7948de4d0f78a0d3290eb6d24d2b1696
- **集成方式**: 通过布局组件和独立页面双重覆盖

## 🎯 后续优化建议

1. **配置转化目标**: 在百度统计后台设置关键转化目标
2. **自定义事件**: 添加自定义事件追踪（如按钮点击、表单提交）
3. **热力图分析**: 开启热力图功能分析用户点击行为
4. **A/B测试**: 利用统计数据进行页面优化测试