export const useSearchterm = () => useState<string>("searchterm", () => "");
export const useSearchLanguage = () =>
  useState<string>("searchLanguage", () => "");
export const useSearchTermbase = () =>
  useState<Array<string>>("searchTermbase", () => []);
export const useSearchData = () =>
  useState<Array<{ [key: string]: string }>>("searchData", () => []);
export const useSearchDataFiltered = () =>
  useState<Array<{ [key: string]: string }>>("searchDataFiltered", () => []);
export const useDataDisplayLanguages = () =>
  useState<Array<string>>("dataDisplayLanguages", () => [
    "nb",
    "nn",
    "en",
    "ar",
    "da",
    "de",
    "es",
    "fa-af",
    "fi",
    "fr",
    "it",
    "la",
    "pl",
    "ru",
    "smj",
    "so",
    "sv",
    "ti",
  ]);
export const useConceptViewToggle = () =>
  useState<boolean>("conceptViewToggle", () => false);
