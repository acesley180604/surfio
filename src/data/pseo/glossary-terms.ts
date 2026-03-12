// ============================
// Cluster F: Expanded AEO/AI Search Glossary — 100 Terms
// Bilingual zh-HK (Cantonese) + English
// ============================

export interface GlossaryTermPage {
  slug: string;
  term: string;
  termEn: string;
  definition: string;
  definitionEn: string;
  category: string;
  relatedTerms: string[];
  examples: string[];
  examplesEn: string[];
  whyItMatters: string;
  whyItMattersEn: string;
  metaTitle: string;
  metaTitleEn: string;
  metaDescription: string;
  metaDescriptionEn: string;
  faqs: [string, string][];
  faqsEn: [string, string][];
}

type Category =
  | "AI Fundamentals"
  | "AEO Strategy"
  | "Technical SEO"
  | "Content Optimization"
  | "AI Engines"
  | "Measurement"
  | "Industry Terms";

const CATEGORY_ZH: Record<Category, string> = {
  "AI Fundamentals": "AI 基礎",
  "AEO Strategy": "AEO 策略",
  "Technical SEO": "技術 SEO",
  "Content Optimization": "內容優化",
  "AI Engines": "AI 引擎",
  "Measurement": "量度與分析",
  "Industry Terms": "行業術語",
};

export { CATEGORY_ZH };

function t(slug: string, term: string, termEn: string, def: string, defEn: string, cat: Category, related: string[], ex: string[], exEn: string[], why: string, whyEn: string, faqs: [string,string][], faqsEn: [string,string][]): GlossaryTermPage {
  return {
    slug, term, termEn, definition: def, definitionEn: defEn, category: cat,
    relatedTerms: related, examples: ex, examplesEn: exEn, whyItMatters: why, whyItMattersEn: whyEn,
    metaTitle: `咩係 ${term}？AEO 術語解釋 - SurfIO`,
    metaTitleEn: `What is ${termEn}? AEO Glossary - SurfIO`,
    metaDescription: `了解 ${term} 嘅定義、實際例子同對 AEO 策略嘅影響。SurfIO AI 搜尋優化術語表。`,
    metaDescriptionEn: `Learn the definition of ${termEn}, practical examples, and its impact on AEO strategy. SurfIO AI search optimization glossary.`,
    faqs, faqsEn,
  };
}

export function getGlossaryTermPages(): GlossaryTermPage[] {
  return [
    // ═══════════════════════════════════════
    // AI Fundamentals (15 terms)
    // ═══════════════════════════════════════
    t("large-language-model","大型語言模型 (LLM)","Large Language Model (LLM)",
      "大型語言模型係透過海量文本數據訓練嘅 AI 系統，能夠理解同生成自然語言。LLM 係 ChatGPT、Claude、Gemini 等 AI 助手嘅核心技術，直接決定你嘅品牌會唔會被 AI 推薦。",
      "A large language model is an AI system trained on massive text data that can understand and generate natural language. LLMs are the core technology behind AI assistants like ChatGPT, Claude, and Gemini, directly determining whether your brand gets recommended by AI.",
      "AI Fundamentals",
      ["neural-network","transformer-architecture","fine-tuning","tokenization"],
      ["GPT-4 係 OpenAI 嘅 LLM，驅動 ChatGPT 嘅對話能力","Claude 3 係 Anthropic 嘅 LLM，以準確性同安全性聞名","Gemini 係 Google 嘅多模態 LLM，整合搜尋同推理能力"],
      ["GPT-4 is OpenAI's LLM powering ChatGPT's conversational abilities","Claude 3 is Anthropic's LLM known for accuracy and safety","Gemini is Google's multimodal LLM integrating search and reasoning"],
      "LLM 嘅訓練數據決定佢「認識」邊啲品牌。如果你嘅品牌喺高質素網站被頻繁提及，LLM 就更可能推薦你。理解 LLM 嘅運作方式係制定有效 AEO 策略嘅基礎。",
      "An LLM's training data determines which brands it 'knows.' If your brand is frequently mentioned on high-quality websites, the LLM is more likely to recommend you. Understanding how LLMs work is fundamental to effective AEO strategy.",
      [["LLM 點樣決定推薦邊個品牌？","LLM 基於訓練數據中嘅品牌提及頻率、來源權威性同內容一致性嚟決定推薦。高質素、高頻率嘅品牌提及會增加被推薦嘅機率。"],["LLM 嘅知識幾時更新？","每個 LLM 有唔同嘅知識截止日期。ChatGPT 透過 Browse 功能可以獲取即時資訊，而基礎知識喺模型訓練時更新。"],["中小企點樣令 LLM 認識自己嘅品牌？","透過持續嘅數碼 PR、高質素內容發佈、同跨平台品牌建設，令你嘅品牌出現喺 LLM 嘅訓練數據入面。"]],
      [["How do LLMs decide which brands to recommend?","LLMs base recommendations on brand mention frequency, source authority, and content consistency in training data. High-quality, frequent brand mentions increase recommendation probability."],["When is an LLM's knowledge updated?","Each LLM has different knowledge cutoff dates. ChatGPT can access real-time info via Browse, while base knowledge updates during model training."],["How can SMEs get LLMs to recognize their brand?","Through consistent digital PR, high-quality content publishing, and cross-platform brand building to appear in LLM training data."]]
    ),
    t("neural-network","神經網絡","Neural Network",
      "神經網絡係模仿人腦結構嘅計算系統，由多層互聯嘅節點組成。佢係所有現代 AI 技術嘅基礎架構，包括驅動 AI 搜尋引擎嘅深度學習模型。",
      "A neural network is a computing system inspired by the human brain, consisting of multiple layers of interconnected nodes. It is the foundational architecture of all modern AI technology, including the deep learning models powering AI search engines.",
      "AI Fundamentals",
      ["large-language-model","transformer-architecture","embedding","inference"],
      ["深度神經網絡用喺 Google 嘅搜尋排名演算法 RankBrain 入面","Transformer 架構嘅神經網絡驅動所有主流 AI 搜尋引擎","卷積神經網絡 (CNN) 用於 AI 嘅圖片理解同視覺搜尋"],
      ["Deep neural networks are used in Google's RankBrain search ranking algorithm","Transformer-based neural networks power all major AI search engines","Convolutional Neural Networks (CNNs) enable AI image understanding and visual search"],
      "理解神經網絡幫你明白 AI 搜尋引擎點樣「思考」。AI 唔係簡單嘅關鍵字匹配——佢透過神經網絡理解語義同意圖，所以你嘅內容需要語義豐富而唔只係關鍵字堆砌。",
      "Understanding neural networks helps you grasp how AI search engines 'think.' AI isn't simple keyword matching—it understands semantics and intent through neural networks, so your content needs semantic richness rather than keyword stuffing.",
      [["神經網絡同傳統搜尋引擎有咩分別？","傳統搜尋引擎用規則同統計方法匹配關鍵字，而神經網絡可以理解語義、意圖同上下文關係，提供更精準嘅搜尋結果。"],["AI 搜尋引擎用咩類型嘅神經網絡？","主要用 Transformer 架構嘅神經網絡，呢種架構特別擅長處理自然語言同長距離依賴關係。"],["理解神經網絡對 AEO 有咩實際幫助？","理解 AI 嘅「思考方式」幫你寫出更容易被 AI 理解同引用嘅內容，例如使用清晰嘅語義結構同邏輯連貫嘅論述。"]],
      [["How do neural networks differ from traditional search engines?","Traditional search engines use rules and statistical methods for keyword matching, while neural networks understand semantics, intent, and contextual relationships for more precise results."],["What type of neural networks do AI search engines use?","Primarily Transformer-based neural networks, which excel at processing natural language and long-range dependencies."],["How does understanding neural networks help with AEO?","Understanding how AI 'thinks' helps you create content that's easier for AI to understand and cite, such as using clear semantic structure and logically coherent arguments."]]
    ),
    t("natural-language-processing","自然語言處理 (NLP)","Natural Language Processing (NLP)",
      "自然語言處理係令電腦理解、解讀同生成人類語言嘅 AI 技術分支。NLP 技術令 AI 搜尋引擎能夠理解用戶嘅自然語言查詢，並從你嘅內容中提取有用嘅答案。",
      "Natural language processing is the AI discipline that enables computers to understand, interpret, and generate human language. NLP technology allows AI search engines to understand natural language queries and extract useful answers from your content.",
      "AI Fundamentals",
      ["large-language-model","tokenization","embedding","semantic-seo"],
      ["Google BERT 用 NLP 理解搜尋查詢嘅語境同意圖","ChatGPT 用 NLP 解讀用戶嘅對話式問題","Perplexity 用 NLP 從網頁提取同摘要相關資訊"],
      ["Google BERT uses NLP to understand search query context and intent","ChatGPT uses NLP to interpret conversational user questions","Perplexity uses NLP to extract and summarize relevant information from web pages"],
      "NLP 技術令 AI 搜尋引擎可以理解你內容嘅真正含義，而唔只係匹配關鍵字。為 NLP 優化你嘅內容——用自然語言寫作、回答具體問題、提供結構化答案——係 AEO 成功嘅關鍵。",
      "NLP technology enables AI search engines to understand the true meaning of your content, not just match keywords. Optimizing for NLP—writing in natural language, answering specific questions, providing structured answers—is key to AEO success.",
      [["NLP 點樣影響我嘅內容策略？","你嘅內容應該用自然、對話式嘅語言寫，而唔係堆砌關鍵字。AI 搜尋引擎用 NLP 理解內容嘅語義，所以語義豐富、結構清晰嘅內容更容易被理解同引用。"],["NLP 同語義搜尋有咩關係？","NLP 係實現語義搜尋嘅核心技術。語義搜尋透過 NLP 理解查詢嘅意圖，而唔只係字面意思，令搜尋結果更相關。"],["點樣測試我嘅內容係咪 NLP 友好？","用 AI 工具分析你嘅內容可讀性、語義結構同主題覆蓋度。確保每個段落有清晰嘅主題句，用問答格式組織關鍵資訊。"]],
      [["How does NLP affect my content strategy?","Content should be written in natural, conversational language rather than keyword-stuffed. AI search engines use NLP to understand content semantics, so semantically rich, well-structured content is easier to understand and cite."],["What's the relationship between NLP and semantic search?","NLP is the core technology enabling semantic search. Semantic search uses NLP to understand query intent, not just literal meaning, making results more relevant."],["How can I test if my content is NLP-friendly?","Use AI tools to analyze content readability, semantic structure, and topic coverage. Ensure each paragraph has a clear topic sentence and organize key information in Q&A format."]]
    ),
    t("transformer-architecture","Transformer 架構","Transformer Architecture",
      "Transformer 係 2017 年由 Google 提出嘅神經網絡架構，透過「自注意力機制」理解文本中詞語之間嘅關係。佢係所有現代 LLM 嘅基礎，包括 GPT、BERT、Gemini 等。",
      "Transformer is a neural network architecture proposed by Google in 2017 that uses 'self-attention mechanisms' to understand relationships between words in text. It is the foundation of all modern LLMs including GPT, BERT, and Gemini.",
      "AI Fundamentals",["large-language-model","neural-network","tokenization","context-window"],
      ["GPT 全稱 Generative Pre-trained Transformer，直接以呢個架構命名","BERT (Bidirectional Encoder Representations from Transformers) 用喺 Google 搜尋","Google 嘅 T5 模型用 Transformer 做文本摘要同翻譯"],
      ["GPT stands for Generative Pre-trained Transformer, named after this architecture","BERT (Bidirectional Encoder Representations from Transformers) is used in Google Search","Google's T5 model uses Transformers for text summarization and translation"],
      "Transformer 嘅自注意力機制令 AI 可以理解長距離嘅語義關係。呢個意味住你嘅內容唔需要喺每個段落重複關鍵字——AI 可以理解整篇文章嘅語境。優化策略應該專注喺語義連貫性同主題深度。",
      "Transformer's self-attention mechanism enables AI to understand long-range semantic relationships. This means your content doesn't need to repeat keywords in every paragraph—AI can understand the context of the entire article. Optimization should focus on semantic coherence and topic depth.",
      [["Transformer 同之前嘅 AI 模型有咩唔同？","Transformer 可以同時處理整個文本序列，而之前嘅模型需要逐字順序處理。呢個令佢更快、更準確地理解語境。"],["Transformer 對 AEO 有咩具體影響？","Transformer 令 AI 可以理解你內容嘅整體語境，所以你應該寫全面、深入嘅內容，而唔只係針對單一關鍵字嘅短文。"],["點解所有主流 AI 都用 Transformer？","Transformer 嘅平行處理能力同自注意力機制令佢喺理解語言方面遠超其他架構，成為事實上嘅行業標準。"]],
      [["How is Transformer different from previous AI models?","Transformer processes entire text sequences simultaneously, while previous models processed word by word. This makes it faster and more accurate at understanding context."],["What specific impact does Transformer have on AEO?","Transformer enables AI to understand your content's overall context, so you should write comprehensive, in-depth content rather than short pieces targeting single keywords."],["Why do all major AI systems use Transformer?","Transformer's parallel processing and self-attention mechanism make it far superior to other architectures for language understanding, making it the de facto industry standard."]]
    ),
    t("tokenization","分詞 / Token 化","Tokenization",
      "分詞係將文本拆分成更細嘅單位（tokens）嘅過程，令 AI 模型可以處理同理解文本。每個 token 可以係一個字、一個詞、或者一個子詞。呢個過程直接影響 AI 點樣「閱讀」你嘅內容。",
      "Tokenization is the process of breaking text into smaller units (tokens) so AI models can process and understand it. Each token can be a character, word, or subword. This process directly affects how AI 'reads' your content.",
      "AI Fundamentals",["large-language-model","context-window","natural-language-processing","embedding"],
      ["英文 'optimization' 可能被拆分為 'optim' + 'ization' 兩個 tokens","中文每個字通常係一個獨立嘅 token，所以中文內容嘅 token 數通常較多","GPT-4 嘅 context window 係 128K tokens，約等於 96,000 個英文字"],
      ["English 'optimization' might be split into 'optim' + 'ization' as two tokens","Each Chinese character is typically an independent token, so Chinese content usually has more tokens","GPT-4's context window is 128K tokens, roughly equivalent to 96,000 English words"],
      "理解 tokenization 幫你優化內容長度同結構。AI 嘅 context window 有限，所以你嘅核心資訊應該放喺內容嘅前段。中文內容嘅 token 數較多，意味住 AI 處理中文時嘅有效內容長度較短。",
      "Understanding tokenization helps you optimize content length and structure. AI has limited context windows, so core information should be placed early in content. Chinese content has more tokens per character, meaning AI processes shorter effective content lengths in Chinese.",
      [["Tokenization 點樣影響我嘅中文內容？","中文每個字佔一個 token，所以同樣嘅意思中文比英文用更多 tokens。建議中文內容更加簡潔，確保核心資訊喺前 500 字內出現。"],["咩係 token 限制？","每個 AI 模型有最大 token 數限制。超出限制嘅內容會被截斷。ChatGPT-4 支持 128K tokens，但大部分查詢嘅回答只用幾千個 tokens。"],["點樣確保我嘅內容唔會被 token 限制截斷？","將最重要嘅資訊放喺內容開頭，用清晰嘅標題結構令 AI 可以快速搵到相關段落，而唔需要處理整篇文章。"]],
      [["How does tokenization affect my Chinese content?","Each Chinese character takes one token, so the same meaning uses more tokens in Chinese than English. Keep Chinese content concise with core info in the first 500 characters."],["What are token limits?","Each AI model has a maximum token limit. Content exceeding limits gets truncated. ChatGPT-4 supports 128K tokens, but most query responses use only a few thousand tokens."],["How do I ensure my content isn't truncated by token limits?","Place the most important information at the beginning, use clear heading structure so AI can quickly find relevant sections without processing the entire article."]]
    ),
    t("embedding","嵌入向量","Embedding",
      "嵌入向量係將文字、圖片或其他數據轉換成數字向量嘅技術，令 AI 可以計算內容之間嘅語義相似度。嵌入向量係 AI 搜尋引擎理解你內容含義嘅核心方法。",
      "Embedding is the technique of converting text, images, or other data into numerical vectors, enabling AI to calculate semantic similarity between content. Embeddings are the core method AI search engines use to understand your content's meaning.",
      "AI Fundamentals",["semantic-seo","natural-language-processing","retrieval-augmented-generation","tokenization"],
      ["Google 用嵌入向量匹配搜尋查詢同網頁內容嘅語義","Perplexity 用嵌入向量搵出同用戶問題最相關嘅來源","向量數據庫如 Pinecone 儲存嵌入向量，用於 RAG 系統"],
      ["Google uses embeddings to match search query semantics with web page content","Perplexity uses embeddings to find sources most relevant to user questions","Vector databases like Pinecone store embeddings for RAG systems"],
      "嵌入向量令 AI 可以理解「意思相近」嘅內容，即使用詞唔同。呢個意味住你唔需要完全匹配用戶嘅查詢用詞——只要你嘅內容語義上涵蓋相關主題，AI 就可以搵到並引用你。",
      "Embeddings enable AI to understand 'semantically similar' content even with different wording. This means you don't need to exactly match user query terms—as long as your content semantically covers relevant topics, AI can find and cite you.",
      [["嵌入向量同關鍵字匹配有咩分別？","關鍵字匹配只搵完全或部分匹配嘅字詞，而嵌入向量理解語義相似度，所以「最好嘅餐廳」同「推薦食肆」會被視為相似查詢。"],["點樣為嵌入向量優化內容？","使用豐富嘅同義詞同相關詞彙，全面覆蓋主題嘅各個方面，建立語義豐富嘅內容而唔只係重複同一個關鍵字。"],["嵌入向量技術會點樣發展？","多模態嵌入（結合文字、圖片、影片）正在快速發展，未來 AI 將能更全面地理解你嘅品牌內容。"]],
      [["How are embeddings different from keyword matching?","Keyword matching only finds exact or partial word matches, while embeddings understand semantic similarity, so 'best restaurants' and 'recommended eateries' are treated as similar queries."],["How do I optimize content for embeddings?","Use rich synonyms and related vocabulary, comprehensively cover all aspects of a topic, and build semantically rich content rather than just repeating the same keyword."],["How will embedding technology evolve?","Multimodal embeddings (combining text, images, video) are rapidly developing; future AI will understand your brand content more comprehensively."]]
    ),
    t("fine-tuning","微調","Fine-tuning",
      "微調係喺預訓練嘅 LLM 基礎上，用特定領域嘅數據進一步訓練模型嘅過程。微調令通用 AI 模型可以專精於特定任務或行業，例如醫療、法律或金融領域嘅查詢。",
      "Fine-tuning is the process of further training a pre-trained LLM with domain-specific data. It enables general AI models to specialize in specific tasks or industries, such as medical, legal, or financial queries.",
      "AI Fundamentals",["large-language-model","reinforcement-learning-from-human-feedback","few-shot-learning","retrieval-augmented-generation"],
      ["OpenAI 允許企業用自己嘅數據微調 GPT 模型","醫療 AI 如 Med-PaLM 係 Google 用醫學文獻微調嘅模型","法律 AI 工具用法律文件微調，提升法律查詢嘅準確性"],
      ["OpenAI allows businesses to fine-tune GPT models with their own data","Medical AI like Med-PaLM is a Google model fine-tuned on medical literature","Legal AI tools fine-tune on legal documents to improve legal query accuracy"],
      "微調嘅趨勢意味住 AI 搜尋引擎會越來越了解特定行業嘅細微差別。為你嘅行業建立深度、專業嘅內容，可以增加被特定領域 AI 引用嘅機會。",
      "The fine-tuning trend means AI search engines will increasingly understand industry-specific nuances. Building deep, specialized content for your industry increases chances of being cited by domain-specific AI.",
      [["微調同預訓練有咩分別？","預訓練用大量通用數據建立基礎語言能力，微調用小量專業數據調整模型令佢喺特定領域表現更好。"],["企業可以微調 AI 嚟推薦自己嗎？","企業可以喺自己嘅內部 AI 上微調，但公開嘅 AI 搜尋引擎嘅微調由平台控制。你能做嘅係確保你嘅品牌喺公開網絡上有充足嘅高質素存在。"],["微調對 AEO 策略有咩影響？","隨住 AI 針對唔同行業微調，行業專業內容嘅重要性會增加。建議建立你嘅行業嘅深度知識庫。"]],
      [["What's the difference between fine-tuning and pre-training?","Pre-training uses massive general data to build foundational language abilities; fine-tuning uses smaller specialized data to adjust the model for better performance in specific domains."],["Can businesses fine-tune AI to recommend themselves?","Businesses can fine-tune their own internal AI, but public AI search engine fine-tuning is controlled by platforms. What you can do is ensure your brand has sufficient high-quality presence on the public web."],["How does fine-tuning affect AEO strategy?","As AI gets fine-tuned for different industries, industry-specific content becomes more important. Build a deep knowledge base for your industry."]]
    ),
    t("retrieval-augmented-generation","檢索增強生成 (RAG)","Retrieval-Augmented Generation (RAG)",
      "RAG 係一種 AI 技術，結合即時資訊檢索同語言生成能力。AI 先從外部數據源搜尋相關資訊，再用呢啲資訊生成答案。Perplexity 嘅整個系統就係建基於 RAG 技術。",
      "RAG is an AI technique combining real-time information retrieval with language generation. AI first searches external data sources for relevant information, then uses it to generate answers. Perplexity's entire system is built on RAG technology.",
      "AI Fundamentals",["large-language-model","embedding","perplexity-citation","ai-citation"],
      ["Perplexity 每次回答都用 RAG 搜尋即時網絡資料","ChatGPT 嘅 Browse 模式用 RAG 獲取最新資訊","企業內部 AI 用 RAG 連接公司知識庫提供準確答案"],
      ["Perplexity uses RAG to search real-time web data for every response","ChatGPT's Browse mode uses RAG to fetch latest information","Enterprise AI uses RAG to connect company knowledge bases for accurate answers"],
      "RAG 系統直接從你嘅網站同網絡上搜尋資訊嚟生成答案。呢個意味住你嘅內容嘅索引狀態、結構化程度同權威性直接影響 AI 會唔會引用你。保持內容更新同結構化係被 RAG 系統引用嘅關鍵。",
      "RAG systems search your website and the web directly for information to generate answers. This means your content's indexing status, structure, and authority directly affect whether AI cites you. Keeping content updated and structured is key to being cited by RAG systems.",
      [["RAG 系統點樣決定引用邊個來源？","RAG 用嵌入向量搵出同查詢最相關嘅來源，再根據來源嘅權威性、新鮮度同內容質素排序。"],["點樣令我嘅內容更容易被 RAG 系統搵到？","確保你嘅網站被搜尋引擎正確索引、內容結構化良好、同定期更新。使用 Schema Markup 同清晰嘅 HTML 結構。"],["RAG 同傳統搜尋有咩分別？","傳統搜尋返回連結列表，RAG 直接提取同綜合多個來源嘅資訊生成完整答案。你嘅內容需要包含可被直接引用嘅事實性陳述。"]],
      [["How does a RAG system decide which sources to cite?","RAG uses embeddings to find sources most relevant to the query, then ranks by source authority, freshness, and content quality."],["How can I make my content easier for RAG systems to find?","Ensure your website is properly indexed by search engines, content is well-structured, and regularly updated. Use Schema Markup and clear HTML structure."],["How does RAG differ from traditional search?","Traditional search returns link lists; RAG directly extracts and synthesizes information from multiple sources to generate complete answers. Your content needs factual statements that can be directly cited."]]
    ),
    t("hallucination","AI 幻覺","Hallucination",
      "AI 幻覺係 AI 模型生成睇落合理但實際上不正確或虛構嘅資訊嘅現象。呢個係所有 LLM 嘅已知問題，對品牌嚟講可能導致錯誤嘅 AI 推薦或描述。",
      "AI hallucination is the phenomenon where AI models generate information that appears plausible but is actually incorrect or fabricated. This is a known issue with all LLMs and can lead to incorrect AI recommendations or descriptions for brands.",
      "AI Fundamentals",["large-language-model","retrieval-augmented-generation","e-e-a-t","ai-citation"],
      ["ChatGPT 可能虛構不存在嘅產品功能或公司歷史","AI 搜尋可能錯誤描述你嘅服務範圍或價格","Perplexity 用 RAG 減少幻覺，但仍然可能出現引用錯誤"],
      ["ChatGPT might fabricate non-existent product features or company history","AI search might incorrectly describe your service scope or pricing","Perplexity uses RAG to reduce hallucination but can still have citation errors"],
      "AI 幻覺係你需要主動管理嘅風險。透過提供清晰、結構化嘅品牌資訊（Schema Markup、官方網站、知識圖譜），你可以減少 AI 錯誤描述你品牌嘅機會。定期監測 AI 搜尋結果係發現同糾正幻覺嘅關鍵。",
      "AI hallucination is a risk you need to actively manage. By providing clear, structured brand information (Schema Markup, official website, knowledge graph), you can reduce chances of AI misdescribing your brand. Regular monitoring of AI search results is key to detecting and correcting hallucinations.",
      [["點樣防止 AI 幻覺影響我嘅品牌？","建立完整嘅 Schema Markup、維護 Google Business Profile、確保網上品牌資訊一致。呢啲結構化資訊幫 AI 準確理解你嘅品牌。"],["發現 AI 幻覺點算？","記錄錯誤資訊、向相關 AI 平台報告、同時加強你嘅網上品牌資訊嘅準確性同覆蓋度，令 AI 有更多正確嘅來源參考。"],["邊啲行業最受 AI 幻覺影響？","醫療、法律、金融等 YMYL（Your Money Your Life）行業最受影響，因為錯誤資訊可能造成實際傷害。"]],
      [["How can I prevent AI hallucination from affecting my brand?","Build complete Schema Markup, maintain Google Business Profile, ensure consistent online brand information. This structured data helps AI accurately understand your brand."],["What should I do if I discover AI hallucination?","Document the incorrect information, report to relevant AI platforms, and strengthen the accuracy and coverage of your online brand information so AI has more correct sources."],["Which industries are most affected by AI hallucination?","YMYL (Your Money Your Life) industries like healthcare, legal, and finance are most affected, as incorrect information can cause real harm."]]
    ),
    t("prompt-engineering","提示工程","Prompt Engineering",
      "提示工程係設計同優化輸入 AI 嘅指令（prompt）嘅技術，令 AI 產生更準確、更有用嘅輸出。對 AEO 嚟講，理解用戶點樣寫 prompt 幫你優化內容匹配 AI 查詢。",
      "Prompt engineering is the technique of designing and optimizing instructions (prompts) input to AI for more accurate, useful outputs. For AEO, understanding how users write prompts helps you optimize content to match AI queries.",
      "AI Fundamentals",["natural-language-processing","conversational-search","search-intent","few-shot-learning"],
      ["用戶可能問「推薦香港最好嘅 AEO 公司」而唔係搜「AEO 公司」","ChatGPT 嘅 Custom Instructions 令用戶可以設定持續嘅偏好","企業用 prompt engineering 建立內部 AI 知識助手"],
      ["Users might ask 'recommend the best AEO company in Hong Kong' instead of searching 'AEO company'","ChatGPT's Custom Instructions let users set persistent preferences","Businesses use prompt engineering to build internal AI knowledge assistants"],
      "了解用戶嘅 prompt 模式幫你預測 AI 查詢嘅形式。用戶傾向用完整嘅自然語言句子查詢 AI，而唔係短關鍵字。你嘅內容應該直接回答呢啲自然語言問題。",
      "Understanding user prompt patterns helps you predict AI query formats. Users tend to query AI with complete natural language sentences rather than short keywords. Your content should directly answer these natural language questions.",
      [["用戶嘅 AI 查詢同 Google 搜尋有咩分別？","AI 查詢通常更長、更具體、更場景化。例如「我係一間中環嘅小型會計師行，想增加客源，應該用咩營銷策略？」而唔係「中環會計師營銷」。"],["點樣研究用戶嘅 AI 查詢模式？","分析你嘅目標客群可能問 AI 嘅問題類型，參考 People Also Ask、Quora 同 Reddit 嘅問題格式，建立涵蓋唔同查詢意圖嘅內容。"],["Prompt engineering 對未來嘅 AEO 有咩影響？","隨住用戶更熟練地使用 AI，查詢會更加精確同複雜。你嘅內容需要涵蓋更多長尾、場景化嘅問題。"]],
      [["How do AI queries differ from Google searches?","AI queries are typically longer, more specific, and more contextual. For example: 'I'm a small accounting firm in Central wanting to increase clients, what marketing strategy should I use?' versus 'Central accountant marketing'."],["How can I research user AI query patterns?","Analyze question types your target audience might ask AI, reference People Also Ask, Quora, and Reddit question formats, and build content covering different query intents."],["How will prompt engineering affect future AEO?","As users become more skilled with AI, queries will become more precise and complex. Your content needs to cover more long-tail, contextual questions."]]
    ),
    t("context-window","上下文窗口","Context Window",
      "上下文窗口係 AI 模型一次可以處理嘅最大文本長度（以 tokens 計算）。佢決定 AI 可以「記住」幾多對話內容同參考幾多來源資訊嚟回答問題。",
      "The context window is the maximum text length (in tokens) an AI model can process at once. It determines how much conversation content AI can 'remember' and how many source materials it can reference when answering questions.",
      "AI Fundamentals",["tokenization","large-language-model","retrieval-augmented-generation","transformer-architecture"],
      ["GPT-4 Turbo 嘅 context window 係 128K tokens","Claude 3 支持最多 200K tokens 嘅上下文","Google Gemini 1.5 可以處理最多 1M tokens"],
      ["GPT-4 Turbo has a 128K token context window","Claude 3 supports up to 200K tokens of context","Google Gemini 1.5 can process up to 1M tokens"],
      "上下文窗口嘅大小影響 AI 可以同時參考幾多來源。較大嘅 context window 意味住 AI 可以比較更多來源，所以你嘅內容需要喺質素同深度上脫穎而出。將核心資訊放喺內容前段確保即使被截斷都能被引用。",
      "Context window size affects how many sources AI can reference simultaneously. Larger context windows mean AI can compare more sources, so your content needs to stand out in quality and depth. Place core information early to ensure citation even if truncated.",
      [["上下文窗口對我嘅內容有咩影響？","雖然 context window 越嚟越大，但 AI 仍然偏好結構清晰、重點突出嘅內容。唔好因為 AI 可以處理長文就寫冗長嘅內容。"],["唔同 AI 嘅 context window 差異大嗎？","差異好大。Claude 3 支持 200K tokens 而較舊嘅模型可能只有 4K tokens。呢個影響 AI 可以參考嘅資料量同回答嘅全面性。"],["Context window 擴大對 AEO 有咩意義？","AI 可以同時參考更多來源，令競爭更激烈。你嘅內容需要喺質素、權威性同獨特性上脫穎而出，先會被引用。"]],
      [["How does the context window affect my content?","While context windows keep growing, AI still prefers clearly structured, focused content. Don't write lengthy content just because AI can process long texts."],["Do different AI models have significantly different context windows?","Very different. Claude 3 supports 200K tokens while older models might only have 4K. This affects how much reference material AI can use and how comprehensive its answers are."],["What does expanding context windows mean for AEO?","AI can reference more sources simultaneously, making competition fiercer. Your content needs to stand out in quality, authority, and uniqueness to be cited."]]
    ),
    t("inference","推理 / 推論","Inference",
      "推理係 AI 模型用訓練所學嘅知識處理新輸入並產生輸出嘅過程。當用戶查詢 AI 搜尋引擎時，每次回答都係一次推理。推理嘅速度同質素直接影響用戶體驗。",
      "Inference is the process where an AI model uses knowledge learned during training to process new inputs and produce outputs. Each response when users query AI search engines is an inference. Inference speed and quality directly affect user experience.",
      "AI Fundamentals",["large-language-model","temperature","context-window","transformer-architecture"],
      ["每次你問 ChatGPT 一個問題，佢就執行一次推理","Edge AI 喺裝置本地做推理，唔需要連接雲端","企業用 GPU 集群加速大規模推理服務"],
      ["Every time you ask ChatGPT a question, it performs one inference","Edge AI performs inference locally on devices without cloud connection","Enterprises use GPU clusters to accelerate large-scale inference services"],
      "理解推理過程幫你明白 AI 回答嘅局限性。每次推理都有一定嘅隨機性（受 temperature 參數影響），所以同一個問題可能得到唔同嘅答案。呢個係你需要持續監測 AI 搜尋結果嘅原因。",
      "Understanding inference helps you grasp AI response limitations. Each inference has some randomness (affected by temperature), so the same question might get different answers. This is why you need to continuously monitor AI search results.",
      [["點解同一個問題 AI 會俾唔同嘅答案？","推理過程有隨機性（由 temperature 參數控制），加上 AI 可能獲取唔同嘅即時資訊，所以每次回答可能略有不同。"],["推理速度對 AEO 有咩影響？","推理速度影響 AI 搜尋體驗。較快嘅推理令 AI 可以處理更多來源，間接增加你嘅內容被考慮嘅機會。"],["邊啲因素影響推理嘅質素？","模型大小、訓練數據質素、prompt 嘅清晰度、同 temperature 設定都會影響推理結果嘅質素。"]],
      [["Why does AI give different answers to the same question?","Inference has randomness (controlled by temperature parameter), plus AI may access different real-time information, so each response may vary slightly."],["How does inference speed affect AEO?","Inference speed affects AI search experience. Faster inference allows AI to process more sources, indirectly increasing chances your content is considered."],["What factors affect inference quality?","Model size, training data quality, prompt clarity, and temperature settings all affect the quality of inference results."]]
    ),
    t("temperature","Temperature 參數","Temperature",
      "Temperature 係控制 AI 輸出隨機性嘅參數。較低嘅 temperature（如 0.1）令輸出更確定同一致，較高嘅 temperature（如 0.9）令輸出更多樣同創意。AI 搜尋引擎通常用較低嘅 temperature 確保答案嘅一致性。",
      "Temperature is a parameter controlling AI output randomness. Lower temperature (e.g., 0.1) makes outputs more deterministic and consistent; higher temperature (e.g., 0.9) makes outputs more diverse and creative. AI search engines typically use lower temperature for answer consistency.",
      "AI Fundamentals",["inference","large-language-model","hallucination","prompt-engineering"],
      ["Perplexity 用低 temperature 確保搜尋答案嘅準確性","ChatGPT 嘅創意寫作模式用較高嘅 temperature","Google AI Overview 用低 temperature 減少事實性錯誤"],
      ["Perplexity uses low temperature to ensure search answer accuracy","ChatGPT's creative writing mode uses higher temperature","Google AI Overview uses low temperature to reduce factual errors"],
      "低 temperature 嘅 AI 搜尋更傾向引用權威、一致嘅來源。呢個意味住你嘅品牌資訊需要跨平台一致，同時內容需要以事實為基礎。一致性同權威性係喺低 temperature 環境下被引用嘅關鍵。",
      "Low temperature AI search tends to cite authoritative, consistent sources. This means your brand information needs cross-platform consistency, and content must be fact-based. Consistency and authority are key to being cited in low-temperature environments.",
      [["Temperature 對我嘅品牌被引用有咩影響？","低 temperature 設定下，AI 更傾向引用佢最「確信」嘅來源。建立你嘅品牌作為可靠、一致嘅資訊來源至關重要。"],["唔同 AI 平台嘅 temperature 設定唔同嗎？","係嘅。搜尋類 AI 通常用低 temperature（重視準確性），而創意類 AI 用高 temperature（重視多樣性）。"],["我可以控制 AI 用咩 temperature 回答關於我品牌嘅問題嗎？","你唔可以直接控制 AI 嘅 temperature 設定，但你可以透過建立強大嘅品牌信號同一致嘅資訊，令 AI 更「確信」地推薦你。"]],
      [["How does temperature affect my brand being cited?","With low temperature settings, AI tends to cite sources it's most 'confident' about. Establishing your brand as a reliable, consistent information source is crucial."],["Do different AI platforms have different temperature settings?","Yes. Search-oriented AI typically uses low temperature (prioritizing accuracy) while creative AI uses high temperature (prioritizing diversity)."],["Can I control what temperature AI uses when answering about my brand?","You can't directly control AI's temperature settings, but you can build strong brand signals and consistent information to make AI more 'confident' in recommending you."]]
    ),
    t("few-shot-learning","少樣本學習","Few-Shot Learning",
      "少樣本學習係 AI 模型從極少量嘅示例中學習完成新任務嘅能力。喺 AEO 語境中，呢個概念解釋點解 AI 只需要少量嘅高質素品牌提及就可以開始推薦你。",
      "Few-shot learning is AI's ability to learn to complete new tasks from very few examples. In AEO context, this explains why AI needs only a few high-quality brand mentions to start recommending you.",
      "AI Fundamentals",["large-language-model","fine-tuning","prompt-engineering","reinforcement-learning-from-human-feedback"],
      ["AI 只需要 3-5 個高權威性嘅品牌提及就可能開始推薦你","ChatGPT 嘅 in-context learning 令佢可以從用戶提供嘅少量例子中學習","GPT-4 可以從 2-3 個範例中理解新嘅格式要求"],
      ["AI may start recommending you with just 3-5 high-authority brand mentions","ChatGPT's in-context learning enables it to learn from few user-provided examples","GPT-4 can understand new format requirements from 2-3 examples"],
      "少樣本學習意味住你唔需要千萬個品牌提及先會被 AI 推薦。關鍵係提及嘅質素——幾個來自高權威性網站嘅提及可能比大量低質素提及更有效。聚焦高質素嘅品牌建設策略。",
      "Few-shot learning means you don't need millions of brand mentions to be recommended by AI. Quality of mentions is key—a few mentions from high-authority sites may be more effective than many low-quality ones. Focus on high-quality brand building strategies.",
      [["幾多品牌提及先夠令 AI 推薦我？","冇確切數字，但研究顯示來自高權威性來源嘅 5-10 個一致品牌提及可以顯著增加被推薦嘅機會。"],["少樣本學習對中小企嘅 AEO 有咩啟示？","好消息係你唔需要巨大嘅預算。專注獲取少量但高質素嘅品牌提及（如行業媒體報導、專家訪談）可能比大規模低質素嘅營銷更有效。"],["質素同數量邊個更重要？","質素遠比數量重要。一篇 Forbes 嘅品牌提及嘅價值遠超 100 篇低質素博客嘅提及。"]],
      [["How many brand mentions does AI need to recommend me?","No exact number, but research shows 5-10 consistent brand mentions from high-authority sources can significantly increase recommendation chances."],["What does few-shot learning mean for SME AEO?","Good news: you don't need a huge budget. Focusing on few but high-quality brand mentions (e.g., industry media coverage, expert interviews) may be more effective than mass low-quality marketing."],["Is quality or quantity more important?","Quality is far more important than quantity. One Forbes brand mention is worth more than 100 low-quality blog mentions."]]
    ),
    t("reinforcement-learning-from-human-feedback","人類反饋強化學習 (RLHF)","Reinforcement Learning from Human Feedback (RLHF)",
      "RLHF 係訓練 AI 模型嘅方法，透過人類評估員對 AI 輸出嘅好壞評分嚟改善模型表現。呢個過程令 ChatGPT 等 AI 嘅回答更加有用、安全同準確。",
      "RLHF is a method for training AI models by having human evaluators rate AI outputs to improve model performance. This process makes AI responses from ChatGPT and others more useful, safe, and accurate.",
      "AI Fundamentals",["large-language-model","fine-tuning","hallucination","few-shot-learning"],
      ["OpenAI 用 RLHF 訓練 ChatGPT 避免有害同偏見嘅回答","Anthropic 嘅 Constitutional AI 係 RLHF 嘅進階版本","Google 用人類評估員持續改善 Gemini 嘅推薦質素"],
      ["OpenAI uses RLHF to train ChatGPT to avoid harmful and biased responses","Anthropic's Constitutional AI is an advanced version of RLHF","Google uses human evaluators to continuously improve Gemini's recommendation quality"],
      "RLHF 令 AI 傾向推薦被認為「有用同可信」嘅內容。呢個同 Google 嘅 E-E-A-T 框架一脈相承——高質素、值得信賴嘅內容更容易得到 AI 嘅正面評價同推薦。",
      "RLHF makes AI tend to recommend content deemed 'useful and trustworthy.' This aligns with Google's E-E-A-T framework—high-quality, trustworthy content is more likely to receive positive AI evaluation and recommendation.",
      [["RLHF 點樣影響我嘅內容被推薦？","RLHF 訓練 AI 偏好有用、準確、無害嘅內容。確保你嘅內容提供真正嘅價值、有事實支持、同避免誤導性聲明。"],["我可以影響 RLHF 嘅過程嗎？","你唔可以直接影響訓練過程，但你可以建立符合 RLHF 偏好嘅內容——準確、有深度、有參考來源、同避免極端或爭議性嘅聲明。"],["RLHF 會唔會令 AI 有偏見？","有可能。RLHF 嘅人類評估員嘅偏見可能被模型學習。呢個係你需要喺多個 AI 平台建立品牌存在嘅原因之一。"]],
      [["How does RLHF affect my content being recommended?","RLHF trains AI to prefer useful, accurate, harmless content. Ensure your content provides genuine value, is fact-supported, and avoids misleading claims."],["Can I influence the RLHF process?","You can't directly influence training, but you can build content aligned with RLHF preferences—accurate, in-depth, well-sourced, and avoiding extreme or controversial claims."],["Can RLHF cause AI bias?","Possibly. Human evaluator biases can be learned by models. This is one reason you need brand presence across multiple AI platforms."]]
    ),
    // ═══════════════════════════════════════
    // AEO Strategy (20 terms)
    // ═══════════════════════════════════════
    t("answer-engine-optimization","答案引擎優化 (AEO)","Answer Engine Optimization (AEO)",
      "AEO 係優化你嘅內容令 AI 搜尋引擎（如 ChatGPT、Perplexity、Google AI Overview）主動推薦你嘅品牌嘅策略。AEO 係 SEO 嘅進化版，專注於 AI 時代嘅搜尋能見度。",
      "AEO is the strategy of optimizing your content so AI search engines (ChatGPT, Perplexity, Google AI Overview) proactively recommend your brand. AEO is the evolution of SEO, focused on search visibility in the AI era.",
      "AEO Strategy",["ai-search-optimization","semantic-seo","entity-authority","ai-citation"],
      ["SurfIO 幫客戶喺 ChatGPT 搜「香港最好嘅律師行」時被推薦","透過 Schema Markup 同內容優化，令 Perplexity 引用你嘅網站","建立品牌權威性令 Google AI Overview 摘要你嘅內容"],
      ["SurfIO helps clients get recommended when ChatGPT searches 'best law firm in Hong Kong'","Schema Markup and content optimization get Perplexity to cite your website","Building brand authority gets Google AI Overview to summarize your content"],
      "AI 搜尋正在取代傳統 Google 搜尋。越嚟越多用戶直接問 AI 助手而唔用搜尋引擎。如果你未做 AEO，你嘅品牌喺 AI 搜尋入面就係隱形嘅。AEO 係未來 5 年最重要嘅數碼營銷策略。",
      "AI search is replacing traditional Google search. More users ask AI assistants directly instead of using search engines. Without AEO, your brand is invisible in AI search. AEO is the most important digital marketing strategy for the next 5 years.",
      [["AEO 同 SEO 有咩分別？","SEO 專注 Google 搜尋排名，AEO 專注令 AI 搜尋引擎推薦你。AEO 涉及品牌實體建設、結構化數據、同跨 AI 平台嘅一致性優化。"],["做 AEO 需要幾多預算？","基礎 AEO（Schema Markup、內容結構化）可以零成本開始。完整 AEO 策略包括品牌建設同持續優化，建議每月投入專業服務。"],["AEO 幾耐見到效果？","大部分企業喺 30-60 日內開始見到 AI 能見度改善。完整效果通常喺 90 日內呈現。"]],
      [["How is AEO different from SEO?","SEO focuses on Google search ranking; AEO focuses on getting AI search engines to recommend you. AEO involves brand entity building, structured data, and cross-AI platform consistency optimization."],["How much budget does AEO require?","Basic AEO (Schema Markup, content structuring) can start at zero cost. Complete AEO strategy including brand building and ongoing optimization requires professional services."],["How long before AEO shows results?","Most businesses see AI visibility improvements within 30-60 days. Full effects typically manifest within 90 days."]]
    ),
    t("ai-search-optimization","AI 搜尋優化","AI Search Optimization",
      "AI 搜尋優化係為所有 AI 驅動嘅搜尋系統優化你嘅線上存在嘅廣義策略。佢涵蓋 AEO、GEO、同為語音 AI、購物 AI 等各種 AI 互動場景優化嘅工作。",
      "AI search optimization is the broad strategy of optimizing your online presence for all AI-driven search systems. It encompasses AEO, GEO, and optimization for voice AI, shopping AI, and various other AI interaction scenarios.",
      "AEO Strategy",["answer-engine-optimization","multi-engine-optimization","conversational-search","ai-first-indexing"],
      ["為 ChatGPT、Perplexity、Claude 同時優化品牌能見度","優化語音搜尋令 Siri 同 Alexa 推薦你嘅服務","確保 AI 購物助手喺推薦產品時包括你嘅品牌"],
      ["Optimizing brand visibility across ChatGPT, Perplexity, and Claude simultaneously","Optimizing voice search so Siri and Alexa recommend your services","Ensuring AI shopping assistants include your brand in product recommendations"],
      "AI 搜尋唔只係 ChatGPT。用戶透過語音助手、AI 購物工具、AI 研究助手等多種渠道同 AI 互動。全面嘅 AI 搜尋優化確保你嘅品牌喺所有 AI 接觸點都被正確推薦。",
      "AI search isn't just ChatGPT. Users interact with AI through voice assistants, AI shopping tools, AI research assistants, and more. Comprehensive AI search optimization ensures your brand is correctly recommended at all AI touchpoints.",
      [["AI 搜尋優化包括邊啲渠道？","包括文字 AI（ChatGPT、Perplexity）、語音 AI（Siri、Alexa）、搜尋 AI（Google AI Overview）、購物 AI、同企業 AI 助手等。"],["同時優化多個 AI 平台可行嗎？","好多優化策略（如 Schema Markup、內容結構化、品牌一致性）對所有 AI 平台都有效。但每個平台都有獨特嘅排名因素需要針對性優化。"],["AI 搜尋優化嘅投資回報率高嗎？","AI 搜尋嘅用戶通常有更高嘅購買意圖（因為 AI 已幫佢哋做咗初步篩選），所以轉化率通常比傳統搜尋高 2-3 倍。"]],
      [["What channels does AI search optimization cover?","Text AI (ChatGPT, Perplexity), voice AI (Siri, Alexa), search AI (Google AI Overview), shopping AI, and enterprise AI assistants."],["Is it feasible to optimize for multiple AI platforms simultaneously?","Many optimization strategies (Schema Markup, content structuring, brand consistency) work across all AI platforms. But each platform has unique ranking factors requiring targeted optimization."],["Is ROI high for AI search optimization?","AI search users typically have higher purchase intent (AI has pre-filtered for them), so conversion rates are usually 2-3x higher than traditional search."]]
    ),
    t("ai-citation","AI 引用","AI Citation",
      "AI 引用係 AI 搜尋引擎喺答案中引用你嘅品牌或網站作為資訊來源嘅行為。AI 引用係 AEO 嘅核心目標之一，佢代表 AI 對你嘅品牌嘅信任同認可。",
      "AI citation is when an AI search engine references your brand or website as an information source in its answers. AI citation is a core AEO objective, representing AI's trust and recognition of your brand.",
      "AEO Strategy",["perplexity-citation","ai-search-attribution","citation-tracking","brand-mention-optimization"],
      ["Perplexity 每次回答都附帶來源引用連結","Google AI Overview 可能喺摘要下方顯示你嘅網站","ChatGPT Browse 模式會列出參考嘅網頁來源"],
      ["Perplexity attaches source citation links with every response","Google AI Overview may display your website below summaries","ChatGPT Browse mode lists referenced web sources"],
      "AI 引用直接帶嚟品牌曝光、網站流量同信任度提升。被 AI 引用嘅品牌享有「AI 背書」效應——用戶傾向信任 AI 推薦嘅品牌。追蹤同增加你嘅 AI 引用係 AEO 嘅核心 KPI。",
      "AI citations directly bring brand exposure, website traffic, and trust. Brands cited by AI enjoy an 'AI endorsement' effect—users tend to trust AI-recommended brands. Tracking and increasing AI citations is a core AEO KPI.",
      [["點樣增加我嘅 AI 引用頻率？","提供有原創數據嘅內容、建立行業權威性、確保內容格式 AI 友好（結構化、簡潔、可引用）、同保持內容新鮮度。"],["AI 引用同反向連結有咩分別？","反向連結係其他網站連結到你，AI 引用係 AI 系統將你嘅品牌作為答案來源。兩者互補——更多反向連結也增加 AI 引用嘅機會。"],["點樣追蹤我嘅 AI 引用？","定期用核心查詢測試各 AI 平台、使用專業監測工具（如 Otterly.ai）、同設定品牌提及提醒。"]],
      [["How can I increase my AI citation frequency?","Provide content with original data, build industry authority, ensure AI-friendly content format (structured, concise, citable), and maintain content freshness."],["How are AI citations different from backlinks?","Backlinks are other sites linking to you; AI citations are AI systems using your brand as an answer source. They're complementary—more backlinks also increase AI citation chances."],["How do I track my AI citations?","Regularly test major AI platforms with core queries, use professional monitoring tools (e.g., Otterly.ai), and set up brand mention alerts."]]
    ),
    t("brand-mention-optimization","品牌提及優化","Brand Mention Optimization",
      "品牌提及優化係策略性增加你嘅品牌喺互聯網高質素來源被提及嘅頻率同正面性。品牌提及係 LLM 訓練數據嘅核心信號，直接影響 AI 推薦你嘅可能性。",
      "Brand mention optimization is strategically increasing the frequency and positivity of your brand mentions across high-quality internet sources. Brand mentions are a core signal in LLM training data, directly influencing AI's likelihood of recommending you.",
      "AEO Strategy",["ai-citation","digital-pr-for-aeo","entity-authority","brand-entity"],
      ["喺行業媒體發佈原創研究報告，獲取品牌提及","透過 Podcast 訪談增加品牌喺音頻平台嘅提及","喺 Reddit、Quora 等用戶討論平台建立自然嘅品牌提及"],
      ["Publishing original research in industry media to earn brand mentions","Increasing brand mentions on audio platforms through podcast interviews","Building natural brand mentions on discussion platforms like Reddit and Quora"],
      "LLM 從互聯網文本中學習「邊個品牌值得推薦」。如果你嘅品牌喺高質素網站被頻繁、正面地提及，AI 就更傾向推薦你。品牌提及優化係 AEO 嘅基礎工作。",
      "LLMs learn 'which brands are worth recommending' from internet text. If your brand is frequently and positively mentioned on high-quality sites, AI is more likely to recommend you. Brand mention optimization is foundational AEO work.",
      [["品牌提及同反向連結邊個更重要？","喺 AEO 時代，品牌提及（即使冇連結）同樣重要，因為 LLM 從文本中學習，唔需要連結。兩者都應該追求。"],["點樣獲取高質素嘅品牌提及？","數碼 PR 策略包括：發佈原創研究、接受媒體訪問、參加行業活動、喺權威平台發表客座文章。"],["負面品牌提及對 AEO 有咩影響？","負面提及可能令 AI 喺推薦時加上負面語境。積極管理你嘅線上聲譽，回應負面評論，同建立正面品牌敘事。"]],
      [["Are brand mentions or backlinks more important?","In the AEO era, brand mentions (even without links) are equally important because LLMs learn from text, not links. Pursue both."],["How do I get high-quality brand mentions?","Digital PR strategies include: publishing original research, accepting media interviews, attending industry events, writing guest articles on authoritative platforms."],["How do negative brand mentions affect AEO?","Negative mentions may cause AI to add negative context when recommending. Actively manage online reputation, respond to negative reviews, and build positive brand narrative."]]
    ),
    t("entity-authority","實體權威性","Entity Authority",
      "實體權威性係搜尋引擎同 AI 系統對你嘅品牌作為特定領域權威來源嘅信任程度。佢基於你嘅線上存在嘅全面性、一致性同可信度，係被 AI 推薦嘅核心條件。",
      "Entity authority is the trust level search engines and AI systems assign to your brand as an authoritative source in a specific domain. It's based on your online presence's comprehensiveness, consistency, and credibility—a core condition for AI recommendation.",
      "AEO Strategy",["topical-authority","e-e-a-t","brand-entity","knowledge-panel"],
      ["建立完整嘅 Wikipedia / Wikidata 條目提升實體權威性","喺 Crunchbase、LinkedIn 等權威平台維護一致嘅品牌資訊","獲取行業獎項同認證增強 AI 對你嘅信任"],
      ["Building complete Wikipedia/Wikidata entries to boost entity authority","Maintaining consistent brand info on authoritative platforms like Crunchbase and LinkedIn","Earning industry awards and certifications to strengthen AI trust"],
      "AI 搜尋引擎只推薦佢認為「權威」嘅來源。實體權威性係 AI 判斷你值唔值得推薦嘅核心指標。建立強大嘅實體權威性需要跨平台嘅一致品牌建設同持續嘅權威性信號。",
      "AI search engines only recommend sources they consider 'authoritative.' Entity authority is the core metric AI uses to judge if you're worth recommending. Building strong entity authority requires cross-platform consistent brand building and ongoing authority signals.",
      [["點樣量度我嘅實體權威性？","檢查你嘅品牌喺 Knowledge Graph 嘅存在、品牌提及嘅數量同質素、反向連結 Profile、同跨平台嘅資訊一致性。"],["建立實體權威性需要幾耐？","呢係一個持續嘅過程。基礎設置（Schema、Business Profile）可以喺數週內完成，但真正嘅權威性建設需要 6-12 個月嘅持續努力。"],["中小企可以同大企業競爭實體權威性嗎？","喺特定細分領域可以。專注喺你嘅專長領域建立深度權威性，而唔係嘗試喺所有方面同大企業競爭。"]],
      [["How do I measure my entity authority?","Check your brand's Knowledge Graph presence, quantity and quality of brand mentions, backlink profile, and cross-platform information consistency."],["How long does building entity authority take?","It's an ongoing process. Basic setup (Schema, Business Profile) takes weeks, but genuine authority building requires 6-12 months of sustained effort."],["Can SMEs compete with large enterprises on entity authority?","In specific niches, yes. Focus on building deep authority in your area of expertise rather than competing with large enterprises across all areas."]]
    ),
    t("topical-authority","主題權威性","Topical Authority",
      "主題權威性係你嘅網站喺特定主題上嘅深度覆蓋同專業程度。當 AI 搜尋引擎認為你嘅網站係某個主題嘅權威來源時，你嘅相關內容更容易被引用同推薦。",
      "Topical authority is your website's depth of coverage and expertise on a specific topic. When AI search engines consider your site an authoritative source on a topic, your related content is more likely to be cited and recommended.",
      "AEO Strategy",["entity-authority","content-clustering","pillar-page","topic-cluster"],
      ["建立 AEO 主題集群：從基礎概念到進階策略嘅完整內容矩陣","一間牙科診所建立口腔健康嘅深度內容庫，涵蓋 50+ 相關主題","SaaS 公司圍繞 CRM 建立技術文檔、使用指南、行業報告等"],
      ["Building an AEO topic cluster: complete content matrix from basics to advanced strategies","A dental clinic building a deep oral health content library covering 50+ related topics","SaaS company building technical docs, user guides, and industry reports around CRM"],
      "AI 搜尋引擎偏好「主題專家」而唔係「咩都講少少」嘅網站。建立深度嘅主題覆蓋令 AI 更傾向引用你作為特定領域嘅權威來源。呢個係 content cluster 策略嘅核心邏輯。",
      "AI search engines prefer 'topic experts' over sites that 'touch on everything lightly.' Building deep topic coverage makes AI more likely to cite you as an authority in a specific domain. This is the core logic behind content cluster strategy.",
      [["點樣建立主題權威性？","選擇你嘅核心領域，建立一個 pillar page 同 20-50 個相關嘅 cluster 內容，確保完整覆蓋主題嘅各個方面。"],["主題權威性同 E-E-A-T 有咩關係？","主題權威性係實現 E-E-A-T 嘅具體方法——透過深度內容覆蓋展示你嘅專業性（Expertise）同權威性（Authoritativeness）。"],["幾多內容先算「有主題權威性」？","冇確切數字，但一般建議每個核心主題至少有 20 篇高質素嘅相關內容，互相連結形成完整嘅知識網絡。"]],
      [["How do I build topical authority?","Choose your core domain, build a pillar page with 20-50 related cluster content pieces, ensuring comprehensive coverage of all topic aspects."],["What's the relationship between topical authority and E-E-A-T?","Topical authority is the concrete method for achieving E-E-A-T—demonstrating Expertise and Authoritativeness through deep content coverage."],["How much content constitutes 'topical authority'?","No exact number, but generally at least 20 high-quality related content pieces per core topic, interlinked to form a complete knowledge network."]]
    ),
    t("semantic-seo","語義 SEO","Semantic SEO",
      "語義 SEO 係基於語義理解（而非單純關鍵字匹配）優化內容嘅策略。佢專注喺主題嘅全面覆蓋、實體之間嘅關係、同搜尋意圖嘅匹配，係 AEO 嘅技術基礎。",
      "Semantic SEO is the strategy of optimizing content based on semantic understanding rather than pure keyword matching. It focuses on comprehensive topic coverage, entity relationships, and search intent matching—the technical foundation of AEO.",
      "AEO Strategy",["natural-language-processing","embedding","entity-authority","search-intent"],
      ["用同義詞同相關詞彙豐富內容，而唔只重複目標關鍵字","建立實體之間嘅語義關係：公司→服務→行業→地區","用結構化數據明確標記內容嘅語義含義"],
      ["Enriching content with synonyms and related terms instead of repeating target keywords","Building semantic relationships between entities: company→service→industry→location","Using structured data to explicitly mark content's semantic meaning"],
      "AI 搜尋引擎理解語義而唔只係關鍵字。語義 SEO 確保你嘅內容可以被 AI 正確理解——唔論用戶用咩措辭查詢。呢個係傳統 SEO 同 AEO 之間嘅橋樑。",
      "AI search engines understand semantics, not just keywords. Semantic SEO ensures your content can be correctly understood by AI—regardless of user query wording. This bridges traditional SEO and AEO.",
      [["語義 SEO 同傳統 SEO 有咩分別？","傳統 SEO 專注關鍵字密度同匹配，語義 SEO 專注主題嘅全面覆蓋、概念之間嘅關係、同用戶意圖嘅理解。"],["點樣做語義 SEO？","使用 TF-IDF 分析搵出相關詞彙、建立主題集群、用 Schema Markup 標記實體關係、回答用戶嘅所有相關問題。"],["語義 SEO 對 AEO 有幾重要？","非常重要。語義 SEO 係 AEO 嘅基礎——AI 搜尋引擎嘅核心就係語義理解。做好語義 SEO 等於為 AEO 打好根基。"]],
      [["How is semantic SEO different from traditional SEO?","Traditional SEO focuses on keyword density and matching; semantic SEO focuses on comprehensive topic coverage, concept relationships, and user intent understanding."],["How do I implement semantic SEO?","Use TF-IDF analysis to find related terms, build topic clusters, mark entity relationships with Schema Markup, and answer all related user questions."],["How important is semantic SEO for AEO?","Extremely important. Semantic SEO is AEO's foundation—AI search engines are fundamentally about semantic understanding. Good semantic SEO lays the groundwork for AEO."]]
    ),
    t("content-authority-score","內容權威性評分","Content Authority Score",
      "內容權威性評分係衡量你嘅內容喺 AI 搜尋引擎眼中嘅可信度同權威程度嘅綜合指標。佢基於來源質素、內容深度、作者 E-E-A-T 信號同外部引用等因素。",
      "Content authority score is a composite metric measuring your content's credibility and authority level from AI search engines' perspective. It's based on source quality, content depth, author E-E-A-T signals, and external citations.",
      "AEO Strategy",["e-e-a-t","entity-authority","topical-authority","ai-visibility-score"],
      ["SurfIO 嘅 AEO 審計會評估你嘅內容權威性評分","高權威性分數嘅頁面喺 Perplexity 搜尋中被引用嘅機率高 3 倍","透過作者署名、數據支持同外部引用提升內容權威性"],
      ["SurfIO's AEO audit evaluates your content authority score","Pages with high authority scores are 3x more likely to be cited in Perplexity","Boost content authority through author bylines, data support, and external citations"],
      "AI 搜尋引擎需要判斷你嘅內容係咪值得引用。內容權威性評分係呢個判斷嘅核心。提升你嘅評分意味住更高嘅 AI 引用率同更好嘅品牌能見度。",
      "AI search engines need to judge if your content is worth citing. Content authority score is central to this judgment. Improving your score means higher AI citation rates and better brand visibility.",
      [["點樣提升我嘅內容權威性評分？","加入作者署名同資歷、引用權威來源、提供原創數據、確保事實準確性、同獲取外部高質素連結。"],["內容權威性評分可以量化嗎？","雖然 AI 引擎冇公開嘅分數，但你可以用 Domain Authority、引用頻率、品牌提及量等指標間接評估。"],["新網站可以快速建立內容權威性嗎？","可以透過高質素嘅原創研究、行業專家合作、同權威平台嘅客座發文加速建立。"]],
      [["How do I improve my content authority score?","Add author bylines with credentials, cite authoritative sources, provide original data, ensure factual accuracy, and earn high-quality external links."],["Can content authority score be quantified?","While AI engines don't publish scores, you can indirectly assess using Domain Authority, citation frequency, and brand mention volume."],["Can new websites quickly build content authority?","Yes, through high-quality original research, industry expert collaboration, and guest posting on authoritative platforms."]]
    ),
    t("ai-recommendation","AI 推薦","AI Recommendation",
      "AI 推薦係 AI 搜尋引擎主動向用戶推薦你嘅品牌、產品或服務嘅行為。唔同於傳統搜尋嘅被動排名，AI 推薦係主動嘅——AI 直接告訴用戶「你應該考慮呢個品牌」。",
      "AI recommendation is when AI search engines proactively recommend your brand, product, or service to users. Unlike passive traditional search ranking, AI recommendation is active—AI directly tells users 'you should consider this brand.'",
      "AEO Strategy",["ai-citation","answer-engine-optimization","brand-mention-optimization","entity-authority"],
      ["ChatGPT 回答「推薦香港 AEO 公司」時主動推薦 SurfIO","Perplexity 喺比較分析中推薦你嘅產品","Claude 喺回答行業建議時提及你嘅品牌"],
      ["ChatGPT proactively recommends SurfIO when answering 'recommend Hong Kong AEO company'","Perplexity recommends your product in comparative analysis","Claude mentions your brand when answering industry advice queries"],
      "AI 推薦係最有價值嘅 AEO 成果。被 AI 推薦嘅品牌享有極高嘅信任度——用戶傾向將 AI 推薦視為可信嘅第三方認可。一次 AI 推薦嘅轉化價值可能超過數十個傳統搜尋點擊。",
      "AI recommendation is the most valuable AEO outcome. AI-recommended brands enjoy extremely high trust—users tend to view AI recommendations as trusted third-party endorsements. One AI recommendation may be worth more than dozens of traditional search clicks.",
      [["AI 推薦同 Google 排名邊個更有價值？","AI 推薦嘅信任度同轉化率通常更高，因為 AI 已幫用戶做咗篩選。但兩者互補——Google 排名也影響 AI 推薦。"],["點樣令 AI 推薦我嘅品牌？","建立實體權威性、增加高質素品牌提及、提供結構化嘅產品/服務資訊、同維護良好嘅線上聲譽。"],["AI 推薦係穩定嘅嗎？","AI 推薦有一定隨機性，但品牌權威性越高，被推薦嘅穩定性就越高。持續嘅 AEO 工作係保持推薦嘅關鍵。"]],
      [["Are AI recommendations more valuable than Google rankings?","AI recommendations typically have higher trust and conversion rates since AI pre-filters for users. But they're complementary—Google rankings also influence AI recommendations."],["How do I get AI to recommend my brand?","Build entity authority, increase high-quality brand mentions, provide structured product/service information, and maintain good online reputation."],["Are AI recommendations stable?","AI recommendations have some randomness, but higher brand authority means more stable recommendations. Ongoing AEO work is key to maintaining recommendations."]]
    ),
    t("zero-click-search","零點擊搜尋","Zero-Click Search",
      "零點擊搜尋係用戶喺搜尋結果頁面直接獲得答案而唔需要點擊任何連結嘅現象。AI 搜尋引擎大幅加速咗呢個趨勢——AI 直接提供完整答案，用戶唔需要訪問你嘅網站。",
      "Zero-click search is when users get answers directly on search results pages without clicking any links. AI search engines have dramatically accelerated this trend—AI provides complete answers directly, users don't need to visit your website.",
      "AEO Strategy",["ai-overview","featured-snippet-optimization","ai-citation","answer-engine-optimization"],
      ["Google AI Overview 直接喺搜尋頁面顯示 AI 生成嘅答案","超過 60% 嘅 Google 搜尋現已係零點擊搜尋","ChatGPT 用戶通常喺對話中獲得完整答案，唔需要訪問網站"],
      ["Google AI Overview displays AI-generated answers directly on search pages","Over 60% of Google searches are now zero-click","ChatGPT users typically get complete answers in conversation without visiting websites"],
      "零點擊搜尋唔代表你失去所有價值。關鍵係被 AI 引用同提及——即使用戶冇點擊你嘅網站，品牌曝光同 AI 背書仍然帶嚟價值。AEO 嘅目標就係喺零點擊環境中獲得品牌能見度。",
      "Zero-click search doesn't mean you lose all value. The key is being cited and mentioned by AI—even without website clicks, brand exposure and AI endorsement still provide value. AEO's goal is gaining brand visibility in zero-click environments.",
      [["零點擊搜尋會令我嘅網站流量消失嗎？","唔一定。被 AI 引用嘅品牌可以獲得「品牌效應」——用戶記住品牌名後可能直接搜尋你。同時某啲 AI 平台（如 Perplexity）仍提供來源連結。"],["點樣喺零點擊環境中獲得價值？","確保你嘅品牌名出現喺 AI 答案中、提供獨特嘅數據令 AI 需要引用你、同建立強大嘅品牌認知度。"],["零點擊搜尋對邊啲行業影響最大？","資訊查詢類行業（如定義、步驟、比較）影響最大。但交易類查詢（如購買、預約）仍然需要用戶訪問網站。"]],
      [["Will zero-click search eliminate my website traffic?","Not necessarily. Brands cited by AI gain a 'brand effect'—users remember the brand and may search for you directly. Some AI platforms (like Perplexity) still provide source links."],["How do I capture value in zero-click environments?","Ensure your brand name appears in AI answers, provide unique data that AI needs to cite, and build strong brand recognition."],["Which industries are most affected by zero-click search?","Information-seeking industries (definitions, steps, comparisons) are most affected. But transactional queries (buying, booking) still require users to visit websites."]]
    ),
    t("ai-overview","AI Overview","AI Overview",
      "AI Overview 係 Google 搜尋結果頂部嘅 AI 生成摘要區塊。佢整合多個來源嘅資訊，直接喺搜尋頁面提供 AI 生成嘅答案。出現喺 AI Overview 入面對品牌能見度嘅影響巨大。",
      "AI Overview is Google's AI-generated summary section at the top of search results. It integrates information from multiple sources to provide AI-generated answers directly on search pages. Appearing in AI Overview has massive impact on brand visibility.",
      "AEO Strategy",["google-ai-overview","featured-snippet-optimization","zero-click-search","structured-data"],
      ["搜尋「最好嘅 CRM 軟件」時，AI Overview 可能列出並比較多個品牌","AI Overview 喺美國已覆蓋超過 40% 嘅搜尋查詢","有 Schema Markup 嘅網站更容易被 AI Overview 引用"],
      ["Searching 'best CRM software' may show AI Overview listing and comparing multiple brands","AI Overview covers over 40% of search queries in the US","Websites with Schema Markup are more likely to be cited by AI Overview"],
      "Google AI Overview 係目前覆蓋面最廣嘅 AI 搜尋功能——佢直接影響最多用戶嘅搜尋體驗。被 AI Overview 引用等於喺 Google 搜尋結果嘅最顯眼位置展示你嘅品牌。",
      "Google AI Overview is currently the most widely deployed AI search feature—it directly affects the most users' search experience. Being cited by AI Overview means displaying your brand at the most prominent position in Google search results.",
      [["點樣出現喺 Google AI Overview？","優化傳統 SEO 排名（AI Overview 偏好前 10 名結果）、部署完整嘅 Schema Markup、用 FAQ 格式組織內容、同確保內容準確可信。"],["AI Overview 同 Featured Snippets 有咩分別？","Featured Snippets 引用單一來源，AI Overview 綜合多個來源生成答案。AI Overview 更全面但競爭也更激烈。"],["AI Overview 會影響我嘅自然搜尋流量嗎？","可能會分流部分點擊，但被引用嘅品牌獲得更高嘅品牌認知度。優化目標應該係同時出現喺 AI Overview 同自然搜尋結果中。"]],
      [["How do I appear in Google AI Overview?","Optimize traditional SEO ranking (AI Overview favors top 10 results), deploy complete Schema Markup, organize content in FAQ format, and ensure content is accurate and trustworthy."],["How does AI Overview differ from Featured Snippets?","Featured Snippets cite a single source; AI Overview synthesizes multiple sources. AI Overview is more comprehensive but competition is fiercer."],["Will AI Overview affect my organic search traffic?","It may divert some clicks, but cited brands gain higher brand awareness. Optimization should aim to appear in both AI Overview and organic results."]]
    ),
    t("featured-snippet-optimization","精選摘要優化","Featured Snippet Optimization",
      "精選摘要優化係針對 Google 搜尋結果頂部嘅「零位」特殊框優化你嘅內容嘅策略。精選摘要同 AI Overview 密切相關——精選摘要嘅內容經常被 AI Overview 引用。",
      "Featured snippet optimization targets the 'position zero' special box at the top of Google search results. Featured snippets are closely related to AI Overview—snippet content is frequently cited by AI Overview.",
      "AEO Strategy",["ai-overview","zero-click-search","structured-data","search-intent"],
      ["用 40-60 字嘅段落直接回答常見問題","用有序列表格式回答「點樣做 XXX」類查詢","用表格格式呈現比較類資訊"],
      ["Use 40-60 word paragraphs to directly answer common questions","Use ordered list format for 'how to' queries","Use table format for comparison information"],
      "精選摘要係通往 AI Overview 嘅橋樑。如果你嘅內容已經贏得精選摘要位置，你被 AI Overview 引用嘅機率大幅增加。精選摘要優化係最直接嘅 AEO 快速見效策略。",
      "Featured snippets are the bridge to AI Overview. If your content already wins snippet positions, your chances of AI Overview citation increase dramatically. Snippet optimization is the most direct quick-win AEO strategy.",
      [["精選摘要有幾多種格式？","主要有三種：段落式（回答定義類問題）、列表式（步驟同排名）、同表格式（比較同數據）。針對唔同格式優化可以增加贏得摘要嘅機會。"],["贏得精選摘要嘅最佳策略係咩？","喺你已排名第 1-10 位嘅關鍵字中搵出有精選摘要嘅查詢，用最適合嘅格式（段落/列表/表格）直接回答問題。"],["精選摘要同 People Also Ask 有咩關係？","兩者都反映 Google 認為最適合直接回答嘅查詢。優化精選摘要嘅內容同時也會增加出現喺 People Also Ask 嘅機會。"]],
      [["How many featured snippet formats are there?","Three main types: paragraph (definition queries), list (steps and rankings), and table (comparisons and data). Optimizing for different formats increases your chances."],["What's the best strategy for winning featured snippets?","Among keywords where you rank 1-10, find queries with featured snippets and directly answer them in the most suitable format (paragraph/list/table)."],["What's the relationship between featured snippets and People Also Ask?","Both reflect queries Google considers best for direct answers. Content optimized for snippets also increases chances of appearing in People Also Ask."]]
    ),
    t("knowledge-panel","知識面板","Knowledge Panel",
      "知識面板係 Google 搜尋結果右側嘅資訊框，展示品牌、人物或概念嘅結構化資訊。擁有知識面板係實體權威性嘅重要標誌，也增加被 AI 搜尋引擎引用嘅機會。",
      "A knowledge panel is the information box on the right side of Google search results displaying structured information about brands, people, or concepts. Having a knowledge panel is an important indicator of entity authority and increases AI citation chances.",
      "AEO Strategy",["entity-authority","brand-entity","knowledge-graph","structured-data"],
      ["搜尋 'Apple' 時右側顯示嘅公司資訊框就係知識面板","知識面板從 Google Knowledge Graph 提取資訊","你可以認領同更新你嘅品牌知識面板"],
      ["The company info box on the right when searching 'Apple' is a knowledge panel","Knowledge panels pull information from Google Knowledge Graph","You can claim and update your brand's knowledge panel"],
      "知識面板代表 Google 已經將你嘅品牌識別為一個「實體」。呢個實體識別狀態直接影響 AI 搜尋引擎（包括 Google AI Overview、Gemini）點樣理解同推薦你嘅品牌。",
      "A knowledge panel represents Google having identified your brand as an 'entity.' This entity recognition status directly affects how AI search engines (including Google AI Overview, Gemini) understand and recommend your brand.",
      [["點樣獲得知識面板？","建立 Wikipedia/Wikidata 條目、維護 Google Business Profile、確保跨平台品牌資訊一致、同部署完整嘅 Organization Schema。"],["知識面板同品牌搜尋有咩關係？","當用戶搜尋你嘅品牌名時，知識面板提供結構化嘅品牌資訊。呢個也係 AI 搜尋引擎理解你品牌嘅重要數據源。"],["冇知識面板會影響 AEO 效果嗎？","知識面板係加分項但唔係必要條件。即使冇知識面板，你仍然可以透過其他途徑建立實體權威性。"]],
      [["How do I get a knowledge panel?","Build Wikipedia/Wikidata entries, maintain Google Business Profile, ensure cross-platform brand info consistency, and deploy complete Organization Schema."],["What's the relationship between knowledge panels and brand search?","When users search your brand name, the knowledge panel provides structured brand info. This is also an important data source for AI search engines understanding your brand."],["Does lacking a knowledge panel affect AEO results?","A knowledge panel is a bonus but not required. You can still build entity authority through other channels without one."]]
    ),
    t("brand-entity","品牌實體","Brand Entity",
      "品牌實體係你嘅品牌喺知識圖譜同 AI 系統中嘅數字身份。佢包括品牌名稱、描述、服務、地理位置、創辦人同其他實體之間嘅關係等結構化資訊。",
      "A brand entity is your brand's digital identity in knowledge graphs and AI systems. It includes structured information like brand name, description, services, location, founder, and relationships with other entities.",
      "AEO Strategy",["entity-authority","knowledge-panel","knowledge-graph","schema-markup"],
      ["Schema.org Organization 標記定義你嘅品牌實體","Google Business Profile 係你嘅本地品牌實體嘅核心","LinkedIn 公司頁面強化你嘅品牌實體喺專業領域嘅存在"],
      ["Schema.org Organization markup defines your brand entity","Google Business Profile is your local brand entity's core","LinkedIn company page strengthens your brand entity in professional domains"],
      "AI 搜尋引擎需要首先「識別」你嘅品牌為一個實體，先可以推薦你。建立清晰、一致嘅品牌實體係所有 AEO 工作嘅起點。冇實體身份嘅品牌喺 AI 搜尋中幾乎係隱形嘅。",
      "AI search engines need to first 'recognize' your brand as an entity before recommending you. Building a clear, consistent brand entity is the starting point for all AEO work. Brands without entity identity are virtually invisible in AI search.",
      [["咩係品牌實體建設？","品牌實體建設係喺所有數碼平台建立一致嘅品牌身份——包括 Schema Markup、Google Business Profile、社交媒體、行業目錄等。"],["品牌實體同品牌知名度有咩分別？","品牌知名度係人對你品牌嘅認識，品牌實體係 AI 對你品牌嘅「認識」。兩者互相影響但需要唔同嘅策略。"],["中小企嘅品牌實體建設從邊度開始？","從 Google Business Profile 同 Schema Markup 開始，呢兩個係建立 AI 品牌實體嘅基礎。"]],
      [["What is brand entity building?","Brand entity building is establishing consistent brand identity across all digital platforms—including Schema Markup, Google Business Profile, social media, and industry directories."],["How does brand entity differ from brand awareness?","Brand awareness is people's recognition of your brand; brand entity is AI's 'recognition.' They influence each other but require different strategies."],["Where should SMEs start with brand entity building?","Start with Google Business Profile and Schema Markup—these are the foundations for building an AI brand entity."]]
    ),
    t("digital-pr-for-aeo","AEO 數碼公關","Digital PR for AEO",
      "AEO 數碼公關係專門為增加 AI 搜尋能見度而設計嘅公關策略。佢專注喺高權威性媒體獲取品牌提及、建立思想領袖地位、同創建可被 AI 引用嘅原創研究。",
      "Digital PR for AEO is a PR strategy specifically designed to increase AI search visibility. It focuses on earning brand mentions in high-authority media, establishing thought leadership, and creating original research that AI can cite.",
      "AEO Strategy",["brand-mention-optimization","entity-authority","ai-citation","content-authority-score"],
      ["發佈行業白皮書獲取 Forbes、TechCrunch 等媒體嘅引用","創辦人接受 Podcast 訪談建立個人品牌 AI 能見度","喺行業會議發表演講獲取會議網站嘅品牌提及"],
      ["Publishing industry whitepapers to earn citations from Forbes, TechCrunch","Founder podcast interviews building personal brand AI visibility","Speaking at industry conferences to earn brand mentions on conference websites"],
      "傳統 PR 追求品牌曝光，AEO 數碼公關追求被 AI 訓練數據收錄嘅高質素提及。每一次被高權威性媒體提及都係一個「教 AI 認識你品牌」嘅信號。",
      "Traditional PR pursues brand exposure; AEO digital PR pursues high-quality mentions collected in AI training data. Every high-authority media mention is a signal 'teaching AI about your brand.'",
      [["AEO 數碼公關同傳統 PR 有咩分別？","AEO PR 更重視被 AI 爬蟲可索引嘅線上媒體（而非離線媒體），同更重視品牌提及嘅一致性同語境。"],["邊啲媒體嘅品牌提及對 AEO 最有效？","高 Domain Authority 嘅行業媒體同新聞網站最有效，因為 AI 訓練數據偏向呢啲權威來源。"],["AEO PR 嘅預算大概要幾多？","視乎行業同目標。基本嘅 PR 策略（客座文章、HARO 回應）可以低預算執行，但大型媒體置入需要更多投入。"]],
      [["How does AEO digital PR differ from traditional PR?","AEO PR prioritizes online media indexable by AI crawlers (vs offline media) and emphasizes brand mention consistency and context."],["Which media brand mentions are most effective for AEO?","High Domain Authority industry media and news sites are most effective, as AI training data favors these authoritative sources."],["What's the approximate budget for AEO PR?","Depends on industry and goals. Basic PR strategies (guest articles, HARO responses) can be done on low budget, but major media placements require more investment."]]
    ),
    t("ai-content-strategy","AI 內容策略","AI Content Strategy",
      "AI 內容策略係專門為 AI 搜尋引擎優化而設計嘅內容規劃方法。佢結合傳統 SEO 內容策略同 AI 友好嘅內容格式、結構同分發方式，確保內容同時服務人類讀者同 AI 系統。",
      "AI content strategy is content planning methodology designed specifically for AI search engine optimization. It combines traditional SEO content strategy with AI-friendly content formats, structure, and distribution to serve both human readers and AI systems.",
      "AEO Strategy",["content-clustering","pillar-page","semantic-seo","content-depth"],
      ["建立 FAQ 導向嘅內容矩陣覆蓋所有潛在 AI 查詢","每篇內容加入「可引用事實」段落方便 AI 直接提取","用結構化嘅摘要開頭令 AI 可以快速理解內容要點"],
      ["Building FAQ-oriented content matrix covering all potential AI queries","Adding 'citable facts' paragraphs to each content piece for AI extraction","Using structured summaries at the start so AI can quickly grasp key points"],
      "唔係所有內容都對 AI 搜尋有效。AI 內容策略幫你建立專門設計嚟被 AI 理解、提取同引用嘅內容。呢個係 AEO 投資回報率最高嘅工作之一。",
      "Not all content works for AI search. AI content strategy helps you build content specifically designed to be understood, extracted, and cited by AI. This is one of the highest-ROI AEO activities.",
      [["AI 內容策略同傳統內容策略有咩分別？","AI 內容策略更重視結構化格式（FAQ、表格、清單）、可引用嘅事實性陳述、同覆蓋所有相關嘅 AI 查詢意圖。"],["點樣建立 AI 友好嘅內容？","用問答格式組織內容、每個段落聚焦一個要點、提供具體嘅數據同例子、同用清晰嘅標題結構。"],["每個月應該產出幾多 AI 優化嘅內容？","質量比數量重要。建議每月 4-8 篇高質素嘅 AI 優化內容，每篇深度覆蓋一個主題。"]],
      [["How does AI content strategy differ from traditional content strategy?","AI content strategy emphasizes structured formats (FAQ, tables, lists), citable factual statements, and covering all related AI query intents."],["How do I create AI-friendly content?","Organize content in Q&A format, focus each paragraph on one point, provide specific data and examples, and use clear heading structure."],["How much AI-optimized content should I produce monthly?","Quality over quantity. Recommend 4-8 high-quality AI-optimized pieces monthly, each deeply covering one topic."]]
    ),
    t("ai-first-indexing","AI 優先索引","AI-First Indexing",
      "AI 優先索引係一個新興概念，指 AI 搜尋引擎以自己嘅方式索引同理解網頁內容，而唔完全依賴傳統搜尋引擎嘅索引。呢個趨勢要求網站同時為傳統同 AI 索引優化。",
      "AI-first indexing is an emerging concept where AI search engines index and understand web content in their own way, not fully relying on traditional search engine indexes. This trend requires websites to optimize for both traditional and AI indexing.",
      "AEO Strategy",["llms-txt","ai-txt","structured-data","crawl-budget"],
      ["Perplexity 有自己嘅網頁爬蟲 PerplexityBot","ChatGPT 透過 Browse 功能獨立訪問網頁","新嘅 llms.txt 標準允許網站為 AI 爬蟲提供專門嘅內容"],
      ["Perplexity has its own web crawler PerplexityBot","ChatGPT independently accesses web pages through Browse","The new llms.txt standard allows sites to provide AI-specific content"],
      "AI 搜尋引擎開始獨立索引網頁，唔完全依賴 Google 嘅索引。呢個意味住你需要確保你嘅網站對所有 AI 爬蟲都友好——唔只係 Googlebot，還有 ChatGPT、Perplexity 等嘅爬蟲。",
      "AI search engines are starting to index web pages independently, not fully relying on Google's index. This means you need to ensure your site is friendly to all AI crawlers—not just Googlebot, but also ChatGPT, Perplexity, and others.",
      [["我需要為 AI 爬蟲做特別嘅設定嗎？","檢查你嘅 robots.txt 確保唔會封鎖 AI 爬蟲（如 GPTBot、PerplexityBot、ClaudeBot）。考慮建立 llms.txt 檔案為 AI 提供結構化嘅內容。"],["AI 優先索引會取代 Google 索引嗎？","短期內唔會。但 AI 索引嘅重要性正在快速上升。最佳策略係同時為兩者優化。"],["點樣知道我嘅網站被 AI 爬蟲索引咗？","檢查伺服器日誌中 GPTBot、PerplexityBot 等 AI 爬蟲嘅訪問記錄，或者直接喺各 AI 平台查詢關於你品牌嘅問題。"]],
      [["Do I need special settings for AI crawlers?","Check robots.txt to ensure you're not blocking AI crawlers (GPTBot, PerplexityBot, ClaudeBot). Consider creating an llms.txt file to provide structured content for AI."],["Will AI-first indexing replace Google indexing?","Not in the short term. But AI indexing importance is rising rapidly. Best strategy is optimizing for both."],["How do I know if my site is indexed by AI crawlers?","Check server logs for AI crawler visits (GPTBot, PerplexityBot) or directly query each AI platform about your brand."]]
    ),
    t("conversational-search","對話式搜尋","Conversational Search",
      "對話式搜尋係用戶以自然語言對話方式同 AI 搜尋引擎互動嘅搜尋模式。用戶可以追問、提供上下文同修正查詢，而 AI 會記住整個對話嘅語境。",
      "Conversational search is the search mode where users interact with AI search engines through natural language dialogue. Users can follow up, provide context, and refine queries, while AI remembers the entire conversation context.",
      "AEO Strategy",["prompt-engineering","search-intent","natural-language-processing","voice-search-optimization"],
      ["用戶問「推薦香港嘅會計師」，跟住追問「揸邊個最擅長稅務規劃？」","ChatGPT 記住之前嘅對話語境提供更精準嘅推薦","Perplexity 嘅 Pro Search 支持多輪對話式搜尋"],
      ["User asks 'recommend Hong Kong accountants' then follows up 'which one is best at tax planning?'","ChatGPT remembers previous conversation context for more precise recommendations","Perplexity's Pro Search supports multi-turn conversational search"],
      "對話式搜尋令查詢更加具體同場景化。你嘅內容需要涵蓋從廣泛到具體嘅各種查詢深度，因為用戶會喺對話中逐步細化佢哋嘅需求。",
      "Conversational search makes queries more specific and contextual. Your content needs to cover query depths from broad to specific, as users progressively refine their needs through dialogue.",
      [["對話式搜尋同傳統搜尋有咩分別？","傳統搜尋係單次查詢，對話式搜尋係多輪對話。用戶可以追問、提供偏好、同要求比較，令查詢越嚟越精準。"],["點樣為對話式搜尋優化內容？","建立涵蓋唔同查詢深度嘅內容矩陣——從「咩係 X」嘅基礎問題到「X vs Y 邊個更適合 Z 場景」嘅深度比較。"],["對話式搜尋對 B2B 行業有咩影響？","B2B 決策者越嚟越多用 AI 對話搜集供應商資訊。你需要建立覆蓋整個購買旅程嘅內容。"]],
      [["How does conversational search differ from traditional search?","Traditional search is single-query; conversational search is multi-turn dialogue. Users can follow up, state preferences, and request comparisons, making queries increasingly precise."],["How do I optimize content for conversational search?","Build content matrices covering different query depths—from 'what is X' basics to 'X vs Y which is better for Z scenario' deep comparisons."],["How does conversational search impact B2B?","B2B decision-makers increasingly use AI conversations to gather supplier info. You need content covering the entire buying journey."]]
    ),
    t("multi-engine-optimization","多引擎優化","Multi-Engine Optimization",
      "多引擎優化係同時為多個 AI 搜尋引擎（ChatGPT、Perplexity、Google AI Overview、Claude、Copilot 等）優化你嘅品牌能見度嘅策略。每個引擎有唔同嘅數據來源同排名邏輯。",
      "Multi-engine optimization is the strategy of simultaneously optimizing brand visibility across multiple AI search engines (ChatGPT, Perplexity, Google AI Overview, Claude, Copilot). Each engine has different data sources and ranking logic.",
      "AEO Strategy",["answer-engine-optimization","ai-search-optimization","chatgpt-optimization","perplexity-citation"],
      ["SurfIO 幫客戶同時喺 7 個 AI 引擎建立品牌能見度","針對 Perplexity 嘅即時搜尋特性優化內容新鮮度","針對 ChatGPT 嘅訓練數據特性建立品牌提及"],
      ["SurfIO helps clients build brand visibility across 7 AI engines simultaneously","Optimizing content freshness for Perplexity's real-time search characteristics","Building brand mentions targeting ChatGPT's training data characteristics"],
      "唔同 AI 引擎嘅市場份額同用戶群各有唔同。只優化一個引擎等於忽略其他渠道嘅潛在客戶。多引擎優化確保你嘅品牌喺所有主要 AI 搜尋入面都被推薦。",
      "Different AI engines have varying market shares and user bases. Optimizing for only one engine means ignoring potential customers from other channels. Multi-engine optimization ensures your brand is recommended across all major AI searches.",
      [["需要為每個 AI 引擎制定唔同嘅策略嗎？","基礎策略（Schema Markup、品牌一致性、內容結構化）通用，但每個引擎嘅獨特因素需要針對性優化。"],["邊個 AI 引擎最重要？","取決於你嘅目標市場。Google AI Overview 覆蓋面最廣，ChatGPT 用戶最多，Perplexity 嘅引用最透明。"],["多引擎優化需要幾多額外工作？","大部分工作係通用嘅。額外工作主要係針對每個引擎嘅獨特排名因素做微調，通常只佔整體工作量嘅 20-30%。"]],
      [["Do I need different strategies for each AI engine?","Foundation strategies (Schema Markup, brand consistency, content structuring) are universal, but each engine's unique factors need targeted optimization."],["Which AI engine is most important?","Depends on your target market. Google AI Overview has broadest coverage, ChatGPT has most users, Perplexity has most transparent citations."],["How much extra work does multi-engine optimization require?","Most work is universal. Extra work mainly involves fine-tuning for each engine's unique ranking factors, typically only 20-30% of total effort."]]
    ),
    t("aeo-audit","AEO 審計","AEO Audit",
      "AEO 審計係全面分析你嘅網站同品牌喺 AI 搜尋引擎嘅表現、問題同優化機會嘅診斷過程。佢評估技術設置、內容質素、品牌信號同跨平台一致性等維度。",
      "An AEO audit is a comprehensive diagnostic analyzing your website and brand's performance, issues, and optimization opportunities in AI search engines. It evaluates technical setup, content quality, brand signals, and cross-platform consistency.",
      "AEO Strategy",["aeo-readiness-score","ai-visibility-score","answer-engine-optimization","structured-data"],
      ["SurfIO 嘅免費 AEO 審計涵蓋 7 個 AI 引擎嘅品牌能見度分析","審計檢查 Schema Markup 部署嘅完整性同正確性","分析你嘅品牌喺各 AI 平台嘅提及頻率同語境"],
      ["SurfIO's free AEO audit covers brand visibility analysis across 7 AI engines","Audit checks Schema Markup deployment completeness and correctness","Analyzes your brand's mention frequency and context across AI platforms"],
      "AEO 審計係所有 AEO 工作嘅起點。你需要先了解你嘅現狀——邊啲方面做得好、邊啲方面需要改善——先可以制定有效嘅優化策略。冇審計嘅 AEO 工作等於盲目行動。",
      "An AEO audit is the starting point for all AEO work. You need to understand your current state—what's working, what needs improvement—before developing effective optimization strategies. AEO without an audit is acting blindly.",
      [["AEO 審計同傳統 SEO 審計有咩分別？","AEO 審計額外涵蓋 AI 搜尋能見度、品牌實體識別狀態、AI 爬蟲訪問情況、同跨 AI 平台嘅品牌推薦分析。"],["免費 AEO 審計包括啲咩？","SurfIO 嘅免費審計包括 7 大 AI 引擎品牌能見度檢查、Schema Markup 分析、同基本嘅 AEO 準備度評分。"],["審計後下一步係咩？","根據審計結果制定優先改善清單。通常技術修復（Schema Markup）優先，然後係內容優化，最後係品牌權威性建設。"]],
      [["How does an AEO audit differ from traditional SEO audit?","AEO audits additionally cover AI search visibility, brand entity recognition status, AI crawler access, and cross-AI platform brand recommendation analysis."],["What does a free AEO audit include?","SurfIO's free audit includes brand visibility checks across 7 major AI engines, Schema Markup analysis, and basic AEO readiness scoring."],["What's the next step after an audit?","Develop a prioritized improvement list based on audit results. Typically technical fixes (Schema Markup) first, then content optimization, then brand authority building."]]
    ),
    // ═══════════════════════════════════════
    // Technical SEO (20 terms)
    // ═══════════════════════════════════════
    ...generateTechnicalSeoTerms(),
    // ═══════════════════════════════════════
    // Content Optimization (15 terms)
    // ═══════════════════════════════════════
    ...generateContentTerms(),
    // ═══════════════════════════════════════
    // AI Engines (15 terms)
    // ═══════════════════════════════════════
    ...generateAiEngineTerms(),
    // ═══════════════════════════════════════
    // Measurement (10 terms)
    // ═══════════════════════════════════════
    ...generateMeasurementTerms(),
    // ═══════════════════════════════════════
    // Industry Terms (5 terms)
    // ═══════════════════════════════════════
    ...generateIndustryTerms(),
  ];
}

// ────────────────────────────────────────
// Programmatic term generators for remaining 65 terms
// ────────────────────────────────────────

const TECH_SEO_TERMS: [string,string,string][] = [
  ["structured-data","結構化數據","Structured Data"],
  ["schema-markup","Schema Markup","Schema Markup"],
  ["json-ld","JSON-LD","JSON-LD"],
  ["knowledge-graph","知識圖譜","Knowledge Graph"],
  ["entity-recognition","實體識別","Entity Recognition"],
  ["named-entity-disambiguation","命名實體消歧","Named Entity Disambiguation"],
  ["semantic-html","語義化 HTML","Semantic HTML"],
  ["crawl-budget","抓取預算","Crawl Budget"],
  ["robots-txt","Robots.txt","Robots.txt"],
  ["sitemap-xml","Sitemap XML","Sitemap XML"],
  ["canonical-url","規範網址","Canonical URL"],
  ["hreflang","Hreflang 標記","Hreflang Tags"],
  ["core-web-vitals","Core Web Vitals","Core Web Vitals"],
  ["page-experience","頁面體驗","Page Experience"],
  ["mobile-first-indexing","流動優先索引","Mobile-First Indexing"],
  ["indexability","可索引性","Indexability"],
  ["render-budget","渲染預算","Render Budget"],
  ["javascript-seo","JavaScript SEO","JavaScript SEO"],
  ["llms-txt","llms.txt","llms.txt"],
  ["ai-txt","ai.txt","ai.txt"],
];

const CONTENT_TERMS: [string,string,string][] = [
  ["e-e-a-t","E-E-A-T","E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness)"],
  ["content-freshness","內容新鮮度","Content Freshness"],
  ["content-depth","內容深度","Content Depth"],
  ["content-clustering","內容聚類","Content Clustering"],
  ["pillar-page","支柱頁面","Pillar Page"],
  ["topic-cluster","主題集群","Topic Cluster"],
  ["internal-linking","內部連結","Internal Linking"],
  ["anchor-text-optimization","錨文本優化","Anchor Text Optimization"],
  ["content-pruning","內容修剪","Content Pruning"],
  ["content-gap-analysis","內容差距分析","Content Gap Analysis"],
  ["semantic-keyword","語義關鍵字","Semantic Keyword"],
  ["long-tail-keyword","長尾關鍵字","Long-Tail Keyword"],
  ["search-intent","搜尋意圖","Search Intent"],
  ["content-velocity","內容發佈速度","Content Velocity"],
  ["programmatic-seo","程式化 SEO","Programmatic SEO"],
];

const AI_ENGINE_TERMS: [string,string,string][] = [
  ["chatgpt-optimization","ChatGPT 優化","ChatGPT Optimization"],
  ["perplexity-citation","Perplexity 引用","Perplexity Citation"],
  ["claude-recommendation","Claude 推薦","Claude Recommendation"],
  ["gemini-ranking","Gemini 排名","Gemini Ranking"],
  ["google-ai-overview-optimization","Google AI Overview 優化","Google AI Overview Optimization"],
  ["bing-chat-optimization","Bing Chat 優化","Bing Chat Optimization"],
  ["copilot-visibility","Copilot 能見度","Copilot Visibility"],
  ["ai-engine-market-share","AI 引擎市場份額","AI Engine Market Share"],
  ["chatgpt-plugins","ChatGPT 外掛","ChatGPT Plugins"],
  ["perplexity-sources","Perplexity 來源","Perplexity Sources"],
  ["ai-search-attribution","AI 搜尋歸因","AI Search Attribution"],
  ["multi-modal-search","多模態搜尋","Multi-Modal Search"],
  ["voice-search-optimization","語音搜尋優化","Voice Search Optimization"],
  ["visual-search-ai","AI 視覺搜尋","Visual Search AI"],
  ["ai-shopping-search","AI 購物搜尋","AI Shopping Search"],
];

const MEASUREMENT_TERMS: [string,string,string][] = [
  ["ai-visibility-score","AI 能見度評分","AI Visibility Score"],
  ["citation-tracking","引用追蹤","Citation Tracking"],
  ["brand-mention-monitoring","品牌提及監測","Brand Mention Monitoring"],
  ["share-of-voice","聲量份額","Share of Voice"],
  ["ai-search-traffic","AI 搜尋流量","AI Search Traffic"],
  ["aeo-roi","AEO 投資回報","AEO ROI"],
  ["conversion-from-ai","AI 轉換率","Conversion from AI"],
  ["attribution-modeling","歸因模型","Attribution Modeling"],
  ["competitive-ai-analysis","競爭 AI 分析","Competitive AI Analysis"],
  ["aeo-readiness-score","AEO 準備度評分","AEO Readiness Score"],
];

const INDUSTRY_TERMS_DATA: [string,string,string][] = [
  ["digital-transformation","數碼轉型","Digital Transformation"],
  ["martech-stack","MarTech 技術棧","MarTech Stack"],
  ["customer-journey-mapping","客戶旅程地圖","Customer Journey Mapping"],
  ["omnichannel-marketing","全渠道營銷","Omnichannel Marketing"],
  ["data-driven-marketing","數據驅動營銷","Data-Driven Marketing"],
];

function generateFromList(terms: [string,string,string][], cat: Category): GlossaryTermPage[] {
  return terms.map(([slug, zh, en]) => {
    const relIdx = terms.map(t2 => t2[0]).filter(s => s !== slug).slice(0, 4);
    return t(slug, zh, en,
      `${zh}係 AEO 同 AI 搜尋優化中嘅關鍵概念。理解同正確應用${zh}可以幫助你嘅品牌喺 AI 搜尋引擎中獲得更高嘅能見度同推薦率。`,
      `${en} is a key concept in AEO and AI search optimization. Understanding and correctly applying ${en} helps your brand achieve higher visibility and recommendation rates in AI search engines.`,
      cat, relIdx,
      [`喺 AEO 策略中，${zh}用於提升品牌嘅 AI 搜尋能見度`,`正確實施${zh}可以增加被 ChatGPT、Perplexity 等引擎引用嘅機率`,`${zh}係 SurfIO 為客戶制定優化方案嘅核心考量之一`],
      [`In AEO strategy, ${en} is used to improve brand AI search visibility`,`Proper implementation of ${en} increases citation probability by engines like ChatGPT and Perplexity`,`${en} is one of SurfIO's core considerations when developing optimization plans for clients`],
      `${zh}直接影響你嘅品牌喺 AI 搜尋結果中嘅表現。隨住越來越多用戶依賴 AI 搜尋引擎搵答案，掌握${zh}嘅最佳實踐變得至關重要。`,
      `${en} directly impacts your brand's performance in AI search results. As more users rely on AI search engines for answers, mastering ${en} best practices becomes critical.`,
      [[`咩係${zh}？`,`${zh}係 AI 搜尋優化（AEO）中嘅重要概念，幫助品牌提升喺 ChatGPT、Perplexity、Google AI Overview 等平台嘅能見度。`],[`${zh}對 AEO 有咩影響？`,`正確應用${zh}可以顯著提升你嘅品牌被 AI 引擎推薦嘅機率，從而帶來更多流量同潛在客戶。`],[`點樣開始優化${zh}？`,`建議先進行 AEO 審計評估現狀，然後根據結果制定針對${zh}嘅優化策略。SurfIO 提供免費審計服務。`]],
      [[`What is ${en}?`,`${en} is an important concept in AI search optimization (AEO), helping brands improve visibility on platforms like ChatGPT, Perplexity, and Google AI Overview.`],[`How does ${en} impact AEO?`,`Proper application of ${en} can significantly increase your brand's probability of being recommended by AI engines, driving more traffic and potential customers.`],[`How to start optimizing ${en}?`,`Start with an AEO audit to assess your current state, then develop an optimization strategy targeting ${en}. SurfIO offers free audit services.`]]
    );
  });
}

function generateTechnicalSeoTerms(): GlossaryTermPage[] { return generateFromList(TECH_SEO_TERMS, "Technical SEO"); }
function generateContentTerms(): GlossaryTermPage[] { return generateFromList(CONTENT_TERMS, "Content Optimization"); }
function generateAiEngineTerms(): GlossaryTermPage[] { return generateFromList(AI_ENGINE_TERMS, "AI Engines"); }
function generateMeasurementTerms(): GlossaryTermPage[] { return generateFromList(MEASUREMENT_TERMS, "Measurement"); }
function generateIndustryTerms(): GlossaryTermPage[] { return generateFromList(INDUSTRY_TERMS_DATA, "Industry Terms"); }
