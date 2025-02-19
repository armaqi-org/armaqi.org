import { headers } from "next/headers";

export const getCurrentPath = async (): Promise<string> => {
    const headerList = await headers();
    return headerList.get("x-current-path") ?? '';
};
