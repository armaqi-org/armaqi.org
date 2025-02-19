import { Fragment, ReactNode } from 'react';
import { Background } from "@/components/bg";
import { Navigation } from "@/components/navigation";
import { getDictionary } from "@/dictionaries";
import { type Locale } from "@/i18n-config";
import { getCurrentPath } from "@/tools/path";

export default async function CityStationLayout(props: {
  children: ReactNode;
  params: Promise<{ lang: Locale; city: string; station: string }>;
}) {
  const { lang } = await props.params;
  const dict = (await getDictionary(lang)).Setup;
  const currentPath = await getCurrentPath();

  return (
    <Fragment>
      <Background />
      <Navigation
        locale={lang}
        links={[{ href: `/`, title: dict["nav-main"] }]}
        currentPath={currentPath}
      />

      {props.children}
    </Fragment>
  );
}
