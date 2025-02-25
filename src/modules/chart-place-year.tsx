import dynamic from "next/dynamic";
import { FC } from "react";

const YearHistoryPlaceChart = dynamic(() => import("../components/charts/year-history-place"), { ssr: !!false });

export const ChartPlaceYear: FC<{}> = () => (
  <YearHistoryPlaceChart />
);