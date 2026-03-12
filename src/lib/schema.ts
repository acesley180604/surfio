// JSON-LD Schema Generators for AEO
// All schema follows Schema.org specifications in JSON-LD format

const SITE_URL = "https://surfio.net";
const CALENDLY = "https://calendly.com/acesley180604/aeo-service-free-audit-surfio";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#organization`,
    name: "SurfIO",
    alternateName: "SurfIO AEO Agency",
    url: SITE_URL,
    logo: `${SITE_URL}/logos/surfio-icon.png`,
    image: `${SITE_URL}/logos/surfio-icon.png`,
    description:
      "SurfIO 係香港領先嘅 AEO Agency，幫企業喺 ChatGPT、Perplexity、Google AI Overview 被推薦。HKSTP 培育、Techathon+ 支持。",
    foundingDate: "2024",
    founder: {
      "@type": "Person",
      "@id": `${SITE_URL}/#founder`,
      name: "Acesley Chan",
    },
    areaServed: {
      "@type": "Place",
      name: "Hong Kong",
    },
    knowsAbout: [
      "Answer Engine Optimization",
      "AEO",
      "Generative Engine Optimization",
      "GEO",
      "AI Search Optimization",
      "Schema Markup",
      "Structured Data",
      "LLM Optimization",
      "ChatGPT Optimization",
      "Google AI Overview Optimization",
      "Perplexity Optimization",
    ],
    sameAs: [
      "https://github.com/acesley180604",
      "https://www.linkedin.com/in/sin-wai-acesley-chan-b3a4911b3/",
      "https://www.crunchbase.com/organization/surfio",
      "https://angel.co/company/surfio-aeo",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      url: CALENDLY,
      availableLanguage: ["zh-HK", "en"],
    },
    award: [
      "HKSTP Ideation Programme (2x)",
      "Techathon+ Award Winner",
    ],
    potentialAction: [
      {
        "@type": "ReserveAction",
        name: "免費 AI 搜尋能見度審計",
        target: {
          "@type": "EntryPoint",
          urlTemplate: CALENDLY,
          actionPlatform: [
            "http://schema.org/DesktopWebPlatform",
            "http://schema.org/MobileWebPlatform",
          ],
        },
        result: {
          "@type": "Reservation",
          name: "AEO 審計預約",
        },
      },
      {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/glossary/{search_term}`,
        },
        "query-input": "required name=search_term",
      },
    ],
    subjectOf: [
      {
        "@type": "WebPage",
        url: `${SITE_URL}/`,
        name: "SurfIO — AEO Agency | 令 AI 搜尋主動推薦你",
      },
    ],
  };
}

export function founderSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#founder`,
    name: "Acesley Chan",
    jobTitle: "Founder & CEO",
    worksFor: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "SurfIO",
    },
    knowsAbout: [
      "Answer Engine Optimization",
      "AI Search Optimization",
      "Digital Marketing",
      "Generative Engine Optimization",
      "Schema Markup",
      "Content Strategy",
    ],
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "Hong Kong Polytechnic University",
        alternateName: "HK PolyU",
      },
    ],
    award: [
      "HKSTP Ideation Programme (2x)",
      "Techathon+ Award Winner",
    ],
    description:
      "Acesley Chan 係 SurfIO 嘅創辦人，專注於 AI 搜尋優化（AEO）同生成式引擎優化（GEO）。兩次獲選 HKSTP Ideation Programme，Techathon+ 得獎者。創立嘅產品 GymsLock 累積超過 5,000 用戶，3M+ 自然曝光。曾喺香港理工大學同科技大學教授超過 400 名學生。",
    sameAs: [
      "https://github.com/acesley180604",
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "SurfIO",
    alternateName: "SurfIO AEO Agency",
    url: SITE_URL,
    description:
      "香港領先嘅 AEO Agency，幫企業喺 AI 搜尋引擎被推薦",
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
    },
    inLanguage: "zh-HK",
  };
}

export function serviceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/#service`,
    name: "答案引擎優化 (AEO) 服務",
    alternateName: "Answer Engine Optimization Service",
    description:
      "SurfIO 提供全方位嘅 AEO 服務，包括 AEO 審計、內容優化、Schema 標記、實體建設、平台專屬優化同持續監測，幫企業喺 ChatGPT、Google AI Overview、Perplexity 被推薦。",
    provider: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
    },
    serviceType: "Answer Engine Optimization",
    areaServed: {
      "@type": "Place",
      name: "Hong Kong",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "AEO 服務",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "免費 AI 搜尋能見度審計",
            description: "全面嘅 AI 搜尋能見度分析，涵蓋 ChatGPT、Google AI Overview、Perplexity 等平台",
            url: CALENDLY,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AEO 準備度審計同增長路線圖",
            description: "深度分析你嘅網站 AI 搜尋準備度，並制定增長策略",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "多平台答案引擎定位",
            description: "針對 Google AI Overview、ChatGPT、Perplexity、Claude、Copilot 嘅全方位定位策略",
          },
        },
      ],
    },
  };
}

export function homepageFaqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "咩係答案引擎優化 (AEO)？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "答案引擎優化係優化你嘅內容嘅過程，令搜尋引擎同 AI 平台（例如 Google、Bing、ChatGPT 同 Perplexity）揀你嘅內容作為用戶問題嘅權威答案。",
        },
      },
      {
        "@type": "Question",
        name: "AEO 同 SEO 有咩分別？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "SEO 專注於喺傳統搜尋結果排名，而 AEO 專門針對 AI 驅動嘅答案引擎同精選摘要。AEO 優化嘅係 AI 系統點樣理解、引用同推薦你嘅內容。",
        },
      },
      {
        "@type": "Question",
        name: "點解 AEO 而家咁重要？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "AI 搜尋正迅速取代傳統搜尋。越來越多用戶直接從 ChatGPT、Google AI Overview 同 Perplexity 獲取答案，而唔係點擊去網站。如果你未針對呢啲平台優化，對於越來越多嘅受眾嚟講你就係隱形嘅。",
        },
      },
      {
        "@type": "Question",
        name: "AEO 針對邊啲平台？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "我哋為所有主要 AI 平台優化，包括 ChatGPT、Google AI Overview、Perplexity、Claude、Bing Chat、同語音助手如 Siri 同 Alexa。",
        },
      },
      {
        "@type": "Question",
        name: "你哋嘅 AEO 服務包啲咩？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "我哋嘅服務包括 AEO 審計、內容優化、Schema 標記、實體建設、平台專屬優化、連結建設、同持續監測同報告。",
        },
      },
      {
        "@type": "Question",
        name: "幾耐先見到效果？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "大部分客戶喺 30-60 日內開始見到 AI 能見度嘅改善。完整效果通常喺 90 日內呈現，取決於你嘅行業同競爭程度。",
        },
      },
      {
        "@type": "Question",
        name: "AEO 同 GEO 有咩分別？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "AEO（答案引擎優化）專注於出現喺 AI 生成嘅答案中。GEO（生成引擎優化）係一個更廣泛嘅術語，涵蓋為所有生成式 AI 系統優化。我哋兩者都做。",
        },
      },
    ],
  };
}

export function industryPageSchema(data: {
  slug: string;
  name: string;
  heroTitle: string;
  heroSubtitle: string;
  metaTitle: string;
  metaDescription: string;
  faqs: [string, string][];
}) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${SITE_URL}/aeo/${data.slug}`,
      name: data.metaTitle,
      description: data.metaDescription,
      url: `${SITE_URL}/aeo/${data.slug}`,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: {
        "@type": "Service",
        name: `${data.name} AEO 優化`,
        description: data.heroSubtitle,
        provider: { "@id": `${SITE_URL}/#organization` },
      },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "首頁", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "行業", item: `${SITE_URL}/#industries` },
          { "@type": "ListItem", position: 3, name: data.name },
        ],
      },
      datePublished: "2025-01-15",
      dateModified: "2026-03-08",
      inLanguage: "zh-HK",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: data.faqs.map(([q, a]) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
  ];
}

export function platformPageSchema(data: {
  slug: string;
  name: string;
  heroTitle: string;
  howItWorks: string;
  metaTitle: string;
  metaDescription: string;
  faqs: [string, string][];
}) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${SITE_URL}/platform/${data.slug}`,
      name: data.metaTitle,
      description: data.metaDescription,
      url: `${SITE_URL}/platform/${data.slug}`,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: {
        "@type": "Thing",
        name: `${data.name} 搜尋優化`,
        description: data.howItWorks,
      },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "首頁", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "平台", item: `${SITE_URL}/#platforms` },
          { "@type": "ListItem", position: 3, name: data.name },
        ],
      },
      datePublished: "2025-01-15",
      dateModified: "2026-03-08",
      inLanguage: "zh-HK",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: data.faqs.map(([q, a]) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
  ];
}

export function glossaryTermSchema(data: {
  slug: string;
  term: string;
  definition: string;
  fullExplanation: string;
  metaTitle: string;
  metaDescription: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    "@id": `${SITE_URL}/glossary/${data.slug}`,
    name: data.term,
    description: data.definition,
    url: `${SITE_URL}/glossary/${data.slug}`,
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      name: "SurfIO AEO 術語表",
      url: `${SITE_URL}/glossary`,
    },
  };
}

export function glossaryArticleSchema(data: {
  slug: string;
  term: string;
  definition: string;
  fullExplanation: string;
  metaTitle: string;
  metaDescription: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.metaTitle,
    description: data.metaDescription,
    url: `${SITE_URL}/glossary/${data.slug}`,
    author: { "@id": `${SITE_URL}/#founder` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    datePublished: "2025-01-15",
    dateModified: "2026-03-08",
    inLanguage: "zh-HK",
    mainEntityOfPage: `${SITE_URL}/glossary/${data.slug}`,
    about: {
      "@type": "DefinedTerm",
      name: data.term,
      description: data.definition,
    },
  };
}

// Helper to inject JSON-LD into the document head
export function injectJsonLd(id: string, data: unknown) {
  // Remove existing script with same id
  const existing = document.getElementById(id);
  if (existing) existing.remove();

  const script = document.createElement("script");
  script.id = id;
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

// Helper to inject multiple JSON-LD scripts
export function injectMultipleJsonLd(schemas: { id: string; data: unknown }[]) {
  schemas.forEach(({ id, data }) => injectJsonLd(id, data));
}

// Helper to clean up JSON-LD scripts (for page navigation)
export function cleanupJsonLd(ids: string[]) {
  ids.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.remove();
  });
}

// Helper to set OG meta tags + mirror to Twitter cards
export function setMetaTags(tags: Record<string, string>) {
  // Map OG to Twitter equivalents
  const twitterMap: Record<string, string> = {
    "og:title": "twitter:title",
    "og:description": "twitter:description",
    "og:image": "twitter:image",
    "og:url": "twitter:url",
  };

  Object.entries(tags).forEach(([property, content]) => {
    let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("property", property);
      document.head.appendChild(meta);
    }
    meta.content = content;

    // Mirror to Twitter card
    const twitterProp = twitterMap[property];
    if (twitterProp) {
      let tMeta = document.querySelector(`meta[name="${twitterProp}"]`) as HTMLMetaElement | null;
      if (!tMeta) {
        tMeta = document.createElement("meta");
        tMeta.setAttribute("name", twitterProp);
        document.head.appendChild(tMeta);
      }
      tMeta.content = content;
    }
  });

  // Ensure twitter:card is set
  let cardMeta = document.querySelector('meta[name="twitter:card"]') as HTMLMetaElement | null;
  if (!cardMeta) {
    cardMeta = document.createElement("meta");
    cardMeta.setAttribute("name", "twitter:card");
    document.head.appendChild(cardMeta);
  }
  cardMeta.content = "summary_large_image";
}

// Helper to set standard meta tags (name attribute)
export function setNameMeta(tags: Record<string, string>) {
  Object.entries(tags).forEach(([name, content]) => {
    let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", name);
      document.head.appendChild(meta);
    }
    meta.content = content;
  });
}

// Helper to set canonical URL
export function setCanonical(url: string) {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }
  link.href = url;
}

// HowTo schema for the OurProcess section
export function howToSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "點樣透過 AEO 令你嘅品牌喺 AI 搜尋被推薦",
    description:
      "SurfIO 嘅四步 AEO 流程：從深度研究到持續追蹤，幫你嘅品牌喺 ChatGPT、Google AI Overview、Perplexity 被推薦。",
    totalTime: "P90D",
    estimatedCost: {
      "@type": "MonetaryAmount",
      currency: "HKD",
      value: "0",
      name: "免費 AI 搜尋能見度審計",
    },
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "深度研究同策略",
        text: "透過詳細問卷、客戶評價、競爭對手分析同歷史表現洞察，為你制定針對性、高轉化嘅 AEO 策略。BrandBrain 系統確保每個活動都經過微調。",
        url: `${SITE_URL}/#process`,
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "SEO + AI 優化內容",
        text: "創作旨在喺搜尋引擎排名同被 AI 答案引用嘅內容。包括關鍵字豐富、以問題為焦點嘅文章、優化標題同結構化格式。結合人類專業知識同 AI 洞察。",
        url: `${SITE_URL}/#process`,
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "技術 AEO",
        text: "添加 Schema、修改內容結構、撰寫 FAQ 同優化精選摘要。實施結構化數據增強、內部連結策略同索引改善，加強實體識別同知識圖譜存在感。",
        url: `${SITE_URL}/#process`,
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "連結建設",
        text: "採用白帽連結建設策略，提升你網站嘅權威性同排名。包括客座發文、失效連結建設同數碼 PR 策略，專注於來自相關、高域名權威網站嘅連結。",
        url: `${SITE_URL}/#process`,
      },
      {
        "@type": "HowToStep",
        position: 5,
        name: "追蹤同分析",
        text: "監測你喺搜尋引擎同 AI 平台嘅能見度，追蹤關鍵字排名、精選摘要同 AI 答案位置。詳細分析揭示邊啲內容驅動流量、轉化同 LLM 引用。",
        url: `${SITE_URL}/#process`,
      },
    ],
  };
}

// ItemList schema for industry pages
export function industryListSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "SurfIO 行業 AEO 方案",
    description: "SurfIO 為唔同行業提供嘅專業 AEO 優化方案",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "金融服務 AEO", url: `${SITE_URL}/aeo/financial-services` },
      { "@type": "ListItem", position: 2, name: "會計師事務所 AEO", url: `${SITE_URL}/aeo/accounting-firms` },
      { "@type": "ListItem", position: 3, name: "B2B 軟件 AEO", url: `${SITE_URL}/aeo/b2b-software` },
      { "@type": "ListItem", position: 4, name: "法律服務 AEO", url: `${SITE_URL}/aeo/legal-services` },
      { "@type": "ListItem", position: 5, name: "醫療服務 AEO", url: `${SITE_URL}/aeo/healthcare` },
      { "@type": "ListItem", position: 6, name: "電商 AEO", url: `${SITE_URL}/aeo/ecommerce` },
      { "@type": "ListItem", position: 7, name: "教育科技 AEO", url: `${SITE_URL}/aeo/edtech` },
      { "@type": "ListItem", position: 8, name: "初創企業 AEO", url: `${SITE_URL}/aeo/startups` },
    ],
  };
}

// Platform list schema
export function platformListSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "AI 平台優化指南",
    description: "SurfIO 為各大 AI 搜尋平台提供嘅優化指南",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ChatGPT 搜尋優化", url: `${SITE_URL}/platform/chatgpt` },
      { "@type": "ListItem", position: 2, name: "Google AI Overview 優化", url: `${SITE_URL}/platform/google-ai-overview` },
      { "@type": "ListItem", position: 3, name: "Perplexity 搜尋優化", url: `${SITE_URL}/platform/perplexity` },
      { "@type": "ListItem", position: 4, name: "Claude AI 優化", url: `${SITE_URL}/platform/claude` },
      { "@type": "ListItem", position: 5, name: "Bing Chat / Copilot 優化", url: `${SITE_URL}/platform/bing-chat` },
    ],
  };
}

// --- pSEO Schema Generators ---

export function industryEnginePageSchema(data: {
  slug: string;
  industryName: string;
  engineName: string;
  heroTitle: string;
  heroSubtitle: string;
  metaTitle: string;
  metaDescription: string;
  faqs: [string, string][];
}) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${SITE_URL}/aeo/${data.slug}`,
      name: data.metaTitle,
      description: data.metaDescription,
      url: `${SITE_URL}/aeo/${data.slug}`,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: {
        "@type": "Service",
        name: `${data.industryName} ${data.engineName} AEO 優化`,
        description: data.heroSubtitle,
        provider: { "@id": `${SITE_URL}/#organization` },
      },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "首頁", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "行業", item: `${SITE_URL}/#industries` },
          { "@type": "ListItem", position: 3, name: data.industryName, item: `${SITE_URL}/aeo/${data.slug.split("-").slice(0, -1).join("-")}` },
          { "@type": "ListItem", position: 4, name: data.engineName },
        ],
      },
      datePublished: "2025-01-15",
      dateModified: "2026-03-12",
      inLanguage: "zh-HK",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: data.faqs.map(([q, a]) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
  ];
}

export function competitorPageSchema(data: {
  slug: string;
  competitorName: string;
  heroTitle: string;
  metaTitle: string;
  metaDescription: string;
  faqs: [string, string][];
}) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${SITE_URL}/vs/${data.slug}`,
      name: data.metaTitle,
      description: data.metaDescription,
      url: `${SITE_URL}/vs/${data.slug}`,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: {
        "@type": "Thing",
        name: `SurfIO vs ${data.competitorName}`,
        description: data.metaDescription,
      },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "首頁", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "比較" },
          { "@type": "ListItem", position: 3, name: data.competitorName },
        ],
      },
      datePublished: "2025-01-15",
      dateModified: "2026-03-12",
      inLanguage: "zh-HK",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: data.faqs.map(([q, a]) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
  ];
}

export function locationPageSchema(data: {
  slug: string;
  locationName: string;
  heroTitle: string;
  metaTitle: string;
  metaDescription: string;
  faqs: [string, string][];
}) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${SITE_URL}/aeo-agency/${data.slug}`,
      name: data.metaTitle,
      description: data.metaDescription,
      url: `${SITE_URL}/aeo-agency/${data.slug}`,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: {
        "@type": "Service",
        name: `${data.locationName} AEO 服務`,
        description: data.metaDescription,
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: {
          "@type": "Place",
          name: data.locationName,
        },
      },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "首頁", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "地區" },
          { "@type": "ListItem", position: 3, name: data.locationName },
        ],
      },
      datePublished: "2025-01-15",
      dateModified: "2026-03-12",
      inLanguage: "zh-HK",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: data.faqs.map(([q, a]) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
  ];
}

export function guidePageSchema(data: {
  slug: string;
  engineName: string;
  topicName: string;
  heroTitle: string;
  metaTitle: string;
  metaDescription: string;
  faqs: [string, string][];
}) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": `${SITE_URL}/指南/${data.slug}`,
      headline: data.metaTitle,
      description: data.metaDescription,
      url: `${SITE_URL}/指南/${data.slug}`,
      author: { "@id": `${SITE_URL}/#founder` },
      publisher: { "@id": `${SITE_URL}/#organization` },
      datePublished: "2025-01-15",
      dateModified: "2026-03-12",
      inLanguage: "zh-HK",
      mainEntityOfPage: `${SITE_URL}/指南/${data.slug}`,
      about: {
        "@type": "Thing",
        name: `${data.engineName} ${data.topicName}`,
      },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "首頁", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "指南" },
          { "@type": "ListItem", position: 3, name: data.engineName },
          { "@type": "ListItem", position: 4, name: data.topicName },
        ],
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: data.faqs.map(([q, a]) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
  ];
}

export function useCasePageSchema(data: {
  slug: string;
  useCaseName: string;
  heroTitle: string;
  metaTitle: string;
  metaDescription: string;
  faqs: [string, string][];
}) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${SITE_URL}/用途/${data.slug}`,
      name: data.metaTitle,
      description: data.metaDescription,
      url: `${SITE_URL}/用途/${data.slug}`,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: {
        "@type": "Service",
        name: `AEO ${data.useCaseName}`,
        description: data.metaDescription,
        provider: { "@id": `${SITE_URL}/#organization` },
      },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "首頁", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "用途" },
          { "@type": "ListItem", position: 3, name: data.useCaseName },
        ],
      },
      datePublished: "2025-01-15",
      dateModified: "2026-03-12",
      inLanguage: "zh-HK",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: data.faqs.map(([q, a]) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
  ];
}

export const SITE = { url: SITE_URL, calendly: CALENDLY };
