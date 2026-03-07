import { motion } from "framer-motion";
import Reveal from "./Reveal";

const cases = [
  {
    brand: "會計師事務所",
    tagline: "香港中型會計師事務所 AI 搜尋優化",
    label: "AEO 案例 \u00b7 6 個月",
    labelBg: "bg-[#EC4899]",
    stats: [
      { value: "+340%", label: "AI 提及率\n增長" },
      { value: "+520%", label: "關鍵字\n排名增長" },
      { value: "45", label: "首頁\n排名關鍵字" },
    ],
  },
  {
    brand: "電商品牌",
    tagline: "本地電商品牌 Perplexity\n推薦覆蓋率提升",
    label: "AEO 案例 \u00b7 10 個月",
    labelBg: "bg-[#EC4899]",
    stats: [
      { value: "+280%", label: "AI 推薦\n出現率" },
      { value: "+190%", label: "內容頁面\n增長" },
      { value: "200+", label: "排名\n關鍵字" },
    ],
  },
  {
    brand: "SaaS 公司",
    tagline: "B2B SaaS 公司喺 ChatGPT\n同 Google AI 嘅能見度",
    label: "AEO 案例 \u00b7 1 年",
    labelBg: "bg-[#7C3AED]",
    stats: [
      { value: "+15%", label: "額外查詢\n來源" },
      { value: "30,000", label: "每月\n自然點擊" },
      { value: "+450%", label: "首頁排名\n增長" },
    ],
  },
];

export default function CaseStudies() {
  return (
    <section id="cases" className="py-16 px-5 md:px-10 max-w-[1100px] mx-auto">
      <Reveal>
        <div className="text-center mb-3">
          <h2 className="inline-block text-[26px] md:text-[32px] font-extrabold">
            <span className="bg-gradient-to-r from-[#EC4899] via-[#A855F7] to-[#7C3AED] bg-clip-text text-transparent">
              準備好咁樣增長？
            </span>
          </h2>
        </div>
        <p className="text-center text-[14px] text-gray-600 leading-[1.7] mb-10 max-w-[450px] mx-auto">
          超過 100 間公司已經同 SurfIO 合作，獲得穩定、高質素嘅客戶流量。
        </p>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cases.map((c, idx) => (
          <motion.div
            key={c.brand}
            className="rounded-xl overflow-hidden bg-gradient-to-br from-[#0f1629] to-[#1a1a3a] p-5 pb-6 flex flex-col justify-between min-h-[260px]"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.12, duration: 0.6 }}
            whileHover={{
              y: -8,
              transition: { type: "spring", stiffness: 300 },
            }}
          >
            <div>
              <div className="flex items-start justify-between mb-1">
                <span className="text-white font-extrabold text-[15px] tracking-wider">
                  {c.brand}
                </span>
              </div>
              <p className="text-[10px] text-gray-500 leading-[1.4] mb-3 whitespace-pre-line max-w-[180px]">
                {c.tagline}
              </p>
              <div className={`inline-block px-3 py-1 rounded-full text-[10px] font-semibold text-white ${c.labelBg}`}>
                {c.label}
              </div>
            </div>
            <div className="flex items-end gap-5 mt-4">
              {c.stats.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + idx * 0.1 + i * 0.08 }}
                >
                  <div className="text-[22px] md:text-[26px] font-extrabold text-white leading-none">
                    {s.value}
                  </div>
                  <div className="text-[9px] text-gray-500 mt-1 leading-[1.3] whitespace-pre-line">
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
