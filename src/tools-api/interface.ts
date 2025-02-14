export interface ApiStationItem {
    id: number;
    title: string;
    type: string;
    lat: number;
    lon: number;
    place_id: number;
    data: {
        timestamp: string;
        temperature: number | null;
        humidity: number | null;
        pm2: number | null;
        pm10: number | null;
        aqi: number | null;
    }
}

export interface ApiStationListResponse {
    stations: ApiStationItem[];
    error: string;
}

export interface StationInfo {
    id: number;
    title: string;
    position: {
        lat: number;
        lng: number;
    };
    pm25: number | undefined;
    pm10: number | undefined;
    lastUpdated?: string;
}

export interface StationInfoResponse {
    station?: StationInfo;
}

export enum StationDataType {
    Waqi = 'waqi',
    WaqiFiltered = 'waqi_filtered',
    Config = 'config',
}
