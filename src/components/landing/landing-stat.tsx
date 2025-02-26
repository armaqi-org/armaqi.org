import classNames from "classnames";
import {  SensorData } from "@/api";
import { AqiCard } from "@/components/clouds/aqi-card";
import { ChartPlaceLive } from "@/modules/chart-place-live";
import TranslateProvider from "@/providers/translate-provider";
import { getTranslation } from "@/tools/translate";
import { FCTL } from "@/tools/types";


export const LandingStat: FCTL<{ data: SensorData[] }> = ({ data, dict }) => {
    const t = getTranslation(dict);
  return (
    <div className={classNames(
        "max-md:container my-4 mx-auto px-4 py-2",
        "md:absolute md:bg-white md:left-6 md:top-8 md:z-top md:w-[400px] md:rounded-xl md:border-armaqi-border md:border"
    )}
    >
      <h2 className="text-lg mb-3 font-bold align-middle">
        {dict.Stat.yerevan}
      </h2>

      <AqiCard aqi={data[0]?.aqi ?? 0} t={t} className="mb-2" />

      <TranslateProvider dictionary={dict}>
        <ChartPlaceLive data={data} />
      </TranslateProvider>
    </div>
  );
};
