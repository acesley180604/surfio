import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { useLanguage } from "../i18n/context";
import { t } from "../i18n/translations";

export default function Experts() {
  const lang = useLanguage();

  return (
    <section id="about" className="py-16 px-5 md:px-10 max-w-[1100px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
        <Reveal direction="right">
          <div>
            <h2 className="text-[28px] md:text-[34px] font-extrabold text-gray-900 leading-[1.2] mb-5">
              {t("experts.headline", lang)}
            </h2>
            <p className="text-[14px] text-gray-700 leading-[1.75] mb-4">{t("experts.p1", lang)}</p>
            <p className="text-[14px] text-gray-700 leading-[1.75] mb-4">{t("experts.p2", lang)}</p>
            <p className="text-[14px] text-gray-700 leading-[1.75] mb-4">{t("experts.p3", lang)}</p>
            <p className="text-[14px] text-gray-700 leading-[1.75] mb-6">{t("experts.p4", lang)}</p>
            <motion.a
              href="https://calendly.com/acesley180604/aeo-service-free-audit-surfio"
              className="text-[14px] font-semibold text-gray-900 underline underline-offset-4 decoration-gray-900 hover:text-[#7C3AED] transition-colors inline-block"
              whileHover={{ x: 4 }}
            >
              {t("experts.meetTeam", lang)}
            </motion.a>
          </div>
        </Reveal>

        <Reveal delay={0.15} direction="left">
          <div>
            <div className="relative mb-4">
              <motion.div
                className="rounded-xl overflow-hidden aspect-[4/3]"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80&auto=format&fit=crop"
                  alt={t("experts.teamAlt", lang)}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </motion.div>
              <motion.div
                className="absolute top-3 right-3 bg-white shadow-md rounded-lg px-2.5 py-2 text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: "spring" }}
              >
                <div className="text-[9px] font-bold text-[#7C3AED] uppercase tracking-wide">Techathon+</div>
                <div className="text-[8px] text-gray-500 leading-tight">Supported<br/>Project</div>
              </motion.div>
            </div>

            <motion.div
              className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm -mt-8 relative z-10 mx-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <p className="text-[13px] text-gray-600 leading-[1.7] italic mb-2">
                &ldquo;{t("experts.testimonial", lang)}&rdquo;
              </p>
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
