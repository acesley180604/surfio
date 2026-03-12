// ============================
// Contextual Auto-Linking System
// ============================
// Top pSEO sites (Zapier, NerdWallet, Wise) inject 5-10 internal links
// INTO body copy, not just in footer sections. This dramatically improves:
// 1. Crawl depth (Google discovers more pages)
// 2. Link equity distribution (PageRank flows through content)
// 3. Topical authority signals (interconnected content clusters)
// 4. User engagement (longer sessions, lower bounce)

import React from "react";
import {
  ALL_INDUSTRIES,
  AI_ENGINES,
  HK_DISTRICTS,
  GBA_CITIES,
  OVERSEAS_CITIES,
  USE_CASES,
  GUIDE_TOPICS,
} from "../data/pseo/types";

interface InternalLink {
  keyword: string;
  path: string;
  priority: number; // higher = more likely to be linked
}

// Build the master keyword → URL dictionary
function buildLinkDictionary(lang: "en" | "zh"): InternalLink[] {
  const prefix = lang === "en" ? "/en" : "";
  const links: InternalLink[] = [];

  // Industry pages (high priority)
  for (const ind of ALL_INDUSTRIES) {
    links.push({ keyword: ind.name, path: `${prefix}/aeo/${ind.slug}`, priority: 8 });
    // Also link "industry + AEO" patterns
    links.push({ keyword: `${ind.name} AEO`, path: `${prefix}/aeo/${ind.slug}`, priority: 9 });
  }

  // Industry × Engine pages
  for (const ind of ALL_INDUSTRIES) {
    for (const eng of AI_ENGINES) {
      links.push({
        keyword: `${ind.name} ${eng.name}`,
        path: `${prefix}/aeo/${ind.slug}/${eng.slug}`,
        priority: 7,
      });
    }
  }

  // Engine names → guide hub
  for (const eng of AI_ENGINES) {
    links.push({ keyword: eng.name, path: `${prefix}/指南/${eng.slug}-ranking`, priority: 6 });
  }

  // Guide topics
  for (const eng of AI_ENGINES) {
    for (const topic of GUIDE_TOPICS) {
      links.push({
        keyword: `${eng.name} ${topic.topicName}`,
        path: `${prefix}/指南/${eng.slug}-${topic.slug}`,
        priority: 7,
      });
    }
  }

  // Location pages
  for (const loc of [...HK_DISTRICTS, ...GBA_CITIES, ...OVERSEAS_CITIES]) {
    links.push({ keyword: loc.name, path: `${prefix}/aeo-agency/${loc.slug}`, priority: 5 });
    links.push({ keyword: `${loc.name} AEO`, path: `${prefix}/aeo-agency/${loc.slug}`, priority: 7 });
  }

  // Use cases
  for (const uc of USE_CASES) {
    links.push({ keyword: uc.name, path: `${prefix}/用途/${uc.slug}`, priority: 6 });
  }

  // Core pages
  links.push({ keyword: "AEO", path: `${prefix}/glossary/aeo`, priority: 4 });
  links.push({ keyword: lang === "en" ? "glossary" : "詞彙表", path: `${prefix}/glossary`, priority: 3 });

  // Sort by keyword length DESC so longer matches take priority
  // (e.g. "CRM 軟件 AEO" matches before "AEO")
  links.sort((a, b) => b.keyword.length - a.keyword.length || b.priority - a.priority);

  return links;
}

// Cache dictionaries
const dictCache = new Map<string, InternalLink[]>();

function getDictionary(lang: "en" | "zh"): InternalLink[] {
  if (!dictCache.has(lang)) {
    dictCache.set(lang, buildLinkDictionary(lang));
  }
  return dictCache.get(lang)!;
}

interface AutoLinkOptions {
  maxLinksPerBlock?: number;   // Max links to inject per text block (default: 3)
  excludePaths?: string[];     // Don't link to these paths (e.g. current page)
  excludeKeywords?: string[];  // Don't link these keywords
}

/**
 * AutoLinkedText component — takes a plain text string and returns JSX
 * with contextual internal links injected.
 *
 * Usage: <AutoLinkedText text={section.content} lang={lang} excludePaths={[currentPath]} />
 */
export function AutoLinkedText({
  text,
  lang,
  options = {},
}: {
  text: string;
  lang: "en" | "zh";
  options?: AutoLinkOptions;
}) {
  const {
    maxLinksPerBlock = 3,
    excludePaths = [],
    excludeKeywords = [],
  } = options;

  const dictionary = getDictionary(lang);
  const excludeSet = new Set(excludePaths);
  const excludeKwSet = new Set(excludeKeywords.map((k) => k.toLowerCase()));

  // Track which keywords we've already linked (link each keyword only once)
  const linkedKeywords = new Set<string>();
  let linkCount = 0;

  // Find all matches and their positions
  const matches: { start: number; end: number; keyword: string; path: string }[] = [];

  for (const link of dictionary) {
    if (linkCount >= maxLinksPerBlock) break;
    if (excludeSet.has(link.path)) continue;
    if (excludeKwSet.has(link.keyword.toLowerCase())) continue;
    if (linkedKeywords.has(link.keyword.toLowerCase())) continue;

    const idx = text.indexOf(link.keyword);
    if (idx === -1) continue;

    // Check this position doesn't overlap with existing matches
    const overlaps = matches.some(
      (m) => idx < m.end && idx + link.keyword.length > m.start
    );
    if (overlaps) continue;

    matches.push({
      start: idx,
      end: idx + link.keyword.length,
      keyword: link.keyword,
      path: link.path,
    });
    linkedKeywords.add(link.keyword.toLowerCase());
    linkCount++;
  }

  if (matches.length === 0) {
    return <>{text}</>;
  }

  // Sort matches by position
  matches.sort((a, b) => a.start - b.start);

  // Build JSX fragments
  const parts: React.ReactNode[] = [];
  let lastEnd = 0;

  for (const match of matches) {
    // Text before this match
    if (match.start > lastEnd) {
      parts.push(text.slice(lastEnd, match.start));
    }
    // The linked keyword
    parts.push(
      <a
        key={match.start}
        href={match.path}
        className="text-[#7C3AED] hover:text-[#EC4899] underline decoration-[#7C3AED]/30 hover:decoration-[#EC4899] transition-colors"
      >
        {match.keyword}
      </a>
    );
    lastEnd = match.end;
  }

  // Remaining text
  if (lastEnd < text.length) {
    parts.push(text.slice(lastEnd));
  }

  return <>{parts}</>;
}

/**
 * Hook to get auto-link options for a specific page.
 * Excludes the current page's path to prevent self-linking.
 */
export function useAutoLinkOptions(currentPath: string, currentKeywords: string[] = []): AutoLinkOptions {
  return {
    maxLinksPerBlock: 3,
    excludePaths: [currentPath],
    excludeKeywords: currentKeywords,
  };
}
