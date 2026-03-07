import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

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
        <motion.div
          className="flex items-center gap-1.5"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <div className="w-7 h-7 rounded-lg bg-[#7C3AED] flex items-center justify-center">
            <span className="text-white text-[12px] font-extrabold">S</span>
          </div>
          <span className="text-[18px] font-extrabold text-gray-900 tracking-tight">
            SurfIO<sup className="text-[9px] text-gray-400 ml-0.5 relative -top-2">&reg;</sup>
          </span>
        </motion.div>

        {/* Nav links - desktop */}
        <div className="hidden md:flex items-center gap-6 text-[14px]">
          {[
            { href: "#services", label: "服務" },
            { href: "#industries", label: "行業" },
            { href: "#cases", label: "案例" },
            { href: "#about", label: "關於" },
          ].map((link, i) => (
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

        {/* CTA */}
        <motion.a
          href="https://calendly.com/acesley180604/aeo-service-free-audit-surfio"
          className="hidden md:inline-block border border-gray-300 text-gray-900 px-5 py-2 rounded-full text-[14px] font-medium hover:border-gray-400 transition-colors"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
        >
          預約策略會議
        </motion.a>
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
              {["服務", "行業", "案例", "關於"].map((label) => (
                <a key={label} href="#" className="block text-[14px] text-gray-700 font-medium" onClick={() => setMenuOpen(false)}>
                  {label}
                </a>
              ))}
              <a href="https://calendly.com/acesley180604/aeo-service-free-audit-surfio" className="block text-[14px] text-[#7C3AED] font-semibold" onClick={() => setMenuOpen(false)}>
                預約策略會議
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
