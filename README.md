# Zenava 官方网站

## 项目概览
- **项目名称**: Zenava 企业官网
- **目标**: 为Zenava AI智能体创建现代化、多语言的企业官网
- **技术栈**: Hono + TypeScript + Cloudflare Pages + TailwindCSS

## 在线访问
- **开发环境**: https://3000-i8upzvupzrt646n5st0td.e2b.dev
- **API测试**: https://3000-i8upzvupzrt646n5st0td.e2b.dev/api/hello
- **隐私政策**: https://3000-i8upzvupzrt646n5st0td.e2b.dev/privacy-policy
- **条款条件**: https://3000-i8upzvupzrt646n5st0td.e2b.dev/terms-and-conditions
- **GitHub仓库**: [待部署]

## 数据架构
- **多语言支持**: 英文(默认)、日语(/jp)、繁体中文(/hk)
- **静态资源**: 基于Cloudflare Pages的静态文件托管
- **数据流**: 前端JSX → Hono SSR → Cloudflare Workers 边缘计算

## 功能特性

### ✅ 已完成功能
1. **响应式首页设计**
   - Hero区域动效和梯度背景
   - 三大核心价值展示（客户、员工、企业）
   - 业务场景预览卡片
   - CTA行动召唤区域

2. **多语言系统**
   - 英文 (`/`) 
   - 日语 (`/jp`)
   - 繁体中文 (`/hk`)
   - 语言切换器与标志图标

3. **现代化导航**
   - 固定顶部导航栏
   - 场景下拉菜单
   - 移动端适配
   - 平滑滚动效果

4. **交互体验**
   - 卡片悬停动效
   - 渐现动画
   - 自定义滚动条
   - 回到顶部按钮

5. **营销场景页面** 
   - 当前营销挑战分析（4大痛点）
   - Zenava解决方案详细介绍
   - 智能引导留资演示
   - 线索评级流程可视化
   - ROI效果数据展示
   - 多语言完整支持

6. **隐私合规体系** ⭐ NEW!
   - Cookie使用确认横幅和偏好设置
   - 详细隐私政策页面（参考Sierra.ai标准）
   - 完整条款条件页面
   - 页面底部隐私链接和Cookie偏好选项
   - 精细化Cookie分类管理（必需、分析、营销、功能性）
   - JavaScript Cookie管理逻辑
   - 多语言隐私页面支持

7. **完整管理后台** ⭐ NEW!
   - 简体中文界面管理控制台
   - 系统设置和操作日志页面
   - 内容管理和多语言配置

### 🚧 开发中
1. **其他场景页面** (4个)
   - 面向销售的Zenava
   - 面向客户服务的Zenava
   - 面向内部服务的Zenava
   - 面向管理优化的Zenava

### 📝 待开发
1. **了解Zenava页面** - 产品详细介绍
2. **关于我们页面** - 天润融通企业介绍
3. **管理后台** - 内容管理和多语言配置
4. **联系表单** - 客户咨询收集

## 用户指南

### 访问网站
1. **首页浏览**: 直接访问主URL查看完整首页
2. **语言切换**: 点击右上角语言选择器
3. **导航菜单**: 鼠标悬停"Scenarios"查看场景下拉菜单
4. **移动体验**: 网站完全响应式，支持手机平板访问

### 开发调试
```bash
# 启动开发服务器
npm run dev:sandbox

# 构建生产版本
npm run build

# 清理端口
npm run clean-port

# 测试API
curl http://localhost:3000/api/hello
```

## 部署状态
- **平台**: Cloudflare Pages (准备中)
- **状态**: 🟡 开发环境运行中
- **性能**: 边缘计算 + CDN 加速
- **最后更新**: 2024年8月

## 技术架构

### 前端架构
```
src/
├── components/     # React组件
│   └── Layout.tsx  # 全局布局
├── pages/          # 页面组件  
│   └── Homepage.tsx # 首页
├── i18n/           # 国际化文件
├── utils/          # 工具函数
└── index.tsx       # 主应用入口
```

### 路由系统
- `/` - 英文首页
- `/jp` - 日语首页  
- `/hk` - 繁体中文首页
- `/scenarios/marketing` - 营销场景页面 ✅
- `/jp/scenarios/marketing` - 营销场景页面（日语） ✅
- `/hk/scenarios/marketing` - 营销场景页面（繁体中文） ✅
- `/scenarios/:type` - 其他场景页面 (开发中)
- `/privacy-policy` - 隐私政策页面 ✅
- `/terms-and-conditions` - 条款条件页面 ✅
- `/jp/privacy-policy` - 隐私政策页面（日语） ✅
- `/hk/privacy-policy` - 隐私政策页面（繁体中文） ✅
- `/admin/*` - 管理后台系统 ✅
- `/about-zenava` - 产品介绍
- `/about` - 企业介绍

### API端点
- `GET /api/hello` - 健康检查
- `POST /api/contact` - 联系表单提交

## 推荐下一步开发
1. **完善场景页面** - 开发剩余4个业务场景的详细页面
2. **关于我们页面** - 创建天润融通企业介绍页面
3. **完善内容管理** - 开发后台管理系统
4. **SEO优化** - 添加meta标签和结构化数据
5. **正式部署** - 部署到Cloudflare Pages生产环境

## 特色亮点
- 📱 **完全响应式** - 完美适配桌面、平板、手机
- 🌍 **多语言无缝切换** - 英文、日语、繁体中文
- ⚡ **边缘计算优化** - 基于Cloudflare Workers的极速加载
- 🎨 **现代化设计** - 参考Sierra.ai等顶级AI企业风格
- 🔧 **模块化架构** - 易于维护和扩展