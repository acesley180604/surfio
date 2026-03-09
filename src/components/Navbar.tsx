import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { useLanguage, langPath, basePath } from "../i18n/context";
import { t } from "../i18n/translations";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lang = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const switchLang = () => {
    const base = basePath(location.pathname);
    const newLang = lang === "zh" ? "en" : "zh";
    navigate(langPath(newLang, base));
  };

  const navLinks = [
    { href: "#services", label: t("nav.services", lang) },
    { href: "#process", label: t("nav.process", lang) },
    { href: "#cases", label: t("nav.cases", lang) },
    { href: "#about", label: t("nav.about", lang) },
  ];

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
      className={`fixed top-0 inset-x-0 z-[100] transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-sm border-b border-gray-100"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 flex items-center justify-between h-[70px]">
        {/* Logo */}
        <motion.a
          href={langPath(lang, "/")}
          className="flex items-center gap-1.5"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <img src="/logos/surfio-icon.png" alt="SurfIO" className="w-7 h-7 rounded-lg object-cover" />
          <span className="text-[18px] font-extrabold text-gray-900 tracking-tight">
            SurfIO<sup className="text-[9px] text-gray-400 ml-0.5 relative -top-2">&reg;</sup>
          </span>
        </motion.a>

        {/* Nav links - desktop */}
        <div className="hidden md:flex items-center gap-6 text-[14px]">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              className="text-gray-700 font-medium hover:text-gray-900"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.08 }}
              whileHover={{ y: -1 }}
            >
              {link.label}
            </motion.a>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-gray-700 text-xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "\u2715" : "\u2630"}
        </button>

        {/* CTA + Lang switcher */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={switchLang}
            className="px-3 py-1.5 rounded-full border border-gray-200 text-[12px] font-semibold text-gray-600 hover:border-gray-400 transition-colors"
          >
            {lang === "zh" ? "EN" : "中文"}
          </button>
          <motion.a
            href="https://calendly.com/acesley180604/aeo-service-free-audit-surfio"
            className="border border-gray-300 text-gray-900 px-5 py-2 rounded-full text-[14px] font-medium hover:border-gray-400 transition-colors"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            {t("nav.cta", lang)}
          </motion.a>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-6 py-4 space-y-3">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className="block text-[14px] text-gray-700 font-medium" onClick={() => setMenuOpen(false)}>
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => { switchLang(); setMenuOpen(false); }}
                className="block text-[14px] text-gray-600 font-medium"
              >
                {lang === "zh" ? "English" : "中文"}
              </button>
              <a href="https://calendly.com/acesley180604/aeo-service-free-audit-surfio" className="block text-[14px] text-[#7C3AED] font-semibold" onClick={() => setMenuOpen(false)}>
                {t("nav.cta", lang)}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
