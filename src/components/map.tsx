'use client';
import L from 'leaflet';
import { useTranslations } from "next-intl";
import { FC, ReactElement, useCallback, useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { AqiCloud, getAqiCloudSvg } from "@/components/clouds/aqi-cloud";
import { SourceArmaqi } from "@/components/sources/armaqi";
import { SourceUnknown } from "@/components/sources/unknown";
import { SourceYerevan } from "@/components/sources/yerevan";
import { Spinner } from "@/components/spinner";
import { useStationsList, StationItem } from "@/tools/stations";
import { StationSource } from "@/tools/stations-api";
import { getTimeAgo } from "@/tools/time-ago";

const sourceLogos: Record<StationSource, ReactElement> = {
    [StationSource.Unknown]: <SourceUnknown />,
    [StationSource.Yerevan]: <SourceYerevan />,
    [StationSource.Armaqi]: <SourceArmaqi />,
};

const formatTemperature = (val: number | null) => val ? `${val > 0 ? '+' : ''}${Math.round(val)} C` : '';
const formatHumidity = (val: number | null) => val ? `${Math.round(val)}%` : '';

const CustomMarkerPopupContent: FC<{ station: StationItem }> = ({ station }) => {
    const t = useTranslations('Map');
    const [showId, setShowId] = useState(false);
    const getTimeAgoString = useCallback((dt: Date) => {
        const [counter, mode] = getTimeAgo(dt, new Date());

        return t('ago_' + mode, { counter });
    }, [t]);
    const data = useMemo(() => ({
        title: station.title,
        loading: false,
        pm25: station.data.pm2 ? Math.ceil(station.data.pm2) : '',
        pm10: station.data.pm10 ? Math.ceil(station.data.pm10) : '',
        temperature: formatTemperature(station.data.temperature),
        humidity: formatHumidity(station.data.humidity),
        updated: getTimeAgoString(new Date(station.data.timestamp)),
    }), [station, getTimeAgoString]);

    const skeletonClasses = data.loading ? 'bg-gray-200 h-[10px] rounded-full w-12 inline-block animate-pulse' : undefined;

    return (
      <div>
        <div className="flex flex-row items-end" style={{ minWidth: '150px' }}>
          <div className="flex-1 mb-2">
            <div
              className="font-semibold text-sm text-armaqi-base"
              onDoubleClick={() => setShowId(true)}
            >
              {data.title}
            </div>

            {(!!data.updated || showId) && (
              <div className="flex flex-row justify-between mr-2">
                {!!data.updated && (
                <div className="pb-0.5 text-xs text-armaqi-base">
                  <span className="mr-2">{t('lastUpdated')}:</span>
                  <span className="decoration-dotted underline mr-2 font-bold">{data.updated}&nbsp;</span>
                </div>
                )}

                {showId && <div className="text-neutral-500 text-xs">id: {station.id}</div>}
              </div>
              )}
          </div>
          <div className="py-2">
            {sourceLogos[station.source]}
          </div>
        </div>

        <div className="grid grid-cols-3 grid-rows-2 gap-1 text-armaqi-base w-100">
          <div className="row-span-2"><AqiCloud aqi={station.data.aqi} /></div>
          <div><span className="font-bold">PM2.5</span>: <span className={skeletonClasses}>{data.pm25}</span></div>
          <div className="col-start-2 row-start-2"><b>PM10</b>: <span className={skeletonClasses}>{data.pm10}</span></div>
          <div className="col-start-3 row-start-1 text-center">{data.temperature}</div>
          <div className="col-start-3 row-start-2 text-center">{data.humidity}</div>
        </div>

        <div className="mt-2 pb-0.5 text-xs" />
        <div className="pb-0.5 text-xs" />
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
        html: getAqiCloudSvg(station.data.aqi, 30),
        className: "svg-icon",
        iconSize: [30, 42],
        iconAnchor: [16, 16]
    }), [station.data.aqi]);

    const position = useMemo(() => ({
        lat: station.lat,
        lng: station.lon
    }), [station.lon, station.lat]);

    return (
      <Marker
        key={station.id}
        position={position}
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
    const {
        loading,
        paused,
        refresh,
        stations,
    } = useStationsList();

    return (
      <div className="relative w-full h-full">

        <MapContainer center={[40.188628, 44.512555]}
          zoom={12}
          scrollWheelZoom
          className="w-full h-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            maxZoom={18}
          />

          {stations?.map(st => (
            <CustomMarker key={st.id} station={st} />
        ))}
        </MapContainer>

        {(loading || paused) && (
          <div className="absolute inset-0 flex justify-center items-center z-top bg-white bg-opacity-25">
              {loading ? <Spinner /> : (
                <button
                  className="flex items-center px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-neutral-400 rounded-lg hover:bg-neutral-300 focus:outline-none focus:ring focus:ring-neutral-300 focus:ring-opacity-80"
                  onClick={refresh}
                  aria-label="Refresh"
                >
                  <svg className="w-5 h-5 mx-1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path fillRule="evenodd"
                      d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              )}
          </div>
        )}
      </div>
    );
};