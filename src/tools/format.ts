import { TranslateMethod } from "@/tools/translate";

export const formatTemperature = (val: number | null) => val ? `${val > 0 ? '+' : ''}${Math.round(val)} C` : '';
export const formatHumidity = (val: number | null) => val ? `${Math.round(val)}%` : '';

export const formatScaleText = (t: TranslateMethod, scale: string) => {
    const title = t('Scale.' + scale + '.title');
    const subtitle = t('Scale.' + scale + '.subtitle');
    return title ? (title + (subtitle ? ' ' + subtitle : '')) : '';
};

export const formatDayTime = (dt: Date) => {
    function z(n: number){return (n<10?'0':'')+n;}
    return dt.getHours() + ':' + z(dt.getMinutes());
};
