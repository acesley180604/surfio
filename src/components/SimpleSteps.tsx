import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { useLanguage } from "../i18n/context";
import { t } from "../i18n/translations";

export default function SimpleSteps() {
  const lang = useLanguage();
  const steps = t("steps.items", lang) as { step: string; title: string; desc: string }[];
  const colors = ["text-[#EC4899]", "text-[#7C3AED]", "text-[#EC4899]"];

  return (
    <section className="py-16 px-5 md:px-10 max-w-[1100px] mx-auto">
      <Reveal>
        <h2 className="text-[26px] md:text-[34px] font-extrabold text-gray-400 text-center mb-14">
          {t("steps.headline", lang)}
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
              className={`text-[11px] font-bold ${colors[i]} mb-2 tracking-wide`}
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
