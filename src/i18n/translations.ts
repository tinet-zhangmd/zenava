// Comprehensive multi-language translations for Zenava
// Reference: Avaya, Genesys, Decagon, Sierra professional terminology

export const siteTranslations = {
  en: {
    // Company & Brand
    company: {
      name: 'Zenava',
      tagline: 'AI Productivity Platform for Customer Service and Marketing Scenarios',
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
      title: 'AI Productivity Platform for Customer Service and Marketing Scenarios',
      subtitle: 'Empowering enterprise productivity and organizational transformation, achieving the leap from "Human-Driven" to "AI-Driven"',
      cta: {
        primary: 'Schedule Demo',
        secondary: 'View Solutions'
      }
    },
    
    // Business Value
    businessValue: {
      title: 'ZENAVA Modification',
      subtitle: 'This is the subtitle',
      metrics: {
        marketing: {
          title: 'Marketing Performance Metrics',
          costReduction: 'Average Customer Acquisition Cost Reduced By',
          conversionIncrease: 'Lead Conversion Rate Increased By',
          responseTime: 'Intelligent Marketing Covers 10+ Channels',
          responseValue: '<30s',
          channelCoverage: 'Marketing Channel Coverage',
          channelCount: '10+',
          dailyInquiries: 'Daily handled inquiries: 50,000+',
          dailyCount: '50,000+'
        },
        sales: {
          title: 'Sales Enablement Process',
          cycleReduction: 'Sales Cycle Shortened',
          winRateIncrease: 'Win Rate Improved',
          step1Title: 'Real-time Talk Track',
          step1Desc: 'Recommend the Best Talk Track Based on Customer Interests',
          step1Value: 'Real-time',
          step2Title: 'Knowledge Base Access',
          step2Desc: 'Instant access to products, competitors, cases',
          step2Value: 'Second Level',
          step3Title: 'Intelligent Deal-Closing Assistance',
          step3Desc: '45% Increase in Conversion Rate',
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
          title: 'Boost Operational Efficiency',
          efficiency: 'Process Efficiency Improved',
          satisfaction: 'Employee Satisfaction',
          storeConnections: 'Stores Connected',
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
          featureAdoption: 'Feature Adoption Rate',
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
          crisisSuccess: 'Crisis Resolution Success Rate',
          successRate: '98%'
        }
      }
    },
    
    // Scenarios/Solutions
    scenarios: {
      marketing: {
        title: 'Marketing Automation',
        subtitle: 'Increase Conversion Rate, Reduce Customer Acquisition Cost',
        description: 'Real-time intent recognition, unified lead capture, intelligent high-potential lead routing. Conversation analytics inform marketing strategy optimization',
        features: [
          'Intent Recognition',
          'Smart Lead Capture',
          'Multi-channel Integration',
          'Predictive Analytics'
        ],
        section3: {
          mainTitle: 'AI-Driven Marketing Automation',
          subtitle: 'Intelligent Lead Generation, Precise Conversion',
          description: 'Through AI-powered intelligent customer acquisition and recognition',
          tag1: 'Smart Recognition',
          tag2: 'Real-time Optimization',
          buttonText: 'Learn More About Marketing Automation',
          imageAlt: 'Physical Image'
        }
      },
      sales: {
        title: 'Sales Enablement',
        subtitle: 'Shorten sales cycle, increase conversion rate',
        description: 'Real-Time Talk Track Recommendation, Competitor Knowledge Retrieval, Best Practice Suggestions. Al-assisted deal-closing strategies verify conversion improvement',
        features: [
          'Talk Track Recommendations',
          'Competitive Analysis',
          'Intelligent Closing Assistance',
          'Performance Analytics'
        ],
        featureShort: ['Talk Track Recommendation', 'Competitor Analysis', 'Smart Deal-closing'],
        buttonText: 'Learn More About Sales'
      },
      customerService: {
        title: 'Customer Service',
        subtitle: 'Faster, Accurate, Empathetic Support',
        description: '24/7 intelligent response, smart routing for complex inquiries, sentiment-aware interactions. Knowledge base integration for fast resolution',
        features: [
          '24/7 Availability',
          'Emotion Recognition',
          'Smart Ticket Processing Workflow',
          'Knowledge Management'
        ],
        featureShort: ['24/7 Response', 'Emotion Recognition', 'Smart Ticket Processing Workflow'],
        buttonText: 'Learn More About Customer Service'
      },
      internalService: {
        title: 'Internal Operations',
        subtitle: 'Efficient Management of Multi-level Organizations',
        description: 'Unified service portal for equipment, inventory, and training. Intelligent dispatch and progress tracking optimize operational efficiency',
        features: [
          'Unified Portal',
          'Intelligent Routing',
          'Data Analytics',
          'Process Automation'
        ],
        featureShort: ['Unified Portal', 'Intelligent Dispatch', 'Data Analytics'],
        buttonText: 'Learn More About Internal Service',
        videoError: 'Your browser does not support video playback'
      },
      management: {
        title: 'Management Optimization',
        subtitle: 'Customer Feedback Drives Product lnnovation',
        description: 'Extract product insights from conversations, quantify feedback trends, establish a closed loop from customer feedback to product iteration',
        features: [
          'Insight Mining',
          'Requirement Extraction',
          'Iteration Loop',
          'Trend Analysis'
        ],
        featureShort: ['Insights Mining', 'Requirement Extraction', 'lteration Closed Loop'],
        brandFeatures: ['Risk Alert', 'Sentiment Analysis', 'Quality Control'],
        buttonText: 'Learn More About Management'
      }
    },
    
    // Contact Section
    contact: {
      title: 'Unveiling a New Chapter in Intelligent Conversations',
      subtitle: 'See how Zenava transforms your customer dialogue operations with intelligent upgrades',
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
      title: 'Platform Performance',
      conversations: 'Conversations Handled',
      uptime: 'Uptime SLA',
      enterprises: 'Enterprise Clients',
      satisfaction: 'Customer Satisfaction',
      uptimeValue: '99.9%',
      enterprisesValue: '5000+',
      satisfactionValue: '4.9/5'
    },
    
    // Other Resources Section
    otherResources: {
      title: 'Other Resources',
      cards: {
        voiceConnectivity: {
          title: 'Voice Connectivity',
          learnMore: 'Learn More',
          bookDemo: 'Book a Demo'
        },
        liveChat: {
          title: 'Live Chat',
          learnMore: 'Learn More',
          bookDemo: 'Book a Demo'
        }
      }
    },

    
    // Product Feedback Panel
    productFeedbackPanel: {
      title: 'Customer Feedback Analysis Panel',
      painPoints: 'Product Pain Points',
      painPointCount: '1,842',
      featureAdoption: 'Feature Adoption',
      adoptionRate: '78%',
      fixCycle: 'Issue Fix Cycle',
      fixTime: '3.2 days',
      monthlyIterations: 'Monthly Iterations',
      iterationCount: '12 versions',
      satisfactionIncrease: 'Satisfaction Increase',
      satisfactionGrowth: '+18%'
    },

    // AI Agents Page
    products: {
      aiAgents: {
        hero: {
          title: 'ZENAVA Independently Handles 80% of Repetitive, High-Frequency, Clear-Process Customer Interactions',
          subtitle: 'Significantly reduces reliance on human scale in traditional customer service, achieving a leap in customer experience',
          button: 'Schedule Consultation'
        },
        advantages: {
          title: 'ZENAVA Advantages',
          card1: {
            title: 'Conversational',
            subtitle: 'Communicate Like a Human',
            desc: 'Equipped with multimodal understanding, emotional perception, and highly humanized interaction capabilities, delivering communication experiences that surpass human interactions'
          },
          card2: {
            title: 'Action-Oriented',
            subtitle: 'Independently Complete Business Loops',
            desc: 'Directly drives business processes, completing tasks such as sending SMS, creating tickets, querying customer information, and sending appointment notifications'
          },
          card3: {
            title: 'Fast Deployment',
            subtitle: 'Smarter with Use',
            desc: 'Ready to use out of the box, quickly deploy and "go live", with built-in training processes that self-correct errors when encountering problems, getting smarter with use'
          },
          card4: {
            title: 'Quantifiable Value',
            subtitle: 'Make Every AI Investment Clearly Visible',
            desc: 'Value is quantifiable, achieving pure and disruptive cost structure reconstruction, reducing unit service cost (CPC) by approximately 20%'
          }
        },
        features: {
          title: 'Core Features',
          subtitle: '',
          voice: {
            title: 'Voice Agents',
            subtitle: 'Beyond Human Voice Conversation Experience',
            list: [
              'Human-like Timbre: Voice rich with emotion and expressiveness, delivering communication experiences that surpass real humans',
              'Low-latency Interaction: Fast response, real-time conversation without lag',
              'Precise Intelligent Interruption: Can interrupt and interject at any time, as natural as face-to-face conversation with real people',
              'Complete Business Loop, Significantly Improving Service Efficiency and Customer Experience'
            ],
            button: 'Learn More About Voice Agents'
          },
          messaging: {
            title: 'Create Ultimate Customer Service Experience',
            subtitle: '',
            list: [
              '7x24 hours omnichannel online, never miss any communication with customers',
              'Support rich media communication including text, images, and videos, accurately identifying customer intent',
              'Able to sense customer emotions from expressions and respond in a friendly and respectful manner',
              'Balance brand business bottom line and customer experience, flexibly meeting customer needs',
              'Possess empathy and judgment, driving complete business process loop'
            ],
            button: 'Learn More About Live Chat'
          }
        },
        resources: {
          title: 'Resource Center',
          card1: {
            tag: 'Product',
            title: 'Building Continuously Evolving AI Productivity'
          },
          card2: {
            tag: 'Industry Report',
            title: 'Building Continuously Evolving AI Productivity'
          },
          card3: {
            tag: 'Education',
            title: 'Building Continuously Evolving AI Productivity'
          },
          card4: {
            tag: 'Article',
            title: 'Building Continuously Evolving AI Productivity'
          }
        },
        cta: {
          title: 'Open a New Chapter in Intelligent Conversation',
          subtitle: 'Let Zenava AI help your enterprise achieve intelligent upgrades in customer conversation scenarios',
          button: 'Contact Us'
        }
      },
      voiceAgents: {
        banner: {
          imageAlt: 'VoiceAgents Product Banner - Beyond Human Voice Conversation Experience'
        },
        coreFeatures: {
          title: 'Core Capabilities',
          subtitle: '',
          feature1: {
            title: 'Human-like Timbre',
            subtitle: 'Communicate Like a Real Person',
            description: 'Natural and smooth voice interactions with rich emotions, featuring multiple timbres and tone styles to meet personalized preferences. Capable of expressing care, understanding, and professionalism based on scenarios, delivering communication experiences beyond real humans',
            tags: ['Natural Flow', 'Emotional Rich', 'Multiple Timbres', 'Personalized'],
            button: 'Learn More',
            mediaAlt: 'Human-like Timbre Feature Demo'
          },
          feature2: {
            title: 'Low-latency Interaction',
            subtitle: 'Real-time Response, No Waiting',
            description: 'Millisecond-level response speed, real-time conversation without lag, making interactions more natural. Whether customer inquiries, business processing, or complaint handling, Zenava responds quickly',
            tags: ['Millisecond Response', 'Real-time Dialogue', 'Seamless Transition', 'Efficient Flow'],
            button: 'Learn More',
            mediaAlt: 'Low-latency Interaction Feature Demo'
          },
          feature3: {
            title: 'Precise Intelligent Interruption',
            subtitle: 'Understanding True User Intent',
            description: 'Supports users interrupting and interjecting at any time, with real-time responses without interruption, as natural and flexible as face-to-face conversation',
            tags: ['Smart Interruption', 'Intent Recognition', 'Natural Dialogue', 'Real-time Response'],
            button: 'Learn More',
            mediaAlt: 'Precise Intelligent Interruption Feature Demo'
          },
          feature4: {
            title: 'Complete Business Loop',
            subtitle: 'End-to-End Business Automation',
            description: 'Zenava can directly execute tasks such as creating tickets, sending notifications, querying information, etc., turning conversations into actionable business operations',
            tags: ['Task Execution', 'Business Automation', 'Ticket Creation', 'Information Query'],
            button: 'Learn More',
            mediaAlt: 'Complete Business Loop Feature Demo'
          }
        },
        customerCases: {
          title: 'Applications and Quantified Results',
          subtitle: '',
          case1: {
            tag: 'Kitchen Appliances Industry',
            title: 'Kitchen Appliance Customer Achieves Large-scale Customer Service Automation, Saving 5.25 Million Annually',
            subtitle: 'Annual Cost Savings of 5.25 Million',
            description: 'Zenava independently handles product inquiries, repairs, order queries, and other repetitive consultations, replacing the workload of 35 call center agents',
            features: [
              'Annual cost savings of approximately 5.25 million yuan',
              'Project ROI as high as 425%'
            ],
            button: 'View Case Details',
            imageAlt: 'Kitchen Appliance Customer Service Automation Case'
          },
          case2: {
            tag: 'Automotive Industry',
            title: 'Automotive Customer Uses Zenava for Test Drive Invitations, Conversion Rate Rises to 85%',
            subtitle: 'Conversion Rate Up to 85%',
            description: 'Zenava automatically qualifies customer leads, timely screens effective customers through voice interaction, invites high-intent customers for test drives',
            features: [
              'Improves potential customer follow-up efficiency, enhances lead conversion rate, drives sales growth',
              'Invitation conversion rate rises to 85%'
            ],
            button: 'View Case Details',
            imageAlt: 'Automotive Customer Test Drive Invitation Case'
          },
          case3: {
            tag: 'Hotel Industry',
            title: 'Hotel Group Achieves Unmanned Booking Process, Significantly Boosting Booking Conversion Rate',
            subtitle: 'Booking Conversion Rate Up 15%-25%',
            description: 'Zenava independently completes the entire process from understanding booking needs, confirming time and room type to completing the booking',
            features: [
              'Supports multilingual communication, covering global customers',
              'Booking conversion rate increases by 15%-25%'
            ],
            button: 'View Case Details',
            imageAlt: 'Hotel Group Booking Automation Case'
          }
        }
      },
      liveChat: {
        advantages: {
          title: 'LiveChat Advantages',
          card1: {
            title: 'Real-time Response',
            subtitle: 'Second-level Customer Reply',
            desc: '7x24 hours online, intelligent routing allocation, ensuring customer issues are responded to and handled promptly'
          },
          card2: {
            title: 'Multi-channel Support',
            subtitle: 'Unified Management of All Channels',
            desc: 'Support website, mobile, social media and other channels, unified management of customer conversations, improving service efficiency'
          },
          card3: {
            title: 'Intelligent Analytics',
            subtitle: 'Data-driven Optimization',
            desc: 'Real-time analysis of customer conversation data, identifying common issues, optimizing service processes, improving customer satisfaction'
          }
        },
        features: {},
        caseStudies: {
          title: 'Applications and Quantified Results',
          subtitle: '',
          case1: {
            mainTitle: 'B2B Enterprise Website Unmanned Customer Service, Lead Conversion Rate Up to 46%',
            highlight: 'Lead Conversion Rate Up to 46%',
            description: 'Zenava independently receives customers on the official website, automatically performs preliminary screening of leads and information collection',
            points: [
              'Covers pre-sales reception during all time slots, achieving unmanned customer service on the official website',
              'Lead conversion rate as high as 46%, exceeding manual lead conversion rate of 40%',
              'Product business knowledge updated at minute level, ensuring service accuracy and professionalism'
            ],
            metric: '46%',
            metricLabel: 'Lead Conversion Rate',
            imageSrc: '/assets/images/livechat/case1-b2b.webp',
            imageAlt: 'B2B Enterprise Website Unmanned Customer Service',
            button: 'Learn More',
            buttonLink: '/products/live-chat'
          },
          case2: {
            mainTitle: 'Smart Lock End-to-End After-Sales Service Automation, Annual Total Cost Savings of 6.21 Million',
            highlight: 'Annual Total Cost Savings of 6.21 Million',
            description: 'Zenava accurately identifies images through multi-round conversations, independently completing smart lock troubleshooting',
            points: [
              'Independent reception rate reaches 83%',
              'Annual total cost savings of 6.21 million'
            ],
            metric: '6.21M',
            metricLabel: 'Annual Cost Savings',
            metric2: '83%',
            metric2Label: 'Independent Reception Rate',
            imageSrc: '/assets/images/livechat/case2-smartlock.webp',
            imageAlt: 'Smart Lock End-to-End After-Sales Service Automation',
            button: 'Learn More',
            buttonLink: '/products/live-chat'
          }
        },
        section3: {
          title: 'AI Agents for Chat',
          subtitle: '',
          item1: {
            mainTitle: '7x24 Hour Omnichannel Online',
            subtitle: 'Never Miss Any Communication with Customers',
            description: 'Zenava can communicate with customers in real-time 7x24 hours on their chosen channels, whether it\'s web pages, Apps, social media, or messaging applications. Enterprises don\'t need to worry about customers waiting or missing business opportunities, significantly improving customer satisfaction and retention',
            tag1: '7x24 Hours',
            tag2: 'Omnichannel',
            tag3: 'Real-time',
            buttonText: 'Learn More',
            imageAlt: '7x24 Hour Omnichannel Online',
            imageSrc: '/assets/images/livechat/omnichannel.webp'
          },
          item2: {
            mainTitle: 'Rich Media Communication',
            subtitle: 'Accurately Identify Customer Intent',
            description: 'Zenava can not only understand text but also images, videos, and other forms of information, providing a rich dialogue experience, enabling complex multi-turn dialogue information collection, accurately identifying customer intent, and efficiently handling customer problems',
            tag1: 'Rich Media',
            tag2: 'Intent Recognition',
            tag3: 'Multi-turn Dialogue',
            buttonText: 'Learn More',
            imageAlt: 'Rich Media Communication',
            imageSrc: '/assets/images/livechat/rich-media.webp'
          },
          item3: {
            mainTitle: 'Emotion Perception',
            subtitle: 'Respond in a Friendly and Respectful Manner',
            description: 'Zenava, through personality modeling, possesses language understanding and emotional perception capabilities, able to identify emotions from expressions and respond in a friendly and respectful manner, allowing customers to feel attentive and professional service experience',
            tag1: 'Emotion Recognition',
            tag2: 'Friendly Response',
            tag3: 'Professional Service',
            buttonText: 'Learn More',
            imageAlt: 'Emotion Perception',
            imageSrc: '/assets/images/livechat/emotion.webp'
          },
          item4: {
            mainTitle: 'Balance Business and Experience',
            subtitle: 'Flexibly Meet Customer Demands',
            description: 'Under the premise of adhering to enterprise business bottom lines and brand norms, Zenava can flexibly meet customers\' personalized needs, enabling enterprises to enhance customer experience while ensuring safety and compliance',
            tag1: 'Business Compliance',
            tag2: 'Flexible Solutions',
            tag3: 'Customer Experience',
            buttonText: 'Learn More',
            imageAlt: 'Balance Business and Experience',
            imageSrc: '/assets/images/livechat/balance.webp'
          },
          item5: {
            mainTitle: 'Empathy and Judgment',
            subtitle: 'Drive Full Business Process Closure',
            description: 'Zenava possesses empathy and judgment, and in actual business scenarios, it can use tools like human employees to complete tasks such as sending SMS messages, creating work orders, querying customer data, and sending invitation notifications, achieving business closure',
            tag1: 'Empathy',
            tag2: 'Business Automation',
            tag3: 'Process Closure',
            buttonText: 'Learn More',
            imageAlt: 'Empathy and Judgment',
            imageSrc: '/assets/images/livechat/empathy.webp'
          }
        }
      }
    },
    
    // Sentiment Panel
    sentimentPanel: {
      title: 'Real-time Sentiment Monitoring',
      negativeAlert: 'Negative Sentiment Alert',
      alertCount: '3 items',
      sensitiveWords: 'Sensitive Word Detection',
      detectionRate: '99.8%',
      brandSentiment: 'Brand Favorability',
      sentimentGrowth: '+12%',
      responseTime: 'Response Time',
      responseSpeed: '<5 minutes',
      crisisSuccess: 'Crisis Success Rate',
      successRate: '98%'
    },
    
    // AI Simulation Dialog
    aiSimulation: {
      aiAssistant: 'Zenava AI',
      status: 'Online',
      live: 'Real-time',
      customerQuery: "Hello, l'd like to check the logistics status of my order #A12345",
      aiProcessing: 'Identifying issue...',
      aiLocating: 'Locating your order information...',
      aiResponse: 'We have located your order. The package has been shipped and is expected to be delivered within 24 hours. Would you like me to send you the tracking link?',
      customerReply: 'Yes, thanks! Please send me the tracking link👍',
      inputPlaceholder: 'Type your message...',
      responseTime: 'Response Time',
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
      title: 'PLATFORM PERFORMANCE',
      subtitle: 'Trusted by 5000 enterprise companies worldwide for mission-critical customer interactions',
      uptime: 'Uptime SLA',
      enterprisesServed: 'Enterprise Clients',
      satisfaction: 'Customer Satisfaction'
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
      title: 'Operational Efficiency',
      storeAccess: 'Store Connections',
      storeCount: '500+',
      dailyProcessing: 'Daily Processing',
      dailyVolume: '10K+',
      avgResponse: 'Average Response',
      responseTime: '2 Hours',
      dispatchEfficiency: 'Dispatch Efficiency',
      efficiencyRate: '85%'
    },

    // Banner Carousel Translations
    banners: {
      slide1: {
        siteName: 'ZENAVA',
        mainTitle: 'Enterprise AI Conversation Solutions',
        description: 'Transform your customer service with intelligent AI agents, enhance customer experience, reduce operational costs',
        buttonText: 'Schedule Consultation',
        imageAlt: 'Banner Image 1'
      },
      slide2: {
        siteName: 'ZENAVA Sales',
        mainTitle: 'Intelligent Sales Enablement System',
        description: 'AI-driven intelligent sales platform, precise customer profile analysis, intelligent sales strategy recommendations, improve closing rates and shorten sales cycles',
        buttonText: 'Learn About Sales Solutions',
        imageAlt: 'Intelligent Sales System Interface'
      },
      slide3: {
        siteName: 'Intelligent AI Platform',
        mainTitle: '4345323',
        description: '43244444444',
        buttonText: 'Schedule Consultation',
        imageAlt: 'Intelligent AI Platform Display'
      },
      slide4: {
        siteName: 'ZENAVA',
        mainTitle: '7x24 Intelligent Customer Service',
        description: 'AI-powered customer service system provides 24/7 service, automatically handles common issues, emotion recognition enhances experience',
        buttonText: 'View Details',
        imageAlt: 'Intelligent Customer Service'
      },
      slide5: {
        siteName: '',
        mainTitle: '',
        description: '',
        buttonText: '',
        imageAlt: 'Marketing Campaign Banner'
      },
      slide6: {
        siteName: '',
        mainTitle: '',
        description: '',
        buttonText: '',
        imageAlt: 'Marketing Campaign Banner'
      }
    }
  },
  
  jp: {
    // Company & Brand - Japanese with proper honorifics
    company: {
      name: 'Zenava',
      tagline: 'カスタマーサービスとマーケティングシナリオ向けのAI生産性プラットフォーム',
      vision: '企業の生産性および組織形態の変革を支援し、「人力主導」から「AI主導」への飛躍を実現',
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
      title: 'カスタマーサービスとマーケティングシナリオ向けのAI生産性プラットフォーム',
      subtitle: '企業の生産性および組織形態の変革を支援し、「人力主導」から「AI主導」への飛躍を実現',
      cta: {
        primary: 'デモのご予約',
        secondary: 'ソリューション一覧'
      }
    },
    
    // Business Value - Professional tone
    businessValue: {
      title: 'ZENAVA改修',
      subtitle: 'これはサブタイトルです',
      metrics: {
        marketing: {
          title: 'マーケティング成果指標',
          costReduction: '平均顧客獲得コスト43%削減',
          conversionIncrease: 'リードコンバージョン疗65%向上',
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
        subtitle: 'コンバージョン向上、顧客獲得コスト削減',
        description: '顧客の意図をリアルタイムで把握し、潜在リードを効率的に分配。会話分析でマーケティング戦略を最適化',
        features: [
          '意図認識',
          'スマートリード獲得',
          'マルチチャネル統合',
          '予測分析'
        ],
        section3: {
          mainTitle: 'AI駆動のマーケティングオートメーション',
          subtitle: 'スマートリード獲得、正確なコンバージョン',
          description: 'AIによるスマートな顧客獲得と認識',
          tag1: 'スマート認識',
          tag2: 'リアルタイム最適化',
          buttonText: 'マーケティングオートメーションの詳細',
          imageAlt: '実体画像'
        }
      },
      sales: {
        title: 'セールス支援プロセス',
        subtitle: '成約周期短縮、成約率アップ',
        description: 'リアルタイムトークスクリプト推奨、競合情報活用、ベストプラクティス提案。AIで成約戦略を支援し、コンバージョン向上を実現',
        features: [
          'トークトラック推奨',
          '競合分析',
          'インテリジェントクロージング支援',
          'パフォーマンス分析'
        ],
        featureShort: ['トークスクリプト推奨', '競合分析', 'スマート成約'],
        buttonText: '営業の詳細'
      },
      customerService: {
        title: 'カスタマーサービス',
        subtitle: 'より速く、正確で、共感的なサポート',
        description: '24時間365日のインテリジェント応答、複雑な問題のルーティング、感情認識対応。ナレッジベース統合による迅速な問題解決',
        features: [
          '24時間365日対応',
          '感情認識',
          'スマートチケッティング',
          'ナレッジ管理'
        ],
        buttonText: 'カスタマーサービスの詳細'
      },
      internalService: {
        title: '社内運営',
        subtitle: '多層組織管理の効率化',
        description: 'サービスの統一窓口で、設備、在庫、研修業務を処理。スマートディスパッチと進捗管理で、運営効率を最適化',
        features: [
          '統一窓口',
          'インテリジェントルーティング',
          'データ分析',
          'プロセス自動化'
        ],
        buttonText: '社内サービスの詳細',
        videoError: 'お使いのブラウザは動画再生に対応していません'
      },
      management: {
        title: '経営最適化',
        subtitle: '顧客の声が製品イノベーションを推進',
        description: '会話から製品に関するインサイトを抽出し、フィードバックの傾向を定量化。顧客の声を製品アップデートに活かすサイクルを構築',
        features: [
          'インサイトマイニング',
          'ニーズ抽出',
          'イテレーションループ',
          'トレンド分析'
        ],
        brandFeatures: ['リスクアラート', '感情分析', '品質管理'],
        buttonText: '管理の詳細'
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
      title: 'プラットフォームパフォーマンス',
      conversations: '処理済み会話数',
      uptime: '稼働率SLA',
      enterprises: '企業クライアント',
      satisfaction: '顧客満足度',
      uptimeValue: '99.9%',
      enterprisesValue: '5000+',
      satisfactionValue: '4.9/5'
    },
    
    // Other Resources Section
    otherResources: {
      title: 'その他のリソース',
      cards: {
        voiceConnectivity: {
          title: '音声接続',
          learnMore: '詳細を見る',
          bookDemo: 'デモを予約'
        },
        liveChat: {
          title: 'ライブチャット',
          learnMore: '詳細を見る',
          bookDemo: 'デモを予約'
        }
      }
    },

    
    // Product Feedback Panel
    productFeedbackPanel: {
      title: '顧客フィードバック分析パネル',
      painPoints: '製品の問題点',
      painPointCount: '1,842',
      featureAdoption: '機能採用率',
      adoptionRate: '78%',
      fixCycle: '問題修正サイクル',
      fixTime: '3.2日',
      monthlyIterations: '月次アップデート',
      iterationCount: '12バージョン',
      satisfactionIncrease: '満足度向上',
      satisfactionGrowth: '+18%'
    },

    // AI Agents Page
    products: {
      aiAgents: {
        hero: {
          title: 'ZENAVAは、反復的で高頻度、プロセスが明確な顧客対応タスクの80%を独立して処理します',
          subtitle: '従来のカスタマーサービスにおける人的規模への依存を大幅に削減し、顧客体験の飛躍的な向上を実現します',
          button: '相談を予約'
        },
        advantages: {
          title: 'ZENAVAの強み',
          card1: {
            title: '対話力',
            subtitle: '人間のようなコミュニケーション',
            desc: 'マルチモーダル理解、感情認識、高度な人間化インタラクション能力を備え、人間を超えるコミュニケーション体験を提供します'
          },
          card2: {
            title: '実行力',
            subtitle: 'ビジネスループを独立して完結',
            desc: 'ビジネスプロセスを直接駆動し、SMS送信、チケット作成、顧客情報の照会、アポイント通知などのタスクを完了します'
          },
          card3: {
            title: '迅速な導入',
            subtitle: '使うほどに賢く',
            desc: 'すぐに使用可能、迅速にデプロイして「稼働」開始、内蔵のトレーニングプロセスにより問題に遭遇した際にエラーを自己修正し、使用するほどに賢くなります'
          },
          card4: {
            title: '定量化可能な価値',
            subtitle: 'AIへの投資のすべてを明確に可視化',
            desc: '価値は定量化可能で、純粋で破壊的なコスト構造の再構築を実現し、単位サービスコスト（CPC）を約20%削減します'
          }
        },
        features: {
          title: 'コア機能',
          subtitle: '',
          voice: {
            title: 'Voice Agents',
            subtitle: '人間を超える音声対話体験',
            list: [
              '人間のような声色：感情と表現力に富んだ声で、人間を超えるコミュニケーション体験を提供',
              '低遅延インタラクション：迅速な応答、リアルタイム対話でラグなし',
              '精密なインテリジェント割り込み：いつでも割り込みや発言が可能で、人間との対面会話のように自然',
              '完全なビジネスループ、サービス効率と顧客体験を大幅に向上'
            ],
            button: 'Voice Agents機能の詳細'
          },
          messaging: {
            title: '究極のカスタマーサービス体験を創出',
            subtitle: '',
            list: [
              '7x24時間オムニチャネルオンライン、お客様とのすべてのコミュニケーションを見逃さない',
              'テキスト、画像、動画などのリッチメディアコミュニケーションをサポートし、お客様の意図を正確に識別',
              '表現からお客様の感情を感知し、友好的で尊重ある方法で応答',
              'ブランドのビジネス基盤と顧客体験を両立し、柔軟にお客様のニーズに対応',
              '共感力と判断力を備え、完全なビジネスプロセスループを推進'
            ],
            button: 'Live Chat機能の詳細'
          }
        },
        resources: {
          title: 'リソースセンター',
          card1: {
            tag: '製品',
            title: '進化し続けるAI生産性の構築'
          },
          card2: {
            tag: '業界レポート',
            title: '進化し続けるAI生産性の構築'
          },
          card3: {
            tag: '教育',
            title: '進化し続けるAI生産性の構築'
          },
          card4: {
            tag: '記事',
            title: '進化し続けるAI生産性の構築'
          }
        },
        cta: {
          title: 'インテリジェント対話の新たな章を開く',
          subtitle: 'Zenava AIが企業の顧客対話シナリオのインテリジェントなアップグレードを支援します',
          button: 'お問い合わせ'
        }
      },
      voiceAgents: {
        banner: {
          imageAlt: 'VoiceAgents製品バナー - 人間を超える音声対話体験'
        },
        coreFeatures: {
          title: 'コア能力',
          subtitle: '',
          feature1: {
            title: '人間らしい音色',
            subtitle: '本物の人間のようなコミュニケーション',
            description: '自然で滑らかな音声インタラクション、豊かな感情、複数の音色とトーンスタイルを備え、ユーザーの個性化されたニーズに対応。シナリオに応じて思いやり、理解、プロフェッショナリズムを表現し、本物の人間を超えるコミュニケーション体験を提供します',
            tags: ['自然な流れ', '豊かな感情', '複数の音色', 'パーソナライズ'],
            button: '詳細を見る',
            mediaAlt: '人間らしい音色機能デモ'
          },
          feature2: {
            title: '低遅延インタラクション',
            subtitle: 'リアルタイム応答、待ち時間なし',
            description: 'ミリ秒レベルの応答速度、リアルタイム対話でラグなし、より自然なインタラクションを実現。顧客からの問い合わせ、業務処理、クレーム処理など、Zenavaは迅速に応答します',
            tags: ['ミリ秒応答', 'リアルタイム対話', 'シームレス移行', '効率的な流れ'],
            button: '詳細を見る',
            mediaAlt: '低遅延インタラクション機能デモ'
          },
          feature3: {
            title: '精密なインテリジェント割り込み',
            subtitle: 'ユーザーの真の意図を理解',
            description: 'ユーザーがいつでも割り込みや発言ができ、中断なくリアルタイムで応答し、対面会話のように自然で柔軟です',
            tags: ['スマート割り込み', '意図認識', '自然な対話', 'リアルタイム応答'],
            button: '詳細を見る',
            mediaAlt: '精密なインテリジェント割り込み機能デモ'
          },
          feature4: {
            title: '完全なビジネスループ',
            subtitle: 'エンドツーエンドのビジネス自動化',
            description: 'Zenavaはチケット作成、通知送信、情報照会などのタスクを直接実行でき、会話を実行可能なビジネスアクションに変換します',
            tags: ['タスク実行', 'ビジネス自動化', 'チケット作成', '情報照会'],
            button: '詳細を見る',
            mediaAlt: '完全なビジネスループ機能デモ'
          }
        },
        customerCases: {
          title: '応用と定量化効果',
          subtitle: '',
          case1: {
            tag: '厨房電気業界',
            title: '厨房電気顧客が大規模カスタマーサービス自動化を実現、年間総コスト削減525万元',
            subtitle: '年間コスト削減525万元',
            description: 'Zenavaは製品問い合わせ、修理、注文照会などの大量の反復的な問い合わせを独立して処理し、35人のコールセンターエージェントの作業量を代替',
            features: [
              '年間コスト削減約525万元',
              'プロジェクトROIは425%に達する'
            ],
            button: 'ケース詳細を見る',
            imageAlt: '厨房電気顧客サービス自動化ケース'
          },
          case2: {
            tag: '自動車業界',
            title: '自動車顧客がZenavaで試乗招待を管理、コンバージョン率85%に向上',
            subtitle: 'コンバージョン率85%',
            description: 'Zenavaは顧客リードを自動的に選別し、音声インタラクションを通じて有効な顧客をタイムリーにスクリーニングし、高意向顧客を試乗に招待',
            features: [
              '潜在顧客のフォローアップ効率を向上させ、リードコンバージョン率を高め、売上成長を促進',
              '招待コンバージョン率85%に向上'
            ],
            button: 'ケース詳細を見る',
            imageAlt: '自動車顧客試乗招待ケース'
          },
          case3: {
            tag: 'ホテル業界',
            title: 'ホテルグループが予約プロセスを無人化、予約コンバージョン率を大幅向上',
            subtitle: '予約コンバージョン率15%-25%向上',
            description: 'Zenavaは予約ニーズの理解、時間と部屋タイプの確認から予約完了までの全プロセスを独立して完了',
            features: [
              '多言語コミュニケーションをサポートし、グローバル顧客をカバー',
              '予約コンバージョン率15%-25%向上'
            ],
            button: 'ケース詳細を見る',
            imageAlt: 'ホテルグループ予約自動化ケース'
          }
        }
      },
      liveChat: {
        advantages: {
          title: 'LiveChatの強み',
          card1: {
            title: 'リアルタイム応答',
            subtitle: '秒単位で顧客に返信',
            desc: '7x24時間オンライン、インテリジェントなルーティング割り当てにより、顧客の問題が迅速に応答され処理されます'
          },
          card2: {
            title: 'マルチチャネルサポート',
            subtitle: 'すべてのチャネルを統一管理',
            desc: 'ウェブサイト、モバイル、ソーシャルメディアなど複数のチャネルをサポートし、顧客対話を統一管理し、サービス効率を向上させます'
          },
          card3: {
            title: 'インテリジェント分析',
            subtitle: 'データ駆動型最適化',
            desc: '顧客対話データをリアルタイムで分析し、一般的な問題を特定し、サービスプロセスを最適化し、顧客満足度を向上させます'
          }
        },
        features: {},
        caseStudies: {
          title: '応用と定量化効果',
          subtitle: '',
          case1: {
            mainTitle: 'B2B企業公式サイト無人カスタマーサービス、リード獲得率46%',
            highlight: 'リード獲得率46%',
            description: 'Zenavaは公式サイトで顧客を独立して受け入れ、リードの予備スクリーニングと情報収集を自動的に実行します',
            points: [
              '全時間帯で販売前受付をカバーし、公式サイトのカスタマーサービスを無人化します',
              'リード獲得率は46%と高く、手動リード獲得率40%を上回ります',
              '製品ビジネス知識を分単位で更新し、サービスの正確性と専門性を確保します'
            ],
            metric: '46%',
            metricLabel: 'リード獲得率',
            imageSrc: '/assets/images/livechat/case1-b2b.webp',
            imageAlt: 'B2B企業公式サイト無人カスタマーサービス',
            button: '詳細を見る',
            buttonLink: '/products/live-chat'
          },
          case2: {
            mainTitle: 'スマートロック顧客のエンドツーエンドアフターサービス自動化、年間総コスト削減621万元',
            highlight: '年間総コスト削減621万元',
            description: 'Zenavaはマルチターン対話と画像を組み合わせて正確に識別し、スマートロックのトラブルシューティングを独立して完了します',
            points: [
              '独立受付率は83%に達します',
              '年間総コスト削減621万元'
            ],
            metric: '621万',
            metricLabel: '年間コスト削減',
            metric2: '83%',
            metric2Label: '独立受付率',
            imageSrc: '/assets/images/livechat/case2-smartlock.webp',
            imageAlt: 'スマートロック顧客のエンドツーエンドアフターサービス自動化',
            button: '詳細を見る',
            buttonLink: '/products/live-chat'
          }
        },
        section3: {
          title: 'AI Agents for Chat',
          subtitle: '',
          item1: {
            mainTitle: '7×24時間オムニチャネルオンライン',
            subtitle: '顧客とのコミュニケーションを逃さない',
            description: 'Zenavaは、顧客が選択したチャネルで7×24時間リアルタイムにコミュニケーションを取ることができます。ウェブページ、アプリ、ソーシャルメディア、メッセージアプリなど、企業は顧客の待機やビジネス機会の喪失を心配する必要がなく、顧客満足度とリテンション率を大幅に向上させます',
            tag1: '7×24時間',
            tag2: 'オムニチャネル',
            tag3: 'リアルタイム',
            buttonText: '詳細を見る',
            imageAlt: '7×24時間オムニチャネルオンライン',
            imageSrc: '/assets/images/livechat/omnichannel.webp'
          },
          item2: {
            mainTitle: 'テキスト、画像、動画などのリッチメディアコミュニケーションをサポート',
            subtitle: '顧客の意図を正確に識別',
            description: 'Zenavaはテキストだけでなく、画像、動画など多様な形式の情報を理解でき、豊かな対話体験を提供し、複雑なマルチターン対話情報収集を実現し、顧客の意図を正確に識別し、顧客の問題を効率的に処理します',
            tag1: 'リッチメディア',
            tag2: '意図認識',
            tag3: 'マルチターン対話',
            buttonText: '詳細を見る',
            imageAlt: 'リッチメディアコミュニケーション',
            imageSrc: '/assets/images/livechat/rich-media.webp'
          },
          item3: {
            mainTitle: '表現から顧客の感情を感知',
            subtitle: '友好的で尊重ある方法で応答',
            description: 'Zenavaは性格モデリングを通じて言語理解と感情認識能力を備えており、表現から感情を識別し、友好的で尊重ある方法で応答することで、顧客に心のこもった専門的なサービス体験を提供します',
            tag1: '感情認識',
            tag2: '友好的応答',
            tag3: '専門サービス',
            buttonText: '詳細を見る',
            imageAlt: '感情感知',
            imageSrc: '/assets/images/livechat/emotion.webp'
          },
          item4: {
            mainTitle: 'ブランドのビジネス基盤と顧客体験を両立',
            subtitle: '顧客のニーズに柔軟に対応',
            description: '企業のビジネス基盤とブランド規範を遵守する前提で、Zenavaは顧客の個別ニーズに柔軟に対応でき、企業は安全性とコンプライアンスを確保しながら顧客体験を向上させることができます',
            tag1: 'ビジネスコンプライアンス',
            tag2: '柔軟なソリューション',
            tag3: '顧客体験',
            buttonText: '詳細を見る',
            imageAlt: 'ビジネスと体験の両立',
            imageSrc: '/assets/images/livechat/balance.webp'
          },
          item5: {
            mainTitle: '共感力と判断力を備える',
            subtitle: 'ビジネスプロセス全体の閉環を推進',
            description: 'Zenavaは共感力と判断力を備えており、実際のビジネスシナリオでは、人間の従業員のようにツールを使用して、SMS送信、チケット作成、顧客データの照会、招待通知などのタスクを完了し、ビジネス閉環を実現します',
            tag1: '共感力',
            tag2: 'ビジネス自動化',
            tag3: 'プロセス閉環',
            buttonText: '詳細を見る',
            imageAlt: '共感力と判断力',
            imageSrc: '/assets/images/livechat/empathy.webp'
          }
        }
      }
    },
    
    // Sentiment Panel
    sentimentPanel: {
      title: 'リアルタイム感情モニタリング',
      negativeAlert: 'ネガティブ感情アラート',
      alertCount: '3件',
      sensitiveWords: 'センシティブワード検出',
      detectionRate: '99.8%',
      brandSentiment: 'ブランド好感度',
      sentimentGrowth: '+12%',
      responseTime: '応答時間',
      responseSpeed: '<5分',
      crisisSuccess: '危機対応成功率',
      successRate: '98%'
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
        title: 'セールス支援プロセス',
        description: 'リアルタイムトークスクリプト推奨',
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
      subtitle: '世界中の5000社の企業様から、ミッションクリティカルな顧客対応で信頼されています',
      uptime: '稼働率SLA',
      enterprisesServed: '企業顧客',
      satisfaction: '顧客満足度'
    },
    
    // Smart Ticket Process
    ticketProcess: {
      title: 'スマートチケット処理プロセス',
      step1: {
        title: 'AI問題検出',
        description: '問題の種類と緊急度をスマートに分析'
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
      dispatchEfficiency: 'ディスパッチ効率',
      efficiencyRate: '85%'
    },

    // Banner 轮播翻译
    banners: {
      slide1: {
        siteName: 'ZENAVA',
        mainTitle: '企業向けAI会話ソリューション',
        description: 'インテリジェントなAIアシスタントでカスタマーサービスを変革し、顧客体験を向上させ、運用コストを削減',
        buttonText: '相談を予約',
        imageAlt: 'バナー画像1'
      },
      slide2: {
        siteName: 'ZENAVA Sales',
        mainTitle: 'インテリジェント営業支援システム',
        description: 'AI駆動のインテリジェント営業プラットフォーム、正確な顧客プロファイル分析、インテリジェントな営業戦略の推奨、成約率を向上させ、営業サイクルを短縮',
        buttonText: '営業ソリューションの詳細',
        imageAlt: 'インテリジェント営業システムインターフェース'
      },
      slide3: {
        siteName: 'インテリジェントAIプラットフォーム',
        mainTitle: '4345323',
        description: '43244444444',
        buttonText: '相談を予約',
        imageAlt: 'インテリジェントAIプラットフォームディスプレイ'
      },
      slide4: {
        siteName: 'ZENAVA',
        mainTitle: '7x24スマートカスタマーサービス',
        description: 'AIスマートカスタマーサービスシステムは24時間365日のサービスを実現し、よくある質問を自動処理し、感情認識で体験を向上',
        buttonText: '詳細を見る',
        imageAlt: 'スマートカスタマーサービス'
      },
      slide5: {
        siteName: '',
        mainTitle: '',
        description: '',
        buttonText: '',
        imageAlt: 'マーケティングキャンペーンバナー'
      },
      slide6: {
        siteName: '',
        mainTitle: '',
        description: '',
        buttonText: '',
        imageAlt: 'マーケティングキャンペーンバナー'
      }
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
      title: 'ZENAVA修改',
      subtitle: '這是副標題',
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
        description: '實時識別客戶意圖，統一話術留資，智能分配高潛線索。基於會話分析反哺營銷策略',
        features: [
          '意圖識別',
          '智能留資',
          '多渠道整合',
          '預測分析'
        ],
        section3: {
          mainTitle: 'AI驅動的營銷自動化',
          subtitle: '智能獲客，精準轉化',
          description: '通過AI智能獲客識別',
          tag1: '智能識別',
          tag2: '實時優化',
          buttonText: '了解更多營銷自動化',
          imageAlt: '實體圖片'
        }
      },
      sales: {
        title: '銷售賦能',
        subtitle: '縮短成交週期，提升成交率',
        description: '實時話術推薦，競品知識調用，最佳實踐建議。AI輔助成交策略，驗證轉化提升',
        features: [
          '話術推薦',
          '競品分析',
          '智能成交輔助',
          '業績分析'
        ],
        featureShort: ['話術推薦', '競品分析', '智能成交'],
        buttonText: '了解更多智能銷售'
      },
      customerService: {
        title: '客戶服務',
        subtitle: '更快、更準、更有溫度',
        description: '全天候智能響應，複雜問題智能分流，情緒感知互動。知識庫聯動快速解決問題',
        features: [
          '24/7響應',
          '情緒識別',
          '智能工單',
          '知識管理'
        ],
        buttonText: '了解更多客戶服務'
      },
      internalService: {
        title: '內部運營',
        subtitle: '多層級組織高效管理',
        description: '統一服務入口處理設備、庫存、培訓事務。智能派單與進度追蹤，優化運營效率',
        features: [
          '統一入口',
          '智能派單',
          '數據分析',
          '流程自動化'
        ],
        buttonText: '了解更多內部服務',
        videoError: '您的瀏覽器不支持視頻播放'
      },
      management: {
        title: '管理優化',
        subtitle: '客戶聲音驅動產品創新',
        description: '從對話中提取產品洞察，量化反饋趨勢，建立客戶聲音到產品迭代閉環',
        features: [
          '洞察挖掘',
          '需求提取',
          '迭代閉環',
          '趨勢分析'
        ],
        brandFeatures: ['風險預警', '情緒分析', '品質控制'],
        buttonText: '了解更多管理優化'
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
      title: '平台性能',
      conversations: '處理對話數',
      uptime: '運行時間SLA',
      enterprises: '企業客戶',
      satisfaction: '客戶滿意度',
      uptimeValue: '99.9%',
      enterprisesValue: '5000+',
      satisfactionValue: '4.9/5'
    },
    
    // Other Resources Section
    otherResources: {
      title: '其他資源',
      cards: {
        voiceConnectivity: {
          title: '語音連接',
          learnMore: '了解更多',
          bookDemo: '預約演示'
        },
        liveChat: {
          title: '實時聊天',
          learnMore: '了解更多',
          bookDemo: '預約演示'
        }
      }
    },

    
    // Product Feedback Panel
    productFeedbackPanel: {
      title: '客戶反饋分析面板',
      painPoints: '產品痛點',
      painPointCount: '1,842',
      featureAdoption: '功能採用率',
      adoptionRate: '78%',
      fixCycle: '問題修復週期',
      fixTime: '3.2天',
      monthlyIterations: '月度迭代',
      iterationCount: '12個版本',
      satisfactionIncrease: '滿意度提升',
      satisfactionGrowth: '+18%'
    },

    // AI Agents Page
    products: {
      aiAgents: {
        hero: {
          title: 'ZENAVA能夠獨立承擔 80%的重複性、高頻次、流程清晰的客戶聯絡任務',
          subtitle: '顯著降低了傳統客服對人力規模的依賴，實現了客戶體驗的跨越式升級',
          button: '預約諮詢'
        },
        advantages: {
          title: 'ZENAVA的優勢',
          card1: {
            title: '能溝通',
            subtitle: '像真人一樣交流',
            desc: '具備多模態理解、情緒感知與高擬人化交互能力，帶來超越真人的溝通體驗'
          },
          card2: {
            title: '能執行',
            subtitle: '獨立完成業務閉環',
            desc: '直接驅動業務流程，完成如發送短信、創建工單、查詢客戶資料以及邀約通知等任務'
          },
          card3: {
            title: '快速上崗',
            subtitle: '越用越聰明',
            desc: '開箱即用，快速部署「上崗」，內置帶教流程，遇到問題時自我修正錯誤，越用越聰明'
          },
          card4: {
            title: '可量化價值',
            subtitle: '讓每一分AI投入都清晰可見',
            desc: '價值可量化，實現純粹、顛覆性的成本結構重構，單位服務成本(CPC)降低約20%'
          }
        },
        features: {
          title: '核心功能',
          subtitle: '',
          voice: {
            title: 'Voice Agents',
            subtitle: '超越真人的語音對話體驗',
            list: [
              '擬人化音色：聲音富有情緒與表達力，溝通體驗超越真人',
              '低延遲交互：快速響應，實時對話無卡頓',
              '精準智能打斷：可隨時打斷和插話，像真人面對面聊天那樣自然',
              '完整業務閉環，大幅提升服務效率與客戶體驗'
            ],
            button: '了解更多Voice Agents功能'
          },
          messaging: {
            title: '打造極致客戶服務體驗',
            subtitle: '',
            list: [
              '7x24小時全渠道在線，不錯失與客戶的每一次溝通',
              '支持文字、圖片、視頻等富媒體溝通，精準識別客戶意圖',
              '能夠從表述中感知客戶情緒，以友好、尊重的方式回應',
              '兼顧品牌的業務底線和客戶體驗，靈活滿足客戶訴求',
              '具備同理心與判斷力，驅動業務全流程閉環'
            ],
            button: '了解更多Live Chat功能'
          }
        },
        resources: {
          title: '資源中心',
          card1: {
            tag: '產品',
            title: '構建持續進化的AI生產力'
          },
          card2: {
            tag: '行業報告',
            title: '構建持續進化的AI生產力'
          },
          card3: {
            tag: '教育',
            title: '構建持續進化的AI生產力'
          },
          card4: {
            tag: '文章',
            title: '構建持續進化的AI生產力'
          }
        },
        cta: {
          title: '開啟智能對話新篇章',
          subtitle: '讓Zenava AI助力您的企業實現客戶對話場景的智能化升級',
          button: '聯絡我們'
        }
      },
      voiceAgents: {
        banner: {
          imageAlt: 'VoiceAgents產品Banner圖 - 超越真人的語音對話體驗'
        },
        coreFeatures: {
          title: '核心能力',
          subtitle: '',
          feature1: {
            title: '擬人化音色',
            subtitle: '像真人一樣交流',
            description: '語音交互自然流暢、情感豐富，具備多種音色與語氣風格，滿足用戶個性化偏好。能夠根據場景表達關懷、理解與專業感，讓溝通體驗超越真人',
            tags: ['自然流暢', '情感豐富', '多種音色', '個性化'],
            button: '了解更多',
            mediaAlt: '擬人化音色功能演示'
          },
          feature2: {
            title: '低延遲交互',
            subtitle: '實時響應，無需等待',
            description: '毫秒級響應速度，實時對話無卡頓，讓交互更自然。無論是客戶諮詢、業務辦理還是投訴處理，Zenava都能快速響應',
            tags: ['毫秒級響應', '實時對話', '無縫跳轉', '高效流暢'],
            button: '了解更多',
            mediaAlt: '低延遲交互功能演示'
          },
          feature3: {
            title: '精準智能打斷',
            subtitle: '理解用戶真實意圖',
            description: '支持用戶隨時打斷和插話，實時響應不中斷，像真人面對面聊天那樣自然靈活',
            tags: ['智能打斷', '意圖識別', '自然對話', '實時響應'],
            button: '了解更多',
            mediaAlt: '精準智能打斷功能演示'
          },
          feature4: {
            title: '完整業務閉環',
            subtitle: '端到端業務自動化',
            description: 'Zenava能直接執行任務，如創建工單、發送通知、查詢信息等，讓對話真正轉化為可落地的業務動作',
            tags: ['任務執行', '業務自動化', '工單創建', '信息查詢'],
            button: '了解更多',
            mediaAlt: '完整業務閉環功能演示'
          }
        },
        customerCases: {
          title: '應用與量化效果',
          subtitle: '',
          case1: {
            tag: '廚電行業',
            title: '廚電客戶實現大規模客戶服務自動化，年節省總成本525萬',
            subtitle: '年節省成本525萬',
            description: 'Zenava獨立處理產品諮詢、報修、訂單查詢等大量重複性諮詢，替代35個呼叫中心座席的工作量',
            features: [
              '年度節省成本約525萬元',
              '項目ROI高達425%'
            ],
            button: '查看案例詳情',
            imageAlt: '廚電客戶服務自動化案例'
          },
          case2: {
            tag: '汽車行業',
            title: '汽車客戶使用Zenava接管試駕邀約，轉化率提升至85%',
            subtitle: '轉化率提升至85%',
            description: 'Zenava能夠自動清洗客戶線索，通過語音交互及時篩選有效客戶，邀約高意向客戶到店試駕',
            features: [
              '提高潛在客戶的跟進效率，提升線索轉化率，帶動銷量增長',
              '邀約轉化率提升至85%'
            ],
            button: '查看案例詳情',
            imageAlt: '汽車客戶試駕邀約案例'
          },
          case3: {
            tag: '酒店行業',
            title: '酒店集團預訂全流程無人化，大幅提升預訂轉化率',
            subtitle: '預訂轉化率提升15%-25%',
            description: 'Zenava獨立完整執行從理解預訂需求、確認時間與房型到完成預訂的全流程',
            features: [
              '支持多語言溝通，覆蓋全球客戶',
              '預訂轉化率提升15%-25%'
            ],
            button: '查看案例詳情',
            imageAlt: '酒店集團預訂自動化案例'
          }
        }
      },
      liveChat: {
        advantages: {
          title: 'LiveChat的優勢',
          card1: {
            title: '實時響應',
            subtitle: '秒級回復客戶',
            desc: '7x24小時在線，智能路由分配，確保客戶問題得到及時響應和處理'
          },
          card2: {
            title: '多渠道支持',
            subtitle: '統一管理所有渠道',
            desc: '支持網站、移動端、社交媒體等多種渠道，統一管理客戶對話，提升服務效率'
          },
          card3: {
            title: '智能分析',
            subtitle: '數據驅動優化',
            desc: '實時分析客戶對話數據，識別常見問題，優化服務流程，提升客戶滿意度'
          }
        },
        features: {},
        caseStudies: {
          title: '應用與量化效果',
          subtitle: '',
          case1: {
            mainTitle: 'B2B企業官網客服無人化接待，留資率高達46%',
            highlight: '留資率高達46%',
            description: 'Zenava在官網獨立接待客戶，自動進行線索的初步篩選和信息收集',
            points: [
              '全時段覆蓋售前接待，實現官網客服無人化值守',
              '留資率高達46%，超過人工留資率40%',
              '產品業務知識分鐘級更新，保障服務準確性和專業度'
            ],
            metric: '46%',
            metricLabel: '留資率',
            imageSrc: '/assets/images/livechat/case1-b2b.webp',
            imageAlt: 'B2B企業官網客服無人化接待',
            button: '了解更多',
            buttonLink: '/products/live-chat'
          },
          case2: {
            mainTitle: '智能鎖客戶實現端到端售後服務自動化，年節省總成本 621 萬',
            highlight: '年節省總成本 621萬',
            description: 'Zenava通過多輪對話結合圖片精準識別，獨立完成智能鎖故障排查',
            points: [
              '獨立接待率達到83%',
              '年節省總成本 621萬'
            ],
            metric: '621萬',
            metricLabel: '年節省成本',
            metric2: '83%',
            metric2Label: '獨立接待率',
            imageSrc: '/assets/images/livechat/case2-smartlock.webp',
            imageAlt: '智能鎖客戶實現端到端售後服務自動化',
            button: '了解更多',
            buttonLink: '/products/live-chat'
          }
        },
        section3: {
          title: 'AI Agents for Chat',
          subtitle: '',
          item1: {
            mainTitle: '7×24小時全渠道在線',
            subtitle: '不錯失與客戶的每一次溝通',
            description: 'Zenava可以7×24小時在客戶選擇的渠道上與他們實時溝通，無論是網頁、App、社交媒體還是消息應用，企業無需擔心客戶等待或錯失商機，顯著提升客戶滿意度與留存率',
            tag1: '7×24小時',
            tag2: '全渠道',
            tag3: '實時溝通',
            buttonText: '了解更多',
            imageAlt: '7×24小時全渠道在線',
            imageSrc: '/assets/images/livechat/omnichannel.webp'
          },
          item2: {
            mainTitle: '支持文字、圖片、視頻等富媒體溝通',
            subtitle: '精準識別客戶意圖',
            description: 'Zenava不僅能理解文字，還能理解圖片、視頻等多種形態的信息，提供豐富的對話體驗，實現複雜多輪對話信息收集，精準識別客戶意圖，高效處理客戶問題',
            tag1: '富媒體',
            tag2: '意圖識別',
            tag3: '多輪對話',
            buttonText: '了解更多',
            imageAlt: '富媒體溝通',
            imageSrc: '/assets/images/livechat/rich-media.webp'
          },
          item3: {
            mainTitle: '能夠從表述中感知客戶情緒',
            subtitle: '以友好、尊重的方式回應',
            description: 'Zenava通過性格建模具備語言理解與情緒感知能力，能夠從表述中識別情緒，並以友好、尊重的方式回應，讓客戶感受到貼心和專業的服務體驗',
            tag1: '情緒識別',
            tag2: '友好回應',
            tag3: '專業服務',
            buttonText: '了解更多',
            imageAlt: '情緒感知',
            imageSrc: '/assets/images/livechat/emotion.webp'
          },
          item4: {
            mainTitle: '兼顧品牌的業務底線和客戶體驗',
            subtitle: '靈活滿足客戶訴求',
            description: '在遵守企業業務底線和品牌規範的前提下，Zenava能夠靈活滿足客戶個性化需求，使企業在保證安全與合規的同時提升客戶體驗',
            tag1: '業務合規',
            tag2: '靈活方案',
            tag3: '客戶體驗',
            buttonText: '了解更多',
            imageAlt: '兼顧業務和體驗',
            imageSrc: '/assets/images/livechat/balance.webp'
          },
          item5: {
            mainTitle: '具備同理心與判斷力',
            subtitle: '驅動業務全流程閉環',
            description: 'Zenava具有同理心與判斷力，在實際業務場景中，能夠像人類員工一樣調用工具，完成如發送短信、創建工單、查詢客戶資料以及邀約通知等任務，實現業務閉環',
            tag1: '同理心',
            tag2: '業務自動化',
            tag3: '流程閉環',
            buttonText: '了解更多',
            imageAlt: '同理心與判斷力',
            imageSrc: '/assets/images/livechat/empathy.webp'
          }
        }
      }
    },
    
    // Sentiment Panel
    sentimentPanel: {
      title: '實時情緒監控',
      negativeAlert: '負面情緒預警',
      alertCount: '3項',
      sensitiveWords: '敏感詞檢測',
      detectionRate: '99.8%',
      brandSentiment: '品牌好感度',
      sentimentGrowth: '+12%',
      responseTime: '響應時間',
      responseSpeed: '<5分鐘',
      crisisSuccess: '危機處理成功率',
      successRate: '98%'
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
      inputPlaceholder: '輸入您的訊息...',
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
      subtitle: '獲得全球5000家企業的信賴，為關鍵客戶互動提供可靠服務',
      uptime: '運行時間SLA',
      enterprisesServed: '企業客戶',
      satisfaction: '客戶滿意度'
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
    },

    // Banner 轮播翻译
    banners: {
      slide1: {
        siteName: 'ZENAVA',
        mainTitle: '企業級AI對話解決方案',
        description: '通過智能AI助手轉變您的客戶服務，提升客戶體驗，降低運營成本',
        buttonText: '預約諮詢',
        imageAlt: '橫幅圖片1'
      },
      slide2: {
        siteName: 'ZENAVA Sales',
        mainTitle: '智能銷售賦能系統',
        description: 'AI驅動的銷售智能化平台，精準客戶畫像分析，智能推薦銷售策略，提升成單率縮短銷售週期',
        buttonText: '了解銷售方案',
        imageAlt: '智能銷售系統界面'
      },
      slide3: {
        siteName: '智能AI平台',
        mainTitle: '4345323',
        description: '43244444444',
        buttonText: '預約諮詢',
        imageAlt: '智能AI平台展示'
      },
      slide4: {
        siteName: 'ZENAVA',
        mainTitle: '7x24智能客服',
        description: 'AI智能客服系統實現全天候服務，自動處理常見問題，情感識別提升體驗',
        buttonText: '查看詳情',
        imageAlt: '智能客服'
      },
      slide5: {
        siteName: '',
        mainTitle: '',
        description: '',
        buttonText: '',
        imageAlt: '營銷活動Banner圖'
      },
      slide6: {
        siteName: '',
        mainTitle: '',
        description: '',
        buttonText: '',
        imageAlt: '營銷活動Banner圖'
      }
    }
  },
  
  zh: {
    // 公司与品牌 - 简体中文
    company: {
      name: 'Zenava',
      tagline: '面向客服和营销场景的AI生产力平台',
      vision: '助力企业完成生产力与组织形态变革，实现从"人力驱动"到"AI驱动"的跨越',
      description: '企业级AI对话解决方案，革新客户互动体验'
    },
    
    // 导航
    nav: {
      home: '首页',
      scenarios: '解决方案',
      about: '关于我们',
      contact: '联系我们',
      getStarted: '立即开始',
      learnMore: '了解更多',
      bookDemo: '预约演示',
      language: '语言'
    },
    
    // 主横幅区
    hero: {
      title: '面向客服和营销场景的AI生产力平台',
      subtitle: '助力企业完成生产力与组织形态变革，实现从"人力驱动"到"AI驱动"的跨越',
      cta: {
        primary: '预约演示',
        secondary: '查看方案'
      }
    },
    
    // 业务价值
    businessValue: {
      title: 'ZENAVA修改',
      subtitle: '这是副标题',
      metrics: {
        marketing: {
          title: '营销成效指标',
          costReduction: '平均获客成本降低',
          conversionIncrease: '线索转化率提升',
          responseTime: '客户响应时间',
          responseValue: '<30秒',
          channelCoverage: '智能营销覆盖渠道',
          channelCount: '10+',
          dailyInquiries: '日均处理咨询量',
          dailyCount: '50,000+'
        },
        sales: {
          title: '销售成效指标',
          cycleReduction: '销售周期缩短',
          winRateIncrease: '成交率提升',
          step1Title: '实时话术推荐',
          step1Desc: '根据客户关注点推荐最佳话术',
          step1Value: '实时',
          step2Title: '知识库调用',
          step2Desc: '产品、竞品、案例即时调取',
          step2Value: '秒级',
          step3Title: '智能成交辅助',
          step3Desc: '成交率提升45%',
          step3Value: '+45%'
        },
        service: {
          title: '服务成效指标',
          responseTime: '平均响应时间',
          resolutionRate: '首次解决率',
          step1Title: 'AI定位问题',
          step1Desc: '智能分析客户问题类型和紧急程度',
          step2Title: '知识库调用',
          step2Desc: '历史解决方案和最佳实践',
          step3Title: '智能路由',
          step3Desc: '根据技能和负载自动分配',
          step4Title: '跟踪解决',
          step4Desc: '实时状态更新和质量保证'
        },
        internal: {
          title: '运营效率提升',
          efficiency: '流程效率提升',
          satisfaction: '员工满意度',
          storeConnections: '门店接入',
          storeCount: '500+',
          dailyProcessing: '日均处理',
          dailyCount: '10K+',
          avgResponse: '平均响应',
          avgTime: '2小时',
          assignmentEfficiency: '派单效率',
          efficiencyRate: '85%'
        },
        product: {
          title: '客户反馈仪表盘',
          insights: '客户洞察生成',
          iterations: '产品迭代速度',
          painPoints: '产品痛点收集',
          painPointCount: '1,842',
          featureAdoption: '功能采用率',
          adoptionRate: '78%',
          resolutionCycle: '问题解决周期',
          cycleTime: '3.2天',
          monthlyIterations: '月度产品迭代',
          iterationCount: '12个版本',
          satisfactionIncrease: '满意度提升',
          increaseRate: '+18%'
        },
        brand: {
          title: '实时舆情监控',
          monitoring: '实时监控',
          response: '危机响应时间',
          negativeAlerts: '负面情绪预警',
          alertCount: '3',
          sensitiveWords: '敏感词检测',
          detectionRate: '99.8%',
          brandFavorability: '品牌好感度',
          favorabilityRate: '+12%',
          responseTime: '舆情响应时间',
          responseValue: '<5分钟',
          crisisSuccess: '危机处理成功率',
          successRate: '98%'
        }
      }
    },
    
    // 场景/解决方案
    scenarios: {
      marketing: {
        title: '市场营销自动化',
        subtitle: '提升转化率，降低获客成本',
        description: '实时识别客户意图，统一话术留资，智能分配高潜线索。基于会话分析反哺营销策略优化',
        features: [
          '意图识别',
          '智能留资',
          '多渠道整合',
          '预测分析'
        ],
        // 版块3专用内容
        section3: {
          mainTitle: 'AI驱动的营销自动化',
          subtitle: '智能获客，精准转化',
          description: '通过AI智能获客识别',
          tag1: '智能识别',
          tag2: '实时优化',
          buttonText: '了解更多营销自动化',
          imageAlt: '实体图片'
        }
      },
      sales: {
        title: '销售赋能',
        subtitle: '缩短成交周期，提升成交率',
        description: '实时话术推荐，竞品知识调用，最佳实践建议。AI辅助成交策略，验证转化提升',
        features: [
          '话术推荐',
          '竞品分析',
          '智能成交辅助',
          '业绩分析'
        ],
        featureShort: ['话术推荐', '竞品分析', '智能成交'],
        buttonText: '了解更多智能销售'
      },
      customerService: {
        title: '客户服务',
        subtitle: '更快、更准、更有温度',
        description: '全天候智能响应，复杂问题智能分流，情绪感知互动。知识库联动快速解决问题',
        features: [
          '24/7响应',
          '情绪识别',
          '智能工单',
          '知识管理'
        ],
        featureShort: ['24/7响应', '情绪识别', '智能工单处理流程'],
        buttonText: '了解更多客户服务'
      },
      internalService: {
        title: '内部运营',
        subtitle: '多层级组织高效管理',
        description: '统一服务入口处理设备、库存、培训事务。智能派单与进度追踪，优化运营效率',
        features: [
          '统一入口',
          '智能派单',
          '数据分析',
          '流程自动化'
        ],
        featureShort: ['统一入口', '智能派单', '数据分析'],
        buttonText: '了解更多内部服务',
        videoError: '您的浏览器不支持视频播放'
      },
      management: {
        title: '管理优化',
        subtitle: '客户声音驱动产品创新',
        description: '从对话中提取产品洞察，量化反馈趋势，建立客户声音到产品迭代闭环',
        features: [
          '洞察挖掘',
          '需求提取',
          '迭代闭环',
          '趋势分析'
        ],
        featureShort: ['洞察挖掘', '需求提取', '迭代闭环'],
        brandFeatures: ['风险预警', '情绪分析', '品质控制'],
        buttonText: '了解更多管理优化'
      }
    },
    
    // 联系区
    contact: {
      title: '开启智能对话新篇章',
      subtitle: '让Zenava AI助力您的企业实现客户对话场景的智能化升级',
      form: {
        name: '姓名',
        email: '商务邮箱',
        company: '公司名称',
        message: '咨询内容',
        submit: '发送消息'
      },
      cta: {
        demo: '预约演示',
        download: '下载产品手册'
      }
    },
    
    // 页脚
    footer: {
      sections: {
        solutions: '解决方案',
        company: '公司',
        legal: '法律条款',
        resources: '资源'
      },
      links: {
        about: '关于我们',
        contact: '联系我们',
        privacy: '隐私政策',
        terms: '服务条款',
        cookies: 'Cookie偏好设置'
      },
      copyright: '© 2024 Zenava. 版权所有。',
      followUs: '关注我们'
    },
    
    // 常用操作
    actions: {
      learnMore: '了解更多',
      getStarted: '立即开始',
      contactUs: '联系我们',
      bookDemo: '预约演示',
      download: '下载',
      viewAll: '查看全部'
    },
    
    // 统计数据
    stats: {
      title: '平台性能',
      conversations: '处理对话数',
      uptime: '运行时间SLA',
      enterprises: '企业客户',
      satisfaction: '客户满意度',
      uptimeValue: '99.9%',
      enterprisesValue: '5000+',
      satisfactionValue: '4.9/5'
    },
    
    // Other Resources Section
    otherResources: {
      title: '其他资源',
      cards: {
        voiceConnectivity: {
          title: 'Voice Connectivity',
          learnMore: '了解详情',
          bookDemo: '预约演示'
        },
        liveChat: {
          title: 'Live Chat',
          learnMore: '了解详情',
          bookDemo: '预约演示'
        }
      }
    },

    
    // 产品反馈面板
    productFeedbackPanel: {
      title: '客户反馈分析面板',
      painPoints: '产品痛点',
      painPointCount: '1,842',
      featureAdoption: '功能采用率',
      adoptionRate: '78%',
      fixCycle: '问题修复周期',
      fixTime: '3.2天',
      monthlyIterations: '月度迭代',
      iterationCount: '12个版本',
      satisfactionIncrease: '满意度提升',
      satisfactionGrowth: '+18%'
    },

    // AI Agents Page
    products: {
      aiAgents: {
        hero: {
          title: 'ZENAVA能够独立承担 80%的重复性、高频次、流程清晰的客户联络任务',
          subtitle: '显著降低了传统客服对人力规模的依赖，实现了客户体验的跨越式升级',
          button: '预约咨询'
        },
        advantages: {
          title: 'ZENAVA的优势',
          card1: {
            title: '能沟通',
            subtitle: '像真人一样交流',
            desc: '具备多模态理解、情绪感知与高拟人化交互能力，带来超越真人的沟通体验'
          },
          card2: {
            title: '能执行',
            subtitle: '独立完成业务闭环',
            desc: '直接驱动业务流程，完成如发送短信、创建工单、查询客户资料以及邀约通知等任务'
          },
          card3: {
            title: '快速上岗',
            subtitle: '越用越聪明',
            desc: '开箱即用，快速部署"上岗"，内置带教流程，遇到问题时自我修正错误，越用越聪明'
          },
          card4: {
            title: '可量化价值',
            subtitle: '让每一分AI投入都清晰可见',
            desc: '价值可量化，实现纯粹、颠覆性的成本结构重构，单位服务成本(CPC)降低约20%'
          }
        },
        features: {
          title: '核心功能',
          subtitle: '',
          voice: {
            title: 'Voice Agents',
            subtitle: '超越真人的语音对话体验',
            list: [
              '拟人化音色：声音富有情绪与表达力，沟通体验超越真人',
              '低延迟交互：快速响应，实时对话无卡顿',
              '精准智能打断：可随时打断和插话，像真人面对面聊天那样自然',
              '完整业务闭环，大幅提升服务效率与客户体验'
            ],
            button: '了解更多Voice Agents功能'
          },
          messaging: {
            title: '打造极致客户服务体验',
            subtitle: '',
            list: [
              '7x24小时全渠道在线，不错失与客户的每一次沟通',
              '支持文字、图片、视频等富媒体沟通，精准识别客户意图',
              '能够从表述中感知客户情绪，以友好、尊重的方式回应',
              '兼顾品牌的业务底线和客户体验，灵活满足客户诉求',
              '具备同理心与判断力，驱动业务全流程闭环'
            ],
            button: '了解更多Live Chat功能'
          }
        },
        resources: {
          title: '资源中心',
          card1: {
            tag: '产品',
            title: '构建持续进化的AI生产力'
          },
          card2: {
            tag: '行业报告',
            title: '构建持续进化的AI生产力'
          },
          card3: {
            tag: '教育',
            title: '构建持续进化的AI生产力'
          },
          card4: {
            tag: '文章',
            title: '构建持续进化的AI生产力'
          }
        },
        cta: {
          title: '开启智能对话新篇章',
          subtitle: '让Zenava AI助力您的企业实现客户对话场景的智能化升级',
          button: '联系我们'
        }
      },
      voiceAgents: {
        banner: {
          imageAlt: 'VoiceAgents产品Banner图 - 超越真人的语音对话体验'
        },
        coreFeatures: {
          title: '核心能力',
          subtitle: '',
          feature1: {
            title: '拟人化音色',
            subtitle: '像真人一样交流',
            description: '语音交互自然流畅、情感丰富，具备多种音色与语气风格，满足用户个性化偏好。能够根据场景表达关怀、理解与专业感，让沟通体验超越真人',
            tags: ['自然流畅', '情感丰富', '多种音色', '个性化'],
            button: '了解更多',
            mediaAlt: '拟人化音色功能演示'
          },
          feature2: {
            title: '低延迟交互',
            subtitle: '实时响应，无需等待',
            description: '毫秒级响应速度，实时对话无卡顿，让交互更自然。无论是客户咨询、业务办理还是投诉处理，Zenava都能快速响应',
            tags: ['毫秒级响应', '实时对话', '无缝跳转', '高效流畅'],
            button: '了解更多',
            mediaAlt: '低延迟交互功能演示'
          },
          feature3: {
            title: '精准智能打断',
            subtitle: '理解用户真实意图',
            description: '支持用户随时打断和插话，实时响应不中断，像真人面对面聊天那样自然灵活',
            tags: ['智能打断', '意图识别', '自然对话', '实时响应'],
            button: '了解更多',
            mediaAlt: '精准智能打断功能演示'
          },
          feature4: {
            title: '完整业务闭环',
            subtitle: '端到端业务自动化',
            description: 'Zenava能直接执行任务，如创建工单、发送通知、查询信息等，让对话真正转化为可落地的业务动作',
            tags: ['任务执行', '业务自动化', '工单创建', '信息查询'],
            button: '了解更多',
            mediaAlt: '完整业务闭环功能演示'
          }
        },
        customerCases: {
          title: '应用与量化效果',
          subtitle: '',
          case1: {
            tag: '厨电行业',
            title: '厨电客户实现大规模客户服务自动化，年节省总成本525万',
            subtitle: '年节省成本525万',
            description: 'Zenava独立处理产品咨询、报修、订单查询等大量重复性咨询，替代35个呼叫中心座席的工作量',
            features: [
              '年度节省成本约525万元',
              '项目ROI高达425%'
            ],
            button: '查看案例详情',
            imageAlt: '厨电客户服务自动化案例'
          },
          case2: {
            tag: '汽车行业',
            title: '汽车客户使用Zenava接管试驾邀约，转化率提升至85%',
            subtitle: '转化率提升至85%',
            description: 'Zenava能够自动清洗客户线索，通过语音交互及时筛选有效客户，邀约高意向客户到店试驾',
            features: [
              '提高潜在客户的跟进效率，提升线索转化率，带动销量增长',
              '邀约转化率提升至85%'
            ],
            button: '查看案例详情',
            imageAlt: '汽车客户试驾邀约案例'
          },
          case3: {
            tag: '酒店行业',
            title: '酒店集团预订全流程无人化，大幅提升预订转化率',
            subtitle: '预订转化率提升15%-25%',
            description: 'Zenava独立完整执行从理解预订需求、确认时间与房型到完成预订的全流程',
            features: [
              '支持多语言沟通，覆盖全球客户',
              '预订转化率提升15%-25%'
            ],
            button: '查看案例详情',
            imageAlt: '酒店集团预订自动化案例'
          }
        }
      },
      liveChat: {
        advantages: {
          title: 'LiveChat的优势',
          card1: {
            title: '实时响应',
            subtitle: '秒级回复客户',
            desc: '7x24小时在线，智能路由分配，确保客户问题得到及时响应和处理'
          },
          card2: {
            title: '多渠道支持',
            subtitle: '统一管理所有渠道',
            desc: '支持网站、移动端、社交媒体等多种渠道，统一管理客户对话，提升服务效率'
          },
          card3: {
            title: '智能分析',
            subtitle: '数据驱动优化',
            desc: '实时分析客户对话数据，识别常见问题，优化服务流程，提升客户满意度'
          }
        },
        features: {},
        caseStudies: {
          title: '应用与量化效果',
          subtitle: '',
          case1: {
            mainTitle: 'B2B企业官网客服无人化接待，留资率高达46%',
            highlight: '留资率高达46%',
            description: 'Zenava在官网独立接待客户，自动进行线索的初步筛选和信息收集',
            points: [
              '全时段覆盖售前接待，实现官网客服无人化值守',
              '留资率高达46%，超过人工留资率40%',
              '产品业务知识分钟级更新，保障服务准确性和专业度'
            ],
            metric: '46%',
            metricLabel: '留资率',
            imageSrc: '/assets/images/livechat/case1-b2b.webp',
            imageAlt: 'B2B企业官网客服无人化接待',
            button: '了解更多',
            buttonLink: '/products/live-chat'
          },
          case2: {
            mainTitle: '智能锁客户实现端到端售后服务自动化，年节省总成本 621 万',
            highlight: '年节省总成本 621万',
            description: 'Zenava通过多轮对话结合图片精准识别，独立完成智能锁故障排查',
            points: [
              '独立接待率达到83%',
              '年节省总成本 621万'
            ],
            metric: '621万',
            metricLabel: '年节省成本',
            metric2: '83%',
            metric2Label: '独立接待率',
            imageSrc: '/assets/images/livechat/case2-smartlock.webp',
            imageAlt: '智能锁客户实现端到端售后服务自动化',
            button: '了解更多',
            buttonLink: '/products/live-chat'
          }
        },
        section3: {
          title: 'AI Agents for Chat',
          subtitle: '',
          item1: {
            mainTitle: '7×24小时全渠道在线',
            subtitle: '不错失与客户的每一次沟通',
            description: 'Zenava可以7×24小时在客户选择的渠道上与他们实时沟通，无论是网页、App、社交媒体还是消息应用，企业无需担心客户等待或错失商机，显著提升客户满意度与留存率',
            tag1: '7×24小时',
            tag2: '全渠道',
            tag3: '实时沟通',
            buttonText: '了解更多',
            imageAlt: '7×24小时全渠道在线',
            imageSrc: '/assets/images/livechat/omnichannel.webp'
          },
          item2: {
            mainTitle: '支持文字、图片、视频等富媒体沟通',
            subtitle: '精准识别客户意图',
            description: 'Zenava不仅能理解文字，还能理解图片、视频等多种形态的信息，提供丰富的对话体验，实现复杂多轮对话信息收集，精准识别客户意图，高效处理客户问题',
            tag1: '富媒体',
            tag2: '意图识别',
            tag3: '多轮对话',
            buttonText: '了解更多',
            imageAlt: '富媒体沟通',
            imageSrc: '/assets/images/livechat/rich-media.webp'
          },
          item3: {
            mainTitle: '能够从表述中感知客户情绪',
            subtitle: '以友好、尊重的方式回应',
            description: 'Zenava通过性格建模具备语言理解与情绪感知能力，能够从表述中识别情绪，并以友好、尊重的方式回应，让客户感受到贴心和专业的服务体验',
            tag1: '情绪识别',
            tag2: '友好回应',
            tag3: '专业服务',
            buttonText: '了解更多',
            imageAlt: '情绪感知',
            imageSrc: '/assets/images/livechat/emotion.webp'
          },
          item4: {
            mainTitle: '兼顾品牌的业务底线和客户体验',
            subtitle: '灵活满足客户诉求',
            description: '在遵守企业业务底线和品牌规范的前提下，Zenava能够灵活满足客户个性化需求，使企业在保证安全与合规的同时提升客户体验',
            tag1: '业务合规',
            tag2: '灵活方案',
            tag3: '客户体验',
            buttonText: '了解更多',
            imageAlt: '兼顾业务和体验',
            imageSrc: '/assets/images/livechat/balance.webp'
          },
          item5: {
            mainTitle: '具备同理心与判断力',
            subtitle: '驱动业务全流程闭环',
            description: 'Zenava具有同理心与判断力，在实际业务场景中，能够像人类员工一样调用工具，完成如发送短信、创建工单、查询客户资料以及邀约通知等任务，实现业务闭环',
            tag1: '同理心',
            tag2: '业务自动化',
            tag3: '流程闭环',
            buttonText: '了解更多',
            imageAlt: '同理心与判断力',
            imageSrc: '/assets/images/livechat/empathy.webp'
          }
        }
      }
    },
    
    // 舆情面板
    sentimentPanel: {
      title: '实时舆情监控',
      negativeAlert: '负面情绪预警',
      alertCount: '3项',
      sensitiveWords: '敏感词检测',
      detectionRate: '99.8%',
      brandSentiment: '品牌好感度',
      sentimentGrowth: '+12%',
      responseTime: '响应时间',
      responseSpeed: '<5分钟',
      crisisSuccess: '危机处理成功率',
      successRate: '98%'
    },
    
    // AI模拟对话
    aiSimulation: {
      aiAssistant: 'Zenava AI',
      status: '在线',
      live: '实时',
      customerQuery: '你好，我的订单 #A12345 想查询一下物流',
      aiProcessing: '正在识别问题...',
      aiLocating: '为您定位订单信息中...',
      aiResponse: '已找到订单，包裹已出库，预计 24 小时内送达。需要我发送追踪链接吗？',
      customerReply: '好的，谢谢！请发我追踪链接 👍',
      inputPlaceholder: '输入您的消息...',
      responseTime: '响应时间',
      responseValue: '< 1.8s',
      satisfaction: '满意度',
      satisfactionValue: '98.7%'
    },
    
    // 销售流程
    salesProcess: {
      title: '销售赋能流程',
      step1: {
        title: '实时话术推荐',
        description: '根据客户关注点推荐最佳话术',
        value: '实时'
      },
      step2: {
        title: '知识库调用',
        description: '产品、竞品、案例即时调取',
        value: '秒级'
      },
      step3: {
        title: '智能成交辅助',
        description: '成交率提升45%',
        value: '+45%'
      }
    },
    
    // 平台性能
    platformPerformance: {
      title: '平台性能',
      subtitle: '获得全球5000家企业的信赖，为关键客户互动提供可靠服务',
      uptime: '运行时间SLA',
      enterprisesServed: '企业客户',
      satisfaction: '客户满意度'
    },
    
    // 智能工单流程
    ticketProcess: {
      title: '智能工单处理流程',
      step1: {
        title: 'AI定位问题',
        description: '智能分析客户问题类型和紧急程度'
      },
      step2: {
        title: '知识库调用',
        description: '历史解决方案和最佳实践'
      },
      step3: {
        title: '智能路由',
        description: '自动分配给合适的服务人员'
      },
      step4: {
        title: '跟踪解决',
        description: '实时状态更新和满意度追踪'
      }
    },
    
    // 内部运营指标
    operationsMetrics: {
      title: '运营效率提升',
      storeAccess: '门店接入',
      storeCount: '500+',
      dailyProcessing: '日均处理',
      dailyVolume: '10K+',
      avgResponse: '平均响应',
      responseTime: '2小时',
      dispatchEfficiency: '派单效率',
      efficiencyRate: '85%'
    },

    // Banner 轮播翻译
    banners: {
      slide1: {
        siteName: 'ZENAVA',
        mainTitle: '企业级AI对话解决方案',
        description: '通过智能AI助手转变您的客户服务，提升客户体验，降低运营成本',
        buttonText: '预约咨询',
        imageAlt: '横幅图片1'
      },
      slide2: {
        siteName: 'ZENAVA Sales',
        mainTitle: '智能销售赋能系统',
        description: 'AI驱动的销售智能化平台，精准客户画像分析，智能推荐销售策略，提升成单率缩短销售周期',
        buttonText: '了解销售方案',
        imageAlt: '智能销售系统界面'
      },
      slide3: {
        siteName: '智能AI平台',
        mainTitle: '4345323',
        description: '43244444444',
        buttonText: '预约咨询',
        imageAlt: '智能AI平台展示'
      },
      slide4: {
        siteName: 'ZENAVA',
        mainTitle: '7x24智能客服',
        description: 'AI智能客服系统实现全天候服务，自动处理常见问题，情感识别提升体验',
        buttonText: '查看详情',
        imageAlt: '智能客服'
      },
      slide5: {
        siteName: '',
        mainTitle: '',
        description: '',
        buttonText: '',
        imageAlt: '营销活动Banner图'
      },
      slide6: {
        siteName: '',
        mainTitle: '',
        description: '',
        buttonText: '',
        imageAlt: '营销活动Banner图'
      }
    }
  }
}

export type Language = 'zh' | 'en' | 'jp' | 'hk'

export function getTranslations(language: Language) {
  return siteTranslations[language] || siteTranslations.zh
}

// Helper to get nested translation
export function t(language: Language, key: string): string {
  const translations = getTranslations(language)
  return key.split('.').reduce((obj, k) => obj?.[k], translations as any) || key
}