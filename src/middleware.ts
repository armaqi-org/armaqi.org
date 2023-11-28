import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
    // A list of all locales that are supported
    locales: ['am', 'en', 'ru'],

    // Used when no locale matches
    defaultLocale: 'am',
    localeDetection: false,
    localePrefix: 'as-needed'
});

export const config = {
    matcher: ["/((?!api|_next|.*\\..*).*)"],
};