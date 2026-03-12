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

const CALENDLY = "https://calendly.com/acesley180604/aeo-service-free-audit-surfio";

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
              <span itemProp="name">地區</span>
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
      <section className="max-w-[1100px] mx-auto px-5 md:px-10 mb-16">
        <Reveal>
          <p className="text-[#7C3AED] text-[12px] font-semibold tracking-[0.2em] uppercase mb-4">
            {data.locationName} AEO
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

      {/* Local Context */}
      <section className="max-w-[1100px] mx-auto px-5 md:px-10 mb-16">
        <Reveal>
          <h2 className="text-[24px] md:text-[30px] font-extrabold text-gray-900 mb-6">{data.locationName}嘅商業環境</h2>
          {data.localContext.split("\n\n").map((para, i) => (
            <p key={i} className="text-[15px] text-gray-700 leading-[1.8] mb-5">{para}</p>
          ))}
        </Reveal>
      </section>

      {/* Key Industries */}
      {data.keyIndustries.length > 0 && (
        <section className="max-w-[1100px] mx-auto px-5 md:px-10 mb-16">
          <Reveal>
            <h2 className="text-[24px] md:text-[30px] font-extrabold text-gray-900 mb-6">{data.locationName}嘅重點行業</h2>
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
              準備好喺{data.locationName}搶佔 AI 搜尋？
            </h2>
            <p className="text-[14px] text-gray-300 mb-6 max-w-[460px] mx-auto">
              免費審計你嘅品牌喺{data.locationName}嘅 AI 搜尋能見度
            </p>
            <motion.a href={CALENDLY} className="inline-block px-7 py-3 rounded-lg bg-[#7C3AED] text-white text-[14px] font-semibold hover:bg-[#6D28D9] transition-colors" whileHover={{ scale: 1.06, y: -2 }} whileTap={{ scale: 0.97 }}>
              免費 AEO 審計
            </motion.a>
          </div>
        </Reveal>
      </section>

      {/* Nearby Locations */}
      {nearbyPages.length > 0 && (
        <section className="max-w-[1100px] mx-auto px-5 md:px-10">
          <div className="border-t border-gray-200 pt-10">
            <h3 className="text-[16px] font-bold text-gray-900 mb-4">附近地區</h3>
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
      <h1 className="text-[32px] font-extrabold text-gray-900 mb-3">找不到頁面</h1>
      <p className="text-gray-600 mb-6">呢個地區頁面暫時未有內容。</p>
      <Link to={langPath(lang, "/")} className="text-[#7C3AED] font-semibold underline">返回首頁</Link>
    </div>
  );
}
