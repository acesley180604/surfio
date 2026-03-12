import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
import Reveal from "../components/Reveal";
import { StaggerContainer, StaggerItem } from "../components/Reveal";
import { useLanguage, langPath } from "../i18n/context";
import { getGuidePages } from "../data/pseo/guides";
import {
  guidePageSchema,
  injectMultipleJsonLd,
  cleanupJsonLd,
  setMetaTags,
  setCanonical,
  SITE,
} from "../lib/schema";

const CALENDLY = "https://calendly.com/acesley180604/aeo-service-free-audit-surfio";

export default function GuidePage() {
  const { slug } = useParams();
  const lang = useLanguage();
  const allPages = getGuidePages();
  const data = allPages.find((p) => p.slug === slug);

  useEffect(() => {
    if (data) {
      document.title = data.metaTitle;
      document.querySelector('meta[name="description"]')?.setAttribute("content", data.metaDescription);

      const pagePath = lang === "en"
        ? `/en/%E6%8C%87%E5%8D%97/${data.slug}`
        : `/%E6%8C%87%E5%8D%97/${data.slug}`;
      setCanonical(`${SITE.url}${pagePath}`);

      setMetaTags({
        "og:type": "article",
        "og:url": `${SITE.url}${pagePath}`,
        "og:title": data.metaTitle,
        "og:description": data.metaDescription,
        "og:image": `${SITE.url}/logos/surfio-icon.png`,
        "og:site_name": "SurfIO",
        "og:locale": lang === "en" ? "en" : "zh_HK",
      });

      const schemas = guidePageSchema(data);
      injectMultipleJsonLd([
        { id: "ld-guide-article", data: schemas[0] },
        { id: "ld-guide-faq", data: schemas[1] },
      ]);
    }
    window.scrollTo(0, 0);

    return () => {
      cleanupJsonLd(["ld-guide-article", "ld-guide-faq"]);
    };
  }, [data, lang]);

  if (!data) return <NotFound />;

  // Resolve related guides
  const relatedPages = data.relatedGuides
    .map((rSlug) => allPages.find((p) => p.slug === rSlug))
    .filter(Boolean) as typeof allPages;

  return (
    <div className="pt-[90px] pb-16">
      {/* Breadcrumb */}
      <div className="max-w-[800px] mx-auto px-5 md:px-10 mb-6">
        <nav aria-label="Breadcrumb">
          <ol className="text-[12px] text-gray-400 flex items-center flex-wrap" itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link to={langPath(lang, "/")} className="hover:text-gray-600" itemProp="item"><span itemProp="name">首頁</span></Link>
              <meta itemProp="position" content="1" />
            </li>
            <span className="mx-2">/</span>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span itemProp="name">指南</span>
              <meta itemProp="position" content="2" />
            </li>
            <span className="mx-2">/</span>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span itemProp="name">{data.engineName}</span>
              <meta itemProp="position" content="3" />
            </li>
            <span className="mx-2">/</span>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span className="text-gray-600" itemProp="name">{data.topicName}</span>
              <meta itemProp="position" content="4" />
            </li>
          </ol>
        </nav>
      </div>

      {/* Article */}
      <article className="max-w-[800px] mx-auto px-5 md:px-10" itemScope itemType="https://schema.org/Article">
        <meta itemProp="datePublished" content="2025-01-15" />
        <meta itemProp="dateModified" content="2026-03-12" />
        <div itemProp="author" itemScope itemType="https://schema.org/Person"><meta itemProp="name" content="Acesley Chan" /></div>
        <div itemProp="publisher" itemScope itemType="https://schema.org/Organization"><meta itemProp="name" content="SurfIO" /></div>

        {/* Hero */}
        <Reveal>
          <p className="text-[#7C3AED] text-[12px] font-semibold tracking-[0.2em] uppercase mb-4">
            {data.engineName} 指南
          </p>
          <h1 className="text-[clamp(28px,4vw,40px)] font-extrabold text-gray-900 leading-[1.2] mb-5" itemProp="headline">
            {data.heroTitle}
          </h1>
          <p className="text-[15px] text-gray-600 leading-[1.75] mb-10" itemProp="description">
            {data.heroSubtitle}
          </p>
        </Reveal>

        {/* Article Sections */}
        <div itemProp="articleBody">
          {data.sections.map((section, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="mb-10">
                <h2 className="text-[22px] font-extrabold text-gray-900 mb-4">{section.heading}</h2>
                {section.content.split("\n\n").map((para, j) => (
                  <p key={j} className="text-[15px] text-gray-700 leading-[1.8] mb-4">{para}</p>
                ))}

                {/* Optional items list */}
                {section.items && section.items.length > 0 && (
                  <ul className="space-y-2 mt-4 mb-4">
                    {section.items.map((item, k) => (
                      <li key={k} className="flex items-start gap-3">
                        <span className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center shrink-0 mt-0.5">
                          <span className="w-2 h-2 rounded-full bg-[#7C3AED]" />
                        </span>
                        <span className="text-[14px] text-gray-700 leading-[1.65]">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Optional tip box */}
                {section.tip && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-4">
                    <p className="text-[13px] text-amber-800 leading-[1.7]">
                      <span className="font-bold">Tips: </span>{section.tip}
                    </p>
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        {/* Key Takeaways */}
        {data.keyTakeaways.length > 0 && (
          <Reveal>
            <div className="bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] rounded-xl p-8 mb-10 text-white">
              <h2 className="text-[20px] font-extrabold mb-5">重點摘要</h2>
              <StaggerContainer className="space-y-3">
                {data.keyTakeaways.map((takeaway, i) => (
                  <StaggerItem key={i}>
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-[11px] font-bold text-white">{i + 1}</span>
                      </span>
                      <span className="text-[14px] text-white/90 leading-[1.65]">{takeaway}</span>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </Reveal>
        )}

        {/* FAQ */}
        {data.faqs.length > 0 && (
          <div className="mb-10">
            <Reveal><h2 className="text-[22px] font-extrabold text-gray-900 mb-6">常見問題</h2></Reveal>
            <div className="space-y-5">
              {data.faqs.map(([q, a], i) => (
                <motion.div key={i} className="bg-gray-50 rounded-xl p-5 border border-gray-100" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <h3 className="text-[15px] font-bold text-gray-900 mb-2">{q}</h3>
                  <p className="text-[14px] text-gray-600 leading-[1.75]">{a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <Reveal>
          <div className="bg-gradient-to-br from-[#0f1629] to-[#1a1a3a] rounded-xl p-8 text-center mb-10">
            <h3 className="text-[20px] font-extrabold text-white mb-2">想知更多 {data.engineName} 優化策略？</h3>
            <p className="text-[14px] text-gray-300 mb-5">免費審計你嘅品牌喺 {data.engineName} 嘅能見度</p>
            <motion.a href={CALENDLY} className="inline-block px-6 py-3 rounded-lg bg-[#7C3AED] text-white text-[14px] font-semibold hover:bg-[#6D28D9] transition-colors" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              免費 AEO 審計
            </motion.a>
          </div>
        </Reveal>
      </article>

      {/* Related Guides */}
      {relatedPages.length > 0 && (
        <section className="max-w-[800px] mx-auto px-5 md:px-10 mt-10">
          <div className="border-t border-gray-200 pt-10">
            <h3 className="text-[16px] font-bold text-gray-900 mb-4">相關指南</h3>
            <div className="flex flex-wrap gap-2">
              {relatedPages.map((p) => (
                <Link key={p.slug} to={langPath(lang, `/指南/${p.slug}`)} className="px-4 py-2 rounded-full border border-gray-200 text-[13px] text-gray-600 hover:border-[#7C3AED] hover:text-[#7C3AED] transition-colors">
                  {p.engineName} — {p.topicName}
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
      <h1 className="text-[32px] font-extrabold text-gray-900 mb-3">找不到頁面</h1>
      <p className="text-gray-600 mb-6">呢篇指南暫時未有內容。</p>
      <Link to={langPath(lang, "/")} className="text-[#7C3AED] font-semibold underline">返回首頁</Link>
    </div>
  );
}
