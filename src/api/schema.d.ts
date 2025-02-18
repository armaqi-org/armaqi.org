/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
    "/stations": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Получить список станций
         * @description Возвращает список станций с последними доступными данными.
         */
        get: {
            parameters: {
                query?: {
                    /** @description Фильтр по месту */
                    place_id?: number;
                    /** @description Включить пересекающиеся станции */
                    overlapped?: boolean;
                };
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Успешный ответ со списком станций */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["Station"][];
                    };
                };
                /** @description Некорректный запрос */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Внутренняя ошибка сервера */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/stations/{id}/history": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Получить историю станции
         * @description Возвращает историю измерений по станции.
         */
        get: {
            parameters: {
                query?: {
                    /** @description Интервал усреднения данных */
                    type?: "hour" | "day" | "week" | "month";
                };
                header?: never;
                path: {
                    /** @description Идентификатор станции */
                    id: number;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Исторические данные станции */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["StationData"][];
                    };
                };
                /** @description Некорректный запрос */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Станция не найдена */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Внутренняя ошибка сервера */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/places": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Получить список мест
         * @description Возвращает список доступных мест измерений.
         */
        get: {
            parameters: {
                query?: never;
                header?: never;
                path?: never;
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Успешный ответ со списком мест */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["StationPlace"][];
                    };
                };
                /** @description Внутренняя ошибка сервера */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/places/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Получить данные по месту
         * @description Возвращает информацию и историю измерений для указанного места.
         */
        get: {
            parameters: {
                query?: {
                    /** @description Интервал усреднения данных */
                    type?: "hour" | "day" | "week" | "month";
                };
                header?: never;
                path: {
                    /** @description Идентификатор места */
                    id: number;
                };
                cookie?: never;
            };
            requestBody?: never;
            responses: {
                /** @description Исторические данные по месту */
                200: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content: {
                        "application/json": components["schemas"]["PlaceHistoryValue"][];
                    };
                };
                /** @description Некорректный запрос */
                400: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Место не найдено */
                404: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
                /** @description Внутренняя ошибка сервера */
                500: {
                    headers: {
                        [name: string]: unknown;
                    };
                    content?: never;
                };
            };
        };
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        Station: {
            id?: number;
            title?: string;
            type?: string;
            /** Format: float */
            lat?: number;
            /** Format: float */
            lon?: number;
            place_id?: number;
            data?: components["schemas"]["StationData"];
        };
        StationData: {
            /** Format: date-time */
            timestamp?: string;
            /** Format: float */
            temperature?: number | null;
            /** Format: float */
            pressure?: number | null;
            /** Format: float */
            humidity?: number | null;
            /** Format: float */
            pm2?: number | null;
            /** Format: float */
            pm10?: number | null;
            aqi?: number | null;
        };
        StationPlace: {
            id?: number;
            iso?: string;
            iso2lv?: string;
            name?: components["schemas"]["StationPlaceNames"];
            map?: components["schemas"]["PlaceMapInfo"];
        };
        StationPlaceNames: {
            am?: string;
            en?: string;
            ru?: string;
        };
        PlaceMapInfo: {
            x?: number;
            y?: number;
            zoom?: number;
        };
        PlaceHistoryValue: {
            /** Format: date-time */
            period_start?: string;
            /** Format: date-time */
            last_update?: string;
            aqi?: number;
            /** Format: float */
            pm25?: number;
            /** Format: float */
            pm10?: number;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export type operations = Record<string, never>;
