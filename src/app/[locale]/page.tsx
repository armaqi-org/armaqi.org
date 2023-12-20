import { useTranslations } from "next-intl";
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
import { MapModule } from "@/modules/map";
import { useLocale } from "@/tools/locale";

export default function HomePage() {
    const locale = useLocale();
    const t = useTranslations('Landing');

    return (
      <>
        <Background />
        <Navigation locale={locale} links={['map', 'about', 'smog', 'sensor'].map(it => ({ href: `#${it}`, title: t(`nav-${it}`) }))} />
        <MapModule />
        <LandingQuality />
        <LandingAbout t={t} />
        <LandingHowItWorks t={t} />
        <LandingYerevan t={t} />
        <LandingSmog />
        <LandingWhyHappening />
        <LandingConsequences />
        <LandingSolution />
        <LandingDilijan t={t} />
        <LandingSensor />
        <LandingCommunity />
        <LandingFooter />
      </>
    );
}

