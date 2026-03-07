export interface PlatformData {
  slug: string;
  name: string;
  heroTitle: string;
  heroSubtitle: string;
  howItWorks: string;
  rankingFactors: { title: string; desc: string }[];
  optimizations: string[];
  stats: { value: string; label: string }[];
  faqs: [string, string][];
  metaTitle: string;
  metaDescription: string;
}

export const platforms: PlatformData[] = [
  {
    slug: "chatgpt",
    name: "ChatGPT",
    heroTitle: "ChatGPT 搜尋優化：令 ChatGPT 主動推薦你嘅品牌",
    heroSubtitle: "ChatGPT 每月有超過 2 億活躍用戶。當佢哋問 ChatGPT 推薦你行業嘅產品或服務時，你嘅品牌需要出現喺答案入面。",
    howItWorks: "ChatGPT 使用大型語言模型（LLM）生成回應。佢嘅答案基於訓練數據、Bing 搜尋結果同網頁瀏覽能力。要被 ChatGPT 推薦，你需要：足夠嘅線上權威性、結構化嘅內容、同跨平台嘅品牌一致性。",
    rankingFactors: [
      { title: "品牌提及頻率", desc: "你嘅品牌喺高質素網站被提及嘅次數直接影響 ChatGPT 推薦你嘅可能性。" },
      { title: "內容結構化程度", desc: "ChatGPT 偏好結構清晰、有標題層級、列表同 FAQ 格式嘅內容。" },
      { title: "資訊一致性", desc: "你嘅品牌資訊喺唔同平台（網站、LinkedIn、目錄）需要高度一致。" },
      { title: "權威性信號", desc: "來自高域名權威網站嘅反向連結同品牌提及增強你嘅可信度。" },
    ],
    optimizations: [
      "優化你嘅網站內容，令 ChatGPT 嘅網頁瀏覽功能可以準確抓取",
      "建立跨平台品牌一致性（網站、LinkedIn、行業目錄、Wikipedia）",
      "創建 ChatGPT 友好嘅 FAQ 同問答格式內容",
      "增加高質素網站上嘅品牌提及同反向連結",
      "實施結構化數據標記，幫助 ChatGPT 理解你嘅業務",
    ],
    stats: [
      { value: "200M+", label: "月活躍用戶" },
      { value: "+430%", label: "品牌推薦增長" },
      { value: "30 日", label: "首次被推薦" },
    ],
    faqs: [
      ["ChatGPT 點樣決定推薦邊個品牌？", "ChatGPT 綜合考慮品牌嘅線上存在感、內容質素、權威性信號同資訊一致性。被多個可信來源提及嘅品牌更有可能被推薦。"],
      ["ChatGPT 搜尋功能同傳統搜尋有咩分別？", "ChatGPT 搜尋直接畀你答案而唔係連結列表。用戶得到精選嘅推薦，所以被推薦嘅價值遠高於傳統搜尋排名。"],
      ["我可以控制 ChatGPT 點樣描述我嘅品牌嗎？", "你唔能直接控制，但你可以影響。透過優化你嘅線上內容同品牌資訊嘅一致性，你可以引導 ChatGPT 更準確咁描述你嘅品牌。"],
    ],
    metaTitle: "ChatGPT 搜尋優化 | 令 ChatGPT 推薦你嘅品牌 - SurfIO",
    metaDescription: "SurfIO 幫你嘅品牌喺 ChatGPT 搜尋中被推薦。200M+ 用戶觸及，430% 品牌推薦增長，30 日見效。",
  },
  {
    slug: "google-ai-overview",
    name: "Google AI Overview",
    heroTitle: "Google AI Overview 優化：搶佔 Google AI 搜尋嘅頂部位置",
    heroSubtitle: "Google AI Overview 出現喺搜尋結果嘅最頂部，攔截超過 60% 嘅點擊。如果你唔喺 AI Overview 入面，你就係喺最重要嘅搜尋位置缺席。",
    howItWorks: "Google AI Overview 使用 Gemini 模型分析搜尋結果，生成綜合性嘅 AI 答案。佢主要從排名前 10 嘅頁面提取資訊，但偏好結構化、權威性強同直接回答問題嘅內容。",
    rankingFactors: [
      { title: "現有搜尋排名", desc: "排名前 10 嘅頁面更有可能被 AI Overview 引用。SEO 同 AEO 相輔相成。" },
      { title: "直接答案格式", desc: "Google AI Overview 偏好可以直接提取作為答案嘅內容——簡潔、明確、有結構。" },
      { title: "E-E-A-T 信號", desc: "經驗、專業、權威、可信度——Google 對 AI Overview 來源嘅要求比普通排名更高。" },
      { title: "Schema 標記", desc: "FAQ、HowTo、Article schema 幫助 Google 理解你嘅內容結構同意圖。" },
    ],
    optimizations: [
      "優化現有排名前 20 嘅頁面，加強直接答案格式",
      "實施完整嘅 FAQ 同 HowTo schema 標記",
      "建立問題導向嘅內容結構，每個 H2/H3 回答一個具體問題",
      "加強 E-E-A-T 信號——作者簡介、專家引用、數據來源",
      "優化精選摘要位置，因為 AI Overview 經常引用精選摘要內容",
    ],
    stats: [
      { value: "60%+", label: "點擊攔截率" },
      { value: "+350%", label: "AI Overview 出現率" },
      { value: "45+", label: "AI 引用關鍵字" },
    ],
    faqs: [
      ["Google AI Overview 會取代傳統搜尋結果嗎？", "唔會完全取代，但 AI Overview 出現喺搜尋結果最頂部，攔截大量點擊。忽略 AI Overview 優化等於放棄最有價值嘅搜尋位置。"],
      ["SEO 做得好係咪就自動有 AI Overview？", "唔一定。SEO 排名高係基礎，但 AI Overview 對內容格式、結構化數據同直接答案能力有額外要求。需要專門嘅 AEO 優化。"],
      ["AI Overview 對流量嘅影響有幾大？", "被 AI Overview 引用嘅頁面平均獲得 2-3 倍嘅點擊率。但未被引用嘅頁面可能流量下跌 30-60%。差距非常大。"],
    ],
    metaTitle: "Google AI Overview 優化 | 搶佔 Google AI 搜尋頂部 - SurfIO",
    metaDescription: "SurfIO 幫你搶佔 Google AI Overview 位置。60%+ 點擊攔截率，專業 AEO 策略，350% AI Overview 出現率提升。",
  },
  {
    slug: "perplexity",
    name: "Perplexity",
    heroTitle: "Perplexity 搜尋優化：令 Perplexity 引用你嘅品牌",
    heroSubtitle: "Perplexity 正在成為專業人士嘅首選搜尋工具。佢嘅引用式答案格式意味住被引用等於獲得最高級別嘅品牌背書。",
    howItWorks: "Perplexity 使用實時網頁搜尋結合 AI 生成答案，並附帶來源引用。佢嘅引用機制令被引用嘅品牌獲得直接流量同高度信任。同 ChatGPT 唔同，Perplexity 始終顯示來源。",
    rankingFactors: [
      { title: "內容新鮮度", desc: "Perplexity 偏好最新嘅內容。定期更新你嘅內容對 Perplexity 排名至關重要。" },
      { title: "引用價值", desc: "Perplexity 選擇最適合作為引用來源嘅內容——事實性強、有數據支持、結構清晰。" },
      { title: "頁面技術質素", desc: "快速載入、移動友好、無彈窗干擾嘅頁面更容易被 Perplexity 抓取同引用。" },
      { title: "內容深度", desc: "Perplexity 偏好有深度、全面嘅內容，而唔係表面性嘅概覽。" },
    ],
    optimizations: [
      "定期更新關鍵內容頁面，保持資訊時效性",
      "加入原創數據、調查結果同行業洞察，增加引用價值",
      "優化頁面技術表現——速度、可抓取性、結構化數據",
      "建立深度嘅專題內容中心，每個主題都有全面覆蓋",
      "確保內容有清晰嘅來源引用同數據支持",
    ],
    stats: [
      { value: "10M+", label: "日活躍用戶" },
      { value: "+280%", label: "引用出現率" },
      { value: "直接流量", label: "引用帶嚟嘅" },
    ],
    faqs: [
      ["Perplexity 同 Google 有咩唔同？", "Perplexity 直接畀你答案加來源引用，而 Google 畀你連結列表。被 Perplexity 引用等於獲得最高級別嘅搜尋推薦。"],
      ["Perplexity 嘅用戶群係邊啲？", "主要係專業人士、研究人員同技術工作者——通常係高價值、高意圖嘅用戶。被 Perplexity 引用接觸到嘅係優質受眾。"],
      ["點樣追蹤 Perplexity 上嘅表現？", "我哋用專門嘅 AI 搜尋監測工具追蹤你嘅品牌喺 Perplexity 上嘅引用頻率、引用位置同帶嚟嘅流量。"],
    ],
    metaTitle: "Perplexity 搜尋優化 | 令 Perplexity 引用你嘅品牌 - SurfIO",
    metaDescription: "SurfIO 幫你嘅品牌被 Perplexity 引用。實時搜尋優化，280% 引用出現率提升，獲得直接流量同信任。",
  },
  {
    slug: "claude",
    name: "Claude",
    heroTitle: "Claude AI 優化：令 Anthropic Claude 推薦你嘅品牌",
    heroSubtitle: "Claude 以準確性同深度分析聞名，越來越多企業用戶依賴 Claude 做研究同決策。你嘅品牌需要喺 Claude 嘅推薦中出現。",
    howItWorks: "Claude 由 Anthropic 開發，強調準確性同安全性。佢嘅推薦基於訓練數據中嘅品牌存在感同權威性。同時，Claude 嘅搜尋功能可以實時訪問網頁內容。",
    rankingFactors: [
      { title: "資訊準確性", desc: "Claude 對資訊準確性嘅要求極高。你嘅內容需要事實準確、有來源支持。" },
      { title: "專業深度", desc: "Claude 偏好有深度嘅專業內容，而唔係表面性嘅營銷材料。" },
      { title: "品牌一致性", desc: "跨平台嘅品牌資訊一致性幫助 Claude 建立對你品牌嘅信心。" },
      { title: "內容結構", desc: "清晰嘅邏輯結構同標題層級幫助 Claude 提取同引用你嘅內容。" },
    ],
    optimizations: [
      "確保所有內容事實準確，有可驗證嘅數據來源",
      "建立深度嘅專業知識內容，展示行業專家身份",
      "跨平台品牌資訊同步更新，保持高度一致",
      "優化內容結構，每個段落聚焦一個核心觀點",
      "建立全面嘅品牌知識庫，涵蓋所有服務同產品",
    ],
    stats: [
      { value: "快速增長", label: "用戶群體" },
      { value: "+260%", label: "品牌推薦率" },
      { value: "企業級", label: "用戶質素" },
    ],
    faqs: [
      ["Claude 同 ChatGPT 嘅推薦邏輯有咩唔同？", "Claude 更加重視準確性同深度。佢唔太會推薦未經充分驗證嘅品牌。所以建立真正嘅專業權威性對 Claude 優化至關重要。"],
      ["Claude 適合邊啲行業做 AEO？", "Claude 嘅用戶群偏向專業同技術。B2B 服務、專業服務、技術產品等行業喺 Claude 上嘅 AEO 潛力最大。"],
      ["Claude 嘅企業版本對 AEO 有咩影響？", "越來越多企業用 Claude 做內部研究同決策。被 Claude 推薦嘅品牌可能影響企業採購決策，呢個係 B2B 嘅巨大機會。"],
    ],
    metaTitle: "Claude AI 優化 | 令 Claude 推薦你嘅品牌 - SurfIO",
    metaDescription: "SurfIO 幫你嘅品牌被 Anthropic Claude 推薦。企業級用戶觸及，260% 品牌推薦率提升，深度專業優化。",
  },
  {
    slug: "bing-chat",
    name: "Bing Chat / Copilot",
    heroTitle: "Bing Chat / Copilot 優化：令 Microsoft AI 搜尋推薦你",
    heroSubtitle: "Microsoft Copilot 已經整合到 Windows、Office 同 Edge 瀏覽器。數以億計嘅用戶每日透過 Copilot 搜尋，你嘅品牌準備好未？",
    howItWorks: "Bing Chat / Microsoft Copilot 使用 GPT-4 模型結合 Bing 搜尋結果生成答案。佢深度整合 Microsoft 生態系統，包括 Office 365、Windows 同 Edge 瀏覽器。",
    rankingFactors: [
      { title: "Bing SEO 排名", desc: "Copilot 主要引用 Bing 搜尋結果。你嘅 Bing 排名直接影響被引用嘅可能性。" },
      { title: "Bing Webmaster Tools", desc: "正確配置 Bing Webmaster Tools 確保你嘅網站被 Bing 完整索引。" },
      { title: "內容質素同格式", desc: "Copilot 偏好結構清晰、直接回答問題嘅高質素內容。" },
      { title: "Microsoft 生態整合", desc: "喺 LinkedIn 同其他 Microsoft 平台嘅存在感有助於 Copilot 推薦。" },
    ],
    optimizations: [
      "優化 Bing 搜尋排名——Bing 嘅排名因素同 Google 有差異",
      "配置 Bing Webmaster Tools 同 IndexNow 協議",
      "優化 LinkedIn 公司頁面同個人 profile 嘅完整度",
      "建立 Bing 友好嘅結構化數據標記",
      "確保你嘅內容對 Microsoft Edge 瀏覽器嘅 AI 功能友好",
    ],
    stats: [
      { value: "1B+", label: "Copilot 觸及用戶" },
      { value: "+320%", label: "Bing AI 引用率" },
      { value: "企業滲透", label: "Office 365 整合" },
    ],
    faqs: [
      ["Bing Chat 同 Copilot 有咩分別？", "Bing Chat 已經整合成為 Microsoft Copilot。喺 Bing 搜尋、Edge 瀏覽器同 Windows 都可以使用，功能統一但觸及面更廣。"],
      ["點解要專門優化 Bing？", "好多人忽略 Bing，但 Copilot 整合到 Windows 同 Office 後，Bing 嘅搜尋份額大幅增長。企業用戶尤其多用 Microsoft 生態系統。"],
      ["Bing 同 Google 嘅 SEO 有咩唔同？", "Bing 更重視社交媒體信號、精確匹配關鍵字同多媒體內容。我哋嘅策略會同時優化兩個搜尋引擎。"],
    ],
    metaTitle: "Bing Chat / Copilot 優化 | Microsoft AI 搜尋推薦 - SurfIO",
    metaDescription: "SurfIO 幫你嘅品牌被 Microsoft Copilot 推薦。10 億+ 用戶觸及，320% Bing AI 引用率提升，企業級影響力。",
  },
];
