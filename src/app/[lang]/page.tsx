import { notFound } from "next/navigation";
import { ApiService } from "@/api";
import { Background } from "@/components/bg";
import { LandingAbout } from "@/components/landing/landing-about";
import { LandingDilijan, LandingYerevan } from "@/components/landing/landing-banners";
import { LandingCommunity } from "@/components/landing/landing-community";
import { LandingConsequences } from "@/components/landing/landing-consequences";
import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingHowItWorks } from "@/components/landing/landing-how-it-works";
import { LandingQuality } from "@/components/landing/landing-quality";
import { LandingSensor } from "@/components/landing/landing-sensor";
import { LandingSmog } from "@/components/landing/landing-smog";
import { LandingSolution } from "@/components/landing/landing-solution";
import { LandingStat } from "@/components/landing/landing-stat";
import { LandingWhyHappening } from "@/components/landing/landing-why-happening";
import { Navigation } from "@/components/navigation";
import { getDictionary, getDictionaryClient } from "@/dictionaries";
import { i18n, Locale } from "@/i18n-config";
import { MapLandingModule } from "@/modules/map-landing";
import StationsProvider from "@/providers/stations-provider";
import TranslateProvider from "@/providers/translate-provider";
import { getCurrentPath } from "@/tools/path";

export default async function IndexPage(props: {
    params: Promise<{ lang: Locale }>;
}) {
    const { lang } = await props.params;
    const dict = (await getDictionary(lang));
    const dictClient = getDictionaryClient(dict);
    const currentPath = await getCurrentPath();
    const yerevanData = await ApiService.loadPlaceHistory(1, 'hour').catch(() => []);

    if (!i18n.locales.includes(lang)) {
        return notFound();
    }
    
    return (
      <>
        <Background />
        <Navigation
          locale={lang}
          links={['map', 'smog', 'sensor', 'about'].map(it => ({ href: `#${it}`, title: (dict.Landing as any)[`nav-${it}`] }))}
          currentPath={currentPath}
        />

        <TranslateProvider dictionary={dictClient}>
          <div className="relative">
            <StationsProvider stations={[]}>
              <MapLandingModule />
            </StationsProvider>

            <LandingStat data={yerevanData} dict={dict} />
          </div>
        </TranslateProvider>

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

