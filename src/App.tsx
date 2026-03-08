import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import IndustryPage from "./pages/IndustryPage";
import PlatformPage from "./pages/PlatformPage";
import GlossaryPage from "./pages/GlossaryPage";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white text-text-body font-sans">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/aeo/:slug" element={<IndustryPage />} />
            <Route path="/platform/:slug" element={<PlatformPage />} />
            <Route path="/glossary" element={<GlossaryPage />} />
            <Route path="/glossary/:slug" element={<GlossaryPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
