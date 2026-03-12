import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { useLanguage } from "../i18n/context";
import { t } from "../i18n/translations";

export default function GuaranteeBanner() {
  const lang = useLanguage();

  return (
    <section className="py-16 px-5 md:px-10">
      <div className="max-w-[900px] mx-auto">
        <Reveal>
          <motion.div
            className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#7C3AED] via-[#6D28D9] to-[#4C1D95] p-8 md:p-12 text-center"
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {/* Decorative circles */}
            <div className="absolute top-[-40px] right-[-40px] w-[120px] h-[120px] rounded-full border-[20px] border-white/10 pointer-events-none" />
            <div className="absolute bottom-[-30px] left-[-30px] w-[100px] h-[100px] rounded-full border-[15px] border-white/10 pointer-events-none" />

            {/* Shield icon */}
            <motion.div
              className="w-16 h-16 mx-auto mb-5 rounded-full bg-white/15 flex items-center justify-center"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </motion.div>

            <h2 className="text-[24px] md:text-[32px] font-extrabold text-white mb-3 leading-tight">
              {t("guarantee.headline", lang)}
            </h2>
            <p className="text-[15px] md:text-[16px] text-white/80 leading-[1.7] max-w-[600px] mx-auto mb-6">
              {t("guarantee.subtitle", lang)}
            </p>

            {/* Promise cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 max-w-[700px] mx-auto">
              {(t("guarantee.promises", lang) as { icon: string; title: string; desc: string }[]).map((p, i) => (
                <motion.div
                  key={p.title}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <div className="text-[24px] mb-2">{p.icon}</div>
                  <div className="text-[13px] font-bold text-white mb-1">{p.title}</div>
                  <div className="text-[11px] text-white/60 leading-[1.5]">{p.desc}</div>
                </motion.div>
              ))}
            </div>

            <p className="text-[12px] text-white/50 italic">
              {t("guarantee.fine", lang)}
            </p>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
