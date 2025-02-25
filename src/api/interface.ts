import { paths } from "./schema";

export type StationHistoryType = NonNullable<NonNullable<paths['/stations/{id}/history']["get"]["parameters"]["query"]>["type"]>;

export enum StationSource {
    Yerevan = 'yerevan',
    Armaqi = 'armaqi',
}

export interface SensorData {
    timestamp: string;
    temperature: number | null;
    humidity: number | null;
    pm2: number | null;
    pm10: number | null;
    aqi: number;
}

export interface StationItem {
    id: number;
    title: string;
    type: string;
    source: StationSource;
    position: {
        lat: number;
        lng: number;
    },
    data: SensorData;
}
