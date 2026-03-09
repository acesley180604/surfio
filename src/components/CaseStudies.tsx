import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";
import Reveal from "./Reveal";
import { useLanguage } from "../i18n/context";
import { t } from "../i18n/translations";

const accents = [
  { color: "#EC4899", gradient: "from-[#EC4899] to-[#F472B6]" },
  { color: "#7C3AED", gradient: "from-[#7C3AED] to-[#A78BFA]" },
  { color: "#06B6D4", gradient: "from-[#06B6D4] to-[#67E8F9]" },
];

/* ── Animated stat bar ── */
function StatBar({
  value,
  label,
  accent,
  delay,
}: {
  value: string;
  label: string;
  accent: string;
  delay: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      className="flex items-baseline gap-4 md:gap-6"
      initial={{ opacity: 0, x: -40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
    >
      <motion.span
        className="text-[36px] md:text-[52px] font-black leading-none tracking-tight"
        style={{ color: accent }}
        initial={{ opacity: 0, scale: 0.6, filter: "blur(10px)" }}
        animate={inView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
        transition={{
          delay: delay + 0.15,
          duration: 0.7,
          type: "spring",
          stiffness: 180,
          damping: 14,
        }}
      >
        {value}
      </motion.span>
      <span className="text-[12px] md:text-[13px] text-gray-400 uppercase tracking-[0.12em] font-semibold leading-tight max-w-[140px]">
        {label}
      </span>
    </motion.div>
  );
}

/* ── Single timeline entry — NO cards ── */
function TimelineEntry({
  item,
  index,
  accent,
}: {
  item: {
    project: string;
    tagline: string;
    label: string;
    stats: { value: string; label: string }[];
  };
  index: number;
  accent: (typeof accents)[0];
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  /* parallax on the large index number */
  const parallaxRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start end", "end start"],
  });
  const yShift = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const ySmooth = useSpring(yShift, { stiffness: 80, damping: 20 });

  return (
    <div ref={ref} className="relative">
      {/* Giant background index number — parallax */}
      <div ref={parallaxRef} className="absolute right-0 md:right-4 top-0 pointer-events-none select-none overflow-hidden">
        <motion.span
          className="text-[120px] md:text-[200px] font-black leading-none"
          style={{
            y: ySmooth,
            WebkitTextStroke: `1.5px ${accent.color}15`,
            color: "transparent",
            opacity: 0.08,
          }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.08 } : {}}
          transition={{ duration: 1 }}
        >
          0{index + 1}
        </motion.span>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 lg:gap-16 items-start">
        {/* Left: text content */}
        <div>
          {/* Accent label pill */}
          <motion.span
            className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] text-white bg-gradient-to-r ${accent.gradient} mb-5`}
            initial={{ opacity: 0, scale: 0, rotate: 8 }}
            animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
            transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 18 }}
            style={{ boxShadow: `0 4px 20px ${accent.color}33` }}
          >
            {item.label}
          </motion.span>

          {/* Project name — large display text */}
          <motion.h3
            className="text-[28px] md:text-[38px] font-black text-gray-900 leading-[1.1] tracking-tight mb-3"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          >
            {item.project}
          </motion.h3>

          {/* Tagline */}
          <motion.p
            className="text-[14px] md:text-[15px] text-gray-500 leading-[1.7] max-w-[400px] whitespace-pre-line"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.6 }}
          >
            {item.tagline}
          </motion.p>

          {/* Animated accent underline */}
          <motion.div
            className="h-[3px] rounded-full mt-6 origin-left"
            style={{ background: `linear-gradient(90deg, ${accent.color}, transparent)` }}
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          />
        </div>

        {/* Right: stats — raw numbers, no cards */}
        <div className="flex flex-col gap-5 lg:gap-6 lg:pt-8">
          {item.stats.map((s, i) => (
            <StatBar
              key={i}
              value={s.value}
              label={s.label}
              accent={accent.color}
              delay={0.3 + i * 0.12}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Main component ── */
export default function CaseStudies() {
  const lang = useLanguage();
  const items = t("cases.items", lang) as {
    project: string;
    tagline: string;
    label: string;
    stats: { value: string; label: string }[];
  }[];

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });
  const lineHeight = useTransform(smoothProgress, [0.1, 0.85], ["0%", "100%"]);

  return (
    <section
      id="cases"
      ref={sectionRef}
      className="py-20 md:py-28 px-5 md:px-10 max-w-[1200px] mx-auto overflow-hidden"
    >
      {/* Header */}
      <Reveal>
        <div className="text-center mb-4">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-200/50 bg-purple-50/50 mb-5"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <motion.span
              className="w-2 h-2 rounded-full bg-[#7C3AED]"
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-[11px] font-semibold text-[#7C3AED] uppercase tracking-[0.15em]">
              {lang === "en" ? "Track Record" : "實戰經驗"}
            </span>
          </motion.div>
          <h2 className="text-[28px] md:text-[36px] font-extrabold leading-[1.15]">
            <span className="bg-gradient-to-r from-[#EC4899] via-[#A855F7] to-[#7C3AED] bg-clip-text text-transparent">
              {t("cases.headline", lang)}
            </span>
          </h2>
        </div>
        <p className="text-center text-[14px] text-gray-500 leading-[1.7] mb-16 md:mb-20 max-w-[480px] mx-auto">
          {t("cases.subtitle", lang)}
        </p>
      </Reveal>

      {/* Timeline body */}
      <div className="relative">
        {/* Vertical progress line — left edge */}
        <div className="absolute left-0 md:left-6 top-0 bottom-0 w-[2px]">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-200/50 to-transparent rounded-full" />
          <motion.div
            className="absolute top-0 left-0 w-full rounded-full bg-gradient-to-b from-[#EC4899] via-[#7C3AED] to-[#06B6D4]"
            style={{ height: lineHeight }}
          />
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[6px] rounded-full bg-gradient-to-b from-[#EC4899]/20 via-[#7C3AED]/20 to-[#06B6D4]/20 blur-sm"
            style={{ height: lineHeight }}
          />
        </div>

        {/* Entries */}
        <div className="space-y-20 md:space-y-28 pl-8 md:pl-20">
          {items.map((item, idx) => {
            const accent = accents[idx % accents.length];
            return (
              <div key={item.project} className="relative">
                {/* Timeline dot */}
                <motion.div
                  className="absolute -left-8 md:-left-20 top-1"
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.05 }}
                >
                  <div className="relative flex items-center justify-center">
                    {/* Pulse ring */}
                    <motion.div
                      className="absolute w-10 h-10 md:w-12 md:h-12 rounded-full"
                      style={{ border: `2px solid ${accent.color}` }}
                      animate={{
                        scale: [1, 1.6, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                    {/* Solid dot */}
                    <div
                      className={`w-4 h-4 md:w-5 md:h-5 rounded-full bg-gradient-to-br ${accent.gradient} shadow-lg`}
                      style={{ boxShadow: `0 0 14px ${accent.color}44` }}
                    />
                  </div>
                </motion.div>

                <TimelineEntry item={item} index={idx} accent={accent} />
              </div>
            );
          })}
        </div>

        {/* End dot */}
        <motion.div
          className="absolute left-0 md:left-6 -bottom-2 w-[2px] flex justify-center"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, type: "spring" }}
        >
          <div
            className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] -translate-x-[3px]"
            style={{ boxShadow: "0 0 10px rgba(124,58,237,0.4)" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
