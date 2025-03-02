'use client';

import { FC } from "react";
import {
    BarChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Bar,
} from "recharts";
import { ChartMargin, ChartXAxis, ChartYAxis } from "@/components/charts/types";
import { aqiScalesData } from "@/tools/aqi-scale";
import { AqiCumulativeStatItem } from "@/tools/stat";

export const ChartAqiCumulative: FC<{
    data: AqiCumulativeStatItem[];
    margin?: ChartMargin;
    height: number | string;
    width?: number | string;
    y?: ChartYAxis;
    x?: ChartXAxis;
}> = ({ data, height, margin, width = '100%', x, y }) => {
    return (
      <ResponsiveContainer width={width} height={height}>
        <BarChart
          layout="horizontal"
          margin={margin}
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

