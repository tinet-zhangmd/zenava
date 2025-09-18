# Zenava CMS - 企业级内容管理系统

## 项目概览
- **名称**: Zenava CMS
- **目标**: 为Zenava网站提供完整的内容管理解决方案，支持多语言、SEO优化和公共内容管理
- **技术栈**: Hono + TypeScript + Cloudflare Pages + D1 Database + TailwindCSS

## 🌐 访问地址
- **开发环境**: http://localhost:3000
- **公共访问URL**: https://3000-i0nk6g88787o99fqky6qo-6532622b.e2b.dev
- **管理后台**: http://localhost:3000/ticloudadmin
  - 用户名: `ticloudhoutai@zenava.ai`
  - 密码: `tinet.Az2167Hk`
- **CMS管理**: http://localhost:3000/ticloudcms

## 🆕 最新更新 (2025-01-18)

### 完成的任务：

#### 安全和部署优化
1. ✅ **Linux兼容性修复** - 将所有HTML属性改为小写，确保Linux环境兼容性
2. ✅ **ES6模块导入修复** - 为所有TypeScript导入添加.js扩展名
3. ✅ **XSS/CSRF安全防护** - 实现完整的安全措施包括XSS消毒、CSRF令牌、安全cookie

#### UI/UX改进
4. ✅ **主页对话框样式** - 将透明背景改为深色不透明背景 (#0f1419)
5. ✅ **品牌颜色应用** - 应用品牌颜色 (#5E3AFC 紫色, #11B98F 绿色)
6. ✅ **导航栏优化** - 从数据库迁移中移除Home菜单项

#### CTA模块统一
7. ✅ **创建TransformationCTA组件** - 统一的CTA模块支持多语言
8. ✅ **场景页面CTA更新** - 5个场景页面统一使用新CTA组件
9. ✅ **按钮文本更新** - 将"Watch Demo"替换为"Schedule Consultation"

#### 故障修复
10. ✅ **修复销售页面500错误** - 添加缺失的TransformationCTA导入语句

#### 最新UI更新 (刚刚完成)
11. ✅ **聊天对话框样式更新** - 从黑色背景改为白色/透明背景
12. ✅ **移除问题图标** - 完全删除URL为`5f8fb02c9046a79c81989a0abcc1bf7b`的图标元素
13. ✅ **输入框和按钮样式** - 更新为浅色主题，发送按钮使用品牌紫色

#### 移动端响应式优化
14. ✅ **导航栏汉堡菜单** - 正确右对齐，保留语言切换器
15. ✅ **Footer移动端适配** - 优化布局、文字大小和间距
16. ✅ **Platform Performance指标** - 响应式网格和文字大小调整

#### 最新功能添加
17. ✅ **首页Banner CTA按钮** - 添加"Schedule Consultation"按钮，点击平滑滚动到联系表单

#### UI优化修复 (2025-01-14)
18. ✅ **移除焦点边框** - 移除所有导航按钮和链接点击时的蓝色边框，提供更清洁的视觉体验
19. ✅ **语言切换器对齐** - 修复所有页面语言切换器中国旗emoji与文字的垂直对齐问题
20. ✅ **禁用首页输入框** - 设置首页banner聊天输入框为不可输入状态，保持视觉展示效果
21. ✅ **多语言placeholder支持** - 修复繁体中文和日文版本的输入框placeholder文字显示
22. ✅ **保持按钮原始颜色** - 发送按钮保持品牌紫色(#5E3AFC)，仅禁用功能不改变外观

#### 网站分析集成 (2025-01-18)
23. ✅ **百度统计集成** - 在所有页面的 `<head>` 标签中添加百度统计代码
   - 统计代码ID: `7948de4d0f78a0d3290eb6d24d2b1696`
   - 覆盖范围：主站所有页面、CMS管理后台、Admin管理后台
   - 自动加载到所有使用 Layout 组件的页面
   - 支持访客分析、流量来源、页面浏览等数据追踪

## ✅ 已完成功能

### 1. **公共内容管理系统**
- ✅ **导航栏管理**: 
  - 支持图片上传（PNG、JPG、GIF、WebP、SVG）
  - 支持URL输入
  - Logo预览功能
  - 替代文本设置
  - 响应式Logo尺寸（高度: 40px-48px，最大宽度: 200px）
  - **已更新为ZENAVA品牌Logo**

- ✅ **页脚管理**:
  - Logo上传和管理
  - 副标题文本编辑
  - 版权信息自定义（已更新为"© 2025 ZENAVA. All rights reserved."）
  - 动态内容板块（Scenarios、About Us）
  - 链接管理（支持当前页/新窗口打开）
  - 隐私政策链接（Privacy Policy、Terms & Conditions）
  - Cookie Preferences（无需链接，触发弹窗）
  - **已更新为ZENAVA品牌Logo**

- ✅ **发布机制**:
  - 草稿/发布状态管理
  - 发布时自动重新生成所有页面
  - 应用新的导航栏和页脚到所有页面

### 2. **内容管理功能**
- ✅ 页面内容编辑器（支持模块化编辑）
- ✅ SEO管理（标题、描述、关键词）
- ✅ 多语言支持（英语、日语、繁体中文）
- ✅ 媒体库管理
- ✅ 发布管理系统

### 3. **前端展示**
- ✅ 响应式设计
- ✅ 动态导航菜单
- ✅ 场景页面（营销、销售、客服、内部服务、管理优化）
- ✅ Cookie同意管理
- ✅ 语言切换功能

### 4. **首页优化更新（最新）**
- ✅ **Banner文字更新**: 
  - 主标题: "ZENAVA"
  - 副标题: "让企业拥有专属的AI，让每个角色拥有专属的AI助手"
  - 英文版: "Empower Your Enterprise with Custom AI, Equip Every Role with Personal AI Assistant"

- ✅ **业务价值板块 - "Zenava 能为企业带来什么"**:
  - 采用现代化卡片布局设计（与营销场景页面风格一致）
  - 包含6大业务场景：
    1. **企业营销业务**: 提升转化率，降低获客成本（右侧改为营销转化数据展示）
    2. **企业销售业务**: 缩短销售周期，提升成交率
    3. **客户服务业务**: 24/7智能服务，提升满意度
    4. **门店/经销商运营**: 总部到门店的统一管理
    5. **产品设计与优化**: 让客户声音成为产品迭代方向（已更新为新样式）
    6. **品牌与舆情管理**: 实时守护企业品牌安全（已更新为新样式）

- ✅ **页面精简优化**:
  - 已删除"What Zenava Brings to Your Organization"模块
  - 已删除"What Our Clients Say"客户评价模块
  - 删除了Platform Performance标题和说明文字
  - 更新Enterprise Clients从500+改为5000+

- ✅ **联系方式更新**:
  - 将"Get in Touch"改为"联系我们"
  - 简化为邮箱联系方式: marketing@zenava.ai
  - 移除了原有的联系表单

## 📁 数据架构

### 数据库表结构
- **navigation_config**: 导航栏配置（logo_url, logo_alt, status）
- **footer_config**: 页脚基本配置（logo_url, subtitle, copyright）
- **footer_sections**: 页脚内容板块
- **footer_links**: 板块链接
- **footer_privacy_links**: 隐私政策链接
- **pages**: 页面管理
- **content_modules**: 内容模块
- **page_seo**: SEO设置

### 存储服务
- **Cloudflare D1**: SQLite数据库用于所有内容存储
- **图片上传**: Base64编码存储或外部URL引用

## 🔧 技术实现

### API端点
```
/api/common-content/navigation     - 导航栏配置管理
/api/common-content/footer         - 页脚配置管理
/api/common-content/publish        - 发布公共内容
/api/upload/image                  - 图片上传
/api/cms/*                         - CMS内容管理
```

### 核心组件
- `LayoutWithCommonContent.tsx` - 使用数据库配置的布局组件
- `CommonContentManagement.tsx` - 公共内容管理界面
- `HomepageDB.tsx` - 首页组件（已完成全面优化）
- `common-content.tsx` - 公共内容API处理和默认值
- `upload.tsx` - 图片上传处理

## 🚀 部署状态
- **平台**: Cloudflare Pages
- **状态**: ✅ 开发环境运行中
- **数据库**: D1 SQLite (本地开发模式)

## 📝 使用指南

### 管理公共内容
1. 登录管理后台
2. 访问"公共内容"菜单
3. 在"导航栏设置"中上传或输入Logo URL
4. 在"页脚设置"中配置页脚内容
5. 点击"保存所有更改"保存到草稿
6. 点击"发布到生产"应用到所有页面

### Logo要求
- **格式**: PNG、JPG、GIF、WebP、SVG
- **大小**: 最大5MB
- **推荐尺寸**: 高度40-48px，宽度根据Logo比例自适应
- **显示效果**: 导航栏自动适配，页脚白色显示
- **当前Logo**: ZENAVA品牌PNG图片

## 🔄 待优化功能
- [ ] 图片CDN集成（建议使用Cloudflare R2）
- [ ] 多用户权限管理
- [ ] 内容版本控制
- [ ] 自动备份机制
- [ ] 性能优化（缓存策略）

## 💡 开发建议
1. **图片存储**: 考虑集成Cloudflare R2或其他CDN服务替代Base64存储
2. **缓存策略**: 实施边缘缓存以提高性能
3. **监控**: 添加错误追踪和性能监控
4. **安全**: 实施更强的身份验证机制

## 📌 注意事项
- Logo样式已优化支持PNG格式和文字Logo
- Cookie Preferences不需要URL配置，点击触发弹窗
- 发布公共内容会触发所有页面重新生成
- 所有更改需要先保存再发布才能生效
- 业务价值板块采用响应式网格布局，移动端自动适配
- 联系方式简化为邮箱链接，提升用户体验

## 最后更新
- **日期**: 2025-09-03
- **版本**: 2.5.0
- **更新内容**: 
  - **界面精简与版权更新**（v2.5.0）
    - About页面删除"5+ Industries Served"指标，保留三个核心指标
    - 首页Platform Performance删除"10M+ Conversations Handled"，仅保留Uptime和Enterprise Clients两个指标
    - Footer版权年份更新为2025，所有语言版本统一为英文格式："© 2025 Zenava. All rights reserved."
  - **About页面公司介绍重构**（v2.4.0）
    - 更新公司介绍内容，突出ZENAVA作为TI Cloud旗下核心产品的定位
    - 强调AI Agent技术与云原生联络中心的深度融合
    - 突出独立承担端到端业务任务的能力特点
    - 明确已落地的五大行业：零售、连锁、制造、汽车、金融
    - 删除"我们的业务"（Our Business）模块
    - 所有语言版本同步更新，注重本地化表达：
      - **英语**: 强调"flagship product"、"end-to-end business tasks"
      - **日语**: 使用商务敬语，突出"主力製品"、"包括的な変革"
      - **繁体中文**: 保持专业用语，强调"核心產品"、"全面變革"
  - **全站核心文案更新**（v2.3.0）
    - 更新首页Banner和Footer的核心定位文案
    - 主标语更新为"面向营销和服务场景的对话式AI智能体"
    - 副标语更新为"助力企业完成生产力与组织形态变革，实现从'人力驱动'到'AI驱动'的跨越"
    - 所有语言版本同步更新：
      - **英语**: 
        - "Conversational AI Agent for Marketing and Service Scenarios"
        - "Empowering enterprise productivity and organizational transformation, achieving the leap from \"Human-Driven\" to \"AI-Driven\""
      - **日语**: 
        - "マーケティングとサービスシナリオ向けの対話型AIエージェント"
        - "企業の生産性と組織形態の変革を支援し、「人力駆動」から「AI駆動」への飛躍を実現"
      - **繁体中文**: 
        - "面向營銷和服務場景的對話式AI智能體"
        - "助力企業完成生產力與組織形態變革，實現從「人力驅動」到「AI驅動」的跨越"
  - **页脚副标题多语言一致性修复**（v2.2.2）
    - 修复了繁体中文版本页脚显示测试副标题的问题
    - 统一使用组件内的翻译文本，不再依赖数据库配置
    - 确保所有语言版本副标题内容一致：
      - 英语: "AI Agent for Enterprise-Customer Dialogue Scenarios"
      - 日语: "企業と顧客の対話シナリオのためのAIエージェント"
      - 繁体中文: "企業與客戶對話場景的 AI 智能體"
  - **页脚Logo显示问题修复**（v2.2.1）
    - 修复了日语模式下页脚Logo显示异常的问题
    - 统一所有语言版本使用相同的Base64编码Logo
    - 移除了对外部URL Logo的依赖
    - 创建了专门的Logo常量文件（src/assets/zenava-logo-base64.ts）
    - 确保所有语言版本（英语、日语、繁体中文）Logo显示一致性
  - **Logo持久化问题修复**（v2.2.0）
    - 修复了管理后台上传Logo后刷新页面Logo丢失的问题
    - 实现了统一的Logo管理机制，导航栏和页脚Logo在所有语言版本间共享
    - 优化了数据加载和保存逻辑，确保Logo配置正确持久化
    - 支持PNG、JPG等格式，最大10MB
    - 修复内容：
      - handleNavLogoUpload() 更新所有语言的Logo
      - handleFooterLogoUpload() 更新所有语言的Logo
      - previewNavLogoFromUrl() 和 clearNavLogo() 统一处理
      - loadAllLanguageData() 同步Logo数据
      - saveAllChanges() 优化保存逻辑
  - **重大更新：全站统一Footer系统**（v2.1.0）
    - 创建UnifiedFooter组件，确保全站Footer一致性
    - Footer包含以下元素：
      - Zenava Logo（白色版本）
      - 公司描述文字
      - Scenarios菜单及所有子链接（Marketing、Sales、Customer Service、Internal Service、Management Optimization）
      - Cookie Preferences（点击触发弹窗）
      - Privacy Policy链接（/privacy）
      - Terms & Conditions链接（/terms）
      - 版权信息（© 2024 Zenava. All rights reserved.）
    - 修复Cookie Preferences功能：
      - 添加showCookiePreferences全局函数
      - 完善Cookie管理JavaScript
      - 支持保存和读取Cookie偏好设置
      - Cookie弹窗正常显示和关闭
    - 支持多语言（英语、日语、繁体中文）
    - 一次修改，全站自动应用
  - **首页优化更新**（v2.0.3）
    - 统一"Zenava 能为企业带来什么"模块样式：
      - 产品设计与优化模块改为统一的左右布局
      - 品牌与舆情管理模块改为统一的左右布局
      - 所有6个模块现在保持一致的设计语言
    - 简化底部联系我们模块：
      - 保留标题"开启智能对话新篇章"
      - 仅显示邮箱联系按钮（marketing@zenava.ai）
      - 删除"预约产品演示"按钮
      - 使用品牌渐变背景
  - **导航栏系统重构**（v2.0.0-v2.0.2）
    - 创建UnifiedNavigation组件，统一管理全站导航栏
    - 新增完整的导航栏配置数据模型
    - 数据库新增三个表支持导航配置
    - 支持多语言菜单项和描述
    - 删除Get Started CTA按钮
    - 增加Scenarios下拉菜单宽度