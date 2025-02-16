import { MetadataRoute } from 'next';
import { i18n } from "@/i18n";
import { localeLangs, localeUrls } from "@/seo";

export default function sitemap(): MetadataRoute.Sitemap {
    const indexAlternates = i18n.locales.reduce((out, locale) => ({
        ...out,
        [localeLangs[locale]]: localeUrls[locale],
    }), {} as any);

    return [
        {
            url: localeUrls.am,
            lastModified: new Date(),
            alternates: { languages: indexAlternates },
        },
        {
            url: localeUrls.ru,
            lastModified: new Date(),
            alternates: { languages: indexAlternates },
        },
        {
            url: localeUrls.en,
            lastModified: new Date(),
            alternates: { languages: indexAlternates },
        },
    ];
}