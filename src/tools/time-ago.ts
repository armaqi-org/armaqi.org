import { TranslateMethod } from "@/tools/translate";

export const getTimeAgo = (from: Date, to: Date): [number, 'm' | 'h' | 'd' | 'o'] => {
    const diff = Math.ceil((to.getTime() - from.getTime()) / (60000));

    if (diff < 60) {
        return [diff, 'm'];
    }

    const hours = Math.floor(diff / 60);

    if (hours < 24) {
        return [hours, 'h'];
    }

    const days = Math.floor(hours / 24);

    if (days <= 2) {
        return [days, 'd'];
    }

    return [1, 'o'];
};

export const getTimeAgoString = (dt: Date, t: TranslateMethod) => {
    const [counter, mode] = getTimeAgo(dt, new Date());

    return (t('Map.' + 'ago_' + mode))?.replace('{counter}', counter.toString());
};
