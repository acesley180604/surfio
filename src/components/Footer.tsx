import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLanguage, langPath } from "../i18n/context";
import { t } from "../i18n/translations";

const industrySlugs = ["financial-services", "accounting-firms", "b2b-software", "legal-services", "healthcare", "ecommerce", "edtech", "startups"];

export default function Footer() {
  const lang = useLanguage();
  const industryNames = t("footer.industryNames", lang) as string[];
  const strategyItems = t("footer.strategyItems", lang) as string[];

  return (
    <footer className="bg-[#0d0820] text-white">
      <div className="max-w-[1100px] mx-auto px-5 md:px-10 py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0 }}
          >
            <h4 className="text-[14px] font-bold text-[#EC4899] mb-4">{t("footer.contact", lang)}</h4>
            <div className="space-y-3">
              <a href="#" className="block text-[13px] text-gray-300 hover:text-white transition-colors">
                {t("footer.contactUs", lang)}
              </a>
              <a href="#" className="block text-[13px] text-gray-300 hover:text-white transition-colors">
                WhatsApp
              </a>
              <a href="#" className="block text-[13px] text-gray-300 hover:text-white transition-colors">
                {t("footer.hksp", lang)}
              </a>
            </div>
          </motion.div>

          {/* Industries */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
          >
            <h4 className="text-[14px] font-bold text-[#7C3AED] mb-4">{t("footer.industries", lang)}</h4>
            <div className="space-y-2">
              {industrySlugs.map((slug, i) => (
                <Link key={slug} to={langPath(lang, `/aeo/${slug}`)} className="block text-[13px] text-gray-300 hover:text-white transition-colors">{industryNames[i]}</Link>
              ))}
            </div>
          </motion.div>

          {/* Strategies + Resources + Supporters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.16 }}
          >
            <h4 className="text-[14px] font-bold text-[#7C3AED] mb-4">{t("footer.strategies", lang)}</h4>
            <div className="space-y-2">
              {strategyItems.map((item) => (
                <a key={item} href="#" className="block text-[13px] text-gray-300 hover:text-white transition-colors">{item}</a>
              ))}
            </div>

            <h4 className="text-[14px] font-bold text-[#7C3AED] mt-6 mb-4">{t("footer.resources", lang)}</h4>
            <div className="space-y-2">
              <a href="#" className="block text-[13px] text-gray-300 hover:text-white transition-colors">Blog</a>
              <Link to={langPath(lang, "/glossary/aeo")} className="block text-[13px] text-gray-300 hover:text-white transition-colors">{t("footer.aeoGuide", lang)}</Link>
              <Link to={langPath(lang, "/glossary")} className="block text-[13px] text-gray-300 hover:text-white transition-colors">{t("footer.glossary", lang)}</Link>
              <a href="#" className="block text-[13px] text-gray-300 hover:text-white transition-colors">{t("footer.sitemap", lang)}</a>
              <a href="#" className="block text-[13px] text-gray-300 hover:text-white transition-colors">{t("footer.caseStudies", lang)}</a>
            </div>

            <h4 className="text-[14px] font-bold text-[#7C3AED] mt-6 mb-4">{t("footer.supporters", lang)}</h4>
            <div className="space-y-2">
              {["HKSTP Ideation Programme", "Techathon+", "HK PolyU", "HKUST"].map((item) => (
                <a key={item} href="#" className="block text-[13px] text-gray-300 hover:text-white transition-colors">{item}</a>
              ))}
            </div>
          </motion.div>

          {/* Logo + social + legal */}
          <motion.div
            className="col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.24 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <img src="/logos/surfio-icon.png" alt="SurfIO" className="w-7 h-7 rounded-lg object-cover" />
              <span className="text-[18px] font-extrabold tracking-tight">SurfIO</span>
            </div>

            <div className="flex items-center gap-3 mb-5">
              {[
                { label: "YT", href: "#" },
                { label: "in", href: "#" },
                { label: "fb", href: "#" },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[11px] font-bold text-white"
                  whileHover={{ scale: 1.15, backgroundColor: "rgba(255,255,255,0.2)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.label}
                </motion.a>
              ))}
            </div>

            <p className="text-[12px] text-gray-400 mb-3">
              &copy; 2026 SurfIO&reg; Inc. {t("footer.copyright", lang)}
            </p>
            <div className="flex items-center gap-3 text-[12px] text-gray-400 mb-6">
              <a href="#" className="hover:text-white transition-colors">{t("footer.privacy", lang)}</a>
              <span>|</span>
              <a href="#" className="hover:text-white transition-colors">{t("footer.terms", lang)}</a>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-white/10 flex items-center justify-center">
                <span className="text-[7px] text-gray-400 text-center leading-tight font-bold whitespace-pre-line">{t("footer.hkstpBadge", lang)}</span>
              </div>
              <div className="w-10 h-10 rounded bg-white/10 flex items-center justify-center">
                <span className="text-[7px] text-gray-400 text-center leading-tight font-bold">Tech<br/>athon+</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
