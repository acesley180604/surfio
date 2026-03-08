import { useEffect } from "react";
import Hero from "../components/Hero";
import ProblemSection from "../components/ProblemSection";
import Experts from "../components/Experts";
import Playbook from "../components/Playbook";
import Planning from "../components/Planning";
import Services from "../components/Services";
import CaseStudies from "../components/CaseStudies";
import Founder from "../components/Founder";
import SimpleSteps from "../components/SimpleSteps";
import Comparison from "../components/Comparison";
import OurProcess from "../components/OurProcess";
import FAQ from "../components/FAQ";
import {
  organizationSchema,
  founderSchema,
  websiteSchema,
  serviceSchema,
  homepageFaqSchema,
  injectMultipleJsonLd,
  cleanupJsonLd,
  setMetaTags,
  setCanonical,
  SITE,
} from "../lib/schema";

export default function HomePage() {
  useEffect(() => {
    document.title = "SurfIO — AEO Agency | 令 AI 搜尋主動推薦你";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        "SurfIO 係香港領先嘅 AEO Agency，幫企業喺 ChatGPT、Perplexity、Google AI Overview 被推薦。HKSTP 培育、Techathon+ 支持。30 日內出現喺 AI 搜尋結果。"
      );

    // Set canonical
    setCanonical(`${SITE.url}/`);

    // Set OG tags
    setMetaTags({
      "og:type": "website",
      "og:url": `${SITE.url}/`,
      "og:title": "SurfIO — AEO Agency | 令 AI 搜尋主動推薦你",
      "og:description":
        "SurfIO 係香港領先嘅 AEO Agency，幫企業喺 ChatGPT、Perplexity、Google AI Overview 被推薦。HKSTP 培育、Techathon+ 支持。",
      "og:image": `${SITE.url}/logos/surfio-icon.png`,
      "og:site_name": "SurfIO",
      "og:locale": "zh_HK",
    });

    // Inject JSON-LD schemas
    injectMultipleJsonLd([
      { id: "ld-org", data: organizationSchema() },
      { id: "ld-founder", data: founderSchema() },
      { id: "ld-website", data: websiteSchema() },
      { id: "ld-service", data: serviceSchema() },
      { id: "ld-faq", data: homepageFaqSchema() },
    ]);

    return () => {
      cleanupJsonLd(["ld-org", "ld-founder", "ld-website", "ld-service", "ld-faq"]);
    };
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
      <Founder />
      <SimpleSteps />
      <Comparison />
      <OurProcess />
      <FAQ />
    </>
  );
}
