import { AirtableApi } from "@/tools-api/airtable";
import { StationDataType, StationListResponse } from "@/tools-api/interface";
import { waqiLoadBounds } from "@/tools-api/waqi";

const countryIso = require('country-iso');

const ab = [
    ['41.335628', '43.445744'],
    ['38.803376', '46.532515'],
];

interface StationConfig {
    id?: string;
    title?: string;
    disabled?: boolean;
}

const getStations = async (type: string | null): Promise<StationListResponse> => {
    const out: StationListResponse = {
        stations: [],
        error: ''
    };

    const waqiStations = await waqiLoadBounds(ab);

    out.stations = waqiStations.map(st => ({
        id: Math.abs(st.uid),
        title: st.station.name,
        position: {
            lat: st.lat,
            lng: st.lon,
        },
        aqi: Number(st.aqi),
    })).sort((a, b) => a.id > b.id ? 1 : -1);

    if (type === StationDataType.Waqi) {
        return out;
    }

    await filterStationsWaqi(out);

    if (type === StationDataType.WaqiFiltered) {
        return out;
    }

    await filterStationsConfig(out);

    return out;

};

const filterStationsWaqi = async (out: StationListResponse): Promise<StationListResponse> => {
    out.stations = out.stations.filter(st => countryIso.get(st.position.lat, st.position.lng).includes('ARM'));

    return out;
};

const filterStationsConfig = async (out: StationListResponse): Promise<StationListResponse> => {
    const configStations = await AirtableApi.listTableFields<StationConfig>(AirtableApi.stationsTable, 300)
        .catch((e: Error) => {
            out.error = e.message;
            return [];
        });

    out.stations = out.stations.map(st => {
        const cst = configStations.find(cs => cs.id?.trim() === st.id.toString());

        if (cst?.disabled) {
            st.id = 0;
        }

        const t = cst?.title?.trim();
        if (t) {
            st.title = t;
        }

        return st;
    }).filter(st => st.id);

    return out;
};

export async function GET(request: Request) {
    const url = new URL(request.url ?? '');
    const type = url.searchParams.get('type');
    const out = await getStations(type);

    return Response.json(out);
}

export const dynamic = "force-dynamic";
