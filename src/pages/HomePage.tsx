import { useEffect } from "react";
import Hero from "../components/Hero";
import ProblemSection from "../components/ProblemSection";
import Experts from "../components/Experts";
import Playbook from "../components/Playbook";
import Planning from "../components/Planning";
import Services from "../components/Services";
import CaseStudies from "../components/CaseStudies";
import SimpleSteps from "../components/SimpleSteps";
import Comparison from "../components/Comparison";
import OurProcess from "../components/OurProcess";
import FAQ from "../components/FAQ";

export default function HomePage() {
  useEffect(() => {
    document.title = "SurfIO — AEO Agency | 令 AI 搜尋主動推薦你";
    document.querySelector('meta[name="description"]')?.setAttribute(
      "content",
      "SurfIO 係香港領先嘅 AEO Agency，幫企業喺 ChatGPT、Perplexity、Google AI Overview 被推薦。HKSTP 培育、Techathon+ 支持。"
    );
  }, []);

  return (
    <>
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
    </>
  );
}
