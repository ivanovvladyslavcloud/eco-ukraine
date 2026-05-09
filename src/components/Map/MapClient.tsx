"use client";
import dynamic from "next/dynamic";
import { MonitoringStation } from "@/types/station";

const Map = dynamic(() => import("./Map"), { ssr: false, loading: () => <p>Loading map...</p> }); 

interface Props {
  stations: MonitoringStation[];
  selectedId?: string;
  onSelectStation?: (id: string | null) => void;
}

export default function MapClient({ stations, selectedId, onSelectStation }: Props) {
  return <Map stations={stations} selectedStationId={selectedId} onSelectStation={onSelectStation} />;
}