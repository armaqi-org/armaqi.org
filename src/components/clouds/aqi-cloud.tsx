import { FC } from "react";
import { getScaleData } from "@/tools/aqi-scale";

const getAqiFont = (containerSize: number) => {
    if (containerSize < 35) {
        return '11px';
    }
    return '18px';
};

/* eslint-disable max-len */
const aqiCloudSvg = ({ fill, size, stroke, value }: { fill: string; stroke: string; value: number; size: number }) => `
    <div class="relative inline-block">
        <svg width="${size}" height="${Math.round(size / 1.58)}" viewBox="0 0 59 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.55378 37.2692L9.27462 37.2575C4.48224 37.1362 0.730469 33.2879 0.730469 28.4999C0.730469 24.9016 2.89208 21.7096 6.23608 20.365L6.77247 20.1502L6.68478 19.5787C6.61024 19.0862 6.57662 18.6696 6.57662 18.2692C6.57662 13.4329 10.5096 9.49994 15.3459 9.49994C16.1015 9.49994 16.8732 9.60517 17.6419 9.81417L18.3785 10.0144L18.5452 9.27048C19.6822 4.24279 24.0756 0.730713 29.2305 0.730713C33.1737 0.730713 36.8305 2.8704 38.7743 6.31379L39.0169 6.74202L39.5051 6.67917C39.9699 6.61779 40.4405 6.57687 40.9228 6.57687C46.4649 6.57687 51.1389 10.7233 51.7981 16.2245L51.8405 16.5913L52.162 16.774C55.5966 18.7222 57.7305 22.3746 57.7305 26.3091C57.7305 32.354 52.8139 37.2706 46.7689 37.2706L9.55378 37.2692Z" fill="${fill}" stroke="${stroke}"/>
        </svg>
        <div class="absolute inset-0 flex justify-center items-center font-bold mt-1" style="font-size: ${getAqiFont(size)}; color: ${stroke};">${value}</div>
    </div>
`;
/* eslint-enable max-len */

export const getAqiCloudSvg = (aqi: number | null, size: number) => {
    const value = Math.floor(Math.min(Math.max(aqi ?? 0, 0), 999));
    const color = getScaleData(value);

    return aqiCloudSvg({ fill: color.bgColor, stroke: color.borderColor, value, size });
};

export const AqiCloud: FC<{ aqi: number | null, size?: number }> = ({ aqi, size = 60 }) => (
  // eslint-disable-next-line react/no-danger
  <div dangerouslySetInnerHTML={{ __html: getAqiCloudSvg(aqi, size) }} />
);

