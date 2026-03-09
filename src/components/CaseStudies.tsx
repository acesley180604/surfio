import { useRef } from "react";
import { motion, useScroll, useTransform, useInView, useSpring } from "framer-motion";
import Reveal from "./Reveal";
import { useLanguage } from "../i18n/context";
import { t } from "../i18n/translations";

const accentColors = [
  { bg: "from-[#EC4899] to-[#F472B6]", ring: "#EC4899", glow: "rgba(236,72,153,0.3)", dot: "bg-[#EC4899]", text: "text-[#EC4899]", border: "border-[#EC4899]" },
  { bg: "from-[#7C3AED] to-[#A78BFA]", ring: "#7C3AED", glow: "rgba(124,58,237,0.3)", dot: "bg-[#7C3AED]", text: "text-[#7C3AED]", border: "border-[#7C3AED]" },
  { bg: "from-[#06B6D4] to-[#67E8F9]", ring: "#06B6D4", glow: "rgba(6,182,212,0.3)", dot: "bg-[#06B6D4]", text: "text-[#06B6D4]", border: "border-[#06B6D4]" },
];

const icons = [
  // Dumbbell / fitness
  <svg key="gym" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M6.5 6.5h11M6.5 17.5h11" /><rect x="2" y="8.5" width="4.5" height="7" rx="1" /><rect x="17.5" y="8.5" width="4.5" height="7" rx="1" /><line x1="9" y1="12" x2="15" y2="12" /></svg>,
  // Rocket / startup
  <svg key="rocket" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg>,
  // GraduationCap / education
  <svg key="edu" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c0 1.1 2.7 3 6 3s6-1.9 6-3v-5" /></svg>,
];

function AnimatedCounter({ value, delay = 0 }: { value: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, scale: 0.5, filter: "blur(8px)" }}
      animate={isInView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
      transition={{ delay, duration: 0.6, type: "spring", stiffness: 200, damping: 15 }}
      className="inline-block"
    >
      {value}
    </motion.span>
  );
}

function TimelineItem({
  item,
  index,
  color,
  icon,
}: {
  item: { project: string; tagline: string; label: string; stats: { value: string; label: string }[] };
  index: number;
  color: typeof accentColors[0];
  icon: React.ReactNode;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const isEven = index % 2 === 0;

  const cardVariants = {
    hidden: {
      opacity: 0,
      x: isEven ? -120 : 120,
      rotateY: isEven ? 15 : -15,
      scale: 0.85,
    },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
        delay: 0.2,
      },
    },
  };

  const statsContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.6,
      },
    },
  };

  const statVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, type: "spring", stiffness: 200 },
    },
  };

  return (
    <div ref={ref} className="relative">
      {/* Desktop two-column layout */}
      <div className="hidden lg:grid lg:grid-cols-[1fr_80px_1fr] items-center gap-0">
        {/* Left side */}
        <div className={isEven ? "pr-8" : ""}>
          {isEven && (
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="relative"
            >
              <CardContent item={item} color={color} icon={icon} isInView={isInView} statsContainerVariants={statsContainerVariants} statVariants={statVariants} />
            </motion.div>
          )}
        </div>

        {/* Center timeline dot */}
        <div className="flex flex-col items-center justify-center relative z-10">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6, type: "spring", stiffness: 200 }}
            className="relative"
          >
            {/* Pulsing glow ring */}
            <motion.div
              className="absolute inset-[-8px] rounded-full"
              style={{ backgroundColor: color.glow }}
              animate={isInView ? {
                scale: [1, 1.5, 1],
                opacity: [0.6, 0, 0.6],
              } : {}}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Dot */}
            <div
              className={`w-14 h-14 rounded-full bg-gradient-to-br ${color.bg} flex items-center justify-center text-white shadow-lg relative z-10`}
              style={{ boxShadow: `0 0 20px ${color.glow}` }}
            >
              {icon}
            </div>
          </motion.div>
        </div>

        {/* Right side */}
        <div className={!isEven ? "pl-8" : ""}>
          {!isEven && (
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="relative"
            >
              <CardContent item={item} color={color} icon={icon} isInView={isInView} statsContainerVariants={statsContainerVariants} statVariants={statVariants} />
            </motion.div>
          )}
        </div>
      </div>

      {/* Mobile layout */}
      <div className="lg:hidden flex gap-5">
        {/* Timeline dot */}
        <div className="flex flex-col items-center shrink-0">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6, type: "spring", stiffness: 200 }}
            className="relative"
          >
            <motion.div
              className="absolute inset-[-6px] rounded-full"
              style={{ backgroundColor: color.glow }}
              animate={isInView ? { scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] } : {}}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <div
              className={`w-11 h-11 rounded-full bg-gradient-to-br ${color.bg} flex items-center justify-center text-white shadow-lg relative z-10`}
              style={{ boxShadow: `0 0 16px ${color.glow}` }}
            >
              {icon}
            </div>
          </motion.div>
        </div>

        {/* Card */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex-1 pb-10"
          style={{ ["--card-x" as string]: "60px" }}
        >
          <CardContent item={item} color={color} icon={icon} isInView={isInView} statsContainerVariants={statsContainerVariants} statVariants={statVariants} />
        </motion.div>
      </div>
    </div>
  );
}

function CardContent({
  item,
  color,
  isInView,
  statsContainerVariants,
  statVariants,
}: {
  item: { project: string; tagline: string; label: string; stats: { value: string; label: string }[] };
  color: typeof accentColors[0];
  icon: React.ReactNode;
  isInView: boolean;
  statsContainerVariants: any;
  statVariants: any;
}) {
  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#0c1020] via-[#111832] to-[#0f1629] border border-white/[0.06] p-6 md:p-7 group"
      whileHover={{
        y: -6,
        scale: 1.02,
        transition: { type: "spring", stiffness: 400, damping: 20 },
      }}
    >
      {/* Animated gradient border glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${color.ring}22, transparent 40%, ${color.ring}11)`,
        }}
      />

      {/* Floating orb decoration */}
      <motion.div
        className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-[0.07]"
        style={{ background: `radial-gradient(circle, ${color.ring}, transparent 70%)` }}
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 10, 0],
          y: [0, -5, 0],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10">
        {/* Header row */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <motion.h3
              className="text-white font-extrabold text-[18px] md:text-[20px] tracking-tight mb-1"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {item.project}
            </motion.h3>
            <motion.p
              className="text-[12px] text-gray-400 leading-[1.5] whitespace-pre-line max-w-[220px]"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {item.tagline}
            </motion.p>
          </div>
          <motion.span
            className={`px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-white bg-gradient-to-r ${color.bg} shadow-md shrink-0`}
            initial={{ opacity: 0, scale: 0, rotate: 12 }}
            animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
            transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
            style={{ boxShadow: `0 4px 14px ${color.glow}` }}
          >
            {item.label}
          </motion.span>
        </div>

        {/* Divider line with animated fill */}
        <div className="relative h-px my-5 bg-white/[0.06] overflow-hidden rounded-full">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{ background: `linear-gradient(90deg, ${color.ring}, transparent)` }}
            initial={{ width: "0%" }}
            animate={isInView ? { width: "100%" } : {}}
            transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
          />
        </div>

        {/* Stats grid */}
        <motion.div
          className="grid grid-cols-3 gap-3"
          variants={statsContainerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {item.stats.map((s, i) => (
            <motion.div
              key={i}
              variants={statVariants}
              className="relative text-center p-3 rounded-xl bg-white/[0.03] border border-white/[0.05] group/stat overflow-hidden"
              whileHover={{
                backgroundColor: "rgba(255,255,255,0.06)",
                borderColor: color.ring + "44",
                transition: { duration: 0.2 },
              }}
            >
              {/* Stat shimmer on hover */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover/stat:opacity-100"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${color.ring}15, transparent 70%)`,
                }}
                transition={{ duration: 0.3 }}
              />
              <div className="relative z-10">
                <div className={`text-[22px] md:text-[26px] font-extrabold leading-none mb-1 ${color.text}`}>
                  <AnimatedCounter value={s.value} delay={0.7 + i * 0.15} />
                </div>
                <div className="text-[9px] text-gray-500 leading-[1.35] whitespace-pre-line font-medium uppercase tracking-wide">
                  {s.label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

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
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const lineHeight = useTransform(smoothProgress, [0.1, 0.85], ["0%", "100%"]);

  return (
    <section id="cases" ref={sectionRef} className="py-20 md:py-28 px-5 md:px-10 max-w-[1100px] mx-auto overflow-hidden">
      {/* Section header */}
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

      {/* Timeline */}
      <div className="relative">
        {/* Desktop center line */}
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[2px]">
          {/* Background track */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-200/40 to-transparent rounded-full" />
          {/* Animated progress fill */}
          <motion.div
            className="absolute top-0 left-0 w-full rounded-full bg-gradient-to-b from-[#EC4899] via-[#7C3AED] to-[#06B6D4]"
            style={{ height: lineHeight }}
          />
          {/* Glow effect on the fill */}
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[6px] rounded-full bg-gradient-to-b from-[#EC4899]/30 via-[#7C3AED]/30 to-[#06B6D4]/30 blur-sm"
            style={{ height: lineHeight }}
          />
        </div>

        {/* Mobile left line */}
        <div className="lg:hidden absolute left-[21px] top-0 bottom-0 w-[2px]">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-200/40 to-transparent rounded-full" />
          <motion.div
            className="absolute top-0 left-0 w-full rounded-full bg-gradient-to-b from-[#EC4899] via-[#7C3AED] to-[#06B6D4]"
            style={{ height: lineHeight }}
          />
        </div>

        {/* Timeline items */}
        <div className="relative z-10 space-y-16 lg:space-y-20">
          {items.map((item, idx) => (
            <TimelineItem
              key={item.project}
              item={item}
              index={idx}
              color={accentColors[idx]}
              icon={icons[idx]}
            />
          ))}
        </div>

        {/* End cap */}
        <motion.div
          className="hidden lg:flex absolute left-1/2 -translate-x-1/2 -bottom-3 w-3 h-3 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] items-center justify-center"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, type: "spring" }}
          style={{ boxShadow: "0 0 12px rgba(124,58,237,0.4)" }}
        />
      </div>
    </section>
  );
}
