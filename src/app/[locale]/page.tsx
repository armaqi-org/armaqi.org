import Image from "next/image";
import { useTranslations } from "next-intl";
import { FC, Fragment } from "react";
import { LandingCommunity } from "@/components/landing-community";
import { LandingConsequences } from "@/components/landing-consequences";
import { LandingQuality } from "@/components/landing-quality";
import { LandingSensor } from "@/components/landing-sensor";
import { LandingSmog } from "@/components/landing-smog";
import { LandingSolution } from "@/components/landing-solution";
import { LandingWhyHappening } from "@/components/landing-why-happening";
import { Navigation } from "@/components/navigation";
import { SectionHeader } from "@/components/section";
import { MapModule } from "@/modules/map";
import { useLocale } from "@/tools/locale";

type FCTL = FC<{ t: ReturnType<typeof useTranslations<'Landing'>>}>;

const HowItWorks: FCTL = ({ t }) => (
  <div className="container my-24 mx-auto md:px-6">
    <section className="mb-32">
      <div className="flex flex-wrap">
        <div className="w-full shrink-0 grow-0 basis-auto md:w-6/12 lg:w-6/12">
          <Image src="/sensor-window.jpeg"
            className="mb-6 w-full rounded-lg shadow-lg dark:shadow-black/20"
            alt="sensor"
            width={747}
            height={560}
          />
        </div>

        <div className="w-full shrink-0 grow-0 basis-auto text-center md:w-6/12 md:pl-6 md:text-left lg:w-6/12">
          <SectionHeader id="how" className="mb-6">{t('howTitle')}</SectionHeader>
          <p className="font-light">
            {t("howText").split('\n').map((item, key) => (
              // eslint-disable-next-line react/no-array-index-key
              <Fragment key={key}>{item}<br /></Fragment>
            ))}
          </p>

          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-8 py-2 px-4 rounded">
            {t('howAction')}
          </button>
        </div>
      </div>
    </section>
  </div>
);

const About: FCTL = ({ t }) => (
  <div className="w-100 my-16 py-16 bg-armaqi-pink flex flex-col items-center">
    <div className="max-w-screen-md text-white text-center text-2xl font-light">
      {t('about')}
    </div>
  </div>
);

const Yerevan: FCTL = ({ t }) => (
  <div
    className="w-full h-screen flex items-center justify-center bg-cover"
    style={{ backgroundImage: "url('/yerevan.jpg')" }}
  >
    <div className="text-white text-3xl">{t('ararat')}</div>
  </div>
);

const Dilijan: FCTL = ({ t }) => (
  <div
    className="w-full h-screen flex flex-col items-center justify-center bg-cover"
    style={{ backgroundImage: "url('/mimino.jpg')" }}
  >
    <div className="text-white text-center text-xl max-w-screen-md mb-8">{t('mimino0')}</div>
    <div className="text-white text-center text-xl max-w-screen-md">{t('mimino1')}</div>
  </div>
);

export default function HomePage() {
    const locale = useLocale();
    const t = useTranslations('Landing');

    return (
      <>
        <div className="fixed h-full w-full -z-10 bg-cover" style={{ backgroundImage: 'url(/bg.png)' }} />
        <Navigation locale={locale} />
        <MapModule />
        <LandingQuality />
        <About t={t} />
        <HowItWorks t={t} />
        <Yerevan t={t} />
        <LandingSmog />
        <LandingWhyHappening />
        <LandingConsequences />
        <LandingSolution />
        <Dilijan t={t} />
        <LandingSensor />
        <LandingCommunity />
      </>
    );
}
