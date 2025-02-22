import { client } from "./client";
import {
    StationItem,
    StationHistoryType,
    StationSource, StationData,
} from "./interface";
import { components } from "./schema";

export class ApiService {
    static async loadStations(): Promise<StationItem[]> {
         const { data } = await client.GET("/stations");

         return data?.map(mapStation).filter(Boolean).map(item => item!) ?? [];
    }
    static async loadStation(id: number): Promise<StationItem | undefined> {
        // ToDo: get station api
        const stations = await ApiService.loadStations();

        return stations.find(item => item.id === id);
    }

    static async loadStationHistory(id: number, type: StationHistoryType): Promise<StationData[]> {
        const { data } = await client.GET("/stations/{id}/history", {
            params: { path: { id }, query: { type } },
        });

        return data?.map(mapStationData) ?? [];
    }
}

const mapStation = (item: components["schemas"]["Station"]): StationItem | undefined => {
    const { id, lat, lon, title, type } = item;
    if (!id || !type || !title || !lat || !lon) {
        return undefined;
    }

    const data = mapStationData(item.data);

    if (data.aqi <= 0 || !data.timestamp) {
        return undefined;
    }

    return {
        id,
        type,
        title,
        position: { lat, lng: lon },
        source: mapSource(type),
        data,
    };
};

const mapStationData = (data?: components["schemas"]["StationData"]): StationItem['data'] => {
    const { humidity, pm2, pm10, temperature, timestamp } = data ?? {};
    const aqi = Math.floor(data?.aqi ?? 0);


    return {
        aqi,
        timestamp: timestamp ?? '',
        pm2: pm2 ?? null,
        pm10: pm10 ?? null,
        humidity: humidity ?? null,
        temperature: temperature ?? null,
    };
};

const armaqiSources = ['data.sensor.community', 'armaqi'];
const mapSource = (type: string): StationSource => {
    if (armaqiSources.includes(type)) {
        return StationSource.Armaqi;
    }

    return StationSource.Yerevan;
};
