export interface StationItem {
    id: number;
    title: string;
    position: {
        lat: number;
        lng: number;
    };
    aqi: number;
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
