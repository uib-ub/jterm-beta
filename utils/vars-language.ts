export type LocalLangCode = "en" | "nb" | "nn";

export type LangCode =
  | "ar"
  | "da"
  | "de"
  | "en"
  | "fa-af"
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

export const languageRtoL = new Set(["ar"]);
