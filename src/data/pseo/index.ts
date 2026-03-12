// pSEO Data Index — re-exports all cluster data with lazy getters
export { getIndustryEnginePages } from "./industry-engine";
export { getCompetitorPages } from "./competitors";
export { getLocationPages } from "./locations";
export { getGuidePages } from "./guides";
export { getUseCasePages } from "./use-cases";

export type {
  IndustryEngineData,
  CompetitorData,
  LocationData,
  GuideData,
  UseCaseData,
  LayoutType,
} from "./types";

export {
  ALL_INDUSTRIES,
  AI_ENGINES,
  HK_DISTRICTS,
  GBA_CITIES,
  OVERSEAS_CITIES,
  GUIDE_TOPICS,
  USE_CASES,
  ALL_COMPETITORS,
} from "./types";
