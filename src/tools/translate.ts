import get from "lodash.get";

export type TranslateMethod = (key: string) => string;

export const getTranslation = (dict: any): TranslateMethod => {
    return (key: string) => {
        return get(dict, key);
    };
};
