import classNames from "classnames";
import { FC } from "react";
import { AqiCloudEmotion } from "@/components/clouds/cloud-emotions";
import { getScaleData } from "@/tools/aqi-scale";
import { TranslateMethod } from "@/tools/translate";

export const AqiCard: FC<{ aqi: number | null; className?: string; t: TranslateMethod }> = ({ aqi, className, t }) => {
    const data = getScaleData(aqi || 0);
    const title = t('Scale.' + [data.key] + '.title');
    const subtitle = t('Scale.' + [data.key] + '.subtitle');

    return (
      <div className={classNames("rounded-xl shadow-lg p-4 flex flex-row", className)} style={{ backgroundColor: data.bgColor }}>
        <div className="">
          <AqiCloudEmotion scale={data.key} />
        </div>
        <div className="flex flex-col justify-center px-3">
          <div className="text-white text-4xl font-bold">{aqi}</div>
          <div className="text-white text-xs">{t('Stat.aqiDescription')}</div>
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <div className="font-bold uppercase text:lg md:text-2xl" style={{ color: data.borderColor }}>{title}</div>
          {!!subtitle && <div className="text-sm" style={{ color: data.borderColor }}>{subtitle}</div>}
        </div>
      </div>
    );
};

