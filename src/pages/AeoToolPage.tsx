import { useEffect } from "react";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import { StaggerContainer, StaggerItem } from "../components/Reveal";
import { useLanguage, langPath } from "../i18n/context";
import AeoScoreCalculator from "../components/AeoScoreCalculator";
import { AeoWorkflowDiagram, EngineVisibilityMatrix, StatCounter } from "../components/VisualDiagrams";
import { SocialProofBar, TrustBadges } from "../components/SocialProofBar";
import { AuthorBox, FaqAccordion } from "../components/PseoEnhancements";
import {
  injectMultipleJsonLd,
  cleanupJsonLd,
  setMetaTags,
  setCanonical,
  SITE,
} from "../lib/schema";

export default function AeoToolPage() {
  const lang = useLanguage();

  useEffect(() => {
    const title = lang === "en"
      ? "Free AEO Readiness Score Calculator | SurfIO"
      : "免費 AEO 準備度評分工具 | SurfIO";
    const desc = lang === "en"
      ? "Calculate your brand's AI search readiness score in 2 minutes. Get personalized recommendations for ChatGPT, Perplexity, Claude, and Google AI Overview optimization."
      : "2 分鐘計算你嘅品牌 AI 搜尋準備度評分。獲取針對 ChatGPT、Perplexity、Claude 同 Google AI Overview 嘅個人化優化建議。";

    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", desc);

    const pagePath = lang === "en" ? "/en/tools/aeo-score" : "/tools/aeo-score";
    setCanonical(`${SITE.url}${pagePath}`);
    setMetaTags({
      "og:type": "website",
      "og:url": `${SITE.url}${pagePath}`,
      "og:title": title,
      "og:description": desc,
      "og:image": `${SITE.url}/logos/surfio-icon.png`,
      "og:site_name": "SurfIO",
      "og:locale": lang === "en" ? "en" : "zh_HK",
    });

    const schemas = [
      {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: lang === "en" ? "AEO Readiness Score Calculator" : "AEO 準備度評分工具",
        description: desc,
        url: `${SITE.url}${pagePath}`,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "HKD",
        },
        author: {
          "@type": "Organization",
          name: "SurfIO",
          url: SITE.url,
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map(([q, a]) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      },
    ];

    injectMultipleJsonLd([
      { id: "ld-tool-app", data: schemas[0] },
      { id: "ld-tool-faq", data: schemas[1] },
    ]);

    window.scrollTo(0, 0);
    return () => cleanupJsonLd(["ld-tool-app", "ld-tool-faq"]);
  }, [lang]);

  const faqs: [string, string][] = lang === "en"
    ? [
        ["What is an AEO Readiness Score?", "It measures how well your brand is positioned to be recommended by AI search engines like ChatGPT, Perplexity, and Google AI Overview. Scores range from 0-100."],
        ["How is the score calculated?", "We assess 4 dimensions: digital presence (25pts), AI visibility (30pts), content quality (30pts), and industry baseline (15pts). Each is weighted based on its impact on AI citations."],
        ["Is the tool free?", "Yes, the AEO Readiness Score Calculator is completely free. For a deeper analysis, book a free AEO audit with our team."],
        ["What should I do if my score is low?", "A low score means significant opportunity. Book a free audit and our team will provide a detailed roadmap to improve your AI search visibility."],
        ["How often should I check my score?", "We recommend reassessing every quarter, or after making significant changes to your content, schema markup, or digital presence."],
      ]
    : [
        ["咩係 AEO 準備度評分？", "佢衡量你嘅品牌喺 AI 搜尋引擎（如 ChatGPT、Perplexity、Google AI Overview）被推薦嘅準備程度。分數由 0-100。"],
        ["評分點計？", "我哋評估 4 個維度：數碼存在感（25分）、AI 能見度（30分）、內容質量（30分）、行業基準（15分）。每個維度按對 AI 引用嘅影響加權。"],
        ["呢個工具免費嗎？", "係，AEO 準備度評分工具完全免費。如果你想要更深入嘅分析，可以預約我哋嘅免費 AEO 審計。"],
        ["如果分數低點算？", "低分意味住巨大嘅機會。預約免費審計，我哋團隊會提供詳細嘅改善路線圖，提升你嘅 AI 搜尋能見度。"],
        ["幾耐應該檢查一次分數？", "我哋建議每季重新評估一次，或者喺你對內容、Schema Markup 或數碼存在做出重大改變之後。"],
      ];

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
              <span className="text-gray-600" itemProp="name">{lang === "en" ? "AEO Score Calculator" : "AEO 評分工具"}</span>
              <meta itemProp="position" content="2" />
            </li>
          </ol>
        </nav>
      </div>

      {/* Hero */}
      <section className="max-w-[1100px] mx-auto px-5 md:px-10 mb-12">
        <Reveal>
          <p className="text-[#7C3AED] text-[12px] font-semibold tracking-[0.2em] uppercase mb-4">
            {lang === "en" ? "FREE TOOL" : "免費工具"}
          </p>
          <h1 className="text-[clamp(28px,4vw,44px)] font-extrabold text-gray-900 leading-[1.2] mb-5 max-w-[800px]">
            {lang === "en"
              ? "How Ready Is Your Brand for AI Search?"
              : "你嘅品牌準備好迎接 AI 搜尋時代未？"}
          </h1>
          <p className="text-[15px] text-gray-600 leading-[1.75] mb-6 max-w-[650px]">
            {lang === "en"
              ? "Get your AEO Readiness Score in 2 minutes. Discover how visible your brand is across ChatGPT, Perplexity, Claude, and Google AI Overview — and what to do about it."
              : "2 分鐘獲取你嘅 AEO 準備度評分。了解你嘅品牌喺 ChatGPT、Perplexity、Claude 同 Google AI Overview 嘅能見度——同埋點樣改善。"}
          </p>
        </Reveal>

        {/* Social Proof */}
        <div className="mb-8">
          <SocialProofBar />
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gradient-to-br from-[#0f1629] to-[#1a1a3a] py-14 mb-16">
        <div className="max-w-[1100px] mx-auto px-5 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatCounter value={68} suffix="%" label={lang === "en" ? "of users trust first AI citation" : "用戶信任首個 AI 引用"} />
            <StatCounter value={500} suffix="+" label={lang === "en" ? "HK businesses scored" : "香港企業已評分"} />
            <StatCounter value={3.2} suffix="x" label={lang === "en" ? "avg citation increase" : "平均引用增長"} />
            <StatCounter value={7} suffix="" label={lang === "en" ? "AI engines covered" : "大 AI 引擎覆蓋"} />
          </div>
        </div>
      </section>

      {/* AEO Workflow Diagram */}
      <section className="max-w-[1100px] mx-auto px-5 md:px-10 mb-16">
        <Reveal>
          <h2 className="text-[24px] md:text-[30px] font-extrabold text-gray-900 mb-8 text-center">
            {lang === "en" ? "How AEO Works" : "AEO 點樣運作"}
          </h2>
        </Reveal>
        <AeoWorkflowDiagram />
      </section>

      {/* The Calculator — Main Feature */}
      <section className="max-w-[1100px] mx-auto px-5 md:px-10 mb-16" id="calculator">
        <AeoScoreCalculator />
      </section>

      {/* Engine Visibility Matrix */}
      <section className="max-w-[1100px] mx-auto px-5 md:px-10 mb-16">
        <Reveal>
          <h2 className="text-[24px] md:text-[30px] font-extrabold text-gray-900 mb-3 text-center">
            {lang === "en" ? "AI Engine Visibility Matrix" : "AI 引擎能見度矩陣"}
          </h2>
          <p className="text-[14px] text-gray-500 text-center mb-8 max-w-[500px] mx-auto">
            {lang === "en"
              ? "See how your brand could appear across all major AI search engines"
              : "睇下你嘅品牌可以點樣出現喺所有主要 AI 搜尋引擎"}
          </p>
        </Reveal>
        <EngineVisibilityMatrix />
      </section>

      {/* Why AEO Matters */}
      <section className="max-w-[1100px] mx-auto px-5 md:px-10 mb-16">
        <Reveal>
          <h2 className="text-[24px] md:text-[30px] font-extrabold text-gray-900 mb-8">
            {lang === "en" ? "Why AEO Matters in 2026" : "點解 AEO 喺 2026 年好重要"}
          </h2>
        </Reveal>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(lang === "en"
            ? [
                { title: "40%+ Queries Go to AI", desc: "Over 40% of search queries now go through AI engines like ChatGPT and Perplexity instead of traditional Google search." },
                { title: "AI Recommends, Not Ranks", desc: "AI engines don't show 10 blue links — they recommend specific brands. If you're not recommended, you don't exist." },
                { title: "First Mover Advantage", desc: "The AEO market is nascent. Companies that optimize now will establish dominant positions before competitors catch up." },
              ]
            : [
                { title: "40%+ 查詢流向 AI", desc: "超過 40% 嘅搜尋查詢而家流向 ChatGPT 同 Perplexity 等 AI 引擎，唔係傳統 Google 搜尋。" },
                { title: "AI 推薦，唔係排名", desc: "AI 引擎唔會顯示 10 條藍色連結——佢哋推薦特定品牌。如果你冇被推薦，你就唔存在。" },
                { title: "先行者優勢", desc: "AEO 市場仲係初期。而家優化嘅公司會喺競爭對手追上之前建立主導地位。" },
              ]
          ).map((item, i) => (
            <StaggerItem key={i}>
              <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm h-full">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#EC4899] flex items-center justify-center mb-4">
                  <span className="text-[15px] font-bold text-white">{i + 1}</span>
                </div>
                <h3 className="text-[16px] font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-[14px] text-gray-600 leading-[1.75]">{item.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* FAQ */}
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

      {/* Author + Trust */}
      <section className="max-w-[800px] mx-auto px-5 md:px-10 mb-10">
        <AuthorBox />
        <div className="mt-6">
          <TrustBadges />
        </div>
      </section>

      {/* Explore Hub Pages */}
      <section className="max-w-[1100px] mx-auto px-5 md:px-10">
        <div className="border-t border-gray-200 pt-10">
          <h3 className="text-[16px] font-bold text-gray-900 mb-4">
            {lang === "en" ? "Explore Our Resources" : "探索我哋嘅資源"}
          </h3>
          <div className="flex flex-wrap gap-2">
            <Link to={langPath(lang, "/aeo/industries")} className="px-4 py-2 rounded-full border border-gray-200 text-[13px] text-gray-600 hover:border-[#7C3AED] hover:text-[#7C3AED] transition-colors">
              {lang === "en" ? "490 Industry Pages" : "490 個行業頁面"}
            </Link>
            <Link to={langPath(lang, "/vs")} className="px-4 py-2 rounded-full border border-gray-200 text-[13px] text-gray-600 hover:border-[#7C3AED] hover:text-[#7C3AED] transition-colors">
              {lang === "en" ? "195 Competitor Comparisons" : "195 個競爭對手比較"}
            </Link>
            <Link to={langPath(lang, "/aeo-agency")} className="px-4 py-2 rounded-full border border-gray-200 text-[13px] text-gray-600 hover:border-[#7C3AED] hover:text-[#7C3AED] transition-colors">
              {lang === "en" ? "39 Locations" : "39 個地區"}
            </Link>
            <Link to={langPath(lang, "/指南")} className="px-4 py-2 rounded-full border border-gray-200 text-[13px] text-gray-600 hover:border-[#7C3AED] hover:text-[#7C3AED] transition-colors">
              {lang === "en" ? "105 Guides" : "105 篇指南"}
            </Link>
            <Link to={langPath(lang, "/用途")} className="px-4 py-2 rounded-full border border-gray-200 text-[13px] text-gray-600 hover:border-[#7C3AED] hover:text-[#7C3AED] transition-colors">
              {lang === "en" ? "20 Use Cases" : "20 個用途"}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
