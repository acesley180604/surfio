import { createContext, useContext, useMemo } from "react";
import { useLocation } from "react-router-dom";

export type Lang = "zh" | "en";

const LanguageContext = createContext<Lang>("zh");

export function useLanguage(): Lang {
  return useContext(LanguageContext);
}

/** Strips /en prefix from a path to get the base path */
export function basePath(path: string): string {
  if (path === "/en" || path === "/en/") return "/";
  if (path.startsWith("/en/")) return path.slice(3);
  return path;
}

/** Builds a path with the correct language prefix */
export function langPath(lang: Lang, path: string): string {
  const base = basePath(path);
  return lang === "en" ? `/en${base === "/" ? "" : base}` : base;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const lang = useMemo<Lang>(() => {
    return location.pathname === "/en" || location.pathname.startsWith("/en/") ? "en" : "zh";
  }, [location.pathname]);

  return (
    <LanguageContext.Provider value={lang}>
      {children}
    </LanguageContext.Provider>
  );
}
