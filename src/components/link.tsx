import BaseLink from "next/link";
import { FC } from "react";
import { Locale, i18n } from "@/i18n-config";

// not sure why Link doesn't automatically prepends locale to links. temp fix
export const Link: FC<{
    href?: string;
    children: string;
    locale?: Locale;
    className?: string;
    ['aria-current']?: 'page';
}> = props => {
    let href = props.href === undefined
        ? i18n.locales.reduce((out, loc) =>
            out.startsWith('/' + loc)
                ? out.replace('/' + loc, '')
                : out,
            location.pathname
        )
        : props.href;

    // if (!href.startsWith('#') && (locale === 'en' || locale === 'ru')) {
    //     href = `/${locale}${href}`;
    //}
    return <BaseLink {...props} href={href} />;
};
