const numberRegEx = /^\d+$/;

export const parseStationUrl = (stationUrl: string): { id: number; key: string } | undefined => {
    const parts = stationUrl.split('-');
    const idKey = parts.shift();

    if (!idKey || !numberRegEx.test(idKey)) {
        return undefined;
    }

    return { id: Number(idKey), key: parts.join('-') };
};
