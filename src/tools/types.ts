import { FC } from "react";
import { getDictionary } from "@/dictionaries";

export type DictType = Awaited<ReturnType<typeof getDictionary>>
export type FCTL<T = {}> = FC<{ dict: DictType } & T>;
