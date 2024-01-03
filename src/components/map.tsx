'use client';
import L from 'leaflet';
import { FC, useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { getScaleColor } from "@/tools/quality-scale";
import { useStationsList, StationItem, useStation } from "@/tools/stations";

/* eslint-disable max-len */
const markerSvg = (value: number) => {
    const [color, textColor] = getScaleColor(value);
    return `
<div class="relative">
  <svg fill="${color}" class="my-1" viewBox="-3 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
      <path stroke="#1e293b" stroke-width="0.5px" d="m8.075 23.52c-6.811-9.878-8.075-10.891-8.075-14.52 0-4.971 4.029-9 9-9s9 4.029 9 9c0 3.629-1.264 4.64-8.075 14.516-.206.294-.543.484-.925.484s-.719-.19-.922-.48l-.002-.004z"></path>
    </g>
  </svg>
  <div
     class="absolute inset-0 flex justify-center items-center ${textColor} font-semibold pb-1"
     style="font-size: 10px;"
  >
    ${value}
  </div>
</div>
`;
};
/* eslint-enable max-len */

const CustomMarkerPopupContent: FC<{ station: StationItem }> = ({ station }) => {
    const info = useStation(station.id);
    const data = useMemo(() => ({
        title: station.title,
        loading: !info,
        pm25: info?.pm25 ?? station.aqi,
        pm10: info?.pm10,
    }), [station, info]);
    console.log('qwerty');

    return (
      <div>
        <div className="mb-0.5" style={{ minWidth: '150px' }}>{data.title}</div>
        {data.loading ? (
          <div>loading...</div>
        ): (
          <div>
            <div><b>pm2.5</b>: <span>{data.pm25}</span></div>
            <div><b>pm10</b>: <span>{data.pm10}</span></div>
          </div>
      )}
      </div>
    );
};

const CustomMarker: FC<{ station: StationItem }> = ({ station }) => {
    const [key, setKey] = useState<string | undefined>(undefined);

    const eventHandlers = useMemo(() => ({
        popupopen: () => setKey(Date.now().toString()),
        popupclose: () => setKey(undefined),
    }), []);

    const svgIcon = useMemo(() => L.divIcon({
        html: markerSvg(station.aqi),
        className: "svg-icon",
        iconSize: [30, 42],
        iconAnchor: [12, 40]
    }), [station.aqi]);

    return (
      <Marker
        key={station.id}
        position={station.position}
        icon={svgIcon}
        eventHandlers={eventHandlers}
      >
        <Popup>
          {!!key && <CustomMarkerPopupContent key={key} station={station} />}
        </Popup>
      </Marker>
    );
};

export default function SensorMap() {
    const stations = useStationsList();

    return (
      <MapContainer center={[40.188628, 44.512555]}
        zoom={12}
        scrollWheelZoom
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors,  Air Quality Tiles &copy; <a href="https://www.waqi.info/" target="_blank">waqi.info</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={18}
        />

        {stations?.map(st => (
          <CustomMarker key={st.id} station={st} />
        ))}
      </MapContainer>
    );
};