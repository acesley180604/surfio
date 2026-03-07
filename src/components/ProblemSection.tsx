import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { StaggerContainer, StaggerItem } from "./Reveal";

const bullets = [
  "自然搜尋流量不斷縮水，而且喺 AI 結果入面搵唔到你嘅品牌",
  "唔確定要點樣做先可以喺 LLM 入面出現，同 SEO 有咩唔同",
  "唔知點量度你嘅 LLM 表現，或者應該專注邊方面",
  "唔清楚點樣組織內容，令 AI 助手揀你而唔係競爭對手",
];

const keys = ["專業 AEO 團隊", "AEO 實戰手冊", "規劃同執行"];

export default function ProblemSection() {
  return (
    <section className="py-16 px-5 md:px-10 max-w-[1100px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
        {/* Left - Text */}
        <div>
          <Reveal>
            <h2 className="text-[28px] md:text-[34px] font-extrabold text-gray-900 leading-[1.2] mb-5">
              你嘅自然搜尋流量喺 AI 時代係咪跌緊？
            </h2>
          </Reveal>

          <StaggerContainer className="space-y-2.5 mb-5">
            {bullets.map((text, i) => (
              <StaggerItem key={i}>
                <div className="flex items-start gap-2.5">
                  <span className="w-[5px] h-[5px] rounded-full bg-gray-900 mt-[9px] shrink-0" />
                  <span className="text-[14px] text-gray-700 leading-[1.65]">{text}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <Reveal delay={0.2}>
            <p className="text-[14px] text-gray-700 leading-[1.7] mb-6">
              AI 搜尋唔係將來嘅事，已經嚟咗。我哋可以幫你做好 AEO 準備，免得你落後於人。
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <h3 className="text-[17px] font-bold text-[#7C3AED] mb-4">
              贏取 LLM 推薦嘅 3 大關鍵
            </h3>
            <div className="flex flex-wrap items-center gap-6">
              {keys.map((label, i) => (
                <motion.div
                  key={label}
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  whileHover={{ x: 4 }}
                >
                  <span className="w-2 h-2 rounded-full bg-[#7C3AED]" />
                  <span className="text-[14px] font-semibold text-gray-900 underline underline-offset-2 decoration-gray-400">
                    {label}
                  </span>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Right - Team photo + HKSTP badge */}
        <Reveal delay={0.15} direction="left">
          <div className="relative">
            <motion.div
              className="rounded-xl overflow-hidden aspect-[4/3]"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80&auto=format&fit=crop"
                alt="團隊合作"
                className="w-full h-full object-cover"
              />
            </motion.div>
            {/* HKSTP badge */}
            <motion.div
              className="absolute top-3 right-3 bg-white shadow-md rounded-lg px-3 py-2.5 flex items-center gap-2"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: "spring" }}
            >
              <div className="w-[34px] h-[34px] rounded bg-[#7C3AED] flex items-center justify-center text-white text-[10px] font-bold leading-tight text-center">HK<br/>STP</div>
              <div className="leading-tight">
                <div className="text-[11px] font-bold text-gray-900">HKSTP</div>
                <div className="text-[10px] text-gray-400 uppercase tracking-wide">Ideation<br/>Programme</div>
              </div>
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
