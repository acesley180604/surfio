import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { LanguageProvider } from "./i18n/context";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import IndustryPage from "./pages/IndustryPage";
import PlatformPage from "./pages/PlatformPage";
import GlossaryPage from "./pages/GlossaryPage";
import {
  IndustryEngineHub,
  CompetitorHub,
  LocationHub,
  GuideHub,
  UseCaseHub,
} from "./pages/HubPages";

const AeoToolPage = lazy(() => import("./pages/AeoToolPage"));

// pSEO pages — lazy loaded for code splitting
const IndustryEnginePage = lazy(() => import("./pages/IndustryEnginePage"));
const CompetitorPage = lazy(() => import("./pages/CompetitorPage"));
const LocationPage = lazy(() => import("./pages/LocationPage"));
const GuidePage = lazy(() => import("./pages/GuidePage"));
const UseCasePage = lazy(() => import("./pages/UseCasePage"));

// New pSEO clusters F-K
const GlossaryTermPage = lazy(() => import("./pages/GlossaryTermPage"));
const IntegrationPage = lazy(() => import("./pages/IntegrationPage"));
const StatisticsPage = lazy(() => import("./pages/StatisticsPage"));
const PricingPage = lazy(() => import("./pages/PricingPage"));
const ChecklistPage = lazy(() => import("./pages/ChecklistPage"));
const BestPage = lazy(() => import("./pages/BestPage"));

function PageLoader() {
  return (
    <div className="pt-[120px] pb-20 text-center">
      <div className="w-8 h-8 border-2 border-[#7C3AED] border-t-transparent rounded-full animate-spin mx-auto" />
    </div>
  );
}

function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/aeo/:slug" element={<IndustryPage />} />
        <Route path="/platform/:slug" element={<PlatformPage />} />
        <Route path="/glossary" element={<GlossaryPage />} />
        <Route path="/glossary/:slug" element={<GlossaryPage />} />

        {/* Standalone tool pages */}
        <Route path="/tools/aeo-score" element={<AeoToolPage />} />

        {/* pSEO Hub/Index pages — eagerly loaded for crawling */}
        <Route path="/aeo/industries" element={<IndustryEngineHub />} />
        <Route path="/vs" element={<CompetitorHub />} />
        <Route path="/aeo-agency" element={<LocationHub />} />
        <Route path="/指南" element={<GuideHub />} />
        <Route path="/用途" element={<UseCaseHub />} />

        {/* pSEO: Cluster A — Industry × Engine */}
        <Route path="/aeo/:industrySlug/:engineSlug" element={<IndustryEnginePage />} />

        {/* pSEO: Cluster B — Competitor Comparisons */}
        <Route path="/vs/:slug" element={<CompetitorPage />} />

        {/* pSEO: Cluster C — Location */}
        <Route path="/aeo-agency/:slug" element={<LocationPage />} />

        {/* pSEO: Cluster D — Educational Guides */}
        <Route path="/指南/:slug" element={<GuidePage />} />

        {/* pSEO: Cluster E — Use Cases */}
        <Route path="/用途/:slug" element={<UseCasePage />} />

        {/* pSEO: Cluster H — Statistics */}
        <Route path="/statistics/:slug" element={<StatisticsPage />} />

        {/* pSEO: Cluster I — Pricing by Location */}
        <Route path="/pricing/:slug" element={<PricingPage />} />

        {/* pSEO: Cluster J — AEO Checklists */}
        <Route path="/checklist/:slug" element={<ChecklistPage />} />

        {/* pSEO: Cluster F — Glossary Terms */}
        <Route path="/aeo-glossary/:slug" element={<GlossaryTermPage />} />

        {/* pSEO: Cluster G — Integrations */}
        <Route path="/integrations/:slug" element={<IntegrationPage />} />

        {/* pSEO: Cluster K — Best Rankings */}
        <Route path="/best/:slug" element={<BestPage />} />

        {/* English routes */}
        <Route path="/en" element={<HomePage />} />
        <Route path="/en/aeo/:slug" element={<IndustryPage />} />
        <Route path="/en/platform/:slug" element={<PlatformPage />} />
        <Route path="/en/glossary" element={<GlossaryPage />} />
        <Route path="/en/glossary/:slug" element={<GlossaryPage />} />
        <Route path="/en/tools/aeo-score" element={<AeoToolPage />} />
        {/* English hub pages */}
        <Route path="/en/aeo/industries" element={<IndustryEngineHub />} />
        <Route path="/en/vs" element={<CompetitorHub />} />
        <Route path="/en/aeo-agency" element={<LocationHub />} />
        <Route path="/en/指南" element={<GuideHub />} />
        <Route path="/en/用途" element={<UseCaseHub />} />

        <Route path="/en/aeo/:industrySlug/:engineSlug" element={<IndustryEnginePage />} />
        <Route path="/en/vs/:slug" element={<CompetitorPage />} />
        <Route path="/en/aeo-agency/:slug" element={<LocationPage />} />
        <Route path="/en/指南/:slug" element={<GuidePage />} />
        <Route path="/en/用途/:slug" element={<UseCasePage />} />

        <Route path="/en/statistics/:slug" element={<StatisticsPage />} />
        <Route path="/en/pricing/:slug" element={<PricingPage />} />
        <Route path="/en/checklist/:slug" element={<ChecklistPage />} />
        <Route path="/en/aeo-glossary/:slug" element={<GlossaryTermPage />} />
        <Route path="/en/integrations/:slug" element={<IntegrationPage />} />
        <Route path="/en/best/:slug" element={<BestPage />} />
      </Routes>
    </Suspense>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <div className="min-h-screen bg-white text-text-body font-sans">
          <Navbar />
          <main>
            <AppRoutes />
          </main>
          <Footer />
        </div>
      </LanguageProvider>
    </BrowserRouter>
  );
}
