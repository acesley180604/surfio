// ============================
// Cluster J: Checklist Pages
// ~60 pages — one per industry
// ============================

import { ALL_INDUSTRIES } from "./types";

export interface ChecklistPage {
  slug: string;
  industryName: string;
  industryNameEn: string;
  metaTitle: string;
  metaTitleEn: string;
  metaDescription: string;
  metaDescriptionEn: string;
  heroTitle: string;
  heroTitleEn: string;
  categories: {
    name: string;
    nameEn: string;
    items: { text: string; textEn: string; priority: "high" | "medium" | "low" }[];
  }[];
  faqs: [string, string][];
  faqsEn: [string, string][];
  relatedChecklists: string[];
}

// --- English industry name mapping ---
const INDUSTRY_EN: Record<string, string> = {
  "personal-injury-lawyers": "Personal Injury Lawyers",
  "immigration-lawyers": "Immigration Lawyers",
  "commercial-lawyers": "Commercial Lawyers",
  "ip-lawyers": "IP Lawyers",
  "family-lawyers": "Family Lawyers",
  "criminal-lawyers": "Criminal Lawyers",
  "plastic-surgery": "Plastic Surgery",
  "dermatology": "Dermatology",
  "dentistry": "Dentistry",
  "fertility": "Fertility Clinics",
  "psychiatry": "Psychiatry",
  "tcm": "Traditional Chinese Medicine",
  "wealth-management": "Wealth Management",
  "tax-advisory": "Tax Advisory",
  "insurance": "Insurance",
  "mortgage": "Mortgage",
  "accounting": "Accounting",
  "fund-management": "Fund Management",
  "crm-software": "CRM Software",
  "hr-systems": "HR Systems",
  "cybersecurity": "Cybersecurity",
  "marketing-automation": "Marketing Automation",
  "data-analytics": "Data Analytics",
  "management-consulting": "Management Consulting",
  "corporate-training": "Corporate Training",
  "ma-advisory": "M&A Advisory",
  "headhunting": "Headhunting",
  "commercial-real-estate": "Commercial Real Estate",
  "luxury-property": "Luxury Property",
  "property-management": "Property Management",
  "ecommerce-retail": "E-commerce Retail",
  "education-tutoring": "Education & Tutoring",
  "travel": "Travel",
  "hotel": "Hotels",
  "home-services": "Home Services",
  "automotive": "Automotive",
  "recruitment": "Recruitment",
  "event-planning": "Event Planning",
  "architecture": "Architecture",
  "renovation": "Renovation",
  "wedding-planning": "Wedding Planning",
  "photography": "Photography",
  "beauty": "Beauty",
  "fitness": "Fitness",
  "pet-services": "Pet Services",
  "fnb": "Food & Beverage",
  "retail": "Retail",
  "logistics": "Logistics",
  "printing": "Printing",
  "advertising": "Advertising",
  "blockchain": "Blockchain",
  "cleantech": "Clean Technology",
  "biotech": "Biotechnology",
  "drone-services": "Drone Services",
  "coworking": "Co-working Spaces",
  "podcast-production": "Podcast Production",
  "vr-ar": "VR/AR",
  "elderly-care": "Elderly Care",
  "music-production": "Music Production",
  "food-tech": "Food Technology",
  "smart-home": "Smart Home",
  "sustainability-consulting": "Sustainability Consulting",
  "esports": "Esports",
  "online-therapy": "Online Therapy",
  "language-school": "Language Schools",
  "vertical-farming": "Vertical Farming",
  "carbon-trading": "Carbon Trading",
  "pet-tech": "Pet Technology",
  "sleep-tech": "Sleep Technology",
  "childcare": "Childcare",
};

// --- Industry category for content generation ---
type IndustryCat = "legal" | "medical" | "finance" | "tech" | "consulting" | "property" | "lifestyle" | "creative" | "education" | "emerging";

const CAT_MAP: Record<string, IndustryCat> = {
  "personal-injury-lawyers": "legal", "immigration-lawyers": "legal", "commercial-lawyers": "legal",
  "ip-lawyers": "legal", "family-lawyers": "legal", "criminal-lawyers": "legal",
  "plastic-surgery": "medical", "dermatology": "medical", "dentistry": "medical",
  "fertility": "medical", "psychiatry": "medical", "tcm": "medical",
  "wealth-management": "finance", "tax-advisory": "finance", "insurance": "finance",
  "mortgage": "finance", "accounting": "finance", "fund-management": "finance",
  "crm-software": "tech", "hr-systems": "tech", "cybersecurity": "tech",
  "marketing-automation": "tech", "data-analytics": "tech",
  "management-consulting": "consulting", "corporate-training": "consulting",
  "ma-advisory": "consulting", "headhunting": "consulting",
  "commercial-real-estate": "property", "luxury-property": "property", "property-management": "property",
  "ecommerce-retail": "lifestyle", "education-tutoring": "education", "travel": "lifestyle",
  "hotel": "lifestyle", "home-services": "lifestyle", "automotive": "lifestyle",
  "recruitment": "consulting", "event-planning": "creative", "architecture": "creative",
  "renovation": "lifestyle", "wedding-planning": "creative", "photography": "creative",
  "beauty": "lifestyle", "fitness": "lifestyle", "pet-services": "lifestyle",
  "fnb": "lifestyle", "retail": "lifestyle", "logistics": "tech", "printing": "lifestyle",
  "advertising": "creative", "blockchain": "emerging", "cleantech": "emerging",
  "biotech": "emerging", "drone-services": "emerging", "coworking": "property",
  "podcast-production": "creative", "vr-ar": "emerging", "elderly-care": "medical",
  "music-production": "creative", "food-tech": "emerging", "smart-home": "emerging",
  "sustainability-consulting": "consulting", "esports": "emerging", "online-therapy": "medical",
  "language-school": "education", "vertical-farming": "emerging", "carbon-trading": "emerging",
  "pet-tech": "emerging", "sleep-tech": "emerging", "childcare": "education",
};

function getCat(slug: string): IndustryCat {
  return CAT_MAP[slug] ?? "lifestyle";
}

// --- Deterministic hash for variety ---
function hash(s: string, offset: number): number {
  let h = offset * 31;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) - h + offset * 7) + s.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

// --- Category-specific checklist items ---
interface ItemPool {
  text: string;
  textEn: string;
  priority: "high" | "medium" | "low";
}

function getDigitalPresenceItems(cat: IndustryCat, slug: string): ItemPool[] {
  const base: ItemPool[] = [
    { text: "建立流動裝置友好嘅響應式網站", textEn: "Build a mobile-friendly responsive website", priority: "high" },
    { text: "喺 Google Business Profile 完善所有業務資訊", textEn: "Complete all business info on Google Business Profile", priority: "high" },
    { text: "建立同管理主要社交媒體帳號", textEn: "Set up and manage key social media accounts", priority: "high" },
    { text: "喺行業目錄同平台登記業務", textEn: "Register on industry directories and platforms", priority: "medium" },
    { text: "確保所有平台嘅 NAP 資訊一致", textEn: "Ensure consistent NAP info across all platforms", priority: "high" },
  ];

  const extras: Record<IndustryCat, ItemPool[]> = {
    legal: [
      { text: "喺法律服務目錄（如 HK Lawyer）建立資料", textEn: "Create profile on legal directories (e.g. HK Lawyer)", priority: "medium" },
      { text: "喺律師公會網站更新事務所資料", textEn: "Update firm profile on Law Society website", priority: "medium" },
      { text: "建立專業嘅 LinkedIn 公司頁面", textEn: "Create professional LinkedIn company page", priority: "medium" },
    ],
    medical: [
      { text: "喺醫療健康平台（如 FindDoc）建立醫生資料", textEn: "Create doctor profile on health platforms (e.g. FindDoc)", priority: "medium" },
      { text: "確保醫療牌照同資歷喺網站清楚展示", textEn: "Display medical licenses and qualifications clearly on website", priority: "high" },
      { text: "喺 Google Maps 加入診所正確位置同營業時間", textEn: "Add correct clinic location and hours on Google Maps", priority: "medium" },
    ],
    finance: [
      { text: "喺金融監管機構網站核實牌照資訊", textEn: "Verify license info on financial regulatory websites", priority: "high" },
      { text: "喺財經媒體平台建立專家資料", textEn: "Create expert profile on financial media platforms", priority: "medium" },
      { text: "確保合規免責聲明喺所有渠道一致", textEn: "Ensure compliance disclaimers are consistent across all channels", priority: "high" },
    ],
    tech: [
      { text: "喺 G2、Capterra 等軟件評測平台建立產品頁面", textEn: "Create product page on G2, Capterra and review platforms", priority: "high" },
      { text: "維護完整嘅 GitHub/開源社區存在感", textEn: "Maintain presence on GitHub/open-source communities", priority: "medium" },
      { text: "建立產品 Demo 同免費試用頁面", textEn: "Build product demo and free trial pages", priority: "medium" },
    ],
    consulting: [
      { text: "喺顧問業界平台建立公司資料", textEn: "Create company profile on consulting industry platforms", priority: "medium" },
      { text: "確保合夥人嘅個人品牌同公司品牌一致", textEn: "Align partners' personal branding with company brand", priority: "medium" },
      { text: "建立案例研究專頁展示過往成果", textEn: "Build case study pages showcasing past results", priority: "medium" },
    ],
    property: [
      { text: "喺地產代理平台（如 Squarefoot）建立代理資料", textEn: "Create agent profile on property platforms (e.g. Squarefoot)", priority: "high" },
      { text: "加入虛擬導覽同高質素物業相片", textEn: "Add virtual tours and high-quality property photos", priority: "medium" },
      { text: "喺 Google Maps 標記所有管理物業位置", textEn: "Mark all managed property locations on Google Maps", priority: "medium" },
    ],
    lifestyle: [
      { text: "喺 OpenRice/TripAdvisor 等消費平台管理評價", textEn: "Manage reviews on OpenRice/TripAdvisor consumer platforms", priority: "high" },
      { text: "建立 Instagram 同 Facebook Shop 展示產品", textEn: "Set up Instagram and Facebook Shop to showcase products", priority: "medium" },
      { text: "確保外賣/預約平台資訊準確更新", textEn: "Keep delivery/booking platform info accurately updated", priority: "medium" },
    ],
    creative: [
      { text: "建立作品集網站展示最佳案例", textEn: "Build portfolio website showcasing best work", priority: "high" },
      { text: "喺 Behance/Dribbble 等創意社區建立存在感", textEn: "Establish presence on Behance/Dribbble creative communities", priority: "medium" },
      { text: "製作影片 showreel 展示服務能力", textEn: "Create video showreel demonstrating service capabilities", priority: "low" },
    ],
    education: [
      { text: "喺教育平台同家長論壇建立機構資料", textEn: "Create institution profile on education platforms and parent forums", priority: "medium" },
      { text: "展示教學團隊資歷同認證", textEn: "Display teaching team qualifications and certifications", priority: "high" },
      { text: "建立學生成績同升學成果展示頁", textEn: "Build page showcasing student achievements and outcomes", priority: "medium" },
    ],
    emerging: [
      { text: "喺 Product Hunt、Crunchbase 建立公司資料", textEn: "Create company profile on Product Hunt, Crunchbase", priority: "high" },
      { text: "參與行業論壇同 Reddit 相關社區", textEn: "Participate in industry forums and relevant Reddit communities", priority: "medium" },
      { text: "建立技術白皮書下載頁面", textEn: "Build technical whitepaper download page", priority: "low" },
    ],
  };

  const picked = extras[cat] || extras.lifestyle;
  const idx = hash(slug, 1) % picked.length;
  return [...base, picked[idx], picked[(idx + 1) % picked.length]];
}

function getContentSchemaItems(cat: IndustryCat, _slug: string): ItemPool[] {
  const base: ItemPool[] = [
    { text: "部署 Organization Schema Markup（JSON-LD）", textEn: "Deploy Organization Schema Markup (JSON-LD)", priority: "high" },
    { text: "為每個服務頁面加入 Service Schema", textEn: "Add Service Schema to each service page", priority: "high" },
    { text: "建立 FAQ 頁面並加入 FAQPage Schema", textEn: "Create FAQ pages with FAQPage Schema", priority: "high" },
    { text: "確保所有頁面有 meta title 同 description", textEn: "Ensure all pages have meta title and description", priority: "high" },
    { text: "建立結構清晰、可引用嘅內容格式", textEn: "Create clearly structured, citable content format", priority: "medium" },
  ];

  const extras: Record<IndustryCat, ItemPool[]> = {
    legal: [
      { text: "為每位律師加入 Person Schema 同專業資歷", textEn: "Add Person Schema with qualifications for each lawyer", priority: "medium" },
      { text: "建立案例分析文章展示專業知識", textEn: "Write case analysis articles showcasing expertise", priority: "medium" },
    ],
    medical: [
      { text: "為醫療程序加入 MedicalProcedure Schema", textEn: "Add MedicalProcedure Schema for medical procedures", priority: "medium" },
      { text: "建立醫生個人資料頁面同 Physician Schema", textEn: "Create doctor profile pages with Physician Schema", priority: "high" },
    ],
    finance: [
      { text: "加入 FinancialProduct Schema 描述服務", textEn: "Add FinancialProduct Schema to describe services", priority: "medium" },
      { text: "建立市場分析同投資教育內容", textEn: "Create market analysis and investment education content", priority: "medium" },
    ],
    tech: [
      { text: "加入 SoftwareApplication Schema 描述產品", textEn: "Add SoftwareApplication Schema to describe products", priority: "high" },
      { text: "建立技術文檔同 API 參考資料", textEn: "Build technical documentation and API references", priority: "medium" },
    ],
    consulting: [
      { text: "建立方法論同框架嘅結構化內容", textEn: "Create structured content about methodologies and frameworks", priority: "medium" },
      { text: "撰寫行業趨勢分析同洞察文章", textEn: "Write industry trend analysis and insight articles", priority: "medium" },
    ],
    property: [
      { text: "加入 RealEstateListing Schema 描述物業", textEn: "Add RealEstateListing Schema for properties", priority: "high" },
      { text: "建立地區指南同市場報告", textEn: "Create neighborhood guides and market reports", priority: "medium" },
    ],
    lifestyle: [
      { text: "加入 Product Schema 同 AggregateRating", textEn: "Add Product Schema with AggregateRating", priority: "medium" },
      { text: "建立用戶指南同使用教學內容", textEn: "Create user guides and how-to tutorial content", priority: "low" },
    ],
    creative: [
      { text: "加入 CreativeWork Schema 描述作品集", textEn: "Add CreativeWork Schema for portfolio pieces", priority: "medium" },
      { text: "建立創作過程同幕後花絮內容", textEn: "Create behind-the-scenes and creative process content", priority: "low" },
    ],
    education: [
      { text: "加入 Course Schema 描述課程內容", textEn: "Add Course Schema to describe course content", priority: "high" },
      { text: "建立教學資源同免費學習材料", textEn: "Create teaching resources and free learning materials", priority: "medium" },
    ],
    emerging: [
      { text: "加入 TechArticle Schema 描述技術內容", textEn: "Add TechArticle Schema for technical content", priority: "medium" },
      { text: "建立行業術語表同概念解釋頁面", textEn: "Build industry glossary and concept explanation pages", priority: "low" },
    ],
  };

  const picked = extras[cat] || extras.lifestyle;
  return [...base, ...picked];
}

function getAiVisibilityItems(cat: IndustryCat, _slug: string): ItemPool[] {
  const base: ItemPool[] = [
    { text: "測試品牌喺 ChatGPT 嘅提及情況", textEn: "Test brand mentions on ChatGPT", priority: "high" },
    { text: "測試品牌喺 Perplexity 嘅引用情況", textEn: "Test brand citations on Perplexity", priority: "high" },
    { text: "檢查 Google AI Overview 係咪有提及你", textEn: "Check if Google AI Overview mentions you", priority: "high" },
    { text: "建立 AI 友好嘅問答格式內容", textEn: "Create AI-friendly Q&A format content", priority: "high" },
    { text: "確保 robots.txt 允許 AI 爬蟲抓取", textEn: "Ensure robots.txt allows AI crawler access", priority: "medium" },
  ];

  const extras: Record<IndustryCat, ItemPool[]> = {
    legal: [
      { text: "針對「最好嘅XX律師」等 AI 查詢優化內容", textEn: "Optimize content for 'best XX lawyer' AI queries", priority: "high" },
      { text: "確保法律案例分析被 AI 正確引用", textEn: "Ensure legal case analyses are correctly cited by AI", priority: "medium" },
    ],
    medical: [
      { text: "針對「邊個醫生最好」等 AI 健康查詢優化", textEn: "Optimize for 'which doctor is best' AI health queries", priority: "high" },
      { text: "確保醫療資訊準確避免 AI 幻覺", textEn: "Ensure medical info accuracy to prevent AI hallucinations", priority: "high" },
    ],
    finance: [
      { text: "針對「推薦理財顧問」等 AI 查詢優化", textEn: "Optimize for 'recommend financial advisor' AI queries", priority: "high" },
      { text: "建立可信嘅財務數據同統計內容", textEn: "Build credible financial data and statistical content", priority: "medium" },
    ],
    tech: [
      { text: "針對「最佳XX軟件」等 AI 比較查詢優化", textEn: "Optimize for 'best XX software' AI comparison queries", priority: "high" },
      { text: "建立詳細嘅產品比較同功能對照表", textEn: "Create detailed product comparisons and feature tables", priority: "medium" },
    ],
    consulting: [
      { text: "針對「邊間顧問公司最好」等 AI 查詢優化", textEn: "Optimize for 'which consulting firm is best' AI queries", priority: "high" },
      { text: "建立顧問團隊嘅專家知識內容庫", textEn: "Build expert knowledge content library for consulting team", priority: "medium" },
    ],
    property: [
      { text: "針對「邊區最適合買樓」等 AI 地產查詢優化", textEn: "Optimize for 'best area to buy property' AI queries", priority: "high" },
      { text: "建立物業市場數據同趨勢內容", textEn: "Create property market data and trend content", priority: "medium" },
    ],
    lifestyle: [
      { text: "針對「附近最好嘅XX」等本地 AI 查詢優化", textEn: "Optimize for 'best XX nearby' local AI queries", priority: "high" },
      { text: "鼓勵客戶留低正面評價強化 AI 信號", textEn: "Encourage customers to leave positive reviews to strengthen AI signals", priority: "medium" },
    ],
    creative: [
      { text: "針對「推薦XX服務」等 AI 查詢優化作品集", textEn: "Optimize portfolio for 'recommend XX service' AI queries", priority: "high" },
      { text: "建立項目案例研究被 AI 引用", textEn: "Create project case studies for AI citation", priority: "medium" },
    ],
    education: [
      { text: "針對「最好嘅XX課程」等 AI 教育查詢優化", textEn: "Optimize for 'best XX course' AI education queries", priority: "high" },
      { text: "建立免費教育內容作為 AI 引用資源", textEn: "Create free educational content as AI citation resources", priority: "medium" },
    ],
    emerging: [
      { text: "針對行業新興話題嘅 AI 查詢搶佔先機", textEn: "Target emerging topic AI queries to gain first-mover advantage", priority: "high" },
      { text: "建立權威嘅行業入門指南同解釋內容", textEn: "Create authoritative industry primer and explainer content", priority: "medium" },
    ],
  };

  const picked = extras[cat] || extras.lifestyle;
  return [...base, ...picked];
}

function getAuthorityItems(cat: IndustryCat, _slug: string): ItemPool[] {
  const base: ItemPool[] = [
    { text: "獲取至少 3 個高權威行業媒體嘅報導或引用", textEn: "Obtain coverage or citations from at least 3 high-authority industry media", priority: "high" },
    { text: "建立作者簡歷頁面展示 E-E-A-T 信號", textEn: "Build author bio page demonstrating E-E-A-T signals", priority: "high" },
    { text: "喺維基百科或 Wikidata 建立品牌實體", textEn: "Create brand entity on Wikipedia or Wikidata", priority: "medium" },
    { text: "獲取客戶評價同推薦信", textEn: "Collect client testimonials and reviews", priority: "medium" },
    { text: "爭取喺行業報告或排名中被提及", textEn: "Seek mentions in industry reports or rankings", priority: "medium" },
  ];

  const extras: Record<IndustryCat, ItemPool[]> = {
    legal: [
      { text: "獲取法律期刊或媒體嘅專家引用", textEn: "Get expert citations in legal journals or media", priority: "high" },
      { text: "喺法律會議或研討會發表演講", textEn: "Speak at legal conferences or seminars", priority: "low" },
    ],
    medical: [
      { text: "喺醫學期刊發表研究或評論文章", textEn: "Publish research or reviews in medical journals", priority: "medium" },
      { text: "獲取醫學專業組織嘅認證或獎項", textEn: "Obtain certifications or awards from medical professional bodies", priority: "medium" },
    ],
    finance: [
      { text: "喺財經媒體（如《信報》）發表專欄文章", textEn: "Publish columns in financial media (e.g. HKEJ)", priority: "medium" },
      { text: "獲取金融監管機構認可嘅專業資格展示", textEn: "Display professional qualifications recognized by financial regulators", priority: "high" },
    ],
    tech: [
      { text: "參與科技媒體 podcast 或 webinar 訪問", textEn: "Participate in tech media podcasts or webinar interviews", priority: "medium" },
      { text: "喺 Stack Overflow 或技術社區建立專家信譽", textEn: "Build expert credibility on Stack Overflow or tech communities", priority: "low" },
    ],
    consulting: [
      { text: "出版行業白皮書或研究報告", textEn: "Publish industry whitepapers or research reports", priority: "medium" },
      { text: "喺商業媒體發表管理洞察文章", textEn: "Publish management insight articles in business media", priority: "medium" },
    ],
    property: [
      { text: "喺地產媒體發表市場分析文章", textEn: "Publish market analysis in property media", priority: "medium" },
      { text: "獲取地產代理專業認證", textEn: "Obtain professional property agent certifications", priority: "medium" },
    ],
    lifestyle: [
      { text: "邀請 KOL 或媒體做產品/服務體驗報導", textEn: "Invite KOLs or media for product/service experience coverage", priority: "medium" },
      { text: "參加行業大獎評選", textEn: "Enter industry award competitions", priority: "low" },
    ],
    creative: [
      { text: "提交作品參加國際設計/創意大獎", textEn: "Submit work for international design/creative awards", priority: "medium" },
      { text: "喺創意行業媒體發表專業文章", textEn: "Publish professional articles in creative industry media", priority: "low" },
    ],
    education: [
      { text: "獲取教育機構認證同資質", textEn: "Obtain educational institution accreditations", priority: "high" },
      { text: "同學校或政府教育部門建立合作關係", textEn: "Establish partnerships with schools or government education bodies", priority: "medium" },
    ],
    emerging: [
      { text: "喺行業峰會或 demo day 展示產品", textEn: "Showcase product at industry summits or demo days", priority: "medium" },
      { text: "獲取創投或加速器嘅背書", textEn: "Obtain endorsement from VCs or accelerators", priority: "medium" },
    ],
  };

  const picked = extras[cat] || extras.lifestyle;
  return [...base, ...picked];
}

function getMeasurementItems(_cat: IndustryCat, slug: string): ItemPool[] {
  const base: ItemPool[] = [
    { text: "設置 Google Analytics 4 追蹤網站流量來源", textEn: "Set up Google Analytics 4 to track website traffic sources", priority: "high" },
    { text: "定期（每週）喺主要 AI 平台測試品牌提及", textEn: "Regularly (weekly) test brand mentions on major AI platforms", priority: "high" },
    { text: "建立 AI 搜尋能見度評分基準", textEn: "Establish AI search visibility score baseline", priority: "medium" },
    { text: "追蹤 Schema Markup 驗證狀態", textEn: "Track Schema Markup validation status", priority: "medium" },
    { text: "記錄同分析 AI 搜尋帶來嘅轉化", textEn: "Record and analyze conversions from AI search", priority: "medium" },
  ];

  const idx = hash(slug, 5) % 3;
  const extras: ItemPool[][] = [
    [
      { text: "建立月度 AEO 表現報告模板", textEn: "Create monthly AEO performance report template", priority: "low" },
      { text: "設置自動化監測警報", textEn: "Set up automated monitoring alerts", priority: "low" },
    ],
    [
      { text: "比較 AI 搜尋同傳統搜尋嘅 ROI", textEn: "Compare AI search vs traditional search ROI", priority: "low" },
      { text: "追蹤競爭對手嘅 AI 能見度變化", textEn: "Track competitor AI visibility changes", priority: "medium" },
    ],
    [
      { text: "設置 Google Search Console 監測 AI Overview 流量", textEn: "Set up Google Search Console to monitor AI Overview traffic", priority: "medium" },
      { text: "建立客戶來源歸因追蹤系統", textEn: "Build customer source attribution tracking system", priority: "low" },
    ],
  ];

  return [...base, ...extras[idx]];
}

// --- FAQ generation per category ---
function getFaqs(cat: IndustryCat, industryName: string, industryNameEn: string): { faqs: [string, string][]; faqsEn: [string, string][] } {
  const baseFaqs: [string, string][] = [
    [`${industryName}行業點解需要 AEO checklist？`, `因為越來越多客戶用 AI 搜尋搵${industryName}服務。一份完整嘅 AEO checklist 幫你有系統噉提升 AI 搜尋能見度，唔會漏掉關鍵步驟。`],
    [`完成呢份 checklist 需要幾耐？`, `視乎你嘅起步情況。如果網站已有基礎，大約 2-4 週可完成高優先級項目。完整實施通常需要 1-3 個月。`],
    [`我應該先做邊啲項目？`, `先完成所有標記為「高優先級」嘅項目，特別係 Schema Markup 部署、Google Business Profile 優化同 AI 查詢測試。呢啲係基礎中嘅基礎。`],
    [`SurfIO 可以幫我完成呢份 checklist 嗎？`, `當然可以。SurfIO 提供免費嘅 AI 搜尋能見度審計，幫你評估目前嘅完成度同制定優先級計劃。預約免費審計即可開始。`],
  ];

  const baseFaqsEn: [string, string][] = [
    [`Why does the ${industryNameEn} industry need an AEO checklist?`, `Because more and more customers are using AI search to find ${industryNameEn} services. A comprehensive AEO checklist helps you systematically improve AI search visibility without missing critical steps.`],
    [`How long does it take to complete this checklist?`, `Depending on your starting point, you can complete high-priority items in about 2-4 weeks. Full implementation typically takes 1-3 months.`],
    [`Which items should I tackle first?`, `Start with all items marked as "High Priority," especially Schema Markup deployment, Google Business Profile optimization, and AI query testing. These are the absolute foundations.`],
    [`Can SurfIO help me complete this checklist?`, `Absolutely. SurfIO offers a free AI search visibility audit to assess your current completion level and create a priority plan. Book a free audit to get started.`],
  ];

  const catFaqs: Record<IndustryCat, { zh: [string, string]; en: [string, string] }> = {
    legal: { zh: [`法律行業嘅 AEO 有咩特別注意事項？`, `法律行業嘅 E-E-A-T 要求特別高。AI 搜尋引擎喺推薦法律服務時，非常重視律師嘅專業資格、執業經驗同行業認可。`], en: [`What are special AEO considerations for the legal industry?`, `E-E-A-T requirements are particularly high in the legal field. AI search engines place great emphasis on lawyers' qualifications, practice experience, and industry recognition when recommending legal services.`] },
    medical: { zh: [`醫療行業嘅 AI 搜尋有咩風險要注意？`, `AI 幻覺喺醫療領域特別危險。確保你嘅醫療資訊準確、有引用來源，並符合相關法規要求。`], en: [`What AI search risks should the medical industry watch for?`, `AI hallucinations are particularly dangerous in medicine. Ensure your medical information is accurate, properly sourced, and compliant with relevant regulations.`] },
    finance: { zh: [`金融行業嘅 AEO 需要特別注意合規嗎？`, `係。所有金融相關內容都要符合金融管理局嘅規定，包括風險披露同免責聲明。AI 搜尋結果中嘅不合規內容可能帶來法律風險。`], en: [`Does financial industry AEO require special compliance attention?`, `Yes. All financial content must comply with SFC/HKMA regulations, including risk disclosures and disclaimers. Non-compliant content in AI search results could pose legal risks.`] },
    tech: { zh: [`科技公司嘅 AEO 同其他行業有咩唔同？`, `科技公司通常有更多嘅技術內容可以結構化。利用 SoftwareApplication Schema 同詳細嘅功能比較表可以大幅提升 AI 推薦機會。`], en: [`How is AEO different for tech companies?`, `Tech companies typically have more technical content to structure. Using SoftwareApplication Schema and detailed feature comparison tables can significantly boost AI recommendation chances.`] },
    consulting: { zh: [`顧問公司點樣喺 AI 搜尋中展示專業知識？`, `建立系統化嘅方法論內容、案例研究同行業洞察。AI 搜尋引擎會將經常被引用嘅專業內容視為權威來源。`], en: [`How can consulting firms demonstrate expertise in AI search?`, `Build systematic methodology content, case studies, and industry insights. AI search engines treat frequently cited professional content as authoritative sources.`] },
    property: { zh: [`地產行業嘅本地 AEO 策略重要嗎？`, `非常重要。地產客戶嘅搜尋幾乎都係本地化嘅。優化本地 Schema、Google Maps 同地區關鍵字對 AI 推薦影響巨大。`], en: [`Is local AEO strategy important for the property industry?`, `Extremely important. Property client searches are almost always localized. Optimizing local Schema, Google Maps, and regional keywords has a huge impact on AI recommendations.`] },
    lifestyle: { zh: [`生活類服務嘅 AI 搜尋競爭大嗎？`, `好大。生活類服務嘅「附近推薦」AI 查詢量非常高。客戶評價、Google Business Profile 同本地引用係關鍵差異化因素。`], en: [`Is AI search competition fierce for lifestyle services?`, `Very much so. 'Nearby recommendations' AI queries for lifestyle services are extremely high volume. Customer reviews, Google Business Profile, and local citations are key differentiators.`] },
    creative: { zh: [`創意行業嘅 AEO 應該點做？`, `創意行業需要重點展示作品集同項目案例。利用 CreativeWork Schema 同高質素嘅視覺內容，令 AI 搜尋引擎理解你嘅風格同專長。`], en: [`How should creative industries approach AEO?`, `Creative industries need to focus on showcasing portfolios and project cases. Use CreativeWork Schema and high-quality visual content to help AI search engines understand your style and expertise.`] },
    education: { zh: [`教育機構做 AEO 有咩優勢？`, `教育機構天然擁有大量教育內容。將呢啲內容結構化（Course Schema）、加入可引用嘅事實同數據，就可以成為 AI 嘅權威引用來源。`], en: [`What advantages do educational institutions have in AEO?`, `Educational institutions naturally have abundant educational content. Structuring this content (Course Schema) and adding citable facts and data can make you an authoritative AI citation source.`] },
    emerging: { zh: [`新興行業嘅 AEO 機會係咪更大？`, `係。新興行業嘅 AI 搜尋內容往往不足，早期建立權威內容可以搶佔 AI 推薦嘅先機，比傳統 SEO 更快見效。`], en: [`Is the AEO opportunity greater for emerging industries?`, `Yes. AI search content for emerging industries is often insufficient. Building authoritative content early can seize first-mover advantage in AI recommendations, faster than traditional SEO.`] },
  };

  const extra = catFaqs[cat] || catFaqs.lifestyle;
  return {
    faqs: [...baseFaqs, extra.zh],
    faqsEn: [...baseFaqsEn, extra.en],
  };
}

// --- Related checklists (deterministic based on category) ---
function getRelated(slug: string, cat: IndustryCat, allSlugs: string[]): string[] {
  const sameCat = allSlugs.filter((s) => s !== slug && (CAT_MAP[s] ?? "lifestyle") === cat);
  const result: string[] = [];
  const h = hash(slug, 42);
  for (let i = 0; i < Math.min(3, sameCat.length); i++) {
    result.push(sameCat[(h + i) % sameCat.length]);
  }
  // Add one cross-category
  const others = allSlugs.filter((s) => s !== slug && !result.includes(s));
  if (others.length > 0) {
    result.push(others[h % others.length]);
  }
  return result;
}

// --- Main generator ---
export function getChecklistPages(): ChecklistPage[] {
  const allSlugs = ALL_INDUSTRIES.map((ind) => ind.slug);

  return ALL_INDUSTRIES.map((ind) => {
    const cat = getCat(ind.slug);
    const nameEn = INDUSTRY_EN[ind.slug] || ind.slug;
    const { faqs, faqsEn } = getFaqs(cat, ind.name, nameEn);

    return {
      slug: ind.slug,
      industryName: ind.name,
      industryNameEn: nameEn,
      metaTitle: `${ind.name} AEO Checklist | AI 搜尋優化清單 - SurfIO`,
      metaTitleEn: `${nameEn} AEO Checklist | AI Search Optimization - SurfIO`,
      metaDescription: `${ind.name}行業嘅完整 AEO checklist。涵蓋數碼存在、Schema Markup、AI 能見度、權威建設同衡量指標 5 大範疇，幫你有系統噉提升 AI 搜尋能見度。`,
      metaDescriptionEn: `Complete AEO checklist for the ${nameEn} industry. Covers 5 key areas: digital presence, Schema Markup, AI visibility, authority building, and measurement to systematically improve your AI search visibility.`,
      heroTitle: `${ind.name} AEO Checklist：AI 搜尋優化完整清單`,
      heroTitleEn: `${nameEn} AEO Checklist: Complete AI Search Optimization Guide`,
      categories: [
        {
          name: "數碼存在",
          nameEn: "Digital Presence",
          items: getDigitalPresenceItems(cat, ind.slug),
        },
        {
          name: "內容同 Schema",
          nameEn: "Content & Schema",
          items: getContentSchemaItems(cat, ind.slug),
        },
        {
          name: "AI 能見度",
          nameEn: "AI Visibility",
          items: getAiVisibilityItems(cat, ind.slug),
        },
        {
          name: "權威建設",
          nameEn: "Authority Building",
          items: getAuthorityItems(cat, ind.slug),
        },
        {
          name: "衡量指標",
          nameEn: "Measurement",
          items: getMeasurementItems(cat, ind.slug),
        },
      ],
      faqs,
      faqsEn,
      relatedChecklists: getRelated(ind.slug, cat, allSlugs),
    };
  });
}
