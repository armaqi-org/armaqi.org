export interface StationItem {
    id: number;
    title: string;
    type: string;
    lat: number;
    lon: number;
    place_id: number;
    data: {
        timestamp: string;
        pm2: number;
        pm10: number;
        aqi: number;
    }
}

export interface StationListResponse {
    stations: StationItem[];
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
