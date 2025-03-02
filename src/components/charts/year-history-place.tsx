'use client';

import { FC, useEffect, useMemo, useState } from "react";
import { ChartAqiCumulative } from "./chart-aqi-cumulative";
import { ApiService, SensorData } from "@/api";
import { cumulateStat, StatPeriod } from "@/tools/stat";

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
        return cumulateStat(data, StatPeriod.Year);
    }, [data]);

    return (
      <div className="h-[320px] w-full flex flex-col justify-end items-end bg-white border-armaqi-border border rounded-lg shadow-sm">
        <ChartAqiCumulative data={chartData} height={320} y={{ hide: true }} />
      </div>
    );
};

export default YearHistoryPlaceChart;
