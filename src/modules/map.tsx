import dynamic from "next/dynamic";

const Map = dynamic(() => import("../components/map"), { ssr:false });

export const MapModule = () => (
  <div style={{ height:' 480px', position: 'relative' }}>
    <Map />
  </div>
);