import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { useLanguage } from "../i18n/context";
import { t } from "../i18n/translations";

export default function Planning() {
  const lang = useLanguage();
  const seoItems = t("planning.seo.items", lang) as string[];
  const aeoItems = t("planning.aeo.items", lang) as string[];

  return (
    <section className="py-16 px-5 md:px-10 max-w-[1100px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        <Reveal direction="right">
          <div>
            <h2 className="text-[28px] md:text-[34px] font-extrabold text-gray-900 leading-[1.2] mb-5">
              {t("planning.headline", lang)}
            </h2>
            <p className="text-[14px] text-gray-700 leading-[1.75] mb-4">{t("planning.p1", lang)}</p>
            <p className="text-[14px] text-gray-700 leading-[1.75] mb-4">{t("planning.p2", lang)}</p>
            <p className="text-[14px] text-gray-700 leading-[1.75] mb-7">{t("planning.p3", lang)}</p>
            <motion.a
              href="#process"
              className="text-[14px] font-semibold text-[#7C3AED] underline underline-offset-4 decoration-[#7C3AED]/40 hover:decoration-[#7C3AED] transition-colors inline-block"
              whileHover={{ x: 4 }}
            >
              {t("planning.link", lang)}
            </motion.a>
          </div>
        </Reveal>

        <Reveal delay={0.15} direction="left">
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-[420px] aspect-square">
              {/* SEO Circle */}
              <motion.div
                className="absolute left-0 top-1/2 -translate-y-1/2 w-[60%] aspect-square rounded-full bg-blue-50 border border-blue-200 flex items-center justify-start pl-[8%]"
                initial={{ x: -60, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <div className="text-left pr-[25%]">
                  <div className="text-[16px] font-extrabold text-blue-600 mb-1.5">SEO</div>
                  <div className="text-[9px] text-gray-500 leading-[1.5] space-y-[2px]">
                    {seoItems.map((item, i) => (
                      <div key={i} dangerouslySetInnerHTML={{ __html: item.replace(/\n/g, "<br/>") }} />
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* AEO Circle */}
              <motion.div
                className="absolute right-0 top-1/2 -translate-y-1/2 w-[60%] aspect-square rounded-full bg-purple-50 border border-purple-200 flex items-center justify-end pr-[8%]"
                initial={{ x: 60, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
              >
                <div className="text-right pl-[25%]">
                  <div className="text-[16px] font-extrabold text-[#7C3AED] mb-1.5">AEO</div>
                  <div className="text-[9px] text-gray-500 leading-[1.5] space-y-[2px]">
                    {aeoItems.map((item, i) => (
                      <div key={i} dangerouslySetInnerHTML={{ __html: item.replace(/\n/g, "<br/>") }} />
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Center overlap */}
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              >
                <div className="w-14 h-14 rounded-full bg-white shadow-md flex items-center justify-center border border-gray-200">
                  <span className="text-[#7C3AED] font-extrabold text-[18px]">&amp;</span>
                </div>
              </motion.div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
