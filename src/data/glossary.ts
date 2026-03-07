export interface GlossaryTerm {
  slug: string;
  term: string;
  definition: string;
  fullExplanation: string;
  relatedTerms: string[];
  metaTitle: string;
  metaDescription: string;
}

export const glossaryTerms: GlossaryTerm[] = [
  {
    slug: "aeo",
    term: "AEO (答案引擎優化)",
    definition: "Answer Engine Optimization (AEO) 係優化你嘅內容令 AI 搜尋引擎（如 ChatGPT、Google AI Overview、Perplexity）推薦你嘅品牌嘅策略。",
    fullExplanation: "AEO 係 SEO 嘅進化版本。傳統 SEO 專注令你嘅網站排喺搜尋結果嘅前幾位，而 AEO 專注令 AI 助手直接推薦你嘅品牌作為問題嘅答案。\n\n隨住越來越多用戶直接問 AI 助手而唔係用 Google 搜尋，AEO 已經成為現代數碼營銷嘅必備策略。AEO 涉及內容結構化、Schema 標記、品牌權威性建設、同跨平台一致性優化。\n\n有效嘅 AEO 策略需要理解每個 AI 平台嘅運作方式——ChatGPT 依賴訓練數據同網頁瀏覽，Google AI Overview 基於搜尋排名同結構化數據，Perplexity 使用實時搜尋同引用機制。",
    relatedTerms: ["GEO", "SEO", "LLM", "Schema Markup"],
    metaTitle: "咩係 AEO（答案引擎優化）？完整解釋 - SurfIO",
    metaDescription: "AEO 答案引擎優化係令 AI 搜尋引擎推薦你品牌嘅策略。了解 AEO 點樣運作、同 SEO 有咩分別、點解對你嘅業務至關重要。",
  },
  {
    slug: "geo",
    term: "GEO (生成引擎優化)",
    definition: "Generative Engine Optimization (GEO) 係為所有生成式 AI 系統優化內容嘅廣義策略，涵蓋 AEO 同更多 AI 互動場景。",
    fullExplanation: "GEO 係一個比 AEO 更廣泛嘅概念。AEO 專注喺搜尋場景，而 GEO 涵蓋所有生成式 AI 系統——包括 AI 助手、AI 寫作工具、AI 研究工具、同 AI 購物助手等。\n\nGEO 嘅核心係令你嘅品牌同內容喺所有 AI 互動中被正確理解、引用同推薦。呢個包括優化你嘅線上存在感令 AI 訓練數據準確反映你嘅品牌、結構化你嘅內容令 AI 可以有效提取資訊、同建立跨平台嘅品牌一致性。",
    relatedTerms: ["AEO", "LLM", "AI 可讀性", "實體優化"],
    metaTitle: "咩係 GEO（生成引擎優化）？完整解釋 - SurfIO",
    metaDescription: "GEO 生成引擎優化係為所有 AI 系統優化內容嘅策略。了解 GEO 同 AEO 嘅分別，同點樣為 AI 時代做準備。",
  },
  {
    slug: "llm",
    term: "LLM (大型語言模型)",
    definition: "Large Language Model (LLM) 係驅動 ChatGPT、Claude、Gemini 等 AI 助手嘅核心技術，透過大量文本數據訓練出嘅人工智能模型。",
    fullExplanation: "LLM 係現代 AI 搜尋嘅基礎。佢哋透過學習數十億文本數據，理解語言、生成回應、同提供推薦。\n\n對 AEO 嚟講，理解 LLM 嘅運作方式至關重要：LLM 嘅知識來自訓練數據——即係互聯網上嘅公開內容。如果你嘅品牌喺高質素嘅網站被頻繁提及，LLM 就更可能推薦你。\n\n主要嘅 LLM 包括 OpenAI 嘅 GPT 系列（驅動 ChatGPT）、Google 嘅 Gemini、Anthropic 嘅 Claude、同 Meta 嘅 Llama。每個 LLM 有唔同嘅訓練數據同推薦邏輯，所以有效嘅 AEO 需要跨模型優化。",
    relatedTerms: ["AEO", "ChatGPT", "AI 訓練數據", "品牌提及"],
    metaTitle: "咩係 LLM（大型語言模型）？AEO 角度解釋 - SurfIO",
    metaDescription: "LLM 大型語言模型係 ChatGPT、Claude 等 AI 助手背後嘅技術。了解 LLM 點樣影響你嘅品牌能見度同 AEO 策略。",
  },
  {
    slug: "schema-markup",
    term: "Schema Markup (結構化數據標記)",
    definition: "Schema Markup 係加入網頁 HTML 中嘅結構化數據代碼，幫助搜尋引擎同 AI 系統理解你嘅內容嘅含義同關係。",
    fullExplanation: "Schema Markup 係 AEO 嘅技術基礎之一。佢用標準化嘅格式（JSON-LD）告訴搜尋引擎同 AI 系統你嘅頁面內容係咩——係一篇文章、一個產品、一個 FAQ、定係一個商業機構。\n\n對 AEO 特別重要嘅 Schema 類型包括：FAQPage（常見問題）、HowTo（操作指南）、Organization（機構資料）、Product（產品資料）、同 Article（文章）。正確嘅 Schema 標記可以提升你被 AI 引用嘅機率高達 40%。",
    relatedTerms: ["JSON-LD", "結構化數據", "富摘要", "知識圖譜"],
    metaTitle: "咩係 Schema Markup？AEO 必備嘅結構化數據 - SurfIO",
    metaDescription: "Schema Markup 結構化數據標記幫助 AI 理解你嘅網站內容。了解點樣用 Schema 提升你嘅 AI 搜尋能見度 40%。",
  },
  {
    slug: "e-e-a-t",
    term: "E-E-A-T (經驗、專業、權威、可信)",
    definition: "E-E-A-T 代表 Experience、Expertise、Authoritativeness、Trustworthiness，係 Google 同 AI 系統評估內容質素嘅核心框架。",
    fullExplanation: "E-E-A-T 喺 AEO 時代變得更加重要。AI 搜尋引擎需要確保推薦嘅品牌同內容係可信嘅。\n\nExperience（經驗）：展示你嘅實際行業經驗。Expertise（專業）：證明你嘅專業知識同技能。Authoritativeness（權威）：建立你喺行業中嘅領導地位。Trustworthiness（可信）：確保你嘅資訊準確可靠。\n\n加強 E-E-A-T 嘅方法包括：作者簡介同資歷展示、客戶案例同數據支持、行業獎項同認證、高質素嘅反向連結、同跨平台嘅品牌一致性。",
    relatedTerms: ["AEO", "內容質素", "品牌權威性", "YMYL"],
    metaTitle: "咩係 E-E-A-T？AI 搜尋時代嘅內容質素標準 - SurfIO",
    metaDescription: "E-E-A-T 係 AI 搜尋引擎評估內容質素嘅核心標準。了解點樣提升你嘅經驗、專業、權威、可信度來贏得 AI 推薦。",
  },
  {
    slug: "featured-snippets",
    term: "Featured Snippets (精選摘要)",
    definition: "精選摘要係 Google 搜尋結果頂部嘅特別框，直接回答用戶嘅問題。佢係 Google AI Overview 嘅前身，對 AEO 極其重要。",
    fullExplanation: "精選摘要係 SEO 同 AEO 嘅交匯點。佢出現喺搜尋結果嘅「零位」，攔截大量點擊。更重要嘅係，Google AI Overview 經常引用精選摘要嘅內容。\n\n精選摘要有三種主要格式：段落式（回答「咩係」「點解」等問題）、列表式（步驟、排名、清單）、同表格式（比較、數據）。\n\n優化精選摘要嘅策略包括：用 H2/H3 直接回答常見問題、提供簡潔嘅 40-60 字答案段落、使用有序/無序列表、同加入比較表格。",
    relatedTerms: ["Google AI Overview", "零位排名", "AEO", "People Also Ask"],
    metaTitle: "咩係 Featured Snippets？精選摘要 AEO 優化指南 - SurfIO",
    metaDescription: "精選摘要係 Google 搜尋嘅零位排名，對 AEO 至關重要。了解點樣優化你嘅內容獲得精選摘要位置。",
  },
  {
    slug: "knowledge-graph",
    term: "Knowledge Graph (知識圖譜)",
    definition: "知識圖譜係搜尋引擎同 AI 系統用嚟理解實體（品牌、人物、概念）之間關係嘅結構化資料庫。",
    fullExplanation: "知識圖譜係 AI 理解世界嘅方式。Google 嘅 Knowledge Graph 包含超過 5000 億事實，連結數十億實體。\n\n對 AEO 嚟講，你嘅品牌需要喺知識圖譜中有清晰嘅實體身份。呢個意味住搜尋引擎同 AI 系統知道你嘅公司係咩、做咩、服務邊個市場、同其他品牌有咩關係。\n\n建立知識圖譜存在感嘅方法包括：Wikipedia / Wikidata 條目、Google 商業 Profile、結構化數據標記、同跨平台嘅一致品牌資訊。",
    relatedTerms: ["實體 SEO", "Schema Markup", "品牌圖譜", "Wikidata"],
    metaTitle: "咩係 Knowledge Graph？品牌知識圖譜建設指南 - SurfIO",
    metaDescription: "知識圖譜係 AI 理解你品牌嘅關鍵。了解點樣建立你嘅品牌實體，令 AI 系統準確推薦你。",
  },
  {
    slug: "ai-citations",
    term: "AI Citations (AI 引用)",
    definition: "AI 引用係 AI 搜尋引擎（如 Perplexity、Google AI Overview）喺答案中引用你嘅品牌或內容作為來源嘅行為。",
    fullExplanation: "AI 引用係 AEO 嘅終極目標之一。當 AI 搜尋引擎引用你嘅品牌或內容，你獲得：直接嘅品牌曝光、來源連結帶嚟嘅流量、同 AI 系統嘅信任背書。\n\nAI 引用嘅機制因平台而異：Perplexity 始終顯示引用來源，Google AI Overview 有時附帶來源連結，ChatGPT 喺使用瀏覽模式時會引用來源。\n\n增加 AI 引用嘅策略包括：提供有原創數據嘅內容、建立行業權威性、確保內容格式 AI 友好、同保持內容嘅新鮮度。",
    relatedTerms: ["Perplexity", "品牌提及", "AEO", "引用追蹤"],
    metaTitle: "咩係 AI Citations？AI 引用追蹤同優化指南 - SurfIO",
    metaDescription: "AI 引用係 AI 搜尋引擎引用你品牌嘅行為。了解點樣增加你嘅 AI 引用頻率，獲得更多品牌曝光同流量。",
  },
  {
    slug: "brand-mentions",
    term: "Brand Mentions (品牌提及)",
    definition: "品牌提及係你嘅品牌名喺互聯網上被其他網站提到嘅次數。喺 AEO 時代，品牌提及直接影響 AI 推薦你嘅可能性。",
    fullExplanation: "品牌提及係 AEO 嘅核心信號之一。AI 系統（特別係 LLM）學習自互聯網上嘅大量文本。如果你嘅品牌被大量高質素網站提及，AI 就更傾向推薦你。\n\n品牌提及分為兩種：帶連結嘅提及（傳統反向連結）同無連結嘅提及。喺 AEO 中，無連結嘅品牌提及同樣重要，因為 LLM 從文本中學習，唔需要連結。\n\n增加品牌提及嘅策略：數碼 PR、客座發文、行業報告引用、播客訪談、同社交媒體互動。",
    relatedTerms: ["AEO", "反向連結", "數碼 PR", "LLM 訓練數據"],
    metaTitle: "咩係 Brand Mentions？品牌提及對 AEO 嘅重要性 - SurfIO",
    metaDescription: "品牌提及直接影響 AI 推薦你嘅可能性。了解點樣增加高質素品牌提及，提升你嘅 AI 搜尋能見度。",
  },
  {
    slug: "prompt-optimization",
    term: "Prompt Optimization (提示詞優化)",
    definition: "提示詞優化係分析用戶喺 AI 助手中使用嘅查詢模式，然後優化你嘅內容令佢匹配呢啲查詢嘅策略。",
    fullExplanation: "提示詞優化係 AEO 獨有嘅概念。傳統 SEO 研究搜尋關鍵字，而 AEO 需要研究用戶點樣同 AI 助手對話。\n\n用戶同 AI 助手嘅對話方式同搜尋引擎查詢有明顯分別：更加自然語言化、更加具體、更加場景化。例如用戶可能問「推薦一間喺中環嘅中小企會計師事務所，專做稅務規劃」而唔係搜尋「中環會計師」。\n\n提示詞優化嘅策略包括：研究常見嘅 AI 查詢模式、優化內容匹配自然語言查詢、同建立涵蓋唔同查詢意圖嘅內容矩陣。",
    relatedTerms: ["AEO", "對話式搜尋", "意圖匹配", "自然語言處理"],
    metaTitle: "咩係 Prompt Optimization？AI 時代嘅關鍵字研究 - SurfIO",
    metaDescription: "提示詞優化係 AEO 時代嘅關鍵字研究。了解點樣分析 AI 查詢模式，優化你嘅內容匹配用戶嘅 AI 對話。",
  },
];
