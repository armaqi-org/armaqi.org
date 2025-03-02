'use client';

import { FC, useMemo } from "react";
import { ChartHourStat } from "./chart-stat-hour";
import { SensorData } from "@/api";
import { getScaleData } from "@/tools/aqi-scale";
import { formatDayTime } from "@/tools/format";

export const PeriodHistoryPlaceChart: FC<{
    className?: string;
    data: SensorData[];
}> = ({ data }) => {
    const chartData = useMemo(() => {
        const d = data.slice(0, 24);

        return d.map((item) => {
            const scale = getScaleData(item.aqi);
            return {
                value: item.aqi,
                label: formatDayTime(new Date(item.timestamp)),
                color: scale.bgColor
            };
        }).reverse();
    }, [data]);
    return (
      <div className="h-[120px] flex flex-row justify-end items-end bg-white border-armaqi-border border rounded-lg shadow-sm">
        <ChartHourStat data={chartData} height={100} y={{ orientation: 'right' }} margin={{ left: 10, right: -20 }} />
      </div>
    );
};

export default PeriodHistoryPlaceChart;
