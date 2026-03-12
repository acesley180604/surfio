import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import Reveal from "../components/Reveal";
import { useLanguage, langPath } from "../i18n/context";
import { getGlossaryTermPages } from "../data/pseo/glossary-terms";
import type { GlossaryTermPage as GlossaryTermPageData } from "../data/pseo/glossary-terms";
import { AuthorBox, FaqAccordion, WasThisHelpful, ShareButtons } from "../components/PseoEnhancements";
import { TrustBadges } from "../components/SocialProofBar";
import AeoScoreCalculator from "../components/AeoScoreCalculator";
import { injectMultipleJsonLd, cleanupJsonLd, setMetaTags, setCanonical, SITE } from "../lib/schema";

export default function GlossaryTermPage() {
  const { slug } = useParams();
  const lang = useLanguage();
  const allPages = getGlossaryTermPages();
  const data = allPages.find((p) => p.slug === slug);

  useEffect(() => {
    if (data) {
      const isEn = lang === "en";
      const title = isEn ? data.metaTitleEn : data.metaTitle;
      const description = isEn ? data.metaDescriptionEn : data.metaDescription;
      document.title = title;
      document.querySelector('meta[name="description"]')?.setAttribute("content", description);

      const pagePath = isEn
        ? `/en/aeo-glossary/${data.slug}`
        : `/aeo-glossary/${data.slug}`;
      setCanonical(`${SITE.url}${pagePath}`);

      setMetaTags({
        "og:type": "article",
        "og:url": `${SITE.url}${pagePath}`,
        "og:title": title,
        "og:description": description,
        "og:image": `${SITE.url}/logos/surfio-icon.png`,
        "og:site_name": "SurfIO",
        "og:locale": isEn ? "en" : "zh_HK",
      });

      const definedTermSchema = {
        "@context": "https://schema.org",
        "@type": "DefinedTerm",
        "@id": `${SITE.url}/aeo-glossary/${data.slug}`,
        name: isEn ? data.termEn : data.term,
        description: isEn ? data.definitionEn : data.definition,
        url: `${SITE.url}/aeo-glossary/${data.slug}`,
        inDefinedTermSet: {
          "@type": "DefinedTermSet",
          name: "SurfIO AEO Glossary",
          url: `${SITE.url}/aeo-glossary`,
        },
      };

      const faqs = isEn ? data.faqsEn : data.faqs;
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
        { id: "ld-glossary-term", data: definedTermSchema },
        { id: "ld-glossary-faq", data: faqSchema },
      ]);
    }
    window.scrollTo(0, 0);

    return () => {
      cleanupJsonLd(["ld-glossary-term", "ld-glossary-faq"]);
    };
  }, [data, lang]);

  if (!data) return <NotFound />;

  const isEn = lang === "en";
  const term = isEn ? data.termEn : data.term;
  const definition = isEn ? data.definitionEn : data.definition;
  const whyItMatters = isEn ? data.whyItMattersEn : data.whyItMatters;
  const examples = isEn ? data.examplesEn : data.examples;
  const faqs = isEn ? data.faqsEn : data.faqs;

  // Resolve related terms
  const relatedPages = data.relatedTerms
    .map((rSlug) => allPages.find((p) => p.slug === rSlug))
    .filter(Boolean) as GlossaryTermPageData[];

  const currentPath = isEn ? `/en/aeo-glossary/${data.slug}` : `/aeo-glossary/${data.slug}`;

  return (
    <div className="pt-[90px] pb-16">
      {/* Breadcrumb */}
      <div className="max-w-[1100px] mx-auto px-5 md:px-10 mb-6">
        <nav aria-label="Breadcrumb">
          <ol className="text-[12px] text-gray-400 flex items-center" itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link to={langPath(lang, "/")} className="hover:text-gray-600" itemProp="item"><span itemProp="name">{isEn ? "Home" : "首頁"}</span></Link>
              <meta itemProp="position" content="1" />
            </li>
            <span className="mx-2">/</span>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link to={langPath(lang, "/aeo-glossary")} className="hover:text-gray-600" itemProp="item">
                <span itemProp="name">{isEn ? "AEO Glossary" : "AEO 術語表"}</span>
              </Link>
              <meta itemProp="position" content="2" />
            </li>
            <span className="mx-2">/</span>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span className="text-gray-600" itemProp="name">{term}</span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </nav>
      </div>

      {/* Hero */}
      <section className="max-w-[1100px] mx-auto px-5 md:px-10 mb-16">
        <Reveal>
          <span className="inline-block px-3 py-1 rounded-full bg-purple-100 text-[#7C3AED] text-[12px] font-semibold mb-4">
            {data.category}
          </span>
          <h1 className="text-[clamp(28px,4vw,44px)] font-extrabold text-gray-900 leading-[1.2] mb-5 max-w-[800px]">
            {term}
          </h1>
          <p className="text-[15px] text-gray-600 leading-[1.75] mb-6 max-w-[650px]">
            {definition}
          </p>
        </Reveal>
      </section>

      {/* Why It Matters for AEO */}
      <section className="max-w-[1100px] mx-auto px-5 md:px-10 mb-16">
        <Reveal>
          <h2 className="text-[24px] md:text-[30px] font-extrabold text-gray-900 mb-6">
            {isEn ? "Why It Matters for AEO" : "點解對 AEO 重要"}
          </h2>
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
            <p className="text-[14px] text-gray-700 leading-[1.75]">
              {whyItMatters}
            </p>
          </div>
        </Reveal>
      </section>

      {/* Practical Examples */}
      {examples.length > 0 && (
        <section className="max-w-[1100px] mx-auto px-5 md:px-10 mb-16">
          <Reveal>
            <h2 className="text-[24px] md:text-[30px] font-extrabold text-gray-900 mb-8">
              {isEn ? "Practical Examples" : "實際例子"}
            </h2>
          </Reveal>
          <ol className="space-y-4">
            {examples.map((example, i) => (
              <Reveal key={i}>
                <li className="flex items-start gap-4 bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
                  <span className="w-8 h-8 rounded-full bg-[#7C3AED] text-white flex items-center justify-center shrink-0 text-[14px] font-bold">
                    {i + 1}
                  </span>
                  <span className="text-[14px] text-gray-700 leading-[1.65]">{example}</span>
                </li>
              </Reveal>
            ))}
          </ol>
        </section>
      )}

      {/* Related Terms */}
      {relatedPages.length > 0 && (
        <section className="max-w-[1100px] mx-auto px-5 md:px-10 mb-16">
          <Reveal>
            <h3 className="text-[16px] font-bold text-gray-900 mb-4">
              {isEn ? "Related Terms" : "相關術語"}
            </h3>
          </Reveal>
          <div className="flex flex-wrap gap-2">
            {relatedPages.map((p) => (
              <Link
                key={p.slug}
                to={langPath(lang, `/aeo-glossary/${p.slug}`)}
                className="px-4 py-2 rounded-full border border-gray-200 text-[13px] text-gray-600 hover:border-[#7C3AED] hover:text-[#7C3AED] transition-colors"
              >
                {isEn ? p.termEn : p.term}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className="bg-gray-50 py-14 mb-16">
          <div className="max-w-[800px] mx-auto px-5 md:px-10">
            <Reveal><h2 className="text-[24px] md:text-[30px] font-extrabold text-gray-900 mb-8 text-center">{isEn ? "FAQ" : "常見問題"}</h2></Reveal>
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
        <ShareButtons url={`${SITE.url}${currentPath}`} title={term} />
        <WasThisHelpful pageId={`glossary-term-${data.slug}`} />
      </section>

      {/* Trust Badges */}
      <section className="max-w-[1100px] mx-auto px-5 md:px-10 mb-10">
        <TrustBadges />
      </section>

      {/* AEO Score Calculator */}
      <section className="max-w-[1100px] mx-auto px-5 md:px-10 mb-16">
        <AeoScoreCalculator />
      </section>
    </div>
  );
}

function NotFound() {
  const lang = useLanguage();
  return (
    <div className="pt-[120px] pb-20 text-center">
      <h1 className="text-[32px] font-extrabold text-gray-900 mb-3">{lang === "en" ? "Page Not Found" : "找不到頁面"}</h1>
      <p className="text-gray-600 mb-6">{lang === "en" ? "This glossary term page is not available yet." : "呢個術語頁面暫時未有內容。"}</p>
      <Link to={langPath(lang, "/")} className="text-[#7C3AED] font-semibold underline">{lang === "en" ? "Back to Home" : "返回首頁"}</Link>
    </div>
  );
}
