import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
import Reveal from "../components/Reveal";
import { StaggerContainer, StaggerItem } from "../components/Reveal";
import { useLanguage, langPath } from "../i18n/context";
import { t } from "../i18n/translations";
import { getIndustries } from "../data/getters";
import {
  industryPageSchema,
  injectMultipleJsonLd,
  cleanupJsonLd,
  setMetaTags,
  setCanonical,
  setNameMeta,
  SITE,
} from "../lib/schema";

const CALENDLY = "https://calendly.com/acesley180604/aeo-service-free-audit-surfio";

export default function IndustryPage() {
  const { slug } = useParams();
  const lang = useLanguage();
  const industries = getIndustries(lang);
  const data = industries.find((i) => i.slug === slug);

  useEffect(() => {
    if (data) {
      document.title = data.metaTitle;
      document.querySelector('meta[name="description"]')?.setAttribute("content", data.metaDescription);

      const pagePath = lang === "en" ? `/en/aeo/${data.slug}` : `/aeo/${data.slug}`;
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

      setNameMeta({
        "article:published_time": "2025-01-15",
        "article:modified_time": "2026-03-08",
      });

      const schemas = industryPageSchema(data);
      injectMultipleJsonLd([
        { id: "ld-industry-page", data: schemas[0] },
        { id: "ld-industry-faq", data: schemas[1] },
      ]);
    }
    window.scrollTo(0, 0);

    return () => {
      cleanupJsonLd(["ld-industry-page", "ld-industry-faq"]);
    };
  }, [data, lang]);

  if (!data) return <NotFound />;

  const challengesTitle = (t("industry.challengesTitle", lang) as any)(data.name);
  const solutionsTitle = (t("industry.solutionsTitle", lang) as any)(data.name);
  const faqTitle = (t("industry.faqTitle", lang) as any)(data.name);
  const readyTitle = (t("industry.readyTitle", lang) as any)(data.name);
  const readySubtitle = (t("industry.readySubtitle", lang) as any)(data.name);

  return (
    <div className="pt-[90px] pb-16">
      {/* Breadcrumb */}
      <div className="max-w-[1100px] mx-auto px-5 md:px-10 mb-6">
        <nav aria-label="Breadcrumb">
          <ol className="text-[12px] text-gray-400 flex items-center" itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link to={langPath(lang, "/")} className="hover:text-gray-600" itemProp="item"><span itemProp="name">{t("industry.breadcrumbHome", lang)}</span></Link>
              <meta itemProp="position" content="1" />
            </li>
            <span className="mx-2">/</span>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span itemProp="name">{t("industry.breadcrumbIndustry", lang)}</span>
              <meta itemProp="position" content="2" />
            </li>
            <span className="mx-2">/</span>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span className="text-gray-600" itemProp="name">{data.name}</span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </nav>
      </div>

      {/* Hero */}
      <section className="max-w-[1100px] mx-auto px-5 md:px-10 mb-16">
        <Reveal>
          <p className="text-[#7C3AED] text-[12px] font-semibold tracking-[0.2em] uppercase mb-4">
            {data.name} AEO
          </p>
          <h1 className="text-[clamp(28px,4vw,44px)] font-extrabold text-gray-900 leading-[1.2] mb-5 max-w-[800px]">
            {data.heroTitle}
          </h1>
          <p className="text-[15px] text-gray-600 leading-[1.75] mb-8 max-w-[650px]">
            {data.heroSubtitle}
          </p>
          <motion.a
            href={CALENDLY}
            className="inline-block px-7 py-3 rounded-full bg-[#7C3AED] text-white text-[14px] font-semibold hover:bg-[#6D28D9] transition-colors"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            {t("industry.cta", lang)}
          </motion.a>
        </Reveal>
      </section>

      {/* Stats */}
      <section className="bg-gradient-to-br from-[#0f1629] to-[#1a1a3a] py-14 mb-16">
        <div className="max-w-[1100px] mx-auto px-5 md:px-10">
          <div className="grid grid-cols-3 gap-6">
            {data.stats.map((s, i) => (
              <motion.div key={i} className="text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
                <div className="text-[32px] md:text-[42px] font-extrabold text-white">{s.value}</div>
                <div className="text-[13px] text-gray-400 mt-1">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Problems + Solutions */}
      <section className="max-w-[1100px] mx-auto px-5 md:px-10 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <Reveal><h2 className="text-[24px] md:text-[30px] font-extrabold text-gray-900 mb-6">{challengesTitle}</h2></Reveal>
            <StaggerContainer className="space-y-3">
              {data.problems.map((p, i) => (
                <StaggerItem key={i}>
                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5"><span className="w-2 h-2 rounded-full bg-red-500" /></span>
                    <span className="text-[14px] text-gray-700 leading-[1.65]">{p}</span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
          <div>
            <Reveal delay={0.1}><h2 className="text-[24px] md:text-[30px] font-extrabold text-gray-900 mb-6">{solutionsTitle}</h2></Reveal>
            <StaggerContainer className="space-y-3" staggerDelay={0.1}>
              {data.solutions.map((s, i) => (
                <StaggerItem key={i}>
                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5"><span className="w-2 h-2 rounded-full bg-green-500" /></span>
                    <span className="text-[14px] text-gray-700 leading-[1.65]">{s}</span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 py-14 mb-16">
        <div className="max-w-[800px] mx-auto px-5 md:px-10">
          <Reveal><h2 className="text-[24px] md:text-[30px] font-extrabold text-gray-900 mb-8 text-center">{faqTitle}</h2></Reveal>
          <div className="space-y-6">
            {data.faqs.map(([q, a], i) => (
              <motion.div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <h3 className="text-[15px] font-bold text-gray-900 mb-2">{q}</h3>
                <p className="text-[14px] text-gray-600 leading-[1.75]">{a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-[1100px] mx-auto px-5 md:px-10 text-center">
        <Reveal>
          <h2 className="text-[26px] md:text-[34px] font-extrabold text-gray-900 mb-3">{readyTitle}</h2>
          <p className="text-[14px] text-gray-600 leading-[1.7] max-w-[460px] mx-auto mb-8">{readySubtitle}</p>
          <motion.a href={CALENDLY} className="inline-block px-7 py-3 rounded-lg bg-[#7C3AED] text-white text-[14px] font-semibold hover:bg-[#6D28D9] transition-colors" whileHover={{ scale: 1.06, y: -2 }} whileTap={{ scale: 0.97 }}>
            {t("industry.cta", lang)}
          </motion.a>
        </Reveal>
      </section>

      {/* Internal links */}
      <section className="max-w-[1100px] mx-auto px-5 md:px-10 mt-16">
        <div className="border-t border-gray-200 pt-10">
          <h3 className="text-[16px] font-bold text-gray-900 mb-4">{t("industry.otherIndustries", lang)}</h3>
          <div className="flex flex-wrap gap-2">
            {industries.filter((i) => i.slug !== slug).map((i) => (
              <Link key={i.slug} to={langPath(lang, `/aeo/${i.slug}`)} className="px-4 py-2 rounded-full border border-gray-200 text-[13px] text-gray-600 hover:border-[#7C3AED] hover:text-[#7C3AED] transition-colors">
                {i.name} AEO
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function NotFound() {
  const lang = useLanguage();
  return (
    <div className="pt-[120px] pb-20 text-center">
      <h1 className="text-[32px] font-extrabold text-gray-900 mb-3">{t("industry.notFoundTitle", lang)}</h1>
      <p className="text-gray-600 mb-6">{t("industry.notFoundDesc", lang)}</p>
      <Link to={langPath(lang, "/")} className="text-[#7C3AED] font-semibold underline">{t("industry.backHome", lang)}</Link>
    </div>
  );
}
