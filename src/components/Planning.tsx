import { motion } from "framer-motion";
import Reveal from "./Reveal";

export default function Planning() {
  return (
    <section className="py-16 px-5 md:px-10 max-w-[1100px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        {/* Left - Text */}
        <Reveal direction="right">
          <div>
            <h2 className="text-[28px] md:text-[34px] font-extrabold text-gray-900 leading-[1.2] mb-5">
              AEO & SEO 規劃 + 執行
            </h2>
            <p className="text-[14px] text-gray-700 leading-[1.75] mb-4">
              SurfIO 由研究同策略開始。當你確認方案後，我哋會將 AEO 實施一路做到底。
            </p>
            <p className="text-[14px] text-gray-700 leading-[1.75] mb-4">
              SurfIO 擁有 AEO 策略、網站開發、內容撰寫同 PR 級連結建設嘅全方位能力。
            </p>
            <p className="text-[14px] text-gray-700 leading-[1.75] mb-7">
              我哋嘅目標係令你嘅網站內容變成 LLM 嘅推薦素材。
            </p>
            <motion.a
              href="https://calendly.com/acesley180604/aeo-service-free-audit-surfio"
              className="inline-block px-7 py-3 rounded-lg bg-[#7C3AED] text-white text-[14px] font-semibold hover:bg-[#6D28D9] transition-colors"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              免費 AI 搜尋能見度審計
            </motion.a>
          </div>
        </Reveal>

        {/* Right - SEO & AEO Venn Diagram */}
        <Reveal delay={0.15} direction="left">
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-[420px] aspect-square">
              {/* SEO Circle */}
              <motion.div
                className="absolute left-0 top-1/2 -translate-y-1/2 w-[60%] aspect-square rounded-full bg-blue-50 border border-blue-200 flex items-center justify-start pl-[8%]"
                initial={{ x: -60, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <div className="text-left pr-[25%]">
                  <div className="text-[16px] font-extrabold text-blue-600 mb-1.5">SEO</div>
                  <div className="text-[9px] text-gray-500 leading-[1.5] space-y-[2px]">
                    <div>關鍵字優化</div>
                    <div>內容質素、深度同<br/>專業度 (E-E-A-T)</div>
                    <div>可索引性同<br/>語意內容結構</div>
                    <div>核心網頁指標</div>
                    <div>排名追蹤同<br/>CTR 優化</div>
                    <div>反向連結、引用<br/>同品牌提及</div>
                    <div>分析同能見度追蹤</div>
                  </div>
                </div>
              </motion.div>

              {/* AEO Circle */}
              <motion.div
                className="absolute right-0 top-1/2 -translate-y-1/2 w-[60%] aspect-square rounded-full bg-purple-50 border border-purple-200 flex items-center justify-end pr-[8%]"
                initial={{ x: 60, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
              >
                <div className="text-right pl-[25%]">
                  <div className="text-[16px] font-extrabold text-[#7C3AED] mb-1.5">AEO</div>
                  <div className="text-[9px] text-gray-500 leading-[1.5] space-y-[2px]">
                    <div>可引用性同渲染</div>
                    <div>監測 LLM 能見度<br/>同引用佔比</div>
                    <div>提示詞優化</div>
                    <div>對話式同<br/>精選摘要格式</div>
                    <div>實體優先結構</div>
                    <div>LLM 元數據</div>
                    <div>跨 LLM 表現指標</div>
                    <div>AI 爬蟲技術準備</div>
                    <div>延伸查詢分析</div>
                  </div>
                </div>
              </motion.div>

              {/* Center overlap */}
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              >
                <div className="w-14 h-14 rounded-full bg-white shadow-md flex items-center justify-center border border-gray-200">
                  <span className="text-[#7C3AED] font-extrabold text-[18px]">&amp;</span>
                </div>
              </motion.div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
