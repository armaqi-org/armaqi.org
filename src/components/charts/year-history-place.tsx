'use client';

import { FC, useEffect, useMemo, useState } from "react";
import { ApiService, SensorData } from "@/api";
import { YearHistoryChart, YearHistoryDataItem } from "@/components/charts/year-history";
import { AqiScale, aqiScaleList, getScaleKey } from "@/tools/aqi-scale";

const mlabels = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
];

export const YearHistoryPlaceChart: FC<{
    className?: string;
}> = () => {
    const [data, setData] = useState<SensorData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        ApiService.loadPlaceHistory(1, 'day')
            .catch(() => [])
            .then(result => {
                setLoading(true);
                setData(result);
            });
    }, []);

    const chartData = useMemo(() => {
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        let monthIndexed = new Array(12)
            .fill(null)
            .map((_, index) => index);

        for (let i=0; i < currentMonth; i++) {
            monthIndexed.unshift(monthIndexed.pop()!);
        }

        const cd = new Array(13).fill(null).map((_, index) => {
            return {
                month: (currentMonth + index) % 12,
                values: [] as AqiScale[],
            };
        });

        for (const item of data) {
            const dt = new Date(item.timestamp);
            const y = dt.getFullYear();
            const m = dt.getMonth();
            const ind = y === currentYear && m === currentMonth ? 12 : monthIndexed[m];

            if (item.aqi) {
                cd[ind].values.push(getScaleKey(item.aqi));
            }
        }

        const cdd = cd[0].values.length ? cd.slice(0, 12) : cd;
        return cdd.map(({ month, values }) => {
            const out: YearHistoryDataItem = {
                great: 0,
                good: 0,
                neutral: 0,
                poor: 0,
                bad: 0,
                horrific: 0,

                label: mlabels[month],
            };

            if (values.length) {
                for (const scale of aqiScaleList) {
                    const count = values.filter(v => v === scale).length;

                    out[scale] = Math.round(100 * count / values.length);
                }
            }
            
            return out;
        });
    }, [data]);

    return (
      <div className="h-[320px] w-full flex flex-col justify-end items-end bg-white border-armaqi-border border rounded-lg shadow-sm">
        <YearHistoryChart data={chartData} height={320} y={{ hide: true }} />
      </div>
    );
};

export default YearHistoryPlaceChart;
