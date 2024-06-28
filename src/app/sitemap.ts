import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://armaqi.org',
            lastModified: new Date(),
        },
        {
            url: 'https://armaqi.org/ru',
            lastModified: new Date(),
        },
        {
            url: 'https://armaqi.org/en',
            lastModified: new Date(),
        },
    ];
}