import dynamic from "next/dynamic";
import { FC } from "react";
import { SensorData } from "@/api";

const PeriodHistoryPlaceChart = dynamic(() => import("../components/charts/period-history-place"), { ssr: !!false });

export const ChartPlaceLive: FC<{ data: SensorData[] }> = ({ data }) => (
  <PeriodHistoryPlaceChart data={data} />
);