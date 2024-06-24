import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://armaqi.org',
            lastModified: new Date(),
            alternates: {
                languages: {
                    ru: 'https://armaqi.org/ru',
                    en: 'https://armaqi.org/en',
                },
            },
        },
    ];
}