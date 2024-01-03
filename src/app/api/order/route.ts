import dayjs from "dayjs";
import { AirtableApi } from "@/tools-api/airtable";

function unique(length: number) {
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

export async function POST(request: Request) {
    const data = await request.json();
    const key = dayjs().format('YYMMDDHHmmss') + unique(5);
    let success = false;
    let error = '';
    try {
        await AirtableApi.addRecord(AirtableApi.leadsTable, {
            key,
            name: data.name,
            contact: data.contact,
            sensor: data.sensor,
            email: data.email,
            district: data.district,
        });

        success = true;
    } catch (e: any) {
        error = e.message;
    }

    return Response.json({ success, error });
}
