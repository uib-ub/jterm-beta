export const useSearchterm = () => useState<string>('searchterm', () => '');
export const useTestcheck = () => useState<boolean>('testcheck', () => false);
export const useSearchLanguage = () => useState<string>('searchLanguage', () => '');
export const useDataDisplayLanguages = () => useState<Array<string>>('dataDisplayLanguages', () => ["nb", "nn", "en", "la"]);