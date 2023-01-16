export type LocalLangCode = "en" | "nb" | "nn";

export type LangCode =
  | "ar"
  | "da"
  | "de"
  | "en"
  | "fi"
  | "fr"
  | "it"
  | "la"
  | "nb"
  | "nn"
  | "pl"
  | "ru"
  | "so"
  | "es"
  | "sv"
  | "ti";

export type Samling =
  | "MRT"
  | "MRT2"
  | "UHR"
  | "ARTSDB"
  | "EVERTEBRATER"
  | "NHH"
  | "NOJU"
  | "NOT"
  | "RTT"
  | "SDIR"
  | "TOLKING"
  | "ROMFYS"
  | "TUNDUIA"
  | "KLIMA"
  | "LINGVISTIKK"
  | "ASTRONOMI"
  | "BIOLOGI"
  | "LINGVISTIKK"
  | "CMBIOLOGI"
  | "KJEMI";

export type LabelPredicate = "prefLabel" | "altLabel" | "hiddenLabel";
export type Matching =
  | "full-cs"
  | "full-ci"
  | "startsWith-ci"
  | "endsWith-ci"
  | "subWord-ci"
  | "contains-ci";
export type MatchingNested = Matching | Matching[];

export type SearchQueryResponse = {
  head: { vars: string[] };
  results: { bindings: any[] };
};

export type Domains =
  | "humaniora"
  | "naturvitenskap"
  | "sammfunnsfag"
  | "okonomAdmin";

export const domainNesting = {
  humaniora: { bases: ["LINGVISTIKK"] },
  naturvitenskap: {
    bases: [
      "NOT",
      "MRT",
      "MRT2",
      "SDIR",
      "ARTSDB",
      "EVERTEBRATER",
      "RTT",
      "ROMFYS",
      "KLIMA",
      "ASTRONOMI",
      "BIOLOGI",
      "CMBIOLOGI",
      "KJEMI",
    ],
  },
  sammfunnsfag: { bases: ["NOJU", "TOLKING", "UHR"] },
  okonomAdmin: { bases: ["NHH"] },
};

export const predicateOrder: LabelPredicate[] = [
  "prefLabel",
  "altLabel",
  "hiddenLabel",
];
export const matchingOrder: Matching[] | Matching[][] = [
  "full-cs",
  "full-ci",
  "startsWith-ci",
  "endsWith-ci",
  "subWord-ci",
  "contains-ci",
];
export const samlingOrder: Samling[] = [
  "ARTSDB",
  "ASTRONOMI",
  "BIOLOGI",
  "CMBIOLOGI",
  "EVERTEBRATER",
  "KJEMI",
  "KLIMA",
  "LINGVISTIKK",
  "MRT",
  "MRT2",
  "SDIR",
  "NHH",
  "NOJU",
  "NOT",
  "ROMFYS",
  "RTT",
  "TOLKING",
  "UHR",
];
export const languageOrder = {
  nb: [
    "nb",
    "nn",
    "en",
    "ar",
    "da",
    "fi",
    "fr",
    "it",
    "la",
    "pl",
    "ru",
    "so",
    "es",
    "sv",
    "ti",
    "de",
  ],
  nn: [
    "nn",
    "nb",
    "en",
    "ar",
    "da",
    "fi",
    "fr",
    "it",
    "la",
    "pl",
    "ru",
    "so",
    "es",
    "sv",
    "ti",
    "de",
  ],
  en: [
    "en",
    "nb",
    "nn",
    "ar",
    "da",
    "fi",
    "fr",
    "de",
    "it",
    "la",
    "pl",
    "ru",
    "so",
    "es",
    "sv",
    "ti",
  ],
};

export const languageRtoL = new Set(['ar'])

export type QueryType = "entries" | "aggregate" | "count";
