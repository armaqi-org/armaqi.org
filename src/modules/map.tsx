import dynamic from "next/dynamic";
import { NextIntlClientProvider, useMessages } from "next-intl";

const Map = dynamic(() => import("../components/map"), { ssr:false });

export const MapModule = () => (
  <div id="map" style={{ height:' 480px', position: 'relative' }}>
    <NextIntlClientProvider messages={{ Map: useMessages().Map }}>
      <Map key="map" />
    </NextIntlClientProvider>
  </div>
);