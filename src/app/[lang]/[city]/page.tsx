import { notFound } from 'next/navigation';
import { Background } from "@/components/bg";
import { getDictionary } from "@/dictionaries";
import { i18n, Locale } from "@/i18n-config";

export default async function CityPage(props: {
    params: Promise<{ lang: Locale; city: string }>;
}) {
    const { city, lang } = await props.params;
    const dict = (await getDictionary(lang));

    if (!i18n.locales.includes(lang) || !['yerevan'].includes(city)) {
        return notFound();
    }

    return (
      <>
        <Background />
        <div>{lang} city  {city} page</div>
      </>
    );
}

