import { fetchApi } from "@/tools/api";
import {
    StationInfo,
    ApiStationItem,
} from "@/tools-api/interface";

export enum StationSource {
    Unknown = 'Unknown',
    Yerevan = 'Yerevan.am',
    Armaqi = 'Armaqi',
}

export interface StationItem extends Omit<ApiStationItem, 'data'> {
    source: StationSource;
    data: ApiStationItem['data'] & {
        aqi: number;
    }
}

export type { StationInfo };

export class StationsApi {
    static async loadStations(): Promise<StationItem[]> {
         const items = await fetchApi<ApiStationItem[]>('https://api.beta.armaqi.org/api/public/stations');

         return items.map(item => ({
            ...item,
             data: {
                ...item.data,
                 aqi: Math.floor(item.data.aqi ?? 0),
             },
             source: mapSource(item.type),
         })).filter(item => item.data.aqi > 0);
    }
}

const mapSource = (type: string): StationSource => {
    if (type === 'data.sensor.community') {
        return StationSource.Armaqi;
    }
    if (type === 'armaqi') {
        return StationSource.Armaqi;
    }
    if (type === 'gis.yerevan.am') {
        return StationSource.Yerevan;
    }
    return StationSource.Unknown;
};
export const stationsApi = new StationsApi();
