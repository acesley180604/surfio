import { useState } from "react";
import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { LogoCloud } from "./ui/logo-cloud";
import { useLanguage } from "../i18n/context";
import { t } from "../i18n/translations";

const logos = [
  { src: "/logos/hkstp.svg", alt: "HKSTP" },
  { src: "/logos/techathon.jpg", alt: "Techathon+" },
  { src: "/logos/polyu.png", alt: "HK PolyU" },
  { src: "/logos/hkust.svg", alt: "HKUST" },
  { src: "/logos/tu-darmstadt.svg", alt: "TU Darmstadt" },
];

export default function Hero() {
  const lang = useLanguage();
  const [heroEmail, setHeroEmail] = useState("");

  const handleHeroEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!heroEmail) return;
    window.open(
      `https://calendly.com/acesley180604/aeo-service-free-audit-surfio?email=${encodeURIComponent(heroEmail)}`,
      "_blank"
    );
  };

  return (
    <section className="relative pt-[100px] pb-10 overflow-hidden">
      {/* Lavender gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#EEE4FC] via-[#F0E6FD] to-white z-0" />

      {/* Animated floating decorations - LEFT */}
      <motion.div
        className="absolute top-[30px] left-[-80px] w-[280px] h-[280px] rounded-full border-[50px] border-purple-300/30 pointer-events-none z-[1]"
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[180px] left-[-20px] w-[180px] h-[180px] rounded-full border-[35px] border-purple-200/25 pointer-events-none z-[1]"
        animate={{ y: [0, 15, 0], rotate: [0, -3, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Animated floating decorations - RIGHT */}
      <motion.div
        className="absolute top-[30px] right-[-80px] w-[280px] h-[280px] rounded-full border-[50px] border-purple-300/30 pointer-events-none z-[1]"
        animate={{ y: [0, -20, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
      <motion.div
        className="absolute top-[180px] right-[-20px] w-[180px] h-[180px] rounded-full border-[35px] border-purple-200/25 pointer-events-none z-[1]"
        animate={{ y: [0, 15, 0], rotate: [0, 3, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      />

      <div className="relative z-10 text-center max-w-[900px] mx-auto px-5 md:px-8 pt-8">
        <Reveal>
          <p className="text-[#7C3AED] text-[13px] font-semibold tracking-[0.2em] uppercase mb-5">
            {t("hero.label", lang)}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="text-[clamp(32px,5vw,52px)] font-extrabold leading-[1.15] tracking-[-0.02em] text-gray-900 mb-5">
            {t("hero.headline", lang)}
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="text-[15px] md:text-[16px] text-gray-500 leading-[1.7] max-w-[550px] mx-auto mb-8">
            {t("hero.subtitle", lang)}
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          {/* Low-friction email capture */}
          <form onSubmit={handleHeroEmail} className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-4 max-w-[460px] mx-auto">
            <input
              type="email"
              required
              value={heroEmail}
              onChange={(e) => setHeroEmail(e.target.value)}
              placeholder={t("hero.emailPlaceholder", lang) as string}
              className="w-full sm:flex-1 px-4 py-3 rounded-full border border-gray-300 bg-white/80 backdrop-blur-sm text-[13px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/30 focus:border-[#7C3AED] transition-all"
            />
            <motion.button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#7C3AED] text-white text-[13px] font-semibold hover:bg-[#6D28D9] transition-colors whitespace-nowrap"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              {t("hero.emailBtn", lang)}
            </motion.button>
          </form>

          {/* Guarantee tag */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
            <span className="text-[11px] text-gray-500 font-medium">
              {t("hero.guaranteeTag", lang)}
            </span>
          </div>

          <div className="flex items-center justify-center gap-3 mb-14">
            <motion.a
              href="#pricing"
              className="px-6 py-2.5 rounded-full border border-gray-900 text-gray-900 text-[13px] font-medium hover:bg-gray-900 hover:text-white transition-all"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              {t("hero.processBtn", lang)}
            </motion.a>
            <motion.a
              href="https://calendly.com/acesley180604/aeo-service-free-audit-surfio"
              className="px-6 py-2.5 rounded-full bg-gray-900 text-white text-[13px] font-medium hover:bg-gray-800 transition-colors"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              {t("hero.ctaBtn", lang)}
            </motion.a>
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="mb-6">
            <div className="flex items-center justify-center gap-4 mb-5">
              <div className="h-px bg-gray-300 w-16" />
              <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-[0.18em]">
                {t("hero.backed", lang)}
              </p>
              <div className="h-px bg-gray-300 w-16" />
            </div>
            <LogoCloud logos={logos} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
