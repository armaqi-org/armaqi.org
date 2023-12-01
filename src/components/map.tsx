'use client';
import L from 'leaflet';
import { FC, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { useStations, Station } from "@/tools/stations";

const CustomMarker: FC<{ station: Station }> = ({ station }) => {
    const icon = useMemo(() => {
        return L.icon({
            iconUrl: `https://waqi.info/mapicon/${station.aqi}.30.png`,
            iconSize: [30, 42],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            tooltipAnchor: [16, -28],
            shadowSize: [41, 41]
        });
    }, [station.aqi]);

    return (
      <Marker key={station.key} position={station.position}
        icon={icon}
      >
        <Popup>
          {station.title}
        </Popup>
      </Marker>
    );
};

export default function SensorMap() {
    const stations = useStations();

    return (
      <MapContainer center={[40.188628, 44.512555]} zoom={12}
        scrollWheelZoom
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors,  Air Quality Tiles &copy; <a href="https://www.waqi.info/" target="_blank">waqi.info</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={18}
        />

        {stations.map(st => (
          <CustomMarker key={st.key} station={st} />
        ))}
      </MapContainer>
    );
};