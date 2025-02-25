'use client';
import { StationItem } from "@/api";
import { CustomMarker } from "@/components/map/custom-marker";
import { SensorMap } from "@/components/map/map";
import "leaflet/dist/leaflet.css";

export function StationMap ({ className, station }: {
    className?: string;
    station: StationItem;
}) {
    return (
      <SensorMap
        className={className}
        markers={<CustomMarker station={station} size={50} />}
        center={station.position}
        zoom={14}
      />
    );
}
