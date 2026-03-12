import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
import Reveal from "../components/Reveal";
import { StaggerContainer, StaggerItem } from "../components/Reveal";
import { useLanguage, langPath } from "../i18n/context";
import { getIndustryEnginePages } from "../data/pseo/industry-engine";
import {
  industryEnginePageSchema,
  injectMultipleJsonLd,
  cleanupJsonLd,
  setMetaTags,
  setCanonical,
  SITE,
} from "../lib/schema";
import type { IndustryEngineSection } from "../data/pseo/types";

const CALENDLY = "https://calendly.com/acesley180604/aeo-service-free-audit-surfio";

export default function IndustryEnginePage() {
  const { industrySlug, engineSlug } = useParams();
  const lang = useLanguage();
  const allPages = getIndustryEnginePages();
  const data = allPages.find((p) => p.slug === `${industrySlug}-${engineSlug}`);

  useEffect(() => {
    if (data) {
      document.title = data.metaTitle;
      document.querySelector('meta[name="description"]')?.setAttribute("content", data.metaDescription);

      const pagePath = lang === "en"
        ? `/en/aeo/${data.industrySlug}/${data.engineSlug}`
        : `/aeo/${data.industrySlug}/${data.engineSlug}`;
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

      const schemas = industryEnginePageSchema(data);
      injectMultipleJsonLd([
        { id: "ld-industry-engine-page", data: schemas[0] },
        { id: "ld-industry-engine-faq", data: schemas[1] },
      ]);
    }
    window.scrollTo(0, 0);

    return () => {
      cleanupJsonLd(["ld-industry-engine-page", "ld-industry-engine-faq"]);
    };
  }, [data, lang]);

  if (!data) return <NotFound />;

  // Cross-links: same industry different engines + same engine different industries
  const sameIndustry = allPages.filter(
    (p) => p.industrySlug === data.industrySlug && p.slug !== data.slug
  );
  const sameEngine = allPages.filter(
    (p) => p.engineSlug === data.engineSlug && p.slug !== data.slug
  );

  function renderSection(section: IndustryEngineSection, i: number) {
    switch (section.type) {
      case "stats-box":
        return (
          <div key={i} className="bg-gradient-to-br from-[#0f1629] to-[#1a1a3a] rounded-xl p-8 mb-10">
            <Reveal>
              <h2 className="text-[20px] font-extrabold text-white mb-4">{section.title}</h2>
              {typeof section.content === "string" ? (
                <p className="text-[14px] text-gray-300 leading-[1.75]">{section.content}</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {section.content.map((c, j) => (
                    <div key={j} className="bg-white/5 rounded-lg p-4">
                      <p className="text-[14px] text-gray-200 leading-[1.7]">{c}</p>
                    </div>
                  ))}
                </div>
              )}
            </Reveal>
          </div>
        );

      case "problems":
        return (
          <div key={i} className="mb-10">
            <Reveal><h2 className="text-[22px] font-extrabold text-gray-900 mb-5">{section.title}</h2></Reveal>
            <StaggerContainer className="space-y-3">
              {(Array.isArray(section.content) ? section.content : [section.content]).map((p, j) => (
                <StaggerItem key={j}>
                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-red-500" />
                    </span>
                    <span className="text-[14px] text-gray-700 leading-[1.65]">{p}</span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        );

      case "solutions":
        return (
          <div key={i} className="mb-10">
            <Reveal><h2 className="text-[22px] font-extrabold text-gray-900 mb-5">{section.title}</h2></Reveal>
            <StaggerContainer className="space-y-3">
              {(Array.isArray(section.content) ? section.content : [section.content]).map((s, j) => (
                <StaggerItem key={j}>
                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-green-500" />
                    </span>
                    <span className="text-[14px] text-gray-700 leading-[1.65]">{s}</span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        );

      case "steps":
        return (
          <div key={i} className="mb-10">
            <Reveal><h2 className="text-[22px] font-extrabold text-gray-900 mb-5">{section.title}</h2></Reveal>
            <StaggerContainer className="space-y-4">
              {(section.items ?? []).map((item, j) => (
                <StaggerItem key={j}>
                  <div className="flex items-start gap-4">
                    <span className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-[13px] font-bold text-[#7C3AED]">{j + 1}</span>
                    </span>
                    <div>
                      <h3 className="text-[15px] font-bold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-[13px] text-gray-600 leading-[1.7]">{item.desc}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        );

      case "checklist":
        return (
          <div key={i} className="mb-10">
            <Reveal><h2 className="text-[22px] font-extrabold text-gray-900 mb-5">{section.title}</h2></Reveal>
            <StaggerContainer className="space-y-3">
              {(Array.isArray(section.content) ? section.content : [section.content]).map((c, j) => (
                <StaggerItem key={j}>
                  <div className="flex items-start gap-3 bg-white border border-gray-100 rounded-lg p-4 shadow-sm">
                    <span className="text-[#7C3AED] font-bold text-[14px] shrink-0 mt-0.5">{j + 1}.</span>
                    <span className="text-[14px] text-gray-700 leading-[1.65]">{c}</span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        );

      case "comparison-table":
        return (
          <div key={i} className="mb-10">
            <Reveal><h2 className="text-[22px] font-extrabold text-gray-900 mb-5">{section.title}</h2></Reveal>
            <div className="overflow-x-auto">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left p-3 font-bold text-gray-900 border-b border-gray-200">項目</th>
                    <th className="text-left p-3 font-bold text-gray-900 border-b border-gray-200">詳情</th>
                  </tr>
                </thead>
                <tbody>
                  {(section.items ?? []).map((item, j) => (
                    <motion.tr key={j} className="border-b border-gray-100" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: j * 0.05 }}>
                      <td className="p-3 font-semibold text-gray-800">{item.title}</td>
                      <td className="p-3 text-gray-600">{item.desc}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "case-study":
        return (
          <div key={i} className="mb-10">
            <Reveal>
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                <h2 className="text-[20px] font-extrabold text-gray-900 mb-3">{section.title}</h2>
                {typeof section.content === "string" ? (
                  <p className="text-[14px] text-gray-700 leading-[1.75]">{section.content}</p>
                ) : (
                  section.content.map((c, j) => (
                    <p key={j} className="text-[14px] text-gray-700 leading-[1.75] mb-3 last:mb-0">{c}</p>
                  ))
                )}
              </div>
            </Reveal>
          </div>
        );

      case "narrative":
        return (
          <div key={i} className="mb-10">
            <Reveal>
              <h2 className="text-[22px] font-extrabold text-gray-900 mb-5">{section.title}</h2>
              {typeof section.content === "string" ? (
                section.content.split("\n\n").map((para, j) => (
                  <p key={j} className="text-[14px] text-gray-700 leading-[1.8] mb-4">{para}</p>
                ))
              ) : (
                section.content.map((para, j) => (
                  <p key={j} className="text-[14px] text-gray-700 leading-[1.8] mb-4">{para}</p>
                ))
              )}
            </Reveal>
          </div>
        );

      default:
        return null;
    }
  }

  function renderSections() {
    return data!.sections.map((section, i) => renderSection(section, i));
  }

  return (
    <div className="pt-[90px] pb-16">
      {/* Breadcrumb */}
      <div className="max-w-[1100px] mx-auto px-5 md:px-10 mb-6">
        <nav aria-label="Breadcrumb">
          <ol className="text-[12px] text-gray-400 flex items-center flex-wrap" itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link to={langPath(lang, "/")} className="hover:text-gray-600" itemProp="item"><span itemProp="name">首頁</span></Link>
              <meta itemProp="position" content="1" />
            </li>
            <span className="mx-2">/</span>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span itemProp="name">行業</span>
              <meta itemProp="position" content="2" />
            </li>
            <span className="mx-2">/</span>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span itemProp="name">{data.industryName}</span>
              <meta itemProp="position" content="3" />
            </li>
            <span className="mx-2">/</span>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span className="text-gray-600" itemProp="name">{data.engineName}</span>
              <meta itemProp="position" content="4" />
            </li>
          </ol>
        </nav>
      </div>

      {/* Hero */}
      <section className="max-w-[1100px] mx-auto px-5 md:px-10 mb-16">
        <Reveal>
          <p className="text-[#7C3AED] text-[12px] font-semibold tracking-[0.2em] uppercase mb-4">
            {data.industryName} x {data.engineName}
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
            免費 AEO 審計
          </motion.a>
        </Reveal>
      </section>

      {/* Stats */}
      {data.stats.length > 0 && (
        <section className="bg-gradient-to-br from-[#0f1629] to-[#1a1a3a] py-14 mb-16">
          <div className="max-w-[1100px] mx-auto px-5 md:px-10">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {data.stats.map((s, i) => (
                <motion.div key={i} className="text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
                  <div className="text-[32px] md:text-[42px] font-extrabold text-white">{s.value}</div>
                  <div className="text-[13px] text-gray-400 mt-1">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Dynamic Sections */}
      <section className="max-w-[1100px] mx-auto px-5 md:px-10 mb-16">
        {renderSections()}
      </section>

      {/* FAQ */}
      {data.faqs.length > 0 && (
        <section className="bg-gray-50 py-14 mb-16">
          <div className="max-w-[800px] mx-auto px-5 md:px-10">
            <Reveal><h2 className="text-[24px] md:text-[30px] font-extrabold text-gray-900 mb-8 text-center">常見問題</h2></Reveal>
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
      )}

      {/* CTA */}
      <section className="max-w-[1100px] mx-auto px-5 md:px-10 text-center mb-16">
        <Reveal>
          <div className="bg-gradient-to-br from-[#0f1629] to-[#1a1a3a] rounded-xl p-8">
            <h2 className="text-[22px] md:text-[28px] font-extrabold text-white mb-3">
              準備好喺 {data.engineName} 被推薦？
            </h2>
            <p className="text-[14px] text-gray-300 mb-6 max-w-[460px] mx-auto">
              免費審計你嘅{data.industryName}品牌喺 {data.engineName} 嘅能見度
            </p>
            <motion.a href={CALENDLY} className="inline-block px-7 py-3 rounded-lg bg-[#7C3AED] text-white text-[14px] font-semibold hover:bg-[#6D28D9] transition-colors" whileHover={{ scale: 1.06, y: -2 }} whileTap={{ scale: 0.97 }}>
              免費 AEO 審計
            </motion.a>
          </div>
        </Reveal>
      </section>

      {/* Internal Links */}
      <section className="max-w-[1100px] mx-auto px-5 md:px-10">
        {sameIndustry.length > 0 && (
          <div className="border-t border-gray-200 pt-10 mb-8">
            <h3 className="text-[16px] font-bold text-gray-900 mb-4">{data.industryName} x 其他 AI 引擎</h3>
            <div className="flex flex-wrap gap-2">
              {sameIndustry.map((p) => (
                <Link key={p.slug} to={langPath(lang, `/aeo/${p.industrySlug}/${p.engineSlug}`)} className="px-4 py-2 rounded-full border border-gray-200 text-[13px] text-gray-600 hover:border-[#7C3AED] hover:text-[#7C3AED] transition-colors">
                  {p.industryName} x {p.engineName}
                </Link>
              ))}
            </div>
          </div>
        )}
        {sameEngine.length > 0 && (
          <div className={`${sameIndustry.length === 0 ? "border-t border-gray-200 pt-10" : ""}`}>
            <h3 className="text-[16px] font-bold text-gray-900 mb-4">{data.engineName} x 其他行業</h3>
            <div className="flex flex-wrap gap-2">
              {sameEngine.map((p) => (
                <Link key={p.slug} to={langPath(lang, `/aeo/${p.industrySlug}/${p.engineSlug}`)} className="px-4 py-2 rounded-full border border-gray-200 text-[13px] text-gray-600 hover:border-[#7C3AED] hover:text-[#7C3AED] transition-colors">
                  {p.industryName} x {p.engineName}
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

function NotFound() {
  const lang = useLanguage();
  return (
    <div className="pt-[120px] pb-20 text-center">
      <h1 className="text-[32px] font-extrabold text-gray-900 mb-3">找不到頁面</h1>
      <p className="text-gray-600 mb-6">呢個行業引擎組合暫時未有內容。</p>
      <Link to={langPath(lang, "/")} className="text-[#7C3AED] font-semibold underline">返回首頁</Link>
    </div>
  );
}
