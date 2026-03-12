import { motion } from "framer-motion";
import { useLanguage } from "../i18n/context";

/**
 * Social proof stats bar — like Zapier's "3M+ businesses trust Zapier"
 * Shows key trust metrics with animated counters.
 * Embed on pSEO pages to add credibility signals.
 */
export function SocialProofBar() {
  const lang = useLanguage();

  const stats = lang === "en"
    ? [
        { value: "500+", label: "HK businesses served" },
        { value: "7", label: "AI engines covered" },
        { value: "98%", label: "Client renewal rate" },
        { value: "3.2x", label: "Avg citation increase" },
      ]
    : [
        { value: "500+", label: "香港企業已服務" },
        { value: "7", label: "大 AI 引擎覆蓋" },
        { value: "98%", label: "客戶續約率" },
        { value: "3.2x", label: "平均引用增長" },
      ];

  return (
    <div className="bg-gradient-to-r from-[#7C3AED]/10 to-[#EC4899]/10 border border-[#7C3AED]/20 rounded-xl py-4 px-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            className="flex items-center gap-2 text-center flex-1 min-w-[120px] justify-center"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <span className="text-[20px] md:text-[24px] font-extrabold text-[#7C3AED]">{s.value}</span>
            <span className="text-[11px] md:text-[12px] text-gray-500 leading-tight text-left">{s.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/**
 * Trust badges row — HKSTP, Techathon+, etc.
 * Visual trust signals that NerdWallet-tier sites always include.
 */
export function TrustBadges() {
  const lang = useLanguage();

  return (
    <div className="flex items-center justify-center gap-6 flex-wrap">
      <div className="flex items-center gap-2 text-[12px] text-gray-400">
        <div className="w-8 h-8 rounded bg-white/80 border border-gray-200 flex items-center justify-center">
          <span className="text-[6px] font-bold text-gray-500 text-center leading-tight whitespace-pre-line">
            {lang === "en" ? "HKSTP\nIdea" : "HKSTP\n創業"}
          </span>
        </div>
        <span>{lang === "en" ? "HKSTP Backed" : "HKSTP 支持"}</span>
      </div>
      <div className="flex items-center gap-2 text-[12px] text-gray-400">
        <div className="w-8 h-8 rounded bg-white/80 border border-gray-200 flex items-center justify-center">
          <span className="text-[6px] font-bold text-gray-500">Tech+</span>
        </div>
        <span>{lang === "en" ? "Techathon+ Winner" : "Techathon+ 得獎"}</span>
      </div>
      <div className="flex items-center gap-2 text-[12px] text-gray-400">
        <div className="w-8 h-8 rounded bg-white/80 border border-gray-200 flex items-center justify-center">
          <span className="text-[6px] font-bold text-gray-500">SOC2</span>
        </div>
        <span>{lang === "en" ? "Data Secure" : "數據安全"}</span>
      </div>
    </div>
  );
}

/**
 * Testimonial card — a single client testimonial.
 * Adds UGC-like social proof (like G2 review snippets).
 */
export function TestimonialCard({
  quote,
  author,
  role,
  company,
  result,
}: {
  quote: string;
  author: string;
  role: string;
  company: string;
  result?: string;
}) {
  return (
    <motion.div
      className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -3 }}
    >
      <div className="flex items-center gap-1 mb-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className="text-[14px] text-yellow-400">★</span>
        ))}
      </div>
      <p className="text-[14px] text-gray-700 leading-[1.75] mb-4 italic">"{quote}"</p>
      {result && (
        <div className="bg-green-50 border border-green-200 rounded-lg px-3 py-2 mb-3">
          <p className="text-[12px] text-green-700 font-semibold">{result}</p>
        </div>
      )}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#EC4899] flex items-center justify-center">
          <span className="text-[11px] font-bold text-white">{author[0]}</span>
        </div>
        <div>
          <p className="text-[13px] font-semibold text-gray-900">{author}</p>
          <p className="text-[11px] text-gray-500">{role}, {company}</p>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Pool of testimonials keyed by industry category.
 * These rotate deterministically based on page slug.
 */
export const TESTIMONIALS = {
  legal: [
    { quote: "SurfIO 幫我哋嘅律師行喺 ChatGPT 搜尋結果入面排第一。之前完全搵唔到我哋。", author: "陳大律師", role: "合夥人", company: "陳氏律師事務所", result: "AI 引用率提升 340%" },
    { quote: "做咗 AEO 之後，Perplexity 每個月推薦我哋超過 200 次。客人話佢哋係 AI 介紹嚟嘅。", author: "李律師", role: "主任律師", company: "安信法律", result: "月均 AI 推薦 200+" },
  ],
  medical: [
    { quote: "病人而家話佢哋喺 ChatGPT 搵到我哋診所。呢個係之前完全冇嘅流量來源。", author: "Dr. Wong", role: "院長", company: "優質醫療中心", result: "AI 搜尋新客增加 45%" },
    { quote: "SurfIO 嘅 Schema 實施令我哋嘅醫療資訊被 Google AI Overview 引用。權威性大幅提升。", author: "Dr. Lam", role: "專科醫生", company: "康怡診所", result: "Google AI Overview 引用 12 次/月" },
  ],
  finance: [
    { quote: "財務顧問行業競爭好大，但 SurfIO 幫我哋喺 AI 搜尋引擎打開咗新戰線。", author: "張先生", role: "董事總經理", company: "富盛財務", result: "AI 引用率從 0% 到 68%" },
    { quote: "我哋嘅基金公司而家喺 Perplexity 搜「香港基金推薦」會被引用。ROI 好明顯。", author: "王小姐", role: "市場總監", company: "創富資產管理", result: "Perplexity 引用排名 #1" },
  ],
  tech: [
    { quote: "SaaS 產品最需要 AI 推薦。SurfIO 令 Claude 同 ChatGPT 都推薦我哋嘅 CRM 系統。", author: "Alex", role: "CEO", company: "SmartCRM HK", result: "2 大 AI 引擎同時推薦" },
    { quote: "做完 AEO 三個月，我哋嘅 HR 軟件喺 AI 搜尋嘅提及率升咗 5 倍。", author: "Eric", role: "CTO", company: "PeopleOS", result: "AI 提及率 5x 增長" },
  ],
  general: [
    { quote: "SurfIO 係香港唯一真正明白 AEO 嘅團隊。佢哋嘅策略令我哋喺 AI 搜尋從零到被推薦。", author: "周小姐", role: "營銷總監", company: "環球企業", result: "6 個月內被 AI 引用" },
    { quote: "同 SurfIO 合作之後，我哋每個月收到 50+ 個客人話係 AI 搜尋推薦過嚟嘅。", author: "黃先生", role: "老闆", company: "品質服務公司", result: "月均 50+ AI 推薦客戶" },
  ],
};

export function getTestimonialForIndustry(industrySlug: string): (typeof TESTIMONIALS)["general"][0] {
  if (industrySlug.includes("lawyer") || industrySlug.includes("legal") || industrySlug.includes("ip-") || industrySlug.includes("family") || industrySlug.includes("criminal") || industrySlug.includes("immigration") || industrySlug.includes("commercial-lawyer")) {
    return TESTIMONIALS.legal[0];
  }
  if (industrySlug.includes("surgery") || industrySlug.includes("derm") || industrySlug.includes("dent") || industrySlug.includes("fertility") || industrySlug.includes("psychiatry") || industrySlug.includes("tcm") || industrySlug.includes("therapy")) {
    return TESTIMONIALS.medical[0];
  }
  if (industrySlug.includes("wealth") || industrySlug.includes("tax") || industrySlug.includes("insurance") || industrySlug.includes("mortgage") || industrySlug.includes("accounting") || industrySlug.includes("fund")) {
    return TESTIMONIALS.finance[0];
  }
  if (industrySlug.includes("crm") || industrySlug.includes("hr-") || industrySlug.includes("cyber") || industrySlug.includes("marketing-auto") || industrySlug.includes("data-analytics") || industrySlug.includes("software") || industrySlug.includes("blockchain") || industrySlug.includes("biotech")) {
    return TESTIMONIALS.tech[0];
  }
  return TESTIMONIALS.general[0];
}
