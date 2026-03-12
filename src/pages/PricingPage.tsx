import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
import Reveal from "../components/Reveal";
import { StaggerContainer, StaggerItem } from "../components/Reveal";
import { useLanguage, langPath } from "../i18n/context";
import { getPricingPages } from "../data/pseo/pricing";
import type { PricingPackage } from "../data/pseo/pricing";
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

const CALENDLY = "https://calendly.com/acesley180604/aeo-service-free-audit-surfio";

const REGION_LABELS: Record<string, { zh: string; en: string }> = {
  hk: { zh: "香港", en: "Hong Kong" },
  gba: { zh: "大灣區", en: "Greater Bay Area" },
  overseas: { zh: "海外", en: "Overseas" },
};

export default function PricingPage() {
  const { slug } = useParams();
  const lang = useLanguage();
  const allPages = getPricingPages();
  const data = allPages.find((p) => p.slug === slug);

  useEffect(() => {
    if (!data) return;
    const title = lang === "en" ? data.metaTitleEn : data.metaTitle;
    const description = lang === "en" ? data.metaDescriptionEn : data.metaDescription;
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", description);

    const pagePath = lang === "en"
      ? `/en/pricing/${data.slug}`
      : `/pricing/${data.slug}`;
    setCanonical(`${SITE.url}${pagePath}`);

    setMetaTags({
      "og:type": "website",
      "og:url": `${SITE.url}${pagePath}`,
      "og:title": title,
      "og:description": description,
      "og:image": `${SITE.url}/logos/surfio-icon.png`,
      "og:site_name": "SurfIO",
      "og:locale": lang === "en" ? "en" : "zh_HK",
    });

    // JSON-LD
    const faqs = lang === "en" ? data.faqsEn : data.faqs;
    const locationName = lang === "en" ? data.locationNameEn : data.locationName;
    const webPageSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: title,
      description,
      url: `${SITE.url}${pagePath}`,
      publisher: { "@id": `${SITE.url}/#organization` },
      inLanguage: lang === "en" ? "en" : "zh-HK",
      about: {
        "@type": "Service",
        name: `SurfIO AEO Service - ${locationName}`,
        provider: { "@id": `${SITE.url}/#organization` },
        areaServed: { "@type": "Place", name: locationName },
        offers: data.packages.map((pkg) => ({
          "@type": "Offer",
          name: lang === "en" ? pkg.nameEn : pkg.name,
          price: pkg.price.replace(/[^\d.,]/g, ""),
          priceCurrency: data.currency === "RMB" ? "CNY" : data.currency,
        })),
      },
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
      { id: "ld-pricing-page", data: webPageSchema },
      { id: "ld-pricing-faq", data: faqSchema },
    ]);

    window.scrollTo(0, 0);
    return () => {
      cleanupJsonLd(["ld-pricing-page", "ld-pricing-faq"]);
    };
  }, [data, lang]);

  if (!data) return <NotFound />;

  const locationName = lang === "en" ? data.locationNameEn : data.locationName;
  const regionLabel = REGION_LABELS[data.region]?.[lang] || data.region;
  const faqs = lang === "en" ? data.faqsEn : data.faqs;
  const marketContext = lang === "en" ? data.marketContextEn : data.marketContext;
  const currentPath = lang === "en" ? `/en/pricing/${data.slug}` : `/pricing/${data.slug}`;

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
              <Link to={langPath(lang, "/pricing")} className="hover:text-gray-600" itemProp="item">
                <span itemProp="name">{lang === "en" ? "Pricing" : "定價"}</span>
              </Link>
              <meta itemProp="position" content="2" />
            </li>
            <span className="mx-2">/</span>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span className="text-gray-600" itemProp="name">{locationName}</span>
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
              {lang === "en" ? "Pricing" : "定價"}
            </p>
            <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-purple-100 text-purple-700">
              {regionLabel}
            </span>
          </div>
          <h1 className="text-[clamp(28px,4vw,44px)] font-extrabold text-gray-900 leading-[1.2] mb-5 max-w-[800px]">
            {lang === "en"
              ? `${data.locationNameEn} AEO Service Pricing`
              : `${data.locationName} AEO 服務定價`}
          </h1>
          <p className="text-[15px] text-gray-600 leading-[1.75] mb-6 max-w-[650px]">
            {lang === "en"
              ? `Tailored AI search optimization packages for ${data.locationNameEn} businesses. All plans include a free initial audit.`
              : `為${data.locationName}企業度身訂造嘅 AI 搜尋優化方案。所有方案包括免費初始審計。`}
          </p>
        </Reveal>
      </section>

      {/* Pricing Cards */}
      <section className="max-w-[1100px] mx-auto px-5 md:px-10 mb-16">
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.packages.map((pkg, i) => (
            <StaggerItem key={i}>
              <PricingCard pkg={pkg} lang={lang} currency={data.currency} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* Market Context */}
      <section className="max-w-[1100px] mx-auto px-5 md:px-10 mb-16">
        <Reveal>
          <h2 className="text-[24px] md:text-[30px] font-extrabold text-gray-900 mb-6">
            {lang === "en"
              ? `Why ${data.locationNameEn} Businesses Need AEO`
              : `點解${data.locationName}企業需要 AEO`}
          </h2>
          {marketContext.split("\n\n").map((para, i) => (
            <p key={i} className="text-[14px] text-gray-700 leading-[1.75] mb-4 last:mb-0">
              {para}
            </p>
          ))}
        </Reveal>
      </section>

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className="bg-gray-50 py-14 mb-16">
          <div className="max-w-[800px] mx-auto px-5 md:px-10">
            <Reveal>
              <h2 className="text-[24px] md:text-[30px] font-extrabold text-gray-900 mb-8 text-center">
                {lang === "en" ? "Pricing FAQ" : "定價常見問題"}
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
                ? `Ready to boost your AI search visibility in ${data.locationNameEn}?`
                : `準備好提升你喺${data.locationName}嘅 AI 搜尋能見度？`}
            </h2>
            <p className="text-[14px] text-gray-300 mb-6 max-w-[460px] mx-auto">
              {lang === "en"
                ? "Book a free AI search visibility audit — no commitment required"
                : "預約免費 AI 搜尋能見度審計——唔需要任何承諾"}
            </p>
            <motion.a
              href={CALENDLY}
              className="inline-block px-7 py-3 rounded-lg bg-[#7C3AED] text-white text-[14px] font-semibold hover:bg-[#6D28D9] transition-colors"
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              {lang === "en" ? "Book Free Audit" : "預約免費審計"}
            </motion.a>
          </div>
        </Reveal>
      </section>

      {/* Share */}
      <section className="max-w-[1100px] mx-auto px-5 md:px-10 mb-10">
        <ShareButtons
          url={`${SITE.url}${currentPath}`}
          title={lang === "en" ? data.metaTitleEn : data.metaTitle}
        />
        <WasThisHelpful pageId={`pricing-${data.slug}`} />
      </section>
    </div>
  );
}

function PricingCard({ pkg, lang, currency: _currency }: { pkg: PricingPackage; lang: "zh" | "en"; currency: string }) {
  const name = lang === "en" ? pkg.nameEn : pkg.name;
  const features = lang === "en" ? pkg.featuresEn : pkg.features;

  return (
    <motion.div
      className={`relative rounded-xl border p-6 flex flex-col h-full ${
        pkg.recommended
          ? "border-[#7C3AED] shadow-lg shadow-[#7C3AED]/10 bg-white"
          : "border-gray-200 bg-white"
      }`}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      {pkg.recommended && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-[#7C3AED] to-[#EC4899] text-white text-[11px] font-bold rounded-full whitespace-nowrap">
          {lang === "en" ? "MOST POPULAR" : "最受歡迎"}
        </div>
      )}

      <h3 className="text-[18px] font-extrabold text-gray-900 mb-2 mt-2">{name}</h3>

      <div className="mb-4">
        <span className="text-[28px] md:text-[32px] font-extrabold text-[#7C3AED]">{pkg.price}</span>
        <span className="text-[13px] text-gray-500 ml-1">/{lang === "en" ? "month" : "月"}</span>
      </div>

      <ul className="flex-1 space-y-2.5 mb-6">
        {features.map((feature, fi) => (
          <li key={fi} className="flex items-start gap-2 text-[13px] text-gray-600 leading-[1.5]">
            <span className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
              <svg className="w-2.5 h-2.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </span>
            {feature}
          </li>
        ))}
      </ul>

      <motion.a
        href={CALENDLY}
        className={`block text-center py-3 rounded-lg text-[14px] font-semibold transition-colors ${
          pkg.recommended
            ? "bg-[#7C3AED] text-white hover:bg-[#6D28D9]"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        {lang === "en" ? "Get Started" : "立即開始"}
      </motion.a>
    </motion.div>
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
        {lang === "en" ? "This pricing page is not available yet." : "呢個定價頁面暫時未有內容。"}
      </p>
      <Link to={langPath(lang, "/")} className="text-[#7C3AED] font-semibold underline">
        {lang === "en" ? "Back to Home" : "返回首頁"}
      </Link>
    </div>
  );
}
