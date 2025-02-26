'use client';

import { FC } from "react";
import {
    BarChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Bar,
    Cell,
} from "recharts";
import { ChartXAxis, ChartYAxis } from "./types";

export interface PeriodHistoryDataItem {
    value: number;
    label?: string;
    color?: string;
}

export const PeriodHistoryChart: FC<{
    data: PeriodHistoryDataItem[];
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
          margin={{ right: -20, left: 20 }}
        >
          <YAxis type="number" fontSize="14px" {...y} />
          <XAxis dataKey="label" type="category" fontSize="14px" {...x} />
          <Bar dataKey="value" stackId="a">
            {data.map((entry, index) => (
            // eslint-disable-next-line react/no-array-index-key
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
};

