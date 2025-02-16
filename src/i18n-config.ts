export const i18n = {
    defaultLocale: "am",
    locales: ["am", "en", "ru"],
} as const;

export type Locale = (typeof i18n)["locales"][number];

export default i18n;
