export const formatTemperature = (val: number | null) => val ? `${val > 0 ? '+' : ''}${Math.round(val)} C` : '';
export const formatHumidity = (val: number | null) => val ? `${Math.round(val)}%` : '';

export const formatScaleText = (dictClient: any, scale: string) => {
    const tt = dictClient.Scale?.[scale];
    return tt ? (tt.title + (tt.subtitle ? ' ' + tt.subtitle : '')) : '';
};
