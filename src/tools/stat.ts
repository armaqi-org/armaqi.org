import dayjs from "dayjs";
import { SensorData } from "@/api";
import { AqiScale, aqiScaleList, getScaleKey } from "@/tools/aqi-scale";

export enum StatPeriod {
    Day = 'day',
    Week = 'week',
    Month = 'month',
    Year = 'year',
}

export interface AqiCumulativeStatItem {
    great: number;
    good: number;
    neutral: number;
    poor: number;
    bad: number;
    horrific: number;

    label: string;
}

const getDateGroupLabel = (dt: dayjs.Dayjs, period: StatPeriod) => {
    if (period === StatPeriod.Week) {
        return dt.format('ddd');
    } else if (period === StatPeriod.Month) {
        return dt.format('D MMM');
    }  else if (period === StatPeriod.Year) {
        return dt.format('MMM');
    }

    return '';
};

export const cumulateStat = (data: SensorData[], period: StatPeriod): AqiCumulativeStatItem[] => {
    if (period === StatPeriod.Day) {
        return [];
    }

    let toDateJs = dayjs();
    let fromDateJs = dayjs();
    let itemsCount = 0;

    if (period === StatPeriod.Week) {
        toDateJs = toDateJs.startOf('day');
        fromDateJs = fromDateJs.startOf('day').subtract(7, 'days');
        itemsCount = 7;
    } else if (period === StatPeriod.Month) {
        toDateJs = toDateJs.startOf('day');
        fromDateJs = fromDateJs.startOf('day').subtract(30, 'days');
        itemsCount = 30;
    } else if (period === StatPeriod.Year) {
        toDateJs = toDateJs.startOf('month');
        fromDateJs = fromDateJs.startOf('month').subtract(12, 'month');
        itemsCount = 12;
    }

    const groups = new Array(itemsCount).fill(null).map((_, index) => {
        let dt = dayjs();

        if (period === StatPeriod.Week) {
            // count by days
            dt = dt.subtract(1 + index, 'day');
        } else if (period === StatPeriod.Month) {
            // count by days
            dt = dt.subtract(1 + index, 'day');
        }  else if (period === StatPeriod.Year) {
            // count by months
            dt = dt.subtract(1 + index, 'month');
        }

        return { label: getDateGroupLabel(dt, period), values: [] as AqiScale[] };
    }).reverse();

    let toDate = toDateJs.toDate();
    let fromDate = fromDateJs.toDate();

    for (const item of data) {
        const dt = new Date(item.timestamp);
        if (toDate <= dt || fromDate > dt) {
            continue;
        }

        let label = getDateGroupLabel(dayjs(dt), period);

        for (const groupItem of groups) {
            if (groupItem.label === label) {
                groupItem.values.push(getScaleKey(item.aqi));
                break;
            }
        }
    }

    return groups.map(({ label, values }) => {
        const out: AqiCumulativeStatItem = {
            great: 0,
            good: 0,
            neutral: 0,
            poor: 0,
            bad: 0,
            horrific: 0,

            label,
        };

        if (values.length) {
            for (const scale of aqiScaleList) {
                const count = values.filter(v => v === scale).length;

                out[scale] = Math.round(100 * count / values.length);
            }
        }

        return out;
    });
};
