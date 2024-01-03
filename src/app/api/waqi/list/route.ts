import { StationListResponse } from "@/tools-api/interface";
import { waqiLoadBounds } from "@/tools-api/waqi";

const ab = [
    ['41.335628', '43.445744'],
    ['38.803376', '46.532515'],
];

export async function GET(request: Request) {
    const stations = await waqiLoadBounds(ab);
    const out: StationListResponse = {
        stations:
            stations.map(st => ({
                id: Math.abs(st.uid),
                title: st.station.name,
                position: {
                    lat: st.lat,
                    lng: st.lon,
                },
                aqi: Number(st.aqi),
            })),
    };

    return Response.json(out);
}
