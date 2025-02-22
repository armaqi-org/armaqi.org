import dynamic from "next/dynamic";

const PageStationMap = dynamic(() => import("../components/pages/page-station-map"), { ssr: !!false });

export const MapStationModule = () => (
  <div className="h-[50vh] md:h-[800px]">
    <PageStationMap key="map" />
  </div>
);