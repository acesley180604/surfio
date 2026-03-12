import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
import Reveal from "../components/Reveal";
import { StaggerContainer, StaggerItem } from "../components/Reveal";
import { useLanguage, langPath } from "../i18n/context";
import { getBestPages } from "../data/pseo/best-pages";
import {
  AuthorBox,
  FaqAccordion,
  WasThisHelpful,
  ShareButtons,
} from "../components/PseoEnhancements";
import { SocialProofBar, TrustBadges } from "../components/SocialProofBar";
import AeoScoreCalculator from "../components/AeoScoreCalculator";
import {
  injectMultipleJsonLd,
  cleanupJsonLd,
  setMetaTags,
  setCanonical,
  SITE,
} from "../lib/schema";

const CALENDLY = "https://calendly.com/acesley180604/aeo-service-free-audit-surfio";

const MEDAL = ["🥇", "🥈", "🥉"];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className={`text-[14px] ${star <= Math.round(rating) ? "text-amber-400" : "text-gray-200"}`}>★</span>
      ))}
      <span className="text-[12px] text-gray-500 ml-1">{rating.toFixed(1)}</span>
    </div>
  );
}

export default function BestPage() {
  const { slug } = useParams();
  const lang = useLanguage();
  const allPages = getBestPages();
  const data = allPages.find((p) => p.slug === slug);

  useEffect(() => {
    if (data) {
      const title = lang === "en" ? data.metaTitleEn : data.metaTitle;
      const desc = lang === "en" ? data.metaDescriptionEn : data.metaDescription;
      document.title = title;
      document.querySelector('meta[name="description"]')?.setAttribute("content", desc);

      const pagePath = lang === "en" ? `/en/best/${data.slug}` : `/best/${data.slug}`;
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
          id: "ld-best-itemlist",
          data: {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: lang === "en" ? data.titleEn : data.title,
            numberOfItems: data.items.length,
            itemListElement: data.items.map((item) => ({
              "@type": "ListItem",
              position: item.rank,
              name: item.name,
              description: lang === "en" ? item.descriptionEn : item.description,
            })),
          },
        },
        {
          id: "ld-best-faq",
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
    return () => cleanupJsonLd(["ld-best-itemlist", "ld-best-faq"]);
  }, [data, lang]);

  if (!data) return <NotFound />;

  const relatedPages = allPages.filter((p) => data.relatedPages.includes(p.slug));
  const faqs = lang === "en" ? data.faqsEn : data.faqs;

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
              <Link to={langPath(lang, "/best")} className="hover:text-gray-600" itemProp="item">
                <span itemProp="name">{lang === "en" ? "Best" : "最佳推薦"}</span>
              </Link>
              <meta itemProp="position" content="2" />
            </li>
            <span className="mx-2">/</span>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span className="text-gray-600" itemProp="name">{lang === "en" ? data.titleEn : data.title}</span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </nav>
      </div>

      {/* Hero */}
      <section className="max-w-[1100px] mx-auto px-5 md:px-10 mb-12">
        <Reveal>
          <div className="inline-block px-3 py-1 rounded-full bg-purple-100 text-[12px] text-[#7C3AED] font-medium mb-4">
            {data.category}
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

      {/* Ranked Items */}
      <section className="max-w-[1100px] mx-auto px-5 md:px-10 mb-16">
        <StaggerContainer className="space-y-6">
          {data.items.map((item) => {
            const pros = lang === "en" ? item.prosEn : item.pros;
            const cons = lang === "en" ? item.consEn : item.cons;
            const desc = lang === "en" ? item.descriptionEn : item.description;
            const bestFor = lang === "en" ? item.bestForEn : item.bestFor;
            const isTop3 = item.rank <= 3;

            return (
              <StaggerItem key={item.rank}>
                <motion.div
                  className={`bg-white border rounded-xl p-6 shadow-sm ${isTop3 ? "border-[#7C3AED]/30 ring-1 ring-[#7C3AED]/10" : "border-gray-100"}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${isTop3 ? "bg-gradient-to-br from-[#7C3AED] to-[#EC4899]" : "bg-gray-100"}`}>
                      <span className={`text-[18px] font-bold ${isTop3 ? "text-white" : "text-gray-500"}`}>
                        {MEDAL[item.rank - 1] || `#${item.rank}`}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[18px] font-extrabold text-gray-900 mb-1">{item.name}</h3>
                      <Stars rating={item.rating} />
                    </div>
                    <div className="px-3 py-1 rounded-full bg-blue-50 text-[11px] text-blue-600 font-medium shrink-0">
                      {lang === "en" ? "Best for" : "最適合"}: {bestFor}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-[14px] text-gray-600 leading-[1.75] mb-4">{desc}</p>

                  {/* Pros & Cons */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-[12px] font-bold text-green-600 uppercase mb-2">{lang === "en" ? "Pros" : "優點"}</p>
                      <ul className="space-y-1">
                        {pros.map((p, i) => (
                          <li key={i} className="flex items-start gap-2 text-[13px] text-gray-700">
                            <span className="text-green-500 mt-0.5">✓</span>{p}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-[12px] font-bold text-red-500 uppercase mb-2">{lang === "en" ? "Cons" : "缺點"}</p>
                      <ul className="space-y-1">
                        {cons.map((c, i) => (
                          <li key={i} className="flex items-start gap-2 text-[13px] text-gray-700">
                            <span className="text-red-400 mt-0.5">✗</span>{c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            );
          })}
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
          <ShareButtons url={`${SITE.url}${lang === "en" ? `/en/best/${data.slug}` : `/best/${data.slug}`}`} title={lang === "en" ? data.heroTitleEn : data.heroTitle} />
          <WasThisHelpful pageId={`best-${data.slug}`} />
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
              {lang === "en" ? "Get Your Free AEO Audit" : "獲取免費 AEO 審計"}
            </h2>
            <p className="text-[14px] text-gray-300 mb-6 max-w-[460px] mx-auto">
              {lang === "en" ? "See how your brand performs across 7 AI search engines" : "睇下你嘅品牌喺 7 大 AI 搜尋引擎嘅表現"}
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
            <h3 className="text-[16px] font-bold text-gray-900 mb-4">{lang === "en" ? "Related Rankings" : "相關排名"}</h3>
            <div className="flex flex-wrap gap-2">
              {relatedPages.map((p) => (
                <Link key={p.slug} to={langPath(lang, `/best/${p.slug}`)} className="px-4 py-2 rounded-full border border-gray-200 text-[13px] text-gray-600 hover:border-[#7C3AED] hover:text-[#7C3AED] transition-colors">
                  {lang === "en" ? p.titleEn : p.title}
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
      <p className="text-gray-600 mb-6">{lang === "en" ? "This ranking page is not available yet." : "呢個排名頁面暫時未有內容。"}</p>
      <Link to={langPath(lang, "/")} className="text-[#7C3AED] font-semibold underline">{lang === "en" ? "Back to Home" : "返回首頁"}</Link>
    </div>
  );
}
