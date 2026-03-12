import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "./Reveal";
import { useLanguage } from "../i18n/context";
import { t } from "../i18n/translations";

export default function EmailCapture() {
  const lang = useLanguage();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // Beehiiv or any email service integration
    window.open(
      `https://calendly.com/acesley180604/aeo-service-free-audit-surfio?email=${encodeURIComponent(email)}`,
      "_blank"
    );
    setSubmitted(true);
  };

  return (
    <section className="py-16 px-5 md:px-10">
      <div className="max-w-[700px] mx-auto">
        <Reveal>
          <div className="bg-gradient-to-br from-gray-50 to-[#F5F0FF] rounded-2xl p-8 md:p-10 border border-gray-100">
            <div className="text-center mb-6">
              <p className="text-[#7C3AED] text-[11px] font-semibold tracking-[0.2em] uppercase mb-3">
                {t("emailCapture.label", lang)}
              </p>
              <h2 className="text-[22px] md:text-[28px] font-extrabold text-gray-900 mb-3">
                {t("emailCapture.headline", lang)}
              </h2>
              <p className="text-[14px] text-gray-500 leading-[1.7] max-w-[500px] mx-auto">
                {t("emailCapture.subtitle", lang)}
              </p>
            </div>

            {/* What you get */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {(t("emailCapture.items", lang) as string[]).map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-2.5"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                >
                  <span className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m5 12 5 5L20 7" />
                    </svg>
                  </span>
                  <span className="text-[13px] text-gray-700">{item}</span>
                </motion.div>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row gap-3"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("emailCapture.placeholder", lang) as string}
                    className="flex-1 px-4 py-3 rounded-lg border border-gray-200 bg-white text-[14px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/30 focus:border-[#7C3AED] transition-all"
                  />
                  <motion.button
                    type="submit"
                    className="px-6 py-3 rounded-lg bg-[#7C3AED] text-white text-[14px] font-semibold hover:bg-[#6D28D9] transition-colors whitespace-nowrap"
                    whileHover={{ scale: 1.03, y: -1 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {t("emailCapture.btn", lang)}
                  </motion.button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  className="text-center py-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-green-100 flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m5 12 5 5L20 7" />
                    </svg>
                  </div>
                  <p className="text-[14px] font-semibold text-gray-900">{t("emailCapture.success", lang)}</p>
                  <p className="text-[12px] text-gray-500 mt-1">{t("emailCapture.successSub", lang)}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <p className="text-[11px] text-gray-400 text-center mt-4">
              {t("emailCapture.noSpam", lang)}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
