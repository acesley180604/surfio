// Cluster G: AEO for [Platform] Integration Pages — 30 platforms

export interface IntegrationPage {
  slug: string;
  platformName: string;
  platformCategory: string;
  metaTitle: string; metaTitleEn: string;
  metaDescription: string; metaDescriptionEn: string;
  heroTitle: string; heroTitleEn: string;
  heroSubtitle: string; heroSubtitleEn: string;
  whyAeo: string; whyAeoEn: string;
  steps: { title: string; titleEn: string; desc: string; descEn: string }[];
  features: { title: string; titleEn: string; desc: string; descEn: string }[];
  stats: { value: string; label: string; labelEn: string }[];
  faqs: [string, string][];
  faqsEn: [string, string][];
  relatedPlatforms: string[];
}

type Cat = "CMS" | "E-commerce" | "CRM" | "Marketing" | "Analytics" | "Social Media";

const PLATFORMS: [string, string, Cat][] = [
  ["wordpress","WordPress","CMS"],["webflow","Webflow","CMS"],["wix","Wix","CMS"],["squarespace","Squarespace","CMS"],
  ["ghost","Ghost","CMS"],["strapi","Strapi","CMS"],["contentful","Contentful","CMS"],["sanity","Sanity","CMS"],
  ["shopify","Shopify","E-commerce"],["woocommerce","WooCommerce","E-commerce"],["magento","Magento","E-commerce"],
  ["bigcommerce","BigCommerce","E-commerce"],["shopline","SHOPLINE","E-commerce"],["boutir","Boutir","E-commerce"],
  ["hubspot","HubSpot","CRM"],["salesforce","Salesforce","CRM"],["zoho","Zoho CRM","CRM"],
  ["pipedrive","Pipedrive","CRM"],["monday-crm","monday CRM","CRM"],
  ["mailchimp","Mailchimp","Marketing"],["klaviyo","Klaviyo","Marketing"],["activecampaign","ActiveCampaign","Marketing"],
  ["semrush","Semrush","Marketing"],["ahrefs","Ahrefs","Marketing"],
  ["google-analytics","Google Analytics","Analytics"],["mixpanel","Mixpanel","Analytics"],["hotjar","Hotjar","Analytics"],
  ["hootsuite","Hootsuite","Social Media"],["buffer","Buffer","Social Media"],["sprout-social","Sprout Social","Social Media"],
];

const CAT_ZH: Record<Cat, string> = {
  CMS: "內容管理系統", "E-commerce": "電商平台", CRM: "客戶關係管理",
  Marketing: "營銷工具", Analytics: "分析工具", "Social Media": "社交媒體管理",
};

const STEP_TEMPLATES = {
  CMS: [
    ["安裝 Schema Markup 外掛","Install Schema Markup Plugin","為你嘅 {p} 網站添加結構化數據外掛，確保 AI 爬蟲可以正確解讀你嘅內容。","Add a structured data plugin to your {p} site so AI crawlers can correctly interpret your content."],
    ["優化內容結構","Optimize Content Structure","用正確嘅標題層級（H1-H6）同語義化 HTML 結構化你嘅 {p} 內容，提升 AI 引擎嘅理解能力。","Structure your {p} content with proper heading hierarchy (H1-H6) and semantic HTML to improve AI engine comprehension."],
    ["設置 llms.txt","Configure llms.txt","喺 {p} 網站根目錄添加 llms.txt 文件，向 AI 爬蟲提供你嘅網站結構同重點內容。","Add an llms.txt file to your {p} site root to provide AI crawlers with your site structure and key content."],
    ["建立內部連結網絡","Build Internal Link Network","利用 {p} 嘅導航同內容系統建立強大嘅內部連結結構，幫助 AI 理解你嘅品牌實體關係。","Use {p}'s navigation and content system to build a strong internal linking structure, helping AI understand your brand entity relationships."],
    ["監測 AI 引用表現","Monitor AI Citation Performance","追蹤你嘅 {p} 網站喺 ChatGPT、Perplexity 等 AI 引擎嘅引用同推薦情況。","Track your {p} site's citations and recommendations across AI engines like ChatGPT and Perplexity."],
  ],
  "E-commerce": [
    ["產品 Schema Markup","Product Schema Markup","為 {p} 店鋪嘅每個產品添加 Product、Offer、Review Schema，令 AI 引擎可以準確推薦你嘅產品。","Add Product, Offer, and Review Schema to every product in your {p} store so AI engines can accurately recommend your products."],
    ["優化產品描述","Optimize Product Descriptions","為每個 {p} 產品撰寫獨特、詳細、針對 AI 搜尋優化嘅描述，包含關鍵規格同用途場景。","Write unique, detailed, AI-search-optimized descriptions for each {p} product, including key specifications and use case scenarios."],
    ["建立品牌故事頁面","Build Brand Story Pages","喺 {p} 店鋪創建「關於我們」、品牌歷史同專業認證頁面，建立 E-E-A-T 信號。","Create About Us, brand history, and professional certification pages in your {p} store to establish E-E-A-T signals."],
    ["FAQ 同評價管理","FAQ & Review Management","利用 {p} 嘅評價系統同 FAQ 功能產生 AI 引擎鍾意引用嘅結構化問答內容。","Use {p}'s review system and FAQ features to generate structured Q&A content that AI engines love to cite."],
    ["AI 購物搜尋優化","AI Shopping Search Optimization","針對 {p} 產品目錄優化 AI 購物搜尋，確保你嘅產品喺 AI 比價同推薦中出現。","Optimize your {p} product catalog for AI shopping search, ensuring your products appear in AI price comparisons and recommendations."],
  ],
  CRM: [
    ["整合客戶數據","Integrate Customer Data","利用 {p} 嘅客戶數據了解你嘅受眾搜尋行為，制定針對性嘅 AEO 內容策略。","Use {p}'s customer data to understand your audience's search behavior and develop targeted AEO content strategies."],
    ["自動化內容分發","Automate Content Distribution","用 {p} 嘅自動化功能將優化後嘅內容分發到多個渠道，增加品牌嘅數碼存在感。","Use {p}'s automation features to distribute optimized content across multiple channels, increasing your brand's digital presence."],
    ["追蹤 AI 轉換","Track AI Conversions","喺 {p} 中設置 AI 搜尋來源追蹤，衡量從 ChatGPT、Perplexity 等渠道嘅轉換效果。","Set up AI search source tracking in {p} to measure conversion effectiveness from ChatGPT, Perplexity, and other channels."],
    ["建立品牌權威","Build Brand Authority","利用 {p} 嘅營銷功能建立同分發思想領導力內容，提升品牌喺 AI 引擎嘅權威性。","Use {p}'s marketing features to create and distribute thought leadership content, boosting brand authority in AI engines."],
    ["客戶反饋循環","Customer Feedback Loop","用 {p} 收集客戶反饋，轉化為 AI 引擎鍾意引用嘅案例研究同成功故事。","Use {p} to collect customer feedback and transform it into case studies and success stories that AI engines love to cite."],
  ],
  Marketing: [
    ["內容優化整合","Content Optimization Integration","將 {p} 嘅數據洞察整合到你嘅 AEO 內容策略中，確保內容針對 AI 搜尋優化。","Integrate {p}'s data insights into your AEO content strategy, ensuring content is optimized for AI search."],
    ["關鍵字到意圖轉型","Keyword to Intent Transformation","用 {p} 嘅分析功能識別搜尋意圖模式，從傳統關鍵字策略轉向 AI 搜尋意圖優化。","Use {p}'s analytics to identify search intent patterns, transitioning from traditional keyword strategy to AI search intent optimization."],
    ["競爭對手 AI 分析","Competitor AI Analysis","利用 {p} 分析競爭對手喺 AI 搜尋嘅表現，搵出你嘅品牌差距同機會。","Use {p} to analyze competitor performance in AI search, identifying your brand's gaps and opportunities."],
    ["多渠道品牌一致性","Multi-Channel Brand Consistency","確保你喺 {p} 管理嘅所有渠道保持品牌信息一致，強化 AI 引擎嘅品牌實體識別。","Ensure brand message consistency across all channels managed in {p}, strengthening AI engine brand entity recognition."],
    ["ROI 追蹤同報告","ROI Tracking & Reporting","用 {p} 建立 AEO 投資回報追蹤系統，衡量 AI 搜尋優化嘅實際商業影響。","Use {p} to build an AEO ROI tracking system, measuring the actual business impact of AI search optimization."],
  ],
  Analytics: [
    ["設置 AI 流量分段","Set Up AI Traffic Segmentation","喺 {p} 中設置自定義分段，識別同追蹤來自 AI 搜尋引擎嘅流量。","Set up custom segments in {p} to identify and track traffic from AI search engines."],
    ["AI 引用歸因分析","AI Citation Attribution Analysis","利用 {p} 嘅歸因模型分析 AI 搜尋引用對轉換嘅貢獻度。","Use {p}'s attribution models to analyze AI search citation contribution to conversions."],
    ["用戶行為追蹤","User Behavior Tracking","用 {p} 追蹤從 AI 搜尋到達嘅用戶行為模式，優化登陸頁面體驗。","Use {p} to track behavioral patterns of users arriving from AI search, optimizing landing page experiences."],
    ["自定義 AEO 儀表板","Custom AEO Dashboard","喺 {p} 中建立 AEO 專用儀表板，實時監控 AI 搜尋能見度指標。","Build a dedicated AEO dashboard in {p} to monitor AI search visibility metrics in real-time."],
    ["A/B 測試 AI 內容","A/B Test AI Content","利用 {p} 嘅測試功能對比唔同 AEO 策略嘅效果，持續優化 AI 搜尋表現。","Use {p}'s testing capabilities to compare different AEO strategies, continuously optimizing AI search performance."],
  ],
  "Social Media": [
    ["AI 搜尋友好嘅社交內容","AI-Search-Friendly Social Content","用 {p} 創建同排程經過 AEO 優化嘅社交媒體內容，增加品牌被 AI 引擎發現嘅機會。","Use {p} to create and schedule AEO-optimized social media content, increasing your brand's discoverability by AI engines."],
    ["品牌聲量監測","Brand Voice Monitoring","利用 {p} 嘅監測功能追蹤你嘅品牌喺社交媒體被提及嘅情況，呢啲信號會影響 AI 引擎嘅推薦。","Use {p}'s monitoring features to track your brand's social media mentions—these signals influence AI engine recommendations."],
    ["跨平台內容策略","Cross-Platform Content Strategy","用 {p} 管理跨平台嘅一致性品牌信息，強化 AI 引擎對你品牌嘅整體認知。","Use {p} to manage consistent brand messaging across platforms, strengthening AI engines' overall perception of your brand."],
    ["社交證明建設","Social Proof Building","透過 {p} 系統化收集同展示社交證明（評價、案例），增強品牌嘅 E-E-A-T 信號。","Systematically collect and showcase social proof (reviews, case studies) through {p} to strengthen brand E-E-A-T signals."],
    ["影響力行銷整合","Influencer Marketing Integration","用 {p} 管理影響力行銷活動，透過行業 KOL 嘅背書提升品牌喺 AI 引擎嘅權威性。","Use {p} to manage influencer marketing campaigns, leveraging industry KOL endorsements to boost brand authority in AI engines."],
  ],
};

const FEATURE_TEMPLATES: Record<Cat, [string,string,string,string][]> = {
  CMS: [["Schema 自動化","Schema Automation","為你嘅 {p} 網站自動部署全面嘅結構化數據","Automatically deploy comprehensive structured data for your {p} site"],["內容 AI 審計","Content AI Audit","深度分析 {p} 內容嘅 AI 搜尋準備度","Deep analysis of your {p} content's AI search readiness"],["技術優化","Technical Optimization","解決 {p} 特有嘅技術 SEO 同 AEO 問題","Resolve {p}-specific technical SEO and AEO issues"],["持續監測","Ongoing Monitoring","追蹤你嘅 {p} 網站喺 7 大 AI 引擎嘅表現","Track your {p} site's performance across 7 major AI engines"]],
  "E-commerce": [["產品 Schema","Product Schema","為 {p} 產品目錄部署完整嘅電商結構化數據","Deploy complete e-commerce structured data for your {p} catalog"],["AI 購物優化","AI Shopping Optimization","確保產品喺 AI 購物推薦中出現","Ensure products appear in AI shopping recommendations"],["評價整合","Review Integration","將 {p} 評價系統同 AI 搜尋引擎對接","Connect {p} review system with AI search engines"],["轉換追蹤","Conversion Tracking","衡量 AI 搜尋帶來嘅實際銷售","Measure actual sales driven by AI search"]],
  CRM: [["數據洞察","Data Insights","利用 {p} 客戶數據驅動 AEO 策略","Use {p} customer data to drive AEO strategy"],["自動化工作流","Automated Workflows","設置 AI 搜尋優化嘅自動化流程","Set up automated workflows for AI search optimization"],["轉換歸因","Conversion Attribution","追蹤 AI 搜尋到 {p} 轉換嘅完整路徑","Track complete path from AI search to {p} conversion"],["客戶旅程優化","Journey Optimization","基於 AI 搜尋行為優化客戶旅程","Optimize customer journey based on AI search behavior"]],
  Marketing: [["競爭分析","Competitive Analysis","用 {p} 數據分析競爭對手嘅 AI 搜尋表現","Use {p} data to analyze competitor AI search performance"],["內容策略","Content Strategy","基於 {p} 洞察制定 AI 搜尋內容策略","Develop AI search content strategy based on {p} insights"],["關鍵字轉型","Keyword Transformation","從傳統關鍵字轉向 AI 搜尋意圖","Transition from traditional keywords to AI search intent"],["報告整合","Report Integration","將 AEO 指標整合到 {p} 報告中","Integrate AEO metrics into {p} reporting"]],
  Analytics: [["AI 流量分析","AI Traffic Analysis","喺 {p} 中精準識別 AI 搜尋流量","Precisely identify AI search traffic in {p}"],["歸因建模","Attribution Modeling","用 {p} 嘅模型分析 AI 搜尋嘅貢獻","Use {p} models to analyze AI search contribution"],["行為洞察","Behavioral Insights","分析 AI 搜尋用戶嘅獨特行為模式","Analyze unique behavioral patterns of AI search users"],["自定義報告","Custom Reports","建立 AEO 專用嘅 {p} 報告同儀表板","Build AEO-specific {p} reports and dashboards"]],
  "Social Media": [["品牌監測","Brand Monitoring","透過 {p} 追蹤影響 AI 推薦嘅社交信號","Track social signals affecting AI recommendations through {p}"],["內容排程","Content Scheduling","用 {p} 排程 AEO 優化嘅社交內容","Schedule AEO-optimized social content with {p}"],["社交聆聽","Social Listening","監測影響 AI 引擎品牌認知嘅社交對話","Monitor social conversations affecting AI engine brand perception"],["分析報告","Analytics Reports","衡量社交活動對 AI 搜尋能見度嘅影響","Measure social activity impact on AI search visibility"]],
};

function buildIntegration(slug: string, name: string, cat: Cat, _idx: number): IntegrationPage {
  const catZh = CAT_ZH[cat];
  const steps = (STEP_TEMPLATES[cat] || STEP_TEMPLATES.CMS).map(([t, tEn, d, dEn]) => ({
    title: t, titleEn: tEn, desc: d.replace(/\{p\}/g, name), descEn: dEn.replace(/\{p\}/g, name),
  }));
  const features = (FEATURE_TEMPLATES[cat] || FEATURE_TEMPLATES.CMS).map(([t, tEn, d, dEn]) => ({
    title: t, titleEn: tEn, desc: d.replace(/\{p\}/g, name), descEn: dEn.replace(/\{p\}/g, name),
  }));
  const related = PLATFORMS.filter(p => p[2] === cat && p[0] !== slug).slice(0, 4).map(p => p[0]);

  return {
    slug, platformName: name, platformCategory: cat,
    metaTitle: `${name} AEO 優化指南 | AI 搜尋整合 - SurfIO`,
    metaTitleEn: `${name} AEO Optimization Guide | AI Search Integration - SurfIO`,
    metaDescription: `了解點樣為你嘅 ${name} ${catZh}實施 AEO 策略。5 步優化流程提升你喺 ChatGPT、Perplexity 等 AI 引擎嘅能見度。`,
    metaDescriptionEn: `Learn how to implement AEO strategy for your ${name} ${cat}. 5-step optimization process to boost visibility on ChatGPT, Perplexity, and other AI engines.`,
    heroTitle: `${name} × AEO：點樣令你嘅${catZh}被 AI 推薦`,
    heroTitleEn: `${name} × AEO: How to Get Your ${cat} Recommended by AI`,
    heroSubtitle: `為 ${name} 用戶度身定制嘅 AI 搜尋優化方案。從技術設置到內容策略，全方位提升你喺 7 大 AI 引擎嘅品牌能見度。`,
    heroSubtitleEn: `AI search optimization tailored for ${name} users. From technical setup to content strategy, comprehensively boost your brand visibility across 7 major AI engines.`,
    whyAeo: `${name} 係全球最受歡迎嘅${catZh}之一，但大部分 ${name} 用戶仍然只做傳統 SEO。隨住 40%+ 嘅搜尋查詢流向 AI 引擎，你嘅 ${name} 網站需要針對 AI 搜尋進行專門優化——否則你將錯失大量潛在客戶。`,
    whyAeoEn: `${name} is one of the most popular ${cat} platforms globally, but most ${name} users still only do traditional SEO. With 40%+ of search queries going to AI engines, your ${name} site needs specialized AI search optimization—or you'll miss massive potential customers.`,
    steps, features,
    stats: [
      { value: "40%+", label: "搜尋查詢流向 AI", labelEn: "of queries go to AI" },
      { value: "3.2x", label: "AEO 優化後引用增長", labelEn: "citation growth after AEO" },
      { value: "68%", label: "用戶信任 AI 推薦", labelEn: "of users trust AI recommendations" },
    ],
    faqs: [
      [`${name} 需要特別嘅 AEO 優化嗎？`,`係嘅。每個${catZh}有唔同嘅技術架構同限制，${name} 需要針對性嘅 Schema Markup 部署、內容結構化同技術優化方案。`],
      [`AEO 優化會影響我現有嘅 ${name} SEO 嗎？`,`唔會。AEO 優化係喺現有 SEO 基礎上嘅增量工作，佢哋係互補嘅——好嘅 AEO 實際上會加強你嘅傳統 SEO 表現。`],
      [`幾耐可以睇到效果？`,`技術優化（Schema Markup 等）可以即時生效。內容優化同品牌權威性建設通常需要 2-3 個月先開始見到明顯嘅 AI 引用增長。`],
      [`SurfIO 點樣幫助 ${name} 用戶？`,`我哋提供免費 AEO 審計，評估你嘅 ${name} 網站喺 7 大 AI 引擎嘅表現，然後制定度身定制嘅優化方案。`],
    ],
    faqsEn: [
      [`Does ${name} need special AEO optimization?`,`Yes. Each ${cat} platform has different technical architecture and limitations. ${name} needs targeted Schema Markup deployment, content structuring, and technical optimization.`],
      [`Will AEO optimization affect my existing ${name} SEO?`,`No. AEO optimization is incremental work on top of existing SEO—they're complementary. Good AEO actually strengthens your traditional SEO performance.`],
      [`How long until I see results?`,`Technical optimizations (Schema Markup etc.) take effect immediately. Content optimization and brand authority building typically need 2-3 months before showing noticeable AI citation growth.`],
      [`How does SurfIO help ${name} users?`,`We provide a free AEO audit assessing your ${name} site's performance across 7 major AI engines, then develop a tailored optimization plan.`],
    ],
    relatedPlatforms: related,
  };
}

export function getIntegrationPages(): IntegrationPage[] {
  return PLATFORMS.map(([slug, name, cat], i) => buildIntegration(slug, name, cat, i));
}
