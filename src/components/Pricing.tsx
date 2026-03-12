import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { useLanguage } from "../i18n/context";
import { t } from "../i18n/translations";

export default function Pricing() {
  const lang = useLanguage();
  const plans = t("pricing.plans", lang) as {
    name: string;
    price: string;
    period: string;
    desc: string;
    features: string[];
    cta: string;
    popular?: boolean;
  }[];

  return (
    <section id="pricing" className="py-16 px-5 md:px-10 max-w-[1100px] mx-auto">
      <Reveal>
        <div className="text-center mb-12">
          <p className="text-[#7C3AED] text-[11px] font-semibold tracking-[0.2em] uppercase mb-3">
            {t("pricing.label", lang)}
          </p>
          <h2 className="text-[26px] md:text-[34px] font-extrabold text-gray-900 mb-3">
            {t("pricing.headline", lang)}
          </h2>
          <p className="text-[14px] text-gray-500 max-w-[500px] mx-auto leading-[1.7]">
            {t("pricing.subtitle", lang)}
          </p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            className={`relative rounded-2xl p-6 border ${
              plan.popular
                ? "border-[#7C3AED] bg-gradient-to-b from-[#F5F0FF] to-white shadow-lg shadow-purple-100"
                : "border-gray-200 bg-white"
            }`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.5 }}
            whileHover={{ y: -5 }}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#7C3AED] text-white text-[10px] font-bold tracking-wide uppercase">
                {t("pricing.popular", lang)}
              </div>
            )}

            <h3 className="text-[16px] font-bold text-gray-900 mb-1">{plan.name}</h3>
            <p className="text-[12px] text-gray-500 mb-4">{plan.desc}</p>

            <div className="flex items-baseline gap-1 mb-5">
              <span className="text-[32px] font-extrabold text-gray-900">{plan.price}</span>
              <span className="text-[13px] text-gray-400">{plan.period}</span>
            </div>

            <div className="space-y-2.5 mb-6">
              {plan.features.map((f, fi) => (
                <div key={fi} className="flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m5 12 5 5L20 7" />
                    </svg>
                  </span>
                  <span className="text-[13px] text-gray-600 leading-[1.5]">{f}</span>
                </div>
              ))}
            </div>

            <motion.a
              href="https://calendly.com/acesley180604/aeo-service-free-audit-surfio"
              className={`block text-center py-3 rounded-lg text-[14px] font-semibold transition-colors ${
                plan.popular
                  ? "bg-[#7C3AED] text-white hover:bg-[#6D28D9]"
                  : "bg-gray-900 text-white hover:bg-gray-800"
              }`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {plan.cta}
            </motion.a>
          </motion.div>
        ))}
      </div>

      {/* 90-day guarantee badge */}
      <Reveal delay={0.2}>
        <div className="flex items-center justify-center gap-3 mt-8 py-4">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
            <span className="text-[12px] font-semibold text-green-700">
              {t("pricing.guaranteeBadge", lang)}
            </span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
