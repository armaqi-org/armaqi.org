'use client';
import { StationItem } from "@/api";
import { CustomMarker } from "@/components/map/custom-marker";
import { SensorMap } from "@/components/map/map";
import { useDictionary } from "@/providers/dictionary-provider";
import "leaflet/dist/leaflet.css";

export function StationMap ({ className, station }: {
    className?: string;
    station: StationItem;
}) {
    const dict = useDictionary();

    return (
      <SensorMap
        dict={dict}
        className={className}
        markers={<CustomMarker station={station} dict={dict.Map} size={50} />}
        center={station.position}
        zoom={14}
      />
    );
}
