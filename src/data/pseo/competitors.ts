// ============================
// Cluster B: Competitor Pages
// 65 competitors × 3 page types = 195 pages
// ============================

import {
  type CompetitorData,
  type CompetitorPageType,
  ALL_COMPETITORS,
  pickLayout,
  pickVariant,
} from "./types";

// --- Slug helper ---
export function competitorToSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/\./g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// --- Page type metadata ---
const PAGE_TYPE_SUFFIXES: Record<CompetitorPageType, string> = {
  alternative: "替代方案",
  comparison: "比較",
  migration: "遷移",
};

// ============================
// Content Variation Pools
// ============================

// --- Hero titles per page type × category ---

const HERO_TITLES_ALTERNATIVE: Record<string, ((c: string) => string)[]> = {
  "SEO Agency": [
    (c: string) => `搵緊 ${c} 嘅替代方案？SurfIO 專攻 AEO`,
    (c: string) => `${c} 以外嘅選擇：SurfIO AEO 專業服務`,
    (c: string) => `唔想再用 ${c}？SurfIO 幫你做 AI 搜尋優化`,
    (c: string) => `${c} 替代方案：SurfIO 帶你進入 AEO 新時代`,
    (c: string) => `由 ${c} 轉到 SurfIO，升級你嘅 AI 可見度`,
    (c: string) => `${c} 做唔到嘅嘢：SurfIO 嘅 AEO 專長`,
    (c: string) => `仲用緊 ${c}？AEO 時代要揀 SurfIO`,
  ],
  "SEO Tools": [
    (c: string) => `${c} 替代方案：SurfIO 做到工具做唔到嘅嘢`,
    (c: string) => `唔止係 ${c}：SurfIO 幫你搞掂成個 AEO 策略`,
    (c: string) => `${c} 以外嘅選擇——SurfIO 全方位 AEO 服務`,
    (c: string) => `工具唔夠用？${c} 用家轉用 SurfIO 嘅原因`,
    (c: string) => `${c} 嘅最佳替代：SurfIO AEO 專家團隊`,
    (c: string) => `由 ${c} 工具升級到 SurfIO 全套 AEO 服務`,
    (c: string) => `${c} 用戶注意：AEO 需要嘅唔止係工具`,
  ],
  "AI Content Tools": [
    (c: string) => `${c} 替代方案：SurfIO 唔止生成內容，仲優化 AI 引用`,
    (c: string) => `搵緊 ${c} 之外嘅 AEO 方案？SurfIO 係答案`,
    (c: string) => `${c} 寫內容，SurfIO 令 AI 引用你——邊個更有價值？`,
    (c: string) => `唔好再靠 ${c} 生成內容，SurfIO 幫你贏 AI 搜尋`,
    (c: string) => `${c} 以外：SurfIO 專注 AI 搜尋引擎優化`,
    (c: string) => `由 ${c} 到 SurfIO——從內容生成到 AI 引用優化`,
    (c: string) => `${c} 用家轉用 SurfIO 嘅三大理由`,
  ],
  "Content Platforms": [
    (c: string) => `${c} 替代方案：SurfIO 專注 AEO 內容優化`,
    (c: string) => `管理內容唔夠，${c} 用家需要 SurfIO 嘅 AEO 策略`,
    (c: string) => `${c} 做內容管理，SurfIO 做 AI 搜尋優化`,
    (c: string) => `搵緊 ${c} 嘅 AEO 替代？SurfIO 幫到你`,
    (c: string) => `由 ${c} 升級到 SurfIO，內容管理到 AI 優化`,
    (c: string) => `${c} 以外：SurfIO 令你嘅內容被 AI 搜尋引用`,
    (c: string) => `${c} 管理內容流程，SurfIO 管理 AI 能見度`,
  ],
  "Digital PR": [
    (c: string) => `${c} 替代方案：SurfIO 帶你由傳統 PR 走向 AEO`,
    (c: string) => `${c} 做傳統 PR，SurfIO 做 AI 時代嘅 PR`,
    (c: string) => `唔止係 ${c}：SurfIO 幫你喺 AI 搜尋建立權威`,
    (c: string) => `${c} 以外嘅選擇——SurfIO 嘅 AI 公關策略`,
    (c: string) => `搵緊 ${c} 嘅替代？SurfIO 專攻 AI 引用建設`,
    (c: string) => `由 ${c} 到 SurfIO——PR 策略嘅 AI 升級`,
    (c: string) => `${c} 用家注意：AI 搜尋改變咗 PR 嘅玩法`,
  ],
};

const HERO_TITLES_COMPARISON: Record<string, ((c: string) => string)[]> = {
  "SEO Agency": [
    (c: string) => `SurfIO vs ${c}：邊個 AEO 服務更強？`,
    (c: string) => `${c} 定 SurfIO？AEO 專家話你知`,
    (c: string) => `SurfIO 同 ${c} 嘅全面比較：AEO 篇`,
    (c: string) => `揀 ${c} 定 SurfIO？睇完呢篇就知`,
    (c: string) => `${c} vs SurfIO：邊間更適合 AI 搜尋時代`,
    (c: string) => `SurfIO 對比 ${c}——AEO 能力大比拼`,
    (c: string) => `${c} 同 SurfIO 邊個好？深入分析`,
  ],
  "SEO Tools": [
    (c: string) => `SurfIO vs ${c}：工具定服務，邊個啱你？`,
    (c: string) => `${c} 同 SurfIO 全面比較：AEO 角度`,
    (c: string) => `SurfIO 對比 ${c}——唔同打法，邊個贏？`,
    (c: string) => `揀 ${c} 工具定 SurfIO 服務？完整對比`,
    (c: string) => `${c} vs SurfIO：DIY 工具 vs 全包服務`,
    (c: string) => `SurfIO 同 ${c} 嘅真實比較——AEO 效果`,
    (c: string) => `${c} 定 SurfIO？由功能到成效全面比`,
  ],
  "AI Content Tools": [
    (c: string) => `SurfIO vs ${c}：AI 內容生成 vs AI 搜尋優化`,
    (c: string) => `${c} 同 SurfIO 比較：寫內容 vs 贏引用`,
    (c: string) => `SurfIO 對比 ${c}——AI 時代邊個更有用？`,
    (c: string) => `${c} 生成內容，SurfIO 贏得引用——深入對比`,
    (c: string) => `揀 ${c} 定 SurfIO？AI 搜尋策略比較`,
    (c: string) => `SurfIO vs ${c}：兩種唔同嘅 AI 策略`,
    (c: string) => `${c} 同 SurfIO 邊個幫到你嘅 AEO？`,
  ],
  "Content Platforms": [
    (c: string) => `SurfIO vs ${c}：內容管理 vs 內容優化`,
    (c: string) => `${c} 同 SurfIO 比較：管理流程 vs AI 策略`,
    (c: string) => `SurfIO 對比 ${c}——AEO 需要邊種工具？`,
    (c: string) => `${c} 定 SurfIO？內容平台 vs AEO 服務`,
    (c: string) => `SurfIO vs ${c}：平台功能全面對比`,
    (c: string) => `揀 ${c} 定 SurfIO？AEO 視角分析`,
    (c: string) => `${c} 管理內容，SurfIO 優化 AI 引用——詳細比較`,
  ],
  "Digital PR": [
    (c: string) => `SurfIO vs ${c}：傳統 PR vs AI 公關`,
    (c: string) => `${c} 同 SurfIO 比較：PR 策略大不同`,
    (c: string) => `SurfIO 對比 ${c}——邊個幫你贏 AI 引用？`,
    (c: string) => `${c} 做曝光，SurfIO 做 AI 權威——全面比較`,
    (c: string) => `揀 ${c} 定 SurfIO？PR 策略新舊對比`,
    (c: string) => `SurfIO vs ${c}：邊個更適合 AI 搜尋時代`,
    (c: string) => `${c} 同 SurfIO PR 服務比較——2026 年版`,
  ],
};

const HERO_TITLES_MIGRATION: Record<string, ((c: string) => string)[]> = {
  "SEO Agency": [
    (c: string) => `點樣從 ${c} 順利轉用 SurfIO`,
    (c: string) => `${c} 到 SurfIO 遷移指南：逐步教你`,
    (c: string) => `從 ${c} 轉到 SurfIO 嘅完整流程`,
    (c: string) => `準備離開 ${c}？SurfIO 遷移無痛攻略`,
    (c: string) => `${c} 轉 SurfIO：點樣保持 SEO 成果同時升級 AEO`,
    (c: string) => `由 ${c} 遷移到 SurfIO——你需要知嘅一切`,
    (c: string) => `${c} 用家轉 SurfIO 嘅實戰指南`,
  ],
  "SEO Tools": [
    (c: string) => `由 ${c} 工具轉用 SurfIO 服務嘅完整攻略`,
    (c: string) => `點樣從 ${c} DIY 升級到 SurfIO 全包服務`,
    (c: string) => `${c} 到 SurfIO：由工具思維轉到服務思維`,
    (c: string) => `從 ${c} 轉到 SurfIO——遷移唔使驚`,
    (c: string) => `離開 ${c}？SurfIO 幫你無縫過渡`,
    (c: string) => `${c} 用戶轉 SurfIO 嘅 5 個步驟`,
    (c: string) => `由 ${c} 遷移到 SurfIO 嘅真實經驗分享`,
  ],
  "AI Content Tools": [
    (c: string) => `從 ${c} 轉到 SurfIO：AI 內容策略升級`,
    (c: string) => `${c} 到 SurfIO 遷移指南：由寫嘢到贏引用`,
    (c: string) => `點樣從 ${c} 過渡到 SurfIO AEO 服務`,
    (c: string) => `準備離開 ${c}？SurfIO 幫你重新定義 AI 策略`,
    (c: string) => `${c} 轉 SurfIO：內容生成到內容優化嘅旅程`,
    (c: string) => `由 ${c} 遷移到 SurfIO——完整過渡計劃`,
    (c: string) => `${c} 用家轉 SurfIO 嘅成功路徑`,
  ],
  "Content Platforms": [
    (c: string) => `從 ${c} 轉到 SurfIO 嘅完整遷移流程`,
    (c: string) => `${c} 到 SurfIO：內容平台遷移實戰指南`,
    (c: string) => `點樣從 ${c} 順利過渡到 SurfIO AEO 服務`,
    (c: string) => `離開 ${c}？SurfIO 遷移步驟話你知`,
    (c: string) => `${c} 轉 SurfIO：保留內容資產，升級 AI 策略`,
    (c: string) => `由 ${c} 到 SurfIO——遷移攻略同注意事項`,
    (c: string) => `${c} 用家點樣無痛轉用 SurfIO`,
  ],
  "Digital PR": [
    (c: string) => `從 ${c} 轉到 SurfIO 嘅 PR 策略升級指南`,
    (c: string) => `${c} 到 SurfIO：由傳統 PR 遷移到 AI PR`,
    (c: string) => `點樣從 ${c} 過渡到 SurfIO 嘅 AEO 公關服務`,
    (c: string) => `準備離開 ${c}？SurfIO 幫你順利過渡`,
    (c: string) => `${c} 轉 SurfIO：PR 工具遷移全攻略`,
    (c: string) => `由 ${c} 遷移到 SurfIO——保留關係，升級策略`,
    (c: string) => `${c} 用家轉 SurfIO PR 服務嘅逐步指南`,
  ],
};

// --- Hero subtitles per category ---

const HERO_SUBTITLES: Record<string, Record<CompetitorPageType, string[]>> = {
  "SEO Agency": {
    alternative: [
      "傳統 SEO 代理做唔到 AEO，SurfIO 專為 AI 搜尋時代而設",
      "SEO 代理仲停留喺 Google 排名，SurfIO 已經幫客戶贏 AI 引用",
      "一般 SEO 服務唔包 AEO，SurfIO 幫你由零開始建立 AI 能見度",
      "AI 搜尋引擎改變咗遊戲規則，SurfIO 帶你走在前面",
      "唔好再用舊方法做 SEO，SurfIO 嘅 AEO 策略先係未來",
    ],
    comparison: [
      "全面比較兩間公司嘅服務範圍、AEO 能力同客戶成效",
      "深入分析邊間更適合你嘅 AI 搜尋優化需求",
      "由服務模式到實際成效，逐項比較話你知",
      "唔知揀邊間？呢篇詳細對比幫你做決定",
      "AEO 專業度、服務深度、價格——全方位比較",
    ],
    migration: [
      "詳細遷移步驟同時間表，確保 SEO 成果唔受影響",
      "由傳統 SEO 服務順利過渡到 AEO 策略嘅完整指南",
      "SurfIO 團隊幫你處理所有遷移細節，最快兩星期完成",
      "保留現有 SEO 排名，同時加入 AEO 優化",
      "遷移過程零停機，SEO 同 AEO 雙線並行",
    ],
  },
  "SEO Tools": {
    alternative: [
      "工具俾你數據，SurfIO 俾你結果——AEO 需要專家執行",
      "自己用工具做 SEO 好辛苦，SurfIO 全包 AEO 幫你搞掂",
      "SEO 工具睇數據，SurfIO 做策略——AI 搜尋需要嘅係後者",
      "由 DIY 工具升級到全方位 AEO 服務，效果完全唔同",
      "工具只係起點，SurfIO 嘅 AEO 專家幫你行到終點",
    ],
    comparison: [
      "工具 vs 服務：邊種模式更適合你嘅 AEO 需求？",
      "由功能、價格到實際效果，幫你揀最啱嘅方案",
      "SEO 工具有佢嘅用途，但 AEO 需要更多——詳細比較",
      "DIY 定全包？呢篇比較幫你搵到答案",
      "工具數據 vs 專家策略——兩種做法嘅真實對比",
    ],
    migration: [
      "由工具自助轉到專家服務，呢篇教你點樣順利過渡",
      "SurfIO 可以整合你現有工具嘅數據，遷移零損失",
      "唔使一步到位——SurfIO 幫你逐步由工具轉到全包服務",
      "保留工具投資，加入 SurfIO AEO 服務作為升級",
      "工具數據遷移到 SurfIO 平台嘅完整流程",
    ],
  },
  "AI Content Tools": {
    alternative: [
      "AI 寫嘢工具氾濫，但 AEO 需要嘅係優化——SurfIO 幫到你",
      "生成內容容易，被 AI 搜尋引用先至難——SurfIO 專攻呢個",
      "AI 內容工具寫嘢，SurfIO 令你嘅內容被 ChatGPT 引用",
      "寫完內容之後呢？SurfIO 幫你嘅內容贏得 AI 引用",
      "唔好混淆 AI 寫嘢同 AI 搜尋優化——SurfIO 做後者",
    ],
    comparison: [
      "AI 內容生成 vs AI 搜尋優化——兩個完全唔同嘅世界",
      "寫嘢工具同 AEO 服務嘅真實效果比較",
      "一個幫你寫，一個幫你贏——詳細功能對比",
      "AI 內容質量 vs AI 引用次數——你更需要邊個？",
      "由生成到優化，兩種 AI 策略嘅全面分析",
    ],
    migration: [
      "由 AI 寫嘢轉到 AI 搜尋優化嘅策略升級指南",
      "保留你嘅內容資產，加入 SurfIO 嘅 AEO 優化",
      "SurfIO 可以優化你用 AI 工具生成嘅所有內容",
      "唔使放棄現有工具——SurfIO 係補充，唔係取代",
      "由內容生成工具過渡到 AEO 服務嘅最佳路徑",
    ],
  },
  "Content Platforms": {
    alternative: [
      "內容管理平台管理流程，SurfIO 管理 AI 能見度——功能完全唔同",
      "CMS 之上你需要 AEO——SurfIO 填補呢個空白",
      "內容平台幫你發佈，SurfIO 幫你被 AI 搜尋引用",
      "管理內容嘅工具多嘅係，但做 AEO 嘅只有 SurfIO",
      "內容工作流管理 vs AI 搜尋優化——SurfIO 做後者",
    ],
    comparison: [
      "內容管理 vs AEO 優化：兩個唔同層面嘅需求比較",
      "平台功能 vs 策略服務——邊個解決你嘅 AI 搜尋問題？",
      "管理內容同優化內容係兩回事——詳細比較",
      "CMP vs AEO 服務：唔同工具解決唔同問題",
      "由內容流程到 AI 引用——兩種方案嘅全面對比",
    ],
    migration: [
      "由內容平台加入 SurfIO AEO 服務嘅整合指南",
      "SurfIO 可以配合你現有嘅內容平台一齊用",
      "唔使放棄你嘅 CMS——SurfIO 係 AEO 層面嘅升級",
      "現有內容平台 + SurfIO = 完整嘅 AI 搜尋策略",
      "將你嘅內容管理同 AEO 策略無縫整合",
    ],
  },
  "Digital PR": {
    alternative: [
      "傳統 PR 工具追曝光率，SurfIO 追 AI 引用——目標完全唔同",
      "AI 搜尋改變咗 PR 嘅定義，SurfIO 帶你適應新規則",
      "媒體曝光固然重要，但 AI 引用先係新時代嘅 KPI",
      "PR 工具幫你搵記者，SurfIO 幫你被 AI 引用——兩回事",
      "由傳統 PR 思維轉到 AI PR 策略——SurfIO 係你嘅橋樑",
    ],
    comparison: [
      "傳統 PR 工具 vs AI 公關策略——2026 年你需要邊個？",
      "媒體監察 vs AI 引用追蹤——兩種 PR 工具嘅深入對比",
      "PR 曝光 vs AI 引用：邊個對你嘅品牌更重要？",
      "傳統 PR 指標 vs AEO 指標——全面比較分析",
      "由 PR 工具到 AEO 服務——兩種策略嘅效果對比",
    ],
    migration: [
      "由傳統 PR 工具轉到 SurfIO AI PR 服務嘅完整指南",
      "保留你嘅媒體關係，加入 AI 引用建設策略",
      "PR 數據遷移到 SurfIO 平台嘅逐步教學",
      "唔使放棄傳統 PR——SurfIO 幫你加入 AI 層面",
      "由 PR 工具過渡到 AEO 服務嘅實戰路線圖",
    ],
  },
};

// --- Comparison points by category ---

interface ComparisonPool {
  feature: string;
  competitor: string | ((name: string) => string);
  surfio: string;
}

const COMPARISON_POINTS_SEO_AGENCY: ComparisonPool[] = [
  { feature: "AEO 專業度", competitor: "以傳統 SEO 為主，AEO 經驗有限", surfio: "100% 專注 AEO，香港市場領先" },
  { feature: "AI 搜尋引擎覆蓋", competitor: "主要針對 Google", surfio: "覆蓋 Perplexity、ChatGPT、Claude、Gemini 等 7+ AI 引擎" },
  { feature: "服務模式", competitor: (c) => `${c} 提供一般 SEO 套餐`, surfio: "度身定做 AEO 策略，按行業定制" },
  { feature: "技術深度", competitor: "傳統 SEO 技術審計", surfio: "AI 搜尋引擎爬蟲行為分析、Schema 優化、實體建設" },
  { feature: "內容策略", competitor: "關鍵字驅動嘅內容策略", surfio: "AI 引用驅動嘅內容架構設計" },
  { feature: "成效追蹤", competitor: "Google 排名同流量追蹤", surfio: "AI 引用次數、引用位置、品牌提及頻率追蹤" },
  { feature: "E-E-A-T 優化", competitor: "基本 E-A-T 建議", surfio: "深度 E-E-A-T 建設，針對 AI 搜尋信任信號" },
  { feature: "本地化能力", competitor: "通常只做英文市場", surfio: "廣東話、繁體中文市場專家，深耕香港" },
  { feature: "回報週期", competitor: "3-6 個月見效", surfio: "AEO 4-8 星期開始見 AI 引用" },
  { feature: "知識圖譜優化", competitor: "唔包括喺標準服務入面", surfio: "Google Knowledge Graph 同 AI 模型知識優化" },
  { feature: "結構化數據", competitor: "基本 Schema markup", surfio: "進階 Schema，專為 AI 爬蟲優化" },
  { feature: "價格透明度", competitor: (c) => `${c} 通常按月收費，服務範圍唔清晰`, surfio: "清晰定價，每個 deliverable 都有明確說明" },
];

const COMPARISON_POINTS_SEO_TOOLS: ComparisonPool[] = [
  { feature: "使用門檻", competitor: (c) => `${c} 需要自己識用、識分析`, surfio: "全包服務，專家幫你執行所有策略" },
  { feature: "AEO 功能", competitor: "主要做傳統 SEO 分析", surfio: "專為 AI 搜尋引擎設計嘅優化策略" },
  { feature: "人力需求", competitor: "需要內部團隊操作工具", surfio: "唔使請人，SurfIO 團隊幫你做晒" },
  { feature: "AI 引用追蹤", competitor: "冇 AI 引用監察功能", surfio: "實時追蹤 Perplexity、ChatGPT 等引用你品牌嘅情況" },
  { feature: "策略制定", competitor: "提供數據，策略要自己諗", surfio: "由分析到策略到執行全包" },
  { feature: "內容優化", competitor: "關鍵字密度同語義分析", surfio: "AI 搜尋引用模式分析，優化內容結構" },
  { feature: "競爭分析", competitor: "傳統 SERP 競爭分析", surfio: "AI 搜尋引擎引用競爭分析" },
  { feature: "學習曲線", competitor: (c) => `${c} 功能多但要花時間學`, surfio: "零學習成本，專家直接幫你做" },
  { feature: "ROI 追蹤", competitor: "傳統 SEO 指標", surfio: "AI 引用帶嚟嘅真實業務影響分析" },
  { feature: "月度報告", competitor: "自己匯出數據整報告", surfio: "每月詳細 AEO 表現報告，包含行動建議" },
  { feature: "技術支援", competitor: "SaaS 客服支援", surfio: "專屬客戶經理，隨時溝通策略" },
  { feature: "更新頻率", competitor: "工具自動更新", surfio: "策略隨 AI 搜尋引擎演算法變化即時調整" },
];

const COMPARISON_POINTS_AI_TOOLS: ComparisonPool[] = [
  { feature: "核心功能", competitor: (c) => `${c} 生成文字內容`, surfio: "優化內容令 AI 搜尋引擎引用你" },
  { feature: "內容質量", competitor: "AI 生成內容質量參差", surfio: "專家優化嘅高質量 AEO 內容" },
  { feature: "E-E-A-T 信號", competitor: "AI 生成內容缺乏權威性", surfio: "建立真實嘅專業度同權威性信號" },
  { feature: "目標", competitor: "生成更多內容", surfio: "令現有內容被 AI 搜尋引用" },
  { feature: "策略層面", competitor: "內容生產效率工具", surfio: "全面 AEO 策略規劃同執行" },
  { feature: "AI 搜尋適配", competitor: "唔針對 AI 搜尋引擎優化", surfio: "專為 AI 搜尋引擎嘅引用邏輯而設計" },
  { feature: "品牌聲音", competitor: "難以保持一致嘅品牌聲音", surfio: "維護同強化你獨特嘅品牌聲音" },
  { feature: "事實準確性", competitor: "可能生成唔準確嘅內容", surfio: "專家審核確保所有內容事實正確" },
  { feature: "引用建設", competitor: "冇引用建設功能", surfio: "主動建設高權威引用來源" },
  { feature: "結構化數據", competitor: "唔處理 Schema markup", surfio: "完整 Schema 同結構化數據優化" },
  { feature: "長期策略", competitor: "即用即棄嘅內容生成", surfio: "長期 AEO 策略，效果持續累積" },
  { feature: "內容審計", competitor: "唔提供現有內容審計", surfio: "全面內容審計，揾出 AEO 機會" },
];

const COMPARISON_POINTS_CONTENT_PLATFORMS: ComparisonPool[] = [
  { feature: "核心定位", competitor: (c) => `${c} 係內容管理平台`, surfio: "SurfIO 係 AEO 策略服務" },
  { feature: "AI 搜尋優化", competitor: "冇 AEO 相關功能", surfio: "全面 AI 搜尋引擎優化策略" },
  { feature: "工作流管理", competitor: (c) => `${c} 擅長內容工作流`, surfio: "AEO 專案管理同執行" },
  { feature: "內容分發", competitor: "多渠道內容分發", surfio: "針對 AI 搜尋引擎嘅內容佈局策略" },
  { feature: "分析功能", competitor: "內容表現分析", surfio: "AI 引用同 AEO 效果分析" },
  { feature: "團隊協作", competitor: "內容團隊協作工具", surfio: "SurfIO 團隊直接執行，唔使你管" },
  { feature: "個人化", competitor: "內容個人化功能", surfio: "AI 搜尋引擎個人化回應優化" },
  { feature: "整合能力", competitor: "同 CRM/CMS 整合", surfio: "同你現有系統整合，加入 AEO 層面" },
  { feature: "擴展性", competitor: "內容產量擴展", surfio: "AEO 策略擴展到更多 AI 平台" },
  { feature: "ROI 衡量", competitor: "內容 engagement 指標", surfio: "AI 引用帶嚟嘅業務影響指標" },
];

const COMPARISON_POINTS_DIGITAL_PR: ComparisonPool[] = [
  { feature: "核心功能", competitor: (c) => `${c} 管理媒體關係`, surfio: "建設 AI 搜尋引擎引用權威" },
  { feature: "曝光渠道", competitor: "傳統媒體同記者", surfio: "AI 搜尋引擎（Perplexity、ChatGPT、Claude 等）" },
  { feature: "KPI 指標", competitor: "媒體曝光次數同 reach", surfio: "AI 引用次數同引用位置" },
  { feature: "策略方向", competitor: "傳統 PR 策略同新聞稿", surfio: "AI 搜尋信任信號建設策略" },
  { feature: "受眾觸達", competitor: "透過媒體間接觸達", surfio: "透過 AI 搜尋直接觸達搜尋者" },
  { feature: "長尾效果", competitor: "新聞週期短，效果遞減", surfio: "AI 引用效果長期累積" },
  { feature: "監察工具", competitor: "媒體監察同剪報", surfio: "AI 引用實時監察同追蹤" },
  { feature: "危機管理", competitor: "傳統 PR 危機處理", surfio: "AI 搜尋引擎品牌敘事管理" },
  { feature: "關係建設", competitor: "記者同媒體關係", surfio: "高權威來源引用關係建設" },
  { feature: "成效衡量", competitor: "AVE、reach、share of voice", surfio: "AI 引用率、品牌提及準確度、搜尋推薦排名" },
];

// --- Advantages pools by category ---

const ADVANTAGES_SEO_AGENCY: string[] = [
  "SurfIO 係香港唯一專注 AEO 嘅服務商，唔係 SEO 代理順便做 AEO",
  "覆蓋 7+ AI 搜尋引擎，唔止 Google",
  "廣東話同繁體中文 AEO 專家，深耕本地市場",
  "平均 4-8 星期內見到首個 AI 引用成果",
  "每月提供詳細 AI 引用追蹤報告",
  "專利 AEO 方法論，經過 100+ 香港企業驗證",
  "E-E-A-T 深度建設，唔止係表面文章",
  "同你現有 SEO 策略互補，唔會衝突",
  "專屬客戶經理同策略師團隊",
  "AI 搜尋演算法更新後即時調整策略",
  "結構化數據專家，Schema 優化到位",
  "知識圖譜優化提升品牌 AI 認知度",
];

const ADVANTAGES_SEO_TOOLS: string[] = [
  "唔使自己學用複雜工具，SurfIO 專家幫你做晒",
  "工具俾你數據，SurfIO 俾你結果",
  "零學習成本，慳返你團隊嘅時間",
  "AEO 策略需要人嘅判斷，唔係工具自動化能做到",
  "唔使請 AEO 專家加入團隊，SurfIO 已經有",
  "AI 搜尋引擎引用追蹤，傳統 SEO 工具冇嘅功能",
  "每月策略調整會議，確保方向正確",
  "整合多個數據來源，提供全面分析",
  "由技術審計到內容優化到引用建設全包",
  "專屬客戶經理隨時解答你嘅問題",
];

const ADVANTAGES_AI_TOOLS: string[] = [
  "SurfIO 優化內容被 AI 引用，唔止係生成更多內容",
  "專家確保內容事實準確，維護品牌信譽",
  "E-E-A-T 建設令你嘅內容真正有權威性",
  "AI 生成內容需要 AEO 優化先會被引用",
  "SurfIO 幫你建立同維護一致嘅品牌聲音",
  "結構化數據優化令 AI 更容易理解你嘅內容",
  "主動引用建設，唔係被動等 AI 搵到你",
  "長期策略效果累積，唔係用完即棄",
  "內容審計揾出現有內容嘅 AEO 機會",
  "AI 搜尋引擎品牌敘事管理",
];

const ADVANTAGES_CONTENT_PLATFORMS: string[] = [
  "SurfIO 填補內容管理同 AI 搜尋優化之間嘅空白",
  "同你現有 CMS/CMP 無縫配合",
  "唔使管理另一個平台，SurfIO 團隊幫你執行",
  "AI 引用追蹤係內容平台冇嘅功能",
  "由內容管理升級到內容優化+AI 能見度",
  "AEO 策略幫你嘅內容發揮更大價值",
  "專家分析邊啲內容最有 AI 引用潛力",
  "內容結構優化令 AI 搜尋更容易引用",
  "多 AI 平台覆蓋，唔止一個渠道",
  "每月策略報告追蹤 AI 能見度進展",
];

const ADVANTAGES_DIGITAL_PR: string[] = [
  "AI 引用效果長期累積，唔似傳統 PR 效果遞減",
  "直接觸達搜尋者，唔使透過媒體中介",
  "SurfIO 嘅 AI 引用追蹤比傳統 PR 監察更精準",
  "AI 搜尋引擎品牌敘事管理，主動控制你嘅故事",
  "高權威引用來源建設，加強 AI 信任信號",
  "同傳統 PR 互補，唔係取代",
  "AI 搜尋引擎覆蓋多個平台，擴大品牌觸達",
  "結構化數據幫助 AI 正確理解你嘅品牌",
  "危機時期嘅 AI 搜尋引擎品牌保護",
  "實時監察 AI 搜尋點樣描述你嘅品牌",
];

// --- FAQ pools by category × page type ---

type FAQEntry = [string, string];

const FAQS_SEO_AGENCY_ALTERNATIVE: ((c: string) => FAQEntry)[] = [
  (c) => [`SurfIO 同 ${c} 有咩唔同？`, `${c} 主要做傳統 SEO 服務，SurfIO 100% 專注 AEO（AI 搜尋引擎優化）。我哋嘅策略專門針對 Perplexity、ChatGPT、Claude 等 AI 搜尋引擎，幫你嘅品牌被 AI 引用。`],
  (c) => [`我而家用緊 ${c}，可以同時用 SurfIO 嗎？`, `可以。SurfIO 嘅 AEO 服務同傳統 SEO 互補，你可以繼續用 ${c} 做 Google SEO，同時加入 SurfIO 做 AI 搜尋優化。`],
  (c) => [`SurfIO 嘅價錢同 ${c} 比點樣？`, `SurfIO 嘅定價反映 AEO 嘅專業價值。相比一般 SEO 代理，我哋嘅服務更加聚焦，ROI 更加可追蹤。具體價格視乎你嘅行業同需求。`],
  (_c) => [`轉用 SurfIO 需要幾耐？`, `SurfIO onboarding 過程通常需要 1-2 星期。我哋會先做全面嘅 AEO 審計，然後制定策略同開始執行。`],
  (_c) => [`SurfIO 有做傳統 SEO 嗎？`, `SurfIO 專注 AEO，但我哋嘅策略包含大量同 SEO 互通嘅元素（如結構化數據、E-E-A-T、內容優化）。如果你需要傳統 SEO，我哋可以推薦合作夥伴。`],
  (_c) => [`SurfIO 服務香港以外嘅客戶嗎？`, `SurfIO 以香港市場為核心，但我哋嘅 AEO 策略適用於任何想喺 AI 搜尋引擎有更高能見度嘅企業。我哋有大灣區同海外客戶。`],
  (_c) => [`AEO 同 SEO 可以一齊做嗎？`, `絕對可以，而且我哋建議雙管齊下。SEO 保住 Google 排名，AEO 攻佔 AI 搜尋引擎——SurfIO 幫你做後者。`],
];

const FAQS_SEO_AGENCY_COMPARISON: ((c: string) => FAQEntry)[] = [
  (c) => [`SurfIO 同 ${c} 邊個成效更好？`, `要視乎你嘅目標。如果你想提升 Google 排名，${c} 可能更專長；如果你想被 AI 搜尋引擎引用，SurfIO 係更好嘅選擇。`],
  (c) => [`SurfIO 嘅團隊同 ${c} 比點樣？`, `SurfIO 團隊全部有 AEO 專業背景，專注研究 AI 搜尋引擎嘅引用機制。${c} 嘅團隊更熟悉傳統 SEO。兩者嘅專長唔同。`],
  (c) => [`SurfIO 有 ${c} 冇嘅咩功能？`, `SurfIO 提供 AI 引用追蹤、AI 搜尋引擎品牌分析、知識圖譜優化等 AEO 專屬服務，呢啲係傳統 SEO 代理通常唔包嘅。`],
  (c) => [`${c} 有做 AEO 嗎？`, `${c} 主要定位係 SEO 代理，可能有涉及少量 AEO 元素，但唔係佢哋嘅核心專長。SurfIO 100% 專注 AEO。`],
  (c) => [`我應該揀 SurfIO 定 ${c}？`, `如果你已經有穩固嘅 SEO 基礎，想要進軍 AI 搜尋引擎，揀 SurfIO。如果你連基本 SEO 都未做好，可以先考慮 ${c}，之後再加入 SurfIO。`],
];

const FAQS_SEO_AGENCY_MIGRATION: ((c: string) => FAQEntry)[] = [
  (c) => [`從 ${c} 轉到 SurfIO 會唔會影響 SEO 排名？`, `唔會。SurfIO 專注 AEO，唔會影響你現有嘅 SEO 設定。如果你停用 ${c} 嘅 SEO 服務，建議另外安排 SEO 維護。`],
  (_c) => [`遷移過程要幾耐？`, `SurfIO 嘅 onboarding 通常 1-2 星期。包括 AEO 審計、策略制定同首批優化執行。唔會影響你嘅日常運營。`],
  (c) => [`可以喺 ${c} 同 SurfIO 之間逐步過渡嗎？`, `可以。好多客戶會先同 SurfIO 做試點項目，見到效果後再全面轉用。我哋支持靈活嘅過渡方案。`],
  (c) => [`${c} 嘅歷史數據可以帶去 SurfIO 嗎？`, `SurfIO 嘅 AEO 審計會參考你嘅歷史 SEO 數據。你可以分享 ${c} 嘅報告同數據，幫我哋更好了解你嘅起點。`],
  (_c) => [`轉用 SurfIO 後幾耐見到效果？`, `AEO 通常 4-8 星期開始見到首個 AI 引用。實際時間取決於你嘅行業競爭度同現有內容質量。`],
];

const FAQS_SEO_TOOLS_ALTERNATIVE: ((c: string) => FAQEntry)[] = [
  (c) => [`SurfIO 係唔係 ${c} 嘅直接替代品？`, `SurfIO 唔係工具，而係全包 AEO 服務。如果你用 ${c} 做傳統 SEO 分析，SurfIO 喺 AI 搜尋優化層面補充佢做唔到嘅嘢。`],
  (c) => [`我可以繼續用 ${c} 同時用 SurfIO 嗎？`, `絕對可以。SurfIO 團隊甚至可以利用 ${c} 嘅數據作為 AEO 策略嘅參考。兩者互補。`],
  (c) => [`SurfIO 嘅價錢同 ${c} 訂閱費比較？`, `${c} 係月費工具（通常 $100-500 USD/月），SurfIO 係全包服務（價格視乎規模）。但 SurfIO 省去你請人操作工具嘅成本。`],
  (_c) => [`我冇技術背景，SurfIO 適合我嗎？`, `完全適合。SurfIO 嘅最大優勢就係唔使你識任何技術，我哋團隊幫你由策略到執行全包。`],
  (_c) => [`SurfIO 用咩工具做分析？`, `SurfIO 有自家嘅 AI 引用追蹤系統，加上行業領先嘅 SEO 工具作為輔助。你唔使自己用任何工具。`],
  (c) => [`${c} 有 AEO 功能嗎？`, `大部分傳統 SEO 工具仲未有專門嘅 AEO 功能。即使有，工具只俾你數據，SurfIO 幫你制定同執行策略。`],
];

const FAQS_SEO_TOOLS_COMPARISON: ((c: string) => FAQEntry)[] = [
  (c) => [`${c} 同 SurfIO 可以一齊用嗎？`, `可以。${c} 做傳統 SEO 分析，SurfIO 做 AEO 策略執行。兩者唔衝突。`],
  (c) => [`SurfIO 有類似 ${c} 嘅工具功能嗎？`, `SurfIO 唔係 SaaS 工具，而係 AEO 服務。我哋用自家技術做 AI 引用分析，但以服務形式交付，你唔使自己操作。`],
  (c) => [`投資 SurfIO vs 投資 ${c}，邊個 ROI 更高？`, `取決於你嘅目標。如果你要做 AI 搜尋優化但冇內部 AEO 人才，SurfIO 嘅 ROI 通常更高，因為省去學習同人力成本。`],
  (_c) => [`SurfIO 適合中小企嗎？`, `適合。SurfIO 有唔同規模嘅方案。中小企通常更加受惠，因為佢哋冇資源請 AEO 專家。`],
  (c) => [`用 ${c} 自己做 AEO 得唔得？`, `${c} 主要做傳統 SEO 分析，AEO 需要嘅 AI 引用追蹤、知識圖譜優化等功能，${c} 目前唔支持。`],
];

const FAQS_SEO_TOOLS_MIGRATION: ((c: string) => FAQEntry)[] = [
  (c) => [`我要取消 ${c} 訂閱先可以用 SurfIO 嗎？`, `唔使。好多客戶保留 ${c} 做傳統 SEO，同時用 SurfIO 做 AEO。你可以按需決定。`],
  (c) => [`${c} 嘅數據可以用喺 SurfIO 嗎？`, `可以。SurfIO 團隊可以參考你 ${c} 嘅歷史數據（排名、流量、反向連結等）來制定更精準嘅 AEO 策略。`],
  (c) => [`由 DIY 轉到全包服務嘅過渡期係幾長？`, `SurfIO onboarding 1-2 星期。期間你可以繼續用 ${c} 維持現有 SEO 工作。`],
  (c) => [`SurfIO 會幫我匯出 ${c} 嘅重要數據嗎？`, `會。SurfIO 嘅 onboarding 流程包括收集你現有嘅 SEO 數據，確保策略制定有充分嘅歷史依據。`],
  (c) => [`轉用 SurfIO 後我仲需要 ${c} 嗎？`, `視乎你嘅需求。如果你想自己監察傳統 SEO 指標，可以保留 ${c}。SurfIO 專注 AEO，兩者唔重疊。`],
];

const FAQS_AI_TOOLS_ALTERNATIVE: ((c: string) => FAQEntry)[] = [
  (c) => [`SurfIO 同 ${c} 做嘅嘢一樣嗎？`, `唔同。${c} 幫你生成內容，SurfIO 幫你優化內容令 AI 搜尋引擎引用你。一個係寫嘢，一個係贏引用。`],
  (c) => [`我用 ${c} 寫嘅內容，SurfIO 可以優化嗎？`, `可以。SurfIO 可以審計同優化你用任何工具（包括 ${c}）生成嘅內容，令佢更容易被 AI 搜尋引用。`],
  (_c) => [`SurfIO 有 AI 內容生成功能嗎？`, `SurfIO 專注 AEO 策略同執行，唔係內容生成工具。但我哋嘅服務包含內容創作同優化，由專家團隊完成。`],
  (c) => [`用 ${c} 生成嘅內容會被 AI 搜尋引用嗎？`, `唔一定。AI 搜尋引擎引用嘅標準同生成方式無關，而係睇內容嘅權威性、準確性同結構化程度——呢啲先係 SurfIO 嘅專長。`],
  (c) => [`${c} 加 SurfIO 可以一齊用嗎？`, `可以。你用 ${c} 生成初稿，SurfIO 團隊幫你優化成適合 AI 搜尋引擎引用嘅內容。呢個組合好有效。`],
  (_c) => [`AI 生成內容同 AEO 有咩關係？`, `AI 生成內容只係生產手段，AEO 係優化策略。SurfIO 確保你嘅內容（無論點生成）都能被 AI 搜尋引擎正確引用。`],
];

const FAQS_AI_TOOLS_COMPARISON: ((c: string) => FAQEntry)[] = [
  (c) => [`${c} 同 SurfIO 邊個幫到我嘅業務更多？`, `如果你嘅問題係「冇時間寫內容」，${c} 幫到你。如果你嘅問題係「AI 搜尋搵唔到我」，SurfIO 先係答案。`],
  (c) => [`SurfIO 嘅內容質量同 ${c} 比較？`, `SurfIO 嘅內容由專家團隊撰寫同優化，專為 AEO 設計，質量同 AI 工具生成嘅內容喺深度同準確性上有明顯分別。`],
  (c) => [`我應該先用 ${c} 定先用 SurfIO？`, `取決於你嘅現況。如果你已經有足夠內容但 AI 搜尋搵唔到你，直接用 SurfIO。如果你連內容都未有，可以先用 ${c} 再搵 SurfIO 優化。`],
  (c) => [`${c} 嘅價錢同 SurfIO 比較？`, `${c} 通常係月費 $30-200 USD 嘅工具訂閱。SurfIO 係全包服務，價格更高但包含策略、執行同追蹤——ROI 唔同層次。`],
  (_c) => [`SurfIO 用 AI 做內容嗎？`, `SurfIO 嘅策略可能包含 AI 輔助，但所有內容都經過專家審核同優化。我哋嘅核心價值係 AEO 策略，唔係 AI 寫嘢。`],
];

const FAQS_AI_TOOLS_MIGRATION: ((c: string) => FAQEntry)[] = [
  (c) => [`從 ${c} 轉到 SurfIO 要點做？`, `你唔使「轉」——SurfIO 同 ${c} 解決唔同問題。你可以繼續用 ${c} 寫嘢，同時用 SurfIO 做 AEO。`],
  (c) => [`${c} 生成嘅舊內容點處理？`, `SurfIO 會審計你所有現有內容（包括 ${c} 生成嘅），揾出最有 AEO 潛力嘅內容優先優化。`],
  (_c) => [`遷移過程複雜嗎？`, `唔複雜。SurfIO onboarding 1-2 星期，主要係分析你嘅現有內容同制定 AEO 策略。唔影響你日常運營。`],
  (c) => [`SurfIO 可以改善 ${c} 生成嘅內容嗎？`, `可以。SurfIO 嘅內容優化服務包括重寫、補充事實、加入結構化數據、建立 E-E-A-T 信號等。`],
  (_c) => [`轉用 SurfIO 要準備咩？`, `主要係分享你嘅業務目標、目標受眾、現有內容同競爭情況。SurfIO 團隊會喺 onboarding 過程指導你。`],
];

const FAQS_CONTENT_PLATFORMS_ALTERNATIVE: ((c: string) => FAQEntry)[] = [
  (c) => [`SurfIO 可以取代 ${c} 嗎？`, `SurfIO 唔係內容管理平台，而係 AEO 服務。如果你需要管理內容工作流，繼續用 ${c}；如果你要 AI 搜尋優化，加入 SurfIO。`],
  (c) => [`SurfIO 同 ${c} 可以整合嗎？`, `可以。SurfIO 可以配合你現有嘅 ${c} 工作流，喺內容管理之上加入 AEO 優化層面。`],
  (c) => [`點解我需要 SurfIO 而唔止 ${c}？`, `${c} 管理內容嘅生產同分發流程，SurfIO 確保你嘅內容被 AI 搜尋引擎引用。兩者解決唔同問題。`],
  (_c) => [`SurfIO 有內容管理功能嗎？`, `SurfIO 專注 AEO 策略同執行，唔做內容管理。但我哋嘅專案管理確保所有 AEO 工作有序進行。`],
  (c) => [`${c} 有 AEO 功能嗎？`, `大部分內容平台仲未有 AEO 功能。${c} 擅長管理內容流程，但 AI 搜尋優化唔係佢嘅範疇。`],
];

const FAQS_CONTENT_PLATFORMS_COMPARISON: ((c: string) => FAQEntry)[] = [
  (c) => [`${c} 同 SurfIO 邊個更值得投資？`, `視乎你嘅需求。如果你嘅瓶頸係內容生產流程，揀 ${c}。如果係 AI 搜尋能見度，揀 SurfIO。最好兩個都用。`],
  (c) => [`SurfIO 有 ${c} 嘅分析功能嗎？`, `SurfIO 嘅分析專注 AI 引用追蹤同 AEO 效果，同 ${c} 嘅內容表現分析唔同但互補。`],
  (c) => [`邊個更適合大企業？`, `大企業通常兩個都需要——${c} 管理內容規模，SurfIO 確保 AI 搜尋能見度。SurfIO 有企業級方案。`],
  (c) => [`SurfIO 嘅團隊協作功能同 ${c} 比較？`, `${c} 嘅協作功能設計俾內部團隊用。SurfIO 係外部服務，由我哋團隊執行，你只需要審批同溝通。`],
  (c) => [`兩者可以同時用嗎？`, `可以，而且建議同時用。${c} 管理你嘅內容流程，SurfIO 確保呢啲內容被 AI 搜尋引擎引用。`],
];

const FAQS_CONTENT_PLATFORMS_MIGRATION: ((c: string) => FAQEntry)[] = [
  (c) => [`從 ${c} 遷移到 SurfIO 要點做？`, `唔使遷移——SurfIO 係 AEO 服務層面嘅補充，唔係取代 ${c}。你可以保留 ${c} 同時加入 SurfIO。`],
  (c) => [`SurfIO 要存取我 ${c} 嘅內容嗎？`, `SurfIO 需要分析你嘅現有內容來制定 AEO 策略。你可以匯出內容或提供存取權限，視乎你嘅偏好。`],
  (c) => [`${c} 嘅內容可以直接用 SurfIO 優化嗎？`, `可以。SurfIO 團隊會審計你喺 ${c} 管理嘅所有內容，揾出 AEO 優化機會。`],
  (c) => [`加入 SurfIO 要幾耐？`, `SurfIO onboarding 1-2 星期，包括內容審計同策略制定。唔影響你繼續用 ${c} 管理內容。`],
  (c) => [`SurfIO 會影響我喺 ${c} 嘅工作流嗎？`, `唔會。SurfIO 嘅 AEO 工作同你嘅內容管理流程分開，但會提供內容優化建議整合到你嘅流程入面。`],
];

const FAQS_DIGITAL_PR_ALTERNATIVE: ((c: string) => FAQEntry)[] = [
  (c) => [`SurfIO 可以取代 ${c} 做 PR 嗎？`, `SurfIO 唔係傳統 PR 工具，而係 AI 搜尋引擎公關策略服務。如果你仲需要傳統 PR，可以保留 ${c}。`],
  (c) => [`SurfIO 有媒體關係功能嗎？`, `SurfIO 嘅「關係建設」係針對高權威引用來源，唔係傳統媒體記者。我哋同 ${c} 嘅定位唔同。`],
  (_c) => [`AI PR 同傳統 PR 有咩分別？`, `傳統 PR 追求媒體曝光，AI PR 追求 AI 搜尋引擎引用。SurfIO 幫你建立 AI 搜尋引擎信任嘅品牌敘事。`],
  (c) => [`點解我需要 SurfIO 而唔止 ${c}？`, `越來越多人透過 AI 搜尋引擎搵資訊，唔係睇傳統媒體。SurfIO 確保你嘅品牌喺 AI 搜尋度有正確嘅敘事。`],
  (c) => [`SurfIO 有監察功能嗎？`, `有。SurfIO 提供 AI 引用實時監察，追蹤 AI 搜尋引擎點樣描述你嘅品牌。呢個係 ${c} 做唔到嘅。`],
];

const FAQS_DIGITAL_PR_COMPARISON: ((c: string) => FAQEntry)[] = [
  (c) => [`${c} 同 SurfIO 邊個更重要？`, `2026 年兩個都重要。${c} 管理傳統媒體關係，SurfIO 管理 AI 搜尋引擎品牌敘事。建議兩者並行。`],
  (c) => [`SurfIO 嘅監察同 ${c} 嘅有咩唔同？`, `${c} 監察傳統媒體提及，SurfIO 監察 AI 搜尋引擎引用。兩種監察追蹤唔同渠道嘅品牌能見度。`],
  (c) => [`投資 SurfIO 定 ${c} 先？`, `如果你嘅目標受眾開始用 AI 搜尋搵資訊（大部分行業已經係），SurfIO 應該同 ${c} 同等優先。`],
  (_c) => [`SurfIO 嘅 ROI 點衡量？`, `SurfIO 追蹤 AI 引用次數、引用位置、品牌提及準確度同由 AI 搜尋引擎帶嚟嘅流量同轉化。`],
  (c) => [`兩者可以配合用嗎？`, `最佳做法係 ${c} 做傳統 PR，SurfIO 做 AI PR。兩者嘅成效會互相加強——傳統媒體曝光提升 AI 引用機率。`],
];

const FAQS_DIGITAL_PR_MIGRATION: ((c: string) => FAQEntry)[] = [
  (c) => [`從 ${c} 轉到 SurfIO 要準備咩？`, `最好唔好「轉」而係「加」。保留 ${c} 嘅傳統 PR 功能，加入 SurfIO 嘅 AI PR 策略。兩者互補。`],
  (c) => [`${c} 嘅媒體名單可以用喺 SurfIO 嗎？`, `SurfIO 嘅引用建設策略唔使傳統媒體名單，但你嘅媒體關係可以幫助提升品牌權威，間接幫到 AEO。`],
  (c) => [`遷移期間 PR 工作會中斷嗎？`, `唔會。SurfIO 嘅 onboarding 同你現有嘅 PR 工作完全獨立。你可以繼續用 ${c} 做傳統 PR。`],
  (_c) => [`SurfIO 嘅 onboarding 包咩？`, `包括品牌 AI 搜尋引擎審計、AI 引用現狀分析、AEO PR 策略制定同首批優化執行。通常 1-2 星期。`],
  (c) => [`加入 SurfIO 後 ${c} 仲有用嗎？`, `有。傳統 PR 同 AI PR 互相加強。${c} 嘅傳統媒體曝光可以提升你嘅品牌權威，幫助 SurfIO 嘅 AEO 策略。`],
];

// ============================
// Content Pool Lookup Maps
// ============================

const HERO_TITLES_MAP: Record<CompetitorPageType, Record<string, ((c: string) => string)[]>> = {
  alternative: HERO_TITLES_ALTERNATIVE,
  comparison: HERO_TITLES_COMPARISON,
  migration: HERO_TITLES_MIGRATION,
};

const COMPARISON_POINTS_MAP: Record<string, ComparisonPool[]> = {
  "SEO Agency": COMPARISON_POINTS_SEO_AGENCY,
  "SEO Tools": COMPARISON_POINTS_SEO_TOOLS,
  "AI Content Tools": COMPARISON_POINTS_AI_TOOLS,
  "Content Platforms": COMPARISON_POINTS_CONTENT_PLATFORMS,
  "Digital PR": COMPARISON_POINTS_DIGITAL_PR,
};

const ADVANTAGES_MAP: Record<string, string[]> = {
  "SEO Agency": ADVANTAGES_SEO_AGENCY,
  "SEO Tools": ADVANTAGES_SEO_TOOLS,
  "AI Content Tools": ADVANTAGES_AI_TOOLS,
  "Content Platforms": ADVANTAGES_CONTENT_PLATFORMS,
  "Digital PR": ADVANTAGES_DIGITAL_PR,
};

type FAQGenerator = (c: string) => FAQEntry;

const FAQS_MAP: Record<string, Record<CompetitorPageType, FAQGenerator[]>> = {
  "SEO Agency": {
    alternative: FAQS_SEO_AGENCY_ALTERNATIVE,
    comparison: FAQS_SEO_AGENCY_COMPARISON,
    migration: FAQS_SEO_AGENCY_MIGRATION,
  },
  "SEO Tools": {
    alternative: FAQS_SEO_TOOLS_ALTERNATIVE,
    comparison: FAQS_SEO_TOOLS_COMPARISON,
    migration: FAQS_SEO_TOOLS_MIGRATION,
  },
  "AI Content Tools": {
    alternative: FAQS_AI_TOOLS_ALTERNATIVE,
    comparison: FAQS_AI_TOOLS_COMPARISON,
    migration: FAQS_AI_TOOLS_MIGRATION,
  },
  "Content Platforms": {
    alternative: FAQS_CONTENT_PLATFORMS_ALTERNATIVE,
    comparison: FAQS_CONTENT_PLATFORMS_COMPARISON,
    migration: FAQS_CONTENT_PLATFORMS_MIGRATION,
  },
  "Digital PR": {
    alternative: FAQS_DIGITAL_PR_ALTERNATIVE,
    comparison: FAQS_DIGITAL_PR_COMPARISON,
    migration: FAQS_DIGITAL_PR_MIGRATION,
  },
};

// --- Meta title/description templates ---

const META_TITLES: Record<CompetitorPageType, ((c: string) => string)[]> = {
  alternative: [
    (c) => `${c} 替代方案 | SurfIO AEO 服務`,
    (c) => `搵緊 ${c} 嘅 AEO 替代？試下 SurfIO`,
    (c) => `SurfIO 作為 ${c} 嘅 AEO 替代方案 | 2026`,
    (c) => `${c} 以外嘅選擇：SurfIO AEO 專家`,
  ],
  comparison: [
    (c) => `SurfIO vs ${c}：AEO 服務比較 | 2026`,
    (c) => `${c} 同 SurfIO 邊個好？深入比較`,
    (c) => `SurfIO vs ${c} 全面比較 | AEO 角度`,
    (c) => `${c} 定 SurfIO？AEO 服務詳細對比`,
  ],
  migration: [
    (c) => `從 ${c} 轉用 SurfIO 嘅完整指南`,
    (c) => `${c} 到 SurfIO 遷移攻略 | AEO 升級`,
    (c) => `點樣從 ${c} 順利轉到 SurfIO`,
    (c) => `${c} 轉 SurfIO 遷移指南 | 2026`,
  ],
};

const META_DESCRIPTIONS: Record<CompetitorPageType, ((c: string, cat: string) => string)[]> = {
  alternative: [
    (c, _cat) => `搵緊 ${c} 嘅替代方案？SurfIO 係香港領先嘅 AEO 服務，專門幫企業優化 AI 搜尋引擎能見度。了解 SurfIO 同 ${c} 嘅分別。`,
    (c, cat) => `${c} 做${cat === "SEO Agency" ? "傳統 SEO" : cat === "SEO Tools" ? "SEO 分析" : cat === "AI Content Tools" ? "AI 內容生成" : cat === "Content Platforms" ? "內容管理" : "傳統 PR"}，SurfIO 做 AEO。了解點解越來越多香港企業揀 SurfIO 作為 ${c} 嘅替代。`,
    (c, _cat) => `SurfIO 專注 AI 搜尋引擎優化，覆蓋 Perplexity、ChatGPT、Claude 等 7+ 平台。了解點解 SurfIO 係 ${c} 嘅最佳 AEO 替代方案。`,
  ],
  comparison: [
    (c, _cat) => `SurfIO vs ${c} 全面比較：功能、AEO 能力、價格同客戶成效。幫你揀出最適合你嘅 AI 搜尋優化方案。`,
    (c, _cat) => `唔知揀 SurfIO 定 ${c}？呢篇詳細比較分析兩者嘅優缺點，幫你做出明智嘅 AEO 決策。`,
    (c, cat) => `${c}（${cat}）同 SurfIO（AEO 服務）嘅深入比較。了解邊個更適合你嘅 AI 搜尋優化需求。`,
  ],
  migration: [
    (c, _cat) => `計劃從 ${c} 轉用 SurfIO？呢篇遷移指南詳細介紹每個步驟，確保順利過渡到 AEO 服務。`,
    (c, _cat) => `由 ${c} 到 SurfIO 嘅完整遷移攻略。了解 onboarding 流程、時間表同注意事項。`,
    (c, _cat) => `想從 ${c} 轉到 SurfIO 做 AEO？呢篇實戰指南幫你無痛過渡，保留現有成果同時升級 AI 搜尋策略。`,
  ],
};

// ============================
// Deterministic selection helpers
// ============================

function pick<T>(arr: T[], slug: string, salt: string = ""): T {
  const key = slug + salt;
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = ((hash << 5) - hash) + key.charCodeAt(i);
    hash |= 0;
  }
  return arr[Math.abs(hash) % arr.length];
}

function pickN<T>(arr: T[], count: number, slug: string, salt: string = ""): T[] {
  const key = slug + salt;
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = ((hash << 5) - hash) + key.charCodeAt(i);
    hash |= 0;
  }
  // Fisher-Yates shuffle with deterministic seed
  const indices = arr.map((_, i) => i);
  let seed = Math.abs(hash);
  for (let i = indices.length - 1; i > 0; i--) {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    const j = seed % (i + 1);
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return indices.slice(0, Math.min(count, arr.length)).map(i => arr[i]);
}

// ============================
// Page Generator
// ============================

function generateCompetitorPage(
  competitorName: string,
  competitorCategory: string,
  pageType: CompetitorPageType,
): CompetitorData {
  const cSlug = competitorToSlug(competitorName);
  const suffix = PAGE_TYPE_SUFFIXES[pageType];
  const slug = `${cSlug}-${suffix}`;

  // Hero title
  const titlePool = HERO_TITLES_MAP[pageType][competitorCategory] || HERO_TITLES_MAP[pageType]["SEO Agency"];
  const titleFn = pick(titlePool, slug, "title") as (c: string) => string;
  const heroTitle = titleFn(competitorName);

  // Hero subtitle
  const subtitlePool = HERO_SUBTITLES[competitorCategory]?.[pageType] || HERO_SUBTITLES["SEO Agency"][pageType];
  const heroSubtitle = pick(subtitlePool, slug, "subtitle");

  // Comparison points (5-8)
  const cpPool = COMPARISON_POINTS_MAP[competitorCategory] || COMPARISON_POINTS_SEO_AGENCY;
  const numPoints = 5 + (pickVariant(slug + "cp", 4)); // 5-8
  const selectedCPs = pickN(cpPool, numPoints, slug, "cp");
  const comparisonPoints = selectedCPs.map(cp => ({
    feature: cp.feature,
    competitor: typeof cp.competitor === "function" ? cp.competitor(competitorName) : cp.competitor,
    surfio: cp.surfio,
  }));

  // Advantages (4-6)
  const advPool = ADVANTAGES_MAP[competitorCategory] || ADVANTAGES_SEO_AGENCY;
  const numAdvantages = 4 + (pickVariant(slug + "adv", 3)); // 4-6
  const advantages = pickN(advPool, numAdvantages, slug, "adv");

  // FAQs (3-5)
  const faqGenerators = FAQS_MAP[competitorCategory]?.[pageType] || FAQS_MAP["SEO Agency"][pageType];
  const numFAQs = 3 + (pickVariant(slug + "faq", 3)); // 3-5
  const selectedFAQGenerators = pickN(faqGenerators, numFAQs, slug, "faq");
  const faqs: [string, string][] = selectedFAQGenerators.map(fn => fn(competitorName));

  // Meta
  const metaTitle = (pick(META_TITLES[pageType], slug, "meta") as unknown as (c: string) => string)(competitorName);
  const metaDescFn = pick(META_DESCRIPTIONS[pageType], slug, "metadesc") as unknown as (c: string, cat: string) => string;
  const metaDescription = metaDescFn(competitorName, competitorCategory);

  // Layout
  const layout = pickLayout(slug);

  return {
    slug,
    competitorName,
    competitorCategory,
    pageType,
    layout,
    heroTitle,
    heroSubtitle,
    comparisonPoints,
    advantages,
    faqs,
    metaTitle,
    metaDescription,
  };
}

// ============================
// Export
// ============================

const PAGE_TYPES: CompetitorPageType[] = ["alternative", "comparison", "migration"];

export function getCompetitorPages(): CompetitorData[] {
  const pages: CompetitorData[] = [];

  for (const competitor of ALL_COMPETITORS) {
    for (const pageType of PAGE_TYPES) {
      pages.push(generateCompetitorPage(competitor.name, competitor.category, pageType));
    }
  }

  return pages;
}
