import dynamic from "next/dynamic";

const Map = dynamic(() => import("../components/map"), { ssr: !!false });

export const MapModule = () => (
  <div id="map" style={{ height:' 480px', position: 'relative' }}>
    <Map key="map" />
  </div>
);