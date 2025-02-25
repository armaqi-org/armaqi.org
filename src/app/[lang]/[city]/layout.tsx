import { ReactNode } from 'react';
import { Background } from "@/components/bg";
import { Navigation } from "@/components/navigation";
import { getDictionary, getDictionaryClient } from "@/dictionaries";
import { type Locale } from "@/i18n-config";
import TranslateProvider from "@/providers/translate-provider";
import { getCurrentPath } from "@/tools/path";

export default async function CityStationLayout(props: {
  children: ReactNode;
  params: Promise<{ lang: Locale; city: string; station: string }>;
}) {
  const { lang } = await props.params;
  const dict = (await getDictionary(lang));
  const dictClient = getDictionaryClient(dict);
  const currentPath = await getCurrentPath();

  return (
    <TranslateProvider dictionary={dictClient}>
      <Background />
      <Navigation
        locale={lang}
        links={[{ href: `/`, title: dict.Setup["nav-main"] }]}
        currentPath={currentPath}
      />

      {props.children}
    </TranslateProvider>
  );
}
