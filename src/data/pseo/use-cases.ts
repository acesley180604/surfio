// ============================
// Cluster E: Use Case Pages
// 20 use cases
// ============================

import {
  type UseCaseData,
  USE_CASES,
} from "./types";

// --- Rich use case content ---
const USE_CASE_CONTENT: Record<string, {
  heroTitle: string;
  heroSubtitle: string;
  problemStatement: string;
  solutionOverview: string;
  steps: { title: string; desc: string }[];
  benefits: string[];
  faqs: [string, string][];
  relatedUseCases: string[];
}> = {
  "brand-monitoring": {
    heroTitle: "AI 搜尋品牌監測：知道 AI 點樣講你嘅品牌",
    heroSubtitle: "追蹤你嘅品牌喺 ChatGPT、Perplexity 同 Google AI Overview 嘅提及情況，掌握 AI 對你嘅品牌講咩。",
    problemStatement: "你知唔知 ChatGPT 喺推薦你嘅行業時會唔會提到你？AI 搜尋引擎嘅回答缺乏透明度，大部分企業對自己喺 AI 搜尋中嘅形象一無所知。如果 AI 提供關於你品牌嘅錯誤資訊，你可能都唔知道。",
    solutionOverview: "SurfIO 嘅 AI 品牌監測服務幫你追蹤品牌喺所有主要 AI 搜尋引擎嘅提及、引用同推薦情況。我哋識別正面同負面嘅品牌信號，並提供改善策略。",
    steps: [
      { title: "確定監測範圍", desc: "界定你嘅核心品牌關鍵字、競爭對手同目標 AI 平台。我哋會建立一個全面嘅監測詞庫。" },
      { title: "基準測試", desc: "對你嘅品牌進行全面嘅 AI 搜尋基準測試，記錄你目前喺每個平台嘅能見度同提及情況。" },
      { title: "持續監測", desc: "定期（每週/每日）喺所有目標平台執行品牌相關查詢，記錄變化同趨勢。" },
      { title: "分析報告", desc: "生成詳細嘅 AI 品牌能見度報告，包括提及率、情感分析同競爭對手比較。" },
      { title: "策略調整", desc: "根據監測數據調整你嘅 AEO 策略，修正負面信息，強化正面推薦。" },
    ],
    benefits: [
      "即時了解 AI 搜尋引擎對你品牌嘅描述",
      "及早發現負面或錯誤嘅 AI 品牌信息",
      "追蹤競爭對手嘅 AI 能見度變化",
      "數據驅動嘅 AEO 策略調整",
      "保護品牌聲譽免受 AI 幻覺影響",
    ],
    faqs: [
      ["AI 品牌監測同傳統品牌監測有咩唔同？", "傳統品牌監測追蹤媒體報導同社交提及。AI 品牌監測追蹤 AI 搜尋引擎嘅回答中你嘅品牌被提及同推薦嘅情況——呢係一個全新嘅渠道。"],
      ["幾耐需要監測一次？", "建議至少每週監測一次核心關鍵字。高競爭行業或品牌危機期間應該每日監測。"],
      ["如果 AI 講咗我品牌嘅錯誤資訊點算？", "我哋會幫你制定修正策略，包括更新網站內容、增加結構化數據、同建立更強嘅正面品牌信號，逐步修正 AI 嘅認知。"],
    ],
    relatedUseCases: ["reputation-management", "competitor-analysis", "crisis-management"],
  },
  "lead-generation": {
    heroTitle: "AI 搜尋潛在客戶開發：令 AI 推薦你畀潛在客戶",
    heroSubtitle: "透過 AEO 策略令你嘅品牌喺潛在客戶嘅 AI 搜尋中被推薦，獲取高質量嘅銷售線索。",
    problemStatement: "傳統嘅潛在客戶開發渠道（Google Ads、Cold Email）成本越來越高，轉化率越來越低。同時，你嘅潛在客戶已經開始用 AI 搜尋做購買決策嘅初步研究。如果 AI 唔推薦你，你就失去呢批最有價值嘅潛在客戶。",
    solutionOverview: "SurfIO 幫你建立 AI 搜尋潛在客戶漏斗——當潛在客戶問 AI 同你嘅行業相關嘅問題時，確保你嘅品牌被推薦為首選解決方案。",
    steps: [
      { title: "潛在客戶 AI 查詢研究", desc: "搵出你嘅潛在客戶最常用 AI 問嘅問題，建立完整嘅查詢詞庫。" },
      { title: "內容策略制定", desc: "針對每個高價值查詢，制定內容策略令你嘅品牌成為 AI 嘅首選推薦。" },
      { title: "結構化數據部署", desc: "部署 Service、Product 同 FAQ Schema，令 AI 可以準確理解你嘅產品同服務。" },
      { title: "權威性建設", desc: "透過行業媒體、案例分析同客戶評價建立你嘅品牌權威性。" },
      { title: "轉化優化", desc: "確保從 AI 推薦到網站嘅轉化路徑流暢，設置追蹤分析 AI 來源嘅銷售線索。" },
    ],
    benefits: [
      "獲取高意圖嘅潛在客戶（AI 已幫佢哋篩選）",
      "降低獲客成本（相比 PPC 同 Cold Outreach）",
      "建立長期嘅被動獲客渠道",
      "提升品牌喺潛在客戶心目中嘅信任度",
      "AI 推薦帶來嘅轉化率通常高於傳統渠道",
    ],
    faqs: [
      ["AI 搜尋真係可以帶來銷售線索嗎？", "絕對可以。越來越多 B2B 同 B2C 買家用 AI 做初步研究。被 AI 推薦嘅品牌享有更高嘅信任度，轉化率通常比傳統搜尋高 2-3 倍。"],
      ["同 Google Ads 比較，AEO 嘅 ROI 點樣？", "AEO 係長期投資，一旦建立咗 AI 能見度就可以持續獲得免費嘅潛在客戶。長期 ROI 通常遠高於持續花費嘅 PPC。"],
      ["多久先可以開始獲取 AI 來源嘅銷售線索？", "大部分客戶喺 60-90 日內開始見到 AI 搜尋帶來嘅流量同銷售線索。具體時間取決於你嘅行業競爭程度。"],
    ],
    relatedUseCases: ["content-strategy", "product-launch", "market-expansion"],
  },
  "content-strategy": {
    heroTitle: "AI 時代嘅內容策略：令每篇內容都被 AI 引用",
    heroSubtitle: "重新定義你嘅內容策略，確保所有內容唔止喺 Google 排名好，仲被 AI 搜尋引擎引用同推薦。",
    problemStatement: "大部分企業嘅內容策略仍然停留喺傳統 SEO 思維。你花大量時間同資源製作內容，但 AI 搜尋引擎完全忽略你。問題唔係內容質素唔好，而係內容格式同結構唔符合 AI 嘅引用偏好。",
    solutionOverview: "SurfIO 幫你建立 AI-first 嘅內容策略，確保每篇內容都經過 AEO 優化，同時保持傳統 SEO 效果。",
    steps: [
      { title: "內容審計", desc: "分析你現有嘅內容庫，識別邊啲內容已經被 AI 引用、邊啲有潛力、邊啲需要改造。" },
      { title: "AI 查詢研究", desc: "搵出你嘅目標受眾最常向 AI 問嘅問題，作為內容計劃嘅基礎。" },
      { title: "內容架構設計", desc: "設計 AI 友好嘅內容架構，包括 FAQ 區塊、結構化數據同可引用嘅事實陳述。" },
      { title: "內容製作同優化", desc: "按照 AEO 最佳實踐製作新內容，同時優化現有高價值內容。" },
      { title: "效果追蹤同迭代", desc: "追蹤每篇內容嘅 AI 引用表現，持續優化內容策略。" },
    ],
    benefits: [
      "每篇內容同時服務 SEO 同 AEO 目標",
      "提高內容投資嘅 ROI",
      "建立持續嘅 AI 引用管道",
      "內容被 AI 引用後自然提升品牌信任度",
      "減少低效內容嘅浪費",
    ],
    faqs: [
      ["現有內容可以做 AEO 優化嗎？", "大部分現有內容都可以透過結構化改造同 Schema 添加做 AEO 優化。唔需要完全重寫，通常只需要調整格式同加入結構化元素。"],
      ["AEO 內容策略同傳統內容策略有咩唔同？", "最大嘅區別係內容結構。AEO 內容需要更多嘅問答格式、結構化數據同可引用嘅事實陳述。呢啲改變同時有利於傳統 SEO。"],
      ["需要幾多內容先可以見效？", "質量比數量重要。通常 10-20 篇高質量嘅 AEO 優化內容就足以建立初始嘅 AI 能見度。"],
    ],
    relatedUseCases: ["lead-generation", "thought-leadership", "customer-education"],
  },
  "competitor-analysis": {
    heroTitle: "AI 搜尋競爭分析：了解你嘅對手喺 AI 做緊咩",
    heroSubtitle: "分析你嘅競爭對手喺 AI 搜尋引擎嘅表現，搵出你嘅機會同威脅。",
    problemStatement: "你知道你嘅競爭對手喺 Google 嘅排名，但你知唔知佢哋喺 ChatGPT、Perplexity 被推薦嘅頻率？AI 搜尋嘅競爭格局同傳統搜尋完全唔同——有啲傳統排名低嘅競爭對手可能喺 AI 搜尋中領先你。",
    solutionOverview: "SurfIO 幫你全面分析競爭對手嘅 AI 搜尋表現，識別佢哋嘅策略同弱點，制定超越佢哋嘅 AEO 計劃。",
    steps: [
      { title: "競爭對手識別", desc: "識別你喺 AI 搜尋中嘅真正競爭對手（可能同傳統搜尋唔同）。" },
      { title: "AI 能見度基準", desc: "測試所有競爭對手喺各個 AI 平台嘅被推薦頻率同語境。" },
      { title: "策略分析", desc: "分析領先競爭對手嘅 AEO 策略：Schema 部署、內容結構、外部引用等。" },
      { title: "機會識別", desc: "搵出競爭對手未覆蓋嘅 AI 查詢同內容空白。" },
      { title: "超越計劃", desc: "制定針對性嘅 AEO 策略，喺每個關鍵 AI 查詢中超越競爭對手。" },
    ],
    benefits: [
      "了解 AI 搜尋嘅真實競爭格局",
      "發現競爭對手嘅 AEO 策略同弱點",
      "搵到未被覆蓋嘅 AI 搜尋機會",
      "數據驅動嘅 AEO 策略制定",
      "喺關鍵查詢中超越競爭對手",
    ],
    faqs: [
      ["AI 搜尋嘅競爭格局同 Google 有咩唔同？", "非常唔同。AI 搜尋引擎推薦嘅品牌唔完全等於 Google 排名最高嘅品牌。AI 更重視結構化數據、品牌權威性同內容可引用性。"],
      ["幾耐做一次競爭分析？", "建議每月做一次全面嘅 AI 競爭分析，每週做核心關鍵字嘅快速檢查。AI 搜尋結果變化快過傳統搜尋。"],
      ["可以睇到競爭對手嘅具體 AEO 策略嗎？", "我哋可以分析佢哋嘅 Schema Markup、內容結構、外部引用同品牌信號，從而推斷佢哋嘅 AEO 策略。"],
    ],
    relatedUseCases: ["brand-monitoring", "content-strategy", "market-expansion"],
  },
  "reputation-management": {
    heroTitle: "AI 搜尋聲譽管理：控制 AI 對你嘅品牌講咩",
    heroSubtitle: "管理同改善你嘅品牌喺 AI 搜尋引擎中嘅形象，確保 AI 推薦正面嘅品牌信息。",
    problemStatement: "AI 搜尋引擎可能基於過時或不準確嘅資訊描述你嘅品牌。更差嘅情況係 AI 幻覺——AI 可能生成完全錯誤嘅品牌資訊。你需要主動管理你喺 AI 搜尋中嘅品牌形象。",
    solutionOverview: "SurfIO 幫你建立正面嘅 AI 品牌形象，修正錯誤信息，並持續監測同管理你嘅 AI 搜尋聲譽。",
    steps: [
      { title: "AI 聲譽審計", desc: "全面檢查所有主要 AI 平台對你品牌嘅描述，識別正面、中性同負面嘅信號。" },
      { title: "錯誤信息修正", desc: "針對 AI 嘅錯誤描述，制定修正策略——更新網站內容、強化正確信號。" },
      { title: "正面信號建設", desc: "建立大量正面嘅品牌信號，包括客戶評價、媒體報導同行業認可。" },
      { title: "持續監測", desc: "定期監測 AI 對你品牌嘅描述變化，及時應對負面信息。" },
    ],
    benefits: [
      "控制 AI 搜尋引擎對你品牌嘅描述",
      "修正 AI 幻覺產生嘅錯誤信息",
      "建立正面嘅 AI 品牌形象",
      "預防潛在嘅品牌聲譽危機",
      "提升 AI 推薦時嘅品牌可信度",
    ],
    faqs: [
      ["AI 講咗我品牌嘅錯誤信息可以修正嗎？", "可以。透過更新你嘅網站內容、增加結構化數據、同建立更強嘅正面信號，可以逐步修正 AI 嘅認知。但呢個過程需要時間同持續嘅努力。"],
      ["點樣預防 AI 幻覺影響我嘅品牌？", "最有效嘅方法係主動建立大量準確嘅品牌信息源。當 AI 有足夠嘅正確信息參考，幻覺嘅風險會大幅降低。"],
      ["需要幾耐先可以改善 AI 品牌形象？", "視乎問題嘅嚴重程度。輕微嘅修正可能喺 30-60 日見效，重大嘅形象改善需要 3-6 個月嘅持續工作。"],
    ],
    relatedUseCases: ["brand-monitoring", "crisis-management", "thought-leadership"],
  },
  "product-launch": {
    heroTitle: "AI 搜尋產品發佈策略：令新產品一出就被 AI 推薦",
    heroSubtitle: "喺產品發佈前建立 AI 搜尋基礎，確保新產品上市即被 AI 推薦畀潛在客戶。",
    problemStatement: "傳統嘅產品發佈依賴 PR 同廣告，但越來越多客戶用 AI 搜尋探索新產品。如果你嘅新產品喺 AI 搜尋中冇存在感，你就失去咗最重要嘅曝光渠道之一。",
    solutionOverview: "SurfIO 幫你喺產品發佈前 30-60 日建立 AI 搜尋基礎，確保產品上市時已經有 AI 能見度。",
    steps: [
      { title: "發佈前 AI 準備（-60 日）", desc: "建立產品相關嘅結構化數據、預告內容同品牌實體信號。" },
      { title: "內容預備（-30 日）", desc: "準備 AI 友好嘅產品描述、FAQ、比較頁面同技術文檔。" },
      { title: "發佈日策略", desc: "協調 PR、社交媒體同 AEO 策略，最大化 AI 搜尋嘅產品曝光。" },
      { title: "發佈後追蹤", desc: "密切監測新產品喺各 AI 平台嘅出現情況，快速迭代優化。" },
    ],
    benefits: [
      "新產品上市即有 AI 搜尋存在感",
      "加速產品知名度嘅建立",
      "獲取早期嘅高質量潛在客戶",
      "喺競爭對手反應前搶佔 AI 推薦位",
    ],
    faqs: [
      ["產品未發佈就可以做 AEO 嗎？", "可以。我哋建議喺產品發佈前 60 日開始 AEO 準備，建立基礎嘅品牌同產品信號。"],
      ["AEO 同傳統 PR 策略點配合？", "AEO 同 PR 互補。PR 帶來嘅媒體報導同時係重要嘅 AI 引用來源。兩者一齊做效果最好。"],
    ],
    relatedUseCases: ["lead-generation", "brand-monitoring", "content-strategy"],
  },
  "thought-leadership": {
    heroTitle: "AI 搜尋思想領袖建設：成為你行業嘅 AI 推薦專家",
    heroSubtitle: "建立你嘅個人同企業喺 AI 搜尋中嘅思想領袖地位，令 AI 喺相關話題推薦你作為權威。",
    problemStatement: "AI 搜尋引擎喺回答行業問題時，傾向推薦佢哋認為嘅「專家」。如果你嘅品牌同創辦人未被 AI 認可為行業專家，你嘅競爭對手會佔據呢個位置。",
    solutionOverview: "SurfIO 幫你建立全方位嘅 AI 思想領袖策略，從個人品牌到企業品牌，令 AI 搜尋引擎將你視為行業權威。",
    steps: [
      { title: "專家定位", desc: "確定你嘅思想領袖定位——你要喺 AI 搜尋中被認可為邊個領域嘅專家。" },
      { title: "知識體系建設", desc: "建立系統化嘅專家內容庫，涵蓋你嘅核心專業領域。" },
      { title: "外部認可建設", desc: "透過行業媒體、會議演講同學術合作建立外部專家認可。" },
      { title: "AI 實體優化", desc: "優化你嘅個人同企業喺 AI 知識圖譜中嘅實體信息。" },
    ],
    benefits: [
      "被 AI 認可為行業專家",
      "喺行業相關查詢中優先被推薦",
      "提升個人同企業品牌價值",
      "吸引高質量嘅商業機會同合作",
    ],
    faqs: [
      ["思想領袖建設需要幾耐？", "建立 AI 認可嘅思想領袖地位通常需要 3-6 個月嘅持續努力。但早期嘅改善可能喺 60 日內出現。"],
      ["個人品牌同企業品牌邊個更重要？", "兩者互補。AI 搜尋引擎既推薦企業亦推薦個人。創辦人嘅思想領袖地位可以直接提升企業嘅 AI 可信度。"],
    ],
    relatedUseCases: ["content-strategy", "reputation-management", "entity-building"],
  },
  "local-visibility": {
    heroTitle: "本地 AI 搜尋能見度：令附近嘅客戶搵到你",
    heroSubtitle: "優化你嘅品牌喺本地 AI 搜尋查詢中嘅能見度，搶佔「附近」「推薦」類 AI 查詢。",
    problemStatement: "「附近嘅餐廳」「XX 區最好嘅牙醫」呢類本地 AI 查詢越來越多。如果你嘅本地企業唔喺 AI 搜尋嘅本地推薦入面，你就失去咗最有價值嘅本地客戶。",
    solutionOverview: "SurfIO 嘅本地 AEO 策略幫你喺所有主要 AI 搜尋引擎嘅本地查詢中排名靠前。",
    steps: [
      { title: "本地 AI 查詢研究", desc: "搵出你嘅本地客戶最常向 AI 問嘅問題。" },
      { title: "Google Business Profile 優化", desc: "確保你嘅 GBP 資訊完整、準確、並經過 AEO 優化。" },
      { title: "本地 Schema 部署", desc: "部署 LocalBusiness Schema 同地理位置標記。" },
      { title: "本地內容建設", desc: "建立同你所在地區相關嘅 AI 友好內容。" },
      { title: "本地引用建設", desc: "獲取本地媒體同目錄嘅引用同連結。" },
    ],
    benefits: [
      "喺本地 AI 查詢中優先被推薦",
      "吸引高意圖嘅本地客戶",
      "同區內大品牌競爭 AI 推薦位",
      "建立持久嘅本地 AI 能見度",
    ],
    faqs: [
      ["本地 AEO 同 Local SEO 有咩唔同？", "Local SEO 專注 Google Maps 排名，本地 AEO 專注 AI 搜尋嘅本地推薦。兩者互補，但策略有區別。"],
      ["小型本地商戶可以同連鎖品牌競爭嗎？", "可以。AI 搜尋重視相關性同專業度，唔止係品牌大小。專注特定服務嘅本地商戶往往喺 AI 推薦中表現更好。"],
    ],
    relatedUseCases: ["lead-generation", "schema-implementation", "entity-building"],
  },
  "crisis-management": {
    heroTitle: "AI 搜尋危機管理：快速應對 AI 嘅負面品牌信息",
    heroSubtitle: "當 AI 搜尋引擎傳播關於你品牌嘅負面或錯誤信息時，你需要快速有效嘅危機應對策略。",
    problemStatement: "AI 搜尋引擎嘅回答可能包含過時嘅負面報導、錯誤嘅事實、甚至 AI 幻覺生成嘅虛假信息。呢啲信息會被大量用戶睇到，對你嘅品牌造成嚴重損害。",
    solutionOverview: "SurfIO 提供 AI 搜尋危機快速應對服務，幫你識別、管理同修正 AI 搜尋中嘅負面品牌信息。",
    steps: [
      { title: "危機評估", desc: "快速評估負面信息嘅範圍、嚴重程度同傳播情況。" },
      { title: "即時應對", desc: "更新關鍵網頁內容、發佈澄清聲明、強化正面信號。" },
      { title: "長期修復", desc: "建立大量正面嘅品牌內容同引用，逐步壓制負面信息。" },
      { title: "預防機制", desc: "建立持續嘅 AI 品牌監測，防止類似危機再次發生。" },
    ],
    benefits: [
      "快速應對 AI 搜尋嘅品牌危機",
      "修正 AI 傳播嘅錯誤信息",
      "建立長期嘅品牌保護機制",
      "減少負面 AI 信息嘅商業損失",
    ],
    faqs: [
      ["AI 危機管理嘅反應時間應該幾快？", "越快越好。AI 搜尋嘅負面信息每日被大量用戶睇到。建議喺發現後 24-48 小時內啟動應對措施。"],
      ["可以完全刪除 AI 嘅負面回答嗎？", "唔可以直接刪除 AI 嘅回答，但可以透過建立更強嘅正面信號逐步替代負面內容。呢個過程通常需要 30-90 日。"],
    ],
    relatedUseCases: ["reputation-management", "brand-monitoring"],
  },
  "investor-relations": {
    heroTitle: "AI 搜尋投資者關係：令投資者喺 AI 搵到你",
    heroSubtitle: "優化你嘅品牌喺投資相關 AI 查詢中嘅能見度，幫助融資同投資者溝通。",
    problemStatement: "投資者越來越常用 AI 搜尋做投資研究。如果投資者問 ChatGPT 你嘅公司，得到嘅係零信息或過時資料，會嚴重影響投資決策。",
    solutionOverview: "SurfIO 幫你建立全面嘅 AI 投資者可見度，確保投資者用 AI 搜尋你嘅公司時得到正面、準確嘅信息。",
    steps: [
      { title: "投資者查詢研究", desc: "了解投資者會點樣用 AI 搜尋你嘅公司同行業。" },
      { title: "企業信息結構化", desc: "將你嘅公司信息結構化，令 AI 可以準確描述你嘅業務、團隊同成就。" },
      { title: "媒體同公開信息優化", desc: "確保所有公開嘅投資相關信息被 AI 正確索引同引用。" },
      { title: "持續更新", desc: "定期更新融資進展、產品里程碑同團隊變化嘅 AI 可見信息。" },
    ],
    benefits: [
      "投資者用 AI 搜尋你時得到正面印象",
      "提升融資談判中嘅品牌可信度",
      "自動吸引對你行業有興趣嘅投資者",
      "同未來投資者建立 AI 搜尋層面嘅接觸點",
    ],
    faqs: [
      ["AEO 真係對融資有幫助嗎？", "有。多個客戶反映投資者喺盡職調查中用 AI 搜尋佢哋嘅公司。正面嘅 AI 搜尋結果係強大嘅社會認證。"],
      ["初創企業幾時開始做投資者相關嘅 AEO？", "建議喺開始融資前 60 日。提前建立 AI 能見度，令投資者嘅第一印象就係正面嘅。"],
    ],
    relatedUseCases: ["brand-monitoring", "reputation-management", "thought-leadership"],
  },
  "recruitment-branding": {
    heroTitle: "招聘品牌 AI 優化：令頂尖人才喺 AI 搵到你",
    heroSubtitle: "優化你嘅僱主品牌喺 AI 搜尋中嘅形象，吸引最優秀嘅候選人。",
    problemStatement: "求職者越來越常用 AI 搜尋研究潛在僱主。當候選人問 ChatGPT「XX 公司點樣」或「XX 行業最好嘅僱主」，你嘅公司需要被正面推薦。",
    solutionOverview: "SurfIO 幫你優化僱主品牌嘅 AI 搜尋能見度，確保候選人用 AI 搜尋時對你嘅公司留下正面印象。",
    steps: [
      { title: "僱主品牌 AI 審計", desc: "檢查 AI 搜尋引擎目前點樣描述你嘅公司作為僱主。" },
      { title: "員工價值主張優化", desc: "將你嘅 EVP（Employee Value Proposition）結構化呈現，令 AI 可以準確引用。" },
      { title: "正面僱主信號建設", desc: "透過員工評價、公司文化內容同行業認可建立正面嘅僱主形象。" },
      { title: "招聘內容 AEO 化", desc: "優化職位描述同招聘頁面嘅 AI 可見度。" },
    ],
    benefits: [
      "吸引主動搜尋嘅高質量候選人",
      "喺「最佳僱主」類 AI 查詢中出現",
      "減少招聘成本",
      "提升候選人嘅申請意願",
    ],
    faqs: [
      ["求職者真係用 AI 搜尋僱主嗎？", "係。最近調查顯示超過 60% 嘅求職者會用 AI 搜尋潛在僱主。呢個比例仲喺快速增長。"],
    ],
    relatedUseCases: ["reputation-management", "brand-monitoring", "thought-leadership"],
  },
  "customer-education": {
    heroTitle: "客戶教育 AEO 策略：令你嘅教育內容被 AI 推薦",
    heroSubtitle: "將你嘅客戶教育內容轉化為 AI 搜尋嘅權威參考資源。",
    problemStatement: "你花大量資源建立客戶教育內容，但 AI 搜尋引擎唔引用你嘅內容。你嘅知識庫同教學資料對 AI 來講係隱形嘅。",
    solutionOverview: "SurfIO 幫你將客戶教育內容 AEO 化，令 AI 搜尋引擎主動引用你嘅知識作為行業權威。",
    steps: [
      { title: "教育內容審計", desc: "分析你現有嘅教育內容同知識庫嘅 AI 可見度。" },
      { title: "內容結構化改造", desc: "將教育內容重新組織為 AI 友好嘅格式。" },
      { title: "Schema 部署", desc: "添加 HowTo、FAQ 同 LearningResource Schema。" },
      { title: "持續更新", desc: "保持教育內容嘅時效性同準確性。" },
    ],
    benefits: [
      "教育內容被 AI 引用為行業權威",
      "自動吸引正在學習嘅潛在客戶",
      "建立行業知識領袖地位",
      "提升品牌嘅教育性同可信度",
    ],
    faqs: [
      ["邊類教育內容最容易被 AI 引用？", "FAQ 格式、How-to 指南同術語定義係最容易被 AI 引用嘅教育內容類型。"],
    ],
    relatedUseCases: ["content-strategy", "thought-leadership", "knowledge-graph"],
  },
  "market-expansion": {
    heroTitle: "AI 搜尋市場擴展：用 AEO 進入新市場",
    heroSubtitle: "利用 AI 搜尋優化快速建立你喺新市場嘅品牌能見度。",
    problemStatement: "進入新市場需要大量嘅品牌建設投資。傳統方法耗時且昂貴。AI 搜尋提供咗一條更快、更具成本效益嘅路徑。",
    solutionOverview: "SurfIO 幫你透過 AEO 策略快速建立新市場嘅 AI 搜尋能見度，縮短市場進入時間。",
    steps: [
      { title: "新市場 AI 搜尋研究", desc: "了解新市場嘅客戶用 AI 搜尋嘅習慣同偏好。" },
      { title: "本地化 AEO 策略", desc: "制定同新市場文化同語言匹配嘅 AEO 策略。" },
      { title: "本地權威性建設", desc: "獲取新市場嘅本地引用、媒體報導同行業認可。" },
      { title: "效果追蹤", desc: "追蹤你喺新市場嘅 AI 搜尋能見度增長。" },
    ],
    benefits: [
      "快速建立新市場嘅品牌能見度",
      "比傳統市場進入策略更具成本效益",
      "搶佔新市場嘅 AI 搜尋先機",
      "數據驅動嘅市場擴展決策",
    ],
    faqs: [
      ["AEO 可以幫助跨境市場擴展嗎？", "非常適合。AI 搜尋引擎冇地理限制，透過多語言 AEO 策略可以同時覆蓋多個市場。"],
    ],
    relatedUseCases: ["local-visibility", "lead-generation", "content-strategy"],
  },
  "partner-ecosystem": {
    heroTitle: "合作夥伴生態 AI 優化：喺 AI 搜尋中強化夥伴關係",
    heroSubtitle: "利用 AEO 策略提升你同合作夥伴嘅共同 AI 搜尋能見度。",
    problemStatement: "你嘅合作夥伴生態係品牌價值嘅重要組成部分，但 AI 搜尋引擎可能唔了解呢啲夥伴關係。當用戶問 AI 推薦時，你嘅夥伴網絡嘅優勢完全冇被利用。",
    solutionOverview: "SurfIO 幫你同合作夥伴建立互相強化嘅 AEO 策略，令 AI 搜尋引擎理解同推薦你嘅夥伴生態。",
    steps: [
      { title: "夥伴生態映射", desc: "識別同你品牌最相關嘅合作夥伴同佢哋嘅 AI 能見度。" },
      { title: "共同 Schema 策略", desc: "建立跨品牌嘅結構化數據關係。" },
      { title: "聯合內容建設", desc: "同合作夥伴共同建立 AI 友好嘅內容。" },
      { title: "互相引用建設", desc: "建立雙向嘅品牌引用同連結。" },
    ],
    benefits: [
      "強化整個夥伴生態嘅 AI 能見度",
      "建立互惠嘅 AEO 合作關係",
      "提升品牌嘅生態系統價值",
      "觸及合作夥伴嘅客戶群",
    ],
    faqs: [
      ["合作夥伴 AEO 同普通 AEO 有咩唔同？", "合作夥伴 AEO 專注建立品牌之間嘅 AI 關聯性，令 AI 系統理解你哋嘅合作關係並喺推薦時考慮呢個因素。"],
    ],
    relatedUseCases: ["entity-building", "brand-monitoring", "market-expansion"],
  },
  "ai-readiness-audit": {
    heroTitle: "AI 準備度審計：你嘅網站準備好被 AI 推薦未？",
    heroSubtitle: "全面評估你嘅網站嘅 AI 搜尋準備度，搵出所有阻止你被 AI 推薦嘅問題。",
    problemStatement: "你嘅網站可能喺 Google 排名好好，但對 AI 搜尋引擎來講完全唔 ready。缺乏結構化數據、內容格式唔適合 AI 引用、品牌信號唔夠強——呢啲問題你可能完全唔知道。",
    solutionOverview: "SurfIO 嘅 AI 準備度審計全面分析你嘅網站同品牌嘅 AI 搜尋準備狀態，提供具體嘅改善路線圖。",
    steps: [
      { title: "技術審計", desc: "檢查 Schema Markup、robots.txt AI 爬蟲設置、頁面結構同載入速度。" },
      { title: "內容審計", desc: "評估內容嘅 AI 可引用性、結構化程度同 FAQ 覆蓋度。" },
      { title: "品牌審計", desc: "分析品牌嘅外部引用、權威性信號同 AI 知識圖譜存在感。" },
      { title: "競爭分析", desc: "比較你同競爭對手嘅 AI 搜尋準備度。" },
      { title: "路線圖制定", desc: "根據審計結果制定優先級排序嘅改善路線圖。" },
    ],
    benefits: [
      "全面了解你嘅 AI 搜尋準備狀態",
      "識別所有阻止你被 AI 推薦嘅問題",
      "獲得具體、可執行嘅改善建議",
      "了解你同競爭對手嘅差距",
      "優先級排序嘅改善路線圖",
    ],
    faqs: [
      ["AI 準備度審計包啲咩？", "包括技術審計（Schema、結構化數據、AI 爬蟲設置）、內容審計（可引用性、格式）、品牌審計（權威性、外部引用）同競爭分析。"],
      ["審計需要幾耐？", "標準審計需要 3-5 個工作日。深度審計需要 7-10 個工作日。"],
      ["審計後嘅改善需要幾耐見效？", "基礎技術改善（如 Schema 部署）可以喺 2-4 週見效。全面嘅 AEO 改善通常喺 60-90 日內呈現。"],
    ],
    relatedUseCases: ["schema-implementation", "content-strategy", "entity-building"],
  },
  "schema-implementation": {
    heroTitle: "Schema Markup 實施：AI 搜尋嘅技術基礎",
    heroSubtitle: "為你嘅網站部署完整嘅 Schema Markup，令 AI 搜尋引擎準確理解你嘅業務。",
    problemStatement: "大部分網站嘅 Schema Markup 不完整或完全缺失。冇 Schema，AI 搜尋引擎好難準確理解你嘅公司、產品同服務，自然就唔會推薦你。",
    solutionOverview: "SurfIO 為你嘅網站部署全面嘅 Schema Markup，覆蓋 Organization、Service、Product、FAQ 同所有相關類型。",
    steps: [
      { title: "Schema 審計", desc: "分析你現有嘅 Schema Markup 同缺失嘅類型。" },
      { title: "Schema 策略", desc: "根據你嘅業務類型制定最佳嘅 Schema 部署策略。" },
      { title: "開發同部署", desc: "編寫同部署 JSON-LD Schema 到你嘅網站。" },
      { title: "驗證同測試", desc: "用 Google 同 Bing 嘅結構化數據測試工具驗證。" },
      { title: "持續維護", desc: "定期更新 Schema 以反映業務變化。" },
    ],
    benefits: [
      "AI 搜尋引擎準確理解你嘅業務",
      "提升被 AI 引用嘅機會",
      "同時改善 Google Rich Results",
      "建立清晰嘅品牌實體信號",
    ],
    faqs: [
      ["Schema Markup 對 AEO 有幾重要？", "非常重要。Schema 係 AI 搜尋引擎理解你業務嘅基礎。冇 Schema 嘅網站喺 AI 推薦中處於明顯劣勢。"],
      ["需要部署邊啲 Schema 類型？", "核心類型包括 Organization、WebSite、FAQ、Service/Product。根據你嘅業務可能仲需要 LocalBusiness、Person、Article 等。"],
    ],
    relatedUseCases: ["ai-readiness-audit", "entity-building", "content-strategy"],
  },
  "entity-building": {
    heroTitle: "品牌實體建設：喺 AI 知識圖譜中建立你嘅品牌",
    heroSubtitle: "建立你嘅品牌喺 AI 系統知識圖譜中嘅實體身份，令 AI 搜尋引擎「認識」你。",
    problemStatement: "AI 搜尋引擎透過知識圖譜理解世界。如果你嘅品牌唔存在於呢啲知識圖譜中，AI 就唔會將你視為一個值得推薦嘅實體。",
    solutionOverview: "SurfIO 幫你建立完整嘅品牌實體，喺所有主要 AI 系統嘅知識圖譜中建立你嘅存在感。",
    steps: [
      { title: "實體審計", desc: "檢查你嘅品牌目前喺各個知識圖譜嘅存在狀態。" },
      { title: "實體定義", desc: "建立清晰嘅品牌實體定義——公司、創辦人、產品、服務。" },
      { title: "信號建設", desc: "透過多個渠道建立一致嘅品牌實體信號。" },
      { title: "關係建設", desc: "建立你嘅品牌同其他已知實體嘅關係。" },
    ],
    benefits: [
      "AI 系統「認識」你嘅品牌",
      "喺相關查詢中被視為合法實體",
      "提升 AI 推薦嘅可能性",
      "建立長期嘅 AI 品牌資產",
    ],
    faqs: [
      ["品牌實體建設同 SEO 嘅實體 SEO 一樣嗎？", "概念相似但範圍更廣。AEO 嘅實體建設唔止針對 Google Knowledge Graph，仲要覆蓋所有 AI 系統嘅知識庫。"],
    ],
    relatedUseCases: ["schema-implementation", "knowledge-graph", "thought-leadership"],
  },
  "citation-building": {
    heroTitle: "AI 引用建設：增加你被 AI 引用嘅機會",
    heroSubtitle: "系統性建設你嘅品牌喺 AI 搜尋引擎中嘅引用數量同質量。",
    problemStatement: "AI 搜尋引擎引用特定來源時，會考慮呢個來源喺網上嘅被引用頻率。如果你嘅品牌缺乏外部引用，AI 就唔會認為你係值得推薦嘅來源。",
    solutionOverview: "SurfIO 幫你建立系統化嘅引用建設策略，增加你嘅品牌被 AI 搜尋引擎引用嘅機會。",
    steps: [
      { title: "引用審計", desc: "分析你目前嘅外部引用情況——數量、質素同分佈。" },
      { title: "引用策略", desc: "制定多渠道嘅引用建設策略。" },
      { title: "內容外展", desc: "透過客座文章、行業合作同數碼 PR 獲取高質量引用。" },
      { title: "效果追蹤", desc: "追蹤引用增長同 AI 被推薦率嘅相關性。" },
    ],
    benefits: [
      "增加品牌嘅外部引用數量",
      "提升 AI 系統對你品牌嘅信任度",
      "建立持久嘅品牌權威性",
      "直接提升被 AI 推薦嘅機會",
    ],
    faqs: [
      ["AI 引用建設同傳統連結建設有咩唔同？", "AI 引用建設唔止追求連結，仲追求品牌提及（即使冇連結）。AI 系統計算品牌嘅網上提及頻率作為信任信號。"],
    ],
    relatedUseCases: ["entity-building", "thought-leadership", "content-strategy"],
  },
  "knowledge-graph": {
    heroTitle: "知識圖譜優化：令 AI 深入了解你嘅品牌",
    heroSubtitle: "優化你嘅品牌喺知識圖譜中嘅表現，建立完整嘅品牌知識網絡。",
    problemStatement: "知識圖譜係 AI 搜尋引擎理解品牌關係嘅基礎設施。如果你嘅品牌喺知識圖譜中嘅信息不完整、不準確或缺失，AI 就冇辦法正確推薦你。",
    solutionOverview: "SurfIO 幫你建立同優化品牌喺所有主要知識圖譜中嘅表現，確保 AI 系統有完整嘅品牌知識。",
    steps: [
      { title: "知識圖譜審計", desc: "檢查你嘅品牌喺 Google KG、Wikidata 同其他知識圖譜嘅狀態。" },
      { title: "信息完善", desc: "補充缺失嘅品牌信息同關係數據。" },
      { title: "Schema 對齊", desc: "確保網站 Schema 同知識圖譜信息一致。" },
      { title: "監測維護", desc: "定期檢查知識圖譜數據嘅準確性。" },
    ],
    benefits: [
      "AI 系統有完整嘅品牌知識",
      "提升品牌實體嘅 AI 識別度",
      "改善品牌同其他實體嘅關聯",
      "長期提升所有 AI 平台嘅能見度",
    ],
    faqs: [
      ["知識圖譜同 Schema 有咩關係？", "Schema 係你網站上嘅結構化數據，知識圖譜係搜尋引擎嘅品牌知識庫。兩者互相影響——好嘅 Schema 幫助知識圖譜正確理解你嘅品牌。"],
    ],
    relatedUseCases: ["entity-building", "schema-implementation", "citation-building"],
  },
  "voice-search": {
    heroTitle: "語音搜尋 AEO 優化：令語音助手推薦你",
    heroSubtitle: "優化你嘅品牌喺 Siri、Alexa 同 Google Assistant 語音搜尋中嘅能見度。",
    problemStatement: "語音搜尋嘅使用量持續增長，特別係喺移動裝置同智能家居場景。語音搜尋嘅結果通常只有一個答案——如果唔係你，就係你嘅競爭對手。",
    solutionOverview: "SurfIO 幫你優化語音搜尋嘅 AI 可見度，確保語音助手推薦你嘅品牌同服務。",
    steps: [
      { title: "語音查詢研究", desc: "了解你嘅客戶用語音搜尋嘅查詢模式同用語。" },
      { title: "對話式內容優化", desc: "將內容改寫為適合語音回答嘅對話格式。" },
      { title: "Featured Snippet 優化", desc: "爭取 Featured Snippet 位置——語音搜尋嘅主要答案來源。" },
      { title: "本地語音優化", desc: "優化本地語音查詢（「附近嘅 XX」）嘅能見度。" },
    ],
    benefits: [
      "喺語音搜尋結果中被推薦",
      "觸及語音搜尋嘅增長市場",
      "搶佔「位置零」——語音搜尋只有一個答案",
      "提升移動端同智能家居場景嘅品牌觸及",
    ],
    faqs: [
      ["語音搜尋 AEO 同一般 AEO 有咩唔同？", "語音搜尋嘅查詢通常更長、更口語化。內容需要針對自然語言問題優化，答案需要簡潔直接（通常 30 字以內）。"],
      ["語音搜尋嘅市場有幾大？", "全球語音搜尋使用率持續增長，超過 50% 嘅智能手機用戶每日使用語音搜尋。呢個趨勢只會加速。"],
    ],
    relatedUseCases: ["local-visibility", "schema-implementation", "content-strategy"],
  },
};

// --- Main generator ---
export function getUseCasePages(): UseCaseData[] {
  return USE_CASES.map((uc) => {
    const content = USE_CASE_CONTENT[uc.slug];
    if (!content) {
      // Fallback for any missing use case
      return {
        slug: uc.slug,
        useCaseName: uc.name,
        heroTitle: `${uc.name}：AEO 實現指南`,
        heroSubtitle: `了解點樣用 AEO 實現${uc.name}，提升你嘅 AI 搜尋能見度。`,
        problemStatement: `${uc.name}喺 AI 搜尋時代面臨新嘅挑戰。傳統方法已經唔夠，你需要 AEO 策略。`,
        solutionOverview: `SurfIO 幫你用 AEO 策略實現${uc.name}嘅目標。`,
        steps: [
          { title: "需求分析", desc: "了解你嘅具體需求同目標。" },
          { title: "策略制定", desc: "制定針對性嘅 AEO 策略。" },
          { title: "執行實施", desc: "按照計劃執行 AEO 優化。" },
          { title: "效果追蹤", desc: "追蹤同報告 AEO 效果。" },
        ],
        benefits: ["提升 AI 搜尋能見度", "獲取高質量客戶", "建立行業權威", "長期投資回報"],
        faqs: [
          [`${uc.name}需要幾耐見效？`, "大部分改善喺 30-60 日內出現，完整效果通常喺 90 日內呈現。"],
        ],
        relatedUseCases: ["ai-readiness-audit", "content-strategy", "brand-monitoring"],
        metaTitle: `${uc.name} | AEO 用途指南 - SurfIO`,
        metaDescription: `了解點樣用 AEO 實現${uc.name}。SurfIO 幫你喺 AI 搜尋時代達成目標。`,
      };
    }

    return {
      slug: uc.slug,
      useCaseName: uc.name,
      ...content,
      metaTitle: `${uc.name} | AEO 用途指南 - SurfIO`,
      metaDescription: `了解 SurfIO 點樣幫你用 AEO 實現${uc.name}。專業 AI 搜尋優化服務，免費審計。`,
    };
  });
}
