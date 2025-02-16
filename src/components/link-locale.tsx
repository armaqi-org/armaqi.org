'use client';
import BaseLink from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";
import { i18n, Locale } from "@/i18n-config";

export const LinkLocale: FC<{
    children: string;
    locale: Locale;
    className?: string;
    ['aria-current']?: 'page';
}> = props => {
    const pathname = usePathname();
    let href = i18n.locales.reduce((out, loc) =>
            out.startsWith('/' + loc)
                ? out.replace('/' + loc, out.length === loc.length + 1 ? '/' : '')
                : out,
        pathname
    );

    if ((props.locale === 'en' || props.locale === 'ru')) {
        href = `/${props.locale}${href}`;
    }

    return <BaseLink {...props} href={href} />;
};
