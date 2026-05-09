"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { Measurement } from "@/types/measurement";
import MapClient from "@/components/Map/MapClient";
import StationFilters from "@/components/stations/StationFilters";

import { MonitoringStation } from "@/types/station";

const StationMeasurements = dynamic(
  () => import("@/components/stations/StationMeasurements"),
  {
    ssr: false,
    loading: () => (
      <div className="p-6 text-center">
        Loading analytics...
      </div>
    ),
  }
);

interface Props {
  stations: MonitoringStation[];
}

export default function Dashboard({ stations }: Props) {
  const [selectedStationId, setSelectedStationId] = useState<string | null>(null);

  const [filters, setFilters] = useState({
    type: "",
    search: "",
  });

  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const [loadingMeasurements, setLoadingMeasurements] = useState(false);

  const filteredStations = useMemo(() => {
    let result = [...stations];

    if (filters.type) {
      result = result.filter((s) => s.type === filters.type);
    }

    if (filters.search) {
      result = result.filter((s) =>
        s.name.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    return result;
  }, [stations, filters]);

  const selectedStation = useMemo(() => {
    return (
      filteredStations.find((s) => s.id === selectedStationId) || null
    );
  }, [filteredStations, selectedStationId]);

  useEffect(() => {
    if (!selectedStationId) {
      setMeasurements([]);
      return;
    }
let active = true;

    async function loadMeasurements() {
      try {
        setLoadingMeasurements(true);

        const res = await fetch(
          `http://localhost:3000/api/measurements?stationId=${selectedStationId}`
        );

        if (!res.ok) {
          throw new Error("Failed to load measurements");
        }

        const json = await res.json();

        if (active) {
          setMeasurements(json.data || []);
        }
      } catch (error) {
        console.error(error);

        if (active) {
          setMeasurements([]);
        }
      } finally {
        if (active) {
          setLoadingMeasurements(false);
        }
      }
    }

    loadMeasurements();

    return () => {
      active = false;
    };
  }, [selectedStationId]);

  return (
    <div className="flex flex-col gap-4 p-4">

      <StationFilters
        onFilter={setFilters}
      />

      <div className="flex flex-col gap-4">

        <div className="bg-white rounded-xl shadow overflow-hidden min-h-[300px]">
          <MapClient
            stations={filteredStations}
            selectedId={selectedStationId ?? undefined}
            onSelectStation={setSelectedStationId}
          />
        </div>

        <div className="bg-white p-4 rounded-xl shadow min-h-[300px]">

          {!selectedStation && (
            <p className="text-gray-500 text-center mt-10">
              Select station on the map
            </p>
          )}

          {selectedStation && loadingMeasurements && (
            <div className="text-center p-10">
              Loading station analytics...
            </div>
          )}

          {selectedStation && !loadingMeasurements && (
            <StationMeasurements
              station={selectedStation}
              measurements={measurements}
            />
          )}

        </div>

      </div>

    </div>
  );
}