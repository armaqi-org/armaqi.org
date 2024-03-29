import classNames from "classnames";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { FC } from "react";
import { OrderForm } from "@/components/landing-sensor-order";
import { Section } from "@/components/section";

const List: FC<{
    className?: string;
    titleKey: string;
    title2?: string;
    tPrefix: string;
    len: number;
    t: (key: string) => string;
}> = ({ className, len, t, tPrefix, title2, titleKey }) => (
  <div className={className}>
    <div className="flex justify-between items-center">
      <h4 className="text-lg font-semibold">{t(titleKey)}</h4>
      {!!title2 && <h5 className="text-lg font-semibold">{title2}</h5>}
    </div>

    <ul className="list-disc text-xl ml-8 md:ml-0">
      {new Array(len).fill(0).map((_, ind) => (
        // eslint-disable-next-line react/no-array-index-key
        <li key={ind} className={classNames('font-light text-base text-left')}>
          {t(`${tPrefix}${ind}`)}
        </li>
      ))}
    </ul>
  </div>
);

export const LandingSensor = () => {
  const t = useTranslations('LandingSensor');

  return (
    <>
      <Section
        id="sensor"
        title={t('title')}
      >
        <div className="px-4 flex flex-col items-center">
          <p className="text-xl text-center max-w-lg font-light">
            {t('description')}
          </p>
        </div>

        <div className="mt-10 px-4 grid grid-cols-1 gap-20 sm:mx-auto sm:max-w-sm md:mt-20 md:max-w-full md:grid-cols-2">
          <div className="">
            <Image className="mx-auto h-96 w-auto object-cover md:order-2 md:object-center" src="/sensor-standard.jpeg" alt="sensor standard" width={560} height={340} />
            <div className="">
              <div className="flex justify-between items-center mt-8">
                <h3 className="text-2xl font-semibold">
                  {t("standardTitle")}
                </h3>
                <p className="font-semibold text-xl mt-2">35000 AMD</p>
              </div>

              <p className="mt-6 text-base font-light">{t("standardDescription")}</p>
            </div>

            <List className="mt-4" titleKey="needs" tPrefix="standardNeeds" len={2} t={t} />
          </div>

          <div className="">
            <Image className="mx-auto h-96 w-auto object-cover md:order-2 md:object-center" src="/sensor-diy.png" alt="sensor diy" width={560} height={340} />
            <div className="">
              <h3 className="text-2xl font-semibold mt-8">{t("diyTitle")}</h3>
              <p className="mt-6 text-base font-light">{t("diyDescription")}</p>
            </div>

            <List className="mt-4" title2="15000 AMD" titleKey="diyLite" tPrefix="diyLite" len={1} t={t} />
            <List className="mt-4" title2="30000 AMD" titleKey="diyFull" tPrefix="diyFull" len={1} t={t} />
          </div>
        </div>
      </Section>
 
      <Section id="order"
        className="mb-16"
        title={t('order')}
      >
        <div className="flex flex-col items-center">
          <p className="text-xl text-center max-w-screen-md font-light">
            {t('orderDescription')}
          </p>
        </div>

        <div className="max-w-screen-md mx-auto">
          <div className="space-y-4 px-2 md:px-8 py-10 max-w-screen-md">
            <OrderForm
              sensors={[
                  ['standard', t("standardTitle")],
                  ['diyLite', t("diyLite")],
                  ['diyFull', t("diyFull")]
              ]}
              t={{
                    'email': t('orderFieldEmail'),
                    'emailPlaceholder': t('orderFieldEmailPlaceholder'),
                    'name': t('orderFieldName'),
                    'namePlaceholder': t('orderFieldNamePlaceholder'),
                    'contact': t('orderFieldContact'),
                    'contactPlaceholder': t('orderFieldContactPlaceholder'),
                    'district': t('orderFieldDistrict'),
                    'districtPlaceholder': t('orderFieldDistrictPlaceholder'),
                    'sensor': t('orderFieldSensor'),
                    'sensorStandard': t('standardTitle'),
                    'sensorDiy': t('diyTitle'),
                    'submit': t('orderSubmit'),
                    'terms': t('orderTerms'),
                    'hint': t('orderHint'),
                    'success': t('orderSuccess'),
                    'error': t('orderError'),
              }}
            />
          </div>
        </div>
      </Section>
    </>
    );
};
