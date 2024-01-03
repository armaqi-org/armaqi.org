import { NextApiRequest } from "next";
import { StationInfoResponse } from "@/tools-api/interface";
import { waqiLoadInfo } from "@/tools-api/waqi";

export async function GET(request: NextApiRequest) {
    const url = new URL(request.url ?? '');
    const itemId = url.searchParams.get('id');

    if (!itemId) {
        return Response.json({});
    }

    const data = await waqiLoadInfo(itemId);
    const out: StationInfoResponse = {
        station: data ? {
            id: Math.abs(data.idx),
            title: data.city.name,
            position: {
                lat: data.city.geo[0],
                lng: data.city.geo[1],
            },
            pm25: data.iaqi?.pm25?.v,
            pm10: data.iaqi?.pm10?.v,
        } : undefined
    };

    return Response.json(out);
}
