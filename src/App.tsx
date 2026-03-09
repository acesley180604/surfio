import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./i18n/context";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import IndustryPage from "./pages/IndustryPage";
import PlatformPage from "./pages/PlatformPage";
import GlossaryPage from "./pages/GlossaryPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/aeo/:slug" element={<IndustryPage />} />
      <Route path="/platform/:slug" element={<PlatformPage />} />
      <Route path="/glossary" element={<GlossaryPage />} />
      <Route path="/glossary/:slug" element={<GlossaryPage />} />
      {/* English routes */}
      <Route path="/en" element={<HomePage />} />
      <Route path="/en/aeo/:slug" element={<IndustryPage />} />
      <Route path="/en/platform/:slug" element={<PlatformPage />} />
      <Route path="/en/glossary" element={<GlossaryPage />} />
      <Route path="/en/glossary/:slug" element={<GlossaryPage />} />
    </Routes>
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
