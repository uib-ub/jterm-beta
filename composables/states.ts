import { LabelPredicate, LangCode, Matching, MatchingNested } from "~~/utils/vars";

export interface SearchDataEntry {
  predicate: string;
  label: string;
  link: string;
  lang: string[];
  samling: string;
  matching: string;
  translate?: string;
  score?: string;
}

export interface SearchDataStats {
  lang: { [key in LangCode]: number } | {};
  samling: { [key: string]: number } | {};
  predicate: { [key in LabelPredicate]: number } | {};
  matching: { [key in Matching]: number } | {};
}

export interface SearchOptions {
  searchTerm: string;
  searchBase: string | string[];
  searchLanguage: string | string[];
  searchTranslate: string;
  searchMatching: MatchingNested[];
  searchLimit: number;
  searchOffset?: { [key in Matching]: number } | number;
}

export const useSearchOptions = () =>
  useState<SearchOptions>("searchOptions", () => ({
    searchTerm: "",
    searchBase: "all",
    searchLanguage: "all",
    searchTranslate: "none",
    searchMatching: [
      ["full-cs", "full-ci"],
      "startsWith-ci",
      "endsWith-ci",
      "subWord-ci",
      "contains-ci",
    ],
    searchLimit: 30,
    searchOffset: 0,
  }));

export const useSearchterm = () => useState<string>("searchterm", () => "");
export const useSearchLanguage = () =>
  useState<string>("searchLanguage", () => "");
export const useSearchTermbase = () =>
  useState<Array<string>>("searchTermbase", () => []);
export const useSearchData = () =>
  useState<Array<SearchDataEntry>>("searchData", () => []);
export const useSearchFetchInitial = () =>
  useState<boolean>("serchFetchInitial", () => false);
export const useSearchDataPending = () =>
  useState<{ [key: string]: boolean }>("searchDataPending", () => ({
    aggregate: false,
    entries: false,
  }));

export const useSearchDataCount = () => useState("searchDataCount", () => {});
export const useSearchDataStats = () =>
  useState<SearchDataStats>("searchDataStats", () => ({
    lang: {},
    samling: {},
    predicate: {},
    matching: {},
  }));

export interface SearchFilterData {
  lang: LangCode[];
  samling: string[];
  predicate: LabelPredicate[];
  matching: Matching[];
}
export const useSearchFilterData = () =>
  useState<{ [key: string]: string[] }>("searchFilterData", () => ({
    lang: [],
    samling: [],
    predicate: [],
    matching: [],
  }));
export const useSearchFetchLatest = () =>
  useState<number>("searchFetchLatest", () => NaN);
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
