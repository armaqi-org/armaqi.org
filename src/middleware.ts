import { NextRequest, NextResponse } from "next/server";
import { i18n } from './i18n-config';

export default function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const localePrefix = i18n.locales.find(locale => path.startsWith('/' + locale));

    if (!localePrefix) {
        const url = request.nextUrl.clone();
        url.pathname = '/' + i18n.defaultLocale + path;

        const headers = new Headers(request.headers);
        headers.set("x-current-path", url.pathname);

        return NextResponse.rewrite(url, { headers });
    } else if (localePrefix ===i18n.defaultLocale) {
        return NextResponse.redirect(new URL(path.replace('/' + i18n.defaultLocale, ''), request.nextUrl.origin));
    }

    const headers = new Headers(request.headers);
    headers.set("x-current-path", request.nextUrl.pathname);

    return NextResponse.next({ headers, });
}

export const config = {
    matcher: ["/((?!api|_next|.*\\..*).*)"],
};
