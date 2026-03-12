import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
import Reveal from "../components/Reveal";
import { StaggerContainer, StaggerItem } from "../components/Reveal";
import { useLanguage, langPath } from "../i18n/context";
import { getCompetitorPages } from "../data/pseo/competitors";
import {
  competitorPageSchema,
  softwareApplicationSchema,
  injectMultipleJsonLd,
  cleanupJsonLd,
  setMetaTags,
  setCanonical,
  SITE,
} from "../lib/schema";
import { SocialProofBar, TrustBadges } from "../components/SocialProofBar";
import { FaqAccordion, AuthorBox, WasThisHelpful, ShareButtons } from "../components/PseoEnhancements";
import AeoScoreCalculator from "../components/AeoScoreCalculator";
import { ComparisonVisual } from "../components/VisualDiagrams";

const CALENDLY = "https://calendly.com/acesley180604/aeo-service-free-audit-surfio";

export default function CompetitorPage() {
  const { slug } = useParams();
  const lang = useLanguage();
  const allPages = getCompetitorPages();
  const data = allPages.find((p) => p.slug === slug);

  useEffect(() => {
    if (data) {
      document.title = data.metaTitle;
      document.querySelector('meta[name="description"]')?.setAttribute("content", data.metaDescription);

      const pagePath = lang === "en" ? `/en/vs/${data.slug}` : `/vs/${data.slug}`;
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

      const schemas = competitorPageSchema(data);
      const appSchema = softwareApplicationSchema({
        competitorName: data.competitorName,
        competitorCategory: data.competitorCategory,
        slug: data.slug,
      });
      injectMultipleJsonLd([
        { id: "ld-competitor-page", data: schemas[0] },
        { id: "ld-competitor-faq", data: schemas[1] },
        { id: "ld-competitor-app", data: appSchema },
      ]);
    }
    window.scrollTo(0, 0);

    return () => {
      cleanupJsonLd(["ld-competitor-page", "ld-competitor-faq", "ld-competitor-app"]);
    };
  }, [data, lang]);

  if (!data) return <NotFound />;

  const relatedPages = allPages.filter((p) => p.slug !== slug).slice(0, 8);

  return (
    <div className="pt-[90px] pb-16">
      {/* Breadcrumb */}
      <div className="max-w-[1100px] mx-auto px-5 md:px-10 mb-6">
        <nav aria-label="Breadcrumb">
          <ol className="text-[12px] text-gray-400 flex items-center" itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link to={langPath(lang, "/")} className="hover:text-gray-600" itemProp="item"><span itemProp="name">首頁</span></Link>
              <meta itemProp="position" content="1" />
            </li>
            <span className="mx-2">/</span>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link to={langPath(lang, "/vs")} className="hover:text-gray-600" itemProp="item">
                <span itemProp="name">{lang === "en" ? "Comparisons" : "比較"}</span>
              </Link>
              <meta itemProp="position" content="2" />
            </li>
            <span className="mx-2">/</span>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span className="text-gray-600" itemProp="name">{data.competitorName}</span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </nav>
      </div>

      {/* Hero */}
      <section className="max-w-[1100px] mx-auto px-5 md:px-10 mb-16">
        <Reveal>
          <p className="text-[#7C3AED] text-[12px] font-semibold tracking-[0.2em] uppercase mb-4">
            SurfIO vs {data.competitorName}
          </p>
          <h1 className="text-[clamp(28px,4vw,44px)] font-extrabold text-gray-900 leading-[1.2] mb-5 max-w-[800px]">
            {data.heroTitle}
          </h1>
          <p className="text-[15px] text-gray-600 leading-[1.75] mb-8 max-w-[650px]">
            {data.heroSubtitle}
          </p>
          <div className="inline-block px-3 py-1 rounded-full bg-gray-100 text-[12px] text-gray-500 font-medium mb-6">
            {data.competitorCategory}
          </div>
          <SocialProofBar />
        </Reveal>
      </section>

      {/* Quick Verdict */}
      <section className="max-w-[1100px] mx-auto px-5 md:px-10 mb-16">
        <Reveal>
          <div className="bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] rounded-xl p-8 text-white">
            <h2 className="text-[20px] font-extrabold mb-3">快速結論</h2>
            <p className="text-[15px] leading-[1.75] text-white/90">
              {data.competitorName} 係一個出色嘅 {data.competitorCategory} 工具，但如果你嘅目標係喺 AI 搜尋引擎被推薦，SurfIO 嘅 AEO 專業服務提供更針對性嘅解決方案。
            </p>
          </div>
        </Reveal>
      </section>

      {/* Comparison Table */}
      <section className="max-w-[1100px] mx-auto px-5 md:px-10 mb-16">
        <Reveal><h2 className="text-[24px] md:text-[30px] font-extrabold text-gray-900 mb-8">功能比較</h2></Reveal>
        <div className="overflow-x-auto">
          <div className="min-w-[600px]">
            {/* Header */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-[13px] font-bold text-gray-500 uppercase tracking-wider p-3">功能</div>
              <div className="text-[13px] font-bold text-gray-500 uppercase tracking-wider p-3 text-center">{data.competitorName}</div>
              <div className="text-[13px] font-bold text-[#7C3AED] uppercase tracking-wider p-3 text-center">SurfIO</div>
            </div>
            {/* Rows */}
            {data.comparisonPoints.map((point, i) => (
              <motion.div
                key={i}
                className="grid grid-cols-3 gap-4 border-b border-gray-100 last:border-0"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <div className="p-3 text-[14px] font-semibold text-gray-800">{point.feature}</div>
                <div className="p-3 text-[13px] text-gray-600 text-center">{point.competitor}</div>
                <div className="p-3 text-[13px] text-gray-800 font-medium text-center bg-purple-50/50 rounded">{point.surfio}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Comparison Visual */}
        <ComparisonVisual
          leftTitle={data.competitorName}
          rightTitle="SurfIO AEO"
          leftItems={data.comparisonPoints.map((p) => `${p.feature}: ${p.competitor}`)}
          rightItems={data.comparisonPoints.map((p) => `${p.feature}: ${p.surfio}`)}
        />
      </section>

      {/* Advantages */}
      <section className="max-w-[1100px] mx-auto px-5 md:px-10 mb-16">
        <Reveal><h2 className="text-[24px] md:text-[30px] font-extrabold text-gray-900 mb-8">SurfIO 嘅優勢</h2></Reveal>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.advantages.map((adv, i) => (
            <StaggerItem key={i}>
              <div className="flex items-start gap-3 bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
                <span className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                </span>
                <span className="text-[14px] text-gray-700 leading-[1.65]">{adv}</span>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* FAQ — Interactive Accordion */}
      {data.faqs.length > 0 && (
        <section className="bg-gray-50 py-14 mb-16">
          <div className="max-w-[800px] mx-auto px-5 md:px-10">
            <Reveal><h2 className="text-[24px] md:text-[30px] font-extrabold text-gray-900 mb-8 text-center">{lang === "en" ? "FAQ" : "常見問題"}</h2></Reveal>
            <FaqAccordion faqs={data.faqs} />
          </div>
        </section>
      )}

      {/* Author + Engagement */}
      <section className="max-w-[800px] mx-auto px-5 md:px-10 mb-10">
        <AuthorBox />
        <TrustBadges />
        <div className="mt-6">
          <ShareButtons url={`${SITE.url}${lang === "en" ? `/en/vs/${data.slug}` : `/vs/${data.slug}`}`} title={data.heroTitle} />
          <WasThisHelpful pageId={`comp-${data.slug}`} />
        </div>
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
              試下 SurfIO 嘅 AEO 服務
            </h2>
            <p className="text-[14px] text-gray-300 mb-6 max-w-[460px] mx-auto">
              免費審計你嘅品牌喺 AI 搜尋嘅能見度，睇下同 {data.competitorName} 有咩唔同
            </p>
            <motion.a href={CALENDLY} className="inline-block px-7 py-3 rounded-lg bg-[#7C3AED] text-white text-[14px] font-semibold hover:bg-[#6D28D9] transition-colors" whileHover={{ scale: 1.06, y: -2 }} whileTap={{ scale: 0.97 }}>
              免費 AEO 審計
            </motion.a>
          </div>
        </Reveal>
      </section>

      {/* Related Comparisons */}
      {relatedPages.length > 0 && (
        <section className="max-w-[1100px] mx-auto px-5 md:px-10">
          <div className="border-t border-gray-200 pt-10">
            <h3 className="text-[16px] font-bold text-gray-900 mb-4">其他比較</h3>
            <div className="flex flex-wrap gap-2">
              {relatedPages.map((p) => (
                <Link key={p.slug} to={langPath(lang, `/vs/${p.slug}`)} className="px-4 py-2 rounded-full border border-gray-200 text-[13px] text-gray-600 hover:border-[#7C3AED] hover:text-[#7C3AED] transition-colors">
                  SurfIO vs {p.competitorName}
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
      <p className="text-gray-600 mb-6">呢個比較頁面暫時未有內容。</p>
      <Link to={langPath(lang, "/")} className="text-[#7C3AED] font-semibold underline">返回首頁</Link>
    </div>
  );
}
