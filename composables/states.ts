export const useSearchterm = () => useState<string>('searchterm', () => '');
export const useSearchLanguage = () => useState<string>('searchLanguage', () => '');
export const useSearchBase = () => useState<Array<String>>('searchBase', () => []);
export const useDataDisplayLanguages = () => useState<Array<string>>('dataDisplayLanguages', () => ["nb", "nn", "en", "la"]);
export const useConceptViewToggle = () => useState<boolean>('conceptViewToggle', () => false);