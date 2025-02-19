import { notFound } from "next/navigation";
import { Background } from "@/components/bg";
import { getDictionary } from "@/dictionaries";
import { i18n, Locale } from "@/i18n-config";

export default async function StationPage(props: {
    params: Promise<{ lang: Locale; city: string; station: string }>;
}) {
    const { city, lang, station } = await props.params;
    const dict = (await getDictionary(lang));

    if (!i18n.locales.includes(lang) || !['yerevan'].includes(city)) {
        return notFound();
    }
    
    return (
      <>
        <Background />
        <div>city {city} station {station}</div>
      </>
    );
}

