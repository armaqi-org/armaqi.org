import { fetchApi } from "@/tools/api";
import { StationInfo, StationItem, StationListResponse, StationInfoResponse } from "@/tools-api/interface";


type StationItemCB = (stations?: StationItem[]) => void;
type StationInfoCB = (info?: StationInfo) => void;

export type { StationInfo, StationItem };

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
class StationsApi {
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

    loadInfo(id: number, cb: StationInfoCB) {
        if (!this.kv.hasKey(infoKey(id))) {
            this.kv.addKey(infoKey(id), () => this.loadStationInfo(id), 1000 * 60);
            this.kv.addListener(infoKey(id), (info: StationInfo) => {
                const stations = this.kv.getValue<StationItem[]>(listKey);

                this.kv.setValue(listKey, stations?.map(st => st.id === id ? { ...st, aqi: info.pm25 } : st));
            });
        }

        this.kv.addListener(infoKey(id), cb);
    }

    unloadInfo(id: number, cb: StationInfoCB) {
        this.kv.removeListener(infoKey(id), cb);
    }

    private async loadStations() {
        return fetchApi<StationListResponse>(`/api/waqi/list?nc=${Date.now()}`, { next: { revalidate: 0 } })
            .then((data) => data.stations);
    }

    private async loadStationInfo(id: number) {
        return fetchApi<StationInfoResponse>(`/api/waqi/info?id=${id}&nc=${Date.now()}`, { next: { revalidate: 0 } })
            .then(data => data.station);
    }
}

export const stationsApi = new StationsApi();
