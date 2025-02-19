import createClient from "openapi-fetch";
import { paths } from "./schema";

export const client = createClient<paths>({ baseUrl: "https://api.beta.armaqi.org/api/public/" });
