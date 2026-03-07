import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "./Reveal";

const faqs: [string, string][] = [
  [
    "咩係答案引擎優化 (AEO)？",
    "答案引擎優化係優化你嘅內容嘅過程，令搜尋引擎同 AI 平台（例如 Google、Bing、ChatGPT 同 Perplexity）揀你嘅內容作為用戶問題嘅權威答案。",
  ],
  [
    "AEO 同 SEO 有咩分別？",
    "SEO 專注於喺傳統搜尋結果排名，而 AEO 專門針對 AI 驅動嘅答案引擎同精選摘要。AEO 優化嘅係 AI 系統點樣理解、引用同推薦你嘅內容。",
  ],
  [
    "點解 AEO 而家咁重要？",
    "AI 搜尋正迅速取代傳統搜尋。越來越多用戶直接從 ChatGPT、Google AI Overview 同 Perplexity 獲取答案，而唔係點擊去網站。如果你未針對呢啲平台優化，對於越來越多嘅受眾嚟講你就係隱形嘅。",
  ],
  [
    "AEO 針對邊啲平台？",
    "我哋為所有主要 AI 平台優化，包括 ChatGPT、Google AI Overview、Perplexity、Claude、Bing Chat、同語音助手如 Siri 同 Alexa。",
  ],
  [
    "你哋嘅 AEO 服務包啲咩？",
    "我哋嘅服務包括 AEO 審計、內容優化、Schema 標記、實體建設、平台專屬優化、連結建設、同持續監測同報告。",
  ],
  [
    "幾耐先見到效果？",
    "大部分客戶喺 30-60 日內開始見到 AI 能見度嘅改善。完整效果通常喺 90 日內呈現，取決於你嘅行業同競爭程度。",
  ],
  [
    "AEO 同 GEO 有咩分別？",
    "AEO（答案引擎優化）專注於出現喺 AI 生成嘅答案中。GEO（生成引擎優化）係一個更廣泛嘅術語，涵蓋為所有生成式 AI 系統優化。我哋兩者都做。",
  ],
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative overflow-hidden">
      {/* Purple gradient wave at top */}
      <motion.div
        className="h-16 bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#EC4899] opacity-60"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
      />

      {/* Dark gradient background */}
      <div className="bg-gradient-to-b from-[#1a1040] to-[#0d0820] py-16 px-5 md:px-10">
        <div className="max-w-[1100px] mx-auto">
          <Reveal>
            <h2 className="text-[28px] md:text-[34px] font-extrabold text-white text-center mb-10">
              AEO 常見問題
            </h2>
          </Reveal>

          <div className="max-w-[800px] mx-auto">
            {faqs.map(([q, a], i) => (
              <motion.div
                key={i}
                className="border-b border-white/10 cursor-pointer"
                onClick={() => setOpen(open === i ? null : i)}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <div className="flex items-center gap-4 py-5">
                  <motion.span
                    className="text-white text-[20px] font-bold shrink-0 w-5 text-center"
                    animate={{ rotate: open === i ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    +
                  </motion.span>
                  <span className="text-[15px] font-medium text-white">
                    {q}
                  </span>
                </div>
                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="text-[14px] text-gray-300 leading-[1.75] pb-5 pl-9">
                        {a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
