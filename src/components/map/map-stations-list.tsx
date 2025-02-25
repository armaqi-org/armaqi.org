'use client';
import classNames from "classnames";
import { FC, Fragment, ReactElement } from "react";
import { StationSource } from "@/api";
import { CustomMarker } from "@/components/map/custom-marker";
import { SensorMap } from "@/components/map/map";
import { StationInfoPopupContent } from "@/components/map/station-info-popup-content";
import { stationSourceLogos } from "@/components/sources/components";
import { Spinner } from "@/components/spinner";
import { useTranslate } from "@/providers/translate-provider";
import { useStationsList } from "@/tools/stations";
import "leaflet/dist/leaflet.css";

const StationSourceToggle: FC<{
    active: boolean;
    title: string;
    logo: ReactElement;
    onClick(): void;
}> = ({ active, logo, onClick, title }) => (
  <div
    className="bg-white rounded-xl mb-2 shadow-xl cursor-pointer"
    onClick={onClick}
  >
    <div className={classNames(
            "flex flex-row  items-center justify-end bg-white px-3 py-1 border-2 rounded-xl",
            "text-sm text-armaqi-base font-semibold uppercase",
            {
                'border-armaqi-base': active,
                'border-white opacity-70': !active,
            }
    )}
    >
      <span className="mr-2 hidden md:inline-block">{title}</span>
      {logo}
    </div>
  </div>
);

const center = { lat: 40.188628, lng: 44.512555 };

export function StationsListMap ({ className }: {
    className?: string;
}) {
    const {
        loading,
        paused,
        refresh,
        sources,
        stations,
        toggleSource
    } = useStationsList();
    const t = useTranslate();

    return (
      <SensorMap
        center={center}
        className={className}
        markers={
          // eslint-disable-next-line react/jsx-no-useless-fragment
          <Fragment>
            {stations?.map(st => (
              <CustomMarker key={st.id} station={st} contentComponent={StationInfoPopupContent} />
            ))}
          </Fragment>
        }
        live
      >
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
        <div className="flex flex-col absolute z-top right-3 bottom-3 items-stretch">
          {[StationSource.Yerevan, StationSource.Armaqi].map(source => (
            <StationSourceToggle
              key={source}
              title={t('Map.source.' + source)}
              logo={stationSourceLogos[source]}
              active={sources.includes(source)}
              onClick={() => toggleSource(source)}
            />
          ))}
        </div>
      </SensorMap>
    );
}
