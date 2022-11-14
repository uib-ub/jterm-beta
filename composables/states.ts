export interface SearchDataEntry {
  predicate: string;
  label: string;
  link: string;
  lang: string[];
  samling: string;
  matching: string;
}

export interface SearchDataStats {
  lang: { [key: string]: number };
  samling: { [key: string]: number };
  predicate: { [key: string]: number };
  matching: { [key: string]: number };
}

export interface SearchOptions {
  searchTerm: string;
  searchBase: string;
  searchLanguage: string;
  searchMatching: string[];
  searchLimit: number;
  searchOffset: number;
}

export const useSearchOptions = () =>
  useState<SearchOptions>("searchOptions", () => ({
    searchTerm: "",
    searchBase: "all",
    searchLanguage: "all",
    searchMatching: ["full-cs", "full-ci", "startsWith-ci", "endsWith-ci", "subWord-ci", "contains-ci"],
    searchLimit: 100,
    searchOffset: 0,
  }));

export const useSearchterm = () => useState<string>("searchterm", () => "");
export const useSearchLanguage = () =>
  useState<string>("searchLanguage", () => "");
export const useSearchTermbase = () =>
  useState<Array<string>>("searchTermbase", () => []);
export const useSearchData = () =>
  useState<Array<SearchDataEntry>>("searchData", () => []);
export const useSearchDataPending = () =>
  useState<boolean>("searchDataPending", () => false);
export const useSearchDataFiltered = () =>
  useState<Array<SearchDataEntry>>("searchDataFiltered", () => []);
export const useSearchDataCount = () => useState("searchDataCount", () => {})
export const useSearchDataStats = () =>
  useState<SearchDataStats>("searchDataStats", () => ({
    lang: {},
    samling: {},
    predicate: {},
    matching: {},
  }));
export const useSearchFilterData = () =>
  useState<{ [key: string]: string[] }>("searchFilterData", () => ({
    lang: [],
    samling: [],
    predicate: [],
    matching: [],
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
    "fi",
    "fr",
    "it",
    "la",
    "pl",
    "ru",
    "so",
    "sv",
    "ti",
  ]);
export const useConceptViewToggle = () =>
  useState<boolean>("conceptViewToggle", () => false);
