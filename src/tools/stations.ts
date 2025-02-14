import { useCallback, useEffect, useState } from "react";
import { StationItem, StationInfo, stationsApi } from "@/tools/stations-api";

export type { StationItem, StationInfo };

export const useStationsList = (): {
    loading: boolean;
    error: boolean;
    paused: boolean;
    stations: StationItem[];
    refresh(): void;
} => {
    const [stations, setStations] = useState<StationItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [paused, setPaused] = useState(false);
    const [tick, setTick] = useState(0);

    const refresh = useCallback(() => {
        setLoading(true);
        setPaused(false);
        setTick(Date.now());
    }, []);

    useEffect(() => {
        const cb = (stations: StationItem[] | undefined) => {
            setStations(stations ?? []);
            setLoading(false);
        };

        stationsApi.loadList(cb);

        return () => stationsApi.unloadList(cb);
    }, [tick]);

    useEffect(() => {
        if (paused) {
            return;
        }

        const interval = setInterval(() => {
            if (paused) {
                return;
            }

            if (!document.hasFocus()) {
                setPaused(true);
            } else {
                refresh();
            }
        }, 4 * 60000);

        return () => clearInterval(interval);
    }, [refresh, paused]);

    useEffect(() => {
        const cb = () => {
            if (paused) {
                refresh();
            }
        };

        window.addEventListener('focus', cb);

        return () => {
            window.removeEventListener('focus', cb);
        };
    }, [paused, refresh]);

    return {
        loading,
        error: false,
        paused,
        stations,
        refresh,
    };
};
