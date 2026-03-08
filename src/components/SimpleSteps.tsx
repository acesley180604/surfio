import { motion } from "framer-motion";
import Reveal from "./Reveal";

const steps = [
  {
    step: "第一步：",
    title: "免費 AI 搜尋能見度審計",
    desc: "同我哋嘅策略師會面，制定符合你目標嘅度身增長計劃。",
    color: "text-[#EC4899]",
  },
  {
    step: "第二步：",
    title: "規劃同啟動",
    desc: "我哋會制定詳細策略，啟動經驗證嘅 AEO 同 GEO 計劃。",
    color: "text-[#7C3AED]",
  },
  {
    step: "第三步：",
    title: "持續改善效果",
    desc: "運用數據驅動方法，持續改善你嘅營銷活動效果。",
    color: "text-[#EC4899]",
  },
];

export default function SimpleSteps() {
  return (
    <section className="py-16 px-5 md:px-10 max-w-[1100px] mx-auto">
      <Reveal>
        <h2 className="text-[26px] md:text-[34px] font-extrabold text-gray-400 text-center mb-14">
          我哋令 AEO 變得簡單
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {steps.map((s, i) => (
          <motion.div
            key={s.step}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.6 }}
            whileHover={{ y: -4 }}
          >
            <motion.p
              className={`text-[11px] font-bold ${s.color} mb-2 tracking-wide`}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.15 }}
            >
              {s.step}
            </motion.p>
            <h3 className="text-[18px] font-bold text-gray-900 mb-2">
              {s.title}
            </h3>
            <p className="text-[13px] text-gray-600 leading-[1.7]">
              {s.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
