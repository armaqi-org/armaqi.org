'use client';
import L from 'leaflet';
import { useTranslations } from "next-intl";
import { FC, useCallback, useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { Spinner } from "@/components/spinner";
import { getScaleColor } from "@/tools/quality-scale";
import { useStationsList, StationItem, useStation } from "@/tools/stations";
import { getTimeAgo } from "@/tools/time-ago";

/* eslint-disable max-len */
const cloudMarkerSvg = (value: number) => {
    const [color, textColor] = getScaleColor(value);

    return `
<div class="relative">
  <svg viewBox="0 0 74 84" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M60.6597 17.1505C59.4312 14.2368 57.2323 11.6498 54.5204 10.0367C51.7703 8.32667 48.3312 7.55286 45.0609 7.83459C43.2264 5.44938 40.6891 3.40585 37.7923 2.12215C34.1163 0.493234 29.891 0.101061 26.2326 0.900717C22.5596 1.63303 18.8594 3.68138 16.1718 6.64183C14.0777 8.94852 12.6124 11.7935 11.9117 14.6743C9.00882 15.5455 6.18485 17.3256 4.14812 19.7644C1.52967 22.8997 0.240574 27.0913 0.543445 30.7837C0.730251 34.4835 2.56126 38.4744 5.57036 41.248C8.59086 44.0323 12.7736 45.5675 16.5402 45.4977H34.5V73.9162C32.7347 74.6875 31.5 76.449 31.5 78.5C31.5 81.2614 33.7386 83.5 36.5 83.5C39.2614 83.5 41.5 81.2614 41.5 78.5C41.5 76.449 40.2653 74.6875 38.5 73.9162V45.4977H59.0292C62.8634 45.5422 66.8315 43.8844 69.4652 41.1349C72.1462 38.4418 73.6747 34.4815 73.484 30.7117C73.3671 26.9391 71.5212 23.1127 68.6304 20.6403C66.4649 18.7149 63.5861 17.4821 60.6597 17.1505Z" fill="white" stroke="black" stroke-miterlimit="1.1547"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M58.7486 20.1955C58.0778 17.0485 55.9325 14.0429 53.1714 12.3898C50.4495 10.6625 46.7876 10.0939 43.6633 10.9078C42.1502 8.21655 39.5391 5.7773 36.4499 4.3897C33.3273 2.98713 29.7222 2.66168 26.6789 3.34343C23.6205 3.95407 20.4589 5.71278 18.1771 8.26051C15.9214 10.7791 14.5301 14.0638 14.2432 17.1345C11.3105 17.4867 8.09995 19.1747 5.97282 21.7564C3.82076 24.3684 2.78286 27.889 3.03794 30.8504C3.17044 33.8197 4.65773 37.1761 7.13136 39.4872C9.60807 41.8013 13.0678 43.0622 16.0478 42.9976H59.5446C62.5556 43.0386 65.7441 41.6854 67.8032 39.4921C69.9168 37.3541 71.1457 34.1249 70.9861 31.1256C70.9043 28.1233 69.4199 25.0027 67.1416 23.0406C64.9429 21.0459 61.714 19.9542 58.7486 20.1955Z" fill="${color}"/>
  </svg>
  <div
    class="absolute inset-0 flex justify-center items-start ${textColor} font-semibold pt-1"
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
    const t = useTranslations('Map');
    const [showId, setShowId] = useState(false);
    const getTimeAgoString = useCallback((dt: Date) => {
        const [counter, mode] = getTimeAgo(dt, new Date());

        return t('ago_' + mode, { counter });
    }, [t]);
    const data = useMemo(() => ({
        title: station.title,
        loading: !info,
        pm25: info ? info?.pm25 ?? station.aqi : '',
        pm10: info ? info?.pm10 ?? '-' : '',
        updated: info ? (info.lastUpdated ? getTimeAgoString(new Date(info.lastUpdated)) : '-') : '',
    }), [station, info, getTimeAgoString]);

    const skeletonClasses = data.loading ? 'bg-gray-200 h-[10px] rounded-full w-12 inline-block animate-pulse' : undefined;

    return (
      <div>
        <div
          className="font-semibold text-sm"
          style={{ minWidth: '150px' }}
          onDoubleClick={() => setShowId(true)}
        >
          {data.title}
        </div>
        {showId && <div className="text-neutral-500 text-xs">id: {station.id}</div>}

        <div className="mt-2 pb-0.5 text-xs"><b>PM2.5</b>: <span className={skeletonClasses}>{data.pm25}</span></div>
        <div className="pb-0.5 text-xs"><b>PM 10</b>: <span className={skeletonClasses}>{data.pm10}</span></div>
        <div className="pb-0.5 text-xs"><b>{t('lastUpdated')}</b>: <span className={skeletonClasses}>{data.updated}</span></div>
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
        html: cloudMarkerSvg(station.aqi),
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
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors,  Air Quality Tiles &copy; <a href="https://www.waqi.info/" target="_blank">waqi.info</a>'
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