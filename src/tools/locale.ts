import { useLocale as useLocaleIntl } from "next-intl";
import { Locale } from "@/const";

export const useLocale = (): Locale => {
    const locale = useLocaleIntl();

    return locale === 'en' ? Locale.EN : locale === Locale.RU ? Locale.RU : Locale.AM;
};
