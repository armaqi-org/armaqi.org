import { notFound } from "next/navigation";
import { ReactElement } from "react";
import { ApiService, StationSource } from "@/api";
import PageStationInfo from "@/components/pages/page-station-info";
import { SourceArmaqi } from "@/components/sources/armaqi";
import { SourceYerevan } from "@/components/sources/yerevan";
import { getDictionary } from "@/dictionaries";
import { i18n, Locale } from "@/i18n-config";
import { MapStationModule } from "@/modules/map-station";
import StationProvider from "@/providers/station-provider";
import { parseStationUrl } from "@/tools/station-url";
import { getTimeAgoString } from "@/tools/time-ago";

const sourceElements: Record<StationSource, ReactElement<any>> = {
    [StationSource.Yerevan]: <SourceYerevan horizontal />,
    [StationSource.Armaqi]: <SourceArmaqi horizontal />,
};

export default async function StationPage(props: {
    params: Promise<{ lang: Locale; city: string; station: string }>;
}) {
    const { city, lang, station: stationUrlKey } = await props.params;
    const dict = (await getDictionary(lang));

    if (!i18n.locales.includes(lang) || !['yerevan'].includes(city)) {
        return notFound();
    }

    const stationUrl = parseStationUrl(stationUrlKey);

    if (!stationUrl) {
        return notFound();
    }

    const station = await ApiService.loadStation(stationUrl.id);

    if (!station) {
        return notFound();
    }

    const lastUpdated = getTimeAgoString(new Date(station.data.timestamp), dict.Map as any);

    return (
      <StationProvider station={station}>
        <div className="w-100">
          <div className="max-w-7xl mx-auto md:py-4">

            <div className="grid grid-auto-rows-1/2 md:grid-cols-[30%_70%] md:grid-rows-[auto_auto_auto] md:gap-6 grid-cols-1 grid-rows-[auto_auto_auto_auto]">
              <div className="md:col-span-2 col-start-1 md:row-start-1 row-start-2">
                <div className="font-bold text-2xl">
                  {station.title}
                </div>
                <div className="flex flex-row items-end">
                  {!!lastUpdated && (
                    <div className="mr-2 text-xs text-armaqi-base">
                      <span className="mr-2">{dict.Map.lastUpdated}:</span>
                      <span className="decoration-dotted underline mr-2 font-bold">{lastUpdated}&nbsp;</span>
                    </div>
                )}
                  {sourceElements[station.source]}
                </div>
              </div>

              <div className="col-start-1 row-start-1 md:col-start-2 md:row-start-2">
                <MapStationModule />
              </div>

              <PageStationInfo
                className="col-start-1 row-start-3 md:col-start-1 md:row-start-2"
                dict={dict}
                station={station}
              />

              <div className="md:col-span-2 row-start-4 md:row-start-3 border">stat</div>
            </div>
          </div>
        </div>
      </StationProvider>
    );
}

