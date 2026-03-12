import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../i18n/context";
import { t } from "../i18n/translations";

export default function ExitIntent() {
  const lang = useLanguage();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Only show once per session
    const shown = sessionStorage.getItem("exitIntentShown");
    if (shown) return;

    let timeout: ReturnType<typeof setTimeout>;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 5) {
        timeout = setTimeout(() => {
          setShow(true);
          sessionStorage.setItem("exitIntentShown", "1");
        }, 100);
      }
    };

    // Also show after 45 seconds of inactivity on mobile (no mouse leave)
    const mobileTimeout = setTimeout(() => {
      if (window.innerWidth < 768 && !sessionStorage.getItem("exitIntentShown")) {
        setShow(true);
        sessionStorage.setItem("exitIntentShown", "1");
      }
    }, 45000);

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      clearTimeout(timeout);
      clearTimeout(mobileTimeout);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    window.open(
      `https://calendly.com/acesley180604/aeo-service-free-audit-surfio?email=${encodeURIComponent(email)}`,
      "_blank"
    );
    setSubmitted(true);
    setTimeout(() => setShow(false), 2000);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShow(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />

          {/* Modal */}
          <motion.div
            className="relative bg-white rounded-2xl max-w-[440px] w-full p-7 shadow-2xl"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {/* Close */}
            <button
              onClick={() => setShow(false)}
              className="absolute top-4 right-4 w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2.5" strokeLinecap="round">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>

            <div className="text-center mb-5">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#F5F0FF] flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7,10 12,15 17,10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </div>
              <h3 className="text-[20px] font-extrabold text-gray-900 mb-2">
                {t("exit.headline", lang)}
              </h3>
              <p className="text-[13px] text-gray-500 leading-[1.6]">
                {t("exit.subtitle", lang)}
              </p>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("exit.placeholder", lang) as string}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-[14px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/30 focus:border-[#7C3AED] transition-all"
                />
                <motion.button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-[#7C3AED] text-white text-[14px] font-semibold hover:bg-[#6D28D9] transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {t("exit.btn", lang)}
                </motion.button>
              </form>
            ) : (
              <motion.div
                className="text-center py-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="text-[24px] mb-2">&#10003;</div>
                <p className="text-[14px] font-semibold text-green-600">{t("exit.success", lang)}</p>
              </motion.div>
            )}

            <p className="text-[11px] text-gray-400 text-center mt-3">
              {t("exit.noSpam", lang)}
            </p>

            <button
              onClick={() => setShow(false)}
              className="block w-full text-center text-[12px] text-gray-400 mt-3 hover:text-gray-600 transition-colors"
            >
              {t("exit.dismiss", lang)}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
