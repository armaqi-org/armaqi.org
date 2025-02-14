import { fetchApi } from "@/tools/api";
import {
    StationInfo,
    ApiStationItem,
} from "@/tools-api/interface";


type StationItemCB = (stations?: StationItem[]) => void;
type StationInfoCB = (info?: StationInfo) => void;

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

class KeyValueStorage {
    private kv: Record<string, {
        loading: boolean;
        value: any | undefined;
        valueExpire?: number;
        cache?: number;
        loader: () => Promise<any>;
        cbs: ((value: any) => void)[];
    }> = {};

    hasKey(key: string) {
        return !!this.kv[key];
    }

    addKey(key: string, loader: () => Promise<any>, cache?: number) {
        this.kv[key] = {
            loading: false,
            value: undefined,
            loader,
            cache,
            cbs: [],
        };
    }

    addListener(key: string, cb: (value: any) => void) {
        if (!this.hasKey(key)) {
            return;
        }

        this.kv[key].cbs.push(cb);

        if (this.isLoading(key)) {
            return;
        }

        if (this.hasCachedValue(key)) {
            cb(this.getValue(key));
            return;
        }

        this.loadKeyValue(key).catch(() => {});
    }

    removeListener(key: string, cb: (value: any) => void) {
        if (!this.hasKey(key)) {
            return;
        }

        this.kv[key].cbs = this.kv[key].cbs.filter(item => item !== cb);
    }

    notifyListeners(key: string) {
        const kv = this.kv[key];
        if (!kv) {
            return;
        }

        kv.cbs.forEach(cb => cb(kv.value));
    }

    isLoading(key: string) {
        return !!this.kv[key]?.loading;
    }

    hasCachedValue(key: string) {
        const kv = this.kv[key];

        return !!kv?.valueExpire && kv.valueExpire > Date.now();
    }

    getValue<T = any>(key: string): T | undefined {
        return this.kv[key]?.value;
    }

    setValue<T = any>(key: string, value: T | undefined) {
        const kv = this.kv[key];
        if (kv) {
            kv.value = value;
            kv.cbs.forEach(cb => cb(value));
            kv.valueExpire = kv.cache ? (Date.now() + kv.cache) : undefined;
        }
    }

    private async loadKeyValue(key: string) {
        const kv = this.kv[key];

        if (!kv) {
            return;
        }

        kv.loading = true;

        let value: any | undefined = undefined;
        try {
            value = await kv.loader();
        } catch {}

        kv.loading = false;
        this.setValue(key, value);
    }
}

const listKey = 'list';
const infoKey = (id: number) => id.toString();

// Don't want to bring any dependency like mobx for now
export class StationsApi {
    private kv = new KeyValueStorage();

    loadList(cb: StationItemCB) {
        if (!this.kv.hasKey(listKey)) {
            this.kv.addKey(listKey, () => this.loadStations());
        }

        this.kv.addListener(listKey, cb);
    }

    unloadList(cb: StationItemCB) {
        this.kv.removeListener(listKey, cb);
    }

    unloadInfo(id: number, cb: StationInfoCB) {
        this.kv.removeListener(infoKey(id), cb);
    }

    async loadStations(): Promise<StationItem[]> {
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
