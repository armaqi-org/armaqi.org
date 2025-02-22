'use client';

import { StationMap } from "@/components/map/map-station";
import { useStation } from "@/providers/station-provider";

export default function PageStationMap () {
    const station = useStation();
    return station ? (
      <StationMap station={station} className="w-full h-full" />
    ) : null;
}