import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../i18n/context";

// ─── 1. TableOfContents ─────────────────────────────────────────────────────

interface TocSection {
  id: string;
  title: string;
  level?: number;
}

export function TableOfContents({ sections }: { sections: TocSection[] }) {
  const lang = useLanguage();
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-100px 0px -60% 0px", threshold: 0 }
    );

    for (const section of sections) {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [sections]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsOpen(false);
    }
  };

  const title = lang === "en" ? "Table of Contents" : "目錄";

  const renderItems = () =>
    sections.map((s) => (
      <button
        key={s.id}
        onClick={() => scrollTo(s.id)}
        className={`block w-full text-left text-[13px] leading-[1.6] py-1.5 transition-all duration-200 ${
          (s.level ?? 2) >= 3 ? "pl-4" : "pl-0"
        } ${
          activeId === s.id
            ? "text-[#7C3AED] font-semibold border-l-2 border-[#7C3AED] pl-3"
            : "text-gray-500 hover:text-gray-800 border-l-2 border-transparent pl-3"
        }`}
      >
        {s.title}
      </button>
    ));

  return (
    <>
      {/* Desktop: sticky sidebar */}
      <nav className="hidden lg:block sticky top-[110px] bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-gray-100 shadow-sm max-h-[calc(100vh-140px)] overflow-y-auto">
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-3">
          {title}
        </p>
        <div className="space-y-0.5">{renderItems()}</div>
      </nav>

      {/* Mobile: collapsible top bar */}
      <div className="lg:hidden mb-6">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-gray-100 shadow-sm"
        >
          <span className="text-[13px] font-semibold text-gray-700">{title}</span>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-gray-400"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.span>
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden bg-white rounded-b-xl border border-t-0 border-gray-100 px-4 pb-3"
            >
              <div className="pt-2 space-y-0.5">{renderItems()}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

// ─── 2. AuthorBox ────────────────────────────────────────────────────────────

export function AuthorBox() {
  const lang = useLanguage();

  const name = "Acesley Chan";
  const title = lang === "en"
    ? "AEO Strategy Director | SurfIO Founder"
    : "AEO 策略總監 | SurfIO 創辦人";
  const credentials = lang === "en"
    ? "7+ Years Digital Marketing | HKSTP Ideation Programme"
    : "7+ 年數碼營銷經驗 | HKSTP Ideation Programme";
  const profileLink = lang === "en" ? "/en/about" : "/about";

  return (
    <div
      className="flex items-start gap-4 bg-white border border-gray-100 rounded-xl p-5 shadow-sm mt-8"
      itemScope
      itemType="https://schema.org/Person"
    >
      {/* Avatar placeholder */}
      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#EC4899] flex items-center justify-center shrink-0">
        <span className="text-white text-[18px] font-bold">AC</span>
      </div>

      <div className="min-w-0">
        <a
          href={profileLink}
          className="text-[15px] font-bold text-gray-900 hover:text-[#7C3AED] transition-colors"
          itemProp="url"
        >
          <span itemProp="name">{name}</span>
        </a>
        <p className="text-[13px] text-gray-500 mt-0.5" itemProp="jobTitle">
          {title}
        </p>
        <p className="text-[12px] text-gray-400 mt-1.5 flex items-center gap-1.5">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
            <path d="M7 1l1.5 3.5L12 5l-2.5 2.5L10 11 7 9.5 4 11l.5-3.5L2 5l3.5-.5L7 1z" stroke="#7C3AED" strokeWidth="1.2" strokeLinejoin="round" />
          </svg>
          <span itemProp="description">{credentials}</span>
        </p>
        <meta itemProp="affiliation" content="SurfIO" />
      </div>
    </div>
  );
}

// ─── 3. ArticleMeta ──────────────────────────────────────────────────────────

interface ArticleMetaProps {
  publishedDate: string;
  modifiedDate: string;
  readingTime: number;
}

export function ArticleMeta({ publishedDate, modifiedDate, readingTime }: ArticleMetaProps) {
  const lang = useLanguage();

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    if (lang === "en") {
      return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    }
    return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
  };

  const publishedLabel = lang === "en" ? "Published" : "發佈於";
  const updatedLabel = lang === "en" ? "Updated" : "更新於";
  const readingLabel = lang === "en" ? `${readingTime} min read` : `閱讀時間 ${readingTime} 分鐘`;

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-gray-400 mb-6">
      <span className="flex items-center gap-1.5">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
          <rect x="1.5" y="2.5" width="11" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
          <path d="M1.5 5.5h11M4.5 1v2M9.5 1v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
        {publishedLabel} {formatDate(publishedDate)}
      </span>
      <span className="hidden sm:inline text-gray-300">|</span>
      <span className="flex items-center gap-1.5">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
          <rect x="1.5" y="2.5" width="11" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
          <path d="M1.5 5.5h11M4.5 1v2M9.5 1v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
        {updatedLabel} {formatDate(modifiedDate)}
      </span>
      <span className="hidden sm:inline text-gray-300">|</span>
      <span className="flex items-center gap-1.5">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
          <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.2" />
          <path d="M7 4v3.5l2.5 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {readingLabel}
      </span>
    </div>
  );
}

// ─── 4. ClusterNav ───────────────────────────────────────────────────────────

interface ClusterNavProps {
  currentSlug: string;
  allPages: { slug: string; title: string }[];
  basePath: string;
}

export function ClusterNav({ currentSlug, allPages, basePath }: ClusterNavProps) {
  const lang = useLanguage();

  const currentIndex = allPages.findIndex((p) => p.slug === currentSlug);
  if (currentIndex === -1) return null;

  const prev = currentIndex > 0 ? allPages[currentIndex - 1] : null;
  const next = currentIndex < allPages.length - 1 ? allPages[currentIndex + 1] : null;

  const prevLabel = lang === "en" ? "Previous" : "上一篇";
  const nextLabel = lang === "en" ? "Next" : "下一篇";
  const progressLabel = lang === "en"
    ? `${currentIndex + 1} / ${allPages.length}`
    : `第 ${currentIndex + 1} / ${allPages.length} 篇`;

  const progressPercent = ((currentIndex + 1) / allPages.length) * 100;

  return (
    <div className="mt-10 mb-6">
      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] text-gray-400 font-medium">{progressLabel}</span>
        </div>
        <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#7C3AED] to-[#EC4899] rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Nav buttons */}
      <div className="flex items-stretch gap-3">
        {prev ? (
          <a
            href={`${basePath}/${prev.slug}`}
            className="flex-1 flex flex-col items-start bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:border-[#7C3AED] hover:shadow-md transition-all group"
          >
            <span className="text-[11px] text-gray-400 flex items-center gap-1 mb-1">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M7.5 2.5L4 6l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {prevLabel}
            </span>
            <span className="text-[13px] font-semibold text-gray-700 group-hover:text-[#7C3AED] transition-colors line-clamp-2">
              {prev.title}
            </span>
          </a>
        ) : (
          <div className="flex-1" />
        )}

        {next ? (
          <a
            href={`${basePath}/${next.slug}`}
            className="flex-1 flex flex-col items-end text-right bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:border-[#7C3AED] hover:shadow-md transition-all group"
          >
            <span className="text-[11px] text-gray-400 flex items-center gap-1 mb-1">
              {nextLabel}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M4.5 2.5L8 6l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="text-[13px] font-semibold text-gray-700 group-hover:text-[#7C3AED] transition-colors line-clamp-2">
              {next.title}
            </span>
          </a>
        ) : (
          <div className="flex-1" />
        )}
      </div>
    </div>
  );
}

// ─── 5. WasThisHelpful ───────────────────────────────────────────────────────

export function WasThisHelpful({ pageId }: { pageId: string }) {
  const lang = useLanguage();
  const storageKey = `helpful_${pageId}`;
  const [voted, setVoted] = useState<"up" | "down" | null>(null);
  const [showThanks, setShowThanks] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored === "up" || stored === "down") {
      setVoted(stored);
      setShowThanks(true);
    }
  }, [storageKey]);

  const vote = (type: "up" | "down") => {
    if (voted) return;
    setVoted(type);
    setShowThanks(true);
    localStorage.setItem(storageKey, type);
  };

  const label = lang === "en" ? "Was this helpful?" : "呢篇文章有用嗎？";
  const thanks = lang === "en" ? "Thanks for your feedback!" : "多謝你嘅回饋！";

  return (
    <div className="mt-8 flex flex-col items-center">
      <div className="border border-gray-100 rounded-xl px-6 py-4 flex flex-col items-center gap-3 shadow-sm bg-white">
        <span className="text-[13px] text-gray-500 font-medium">{label}</span>

        <div className="flex items-center gap-3">
          <motion.button
            onClick={() => vote("up")}
            disabled={voted !== null}
            className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
              voted === "up"
                ? "bg-green-50 border-green-300 text-green-600"
                : voted
                  ? "border-gray-100 text-gray-300 cursor-default"
                  : "border-gray-200 text-gray-400 hover:border-green-300 hover:text-green-500 hover:bg-green-50"
            }`}
            whileTap={voted ? {} : { scale: 0.85 }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M5 8l4-5.5L10.5 6H14a1 1 0 011 1v7a1 1 0 01-1 1H6.5a1 1 0 01-.95-.68L3.5 8.5A1 1 0 014.45 7H5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
            </svg>
          </motion.button>

          <motion.button
            onClick={() => vote("down")}
            disabled={voted !== null}
            className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
              voted === "down"
                ? "bg-red-50 border-red-300 text-red-500"
                : voted
                  ? "border-gray-100 text-gray-300 cursor-default"
                  : "border-gray-200 text-gray-400 hover:border-red-300 hover:text-red-400 hover:bg-red-50"
            }`}
            whileTap={voted ? {} : { scale: 0.85 }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M13 10l-4 5.5L7.5 12H4a1 1 0 01-1-1V4a1 1 0 011-1h8.5a1 1 0 01.95.68l2.05 5.82a1 1 0 01-.95 1.5H13z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
            </svg>
          </motion.button>
        </div>

        <AnimatePresence>
          {showThanks && (
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-[12px] text-green-600 font-medium"
            >
              {thanks}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── 6. FaqAccordion ─────────────────────────────────────────────────────────

export function FaqAccordion({ faqs }: { faqs: [string, string][] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div
      className="space-y-3"
      itemScope
      itemType="https://schema.org/FAQPage"
    >
      {faqs.map(([question, answer], i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={i}
            className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden"
            itemScope
            itemProp="mainEntity"
            itemType="https://schema.org/Question"
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between p-5 text-left group"
              aria-expanded={isOpen}
            >
              <span
                className="text-[15px] font-bold text-gray-900 pr-4 leading-[1.5]"
                itemProp="name"
              >
                {question}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.25 }}
                className="shrink-0"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path
                    d="M5 7l4 4 4-4"
                    stroke="#7C3AED"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
                  className="overflow-hidden"
                >
                  <div
                    className="px-5 pb-5"
                    itemScope
                    itemProp="acceptedAnswer"
                    itemType="https://schema.org/Answer"
                  >
                    <p
                      className="text-[14px] text-gray-600 leading-[1.75]"
                      itemProp="text"
                    >
                      {answer}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

// ─── 7. ShareButtons ─────────────────────────────────────────────────────────

interface ShareButtonsProps {
  url: string;
  title: string;
}

export function ShareButtons({ url, title }: ShareButtonsProps) {
  const lang = useLanguage();
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = url;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [url]);

  const copiedLabel = lang === "en" ? "Copied!" : "已複製！";
  const shareLabel = lang === "en" ? "Share" : "分享";

  const buttons = [
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      color: "hover:bg-green-50 hover:border-green-300 hover:text-green-600",
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8.002 1.333A6.663 6.663 0 001.34 8a6.6 6.6 0 00.953 3.44L1.333 14.667l3.333-.96A6.663 6.663 0 108.002 1.333zm3.88 9.394c-.163.46-.953.88-1.313.913-.36.04-.693.167-2.34-.487-1.987-.787-3.247-2.82-3.347-2.953-.1-.133-.82-1.087-.82-2.073s.52-1.467.707-1.667c.187-.2.407-.247.54-.247.133 0 .267 0 .387.007.127.007.3-.047.467.353.173.413.587 1.44.64 1.54.053.107.087.227.013.36-.073.133-.113.22-.22.333-.107.113-.22.253-.32.34-.107.1-.213.213-.093.42.12.2.54.893 1.16 1.447.8.713 1.473.933 1.68 1.04.207.107.327.087.447-.053.12-.14.52-.607.66-.82.14-.207.28-.167.467-.1.193.067 1.213.573 1.42.68.207.1.347.153.4.233.053.08.053.473-.113.933z" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: "hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600",
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M4.003 14H1.5V5.5h2.503V14zM2.752 4.5A1.25 1.25 0 112.75 2a1.25 1.25 0 01.002 2.5zM14 14h-2.5v-4.125c0-1.042-.02-2.375-1.5-2.375-1.502 0-1.732 1.137-1.732 2.3V14H5.77V5.5h2.4v1.15h.033c.334-.613 1.15-1.262 2.367-1.262C12.94 5.388 14 6.888 14 9.05V14z" />
        </svg>
      ),
    },
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: "hover:bg-blue-50 hover:border-blue-400 hover:text-blue-700",
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M9.5 5.5V4c0-.55.45-1 1-1H11V1H9.5a2.5 2.5 0 00-2.5 2.5v2H5.5V7.5H7V15h2.5V7.5H11l.5-2H9.5z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex items-center gap-2 mt-6">
      <span className="text-[11px] text-gray-400 font-medium mr-1">{shareLabel}</span>

      {buttons.map((btn) => (
        <motion.a
          key={btn.label}
          href={btn.href}
          target="_blank"
          rel="noopener noreferrer"
          title={btn.label}
          className={`w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 transition-all ${btn.color}`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {btn.icon}
        </motion.a>
      ))}

      {/* Copy link */}
      <div className="relative">
        <motion.button
          onClick={copyLink}
          title={lang === "en" ? "Copy link" : "複製連結"}
          className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 transition-all hover:bg-purple-50 hover:border-[#7C3AED] hover:text-[#7C3AED]"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
            <path d="M6.5 9.5l3-3M5.5 7.5l-1 1a2.12 2.12 0 000 3 2.12 2.12 0 003 0l1-1M10.5 8.5l1-1a2.12 2.12 0 000-3 2.12 2.12 0 00-3 0l-1 1" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.button>

        <AnimatePresence>
          {copied && (
            <motion.span
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-900 text-white text-[11px] px-2.5 py-1 rounded-md"
            >
              {copiedLabel}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── 8. ReadingTime utility ──────────────────────────────────────────────────

/**
 * Calculates reading time for a given text.
 * Uses ~200 characters/min for Chinese text (no word boundaries),
 * and ~250 words/min for English text.
 */
export function calculateReadingTime(text: string): number {
  if (!text) return 1;

  // Count Chinese characters
  const chineseChars = (text.match(/[\u4e00-\u9fff\u3400-\u4dbf]/g) || []).length;

  // Count English words (remaining non-CJK text)
  const nonChinese = text.replace(/[\u4e00-\u9fff\u3400-\u4dbf]/g, " ");
  const englishWords = nonChinese.split(/\s+/).filter((w) => w.length > 0).length;

  // Chinese: ~200 chars/min, English: ~250 words/min
  const chineseMinutes = chineseChars / 200;
  const englishMinutes = englishWords / 250;

  const total = Math.ceil(chineseMinutes + englishMinutes);
  return Math.max(1, total);
}
