#!/usr/bin/env npx tsx
/**
 * Static prerender script for Surfio pSEO pages.
 *
 * Collects every URL from the pSEO data layer (same sources as generate-sitemap),
 * boots a lightweight static server on the Vite build output (dist/), launches
 * Playwright Chromium, visits each URL, waits for React to hydrate and
 * useEffect meta-tag/JSON-LD injection to complete, then saves the full
 * document HTML to dist/<path>/index.html.
 *
 * The SPA's index.html is kept as the catch-all fallback (_headers / _redirects
 * on Cloudflare Pages) so non-prerendered routes still work.
 *
 * Usage:
 *   npx tsx scripts/prerender.ts          # after `npm run build`
 *   npm run prerender                     # same via package.json script
 *
 * Requirements (devDependencies):
 *   playwright  (+ `npx playwright install chromium`)
 */

import { chromium, type Browser, type Page } from "playwright";
import * as http from "node:http";
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

// ── pSEO data imports (same as generate-sitemap.ts) ────────────────────────
import { getIndustryEnginePages } from "../src/data/pseo/industry-engine";
import { getCompetitorPages } from "../src/data/pseo/competitors";
import { getLocationPages } from "../src/data/pseo/locations";
import { getGuidePages } from "../src/data/pseo/guides";
import { getUseCasePages } from "../src/data/pseo/use-cases";
import { industries } from "../src/data/industries";
import { platforms } from "../src/data/platforms";
import { glossaryTerms } from "../src/data/glossary";

// ── Config ─────────────────────────────────────────────────────────────────
const DIST_DIR = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../dist",
);
const PORT = 4173; // avoid clashing with Vite dev (5173) or preview (4173 default)
const ORIGIN = `http://localhost:${PORT}`;
const CONCURRENCY = 8; // parallel browser tabs
const NAV_TIMEOUT = 15_000; // ms per page

// ── URL collection ─────────────────────────────────────────────────────────

function collectUrls(): string[] {
  const urls: string[] = [];

  // Homepage
  urls.push("/");

  // Existing industry hub pages
  for (const ind of industries) {
    urls.push(`/aeo/${ind.slug}`);
  }

  // Existing platform pages
  for (const plat of platforms) {
    urls.push(`/platform/${plat.slug}`);
  }

  // Glossary index + individual terms
  urls.push("/glossary");
  for (const term of glossaryTerms) {
    urls.push(`/glossary/${term.slug}`);
  }

  // Cluster A: Industry x Engine — route is /aeo/:industrySlug/:engineSlug
  for (const page of getIndustryEnginePages()) {
    urls.push(`/aeo/${page.industrySlug}/${page.engineSlug}`);
  }

  // Cluster B: Competitors — route is /vs/:slug
  for (const page of getCompetitorPages()) {
    urls.push(`/vs/${page.slug}`);
  }

  // Cluster C: Locations — route is /aeo-agency/:slug
  for (const page of getLocationPages()) {
    urls.push(`/aeo-agency/${page.slug}`);
  }

  // Cluster D: Guides — route is /指南/:slug
  for (const page of getGuidePages()) {
    urls.push(`/指南/${page.slug}`);
  }

  // Cluster E: Use Cases — route is /用途/:slug
  for (const page of getUseCasePages()) {
    urls.push(`/用途/${page.slug}`);
  }

  // Also generate /en/ variants for each URL
  const enUrls = urls.map((u) => (u === "/" ? "/en" : `/en${u}`));
  urls.push(...enUrls);

  return urls;
}

// ── Static file server ─────────────────────────────────────────────────────
// Serves dist/ with SPA fallback (any path without a file extension returns index.html)

function createStaticServer(): http.Server {
  return http.createServer((req, res) => {
    const url = new URL(req.url ?? "/", ORIGIN);
    let filePath = path.join(DIST_DIR, decodeURIComponent(url.pathname));

    // If the path points to a directory, try index.html inside it
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, "index.html");
    }

    // If no file found and no extension, SPA fallback to root index.html
    if (!fs.existsSync(filePath)) {
      const ext = path.extname(filePath);
      if (!ext || ext === ".html") {
        filePath = path.join(DIST_DIR, "index.html");
      }
    }

    if (!fs.existsSync(filePath)) {
      res.writeHead(404);
      res.end("Not Found");
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const mimeTypes: Record<string, string> = {
      ".html": "text/html; charset=utf-8",
      ".js": "application/javascript",
      ".css": "text/css",
      ".json": "application/json",
      ".png": "image/png",
      ".jpg": "image/jpeg",
      ".svg": "image/svg+xml",
      ".ico": "image/x-icon",
      ".woff2": "font/woff2",
      ".woff": "font/woff",
      ".ttf": "font/ttf",
    };

    res.writeHead(200, {
      "Content-Type": mimeTypes[ext] ?? "application/octet-stream",
    });
    fs.createReadStream(filePath).pipe(res);
  });
}

// ── Rendering helpers ──────────────────────────────────────────────────────

/**
 * Save rendered HTML for a given path.
 * Creates nested directories as needed (e.g. dist/aeo/lawyers/perplexity/index.html).
 */
function saveHtml(urlPath: string, html: string): void {
  // Normalise: strip trailing slash, ensure leading slash
  const clean = urlPath === "/" ? "/" : urlPath.replace(/\/+$/, "");
  const segments = clean === "/" ? [] : clean.split("/").filter(Boolean);
  const outDir = path.join(DIST_DIR, ...segments);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "index.html"), html, "utf-8");
}

/**
 * Render a single page: navigate, wait for content, capture HTML.
 */
async function renderPage(page: Page, urlPath: string): Promise<void> {
  const fullUrl = `${ORIGIN}${encodeURI(urlPath)}`;

  await page.goto(fullUrl, {
    waitUntil: "networkidle",
    timeout: NAV_TIMEOUT,
  });

  // Wait for React to mount (the #static-fallback div gets replaced by React's render)
  // Also wait a tick for useEffect meta-tag injection to finish
  await page.waitForSelector("#root > :not(#static-fallback)", {
    timeout: NAV_TIMEOUT,
  });
  // Small extra wait for any async useEffect chains (JSON-LD injection, etc.)
  await page.waitForTimeout(300);

  // Capture the full document HTML including <head> (meta tags, JSON-LD)
  const html = await page.content();
  saveHtml(urlPath, html);
}

// ── Worker pool ────────────────────────────────────────────────────────────

async function renderAll(
  browser: Browser,
  urls: string[],
): Promise<{ ok: number; fail: number; errors: string[] }> {
  let ok = 0;
  let fail = 0;
  const errors: string[] = [];
  let idx = 0;

  const total = urls.length;
  const startTime = Date.now();

  async function worker(workerId: number): Promise<void> {
    const context = await browser.newContext({
      // Disable images/fonts for speed
      javaScriptEnabled: true,
    });
    const page = await context.newPage();
    // Block unnecessary resources for speed
    await page.route("**/*.{png,jpg,jpeg,gif,svg,ico,woff,woff2,ttf,eot}", (route) =>
      route.abort(),
    );
    // Block external requests (fonts.googleapis, analytics, etc.)
    await page.route("**", (route) => {
      const url = route.request().url();
      if (url.startsWith(ORIGIN)) {
        route.continue();
      } else {
        route.abort();
      }
    });

    while (true) {
      const currentIdx = idx++;
      if (currentIdx >= urls.length) break;

      const urlPath = urls[currentIdx];
      try {
        await renderPage(page, urlPath);
        ok++;
      } catch (err) {
        fail++;
        const msg = `[Worker ${workerId}] FAILED ${urlPath}: ${err instanceof Error ? err.message : String(err)}`;
        errors.push(msg);
        console.error(msg);
      }

      // Progress log every 50 pages
      const done = ok + fail;
      if (done % 50 === 0 || done === total) {
        const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
        const rate = (done / ((Date.now() - startTime) / 1000)).toFixed(1);
        console.log(
          `  Progress: ${done}/${total} (${((done / total) * 100).toFixed(1)}%) — ${elapsed}s elapsed — ${rate} pages/s`,
        );
      }
    }

    await page.close();
    await context.close();
  }

  const workers = Array.from({ length: CONCURRENCY }, (_, i) => worker(i));
  await Promise.all(workers);

  return { ok, fail, errors };
}

// ── Main ───────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  // Preflight check
  if (!fs.existsSync(path.join(DIST_DIR, "index.html"))) {
    console.error(
      "ERROR: dist/index.html not found. Run `npm run build` first.",
    );
    process.exit(1);
  }

  console.log("Collecting URLs...");
  const urls = collectUrls();
  console.log(`Found ${urls.length} URLs to prerender.\n`);

  // Breakdown
  const breakdown: Record<string, number> = {};
  for (const u of urls) {
    const prefix = u.startsWith("/en") ? "/en/..." : u.split("/").slice(0, 2).join("/") || "/";
    breakdown[prefix] = (breakdown[prefix] || 0) + 1;
  }
  console.log("URL breakdown:");
  for (const [prefix, count] of Object.entries(breakdown).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${prefix}: ${count}`);
  }
  console.log();

  // Start static server
  const server = createStaticServer();
  await new Promise<void>((resolve) => server.listen(PORT, resolve));
  console.log(`Static server listening on ${ORIGIN}`);

  // Launch browser
  console.log("Launching Playwright Chromium...");
  const browser = await chromium.launch({
    args: ["--disable-gpu", "--no-sandbox", "--disable-dev-shm-usage"],
  });

  const startTime = Date.now();
  console.log(`Prerendering ${urls.length} pages with ${CONCURRENCY} workers...\n`);

  const { ok, fail, errors } = await renderAll(browser, urls);

  const totalTime = ((Date.now() - startTime) / 1000).toFixed(1);

  // Cleanup
  await browser.close();
  server.close();

  // Copy the original index.html as 200.html for Cloudflare Pages SPA fallback
  const fallbackDest = path.join(DIST_DIR, "200.html");
  if (!fs.existsSync(fallbackDest)) {
    // The root index.html has been overwritten by the prerendered homepage.
    // We already wrote the prerendered version, but for SPA fallback on unknown
    // routes, Cloudflare Pages looks for 200.html. We want the SPA shell for that.
    // Since the prerendered homepage IS a full SPA shell (with React hydrating on top),
    // using it as 200.html is fine.
    fs.copyFileSync(path.join(DIST_DIR, "index.html"), fallbackDest);
    console.log("Copied prerendered index.html -> 200.html (SPA fallback)");
  }

  // Summary
  console.log("\n========================================");
  console.log(`Prerender complete in ${totalTime}s`);
  console.log(`  Success: ${ok}`);
  console.log(`  Failed:  ${fail}`);
  console.log(`  Rate:    ${(ok / (parseFloat(totalTime) || 1)).toFixed(1)} pages/s`);
  console.log("========================================");

  if (errors.length > 0) {
    console.log(`\nFailed pages (${errors.length}):`);
    for (const e of errors) {
      console.log(`  ${e}`);
    }
  }

  if (fail > 0) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
