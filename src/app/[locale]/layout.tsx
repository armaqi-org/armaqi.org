import classNames from "classnames";
import { Montserrat } from 'next/font/google';
import { useLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { ReactNode } from 'react';
import { GoogleTag } from "@/components/gtag";
import { YandexMetrika } from "@/components/ym";
import { Locale, locales } from "@/const";
import { localeLangs, localeLocales, localeUrls } from "@/seo";

import '../globals.css';

const font = Montserrat({ subsets: ['latin'] });


const getLocale = (locale: string) => (localeLocales as any)[locale] ?? localeLocales[Locale.AM];
const getLang = (locale: string) => (localeLangs as any)[locale] ?? localeLangs[Locale.AM];

export async function generateMetadata({ params: { locale } }: any) {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

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
      locale: getLocale(locale),
      type: 'website',
    },
  };
}

export default function RootLayout({
  children,
}: { children: ReactNode }) {
  const locale = useLocale();

  return (
    <html lang={getLang(locale)}>
      <head>
        <YandexMetrika />
        <GoogleTag />

        {locales.map(locale => <link key={locale} rel="alternate" hrefLang={localeLangs[locale]} href={localeUrls[locale]} />)}

      </head>
      <body className={classNames(font.className, 'text-base text-armaqi-base')}>{children}</body>
    </html>
  );
}
