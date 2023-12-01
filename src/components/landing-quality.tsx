import { useTranslations } from "next-intl";
import { Carousel } from "@/components/carousel";
import { CloudQualitySvg } from "@/images/cloud-quality";

const scales = [
    ['0-50', '#009966'],
    ['51-100', '#FFDE33'],
    ['101-150', '#FF9933'],
    ['151-200', '#CC0033'],
    ['201-300', '#660099'],
    ['300+', '#7E0023'],
];

export const LandingQuality = () => {
  const t = useTranslations('LandingQuality');

  return (
    <>
      <div className="container my-16 mx-auto md:px-6 flex flex-col items-center">
        <h2 className="mb-16 text-3xl font-bold text-sky-800 text-center">
          {t('title')}
        </h2>
        <div className="flex items-start flex-wrap max-w-screen-md px-4">
          {scales.map(([text, color], index) => (
            <div key={text} className="mb-12 lg:mb-0 mr-4 flex-1">
              <CloudQualitySvg color={color} />
              <div className="text-sm">{text}</div>
              {t(`scale${index}`).split(':').map((tt, index) =>
                    !index ? (
                      <div className="font-bold text-sm" key={tt}>{tt}</div>
                    ) : tt ? (
                      <div className="text-xs" key={tt}>{tt}</div>
                    ) : null
              )}
            </div>
          ))}
        </div>
        <p className="text-xs text-center text-sky-700 max-w-screen-md font-light mt-8">Шкала AQI, используемая для индексации загрязнения в режиме реального времени на приведенной выше карте, основана на последнем стандарте US EPA, с использованием формулы Instant Cast.</p>
      </div>
        
      <div className="container my-16 mx-auto md:px-6 flex flex-col items-center">
        <h2 className="mb-16 text-3xl font-bold text-sky-800 text-center">
          {t('chartTitle')}
        </h2>

        <Carousel slides={[
            { src: './landing-chart-yerevan.svg', text: t('chartTitleYerevan') },
            { src: './landing-chart-tbilisi.svg', text: t('chartTitleTbilisi') },
        ]}
        />
      </div>
    </>
    );
};
