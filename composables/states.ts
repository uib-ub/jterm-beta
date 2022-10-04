export interface SearchDataEntry {
  predicate: string,
  label: string,
  link: string,
  lang: string,
  samling: string
}

export interface SearchDataStats {
  lang: { [key: string]: number };
  samling: { [key: string]: number };
  predicate: { [key: string]: number };
}

export const useSearchterm = () => useState<string>("searchterm", () => "");
export const useSearchLanguage = () =>
  useState<string>("searchLanguage", () => "");
export const useSearchTermbase = () =>
  useState<Array<string>>("searchTermbase", () => []);
export const useSearchData = () =>
  useState<Array<SearchDataEntry>>("searchData", () => []);
export const useSearchDataFiltered = () =>
  useState<Array<SearchDataEntry>>("searchDataFiltered", () => []);
export const useSearchDataStats = () =>
  useState<SearchDataStats>("searchDataStats", () => ({
    lang: {},
    samling: {},
    predicate: {},
  }));
export const useSearchFilterData = () =>
  useState<{ [key: string]: string[] }>("searchFilterData", () => ({
    lang: [],
    samling: [],
    predicate: [],
  }));
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
