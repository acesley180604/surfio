import { motion } from "framer-motion";
import Reveal from "./Reveal";

export default function Experts() {
  return (
    <section id="about" className="py-16 px-5 md:px-10 max-w-[1100px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
        {/* Left - Text */}
        <Reveal direction="right">
          <div>
            <h2 className="text-[28px] md:text-[34px] font-extrabold text-gray-900 leading-[1.2] mb-5">
              AEO 領域嘅領先專家
            </h2>

            <p className="text-[14px] text-gray-700 leading-[1.75] mb-4">
              跳過學習曲線，即刻啟動一支 AEO 專家團隊，以極速幫你帶來更多 AI 同自然搜尋嘅潛在客戶。
            </p>

            <p className="text-[14px] text-gray-700 leading-[1.75] mb-4">
              當你嘅競爭對手花 6-12 個月摸索 AI 搜尋嘅時候，我哋嘅客戶 30 日內已經開始出現喺 ChatGPT 同 Google AI Overview。
            </p>

            <p className="text-[14px] text-gray-700 leading-[1.75] mb-6">
              我哋已經搵到有效嘅方法、建立咗系統、並喺唔同品牌同行業驗證咗結果。你可以即刻享用我哋花咗幾年先完善嘅策略——無學習成本、無浪費預算，只有喺你嘅潛在客戶真正搜尋嘅地方快速獲得能見度。
            </p>

            <motion.a
              href="https://calendly.com/acesley180604/aeo-service-free-audit-surfio"
              className="text-[14px] font-semibold text-gray-900 underline underline-offset-4 decoration-gray-900 hover:text-[#7C3AED] transition-colors inline-block"
              whileHover={{ x: 4 }}
            >
              認識我哋嘅團隊
            </motion.a>
          </div>
        </Reveal>

        {/* Right - Team photo + Techathon+ badge + testimonial */}
        <Reveal delay={0.15} direction="left">
          <div>
            <div className="relative mb-4">
              <motion.div
                className="rounded-xl overflow-hidden aspect-[4/3]"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80&auto=format&fit=crop"
                  alt="AEO 專家團隊"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </motion.div>

              {/* Techathon+ badge */}
              <motion.div
                className="absolute top-3 right-3 bg-white shadow-md rounded-lg px-2.5 py-2 text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: "spring" }}
              >
                <div className="text-[9px] font-bold text-[#7C3AED] uppercase tracking-wide">Techathon+</div>
                <div className="text-[8px] text-gray-500 leading-tight">Supported<br/>Project</div>
              </motion.div>
            </div>

            {/* Testimonial card */}
            <motion.div
              className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm -mt-8 relative z-10 mx-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <p className="text-[13px] text-gray-600 leading-[1.7] italic mb-2">
                &ldquo;SurfIO 團隊係我哋市場推廣團隊嘅重要延伸，透過精準執行嘅數碼營銷活動帶來顯著增長，提供我哋達成增長目標所需嘅專業支援。&rdquo;
              </p>
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
