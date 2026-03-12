import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage, type Lang } from "../i18n/context";
import { ALL_INDUSTRIES } from "../data/pseo/types";

// ─── Constants ───────────────────────────────────────────────────────────────

const CALENDLY = "https://calendly.com/acesley180604/aeo-service-free-audit-surfio";
const TOTAL_STEPS = 4;

// ─── Industry Baseline Scores ────────────────────────────────────────────────
// Higher = industry naturally has more AI visibility (tech, SaaS etc.)
// Lower = industries that are traditionally offline-heavy

const INDUSTRY_BASELINE: Record<string, number> = {
  "crm-software": 14, "hr-systems": 13, "cybersecurity": 14,
  "marketing-automation": 14, "data-analytics": 15, "blockchain": 13,
  "biotech": 12, "vr-ar": 13, "cleantech": 11, "food-tech": 11,
  "smart-home": 12, "sleep-tech": 11, "pet-tech": 11, "esports": 12,
  "ecommerce-retail": 11, "podcast-production": 10,
  // Mid-tier
  "wealth-management": 9, "tax-advisory": 9, "insurance": 8,
  "mortgage": 8, "accounting": 9, "fund-management": 9,
  "management-consulting": 10, "corporate-training": 9,
  "ma-advisory": 9, "headhunting": 8, "education-tutoring": 9,
  "online-therapy": 10, "language-school": 8,
  // Lower tier (traditional / local)
  "personal-injury-lawyers": 7, "immigration-lawyers": 7,
  "commercial-lawyers": 7, "ip-lawyers": 8, "family-lawyers": 6,
  "criminal-lawyers": 6, "plastic-surgery": 7, "dermatology": 7,
  "dentistry": 6, "fertility": 7, "psychiatry": 7, "tcm": 5,
  "commercial-real-estate": 6, "luxury-property": 6,
  "property-management": 5, "travel": 7, "hotel": 7,
  "home-services": 5, "automotive": 6, "recruitment": 7,
  "event-planning": 5, "architecture": 6, "renovation": 5,
  "wedding-planning": 5, "photography": 6, "beauty": 5,
  "fitness": 6, "pet-services": 5, "fnb": 5, "retail": 6,
  "logistics": 6, "printing": 4, "advertising": 8,
  "drone-services": 8, "coworking": 7, "music-production": 6,
  "sustainability-consulting": 9, "vertical-farming": 8,
  "carbon-trading": 9, "childcare": 5, "elderly-care": 5,
};

const DEFAULT_BASELINE = 7;

// ─── i18n Strings ────────────────────────────────────────────────────────────

const t = (lang: Lang) => ({
  // Header
  title: lang === "en" ? "AEO Readiness Score" : "AEO 準備度評分",
  subtitle: lang === "en"
    ? "Find out how ready your business is for AI search in 2 minutes"
    : "2 分鐘測試你嘅業務 AI 搜尋準備度",

  // Progress
  step: lang === "en" ? "Step" : "步驟",
  of: lang === "en" ? "of" : "/",

  // Step 1
  step1Title: lang === "en" ? "Your Industry" : "你嘅行業",
  step1Desc: lang === "en"
    ? "Select your industry to get a personalized score"
    : "揀你嘅行業以獲得個人化評分",
  selectIndustry: lang === "en" ? "Select industry..." : "揀選行業...",
  searchIndustry: lang === "en" ? "Search industry..." : "搜尋行業...",

  // Step 2
  step2Title: lang === "en" ? "Digital Presence" : "數碼存在",
  step2Desc: lang === "en"
    ? "Which of these does your business have?"
    : "你嘅業務有邊啲？",
  presence: [
    lang === "en" ? "Has own website" : "有自己嘅網站",
    lang === "en" ? "Has Google My Business" : "有 Google My Business",
    lang === "en" ? "Has Schema Markup" : "有 Schema Markup",
    lang === "en" ? "Regular blog updates" : "有定期更新 Blog",
    lang === "en" ? "Has social media accounts" : "有社交媒體帳號",
    lang === "en" ? "Has video content" : "有影片內容",
  ],

  // Step 3
  step3Title: lang === "en" ? "AI Visibility Check" : "AI 能見度檢查",
  step3Desc: lang === "en"
    ? "Can your brand be found on these AI platforms?"
    : "你嘅品牌喺呢啲 AI 平台搜到嗎？",
  platforms: [
    lang === "en" ? "Can your brand be found on ChatGPT?" : "你嘅品牌喺 ChatGPT 搜到嗎？",
    lang === "en" ? "Can your brand be found on Perplexity?" : "你嘅品牌喺 Perplexity 搜到嗎？",
    lang === "en" ? "Can your brand be found on Google AI Overview?" : "你嘅品牌喺 Google AI Overview 搜到嗎？",
  ],
  yes: lang === "en" ? "Yes" : "有",
  no: lang === "en" ? "No" : "冇",
  dontKnow: lang === "en" ? "Don't know" : "唔知",

  // Step 4
  step4Title: lang === "en" ? "Content Assessment" : "內容評估",
  step4Desc: lang === "en"
    ? "Rate your content on a scale of 1-5"
    : "以 1-5 分評價你嘅內容",
  sliders: [
    lang === "en" ? "Content Originality" : "內容原創性",
    lang === "en" ? "E-E-A-T Signal Strength" : "E-E-A-T 信號強度",
    lang === "en" ? "Structured Data Completeness" : "結構化數據完整度",
  ],
  low: lang === "en" ? "Low" : "低",
  high: lang === "en" ? "High" : "高",

  // Results
  yourScore: lang === "en" ? "Your AEO Readiness Score" : "你嘅 AEO 準備度分數",
  outOf: lang === "en" ? "/ 100" : "/ 100",
  categoryLabels: [
    lang === "en" ? "Digital Presence" : "數碼存在",
    lang === "en" ? "AI Visibility" : "AI 能見度",
    lang === "en" ? "Content Quality" : "內容質素",
    lang === "en" ? "Industry Baseline" : "行業基準",
  ],
  recommendations: lang === "en" ? "Recommendations" : "建議",
  ctaTitle: lang === "en" ? "Free In-Depth AEO Audit" : "免費深入 AEO 審計",
  ctaDesc: lang === "en"
    ? "Get a comprehensive AI search visibility analysis from our experts"
    : "由專家為你進行全面嘅 AI 搜尋能見度分析",
  ctaButton: lang === "en" ? "Book Free Audit" : "預約免費審計",
  shareTitle: lang === "en" ? "Share your score" : "分享你嘅分數",
  retake: lang === "en" ? "Retake Quiz" : "重新測試",

  // Navigation
  next: lang === "en" ? "Next" : "下一步",
  back: lang === "en" ? "Back" : "上一步",
  getResults: lang === "en" ? "Get Results" : "查看結果",

  // Score levels
  scoreLow: lang === "en" ? "Needs Improvement" : "需要改善",
  scoreMid: lang === "en" ? "Getting There" : "正在進步",
  scoreHigh: lang === "en" ? "Well Prepared" : "準備充分",
  scoreExcellent: lang === "en" ? "Excellent" : "非常出色",
});

// ─── Recommendation Engine ───────────────────────────────────────────────────

function getRecommendations(
  lang: Lang,
  presence: boolean[],
  visibility: (0 | 1 | 2)[],
  sliders: number[],
  _industrySlug: string,
): string[] {
  const recs: string[] = [];

  // Digital presence gaps
  if (!presence[0]) recs.push(lang === "en"
    ? "Build a professional website - it's the foundation of AI discoverability"
    : "建立專業網站 — 呢個係 AI 搜尋能見度嘅基礎");
  if (!presence[2]) recs.push(lang === "en"
    ? "Add Schema Markup to help AI engines understand your content structure"
    : "加入 Schema Markup 幫 AI 引擎理解你嘅內容結構");
  if (!presence[1]) recs.push(lang === "en"
    ? "Set up Google My Business for local AI search visibility"
    : "設定 Google My Business 提升本地 AI 搜尋能見度");
  if (!presence[3]) recs.push(lang === "en"
    ? "Start publishing regular blog content optimized for AI citations"
    : "開始定期發佈針對 AI 引用優化嘅 Blog 內容");
  if (!presence[5]) recs.push(lang === "en"
    ? "Create video content - AI engines increasingly reference multimedia"
    : "製作影片內容 — AI 引擎越來越多引用多媒體");

  // AI visibility gaps
  if (visibility[0] !== 0) recs.push(lang === "en"
    ? "Optimize your content to be cited by ChatGPT through authoritative, well-structured answers"
    : "優化內容以被 ChatGPT 引用 — 需要權威、結構良好嘅答案");
  if (visibility[1] !== 0) recs.push(lang === "en"
    ? "Build citations on Perplexity by creating fact-rich, source-backed content"
    : "透過創建事實豐富、有來源支持嘅內容喺 Perplexity 建立引用");
  if (visibility[2] !== 0) recs.push(lang === "en"
    ? "Target Google AI Overview by optimizing for featured snippets and People Also Ask"
    : "透過優化精選摘要同「其他人都想知」瞄準 Google AI Overview");

  // Content quality gaps
  if (sliders[0] <= 2) recs.push(lang === "en"
    ? "Increase content originality - AI engines prioritize unique insights over recycled content"
    : "提高內容原創性 — AI 引擎優先顯示獨特見解而非重複內容");
  if (sliders[1] <= 2) recs.push(lang === "en"
    ? "Strengthen E-E-A-T signals: add author bios, credentials, case studies, and real experience"
    : "加強 E-E-A-T 信號：加入作者簡介、資歷、案例研究同真實經驗");
  if (sliders[2] <= 2) recs.push(lang === "en"
    ? "Implement comprehensive structured data (FAQ, HowTo, Article schemas)"
    : "實施全面嘅結構化數據（FAQ、HowTo、Article schemas）");

  // Always include at least 3 recommendations
  if (recs.length < 3) {
    recs.push(lang === "en"
      ? "Monitor your AI visibility across platforms monthly using our tracking tools"
      : "使用我哋嘅追蹤工具每月監測你喺各 AI 平台嘅能見度");
  }

  return recs.slice(0, 5);
}

// ─── Score Calculation ───────────────────────────────────────────────────────

function calculateScore(
  industrySlug: string,
  presence: boolean[],
  visibility: (0 | 1 | 2)[], // 0=yes, 1=no, 2=don't know
  sliders: number[], // 1-5 each
) {
  // Digital presence: 25 points max (6 checkboxes, weighted)
  const presenceWeights = [6, 4, 5, 4, 3, 3]; // website=6, gmb=4, schema=5, blog=4, social=3, video=3
  const presenceScore = presence.reduce(
    (sum, checked, i) => sum + (checked ? presenceWeights[i] : 0), 0
  );

  // AI visibility: 30 points max (3 questions, 10 pts each)
  const visibilityScore = visibility.reduce((sum: number, val) => {
    if (val === 0) return sum + 10; // yes
    if (val === 2) return sum + 3;  // don't know
    return sum;                      // no = 0
  }, 0 as number);

  // Content quality: 30 points max (3 sliders, 10 pts each)
  const contentScore = sliders.reduce(
    (sum, val) => sum + Math.round((val / 5) * 10), 0
  );

  // Industry baseline: 15 points max
  const industryScore = INDUSTRY_BASELINE[industrySlug] ?? DEFAULT_BASELINE;

  const total = presenceScore + visibilityScore + contentScore + industryScore;

  return {
    total: Math.min(100, total),
    presence: presenceScore,
    visibility: visibilityScore,
    content: contentScore,
    industry: industryScore,
    maxPresence: 25,
    maxVisibility: 30,
    maxContent: 30,
    maxIndustry: 15,
  };
}

// ─── Animated Score Circle ───────────────────────────────────────────────────

function ScoreCircle({ score }: { score: number }) {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const getColor = (s: number) => {
    if (s < 30) return "#EF4444";
    if (s < 50) return "#F59E0B";
    if (s < 75) return "#10B981";
    return "#7C3AED";
  };

  const color = getColor(score);

  return (
    <div className="relative w-48 h-48 mx-auto">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
        {/* Background circle */}
        <circle
          cx="80" cy="80" r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="10"
        />
        {/* Score arc */}
        <motion.circle
          cx="80" cy="80" r={radius}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: [0.25, 0.4, 0.25, 1], delay: 0.3 }}
        />
        {/* Glow */}
        <motion.circle
          cx="80" cy="80" r={radius}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: [0.25, 0.4, 0.25, 1], delay: 0.3 }}
          style={{ filter: "blur(6px)", opacity: 0.4 }}
        />
      </svg>
      {/* Score number */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className="text-5xl font-bold text-white"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {score}
        </motion.span>
        <span className="text-sm text-white/50 mt-1">/ 100</span>
      </div>
    </div>
  );
}

// ─── Category Bar ────────────────────────────────────────────────────────────

function CategoryBar({
  label,
  score,
  max,
  delay,
}: {
  label: string;
  score: number;
  max: number;
  delay: number;
}) {
  const pct = Math.round((score / max) * 100);
  const getBarColor = (p: number) => {
    if (p < 30) return "from-red-500 to-red-400";
    if (p < 60) return "from-amber-500 to-amber-400";
    if (p < 80) return "from-emerald-500 to-emerald-400";
    return "from-[#7C3AED] to-[#a78bfa]";
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="text-white/80">{label}</span>
        <span className="text-white font-semibold">{score}/{max}</span>
      </div>
      <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${getBarColor(pct)}`}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, delay, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

interface AeoScoreCalculatorProps {
  industry?: string; // pre-selected industry slug
}

export default function AeoScoreCalculator({ industry }: AeoScoreCalculatorProps) {
  const lang = useLanguage();
  const i = t(lang);

  const [step, setStep] = useState(1);

  // Step 1: Industry
  const [selectedIndustry, setSelectedIndustry] = useState(industry ?? "");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Step 2: Digital presence checkboxes
  const [presence, setPresence] = useState([false, false, false, false, false, false]);

  // Step 3: AI visibility (0=yes, 1=no, 2=don't know)
  const [visibility, setVisibility] = useState<(0 | 1 | 2)[]>([2, 2, 2]);

  // Step 4: Content sliders
  const [sliders, setSliders] = useState([3, 3, 3]);

  // Results
  const [result, setResult] = useState<ReturnType<typeof calculateScore> | null>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const industries = ALL_INDUSTRIES.map((ind) => ({
    slug: ind.slug,
    label: lang === "en"
      ? ind.slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
      : ind.name,
  }));

  const filteredIndustries = search
    ? industries.filter((ind) =>
        ind.label.toLowerCase().includes(search.toLowerCase()) ||
        ind.slug.includes(search.toLowerCase())
      )
    : industries;

  const selectedLabel = industries.find((ind) => ind.slug === selectedIndustry)?.label ?? "";

  const togglePresence = useCallback((idx: number) => {
    setPresence((prev) => {
      const next = [...prev];
      next[idx] = !next[idx];
      return next;
    });
  }, []);

  const setVis = useCallback((idx: number, val: 0 | 1 | 2) => {
    setVisibility((prev) => {
      const next = [...prev] as (0 | 1 | 2)[];
      next[idx] = val;
      return next;
    });
  }, []);

  const setSlider = useCallback((idx: number, val: number) => {
    setSliders((prev) => {
      const next = [...prev];
      next[idx] = val;
      return next;
    });
  }, []);

  const canProceed = step === 1 ? selectedIndustry !== "" : true;

  const handleNext = () => {
    if (step < TOTAL_STEPS) {
      setStep(step + 1);
    } else {
      setResult(calculateScore(selectedIndustry, presence, visibility, sliders));
      setStep(5); // results
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleRetake = () => {
    setStep(1);
    setSelectedIndustry(industry ?? "");
    setPresence([false, false, false, false, false, false]);
    setVisibility([2, 2, 2]);
    setSliders([3, 3, 3]);
    setResult(null);
  };

  const getScoreLabel = (s: number) => {
    if (s < 30) return i.scoreLow;
    if (s < 50) return i.scoreMid;
    if (s < 75) return i.scoreHigh;
    return i.scoreExcellent;
  };

  const shareText = lang === "en"
    ? `I scored ${result?.total ?? 0}/100 on the AEO Readiness Score! Check yours:`
    : `我嘅 AEO 準備度分數係 ${result?.total ?? 0}/100！測試你嘅分數：`;
  const shareUrl = "https://surfio.net";

  // ─── Step transition variants ──────────────────────────────────────────────

  const stepVariants = {
    enter: { opacity: 0, x: 40 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
  };

  // ─── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#1a1025] via-[#1e1230] to-[#150d20] shadow-2xl backdrop-blur-xl">
        {/* Decorative gradient blobs */}
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#7C3AED]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-[#EC4899]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 p-6 sm:p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <motion.h2
              className="text-2xl sm:text-3xl font-bold text-white mb-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {i.title}
            </motion.h2>
            <p className="text-sm text-white/50">{i.subtitle}</p>
          </div>

          {/* Progress bar (hidden on results) */}
          {step <= TOTAL_STEPS && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-white/40 font-medium">
                  {i.step} {step} {i.of} {TOTAL_STEPS}
                </span>
                <span className="text-xs text-white/40">
                  {Math.round((step / TOTAL_STEPS) * 100)}%
                </span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899] rounded-full"
                  animate={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </div>
            </div>
          )}

          {/* Steps */}
          <AnimatePresence mode="wait">
            {/* ── Step 1: Industry ─────────────────────────────────── */}
            {step === 1 && (
              <motion.div
                key="step1"
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-lg font-semibold text-white mb-1">{i.step1Title}</h3>
                <p className="text-sm text-white/50 mb-5">{i.step1Desc}</p>

                {/* Custom dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-left transition-all ${
                      dropdownOpen
                        ? "border-[#7C3AED] bg-white/10"
                        : "border-white/15 bg-white/5 hover:border-white/25"
                    } ${selectedIndustry ? "text-white" : "text-white/40"}`}
                  >
                    <span className="truncate">
                      {selectedLabel || i.selectIndustry}
                    </span>
                    <motion.svg
                      animate={{ rotate: dropdownOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      width="16" height="16" viewBox="0 0 16 16" fill="none"
                      className="shrink-0 ml-2"
                    >
                      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </motion.svg>
                  </button>

                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute z-30 top-full mt-2 w-full rounded-xl border border-white/15 bg-[#1e1230]/95 backdrop-blur-xl shadow-2xl max-h-64 overflow-hidden flex flex-col"
                      >
                        {/* Search */}
                        <div className="p-2 border-b border-white/10">
                          <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder={i.searchIndustry}
                            className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder-white/30 outline-none focus:border-[#7C3AED] transition-colors"
                            autoFocus
                          />
                        </div>
                        {/* Options */}
                        <div className="overflow-y-auto flex-1 p-1">
                          {filteredIndustries.map((ind) => (
                            <button
                              key={ind.slug}
                              onClick={() => {
                                setSelectedIndustry(ind.slug);
                                setDropdownOpen(false);
                                setSearch("");
                              }}
                              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all ${
                                selectedIndustry === ind.slug
                                  ? "bg-[#7C3AED]/20 text-[#a78bfa] font-medium"
                                  : "text-white/70 hover:bg-white/5 hover:text-white"
                              }`}
                            >
                              {ind.label}
                            </button>
                          ))}
                          {filteredIndustries.length === 0 && (
                            <p className="text-center text-white/30 text-sm py-4">
                              {lang === "en" ? "No results" : "冇結果"}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {/* ── Step 2: Digital Presence ─────────────────────────── */}
            {step === 2 && (
              <motion.div
                key="step2"
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-lg font-semibold text-white mb-1">{i.step2Title}</h3>
                <p className="text-sm text-white/50 mb-5">{i.step2Desc}</p>

                <div className="space-y-3">
                  {i.presence.map((label, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => togglePresence(idx)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border transition-all text-left ${
                        presence[idx]
                          ? "border-[#7C3AED] bg-[#7C3AED]/10 text-white"
                          : "border-white/10 bg-white/5 text-white/60 hover:border-white/20"
                      }`}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-all ${
                        presence[idx] ? "border-[#7C3AED] bg-[#7C3AED]" : "border-white/25"
                      }`}>
                        {presence[idx] && (
                          <motion.svg
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            width="12" height="12" viewBox="0 0 12 12" fill="none"
                          >
                            <path d="M2.5 6l2.5 2.5 4.5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </motion.svg>
                        )}
                      </div>
                      <span className="text-sm">{label}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ── Step 3: AI Visibility ────────────────────────────── */}
            {step === 3 && (
              <motion.div
                key="step3"
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-lg font-semibold text-white mb-1">{i.step3Title}</h3>
                <p className="text-sm text-white/50 mb-5">{i.step3Desc}</p>

                <div className="space-y-5">
                  {i.platforms.map((question, idx) => (
                    <div key={idx} className="space-y-2.5">
                      <p className="text-sm text-white/80 font-medium">{question}</p>
                      <div className="flex gap-2">
                        {([0, 1, 2] as const).map((val) => {
                          const labels = [i.yes, i.no, i.dontKnow];
                          const isActive = visibility[idx] === val;
                          return (
                            <motion.button
                              key={val}
                              onClick={() => setVis(idx, val)}
                              className={`flex-1 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                                isActive
                                  ? val === 0
                                    ? "border-emerald-500 bg-emerald-500/15 text-emerald-400"
                                    : val === 1
                                      ? "border-red-500 bg-red-500/15 text-red-400"
                                      : "border-amber-500 bg-amber-500/15 text-amber-400"
                                  : "border-white/10 bg-white/5 text-white/40 hover:border-white/20"
                              }`}
                              whileTap={{ scale: 0.95 }}
                            >
                              {labels[val]}
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ── Step 4: Content Assessment ───────────────────────── */}
            {step === 4 && (
              <motion.div
                key="step4"
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-lg font-semibold text-white mb-1">{i.step4Title}</h3>
                <p className="text-sm text-white/50 mb-5">{i.step4Desc}</p>

                <div className="space-y-6">
                  {i.sliders.map((label, idx) => (
                    <div key={idx} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white/80 font-medium">{label}</span>
                        <span className="text-sm font-bold text-[#a78bfa]">{sliders[idx]}/5</span>
                      </div>
                      {/* Custom slider */}
                      <div className="relative">
                        <input
                          type="range"
                          min={1}
                          max={5}
                          step={1}
                          value={sliders[idx]}
                          onChange={(e) => setSlider(idx, Number(e.target.value))}
                          className="w-full h-2 rounded-full appearance-none cursor-pointer bg-white/10
                            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
                            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#7C3AED]
                            [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(124,58,237,0.5)]
                            [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white/30
                            [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5
                            [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#7C3AED]
                            [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white/30"
                        />
                        {/* Tick marks */}
                        <div className="flex justify-between mt-1 px-0.5">
                          {[1, 2, 3, 4, 5].map((v) => (
                            <span
                              key={v}
                              className={`text-[10px] ${
                                v === sliders[idx] ? "text-[#a78bfa] font-bold" : "text-white/25"
                              }`}
                            >
                              {v}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-between text-[10px] text-white/30">
                        <span>{i.low}</span>
                        <span>{i.high}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ── Step 5: Results ──────────────────────────────────── */}
            {step === 5 && result && (
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                {/* Score Circle */}
                <div className="text-center mb-6">
                  <p className="text-xs text-white/40 uppercase tracking-wider mb-4 font-medium">
                    {i.yourScore}
                  </p>
                  <ScoreCircle score={result.total} />
                  <motion.p
                    className="mt-4 text-lg font-semibold text-white/80"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                  >
                    {getScoreLabel(result.total)}
                  </motion.p>
                </div>

                {/* Category Breakdown */}
                <motion.div
                  className="space-y-4 mb-8 p-5 rounded-xl bg-white/5 border border-white/10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <CategoryBar label={i.categoryLabels[0]} score={result.presence} max={result.maxPresence} delay={0.8} />
                  <CategoryBar label={i.categoryLabels[1]} score={result.visibility} max={result.maxVisibility} delay={1.0} />
                  <CategoryBar label={i.categoryLabels[2]} score={result.content} max={result.maxContent} delay={1.2} />
                  <CategoryBar label={i.categoryLabels[3]} score={result.industry} max={result.maxIndustry} delay={1.4} />
                </motion.div>

                {/* Recommendations */}
                <motion.div
                  className="mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 }}
                >
                  <h4 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-3">
                    {i.recommendations}
                  </h4>
                  <div className="space-y-2.5">
                    {getRecommendations(lang, presence, visibility, sliders, selectedIndustry).map(
                      (rec, idx) => (
                        <div
                          key={idx}
                          className="flex gap-3 p-3 rounded-xl bg-white/5 border border-white/10"
                        >
                          <div className="w-5 h-5 rounded-full bg-[#7C3AED]/20 flex items-center justify-center shrink-0 mt-0.5">
                            <span className="text-[10px] font-bold text-[#a78bfa]">{idx + 1}</span>
                          </div>
                          <p className="text-sm text-white/70 leading-relaxed">{rec}</p>
                        </div>
                      )
                    )}
                  </div>
                </motion.div>

                {/* CTA */}
                <motion.a
                  href={CALENDLY}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full p-5 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-center group hover:shadow-[0_0_30px_rgba(124,58,237,0.3)] transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3 }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <p className="text-white font-bold text-base mb-1">{i.ctaTitle}</p>
                  <p className="text-white/60 text-xs">{i.ctaDesc}</p>
                </motion.a>

                {/* Share + Retake */}
                <motion.div
                  className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                >
                  {/* Share buttons */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-white/30 mr-1">{i.shareTitle}</span>
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-white/40 hover:border-green-500 hover:text-green-400 hover:bg-green-500/10 transition-all"
                    >
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8.002 1.333A6.663 6.663 0 001.34 8a6.6 6.6 0 00.953 3.44L1.333 14.667l3.333-.96A6.663 6.663 0 108.002 1.333z" />
                      </svg>
                    </a>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-white/40 hover:border-blue-500 hover:text-blue-400 hover:bg-blue-500/10 transition-all"
                    >
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4.003 14H1.5V5.5h2.503V14zM2.752 4.5A1.25 1.25 0 112.75 2a1.25 1.25 0 01.002 2.5zM14 14h-2.5v-4.125c0-1.042-.02-2.375-1.5-2.375-1.502 0-1.732 1.137-1.732 2.3V14H5.77V5.5h2.4v1.15h.033c.334-.613 1.15-1.262 2.367-1.262C12.94 5.388 14 6.888 14 9.05V14z" />
                      </svg>
                    </a>
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-white/40 hover:border-white/50 hover:text-white hover:bg-white/10 transition-all"
                    >
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M9.52 6.78L14.88 0h-1.27L8.96 5.89 5.37 0H.64l5.62 8.18L.64 15.5h1.27l4.91-5.71 3.93 5.71h4.73L9.52 6.78zm-1.74 2.02l-.57-.81L2.34 1.01h1.95l3.66 5.23.57.81 4.75 6.79h-1.95L7.78 8.8z" />
                      </svg>
                    </a>
                  </div>

                  {/* Retake */}
                  <button
                    onClick={handleRetake}
                    className="text-sm text-white/40 hover:text-white/70 transition-colors underline underline-offset-2"
                  >
                    {i.retake}
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation buttons (hidden on results) */}
          {step <= TOTAL_STEPS && (
            <div className="flex items-center justify-between mt-8">
              <button
                onClick={handleBack}
                disabled={step === 1}
                className={`flex items-center gap-1.5 text-sm font-medium transition-all ${
                  step === 1
                    ? "text-white/15 cursor-not-allowed"
                    : "text-white/50 hover:text-white"
                }`}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M8.5 3L5 7l3.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {i.back}
              </button>

              <motion.button
                onClick={handleNext}
                disabled={!canProceed}
                className={`flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  canProceed
                    ? "bg-[#7C3AED] text-white hover:bg-[#6D28D9] shadow-[0_0_20px_rgba(124,58,237,0.25)]"
                    : "bg-white/10 text-white/25 cursor-not-allowed"
                }`}
                whileHover={canProceed ? { scale: 1.03 } : {}}
                whileTap={canProceed ? { scale: 0.97 } : {}}
              >
                {step === TOTAL_STEPS ? i.getResults : i.next}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M5.5 3L9 7l-3.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
