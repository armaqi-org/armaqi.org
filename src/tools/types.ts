import { useTranslations } from "next-intl";
import { FC } from "react";

export type FCTL = FC<{ t: ReturnType<typeof useTranslations<''>>}>;
