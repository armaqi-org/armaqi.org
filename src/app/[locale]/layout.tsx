import classNames from "classnames";
import { Montserrat } from 'next/font/google';
import { useLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { ReactNode } from 'react';
import { GoogleTag } from "@/components/gtag";
import { YandexMetrika } from "@/components/ym";
import { Locale } from "@/const";

import '../globals.css';

const font = Montserrat({ subsets: ['latin'] });

const locales: Record<Locale, string> = {
  [Locale.EN]: 'en_US',
  [Locale.RU]: 'ru_RU',
  [Locale.AM]: 'hy_AM',
};

const getLang = (locale: string) => (locales as any)[locale] ?? locales[Locale.AM];

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
      locale: getLang(locale),
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
      </head>
      <body className={classNames(font.className, 'text-base text-armaqi-base')}>{children}</body>
    </html>
  );
}
