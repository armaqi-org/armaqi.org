import Airtable from "airtable";

const apiKey = process.env.AIRTABLE_TOKEN;
const baseId = process.env.AIRTABLE_BASE ?? '';

export class AirtableApi {
    static readonly leadsTable = 'armaqi.org';
    static readonly stationsTable = 'stations';

    static async addRecord(table: string, data: any) {
        const airtable = new Airtable({ apiKey });

        await airtable.base(baseId).table(table).create(data);
    }

    // sending manual request here to reuse built-in cache functionality
    static async listTableFields<T = any>(table: string, revalidate?: number): Promise<T[]> {
        return await fetch(`https://api.airtable.com/v0/${baseId}/${table}`, {
            headers: { Authorization: `Bearer ${apiKey}` },
            next: { revalidate },
        }).then(response => response.json())
            .then((data: any) => data.records?.map((r: any) => r.fields));
    }
}
