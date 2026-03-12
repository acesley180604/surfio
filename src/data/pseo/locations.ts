// ============================
// Cluster C: Location Pages
// 18 HK districts + 10 GBA cities + 11 overseas = 39 pages
// ============================

import {
  type LocationData,
  HK_DISTRICTS,
  GBA_CITIES,
  OVERSEAS_CITIES,
  pickVariant,
} from "./types";

// --- HK District local context data ---
const HK_DISTRICT_DATA: Record<string, {
  context: string;
  industries: string[];
  statValues: [string, string, string];
  statLabels: [string, string, string];
  nearby: string[];
}> = {
  "central-western": {
    context: "中西區係香港嘅金融同商業核心，中環、金鐘雲集國際銀行、律師事務所同跨國企業總部。呢個地區嘅企業對數碼營銷要求極高，而家更加需要喺 AI 搜尋引擎建立存在感。\n\n隨住越來越多高淨值客戶用 ChatGPT 同 Perplexity 搵專業服務，中西區嘅金融機構同專業服務公司如果喺 AI 搜尋入面缺席，等於放棄咗最有價值嘅潛在客戶群。\n\nSurfIO 喺香港科學園成立，深明中西區企業嘅需求——我哋幫你喺 AI 時代繼續保持行業領導地位。",
    industries: ["金融服務", "法律服務", "管理顧問", "會計師", "商業地產", "私人銀行"],
    statValues: ["+420%", "8,500+", "72%"],
    statLabels: ["AI 搜尋能見度提升", "區內企業數目", "用 AI 搵專業服務嘅比例"],
    nearby: ["wan-chai", "southern", "yau-tsim-mong"],
  },
  "wan-chai": {
    context: "灣仔區以會展中心同商業服務聞名，匯聚大量中型企業、專業服務公司同創意機構。灣仔同銅鑼灣一帶亦係零售同餐飲業嘅熱點。\n\n灣仔嘅企業面對激烈競爭，特別喺會展、活動策劃同商業服務領域。AI 搜尋正在改變客戶搵服務嘅方式——如果你嘅公司未被 ChatGPT 推薦，你已經落後。\n\n我哋嘅 AEO 策略特別適合灣仔嘅混合型商業環境，幫你喺唔同行業嘅 AI 查詢中脫穎而出。",
    industries: ["會展服務", "活動策劃", "商業服務", "零售", "餐飲", "創意設計"],
    statValues: ["+350%", "6,200+", "65%"],
    statLabels: ["AI 推薦率增長", "區內商業登記", "企業主用 AI 搜尋嘅比例"],
    nearby: ["central-western", "eastern", "yau-tsim-mong"],
  },
  "eastern": {
    context: "東區涵蓋北角、鰂魚涌同太古，係港島東嘅商業重地。太古坊嘅甲級寫字樓群吸引大量科技公司、金融機構同國際企業。\n\n東區嘅企業數碼化程度高，對新興營銷渠道嘅接受度亦高。隨住 AI 搜尋成為主流，呢個地區嘅企業特別適合率先採用 AEO 策略。\n\nSurfIO 幫東區嘅科技同商業企業搶佔 AI 搜尋先機，令你嘅品牌喺 ChatGPT、Perplexity 同 Google AI Overview 度被優先推薦。",
    industries: ["科技", "金融", "國際貿易", "會計", "法律", "物業管理"],
    statValues: ["+380%", "5,800+", "70%"],
    statLabels: ["AI 能見度提升", "區內企業數目", "B2B 採用 AI 搜尋比例"],
    nearby: ["wan-chai", "kwun-tong", "southern"],
  },
  "southern": {
    context: "南區包括黃竹坑、鴨脷洲同赤柱，近年因黃竹坑工廈活化而成為創意產業同初創企業嘅新據點。數碼港亦位於呢個區域，孕育大量 fintech 同科技初創。\n\n南區嘅初創企業資源有限但需要快速增長，AEO 正正係最具成本效益嘅獲客策略。AI 搜尋引擎偏好推薦專注特定領域嘅品牌。\n\n我哋幫南區嘅初創同創意企業用最少嘅預算獲得最大嘅 AI 搜尋曝光。",
    industries: ["初創企業", "Fintech", "創意設計", "數碼營銷", "藝術文化", "教育"],
    statValues: ["+500%", "2,100+", "3x"],
    statLabels: ["初創 AI 能見度增長", "區內活躍初創數", "AEO 獲客效率提升"],
    nearby: ["central-western", "wan-chai", "eastern"],
  },
  "yau-tsim-mong": {
    context: "油尖旺區涵蓋尖沙咀、旺角同油麻地，係香港最繁忙嘅商業零售區之一。尖沙咀嘅酒店、零售同旅遊業企業密度全港最高。\n\n呢個地區嘅商戶面對極度激烈嘅競爭。AI 搜尋正在改變遊客同消費者搵商戶嘅方式——當人哋問 ChatGPT「尖沙咀邊間餐廳好」，你嘅餐廳會唔會被推薦？\n\n我哋嘅本地 AEO 策略專為油尖旺嘅零售、餐飲同服務業設計，確保你喺 AI 本地搜尋中脫穎而出。",
    industries: ["零售", "酒店", "旅遊", "餐飲", "美容", "珠寶"],
    statValues: ["+290%", "15,000+", "58%"],
    statLabels: ["零售 AI 推薦率增長", "區內商戶數目", "遊客用 AI 搵推薦比例"],
    nearby: ["sham-shui-po", "kowloon-city", "central-western"],
  },
  "sham-shui-po": {
    context: "深水埗近年經歷大規模轉型，由傳統社區變成創科同設計嘅新聚點。大南街一帶嘅咖啡店、設計工作室同共享空間令呢個區域充滿活力。\n\n深水埗嘅小型企業同獨立品牌特別適合 AEO——AI 搜尋引擎唔係睇品牌大小，而係睇內容質素同相關性。\n\n我哋幫深水埗嘅獨立品牌同小商戶用 AEO 策略同大品牌競爭 AI 搜尋推薦位。",
    industries: ["設計", "時裝", "咖啡店", "共享空間", "電子產品", "手工藝"],
    statValues: ["+460%", "4,300+", "80%"],
    statLabels: ["小品牌 AI 能見度增長", "區內小商戶數", "細品牌可超越大品牌嘅比例"],
    nearby: ["yau-tsim-mong", "kowloon-city", "kwai-tsing"],
  },
  "kowloon-city": {
    context: "九龍城區包括何文田、土瓜灣同九龍城寨公園一帶，以多元文化同餐飲聞名。啟德發展區正為呢個地區帶來新嘅商業機遇。\n\n九龍城嘅餐飲業同專業服務正面臨數碼轉型。AI 搜尋已經成為新一代消費者搵餐廳同服務嘅主要渠道。\n\n我哋幫九龍城嘅企業建立 AI 搜尋存在感，把握啟德發展帶來嘅新客群。",
    industries: ["餐飲", "教育", "醫療", "專業服務", "地產", "文化旅遊"],
    statValues: ["+320%", "3,900+", "55%"],
    statLabels: ["餐飲 AI 推薦增長", "區內商業登記", "消費者用 AI 搵餐廳比例"],
    nearby: ["yau-tsim-mong", "wong-tai-sin", "kwun-tong"],
  },
  "wong-tai-sin": {
    context: "黃大仙區以黃大仙祠聞名，係一個以住宅為主嘅社區。區內有大量本地服務企業，包括診所、補習社同零售商戶。\n\n黃大仙嘅本地企業需要觸及區內居民。AI 搜尋嘅本地化功能令「附近嘅診所」、「黃大仙補習社推薦」呢類查詢越來越多。\n\n我哋嘅本地 AEO 策略幫黃大仙嘅社區商戶喺 AI 本地搜尋中排名靠前。",
    industries: ["診所", "教育補習", "零售", "餐飲", "家居服務", "宗教旅遊"],
    statValues: ["+280%", "2,800+", "63%"],
    statLabels: ["本地 AI 搜尋增長", "區內商戶數", "居民用 AI 搵本地服務比例"],
    nearby: ["kowloon-city", "kwun-tong", "sha-tin"],
  },
  "kwun-tong": {
    context: "觀塘區經歷工廈活化後成為香港最重要嘅創科中心之一。大量科技公司、數碼營銷機構同初創企業進駐，形成充滿活力嘅創科生態。\n\n觀塘嘅科技企業對 AI 搜尋優化嘅需求最為迫切——佢哋嘅客戶本身就係數碼原住民，習慣用 AI 助手搵解決方案。\n\n我哋特別了解觀塘創科社區嘅需求，提供符合科技企業節奏嘅 AEO 服務。",
    industries: ["科技", "數碼營銷", "初創企業", "共享辦公", "設計", "電商"],
    statValues: ["+520%", "7,200+", "78%"],
    statLabels: ["科技企業 AI 能見度", "區內企業數", "科技人用 AI 搜尋比例"],
    nearby: ["wong-tai-sin", "kowloon-city", "sai-kung"],
  },
  "kwai-tsing": {
    context: "葵青區係香港嘅物流同工業重鎮，葵涌貨櫃碼頭係全球最繁忙嘅港口之一。區內亦有大量製造業同倉儲企業。\n\n葵青嘅 B2B 企業需要喺 AI 搜尋中建立存在感。當採購經理問 ChatGPT「香港物流公司推薦」，你嘅公司要出現。\n\n我哋幫葵青嘅物流同工業企業優化 AI 搜尋能見度，搶佔 B2B 查詢嘅推薦位。",
    industries: ["物流", "倉儲", "製造業", "貿易", "運輸", "工程"],
    statValues: ["+340%", "4,100+", "52%"],
    statLabels: ["B2B AI 能見度增長", "區內工商登記", "採購人員用 AI 比例"],
    nearby: ["tsuen-wan", "sham-shui-po", "tuen-mun"],
  },
  "tsuen-wan": {
    context: "荃灣區係新界嘅商業中心之一，荃灣市中心有多個大型商場同商業大廈。近年荃灣亦吸引咗唔少中小企同專業服務公司進駐。\n\n荃灣嘅商戶服務新界西北嘅龐大人口，AI 搜尋正在成為呢個區域消費者搵服務嘅新方式。\n\n我哋幫荃灣企業用 AEO 覆蓋新界西北嘅龐大市場。",
    industries: ["零售", "餐飲", "教育", "醫療", "美容", "家居服務"],
    statValues: ["+310%", "5,500+", "60%"],
    statLabels: ["本地商戶 AI 能見度", "區內活躍商戶", "消費者 AI 搜尋增長率"],
    nearby: ["kwai-tsing", "tuen-mun", "yuen-long"],
  },
  "tuen-mun": {
    context: "屯門區位於新界西北，以住宅社區同工業區為主。屯門市中心嘅商業活動活躍，服務龐大嘅本地居民群。\n\n屯門嘅企業主要服務本地社區，AI 搜尋嘅本地化趨勢對佢哋特別有利。「屯門邊間牙醫好」呢類 AI 查詢正在急增。\n\n我哋幫屯門嘅本地企業搶佔 AI 本地搜尋嘅推薦位。",
    industries: ["診所", "教育", "零售", "餐飲", "家居服務", "汽車"],
    statValues: ["+270%", "3,600+", "57%"],
    statLabels: ["本地 AI 搜尋能見度", "區內商戶數", "居民 AI 搜尋使用率"],
    nearby: ["yuen-long", "tsuen-wan", "kwai-tsing"],
  },
  "yuen-long": {
    context: "元朗區正經歷快速發展，洪水橋新發展區同元朗市中心嘅擴展為區內帶來大量新商機。元朗嘅餐飲業同本地服務業特別蓬勃。\n\n隨住人口增長，元朗嘅企業需要更有效嘅獲客策略。AI 搜尋令小型本地企業可以同連鎖品牌競爭。\n\n我哋幫元朗嘅企業利用 AEO 把握新發展區帶來嘅龐大機遇。",
    industries: ["餐飲", "地產", "教育", "零售", "物流", "農業科技"],
    statValues: ["+360%", "4,800+", "61%"],
    statLabels: ["新區企業 AI 能見度", "區內商業登記", "新居民 AI 搜尋率"],
    nearby: ["tuen-mun", "north", "tsuen-wan"],
  },
  "north": {
    context: "北區毗鄰深圳，係香港嘅北部都會區核心之一。北區嘅企業服務跨境客群，深港合作帶來大量商機。\n\n北部都會區嘅發展令北區成為新嘅商業熱點。跨境企業需要喺兩地嘅 AI 搜尋引擎都建立存在感。\n\n我哋嘅跨境 AEO 策略幫北區企業同時觸及香港同深圳嘅 AI 搜尋用戶。",
    industries: ["跨境貿易", "物流", "教育", "零售", "餐飲", "地產"],
    statValues: ["+400%", "2,900+", "68%"],
    statLabels: ["跨境 AI 搜尋能見度", "區內企業數", "跨境 AI 搜尋用戶比例"],
    nearby: ["tai-po", "yuen-long", "sha-tin"],
  },
  "tai-po": {
    context: "大埔區以科學園為核心，係香港嘅科技創新重鎮。大埔科學園有超過 1,000 間科技公司，係 SurfIO 嘅根據地。\n\n科學園嘅科技企業最明白 AI 搜尋嘅重要性。佢哋嘅潛在客戶同投資者都積極使用 AI 搜尋工具。\n\n作為科學園嘅一份子，SurfIO 最了解大埔科技社區嘅需求，提供最切合科技企業嘅 AEO 服務。",
    industries: ["科技", "生物科技", "初創企業", "教育", "環保科技", "研發"],
    statValues: ["+550%", "1,000+", "85%"],
    statLabels: ["科學園企業 AI 能見度", "科學園入駐企業", "科技人 AI 搜尋使用率"],
    nearby: ["sha-tin", "north", "sai-kung"],
  },
  "sha-tin": {
    context: "沙田區係新界嘅核心城市，人口密度高，商業活動活躍。沙田市中心嘅新城市廣場同科學園為區內提供大量商機。中文大學亦位於沙田。\n\n沙田嘅企業服務龐大嘅新界東人口。教育機構、醫療服務同零售業特別需要 AI 搜尋能見度。\n\n我哋幫沙田嘅企業覆蓋新界東嘅龐大市場，喺 AI 搜尋中搶佔先機。",
    industries: ["教育", "零售", "醫療", "餐飲", "科技", "補習"],
    statValues: ["+330%", "6,800+", "64%"],
    statLabels: ["教育機構 AI 能見度", "區內商戶數", "家長用 AI 搵教育服務比例"],
    nearby: ["tai-po", "wong-tai-sin", "sai-kung"],
  },
  "sai-kung": {
    context: "西貢區包括將軍澳新市鎮，係香港發展最快嘅住宅區之一。將軍澳嘅年輕家庭人口帶動大量教育、醫療同生活服務需求。\n\n西貢嘅商戶面對嘅消費群以年輕、數碼化嘅家庭為主，佢哋係 AI 搜尋嘅重度使用者。\n\n我哋幫西貢嘅企業觸及呢批數碼原住民消費者，用 AEO 建立 AI 搜尋優勢。",
    industries: ["教育", "醫療", "餐飲", "健身", "零售", "親子服務"],
    statValues: ["+370%", "3,200+", "73%"],
    statLabels: ["本地服務 AI 能見度", "區內商戶數", "年輕家庭 AI 搜尋率"],
    nearby: ["sha-tin", "kwun-tong", "tai-po"],
  },
  "islands": {
    context: "離島區包括大嶼山、長洲同南丫島。東涌新市鎮嘅快速發展同機場嘅存在令離島區嘅商業潛力不斷提升。\n\n離島嘅旅遊業同本地服務需要獨特嘅 AEO 策略。遊客同居民都用 AI 搜尋探索離島嘅服務同景點。\n\n我哋幫離島企業用 AEO 吸引旅客同新居民，喺 AI 搜尋中突顯離島嘅獨特魅力。",
    industries: ["旅遊", "酒店", "餐飲", "零售", "物流", "航空"],
    statValues: ["+250%", "1,800+", "71%"],
    statLabels: ["旅遊 AI 搜尋能見度", "區內商戶數", "遊客用 AI 搜尋比例"],
    nearby: ["tsuen-wan", "southern", "kwai-tsing"],
  },
};

// --- GBA City data ---
const GBA_CITY_DATA: Record<string, {
  context: string;
  industries: string[];
  statValues: [string, string, string];
  statLabels: [string, string, string];
  nearby: string[];
}> = {
  shenzhen: {
    context: "深圳係大灣區嘅科技之都，擁有華為、騰訊、大疆等科技巨頭。深圳同香港嘅深度融合令跨境 AI 搜尋優化需求急增。\n\n深圳嘅企業要同時面對百度、Google 同 AI 搜尋引擎嘅多平台挑戰。跨境企業尤其需要雙語 AEO 策略。\n\nSurfIO 幫深圳企業建立跨平台、跨語言嘅 AI 搜尋能見度。",
    industries: ["科技", "電子製造", "金融科技", "跨境電商", "硬件", "AI"],
    statValues: ["+480%", "380 萬+", "76%"],
    statLabels: ["跨境 AI 能見度增長", "企業登記數", "企業用 AI 搵供應商比例"],
    nearby: ["guangzhou", "dongguan", "huizhou"],
  },
  guangzhou: {
    context: "廣州係華南嘅商業中心，貿易、製造同服務業發達。廣交會嘅所在地，廣州嘅企業天然面向國際市場。\n\n廣州嘅外貿企業需要喺國際 AI 搜尋引擎建立存在感。當海外買家用 ChatGPT 搵供應商，你嘅工廠要被推薦。\n\n我哋嘅國際 AEO 策略幫廣州外貿企業觸及全球 AI 搜尋用戶。",
    industries: ["外貿", "製造", "批發", "物流", "餐飲", "汽車"],
    statValues: ["+390%", "310 萬+", "68%"],
    statLabels: ["外貿企業 AI 能見度", "企業登記數", "國際買家 AI 搜尋率"],
    nearby: ["shenzhen", "foshan", "dongguan"],
  },
  zhuhai: {
    context: "珠海係大灣區西岸嘅核心城市，港珠澳大橋連接香港同珠海。珠海嘅旅遊業、科技園同橫琴合作區帶來獨特嘅商業機遇。\n\n珠海嘅企業可以利用 AEO 觸及香港、澳門同內地嘅多語言 AI 搜尋用戶。",
    industries: ["旅遊", "科技", "會展", "教育", "生物醫藥", "文創"],
    statValues: ["+350%", "45 萬+", "62%"],
    statLabels: ["跨境 AI 搜尋能見度", "企業登記數", "旅客 AI 搜尋使用率"],
    nearby: ["macau", "zhongshan", "jiangmen"],
  },
  foshan: {
    context: "佛山係中國嘅製造業重鎮，陶瓷、家具、家電等產業聞名全國。佛山嘅 B2B 企業需要喺國際採購嘅 AI 搜尋渠道建立存在感。",
    industries: ["製造業", "陶瓷", "家具", "家電", "建材", "機械"],
    statValues: ["+310%", "98 萬+", "55%"],
    statLabels: ["B2B AI 推薦增長", "企業登記數", "採購經理 AI 搜尋率"],
    nearby: ["guangzhou", "zhongshan", "zhaoqing"],
  },
  dongguan: {
    context: "東莞嘅製造業正在轉型升級，由「世界工廠」走向智能製造。東莞嘅企業需要用 AI 搜尋優化吸引國際客戶同投資者。",
    industries: ["電子製造", "玩具", "紡織", "智能製造", "物流", "外貿"],
    statValues: ["+370%", "134 萬+", "59%"],
    statLabels: ["製造業 AI 能見度", "企業登記數", "國際買家 AI 查詢增長"],
    nearby: ["shenzhen", "guangzhou", "huizhou"],
  },
  zhongshan: {
    context: "中山係大灣區嘅宜居城市，深中通道開通後同深圳聯繫更加緊密。中山嘅燈飾、家電同食品產業有獨特嘅 AEO 機會。",
    industries: ["燈飾", "家電", "食品", "服裝", "教育", "旅遊"],
    statValues: ["+290%", "52 萬+", "51%"],
    statLabels: ["特色產業 AI 能見度", "企業登記數", "AI 搜尋使用增長率"],
    nearby: ["zhuhai", "foshan", "jiangmen"],
  },
  huizhou: {
    context: "惠州係大灣區嘅東部門戶，以石化、電子同旅遊業為主。惠州嘅企業可以利用 AEO 觸及深圳同香港嘅商業客群。",
    industries: ["石化", "電子", "旅遊", "農業", "新能源", "地產"],
    statValues: ["+260%", "78 萬+", "48%"],
    statLabels: ["企業 AI 能見度增長", "企業登記數", "跨城 AI 搜尋比例"],
    nearby: ["shenzhen", "dongguan", "guangzhou"],
  },
  jiangmen: {
    context: "江門係僑鄉，海外華人人脈豐富。江門嘅企業可以利用 AEO 觸及全球華人市場同海外採購商。",
    industries: ["摩托車", "造紙", "食品", "紡織", "五金", "旅遊"],
    statValues: ["+240%", "62 萬+", "45%"],
    statLabels: ["僑鄉企業 AI 能見度", "企業登記數", "海外華人 AI 搜尋率"],
    nearby: ["zhongshan", "zhuhai", "foshan"],
  },
  zhaoqing: {
    context: "肇慶係大灣區嘅西翼城市，以自然資源同製造業為主。肇慶嘅企業可以利用低成本優勢同 AEO 策略觸及更廣泛嘅市場。",
    industries: ["建材", "陶瓷", "旅遊", "農業", "新能源", "物流"],
    statValues: ["+220%", "41 萬+", "42%"],
    statLabels: ["企業 AI 能見度增長", "企業登記數", "B2B AI 搜尋採用率"],
    nearby: ["foshan", "guangzhou", "jiangmen"],
  },
  macau: {
    context: "澳門嘅博彩旅遊業同 MICE（會議展覽）產業需要獨特嘅 AEO 策略。橫琴深合區為澳門企業提供新嘅發展空間。\n\n澳門嘅酒店同娛樂企業需要喺國際旅客嘅 AI 搜尋中被推薦。",
    industries: ["酒店", "博彩", "會展", "餐飲", "零售", "文創"],
    statValues: ["+330%", "7.8 萬+", "74%"],
    statLabels: ["旅遊 AI 搜尋能見度", "企業登記數", "國際旅客 AI 搜尋率"],
    nearby: ["zhuhai", "zhongshan", "guangzhou"],
  },
};

// --- Overseas city data ---
const OVERSEAS_CITY_DATA: Record<string, {
  context: string;
  industries: string[];
  statValues: [string, string, string];
  statLabels: [string, string, string];
  nearby: string[];
}> = {
  vancouver: {
    context: "溫哥華係加拿大華人最密集嘅城市，粵語社區龐大。溫哥華嘅華人企業需要喺中英文 AI 搜尋引擎同時建立存在感。\n\n當華人移民用 ChatGPT 搵「溫哥華最好嘅粵菜」或「溫哥華華人會計師」，你嘅品牌需要出現。",
    industries: ["地產", "移民顧問", "餐飲", "教育", "會計", "法律"],
    statValues: ["+410%", "25 萬+", "79%"],
    statLabels: ["華人企業 AI 能見度", "華人人口", "華人社區 AI 搜尋率"],
    nearby: ["toronto", "san-francisco", "los-angeles"],
  },
  toronto: {
    context: "多倫多係加拿大最大嘅城市，擁有龐大嘅華人社區。多倫多嘅華人商業網絡覆蓋金融、地產、教育同專業服務。",
    industries: ["金融", "地產", "教育", "移民", "保險", "科技"],
    statValues: ["+380%", "70 萬+", "76%"],
    statLabels: ["華人商業 AI 能見度", "華裔人口", "華人消費者 AI 搜尋率"],
    nearby: ["vancouver", "new-york", "london"],
  },
  "san-francisco": {
    context: "三藩市係美國西岸嘅科技同金融中心，華人社區歷史悠久。矽谷嘅華人科技人才同企業家特別善於使用 AI 搜尋工具。",
    industries: ["科技", "金融", "餐飲", "法律", "教育", "地產"],
    statValues: ["+450%", "18 萬+", "85%"],
    statLabels: ["科技圈 AI 能見度", "華裔人口", "科技人 AI 搜尋使用率"],
    nearby: ["los-angeles", "vancouver", "new-york"],
  },
  "los-angeles": {
    context: "洛杉磯擁有全美最大嘅華人社區之一，聖蓋博谷嘅華人商業區規模龐大。洛杉磯嘅華人企業橫跨餐飲、地產、醫療同教育。",
    industries: ["餐飲", "地產", "醫療", "教育", "娛樂", "美容"],
    statValues: ["+370%", "65 萬+", "77%"],
    statLabels: ["華人社區 AI 能見度", "華裔人口", "華人 AI 搜尋採用率"],
    nearby: ["san-francisco", "vancouver", "new-york"],
  },
  "new-york": {
    context: "紐約係全球金融中心，華人社區集中喺曼哈頓唐人街、法拉盛同布魯克林。紐約嘅華人專業服務需求龐大。",
    industries: ["金融", "法律", "餐飲", "地產", "會計", "移民"],
    statValues: ["+400%", "80 萬+", "81%"],
    statLabels: ["專業服務 AI 能見度", "華裔人口", "華人專業人士 AI 搜尋率"],
    nearby: ["toronto", "los-angeles", "london"],
  },
  sydney: {
    context: "悉尼係澳洲華人最集中嘅城市，華人社區喺 Chatswood、Hurstville 同 Burwood 特別活躍。悉尼嘅華人企業需要中英文雙語 AEO 策略。",
    industries: ["教育", "地產", "移民", "會計", "餐飲", "旅遊"],
    statValues: ["+360%", "50 萬+", "74%"],
    statLabels: ["華人企業 AI 能見度", "華裔人口", "華人消費者 AI 搜尋率"],
    nearby: ["melbourne", "singapore", "kuala-lumpur"],
  },
  melbourne: {
    context: "墨爾本係澳洲嘅文化同教育中心，擁有龐大嘅華人留學生同移民社區。Box Hill 同 Glen Waverley 嘅華人商圈非常蓬勃。",
    industries: ["教育", "餐飲", "地產", "會計", "醫療", "零售"],
    statValues: ["+340%", "35 萬+", "72%"],
    statLabels: ["教育業 AI 能見度", "華裔人口", "留學生 AI 搜尋使用率"],
    nearby: ["sydney", "singapore", "kuala-lumpur"],
  },
  london: {
    context: "倫敦係歐洲嘅金融中心，華人社區集中喺 Chinatown、Barnet 同 Croydon。倫敦嘅華人專業服務同餐飲業發達。",
    industries: ["金融", "法律", "教育", "餐飲", "科技", "地產"],
    statValues: ["+380%", "12 萬+", "78%"],
    statLabels: ["專業服務 AI 能見度", "華裔人口", "華人 AI 搜尋採用率"],
    nearby: ["manchester", "toronto", "new-york"],
  },
  manchester: {
    context: "曼徹斯特係英國北部最大嘅城市，華人社區以餐飲業同教育為主。曼城大學吸引大量華人留學生。",
    industries: ["教育", "餐飲", "零售", "科技", "地產", "物流"],
    statValues: ["+290%", "4.5 萬+", "71%"],
    statLabels: ["華人企業 AI 能見度", "華裔人口", "留學生 AI 搜尋率"],
    nearby: ["london", "toronto", "new-york"],
  },
  singapore: {
    context: "新加坡係東南亞嘅金融同科技中心，華人佔人口 74%。新加坡嘅企業同時使用中英文 AI 搜尋工具，雙語 AEO 需求極高。",
    industries: ["金融科技", "科技", "貿易", "教育", "餐飲", "物流"],
    statValues: ["+430%", "300 萬+", "82%"],
    statLabels: ["企業 AI 搜尋能見度", "華裔人口", "商業 AI 搜尋採用率"],
    nearby: ["kuala-lumpur", "sydney", "melbourne"],
  },
  "kuala-lumpur": {
    context: "吉隆坡嘅華人社區以商業同教育聞名。華人佔馬來西亞人口 23%，喺經濟領域影響力巨大。吉隆坡嘅華人企業需要多語言 AEO 策略。",
    industries: ["零售", "餐飲", "教育", "地產", "製造", "科技"],
    statValues: ["+320%", "160 萬+", "69%"],
    statLabels: ["華人企業 AI 能見度", "華裔人口 (全國)", "企業 AI 搜尋採用率"],
    nearby: ["singapore", "sydney", "melbourne"],
  },
};

// --- FAQ variant pools ---
const FAQ_POOLS_HK = [
  (loc: string): [string, string] => [`${loc}嘅企業真係需要 AEO 嗎？`, `絕對需要。${loc}嘅客戶已經開始用 AI 搜尋搵服務。如果你嘅企業唔喺 AI 搜尋結果入面，你對呢批客戶來講就係隱形嘅。越早做 AEO，競爭優勢越大。`],
  (loc: string): [string, string] => [`AEO 對${loc}嘅中小企有咩好處？`, `AEO 嘅最大優勢係唔需要大預算。AI 搜尋引擎重視內容質素多過品牌大小，${loc}嘅中小企透過精準嘅 AEO 策略可以同大品牌競爭 AI 推薦位。`],
  (loc: string): [string, string] => [`${loc}邊啲行業最適合做 AEO？`, `所有面向消費者同企業客戶嘅行業都適合。不過${loc}嘅核心行業——專業服務、零售同餐飲——特別受惠，因為呢啲行業嘅客戶最常用 AI 搜尋搵服務。`],
  (loc: string): [string, string] => [`SurfIO 喺${loc}有線下服務嗎？`, `我哋嘅總部設於香港科學園，為全港 18 區提供服務。${loc}嘅企業可以預約線上或線下會議，我哋會派專人到你嘅辦公室做初步審計。`],
  (loc: string): [string, string] => [`${loc}嘅 AEO 同其他地區有咩唔同？`, `每個地區都有獨特嘅商業環境同客戶行為。我哋會針對${loc}嘅行業特點同本地搜尋習慣制定度身嘅 AEO 策略，確保你觸及最相關嘅潛在客戶。`],
];

const FAQ_POOLS_GBA = [
  (loc: string): [string, string] => [`${loc}嘅企業點樣做跨境 AEO？`, `跨境 AEO 需要同時優化百度 AI、ChatGPT 同 Google AI Overview。SurfIO 提供中英文雙語 AEO 策略，幫${loc}企業觸及香港同國際市場。`],
  (loc: string): [string, string] => [`${loc}企業做 AEO 同純做百度 SEO 有咩唔同？`, `百度 SEO 只覆蓋一個平台。AEO 幫你喺 ChatGPT、Perplexity、Google AI Overview 同百度 AI 多平台建立存在感。${loc}嘅外向型企業尤其需要多平台策略。`],
  (loc: string): [string, string] => [`SurfIO 可以服務${loc}嘅企業嗎？`, `可以。我哋透過線上會議服務大灣區所有城市嘅企業。${loc}嘅企業可以預約免費嘅 AI 搜尋能見度審計，了解你嘅品牌喺各個 AI 平台嘅表現。`],
  (loc: string): [string, string] => [`${loc}嘅製造企業需要 AEO 嗎？`, `非常需要。國際採購商越來越常用 AI 搜尋搵供應商。如果你嘅工廠唔被 ChatGPT 推薦，你會失去大量國際訂單機會。`],
];

const FAQ_POOLS_OVERSEAS = [
  (loc: string): [string, string] => [`SurfIO 可以幫${loc}嘅華人企業嗎？`, `當然可以。我哋專門服務全球華人市場，提供中英文雙語 AEO 策略。${loc}嘅華人企業可以透過線上會議享用我哋嘅全套服務。`],
  (loc: string): [string, string] => [`${loc}嘅華人企業做 AEO 有咩獨特之處？`, `${loc}嘅華人企業需要同時喺中英文 AI 搜尋中出現。我哋嘅雙語策略確保你嘅品牌喺華人同本地客群嘅 AI 搜尋中都被推薦。`],
  (loc: string): [string, string] => [`AEO 點樣幫${loc}嘅華人企業觸及本地客戶？`, `AI 搜尋嘅本地化功能令「${loc}附近嘅華人餐廳」呢類查詢越來越多。AEO 確保你嘅企業喺呢啲本地 AI 查詢中排名靠前。`],
  (loc: string): [string, string] => [`${loc}嘅華人企業做 AEO 同 SEO 邊個更重要？`, `兩者互補。但喺 ${loc} 嘅華人社區，AI 搜尋嘅採用率已經超過 70%。AEO 正在快速超越傳統 SEO 成為獲客嘅主要渠道。`],
];

// --- Main generator ---
export function getLocationPages(): LocationData[] {
  const pages: LocationData[] = [];

  // HK Districts
  for (const district of HK_DISTRICTS) {
    const data = HK_DISTRICT_DATA[district.slug];
    if (!data) continue;
    const v = pickVariant(district.slug, FAQ_POOLS_HK.length);
    const faqCount = 3 + (v % 3); // 3-5 FAQs
    const faqs: [string, string][] = [];
    for (let i = 0; i < faqCount && i < FAQ_POOLS_HK.length; i++) {
      faqs.push(FAQ_POOLS_HK[(v + i) % FAQ_POOLS_HK.length](district.name));
    }

    pages.push({
      slug: district.slug,
      locationName: district.name,
      locationType: "hk-district",
      heroTitle: `${district.name} AEO 服務：令你嘅企業喺 AI 搜尋被搵到`,
      heroSubtitle: `SurfIO 為${district.name}嘅企業提供專業 AEO 服務，幫你喺 ChatGPT、Perplexity 同 Google AI Overview 被推薦。`,
      localContext: data.context,
      keyIndustries: data.industries,
      stats: [
        { value: data.statValues[0], label: data.statLabels[0] },
        { value: data.statValues[1], label: data.statLabels[1] },
        { value: data.statValues[2], label: data.statLabels[2] },
      ],
      faqs,
      nearbyLocations: data.nearby,
      metaTitle: `${district.name} AEO 服務 | AI 搜尋優化 - SurfIO`,
      metaDescription: `SurfIO 為${district.name}企業提供專業 AEO 服務。令你喺 ChatGPT、Perplexity 被推薦。免費 AI 搜尋能見度審計。`,
    });
  }

  // GBA Cities
  for (const city of GBA_CITIES) {
    const data = GBA_CITY_DATA[city.slug];
    if (!data) continue;
    const v = pickVariant(city.slug, FAQ_POOLS_GBA.length);
    const faqs: [string, string][] = [];
    for (let i = 0; i < 4 && i < FAQ_POOLS_GBA.length; i++) {
      faqs.push(FAQ_POOLS_GBA[(v + i) % FAQ_POOLS_GBA.length](city.name));
    }

    pages.push({
      slug: city.slug,
      locationName: city.name,
      locationType: "gba-city",
      heroTitle: `${city.name} AEO 服務：跨境 AI 搜尋優化`,
      heroSubtitle: `SurfIO 幫${city.name}企業喺國際 AI 搜尋引擎建立存在感，觸及香港同全球客戶。`,
      localContext: data.context,
      keyIndustries: data.industries,
      stats: [
        { value: data.statValues[0], label: data.statLabels[0] },
        { value: data.statValues[1], label: data.statLabels[1] },
        { value: data.statValues[2], label: data.statLabels[2] },
      ],
      faqs,
      nearbyLocations: data.nearby,
      metaTitle: `${city.name} AEO 服務 | 跨境 AI 搜尋優化 - SurfIO`,
      metaDescription: `SurfIO 為${city.name}企業提供跨境 AEO 服務。中英文雙語 AI 搜尋優化，觸及香港同國際市場。`,
    });
  }

  // Overseas Cities
  for (const city of OVERSEAS_CITIES) {
    const data = OVERSEAS_CITY_DATA[city.slug];
    if (!data) continue;
    const v = pickVariant(city.slug, FAQ_POOLS_OVERSEAS.length);
    const faqs: [string, string][] = [];
    for (let i = 0; i < 4 && i < FAQ_POOLS_OVERSEAS.length; i++) {
      faqs.push(FAQ_POOLS_OVERSEAS[(v + i) % FAQ_POOLS_OVERSEAS.length](city.name));
    }

    pages.push({
      slug: city.slug,
      locationName: city.name,
      locationType: "overseas",
      heroTitle: `${city.name}華人企業 AEO 服務：AI 搜尋優化`,
      heroSubtitle: `SurfIO 幫${city.name}嘅華人企業喺中英文 AI 搜尋引擎建立雙語存在感。`,
      localContext: data.context,
      keyIndustries: data.industries,
      stats: [
        { value: data.statValues[0], label: data.statLabels[0] },
        { value: data.statValues[1], label: data.statLabels[1] },
        { value: data.statValues[2], label: data.statLabels[2] },
      ],
      faqs,
      nearbyLocations: data.nearby,
      metaTitle: `${city.name}華人 AEO 服務 | AI 搜尋優化 - SurfIO`,
      metaDescription: `SurfIO 為${city.name}華人企業提供中英文雙語 AEO 服務。喺 ChatGPT、Perplexity 被華人同本地客戶搵到。`,
    });
  }

  return pages;
}
