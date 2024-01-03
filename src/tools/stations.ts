import { useEffect, useState } from "react";
import { StationItem, StationInfo, stationsApi } from "@/tools/stations-api";

export type { StationItem, StationInfo };

export const useStationsList = (): StationItem[] | undefined => {
    const [markers, setMarkers] = useState<StationItem[] | undefined>(undefined);

    useEffect(() => {
        stationsApi.loadList(setMarkers);

        return () => stationsApi.unloadList(setMarkers);
    }, []);

    return markers;
};

export const useStation = (id: number): StationInfo | undefined => {
    const [info, setInfo] = useState<StationInfo | undefined>(undefined);

    useEffect(() => {
        stationsApi.loadInfo(id, setInfo);

        return () => stationsApi.unloadInfo(id, setInfo);
    }, [id]);

    return info;
};