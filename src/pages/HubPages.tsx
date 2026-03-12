import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Reveal, { StaggerContainer, StaggerItem } from "../components/Reveal";
import { useLanguage, langPath } from "../i18n/context";
import {
  injectMultipleJsonLd,
  cleanupJsonLd,
  setMetaTags,
  setCanonical,
  SITE,
} from "../lib/schema";
import {
  ALL_INDUSTRIES,
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

// ============================
// Shared UI Components
// ============================

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

function CollapsibleSection({
  title,
  defaultOpen = false,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="mb-10">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 w-full text-left group mb-4"
      >
        <motion.span
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-[#7C3AED] text-[20px] font-bold"
        >
          ▸
        </motion.span>
        <h2 className="text-[20px] md:text-[24px] font-extrabold text-[#7C3AED] group-hover:text-[#6D28D9] transition-colors">
          {title}
        </h2>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: open ? "auto" : 0,
          opacity: open ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
        className="overflow-hidden"
      >
        {children}
      </motion.div>
    </div>
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

// ============================
// 1. IndustryEngineHub
// ============================

export function IndustryEngineHub() {
  const lang = useLanguage();
  const totalPages = ALL_INDUSTRIES.length * AI_ENGINES.length;
  const pagePath = lang === "en" ? "/en/aeo/industries" : "/aeo/industries";

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

  const industryMap = new Map<string, { slug: string; name: string }>(
    ALL_INDUSTRIES.map((i) => [i.slug, i])
  );

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

      <div className="max-w-[1100px] mx-auto px-5 md:px-10 pt-10">
        <HubBreadcrumb
          items={[
            { label: lang === "en" ? "Home" : "首頁", path: "/" },
            { label: lang === "en" ? "Industries" : "行業" },
          ]}
        />

        {Object.entries(INDUSTRY_CATEGORIES).map(([key, cat]) => {
          const industries = cat.slugs
            .map((s) => industryMap.get(s))
            .filter(Boolean) as { slug: string; name: string }[];
          if (industries.length === 0) return null;

          return (
            <CollapsibleSection
              key={key}
              title={`${lang === "en" ? cat.en : cat.zh} (${industries.length})`}
              defaultOpen={key === "legal" || key === "medical" || key === "finance"}
            >
              <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {industries.map((ind) => (
                  <StaggerItem key={ind.slug}>
                    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
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
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </CollapsibleSection>
          );
        })}

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

export function CompetitorHub() {
  const lang = useLanguage();
  const totalCompetitors = ALL_COMPETITORS.length;
  const totalPages = totalCompetitors * 3;
  const pagePath = lang === "en" ? "/en/vs" : "/vs";

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

      <div className="max-w-[1100px] mx-auto px-5 md:px-10 pt-10">
        <HubBreadcrumb
          items={[
            { label: lang === "en" ? "Home" : "首頁", path: "/" },
            { label: lang === "en" ? "Comparisons" : "比較" },
          ]}
        />

        {COMPETITOR_CATEGORIES.map((cat, catIdx) => {
          const competitors = ALL_COMPETITORS.filter(
            (c) => c.category === cat.key
          );
          if (competitors.length === 0) return null;

          return (
            <CollapsibleSection
              key={cat.key}
              title={`${lang === "en" ? cat.en : cat.zh} (${competitors.length})`}
              defaultOpen={catIdx < 2}
            >
              <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {competitors.map((comp) => {
                  const slug = competitorToSlug(comp.name);
                  return (
                    <StaggerItem key={comp.name}>
                      <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                        <h3 className="text-[14px] font-bold text-gray-900 mb-2">
                          SurfIO vs {comp.name}
                        </h3>
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
                      </div>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            </CollapsibleSection>
          );
        })}

        <HubCTA lang={lang} />
      </div>
    </div>
  );
}

const PAGE_TYPE_SUFFIXES_ZH: Record<string, string> = {
  alternative: "替代方案",
  comparison: "比較",
  migration: "遷移",
};

// ============================
// 3. LocationHub
// ============================

export function LocationHub() {
  const lang = useLanguage();
  const totalLocations = HK_DISTRICTS.length + GBA_CITIES.length + OVERSEAS_CITIES.length;
  const pagePath = lang === "en" ? "/en/aeo-agency" : "/aeo-agency";

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

      <div className="max-w-[1100px] mx-auto px-5 md:px-10 pt-10">
        <HubBreadcrumb
          items={[
            { label: lang === "en" ? "Home" : "首頁", path: "/" },
            { label: lang === "en" ? "Locations" : "地區" },
          ]}
        />

        <CollapsibleSection
          title={`${lang === "en" ? "Hong Kong Districts" : "香港地區"} (${HK_DISTRICTS.length})`}
          defaultOpen
        >
          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {HK_DISTRICTS.map((loc) => (
              <HubCard
                key={loc.slug}
                to={langPath(lang, `/aeo-agency/${loc.slug}`)}
                title={loc.name}
                subtitle={lang === "en" ? "HK District" : "香港地區"}
              />
            ))}
          </StaggerContainer>
        </CollapsibleSection>

        <CollapsibleSection
          title={`${lang === "en" ? "Greater Bay Area Cities" : "大灣區城市"} (${GBA_CITIES.length})`}
          defaultOpen
        >
          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {GBA_CITIES.map((loc) => (
              <HubCard
                key={loc.slug}
                to={langPath(lang, `/aeo-agency/${loc.slug}`)}
                title={loc.name}
                subtitle={lang === "en" ? "GBA City" : "大灣區城市"}
              />
            ))}
          </StaggerContainer>
        </CollapsibleSection>

        <CollapsibleSection
          title={`${lang === "en" ? "Overseas Cities" : "海外城市"} (${OVERSEAS_CITIES.length})`}
          defaultOpen
        >
          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {OVERSEAS_CITIES.map((loc) => (
              <HubCard
                key={loc.slug}
                to={langPath(lang, `/aeo-agency/${loc.slug}`)}
                title={loc.name}
                subtitle={lang === "en" ? "Overseas" : "海外城市"}
              />
            ))}
          </StaggerContainer>
        </CollapsibleSection>

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

      <div className="max-w-[1100px] mx-auto px-5 md:px-10 pt-10">
        <HubBreadcrumb
          items={[
            { label: lang === "en" ? "Home" : "首頁", path: "/" },
            { label: lang === "en" ? "Guides" : "指南" },
          ]}
        />

        {AI_ENGINES.map((eng, engIdx) => (
          <CollapsibleSection
            key={eng.slug}
            title={`${eng.name} (${GUIDE_TOPICS.length} ${lang === "en" ? "guides" : "篇"})`}
            defaultOpen={engIdx < 3}
          >
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {GUIDE_TOPICS.map((topic) => {
                const slug = `${eng.slug}-${topic.slug}`;
                return (
                  <HubCard
                    key={slug}
                    to={langPath(lang, `/指南/${slug}`)}
                    title={`${eng.name} ${topic.topicName}`}
                    subtitle={
                      lang === "en"
                        ? `${eng.name} optimization guide`
                        : `${eng.name} 優化指南`
                    }
                  />
                );
              })}
            </StaggerContainer>
          </CollapsibleSection>
        ))}

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

      <div className="max-w-[1100px] mx-auto px-5 md:px-10 pt-10">
        <HubBreadcrumb
          items={[
            { label: lang === "en" ? "Home" : "首頁", path: "/" },
            { label: lang === "en" ? "Use Cases" : "用途" },
          ]}
        />

        <Reveal>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {USE_CASES.map((uc) => (
              <HubCard
                key={uc.slug}
                to={langPath(lang, `/用途/${uc.slug}`)}
                title={uc.name}
                subtitle={
                  lang === "en"
                    ? "AEO use case"
                    : "AEO 用途"
                }
              />
            ))}
          </StaggerContainer>
        </Reveal>

        <HubCTA lang={lang} />
      </div>
    </div>
  );
}
