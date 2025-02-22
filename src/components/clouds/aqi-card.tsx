import { FC } from "react";
import { AqiCloudEmotion } from "@/components/clouds/cloud-emotions";
import { getScaleData } from "@/tools/aqi-scale";

export const AqiCard: FC<{ aqi: number | null; dict: any }> = ({ aqi, dict }) => {
    const data = getScaleData(aqi || 0);
    const tt = dict?.Scale?.[data.key];

    return (
      <div className="rounded-xl shadow-lg p-4 flex flex-row" style={{ backgroundColor: data.bgColor }}>
        <div className="">
          <AqiCloudEmotion scale={data.key} />
        </div>
        <div className="flex flex-col justify-center px-3">
          <div className="text-white text-4xl font-bold">{aqi}</div>
          <div className="text-white text-xs">{dict?.Stat?.aqiDescription}</div>
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <div className="font-bold uppercase text-2xl" style={{ color: data.borderColor }}>{tt?.title}</div>
          {tt?.subtitle && <div className="text-sm" style={{ color: data.borderColor }}>{tt?.subtitle}</div>}
        </div>
      </div>
    );
};

