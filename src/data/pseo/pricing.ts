// ============================
// Cluster I: Pricing Pages
// 39 location-based pricing pages
// (18 HK + 10 GBA + 11 Overseas)
// ============================

import { HK_DISTRICTS, GBA_CITIES, OVERSEAS_CITIES } from "./types";

export interface PricingPackage {
  name: string;
  nameEn: string;
  price: string;
  features: string[];
  featuresEn: string[];
  recommended: boolean;
}

export interface PricingData {
  slug: string;
  locationName: string;
  locationNameEn: string;
  region: "hk" | "gba" | "overseas";
  currency: string;
  packages: PricingPackage[];
  marketContext: string;
  marketContextEn: string;
  faqs: [string, string][];
  faqsEn: [string, string][];
  metaTitle: string;
  metaTitleEn: string;
  metaDescription: string;
  metaDescriptionEn: string;
}

// --- Package templates ---
const HK_PACKAGES: PricingPackage[] = [
  {
    name: "Starter 入門版",
    nameEn: "Starter",
    price: "HKD 8,800",
    features: [
      "AI 搜尋能見度審計報告",
      "3 個 AI 平台監測（ChatGPT、Perplexity、Google AI Overview）",
      "基礎 Schema Markup 部署",
      "月度報告（1 份）",
      "5 個目標關鍵字優化",
      "電郵支援",
    ],
    featuresEn: [
      "AI search visibility audit report",
      "3 AI platform monitoring (ChatGPT, Perplexity, Google AI Overview)",
      "Basic Schema Markup deployment",
      "Monthly report (1)",
      "5 target keyword optimization",
      "Email support",
    ],
    recommended: false,
  },
  {
    name: "Professional 專業版",
    nameEn: "Professional",
    price: "HKD 28,800",
    features: [
      "全面 AI 搜尋能見度審計",
      "6 個 AI 平台監測（全覆蓋）",
      "完整 Schema Markup 部署",
      "每週報告 + 月度策略會議",
      "20 個目標關鍵字優化",
      "內容 AEO 優化（10 頁）",
      "競爭對手 AI 能見度分析",
      "專屬客戶經理",
      "優先支援",
    ],
    featuresEn: [
      "Comprehensive AI search visibility audit",
      "6 AI platform monitoring (full coverage)",
      "Complete Schema Markup deployment",
      "Weekly reports + monthly strategy meetings",
      "20 target keyword optimization",
      "Content AEO optimization (10 pages)",
      "Competitor AI visibility analysis",
      "Dedicated account manager",
      "Priority support",
    ],
    recommended: true,
  },
  {
    name: "Enterprise 企業版",
    nameEn: "Enterprise",
    price: "HKD 68,800",
    features: [
      "全方位 AI 搜尋能見度策略",
      "所有主要 AI 平台監測",
      "高級 Schema + 知識圖譜優化",
      "每週報告 + 每週策略會議",
      "無限目標關鍵字",
      "內容 AEO 優化（30+ 頁）",
      "全面競爭分析 + 行業基準",
      "品牌實體建設",
      "AI 危機監測同應對",
      "專屬團隊（PM + 策略師）",
      "24/7 支援",
      "季度管理層報告",
    ],
    featuresEn: [
      "Full AI search visibility strategy",
      "All major AI platform monitoring",
      "Advanced Schema + Knowledge Graph optimization",
      "Weekly reports + weekly strategy meetings",
      "Unlimited target keywords",
      "Content AEO optimization (30+ pages)",
      "Comprehensive competitive analysis + industry benchmarks",
      "Brand entity building",
      "AI crisis monitoring and response",
      "Dedicated team (PM + Strategist)",
      "24/7 support",
      "Quarterly executive reports",
    ],
    recommended: false,
  },
];

const GBA_PACKAGES: PricingPackage[] = [
  {
    name: "Starter 入門版",
    nameEn: "Starter",
    price: "RMB 6,800",
    features: [
      "AI 搜尋能見度審計報告",
      "3 個 AI 平台監測（ChatGPT、百度 AI、Google AI Overview）",
      "基礎 Schema Markup 部署",
      "月度報告（1 份）",
      "5 個目標關鍵字優化",
      "中英文雙語基礎優化",
      "電郵支援",
    ],
    featuresEn: [
      "AI search visibility audit report",
      "3 AI platform monitoring (ChatGPT, Baidu AI, Google AI Overview)",
      "Basic Schema Markup deployment",
      "Monthly report (1)",
      "5 target keyword optimization",
      "Basic bilingual (CN/EN) optimization",
      "Email support",
    ],
    recommended: false,
  },
  {
    name: "Professional 專業版",
    nameEn: "Professional",
    price: "RMB 22,800",
    features: [
      "全面 AI 搜尋能見度審計",
      "6+ AI 平台監測（含百度 AI）",
      "完整 Schema Markup 部署",
      "每週報告 + 月度策略會議",
      "20 個目標關鍵字優化",
      "中英文雙語內容 AEO 優化（10 頁）",
      "跨境 AI 搜尋策略",
      "競爭對手分析",
      "專屬客戶經理",
    ],
    featuresEn: [
      "Comprehensive AI search visibility audit",
      "6+ AI platform monitoring (incl. Baidu AI)",
      "Complete Schema Markup deployment",
      "Weekly reports + monthly strategy meetings",
      "20 target keyword optimization",
      "Bilingual content AEO optimization (10 pages)",
      "Cross-border AI search strategy",
      "Competitor analysis",
      "Dedicated account manager",
    ],
    recommended: true,
  },
  {
    name: "Enterprise 企業版",
    nameEn: "Enterprise",
    price: "RMB 52,800",
    features: [
      "全方位跨境 AI 搜尋策略",
      "所有中國同國際 AI 平台監測",
      "高級 Schema + 知識圖譜優化",
      "每週報告 + 每週策略會議",
      "無限目標關鍵字",
      "中英文雙語內容優化（30+ 頁）",
      "全面跨境競爭分析",
      "品牌實體建設（中國 + 國際）",
      "專屬團隊",
      "24/7 支援",
    ],
    featuresEn: [
      "Full cross-border AI search strategy",
      "All China and international AI platform monitoring",
      "Advanced Schema + Knowledge Graph optimization",
      "Weekly reports + weekly strategy meetings",
      "Unlimited target keywords",
      "Bilingual content optimization (30+ pages)",
      "Comprehensive cross-border competitive analysis",
      "Brand entity building (China + International)",
      "Dedicated team",
      "24/7 support",
    ],
    recommended: false,
  },
];

function makeOverseasPackages(currency: string, prices: [string, string, string]): PricingPackage[] {
  return [
    {
      name: "Starter 入門版",
      nameEn: "Starter",
      price: `${currency} ${prices[0]}`,
      features: [
        "AI 搜尋能見度審計報告",
        "3 個 AI 平台監測",
        "基礎 Schema Markup 部署",
        "月度報告",
        "5 個目標關鍵字優化",
        "中英文雙語基礎優化",
        "電郵支援",
      ],
      featuresEn: [
        "AI search visibility audit report",
        "3 AI platform monitoring",
        "Basic Schema Markup deployment",
        "Monthly report",
        "5 target keyword optimization",
        "Basic bilingual (CN/EN) optimization",
        "Email support",
      ],
      recommended: false,
    },
    {
      name: "Professional 專業版",
      nameEn: "Professional",
      price: `${currency} ${prices[1]}`,
      features: [
        "全面 AI 搜尋能見度審計",
        "6 個 AI 平台監測",
        "完整 Schema Markup 部署",
        "每週報告 + 月度策略會議",
        "20 個目標關鍵字優化",
        "中英文雙語內容 AEO 優化（10 頁）",
        "本地 + 華人社區 AI 搜尋策略",
        "競爭對手分析",
        "專屬客戶經理",
      ],
      featuresEn: [
        "Comprehensive AI search visibility audit",
        "6 AI platform monitoring",
        "Complete Schema Markup deployment",
        "Weekly reports + monthly strategy meetings",
        "20 target keyword optimization",
        "Bilingual content AEO optimization (10 pages)",
        "Local + Chinese community AI search strategy",
        "Competitor analysis",
        "Dedicated account manager",
      ],
      recommended: true,
    },
    {
      name: "Enterprise 企業版",
      nameEn: "Enterprise",
      price: `${currency} ${prices[2]}`,
      features: [
        "全方位雙語 AI 搜尋策略",
        "所有主要 AI 平台監測",
        "高級 Schema + 知識圖譜優化",
        "每週報告 + 每週策略會議",
        "無限目標關鍵字",
        "中英文雙語內容優化（30+ 頁）",
        "全面競爭分析",
        "品牌實體建設",
        "專屬團隊",
        "24/7 支援",
      ],
      featuresEn: [
        "Full bilingual AI search strategy",
        "All major AI platform monitoring",
        "Advanced Schema + Knowledge Graph optimization",
        "Weekly reports + weekly strategy meetings",
        "Unlimited target keywords",
        "Bilingual content optimization (30+ pages)",
        "Comprehensive competitive analysis",
        "Brand entity building",
        "Dedicated team",
        "24/7 support",
      ],
      recommended: false,
    },
  ];
}

// --- Overseas city pricing config ---
const OVERSEAS_PRICING: Record<string, { currency: string; prices: [string, string, string] }> = {
  vancouver:       { currency: "CAD", prices: ["1,580", "4,980", "11,800"] },
  toronto:         { currency: "CAD", prices: ["1,580", "4,980", "11,800"] },
  "san-francisco": { currency: "USD", prices: ["1,280", "3,980", "9,800"] },
  "los-angeles":   { currency: "USD", prices: ["1,280", "3,980", "9,800"] },
  "new-york":      { currency: "USD", prices: ["1,280", "3,980", "9,800"] },
  sydney:          { currency: "AUD", prices: ["1,880", "5,980", "13,800"] },
  melbourne:       { currency: "AUD", prices: ["1,880", "5,980", "13,800"] },
  london:          { currency: "GBP", prices: ["980", "3,280", "7,800"] },
  manchester:      { currency: "GBP", prices: ["980", "3,280", "7,800"] },
  singapore:       { currency: "SGD", prices: ["1,680", "5,280", "12,800"] },
  "kuala-lumpur":  { currency: "MYR", prices: ["4,800", "15,800", "36,800"] },
};

// --- Location name EN mapping ---
const LOCATION_NAME_EN: Record<string, string> = {
  // HK Districts
  "central-western": "Central & Western",
  "wan-chai": "Wan Chai",
  eastern: "Eastern",
  southern: "Southern",
  "yau-tsim-mong": "Yau Tsim Mong",
  "sham-shui-po": "Sham Shui Po",
  "kowloon-city": "Kowloon City",
  "wong-tai-sin": "Wong Tai Sin",
  "kwun-tong": "Kwun Tong",
  "kwai-tsing": "Kwai Tsing",
  "tsuen-wan": "Tsuen Wan",
  "tuen-mun": "Tuen Mun",
  "yuen-long": "Yuen Long",
  north: "North District",
  "tai-po": "Tai Po",
  "sha-tin": "Sha Tin",
  "sai-kung": "Sai Kung",
  islands: "Islands",
  // GBA Cities
  shenzhen: "Shenzhen",
  guangzhou: "Guangzhou",
  zhuhai: "Zhuhai",
  foshan: "Foshan",
  dongguan: "Dongguan",
  zhongshan: "Zhongshan",
  huizhou: "Huizhou",
  jiangmen: "Jiangmen",
  zhaoqing: "Zhaoqing",
  macau: "Macau",
  // Overseas
  vancouver: "Vancouver",
  toronto: "Toronto",
  "san-francisco": "San Francisco",
  "los-angeles": "Los Angeles",
  "new-york": "New York",
  sydney: "Sydney",
  melbourne: "Melbourne",
  london: "London",
  manchester: "Manchester",
  singapore: "Singapore",
  "kuala-lumpur": "Kuala Lumpur",
};

// --- Market context by region ---
function hkMarketContext(name: string): string {
  return `${name}嘅企業正面臨 AI 搜尋帶來嘅營銷革命。越來越多消費者同企業客戶用 ChatGPT、Perplexity 同 Google AI Overview 搵服務同產品。如果你嘅品牌唔喺 AI 搜尋結果入面，你對呢批潛在客戶來講就係隱形嘅。\n\nSurfIO 為${name}嘅企業提供度身訂造嘅 AEO 服務方案。我哋嘅團隊了解${name}嘅商業環境同行業特點，制定最有效嘅 AI 搜尋優化策略。所有方案都包括免費嘅初始 AI 搜尋能見度審計。`;
}

function hkMarketContextEn(name: string): string {
  return `Businesses in ${name} are facing a marketing revolution driven by AI search. More consumers and business clients are using ChatGPT, Perplexity, and Google AI Overview to find services and products. If your brand is absent from AI search results, you are invisible to these potential customers.\n\nSurfIO provides tailored AEO service packages for ${name} businesses. Our team understands ${name}'s business environment and industry characteristics to develop the most effective AI search optimization strategies. All packages include a complimentary initial AI search visibility audit.`;
}

function gbaMarketContext(name: string): string {
  return `${name}嘅企業需要同時面對中國同國際嘅 AI 搜尋市場。百度 AI、ChatGPT 同 Google AI Overview 嘅多平台挑戰要求企業採用跨境 AEO 策略。\n\nSurfIO 為${name}企業提供中英文雙語 AEO 服務，幫你同時觸及中國同國際市場嘅 AI 搜尋用戶。我哋嘅跨境策略特別適合${name}嘅外向型企業。`;
}

function gbaMarketContextEn(name: string): string {
  return `Businesses in ${name} need to address both Chinese and international AI search markets. The multi-platform challenge of Baidu AI, ChatGPT, and Google AI Overview requires cross-border AEO strategies.\n\nSurfIO provides bilingual (Chinese/English) AEO services for ${name} businesses, helping you reach AI search users in both Chinese and international markets. Our cross-border strategy is particularly suited for ${name}'s export-oriented enterprises.`;
}

function overseasMarketContext(name: string): string {
  return `${name}嘅華人社區龐大，華人企業需要同時喺中英文 AI 搜尋引擎建立存在感。當華人消費者用 ChatGPT 搵「${name}華人推薦」相關嘅服務，你嘅品牌需要被推薦。\n\nSurfIO 為${name}嘅華人企業提供雙語 AEO 服務，幫你觸及華人同本地客群。我哋了解海外華人市場嘅獨特需求，提供最切合嘅 AI 搜尋優化方案。`;
}

function overseasMarketContextEn(name: string): string {
  return `${name} has a large Chinese community, and Chinese businesses need bilingual visibility in AI search engines. When Chinese consumers use ChatGPT to find "${name} Chinese-recommended" services, your brand needs to appear.\n\nSurfIO provides bilingual AEO services for Chinese businesses in ${name}, helping you reach both Chinese and local audiences. We understand the unique needs of the overseas Chinese market and provide the most relevant AI search optimization solutions.`;
}

// --- FAQ pools ---
function hkFaqs(name: string): [string, string][] {
  return [
    [`${name}嘅 AEO 服務包啲咩？`, `所有方案都包括 AI 搜尋能見度審計、Schema Markup 部署、AI 平台監測同定期報告。Professional 同 Enterprise 方案仲包括內容 AEO 優化、競爭分析同專屬客戶經理。`],
    [`SurfIO 嘅定價同其他 AEO 服務比較點？`, `SurfIO 嘅定價喺業界屬於中高端，但我哋嘅 ROI 表現優秀——客戶平均獲得 5.8 倍嘅投資回報。我哋係香港唯一專注 AEO 嘅科學園培育企業。`],
    [`可以先試用再決定嗎？`, `可以。我哋提供免費嘅 AI 搜尋能見度審計，你可以先了解自己嘅品牌喺 AI 搜尋中嘅表現再決定。預約免費審計唔需要任何承諾。`],
    [`合約期幾長？`, `Starter 方案可以按月付費，Professional 建議 3 個月起步（因為 AEO 效果需要時間累積），Enterprise 建議 6-12 個月。所有方案冇強制續約。`],
  ];
}

function hkFaqsEn(name: string): [string, string][] {
  return [
    [`What's included in AEO services for ${name}?`, `All plans include AI search visibility audit, Schema Markup deployment, AI platform monitoring, and regular reports. Professional and Enterprise plans also include content AEO optimization, competitive analysis, and a dedicated account manager.`],
    [`How does SurfIO's pricing compare to other AEO services?`, `SurfIO's pricing is mid-to-premium in the industry, but our ROI performance is excellent — clients achieve an average 5.8x return on investment. We are Hong Kong's only AEO-focused HKSTP-incubated company.`],
    [`Can I try before committing?`, `Yes. We offer a free AI search visibility audit so you can understand your brand's AI search performance first. Booking a free audit requires no commitment.`],
    [`How long are contracts?`, `Starter plans are month-to-month, Professional is recommended for 3+ months (AEO results take time), Enterprise is recommended for 6-12 months. No forced renewals on any plan.`],
  ];
}

function gbaFaqs(name: string): [string, string][] {
  return [
    [`${name}企業嘅跨境 AEO 方案包啲咩？`, `跨境方案包括中英文雙語優化、百度 AI + 國際 AI 平台監測、跨境 Schema 部署同跨境競爭分析。適合需要觸及香港同國際市場嘅${name}企業。`],
    [`定價以人民幣計算嗎？`, `係。大灣區客戶嘅定價以人民幣計算。我哋亦接受港幣付款，按當日匯率換算。`],
    [`SurfIO 可以遠程服務${name}嗎？`, `可以。我哋透過線上會議同報告系統服務大灣區所有城市嘅企業。如有需要亦可安排上門會議。`],
  ];
}

function gbaFaqsEn(name: string): [string, string][] {
  return [
    [`What's included in cross-border AEO for ${name}?`, `Cross-border plans include bilingual optimization, Baidu AI + international AI platform monitoring, cross-border Schema deployment, and cross-border competitive analysis. Ideal for ${name} businesses targeting HK and international markets.`],
    [`Is pricing in RMB?`, `Yes. GBA client pricing is in RMB. We also accept HKD payments at the day's exchange rate.`],
    [`Can SurfIO serve ${name} remotely?`, `Yes. We serve all GBA cities via online meetings and reporting systems. On-site meetings can be arranged if needed.`],
  ];
}

function overseasFaqs(name: string): [string, string][] {
  return [
    [`SurfIO 可以服務${name}嘅企業嗎？`, `當然可以。我哋透過線上服務全球華人市場。${name}嘅企業可以預約免費嘅 AI 搜尋能見度審計。所有會議同溝通可以用廣東話、普通話或英文進行。`],
    [`${name}嘅華人企業做 AEO 有咩優勢？`, `${name}嘅華人企業可以利用雙語優勢同時觸及華人同本地客群。AEO 唔受地理限制，你可以喺兩個市場同時建立 AI 搜尋存在感。`],
    [`定價以咩貨幣計算？`, `${name}客戶嘅定價以當地貨幣計算。我哋亦接受港幣同美元付款。`],
  ];
}

function overseasFaqsEn(name: string): [string, string][] {
  return [
    [`Can SurfIO serve businesses in ${name}?`, `Absolutely. We serve the global Chinese market online. ${name} businesses can book a free AI search visibility audit. All meetings and communication can be in Cantonese, Mandarin, or English.`],
    [`What advantages do Chinese businesses in ${name} have for AEO?`, `Chinese businesses in ${name} can leverage bilingual advantages to reach both Chinese and local audiences simultaneously. AEO is not geographically limited — you can build AI search presence in both markets.`],
    [`What currency is pricing in?`, `Pricing for ${name} clients is in local currency. We also accept HKD and USD payments.`],
  ];
}

// --- Main generator ---
export function getPricingPages(): PricingData[] {
  const pages: PricingData[] = [];

  // HK Districts
  for (const district of HK_DISTRICTS) {
    const nameEn = LOCATION_NAME_EN[district.slug] || district.slug;
    pages.push({
      slug: district.slug,
      locationName: district.name,
      locationNameEn: nameEn,
      region: "hk",
      currency: "HKD",
      packages: HK_PACKAGES,
      marketContext: hkMarketContext(district.name),
      marketContextEn: hkMarketContextEn(nameEn),
      faqs: hkFaqs(district.name),
      faqsEn: hkFaqsEn(nameEn),
      metaTitle: `${district.name} AEO 服務定價 | AI 搜尋優化收費 - SurfIO`,
      metaTitleEn: `${nameEn} AEO Service Pricing | AI Search Optimization - SurfIO`,
      metaDescription: `SurfIO 為${district.name}企業提供 AEO 服務方案，由 HKD 8,800 起。包括 AI 搜尋審計、Schema 部署同監測報告。免費初始審計。`,
      metaDescriptionEn: `SurfIO AEO service packages for ${nameEn} businesses, starting from HKD 8,800. Includes AI search audit, Schema deployment, and monitoring. Free initial audit.`,
    });
  }

  // GBA Cities
  for (const city of GBA_CITIES) {
    const nameEn = LOCATION_NAME_EN[city.slug] || city.slug;
    pages.push({
      slug: city.slug,
      locationName: city.name,
      locationNameEn: nameEn,
      region: "gba",
      currency: "RMB",
      packages: GBA_PACKAGES,
      marketContext: gbaMarketContext(city.name),
      marketContextEn: gbaMarketContextEn(nameEn),
      faqs: gbaFaqs(city.name),
      faqsEn: gbaFaqsEn(nameEn),
      metaTitle: `${city.name} AEO 服務定價 | 跨境 AI 搜尋優化 - SurfIO`,
      metaTitleEn: `${nameEn} AEO Service Pricing | Cross-Border AI Search - SurfIO`,
      metaDescription: `SurfIO 為${city.name}企業提供跨境 AEO 服務，由 RMB 6,800 起。中英文雙語優化，觸及國際市場。`,
      metaDescriptionEn: `SurfIO cross-border AEO services for ${nameEn} businesses, starting from RMB 6,800. Bilingual optimization for international markets.`,
    });
  }

  // Overseas Cities
  for (const city of OVERSEAS_CITIES) {
    const nameEn = LOCATION_NAME_EN[city.slug] || city.slug;
    const config = OVERSEAS_PRICING[city.slug];
    if (!config) continue;
    const packages = makeOverseasPackages(config.currency, config.prices);
    pages.push({
      slug: city.slug,
      locationName: city.name,
      locationNameEn: nameEn,
      region: "overseas",
      currency: config.currency,
      packages,
      marketContext: overseasMarketContext(city.name),
      marketContextEn: overseasMarketContextEn(nameEn),
      faqs: overseasFaqs(city.name),
      faqsEn: overseasFaqsEn(nameEn),
      metaTitle: `${city.name} AEO 服務定價 | 華人企業 AI 搜尋優化 - SurfIO`,
      metaTitleEn: `${nameEn} AEO Service Pricing | Chinese Business AI Search - SurfIO`,
      metaDescription: `SurfIO 為${city.name}華人企業提供雙語 AEO 服務，由 ${config.currency} ${config.prices[0]} 起。中英文 AI 搜尋優化。`,
      metaDescriptionEn: `SurfIO bilingual AEO services for Chinese businesses in ${nameEn}, from ${config.currency} ${config.prices[0]}. Chinese-English AI search optimization.`,
    });
  }

  return pages;
}
