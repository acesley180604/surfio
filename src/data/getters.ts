import type { Lang } from "../i18n/context";
import { industries } from "./industries";
import { industriesEn } from "./industries.en";
import { platforms } from "./platforms";
import { platformsEn } from "./platforms.en";
import { glossaryTerms } from "./glossary";
import { glossaryTermsEn } from "./glossary.en";

export function getIndustries(lang: Lang) {
  return lang === "en" ? industriesEn : industries;
}

export function getPlatforms(lang: Lang) {
  return lang === "en" ? platformsEn : platforms;
}

export function getGlossaryTerms(lang: Lang) {
  return lang === "en" ? glossaryTermsEn : glossaryTerms;
}

// pSEO data getters — lazy loaded
export { getIndustryEnginePages } from "./pseo/industry-engine";
export { getCompetitorPages } from "./pseo/competitors";
export { getLocationPages } from "./pseo/locations";
export { getGuidePages } from "./pseo/guides";
export { getUseCasePages } from "./pseo/use-cases";
