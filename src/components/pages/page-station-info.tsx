
import { StationItem } from "@/api";
import { AqiCard } from "@/components/clouds/aqi-card";
import { getTranslation } from "@/tools/translate";
import { DictType } from "@/tools/types";

export default function PageStationInfo ({ className, dict, station }: {
    className?: string;
    dict: DictType;
    station: StationItem
}) {
    return (
      <div className={className}>
        <AqiCard aqi={station.data.aqi} t={getTranslation(dict)} />

        qqq
      </div>
    );
}