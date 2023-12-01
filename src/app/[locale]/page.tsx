import { useTranslations } from "next-intl";
import { LandingQuality } from "@/components/landing-quality";
import { Navigation } from "@/components/navigation";
import { MapModule } from "@/modules/map";
import { useLocale } from "@/tools/locale";

export default function HomePage() {
    const locale = useLocale();
    const t = useTranslations('Landing');

    return (
      <>
        <Navigation locale={locale} />
        <MapModule />
        <LandingQuality />
        <div className="w-100 my-16 py-16 bg-violet-300 flex flex-col align-middle">
          <div className="max-w-screen-md text-white text-xl font-light">
            {t('about')}
          </div>
        </div>

      </>
    );
}
