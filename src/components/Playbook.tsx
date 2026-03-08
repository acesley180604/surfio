import { motion } from "framer-motion";
import Reveal from "./Reveal";

const playbookItems = [
  ["AI 內容藍圖", "逐步格式化方法，令 AI 引擎揀你嘅內容嘅機率提高 73%。唔洗再寫啲石沉大海嘅文章。"],
  ["AI 搜尋 Schema 架構", "觸發 AI 結果置頂推薦嘅結構化數據組合。我哋已經搵到每個主要平台嘅有效方法。"],
  ["問題挖掘系統", "點樣搵到你嘅潛在客戶問 AI 嘅具體問題——然後成為每個問題嘅權威答案。"],
  ["BrandBrain 品牌知識庫", "我哋為你嘅公司建立全面嘅知識庫，令 AI 系統可以輕鬆引用同推薦畀潛在客戶。"],
  ["平台專屬優化", "ChatGPT 同 Google AI 同 Claude 同語音搜尋嘅策略各有唔同。每個平台嘅觸發機制唔同——我哋全部都熟。"],
];

export default function Playbook() {
  return (
    <section className="py-16 px-5 md:px-10 max-w-[1100px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
        {/* Left - Report mockup */}
        <Reveal direction="right">
          <div className="space-y-4">
            {/* Top report card */}
            <motion.div
              className="bg-white border border-gray-200 rounded-xl shadow-sm p-6"
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <p className="text-[11px] text-gray-400 mb-4">能見度報告</p>
              <div className="flex items-center justify-center mb-5">
                <div className="relative w-28 h-28">
                  <motion.div
                    className="w-full h-full rounded-full"
                    style={{ background: "conic-gradient(#22C55E 0% 37%, #E5E7EB 37% 100%)" }}
                    initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                  <div className="absolute inset-[10px] rounded-full bg-white flex items-center justify-center">
                    <motion.span
                      className="text-xl font-extrabold text-green-500"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 }}
                    >
                      37%
                    </motion.span>
                  </div>
                </div>
              </div>
              <p className="text-[12px] font-bold text-gray-900 mb-1">LLM 可讀性 & AEO 優化報告</p>
              <p className="text-[11px] font-semibold text-gray-500 mb-3">摘要</p>
              <div className="space-y-1.5">
                {[85, 70, 55, 40].map((w, i) => (
                  <motion.div
                    key={i}
                    className="h-2 bg-gray-100 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${w}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                  />
                ))}
              </div>
              <p className="text-[11px] font-bold text-gray-900 mt-4 mb-2">優先修復項目</p>
              <div className="space-y-1.5">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="flex items-center gap-2">
                    <div className="w-3.5 h-3.5 rounded bg-purple-100 flex items-center justify-center text-[8px] text-[#7C3AED] font-bold">{n}</div>
                    <div className="h-1.5 bg-gray-100 rounded-full flex-1" />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Bottom screenshot */}
            <motion.div
              className="rounded-xl overflow-hidden border border-gray-200 h-[200px]"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&auto=format&fit=crop"
                alt="數據分析儀表板"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </Reveal>

        {/* Right - Text */}
        <div>
          <Reveal delay={0.1}>
            <h2 className="text-[28px] md:text-[34px] font-extrabold text-gray-900 leading-[1.2] mb-5">
              經驗證嘅 AEO 實戰手冊
            </h2>

            <p className="text-[14px] text-gray-700 leading-[1.75] mb-5">
              我哋已經喺每個主要 AI 平台做過 AEO 實驗，精確搵出 ChatGPT、Google AI Overview 同 Claude 推薦你公司而唔係競爭對手嘅原因。
            </p>

            <p className="text-[14px] text-gray-700 leading-[1.75] mb-5">
              <strong>我哋嘅實戰手冊包括：</strong>
            </p>
          </Reveal>

          <div className="space-y-4 mb-6">
            {playbookItems.map(([title, desc], i) => (
              <motion.p
                key={title}
                className="text-[14px] text-gray-700 leading-[1.75]"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.08 }}
              >
                <strong className="text-gray-900">{title}</strong> {desc}
              </motion.p>
            ))}
          </div>

          <Reveal delay={0.4}>
            <p className="text-[14px] text-gray-700 leading-[1.75] mb-3">
              <strong className="text-gray-900">結果？</strong>你嘅客戶經理從第一日起就應用 3 年以上久經考驗嘅策略。唔會拿你嘅預算做實驗。唔會「試下先睇下點」。
            </p>

            <p className="text-[14px] text-gray-700 leading-[1.75]">
              你可以即刻使用有效嘅策略，度身訂造適合你嘅市場同方案。
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
