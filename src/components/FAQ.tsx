import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "./Reveal";
import { useLanguage } from "../i18n/context";
import { t } from "../i18n/translations";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const lang = useLanguage();
  const faqs = t("faq.items", lang) as [string, string][];

  return (
    <section id="faq" className="relative overflow-hidden">
      <motion.div
        className="h-16 bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#EC4899] opacity-60"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
      />

      <div className="bg-gradient-to-b from-[#1a1040] to-[#0d0820] py-16 px-5 md:px-10">
        <div className="max-w-[1100px] mx-auto">
          <Reveal>
            <h2 className="text-[28px] md:text-[34px] font-extrabold text-white text-center mb-10">
              {t("faq.headline", lang)}
            </h2>
          </Reveal>

          <div className="max-w-[800px] mx-auto">
            {faqs.map(([q, a], i) => (
              <motion.div
                key={i}
                className="border-b border-white/10 cursor-pointer"
                onClick={() => setOpen(open === i ? null : i)}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <div className="flex items-center gap-4 py-5">
                  <motion.span
                    className="text-white text-[20px] font-bold shrink-0 w-5 text-center"
                    animate={{ rotate: open === i ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    +
                  </motion.span>
                  <span className="text-[15px] font-medium text-white">
                    {q}
                  </span>
                </div>
                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="text-[14px] text-gray-300 leading-[1.75] pb-5 pl-9">
                        {a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
