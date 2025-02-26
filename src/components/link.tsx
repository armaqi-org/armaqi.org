import BaseLink from "next/link";
import { FC, ReactNode } from "react";
import { Locale, i18n } from "@/i18n-config";

export const Link: FC<{
    href: string;
    children: ReactNode;
    locale: Locale;
    className?: string;
    force?: boolean;
    ['aria-current']?: 'page';
}> = ({ force, href: initialHref, locale, ...props }) => {
    let href = initialHref;

    if (href[0] === '/') {
        i18n.locales.forEach(loc => {
            if (href.startsWith('/' + loc)) {
                href = href.replace('/' + loc, '');
            }
        });

        if (href === '') {
            href = '/';
        }

        if (locale !== i18n.defaultLocale) {
            href = '/' + locale + href;
        }
    }

    if (href.length > 1 && href.endsWith('/')) {
        href = href.substring(0, href.length - 1);
    }

    if (force) {
        return <a href={href} {...props} />;
    }
    return <BaseLink {...props} href={href} />;
};
