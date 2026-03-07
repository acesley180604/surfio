import { motion } from "framer-motion";
import Reveal from "./Reveal";

const institutions = [
  {
    name: "HKSTP",
    logo: "https://www.hkstp.org/-/media/corpsite/assets/park-life/news-and-events/news/logo/hkstp_logo_eng_op-01.svg",
  },
  {
    name: "HK PolyU",
    logo: "https://www.polyu.edu.hk/assets/img/main-logo-1x.png",
  },
  {
    name: "HKUST",
    logo: "https://hkust.edu.hk/sites/default/files/2024-03/HKUST_logo_1.svg",
  },
  {
    name: "TU Darmstadt",
    logo: "https://upload.wikimedia.org/wikipedia/de/thumb/2/24/TU_Darmstadt_Logo.svg/300px-TU_Darmstadt_Logo.svg.png",
  },
];

export default function Hero() {
  return (
    <section className="relative pt-[100px] pb-10 overflow-hidden">
      {/* Lavender gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#EEE4FC] via-[#F0E6FD] to-white z-0" />

      {/* Animated floating decorations - LEFT */}
      <motion.div
        className="absolute top-[30px] left-[-80px] w-[280px] h-[280px] rounded-full border-[50px] border-purple-300/30 pointer-events-none z-[1]"
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[180px] left-[-20px] w-[180px] h-[180px] rounded-full border-[35px] border-purple-200/25 pointer-events-none z-[1]"
        animate={{ y: [0, 15, 0], rotate: [0, -3, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Animated floating decorations - RIGHT */}
      <motion.div
        className="absolute top-[30px] right-[-80px] w-[280px] h-[280px] rounded-full border-[50px] border-purple-300/30 pointer-events-none z-[1]"
        animate={{ y: [0, -20, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
      <motion.div
        className="absolute top-[180px] right-[-20px] w-[180px] h-[180px] rounded-full border-[35px] border-purple-200/25 pointer-events-none z-[1]"
        animate={{ y: [0, 15, 0], rotate: [0, 3, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      />

      <div className="relative z-10 text-center max-w-[900px] mx-auto px-5 md:px-8 pt-8">
        {/* AEO AGENCY label */}
        <Reveal>
          <p className="text-[#7C3AED] text-[13px] font-semibold tracking-[0.2em] uppercase mb-5">
            AEO Agency
          </p>
        </Reveal>

        {/* Headline */}
        <Reveal delay={0.1}>
          <h1 className="text-[clamp(32px,5vw,52px)] font-extrabold leading-[1.15] tracking-[-0.02em] text-gray-900 mb-5">
            主宰 AI 搜尋，令 Google AI 同 ChatGPT 主動為你帶來客戶
          </h1>
        </Reveal>

        {/* Subtitle */}
        <Reveal delay={0.2}>
          <p className="text-[15px] md:text-[16px] text-gray-500 leading-[1.7] max-w-[550px] mx-auto mb-8">
            唔好等。把握 AI 搜尋革命——令你出現喺 ChatGPT、Google AI Overview、Perplexity 同語音助手入面，90 日內帶來高達 800% 更多銷售。
          </p>
        </Reveal>

        {/* Two buttons */}
        <Reveal delay={0.3}>
          <div className="flex items-center justify-center gap-3 mb-14">
            <motion.a
              href="#process"
              className="px-6 py-3 rounded-full border border-gray-900 text-gray-900 text-[14px] font-medium hover:bg-gray-900 hover:text-white transition-all"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              點樣喺 LLM 排名
            </motion.a>
            <motion.a
              href="#contact"
              className="px-6 py-3 rounded-full bg-[#7C3AED] text-white text-[14px] font-medium hover:bg-[#6D28D9] transition-colors"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              預約策略會議
            </motion.a>
          </div>
        </Reveal>

        {/* Logo bar - Real institution logos */}
        <Reveal delay={0.4}>
          <div className="mb-6">
            <div className="flex items-center justify-center gap-4 mb-5">
              <div className="h-px bg-gray-300 w-16" />
              <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-[0.18em]">
                受頂尖學術機構同創科計劃支持
              </p>
              <div className="h-px bg-gray-300 w-16" />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
              {institutions.map((inst, i) => (
                <motion.div
                  key={inst.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="h-[32px] flex items-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                >
                  <img
                    src={inst.logo}
                    alt={inst.name}
                    className="h-full w-auto object-contain"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = "none";
                      const fallback = document.createElement("span");
                      fallback.className = "text-[14px] font-bold text-gray-400 tracking-wide";
                      fallback.textContent = inst.name;
                      target.parentElement?.appendChild(fallback);
                    }}
                  />
                </motion.div>
              ))}
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9 }}
                className="text-[14px] font-bold text-gray-400 tracking-wide opacity-60 hover:opacity-100 transition-opacity duration-300"
              >
                Techathon+
              </motion.span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
