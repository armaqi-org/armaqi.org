import { ReactElement } from "react";
import { SourceArmaqi, SourceArmaqiLogo } from "./armaqi";
import { SourceYerevan, SourceYerevanLogo } from "./yerevan";
import { StationSource } from "@/api";

export const stationSourceLogos: Record<StationSource, ReactElement<any>> = {
    [StationSource.Yerevan]: <SourceYerevanLogo />,
    [StationSource.Armaqi]: <SourceArmaqiLogo />,
};

export const stationSourceElements: Record<StationSource, ReactElement<any>> = {
    [StationSource.Yerevan]: <SourceYerevan />,
    [StationSource.Armaqi]: <SourceArmaqi />,
};

export const stationSourceElementsHorizontal: Record<StationSource, ReactElement<any>> = {
    [StationSource.Yerevan]: <SourceYerevan horizontal />,
    [StationSource.Armaqi]: <SourceArmaqi horizontal />,
};
