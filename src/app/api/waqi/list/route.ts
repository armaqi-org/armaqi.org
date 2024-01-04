import { AirtableApi } from "@/tools-api/airtable";
import { StationListResponse } from "@/tools-api/interface";
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

export async function GET(request: Request) {
    const stations = await waqiLoadBounds(ab);
    let error = '';
    const configStations = await AirtableApi.listTableFields<StationConfig>(AirtableApi.stationsTable, 0)
        .catch((e: Error) => {
            error = e.message;
            return [];
        });
    const configStations2 = await AirtableApi.listTableFields2<StationConfig>(AirtableApi.stationsTable)
        .catch((e: Error) => {
            error = e.message;
            return [];
        });
    const out: StationListResponse & any = {
        stations:
            stations?.map(st => {
                let id = Math.abs(st.uid);
                const cst = configStations.find(cs => cs.id?.trim() === id.toString());

                if (cst?.disabled || !countryIso.get(st.lat, st.lon).includes('ARM')) {
                    id = 0;
                }

                return ({
                    id,
                    title: cst?.title?.trim() || st.station.name,
                    position: {
                        lat: st.lat,
                        lng: st.lon,
                    },
                    aqi: Number(st.aqi),
                });
            }).filter(st => st.id) ?? [],
        configStations,
        configStations2,
        error,
    };

    return Response.json(out);
}

export const dynamic = "force-dynamic";
