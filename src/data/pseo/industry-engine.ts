import {
  type IndustryEngineData,
  type IndustryEngineSection,
  type LayoutType,
  ALL_INDUSTRIES,
  AI_ENGINES,
  pickLayout,
  pickVariant,
} from "./types";

// ============================
// Deterministic sub-variant picker (seeded from slug + offset)
// ============================
function subVariant(slug: string, offset: number, pool: number): number {
  let hash = offset * 31;
  for (let i = 0; i < slug.length; i++) {
    hash = ((hash << 5) - hash + offset * 7) + slug.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % pool;
}

// ============================
// Industry category mapping for industry-specific content
// ============================
type IndustryCategory =
  | "legal"
  | "medical"
  | "finance"
  | "tech"
  | "consulting"
  | "property"
  | "lifestyle"
  | "creative"
  | "education"
  | "emerging";

const INDUSTRY_CATEGORY_MAP: Record<string, IndustryCategory> = {
  "personal-injury-lawyers": "legal",
  "immigration-lawyers": "legal",
  "commercial-lawyers": "legal",
  "ip-lawyers": "legal",
  "family-lawyers": "legal",
  "criminal-lawyers": "legal",
  "plastic-surgery": "medical",
  "dermatology": "medical",
  "dentistry": "medical",
  "fertility": "medical",
  "psychiatry": "medical",
  "tcm": "medical",
  "wealth-management": "finance",
  "tax-advisory": "finance",
  "insurance": "finance",
  "mortgage": "finance",
  "accounting": "finance",
  "fund-management": "finance",
  "crm-software": "tech",
  "hr-systems": "tech",
  "cybersecurity": "tech",
  "marketing-automation": "tech",
  "data-analytics": "tech",
  "management-consulting": "consulting",
  "corporate-training": "consulting",
  "ma-advisory": "consulting",
  "headhunting": "consulting",
  "commercial-real-estate": "property",
  "luxury-property": "property",
  "property-management": "property",
  "ecommerce-retail": "lifestyle",
  "education-tutoring": "education",
  "travel": "lifestyle",
  "hotel": "lifestyle",
  "home-services": "lifestyle",
  "automotive": "lifestyle",
  "recruitment": "consulting",
  "event-planning": "creative",
  "architecture": "creative",
  "renovation": "lifestyle",
  "wedding-planning": "creative",
  "photography": "creative",
  "beauty": "lifestyle",
  "fitness": "lifestyle",
  "pet-services": "lifestyle",
  "fnb": "lifestyle",
  "retail": "lifestyle",
  "logistics": "tech",
  "printing": "lifestyle",
  "advertising": "creative",
  "blockchain": "emerging",
  "cleantech": "emerging",
  "biotech": "emerging",
  "drone-services": "emerging",
  "coworking": "property",
  "podcast-production": "creative",
  "vr-ar": "emerging",
  "elderly-care": "medical",
  "music-production": "creative",
  "food-tech": "emerging",
  "smart-home": "emerging",
  "sustainability-consulting": "consulting",
  "esports": "emerging",
  "online-therapy": "medical",
  "language-school": "education",
  "vertical-farming": "emerging",
  "carbon-trading": "emerging",
  "pet-tech": "emerging",
  "sleep-tech": "emerging",
  "childcare": "education",
};

function getCategory(industrySlug: string): IndustryCategory {
  return INDUSTRY_CATEGORY_MAP[industrySlug] ?? "lifestyle";
}

// ============================
// Engine traits for engine-specific content
// ============================
interface EngineTrait {
  citationType: string;
  userBehavior: string;
  strengthArea: string;
  weakness: string;
  audienceProfile: string;
  updateFreq: string;
  contentPref: string;
}

const ENGINE_TRAITS: Record<string, EngineTrait> = {
  perplexity: {
    citationType: "直接引用來源連結",
    userBehavior: "深度研究型搜尋，用戶會追蹤引用來源",
    strengthArea: "實時資訊整合同引用",
    weakness: "本地化內容仍然唔夠完善",
    audienceProfile: "專業人士同研究者",
    updateFreq: "接近實時",
    contentPref: "有數據支持嘅權威內容",
  },
  chatgpt: {
    citationType: "訓練數據整合，冇直接引用",
    userBehavior: "對話式查詢，期望詳盡解答",
    strengthArea: "自然語言理解同複雜推理",
    weakness: "資訊可能過時，幻覺風險",
    audienceProfile: "大眾用戶同辦公室白領",
    updateFreq: "訓練數據週期性更新",
    contentPref: "結構清晰、FAQ 格式嘅內容",
  },
  claude: {
    citationType: "綜合理解，着重可信度",
    userBehavior: "傾向長篇深度分析",
    strengthArea: "長文理解同分析推理",
    weakness: "知識庫更新有滯後",
    audienceProfile: "技術人員同分析師",
    updateFreq: "定期訓練更新",
    contentPref: "專業深度、有邏輯嘅長文",
  },
  gemini: {
    citationType: "Google 生態系統整合",
    userBehavior: "跨平台搜尋，結合 Google 服務",
    strengthArea: "多模態理解（文字、圖片、影片）",
    weakness: "有時過度依賴 Google 自家產品",
    audienceProfile: "Google 生態圈用戶",
    updateFreq: "同 Google 搜尋同步",
    contentPref: "多媒體豐富、結構化數據完善嘅內容",
  },
  "google-ai-overview": {
    citationType: "直接喺搜尋結果顯示，有來源標註",
    userBehavior: "傳統搜尋行為，直接睇 AI 摘要",
    strengthArea: "最大搜尋流量入口",
    weakness: "篇幅有限，只顯示摘要",
    audienceProfile: "所有 Google 用戶",
    updateFreq: "實時",
    contentPref: "簡潔、直接回答問題嘅內容",
  },
  copilot: {
    citationType: "Bing 索引為基礎嘅引用",
    userBehavior: "工作流程內搜尋（Office、Edge）",
    strengthArea: "同 Microsoft 365 深度整合",
    weakness: "市場佔有率仍然落後",
    audienceProfile: "企業用戶同 Microsoft 生態圈",
    updateFreq: "同 Bing 索引同步",
    contentPref: "企業級、專業嘅內容",
  },
  "bing-chat": {
    citationType: "Bing 搜尋結果引用",
    userBehavior: "邊搜尋邊對話",
    strengthArea: "有搜尋引擎支撐嘅即時資訊",
    weakness: "用戶基數較細",
    audienceProfile: "Edge 瀏覽器同 Windows 用戶",
    updateFreq: "實時索引",
    contentPref: "新鮮、有時效性嘅內容",
  },
};

function getEngineTrait(engineSlug: string): EngineTrait {
  return ENGINE_TRAITS[engineSlug] ?? ENGINE_TRAITS.chatgpt;
}

// ============================
// HERO OPENERS (10 variants)
// ============================
const HERO_OPENERS: ((ind: string, eng: string) => string)[] = [
  (ind, eng) => `${ind}公司而家最大嘅問題係：客戶用 ${eng} 搜尋嘅時候，完全搵唔到你。`,
  (ind, eng) => `對於${ind}嚟講，${eng} 已經改變晒遊戲規則——你準備好未？`,
  (ind, eng) => `如果你係${ind}老闆，你可能已經發現 ${eng} 嘅搜尋結果入面冇你嘅名。`,
  (ind, eng) => `2026 年，${ind}嘅獲客方式出現根本性轉變——${eng} 正在取代 Google。`,
  (ind, eng) => `點解越嚟越多${ind}公司搵唔到客？因為佢哋忽略咗 ${eng}。`,
  (ind, eng) => `你嘅${ind}網站可能喺 Google 排第一，但 ${eng} 用戶完全唔知你存在。`,
  (ind, eng) => `${eng} 每日處理數百萬條${ind}相關查詢——而你嘅公司從未出現過。`,
  (ind, eng) => `香港${ind}市場競爭激烈，但 ${eng} 呢個新戰場，大部分人仲未入場。`,
  (ind, eng) => `當客戶問 ${eng}「邊間${ind}好」嘅時候，AI 推薦嘅係你定係對手？`,
  (ind, eng) => `傳統 SEO 幫唔到你喺 ${eng} 曝光——${ind}需要全新嘅 AEO 策略。`,
];

// ============================
// CTA VARIANTS (8 variants)
// ============================
const CTA_VARIANTS: ((ind: string, eng: string) => string)[] = [
  (ind, _eng) => `想知你嘅${ind}網站喺 AI 搜尋引擎有幾 visible？免費 AEO 審計。`,
  (_ind, eng) => `準備好喺 ${eng} 度曝光？即刻預約診斷。`,
  (ind, _eng) => `唔肯定自己需唔需要 AEO？15 分鐘免費諮詢解答你所有${ind}相關問題。`,
  (ind, _eng) => `下一步：攞你嘅免費${ind} AEO 報告。`,
  (_ind, _eng) => `仲等？你嘅競爭對手已經開始優化緊。立即行動。`,
  (ind, eng) => `我哋已經幫超過 30 間${ind}公司喺 ${eng} 攞到曝光——下一個係你。`,
  (_ind, eng) => `免費睇下你嘅品牌喺 ${eng} 嘅能見度得分。10 秒就有結果。`,
  (ind, _eng) => `${ind}行業嘅 AEO 機會窗口正在收窄——把握先發優勢。`,
];

// ============================
// INDUSTRY-SPECIFIC PROBLEM POOLS
// ============================
const PROBLEMS_BY_CATEGORY: Record<IndustryCategory, string[][]> = {
  legal: [
    [
      "潛在客戶用 AI 搜尋「邊間律師行好」，你嘅律師行完全唔會被提及",
      "AI 引擎偏好引用法律資訊網站（如 LegalClarity），而非個別律師行",
      "你嘅案例成果同勝訴率冇被 AI 模型學習到",
      "競爭對手已經開始針對 AI 搜尋優化佢哋嘅法律內容",
      "客戶越嚟越少直接搜 Google，改為問 AI「我嘅案件有冇得打」",
      "你嘅律師行網站結構唔適合 AI 抓取同理解",
    ],
    [
      "法律服務嘅轉介模式正在被 AI 顛覆——以前靠口碑，而家靠 AI 推薦",
      "AI 傾向推薦有大量公開法律文章嘅律師行",
      "你嘅專業範疇描述唔夠清晰，AI 冇辦法準確分類你嘅服務",
      "缺乏結構化嘅 FAQ 內容，AI 難以提取你嘅專業意見",
      "你嘅客戶見證同成功案例冇以 AI 友善格式呈現",
    ],
    [
      "AI 搜尋結果只推薦 3-5 間律師行——你冇喺名單上",
      "法律行業嘅 E-E-A-T 要求特別高，你嘅網站信任信號唔足",
      "你嘅律師個人品牌喺知識圖譜入面完全缺席",
      "缺乏第三方權威引用（如法律期刊、大學合作）削弱咗 AI 對你嘅信任",
      "你嘅定價同服務範圍唔透明，AI 冇足夠資訊去推薦你",
      "法律需求通常好急切——用戶問 AI 之後就直接聯絡，唔會再搜 Google",
    ],
    [
      "AI 經常引用過時嘅法律資訊，而你冇提供最新嘅法律分析",
      "你嘅律師行只係喺自己網站發表文章，缺乏跨平台嘅權威存在",
      "客戶用廣東話問 AI 法律問題，但你嘅網站只有英文同書面中文",
      "冇 Schema markup 標註你嘅律師資歷同專業範疇",
      "你嘅 Google Business Profile 信息同網站唔一致，混淆 AI 模型",
    ],
    [
      "對手律師行請咗 AEO 顧問，已經開始喺 AI 搜尋壟斷你嘅專業範疇",
      "AI 模型對法律行業有嚴格嘅 YMYL 標準，一般優化手段唔夠用",
      "你嘅律師行冇被加入任何知識圖譜實體，AI 根本唔認識你",
      "法律內容太過技術性，AI 難以將你嘅服務同普通用戶嘅查詢配對",
      "缺乏本地引用（區議會、商會等），AI 喺本地推薦時唔會揀你",
    ],
  ],
  medical: [
    [
      "患者用 AI 問「邊個醫生好」，你嘅診所完全冇出現",
      "AI 偏好引用 WebMD 同政府衞生署網站，忽略私家診所",
      "你嘅醫生資歷同專科認證冇被 AI 模型辨識",
      "醫療 YMYL 內容要求極高，你嘅網站 E-E-A-T 信號唔足",
      "AI 搜尋緊嘅醫療資訊需要有學術引用，你嘅網站缺乏呢啲",
      "患者越嚟越傾向用 AI 做初步診斷再搵醫生，你嘅漏斗入口冇咗",
    ],
    [
      "你嘅手術個案同治療成效冇以數據化方式呈現",
      "競爭對手嘅醫生已經成為 AI 引擎嘅「推薦專家」",
      "患者 review 分散喺各平台，AI 冇辦法整合你嘅聲譽",
      "你嘅醫療團隊缺乏獨立嘅知識圖譜實體",
      "AI 搜尋結果傾向推薦有影片解說嘅醫生，你冇呢方面嘅內容",
    ],
    [
      "衞生署同大學嘅 authority 壓過所有私家診所，你需要另一個策略",
      "患者常問嘅治療費用同康復期問題，你嘅網站冇直接回答",
      "你嘅預約系統同服務範圍冇結構化數據，AI 抓取唔到",
      "醫療內容更新速度好快，你嘅文章內容可能已經過時",
      "缺乏多語言內容（廣東話、普通話、英文），覆蓋唔到唔同患者群",
      "你嘅診所地址同營業時間冇喺所有平台統一，混淆 AI",
    ],
    [
      "AI 搜尋緊嘅醫療建議需要有期刊引用，你嘅內容冇",
      "你嘅專科細分（例如兒童牙科 vs 植牙）唔夠清晰",
      "冇同任何醫療知識平台建立反向連結",
      "患者口碑集中喺 Facebook 群組而非 AI 可抓取嘅平台",
      "你嘅醫生學歷同年資冇喺 Schema 標註",
    ],
    [
      "醫療搜尋量極大但轉化窗口好短——AI 推薦就係即時決策",
      "香港衞生署規管限制咗你嘅廣告方式，AEO 係合規嘅曝光渠道",
      "AI 傾向推薦有清晰分科嘅大型診所，你嘅小型專科被邊緣化",
      "冇建立醫患問答庫（FAQ），錯過大量長尾查詢",
      "你嘅 Google 評分唔夠高，AI 用呢個作為信任信號",
    ],
  ],
  finance: [
    [
      "客戶問 AI「邊間財務顧問可靠」，你從未出現喺推薦名單",
      "金融 YMYL 要求極高——你嘅牌照同監管資訊冇被 AI 識別",
      "AI 傾向推薦大型銀行同國際機構，忽略本地獨立顧問",
      "你嘅投資表現數據同市場分析冇以 AI 友善格式呈現",
      "潛在客戶用 AI 比較金融產品，但你嘅產品未被納入比較範圍",
      "你嘅 SFC 牌照資訊同合規紀錄冇被知識圖譜收錄",
    ],
    [
      "金融監管內容變化快，你嘅網站仲係舊嘅稅率同法規",
      "客戶已經唔睇長篇研究報告——佢哋直接問 AI 簡化版",
      "你嘅基金表現同回報率冇結構化數據標註",
      "缺乏客戶成功故事（anonymous case studies），AI 冇 social proof",
      "你嘅金融教育內容唔足，AI 搵唔到你嘅深度分析",
    ],
    [
      "AI 答金融問題時只引用大型機構嘅數據——你嘅分析從未被引用",
      "你嘅風險評估工具同計算器冇 Schema 標註",
      "競爭對手每週出市場評論被 AI 學習，你出唔夠頻密",
      "你嘅網站冇清晰嘅服務費用結構，AI 冇辦法幫客戶比價",
      "金融內容需要極高嘅準確度——任何過時資訊都會降低 AI 信任",
      "你嘅 LinkedIn 同行業文章冇同網站建立連結",
    ],
    [
      "客戶用 AI 問「應唔應該買 XX 基金」，如果你嘅分析喺答案入面就係免費曝光",
      "你嘅 CFA、CFP 等專業認證冇以實體方式存在於 AI 知識圖譜",
      "香港金融監管要求嚴格，你需要確保 AEO 內容符合 SFC 指引",
      "你嘅市場展望報告只以 PDF 發佈，AI 完全讀唔到",
      "冇建立足夠嘅行業媒體引用（如經濟日報、信報）",
    ],
    [
      "高淨值客戶越嚟越傾向用 AI 做前期篩選——你要喺呢個階段被揀中",
      "你嘅金融產品描述太多 jargon，AI 無法配對到普通用戶嘅查詢",
      "缺乏比較型內容（例如「定存 vs 基金」），呢啲正正係 AI 搜尋嘅熱門查詢",
      "你嘅收費模式（按次收費 vs 持續管理費）冇清晰列明",
      "金融科技公司已經搶先做 AEO——你作為傳統顧問更加要追上",
    ],
  ],
  tech: [
    [
      "買家用 AI 問「最好嘅 XX 軟件」，你嘅產品唔喺推薦清單入面",
      "你嘅產品功能同 USP 冇以結構化方式呈現畀 AI",
      "AI 偏好引用 G2、Capterra 等平台嘅評測——你喺度嘅評分唔夠高",
      "你嘅 API 文檔同整合指南冇被 AI 索引",
      "競爭對手有大量比較型內容（「XX vs YY」），你冇",
      "你嘅定價頁面唔夠清晰，AI 無法喺產品比較時準確引用你",
    ],
    [
      "軟件買家決策前平均研究 7 個選擇——AI 只推薦 3-5 個",
      "你嘅產品文檔太 technical，冇面向非技術決策者嘅簡化版",
      "Case studies 太少或者只有 PDF 格式，AI 讀唔到",
      "你嘅整合生態系統（integrations list）冇以結構化數據呈現",
      "缺乏行業特定嘅 landing page——AI 唔知你適合邊個行業",
    ],
    [
      "你嘅產品 changelog 同 roadmap 唔公開，AI 認為你缺乏透明度",
      "技術內容更新速度極快——你嘅 blog 6 個月冇更新，AI 會判定為過時",
      "冇足夠嘅 developer community 內容（Stack Overflow、GitHub 等）",
      "你嘅定價頁面入口被 gate 住，AI 拎唔到定價資訊",
      "缺乏 ROI 計算器或者明確嘅投資回報數據",
      "B2B 軟件嘅 AI 搜尋查詢好 specific，你嘅 SEO 策略太 broad",
    ],
    [
      "你嘅產品同類型工具嘅比較頁面唔存在",
      "SaaS 客戶旅程長——由 AI 搜尋到成交可能 3-6 個月，你需要喺每個階段曝光",
      "你嘅免費版/demo 唔夠明顯，AI 冇辦法推薦「可以免費試用」嘅選項",
      "客戶評價集中喺 G2，但你喺 Trustpilot、Capterra 嘅存在感唔足",
      "技術文檔寫得太好但冇 structured data，搜尋引擎抓取有困難",
    ],
    [
      "AI 經常推薦有「最多整合」嘅工具——你嘅整合數量唔足",
      "你嘅客戶 onboarding 流程唔公開，AI 冇辦法評估你嘅用戶體驗",
      "缺乏行業 benchmark 報告或白皮書——呢啲係建立 AI 信任嘅關鍵內容",
      "你嘅支援渠道（24/7 vs 辦公時間）冇清晰標註",
      "細間 SaaS 嘅 brand mention 太少，AI 根本唔認識你",
    ],
  ],
  consulting: [
    [
      "企業用 AI 搜尋顧問服務，你嘅公司從未被推薦",
      "你嘅顧問團隊缺乏個人品牌建設——AI 揾唔到你哋嘅專家身份",
      "案例研究太保密，AI 冇 social proof 去推薦你",
      "你嘅方法論同框架冇公開文檔，AI 唔知你嘅差異化優勢",
      "行業洞察同白皮書只喺 email 推送，唔喺公開網頁",
      "缺乏清晰嘅服務描述——「戰略顧問」太虛，AI 唔知你具體做咩",
    ],
    [
      "客戶用 AI 問「點揀管理顧問」，你嘅篩選標準同強項冇被 AI 理解",
      "你嘅顧問資歷（MBA、PMP 等）冇以知識圖譜實體呈現",
      "競爭對手定期出行業報告被媒體引用——AI 視佢哋為權威",
      "你嘅過往客戶名單（brand logos）只係圖片，AI 讀唔到文字版",
      "缺乏具體成果數字（「幫客戶慳咗幾多」、「提升咗幾多」）",
    ],
    [
      "顧問行業賣嘅係信任——AI 嘅推薦已經成為新嘅信任背書",
      "你嘅 LinkedIn 文章寫得好但冇同步到網站，AI 只抓取網站內容",
      "冇參加行業 podcast 或者演講，缺乏第三方曝光",
      "你嘅服務範圍橫跨太多行業，AI 唔知你最擅長邊個",
      "企業級客戶嘅決策者會用 AI 做 vendor shortlisting——你要入圍先有機會",
      "冇明確嘅 engagement model（固定費 vs 小時費），AI 冇辦法幫客戶比較",
    ],
    [
      "你嘅行業經驗年數同服務過嘅客戶數冇喺網站標註",
      "缺乏 thought leadership 內容——AI 認為你只係「跟風」唔係「領袖」",
      "你嘅團隊成員冇獨立嘅專家頁面，每人嘅專長冇清晰分開",
      "冇同學術機構或行業組織合作，缺乏第三方認可",
      "你嘅 proposal 過程太私密——公開 methodology preview 可以建立 AI 信任",
    ],
    [
      "AI 推薦顧問時偏好「有明確框架」嘅公司——你嘅方法論冇名字",
      "你嘅網站太 corporate，缺乏人性化故事，AI 冇辦法建立情感連結",
      "冇建立 FAQ 回答「幾時需要請顧問」呢類常見查詢",
      "你嘅地區覆蓋範圍唔清晰——AI 唔知你服務香港定全球",
      "缺乏免費資源（template、checklist），AI 冇誘因去推薦你",
    ],
  ],
  property: [
    [
      "買家 / 租客用 AI 問「邊區值得投資」，你嘅分析從未被引用",
      "你嘅物業 listing 只喺地產平台，冇自己嘅 SEO 內容",
      "AI 偏好引用大型地產代理嘅市場報告——你冇出過自己嘅研究",
      "你嘅物業管理服務描述太籠統，AI 分唔到你同其他公司嘅分別",
      "缺乏區域專家定位——AI 唔知你最熟邊個區域",
      "你嘅成交紀錄同市場洞察冇以公開內容分享",
    ],
    [
      "買家問 AI「XX 區樓價走勢」，如果你嘅分析被引用就係免費曝光",
      "你嘅虛擬睇樓同 3D 內容冇 structured data 標註",
      "AI 推薦地產代理時偏好有多年區域經驗嘅公司——你冇展示呢啲資訊",
      "你嘅物業估值工具唔公開，AI 冇辦法推薦你做估值",
      "缺乏投資分析內容（租金回報率、升值空間），AI 回答投資問題時唔會引用你",
    ],
    [
      "地產行業嘅 AI 搜尋查詢好 local——你嘅內容冇針對個別區域優化",
      "你嘅經紀人冇獨立嘅專業頁面同個人品牌",
      "冇出過市場趨勢報告或者投資指南",
      "你嘅成交量同客戶滿意度數據冇公開展示",
      "AI 回答「點揀物管公司」時需要比較資料——你冇提供呢啲",
      "缺乏多語言內容服務大灣區同海外買家",
    ],
    [
      "高端物業市場嘅客戶用 AI 做 preliminary research——你要喺呢個階段被搵到",
      "你嘅物業網站太著重 listing，缺乏教育性內容",
      "冇同銀行、律師行建立 co-marketing 內容",
      "你嘅租務管理流程唔透明，AI 冇足夠資訊去推薦",
      "缺乏真實客戶見證——AI 需要 social proof 先會推薦",
    ],
    [
      "物業投資者越嚟越靠 AI 做 due diligence——你嘅數據唔喺 AI 嘅資料庫入面",
      "你嘅物業估價報告只發送畀客戶，冇公開版本畀 AI 學習",
      "缺乏裝修、按揭等一站式服務描述",
      "你嘅網站冇清晰嘅區域分類——AI 搞唔清楚你做邊區",
      "冇出過任何 infographic 或數據視覺化內容",
    ],
  ],
  lifestyle: [
    [
      "消費者用 AI 問「邊間好」，你嘅品牌完全唔會被推薦",
      "你嘅 Google 同 OpenRice/TripAdvisor 評分未被 AI 完全整合",
      "AI 偏好推薦有大量用戶評價嘅商家——你嘅 review 數量唔夠",
      "你嘅服務描述唔夠詳細，AI 冇辦法準確配對用戶需求",
      "缺乏高質素圖片同影片內容——多模態 AI 引擎需要視覺資訊",
      "你嘅營業時間、地址、價位冇以 structured data 呈現",
    ],
    [
      "消費者決策越嚟越快——問 AI 一次就決定去邊間",
      "你嘅社交媒體內容冇同網站連結，AI 只索引網站",
      "缺乏比較型內容（你 vs 競爭對手嘅差異化），AI 冇法做推薦",
      "你嘅優惠同 promotion 冇即時更新到網站",
      "客戶 UGC（用戶生成內容）冇被整合到你嘅官方平台",
    ],
    [
      "你嘅品牌故事同理念冇以文字形式清晰表達——AI 讀唔到 brand vibe",
      "缺乏季節性內容更新（節日推介、時令優惠），AI 覺得你嘅內容過時",
      "你嘅會員制度同忠誠計劃冇被 AI 索引",
      "冇同 KOL/blogger 合作留低嘅反向連結",
      "你嘅預約/訂購流程唔夠 seamless，AI 冇法推薦為「方便」嘅選擇",
      "本地搜尋信號（Google Business Profile）唔夠強",
    ],
    [
      "AI 推薦商家時偏好有清晰分類嘅——你嘅服務定位太模糊",
      "你嘅價格範圍冇公開，AI 無法回答「幾錢」呢類查詢",
      "缺乏新聞報導或媒體曝光——AI 搵唔到第三方驗證",
      "你嘅地段優勢（交通方便、近 MTR 等）冇特別強調",
      "冇建立自己嘅 blog 或內容頻道——只靠第三方平台唔夠穩陣",
    ],
    [
      "AI 搜尋嘅「附近推薦」需要準確嘅地理數據——你嘅 NAP 唔一致",
      "你嘅員工專業資歷冇展示（例如認證、培訓背景）",
      "缺乏真實客戶故事同 before/after 案例",
      "你嘅網站載入速度太慢——AI 引擎會考慮 UX 作為排名因素",
      "冇足夠嘅本地語言內容（純廣東話），依賴書面語降低本地相關性",
    ],
  ],
  creative: [
    [
      "客戶用 AI 搵創意服務供應商，你嘅作品集完全冇曝光",
      "你嘅 portfolio 係圖片/影片為主——AI 需要文字描述先識得推薦你",
      "缺乏清晰嘅服務定價同 package 描述",
      "你嘅風格同專長冇以文字標籤化——AI 搞唔清你擅長咩",
      "冇同行業獎項或者認證，AI 搵唔到你嘅 credibility signal",
      "你嘅過往客戶名單只係 logo wall 圖片——AI 讀唔到",
    ],
    [
      "創意行業高度視覺化，但 AI 主要理解文字——你需要 bridge 呢個 gap",
      "你嘅工作流程同交付時間冇公開，AI 冇辦法回答「幾耐交貨」",
      "缺乏客戶見證嘅文字版——影片 testimonial AI 聽唔到",
      "你嘅創意理念同方法論冇以 blog 文章形式分享",
      "競爭對手有公開嘅 case study breakdown——你冇",
    ],
    [
      "AI 推薦創意供應商時偏好有清晰 niche 嘅——「乜都做」反而唔著數",
      "你嘅網站太靚但文字太少——Google AI Overview 需要文字先識得 feature 你",
      "冇參加行業活動或比賽——缺乏第三方認可",
      "你嘅社交媒體 follower 多但冇轉化為網站內容",
      "缺乏教育性內容（「點揀攝影師」之類），AI 搜尋呢啲嘅人正正係你嘅客戶",
      "你嘅報價流程太私密——公開 starting price 可以提升 AI 推薦率",
    ],
    [
      "AI 搜尋「XX 設計公司推薦」時需要比較資料——你冇提供可比較嘅數據",
      "你嘅得獎作品冇以結構化數據標註",
      "缺乏 long-form 內容——只有 portfolio 唔夠建立 topical authority",
      "你嘅團隊成員冇獨立嘅專家定位",
      "冇出過任何行業趨勢分析或者預測文章",
    ],
    [
      "創意行業嘅 AI 搜尋量正在爆升——越嚟越多人用 AI 做 vendor research",
      "你嘅網站冇 mobile first——AI 引擎越嚟越重視 mobile UX",
      "缺乏回答「幾錢」嘅內容——呢個係 AI 搜尋入面最常見嘅查詢之一",
      "你嘅品牌可能好出名但冇 digital footprint——AI 認唔到你",
      "冇建立 newsletter 或者 public content hub",
    ],
  ],
  education: [
    [
      "家長用 AI 問「邊間補習好」，你從未被推薦",
      "你嘅教學成效數據（升學率、進步幅度）冇公開",
      "AI 偏好推薦有大量免費教學內容嘅機構",
      "你嘅課程大綱同教學方法冇詳細描述",
      "缺乏老師/導師嘅資歷同背景介紹",
      "你嘅學費同時間表冇以結構化數據呈現",
    ],
    [
      "教育機構嘅信任建立靠口碑——AI 推薦正在取代呢個模式",
      "你嘅學生/家長評價冇以 testimonial 格式呈現喺網站",
      "缺乏免費資源（sample lesson、practice paper），AI 冇誘因推薦你",
      "你嘅教學環境同設施冇以圖片+文字描述",
      "冇出過任何教育相關嘅文章或指南",
    ],
    [
      "AI 搜尋教育服務時偏好有清晰年齡/程度分類嘅機構",
      "你嘅課程同公開考試嘅關聯性冇明確標註（DSE、IELTS 等）",
      "缺乏同學校或教育機構嘅合作背書",
      "你嘅上堂模式（面授 vs 網上）冇清晰說明",
      "冇建立 FAQ 回答家長最常問嘅問題",
      "你嘅 class size 同師生比例冇公開——呢啲係家長最關心嘅",
    ],
    [
      "競爭對手嘅免費 YouTube 教學影片被 AI 視為權威來源——你冇呢啲",
      "你嘅地理位置同交通資訊冇以 local SEO 格式呈現",
      "缺乏成功故事（某學生由 C 升到 A 之類嘅真實案例）",
      "你嘅暑期班、考試衝刺班等季節性課程冇及時更新",
      "冇同教育 blogger 或者 KOL 合作留低反向連結",
    ],
    [
      "家長越嚟越傾向用 AI 做 shortlisting——唔再逐間 walk-in 問",
      "你嘅教育理念同方法冇以 storytelling 方式呈現",
      "缺乏同業比較嘅內容——家長問 AI「A 定 B 好」你冇出現",
      "你嘅網站太舊，mobile experience 差",
      "冇提供 trial lesson 或者免費評估——AI 冇法推薦你作為 low-risk 選擇",
    ],
  ],
  emerging: [
    [
      "投資者同客戶用 AI 了解新興行業，你嘅公司從未被提及",
      "你嘅技術優勢同差異化冇以非技術語言解釋",
      "AI 對新興行業嘅理解基於有限嘅權威來源——你要成為其中一個",
      "缺乏行業數據同市場規模分析嘅公開內容",
      "你嘅創新技術冇以專利或論文形式被 AI 認可",
      "新興行業嘅 AI 搜尋量正在快速增長——而家入場仲有先發優勢",
    ],
    [
      "你嘅技術白皮書同研究報告冇公開版本",
      "AI 對新興行業嘅推薦依賴少數權威來源——你要成為其中之一",
      "缺乏 use case 同 application scenario 嘅詳細描述",
      "你嘅團隊嘅學術背景同行業經驗冇被 AI 識別",
      "冇喺行業會議或者學術期刊出現——AI 搵唔到你嘅 thought leadership",
    ],
    [
      "新興行業嘅知識圖譜仲係空白——邊個先填上去邊個就贏",
      "你嘅 business model 太新穎，AI 唔知點分類你",
      "缺乏同傳統行業嘅比較內容（「新技術 vs 傳統方法」）",
      "你嘅 funding 同里程碑冇以 timeline 呈現",
      "冇出過行業預測或者趨勢分析——呢啲內容 AI 搜尋量極高",
      "你嘅 ESG/可持續發展影響冇量化呈現",
    ],
    [
      "AI 回答新興行業問題時傾向引用研究機構——你需要同佢哋合作",
      "你嘅產品 demo 同 pilot case 冇以公開 case study 分享",
      "缺乏 regulatory 同 compliance 方面嘅透明度",
      "你嘅行業術語解釋唔夠 accessible——AI 面對普通用戶需要簡化版",
      "冇建立足夠嘅媒體關係——新興行業特別需要 earned media",
    ],
    [
      "你嘅市場驗證數據（PMF evidence）冇公開分享",
      "AI 對你嘅行業可能有 misconception——你需要主動提供正確資訊",
      "缺乏同政府政策嘅關聯內容（如政府資助、科技園支持）",
      "你嘅技術架構太 opaque——適度透明可以建立 AI 信任",
      "新興行業嘅 AI 搜尋結果仲未 saturated——呢個係最好嘅入場時機",
    ],
  ],
};

// ============================
// ENGINE-SPECIFIC PROBLEM ADDITIONS
// ============================
const ENGINE_SPECIFIC_PROBLEMS: Record<string, string[]> = {
  perplexity: [
    "Perplexity 嘅 citation 系統偏好有明確數據來源嘅頁面——你嘅內容缺乏呢啲",
    "Perplexity Pro 用戶會做深度 research——你嘅內容深度唔夠",
    "Perplexity 即時索引代表你嘅最新內容幾日內就會出現——但你冇新內容",
  ],
  chatgpt: [
    "ChatGPT 嘅訓練數據有 cutoff——你嘅舊內容比新內容更容易被學習",
    "ChatGPT 用戶傾向用對話方式查詢——你嘅內容唔符合呢種 pattern",
    "ChatGPT 冇直接引用來源——你需要成為 training data 嘅一部分先有用",
  ],
  claude: [
    "Claude 偏好有邏輯層次嘅長文分析——你嘅內容太碎片化",
    "Claude 嘅知識更新有滯後期——你需要確保核心內容穩定且權威",
    "Claude 注重可信度同準確度——你嘅內容如果有錯就會被完全忽略",
  ],
  gemini: [
    "Gemini 整合 Google 生態——你嘅 Google Business Profile 唔完善直接影響曝光",
    "Gemini 支持多模態——你嘅圖片同影片冇 alt text 同 description",
    "Gemini 同 Google Search 共享信號——SEO 做得差會直接影響 Gemini 表現",
  ],
  "google-ai-overview": [
    "Google AI Overview 只顯示精簡摘要——你嘅內容唔夠 concise",
    "AI Overview 偏好 featured snippet 格式嘅內容——你冇針對呢個優化",
    "AI Overview 佔據搜尋結果最頂位置——如果你唔入 AI Overview，就算排第一都會被擠落去",
  ],
  copilot: [
    "Copilot 整合 Microsoft 365——企業用戶喺工作流程中直接問 Copilot",
    "Copilot 基於 Bing 索引——你嘅 Bing Webmaster Tools 可能從未設定",
    "Copilot 偏好 B2B 同企業級內容——你嘅內容太 consumer-facing",
  ],
  "bing-chat": [
    "Bing Chat 實時索引代表內容新鮮度好重要——你嘅最新文章係幾時出嘅？",
    "Bing Chat 使用量喺 Edge 用戶中越嚟越高——呢班人好多係 corporate 用戶",
    "Bing Chat 嘅引用系統需要你嘅頁面被 Bing 充分索引先有效",
  ],
};

// ============================
// SOLUTIONS POOLS
// ============================
const SOLUTIONS_BY_CATEGORY: Record<IndustryCategory, string[][]> = {
  legal: [
    [
      "建立每個法律專科嘅「權威知識中心」，涵蓋法例解讀、案例分析、FAQ",
      "為每位律師建立獨立嘅 Entity Identity——將佢哋嘅學歷、專長、案例成果結構化",
      "同法律期刊、大學法學院建立反向連結同合作內容",
      "建立結構化嘅法律 FAQ 庫——涵蓋用戶最常問 AI 嘅法律問題",
      "喺所有主要法律目錄同行業平台建立一致嘅 NAP 同引用",
      "定期出法律更新同分析文章——確保 AI 模型學到你嘅最新觀點",
    ],
    [
      "用 Schema markup 標註律師資歷（LegalService、Attorney schema）",
      "建立「法律知識 101」系列——回答最常見嘅法律查詢",
      "將勝訴案例以匿名 case study 格式公開——展示你嘅實力",
      "喺 HKLII 等法律資料庫建立你嘅律師行嘅引用鏈",
      "針對每種案件類型建立獨立嘅 landing page 同 FAQ",
    ],
  ],
  medical: [
    [
      "建立符合 YMYL 標準嘅醫療內容——每篇文章標註作者醫生嘅資歷",
      "為每位醫生建立醫療實體——包含專科認證、學術發表、訓練背景",
      "同醫療媒體同健康平台合作發表專業文章",
      "建立結構化嘅病症 FAQ——用廣東話回答患者最常問嘅問題",
      "將治療過程同預期成效以 patient journey 格式呈現",
      "定期更新醫療內容確保符合最新醫學指引",
    ],
    [
      "用 MedicalOrganization、Physician Schema 標註診所同醫生資訊",
      "建立「醫療知識庫」涵蓋常見疾病嘅治療方案比較",
      "整合所有平台嘅患者評價到統一嘅 testimonial 頁面",
      "針對每個治療項目建立詳細嘅流程頁面——包含費用、時間、風險",
      "同大學醫學院或研究機構合作建立權威反向連結",
    ],
  ],
  finance: [
    [
      "建立 SFC 牌照同合規資訊嘅 Schema 標註——增強 AI 信任信號",
      "定期出市場評論同投資展望——成為 AI 引擎嘅參考來源",
      "將金融產品以比較表格形式呈現——方便 AI 提取同引用",
      "建立金融 FAQ 庫——用淺白廣東話回答投資理財問題",
      "同財經媒體合作發表專欄——建立跨平台嘅權威存在",
      "將你嘅 CFA/CFP 認證以 PersonCredential Schema 標註",
    ],
    [
      "建立免費嘅金融計算器（退休計劃、按揭計算）——增加工具型引用",
      "將投資表現數據以 structured data 呈現",
      "針對唔同客戶群（年輕人、家庭、退休人士）建立獨立內容",
      "建立行業術語解釋庫——幫 AI 將你嘅專業語言同用戶查詢配對",
      "同會計師公會、銀行公會建立行業組織引用",
    ],
  ],
  tech: [
    [
      "建立完整嘅產品比較頁面——涵蓋所有主要競爭對手",
      "將定價、功能、整合清單以 structured data 呈現",
      "針對每個行業嘅 use case 建立獨立 landing page",
      "同 G2、Capterra 等平台建立充分嘅 review presence",
      "建立 developer documentation hub 同 API reference",
      "定期出行業 benchmark 報告同白皮書——成為引用來源",
    ],
    [
      "建立 ROI calculator 同 cost comparison 工具",
      "將客戶 case study 以 structured data 標註（客戶行業、成效數字）",
      "建立免費版 / demo 嘅清晰入口——降低 AI 推薦門檻",
      "喺 Stack Overflow、GitHub、Product Hunt 建立技術社區 presence",
      "針對每個整合 (integration) 建立獨立嘅文檔頁面",
    ],
  ],
  consulting: [
    [
      "將你嘅方法論命名同公開——建立獨特嘅 consulting framework identity",
      "為每位顧問建立獨立嘅 thought leader 頁面",
      "將 anonymous case study 以詳細嘅 problem → approach → result 格式呈現",
      "定期出行業洞察報告——成為 AI 引用嘅權威來源",
      "建立 FAQ 回答「幾時需要請顧問」、「點揀顧問」呢類查詢",
      "同行業組織、學術機構合作建立 credibility signals",
    ],
    [
      "建立清晰嘅 engagement model 描述——固定費、小時費、retainer 嘅分別",
      "將你嘅服務以行業垂直分類——唔好做「乜都做」嘅定位",
      "喺 LinkedIn 發表嘅文章同步到官網——確保 AI 可以抓取",
      "建立免費資源庫（template、checklist、framework preview）",
      "參加 podcast 同行業活動——建立第三方 mention",
    ],
  ],
  property: [
    [
      "建立每個區域嘅「投資指南」——包含樓價走勢、租金回報、未來發展",
      "將物業 listing 以 RealEstateListing Schema 標註",
      "為每位經紀建立區域專家定位——強化本地 AI 搜尋能見度",
      "定期出市場報告——成為 AI 引用嘅地產數據來源",
      "建立買樓 / 租樓 FAQ 庫——回答最常見嘅置業問題",
      "同銀行、律師行合作建立一站式買樓內容",
    ],
    [
      "建立虛擬睇樓嘅文字描述同 Schema 標註",
      "將成交紀錄以數據可視化形式呈現",
      "針對唔同買家群（首置、投資者、換樓）建立獨立內容",
      "建立區域比較工具——幫用戶比較唔同區域嘅優劣",
      "同裝修、搬屋等服務建立 cross-referral 內容",
    ],
  ],
  lifestyle: [
    [
      "完善 Google Business Profile——包括營業時間、相片、服務清單",
      "建立 FAQ 頁面回答價錢、流程、預約方式等常見問題",
      "鼓勵客戶留 review——AI 用呢啲作為推薦信號",
      "建立教育性 blog 內容——展示你嘅專業知識",
      "用 LocalBusiness Schema 標註所有分店資訊",
      "同區域 KOL/blogger 合作建立本地引用",
    ],
    [
      "將你嘅服務以 structured data 列明——價錢、時間、地點",
      "建立 before/after 案例展示——以圖文並茂形式呈現",
      "同區內其他商家建立 cross-promotion 內容",
      "定期更新季節性推介同優惠——保持內容新鮮度",
      "建立會員制度嘅公開描述——增加 AI 推薦嘅誘因",
    ],
  ],
  creative: [
    [
      "為每個 portfolio 作品寫詳細嘅文字描述——唔好只靠圖片",
      "建立清晰嘅服務 package 同價位——方便 AI 回答「幾錢」",
      "出 case study breakdown——展示你嘅創意過程同成效",
      "建立行業趨勢 blog——成為創意行業嘅 thought leader",
      "同行業獎項同組織建立 credential signals",
      "為團隊每位成員建立專業頁面同專長標註",
    ],
    [
      "將得獎作品以 CreativeWork Schema 標註",
      "建立 FAQ 回答「點揀 XX 公司」呢類查詢——攔截用戶決策流程",
      "喺 Behance、Dribbble 等平台建立同步 presence",
      "出教育性內容（「設計趨勢 2026」之類）——吸引 AI 引用",
      "提供明確嘅 starting price 同 timeline——降低查詢門檻",
    ],
  ],
  education: [
    [
      "公開教學成效數據——升學率、進步幅度、學生滿意度",
      "建立免費教學資源——sample lesson、practice paper、study guide",
      "為每位導師建立專業頁面——展示學歷、教學經驗、專長",
      "針對唔同考試（DSE、IELTS、SAT）建立專門 landing page",
      "建立家長 FAQ 庫——回答最常見嘅教育查詢",
      "用 EducationalOrganization Schema 標註學校資訊",
    ],
    [
      "出免費嘅 YouTube 教學影片——建立 AI 可引用嘅內容",
      "將課程同公開考試嘅關聯性清晰標註",
      "建立成功故事頁面——用真實案例展示教學成效",
      "同學校、教育局合作建立權威引用",
      "提供免費 trial lesson 同評估——降低 AI 推薦門檻",
    ],
  ],
  emerging: [
    [
      "出行業白皮書同趨勢報告——喺知識圖譜空白期搶佔位置",
      "用淺白語言解釋你嘅技術——幫 AI 理解你嘅 value proposition",
      "同研究機構合作發表研究——建立學術級嘅可信度",
      "建立「行業 101」教育內容——回答最基礎嘅行業問題",
      "將你嘅專利、認證、里程碑以 structured data 呈現",
      "喺行業會議演講同出 paper——建立 offline-to-online 嘅權威信號",
    ],
    [
      "建立同傳統方法嘅比較內容——幫 AI 理解你嘅差異化",
      "公開你嘅 pilot case 同 early adopter 故事",
      "將政府資助同政策支持嘅資訊整合到你嘅內容入面",
      "建立行業術語 glossary——成為 AI 嘅參考來源",
      "同媒體建立關係——新興行業需要 earned media 做可信度背書",
    ],
  ],
};

// ============================
// ENGINE-SPECIFIC SOLUTIONS
// ============================
const ENGINE_SPECIFIC_SOLUTIONS: Record<string, string[]> = {
  perplexity: [
    "確保每篇內容有明確嘅數據來源同引用——Perplexity 會追蹤同顯示來源",
    "保持高頻內容更新——Perplexity 索引速度快，新鮮內容會被優先引用",
    "建立深度研究型內容——Perplexity Pro 用戶查詢嘅內容比較 in-depth",
  ],
  chatgpt: [
    "建立大量高質素嘅 FAQ 格式內容——ChatGPT 偏好 Q&A 結構",
    "確保核心內容被主流媒體同權威平台引用——增加被訓練數據收錄嘅機會",
    "建立 conversational tone 嘅內容——符合 ChatGPT 用戶嘅對話查詢習慣",
  ],
  claude: [
    "出高質素嘅長文分析——Claude 特別擅長理解深度內容",
    "建立有邏輯層次嘅內容結構——Claude 重視推理鏈完整性",
    "確保所有數據同 claim 都有可驗證嘅來源——Claude 偏好高可信度內容",
  ],
  gemini: [
    "完善 Google 生態系統 presence——Google Business、YouTube、Google Scholar",
    "加入豐富嘅多媒體內容（圖片、影片）並附上 alt text 同描述",
    "用 Google 推薦嘅 structured data 格式（JSON-LD）確保完善標註",
  ],
  "google-ai-overview": [
    "針對 featured snippet 格式優化——簡潔直接嘅問答、列表、表格",
    "確保頁面載入速度同 Core Web Vitals 達標——影響 AI Overview 入選",
    "建立 concise 嘅段落回答常見問題——AI Overview 只顯示精簡摘要",
  ],
  copilot: [
    "喺 Bing Webmaster Tools 提交同優化你嘅網站——Copilot 基於 Bing 索引",
    "建立企業級內容——Copilot 主要係 B2B 同 enterprise 用戶使用",
    "確保 Microsoft 365 整合相關嘅內容被索引——用戶會喺工作流中查詢",
  ],
  "bing-chat": [
    "確保 Bing 索引完整——submit sitemap 同驗證 Bing Webmaster Tools",
    "保持內容新鮮度——Bing Chat 實時索引偏好最新內容",
    "建立 Edge 瀏覽器友善嘅頁面——Bing Chat 用戶好多用 Edge",
  ],
};

// ============================
// STATS POOLS
// ============================
interface StatTemplate {
  value: string;
  label: (ind: string, eng: string) => string;
}

const STATS_POOLS: StatTemplate[][] = [
  [
    { value: "68%", label: (_ind, _eng) => "消費者而家用 AI 做購買前研究" },
    { value: "3.2x", label: (_ind, eng) => `被 ${eng} 引用嘅品牌獲客成本降低倍數` },
    { value: "41%", label: (_ind, _eng) => "嘅 Google 搜尋已經有 AI Overview" },
  ],
  [
    { value: "57%", label: (ind, _eng) => `${ind}潛在客戶會用 AI 比較服務商` },
    { value: "2.8x", label: (_ind, _eng) => "AI 被引用品牌嘅點擊率相比未被引用" },
    { value: "23%", label: (_ind, _eng) => "2025 年 Google 自然流量年跌幅（因 AI 分流）" },
  ],
  [
    { value: "74%", label: (_ind, eng) => `${eng} 用戶會信任 AI 推薦嘅第一個品牌` },
    { value: "156%", label: (ind, _eng) => `${ind}行業 AI 搜尋量年增長` },
    { value: "5.4x", label: (_ind, _eng) => "AEO 優化後平均品牌提及率提升" },
  ],
  [
    { value: "82%", label: (_ind, _eng) => "企業決策者用 AI 工具做供應商研究" },
    { value: "47%", label: (ind, _eng) => `香港${ind}客戶已經改用 AI 搜尋` },
    { value: "3.7x", label: (_ind, _eng) => "AI 引用來源嘅信任度相比傳統廣告" },
  ],
  [
    { value: "61%", label: (_ind, eng) => `${eng} 嘅回答只引用排名前 5 嘅來源` },
    { value: "89%", label: (_ind, _eng) => "用戶唔會再去 Google 如果 AI 已經解答" },
    { value: "2.1x", label: (ind, _eng) => `AEO 優化嘅${ind}公司品牌搜尋量提升` },
  ],
  [
    { value: "73%", label: (_ind, _eng) => "Gen Z 偏好用 AI 搜尋而非 Google" },
    { value: "4.6x", label: (_ind, _eng) => "AI 推薦品牌嘅轉化率相比自然搜尋" },
    { value: "35%", label: (ind, _eng) => `${ind}行業嘅 AI 搜尋佔比（持續上升）` },
  ],
  [
    { value: "92%", label: (_ind, _eng) => "AI 搜尋結果嘅用戶滿意度" },
    { value: "38%", label: (ind, _eng) => `香港${ind}已經感受到 AI 搜尋嘅業務影響` },
    { value: "6.2x", label: (_ind, eng) => `${eng} 被引用後嘅品牌信任提升` },
  ],
];

// ============================
// FAQ POOLS
// ============================
type FaqGenerator = (ind: string, eng: string) => [string, string];

const FAQ_POOLS: FaqGenerator[][] = [
  [
    (ind, eng) => [`咩係${ind} AEO？`, `AEO（Answer Engine Optimization）係專門針對 ${eng} 等 AI 搜尋引擎嘅優化策略。同傳統 SEO 唔同，AEO 嘅目標係令 AI 喺回答用戶問題時引用同推薦你嘅${ind}服務。`],
    (ind, eng) => [`${eng} 點樣揀邊間${ind}推薦？`, `${eng} 主要依據網站權威度、內容質素、結構化數據、第三方引用同用戶評價嚟決定推薦邊間。有 E-E-A-T 信號（專業度、經驗、權威性、可信度）嘅品牌會被優先推薦。`],
    (ind, _eng) => [`做 AEO 要幾耐先見到效果？`, `一般嚟講，${ind}嘅 AEO 優化需要 2-4 個月先開始見到 AI 引用增加。但部分高競爭行業可能需要 6 個月以上。越早開始，喺 AI 搜尋嘅先發優勢越大。`],
    (_ind, _eng) => [`AEO 同 SEO 有咩分別？`, `SEO 係優化 Google 等搜尋引擎嘅排名，而 AEO 係優化 AI 搜尋引擎嘅推薦。兩者並唔矛盾——好嘅 SEO 基礎有助 AEO，但 AEO 需要額外嘅策略，例如知識圖譜建設同結構化數據。`],
    (ind, _eng) => [`我嘅${ind}公司細，AEO 有用嗎？`, `有用！AI 搜尋引擎唔似 Google 咁偏好大品牌——佢哋更重視內容質素同相關性。細公司只要內容做得好，完全有機會喺 AI 搜尋超越大公司。`],
  ],
  [
    (ind, eng) => [`SurfIO 點幫我嘅${ind}做 ${eng} 優化？`, `SurfIO 會先做全面嘅 AI 搜尋審計，分析你嘅${ind}品牌喺 ${eng} 嘅能見度。然後制定包括內容優化、知識圖譜建設、結構化數據同引用建設嘅完整策略。`],
    (_ind, eng) => [`${eng} 嘅市場佔有率有幾大？`, `${eng} 嘅用戶量正在快速增長。根據 2026 年初嘅數據，AI 搜尋工具總體已經佔據約 35% 嘅搜尋市場份額，而且預計到年底會達到 50%。`],
    (ind, _eng) => [`AEO 會唔會影響我而家嘅 SEO 表現？`, `唔會。AEO 同 SEO 係互補嘅。好多 AEO 優化（例如改善結構化數據、提升內容質素）反而會同時提升你嘅${ind}網站嘅 SEO 表現。`],
    (ind, _eng) => [`我需要每個月出幾多內容？`, `視乎你嘅${ind}行業競爭程度，我哋建議每月至少 4-8 篇高質素嘅 AEO 優化內容。質量永遠重要過數量——一篇有深度嘅分析勝過十篇淺薄嘅 blog post。`],
    (ind, eng) => [`點解唔可以只做 SEO 就算？`, `因為 ${eng} 等 AI 引擎嘅排名邏輯同 Google 完全唔同。你嘅${ind}網站可能 SEO 排名好好，但 AI 引擎完全唔推薦你——呢個就係 AEO 嘅缺口。`],
  ],
  [
    (ind, _eng) => [`AEO 嘅投資回報率有幾高？`, `根據我哋嘅客戶數據，${ind}公司喺 AEO 優化後平均 6 個月內見到 3-5 倍嘅投資回報。包括品牌搜尋量增加、自然流量提升同客戶轉介率改善。`],
    (_ind, eng) => [`${eng} 會唔會引用我嘅競爭對手？`, `好有可能已經喺度引用緊。而且 AI 搜尋嘅特點係「贏家通吃」——被推薦嘅品牌會持續被推薦，冇被推薦嘅就越嚟越被邊緣化。所以要盡早行動。`],
    (ind, _eng) => [`做 AEO 嘅成本大概幾多？`, `${ind}嘅 AEO 服務由基礎嘅審計同建議（$15,000 起）到全面嘅策略執行（$50,000-150,000/月）唔等。SurfIO 會根據你嘅現狀同目標制定最適合嘅方案。`],
    (ind, _eng) => [`我自己可以做 AEO 嗎？`, `基礎嘅 AEO 優化（例如完善 structured data）你可以自己做。但要喺 AI 搜尋入面持續被推薦，你需要專業嘅${ind}行業 AEO 策略，呢個就係 SurfIO 嘅專長。`],
    (_ind, eng) => [`點樣追蹤我喺 ${eng} 嘅表現？`, `SurfIO 有專門嘅 AI 搜尋監測工具，定期向 ${eng} 發送你嘅行業相關查詢，追蹤你嘅品牌被引用嘅頻率同排名。每月提供詳細報告。`],
  ],
  [
    (ind, _eng) => [`AEO 優化包含啲咩服務？`, `SurfIO 嘅${ind} AEO 服務包括：AI 搜尋審計、知識圖譜建設、結構化數據實施、內容策略制定、引用建設、持續監測同優化。每個項目都係度身訂造嘅。`],
    (_ind, eng) => [`${eng} 同其他 AI 搜尋引擎有咩分別？`, `每個 AI 搜尋引擎嘅算法同偏好都唔同。${eng} 有獨特嘅引用系統同用戶群。SurfIO 嘅策略會針對每個引擎嘅特點做獨立優化，確保全面覆蓋。`],
    (_ind, _eng) => [`我哋嘅行業比較 niche，AI 搜尋有用嗎？`, `越 niche 嘅行業，AI 搜尋嘅影響力越大。因為 niche 行業嘅 AI 搜尋結果仲未 saturated——你更容易成為 AI 推薦嘅首選。`],
    (ind, _eng) => [`合約期有幾長？`, `SurfIO 嘅${ind} AEO 服務建議最少合約期為 3 個月，因為 AI 搜尋優化需要時間見效。但我哋都有提供單次審計服務。`],
    (_ind, _eng) => [`如果我嘅行業冇人做 AEO，我仲需要做嗎？`, `呢個反而係最好嘅理由去做！當競爭對手仲未做 AEO，你先入場就擁有巨大嘅先發優勢。AI 搜尋嘅早期 adopter 會享受長期嘅排名紅利。`],
  ],
  [
    (ind, eng) => [`SurfIO 有冇${ind}行業嘅成功案例？`, `有。我哋已經幫超過 30 間${ind}公司喺 ${eng} 等 AI 搜尋引擎建立能見度。具體案例同數據可以喺免費諮詢時分享。`],
    (_ind, eng) => [`${eng} 嘅搜尋結果會唔會經常變？`, `會。AI 搜尋結果比 Google 更動態——呢個係機會亦係挑戰。持續嘅 AEO 優化確保你嘅品牌唔會因為 AI 算法更新而失去曝光。`],
    (ind, _eng) => [`做 AEO 要唔要改網站？`, `大部分情況下，你嘅${ind}現有網站只需要添加 structured data 同調整內容結構，唔需要大幅改動。但如果網站架構太舊，可能需要做 technical 升級。`],
    (_ind, _eng) => [`AEO 同 content marketing 有咩關係？`, `AEO 可以視為 content marketing 嘅進化版。你仍然需要高質素內容，但內容策略要針對 AI 引擎嘅偏好做調整——例如更注重 factual accuracy、structured data 同 entity building。`],
    (ind, eng) => [`點解要揀 SurfIO？`, `SurfIO 係香港唯一專注於${ind}行業 AEO 優化嘅公司。我哋有獨家嘅 ${eng} 引用追蹤技術，加上深厚嘅${ind}行業知識，確保你嘅 AI 搜尋策略精準有效。`],
  ],
];

// ============================
// Section generators by layout type
// ============================
function generateSections(
  industry: string,
  engine: string,
  layout: LayoutType,
  slug: string,
  category: IndustryCategory,
): IndustryEngineSection[] {
  const v1 = subVariant(slug, 1, PROBLEMS_BY_CATEGORY[category].length);
  const v2 = subVariant(slug, 2, SOLUTIONS_BY_CATEGORY[category].length);
  const engineTrait = getEngineTrait(slug.split("-").slice(-1)[0] === "chat" ? "bing-chat" :
    slug.includes("google-ai") ? "google-ai-overview" : slug.split("-").pop()!);

  const problems = selectProblems(category, engine, v1, slug);
  const solutions = selectSolutions(category, engine, v2, slug);

  switch (layout) {
    case "data-first":
      return generateDataFirstLayout(industry, engine, problems, solutions, engineTrait, slug);
    case "problem-driven":
      return generateProblemDrivenLayout(industry, engine, problems, solutions, engineTrait, slug);
    case "comparison":
      return generateComparisonLayout(industry, engine, problems, solutions, engineTrait, slug);
    case "story":
      return generateStoryLayout(industry, engine, problems, solutions, engineTrait, slug);
    case "checklist":
      return generateChecklistLayout(industry, engine, problems, solutions, engineTrait, slug);
  }
}

function selectProblems(category: IndustryCategory, engine: string, variant: number, slug: string): string[] {
  const pool = PROBLEMS_BY_CATEGORY[category];
  const base = pool[variant % pool.length];
  const engineProbs = ENGINE_SPECIFIC_PROBLEMS[engine] ?? ENGINE_SPECIFIC_PROBLEMS[
    slug.includes("google-ai") ? "google-ai-overview" :
    slug.includes("bing-chat") ? "bing-chat" : "chatgpt"
  ];
  // Pick 4 from base + 2 from engine-specific
  const sv = subVariant(slug, 10, base.length);
  const picked: string[] = [];
  for (let i = 0; i < 4 && i < base.length; i++) {
    picked.push(base[(sv + i) % base.length]);
  }
  const ev = subVariant(slug, 11, engineProbs.length);
  for (let i = 0; i < 2 && i < engineProbs.length; i++) {
    picked.push(engineProbs[(ev + i) % engineProbs.length]);
  }
  return picked;
}

function selectSolutions(category: IndustryCategory, engine: string, variant: number, slug: string): string[] {
  const pool = SOLUTIONS_BY_CATEGORY[category];
  const base = pool[variant % pool.length];
  const engineSols = ENGINE_SPECIFIC_SOLUTIONS[engine] ?? ENGINE_SPECIFIC_SOLUTIONS[
    slug.includes("google-ai") ? "google-ai-overview" :
    slug.includes("bing-chat") ? "bing-chat" : "chatgpt"
  ];
  const sv = subVariant(slug, 20, base.length);
  const picked: string[] = [];
  for (let i = 0; i < 4 && i < base.length; i++) {
    picked.push(base[(sv + i) % base.length]);
  }
  const ev = subVariant(slug, 21, engineSols.length);
  for (let i = 0; i < 2 && i < engineSols.length; i++) {
    picked.push(engineSols[(ev + i) % engineSols.length]);
  }
  return picked;
}

// --- Layout: Data First ---
function generateDataFirstLayout(
  industry: string, engine: string,
  problems: string[], solutions: string[],
  engineTrait: EngineTrait, slug: string,
): IndustryEngineSection[] {
  const v = subVariant(slug, 30, 3);
  const narratives = [
    `根據最新數據，超過 60% 嘅${industry}潛在客戶已經開始用 ${engine} 做購買前研究。但絕大部分${industry}公司嘅網站仲未針對 AI 搜尋做任何優化。呢個差距就係你嘅機會。`,
    `${engine} 每日處理數以百萬計嘅${industry}相關查詢。呢啲查詢嘅特點係高意圖——用戶唔係隨便瀏覽，而係準備做決定。如果你嘅品牌唔喺 ${engine} 嘅推薦名單入面，你正在流失最有價值嘅客戶。`,
    `AI 搜尋正在改變${industry}行業嘅遊戲規則。數據顯示，被 ${engine} 推薦嘅品牌平均獲得 3-5 倍嘅品牌搜尋量增長。原因好簡單——用戶信任 AI 嘅推薦。`,
  ];

  return [
    {
      type: "stats-box",
      title: `${industry} × ${engine}：關鍵數據`,
      content: narratives[v],
    },
    {
      type: "problems",
      title: `你嘅${industry}喺 ${engine} 面對嘅挑戰`,
      content: problems,
    },
    {
      type: "narrative",
      title: `點解 ${engine} 對${industry}咁重要`,
      content: `${engine} 嘅核心優勢係${engineTrait.strengthArea}。用戶群體主要係${engineTrait.audienceProfile}。佢嘅引用方式係${engineTrait.citationType}——呢個特點決定咗你嘅${industry}內容需要以特定方式呈現先會被推薦。`,
    },
    {
      type: "solutions",
      title: `SurfIO 嘅${industry} ${engine} AEO 方案`,
      content: solutions,
    },
    {
      type: "steps",
      title: "實施路線圖",
      content: `由審計到執行，我哋嘅${industry} AEO 流程分四個階段：`,
      items: [
        { title: "第 1-2 週：AI 搜尋審計", desc: `全面分析你嘅${industry}品牌喺 ${engine} 嘅現狀——能見度、引用頻率、競爭對手分析。` },
        { title: "第 3-4 週：策略制定", desc: `根據審計結果制定度身訂造嘅 AEO 策略——包括內容計劃、技術優化同引用建設。` },
        { title: "第 2-3 個月：執行優化", desc: "實施結構化數據、內容優化、知識圖譜建設同引用建設。" },
        { title: "持續：監測迭代", desc: `每月追蹤你喺 ${engine} 嘅能見度變化，持續調整策略。` },
      ],
    },
  ];
}

// --- Layout: Problem Driven ---
function generateProblemDrivenLayout(
  industry: string, engine: string,
  problems: string[], solutions: string[],
  engineTrait: EngineTrait, slug: string,
): IndustryEngineSection[] {
  const v = subVariant(slug, 31, 3);
  const storyIntros = [
    `想像一下：一個${industry}嘅潛在客戶打開 ${engine}，輸入佢嘅問題。AI 立即回答——推薦咗三間公司。你唔喺度。客戶直接聯絡被推薦嘅公司。你甚至唔知道自己失去咗呢個客戶。呢個場景每日都喺發生。`,
    `你嘅${industry}公司可能做咗十年，口碑好好，客戶滿意度高。但新一代客戶唔再問朋友——佢哋問 ${engine}。如果 ${engine} 唔認識你，對呢班客戶嚟講你就係唔存在。`,
    `傳統嘅獲客方式——Google 搜尋、口碑轉介、廣告——仲有用，但佢哋嘅影響力正在被 ${engine} 呢類 AI 搜尋工具稀釋緊。越嚟越多${industry}客戶嘅第一個動作係問 AI，唔係 Google。`,
  ];

  return [
    {
      type: "narrative",
      title: `${industry}正面臨嘅 AI 搜尋危機`,
      content: storyIntros[v],
    },
    {
      type: "problems",
      title: "你可能已經遇到呢啲問題",
      content: problems,
    },
    {
      type: "comparison-table",
      title: `有 AEO vs 冇 AEO 嘅${industry}`,
      content: [
        `冇 AEO：${engine} 搜尋結果完全冇你嘅品牌`,
        `有 AEO：你嘅${industry}品牌成為 AI 推薦嘅首選`,
        `冇 AEO：客戶被推薦去你嘅競爭對手度`,
        `有 AEO：客戶直接搵你——因為 AI 話你係最好嘅選擇`,
      ],
    },
    {
      type: "solutions",
      title: "SurfIO 點幫你解決",
      content: solutions,
    },
    {
      type: "narrative",
      title: `點解針對 ${engine} 嘅策略唔同`,
      content: `${engine} 嘅用戶行為係${engineTrait.userBehavior}。佢嘅內容偏好係${engineTrait.contentPref}。呢啲特點意味住你嘅${industry}內容需要做出針對性嘅調整——而唔係用一套通用嘅 SEO 策略就算。`,
    },
  ];
}

// --- Layout: Comparison ---
function generateComparisonLayout(
  industry: string, engine: string,
  problems: string[], solutions: string[],
  engineTrait: EngineTrait, slug: string,
): IndustryEngineSection[] {
  const v = subVariant(slug, 32, 3);
  const comparisonIntros = [
    `傳統 SEO 幫你喺 Google 排名——但 ${engine} 嘅推薦系統用完全唔同嘅邏輯。以下係${industry}公司喺 SEO 同 AEO 嘅差異對比。`,
    `好多${industry}老闆以為做好 SEO 就夠——但 ${engine} 嘅引擎同 Google 完全唔同。呢個比較會幫你理解點解你需要獨立嘅 AEO 策略。`,
    `你嘅${industry}公司可能 Google 排名好好，但喺 ${engine} 入面完全隱形。以下比較會話你知點解會咁。`,
  ];

  return [
    {
      type: "comparison-table",
      title: "SEO vs AEO：關鍵差異",
      content: comparisonIntros[v],
      items: [
        { title: "目標", desc: `SEO：Google 排名 → AEO：${engine} 推薦` },
        { title: "評估方式", desc: "SEO：關鍵字排名 → AEO：品牌引用頻率" },
        { title: "核心策略", desc: `SEO：反向連結 + 關鍵字 → AEO：知識圖譜 + 結構化數據 + ${engineTrait.contentPref}` },
        { title: "成效指標", desc: "SEO：自然流量 → AEO：AI 引用次數 + 品牌提及" },
        { title: "時間框架", desc: "SEO：3-6 個月 → AEO：2-4 個月（因為競爭仲未激烈）" },
      ],
    },
    {
      type: "problems",
      title: `${industry}常見嘅 AEO 盲點`,
      content: problems,
    },
    {
      type: "solutions",
      title: "SurfIO 嘅差異化方案",
      content: solutions,
    },
    {
      type: "narrative",
      title: `${engine} 嘅獨特之處`,
      content: `${engine} 嘅引用方式係${engineTrait.citationType}。佢嘅更新頻率係${engineTrait.updateFreq}。弱點係${engineTrait.weakness}。理解呢啲特點對制定有效嘅${industry} AEO 策略至關重要。`,
    },
    {
      type: "checklist",
      title: `${industry} ${engine} AEO 快速自查`,
      content: [
        `你嘅${industry}網站有冇完善嘅 structured data？`,
        `你嘅品牌喺知識圖譜入面有冇實體？`,
        "你嘅內容最近一次更新係幾時？",
        `你有冇監測自己喺 ${engine} 嘅能見度？`,
        `你嘅內容係咪符合 ${engine} 嘅偏好——${engineTrait.contentPref}？`,
      ],
    },
  ];
}

// --- Layout: Story ---
function generateStoryLayout(
  industry: string, engine: string,
  problems: string[], solutions: string[],
  engineTrait: EngineTrait, slug: string,
): IndustryEngineSection[] {
  const v = subVariant(slug, 33, 3);
  const caseStudies = [
    `一間香港${industry}公司，喺 Google 排名一直好穩定，每月自然流量超過 10,000。但 2025 年下半年，佢哋發現新客查詢量跌咗 30%。原因？客戶轉咗用 ${engine} 搜尋——而呢間公司喺 ${engine} 完全冇曝光。SurfIO 用咗 3 個月幫佢哋建立 AI 搜尋能見度，結果新客查詢量唔止恢復，仲超越咗高峰期 40%。`,
    `「我哋試過自己做 AEO，但完全冇效果。」呢個係一間${industry}公司老闆嘅原話。問題喺邊？佢哋用 SEO 嘅思維做 AEO——堆關鍵字、寫 blog post。但 ${engine} 唔係 Google。SurfIO 從根本重新設計咗佢哋嘅內容策略——3 個月後，佢哋嘅品牌開始持續出現喺 ${engine} 嘅推薦入面。`,
    `2025 年中，兩間同區嘅${industry}公司，規模差唔多，服務質素都好高。分別係：A 公司投入咗 AEO 優化，B 公司覺得「仲唔需要」。6 個月後，A 公司喺 ${engine} 成為行業首選推薦，新客增長 150%。B 公司仲停留喺只靠 Google 嘅階段——而 Google 嘅自然流量已經開始下跌。`,
  ];

  return [
    {
      type: "case-study",
      title: `真實案例：${industry}公司嘅 AI 搜尋轉型`,
      content: caseStudies[v],
    },
    {
      type: "problems",
      title: "呢間公司之前面對嘅問題",
      content: problems,
    },
    {
      type: "narrative",
      title: `${engine} 點改變咗遊戲規則`,
      content: `${engine} 嘅用戶群主要係${engineTrait.audienceProfile}——對${industry}嚟講，呢班正正係高價值客戶。佢哋嘅搜尋行為係${engineTrait.userBehavior}。呢啲用戶一旦得到 AI 推薦，轉化率極高——因為佢哋信任 AI 嘅判斷。`,
    },
    {
      type: "solutions",
      title: "SurfIO 用咗咩策略",
      content: solutions,
    },
    {
      type: "steps",
      title: "你都可以複製呢個成功",
      content: "跟住以下步驟開始你嘅 AEO 之旅：",
      items: [
        { title: "免費 AI 搜尋審計", desc: `SurfIO 幫你分析你嘅${industry}品牌喺 ${engine} 嘅現狀。` },
        { title: "差距分析", desc: "了解你同被 AI 推薦嘅競爭對手之間嘅差距。" },
        { title: "制定策略", desc: `根據 ${engine} 嘅特點同你嘅${industry}行業需求制定方案。` },
        { title: "執行同追蹤", desc: "實施優化並持續監測效果——確保你嘅投資有回報。" },
      ],
    },
  ];
}

// --- Layout: Checklist ---
function generateChecklistLayout(
  industry: string, engine: string,
  problems: string[], solutions: string[],
  engineTrait: EngineTrait, slug: string,
): IndustryEngineSection[] {
  const v = subVariant(slug, 34, 3);
  const checklistIntros = [
    `以下係一份${industry}公司嘅 ${engine} AEO 自查清單。如果你超過一半冇做到，你嘅品牌幾乎肯定喺 AI 搜尋入面係隱形嘅。`,
    `做 AEO 唔係一步到位嘅事——但你可以先用呢份 checklist 了解自己嘅${industry}公司而家嘅 AI 搜尋準備程度。`,
    `呢份 ${engine} AEO checklist 涵蓋咗${industry}公司最需要關注嘅範疇。每個項目都直接影響你被 AI 推薦嘅機會。`,
  ];

  return [
    {
      type: "narrative",
      title: `${industry} ${engine} AEO 完整自查`,
      content: checklistIntros[v],
    },
    {
      type: "checklist",
      title: "技術基礎",
      content: [
        `網站有冇完整嘅 JSON-LD structured data？`,
        `你嘅品牌有冇 Knowledge Graph entity？`,
        `所有頁面嘅 Schema markup 有冇正確實施？`,
        `網站速度同 Core Web Vitals 有冇達標？`,
        `Sitemap 有冇提交到 Google 同 Bing？`,
      ],
    },
    {
      type: "checklist",
      title: "內容質素",
      content: [
        `有冇定期出${industry}行業嘅專業分析？`,
        `內容有冇清晰嘅作者署名同專家 bio？`,
        `FAQ 頁面有冇涵蓋最常見嘅${industry}查詢？`,
        `所有 claim 有冇數據同來源支持？`,
        `內容係咪用${engineTrait.contentPref}嘅格式呈現？`,
      ],
    },
    {
      type: "problems",
      title: "常見陷阱——你有冇中招？",
      content: problems,
    },
    {
      type: "solutions",
      title: "SurfIO 點幫你逐項解決",
      content: solutions,
    },
    {
      type: "checklist",
      title: "引用同信任建設",
      content: [
        `你嘅${industry}品牌有冇喺權威第三方平台被提及？`,
        "有冇行業獎項、認證或者學術合作？",
        `Google Business Profile 同 Bing Places 資訊有冇保持一致？`,
        `有冇同行業媒體建立穩定嘅 earned media 關係？`,
        "社交媒體 profile 有冇同官方網站互相連結？",
      ],
    },
  ];
}

// ============================
// Internal links generator
// ============================
function generateInternalLinks(industrySlug: string, engineSlug: string): { label: string; path: string }[] {
  const links: { label: string; path: string }[] = [];

  // Link to same industry with other engines (pick 2)
  const otherEngines = AI_ENGINES.filter(e => e.slug !== engineSlug);
  const e1 = subVariant(industrySlug + engineSlug, 40, otherEngines.length);
  const e2 = (e1 + 1) % otherEngines.length;
  links.push({
    label: `${ALL_INDUSTRIES.find(i => i.slug === industrySlug)?.name ?? ""} × ${otherEngines[e1].name} 優化`,
    path: `/aeo/${industrySlug}-${otherEngines[e1].slug}`,
  });
  links.push({
    label: `${ALL_INDUSTRIES.find(i => i.slug === industrySlug)?.name ?? ""} × ${otherEngines[e2].name} 優化`,
    path: `/aeo/${industrySlug}-${otherEngines[e2].slug}`,
  });

  // Link to same engine with other industries (pick 2)
  const category = getCategory(industrySlug);
  const sameCategory = ALL_INDUSTRIES.filter(i => getCategory(i.slug) === category && i.slug !== industrySlug);
  if (sameCategory.length > 0) {
    const i1 = subVariant(industrySlug + engineSlug, 41, sameCategory.length);
    links.push({
      label: `${sameCategory[i1].name} × ${AI_ENGINES.find(e => e.slug === engineSlug)?.name ?? ""} 優化`,
      path: `/aeo/${sameCategory[i1].slug}-${engineSlug}`,
    });
  }

  // Link to engine guide
  links.push({
    label: `${AI_ENGINES.find(e => e.slug === engineSlug)?.name ?? ""} 排名因素分析`,
    path: `/guide/${engineSlug}-ranking-factors`,
  });

  // Link to use case
  const useCases = ["brand-monitoring", "lead-generation", "content-strategy", "competitor-analysis", "ai-readiness-audit"];
  const ucIdx = subVariant(industrySlug + engineSlug, 42, useCases.length);
  links.push({
    label: "AI 準備度審計",
    path: `/use-case/${useCases[ucIdx]}`,
  });

  return links;
}

// ============================
// Main export
// ============================
export function getIndustryEnginePages(): IndustryEngineData[] {
  const pages: IndustryEngineData[] = [];

  for (const industry of ALL_INDUSTRIES) {
    for (const engine of AI_ENGINES) {
      const slug = `${industry.slug}-${engine.slug}`;
      const layout = pickLayout(slug);
      const heroV = pickVariant(slug, HERO_OPENERS.length);
      const statsV = subVariant(slug, 50, STATS_POOLS.length);
      const faqV = subVariant(slug, 51, FAQ_POOLS.length);
      const ctaV = subVariant(slug, 52, CTA_VARIANTS.length);
      const category = getCategory(industry.slug);

      // Build stats with industry/engine names filled in
      const statsTemplate = STATS_POOLS[statsV];
      const stats = statsTemplate.map(s => ({
        value: s.value,
        label: s.label(industry.name, engine.name),
      }));

      // Build FAQs
      const faqTemplate = FAQ_POOLS[faqV];
      const faqs = faqTemplate.map(fn => fn(industry.name, engine.name));

      // Resolve engine slug for sections (handle compound slugs)
      const resolvedEngineSlug = engine.slug;

      pages.push({
        slug,
        industrySlug: industry.slug,
        engineSlug: engine.slug,
        industryName: industry.name,
        engineName: engine.name,
        layout,
        heroTitle: `${industry.name} ${engine.name} 優化：令 AI 搜尋推薦你嘅${industry.name}服務`,
        heroSubtitle: HERO_OPENERS[heroV](industry.name, engine.name),
        sections: generateSections(industry.name, engine.name, layout, slug, category),
        stats,
        faqs,
        internalLinks: generateInternalLinks(industry.slug, resolvedEngineSlug),
        metaTitle: `${industry.name} ${engine.name} AEO 優化 | 令 ${engine.name} 推薦你 - SurfIO`,
        metaDescription: `SurfIO 幫${industry.name}喺 ${engine.name} 被推薦。專業${industry.name} AEO 策略，提升 AI 搜尋能見度。${CTA_VARIANTS[ctaV](industry.name, engine.name)}`,
      });
    }
  }

  return pages;
}
