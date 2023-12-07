import classNames from "classnames";
import { Inter } from 'next/font/google';
import { useLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { ReactNode } from 'react';
import { Locale } from "@/const";

import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

const locales: Record<Locale, string> = {
  [Locale.EN]: 'en_US',
  [Locale.RU]: 'ru_RU',
  [Locale.AM]: 'am',
};

const getLang = (locale: string) => (locales as any)[locale] ?? locales[Locale.AM];

export async function generateMetadata({ params: { locale } }: any) {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('title'),
    description: t('description'),

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
      <body className={classNames(inter.className, 'text-armaqi-base menu-top')}>{children}</body>
    </html>
  );
}
