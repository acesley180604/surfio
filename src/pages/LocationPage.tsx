import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
import Reveal from "../components/Reveal";
import { StaggerContainer, StaggerItem } from "../components/Reveal";
import { useLanguage, langPath } from "../i18n/context";
import { getLocationPages } from "../data/pseo/locations";
import {
  locationPageSchema,
  injectMultipleJsonLd,
  cleanupJsonLd,
  setMetaTags,
  setCanonical,
  SITE,
} from "../lib/schema";
import {
  AuthorBox,
  ArticleMeta,
  FaqAccordion,
  ClusterNav,
  WasThisHelpful,
  ShareButtons,
  calculateReadingTime,
} from "../components/PseoEnhancements";
import { SocialProofBar, TrustBadges, TestimonialCard, TESTIMONIALS } from "../components/SocialProofBar";
import { ProcessTimeline, StatCounter } from "../components/VisualDiagrams";
import AeoScoreCalculator from "../components/AeoScoreCalculator";
import { AutoLinkedText, useAutoLinkOptions } from "../lib/auto-linker";

const CALENDLY = "https://calendly.com/acesley180604/aeo-service-free-audit-surfio";

/**
 * Parse a stat value string like "+420%", "8,500+", "72%", "3x" into
 * a numeric value and suffix for the StatCounter component.
 */
function parseStatValue(raw: string): { value: number; suffix: string } {
  // Remove leading + sign
  const cleaned = raw.replace(/^\+/, "");
  // Extract numeric part (digits, dots, commas) and suffix
  const match = cleaned.match(/^([\d,.]+)\s*(.*)$/);
  if (!match) return { value: 0, suffix: raw };
  const numStr = match[1].replace(/,/g, "");
  const num = parseFloat(numStr);
  const suffix = match[2] || "";
  // Re-add + prefix if original had it
  const prefix = raw.startsWith("+") ? "+" : "";
  return { value: isNaN(num) ? 0 : num, suffix: prefix ? `${suffix}` : suffix };
}

export default function LocationPage() {
  const { slug } = useParams();
  const lang = useLanguage();
  const allPages = getLocationPages();
  const data = allPages.find((p) => p.slug === slug);

  useEffect(() => {
    if (data) {
      document.title = data.metaTitle;
      document.querySelector('meta[name="description"]')?.setAttribute("content", data.metaDescription);

      const pagePath = lang === "en" ? `/en/aeo-agency/${data.slug}` : `/aeo-agency/${data.slug}`;
      setCanonical(`${SITE.url}${pagePath}`);

      setMetaTags({
        "og:type": "website",
        "og:url": `${SITE.url}${pagePath}`,
        "og:title": data.metaTitle,
        "og:description": data.metaDescription,
        "og:image": `${SITE.url}/logos/surfio-icon.png`,
        "og:site_name": "SurfIO",
        "og:locale": lang === "en" ? "en" : "zh_HK",
      });

      const schemas = locationPageSchema(data);
      injectMultipleJsonLd([
        { id: "ld-location-page", data: schemas[0] },
        { id: "ld-location-faq", data: schemas[1] },
      ]);
    }
    window.scrollTo(0, 0);

    return () => {
      cleanupJsonLd(["ld-location-page", "ld-location-faq"]);
    };
  }, [data, lang]);

  if (!data) return <NotFound />;

  // Resolve nearby locations
  const nearbyPages = data.nearbyLocations
    .map((nSlug) => allPages.find((p) => p.slug === nSlug))
    .filter(Boolean) as typeof allPages;

  // Reading time
  const allText = data.localContext + data.faqs.map(([q, a]) => q + a).join("") + data.keyIndustries.join("");
  const readingTime = calculateReadingTime(allText);

  // Current page path for auto-linking and sharing
  const currentPath = lang === "en" ? `/en/aeo-agency/${data.slug}` : `/aeo-agency/${data.slug}`;
  const autoLinkLang = lang === "en" ? "en" : "zh" as const;
  const autoLinkOpts = useAutoLinkOptions(currentPath, [data.locationName]);

  // Cluster nav — all location pages
  const allSlugs = allPages.map((p) => ({ slug: p.slug, title: `${p.locationName} AEO` }));

  // Process timeline steps for location AEO
  const timelineSteps = lang === "en"
    ? [
        { title: "Local Market Audit", duration: "Week 1-2", desc: "Analyze your brand's AI search visibility in the local market and identify gaps." },
        { title: "Strategy Development", duration: "Week 3-4", desc: "Build a tailored AEO strategy based on local competitive landscape and industry needs." },
        { title: "Execution & Optimization", duration: "Week 5-8", desc: "Implement schema markup, content optimization, and local authority signals." },
        { title: "Performance Tracking", duration: "Week 9-12", desc: "Monitor AI citation rates, track improvements, and refine strategy for sustained growth." },
      ]
    : [
        { title: "本地市場審計", duration: "第1-2週", desc: "分析你嘅品牌喺本地市場嘅 AI 搜尋能見度，搵出差距。" },
        { title: "策略制定", duration: "第3-4週", desc: "根據本地競爭環境同行業需求制定度身訂造嘅 AEO 策略。" },
        { title: "執行優化", duration: "第5-8週", desc: "實施 Schema Markup、內容優化同本地權威信號建設。" },
        { title: "成效追蹤", duration: "第9-12週", desc: "監察 AI 引用率、追蹤改善成效、持續優化策略。" },
      ];

  // Testimonial
  const testimonial = TESTIMONIALS.general[0];

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
              <Link to={langPath(lang, "/aeo-agency")} className="hover:text-gray-600" itemProp="item">
                <span itemProp="name">{lang === "en" ? "Regions" : "地區"}</span>
              </Link>
              <meta itemProp="position" content="2" />
            </li>
            <span className="mx-2">/</span>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span className="text-gray-600" itemProp="name">{data.locationName}</span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </nav>
      </div>

      {/* Hero */}
      <section id="hero" className="max-w-[1100px] mx-auto px-5 md:px-10 mb-8">
        <Reveal>
          <p className="text-[#7C3AED] text-[12px] font-semibold tracking-[0.2em] uppercase mb-4">
            {data.locationName} AEO
          </p>
          <h1 className="text-[clamp(28px,4vw,44px)] font-extrabold text-gray-900 leading-[1.2] mb-5 max-w-[800px]">
            {data.heroTitle}
          </h1>
          <p className="text-[15px] text-gray-600 leading-[1.75] mb-6 max-w-[650px]">
            {data.heroSubtitle}
          </p>
        </Reveal>

        {/* Social Proof Bar */}
        <div className="mb-8 max-w-[650px]">
          <SocialProofBar />
        </div>

        {/* Article Meta — dates + reading time */}
        <ArticleMeta publishedDate="2025-01-15" modifiedDate="2026-03-12" readingTime={readingTime} />

        <Reveal>
          <motion.a
            href={CALENDLY}
            className="inline-block px-7 py-3 rounded-full bg-[#7C3AED] text-white text-[14px] font-semibold hover:bg-[#6D28D9] transition-colors"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            {lang === "en" ? "Free AEO Audit" : "免費 AEO 審計"}
          </motion.a>
        </Reveal>
      </section>

      {/* Stats — animated counters */}
      {data.stats.length > 0 && (
        <section id="stats" className="bg-gradient-to-br from-[#0f1629] to-[#1a1a3a] py-14 mb-16">
          <div className="max-w-[1100px] mx-auto px-5 md:px-10">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {data.stats.map((s, i) => {
                const parsed = parseStatValue(s.value);
                // For values with a leading +, prepend to suffix
                const hasPlus = s.value.startsWith("+");
                return (
                  <div key={i} className="text-center">
                    <StatCounter
                      value={parsed.value}
                      suffix={hasPlus ? `+${parsed.suffix}` : parsed.suffix}
                      label={s.label}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Local Context — with auto-linked text */}
      <section id="local-context" className="max-w-[1100px] mx-auto px-5 md:px-10 mb-16">
        <Reveal>
          <h2 className="text-[24px] md:text-[30px] font-extrabold text-gray-900 mb-6">
            {lang === "en" ? `Business Environment in ${data.locationName}` : `${data.locationName}嘅商業環境`}
          </h2>
          {data.localContext.split("\n\n").map((para, i) => (
            <p key={i} className="text-[15px] text-gray-700 leading-[1.8] mb-5">
              <AutoLinkedText text={para} lang={autoLinkLang} options={autoLinkOpts} />
            </p>
          ))}
        </Reveal>
      </section>

      {/* Key Industries */}
      {data.keyIndustries.length > 0 && (
        <section id="key-industries" className="max-w-[1100px] mx-auto px-5 md:px-10 mb-16">
          <Reveal>
            <h2 className="text-[24px] md:text-[30px] font-extrabold text-gray-900 mb-6">
              {lang === "en" ? `Key Industries in ${data.locationName}` : `${data.locationName}嘅重點行業`}
            </h2>
          </Reveal>
          <StaggerContainer className="flex flex-wrap gap-3">
            {data.keyIndustries.map((industry, i) => (
              <StaggerItem key={i}>
                <span className="inline-block px-4 py-2 rounded-full bg-purple-50 border border-purple-200 text-[13px] text-[#7C3AED] font-medium">
                  {industry}
                </span>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>
      )}

      {/* Process Timeline */}
      <section id="process" className="max-w-[1100px] mx-auto px-5 md:px-10 mb-16">
        <Reveal>
          <h2 className="text-[24px] md:text-[30px] font-extrabold text-gray-900 mb-6">
            {lang === "en" ? `AEO Implementation Process for ${data.locationName}` : `${data.locationName} AEO 實施流程`}
          </h2>
        </Reveal>
        <ProcessTimeline steps={timelineSteps} />
      </section>

      {/* FAQ — Interactive Accordion */}
      {data.faqs.length > 0 && (
        <section id="faq" className="bg-gray-50 py-14 mb-16">
          <div className="max-w-[800px] mx-auto px-5 md:px-10">
            <Reveal>
              <h2 className="text-[24px] md:text-[30px] font-extrabold text-gray-900 mb-8 text-center">
                {lang === "en" ? "FAQ" : "常見問題"}
              </h2>
            </Reveal>
            <FaqAccordion faqs={data.faqs} />
          </div>
        </section>
      )}

      {/* Author E-E-A-T Box */}
      <div className="max-w-[1100px] mx-auto px-5 md:px-10">
        <AuthorBox />
      </div>

      {/* Share Buttons */}
      <div className="max-w-[1100px] mx-auto px-5 md:px-10">
        <ShareButtons url={`${SITE.url}${currentPath}`} title={data.heroTitle} />
      </div>

      {/* Was This Helpful */}
      <div className="max-w-[1100px] mx-auto px-5 md:px-10">
        <WasThisHelpful pageId={`location-${data.slug}`} />
      </div>

      {/* Testimonial */}
      <section id="testimonial" className="max-w-[1100px] mx-auto px-5 md:px-10 mt-12 mb-6">
        <Reveal>
          <h3 className="text-[18px] font-extrabold text-gray-900 mb-4">
            {lang === "en" ? "What Our Clients Say" : "客戶評價"}
          </h3>
        </Reveal>
        <TestimonialCard
          quote={testimonial.quote}
          author={testimonial.author}
          role={testimonial.role}
          company={testimonial.company}
          result={testimonial.result}
        />
        <div className="mt-6">
          <TrustBadges />
        </div>
      </section>

      {/* AEO Score Calculator */}
      <section id="aeo-score" className="max-w-[1100px] mx-auto px-5 md:px-10 my-16">
        <Reveal>
          <h2 className="text-[24px] md:text-[30px] font-extrabold text-gray-900 mb-6 text-center">
            {lang === "en" ? "Check Your AEO Readiness" : "測試你嘅 AEO 準備度"}
          </h2>
        </Reveal>
        <AeoScoreCalculator />
      </section>

      {/* CTA */}
      <section id="cta" className="max-w-[1100px] mx-auto px-5 md:px-10 text-center mb-16">
        <Reveal>
          <div className="bg-gradient-to-br from-[#0f1629] to-[#1a1a3a] rounded-xl p-8">
            <h2 className="text-[22px] md:text-[28px] font-extrabold text-white mb-3">
              {lang === "en"
                ? `Ready to Dominate AI Search in ${data.locationName}?`
                : `準備好喺${data.locationName}搶佔 AI 搜尋？`}
            </h2>
            <p className="text-[14px] text-gray-300 mb-6 max-w-[460px] mx-auto">
              {lang === "en"
                ? `Free audit of your brand's AI search visibility in ${data.locationName}`
                : `免費審計你嘅品牌喺${data.locationName}嘅 AI 搜尋能見度`}
            </p>
            <motion.a href={CALENDLY} className="inline-block px-7 py-3 rounded-lg bg-[#7C3AED] text-white text-[14px] font-semibold hover:bg-[#6D28D9] transition-colors" whileHover={{ scale: 1.06, y: -2 }} whileTap={{ scale: 0.97 }}>
              {lang === "en" ? "Free AEO Audit" : "免費 AEO 審計"}
            </motion.a>
          </div>
        </Reveal>
      </section>

      {/* Cluster Navigation — prev/next */}
      <div className="max-w-[1100px] mx-auto px-5 md:px-10">
        <ClusterNav currentSlug={data.slug} allPages={allSlugs} basePath={lang === "en" ? "/en/aeo-agency" : "/aeo-agency"} />
      </div>

      {/* Nearby Locations */}
      {nearbyPages.length > 0 && (
        <section id="nearby" className="max-w-[1100px] mx-auto px-5 md:px-10 mt-6">
          <div className="border-t border-gray-200 pt-10">
            <h3 className="text-[16px] font-bold text-gray-900 mb-4">
              {lang === "en" ? "Nearby Regions" : "附近地區"}
            </h3>
            <div className="flex flex-wrap gap-2">
              {nearbyPages.map((p) => (
                <Link key={p.slug} to={langPath(lang, `/aeo-agency/${p.slug}`)} className="px-4 py-2 rounded-full border border-gray-200 text-[13px] text-gray-600 hover:border-[#7C3AED] hover:text-[#7C3AED] transition-colors">
                  {p.locationName} AEO
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
        {lang === "en" ? "This location page is not available yet." : "呢個地區頁面暫時未有內容。"}
      </p>
      <Link to={langPath(lang, "/")} className="text-[#7C3AED] font-semibold underline">
        {lang === "en" ? "Back to Home" : "返回首頁"}
      </Link>
    </div>
  );
}
