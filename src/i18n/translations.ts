import type { Lang } from "./context";

const translations = {
  // Navbar
  "nav.services": { zh: "服務", en: "Services" },
  "nav.process": { zh: "流程", en: "Process" },
  "nav.cases": { zh: "案例", en: "Cases" },
  "nav.about": { zh: "關於", en: "About" },
  "nav.cta": { zh: "免費 AI 搜尋能見度審計", en: "Free AI Search Visibility Audit" },

  // Hero
  "hero.label": { zh: "AEO Agency", en: "AEO Agency" },
  "hero.headline": {
    zh: "令你嘅品牌喺 ChatGPT、Perplexity 同 Google AI 被搵到",
    en: "Get Your Brand Found on ChatGPT, Perplexity & Google AI",
  },
  "hero.subtitle": {
    zh: "我哋幫企業喺 AI 搜尋引擎建立能見度——30 日內出現喺 ChatGPT、Google AI Overview、Perplexity 同語音助手嘅推薦結果入面。",
    en: "We help businesses build visibility on AI search engines — appear in ChatGPT, Google AI Overview, Perplexity & voice assistant recommendations within 30 days.",
  },
  "hero.processBtn": { zh: "了解我哋嘅流程", en: "Learn Our Process" },
  "hero.ctaBtn": { zh: "免費 AI 搜尋能見度審計", en: "Free AI Search Visibility Audit" },
  "hero.backed": {
    zh: "受頂尖學術機構同創科計劃支持",
    en: "Backed by top academic institutions & innovation programmes",
  },

  // ProblemSection
  "problem.headline": {
    zh: "你嘅自然搜尋流量喺 AI 時代係咪跌緊？",
    en: "Is Your Organic Traffic Declining in the AI Era?",
  },
  "problem.bullets": {
    zh: [
      "自然搜尋流量不斷縮水，而且喺 AI 結果入面搵唔到你嘅品牌",
      "唔確定要點樣做先可以喺 LLM 入面出現，同 SEO 有咩唔同",
      "唔知點量度你嘅 LLM 表現，或者應該專注邊方面",
      "唔清楚點樣組織內容，令 AI 助手揀你而唔係競爭對手",
    ],
    en: [
      "Organic search traffic keeps shrinking, and your brand is invisible in AI results",
      "Unsure how to appear in LLMs and how it differs from SEO",
      "Don't know how to measure your LLM performance or where to focus",
      "Unclear how to structure content so AI assistants choose you over competitors",
    ],
  },
  "problem.body": {
    zh: "AI 搜尋唔係將來嘅事，已經嚟咗。我哋可以幫你做好 AEO 準備，免得你落後於人。",
    en: "AI search isn't the future — it's already here. We can help you get AEO-ready before you fall behind.",
  },
  "problem.keysTitle": { zh: "贏取 LLM 推薦嘅 3 大關鍵", en: "3 Keys to Winning LLM Recommendations" },
  "problem.keys": {
    zh: ["專業 AEO 團隊", "AEO 實戰手冊", "規劃同執行"],
    en: ["Expert AEO Team", "Proven AEO Playbook", "Planning & Execution"],
  },
  "problem.teamAlt": { zh: "團隊合作", en: "Team collaboration" },

  // Experts
  "experts.headline": { zh: "AEO 領域嘅領先專家", en: "Leading Experts in AEO" },
  "experts.p1": {
    zh: "跳過學習曲線，即刻啟動一支專注 AEO 嘅團隊，幫你喺 AI 搜尋引擎快速獲得能見度。",
    en: "Skip the learning curve — instantly activate a team focused on AEO to help you gain visibility on AI search engines fast.",
  },
  "experts.p2": {
    zh: "當競爭對手花 6-12 個月摸索 AI 搜尋嘅時候，我哋嘅客戶已經開始出現喺 ChatGPT 同 Google AI Overview。",
    en: "While competitors spend 6-12 months figuring out AI search, our clients are already appearing in ChatGPT and Google AI Overview.",
  },
  "experts.p3": {
    zh: "經過唔同品牌同行業驗證，我哋嘅方法論已經成熟。你可以即刻使用花咗幾年完善嘅策略。",
    en: "Validated across different brands and industries, our methodology is mature. You can immediately use strategies refined over years.",
  },
  "experts.p4": {
    zh: "無學習成本、無浪費預算——只有喺潛在客戶真正搜尋嘅地方快速獲得能見度。",
    en: "No learning costs, no wasted budget — just fast visibility where potential customers actually search.",
  },
  "experts.meetTeam": { zh: "認識我哋嘅團隊", en: "Meet Our Team" },
  "experts.testimonial": {
    zh: "SurfIO 團隊係我哋市場推廣團隊嘅重要延伸，透過精準執行嘅數碼營銷活動帶來顯著增長，提供我哋達成增長目標所需嘅專業支援。",
    en: "The SurfIO team is a vital extension of our marketing team, delivering significant growth through precisely executed digital marketing campaigns, providing the expert support we need to hit our growth targets.",
  },
  "experts.teamAlt": { zh: "AEO 專家團隊", en: "AEO Expert Team" },

  // Playbook
  "playbook.headline": { zh: "經驗證嘅 AEO 實戰手冊", en: "Proven AEO Playbook" },
  "playbook.intro": {
    zh: "我哋已經喺每個主要 AI 平台做過 AEO 實驗，精確搵出 ChatGPT、Google AI Overview 同 Claude 推薦你公司而唔係競爭對手嘅原因。",
    en: "We've run AEO experiments on every major AI platform, precisely identifying what makes ChatGPT, Google AI Overview, and Claude recommend your company over competitors.",
  },
  "playbook.includes": { zh: "我哋嘅實戰手冊包括：", en: "Our playbook includes:" },
  "playbook.items": {
    zh: [
      ["AI 內容藍圖", "逐步格式化方法，令 AI 引擎揀你嘅內容嘅機率提高 73%。唔洗再寫啲石沉大海嘅文章。"],
      ["AI 搜尋 Schema 架構", "觸發 AI 結果置頂推薦嘅結構化數據組合。我哋已經搵到每個主要平台嘅有效方法。"],
      ["問題挖掘系統", "點樣搵到你嘅潛在客戶問 AI 嘅具體問題——然後成為每個問題嘅權威答案。"],
      ["BrandBrain 品牌知識庫", "我哋為你嘅公司建立全面嘅知識庫，令 AI 系統可以輕鬆引用同推薦畀潛在客戶。"],
      ["平台專屬優化", "ChatGPT 同 Google AI 同 Claude 同語音搜尋嘅策略各有唔同。每個平台嘅觸發機制唔同——我哋全部都熟。"],
    ],
    en: [
      ["AI Content Blueprint", "Step-by-step formatting approach that increases the probability of AI engines selecting your content by 73%. No more writing articles that go nowhere."],
      ["AI Search Schema Architecture", "Structured data combinations that trigger top AI result recommendations. We've found what works for every major platform."],
      ["Question Mining System", "How to find the specific questions your potential customers ask AI — then become the authoritative answer for each one."],
      ["BrandBrain Knowledge Base", "We build a comprehensive knowledge base for your company, making it easy for AI systems to cite and recommend you to potential customers."],
      ["Platform-Specific Optimization", "Strategies for ChatGPT, Google AI, Claude, and voice search each differ. Each platform has different triggers — we know them all."],
    ],
  },
  "playbook.resultLabel": { zh: "結果？", en: "The result?" },
  "playbook.result": {
    zh: "你嘅客戶經理從第一日起就應用 3 年以上久經考驗嘅策略。唔會拿你嘅預算做實驗。唔會「試下先睇下點」。",
    en: "Your account manager applies 3+ years of battle-tested strategies from day one. No experimenting with your budget. No \"let's try and see.\"",
  },
  "playbook.closing": {
    zh: "你可以即刻使用有效嘅策略，度身訂造適合你嘅市場同方案。",
    en: "You get immediate access to proven strategies, customized for your market and goals.",
  },
  "playbook.reportTitle": { zh: "能見度報告", en: "Visibility Report" },
  "playbook.reportHeading": { zh: "LLM 可讀性 & AEO 優化報告", en: "LLM Readability & AEO Optimization Report" },
  "playbook.reportSummary": { zh: "摘要", en: "Summary" },
  "playbook.reportPriority": { zh: "優先修復項目", en: "Priority Fixes" },
  "playbook.dashboardAlt": { zh: "數據分析儀表板", en: "Data Analytics Dashboard" },

  // Planning
  "planning.headline": { zh: "AEO & SEO 規劃 + 執行", en: "AEO & SEO Planning + Execution" },
  "planning.p1": {
    zh: "由研究同策略開始，當你確認方案後，我哋會將 AEO 實施一路做到底。",
    en: "Starting with research and strategy, once you confirm the plan, we'll implement AEO all the way through.",
  },
  "planning.p2": {
    zh: "涵蓋 AEO 策略、網站開發、內容撰寫同 PR 級連結建設嘅全方位能力。",
    en: "Full-stack capabilities covering AEO strategy, web development, content writing, and PR-grade link building.",
  },
  "planning.p3": {
    zh: "目標只有一個：令你嘅網站內容變成 LLM 嘅推薦素材。",
    en: "One goal: make your website content the go-to recommendation material for LLMs.",
  },
  "planning.link": { zh: "睇下我哋點樣做 →", en: "See how we do it →" },
  // Planning Venn diagram
  "planning.seo.items": {
    zh: ["關鍵字優化", "內容質素、深度同\n專業度 (E-E-A-T)", "可索引性同\n語意內容結構", "核心網頁指標", "排名追蹤同\nCTR 優化", "反向連結、引用\n同品牌提及", "分析同能見度追蹤"],
    en: ["Keyword Optimization", "Content Quality, Depth\n& Expertise (E-E-A-T)", "Indexability &\nSemantic Structure", "Core Web Vitals", "Rank Tracking &\nCTR Optimization", "Backlinks, Citations\n& Brand Mentions", "Analytics & Visibility Tracking"],
  },
  "planning.aeo.items": {
    zh: ["可引用性同渲染", "監測 LLM 能見度\n同引用佔比", "提示詞優化", "對話式同\n精選摘要格式", "實體優先結構", "LLM 元數據", "跨 LLM 表現指標", "AI 爬蟲技術準備", "延伸查詢分析"],
    en: ["Citability & Rendering", "LLM Visibility &\nCitation Share Monitoring", "Prompt Optimization", "Conversational &\nFeatured Snippet Format", "Entity-First Structure", "LLM Metadata", "Cross-LLM Performance Metrics", "AI Crawler Readiness", "Follow-Up Query Analysis"],
  },

  // Services
  "services.headline": { zh: "A-Z 答案引擎優化", en: "A-Z Answer Engine Optimization" },
  "services.columns": {
    zh: [
      {
        title: "策略：",
        items: [
          "AEO 準備度審計同增長路線圖",
          "多平台答案引擎定位 (Google、Bing、Perplexity、ChatGPT 等)",
          "實體同主題權威性映射",
          "AI 答案收錄嘅內容中心同支柱策略",
          "高權威引用同連結獲取 (用於 LLM 訓練數據)",
          "基於問題嘅關鍵字擴展同優化",
        ],
      },
      {
        title: "執行：",
        items: [
          "直接答案同精選摘要優化",
          "FAQ schema、HowTo 同 Q&A 標記部署",
          "基於實體嘅內部連結同知識圖譜建設",
          "進階 schema 同結構化數據增強",
          "答案引擎友好嘅內容格式同索引優化",
        ],
      },
      {
        title: "監測：",
        items: [
          "跨主要 LLM 嘅答案出現追蹤",
          "精選摘要同「其他人也問」位置監測",
          "競爭對手 AEO 表現基準比較",
          "每月報告同改善建議",
        ],
      },
    ],
    en: [
      {
        title: "Strategy:",
        items: [
          "AEO readiness audit & growth roadmap",
          "Multi-platform answer engine positioning (Google, Bing, Perplexity, ChatGPT, etc.)",
          "Entity & topical authority mapping",
          "Content hub & pillar strategy for AI answer inclusion",
          "High-authority citation & link acquisition (for LLM training data)",
          "Question-based keyword expansion & optimization",
        ],
      },
      {
        title: "Execution:",
        items: [
          "Direct answer & featured snippet optimization",
          "FAQ schema, HowTo & Q&A markup deployment",
          "Entity-based internal linking & knowledge graph building",
          "Advanced schema & structured data enhancement",
          "Answer engine-friendly content format & indexing optimization",
        ],
      },
      {
        title: "Monitoring:",
        items: [
          "Answer appearance tracking across major LLMs",
          "Featured snippet & People Also Ask position monitoring",
          "Competitor AEO performance benchmarking",
          "Monthly reporting & improvement recommendations",
        ],
      },
    ],
  },

  // CaseStudies
  "cases.headline": { zh: "創辦人實戰經驗", en: "Founder's Track Record" },
  "cases.subtitle": {
    zh: "SurfIO 嘅方法論源自創辦人喺產品開發、自然增長同學術研究嘅真實經驗。",
    en: "SurfIO's methodology stems from the founder's real-world experience in product development, organic growth, and academic research.",
  },
  "cases.items": {
    zh: [
      {
        project: "GymsLock",
        tagline: "健身社交應用程式\n自然增長至 5,000+ 用戶",
        label: "產品開發",
        stats: [
          { value: "5,000+", label: "累計\n用戶" },
          { value: "3M+", label: "自然\n曝光" },
          { value: "0", label: "付費\n廣告支出" },
        ],
      },
      {
        project: "HKSTP Ideation",
        tagline: "兩次獲選香港科技園\nIdeation Programme",
        label: "創業支持",
        stats: [
          { value: "2x", label: "HKSTP\n獲選" },
          { value: "1x", label: "Techathon+\n得獎" },
          { value: "HK$", label: "創科\n資助" },
        ],
      },
      {
        project: "教育同分享",
        tagline: "喺香港理工大學同科技大學\n教授 AI 同數碼營銷",
        label: "學術經驗",
        stats: [
          { value: "400+", label: "教授\n學生" },
          { value: "PolyU", label: "香港\n理工大學" },
          { value: "HKUST", label: "香港\n科技大學" },
        ],
      },
    ],
    en: [
      {
        project: "GymsLock",
        tagline: "Fitness social app\nOrganically grown to 5,000+ users",
        label: "Product Dev",
        stats: [
          { value: "5,000+", label: "Total\nUsers" },
          { value: "3M+", label: "Organic\nImpressions" },
          { value: "0", label: "Paid\nAd Spend" },
        ],
      },
      {
        project: "HKSTP Ideation",
        tagline: "Twice selected for HKSTP\nIdeation Programme",
        label: "Startup Support",
        stats: [
          { value: "2x", label: "HKSTP\nSelected" },
          { value: "1x", label: "Techathon+\nWinner" },
          { value: "HK$", label: "Innovation\nFunding" },
        ],
      },
      {
        project: "Education & Sharing",
        tagline: "Teaching AI & digital marketing\nat HK PolyU and HKUST",
        label: "Academic",
        stats: [
          { value: "400+", label: "Students\nTaught" },
          { value: "PolyU", label: "HK\nPolyU" },
          { value: "HKUST", label: "HK\nUST" },
        ],
      },
    ],
  },

  // Founder
  "founder.label": { zh: "創辦人", en: "Founder" },
  "founder.bio1": {
    zh: "專注於 AI 搜尋優化（AEO）同生成式引擎優化（GEO），Acesley 將多年嘅產品開發、自然增長同學術研究經驗融入每一個客戶項目。",
    en: "Focused on AI Search Optimization (AEO) and Generative Engine Optimization (GEO), Acesley brings years of product development, organic growth, and academic research experience to every client project.",
  },
  "founder.bio2": {
    zh: "佢相信最好嘅 AEO 策略唔係靠猜測，而係靠數據同實驗。每一套方法都經過真實市場驗證，再應用喺客戶身上。",
    en: "He believes the best AEO strategies aren't based on guesswork, but on data and experimentation. Every method is validated in real markets before being applied to clients.",
  },
  "founder.bio3": {
    zh: "呢套系統化方法就係 SurfIO 嘅核心——幫企業喺 AI 搜尋時代被搵到。",
    en: "This systematic approach is the core of SurfIO — helping businesses get found in the AI search era.",
  },
  "founder.credentials": {
    zh: [
      { value: "2x", label: "HKSTP 獲選" },
      { value: "5,000+", label: "產品用戶" },
      { value: "400+", label: "教授學生" },
    ],
    en: [
      { value: "2x", label: "HKSTP Selected" },
      { value: "5,000+", label: "Product Users" },
      { value: "400+", label: "Students Taught" },
    ],
  },

  // SimpleSteps
  "steps.headline": { zh: "我哋令 AEO 變得簡單", en: "We Make AEO Simple" },
  "steps.items": {
    zh: [
      { step: "第一步：", title: "預約免費審計", desc: "同我哋嘅策略師會面，評估你嘅 AI 搜尋能見度，制定度身增長計劃。" },
      { step: "第二步：", title: "規劃同啟動", desc: "我哋會制定詳細策略，啟動經驗證嘅 AEO 同 GEO 計劃。" },
      { step: "第三步：", title: "持續改善效果", desc: "運用數據驅動方法，持續改善你嘅營銷活動效果。" },
    ],
    en: [
      { step: "Step 1:", title: "Book a Free Audit", desc: "Meet with our strategist to assess your AI search visibility and create a tailored growth plan." },
      { step: "Step 2:", title: "Plan & Launch", desc: "We create a detailed strategy and launch a proven AEO and GEO plan." },
      { step: "Step 3:", title: "Continuous Improvement", desc: "Using data-driven methods, we continuously improve your campaign performance." },
    ],
  },

  // Comparison
  "comparison.headline": { zh: "我哋同其他 AEO/SEO 公司有咩唔同？", en: "How Are We Different from Other AEO/SEO Agencies?" },
  "comparison.sub1": { zh: "我哋唔係一般嘅 agency。", en: "We're not your typical agency." },
  "comparison.sub2": { zh: "所以我哋嘅客戶唔會得到一般嘅結果。", en: "That's why our clients don't get typical results." },
  "comparison.otherLabel": { zh: "其他 AEO/SEO 公司", en: "Other AEO/SEO Agencies" },
  "comparison.rows": {
    zh: [
      ["全方位 AEO + 轉化漏斗", "基本賬戶管理"],
      ["品牌化文案 + 豐富視覺", "基本文案寫作"],
      ["科技行業專家", "通才"],
      ["策略性、易接觸嘅團隊", "唔穩定、難聯繫嘅團隊"],
      ["簡單透明定價", "見面先講價"],
      ["滿意保證", "無保障"],
      ["先進 AI 工作流程", "AI 廢話或者完全唔識 AI"],
    ],
    en: [
      ["Full-funnel AEO + conversion optimization", "Basic account management"],
      ["Branded copy + rich visuals", "Basic copywriting"],
      ["Tech industry specialists", "Generalists"],
      ["Strategic, accessible team", "Unstable, hard-to-reach team"],
      ["Simple, transparent pricing", "Pricing only revealed in meetings"],
      ["Satisfaction guarantee", "No guarantees"],
      ["Advanced AI workflows", "AI buzzwords or zero AI knowledge"],
    ],
  },

  // OurProcess
  "process.headline": { zh: "睇下我哋嘅流程", en: "See Our Process" },
  "process.subtitle": {
    zh: "從研究到建設同優化。我哋傾盡心力打造排名前 1% 嘅效果型營銷活動。一齊睇下我哋點樣做。",
    en: "From research to building and optimization. We pour everything into creating top 1% performance marketing campaigns. Here's how we do it.",
  },
  "process.steps": {
    zh: [
      { title: "深度研究同策略", desc: "透過詳細問卷、競爭對手分析同歷史表現數據，為你制定針對性嘅 AEO 策略。BrandBrain 系統會微調每個活動，突顯你品牌嘅獨特價值。" },
      { title: "SEO + AI 優化內容", desc: "每篇內容都同時針對搜尋引擎排名同 AI 答案引用。以問題為焦點嘅文章，配合結構化格式同優化標題，令內容準備好被 AI 引擎納入回應。" },
      { title: "技術 AEO", desc: "為你嘅網站添加 Schema 標記、撰寫 FAQ 同優化精選摘要格式。實施結構化數據增強同內部連結策略，加強你喺知識圖譜中嘅實體識別度。" },
      { title: "連結建設", desc: "採用白帽連結建設策略提升你網站嘅權威性。包括客座發文、失效連結建設同數碼 PR，專注於來自高域名權威網站嘅連結。" },
    ],
    en: [
      { title: "Deep Research & Strategy", desc: "Through detailed questionnaires, competitor analysis, and historical performance data, we create a targeted AEO strategy. The BrandBrain system fine-tunes every campaign to highlight your brand's unique value." },
      { title: "SEO + AI Optimized Content", desc: "Every piece of content targets both search engine rankings and AI answer citations. Question-focused articles with structured formats and optimized headings, making content ready for AI engine inclusion." },
      { title: "Technical AEO", desc: "Adding Schema markup, writing FAQs, and optimizing featured snippet formats for your website. Implementing structured data enhancement and internal linking strategies to strengthen entity recognition in knowledge graphs." },
      { title: "Link Building", desc: "White-hat link building strategies to boost your site's authority. Including guest posts, broken link building, and digital PR, focusing on links from high domain authority websites." },
    ],
  },
  "process.tracking.title": { zh: "追蹤同分析", en: "Tracking & Analysis" },
  "process.tracking.desc": {
    zh: "持續監測你喺搜尋引擎同 AI 平台嘅能見度，追蹤關鍵字排名、精選摘要同 AI 答案位置。分析結果用於持續優化策略，確保你喺 AI 搜尋中保持領先。",
    en: "Continuously monitoring your visibility on search engines and AI platforms, tracking keyword rankings, featured snippets, and AI answer positions. Analysis results are used to continuously optimize strategy, keeping you ahead in AI search.",
  },
  "process.tracking.alt": { zh: "Google Search Console 數據分析", en: "Google Search Console Analytics" },
  "process.cta.headline": { zh: "一齊打造你嘅 AEO 增長計劃", en: "Let's Build Your AEO Growth Plan" },
  "process.cta.subtitle": {
    zh: "了解你嘅品牌喺 ChatGPT、Perplexity 同 Google AI 嘅表現。預約免費審計，獲取度身改善方案。",
    en: "Understand your brand's performance on ChatGPT, Perplexity & Google AI. Book a free audit and get a tailored improvement plan.",
  },

  // FAQ
  "faq.headline": { zh: "AEO 常見問題", en: "AEO FAQ" },
  "faq.items": {
    zh: [
      ["咩係答案引擎優化 (AEO)？", "答案引擎優化係優化你嘅內容嘅過程，令搜尋引擎同 AI 平台（例如 Google、Bing、ChatGPT 同 Perplexity）揀你嘅內容作為用戶問題嘅權威答案。"],
      ["AEO 同 SEO 有咩分別？", "SEO 專注於喺傳統搜尋結果排名，而 AEO 專門針對 AI 驅動嘅答案引擎同精選摘要。AEO 優化嘅係 AI 系統點樣理解、引用同推薦你嘅內容。"],
      ["點解 AEO 而家咁重要？", "AI 搜尋正迅速取代傳統搜尋。越來越多用戶直接從 ChatGPT、Google AI Overview 同 Perplexity 獲取答案，而唔係點擊去網站。如果你未針對呢啲平台優化，對於越來越多嘅受眾嚟講你就係隱形嘅。"],
      ["AEO 針對邊啲平台？", "我哋為所有主要 AI 平台優化，包括 ChatGPT、Google AI Overview、Perplexity、Claude、Bing Chat、同語音助手如 Siri 同 Alexa。"],
      ["你哋嘅 AEO 服務包啲咩？", "我哋嘅服務包括 AEO 審計、內容優化、Schema 標記、實體建設、平台專屬優化、連結建設、同持續監測同報告。"],
      ["幾耐先見到效果？", "大部分客戶喺 30-60 日內開始見到 AI 能見度嘅改善。完整效果通常喺 90 日內呈現，取決於你嘅行業同競爭程度。"],
      ["AEO 同 GEO 有咩分別？", "AEO（答案引擎優化）專注於出現喺 AI 生成嘅答案中。GEO（生成引擎優化）係一個更廣泛嘅術語，涵蓋為所有生成式 AI 系統優化。我哋兩者都做。"],
    ],
    en: [
      ["What is Answer Engine Optimization (AEO)?", "Answer Engine Optimization is the process of optimizing your content so that search engines and AI platforms (like Google, Bing, ChatGPT, and Perplexity) select your content as the authoritative answer to user questions."],
      ["How is AEO different from SEO?", "SEO focuses on ranking in traditional search results, while AEO specifically targets AI-driven answer engines and featured snippets. AEO optimizes how AI systems understand, cite, and recommend your content."],
      ["Why is AEO so important now?", "AI search is rapidly replacing traditional search. More users are getting answers directly from ChatGPT, Google AI Overview, and Perplexity instead of clicking through to websites. If you haven't optimized for these platforms, you're invisible to a growing audience."],
      ["Which platforms does AEO target?", "We optimize for all major AI platforms including ChatGPT, Google AI Overview, Perplexity, Claude, Bing Chat, and voice assistants like Siri and Alexa."],
      ["What's included in your AEO services?", "Our services include AEO audit, content optimization, Schema markup, entity building, platform-specific optimization, link building, and ongoing monitoring and reporting."],
      ["How long until I see results?", "Most clients start seeing improvements in AI visibility within 30-60 days. Full results typically materialize within 90 days, depending on your industry and competitive landscape."],
      ["What's the difference between AEO and GEO?", "AEO (Answer Engine Optimization) focuses on appearing in AI-generated answers. GEO (Generative Engine Optimization) is a broader term covering optimization for all generative AI systems. We do both."],
    ],
  },

  // Footer
  "footer.contact": { zh: "聯絡", en: "Contact" },
  "footer.contactUs": { zh: "聯絡我哋", en: "Contact Us" },
  "footer.hksp": { zh: "香港科學園", en: "HK Science Park" },
  "footer.industries": { zh: "行業", en: "Industries" },
  "footer.industryNames": {
    zh: ["金融服務", "會計師事務所", "B2B 軟件", "法律服務", "醫療服務", "電商", "教育科技", "初創企業"],
    en: ["Financial Services", "Accounting Firms", "B2B Software", "Legal Services", "Healthcare", "E-commerce", "EdTech", "Startups"],
  },
  "footer.strategies": { zh: "策略", en: "Strategies" },
  "footer.strategyItems": {
    zh: ["B2B 數碼營銷", "電商營銷", "效果營銷", "客戶獲取", "潛在客戶開發", "需求生成", "集客式營銷", "增長營銷"],
    en: ["B2B Digital Marketing", "E-commerce Marketing", "Performance Marketing", "Customer Acquisition", "Lead Generation", "Demand Generation", "Inbound Marketing", "Growth Marketing"],
  },
  "footer.resources": { zh: "資源", en: "Resources" },
  "footer.aeoGuide": { zh: "AEO 入門指南", en: "AEO Beginner's Guide" },
  "footer.glossary": { zh: "術語表", en: "Glossary" },
  "footer.sitemap": { zh: "網站地圖", en: "Sitemap" },
  "footer.caseStudies": { zh: "案例分析", en: "Case Studies" },
  "footer.supporters": { zh: "支持機構", en: "Supporters" },
  "footer.copyright": { zh: "版權所有。", en: "All rights reserved." },
  "footer.privacy": { zh: "私隱政策", en: "Privacy Policy" },
  "footer.terms": { zh: "條款及細則", en: "Terms & Conditions" },
  "footer.hkstpBadge": { zh: "HKSTP\n培育", en: "HKSTP\nIncub." },

  // IndustryPage
  "industry.cta": { zh: "免費 AI 搜尋能見度審計", en: "Free AI Search Visibility Audit" },
  "industry.breadcrumbHome": { zh: "首頁", en: "Home" },
  "industry.breadcrumbIndustry": { zh: "行業", en: "Industries" },
  "industry.challengesTitle": {
    zh: (name: string) => `${name}喺 AI 搜尋時代面對嘅挑戰`,
    en: (name: string) => `Challenges ${name} Faces in the AI Search Era`,
  },
  "industry.solutionsTitle": {
    zh: (name: string) => `SurfIO 嘅${name} AEO 方案`,
    en: (name: string) => `SurfIO's ${name} AEO Solution`,
  },
  "industry.faqTitle": {
    zh: (name: string) => `${name} AEO 常見問題`,
    en: (name: string) => `${name} AEO FAQ`,
  },
  "industry.readyTitle": {
    zh: (name: string) => `準備好提升你嘅${name} AI 搜尋能見度？`,
    en: (name: string) => `Ready to Boost Your ${name} AI Search Visibility?`,
  },
  "industry.readySubtitle": {
    zh: (name: string) => `預約免費 AEO 審計，了解你嘅${name}喺 AI 搜尋中嘅表現同改善機會。`,
    en: (name: string) => `Book a free AEO audit to understand your ${name}'s performance and improvement opportunities in AI search.`,
  },
  "industry.otherIndustries": { zh: "其他行業 AEO 方案", en: "Other Industry AEO Solutions" },
  "industry.notFoundTitle": { zh: "搵唔到呢個頁面", en: "Page Not Found" },
  "industry.notFoundDesc": { zh: "呢個行業頁面唔存在。", en: "This industry page doesn't exist." },
  "industry.backHome": { zh: "返回首頁", en: "Back to Home" },

  // PlatformPage
  "platform.cta": { zh: "免費 AI 搜尋能見度審計", en: "Free AI Search Visibility Audit" },
  "platform.breadcrumbHome": { zh: "首頁", en: "Home" },
  "platform.breadcrumbPlatform": { zh: "平台", en: "Platforms" },
  "platform.optimization": { zh: "優化", en: "Optimization" },
  "platform.howItWorks": {
    zh: (name: string) => `${name} 點樣運作`,
    en: (name: string) => `How ${name} Works`,
  },
  "platform.rankingFactors": {
    zh: (name: string) => `${name} 推薦排名因素`,
    en: (name: string) => `${name} Recommendation Ranking Factors`,
  },
  "platform.ourStrategy": {
    zh: (name: string) => `我哋嘅 ${name} 優化策略`,
    en: (name: string) => `Our ${name} Optimization Strategy`,
  },
  "platform.faqTitle": {
    zh: (name: string) => `${name} 優化常見問題`,
    en: (name: string) => `${name} Optimization FAQ`,
  },
  "platform.readyTitle": {
    zh: (name: string) => `準備好喺 ${name} 被推薦？`,
    en: (name: string) => `Ready to Get Recommended on ${name}?`,
  },
  "platform.readySubtitle": {
    zh: (name: string) => `預約免費審計，了解你嘅品牌喺 ${name} 嘅表現同改善機會。`,
    en: (name: string) => `Book a free audit to understand your brand's performance and improvement opportunities on ${name}.`,
  },
  "platform.otherPlatforms": { zh: "其他平台優化", en: "Other Platform Optimizations" },
  "platform.notFoundTitle": { zh: "搵唔到呢個頁面", en: "Page Not Found" },
  "platform.backHome": { zh: "返回首頁", en: "Back to Home" },

  // GlossaryPage
  "glossary.label": { zh: "AEO 術語表", en: "AEO Glossary" },
  "glossary.breadcrumbHome": { zh: "首頁", en: "Home" },
  "glossary.breadcrumbGlossary": { zh: "術語表", en: "Glossary" },
  "glossary.relatedTerms": { zh: "相關術語", en: "Related Terms" },
  "glossary.ctaHeadline": { zh: "想了解更多 AEO 策略？", en: "Want to Learn More About AEO Strategies?" },
  "glossary.ctaSubtitle": {
    zh: "免費 AI 搜尋能見度審計，了解你嘅品牌喺 AI 搜尋中嘅表現。",
    en: "Free AI search visibility audit to understand your brand's performance in AI search.",
  },
  "glossary.allTerms": { zh: "所有 AEO 術語", en: "All AEO Terms" },
  "glossary.indexTitle": { zh: "AI 搜尋優化術語表", en: "AI Search Optimization Glossary" },
  "glossary.indexSubtitle": {
    zh: "了解 AEO、GEO 同 AI 搜尋優化嘅核心概念。呢個術語表涵蓋所有你需要知道嘅 AI 搜尋術語。",
    en: "Understand the core concepts of AEO, GEO, and AI search optimization. This glossary covers all the AI search terms you need to know.",
  },
  "glossary.indexMetaTitle": {
    zh: "AEO 術語表 | AI 搜尋優化完整詞彙 - SurfIO",
    en: "AEO Glossary | Complete AI Search Optimization Vocabulary - SurfIO",
  },
  "glossary.indexMetaDesc": {
    zh: "SurfIO AEO 術語表：AI 搜尋優化、答案引擎優化、LLM、Schema Markup 等核心概念完整解釋。",
    en: "SurfIO AEO Glossary: Complete explanations of AI search optimization, answer engine optimization, LLM, Schema Markup, and other core concepts.",
  },

  // HomePage
  "home.title": {
    zh: "SurfIO — AEO Agency | 令 AI 搜尋主動推薦你",
    en: "SurfIO — AEO Agency | Get AI Search to Recommend You",
  },
  "home.description": {
    zh: "SurfIO 係香港領先嘅 AEO Agency，幫企業喺 ChatGPT、Perplexity、Google AI Overview 被推薦。HKSTP 培育、Techathon+ 支持。30 日內出現喺 AI 搜尋結果。",
    en: "SurfIO is Hong Kong's leading AEO Agency, helping businesses get recommended on ChatGPT, Perplexity, and Google AI Overview. HKSTP incubated, Techathon+ supported. Appear in AI search results within 30 days.",
  },
  "home.ogTitle": {
    zh: "SurfIO — AEO Agency | 令 AI 搜尋主動推薦你",
    en: "SurfIO — AEO Agency | Get AI Search to Recommend You",
  },
  "home.ogDescription": {
    zh: "SurfIO 係香港領先嘅 AEO Agency，幫企業喺 ChatGPT、Perplexity、Google AI Overview 被推薦。HKSTP 培育、Techathon+ 支持。",
    en: "SurfIO is Hong Kong's leading AEO Agency, helping businesses get recommended on ChatGPT, Perplexity, and Google AI Overview. HKSTP incubated, Techathon+ supported.",
  },

  // Language switcher
  "lang.zh": { zh: "中", en: "中" },
  "lang.en": { zh: "EN", en: "EN" },
} as const;

type TranslationKey = keyof typeof translations;

export function t(key: TranslationKey, lang: Lang): any {
  const entry = translations[key];
  if (!entry) return key;
  return (entry as any)[lang] ?? (entry as any).zh;
}
