import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { glossaryTerms } from "../data/glossary";
import Reveal from "../components/Reveal";

const CALENDLY = "https://calendly.com/acesley180604/aeo-service-free-audit-surfio";

export default function GlossaryPage() {
  const { slug } = useParams();
  const data = glossaryTerms.find((t) => t.slug === slug);

  useEffect(() => {
    if (data) {
      document.title = data.metaTitle;
      document.querySelector('meta[name="description"]')?.setAttribute("content", data.metaDescription);
    }
    window.scrollTo(0, 0);
  }, [data]);

  if (!data) return <GlossaryIndex />;

  return (
    <div className="pt-[90px] pb-16">
      {/* Breadcrumb */}
      <div className="max-w-[800px] mx-auto px-5 md:px-10 mb-6">
        <div className="text-[12px] text-gray-400">
          <Link to="/" className="hover:text-gray-600">首頁</Link>
          <span className="mx-2">/</span>
          <Link to="/glossary" className="hover:text-gray-600">術語表</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-600">{data.term}</span>
        </div>
      </div>

      {/* Content */}
      <article className="max-w-[800px] mx-auto px-5 md:px-10">
        <Reveal>
          <p className="text-[#7C3AED] text-[12px] font-semibold tracking-[0.2em] uppercase mb-4">
            AEO 術語表
          </p>
          <h1 className="text-[clamp(28px,4vw,40px)] font-extrabold text-gray-900 leading-[1.2] mb-6">
            {data.term}
          </h1>

          {/* Definition box */}
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 mb-8">
            <p className="text-[15px] text-gray-800 leading-[1.75] font-medium">
              {data.definition}
            </p>
          </div>

          {/* Full explanation */}
          <div className="prose-custom mb-10">
            {data.fullExplanation.split("\n\n").map((para, i) => (
              <p key={i} className="text-[15px] text-gray-700 leading-[1.8] mb-5">
                {para}
              </p>
            ))}
          </div>

          {/* Related terms */}
          <div className="border-t border-gray-200 pt-8 mb-10">
            <h3 className="text-[16px] font-bold text-gray-900 mb-4">相關術語</h3>
            <div className="flex flex-wrap gap-2">
              {data.relatedTerms.map((term) => {
                const linked = glossaryTerms.find(
                  (t) => t.term.includes(term) || t.slug === term.toLowerCase().replace(/\s+/g, "-")
                );
                return linked ? (
                  <Link
                    key={term}
                    to={`/glossary/${linked.slug}`}
                    className="px-4 py-2 rounded-full border border-gray-200 text-[13px] text-gray-600 hover:border-[#7C3AED] hover:text-[#7C3AED] transition-colors"
                  >
                    {term}
                  </Link>
                ) : (
                  <span key={term} className="px-4 py-2 rounded-full border border-gray-100 text-[13px] text-gray-400">
                    {term}
                  </span>
                );
              })}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-br from-[#0f1629] to-[#1a1a3a] rounded-xl p-8 text-center">
            <h3 className="text-[20px] font-extrabold text-white mb-2">
              想了解更多 AEO 策略？
            </h3>
            <p className="text-[14px] text-gray-300 mb-5">
              預約免費 AEO 審計，了解你嘅品牌喺 AI 搜尋中嘅表現。
            </p>
            <motion.a
              href={CALENDLY}
              className="inline-block px-6 py-3 rounded-lg bg-[#7C3AED] text-white text-[14px] font-semibold hover:bg-[#6D28D9] transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              預約免費 AEO 審計
            </motion.a>
          </div>
        </Reveal>
      </article>

      {/* All glossary terms */}
      <section className="max-w-[800px] mx-auto px-5 md:px-10 mt-16">
        <div className="border-t border-gray-200 pt-10">
          <h3 className="text-[16px] font-bold text-gray-900 mb-4">所有 AEO 術語</h3>
          <div className="flex flex-wrap gap-2">
            {glossaryTerms.filter((t) => t.slug !== slug).map((t) => (
              <Link
                key={t.slug}
                to={`/glossary/${t.slug}`}
                className="px-4 py-2 rounded-full border border-gray-200 text-[13px] text-gray-600 hover:border-[#7C3AED] hover:text-[#7C3AED] transition-colors"
              >
                {t.term.split(" (")[0]}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function GlossaryIndex() {
  useEffect(() => {
    document.title = "AEO 術語表 | AI 搜尋優化完整詞彙 - SurfIO";
    document.querySelector('meta[name="description"]')?.setAttribute("content", "SurfIO AEO 術語表：AI 搜尋優化、答案引擎優化、LLM、Schema Markup 等核心概念完整解釋。");
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-[90px] pb-16">
      <div className="max-w-[800px] mx-auto px-5 md:px-10">
        <Reveal>
          <p className="text-[#7C3AED] text-[12px] font-semibold tracking-[0.2em] uppercase mb-4">
            AEO 術語表
          </p>
          <h1 className="text-[clamp(28px,4vw,40px)] font-extrabold text-gray-900 leading-[1.2] mb-5">
            AI 搜尋優化術語表
          </h1>
          <p className="text-[15px] text-gray-600 leading-[1.75] mb-10">
            了解 AEO、GEO 同 AI 搜尋優化嘅核心概念。呢個術語表涵蓋所有你需要知道嘅 AI 搜尋術語。
          </p>
        </Reveal>

        <div className="space-y-4">
          {glossaryTerms.map((t, i) => (
            <motion.div
              key={t.slug}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                to={`/glossary/${t.slug}`}
                className="block bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:border-[#7C3AED] hover:shadow-md transition-all"
              >
                <h2 className="text-[16px] font-bold text-gray-900 mb-1">{t.term}</h2>
                <p className="text-[13px] text-gray-500 leading-[1.6] line-clamp-2">{t.definition}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
