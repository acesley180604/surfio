import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProblemSection from "./components/ProblemSection";
import Experts from "./components/Experts";
import Playbook from "./components/Playbook";
import Planning from "./components/Planning";
import Services from "./components/Services";
import CaseStudies from "./components/CaseStudies";
import SimpleSteps from "./components/SimpleSteps";

import Comparison from "./components/Comparison";
import OurProcess from "./components/OurProcess";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-white text-text-body font-sans">
      <Navbar />
      <Hero />
      <ProblemSection />
      <Experts />
      <Playbook />
      <Planning />
      <Services />
      <CaseStudies />
      <SimpleSteps />

      <Comparison />
      <OurProcess />
      <FAQ />
      <Footer />
    </div>
  );
}
