import "server-only";
import type { Locale } from "./i18n-config";

// We enumerate all dictionaries here for better linting and typescript support
// We also get the default import for cleaner types
const dictionaries = {
    en: () => import("../messages/en.json").then((module) => module.default),
    am: () => import("../messages/am.json").then((module) => module.default),
    ru: () => import("../messages/ru.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) =>
    dictionaries[locale]?.() ?? dictionaries.en();

type DictType = Awaited<ReturnType<typeof getDictionary>>;
type ClientDict = Pick<DictType, 'Map' | 'Scale'>;
export const getDictionaryClient = (dict: DictType): ClientDict => ({
    Map: dict.Map,
    Scale: dict.Scale,
});
