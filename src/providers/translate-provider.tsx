// translate-provider.tsx
'use client';

import { createContext, ReactNode, useContext } from "react";
import { TranslateMethod, getTranslation } from "@/tools/translate";

const TranslateContext = createContext<TranslateMethod>(() => '');


export default function TranslateProvider({
                                               children,
                                               dictionary,
                                           }: {
    dictionary: any
    children: ReactNode
}) {
    return (
      <TranslateContext.Provider value={getTranslation(dictionary)}>
        {children}
      </TranslateContext.Provider>
    );
}

export function useTranslate() {
    return useContext(TranslateContext);
}