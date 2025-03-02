'use client';

import classNames from "classnames";
import { FC, useEffect, useMemo, useState } from "react";
import { ChartAqiCumulative } from "./chart-aqi-cumulative";
import { ChartHourStat } from "./chart-stat-hour";
import { ApiService, SensorData } from "@/api";
import { useTranslate } from "@/providers/translate-provider";
import { getScaleData } from "@/tools/aqi-scale";
import { cumulateStat, StatPeriod } from "@/tools/stat";

const PeriodHour: FC<{
    data: SensorData[];
    loading: boolean;
}> = ({ data }) => {
    const chartData = useMemo(() => {
        const d = data.slice(0, 24);

        return d.map(item => {
            const scale = getScaleData(item.aqi);

            return { value: item.aqi, color: scale.bgColor };
        }).reverse();
    }, [data]);

    return (
      <ChartHourStat data={chartData} height={80} y={{ hide: true }} x={{ hide: true }} />
    );
};

const PeriodCumulative: FC<{
    data: SensorData[];
    loading: boolean;
    period: StatPeriod;
}> = ({ data, period }) => {
    const chartData = useMemo(() => cumulateStat(data, period), [data, period]);

    return (
      <ChartAqiCumulative data={chartData} height={80} margin={{ left: 0 }} y={{ hide: true }} />
    );
};

const periods = [StatPeriod.Day, StatPeriod.Week, StatPeriod.Month];

export const PeriodHistoryStationChart: FC<{ className?: string; stationId: number }> = ({ stationId }) => {
    const [period, setPeriod] = useState<StatPeriod>(StatPeriod.Day);
    const [data, setData] = useState<SensorData[]>([]);
    const [loading, setLoading] = useState(true);
    const t = useTranslate();

    useEffect(() => {
        ApiService.loadStationHistory(stationId, 'hour')
            .then((result) => {
                setData(result);
                setLoading(false);
            })
            .catch(() => {
                setData([]);
                setLoading(false);
            });
    }, [stationId]);

    return (
      <div className="h-[110px] flex flex-col justify-between">
        <div className="flex flex-row justify-end p-1 text-armaqi-light">
          {periods.map(p => (
            <div
              key={p}
              className={classNames(period === p ? 'text-armaqi-base font-bold': 'cursor-pointer', 'mr-1')}
              onClick={p !== period ? () => setPeriod(p) : undefined}
            >
              {t('Stat.period.' + p)}
            </div>
          ))}
        </div>
        <div className="mx-2">
          {period === StatPeriod.Day ? (
            <PeriodHour data={data} loading={loading} />
          ) : (
            <PeriodCumulative period={period} data={data} loading={loading} />
          )}
        </div>
      </div>
    );
};

export default PeriodHistoryStationChart;
