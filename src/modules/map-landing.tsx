import dynamic from "next/dynamic";

const MapLanding = dynamic(() => import("../components/landing/landing-map"), { ssr: !!false });

export const MapLandingModule = () => (
  <div id="map" style={{ height:' 480px', position: 'relative' }}>
    <MapLanding key="map" />
  </div>
);