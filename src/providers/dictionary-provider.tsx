// dictionary-provider.tsx
'use client';

import { createContext, ReactNode, useContext } from "react";

type Dictionary = Record<string, Record<string, string>>

const DictionaryContext = createContext<Dictionary | null>(null);

export default function DictionaryProvider({
                                               children,
                                               dictionary,
                                           }: {
    dictionary: Dictionary
    children: ReactNode
}) {
    return (
      <DictionaryContext.Provider value={dictionary}>
        {children}
      </DictionaryContext.Provider>
    );
}

export function useDictionary() {
    const dictionary = useContext(DictionaryContext);
    if (dictionary === null) {
        throw new Error('useDictionary hook must be used within DictionaryProvider');
    }

    return dictionary;
}