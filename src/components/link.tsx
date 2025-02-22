import BaseLink from "next/link";
import { FC, ReactNode } from "react";
import { Locale, i18n } from "@/i18n-config";

export const Link: FC<{
    href: string;
    children: ReactNode;
    locale: Locale;
    className?: string;
    ['aria-current']?: 'page';
}> = ({ href: initialHref, locale, ...props }) => {
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

    return <BaseLink {...props} href={href} />;
};
