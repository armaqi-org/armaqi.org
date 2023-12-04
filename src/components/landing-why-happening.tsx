import Image from "next/image";
import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/section-header";

const sections = [
    'Cars',
    'Heating',
    'Burning',
    'Geographic',
    'Wildfires',
    'Mining',
    'Construction',
    'Industry',
];

export const LandingWhyHappening = () => {
  const t = useTranslations('LandingWhyHappening');

  return (
    <div className="container my-16 mx-auto md:px-6">
      <SectionHeader className="mb-16" key="why">
        {t('title')}
      </SectionHeader>

      <div className="grid gap-8 sm:grid-cols-2 sm:gap-12 lg:grid-cols-3 xl:grid-cols-4 xl:gap-16">
        {sections.map(item => (
          <div key={item} className="flex flex-col items-center">
            <Image src={`/why/${item}.svg`} alt={item}
              width={80} height={80}
            />
            <h4 className="mx-4 mt-4 mb-4 text-xl text-center font-semibold">{t(`item${item}:title`)}</h4>
            <p className="ml-4 w-56 font-light">
              {t.rich(`item${item}:text`)}
            </p>
          </div>
          ))}
      </div>
    </div>

  );
};
