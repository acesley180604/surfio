import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { StaggerContainer, StaggerItem } from "./Reveal";
import { useLanguage } from "../i18n/context";
import { t } from "../i18n/translations";

export default function Services() {
  const lang = useLanguage();
  const columns = t("services.columns", lang) as { title: string; items: string[] }[];

  return (
    <section id="services" className="py-16 px-5 md:px-10 max-w-[1100px] mx-auto">
      <motion.div
        className="border-t border-gray-200 mb-10"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      />

      <Reveal>
        <h2 className="text-[26px] md:text-[32px] font-extrabold text-gray-900 text-center mb-10">
          {t("services.headline", lang)}
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
        {columns.map((col, colIdx) => (
          <motion.div
            key={col.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: colIdx * 0.15, duration: 0.6 }}
          >
            <h3 className="text-[15px] font-bold text-gray-900 mb-3">
              {col.title}
            </h3>
            <StaggerContainer className="space-y-2.5" staggerDelay={0.06}>
              {col.items.map((item, i) => (
                <StaggerItem key={i}>
                  <div className="flex items-start gap-2">
                    <span className="w-[5px] h-[5px] rounded-full bg-gray-900 mt-[7px] shrink-0" />
                    <span className="text-[13px] text-gray-600 leading-[1.65]">{item}</span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
