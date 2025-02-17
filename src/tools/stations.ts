import { useCallback, useEffect, useState } from "react";
import { StationItem, StationInfo, StationsApi } from "@/tools/stations-api";

export type { StationItem, StationInfo };

export const useStationsList = (staticStations: StationItem[]): {
    loading: boolean;
    error: boolean;
    paused: boolean;
    stations: StationItem[];
    refresh(): void;
} => {
    const [stations, setStations] = useState<StationItem[]>(staticStations || []);
    const [loading, setLoading] = useState(true);
    const [paused, setPaused] = useState(false);
    const [tick, setTick] = useState(0);
    const noRefresh = true;

    const refresh = useCallback(() => {
        setLoading(true);
        setPaused(false);
        setTick(Date.now());
    }, []);

    useEffect(() => {
        if (!staticStations?.length) {
            StationsApi.loadStations().then(
                stations => {
                    setStations(stations ?? []);
                    setLoading(false);
                }
            );
        } else {
            setLoading(false);
        }
    }, [tick, staticStations]);

    useEffect(() => {
        if (paused || noRefresh) {
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
    }, [refresh, paused, noRefresh]);

    useEffect(() => {
        const cb = () => {
            if (!noRefresh && paused) {
                refresh();
            }
        };

        window.addEventListener('focus', cb);

        return () => {
            window.removeEventListener('focus', cb);
        };
    }, [paused, refresh, noRefresh]);

    return {
        loading,
        error: false,
        paused,
        stations,
        refresh,
    };
};
