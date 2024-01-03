export interface WaqiStationItem {
    aqi: string;
    lat: number;
    lon: number;
    station: {
        name: string;
        time: string;
    }
    uid: number;
}

export interface WaqiStationInfo {
    aqi: number;
    idx: number;
    city: {
        geo: [number, number];
        name: string;
        url: string;
        location: string;
    };
    iaqi: {
        pm10: { v: number };
        pm25: { v: 96 };
    };
    "time": {
        "iso": string;
    };
}

const token = process.env.WAQI_TOKEN ?? '';

export const waqiLoadBounds = async (bounds: string[][]): Promise<WaqiStationItem[]> => {
    const q = new URLSearchParams({
        latlng: `${bounds[0][0]},${bounds[0][1]},${bounds[1][0]},${bounds[1][1]}`,
        networks: 'all',
        token,
    });

    const response = await fetch(`https://api.waqi.info/v2/map/bounds?${q.toString()}`, { next: { revalidate: 60 } });
    const result = await response.json();

    return result.data;
};

export const waqiLoadInfo = (id: string): Promise<WaqiStationInfo | undefined> => {
    return fetch(`https://api.waqi.info/feed/A${id}/?token=${token}`, { next: { revalidate: 60 } })
        .then(response => response.json())
        .then(({ data }: { data: WaqiStationInfo}) => data)
        .catch(() => undefined);
};
