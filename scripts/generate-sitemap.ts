#!/usr/bin/env npx tsx
// Dynamic sitemap generator for all pSEO pages
// Usage: npx tsx scripts/generate-sitemap.ts

import { getIndustryEnginePages } from "../src/data/pseo/industry-engine";
import { getCompetitorPages } from "../src/data/pseo/competitors";
import { getLocationPages } from "../src/data/pseo/locations";
import { getGuidePages } from "../src/data/pseo/guides";
import { getUseCasePages } from "../src/data/pseo/use-cases";
import { industries } from "../src/data/industries";
import { platforms } from "../src/data/platforms";
import { glossaryTerms } from "../src/data/glossary";
import * as fs from "fs";
import * as path from "path";

const SITE_URL = "https://surfio.net";
const TODAY = new Date().toISOString().split("T")[0];

interface SitemapEntry {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: string;
}

function buildEntries(): SitemapEntry[] {
  const entries: SitemapEntry[] = [];

  // Homepage
  entries.push({ loc: `${SITE_URL}/`, lastmod: TODAY, changefreq: "weekly", priority: "1.0" });
  entries.push({ loc: `${SITE_URL}/en`, lastmod: TODAY, changefreq: "weekly", priority: "1.0" });

  // Existing industry pages
  for (const ind of industries) {
    entries.push({ loc: `${SITE_URL}/aeo/${ind.slug}`, lastmod: TODAY, changefreq: "monthly", priority: "0.9" });
  }

  // Existing platform pages
  for (const plat of platforms) {
    entries.push({ loc: `${SITE_URL}/platform/${plat.slug}`, lastmod: TODAY, changefreq: "monthly", priority: "0.9" });
  }

  // Glossary
  entries.push({ loc: `${SITE_URL}/glossary`, lastmod: TODAY, changefreq: "monthly", priority: "0.8" });
  for (const term of glossaryTerms) {
    entries.push({ loc: `${SITE_URL}/glossary/${term.slug}`, lastmod: TODAY, changefreq: "monthly", priority: "0.8" });
  }

  // Cluster A: Industry × Engine
  for (const page of getIndustryEnginePages()) {
    entries.push({
      loc: `${SITE_URL}/aeo/${page.slug}`,
      lastmod: TODAY,
      changefreq: "monthly",
      priority: "0.8",
    });
  }

  // Cluster B: Competitors
  for (const page of getCompetitorPages()) {
    entries.push({
      loc: `${SITE_URL}/vs/${page.slug}`,
      lastmod: TODAY,
      changefreq: "monthly",
      priority: "0.7",
    });
  }

  // Cluster C: Locations
  for (const page of getLocationPages()) {
    entries.push({
      loc: `${SITE_URL}/aeo-agency/${page.slug}`,
      lastmod: TODAY,
      changefreq: "monthly",
      priority: "0.8",
    });
  }

  // Cluster D: Guides
  for (const page of getGuidePages()) {
    entries.push({
      loc: `${SITE_URL}/指南/${page.slug}`,
      lastmod: TODAY,
      changefreq: "monthly",
      priority: "0.7",
    });
  }

  // Cluster E: Use Cases
  for (const page of getUseCasePages()) {
    entries.push({
      loc: `${SITE_URL}/用途/${page.slug}`,
      lastmod: TODAY,
      changefreq: "monthly",
      priority: "0.7",
    });
  }

  return entries;
}

function generateSitemapXml(entries: SitemapEntry[]): string {
  const urls = entries
    .map(
      (e) => `  <url>
    <loc>${e.loc}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

// Generate sitemap index for large sitemaps (>50k URLs)
function generateSitemapIndex(entries: SitemapEntry[]): { index: string; sitemaps: { name: string; content: string }[] } {
  const CHUNK_SIZE = 10000;
  const chunks: SitemapEntry[][] = [];

  for (let i = 0; i < entries.length; i += CHUNK_SIZE) {
    chunks.push(entries.slice(i, i + CHUNK_SIZE));
  }

  if (chunks.length <= 1) {
    return {
      index: "",
      sitemaps: [{ name: "sitemap.xml", content: generateSitemapXml(entries) }],
    };
  }

  const sitemaps = chunks.map((chunk, i) => ({
    name: `sitemap-${i + 1}.xml`,
    content: generateSitemapXml(chunk),
  }));

  const indexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps.map((s) => `  <sitemap>
    <loc>${SITE_URL}/${s.name}</loc>
    <lastmod>${TODAY}</lastmod>
  </sitemap>`).join("\n")}
</sitemapindex>
`;

  return { index: indexXml, sitemaps };
}

// Main
const entries = buildEntries();
console.log(`Generated ${entries.length} sitemap entries`);

const publicDir = path.resolve(__dirname, "../public");

if (entries.length > 50000) {
  const { index, sitemaps } = generateSitemapIndex(entries);
  fs.writeFileSync(path.join(publicDir, "sitemap.xml"), index);
  for (const s of sitemaps) {
    fs.writeFileSync(path.join(publicDir, s.name), s.content);
  }
  console.log(`Written sitemap index + ${sitemaps.length} sub-sitemaps`);
} else {
  const xml = generateSitemapXml(entries);
  fs.writeFileSync(path.join(publicDir, "sitemap.xml"), xml);
  console.log("Written sitemap.xml");
}

// Summary
const clusters = {
  "Homepage": entries.filter((e) => e.loc === `${SITE_URL}/` || e.loc === `${SITE_URL}/en`).length,
  "Industry (existing)": industries.length,
  "Platform (existing)": platforms.length,
  "Glossary (existing)": glossaryTerms.length + 1,
  "Cluster A (Industry×Engine)": getIndustryEnginePages().length,
  "Cluster B (Competitors)": getCompetitorPages().length,
  "Cluster C (Locations)": getLocationPages().length,
  "Cluster D (Guides)": getGuidePages().length,
  "Cluster E (Use Cases)": getUseCasePages().length,
};
console.log("\nBreakdown:");
for (const [name, count] of Object.entries(clusters)) {
  console.log(`  ${name}: ${count}`);
}
console.log(`  TOTAL: ${entries.length}`);
