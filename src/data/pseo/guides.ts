// ============================
// Cluster D: Educational Guide Pages
// 7 AI engines × 15 topics = 105 pages
// ============================

import {
  type GuideData,
  type GuideSection,
  AI_ENGINES,
  GUIDE_TOPICS,
  pickVariant,
} from "./types";

// --- Engine-specific knowledge ---
const ENGINE_KNOWLEDGE: Record<string, {
  description: string;
  keyFactors: string[];
  dataSource: string;
  updateFrequency: string;
  citationStyle: string;
}> = {
  perplexity: {
    description: "Perplexity 係一個 AI 驅動嘅搜尋引擎，每次查詢都會即時搜尋互聯網，提供附帶來源引用嘅答案。",
    keyFactors: ["即時網頁搜尋", "來源引用", "學術同權威性偏好", "結構化內容優先", "新鮮度權重"],
    dataSource: "即時互聯網搜尋 + 索引數據庫",
    updateFrequency: "即時更新",
    citationStyle: "直接引用來源 URL，附帶摘要",
  },
  chatgpt: {
    description: "ChatGPT 係 OpenAI 嘅對話式 AI，結合預訓練知識同即時搜尋（透過 Browse 功能）回答用戶問題。",
    keyFactors: ["預訓練知識", "實體識別", "品牌提及頻率", "內容質素同深度", "結構化數據"],
    dataSource: "預訓練數據 + Browse 即時搜尋",
    updateFrequency: "模型更新時更新基礎知識，Browse 即時",
    citationStyle: "嵌入式品牌推薦，較少直接 URL",
  },
  claude: {
    description: "Claude 係 Anthropic 嘅 AI 助手，以準確性同安全性聞名。Claude 嘅回答傾向保守但精確。",
    keyFactors: ["事實準確性", "結構化內容", "學術引用", "E-E-A-T 信號", "內容一致性"],
    dataSource: "預訓練數據",
    updateFrequency: "模型版本更新時",
    citationStyle: "品牌提及配合事實陳述",
  },
  gemini: {
    description: "Gemini 係 Google 嘅 AI 助手，深度整合 Google 搜尋生態系統，包括 Google 搜尋、Knowledge Graph 同 YouTube。",
    keyFactors: ["Google 搜尋排名", "Knowledge Graph", "YouTube 內容", "Google Business Profile", "結構化數據"],
    dataSource: "Google 搜尋索引 + Knowledge Graph + 預訓練",
    updateFrequency: "同 Google 搜尋同步",
    citationStyle: "Google 搜尋結果整合式推薦",
  },
  "google-ai-overview": {
    description: "Google AI Overview 係 Google 搜尋結果頂部嘅 AI 生成摘要，直接喺搜尋頁面提供答案。",
    keyFactors: ["傳統 SEO 排名", "Featured Snippet 資格", "Schema Markup", "內容結構", "E-E-A-T"],
    dataSource: "Google 搜尋索引",
    updateFrequency: "同 Google 搜尋同步更新",
    citationStyle: "直接引用搜尋結果，附連結",
  },
  copilot: {
    description: "Microsoft Copilot 整合 Bing 搜尋同 OpenAI 技術，喺 Windows、Edge 同 Office 生態中提供 AI 助手功能。",
    keyFactors: ["Bing 搜尋排名", "Microsoft 生態整合", "LinkedIn 數據", "企業內容", "結構化數據"],
    dataSource: "Bing 搜尋索引 + OpenAI 模型",
    updateFrequency: "同 Bing 搜尋同步",
    citationStyle: "Bing 搜尋結果 + AI 摘要",
  },
  "bing-chat": {
    description: "Bing Chat 係 Microsoft 嘅 AI 搜尋功能，結合 Bing 搜尋同大語言模型提供對話式搜尋體驗。",
    keyFactors: ["Bing 排名", "IndexNow 即時索引", "Bing Webmaster Tools", "Schema 支援", "社交信號"],
    dataSource: "Bing 搜尋索引",
    updateFrequency: "IndexNow 可觸發即時索引",
    citationStyle: "附帶 Bing 搜尋結果引用",
  },
};

// --- Topic-specific section generators ---
function generateRankingSections(engineSlug: string, engineName: string): GuideSection[] {
  const ek = ENGINE_KNOWLEDGE[engineSlug];
  return [
    {
      heading: `${engineName} 排名機制概述`,
      content: `${ek.description} 要喺 ${engineName} 度排名，你需要理解佢嘅數據來源（${ek.dataSource}）同核心排名因素。`,
      items: ek.keyFactors,
    },
    {
      heading: "第一步：建立基礎可見度",
      content: `確保你嘅網站被 ${engineName} 嘅數據來源正確索引。呢個包括技術 SEO 基礎、Schema Markup 部署、同高質量內容建設。`,
      items: [
        "確保網站被搜尋引擎正確索引",
        "部署 Organization 同 WebSite Schema",
        "建立清晰嘅內容結構同內部連結",
        "優化頁面載入速度同核心網頁指標",
      ],
    },
    {
      heading: "第二步：內容優化策略",
      content: `${engineName} 嘅內容偏好同傳統 SEO 有明顯分別。AI 搜尋引擎更重視問答格式、結構化資訊同可引用嘅事實陳述。`,
      tip: `提示：用 FAQ 格式組織內容，每個答案控制喺 40-60 字，方便 ${engineName} 直接引用。`,
    },
    {
      heading: "第三步：權威性建設",
      content: `${engineName} 嘅引用風格係「${ek.citationStyle}」。要令你嘅品牌被引用，你需要建立跨平台嘅一致性品牌信號。`,
      items: [
        "建立一致嘅 NAP（名稱、地址、電話）資訊",
        "獲取高權威性嘅外部引用同連結",
        "喺行業媒體同評論平台建立存在感",
        "創建創辦人同團隊嘅個人品牌 AI 可見度",
      ],
    },
    {
      heading: "第四步：持續監測同優化",
      content: `${engineName} 嘅演算法同數據源不斷更新（更新頻率：${ek.updateFrequency}）。你需要持續監測你嘅 AI 搜尋表現，根據數據調整策略。`,
    },
  ];
}

function generateRankingFactorsSections(engineSlug: string, engineName: string): GuideSection[] {
  const ek = ENGINE_KNOWLEDGE[engineSlug];
  return [
    {
      heading: `${engineName} 排名因素全面分析`,
      content: `了解 ${engineName} 嘅排名因素係 AEO 成功嘅關鍵。以下係我哋透過大量測試同分析歸納出嘅核心排名因素。`,
    },
    {
      heading: "核心排名因素",
      content: `${engineName} 最重視以下因素：`,
      items: ek.keyFactors.map((f, i) => `${i + 1}. ${f}——呢個係 ${engineName} 決定推薦邊個品牌嘅關鍵信號。`),
    },
    {
      heading: "內容質素因素",
      content: "除咗技術因素，內容本身嘅質素對排名影響巨大。",
      items: [
        "內容深度同全面性",
        "事實準確性同可驗證性",
        "原創性同獨特見解",
        "更新頻率同時效性",
        "用戶意圖匹配度",
      ],
    },
    {
      heading: "技術因素",
      content: "技術層面嘅優化確保你嘅內容可以被 AI 系統正確理解同處理。",
      items: [
        "Schema Markup 完整度",
        "頁面結構化程度",
        "載入速度同 Core Web Vitals",
        "移動裝置友好度",
        "SSL 安全性",
      ],
      tip: `提示：${engineName} 嘅技術要求會隨時間演進。定期檢查你嘅技術 AEO 狀態。`,
    },
    {
      heading: "外部信號因素",
      content: "你嘅品牌喺網絡上嘅整體存在感同聲譽直接影響 AI 推薦。",
      items: [
        "高權威性反向連結",
        "品牌提及頻率同正面性",
        "社交媒體活躍度",
        "行業評論同評分",
        "媒體報導覆蓋度",
      ],
    },
  ];
}

function generateCitationSourcesSections(engineSlug: string, engineName: string): GuideSection[] {
  const ek = ENGINE_KNOWLEDGE[engineSlug];
  return [
    {
      heading: `${engineName} 嘅引用來源機制`,
      content: `${engineName} 嘅數據來源係「${ek.dataSource}」。了解佢從邊度攞資料，係優化你被引用機會嘅第一步。`,
    },
    {
      heading: "主要數據來源分析",
      content: `${engineName} 引用內容時，偏好以下類型嘅來源：權威行業網站、政府機構、學術研究、知名媒體、同經過驗證嘅企業官方內容。`,
      items: [
        "行業權威網站（高 DA/DR 網站）",
        "官方政府同機構網站",
        "學術期刊同研究報告",
        "主流媒體報導",
        "經過驗證嘅企業官方網站",
      ],
    },
    {
      heading: "點樣令你嘅內容成為引用來源",
      content: "要成為 AI 搜尋引擎嘅引用來源，你嘅內容需要滿足可信性、結構化同可引用性三個條件。",
      items: [
        "提供獨特嘅行業數據同研究",
        "用結構化格式呈現事實同統計",
        "確保所有聲明都有來源支持",
        "定期更新內容保持時效性",
      ],
      tip: "提示：原創研究同行業報告係最容易被 AI 引用嘅內容類型。",
    },
    {
      heading: `${engineName} 嘅引用風格`,
      content: `${engineName} 引用內容嘅方式係：${ek.citationStyle}。針對呢種引用風格，你需要優化你嘅內容呈現方式。`,
    },
  ];
}

function generateWhyNotCitedSections(_engineSlug: string, engineName: string): GuideSection[] {
  return [
    {
      heading: `點解 ${engineName} 唔引用你嘅內容？`,
      content: `好多企業發現佢哋嘅網站喺 ${engineName} 嘅回答入面從未出現。以下係最常見嘅原因同解決方案。`,
    },
    {
      heading: "原因 1：內容唔夠結構化",
      content: `${engineName} 需要結構化嘅內容先可以準確引用。如果你嘅頁面只係一大段文字，AI 系統好難提取有用嘅資訊。`,
      items: [
        "用 H2/H3 標題分割內容",
        "每個段落聚焦一個主題",
        "使用列表同表格呈現資料",
        "加入 FAQ Schema 標記",
      ],
    },
    {
      heading: "原因 2：缺乏權威性信號",
      content: "AI 搜尋引擎只會推薦佢哋認為可信嘅來源。如果你嘅品牌喺網上缺乏權威性信號，被引用嘅機會就非常低。",
      items: [
        "反向連結不足或質素低",
        "品牌喺網上嘅提及頻率低",
        "缺乏作者署名同專家身份標記",
        "網站冇完整嘅 Schema Markup",
      ],
    },
    {
      heading: "原因 3：內容同查詢唔匹配",
      content: "你嘅內容可能質素好高，但如果同用戶嘅 AI 查詢唔匹配，就唔會被引用。你需要了解你嘅潛在客戶會點樣問 AI。",
      tip: "提示：用「問題挖掘」技術搵出你嘅客戶最常問 AI 嘅問題，然後建立針對性嘅內容。",
    },
    {
      heading: "解決方案：SurfIO 嘅 AEO 審計",
      content: "我哋嘅免費 AEO 審計會全面分析你嘅網站，搵出所有阻止你被 AI 引用嘅問題，並提供具體嘅改善建議。",
    },
  ];
}

function generateVsGoogleSections(_engineSlug: string, engineName: string): GuideSection[] {
  return [
    {
      heading: `${engineName} vs Google：全面比較`,
      content: `${engineName} 同 Google 傳統搜尋有根本性嘅區別。了解呢啲區別先可以制定有效嘅雙軌優化策略。`,
    },
    {
      heading: "搜尋模式嘅差異",
      content: "Google 搜尋係基於關鍵字匹配，而 AI 搜尋係基於語義理解同對話式查詢。呢個差異影響你嘅內容策略。",
      items: [
        "Google：短關鍵字驅動 → AI：自然語言問題驅動",
        "Google：10 條藍色連結 → AI：直接答案 + 推薦",
        "Google：點擊率重要 → AI：被引用率重要",
        "Google：排名追蹤明確 → AI：引用追蹤較困難",
      ],
    },
    {
      heading: "你應該優先優化邊個？",
      content: "呢個取決於你嘅行業同目標客群。但對大部分企業嚟講，AI 搜尋嘅增長速度意味住你唔可以再忽略 AEO。",
      tip: "提示：最理想嘅策略係 SEO + AEO 雙軌並行。好多 SEO 最佳實踐（如結構化數據）同樣有利於 AEO。",
    },
    {
      heading: "ROI 比較",
      content: "AI 搜尋嘅轉化率通常高於傳統搜尋，因為 AI 已經幫用戶做咗初步篩選。被 AI 推薦嘅品牌享有更高嘅信任度同點擊率。",
    },
  ];
}

// Generic section generators for other topics
function generateChecklistSections(engineSlug: string, engineName: string): GuideSection[] {
  const ek = ENGINE_KNOWLEDGE[engineSlug];
  return [
    {
      heading: `${engineName} 優化 Checklist：完整清單`,
      content: `以下係我哋為 ${engineName} 優化整理嘅完整 checklist。按照呢個清單逐步執行，可以顯著提升你嘅 AI 搜尋能見度。`,
    },
    {
      heading: "基礎設置（必做）",
      content: "呢啲係最基本嘅設置，每個企業都應該完成。",
      items: [
        "✅ 部署 Organization Schema",
        "✅ 部署 WebSite Schema",
        "✅ 部署 FAQ Schema（至少 5 條 FAQ）",
        "✅ 設置 robots.txt 允許 AI 爬蟲",
        "✅ 提交 IndexNow（如適用）",
        "✅ 確保 SSL 證書有效",
        "✅ 優化 Core Web Vitals",
      ],
    },
    {
      heading: "內容優化（重要）",
      content: "內容係 AI 搜尋排名嘅核心。",
      items: [
        "✅ 每個核心服務頁面有 FAQ 區塊",
        "✅ 內容以問答格式組織",
        "✅ 每篇內容有明確嘅作者署名",
        "✅ 使用結構化嘅 H2/H3 標題",
        "✅ 提供獨特嘅數據同洞察",
        "✅ 定期更新內容（至少每季一次）",
      ],
    },
    {
      heading: "權威性建設（進階）",
      content: "建立你嘅品牌喺 AI 系統中嘅權威性需要持續嘅努力。",
      items: [
        "✅ 建立創辦人嘅 AI 個人品牌",
        "✅ 獲取高 DA 網站嘅反向連結",
        "✅ 喺行業媒體發佈原創研究",
        "✅ 維護一致嘅 NAP 資訊",
        "✅ 建立 Google Business Profile",
        "✅ 喺評論平台獲取正面評價",
      ],
      tip: `提示：${engineName} 特別重視 ${ek.keyFactors[0]} 同 ${ek.keyFactors[1]}。優先處理呢兩個方面。`,
    },
    {
      heading: "監測同追蹤",
      content: "定期檢查你嘅 AI 搜尋表現，根據數據調整策略。",
      items: [
        "✅ 每週手動檢查核心關鍵字嘅 AI 搜尋結果",
        "✅ 記錄品牌被提及嘅 AI 平台同語境",
        "✅ 追蹤競爭對手嘅 AI 能見度變化",
        "✅ 每月生成 AEO 表現報告",
      ],
    },
  ];
}

function generateGenericSections(engineSlug: string, engineName: string, topicSlug: string, topicName: string): GuideSection[] {
  const ek = ENGINE_KNOWLEDGE[engineSlug];

  const topicSectionMap: Record<string, () => GuideSection[]> = {
    "content-types": () => [
      { heading: `${engineName} 偏好嘅內容類型`, content: `唔同嘅內容類型喺 ${engineName} 有唔同嘅表現。了解邊類內容最容易被 ${engineName} 引用，可以幫你優化內容策略。`, items: ["FAQ 頁面：最容易被直接引用", "How-to 指南：流程類查詢首選", "比較頁面：決策類查詢常見", "行業報告：數據類查詢偏好", "案例分析：推薦類查詢有用"] },
      { heading: "內容格式最佳實踐", content: `針對 ${engineName} 嘅內容格式建議：`, items: ["用簡潔明確嘅句子", "每段聚焦一個要點", "提供具體數字同例子", "使用結構化列表", "加入清晰嘅摘要"] },
    ],
    "tracking": () => [
      { heading: `追蹤你喺 ${engineName} 嘅引用`, content: `追蹤 AI 搜尋能見度同傳統 SEO 排名追蹤有本質區別。AI 回答具有動態性同非確定性，需要特殊嘅追蹤方法。` },
      { heading: "手動追蹤方法", content: "最基本但有效嘅方法：", items: ["定期用核心關鍵字查詢 AI 搜尋", "記錄品牌被提及嘅次數同語境", "截圖保存重要嘅 AI 推薦結果", "追蹤競爭對手嘅出現頻率"] },
      { heading: "自動化追蹤工具", content: "市面上開始出現專門嘅 AI 搜尋追蹤工具：", items: ["Otterly.ai —— AI 搜尋監測", "Profound —— LLM 品牌追蹤", "Peec AI —— AI 引用分析"] },
    ],
    "algorithm-updates": () => [
      { heading: `${engineName} 演算法更新追蹤`, content: `${engineName} 嘅更新頻率係「${ek.updateFrequency}」。了解最新嘅更新可以幫你及時調整策略。` },
      { heading: "近期重要更新", content: `${engineName} 喺 2025-2026 年嘅主要更新包括更強嘅事實驗證能力、改善咗嘅引用機制、同更精準嘅本地搜尋功能。`, tip: "提示：關注官方公告同 AI 搜尋社區嘅討論，及早了解演算法變化。" },
    ],
    "eeat": () => [
      { heading: `${engineName} 嘅 E-E-A-T 要求`, content: `E-E-A-T（經驗、專業性、權威性、可信度）喺 AI 搜尋中嘅重要性更高。${engineName} 特別重視可驗證嘅專業信號。` },
      { heading: "點樣展示經驗（Experience）", content: "AI 搜尋引擎越來越重視第一手經驗。", items: ["分享真實案例同數據", "包含作者嘅行業經驗年限", "展示實際操作過程", "提供原創截圖同演示"] },
      { heading: "點樣建立專業性（Expertise）", content: "專業性信號幫助 AI 判斷你嘅內容是否值得引用。", items: ["展示相關資歷同認證", "發佈深度技術內容", "被行業媒體引用", "參與行業會議同活動"] },
    ],
    "structured-data": () => [
      { heading: `${engineName} 嘅結構化數據指南`, content: `結構化數據（Schema Markup）幫助 ${engineName} 準確理解你嘅內容同業務。正確嘅 Schema 部署可以顯著提升你被 AI 引用嘅機會。` },
      { heading: "必備 Schema 類型", content: "以下 Schema 類型對 AEO 最有幫助：", items: ["Organization —— 描述你嘅公司", "Person —— 描述創辦人同團隊成員", "FAQPage —— 結構化常見問題", "HowTo —— 流程同教程", "Article —— 文章同博客內容", "Product/Service —— 產品同服務描述", "Review —— 評論同評分"] },
    ],
    "b2b-vs-b2c": () => [
      { heading: `${engineName} B2B vs B2C 策略差異`, content: `B2B 同 B2C 企業喺 ${engineName} 嘅優化策略有明顯差異。了解呢啲差異可以幫你制定更精準嘅 AEO 策略。` },
      { heading: "B2B AEO 策略要點", content: "B2B 企業嘅 AI 搜尋查詢通常更加專業同具體。", items: ["專注「最好嘅 XX 軟件/服務」類查詢", "建立技術白皮書同行業報告", "優化產品比較同功能對比頁面", "重視 LinkedIn 同行業平台存在感"] },
      { heading: "B2C AEO 策略要點", content: "B2C 企業嘅 AI 查詢偏向消費決策同推薦。", items: ["專注「推薦」「最好」「附近」類查詢", "優化用戶評論同社交證據", "建立購買指南同比較內容", "重視 Google Business Profile 同評論平台"] },
    ],
    "local-search": () => [
      { heading: `${engineName} 本地搜尋優化`, content: `本地搜尋喺 ${engineName} 嘅重要性持續上升。「附近嘅 XX」「XX 區推薦」呢類查詢嘅 AI 搜尋量急增。` },
      { heading: "本地 AEO 基礎設置", content: "做好本地 AEO 嘅基礎：", items: ["完善 Google Business Profile", "確保 NAP 資訊一致", "部署 LocalBusiness Schema", "建立本地相關內容", "獲取本地媒體引用"] },
    ],
    "visual-content": () => [
      { heading: `${engineName} 圖片同影片引用`, content: `AI 搜尋引擎對視覺內容嘅處理能力不斷提升。${engineName} 已經可以理解同引用圖片同影片內容。` },
      { heading: "圖片優化策略", content: "令你嘅圖片被 AI 搜尋引用：", items: ["使用描述性嘅 alt 文字", "部署 ImageObject Schema", "使用原創高質素圖片", "加入圖片說明文字"] },
    ],
    "future-predictions": () => [
      { heading: `${engineName} 未來發展預測`, content: `AI 搜尋正在快速演進。以下係我哋對 ${engineName} 未來發展嘅預測，幫你提前佈局。` },
      { heading: "2026-2027 預測", content: "基於目前嘅趨勢同技術發展：", items: ["AI 搜尋將佔總搜尋量 30%+", "即時個人化推薦將成為標準", "語音 AI 搜尋將大幅增長", "AI 搜尋結果嘅商業化加速", "品牌實體識別精確度提升"] },
    ],
  };

  if (topicSectionMap[topicSlug]) {
    return topicSectionMap[topicSlug]();
  }

  // Fallback generic sections
  return [
    { heading: `${engineName} ${topicName}：概述`, content: `呢篇指南深入探討 ${engineName} 嘅${topicName}，幫你制定有效嘅 AEO 策略。` },
    { heading: "核心要點", content: `了解 ${engineName} 喺${topicName}方面嘅運作機制：`, items: ek.keyFactors },
    { heading: "實際應用", content: "將呢啲知識應用到你嘅 AEO 策略中。", tip: "提示：AEO 策略需要持續優化，唔係一次性嘅工作。" },
  ];
}

// --- Takeaways generator ---
function generateTakeaways(engineName: string, topicName: string): string[] {
  return [
    `${engineName} 嘅 ${topicName} 係 AEO 成功嘅關鍵環節`,
    "結構化內容同 Schema Markup 係基礎要求",
    "權威性建設需要持續投入",
    "定期監測同調整策略至關重要",
    "AI 搜尋優化同傳統 SEO 互補而非替代",
    `針對 ${engineName} 嘅獨特機制制定專屬策略`,
  ];
}

// --- FAQ generator ---
function generateGuideFaqs(engineName: string, topicName: string, v: number): [string, string][] {
  const pools: [string, string][][] = [
    [
      [`${engineName} ${topicName}同傳統 SEO 有咩分別？`, `傳統 SEO 專注搜尋排名，而 ${engineName} 嘅 ${topicName} 專注令你嘅內容被 AI 引用同推薦。兩者嘅優化策略有重疊但亦有明顯差異。`],
      [`幾耐先見到 ${engineName} ${topicName}嘅效果？`, `大部分企業喺 30-60 日內開始見到 ${engineName} 能見度改善。完整效果通常喺 90 日內呈現。`],
      [`${engineName} ${topicName}需要幾多預算？`, `基礎嘅 ${topicName} 可以零成本開始（例如添加 Schema Markup）。但要獲得顯著效果，建議投入專業嘅 AEO 服務。`],
    ],
    [
      [`小企業可以自己做 ${engineName} ${topicName}嗎？`, `基礎設置可以自己做，但深度優化需要專業知識同持續監測。建議至少做一次專業嘅 AEO 審計了解你嘅起點。`],
      [`${engineName} ${topicName}嘅最大挑戰係咩？`, `最大挑戰係追蹤效果——AI 搜尋結果嘅非確定性令傳統嘅排名追蹤方法唔完全適用。需要新嘅監測方法。`],
      [`SurfIO 點樣幫我做 ${engineName} ${topicName}？`, `我哋提供完整嘅 AEO 服務，從審計到策略到執行。針對 ${engineName} 嘅獨特機制，我哋有經過驗證嘅優化方法論。`],
    ],
  ];

  return pools[v % pools.length];
}

// --- Related guides generator ---
function generateRelatedGuides(engineSlug: string, topicSlug: string): string[] {
  const related: string[] = [];
  const topicSlugs = GUIDE_TOPICS.map(t => t.slug);
  const engineSlugs = AI_ENGINES.map(e => e.slug);

  // Same engine, different topics (up to 2)
  const otherTopics = topicSlugs.filter(t => t !== topicSlug);
  related.push(`${engineSlug}-${otherTopics[0]}`);
  related.push(`${engineSlug}-${otherTopics[1]}`);

  // Different engine, same topic (up to 2)
  const otherEngines = engineSlugs.filter(e => e !== engineSlug);
  related.push(`${otherEngines[0]}-${topicSlug}`);
  related.push(`${otherEngines[1]}-${topicSlug}`);

  return related.slice(0, 4);
}

// --- Main generator ---
export function getGuidePages(): GuideData[] {
  const pages: GuideData[] = [];

  for (const engine of AI_ENGINES) {
    for (const topic of GUIDE_TOPICS) {
      const slug = `${engine.slug}-${topic.slug}`;
      const v = pickVariant(slug, 5);

      // Select sections based on topic
      let sections: GuideSection[];
      switch (topic.slug) {
        case "ranking":
          sections = generateRankingSections(engine.slug, engine.name);
          break;
        case "ranking-factors":
          sections = generateRankingFactorsSections(engine.slug, engine.name);
          break;
        case "citation-sources":
          sections = generateCitationSourcesSections(engine.slug, engine.name);
          break;
        case "why-not-cited":
          sections = generateWhyNotCitedSections(engine.slug, engine.name);
          break;
        case "vs-google":
          sections = generateVsGoogleSections(engine.slug, engine.name);
          break;
        case "checklist":
          sections = generateChecklistSections(engine.slug, engine.name);
          break;
        default:
          sections = generateGenericSections(engine.slug, engine.name, topic.slug, topic.topicName);
          break;
      }

      pages.push({
        slug,
        engineSlug: engine.slug,
        engineName: engine.name,
        topicSlug: topic.slug,
        topicName: topic.topicName,
        heroTitle: `${engine.name} ${topic.topicName}：2026 完整指南`,
        heroSubtitle: `深入了解 ${engine.name} 嘅${topic.topicName}，掌握最新嘅 AEO 優化策略。`,
        sections,
        keyTakeaways: generateTakeaways(engine.name, topic.topicName),
        faqs: generateGuideFaqs(engine.name, topic.topicName, v),
        relatedGuides: generateRelatedGuides(engine.slug, topic.slug),
        metaTitle: `${engine.name} ${topic.topicName} | AEO 指南 - SurfIO`,
        metaDescription: `深入了解 ${engine.name} 嘅${topic.topicName}。SurfIO 2026 完整 AEO 指南，幫你掌握 AI 搜尋優化策略。`,
      });
    }
  }

  return pages;
}
