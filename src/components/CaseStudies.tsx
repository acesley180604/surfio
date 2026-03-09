import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { useLanguage } from "../i18n/context";
import { t } from "../i18n/translations";

export default function CaseStudies() {
  const lang = useLanguage();
  const items = t("cases.items", lang) as {
    project: string;
    tagline: string;
    label: string;
    stats: { value: string; label: string }[];
  }[];
  const labelBgs = ["bg-[#EC4899]", "bg-[#7C3AED]", "bg-[#EC4899]"];

  return (
    <section id="cases" className="py-16 px-5 md:px-10 max-w-[1100px] mx-auto">
      <Reveal>
        <div className="text-center mb-3">
          <h2 className="inline-block text-[26px] md:text-[32px] font-extrabold">
            <span className="bg-gradient-to-r from-[#EC4899] via-[#A855F7] to-[#7C3AED] bg-clip-text text-transparent">
              {t("cases.headline", lang)}
            </span>
          </h2>
        </div>
        <p className="text-center text-[14px] text-gray-600 leading-[1.7] mb-10 max-w-[450px] mx-auto">
          {t("cases.subtitle", lang)}
        </p>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map((c, idx) => (
          <motion.div
            key={c.project}
            className="rounded-xl overflow-hidden bg-gradient-to-br from-[#0f1629] to-[#1a1a3a] p-5 pb-6 flex flex-col justify-between min-h-[260px]"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.12, duration: 0.6 }}
            whileHover={{
              y: -8,
              transition: { type: "spring", stiffness: 300 },
            }}
          >
            <div>
              <div className="flex items-start justify-between mb-1">
                <span className="text-white font-extrabold text-[15px] tracking-wider">
                  {c.project}
                </span>
              </div>
              <p className="text-[10px] text-gray-500 leading-[1.4] mb-3 whitespace-pre-line max-w-[180px]">
                {c.tagline}
              </p>
              <div className={`inline-block px-3 py-1 rounded-full text-[10px] font-semibold text-white ${labelBgs[idx]}`}>
                {c.label}
              </div>
            </div>
            <div className="flex items-end gap-5 mt-4">
              {c.stats.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + idx * 0.1 + i * 0.08 }}
                >
                  <div className="text-[22px] md:text-[26px] font-extrabold text-white leading-none">
                    {s.value}
                  </div>
                  <div className="text-[9px] text-gray-500 mt-1 leading-[1.3] whitespace-pre-line">
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
