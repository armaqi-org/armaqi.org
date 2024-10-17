import { Languages } from "next/dist/lib/metadata/types/alternative-urls-types";
import { Locale } from "@/const";

export const localeLangs: Record<Locale, string> = {
    [Locale.EN]: 'en-US',
    [Locale.RU]: 'ru-RU',
    [Locale.AM]: 'hy-AM',
};

export const localeUrls: Record<Locale, string> = {
    [Locale.AM]: 'https://armaqi.org',
    [Locale.EN]: "https://armaqi.org/en",
    [Locale.RU]: "https://armaqi.org/ru",
};

export const localeLocales: Record<Locale, string> = {
    [Locale.EN]: 'en_US',
    [Locale.RU]: 'ru_RU',
    [Locale.AM]: 'hy_AM',
};

const indexAlternates: Languages<string> = {
    "hy-AM": 'https://armaqi.org',
    "en-US": "https://armaqi.org/en",
    "ru-RU": "https://armaqi.org/ru",
};
