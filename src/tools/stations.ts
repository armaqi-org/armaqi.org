import { useEffect, useState } from "react";
import stationsData from "@/stations";

export interface Station {
    key: string;
    title: string;
    position: {
        lat: number;
        lng: number;
    };
    aqi: number;
}

export const useStations = (): Station[] => {
    const [markers, setMarkers] = useState<Station[]>([]);

    useEffect(() => {
        Promise.all(stationsData.filter(m => !m.disabled).map(m =>
            fetch(`https://api.waqi.info/feed/${m.key}/?token=64d4711d9af20e78493bc2c6d6d76bccf9fc0d26`)
                .then(response => response.json())
                .then(data => ({
                    key: m.key,
                    title: m.title || data.data.city.name,
                    position: {
                        lat: data.data.city.geo[0] as any,
                        lng: data.data.city.geo[1],
                    },
                    aqi: data.data.aqi
                }))
                .catch(() => undefined)
        ))
            .then(items => items.filter(Boolean).map(i => i!))
            .then(items => setMarkers(items));
    }, []);
    
    return markers;
};