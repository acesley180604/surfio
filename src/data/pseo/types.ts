// ============================
// pSEO Type Definitions
// ============================

// --- Cluster A: Industry × Engine ---
export interface IndustryEngineData {
  slug: string;               // e.g. "律師行-perplexity" or "lawyers-perplexity"
  industrySlug: string;        // e.g. "lawyers"
  engineSlug: string;          // e.g. "perplexity"
  industryName: string;        // e.g. "律師行"
  engineName: string;          // e.g. "Perplexity"
  layout: "data-first" | "problem-driven" | "comparison" | "story" | "checklist";
  heroTitle: string;
  heroSubtitle: string;
  sections: IndustryEngineSection[];
  stats: { value: string; label: string }[];
  faqs: [string, string][];
  internalLinks: { label: string; path: string }[];
  metaTitle: string;
  metaDescription: string;
}

export interface IndustryEngineSection {
  type: "stats-box" | "problems" | "solutions" | "steps" | "checklist" | "comparison-table" | "case-study" | "narrative";
  title: string;
  content: string | string[];
  items?: { title: string; desc: string }[];
}

// --- Cluster B: Competitor ---
export type CompetitorPageType = "alternative" | "comparison" | "migration";

export interface CompetitorData {
  slug: string;                // e.g. "clearscope-替代方案"
  competitorName: string;
  competitorCategory: string;  // e.g. "SEO Tools"
  pageType: CompetitorPageType;
  layout: "data-first" | "problem-driven" | "comparison" | "story" | "checklist";
  heroTitle: string;
  heroSubtitle: string;
  comparisonPoints: { feature: string; competitor: string; surfio: string }[];
  advantages: string[];
  faqs: [string, string][];
  metaTitle: string;
  metaDescription: string;
}

// --- Cluster C: Location ---
export interface LocationData {
  slug: string;                // e.g. "中西區" or "central-western"
  locationName: string;
  locationType: "hk-district" | "gba-city" | "overseas";
  heroTitle: string;
  heroSubtitle: string;
  localContext: string;        // paragraphs about local business environment
  keyIndustries: string[];
  stats: { value: string; label: string }[];
  faqs: [string, string][];
  nearbyLocations: string[];   // slugs
  metaTitle: string;
  metaDescription: string;
}

// --- Cluster D: Educational/Guide ---
export interface GuideData {
  slug: string;                // e.g. "perplexity-排名因素"
  engineSlug: string;
  engineName: string;
  topicSlug: string;
  topicName: string;
  heroTitle: string;
  heroSubtitle: string;
  sections: GuideSection[];
  keyTakeaways: string[];
  faqs: [string, string][];
  relatedGuides: string[];     // slugs
  metaTitle: string;
  metaDescription: string;
}

export interface GuideSection {
  heading: string;
  content: string;
  items?: string[];
  tip?: string;
}

// --- Cluster E: Use Case ---
export interface UseCaseData {
  slug: string;                // e.g. "品牌監測"
  useCaseName: string;
  heroTitle: string;
  heroSubtitle: string;
  problemStatement: string;
  solutionOverview: string;
  steps: { title: string; desc: string }[];
  benefits: string[];
  faqs: [string, string][];
  relatedUseCases: string[];   // slugs
  metaTitle: string;
  metaDescription: string;
}

// --- Variation System ---
export type LayoutType = "data-first" | "problem-driven" | "comparison" | "story" | "checklist";

export const LAYOUT_TYPES: LayoutType[] = ["data-first", "problem-driven", "comparison", "story", "checklist"];

// Deterministic layout picker based on slug hash
export function pickLayout(slug: string): LayoutType {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = ((hash << 5) - hash) + slug.charCodeAt(i);
    hash |= 0;
  }
  return LAYOUT_TYPES[Math.abs(hash) % LAYOUT_TYPES.length];
}

// Deterministic variation picker
export function pickVariant(slug: string, variants: number): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = ((hash << 7) - hash) + slug.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % variants;
}

// --- Seed Data ---
export const AI_ENGINES = [
  { slug: "perplexity", name: "Perplexity" },
  { slug: "chatgpt", name: "ChatGPT" },
  { slug: "claude", name: "Claude" },
  { slug: "gemini", name: "Gemini" },
  { slug: "google-ai-overview", name: "Google AI Overview" },
  { slug: "copilot", name: "Copilot" },
  { slug: "bing-chat", name: "Bing Chat" },
] as const;

export const INDUSTRIES_TIER1 = [
  { slug: "personal-injury-lawyers", name: "人身傷害律師" },
  { slug: "immigration-lawyers", name: "移民律師" },
  { slug: "commercial-lawyers", name: "商業律師" },
  { slug: "ip-lawyers", name: "知識產權律師" },
  { slug: "family-lawyers", name: "家事律師" },
  { slug: "criminal-lawyers", name: "刑事律師" },
  { slug: "plastic-surgery", name: "整形外科" },
  { slug: "dermatology", name: "皮膚科" },
  { slug: "dentistry", name: "牙科" },
  { slug: "fertility", name: "生育科" },
  { slug: "psychiatry", name: "精神科" },
  { slug: "tcm", name: "中醫" },
  { slug: "wealth-management", name: "財富管理" },
  { slug: "tax-advisory", name: "稅務顧問" },
  { slug: "insurance", name: "保險" },
  { slug: "mortgage", name: "按揭" },
  { slug: "accounting", name: "會計師" },
  { slug: "fund-management", name: "基金" },
  { slug: "crm-software", name: "CRM 軟件" },
  { slug: "hr-systems", name: "HR 系統" },
  { slug: "cybersecurity", name: "網絡安全" },
  { slug: "marketing-automation", name: "營銷自動化" },
  { slug: "data-analytics", name: "數據分析" },
  { slug: "management-consulting", name: "管理顧問" },
  { slug: "corporate-training", name: "企業培訓" },
  { slug: "ma-advisory", name: "併購顧問" },
  { slug: "headhunting", name: "獵頭公司" },
  { slug: "commercial-real-estate", name: "商業地產" },
  { slug: "luxury-property", name: "豪宅" },
  { slug: "property-management", name: "物業管理" },
] as const;

export const INDUSTRIES_TIER2 = [
  { slug: "ecommerce-retail", name: "電商零售" },
  { slug: "education-tutoring", name: "教育補習" },
  { slug: "travel", name: "旅遊" },
  { slug: "hotel", name: "酒店" },
  { slug: "home-services", name: "家居服務" },
  { slug: "automotive", name: "汽車" },
  { slug: "recruitment", name: "招聘" },
  { slug: "event-planning", name: "活動策劃" },
  { slug: "architecture", name: "建築設計" },
  { slug: "renovation", name: "裝修" },
  { slug: "wedding-planning", name: "婚禮策劃" },
  { slug: "photography", name: "攝影" },
  { slug: "beauty", name: "美容" },
  { slug: "fitness", name: "健身" },
  { slug: "pet-services", name: "寵物" },
  { slug: "fnb", name: "餐飲" },
  { slug: "retail", name: "零售" },
  { slug: "logistics", name: "物流" },
  { slug: "printing", name: "印刷" },
  { slug: "advertising", name: "廣告" },
] as const;

export const INDUSTRIES_TIER3 = [
  { slug: "blockchain", name: "區塊鏈" },
  { slug: "cleantech", name: "清潔科技" },
  { slug: "biotech", name: "生物科技" },
  { slug: "drone-services", name: "無人機服務" },
  { slug: "coworking", name: "共享辦公" },
  { slug: "podcast-production", name: "播客製作" },
  { slug: "vr-ar", name: "VR/AR" },
  { slug: "elderly-care", name: "安老服務" },
  { slug: "music-production", name: "音樂製作" },
  { slug: "food-tech", name: "食品科技" },
  { slug: "smart-home", name: "智能家居" },
  { slug: "sustainability-consulting", name: "可持續發展顧問" },
  { slug: "esports", name: "電競" },
  { slug: "online-therapy", name: "網上心理治療" },
  { slug: "language-school", name: "語言學校" },
  { slug: "vertical-farming", name: "垂直農業" },
  { slug: "carbon-trading", name: "碳交易" },
  { slug: "pet-tech", name: "寵物科技" },
  { slug: "sleep-tech", name: "睡眠科技" },
  { slug: "childcare", name: "托兒服務" },
] as const;

export const ALL_INDUSTRIES = [...INDUSTRIES_TIER1, ...INDUSTRIES_TIER2, ...INDUSTRIES_TIER3];

export const HK_DISTRICTS = [
  { slug: "central-western", name: "中西區" },
  { slug: "wan-chai", name: "灣仔" },
  { slug: "eastern", name: "東區" },
  { slug: "southern", name: "南區" },
  { slug: "yau-tsim-mong", name: "油尖旺" },
  { slug: "sham-shui-po", name: "深水埗" },
  { slug: "kowloon-city", name: "九龍城" },
  { slug: "wong-tai-sin", name: "黃大仙" },
  { slug: "kwun-tong", name: "觀塘" },
  { slug: "kwai-tsing", name: "葵青" },
  { slug: "tsuen-wan", name: "荃灣" },
  { slug: "tuen-mun", name: "屯門" },
  { slug: "yuen-long", name: "元朗" },
  { slug: "north", name: "北區" },
  { slug: "tai-po", name: "大埔" },
  { slug: "sha-tin", name: "沙田" },
  { slug: "sai-kung", name: "西貢" },
  { slug: "islands", name: "離島" },
] as const;

export const GBA_CITIES = [
  { slug: "shenzhen", name: "深圳" },
  { slug: "guangzhou", name: "廣州" },
  { slug: "zhuhai", name: "珠海" },
  { slug: "foshan", name: "佛山" },
  { slug: "dongguan", name: "東莞" },
  { slug: "zhongshan", name: "中山" },
  { slug: "huizhou", name: "惠州" },
  { slug: "jiangmen", name: "江門" },
  { slug: "zhaoqing", name: "肇慶" },
  { slug: "macau", name: "澳門" },
] as const;

export const OVERSEAS_CITIES = [
  { slug: "vancouver", name: "溫哥華" },
  { slug: "toronto", name: "多倫多" },
  { slug: "san-francisco", name: "三藩市" },
  { slug: "los-angeles", name: "洛杉磯" },
  { slug: "new-york", name: "紐約" },
  { slug: "sydney", name: "悉尼" },
  { slug: "melbourne", name: "墨爾本" },
  { slug: "london", name: "倫敦" },
  { slug: "manchester", name: "曼徹斯特" },
  { slug: "singapore", name: "新加坡" },
  { slug: "kuala-lumpur", name: "吉隆坡" },
] as const;

export const GUIDE_TOPICS = [
  { slug: "ranking", topicName: "排名方法" },
  { slug: "ranking-factors", topicName: "排名因素分析" },
  { slug: "citation-sources", topicName: "引用來源研究" },
  { slug: "why-not-cited", topicName: "點解唔引用你" },
  { slug: "vs-google", topicName: "同 Google 比較" },
  { slug: "checklist", topicName: "優化 Checklist" },
  { slug: "content-types", topicName: "內容類型優化" },
  { slug: "tracking", topicName: "引用追蹤" },
  { slug: "algorithm-updates", topicName: "演算法更新" },
  { slug: "eeat", topicName: "E-E-A-T 要求" },
  { slug: "structured-data", topicName: "結構化數據" },
  { slug: "b2b-vs-b2c", topicName: "B2B vs B2C 策略" },
  { slug: "local-search", topicName: "本地搜尋" },
  { slug: "visual-content", topicName: "圖片影片引用" },
  { slug: "future-predictions", topicName: "未來預測" },
] as const;

export const USE_CASES = [
  { slug: "brand-monitoring", name: "品牌監測" },
  { slug: "lead-generation", name: "潛在客戶開發" },
  { slug: "content-strategy", name: "內容策略" },
  { slug: "competitor-analysis", name: "競爭對手分析" },
  { slug: "reputation-management", name: "聲譽管理" },
  { slug: "product-launch", name: "產品發佈" },
  { slug: "thought-leadership", name: "思想領袖建設" },
  { slug: "local-visibility", name: "本地能見度" },
  { slug: "crisis-management", name: "危機管理" },
  { slug: "investor-relations", name: "投資者關係" },
  { slug: "recruitment-branding", name: "招聘品牌" },
  { slug: "customer-education", name: "客戶教育" },
  { slug: "market-expansion", name: "市場擴展" },
  { slug: "partner-ecosystem", name: "合作夥伴生態" },
  { slug: "ai-readiness-audit", name: "AI 準備度審計" },
  { slug: "schema-implementation", name: "Schema 實施" },
  { slug: "entity-building", name: "實體建設" },
  { slug: "citation-building", name: "引用建設" },
  { slug: "knowledge-graph", name: "知識圖譜優化" },
  { slug: "voice-search", name: "語音搜尋優化" },
] as const;

export const COMPETITORS_SEO_AGENCIES = [
  "Siege Media", "Animalz", "Grow & Convert", "Optimist", "Codeless",
  "Foundation", "Omniscient", "Beam", "Single Grain", "Neil Patel",
  "Backlinko", "Authority Hacker", "Content Harmony", "Fractl", "Stacker",
] as const;

export const COMPETITORS_SEO_TOOLS = [
  "Clearscope", "Surfer SEO", "MarketMuse", "Frase", "Ahrefs",
  "Semrush", "Moz", "Screaming Frog", "Sitebulb", "Majestic",
  "SpyFu", "Serpstat", "Mangools", "Ubersuggest", "AnswerThePublic",
] as const;

export const COMPETITORS_AI_TOOLS = [
  "Jasper", "Copy.ai", "Writer", "Writesonic", "Rytr",
  "Anyword", "Scalenut", "GrowthBar", "Outranking", "NeuralText",
  "Dashword", "Letterdrop", "LongShot", "Kafkai", "Article Forge",
] as const;

export const COMPETITORS_CONTENT_PLATFORMS = [
  "Contently", "Skyword", "Uberflip", "PathFactory", "Acrolinx",
  "Siteimprove", "DivvyHQ", "CoSchedule", "Seismic", "Showpad",
] as const;

export const COMPETITORS_DIGITAL_PR = [
  "JustReachOut", "Prowly", "Muck Rack", "Cision", "Meltwater",
  "Newswire", "PRWeb", "Business Wire", "Prezly", "Brand24",
] as const;

export const ALL_COMPETITORS = [
  ...COMPETITORS_SEO_AGENCIES.map(c => ({ name: c, category: "SEO Agency" })),
  ...COMPETITORS_SEO_TOOLS.map(c => ({ name: c, category: "SEO Tools" })),
  ...COMPETITORS_AI_TOOLS.map(c => ({ name: c, category: "AI Content Tools" })),
  ...COMPETITORS_CONTENT_PLATFORMS.map(c => ({ name: c, category: "Content Platforms" })),
  ...COMPETITORS_DIGITAL_PR.map(c => ({ name: c, category: "Digital PR" })),
];
