import classNames from "classnames";
import { Montserrat, Noto_Sans_Armenian } from 'next/font/google';
import { ReactNode } from 'react';
import { GoogleTag } from "@/components/gtag";
import { YandexMetrika } from "@/components/ym";
import { getDictionary } from "@/dictionaries";
import { i18n, type Locale } from "@/i18n";
import { localeLangs, localeLocales, localeUrls } from "@/seo";

import '../globals.css';

const fontArmenian = Noto_Sans_Armenian({ subsets: ['armenian'] });
const fontNonArmenian = Montserrat({ subsets: ['latin'] });

const getLocale = (locale: string) => (localeLocales as any)[locale] ?? localeLocales.am;
const getLang = (locale: string) => (localeLangs as any)[locale] ?? localeLangs.am;

export async function generateMetadata(props: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await props.params;
  const dict = await getDictionary(lang);
  const t = (key: keyof typeof dict.Metadata) => dict.Metadata[key];

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),


    openGraph: {
      title: t('title'),
      description: t('description'),
      url: 'https://nextjs.org',
      images: [
        { url: 'https://static.tildacdn.com/tild6238-3035-4937-b666-646563643063/logo-black.svg' },
      ],
      locale: getLocale(lang),
      type: 'website',
    },
  };
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function Root(props: {
  children: ReactNode;
  params: Promise<{ lang: Locale }>;
}) {
  const params = await props.params;
  const font = params.lang === 'am' ? fontArmenian : fontNonArmenian;

  const { children } = props;

  return (
    <html lang={getLang(params.lang)}>
      <head>
        <YandexMetrika />
        <GoogleTag />

        {i18n.locales.map(locale => <link key={locale} rel="alternate" hrefLang={localeLangs[locale]} href={localeUrls[locale]} />)}

      </head>
      <body className={classNames(font.className, 'text-base text-armaqi-base')}>{children}</body>
    </html>
  );
}
