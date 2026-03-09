import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { useLanguage } from "../i18n/context";
import { t } from "../i18n/translations";

export default function Playbook() {
  const lang = useLanguage();
  const items = t("playbook.items", lang) as [string, string][];

  return (
    <section className="py-16 px-5 md:px-10 max-w-[1100px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
        {/* Left - Report mockup */}
        <Reveal direction="right">
          <div className="space-y-4">
            <motion.div
              className="bg-white border border-gray-200 rounded-xl shadow-sm p-6"
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <p className="text-[11px] text-gray-400 mb-4">{t("playbook.reportTitle", lang)}</p>
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
              <p className="text-[12px] font-bold text-gray-900 mb-1">{t("playbook.reportHeading", lang)}</p>
              <p className="text-[11px] font-semibold text-gray-500 mb-3">{t("playbook.reportSummary", lang)}</p>
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
              <p className="text-[11px] font-bold text-gray-900 mt-4 mb-2">{t("playbook.reportPriority", lang)}</p>
              <div className="space-y-1.5">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="flex items-center gap-2">
                    <div className="w-3.5 h-3.5 rounded bg-purple-100 flex items-center justify-center text-[8px] text-[#7C3AED] font-bold">{n}</div>
                    <div className="h-1.5 bg-gray-100 rounded-full flex-1" />
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="rounded-xl overflow-hidden border border-gray-200 h-[200px]"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&auto=format&fit=crop"
                alt={t("playbook.dashboardAlt", lang)}
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
              {t("playbook.headline", lang)}
            </h2>
            <p className="text-[14px] text-gray-700 leading-[1.75] mb-5">
              {t("playbook.intro", lang)}
            </p>
            <p className="text-[14px] text-gray-700 leading-[1.75] mb-5">
              <strong>{t("playbook.includes", lang)}</strong>
            </p>
          </Reveal>

          <div className="space-y-4 mb-6">
            {items.map(([title, desc], i) => (
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
              <strong className="text-gray-900">{t("playbook.resultLabel", lang)}</strong>{t("playbook.result", lang)}
            </p>
            <p className="text-[14px] text-gray-700 leading-[1.75]">
              {t("playbook.closing", lang)}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
