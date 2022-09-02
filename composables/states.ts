export const useSearchterm = () => useState<string>('searchterm', () => '');
export const useSearchLanguage = () => useState<string>('searchLanguage', () => '');
export const useSearchBase = () => useState<Array<String>>('searchBase', () => []);
export const useDataDisplayLanguages = () => useState<Array<string>>('dataDisplayLanguages', () => ["nb", "nn", "en", "ar", "da", "de", "es", "fa-af", "fi", "fr", "it", "la", "pl", "ru", "smj", "so", "sv", "ti"]);
export const useConceptViewToggle = () => useState<boolean>('conceptViewToggle', () => false);