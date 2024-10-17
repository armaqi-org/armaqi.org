import { MetadataRoute } from 'next';
import { Locale, locales } from "@/const";
import { localeLangs, localeUrls } from "@/seo";

export default function sitemap(): MetadataRoute.Sitemap {
    const indexAlternates = locales.reduce((out, locale) => ({
        ...out,
        [localeLangs[locale]]: localeUrls[locale],
    }), {} as any);

    return [
        {
            url: localeUrls[Locale.AM],
            lastModified: new Date(),
            alternates: { languages: indexAlternates },
        },
        {
            url: localeUrls[Locale.RU],
            lastModified: new Date(),
            alternates: { languages: indexAlternates },
        },
        {
            url: localeUrls[Locale.EN],
            lastModified: new Date(),
            alternates: { languages: indexAlternates },
        },
    ];
}