'use client';

import { FC, useEffect, useMemo, useState } from "react";
import { PeriodHistoryChart } from "./period-history";
import { StationHistoryType, ApiService, SensorData } from "@/api";
import { useTranslate } from "@/providers/translate-provider";
import { getScaleData } from "@/tools/aqi-scale";

export const PeriodHistoryStationChart: FC<{ className?: string; stationId: number }> = ({ stationId }) => {
    const [type, setType] = useState<StationHistoryType>('hour');
    const [data, setData] = useState<SensorData[]>([]);
    const [loading, setLoading] = useState(true);
    const t = useTranslate();

    useEffect(() => {
        ApiService.loadStationHistory(stationId, type)
            .then((result) => {
                setData(result);
                setLoading(false);
             })
            .catch(() => {
                setData([]);
                setLoading(false);
            });
    }, [stationId, type]);

    const chartData = useMemo(() => {
        const d = data.slice(0, 24);

        return d.map(item => {
            const scale = getScaleData(item.aqi);

            return { value: item.aqi, color: scale.bgColor };
        }).reverse();
    }, [data]);
    return (
      <div className="h-[90px] flex flex-col justify-between">
        <div className="flex flex-row justify-end  p-1">
          <div className="text-armaqi-base font-bold">{t('Stat.period.hour')}</div>
        </div>
        <PeriodHistoryChart data={chartData} height={60} y={{ hide: true }} x={{ hide: true }} />
      </div>
    );
};

export default PeriodHistoryStationChart;
