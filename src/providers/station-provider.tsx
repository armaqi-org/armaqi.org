'use client';

import { createContext, ReactNode, useContext } from "react";
import { StationItem } from "@/api";

const StationContext = createContext<StationItem | null>(null);

export default function StationProvider(
    {
        children,
        station,
    }: {
    station: StationItem
    children: ReactNode
}) {
    return (
      <StationContext.Provider value={station}>
        {children}
      </StationContext.Provider>
    );
}

export function useStation() {
    return useContext(StationContext);
}
