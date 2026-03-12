import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
import Reveal from "../components/Reveal";
import { StaggerContainer, StaggerItem } from "../components/Reveal";
import { useLanguage, langPath } from "../i18n/context";
import { getStatisticsPages } from "../data/pseo/statistics";
import type { StatisticsData, StatisticsSectionStat } from "../data/pseo/statistics";
import {
  injectMultipleJsonLd,
  cleanupJsonLd,
  setMetaTags,
  setCanonical,
  SITE,
} from "../lib/schema";
import {
  AuthorBox,
  FaqAccordion,
  WasThisHelpful,
  ShareButtons,
} from "../components/PseoEnhancements";
import { TrustBadges } from "../components/SocialProofBar";
import AeoScoreCalculator from "../components/AeoScoreCalculator";
import { StatCounter } from "../components/VisualDiagrams";

const CALENDLY = "https://calendly.com/acesley180604/aeo-service-free-audit-surfio";

const CATEGORY_COLORS: Record<string, string> = {
  "AI Search Market": "bg-blue-100 text-blue-700",
  "Platform Data": "bg-purple-100 text-purple-700",
  "Industry Benchmarks": "bg-green-100 text-green-700",
  "Consumer Behavior": "bg-amber-100 text-amber-700",
  "Predictions": "bg-pink-100 text-pink-700",
};

function parseStatValue(val: string): { num: number; suffix: string } | null {
  const cleaned = val.replace(/[,$\s億萬+x#%]/g, "");
  const num = parseFloat(cleaned);
  if (isNaN(num)) return null;
  const suffix = val.replace(/[\d.,\s]/g, "").trim();
  return { num, suffix };
}

export default function StatisticsPage() {
  const { slug } = useParams();
  const lang = useLanguage();
  const allPages = getStatisticsPages();
  const data = allPages.find((p) => p.slug === slug);

  useEffect(() => {
    if (!data) return;
    const title = lang === "en" ? data.metaTitleEn : data.metaTitle;
    const description = lang === "en" ? data.metaDescriptionEn : data.metaDescription;
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", description);

    const pagePath = lang === "en"
      ? `/en/statistics/${data.slug}`
      : `/statistics/${data.slug}`;
    setCanonical(`${SITE.url}${pagePath}`);

    setMetaTags({
      "og:type": "article",
      "og:url": `${SITE.url}${pagePath}`,
      "og:title": title,
      "og:description": description,
      "og:image": `${SITE.url}/logos/surfio-icon.png`,
      "og:site_name": "SurfIO",
      "og:locale": lang === "en" ? "en" : "zh_HK",
    });

    // WebPage + FAQPage JSON-LD
    const faqs = lang === "en" ? data.faqsEn : data.faqs;
    const webPageSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: title,
      description,
      url: `${SITE.url}${pagePath}`,
      publisher: { "@id": `${SITE.url}/#organization` },
      inLanguage: lang === "en" ? "en" : "zh-HK",
      datePublished: "2026-01-15",
      dateModified: "2026-03-12",
    };
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map(([q, a]) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    };
    injectMultipleJsonLd([
      { id: "ld-statistics-page", data: webPageSchema },
      { id: "ld-statistics-faq", data: faqSchema },
    ]);

    window.scrollTo(0, 0);
    return () => {
      cleanupJsonLd(["ld-statistics-page", "ld-statistics-faq"]);
    };
  }, [data, lang]);

  if (!data) return <NotFound />;

  const heroTitle = lang === "en" ? data.heroTitleEn : data.heroTitle;
  const heroSubtitle = lang === "en" ? data.heroSubtitleEn : data.heroSubtitle;
  const topic = lang === "en" ? data.topicEn : data.topic;
  const faqs = lang === "en" ? data.faqsEn : data.faqs;
  const currentPath = lang === "en" ? `/en/statistics/${data.slug}` : `/statistics/${data.slug}`;
  const categoryColor = CATEGORY_COLORS[data.category] || "bg-gray-100 text-gray-700";

  // Resolve related stats
  const relatedPages = data.relatedStats
    .map((rSlug) => allPages.find((p) => p.slug === rSlug))
    .filter(Boolean) as StatisticsData[];

  return (
    <div className="pt-[90px] pb-16">
      {/* Breadcrumb */}
      <div className="max-w-[1100px] mx-auto px-5 md:px-10 mb-6">
        <nav aria-label="Breadcrumb">
          <ol className="text-[12px] text-gray-400 flex items-center" itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link to={langPath(lang, "/")} className="hover:text-gray-600" itemProp="item"><span itemProp="name">{lang === "en" ? "Home" : "首頁"}</span></Link>
              <meta itemProp="position" content="1" />
            </li>
            <span className="mx-2">/</span>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link to={langPath(lang, "/statistics")} className="hover:text-gray-600" itemProp="item">
                <span itemProp="name">{lang === "en" ? "Statistics" : "統計數據"}</span>
              </Link>
              <meta itemProp="position" content="2" />
            </li>
            <span className="mx-2">/</span>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span className="text-gray-600" itemProp="name">{topic}</span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </nav>
      </div>

      {/* Hero */}
      <section className="max-w-[1100px] mx-auto px-5 md:px-10 mb-16">
        <Reveal>
          <div className="flex items-center gap-3 mb-4">
            <p className="text-[#7C3AED] text-[12px] font-semibold tracking-[0.2em] uppercase">
              {lang === "en" ? "Statistics" : "統計數據"}
            </p>
            <span className={`text-[11px] font-semibold px-3 py-1 rounded-full ${categoryColor}`}>
              {data.category}
            </span>
          </div>
          <h1 className="text-[clamp(28px,4vw,44px)] font-extrabold text-gray-900 leading-[1.2] mb-5 max-w-[800px]">
            {heroTitle}
          </h1>
          <p className="text-[15px] text-gray-600 leading-[1.75] mb-6 max-w-[650px]">
            {heroSubtitle}
          </p>
        </Reveal>
      </section>

      {/* Key Stats Grid */}
      <section className="max-w-[1100px] mx-auto px-5 md:px-10 mb-16">
        <Reveal>
          <h2 className="text-[24px] md:text-[30px] font-extrabold text-gray-900 mb-8">
            {lang === "en" ? "Key Statistics" : "關鍵數據"}
          </h2>
        </Reveal>
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {data.keyStats.map((stat, i) => {
            const parsed = parseStatValue(stat.value);
            return (
              <StaggerItem key={i}>
                <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm text-center hover:shadow-md transition-shadow">
                  <div className="text-[28px] md:text-[32px] font-extrabold text-[#7C3AED] mb-2">
                    {parsed ? (
                      <StatCounter value={parsed.num} suffix={parsed.suffix} label="" />
                    ) : (
                      stat.value
                    )}
                  </div>
                  {!parsed && <div className="text-[28px] md:text-[32px] font-extrabold text-[#7C3AED] mb-2 hidden">{/* handled above */}</div>}
                  <p className="text-[13px] text-gray-600 leading-[1.5] mb-1">
                    {lang === "en" ? stat.labelEn : stat.label}
                  </p>
                  <p className="text-[11px] text-gray-400">{stat.source}</p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </section>

      {/* Content Sections with Embedded Stats */}
      {data.sections.map((section, si) => (
        <section key={si} className="max-w-[1100px] mx-auto px-5 md:px-10 mb-14">
          <Reveal>
            <h2 className="text-[20px] md:text-[26px] font-extrabold text-gray-900 mb-4">
              {lang === "en" ? section.headingEn : section.heading}
            </h2>
            <p className="text-[14px] text-gray-700 leading-[1.75] mb-6">
              {lang === "en" ? section.contentEn : section.content}
            </p>
          </Reveal>
          {section.stats.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {section.stats.map((stat: StatisticsSectionStat, si2: number) => (
                <motion.div
                  key={si2}
                  className="bg-gradient-to-br from-[#0f1629]/5 to-[#1a1a3a]/5 border border-gray-100 rounded-lg p-4 text-center"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: si2 * 0.06 }}
                >
                  <div className="text-[20px] font-extrabold text-[#7C3AED] mb-1">{stat.value}</div>
                  <p className="text-[12px] text-gray-500">{lang === "en" ? stat.labelEn : stat.label}</p>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      ))}

      {/* FAQ Accordion */}
      {faqs.length > 0 && (
        <section className="bg-gray-50 py-14 mb-16">
          <div className="max-w-[800px] mx-auto px-5 md:px-10">
            <Reveal>
              <h2 className="text-[24px] md:text-[30px] font-extrabold text-gray-900 mb-8 text-center">
                {lang === "en" ? "FAQ" : "常見問題"}
              </h2>
            </Reveal>
            <FaqAccordion faqs={faqs} />
          </div>
        </section>
      )}

      {/* Author E-E-A-T Box */}
      <section className="max-w-[1100px] mx-auto px-5 md:px-10 mb-10">
        <AuthorBox />
      </section>

      {/* Share + Engagement */}
      <section className="max-w-[1100px] mx-auto px-5 md:px-10 mb-10">
        <ShareButtons url={`${SITE.url}${currentPath}`} title={heroTitle} />
        <WasThisHelpful pageId={`statistics-${data.slug}`} />
      </section>

      {/* Trust Badges */}
      <section className="max-w-[1100px] mx-auto px-5 md:px-10 mb-10">
        <TrustBadges />
      </section>

      {/* AEO Score Calculator */}
      <section className="max-w-[1100px] mx-auto px-5 md:px-10 mb-16">
        <AeoScoreCalculator />
      </section>

      {/* CTA */}
      <section className="max-w-[1100px] mx-auto px-5 md:px-10 text-center mb-16">
        <Reveal>
          <div className="bg-gradient-to-br from-[#0f1629] to-[#1a1a3a] rounded-xl p-8">
            <h2 className="text-[22px] md:text-[28px] font-extrabold text-white mb-3">
              {lang === "en"
                ? "Want to improve your AI search visibility?"
                : "想提升你嘅 AI 搜尋能見度？"}
            </h2>
            <p className="text-[14px] text-gray-300 mb-6 max-w-[460px] mx-auto">
              {lang === "en"
                ? "Get a free AI search visibility audit for your brand"
                : "免費審計你嘅品牌 AI 搜尋能見度"}
            </p>
            <motion.a
              href={CALENDLY}
              className="inline-block px-7 py-3 rounded-lg bg-[#7C3AED] text-white text-[14px] font-semibold hover:bg-[#6D28D9] transition-colors"
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              {lang === "en" ? "Free AEO Audit" : "免費 AEO 審計"}
            </motion.a>
          </div>
        </Reveal>
      </section>

      {/* Related Stats */}
      {relatedPages.length > 0 && (
        <section className="max-w-[1100px] mx-auto px-5 md:px-10">
          <div className="border-t border-gray-200 pt-10">
            <h3 className="text-[16px] font-bold text-gray-900 mb-4">
              {lang === "en" ? "Related Statistics" : "相關統計"}
            </h3>
            <div className="flex flex-wrap gap-2">
              {relatedPages.map((p) => (
                <Link
                  key={p.slug}
                  to={langPath(lang, `/statistics/${p.slug}`)}
                  className="px-4 py-2 rounded-full border border-gray-200 text-[13px] text-gray-600 hover:border-[#7C3AED] hover:text-[#7C3AED] transition-colors"
                >
                  {lang === "en" ? p.topicEn : p.topic}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

function NotFound() {
  const lang = useLanguage();
  return (
    <div className="pt-[120px] pb-20 text-center">
      <h1 className="text-[32px] font-extrabold text-gray-900 mb-3">
        {lang === "en" ? "Page Not Found" : "找不到頁面"}
      </h1>
      <p className="text-gray-600 mb-6">
        {lang === "en" ? "This statistics page is not available yet." : "呢個統計頁面暫時未有內容。"}
      </p>
      <Link to={langPath(lang, "/")} className="text-[#7C3AED] font-semibold underline">
        {lang === "en" ? "Back to Home" : "返回首頁"}
      </Link>
    </div>
  );
}
