import classNames from "classnames";
import Image from "next/image";
import { FC } from "react";
import { OrderForm } from "@/components/landing/landing-sensor-order";
import { Section } from "@/components/section";
import { FCTL } from "@/tools/types";

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

const prices = {
    standard: '45000',
    diyLite: '25000',
    diyFull: '40000',
};

export const LandingSensor: FCTL = ({ dict }) => {
  const d = dict.LandingSensor;
  const t = (key: string) => (d as any)[key];

  return (
    <>
      <Section
        id="sensor"
        title={d.title}
      >
        <div className="px-4 flex flex-col items-center">
          <p className="text-xl text-center max-w-lg font-light">
            {d.description}
          </p>
        </div>

        <div className="mt-10 px-4 grid grid-cols-1 gap-20 sm:mx-auto sm:max-w-sm md:mt-20 md:max-w-full md:grid-cols-2">
          <div className="">
            <Image className="mx-auto h-96 w-auto object-cover md:order-2 md:object-center" src="/sensor-standard.jpeg" alt="sensor standard" width={560} height={340} />
            <div className="">
              <div className="flex justify-between items-center mt-8">
                <h3 className="text-2xl font-semibold">
                  {d.standardTitle}
                </h3>
                <p className="font-semibold text-xl mt-2">{prices.standard} AMD</p>
              </div>

              <p className="mt-6 text-base font-light">{d.standardDescription}</p>
            </div>

            <List className="mt-4" titleKey="needs" tPrefix="standardNeeds" len={2} t={t} />
          </div>

          <div className="">
            <Image className="mx-auto h-96 w-auto object-cover md:order-2 md:object-center" src="/sensor-diy.png" alt="sensor diy" width={560} height={340} />
            <div className="">
              <h3 className="text-2xl font-semibold mt-8">{d.diyTitle}</h3>
              <p className="mt-6 text-base font-light">{d.diyDescription}</p>
            </div>

            <List className="mt-4" title2={`${prices.diyLite} AMD`} titleKey="diyLite" tPrefix="diyLite" len={1} t={t} />
            <List className="mt-4" title2={`${prices.diyFull} AMD`} titleKey="diyFull" tPrefix="diyFull" len={1} t={t} />
          </div>
        </div>
      </Section>
 
      <Section id="order"
        className="mb-16"
        title={d.order}
      >
        <div className="flex flex-col items-center">
          <p className="text-xl text-center max-w-screen-md font-light">
            {d.orderDescription}
          </p>
        </div>

        <div className="max-w-screen-md mx-auto">
          <div className="space-y-4 px-2 md:px-8 py-10 max-w-screen-md">
            <OrderForm
              sensors={[
                  ['standard', d.standardTitle],
                  ['diyLite', d.diyLite],
                  ['diyFull', d.diyFull]
              ]}
              t={{
                    'email': d.orderFieldEmail,
                    'emailPlaceholder': d.orderFieldEmailPlaceholder,
                    'name': d.orderFieldName,
                    'namePlaceholder': d.orderFieldNamePlaceholder,
                    'contact': d.orderFieldContact,
                    'contactPlaceholder': d.orderFieldContactPlaceholder,
                    'district': d.orderFieldDistrict,
                    'districtPlaceholder': d.orderFieldDistrictPlaceholder,
                    'sensor': d.orderFieldSensor,
                    'sensorStandard': d.standardTitle,
                    'sensorDiy': d.diyTitle,
                    'submit': d.orderSubmit,
                    'terms': d.orderTerms,
                    'hint': d.orderHint,
                    'success': d.orderSuccess,
                    'error': d.orderError,
              }}
            />
          </div>
        </div>
      </Section>
    </>
    );
};
