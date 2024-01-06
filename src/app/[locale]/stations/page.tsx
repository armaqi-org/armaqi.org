"use client";

import classNames from "classnames";
import { useState } from "react";
import { StationsTable } from "@/components/stations/stations-table";
import { StationDataType } from "@/tools-api/interface";

const titles: Record<StationDataType, string> = {
    [StationDataType.Waqi]: 'Waqi',
    [StationDataType.WaqiFiltered]: 'Waqi filtered',
    [StationDataType.Config]: 'Config applied',
};

export default function StationsPage() {
    const [activeTab, setActiveTab] = useState(StationDataType.Waqi);

    return (

      <div className="container mx-auto">
        <h2 className="text-black text-2xl font-semibold mb-8">Stations list</h2>
        <div className="flex flex-col">

          <ul className="flex space-x-2">
            {[StationDataType.Waqi, StationDataType.WaqiFiltered, StationDataType.Config].map(tab => (
              <li key={tab}>
                <a
                  onClick={() => setActiveTab(tab)}
                  className={classNames(
                      "cursor-pointer inline-block px-4 py-2 rounded shadow",
                      {
                          'bg-blue-500 text-white': activeTab === tab,
                          'bg-white text-gray-600': activeTab !== tab,
                      }
                  )}
                >
                  {titles[tab]}
                </a>
              </li>
            ))}
          </ul>

          <StationsTable key={activeTab} type={activeTab} />
        </div>
      </div>
    );
}

