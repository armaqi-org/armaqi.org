import L from "leaflet";
import { FC, useMemo, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import { StationItem } from "@/api";
import { getAqiCloudSvg } from "@/components/clouds/aqi-cloud";

export type CustomMarkerPopupContentType = FC<{station: StationItem}>;

const empty = () => <span />;
export const CustomMarker: FC<{
    station: StationItem;
    contentComponent?: CustomMarkerPopupContentType;
    size?: number;
}> = ({ contentComponent, size = 30, station }) => {
    const [key, setKey] = useState<string | undefined>(undefined);
    const hasPopup = !!contentComponent;
    const CustomMarkerPopupContent = contentComponent ?? empty;

    const eventHandlers = useMemo(() => hasPopup ? ({
        popupopen: () => setKey(Date.now().toString()),
        popupclose: () => setKey(undefined),
    }) : undefined, [hasPopup]);

    const svgIcon = useMemo(() => L.divIcon({
        html: getAqiCloudSvg(station.data.aqi, size),
        className: "svg-icon",
        iconSize: [30, 42],
        iconAnchor: [16, 16]
    }), [station.data.aqi, size]);

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
