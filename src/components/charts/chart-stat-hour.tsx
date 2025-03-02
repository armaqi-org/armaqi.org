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
import { ChartMargin, ChartXAxis, ChartYAxis } from "./types";

export interface ChartHourDataItem {
    value: number;
    label?: string;
    color?: string;
}

export const ChartHourStat: FC<{
    data: ChartHourDataItem[];
    height: number | string;
    width?: number | string;
    margin?: ChartMargin;
    y?: ChartYAxis;
    x?: ChartXAxis;
}> = ({ data, height, margin, width = '100%', x, y }) => {
    return (
      <ResponsiveContainer width={width} height={height}>
        <BarChart
          layout="horizontal"
          data={data}
          margin={margin}
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

