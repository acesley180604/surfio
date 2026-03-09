import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { useLanguage } from "../i18n/context";
import { t } from "../i18n/translations";

export default function Founder() {
  const lang = useLanguage();
  const credentials = t("founder.credentials", lang) as { value: string; label: string }[];

  return (
    <section className="py-16 px-5 md:px-10 max-w-[1100px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
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
          </div>
        </Reveal>

        <Reveal delay={0.15} direction="left">
          <div>
            <p className="text-[#7C3AED] text-[12px] font-semibold tracking-[0.2em] uppercase mb-3">
              {t("founder.label", lang)}
            </p>
            <h2 className="text-[28px] md:text-[34px] font-extrabold text-gray-900 leading-[1.2] mb-5">
              Acesley Chan
            </h2>
            <p className="text-[14px] text-gray-700 leading-[1.75] mb-4">{t("founder.bio1", lang)}</p>
            <p className="text-[14px] text-gray-700 leading-[1.75] mb-4">{t("founder.bio2", lang)}</p>
            <p className="text-[14px] text-gray-700 leading-[1.75] mb-7">{t("founder.bio3", lang)}</p>

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
              {t("nav.cta", lang)}
            </motion.a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
