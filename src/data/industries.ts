export interface IndustryData {
  slug: string;
  name: string;
  heroTitle: string;
  heroSubtitle: string;
  problems: string[];
  solutions: string[];
  stats: { value: string; label: string }[];
  faqs: [string, string][];
  metaTitle: string;
  metaDescription: string;
}

export const industries: IndustryData[] = [
  {
    slug: "financial-services",
    name: "金融服務",
    heroTitle: "金融服務 AEO 優化：令 AI 搜尋主動推薦你嘅金融產品",
    heroSubtitle: "當客戶問 ChatGPT「邊間銀行利率最好」或者「點樣選擇理財顧問」嘅時候，你嘅品牌會唔會被推薦？我哋幫金融機構喺 AI 搜尋時代搶佔先機。",
    problems: [
      "客戶越來越依賴 AI 助手比較金融產品，但你嘅品牌從未被提及",
      "傳統 SEO 流量持續下跌，AI Overview 攔截咗大量搜尋點擊",
      "合規要求令內容優化更加複雜，但 AI 引擎需要結構化嘅權威內容",
      "競爭對手已經開始喺 ChatGPT 同 Perplexity 出現，你正在失去市場份額",
    ],
    solutions: [
      "金融產品結構化數據標記，令 AI 引擎準確理解你嘅服務",
      "合規友好嘅 AEO 內容策略，平衡監管要求同 AI 可讀性",
      "建立金融專業知識圖譜，提升你喺 AI 系統中嘅權威性",
      "跨平台 AI 能見度監測，追蹤你喺每個 AI 搜尋引擎嘅表現",
    ],
    stats: [
      { value: "+380%", label: "AI 搜尋能見度提升" },
      { value: "45 日", label: "首次出現喺 ChatGPT" },
      { value: "+220%", label: "自然查詢增長" },
    ],
    faqs: [
      ["金融服務公司做 AEO 有咩特別考慮？", "金融服務受嚴格監管，所有內容都需要合規審查。我哋嘅 AEO 策略會確保內容既符合監管要求，又能被 AI 引擎有效引用。我哋會同你嘅合規團隊緊密合作。"],
      ["AEO 可以幫金融公司獲得咩樣嘅客戶？", "透過 AEO，你嘅金融產品會喺潛在客戶問 AI 有關貸款、投資、保險等問題時被推薦。呢啲都係高意圖查詢，轉化率遠高於傳統搜尋。"],
      ["金融服務 AEO 幾耐先見到效果？", "大部分金融客戶喺 30-45 日內開始喺 AI 搜尋結果出現。由於金融行業嘅權威性要求較高，完整效果通常喺 60-90 日內呈現。"],
    ],
    metaTitle: "金融服務 AEO 優化 | AI 搜尋推薦你嘅金融產品 - SurfIO",
    metaDescription: "SurfIO 幫金融機構喺 ChatGPT、Google AI Overview、Perplexity 被推薦。專業金融 AEO 策略，合規友好，45 日內見效。",
  },
  {
    slug: "accounting-firms",
    name: "會計師事務所",
    heroTitle: "會計師事務所 AEO 優化：令 AI 搜尋推薦你嘅專業服務",
    heroSubtitle: "當企業老闆問 AI「邊間會計師事務所最適合中小企」，你嘅事務所會唔會出現？我哋幫會計師事務所喺 AI 時代建立數碼優勢。",
    problems: [
      "大部分會計師事務所仍然依賴轉介紹，缺乏線上曝光",
      "AI 搜尋正在改變企業客戶搵會計師嘅方式，但你嘅網站未準備好",
      "行業競爭激烈，傳統 SEO 難以突圍，需要新嘅獲客渠道",
      "潛在客戶越來越習慣直接問 ChatGPT 推薦，唔再逐間 Google",
    ],
    solutions: [
      "專業服務 Schema 標記，令 AI 引擎清楚理解你嘅服務範圍同專長",
      "會計行業知識庫建設，建立你喺稅務、審計、諮詢等領域嘅權威性",
      "本地化 AEO 策略，確保你喺「香港會計師事務所」相關 AI 查詢中出現",
      "客戶案例結構化呈現，令 AI 系統可以引用你嘅成功案例",
    ],
    stats: [
      { value: "+340%", label: "AI 提及率增長" },
      { value: "+520%", label: "關鍵字排名增長" },
      { value: "45", label: "首頁排名關鍵字" },
    ],
    faqs: [
      ["會計師事務所真係需要 AEO 嗎？", "絕對需要。越來越多企業客戶用 AI 助手搵會計師。如果你嘅事務所未被 AI 推薦，你就係對呢批客戶隱形嘅。早期採用者會獲得巨大優勢。"],
      ["AEO 同傳統嘅會計師事務所營銷有咩唔同？", "傳統營銷依賴廣告同轉介紹。AEO 令你喺客戶主動搜尋嘅時候被推薦——呢啲係高意圖、高轉化嘅查詢。成本效益遠高於傳統廣告。"],
      ["小型會計師事務所都適合做 AEO 嗎？", "非常適合。AEO 唔需要大預算，反而係細所嘅優勢——AI 系統重視專業度同相關性多過品牌大小。專注特定服務領域嘅細所往往更容易被推薦。"],
    ],
    metaTitle: "會計師事務所 AEO 優化 | AI 搜尋推薦你嘅會計服務 - SurfIO",
    metaDescription: "SurfIO 專為會計師事務所設計嘅 AEO 策略。令你喺 ChatGPT、Perplexity 被推薦為首選會計師。340% AI 提及率增長。",
  },
  {
    slug: "b2b-software",
    name: "B2B 軟件",
    heroTitle: "B2B 軟件 AEO 優化：令 AI 推薦你嘅 SaaS 產品",
    heroSubtitle: "當企業決策者問 AI「最好嘅 CRM 軟件」或「邊個 ERP 系統適合中小企」，你嘅產品需要出現喺答案入面。",
    problems: [
      "B2B 買家越來越依賴 AI 做初步篩選，跳過傳統搜尋引擎",
      "軟件評測網站壟斷搜尋結果，你嘅官網難以直接觸達買家",
      "AI 搜尋結果傾向推薦被多個來源驗證嘅產品，你需要建立跨平台存在感",
      "競爭對手已經開始優化 AI 引用，搶佔「最佳軟件推薦」嘅位置",
    ],
    solutions: [
      "Software Application Schema 部署，令 AI 引擎準確理解你嘅產品功能",
      "技術內容 AEO 優化，將產品文檔轉化為 AI 可引用嘅權威資源",
      "跨平台品牌提及策略，增加你喺 AI 訓練數據中嘅出現頻率",
      "功能比較頁面優化，搶佔「Product A vs Product B」類型嘅 AI 查詢",
    ],
    stats: [
      { value: "+450%", label: "AI 推薦出現率" },
      { value: "30K", label: "每月自然點擊" },
      { value: "+15%", label: "額外查詢來源" },
    ],
    faqs: [
      ["B2B 軟件公司做 AEO 嘅 ROI 點樣？", "B2B 軟件嘅客戶生命週期價值高，即使少量新增嘅 AI 推薦帶嚟嘅客戶都可以產生顯著 ROI。我哋嘅客戶平均 3 個月內回本。"],
      ["AEO 可以幫我打贏 G2、Capterra 呢啲評測網站嗎？", "AEO 唔係取代評測網站，而係確保 AI 推薦你嘅產品時引用你嘅官方資訊而非第三方。同時，我哋會優化你喺評測平台嘅 profile 作為 AEO 策略嘅一部分。"],
      ["技術文檔點樣做 AEO 優化？", "我哋會將你嘅技術文檔重新結構化，加入 AI 友好嘅格式、FAQ schema 同實體標記。令 AI 系統可以準確引用你嘅產品功能同使用方法。"],
    ],
    metaTitle: "B2B 軟件 AEO 優化 | AI 搜尋推薦你嘅 SaaS 產品 - SurfIO",
    metaDescription: "SurfIO 幫 B2B 軟件公司喺 AI 搜尋中被推薦。ChatGPT、Perplexity 軟件推薦優化，450% AI 推薦出現率提升。",
  },
  {
    slug: "legal-services",
    name: "法律服務",
    heroTitle: "法律服務 AEO 優化：令 ChatGPT 同 Perplexity 主動推薦你嘅律師事務所",
    heroSubtitle: "當客戶問 AI「香港最好嘅商業律師」、「點樣處理勞資糾紛」或「離婚程序點走」，你嘅律師事務所需要出現喺 AI 嘅推薦結果入面。我哋幫你做到。",
    problems: [
      "法律服務高度依賴信任同權威性，但 AI 搜尋正在重新定義「權威」嘅標準",
      "潛在客戶越來越常用 ChatGPT 同 Perplexity 做法律初步研究，然後先決定搵邊個律師",
      "法律內容嘅合規性要求令 AI 優化更加複雜，需要平衡專業性同可讀性",
      "大型律師事務所已經開始投資 AEO，中小型事務所如果唔追上會流失大量潛在客戶",
      "傳統 SEO 排名被 Google AI Overview 截流，法律關鍵字嘅自然點擊率持續下跌",
      "AI 搜尋偏好結構化、可引用嘅權威內容，但大部分律師事務所網站仍然停留喺舊式 SEO 思維",
    ],
    solutions: [
      "LegalService 同 Attorney Schema 標記，令 AI 引擎精準理解你嘅專業範疇同律師資歷",
      "法律知識內容 AEO 化，將你嘅專業知識轉化為 AI 可引用嘅權威問答資源",
      "律師個人品牌 AI 能見度建設，確保 AI 推薦「人」而唔只係「所」",
      "案例分析結構化呈現，用成功案例建立 AI 系統中嘅可信度同 E-E-A-T 信號",
      "法律 FAQ 內容矩陣，覆蓋客戶最常問 AI 嘅法律問題，搶佔 AI 推薦位",
      "跨平台監測你喺 ChatGPT、Perplexity、Google AI Overview 嘅法律搜尋能見度",
    ],
    stats: [
      { value: "72%", label: "用戶用 AI 做法律初步研究" },
      { value: "30 日", label: "目標首次 AI 推薦時間" },
      { value: "Top 3", label: "目標 AI 搜尋排名" },
    ],
    faqs: [
      ["法律服務做 AEO 有咩合規風險？", "我哋了解法律行業嘅廣告同營銷規定。所有 AEO 內容都會經過合規審查，確保符合律師專業守則。我哋嘅目標係提供有價值嘅法律資訊，而非誇大宣傳。"],
      ["AI 會唔會推薦錯誤嘅法律建議？", "我哋嘅策略係令 AI 推薦你嘅事務所作為專業資源，而唔係讓 AI 代替你提供法律建議。結構化嘅內容會引導用戶搵專業律師諮詢。"],
      ["小型律師事務所可以同大所競爭嗎？", "可以。AI 搜尋重視專業度同相關性。專注特定法律領域嘅小型事務所往往喺 AI 推薦中表現更好，因為佢哋嘅內容更加精準同專業。"],
      ["AEO 對律師事務所嘅 ROI 係點樣？", "法律服務嘅客戶終身價值高，一個透過 AI 搜尋搵到你嘅客戶可能帶來數萬至數十萬嘅收入。相比傳統 Google Ads 嘅法律關鍵字成本，AEO 嘅長期回報率更高。"],
      ["你哋點樣處理唔同法律專業範疇？", "我哋會針對你嘅專業範疇（商業法、家庭法、刑事法等）制定獨立嘅 AEO 策略，確保 AI 喺相關查詢中準確推薦你嘅專長領域。"],
    ],
    metaTitle: "法律服務 AEO 優化 | 令 ChatGPT 推薦你嘅律師事務所 - SurfIO",
    metaDescription: "SurfIO 幫律師事務所喺 ChatGPT、Perplexity、Google AI Overview 被推薦。專業法律 AEO 策略，合規審查，30 日內出現喺 AI 搜尋結果。",
  },
  {
    slug: "healthcare",
    name: "醫療服務",
    heroTitle: "醫療服務 AEO 優化：令 AI 搜尋推薦你嘅診所同服務",
    heroSubtitle: "當病人問 AI「附近邊間牙醫好」或「邊間醫療中心做體檢最好」，你嘅診所會唔會被推薦？",
    problems: [
      "病人越來越常用 AI 助手搜尋醫療服務，傳統 SEO 流量持續下降",
      "醫療資訊嘅 E-E-A-T 要求極高，AI 引擎對醫療內容嘅篩選更加嚴格",
      "Google YMYL 政策令醫療 SEO 更加困難，需要新嘅獲客策略",
      "連鎖醫療品牌已經開始做 AI 優化，獨立診所需要追趕",
    ],
    solutions: [
      "MedicalOrganization Schema 完整部署，提升你喺 AI 系統中嘅可信度",
      "醫療專家內容策略，用醫生嘅專業知識建立 AI 權威性",
      "病人常見問題 AEO 優化，搶佔醫療查詢嘅 AI 推薦位置",
      "本地醫療 AEO，確保你喺地區性醫療查詢中出現",
    ],
    stats: [
      { value: "+310%", label: "AI 能見度提升" },
      { value: "+240%", label: "預約量增長" },
      { value: "60+", label: "AI 推薦關鍵字" },
    ],
    faqs: [
      ["醫療服務做 AEO 有咩特別規定？", "醫療內容受 YMYL 政策同醫療廣告法規約束。我哋嘅 AEO 策略會確保所有內容都有醫療專業人士審核，並符合相關法規要求。"],
      ["AI 推薦醫療服務安全嗎？", "我哋唔會令 AI 提供醫療建議。我哋嘅策略係令 AI 推薦你嘅診所作為專業醫療服務提供者，引導用戶搵專業醫療協助。"],
      ["診所網站需要咩改動？", "主要係內容結構化、Schema 標記同醫療知識頁面嘅優化。大部分改動唔需要重新設計網站，而係喺現有基礎上優化。"],
    ],
    metaTitle: "醫療服務 AEO 優化 | AI 搜尋推薦你嘅診所服務 - SurfIO",
    metaDescription: "SurfIO 幫醫療機構喺 AI 搜尋被推薦。YMYL 合規嘅 AEO 策略，310% AI 能見度提升，60+ AI 推薦關鍵字。",
  },
  {
    slug: "ecommerce",
    name: "電商",
    heroTitle: "電商 AEO 優化：令 AI 搜尋推薦你嘅產品",
    heroSubtitle: "當消費者問 AI「最好嘅無線耳機推薦」或「2026 年值得買嘅護膚品」，你嘅產品需要出現喺答案入面。",
    problems: [
      "AI 購物助手正在改變消費者嘅購買決策流程",
      "Amazon、HKTVmall 等大平台壟斷 AI 推薦，獨立電商難以突圍",
      "產品評論同比較類 AI 查詢急增，但你嘅品牌缺席",
      "傳統 SEO 嘅產品頁面優化已經唔夠，需要 AI 可引用嘅產品資訊",
    ],
    solutions: [
      "Product Schema 完整部署，令 AI 引擎理解你嘅產品屬性同價值",
      "AI 購物指南內容策略，搶佔「最好嘅 XX 推薦」類型查詢",
      "產品比較頁面 AEO 優化，喺「A vs B」類型查詢中出現",
      "用戶評論結構化標記，令 AI 系統可以引用真實用戶體驗",
    ],
    stats: [
      { value: "+280%", label: "AI 推薦出現率" },
      { value: "+190%", label: "自然流量增長" },
      { value: "200+", label: "排名關鍵字" },
    ],
    faqs: [
      ["電商 AEO 同傳統電商 SEO 有咩唔同？", "傳統電商 SEO 專注產品頁面排名。AEO 專注令你嘅產品喺 AI 購物推薦中出現。呢啲推薦通常有更高轉化率，因為 AI 已經幫客戶做咗篩選。"],
      ["細品牌點樣同大平台競爭 AI 推薦？", "AI 系統重視產品嘅獨特性同專業性。專注垂直品類嘅細品牌往往比大平台更容易喺特定查詢中被推薦。關鍵係建立品類專家身份。"],
      ["需要改動現有嘅電商網站嗎？", "主要係加強結構化數據、優化產品描述格式、建立 AI 友好嘅購買指南內容。唔需要重建網站，可以喺現有平台上優化。"],
    ],
    metaTitle: "電商 AEO 優化 | AI 搜尋推薦你嘅產品 - SurfIO",
    metaDescription: "SurfIO 幫電商品牌喺 ChatGPT、Perplexity 購物推薦中出現。280% AI 推薦出現率提升，搶佔 AI 購物助手推薦。",
  },
  {
    slug: "edtech",
    name: "教育科技",
    heroTitle: "教育科技 AEO 優化：令 AI 搜尋推薦你嘅學習平台",
    heroSubtitle: "當學生同家長問 AI「最好嘅線上學習平台」或「邊個編程課程適合初學者」，你嘅平台需要被推薦。",
    problems: [
      "EdTech 市場競爭激烈，新平台不斷湧現",
      "AI 助手正在成為學生搵課程嘅主要渠道",
      "大型平台如 Coursera、Udemy 壟斷 AI 推薦，你需要差異化策略",
      "教育內容嘅質素同認證對 AI 推薦至關重要",
    ],
    solutions: [
      "Course Schema 同 LearningResource 標記，令 AI 理解你嘅課程內容",
      "教育內容 AEO 策略，建立你喺特定學習領域嘅 AI 權威性",
      "學生評價同成果結構化呈現，增強 AI 系統對你嘅信任度",
      "學習路徑同技能圖譜建設，令 AI 可以精準匹配學生需求",
    ],
    stats: [
      { value: "+360%", label: "AI 搜尋能見度" },
      { value: "+200%", label: "註冊量增長" },
      { value: "85+", label: "AI 推薦關鍵字" },
    ],
    faqs: [
      ["EdTech 做 AEO 嘅重點係咩？", "重點係建立你嘅課程喺 AI 系統中嘅權威性。包括課程結構化數據、學習成果展示、同教育認證嘅 AI 可讀性。"],
      ["免費內容同付費課程點樣平衡？", "我哋嘅策略係用免費嘅教育內容建立 AI 權威性，然後引導用戶到付費課程。AI 推薦嘅流量通常有更高嘅付費轉化率。"],
      ["可以針對特定學科做 AEO 嗎？", "可以。我哋會為你嘅核心學科建立專門嘅 AEO 策略，確保你喺「最好嘅 XX 課程」等 AI 查詢中出現。"],
    ],
    metaTitle: "教育科技 AEO 優化 | AI 搜尋推薦你嘅學習平台 - SurfIO",
    metaDescription: "SurfIO 幫 EdTech 公司喺 AI 搜尋被推薦。課程 Schema 標記、學習路徑優化，360% AI 搜尋能見度提升。",
  },
  {
    slug: "startups",
    name: "初創企業",
    heroTitle: "初創企業 AEO 優化：用 AI 搜尋加速你嘅增長",
    heroSubtitle: "初創企業預算有限但需要快速增長。AEO 係最具成本效益嘅獲客渠道——令 AI 助手主動推薦你嘅產品畀潛在客戶。",
    problems: [
      "預算有限，無法同大公司競爭傳統廣告同 SEO",
      "品牌知名度低，AI 系統可能唔識你嘅產品",
      "需要快速驗證市場需求，但傳統 SEO 需要 6-12 個月先見效",
      "投資者越來越重視線上能見度，AI 搜尋表現影響融資表現",
    ],
    solutions: [
      "初創企業專屬 AEO 快速啟動方案，30 日內建立 AI 基礎能見度",
      "產品定位 AEO 化，令 AI 系統理解你嘅獨特價值主張",
      "創辦人思想領袖計劃，用個人品牌加速 AI 推薦",
      "精益 AEO 策略，用最少預算獲得最大 AI 搜尋回報",
    ],
    stats: [
      { value: "+500%", label: "AI 能見度提升" },
      { value: "30 日", label: "快速啟動見效" },
      { value: "3x", label: "獲客成本降低" },
    ],
    faqs: [
      ["初創企業幾時應該開始做 AEO？", "越早越好。AI 搜尋嘅先發優勢非常明顯——早期建立嘅 AI 權威性會隨時間複合增長。建議喺 product-market fit 確認後立即開始。"],
      ["初創企業嘅 AEO 預算要幾多？", "我哋有專為初創企業設計嘅精益方案。比傳統 SEO 或 PPC 成本低得多，但 AI 推薦帶嚟嘅客戶質量通常更高。"],
      ["AEO 可以幫助融資嗎？", "可以。投資者會 Google 你嘅公司。如果 AI 助手主動推薦你嘅產品，呢個係強大嘅社會認證。我哋有多個客戶反映 AEO 對佢哋嘅融資產生咗正面影響。"],
    ],
    metaTitle: "初創企業 AEO 優化 | 用 AI 搜尋加速增長 - SurfIO",
    metaDescription: "SurfIO 幫初創企業用 AEO 快速獲客。30 日見效，預算友好，500% AI 能見度提升。HKSTP 培育支持。",
  },
];
