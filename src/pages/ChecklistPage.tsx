import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import Reveal from "../components/Reveal";
import { StaggerContainer, StaggerItem } from "../components/Reveal";
import { useLanguage, langPath } from "../i18n/context";
import { getChecklistPages } from "../data/pseo/checklists";
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
import { SocialProofBar, TrustBadges } from "../components/SocialProofBar";
import AeoScoreCalculator from "../components/AeoScoreCalculator";

const CALENDLY = "https://calendly.com/acesley180604/aeo-service-free-audit-surfio";

// --- localStorage persistence ---
function loadChecked(slug: string): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(`checklist-${slug}`);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return {};
}

function saveChecked(slug: string, state: Record<string, boolean>) {
  try {
    localStorage.setItem(`checklist-${slug}`, JSON.stringify(state));
  } catch { /* ignore */ }
}

// --- Priority badge ---
function PriorityBadge({ priority }: { priority: "high" | "medium" | "low" }) {
  const colors = {
    high: "bg-red-100 text-red-700 border-red-200",
    medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
    low: "bg-green-100 text-green-700 border-green-200",
  };
  const labels = { high: "High", medium: "Medium", low: "Low" };
  return (
    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${colors[priority]}`}>
      {labels[priority]}
    </span>
  );
}

export default function ChecklistPage() {
  const { slug } = useParams();
  const lang = useLanguage();
  const allPages = getChecklistPages();
  const data = allPages.find((p) => p.slug === slug);

  const [checked, setChecked] = useState<Record<string, boolean>>(() =>
    data ? loadChecked(data.slug) : {}
  );

  const toggle = useCallback(
    (key: string) => {
      setChecked((prev) => {
        const next = { ...prev, [key]: !prev[key] };
        if (data) saveChecked(data.slug, next);
        return next;
      });
    },
    [data]
  );

  useEffect(() => {
    if (data) {
      setChecked(loadChecked(data.slug));
    }
  }, [data?.slug]);

  useEffect(() => {
    if (data) {
      const title = lang === "en" ? data.metaTitleEn : data.metaTitle;
      const desc = lang === "en" ? data.metaDescriptionEn : data.metaDescription;
      document.title = title;
      document.querySelector('meta[name="description"]')?.setAttribute("content", desc);

      const pagePath = lang === "en"
        ? `/en/checklist/${data.slug}`
        : `/checklist/${data.slug}`;
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

      const heroTitle = lang === "en" ? data.heroTitleEn : data.heroTitle;
      const industryName = lang === "en" ? data.industryNameEn : data.industryName;

      const webPageSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: heroTitle,
        description: desc,
        url: `${SITE.url}${pagePath}`,
        publisher: { "@type": "Organization", "@id": `${SITE.url}/#organization`, name: "SurfIO" },
        inLanguage: lang === "en" ? "en" : "zh-HK",
        about: { "@type": "Thing", name: `AEO Checklist for ${industryName}` },
      };

      const faqs = lang === "en" ? data.faqsEn : data.faqs;
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
        { id: "ld-checklist-page", data: webPageSchema },
        { id: "ld-checklist-faq", data: faqSchema },
      ]);
    }
    window.scrollTo(0, 0);

    return () => {
      cleanupJsonLd(["ld-checklist-page", "ld-checklist-faq"]);
    };
  }, [data, lang]);

  if (!data) return <NotFound />;

  // Compute totals
  const allItems = data.categories.flatMap((cat, ci) =>
    cat.items.map((item, ii) => ({ key: `${ci}-${ii}`, ...item }))
  );
  const totalItems = allItems.length;
  const completedItems = allItems.filter((it) => checked[it.key]).length;
  const progressPct = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  const currentPath = lang === "en" ? `/en/checklist/${data.slug}` : `/checklist/${data.slug}`;
  const heroTitle = lang === "en" ? data.heroTitleEn : data.heroTitle;
  const industryName = lang === "en" ? data.industryNameEn : data.industryName;
  const faqs = lang === "en" ? data.faqsEn : data.faqs;

  // Related checklists
  const relatedPages = data.relatedChecklists
    .map((rSlug) => allPages.find((p) => p.slug === rSlug))
    .filter(Boolean) as typeof allPages;

  return (
    <div className="pt-[90px] pb-16">
      {/* Breadcrumb */}
      <div className="max-w-[1100px] mx-auto px-5 md:px-10 mb-6">
        <nav aria-label="Breadcrumb">
          <ol className="text-[12px] text-gray-400 flex items-center" itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link to={langPath(lang, "/")} className="hover:text-gray-600" itemProp="item">
                <span itemProp="name">{lang === "en" ? "Home" : "首頁"}</span>
              </Link>
              <meta itemProp="position" content="1" />
            </li>
            <span className="mx-2">/</span>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link to={langPath(lang, "/checklist")} className="hover:text-gray-600" itemProp="item">
                <span itemProp="name">{lang === "en" ? "AEO Checklists" : "AEO 清單"}</span>
              </Link>
              <meta itemProp="position" content="2" />
            </li>
            <span className="mx-2">/</span>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span className="text-gray-600" itemProp="name">{industryName}</span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </nav>
      </div>

      {/* Hero */}
      <section className="max-w-[1100px] mx-auto px-5 md:px-10 mb-10">
        <Reveal>
          <p className="text-[#7C3AED] text-[12px] font-semibold tracking-[0.2em] uppercase mb-4">
            AEO Checklist
          </p>
          <h1 className="text-[clamp(28px,4vw,44px)] font-extrabold text-gray-900 leading-[1.2] mb-5 max-w-[800px]">
            {heroTitle}
          </h1>
          <p className="text-[15px] text-gray-600 leading-[1.75] mb-6 max-w-[650px]">
            {lang === "en"
              ? `A complete AEO optimization checklist tailored for the ${industryName} industry. Track your progress interactively.`
              : `專為${industryName}行業而設嘅完整 AEO 優化清單。互動追蹤你嘅完成進度。`}
          </p>
        </Reveal>
      </section>

      {/* Progress Bar */}
      <section className="max-w-[1100px] mx-auto px-5 md:px-10 mb-12">
        <Reveal>
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[14px] font-bold text-gray-900">
                {lang === "en" ? "Completion Progress" : "完成進度"}
              </span>
              <span className="text-[14px] font-semibold text-[#7C3AED]">
                {completedItems}/{totalItems} ({progressPct}%)
              </span>
            </div>
            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899]"
                initial={{ width: 0 }}
                animate={{ width: `${progressPct}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
            {progressPct === 100 && (
              <p className="text-[13px] text-green-600 font-semibold mt-2">
                {lang === "en" ? "Congratulations! All items completed!" : "恭喜！所有項目已完成！"}
              </p>
            )}
          </div>
        </Reveal>
      </section>

      {/* Checklist Categories */}
      <StaggerContainer className="max-w-[1100px] mx-auto px-5 md:px-10 mb-16 space-y-10">
        {data.categories.map((cat, ci) => {
          const catCompleted = cat.items.filter((_, ii) => checked[`${ci}-${ii}`]).length;
          const catName = lang === "en" ? cat.nameEn : cat.name;

          return (
            <StaggerItem key={ci}>
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                {/* Category Header */}
                <div className="bg-gradient-to-r from-[#0f1629] to-[#1a1a3a] px-6 py-4 flex items-center justify-between">
                  <h2 className="text-[18px] font-bold text-white flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[14px] font-bold text-[#EC4899]">
                      {ci + 1}
                    </span>
                    {catName}
                  </h2>
                  <span className="text-[13px] text-gray-300">
                    {catCompleted}/{cat.items.length}
                  </span>
                </div>

                {/* Items */}
                <div className="divide-y divide-gray-100">
                  {cat.items.map((item, ii) => {
                    const key = `${ci}-${ii}`;
                    const isChecked = !!checked[key];
                    const itemText = lang === "en" ? item.textEn : item.text;

                    return (
                      <label
                        key={key}
                        className="flex items-start gap-4 px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggle(key)}
                          className="mt-0.5 w-5 h-5 rounded border-gray-300 text-[#7C3AED] focus:ring-[#7C3AED] shrink-0 accent-[#7C3AED]"
                        />
                        <span
                          className={`text-[14px] leading-[1.65] flex-1 transition-colors ${
                            isChecked ? "text-gray-400 line-through" : "text-gray-700"
                          }`}
                        >
                          {itemText}
                        </span>
                        <PriorityBadge priority={item.priority} />
                      </label>
                    );
                  })}
                </div>
              </div>
            </StaggerItem>
          );
        })}
      </StaggerContainer>

      {/* Social Proof */}
      <section className="mb-16">
        <SocialProofBar />
      </section>

      {/* FAQ */}
      {faqs.length > 0 && (
        <section className="bg-gray-50 py-14 mb-16">
          <div className="max-w-[800px] mx-auto px-5 md:px-10">
            <Reveal>
              <h2 className="text-[24px] md:text-[30px] font-extrabold text-gray-900 mb-8 text-center">
                {lang === "en" ? "FAQ" : "常見問題"}
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

      {/* Share + Engagement */}
      <section className="max-w-[1100px] mx-auto px-5 md:px-10 mb-10">
        <ShareButtons url={`${SITE.url}${currentPath}`} title={heroTitle} />
        <WasThisHelpful pageId={`checklist-${data.slug}`} />
      </section>

      {/* Trust Badges */}
      <section className="max-w-[1100px] mx-auto px-5 md:px-10 mb-16">
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
                ? `Need help completing your ${industryName} AEO checklist?`
                : `需要幫手完成${industryName} AEO 清單？`}
            </h2>
            <p className="text-[14px] text-gray-300 mb-6 max-w-[460px] mx-auto">
              {lang === "en"
                ? "Book a free AEO audit and let our experts assess your current status and create a priority plan."
                : "預約免費 AEO 審計，等我哋嘅專家幫你評估目前狀態同制定優先級計劃。"}
            </p>
            <motion.a
              href={CALENDLY}
              className="inline-block px-7 py-3 rounded-lg bg-[#7C3AED] text-white text-[14px] font-semibold hover:bg-[#6D28D9] transition-colors"
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              {lang === "en" ? "Free AEO Audit" : "免費 AEO 審計"}
            </motion.a>
          </div>
        </Reveal>
      </section>

      {/* Related Checklists */}
      {relatedPages.length > 0 && (
        <section className="max-w-[1100px] mx-auto px-5 md:px-10">
          <div className="border-t border-gray-200 pt-10">
            <h3 className="text-[16px] font-bold text-gray-900 mb-4">
              {lang === "en" ? "Related Checklists" : "相關清單"}
            </h3>
            <div className="flex flex-wrap gap-2">
              {relatedPages.map((p) => (
                <Link
                  key={p.slug}
                  to={langPath(lang, `/checklist/${p.slug}`)}
                  className="px-4 py-2 rounded-full border border-gray-200 text-[13px] text-gray-600 hover:border-[#7C3AED] hover:text-[#7C3AED] transition-colors"
                >
                  {lang === "en" ? p.industryNameEn : p.industryName}
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
        {lang === "en" ? "This checklist page is not available." : "呢個清單頁面暫時未有內容。"}
      </p>
      <Link to={langPath(lang, "/")} className="text-[#7C3AED] font-semibold underline">
        {lang === "en" ? "Back to Home" : "返回首頁"}
      </Link>
    </div>
  );
}
