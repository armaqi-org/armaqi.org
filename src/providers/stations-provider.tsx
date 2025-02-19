'use client';

import { createContext, ReactNode, useContext } from "react";
import { StationItem } from "@/api";

const StationsContext = createContext<StationItem[]>([]);

export default function StationsProvider(
    {
        children,
        stations,
    }: {
    stations: StationItem[]
    children: ReactNode
}) {
    return (
      <StationsContext.Provider value={stations}>
        {children}
      </StationsContext.Provider>
    );
}

export function useStaticStations() {
    return useContext(StationsContext);
}
