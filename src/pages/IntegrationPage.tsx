import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
import Reveal from "../components/Reveal";
import { StaggerContainer, StaggerItem } from "../components/Reveal";
import { useLanguage, langPath } from "../i18n/context";
import { getIntegrationPages } from "../data/pseo/integrations";
import {
  AuthorBox,
  FaqAccordion,
  WasThisHelpful,
  ShareButtons,
} from "../components/PseoEnhancements";
import { SocialProofBar, TrustBadges } from "../components/SocialProofBar";
import AeoScoreCalculator from "../components/AeoScoreCalculator";
import { ProcessTimeline, StatCounter } from "../components/VisualDiagrams";
import {
  injectMultipleJsonLd,
  cleanupJsonLd,
  setMetaTags,
  setCanonical,
  SITE,
} from "../lib/schema";

const CALENDLY = "https://calendly.com/acesley180604/aeo-service-free-audit-surfio";

export default function IntegrationPage() {
  const { slug } = useParams();
  const lang = useLanguage();
  const allPages = getIntegrationPages();
  const data = allPages.find((p) => p.slug === slug);

  useEffect(() => {
    if (data) {
      const title = lang === "en" ? data.metaTitleEn : data.metaTitle;
      const desc = lang === "en" ? data.metaDescriptionEn : data.metaDescription;
      document.title = title;
      document.querySelector('meta[name="description"]')?.setAttribute("content", desc);

      const pagePath = lang === "en" ? `/en/integrations/${data.slug}` : `/integrations/${data.slug}`;
      setCanonical(`${SITE.url}${pagePath}`);
      setMetaTags({
        "og:type": "article",
        "og:url": `${SITE.url}${pagePath}`,
        "og:title": title,
        "og:description": desc,
        "og:image": `${SITE.url}/logos/surfio-icon.png`,
        "og:site_name": "SurfIO",
        "og:locale": lang === "en" ? "en" : "zh_HK",
      });

      const faqs = lang === "en" ? data.faqsEn : data.faqs;
      injectMultipleJsonLd([
        {
          id: "ld-integration-page",
          data: {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: title,
            description: desc,
            url: `${SITE.url}${pagePath}`,
          },
        },
        {
          id: "ld-integration-faq",
          data: {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map(([q, a]) => ({
              "@type": "Question",
              name: q,
              acceptedAnswer: { "@type": "Answer", text: a },
            })),
          },
        },
      ]);
    }
    window.scrollTo(0, 0);
    return () => cleanupJsonLd(["ld-integration-page", "ld-integration-faq"]);
  }, [data, lang]);

  if (!data) return <NotFound />;

  const relatedPages = allPages.filter((p) => data.relatedPlatforms.includes(p.slug));
  const faqs = lang === "en" ? data.faqsEn : data.faqs;
  const steps = data.steps.map((s) => ({
    title: lang === "en" ? s.titleEn : s.title,
    desc: lang === "en" ? s.descEn : s.desc,
    duration: "",
  }));
  const features = data.features.map((f) => ({
    title: lang === "en" ? f.titleEn : f.title,
    desc: lang === "en" ? f.descEn : f.desc,
  }));

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
              <Link to={langPath(lang, "/integrations")} className="hover:text-gray-600" itemProp="item">
                <span itemProp="name">{lang === "en" ? "Integrations" : "整合"}</span>
              </Link>
              <meta itemProp="position" content="2" />
            </li>
            <span className="mx-2">/</span>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span className="text-gray-600" itemProp="name">{data.platformName}</span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </nav>
      </div>

      {/* Hero */}
      <section className="max-w-[1100px] mx-auto px-5 md:px-10 mb-12">
        <Reveal>
          <div className="inline-block px-3 py-1 rounded-full bg-purple-100 text-[12px] text-[#7C3AED] font-medium mb-4">
            {data.platformCategory}
          </div>
          <h1 className="text-[clamp(28px,4vw,44px)] font-extrabold text-gray-900 leading-[1.2] mb-5 max-w-[800px]">
            {lang === "en" ? data.heroTitleEn : data.heroTitle}
          </h1>
          <p className="text-[15px] text-gray-600 leading-[1.75] mb-6 max-w-[650px]">
            {lang === "en" ? data.heroSubtitleEn : data.heroSubtitle}
          </p>
          <SocialProofBar />
        </Reveal>
      </section>

      {/* Stats */}
      <section className="bg-gradient-to-br from-[#0f1629] to-[#1a1a3a] py-14 mb-16">
        <div className="max-w-[1100px] mx-auto px-5 md:px-10">
          <div className="grid grid-cols-3 gap-6">
            {data.stats.map((s, i) => (
              <StatCounter key={i} value={parseFloat(s.value) || 0} suffix={s.value.replace(/[0-9.]/g, "")} label={lang === "en" ? s.labelEn : s.label} />
            ))}
          </div>
        </div>
      </section>

      {/* Why AEO */}
      <section className="max-w-[1100px] mx-auto px-5 md:px-10 mb-16">
        <Reveal>
          <h2 className="text-[24px] md:text-[30px] font-extrabold text-gray-900 mb-6">
            {lang === "en" ? `Why AEO Matters for ${data.platformName}` : `點解 AEO 對 ${data.platformName} 好重要`}
          </h2>
          <p className="text-[15px] text-gray-700 leading-[1.8]">
            {lang === "en" ? data.whyAeoEn : data.whyAeo}
          </p>
        </Reveal>
      </section>

      {/* Steps */}
      <section className="max-w-[1100px] mx-auto px-5 md:px-10 mb-16">
        <Reveal>
          <h2 className="text-[24px] md:text-[30px] font-extrabold text-gray-900 mb-8">
            {lang === "en" ? `5 Steps to AEO-Optimize ${data.platformName}` : `5 步 AEO 優化你嘅 ${data.platformName}`}
          </h2>
        </Reveal>
        <ProcessTimeline steps={steps} />
      </section>

      {/* Features */}
      <section className="max-w-[1100px] mx-auto px-5 md:px-10 mb-16">
        <Reveal>
          <h2 className="text-[24px] md:text-[30px] font-extrabold text-gray-900 mb-8">
            {lang === "en" ? "What SurfIO Can Do" : "SurfIO 可以幫你做咩"}
          </h2>
        </Reveal>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <StaggerItem key={i}>
              <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm h-full">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#EC4899] flex items-center justify-center mb-4">
                  <span className="text-[15px] font-bold text-white">{i + 1}</span>
                </div>
                <h3 className="text-[16px] font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-[14px] text-gray-600 leading-[1.75]">{f.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 py-14 mb-16">
        <div className="max-w-[800px] mx-auto px-5 md:px-10">
          <Reveal><h2 className="text-[24px] md:text-[30px] font-extrabold text-gray-900 mb-8 text-center">{lang === "en" ? "FAQ" : "常見問題"}</h2></Reveal>
          <FaqAccordion faqs={faqs} />
        </div>
      </section>

      {/* Author + Trust */}
      <section className="max-w-[800px] mx-auto px-5 md:px-10 mb-10">
        <AuthorBox />
        <TrustBadges />
        <div className="mt-6">
          <ShareButtons url={`${SITE.url}${lang === "en" ? `/en/integrations/${data.slug}` : `/integrations/${data.slug}`}`} title={lang === "en" ? data.heroTitleEn : data.heroTitle} />
          <WasThisHelpful pageId={`integration-${data.slug}`} />
        </div>
      </section>

      {/* Calculator */}
      <section className="max-w-[1100px] mx-auto px-5 md:px-10 mb-16">
        <AeoScoreCalculator />
      </section>

      {/* CTA */}
      <section className="max-w-[1100px] mx-auto px-5 md:px-10 text-center mb-16">
        <Reveal>
          <div className="bg-gradient-to-br from-[#0f1629] to-[#1a1a3a] rounded-xl p-8">
            <h2 className="text-[22px] md:text-[28px] font-extrabold text-white mb-3">
              {lang === "en" ? `Get Your ${data.platformName} AEO Audit` : `獲取你嘅 ${data.platformName} AEO 審計`}
            </h2>
            <p className="text-[14px] text-gray-300 mb-6 max-w-[460px] mx-auto">
              {lang === "en" ? `Free audit of your ${data.platformName} site across 7 AI engines` : `免費審計你嘅 ${data.platformName} 網站喺 7 大 AI 引擎嘅表現`}
            </p>
            <motion.a href={CALENDLY} className="inline-block px-7 py-3 rounded-lg bg-[#7C3AED] text-white text-[14px] font-semibold hover:bg-[#6D28D9] transition-colors" whileHover={{ scale: 1.06, y: -2 }} whileTap={{ scale: 0.97 }}>
              {lang === "en" ? "Free AEO Audit" : "免費 AEO 審計"}
            </motion.a>
          </div>
        </Reveal>
      </section>

      {/* Related */}
      {relatedPages.length > 0 && (
        <section className="max-w-[1100px] mx-auto px-5 md:px-10">
          <div className="border-t border-gray-200 pt-10">
            <h3 className="text-[16px] font-bold text-gray-900 mb-4">{lang === "en" ? "Related Integrations" : "相關整合"}</h3>
            <div className="flex flex-wrap gap-2">
              {relatedPages.map((p) => (
                <Link key={p.slug} to={langPath(lang, `/integrations/${p.slug}`)} className="px-4 py-2 rounded-full border border-gray-200 text-[13px] text-gray-600 hover:border-[#7C3AED] hover:text-[#7C3AED] transition-colors">
                  {p.platformName} AEO
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
      <h1 className="text-[32px] font-extrabold text-gray-900 mb-3">{lang === "en" ? "Page Not Found" : "找不到頁面"}</h1>
      <p className="text-gray-600 mb-6">{lang === "en" ? "This integration page is not available yet." : "呢個整合頁面暫時未有內容。"}</p>
      <Link to={langPath(lang, "/")} className="text-[#7C3AED] font-semibold underline">{lang === "en" ? "Back to Home" : "返回首頁"}</Link>
    </div>
  );
}
