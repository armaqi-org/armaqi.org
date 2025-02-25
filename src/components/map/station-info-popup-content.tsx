import Image from "next/image";
import { FC, useMemo, useState } from "react";
import { StationHistoryType, StationItem } from "@/api";
import { PeriodHistoryStationChart } from "@/components/charts/period-history-station";
import { AqiCloud } from "@/components/clouds/aqi-cloud";
import { DataIcon } from "@/components/data/data-icon";
import { stationSourceElements } from "@/components/sources/components";
import { useTranslate } from "@/providers/translate-provider";
import { formatHumidity, formatTemperature } from "@/tools/format";
import { getTimeAgoString } from "@/tools/time-ago";


const StationHistory: FC<{ id: number }> = ({ id }) => {
    const [type, setType] = useState<StationHistoryType>('hour');
    const [loading, setLoading] = useState(!!id);

    return (
      <div className="border border-armaqi-pink rounded mt-2">
        <PeriodHistoryStationChart stationId={id} />
      </div>
    );
};

export const StationInfoPopupContent: FC<{
    station: StationItem;
}> = ({ station }) => {
    const [showId, setShowId] = useState(false);
    const t = useTranslate();
    const data = useMemo(() => ({
        title: station.title,
        loading: false,
        pm25: station.data.pm2 ? Math.ceil(station.data.pm2) : '',
        pm10: station.data.pm10 ? Math.ceil(station.data.pm10) : '',
        temperature: formatTemperature(station.data.temperature),
        humidity: formatHumidity(station.data.humidity),
        updated: getTimeAgoString(new Date(station.data.timestamp), t),
    }), [station, t]);

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
                <span className="mr-2">{t('Map.lastUpdated')}:</span>
                <span className="decoration-dotted underline mr-2 font-bold">{data.updated}&nbsp;</span>
              </div>
              )}

              {showId && <div className="text-neutral-500 text-xs">id: {station.id}</div>}
            </div>
            )}
          </div>
          <div className="py-2">
            {stationSourceElements[station.source]}
          </div>
        </div>

        <div className=" text-armaqi-base w-100 flex flex-row">
          <div className="mr-4"><AqiCloud aqi={station.data.aqi} /></div>

          <div className="grid grid-cols-2 grid-rows-2 gap-2 flex-1">
            <div><span className="font-bold">PM2.5</span>: {data.pm25 ? data.pm25 + ' µg/m³' : '-'}</div>
            <div className="row-start-2"><b>PM10</b>: {data.pm10 ? data.pm10 + ' µg/m³' : '-'}</div>
            <DataIcon
              className="ml-5 col-start-2 row-start-1"
              icon={<Image width={7} height={15} src="/icons/temperature.svg" alt="temperature" />}
              data={data.temperature}
            />
            <DataIcon
              className="ml-5 col-start-2 row-start-2"
              icon={<Image width={8} height={15} src="/icons/humidity.svg" alt="humidity" />}
              data={data.humidity}
            />
          </div>

        </div>

        <StationHistory id={station.id} />
      </div>
    );
};
