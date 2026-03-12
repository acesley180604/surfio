import { useEffect } from "react";
import Hero from "../components/Hero";
import SocialProof from "../components/SocialProof";
import ProblemSection from "../components/ProblemSection";
import Experts from "../components/Experts";
import Playbook from "../components/Playbook";
import Services from "../components/Services";
import Pricing from "../components/Pricing";
import GuaranteeBanner from "../components/GuaranteeBanner";
import CaseStudies from "../components/CaseStudies";
import Founder from "../components/Founder";
import Comparison from "../components/Comparison";
import OurProcess from "../components/OurProcess";
import EmailCapture from "../components/EmailCapture";
import FAQ from "../components/FAQ";
import ExitIntent from "../components/ExitIntent";
import { useLanguage } from "../i18n/context";
import { t } from "../i18n/translations";
import {
  organizationSchema,
  founderSchema,
  websiteSchema,
  serviceSchema,
  homepageFaqSchema,
  howToSchema,
  industryListSchema,
  platformListSchema,
  injectMultipleJsonLd,
  cleanupJsonLd,
  setMetaTags,
  setCanonical,
  SITE,
} from "../lib/schema";

export default function HomePage() {
  const lang = useLanguage();

  useEffect(() => {
    document.title = t("home.title", lang) as string;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", t("home.description", lang) as string);

    setCanonical(lang === "en" ? `${SITE.url}/en` : `${SITE.url}/`);

    setMetaTags({
      "og:type": "website",
      "og:url": lang === "en" ? `${SITE.url}/en` : `${SITE.url}/`,
      "og:title": t("home.ogTitle", lang) as string,
      "og:description": t("home.ogDescription", lang) as string,
      "og:image": `${SITE.url}/logos/surfio-icon.png`,
      "og:site_name": "SurfIO",
      "og:locale": lang === "en" ? "en" : "zh_HK",
    });

    injectMultipleJsonLd([
      { id: "ld-org", data: organizationSchema() },
      { id: "ld-founder", data: founderSchema() },
      { id: "ld-website", data: websiteSchema() },
      { id: "ld-service", data: serviceSchema() },
      { id: "ld-faq", data: homepageFaqSchema() },
      { id: "ld-howto", data: howToSchema() },
      { id: "ld-industry-list", data: industryListSchema() },
      { id: "ld-platform-list", data: platformListSchema() },
    ]);

    return () => {
      cleanupJsonLd([
        "ld-org", "ld-founder", "ld-website", "ld-service", "ld-faq",
        "ld-howto", "ld-industry-list", "ld-platform-list",
      ]);
    };
  }, [lang]);

  return (
    <>
      <Hero />
      <SocialProof />
      <ProblemSection />
      <Experts />
      <Playbook />
      <Services />
      <Pricing />
      <GuaranteeBanner />
      <CaseStudies />
      <Founder />
      <Comparison />
      <OurProcess />
      <EmailCapture />
      <FAQ />
      <ExitIntent />
    </>
  );
}
