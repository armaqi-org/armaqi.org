import BaseLink from "next/link";
import { FC } from "react";
import { Locale } from "@/const";
import { useLocale } from "@/tools/locale";

// not sure why Link doesn't automatically prepends locale to links. temp fix
export const Link: FC<{
    href?: string;
    children: string;
    locale?: string;
    className?: string;
    ['aria-current']?: 'page';
}> = props => {
    let href = props.href === undefined
        ? Object.values(Locale).reduce((out, loc) =>
            out.startsWith('/' + loc)
                ? out.replace('/' + loc, '')
                : out,
            location.pathname
        )
        : props.href;
    const locale = useLocale();

    if (!href.startsWith('#') && (locale === Locale.EN || locale === Locale.RU)) {
        href = `/${locale}${href}`;
    }
    return <BaseLink {...props} locale={false} href={href} />;
};
