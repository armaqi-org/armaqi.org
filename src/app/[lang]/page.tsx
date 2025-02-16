import { Background } from "@/components/bg";
import { LandingAbout } from "@/components/landing-about";
import { LandingDilijan, LandingYerevan } from "@/components/landing-banners";
import { LandingCommunity } from "@/components/landing-community";
import { LandingConsequences } from "@/components/landing-consequences";
import { LandingFooter } from "@/components/landing-footer";
import { LandingHowItWorks } from "@/components/landing-how-it-works";
import { LandingQuality } from "@/components/landing-quality";
import { LandingSensor } from "@/components/landing-sensor";
import { LandingSmog } from "@/components/landing-smog";
import { LandingSolution } from "@/components/landing-solution";
import { LandingWhyHappening } from "@/components/landing-why-happening";
import { Navigation } from "@/components/navigation";
import { getDictionary, getDictionaryClient } from "@/dictionaries";
import { Locale } from "@/i18n-config";
import { MapModule } from "@/modules/map";
import DictionaryProvider from "@/providers/dictionary-provider";

export default async function IndexPage(props: {
    params: Promise<{ lang: Locale }>;
}) {
    const { lang } = await props.params;
    const dict = (await getDictionary(lang));
    const dictClient = (await getDictionaryClient(lang));

    // console.log('###2', lang);
    return (
      <>
        <Background />
        <Navigation locale={lang} links={['map', 'smog', 'sensor', 'about'].map(it => ({ href: `#${it}`, title: (dict.Landing as any)[`nav-${it}`] }))} />

        <DictionaryProvider dictionary={dictClient}>
          <MapModule />
        </DictionaryProvider>

        <LandingQuality dict={dict} />
        <LandingAbout dict={dict} />
        <LandingHowItWorks dict={dict} />

        <LandingYerevan dict={dict} />
        <LandingSmog dict={dict} />
        <LandingWhyHappening dict={dict} />
        <LandingConsequences dict={dict} />
        <LandingSolution dict={dict} />
        <LandingDilijan dict={dict} />
        <LandingSensor dict={dict} />
        <LandingCommunity dict={dict} />
        <LandingFooter dict={dict} />
      </>
    );
}

