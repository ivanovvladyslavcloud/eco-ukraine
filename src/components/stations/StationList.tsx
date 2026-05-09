import StationCard from "./StationCard";
import { Measurement } from "@/types/measurement";
import { MonitoringStation } from "@/types/station";

interface StationWithCurrent extends MonitoringStation {
  currentData?: Measurement | null;
}

interface Props {
  stations: StationWithCurrent[];
}

export default function StationList({ stations }: Props) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {stations.map((station) => (
        <StationCard
          key={station.id}
          station={station}
          latest={station.currentData ?? undefined}
        />
      ))}
    </div>
  );
}