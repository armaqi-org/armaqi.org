'use client';

import { FC } from "react";
import {
    BarChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Bar,
} from "recharts";
import { ChartXAxis, ChartYAxis } from "@/components/charts/types";
import { aqiScalesData } from "@/tools/aqi-scale";

export interface YearHistoryDataItem {
    great: number;
    good: number;
    neutral: number;
    poor: number;
    bad: number;
    horrific: number;

    label: string;
}

export const YearHistoryChart: FC<{
    data: YearHistoryDataItem[];
    height: number | string;
    width?: number | string;
    y?: ChartYAxis;
    x?: ChartXAxis;
}> = ({ data, height, width = '100%', x, y }) => {
    return (
      <ResponsiveContainer width={width} height={height}>
        <BarChart
          layout="horizontal"
          data={data}
        >
          <YAxis type="number" {...y} />
          <XAxis dataKey="label" type="category" {...x} />

          {aqiScalesData.map(scale => (
            <Bar key={scale.key} dataKey={scale.key} stackId="a" fill={scale.bgColor} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    );
};

