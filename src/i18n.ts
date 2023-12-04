import { getRequestConfig } from 'next-intl/server';
import { createElement } from "react";

export default getRequestConfig(async ({ locale }) => ({
    messages: (await import(`../messages/${locale}.json`)).default,
    defaultTranslationValues: {
        b: chunks => createElement('span', { className: 'font-bold' }, chunks)
    }
}));
 