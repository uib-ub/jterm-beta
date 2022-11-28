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

export type LabelPredicate = "prefLabel" | "altLabel" | "hiddenLabel";
export type MatchingNested = Matching | Matching[];
export type Matching =
  | "full-cs"
  | "full-ci"
  | "startsWith-ci"
  | "endsWith-ci"
  | "subWord-ci"
  | "contains-ci";

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
export const samlingOrder = [
  "all",
  "MRT",
  "MRT2",
  "UHR",
  "ARTSDB",
  "EVERTEBRATER",
  "NHH",
  "NOJU",
  "NOT",
  "RTT",
  "SDIR",
  "TOLKING",
  "ROMFYS",
  "TUNDUIA",
  "KLIMA",
  "ASTRONOMI",
  "BIOLOGI",
  "LINGVISTIKK",
  "CMBIOLOGI",
  "KJEMI",
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

export type QueryType = "entries" | "aggregate" | "count";
