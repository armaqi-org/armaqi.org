'use client';
import BaseLink from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";
import { Locale } from "@/const";

export const LinkLocale: FC<{
    children: string;
    locale: string;
    className?: string;
    ['aria-current']?: 'page';
}> = props => {
    const pathname = usePathname();
    let href = Object.values(Locale).reduce((out, loc) =>
            out.startsWith('/' + loc)
                ? out.replace('/' + loc, out.length === loc.length + 1 ? '/' : '')
                : out,
        pathname
    );

    if ((props.locale === Locale.EN || props.locale === Locale.RU)) {
        href = `/${props.locale}${href}`;
    }

    return <BaseLink {...props} locale={false} href={href} />;
};
