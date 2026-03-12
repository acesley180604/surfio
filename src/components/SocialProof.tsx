import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { useLanguage } from "../i18n/context";
import { t } from "../i18n/translations";

export default function SocialProof() {
  const lang = useLanguage();
  const metrics = t("socialProof.metrics", lang) as { value: string; label: string }[];

  return (
    <section className="py-8 px-5 md:px-10 bg-white border-y border-gray-100">
      <div className="max-w-[900px] mx-auto">
        <Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {metrics.map((m, i) => (
              <motion.div
                key={m.label}
                className="text-center"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <div className="text-[28px] md:text-[32px] font-extrabold text-[#7C3AED] leading-none mb-1">
                  {m.value}
                </div>
                <div className="text-[11px] md:text-[12px] text-gray-500 leading-[1.4]">
                  {m.label}
                </div>
              </motion.div>
            ))}
          </div>
        </Reveal>

        {/* Urgency bar */}
        <Reveal delay={0.15}>
          <div className="flex items-center justify-center gap-2 mt-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
            </span>
            <p className="text-[12px] text-orange-600 font-medium">
              {t("socialProof.urgency", lang)}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
