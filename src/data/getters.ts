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
