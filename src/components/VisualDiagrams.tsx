import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "../i18n/context";
import type { Lang } from "../i18n/context";

// ─── 1. AeoWorkflowDiagram ──────────────────────────────────────────────────

const workflowNodes: Record<Lang, { icon: string; title: string; subtitle: string }[]> = {
  zh: [
    { icon: "📊", title: "你嘅品牌", subtitle: "現狀分析" },
    { icon: "🔧", title: "SurfIO AEO 優化", subtitle: "策略執行" },
    { icon: "🎯", title: "AI 引擎引用你", subtitle: "AI 搜尋結果" },
  ],
  en: [
    { icon: "📊", title: "Your Brand", subtitle: "Current Analysis" },
    { icon: "🔧", title: "SurfIO AEO", subtitle: "Strategy Execution" },
    { icon: "🎯", title: "AI Engines Cite You", subtitle: "AI Search Results" },
  ],
};

export function AeoWorkflowDiagram() {
  const lang = useLanguage();
  const nodes = workflowNodes[lang];
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="w-full py-10">
      {/* Desktop: horizontal */}
      <div className="hidden md:flex items-center justify-center gap-0">
        {nodes.map((node, i) => (
          <div key={i} className="flex items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.25, ease: [0.25, 0.4, 0.25, 1] }}
              className="flex flex-col items-center text-center w-[180px]"
            >
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#7C3AED]/10 to-[#EC4899]/10 border border-[#7C3AED]/20 flex items-center justify-center mb-3 shadow-sm">
                <span className="text-[32px]">{node.icon}</span>
              </div>
              <h4 className="text-[15px] font-bold text-gray-900 mb-1">{node.title}</h4>
              <p className="text-[12px] text-gray-500">{node.subtitle}</p>
            </motion.div>

            {i < nodes.length - 1 && (
              <div className="relative w-[80px] h-[2px] mx-2">
                {/* Track */}
                <div className="absolute inset-0 bg-gray-200 rounded-full" />
                {/* Animated fill */}
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#7C3AED] to-[#EC4899] rounded-full"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: "100%" } : {}}
                  transition={{ duration: 0.6, delay: i * 0.25 + 0.3 }}
                />
                {/* Pulse dot */}
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#7C3AED]"
                  initial={{ left: 0, opacity: 0 }}
                  animate={
                    isInView
                      ? {
                          left: ["0%", "100%"],
                          opacity: [0, 1, 1, 0],
                        }
                      : {}
                  }
                  transition={{
                    duration: 1.5,
                    delay: i * 0.25 + 0.8,
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: "easeInOut",
                  }}
                />
                {/* Arrow head */}
                <motion.svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  className="absolute -right-1 top-1/2 -translate-y-1/2"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: i * 0.25 + 0.6 }}
                >
                  <path d="M2 1l6 4-6 4" fill="#7C3AED" />
                </motion.svg>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile: vertical */}
      <div className="flex md:hidden flex-col items-center gap-0">
        {nodes.map((node, i) => (
          <div key={i} className="flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.25 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#7C3AED]/10 to-[#EC4899]/10 border border-[#7C3AED]/20 flex items-center justify-center mb-2 shadow-sm">
                <span className="text-[26px]">{node.icon}</span>
              </div>
              <h4 className="text-[14px] font-bold text-gray-900 mb-0.5">{node.title}</h4>
              <p className="text-[11px] text-gray-500">{node.subtitle}</p>
            </motion.div>

            {i < nodes.length - 1 && (
              <div className="relative w-[2px] h-[50px] my-2">
                <div className="absolute inset-0 bg-gray-200 rounded-full" />
                <motion.div
                  className="absolute inset-x-0 top-0 bg-gradient-to-b from-[#7C3AED] to-[#EC4899] rounded-full"
                  initial={{ height: 0 }}
                  animate={isInView ? { height: "100%" } : {}}
                  transition={{ duration: 0.5, delay: i * 0.25 + 0.3 }}
                />
                <motion.svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  className="absolute -bottom-1.5 left-1/2 -translate-x-1/2"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: i * 0.25 + 0.5 }}
                >
                  <path d="M1 2l4 6 4-6" fill="#7C3AED" />
                </motion.svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── 2. ComparisonVisual ────────────────────────────────────────────────────

interface ComparisonVisualProps {
  leftTitle: string;
  rightTitle: string;
  leftItems: string[];
  rightItems: string[];
}

export function ComparisonVisual({
  leftTitle,
  rightTitle,
  leftItems,
  rightItems,
}: ComparisonVisualProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full py-6">
      {/* Left panel - Traditional / gray-red */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
        className="relative rounded-xl border border-red-200/60 bg-gradient-to-br from-gray-50 to-red-50/40 p-6 overflow-hidden"
      >
        {/* Subtle background icon */}
        <div className="absolute top-3 right-3 text-[48px] opacity-[0.06] select-none pointer-events-none">
          ✕
        </div>

        <h3 className="text-[16px] font-bold text-gray-700 mb-4 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400 shrink-0" />
          {leftTitle}
        </h3>

        <div className="space-y-3">
          {leftItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="flex items-start gap-2.5"
            >
              <span className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2.5 2.5l5 5M7.5 2.5l-5 5" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </span>
              <span className="text-[13px] text-gray-600 leading-[1.6]">{item}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Right panel - AEO / purple-green */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.4, 0.25, 1] }}
        className="relative rounded-xl border border-[#7C3AED]/20 bg-gradient-to-br from-purple-50/60 to-green-50/30 p-6 overflow-hidden"
      >
        {/* Animated glow */}
        <motion.div
          className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[#7C3AED]/5 blur-2xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        <h3 className="text-[16px] font-bold text-gray-900 mb-4 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#7C3AED] shrink-0" />
          {rightTitle}
        </h3>

        <div className="space-y-3">
          {rightItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="flex items-start gap-2.5"
            >
              <span className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 5l2.5 2.5L8 3" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="text-[13px] text-gray-700 leading-[1.6]">{item}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// ─── 3. EngineVisibilityMatrix ──────────────────────────────────────────────

type VisibilityLevel = "cited" | "recommended" | "mentioned" | "absent";

interface EngineVisibilityMatrixProps {
  highlights?: string[]; // engine names to emphasize
}

const AI_ENGINES = [
  { name: "ChatGPT", icon: "🤖" },
  { name: "Perplexity", icon: "🔍" },
  { name: "Claude", icon: "🧠" },
  { name: "Gemini", icon: "💎" },
  { name: "Copilot", icon: "✈️" },
  { name: "DeepSeek", icon: "🌊" },
  { name: "Grok", icon: "⚡" },
];

const visibilityConfig: Record<
  Lang,
  { level: VisibilityLevel; label: string; color: string; bg: string }[]
> = {
  zh: [
    { level: "cited", label: "引用", color: "text-green-600", bg: "bg-green-100" },
    { level: "recommended", label: "推薦", color: "text-emerald-600", bg: "bg-emerald-50" },
    { level: "mentioned", label: "提及", color: "text-yellow-600", bg: "bg-yellow-50" },
    { level: "absent", label: "冇出現", color: "text-red-500", bg: "bg-red-50" },
  ],
  en: [
    { level: "cited", label: "Cited", color: "text-green-600", bg: "bg-green-100" },
    { level: "recommended", label: "Recommended", color: "text-emerald-600", bg: "bg-emerald-50" },
    { level: "mentioned", label: "Mentioned", color: "text-yellow-600", bg: "bg-yellow-50" },
    { level: "absent", label: "Not Found", color: "text-red-500", bg: "bg-red-50" },
  ],
};

// Default demo data — a realistic "before SurfIO" scenario
const defaultData: Record<VisibilityLevel, boolean[]> = {
  cited: [false, false, false, false, false, false, false],
  recommended: [false, true, false, false, false, false, false],
  mentioned: [true, false, false, true, false, false, false],
  absent: [false, false, true, false, true, true, true],
};

export function EngineVisibilityMatrix({ highlights = [] }: EngineVisibilityMatrixProps) {
  const lang = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const levels = visibilityConfig[lang];

  const cellIcon = (active: boolean, level: VisibilityLevel) => {
    if (!active) return null;
    switch (level) {
      case "cited":
        return (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8l3.5 3.5L13 5" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case "recommended":
        return (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8l3.5 3.5L13 5" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case "mentioned":
        return (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="3" fill="#EAB308" />
          </svg>
        );
      case "absent":
        return (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M4 4l6 6M10 4l-6 6" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        );
    }
  };

  return (
    <div ref={ref} className="w-full py-6 overflow-x-auto">
      <div className="min-w-[600px]">
        {/* Engine headers */}
        <div className="grid grid-cols-8 gap-2 mb-3">
          <div /> {/* empty cell for row labels */}
          {AI_ENGINES.map((engine, i) => {
            const isHighlighted = highlights.includes(engine.name);
            return (
              <motion.div
                key={engine.name}
                initial={{ opacity: 0, y: -10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08 }}
                className={`flex flex-col items-center gap-1 ${
                  isHighlighted ? "relative" : ""
                }`}
              >
                {isHighlighted && (
                  <motion.div
                    className="absolute -inset-1 rounded-lg bg-[#7C3AED]/10 border border-[#7C3AED]/30"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
                <span className="text-[20px] relative z-10">{engine.icon}</span>
                <span className="text-[10px] font-semibold text-gray-600 relative z-10 text-center leading-tight">
                  {engine.name}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Visibility rows */}
        {levels.map((levelConfig, rowIndex) => (
          <div key={levelConfig.level} className="grid grid-cols-8 gap-2 mb-2">
            <div className="flex items-center">
              <span className={`text-[11px] font-semibold ${levelConfig.color}`}>
                {levelConfig.label}
              </span>
            </div>
            {AI_ENGINES.map((engine, colIndex) => {
              const active = defaultData[levelConfig.level][colIndex];
              const isHighlighted = highlights.includes(engine.name);
              return (
                <motion.div
                  key={`${levelConfig.level}-${engine.name}`}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    delay: rowIndex * 0.12 + colIndex * 0.06,
                    duration: 0.3,
                    ease: [0.25, 0.4, 0.25, 1],
                  }}
                  className={`h-9 rounded-lg flex items-center justify-center ${
                    active ? levelConfig.bg : "bg-gray-50"
                  } ${isHighlighted && active ? "ring-1 ring-[#7C3AED]/30" : ""}`}
                >
                  {cellIcon(active, levelConfig.level)}
                </motion.div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 mt-4 pt-3 border-t border-gray-100">
        {levels.map((l) => (
          <div key={l.level} className="flex items-center gap-1.5">
            <span className={`w-3 h-3 rounded-sm ${l.bg} border border-gray-200`} />
            <span className={`text-[11px] font-medium ${l.color}`}>{l.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── 4. ProcessTimeline ─────────────────────────────────────────────────────

interface ProcessTimelineStep {
  title: string;
  duration: string;
  desc: string;
}

interface ProcessTimelineProps {
  steps: ProcessTimelineStep[];
}

export function ProcessTimeline({ steps }: ProcessTimelineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const lang = useLanguage();
  const currentLabel = lang === "en" ? "Current" : "進行中";

  // Default to step 0 as "current" — could be made configurable
  const currentStep = 0;

  return (
    <div ref={ref} className="w-full py-6">
      <div className="relative pl-8 md:pl-10">
        {/* Vertical line track */}
        <div className="absolute left-[14px] md:left-[18px] top-0 bottom-0 w-[2px] bg-gray-200 rounded-full" />

        {/* Animated progress fill */}
        <motion.div
          className="absolute left-[14px] md:left-[18px] top-0 w-[2px] bg-gradient-to-b from-[#7C3AED] to-[#EC4899] rounded-full origin-top"
          initial={{ height: 0 }}
          animate={
            isInView
              ? { height: `${((currentStep + 1) / steps.length) * 100}%` }
              : {}
          }
          transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
        />

        {steps.map((step, i) => {
          const isCurrent = i === currentStep;
          const isPast = i < currentStep;
          const isFuture = i > currentStep;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.15, duration: 0.5 }}
              className={`relative mb-8 last:mb-0 ${isFuture ? "opacity-60" : ""}`}
            >
              {/* Node dot */}
              <div
                className={`absolute -left-8 md:-left-10 top-1 w-[14px] h-[14px] md:w-[18px] md:h-[18px] rounded-full border-2 flex items-center justify-center ${
                  isCurrent
                    ? "border-[#7C3AED] bg-white"
                    : isPast
                      ? "border-[#7C3AED] bg-[#7C3AED]"
                      : "border-gray-300 bg-white"
                }`}
              >
                {isPast && (
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path d="M1.5 4l2 2L6.5 2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
                {isCurrent && (
                  <motion.div
                    className="w-[6px] h-[6px] md:w-2 md:h-2 rounded-full bg-[#7C3AED]"
                    animate={{ scale: [1, 1.4, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}
              </div>

              {/* Content */}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] font-bold text-[#7C3AED] bg-[#7C3AED]/8 px-2 py-0.5 rounded-full">
                    {step.duration}
                  </span>
                  {isCurrent && (
                    <motion.span
                      className="text-[10px] font-bold text-white bg-[#7C3AED] px-2 py-0.5 rounded-full"
                      animate={{ opacity: [1, 0.6, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {currentLabel}
                    </motion.span>
                  )}
                </div>
                <h4 className="text-[15px] font-bold text-gray-900 mb-1">{step.title}</h4>
                <p className="text-[13px] text-gray-600 leading-[1.65]">{step.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ─── 5. StatCounter ─────────────────────────────────────────────────────────

interface StatCounterProps {
  value: number;
  suffix?: string;
  label: string;
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function StatCounter({ value, suffix = "", label }: StatCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  const animate = useCallback(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const duration = 1800; // ms
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      setDisplayValue(Math.round(eased * value));

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }, [value]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [animate]);

  return (
    <div ref={ref} className="flex flex-col items-center text-center">
      <motion.div
        className="text-[clamp(36px,6vw,56px)] font-extrabold bg-gradient-to-r from-[#7C3AED] to-[#EC4899] bg-clip-text text-transparent leading-none"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {displayValue}
        {suffix}
      </motion.div>
      <motion.p
        className="text-[13px] text-gray-500 mt-2 font-medium"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        {label}
      </motion.p>
    </div>
  );
}
