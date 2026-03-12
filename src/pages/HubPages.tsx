import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useMemo, useRef } from "react";
import Reveal, { StaggerContainer, StaggerItem } from "../components/Reveal";
import { useLanguage, langPath } from "../i18n/context";
import type { Lang } from "../i18n/context";
import {
  injectMultipleJsonLd,
  cleanupJsonLd,
  setMetaTags,
  setCanonical,
  SITE,
} from "../lib/schema";
import {
  ALL_INDUSTRIES,
  INDUSTRIES_TIER1,
  INDUSTRIES_TIER2,
  INDUSTRIES_TIER3,
  AI_ENGINES,
  HK_DISTRICTS,
  GBA_CITIES,
  OVERSEAS_CITIES,
  ALL_COMPETITORS,
  GUIDE_TOPICS,
  USE_CASES,
} from "../data/pseo/types";
import { competitorToSlug } from "../data/pseo/competitors";

const CALENDLY = "https://calendly.com/acesley180604/aeo-service-free-audit-surfio";
const ITEMS_PER_PAGE = 20;

// ============================
// Shared Types
// ============================

type SortMode = "popular" | "az" | "newest";

// ============================
// Shared UI Components
// ============================

function SocialProofBar({ lang }: { lang: Lang }) {
  return (
    <div className="bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] py-3">
      <div className="max-w-[1100px] mx-auto px-5 md:px-10 flex flex-wrap items-center justify-center gap-4 md:gap-8 text-white text-[13px] md:text-[14px] font-medium">
        <span>
          {lang === "en" ? "500+ HK businesses served" : "已服務 500+ 香港企業"}
        </span>
        <span className="hidden sm:inline text-white/40">|</span>
        <span>
          {lang === "en"
            ? "7 AI engines covered"
            : "7 大 AI 引擎覆蓋"}
        </span>
        <span className="hidden sm:inline text-white/40">|</span>
        <span>
          {lang === "en"
            ? "98% client renewal rate"
            : "98% 客戶續約率"}
        </span>
      </div>
    </div>
  );
}

function HubHero({
  label,
  title,
  subtitle,
  statLine,
}: {
  label: string;
  title: string;
  subtitle: string;
  statLine: string;
}) {
  return (
    <div className="bg-gradient-to-br from-[#0f1629] to-[#1a1a3a] pt-[120px] pb-16">
      <div className="max-w-[1100px] mx-auto px-5 md:px-10 text-center">
        <Reveal>
          <p className="text-[#7C3AED] text-[12px] font-semibold tracking-[0.2em] uppercase mb-4">
            {label}
          </p>
          <h1 className="text-[clamp(28px,4vw,44px)] font-extrabold text-white leading-[1.2] mb-4">
            {title}
          </h1>
          <p className="text-[15px] text-gray-300 leading-[1.75] max-w-[700px] mx-auto mb-6">
            {subtitle}
          </p>
          <div className="inline-block bg-[#7C3AED]/20 border border-[#7C3AED]/40 rounded-xl px-6 py-3">
            <p className="text-[16px] md:text-[18px] font-bold text-white">{statLine}</p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

function HubBreadcrumb({
  items,
}: {
  items: { label: string; path?: string }[];
}) {
  const lang = useLanguage();
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol
        className="text-[12px] text-gray-400 flex items-center flex-wrap"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        {items.map((item, i) => (
          <li
            key={i}
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
            className="flex items-center"
          >
            {i > 0 && <span className="mx-2">/</span>}
            {item.path ? (
              <Link
                to={langPath(lang, item.path)}
                className="hover:text-gray-600"
                itemProp="item"
              >
                <span itemProp="name">{item.label}</span>
              </Link>
            ) : (
              <span className="text-gray-600" itemProp="name">
                {item.label}
              </span>
            )}
            <meta itemProp="position" content={String(i + 1)} />
          </li>
        ))}
      </ol>
    </nav>
  );
}

function HubCTA({ lang }: { lang: "zh" | "en" }) {
  return (
    <Reveal>
      <div className="bg-gradient-to-br from-[#0f1629] to-[#1a1a3a] rounded-xl p-8 md:p-12 text-center mt-16">
        <h2 className="text-[22px] md:text-[26px] font-extrabold text-white mb-3">
          {lang === "en"
            ? "Ready to Dominate AI Search?"
            : "準備好主導 AI 搜尋？"}
        </h2>
        <p className="text-[14px] text-gray-300 mb-6 max-w-[500px] mx-auto">
          {lang === "en"
            ? "Book a free AI search visibility audit and discover how to get recommended by ChatGPT, Perplexity & Google AI."
            : "預約免費 AI 搜尋能見度審計，了解點樣被 ChatGPT、Perplexity 同 Google AI 推薦。"}
        </p>
        <motion.a
          href={CALENDLY}
          className="inline-block px-6 py-3 rounded-lg bg-[#7C3AED] text-white text-[14px] font-semibold hover:bg-[#6D28D9] transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          {lang === "en"
            ? "Free AI Search Visibility Audit"
            : "免費 AI 搜尋能見度審計"}
        </motion.a>
      </div>
    </Reveal>
  );
}

function HubCard({
  to,
  title,
  subtitle,
}: {
  to: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <StaggerItem>
      <Link to={to}>
        <motion.div
          className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:border-[#7C3AED] hover:shadow-lg transition-all cursor-pointer"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.2 }}
        >
          <h3 className="text-[14px] font-bold text-gray-900 leading-snug">
            {title}
          </h3>
          {subtitle && (
            <p className="text-[12px] text-gray-500 mt-1 line-clamp-1">
              {subtitle}
            </p>
          )}
        </motion.div>
      </Link>
    </StaggerItem>
  );
}

// ============================
// Search Bar Component
// ============================

function HubSearchBar({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <div className="relative mb-6">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <svg
          className="w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-11 pr-10 py-3 rounded-xl border border-gray-200 bg-white text-[14px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/20 transition-all"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
}

// ============================
// Category Filter Tabs
// ============================

function CategoryTabs({
  categories,
  activeCategory,
  onSelect,
}: {
  categories: { key: string; label: string; count: number }[];
  activeCategory: string;
  onSelect: (key: string) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={scrollRef}
      className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {categories.map((cat) => (
        <button
          key={cat.key}
          onClick={() => onSelect(cat.key)}
          className={`flex-shrink-0 px-4 py-2 rounded-full text-[13px] font-medium transition-all ${
            activeCategory === cat.key
              ? "bg-[#7C3AED] text-white shadow-md"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {cat.label}
          <span
            className={`ml-1.5 text-[11px] ${
              activeCategory === cat.key ? "text-white/70" : "text-gray-400"
            }`}
          >
            ({cat.count})
          </span>
        </button>
      ))}
    </div>
  );
}

// ============================
// Results Count + Sort
// ============================

function ResultsBar({
  lang,
  showing,
  total,
  sort,
  onSortChange,
}: {
  lang: Lang;
  showing: number;
  total: number;
  sort: SortMode;
  onSortChange: (s: SortMode) => void;
}) {
  const sortLabels: Record<SortMode, { zh: string; en: string }> = {
    popular: { zh: "最熱門", en: "Most Popular" },
    az: { zh: "A-Z", en: "A-Z" },
    newest: { zh: "最新", en: "Newest" },
  };

  return (
    <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
      <p className="text-[13px] text-gray-500">
        {lang === "en"
          ? `Showing 1-${showing} of ${total} results`
          : `顯示 1-${showing} / ${total} 個結果`}
      </p>
      <div className="flex items-center gap-2">
        <span className="text-[12px] text-gray-400">
          {lang === "en" ? "Sort:" : "排序:"}
        </span>
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortMode)}
          className="text-[13px] border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:border-[#7C3AED] cursor-pointer"
        >
          {(Object.keys(sortLabels) as SortMode[]).map((key) => (
            <option key={key} value={key}>
              {lang === "en" ? sortLabels[key].en : sortLabels[key].zh}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

// ============================
// Load More Button
// ============================

function LoadMoreButton({
  lang,
  onClick,
  remaining,
}: {
  lang: Lang;
  onClick: () => void;
  remaining: number;
}) {
  return (
    <div className="flex justify-center mt-8">
      <motion.button
        onClick={onClick}
        className="px-8 py-3 rounded-xl bg-[#7C3AED]/10 border border-[#7C3AED]/30 text-[#7C3AED] text-[14px] font-semibold hover:bg-[#7C3AED]/20 transition-all"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
      >
        {lang === "en"
          ? `Load More (${remaining} remaining)`
          : `載入更多 (剩餘 ${remaining} 個)`}
      </motion.button>
    </div>
  );
}

// ============================
// No Results
// ============================

function NoResults({ lang }: { lang: Lang }) {
  return (
    <div className="text-center py-12">
      <p className="text-gray-400 text-[15px]">
        {lang === "en"
          ? "No results found. Try a different search term."
          : "搵唔到結果，試下其他關鍵詞。"}
      </p>
    </div>
  );
}

function itemListSchema(
  name: string,
  description: string,
  url: string,
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    description,
    url,
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: item.url,
    })),
  };
}

// ============================
// Sorting helper
// ============================

function sortItems<T>(items: T[], sort: SortMode, getName: (item: T) => string): T[] {
  if (sort === "az") {
    return [...items].sort((a, b) => getName(a).localeCompare(getName(b)));
  }
  // "popular" and "newest" keep original order (deterministic from seed data)
  return items;
}

// ============================
// Industry category grouping
// ============================

const INDUSTRY_CATEGORIES: Record<string, { zh: string; en: string; slugs: string[] }> = {
  legal: {
    zh: "法律服務",
    en: "Legal Services",
    slugs: ["personal-injury-lawyers", "immigration-lawyers", "commercial-lawyers", "ip-lawyers", "family-lawyers", "criminal-lawyers"],
  },
  medical: {
    zh: "醫療服務",
    en: "Medical & Healthcare",
    slugs: ["plastic-surgery", "dermatology", "dentistry", "fertility", "psychiatry", "tcm", "elderly-care", "online-therapy"],
  },
  finance: {
    zh: "金融服務",
    en: "Financial Services",
    slugs: ["wealth-management", "tax-advisory", "insurance", "mortgage", "accounting", "fund-management"],
  },
  tech: {
    zh: "科技",
    en: "Technology",
    slugs: ["crm-software", "hr-systems", "cybersecurity", "marketing-automation", "data-analytics", "logistics"],
  },
  consulting: {
    zh: "顧問及專業服務",
    en: "Consulting & Professional Services",
    slugs: ["management-consulting", "corporate-training", "ma-advisory", "headhunting", "recruitment", "sustainability-consulting"],
  },
  property: {
    zh: "地產",
    en: "Property",
    slugs: ["commercial-real-estate", "luxury-property", "property-management", "coworking"],
  },
  lifestyle: {
    zh: "生活服務",
    en: "Lifestyle & Retail",
    slugs: ["ecommerce-retail", "travel", "hotel", "home-services", "automotive", "renovation", "beauty", "fitness", "pet-services", "fnb", "retail", "printing"],
  },
  creative: {
    zh: "創意產業",
    en: "Creative",
    slugs: ["event-planning", "architecture", "wedding-planning", "photography", "advertising", "podcast-production", "music-production"],
  },
  education: {
    zh: "教育",
    en: "Education",
    slugs: ["education-tutoring", "language-school", "childcare"],
  },
  emerging: {
    zh: "新興科技",
    en: "Emerging Tech",
    slugs: ["blockchain", "cleantech", "biotech", "drone-services", "vr-ar", "food-tech", "smart-home", "esports", "vertical-farming", "carbon-trading", "pet-tech", "sleep-tech"],
  },
};

// Industry tier mapping
const INDUSTRY_TIER_MAP = new Map<string, string>();
INDUSTRIES_TIER1.forEach((i) => INDUSTRY_TIER_MAP.set(i.slug, "tier1"));
INDUSTRIES_TIER2.forEach((i) => INDUSTRY_TIER_MAP.set(i.slug, "tier2"));
INDUSTRIES_TIER3.forEach((i) => INDUSTRY_TIER_MAP.set(i.slug, "tier3"));

// Industry category mapping
const INDUSTRY_CAT_MAP = new Map<string, string>();
Object.entries(INDUSTRY_CATEGORIES).forEach(([catKey, cat]) => {
  cat.slugs.forEach((slug) => INDUSTRY_CAT_MAP.set(slug, catKey));
});

// ============================
// 1. IndustryEngineHub
// ============================

export function IndustryEngineHub() {
  const lang = useLanguage();
  const totalPages = ALL_INDUSTRIES.length * AI_ENGINES.length;
  const pagePath = lang === "en" ? "/en/aeo/industries" : "/aeo/industries";

  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [sort, setSort] = useState<SortMode>("popular");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  // Reset pagination when filter/search changes
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [search, activeFilter, sort]);

  useEffect(() => {
    const title =
      lang === "en"
        ? `All ${ALL_INDUSTRIES.length} Industries × ${AI_ENGINES.length} AI Engines — ${totalPages} AEO Pages | SurfIO`
        : `全部 ${ALL_INDUSTRIES.length} 個行業 × ${AI_ENGINES.length} 大 AI 引擎 — ${totalPages} 頁專業分析 | SurfIO`;
    const desc =
      lang === "en"
        ? `Browse all ${totalPages} industry × AI engine AEO analysis pages. Expert optimization strategies for every industry on every major AI search platform.`
        : `瀏覽全部 ${totalPages} 頁行業 × AI 引擎 AEO 分析。涵蓋每個行業喺每個主要 AI 搜尋平台嘅專業優化策略。`;

    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", desc);
    setCanonical(`${SITE.url}${pagePath}`);
    setMetaTags({
      "og:type": "website",
      "og:url": `${SITE.url}${pagePath}`,
      "og:title": title,
      "og:description": desc,
      "og:image": `${SITE.url}/logos/surfio-icon.png`,
      "og:site_name": "SurfIO",
      "og:locale": lang === "en" ? "en" : "zh_HK",
    });

    const allItems: { name: string; url: string }[] = [];
    for (const ind of ALL_INDUSTRIES) {
      for (const eng of AI_ENGINES) {
        allItems.push({
          name: `${ind.name} × ${eng.name}`,
          url: `${SITE.url}${lang === "en" ? "/en" : ""}/aeo/${ind.slug}/${eng.slug}`,
        });
      }
    }
    injectMultipleJsonLd([
      {
        id: "ld-hub-industry-engine",
        data: itemListSchema(
          lang === "en" ? "Industry × AI Engine AEO Analysis" : "行業 × AI 引擎 AEO 分析",
          desc,
          `${SITE.url}${pagePath}`,
          allItems
        ),
      },
    ]);

    window.scrollTo(0, 0);
    return () => cleanupJsonLd(["ld-hub-industry-engine"]);
  }, [lang]);

  // Filter categories: Tier + Category
  const filterCategories = useMemo(() => {
    const cats: { key: string; label: string; count: number }[] = [
      {
        key: "all",
        label: lang === "en" ? "All" : "全部",
        count: ALL_INDUSTRIES.length,
      },
      {
        key: "tier1",
        label: lang === "en" ? "Tier 1" : "第一梯隊",
        count: INDUSTRIES_TIER1.length,
      },
      {
        key: "tier2",
        label: lang === "en" ? "Tier 2" : "第二梯隊",
        count: INDUSTRIES_TIER2.length,
      },
      {
        key: "tier3",
        label: lang === "en" ? "Tier 3" : "第三梯隊",
        count: INDUSTRIES_TIER3.length,
      },
    ];
    Object.entries(INDUSTRY_CATEGORIES).forEach(([key, cat]) => {
      cats.push({
        key: `cat-${key}`,
        label: lang === "en" ? cat.en : cat.zh,
        count: cat.slugs.filter((s) =>
          ALL_INDUSTRIES.some((ind) => ind.slug === s)
        ).length,
      });
    });
    return cats;
  }, [lang]);

  const filteredIndustries = useMemo(() => {
    let list = [...ALL_INDUSTRIES];

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (ind) =>
          ind.name.toLowerCase().includes(q) ||
          ind.slug.toLowerCase().includes(q)
      );
    }

    // Filter
    if (activeFilter === "tier1") {
      list = list.filter((ind) => INDUSTRY_TIER_MAP.get(ind.slug) === "tier1");
    } else if (activeFilter === "tier2") {
      list = list.filter((ind) => INDUSTRY_TIER_MAP.get(ind.slug) === "tier2");
    } else if (activeFilter === "tier3") {
      list = list.filter((ind) => INDUSTRY_TIER_MAP.get(ind.slug) === "tier3");
    } else if (activeFilter.startsWith("cat-")) {
      const catKey = activeFilter.replace("cat-", "");
      const catSlugs = INDUSTRY_CATEGORIES[catKey]?.slugs ?? [];
      list = list.filter((ind) => catSlugs.includes(ind.slug));
    }

    // Sort
    list = sortItems(list, sort, (ind) => ind.name);

    return list;
  }, [search, activeFilter, sort]);

  const visibleIndustries = filteredIndustries.slice(0, visibleCount);
  const remaining = filteredIndustries.length - visibleCount;

  return (
    <div className="pb-16">
      <HubHero
        label={lang === "en" ? "Industry × AI Engine" : "行業 × AI 引擎"}
        title={
          lang === "en"
            ? "Industry × AI Engine AEO Analysis"
            : "行業 × AI 引擎 AEO 分析"
        }
        subtitle={
          lang === "en"
            ? "Expert AEO optimization strategies for every industry on every major AI search platform. Find your industry and discover how to get recommended."
            : "每個行業喺每個主要 AI 搜尋平台嘅專業 AEO 優化策略。搵到你嘅行業，了解點樣被推薦。"
        }
        statLine={
          lang === "en"
            ? `${ALL_INDUSTRIES.length} Industries × ${AI_ENGINES.length} AI Engines = ${totalPages} Expert Analysis Pages`
            : `${ALL_INDUSTRIES.length} 個行業 × ${AI_ENGINES.length} 大 AI 引擎 = ${totalPages} 頁專業分析`
        }
      />
      <SocialProofBar lang={lang} />

      <div className="max-w-[1100px] mx-auto px-5 md:px-10 pt-10">
        <HubBreadcrumb
          items={[
            { label: lang === "en" ? "Home" : "首頁", path: "/" },
            { label: lang === "en" ? "Industries" : "行業" },
          ]}
        />

        <HubSearchBar
          value={search}
          onChange={setSearch}
          placeholder={lang === "en" ? "Search industries..." : "搜尋行業..."}
        />

        <CategoryTabs
          categories={filterCategories}
          activeCategory={activeFilter}
          onSelect={setActiveFilter}
        />

        <ResultsBar
          lang={lang}
          showing={Math.min(visibleCount, filteredIndustries.length)}
          total={filteredIndustries.length}
          sort={sort}
          onSortChange={setSort}
        />

        {filteredIndustries.length === 0 ? (
          <NoResults lang={lang} />
        ) : (
          <>
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <AnimatePresence mode="popLayout">
                {visibleIndustries.map((ind) => (
                  <StaggerItem key={ind.slug}>
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
                    >
                      <h3 className="text-[15px] font-bold text-gray-900 mb-3">
                        {ind.name}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {AI_ENGINES.map((eng) => (
                          <Link
                            key={eng.slug}
                            to={langPath(lang, `/aeo/${ind.slug}/${eng.slug}`)}
                            className="px-3 py-1.5 rounded-full border border-gray-200 text-[11px] text-gray-600 hover:border-[#7C3AED] hover:text-[#7C3AED] hover:bg-purple-50 transition-colors"
                          >
                            {eng.name}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  </StaggerItem>
                ))}
              </AnimatePresence>
            </StaggerContainer>

            {remaining > 0 && (
              <LoadMoreButton
                lang={lang}
                onClick={() => setVisibleCount((c) => c + ITEMS_PER_PAGE)}
                remaining={remaining}
              />
            )}
          </>
        )}

        <HubCTA lang={lang} />
      </div>
    </div>
  );
}

// ============================
// 2. CompetitorHub
// ============================

const COMPETITOR_CATEGORIES = [
  { key: "SEO Agency", zh: "SEO 代理公司", en: "SEO Agencies" },
  { key: "SEO Tools", zh: "SEO 工具", en: "SEO Tools" },
  { key: "AI Content Tools", zh: "AI 內容工具", en: "AI Content Tools" },
  { key: "Content Platforms", zh: "內容平台", en: "Content Platforms" },
  { key: "Digital PR", zh: "數碼公關", en: "Digital PR" },
];

const PAGE_TYPE_LABELS: Record<string, { zh: string; en: string }> = {
  alternative: { zh: "替代方案", en: "Alternative" },
  comparison: { zh: "比較", en: "Comparison" },
  migration: { zh: "遷移", en: "Migration" },
};

const PAGE_TYPE_SUFFIXES_ZH: Record<string, string> = {
  alternative: "替代方案",
  comparison: "比較",
  migration: "遷移",
};

export function CompetitorHub() {
  const lang = useLanguage();
  const totalCompetitors = ALL_COMPETITORS.length;
  const totalPages = totalCompetitors * 3;
  const pagePath = lang === "en" ? "/en/vs" : "/vs";

  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [sort, setSort] = useState<SortMode>("popular");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [search, activeFilter, sort]);

  useEffect(() => {
    const title =
      lang === "en"
        ? `SurfIO vs ${totalCompetitors} Competitors — ${totalPages} Comparison Pages | SurfIO`
        : `SurfIO vs ${totalCompetitors} 個競爭對手 — ${totalPages} 頁比較分析 | SurfIO`;
    const desc =
      lang === "en"
        ? `Compare SurfIO with ${totalCompetitors} competitors across SEO agencies, tools, AI content platforms and digital PR. Find out why SurfIO is the AEO specialist.`
        : `比較 SurfIO 同 ${totalCompetitors} 個競爭對手，涵蓋 SEO 代理、工具、AI 內容平台同數碼公關。了解點解 SurfIO 係 AEO 專家。`;

    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", desc);
    setCanonical(`${SITE.url}${pagePath}`);
    setMetaTags({
      "og:type": "website",
      "og:url": `${SITE.url}${pagePath}`,
      "og:title": title,
      "og:description": desc,
      "og:image": `${SITE.url}/logos/surfio-icon.png`,
      "og:site_name": "SurfIO",
      "og:locale": lang === "en" ? "en" : "zh_HK",
    });

    const allItems: { name: string; url: string }[] = [];
    for (const comp of ALL_COMPETITORS) {
      const slug = competitorToSlug(comp.name);
      for (const pt of ["替代方案", "比較", "遷移"]) {
        allItems.push({
          name: `SurfIO vs ${comp.name} (${pt})`,
          url: `${SITE.url}${lang === "en" ? "/en" : ""}/vs/${slug}-${pt}`,
        });
      }
    }
    injectMultipleJsonLd([
      {
        id: "ld-hub-competitor",
        data: itemListSchema(
          lang === "en" ? "SurfIO Competitor Comparisons" : "SurfIO 競爭對手比較",
          desc,
          `${SITE.url}${pagePath}`,
          allItems
        ),
      },
    ]);

    window.scrollTo(0, 0);
    return () => cleanupJsonLd(["ld-hub-competitor"]);
  }, [lang]);

  const filterCategories = useMemo(() => {
    const cats: { key: string; label: string; count: number }[] = [
      {
        key: "all",
        label: lang === "en" ? "All" : "全部",
        count: ALL_COMPETITORS.length,
      },
    ];
    COMPETITOR_CATEGORIES.forEach((cat) => {
      cats.push({
        key: cat.key,
        label: lang === "en" ? cat.en : cat.zh,
        count: ALL_COMPETITORS.filter((c) => c.category === cat.key).length,
      });
    });
    return cats;
  }, [lang]);

  const filteredCompetitors = useMemo(() => {
    let list = [...ALL_COMPETITORS];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q)
      );
    }

    if (activeFilter !== "all") {
      list = list.filter((c) => c.category === activeFilter);
    }

    list = sortItems(list, sort, (c) => c.name);

    return list;
  }, [search, activeFilter, sort]);

  const visibleCompetitors = filteredCompetitors.slice(0, visibleCount);
  const remaining = filteredCompetitors.length - visibleCount;

  return (
    <div className="pb-16">
      <HubHero
        label={lang === "en" ? "Competitor Comparisons" : "競爭對手比較"}
        title={
          lang === "en"
            ? "SurfIO vs The Competition"
            : "SurfIO vs 競爭對手"
        }
        subtitle={
          lang === "en"
            ? "See how SurfIO's AEO expertise compares to traditional SEO agencies, tools, AI content platforms and digital PR services."
            : "了解 SurfIO 嘅 AEO 專業技術點樣同傳統 SEO 代理、工具、AI 內容平台同數碼公關服務比較。"
        }
        statLine={
          lang === "en"
            ? `${totalCompetitors} Competitors × 3 Page Types = ${totalPages} Comparison Pages`
            : `${totalCompetitors} 個競爭對手 × 3 種頁面 = ${totalPages} 頁比較分析`
        }
      />
      <SocialProofBar lang={lang} />

      <div className="max-w-[1100px] mx-auto px-5 md:px-10 pt-10">
        <HubBreadcrumb
          items={[
            { label: lang === "en" ? "Home" : "首頁", path: "/" },
            { label: lang === "en" ? "Comparisons" : "比較" },
          ]}
        />

        <HubSearchBar
          value={search}
          onChange={setSearch}
          placeholder={
            lang === "en"
              ? "Search competitors..."
              : "搜尋競爭對手..."
          }
        />

        <CategoryTabs
          categories={filterCategories}
          activeCategory={activeFilter}
          onSelect={setActiveFilter}
        />

        <ResultsBar
          lang={lang}
          showing={Math.min(visibleCount, filteredCompetitors.length)}
          total={filteredCompetitors.length}
          sort={sort}
          onSortChange={setSort}
        />

        {filteredCompetitors.length === 0 ? (
          <NoResults lang={lang} />
        ) : (
          <>
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <AnimatePresence mode="popLayout">
                {visibleCompetitors.map((comp) => {
                  const slug = competitorToSlug(comp.name);
                  return (
                    <StaggerItem key={comp.name}>
                      <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
                      >
                        <h3 className="text-[14px] font-bold text-gray-900 mb-2">
                          SurfIO vs {comp.name}
                        </h3>
                        <p className="text-[11px] text-gray-400 mb-2">
                          {comp.category}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {(["alternative", "comparison", "migration"] as const).map(
                            (pt) => (
                              <Link
                                key={pt}
                                to={langPath(lang, `/vs/${slug}-${PAGE_TYPE_SUFFIXES_ZH[pt]}`)}
                                className="px-3 py-1.5 rounded-full border border-gray-200 text-[11px] text-gray-600 hover:border-[#7C3AED] hover:text-[#7C3AED] hover:bg-purple-50 transition-colors"
                              >
                                {lang === "en"
                                  ? PAGE_TYPE_LABELS[pt].en
                                  : PAGE_TYPE_LABELS[pt].zh}
                              </Link>
                            )
                          )}
                        </div>
                      </motion.div>
                    </StaggerItem>
                  );
                })}
              </AnimatePresence>
            </StaggerContainer>

            {remaining > 0 && (
              <LoadMoreButton
                lang={lang}
                onClick={() => setVisibleCount((c) => c + ITEMS_PER_PAGE)}
                remaining={remaining}
              />
            )}
          </>
        )}

        <HubCTA lang={lang} />
      </div>
    </div>
  );
}

// ============================
// 3. LocationHub
// ============================

export function LocationHub() {
  const lang = useLanguage();
  const totalLocations = HK_DISTRICTS.length + GBA_CITIES.length + OVERSEAS_CITIES.length;
  const pagePath = lang === "en" ? "/en/aeo-agency" : "/aeo-agency";

  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [sort, setSort] = useState<SortMode>("popular");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [search, activeFilter, sort]);

  useEffect(() => {
    const title =
      lang === "en"
        ? `AEO Agency in ${totalLocations} Locations | SurfIO`
        : `${totalLocations} 個地區嘅 AEO 代理服務 | SurfIO`;
    const desc =
      lang === "en"
        ? `SurfIO provides AEO services across ${totalLocations} locations including ${HK_DISTRICTS.length} HK districts, ${GBA_CITIES.length} GBA cities and ${OVERSEAS_CITIES.length} overseas cities.`
        : `SurfIO 喺 ${totalLocations} 個地區提供 AEO 服務，涵蓋 ${HK_DISTRICTS.length} 個香港地區、${GBA_CITIES.length} 個大灣區城市同 ${OVERSEAS_CITIES.length} 個海外城市。`;

    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", desc);
    setCanonical(`${SITE.url}${pagePath}`);
    setMetaTags({
      "og:type": "website",
      "og:url": `${SITE.url}${pagePath}`,
      "og:title": title,
      "og:description": desc,
      "og:image": `${SITE.url}/logos/surfio-icon.png`,
      "og:site_name": "SurfIO",
      "og:locale": lang === "en" ? "en" : "zh_HK",
    });

    const allItems = [
      ...HK_DISTRICTS.map((l) => ({
        name: l.name,
        url: `${SITE.url}${lang === "en" ? "/en" : ""}/aeo-agency/${l.slug}`,
      })),
      ...GBA_CITIES.map((l) => ({
        name: l.name,
        url: `${SITE.url}${lang === "en" ? "/en" : ""}/aeo-agency/${l.slug}`,
      })),
      ...OVERSEAS_CITIES.map((l) => ({
        name: l.name,
        url: `${SITE.url}${lang === "en" ? "/en" : ""}/aeo-agency/${l.slug}`,
      })),
    ];
    injectMultipleJsonLd([
      {
        id: "ld-hub-location",
        data: itemListSchema(
          lang === "en" ? "SurfIO AEO Services by Location" : "SurfIO 各地區 AEO 服務",
          desc,
          `${SITE.url}${pagePath}`,
          allItems
        ),
      },
    ]);

    window.scrollTo(0, 0);
    return () => cleanupJsonLd(["ld-hub-location"]);
  }, [lang]);

  // Flatten all locations with type
  const allLocations = useMemo(() => {
    return [
      ...HK_DISTRICTS.map((l) => ({ ...l, type: "hk" as const })),
      ...GBA_CITIES.map((l) => ({ ...l, type: "gba" as const })),
      ...OVERSEAS_CITIES.map((l) => ({ ...l, type: "overseas" as const })),
    ];
  }, []);

  const filterCategories = useMemo(() => {
    return [
      {
        key: "all",
        label: lang === "en" ? "All" : "全部",
        count: totalLocations,
      },
      {
        key: "hk",
        label: lang === "en" ? "Hong Kong" : "香港",
        count: HK_DISTRICTS.length,
      },
      {
        key: "gba",
        label: lang === "en" ? "Greater Bay Area" : "大灣區",
        count: GBA_CITIES.length,
      },
      {
        key: "overseas",
        label: lang === "en" ? "Overseas" : "海外",
        count: OVERSEAS_CITIES.length,
      },
    ];
  }, [lang, totalLocations]);

  const filteredLocations = useMemo(() => {
    let list = [...allLocations];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.slug.toLowerCase().includes(q)
      );
    }

    if (activeFilter !== "all") {
      list = list.filter((l) => l.type === activeFilter);
    }

    list = sortItems(list, sort, (l) => l.name);

    return list;
  }, [search, activeFilter, sort, allLocations]);

  const visibleLocations = filteredLocations.slice(0, visibleCount);
  const remaining = filteredLocations.length - visibleCount;

  const typeLabel = (type: "hk" | "gba" | "overseas") => {
    const labels = {
      hk: { zh: "香港地區", en: "HK District" },
      gba: { zh: "大灣區城市", en: "GBA City" },
      overseas: { zh: "海外城市", en: "Overseas" },
    };
    return lang === "en" ? labels[type].en : labels[type].zh;
  };

  return (
    <div className="pb-16">
      <HubHero
        label={lang === "en" ? "AEO by Location" : "地區 AEO 服務"}
        title={
          lang === "en"
            ? "AEO Agency Services by Location"
            : "各地區 AEO 代理服務"
        }
        subtitle={
          lang === "en"
            ? "Local AEO expertise for businesses in Hong Kong, Greater Bay Area, and key international cities."
            : "為香港、大灣區同主要國際城市嘅企業提供本地化 AEO 專業服務。"
        }
        statLine={
          lang === "en"
            ? `${HK_DISTRICTS.length} HK Districts + ${GBA_CITIES.length} GBA Cities + ${OVERSEAS_CITIES.length} Overseas = ${totalLocations} Location Pages`
            : `${HK_DISTRICTS.length} 個香港地區 + ${GBA_CITIES.length} 個大灣區城市 + ${OVERSEAS_CITIES.length} 個海外城市 = ${totalLocations} 頁`
        }
      />
      <SocialProofBar lang={lang} />

      <div className="max-w-[1100px] mx-auto px-5 md:px-10 pt-10">
        <HubBreadcrumb
          items={[
            { label: lang === "en" ? "Home" : "首頁", path: "/" },
            { label: lang === "en" ? "Locations" : "地區" },
          ]}
        />

        <HubSearchBar
          value={search}
          onChange={setSearch}
          placeholder={
            lang === "en" ? "Search locations..." : "搜尋地區..."
          }
        />

        <CategoryTabs
          categories={filterCategories}
          activeCategory={activeFilter}
          onSelect={setActiveFilter}
        />

        <ResultsBar
          lang={lang}
          showing={Math.min(visibleCount, filteredLocations.length)}
          total={filteredLocations.length}
          sort={sort}
          onSortChange={setSort}
        />

        {filteredLocations.length === 0 ? (
          <NoResults lang={lang} />
        ) : (
          <>
            <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              <AnimatePresence mode="popLayout">
                {visibleLocations.map((loc) => (
                  <motion.div
                    key={loc.slug}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <HubCard
                      to={langPath(lang, `/aeo-agency/${loc.slug}`)}
                      title={loc.name}
                      subtitle={typeLabel(loc.type)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </StaggerContainer>

            {remaining > 0 && (
              <LoadMoreButton
                lang={lang}
                onClick={() => setVisibleCount((c) => c + ITEMS_PER_PAGE)}
                remaining={remaining}
              />
            )}
          </>
        )}

        <HubCTA lang={lang} />
      </div>
    </div>
  );
}

// ============================
// 4. GuideHub
// ============================

export function GuideHub() {
  const lang = useLanguage();
  const totalGuides = AI_ENGINES.length * GUIDE_TOPICS.length;
  const pagePath = lang === "en" ? "/en/指南" : "/指南";

  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [sort, setSort] = useState<SortMode>("popular");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [search, activeFilter, sort]);

  useEffect(() => {
    const title =
      lang === "en"
        ? `${totalGuides} AEO Guides — AI Search Optimization Knowledge Base | SurfIO`
        : `${totalGuides} 篇 AEO 指南 — AI 搜尋優化知識庫 | SurfIO`;
    const desc =
      lang === "en"
        ? `Browse ${totalGuides} expert guides covering ${AI_ENGINES.length} AI engines × ${GUIDE_TOPICS.length} topics. Master AI search optimization for every major platform.`
        : `瀏覽 ${totalGuides} 篇專業指南，涵蓋 ${AI_ENGINES.length} 個 AI 引擎 × ${GUIDE_TOPICS.length} 個主題。掌握每個主要平台嘅 AI 搜尋優化。`;

    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", desc);
    setCanonical(`${SITE.url}${pagePath}`);
    setMetaTags({
      "og:type": "website",
      "og:url": `${SITE.url}${pagePath}`,
      "og:title": title,
      "og:description": desc,
      "og:image": `${SITE.url}/logos/surfio-icon.png`,
      "og:site_name": "SurfIO",
      "og:locale": lang === "en" ? "en" : "zh_HK",
    });

    const allItems: { name: string; url: string }[] = [];
    for (const eng of AI_ENGINES) {
      for (const topic of GUIDE_TOPICS) {
        const slug = `${eng.slug}-${topic.slug}`;
        allItems.push({
          name: `${eng.name} ${topic.topicName}`,
          url: `${SITE.url}${lang === "en" ? "/en" : ""}/指南/${slug}`,
        });
      }
    }
    injectMultipleJsonLd([
      {
        id: "ld-hub-guide",
        data: itemListSchema(
          lang === "en" ? "SurfIO AEO Guides" : "SurfIO AEO 指南",
          desc,
          `${SITE.url}${pagePath}`,
          allItems
        ),
      },
    ]);

    window.scrollTo(0, 0);
    return () => cleanupJsonLd(["ld-hub-guide"]);
  }, [lang]);

  // Flatten all guides
  const allGuides = useMemo(() => {
    const list: {
      slug: string;
      engineSlug: string;
      engineName: string;
      topicName: string;
      displayName: string;
    }[] = [];
    for (const eng of AI_ENGINES) {
      for (const topic of GUIDE_TOPICS) {
        list.push({
          slug: `${eng.slug}-${topic.slug}`,
          engineSlug: eng.slug,
          engineName: eng.name,
          topicName: topic.topicName,
          displayName: `${eng.name} ${topic.topicName}`,
        });
      }
    }
    return list;
  }, []);

  const filterCategories = useMemo(() => {
    const cats: { key: string; label: string; count: number }[] = [
      {
        key: "all",
        label: lang === "en" ? "All" : "全部",
        count: allGuides.length,
      },
    ];
    AI_ENGINES.forEach((eng) => {
      cats.push({
        key: eng.slug,
        label: eng.name,
        count: GUIDE_TOPICS.length,
      });
    });
    return cats;
  }, [lang, allGuides.length]);

  const filteredGuides = useMemo(() => {
    let list = [...allGuides];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (g) =>
          g.displayName.toLowerCase().includes(q) ||
          g.topicName.toLowerCase().includes(q) ||
          g.engineName.toLowerCase().includes(q)
      );
    }

    if (activeFilter !== "all") {
      list = list.filter((g) => g.engineSlug === activeFilter);
    }

    list = sortItems(list, sort, (g) => g.displayName);

    return list;
  }, [search, activeFilter, sort, allGuides]);

  const visibleGuides = filteredGuides.slice(0, visibleCount);
  const remaining = filteredGuides.length - visibleCount;

  return (
    <div className="pb-16">
      <HubHero
        label={lang === "en" ? "AEO Guides" : "AEO 指南"}
        title={
          lang === "en"
            ? "AI Search Optimization Guides"
            : "AI 搜尋優化指南"
        }
        subtitle={
          lang === "en"
            ? "In-depth guides covering ranking factors, citation sources, optimization checklists, and more for every major AI search platform."
            : "深入指南涵蓋排名因素、引用來源、優化 Checklist 等，為每個主要 AI 搜尋平台提供專業知識。"
        }
        statLine={
          lang === "en"
            ? `${AI_ENGINES.length} AI Engines × ${GUIDE_TOPICS.length} Topics = ${totalGuides} Expert Guides`
            : `${AI_ENGINES.length} 個 AI 引擎 × ${GUIDE_TOPICS.length} 個主題 = ${totalGuides} 篇專業指南`
        }
      />
      <SocialProofBar lang={lang} />

      <div className="max-w-[1100px] mx-auto px-5 md:px-10 pt-10">
        <HubBreadcrumb
          items={[
            { label: lang === "en" ? "Home" : "首頁", path: "/" },
            { label: lang === "en" ? "Guides" : "指南" },
          ]}
        />

        <HubSearchBar
          value={search}
          onChange={setSearch}
          placeholder={
            lang === "en" ? "Search guides..." : "搜尋指南..."
          }
        />

        <CategoryTabs
          categories={filterCategories}
          activeCategory={activeFilter}
          onSelect={setActiveFilter}
        />

        <ResultsBar
          lang={lang}
          showing={Math.min(visibleCount, filteredGuides.length)}
          total={filteredGuides.length}
          sort={sort}
          onSortChange={setSort}
        />

        {filteredGuides.length === 0 ? (
          <NoResults lang={lang} />
        ) : (
          <>
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <AnimatePresence mode="popLayout">
                {visibleGuides.map((guide) => (
                  <motion.div
                    key={guide.slug}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <HubCard
                      to={langPath(lang, `/指南/${guide.slug}`)}
                      title={guide.displayName}
                      subtitle={
                        lang === "en"
                          ? `${guide.engineName} optimization guide`
                          : `${guide.engineName} 優化指南`
                      }
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </StaggerContainer>

            {remaining > 0 && (
              <LoadMoreButton
                lang={lang}
                onClick={() => setVisibleCount((c) => c + ITEMS_PER_PAGE)}
                remaining={remaining}
              />
            )}
          </>
        )}

        <HubCTA lang={lang} />
      </div>
    </div>
  );
}

// ============================
// 5. UseCaseHub
// ============================

export function UseCaseHub() {
  const lang = useLanguage();
  const totalUseCases = USE_CASES.length;
  const pagePath = lang === "en" ? "/en/用途" : "/用途";

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortMode>("popular");

  useEffect(() => {
    const title =
      lang === "en"
        ? `${totalUseCases} AEO Use Cases — How Businesses Use AI Search Optimization | SurfIO`
        : `${totalUseCases} 個 AEO 用途 — 企業點樣用 AI 搜尋優化 | SurfIO`;
    const desc =
      lang === "en"
        ? `Explore ${totalUseCases} practical AEO use cases from brand monitoring to knowledge graph optimization. See how AI search optimization drives real business results.`
        : `探索 ${totalUseCases} 個實用 AEO 用途，從品牌監測到知識圖譜優化。了解 AI 搜尋優化點樣帶嚟真實商業成果。`;

    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", desc);
    setCanonical(`${SITE.url}${pagePath}`);
    setMetaTags({
      "og:type": "website",
      "og:url": `${SITE.url}${pagePath}`,
      "og:title": title,
      "og:description": desc,
      "og:image": `${SITE.url}/logos/surfio-icon.png`,
      "og:site_name": "SurfIO",
      "og:locale": lang === "en" ? "en" : "zh_HK",
    });

    const allItems = USE_CASES.map((uc) => ({
      name: uc.name,
      url: `${SITE.url}${lang === "en" ? "/en" : ""}/用途/${uc.slug}`,
    }));
    injectMultipleJsonLd([
      {
        id: "ld-hub-usecase",
        data: itemListSchema(
          lang === "en" ? "SurfIO AEO Use Cases" : "SurfIO AEO 用途",
          desc,
          `${SITE.url}${pagePath}`,
          allItems
        ),
      },
    ]);

    window.scrollTo(0, 0);
    return () => cleanupJsonLd(["ld-hub-usecase"]);
  }, [lang]);

  const filteredUseCases = useMemo(() => {
    let list = [...USE_CASES];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (uc) =>
          uc.name.toLowerCase().includes(q) ||
          uc.slug.toLowerCase().includes(q)
      );
    }

    list = sortItems(list, sort, (uc) => uc.name);

    return list;
  }, [search, sort]);

  return (
    <div className="pb-16">
      <HubHero
        label={lang === "en" ? "AEO Use Cases" : "AEO 用途"}
        title={
          lang === "en"
            ? "AEO Use Cases for Every Business Goal"
            : "每個商業目標嘅 AEO 用途"
        }
        subtitle={
          lang === "en"
            ? "From brand monitoring to voice search optimization — discover how AEO can solve your specific business challenges."
            : "從品牌監測到語音搜尋優化——了解 AEO 點樣解決你嘅具體商業挑戰。"
        }
        statLine={
          lang === "en"
            ? `${totalUseCases} Practical AEO Use Cases`
            : `${totalUseCases} 個實用 AEO 用途`
        }
      />
      <SocialProofBar lang={lang} />

      <div className="max-w-[1100px] mx-auto px-5 md:px-10 pt-10">
        <HubBreadcrumb
          items={[
            { label: lang === "en" ? "Home" : "首頁", path: "/" },
            { label: lang === "en" ? "Use Cases" : "用途" },
          ]}
        />

        <HubSearchBar
          value={search}
          onChange={setSearch}
          placeholder={
            lang === "en" ? "Search use cases..." : "搜尋用途..."
          }
        />

        <ResultsBar
          lang={lang}
          showing={filteredUseCases.length}
          total={filteredUseCases.length}
          sort={sort}
          onSortChange={setSort}
        />

        {filteredUseCases.length === 0 ? (
          <NoResults lang={lang} />
        ) : (
          <Reveal>
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatePresence mode="popLayout">
                {filteredUseCases.map((uc) => (
                  <motion.div
                    key={uc.slug}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <HubCard
                      to={langPath(lang, `/用途/${uc.slug}`)}
                      title={uc.name}
                      subtitle={
                        lang === "en"
                          ? "AEO use case"
                          : "AEO 用途"
                      }
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </StaggerContainer>
          </Reveal>
        )}

        <HubCTA lang={lang} />
      </div>
    </div>
  );
}
