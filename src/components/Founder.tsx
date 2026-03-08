import { motion } from "framer-motion";
import Reveal from "./Reveal";

const credentials = [
  { value: "2x", label: "HKSTP Ideation Programme" },
  { value: "1x", label: "Techathon+ 得獎項目" },
  { value: "5,000+", label: "產品用戶" },
  { value: "3M+", label: "自然觸及曝光" },
  { value: "400+", label: "教授過嘅學生" },
];

export default function Founder() {
  return (
    <section className="py-16 px-5 md:px-10 max-w-[1100px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        {/* Left - Photo */}
        <Reveal direction="right">
          <div className="relative">
            <motion.div
              className="rounded-xl overflow-hidden aspect-[4/5] bg-gray-100"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#EEE4FC] to-[#F0E6FD]">
                <div className="text-center">
                  <img src="/logos/surfio-icon.png" alt="SurfIO" className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" />
                  <p className="text-[14px] font-bold text-gray-700">Acesley Chan</p>
                  <p className="text-[12px] text-gray-500">Founder & CEO</p>
                </div>
              </div>
            </motion.div>

            {/* HKSTP badge */}
            <motion.div
              className="absolute top-3 right-3 bg-white shadow-md rounded-lg px-3 py-2 text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: "spring" }}
            >
              <div className="text-[9px] font-bold text-[#7C3AED] uppercase tracking-wide">HKSTP</div>
              <div className="text-[8px] text-gray-500 leading-tight">Ideation<br/>Programme</div>
            </motion.div>
          </div>
        </Reveal>

        {/* Right - Bio */}
        <Reveal delay={0.15} direction="left">
          <div>
            <p className="text-[#7C3AED] text-[12px] font-semibold tracking-[0.2em] uppercase mb-3">
              創辦人
            </p>
            <h2 className="text-[28px] md:text-[34px] font-extrabold text-gray-900 leading-[1.2] mb-5">
              Acesley Chan
            </h2>

            <p className="text-[14px] text-gray-700 leading-[1.75] mb-4">
              Acesley Chan 係 SurfIO 嘅創辦人。佢專注於 AI 搜尋優化（AEO）同生成式引擎優化（GEO）。
            </p>

            <p className="text-[14px] text-gray-700 leading-[1.75] mb-4">
              Acesley 曾經兩次獲選 HKSTP Ideation Programme。佢亦喺 Techathon+ 創業比賽中獲獎。
            </p>

            <p className="text-[14px] text-gray-700 leading-[1.75] mb-4">
              佢創立嘅產品 GymsLock 累積超過 5,000 名用戶。透過自然搜尋同內容策略達到超過 300 萬次曝光。
            </p>

            <p className="text-[14px] text-gray-700 leading-[1.75] mb-4">
              Acesley 曾喺香港理工大學同科技大學教授超過 400 名學生有關 AI 同數碼營銷嘅課程。
            </p>

            <p className="text-[14px] text-gray-700 leading-[1.75] mb-7">
              SurfIO 將呢啲實戰經驗轉化成一套幫企業喺 AI 搜尋時代被搵到嘅系統化方法。
            </p>

            {/* Credential stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
              {credentials.map((c, i) => (
                <motion.div
                  key={c.label}
                  className="text-center p-3 rounded-lg bg-gray-50 border border-gray-100"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                >
                  <div className="text-[20px] font-extrabold text-[#7C3AED]">{c.value}</div>
                  <div className="text-[10px] text-gray-500 mt-1 leading-[1.4]">{c.label}</div>
                </motion.div>
              ))}
            </div>

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
      </div>
    </section>
  );
}
