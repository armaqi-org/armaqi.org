import { Languages } from "next/dist/lib/metadata/types/alternative-urls-types";
import { Locale } from "@/i18n";

export const localeLangs: Record<Locale, string> = {
    en: 'en-US',
    ru: 'ru-RU',
    am: 'hy-AM',
};

export const localeUrls: Record<Locale, string> = {
    am: 'https://armaqi.org',
    en: "https://armaqi.org/en",
    ru: "https://armaqi.org/ru",
};

export const localeLocales: Record<Locale, string> = {
    en: 'en_US',
    ru: 'ru_RU',
    am: 'hy_AM',
};

const indexAlternates: Languages<string> = {
    "hy-AM": 'https://armaqi.org',
    "en-US": "https://armaqi.org/en",
    "ru-RU": "https://armaqi.org/ru",
};
