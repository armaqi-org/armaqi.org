import { useCallback, useEffect, useMemo, useState } from "react";
import { StationItem, ApiService, StationSource } from "@/api";
import { useStaticStations } from "@/providers/stations-provider";

export const useStationsList = (): {
    loading: boolean;
    error: boolean;
    paused: boolean;
    stations: StationItem[];
    sources: StationSource[];
    toggleSource(source: StationSource): void;
    refresh(): void;
} => {
    const staticStations = useStaticStations();
    const [stations, setStations] = useState<StationItem[]>(staticStations || []);
    const [loading, setLoading] = useState(true);
    const [paused, setPaused] = useState(false);
    const [tick, setTick] = useState(0);
    const [sources, setSources] = useState([StationSource.Armaqi, StationSource.Yerevan]);

    let noRefresh = false;

    if (process.env.NODE_ENV == "development"){
        noRefresh = true;
    }

    const filteredStations = useMemo(() => stations.filter(st => sources.includes(st.source)), [stations, sources]);
    const refresh = useCallback(() => {
        setLoading(true);
        setPaused(false);
        setTick(Date.now());
    }, []);
    const toggleSource = useCallback((source: StationSource) => {
        setSources(current =>
            current.includes(source)
                ? current.filter(c => c !== source)
                : [...current, source]
        );
    }, []);

    useEffect(() => {
        if (!staticStations?.length) {
            ApiService.loadStations().then(
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
        }, 60000);

        return () => clearInterval(interval);
    }, [refresh, paused, noRefresh]);

    useEffect(() => {
        const cb = () => {
            if (!paused || !noRefresh) {
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
        stations: filteredStations,
        sources,
        toggleSource,
        refresh,
    };
};
