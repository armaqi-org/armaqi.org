import { MetadataRoute } from 'next';
import { Languages } from "next/dist/lib/metadata/types/alternative-urls-types";

const indexAlternates: Languages<string> = {
    "hy-AM": 'https://armaqi.org',
    "en-US": "https://armaqi.org/en",
    "ru-RU": "https://armaqi.org/ru",
};

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://armaqi.org',
            lastModified: new Date(),
            alternates: { languages: indexAlternates },
        },
        {
            url: 'https://armaqi.org/ru',
            lastModified: new Date(),
            alternates: { languages: indexAlternates },
        },
        {
            url: 'https://armaqi.org/en',
            lastModified: new Date(),
            alternates: { languages: indexAlternates },
        },
    ];
}