import { FC, useEffect, useState } from "react";
import { Spinner } from "@/components/spinner";
import { fetchApi } from "@/tools/api";
import { StationDataType, StationItem, StationListResponse } from "@/tools-api/interface";

export const StationsTable: FC<{ type: StationDataType }> = ({ type }) => {
    const [stations, setStations] = useState<StationItem[] | undefined>(undefined);
    const loading = stations === undefined;
    
    useEffect(() => {
        fetchApi<StationListResponse>('/api/waqi/list?type=' + type, { next: { revalidate: 0 } })
            .then(response => {
                setStations(response.stations ?? []);
            });
    }, [type]);

    return (
      <div className="p-3 mt-6 bg-white border">
        <table className="table-auto table-default text-black">
          <thead>
            <tr>
              <th>id</th>
              <th>name</th>
              <th>location</th>
              <th>aqi</th>
              <th>comment</th>
            </tr>
          </thead>
          <tbody>
            {(stations ?? []).map(station => (
              <tr key={station.id}>
                <td>{station.id}</td>
                <td>{station.title}</td>
                <td>{station.position.lat}, {station.position.lng}</td>
                <td>{station.aqi}</td>
                <td />
              </tr>
            ))}
            {loading && (
            <tr>
              <td colSpan={5} className="py-16 align-middle">
                <div className="w-100 flex justify-center">
                  <Spinner  />
                </div>
              </td>
            </tr>
            )}
          </tbody>
        </table>
      </div>
    );
};
