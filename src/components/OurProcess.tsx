import { motion } from "framer-motion";
import Reveal from "./Reveal";

const steps = [
  {
    title: "深度研究同策略",
    desc: "SurfIO 透過詳細問卷、競爭對手分析同歷史表現數據，為你制定針對性嘅 AEO 策略。我哋嘅 BrandBrain 系統會微調每個活動，突顯你品牌嘅獨特價值。",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&auto=format&fit=crop",
  },
  {
    title: "SEO + AI 優化內容",
    desc: "SurfIO 創作嘅內容同時針對搜尋引擎排名同 AI 答案引用。我哋撰寫以問題為焦點嘅文章，配合結構化格式同優化標題，令你嘅內容準備好被 AI 引擎納入回應。",
    img: "https://images.unsplash.com/photo-1542435503-956c469947f6?w=800&q=80&auto=format&fit=crop",
  },
  {
    title: "技術 AEO",
    desc: "SurfIO 為你嘅網站添加 Schema 標記、撰寫 FAQ 同優化精選摘要格式。我哋實施結構化數據增強同內部連結策略，加強你喺知識圖譜中嘅實體識別度。",
    img: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80&auto=format&fit=crop",
  },
  {
    title: "連結建設",
    desc: "SurfIO 採用白帽連結建設策略提升你網站嘅權威性。包括客座發文、失效連結建設同數碼 PR，專注於來自高域名權威網站嘅連結。",
    img: "https://images.unsplash.com/photo-1563986768609-322da13575f2?w=800&q=80&auto=format&fit=crop",
  },
];

export default function OurProcess() {
  return (
    <>
      {/* Process section - white bg */}
      <section id="process" className="py-16 px-5 md:px-10 max-w-[1100px] mx-auto">
        <Reveal>
          <div className="flex items-center gap-4 justify-center mb-4">
            <motion.div
              className="h-px bg-gray-300 w-20"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ originX: 1 }}
            />
            <h2 className="text-[28px] md:text-[34px] font-extrabold text-gray-900 font-serif italic">
              睇下我哋嘅流程
            </h2>
            <motion.div
              className="h-px bg-gray-300 w-20"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ originX: 0 }}
            />
          </div>
          <p className="text-center text-[14px] text-gray-600 leading-[1.7] mb-14 max-w-[520px] mx-auto">
            從研究到建設同優化。我哋傾盡心力打造排名前 1% 嘅效果型營銷活動。一齊睇下我哋點樣做。
          </p>
        </Reveal>

        {/* Steps */}
        <div className="space-y-0">
          {steps.map((step, i) => (
            <div key={i}>
              <motion.div
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start mb-6"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                {/* Text - left */}
                <div className="lg:pt-4">
                  <motion.h3
                    className="text-[22px] font-bold text-gray-900 mb-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    {step.title}
                  </motion.h3>
                  <p className="text-[13px] text-gray-600 leading-[1.75]">
                    {step.desc}
                  </p>
                </div>

                {/* Screenshot - right */}
                <motion.div
                  className="rounded-xl overflow-hidden bg-gray-50 border border-gray-200 shadow-sm aspect-[16/10]"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img
                    src={step.img}
                    alt={step.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </motion.div>
              </motion.div>

              {/* Animated connector between steps */}
              {i < steps.length - 1 && (
                <motion.div
                  className="flex justify-center lg:justify-end lg:pr-[25%] my-4"
                  initial={{ opacity: 0, scaleY: 0 }}
                  whileInView={{ opacity: 1, scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-[2px] h-5 bg-[#7C3AED]" />
                    <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent border-t-[#7C3AED]" />
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Tracking & Analysis - dark gradient bg */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1145] to-[#0f0a2e]" />
        <div className="relative z-10 py-16 px-5 md:px-10 max-w-[1100px] mx-auto">
          {/* Connector from above */}
          <motion.div
            className="flex justify-center mb-6"
            initial={{ opacity: 0, scaleY: 0 }}
            whileInView={{ opacity: 1, scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex flex-col items-center gap-1">
              <div className="w-[2px] h-5 bg-[#7C3AED]" />
              <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-l-transparent border-r-transparent border-t-[#7C3AED]" />
            </div>
          </motion.div>

          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start">
              <div>
                <h3 className="text-[22px] font-bold text-white mb-3">
                  追蹤同分析
                </h3>
                <p className="text-[13px] text-gray-300 leading-[1.75]">
                  SurfIO 監測你喺搜尋引擎同 AI 平台嘅能見度。我哋追蹤關鍵字排名、精選摘要同 AI 答案位置。分析結果用於持續優化策略，確保你喺 AI 搜尋中保持領先。
                </p>
              </div>

              <motion.div
                className="rounded-xl overflow-hidden bg-[#1e1650] border border-[#2a2060] shadow-lg aspect-[16/10]"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80&auto=format&fit=crop"
                  alt="Google Search Console 數據分析"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="py-16 px-5 md:px-10 max-w-[1100px] mx-auto text-center">
        <motion.div
          className="border-t border-gray-200 pt-12 mb-4"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        />
        <Reveal>
          <h2 className="text-[26px] md:text-[34px] font-extrabold text-gray-900 mb-3">
            一齊打造你嘅 AEO 增長計劃
          </h2>
          <p className="text-[14px] text-gray-600 leading-[1.7] max-w-[460px] mx-auto mb-8">
            SurfIO 提供免費 AI 搜尋能見度審計。了解你嘅品牌喺 ChatGPT、Perplexity 同 Google AI 嘅表現。
          </p>
          <motion.a
            href="https://calendly.com/acesley180604/aeo-service-free-audit-surfio"
            className="inline-block px-7 py-3 rounded-lg bg-[#7C3AED] text-white text-[14px] font-semibold hover:bg-[#6D28D9] transition-colors"
            whileHover={{ scale: 1.06, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            免費 AI 搜尋能見度審計
          </motion.a>
        </Reveal>
      </section>
    </>
  );
}
