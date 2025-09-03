// Comprehensive multi-language translations for Zenava
// Reference: Avaya, Genesys, Decagon, Sierra professional terminology

export const siteTranslations = {
  en: {
    // Company & Brand
    company: {
      name: 'Zenava',
      tagline: 'Conversational AI Agent for Marketing and Service Scenarios',
      vision: 'Empowering enterprise productivity and organizational transformation, achieving the leap from "Human-Driven" to "AI-Driven"',
      description: 'Enterprise-grade AI dialogue solutions that transform customer engagement'
    },
    
    // Navigation
    nav: {
      home: 'Home',
      scenarios: 'Solutions',
      about: 'About Us',
      contact: 'Contact',
      getStarted: 'Get Started',
      learnMore: 'Learn More',
      bookDemo: 'Book a Demo',
      language: 'Language'
    },
    
    // Hero Section
    hero: {
      title: 'Conversational AI Agent for Marketing and Service Scenarios',
      subtitle: 'Empowering enterprise productivity and organizational transformation, achieving the leap from "Human-Driven" to "AI-Driven"',
      cta: {
        primary: 'Schedule Demo',
        secondary: 'View Solutions'
      }
    },
    
    // Business Value
    businessValue: {
      title: 'What Zenava Delivers for Your Enterprise',
      subtitle: 'Transform organizational capabilities and reshape customer experience through AI-driven dialogue intelligence',
      metrics: {
        marketing: {
          title: 'Marketing Performance Metrics',
          costReduction: 'Average Customer Acquisition Cost Reduced',
          conversionIncrease: 'Lead Conversion Rate Increased',
          responseTime: 'Customer Response Time',
          responseValue: '<30s',
          channelCoverage: 'Marketing Channel Coverage',
          channelCount: '10+',
          dailyInquiries: 'Daily Inquiries Processed',
          dailyCount: '50,000+'
        },
        sales: {
          title: 'Sales Enablement Process',
          cycleReduction: 'Sales Cycle Shortened',
          winRateIncrease: 'Win Rate Improved',
          step1Title: 'Real-time Script Recommendation',
          step1Desc: 'Recommend best scripts based on customer focus',
          step1Value: 'Real-time',
          step2Title: 'Knowledge Base Access',
          step2Desc: 'Instant access to products, competitors, cases',
          step2Value: 'Seconds',
          step3Title: 'Intelligent Closing Assistant',
          step3Desc: '45% increase in closing rate',
          step3Value: '+45%'
        },
        service: {
          title: 'Intelligent Ticket Processing',
          responseTime: 'Average Response Time',
          resolutionRate: 'First Contact Resolution',
          step1Title: 'AI Problem Identification',
          step1Desc: 'Analyze issue type and urgency',
          step2Title: 'Knowledge Base Query',
          step2Desc: 'Match best solutions and cases',
          step3Title: 'Intelligent Assignment',
          step3Desc: 'Auto-assign based on skills and load',
          step4Title: 'Process Closure',
          step4Desc: 'Track progress, ensure quality'
        },
        internal: {
          title: 'Operational Efficiency',
          efficiency: 'Process Efficiency Improved',
          satisfaction: 'Employee Satisfaction',
          storeConnections: 'Store Connections',
          storeCount: '500+',
          dailyProcessing: 'Daily Processing',
          dailyCount: '10K+',
          avgResponse: 'Average Response',
          avgTime: '2 Hours',
          assignmentEfficiency: 'Assignment Efficiency',
          efficiencyRate: '85%'
        },
        product: {
          title: 'Customer Feedback Dashboard',
          insights: 'Customer Insights Generated',
          iterations: 'Product Iteration Speed',
          painPoints: 'Product Pain Points Collected',
          painPointCount: '1,842',
          featureAdoption: 'Feature Suggestions Adopted',
          adoptionRate: '78%',
          resolutionCycle: 'Issue Resolution Cycle',
          cycleTime: '3.2 days',
          monthlyIterations: 'Monthly Product Iterations',
          iterationCount: '12 versions',
          satisfactionIncrease: 'Satisfaction Improvement',
          increaseRate: '+18%'
        },
        brand: {
          title: 'Real-time Sentiment Monitoring',
          monitoring: 'Real-time Monitoring',
          response: 'Crisis Response Time',
          negativeAlerts: 'Negative Sentiment Alerts',
          alertCount: '3',
          sensitiveWords: 'Sensitive Word Detection',
          detectionRate: '99.8%',
          brandFavorability: 'Brand Favorability',
          favorabilityRate: '+12%',
          responseTime: 'Sentiment Response Time',
          responseValue: '<5 min',
          crisisSuccess: 'Crisis Resolution Rate',
          successRate: '98%'
        }
      }
    },
    
    // Scenarios/Solutions
    scenarios: {
      marketing: {
        title: 'Marketing Automation',
        subtitle: 'Increase Conversion, Reduce Acquisition Cost',
        description: 'Real-time intent recognition, unified lead capture, intelligent high-potential lead routing. Conversation analytics inform marketing strategy optimization.',
        features: [
          'Intent Recognition',
          'Smart Lead Capture',
          'Multi-channel Integration',
          'Predictive Analytics'
        ]
      },
      sales: {
        title: 'Sales Enablement',
        subtitle: 'Accelerate Deal Closure, Boost Win Rates',
        description: 'Real-time talk tracks, competitive intelligence, best practice recommendations. AI-assisted closing strategies proven to increase conversion.',
        features: [
          'Talk Track Recommendations',
          'Competitive Analysis',
          'Intelligent Closing Assistance',
          'Performance Analytics'
        ],
        featureShort: ['Talk Track', 'Competitive Analysis', 'Smart Closing']
      },
      customerService: {
        title: 'Customer Service',
        subtitle: 'Faster, Accurate, Empathetic Support',
        description: '24/7 intelligent response, complex issue routing, sentiment-aware interactions. Knowledge base integration for rapid issue resolution.',
        features: [
          '24/7 Availability',
          'Emotion Recognition',
          'Smart Ticketing',
          'Knowledge Management'
        ],
        featureShort: ['24/7 Response', 'Emotion Recognition', 'Smart Ticketing']
      },
      internalService: {
        title: 'Internal Operations',
        subtitle: 'Streamline Multi-tier Organization Management',
        description: 'Unified service portal for equipment, inventory, and training. Intelligent routing with progress tracking to optimize operational efficiency.',
        features: [
          'Unified Portal',
          'Intelligent Routing',
          'Data Analytics',
          'Process Automation'
        ],
        featureShort: ['Unified Portal', 'Smart Assignment', 'Data Analytics']
      },
      management: {
        title: 'Management Optimization',
        subtitle: 'Customer Voice Drives Product Innovation',
        description: 'Extract product insights from conversations, quantify feedback trends, establish voice-of-customer to product iteration loop.',
        features: [
          'Insight Mining',
          'Requirement Extraction',
          'Iteration Loop',
          'Trend Analysis'
        ],
        featureShort: ['Pain Point Detection', 'Requirement Extraction', 'Iteration Loop'],
        brandFeatures: ['Risk Alert', 'Sentiment Analysis', 'Quality Control']
      }
    },
    
    // Contact Section
    contact: {
      title: 'Start Your AI Transformation Journey',
      subtitle: 'See how Zenava can transform your customer dialogue operations',
      form: {
        name: 'Full Name',
        email: 'Business Email',
        company: 'Company',
        message: 'How can we help?',
        submit: 'Send Message'
      },
      cta: {
        demo: 'Schedule Demo',
        download: 'Download Brochure'
      }
    },
    
    // Footer
    footer: {
      sections: {
        solutions: 'Solutions',
        company: 'Company',
        legal: 'Legal',
        resources: 'Resources'
      },
      links: {
        about: 'About Us',
        contact: 'Contact',
        privacy: 'Privacy Policy',
        terms: 'Terms of Service',
        cookies: 'Cookie Preferences'
      },
      copyright: '© 2024 Zenava. All rights reserved.',
      followUs: 'Follow Us'
    },
    
    // Common Actions
    actions: {
      learnMore: 'Learn More',
      getStarted: 'Get Started',
      contactUs: 'Contact Us',
      bookDemo: 'Book a Demo',
      download: 'Download',
      viewAll: 'View All'
    },
    
    // Statistics
    stats: {
      conversations: 'Conversations Handled',
      uptime: 'Uptime SLA',
      enterprises: 'Enterprise Clients',
      satisfaction: 'Customer Satisfaction'
    },
    
    // AI Simulation Dialog
    aiSimulation: {
      aiAssistant: 'Zenava AI',
      status: 'Online',
      live: 'Live',
      customerQuery: "Hello, I'd like to track my order #A12345",
      aiProcessing: 'Identifying issue...',
      aiLocating: 'Locating your order information...',
      aiResponse: 'Order found. Package shipped, arriving within 24 hours. Need tracking link?',
      customerReply: 'Yes, please send me the tracking link 👍',
      inputPlaceholder: 'Type your message...',
      responseTime: 'Response',
      responseValue: '< 1.8s',
      satisfaction: 'Satisfaction',
      satisfactionValue: '98.7%'
    },
    
    // Sales Process Flow
    salesProcess: {
      title: 'Sales Enablement Process',
      step1: {
        title: 'Real-time Talk Track',
        description: 'Best talk track based on customer focus',
        value: 'Real-time'
      },
      step2: {
        title: 'Knowledge Base Access',
        description: 'Instant access to products, competitors, cases',
        value: 'Instant'
      },
      step3: {
        title: 'Smart Closing Assistance',
        description: '45% closing rate improvement',
        value: '+45%'
      }
    },
    
    // Platform Performance
    platformPerformance: {
      title: 'Platform Performance',
      subtitle: 'Trusted by 5000 enterprise companies worldwide for mission-critical customer interactions'
    },
    
    // Smart Ticket Process
    ticketProcess: {
      title: 'Smart Ticket Process',
      step1: {
        title: 'AI Problem Detection',
        description: 'Smart analysis of issue type and urgency'
      },
      step2: {
        title: 'Knowledge Base Access',
        description: 'Historical solutions and best practices'
      },
      step3: {
        title: 'Smart Routing',
        description: 'Auto-assign to appropriate agent'
      },
      step4: {
        title: 'Track Resolution',
        description: 'Real-time status and satisfaction tracking'
      }
    },
    
    // Internal Operations Metrics
    operationsMetrics: {
      title: 'Operations Efficiency',
      storeAccess: 'Store Access',
      storeCount: '500+',
      dailyProcessing: 'Daily Processing',
      dailyVolume: '10K+',
      avgResponse: 'Avg Response',
      responseTime: '2hrs',
      dispatchEfficiency: 'Dispatch Efficiency',
      efficiencyRate: '85%'
    }
  },
  
  jp: {
    // Company & Brand - Japanese with proper honorifics
    company: {
      name: 'Zenava',
      tagline: 'マーケティングとサービスシナリオ向けの対話型AIエージェント',
      vision: '企業の生産性と組織形態の変革を支援し、「人力駆動」から「AI駆動」への飛躍を実現',
      description: 'エンタープライズグレードのAI対話ソリューションで顧客エンゲージメントを変革'
    },
    
    // Navigation - Professional Japanese
    nav: {
      home: 'ホーム',
      scenarios: 'ソリューション',
      about: '会社概要',
      contact: 'お問い合わせ',
      getStarted: '始めましょう',
      learnMore: '詳細を見る',
      bookDemo: 'デモのご予約',
      language: '言語'
    },
    
    // Hero Section - Formal business Japanese
    hero: {
      title: 'マーケティングとサービスシナリオ向けの対話型AIエージェント',
      subtitle: '企業の生産性と組織形態の変革を支援し、「人力駆動」から「AI駆動」への飛躍を実現',
      cta: {
        primary: 'デモのご予約',
        secondary: 'ソリューション一覧'
      }
    },
    
    // Business Value - Professional tone
    businessValue: {
      title: 'Zenavaが貴社にもたらす価値',
      subtitle: 'AI駆動の対話インテリジェンスを通じて、組織能力を変革し、顧客体験を再構築します',
      metrics: {
        marketing: {
          title: 'マーケティング成果指標',
          costReduction: '平均顧客獲得コスト削減',
          conversionIncrease: 'リードコンバージョン率向上',
          responseTime: '顧客応答時間',
          responseValue: '<30秒',
          channelCoverage: 'スマートマーケティングチャネル',
          channelCount: '10+',
          dailyInquiries: '日次問い合わせ処理数',
          dailyCount: '50,000+'
        },
        sales: {
          title: 'セールス成果指標',
          cycleReduction: '販売サイクル短縮',
          winRateIncrease: '成約率向上'
        },
        service: {
          title: 'サービス成果指標',
          responseTime: '平均応答時間',
          resolutionRate: '初回解決率'
        },
        internal: {
          title: '運用指標',
          efficiency: 'プロセス効率向上',
          satisfaction: '従業員満足度'
        },
        product: {
          title: '製品イノベーション指標',
          insights: '顧客インサイト生成',
          iterations: '製品イテレーション速度'
        },
        brand: {
          title: 'ブランド保護指標',
          monitoring: 'リアルタイム監視',
          response: '危機対応時間'
        }
      }
    },
    
    // Scenarios/Solutions - Industry terminology
    scenarios: {
      marketing: {
        title: 'マーケティング自動化',
        subtitle: 'コンバージョン向上、獲得コスト削減',
        description: 'リアルタイム意図認識、統一リード獲得、インテリジェントな高ポテンシャルリードルーティング。会話分析がマーケティング戦略の最適化を支援。',
        features: [
          '意図認識',
          'スマートリード獲得',
          'マルチチャネル統合',
          '予測分析'
        ]
      },
      sales: {
        title: 'セールス支援',
        subtitle: '成約率向上、勝率アップ',
        description: 'リアルタイムトークトラック、競合インテリジェンス、ベストプラクティス推奨。AI支援のクロージング戦略でコンバージョン向上を実証。',
        features: [
          'トークトラック推奨',
          '競合分析',
          'インテリジェントクロージング支援',
          'パフォーマンス分析'
        ],
        featureShort: ['話術推薦', '競品分析', 'スマート成約']
      },
      customerService: {
        title: 'カスタマーサービス',
        subtitle: 'より速く、正確で、共感的なサポート',
        description: '24時間365日のインテリジェント応答、複雑な問題のルーティング、感情認識対応。ナレッジベース統合による迅速な問題解決。',
        features: [
          '24時間365日対応',
          '感情認識',
          'スマートチケッティング',
          'ナレッジ管理'
        ]
      },
      internalService: {
        title: '社内オペレーション',
        subtitle: '多層組織管理の効率化',
        description: '設備、在庫、トレーニングの統一サービスポータル。進捗追跡付きインテリジェントルーティングで運用効率を最適化。',
        features: [
          '統一ポータル',
          'インテリジェントルーティング',
          'データ分析',
          'プロセス自動化'
        ]
      },
      management: {
        title: '経営最適化',
        subtitle: '顧客の声が製品イノベーションを推進',
        description: '会話から製品インサイトを抽出、フィードバックトレンドを定量化、顧客の声から製品イテレーションループを確立。',
        features: [
          'インサイトマイニング',
          '要件抽出',
          'イテレーションループ',
          'トレンド分析'
        ]
      }
    },
    
    // Contact Section - Polite Japanese
    contact: {
      title: 'AI変革の旅を始めましょう',
      subtitle: 'Zenavaがお客様の対話オペレーションをどのように変革できるかご覧ください',
      form: {
        name: 'お名前',
        email: 'ビジネスメール',
        company: '会社名',
        message: 'お問い合わせ内容',
        submit: '送信'
      },
      cta: {
        demo: 'デモのご予約',
        download: 'パンフレットダウンロード'
      }
    },
    
    // Footer - Formal Japanese
    footer: {
      sections: {
        solutions: 'ソリューション',
        company: '会社情報',
        legal: '法的情報',
        resources: 'リソース'
      },
      links: {
        about: '会社概要',
        contact: 'お問い合わせ',
        privacy: 'プライバシーポリシー',
        terms: '利用規約',
        cookies: 'Cookieの設定'
      },
      copyright: '© 2024 Zenava. All rights reserved.',
      followUs: 'フォローする'
    },
    
    // Common Actions - Polite forms
    actions: {
      learnMore: '詳しく見る',
      getStarted: '始める',
      contactUs: 'お問い合わせ',
      bookDemo: 'デモを予約',
      download: 'ダウンロード',
      viewAll: 'すべて表示'
    },
    
    // Statistics
    stats: {
      conversations: '処理済み会話数',
      uptime: '稼働率SLA',
      enterprises: '企業クライアント',
      satisfaction: '顧客満足度'
    },
    
    // AI Simulation Dialog
    aiSimulation: {
      aiAssistant: 'Zenava AI',
      status: 'オンライン',
      live: 'ライブ',
      customerQuery: 'こんにちは、注文番号 #A12345 の配送状況を確認したいです',
      aiProcessing: '問題を識別中...',
      aiLocating: 'ご注文情報を確認中...',
      aiResponse: 'ご注文を確認しました。商品は発送済みで、24時間以内にお届け予定です。追跡リンクをお送りしますか？',
      customerReply: 'はい、追跡リンクをお願いします 👍',
      inputPlaceholder: 'メッセージを入力...',
      responseTime: 'レスポンス',
      responseValue: '< 1.8s',
      satisfaction: '満足度',
      satisfactionValue: '98.7%'
    },
    
    // Sales Process Flow
    salesProcess: {
      title: 'セールス支援プロセス',
      step1: {
        title: 'リアルタイムトークトラック',
        description: '顧客の関心事に基づく最適な話術',
        value: 'リアルタイム'
      },
      step2: {
        title: 'ナレッジベース活用',
        description: '製品、競合、事例の即時アクセス',
        value: '即時'
      },
      step3: {
        title: 'インテリジェント成約支援',
        description: '成約率45%向上',
        value: '+45%'
      }
    },
    
    // Platform Performance
    platformPerformance: {
      title: 'プラットフォームパフォーマンス',
      subtitle: '世界中の5000社の企業様から、ミッションクリティカルな顧客対応で信頼されています'
    },
    
    // Smart Ticket Process
    ticketProcess: {
      title: 'スマートチケット処理プロセス',
      step1: {
        title: 'AI問題検出',
        description: '問題の種類と緊急度を智能分析'
      },
      step2: {
        title: 'ナレッジベース活用',
        description: '過去の解決策とベストプラクティス'
      },
      step3: {
        title: 'インテリジェントルーティング',
        description: '適切なエージェントへ自動割り当て'
      },
      step4: {
        title: '解決状況追跡',
        description: 'リアルタイムステータスと満足度追跡'
      }
    },
    
    // Internal Operations Metrics
    operationsMetrics: {
      title: '運用効率向上',
      storeAccess: '店舗接続',
      storeCount: '500+',
      dailyProcessing: '日次処理',
      dailyVolume: '10K+',
      avgResponse: '平均応答',
      responseTime: '2時間',
      dispatchEfficiency: '派遣効率',
      efficiencyRate: '85%'
    }
  },
  
  hk: {
    // Company & Brand - Traditional Chinese (Hong Kong business style)
    company: {
      name: 'Zenava',
      tagline: '面向營銷和服務場景的對話式AI智能體',
      vision: '助力企業完成生產力與組織形態變革，實現從「人力驅動」到「AI驅動」的跨越',
      description: '企業級AI對話解決方案，革新客戶互動體驗'
    },
    
    // Navigation - Hong Kong business terminology
    nav: {
      home: '首頁',
      scenarios: '解決方案',
      about: '關於我們',
      contact: '聯絡我們',
      getStarted: '立即開始',
      learnMore: '了解更多',
      bookDemo: '預約演示',
      language: '語言'
    },
    
    // Hero Section
    hero: {
      title: '面向營銷和服務場景的對話式AI智能體',
      subtitle: '助力企業完成生產力與組織形態變革，實現從「人力驅動」到「AI驅動」的跨越',
      cta: {
        primary: '預約演示',
        secondary: '查看方案'
      }
    },
    
    // Business Value
    businessValue: {
      title: 'Zenava能為企業帶來什麼',
      subtitle: '透過AI驅動的對話智能，變革組織能力，重塑客戶體驗',
      metrics: {
        marketing: {
          title: '行銷成效指標',
          costReduction: '平均獲客成本降低',
          conversionIncrease: '線索轉化率提升',
          responseTime: '客戶響應時間',
          responseValue: '<30秒',
          channelCoverage: '智能行銷覆蓋渠道',
          channelCount: '10+',
          dailyInquiries: '日均處理諮詢量',
          dailyCount: '50,000+'
        },
        sales: {
          title: '銷售成效指標',
          cycleReduction: '銷售週期縮短',
          winRateIncrease: '成交率提升'
        },
        service: {
          title: '服務成效指標',
          responseTime: '平均響應時間',
          resolutionRate: '首次解決率'
        },
        internal: {
          title: '營運指標',
          efficiency: '流程效率提升',
          satisfaction: '員工滿意度'
        },
        product: {
          title: '產品創新指標',
          insights: '客戶洞察產生',
          iterations: '產品迭代速度'
        },
        brand: {
          title: '品牌保護指標',
          monitoring: '實時監控',
          response: '危機響應時間'
        }
      }
    },
    
    // Scenarios/Solutions
    scenarios: {
      marketing: {
        title: '市場營銷自動化',
        subtitle: '提升轉化率，降低獲客成本',
        description: '實時識別客戶意圖，統一話術留資，智能分配高潛線索。基於會話分析反哺營銷策略。',
        features: [
          '意圖識別',
          '智能留資',
          '多渠道整合',
          '預測分析'
        ]
      },
      sales: {
        title: '銷售賦能',
        subtitle: '縮短成交週期，提升成交率',
        description: '實時話術推薦，競品知識調用，最佳實踐建議。AI輔助成交策略，驗證轉化提升。',
        features: [
          '話術推薦',
          '競品分析',
          '智能成交輔助',
          '業績分析'
        ],
        featureShort: ['話術推薦', '競品分析', '智能成交']
      },
      customerService: {
        title: '客戶服務',
        subtitle: '更快、更準、更有溫度',
        description: '全天候智能響應，複雜問題智能分流，情緒感知互動。知識庫聯動快速解決問題。',
        features: [
          '24/7響應',
          '情緒識別',
          '智能工單',
          '知識管理'
        ]
      },
      internalService: {
        title: '內部運營',
        subtitle: '多層級組織高效管理',
        description: '統一服務入口處理設備、庫存、培訓事務。智能派單與進度追蹤，優化運營效率。',
        features: [
          '統一入口',
          '智能派單',
          '數據分析',
          '流程自動化'
        ]
      },
      management: {
        title: '管理優化',
        subtitle: '客戶聲音驅動產品創新',
        description: '從對話中提取產品洞察，量化反饋趨勢，建立客戶聲音到產品迭代閉環。',
        features: [
          '洞察挖掘',
          '需求提取',
          '迭代閉環',
          '趨勢分析'
        ]
      }
    },
    
    // Contact Section
    contact: {
      title: '開啟智能對話新篇章',
      subtitle: '讓Zenava AI助力您的企業實現客戶對話場景的智能化升級',
      form: {
        name: '姓名',
        email: '商務郵箱',
        company: '公司名稱',
        message: '諮詢內容',
        submit: '發送訊息'
      },
      cta: {
        demo: '預約演示',
        download: '下載產品手冊'
      }
    },
    
    // Footer
    footer: {
      sections: {
        solutions: '解決方案',
        company: '公司',
        legal: '法律條款',
        resources: '資源'
      },
      links: {
        about: '關於我們',
        contact: '聯絡我們',
        privacy: '隱私政策',
        terms: '條款與條件',
        cookies: 'Cookie偏好設定'
      },
      copyright: '© 2024 Zenava. 版權所有。',
      followUs: '關注我們'
    },
    
    // Common Actions
    actions: {
      learnMore: '了解更多',
      getStarted: '立即開始',
      contactUs: '聯絡我們',
      bookDemo: '預約演示',
      download: '下載',
      viewAll: '查看全部'
    },
    
    // Statistics
    stats: {
      conversations: '處理對話數',
      uptime: '運行時間SLA',
      enterprises: '企業客戶',
      satisfaction: '客戶滿意度'
    },
    
    // AI Simulation Dialog  
    aiSimulation: {
      aiAssistant: 'Zenava AI',
      status: '在線',
      live: '實時',
      customerQuery: '您好，我的訂單 #A12345 想查詢一下物流',
      aiProcessing: '正在識別問題...',
      aiLocating: '為您定位訂單資訊中...',
      aiResponse: '已找到訂單，包裹已出庫，預計 24 小時內送達。需要我發送追蹤連結嗎？',
      customerReply: '好的，謝謝！請發我追蹤連結 👍',
      inputPlaceholder: '輸入訊息...',
      responseTime: '響應時間',
      responseValue: '< 1.8s',
      satisfaction: '滿意度',
      satisfactionValue: '98.7%'
    },
    
    // Sales Process Flow
    salesProcess: {
      title: '銷售賦能流程',
      step1: {
        title: '實時話術推薦',
        description: '根據客戶關注點推薦最佳話術',
        value: '實時'
      },
      step2: {
        title: '知識庫調用',
        description: '產品、競品、案例即時調取',
        value: '秒級'
      },
      step3: {
        title: '智能成交輔助',
        description: '成交率提升45%',
        value: '+45%'
      }
    },
    
    // Platform Performance
    platformPerformance: {
      title: '平台性能',
      subtitle: '全球5000家企業信賴，為關鍵客戶互動提供支援'
    },
    
    // Smart Ticket Process  
    ticketProcess: {
      title: '智能工單處理流程',
      step1: {
        title: 'AI定位問題',
        description: '智能分析客戶問題類型和緊急程度'
      },
      step2: {
        title: '知識庫調用',
        description: '歷史解決方案和最佳實踐'
      },
      step3: {
        title: '智能路由',
        description: '自動分配給合適的服務人員'
      },
      step4: {
        title: '跟蹤解決',
        description: '實時狀態更新和滿意度追蹤'
      }
    },
    
    // Internal Operations Metrics
    operationsMetrics: {
      title: '營運效率提升',
      storeAccess: '門店接入',
      storeCount: '500+',
      dailyProcessing: '日均處理',
      dailyVolume: '10K+',
      avgResponse: '平均響應',
      responseTime: '2小時',
      dispatchEfficiency: '派單效率',
      efficiencyRate: '85%'
    }
  }
}

export type Language = 'en' | 'jp' | 'hk'

export function getTranslations(language: Language) {
  return siteTranslations[language] || siteTranslations.en
}

// Helper to get nested translation
export function t(language: Language, key: string): string {
  const translations = getTranslations(language)
  return key.split('.').reduce((obj, k) => obj?.[k], translations as any) || key
}