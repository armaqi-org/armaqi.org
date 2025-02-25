import { client } from "./client";
import {
    StationItem,
    StationHistoryType,
    StationSource,
    SensorData,
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

    static async loadStationHistory(id: number, type: StationHistoryType): Promise<SensorData[]> {
        const { data } = await client.GET("/stations/{id}/history", {
            params: { path: { id }, query: { type } },
        });

        return data?.map(mapStationData) ?? [];
    }

    static async loadPlaceHistory(id: number, type: StationHistoryType): Promise<SensorData[]> {
        const { data } = await client.GET("/places/{id}", {
            params: { path: { id }, query: { type } },
        });

        return data?.map(mapPlaceData) ?? [];
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

const mapStationData = (data?: components["schemas"]["StationData"]): SensorData => {
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

const mapPlaceData = (data?: components["schemas"]["PlaceHistoryValue"]): SensorData => {
    const { last_update, pm10, pm25 } = data ?? {};
    const aqi = Math.floor(data?.aqi ?? 0);

    return {
        aqi,
        timestamp: last_update ?? '',
        pm2: pm25 ?? null,
        pm10: pm10 ?? null,
        humidity: null,
        temperature: null,
    };
};

const armaqiSources = ['data.sensor.community', 'armaqi'];
const mapSource = (type: string): StationSource => {
    if (armaqiSources.includes(type)) {
        return StationSource.Armaqi;
    }

    return StationSource.Yerevan;
};
