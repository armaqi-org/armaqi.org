import "server-only";
import type { Locale } from "./i18n";

// We enumerate all dictionaries here for better linting and typescript support
// We also get the default import for cleaner types
const dictionaries = {
    en: () => import("../messages/en.json").then((module) => module.default),
    am: () => import("../messages/am.json").then((module) => module.default),
    ru: () => import("../messages/ru.json").then((module) => module.default),
};

const dictionariesClient = {
    en: () => import("../messages-client/en.json").then((module) => module.default),
    am: () => import("../messages-client/am.json").then((module) => module.default),
    ru: () => import("../messages-client/ru.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) =>
    dictionaries[locale]?.() ?? dictionaries.en();

export const getDictionaryClient = async (locale: Locale) =>
    dictionariesClient[locale]?.() ?? dictionariesClient.en();
