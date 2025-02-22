'use client';
import classNames from "classnames";
import Image from "next/image";
import { FC, ReactNode } from "react";
import { MapContainer, TileLayer } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { MapPosition } from "@/interfaces";
import { aqiScaleList, aqiScales } from "@/tools/aqi-scale";
import { formatScaleText } from "@/tools/format";

export const SensorMap: FC<{
    children?: ReactNode;
    className?: string;
    center: MapPosition;
    markers?: ReactNode;
    live?: boolean;
    dict: any;
    zoom?: number;
}> = ({ center, children, className, dict, live, markers, zoom = 12 }) =>  {
    return (
      <div className={classNames("relative", className)}>
        {!!live && <Image className="absolute top-2 right-2 z-top" width={89} height={34} src="/icons/live.svg" alt="live" priority />}
        <MapContainer center={[center.lat, center.lng]}
          zoom={zoom}
          scrollWheelZoom
          className="w-full h-full"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            maxZoom={18}
          />

          {markers}
        </MapContainer>
        {children}

        <div className="hidden md:flex absolute bottom-0 z-top left-0 right-0 flex-row justify-center text-white">
          {aqiScaleList.map(scale => (
            <div key={scale} className="inline-block text-xs px-2 py-1" style={{ backgroundColor: aqiScales[scale].bgColor }}>{formatScaleText(dict, scale)}</div>
          ))}
        </div>
      </div>
    );
};