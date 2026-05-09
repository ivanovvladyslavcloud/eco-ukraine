import StationCard from "./StationCard";
import { MonitoringStation } from "@/types/station";

interface Props {
  stations: MonitoringStation[];
}

export default function StationList({ stations }: Props) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {stations.map((station) => (
        <StationCard
          key={station.id}
          station={station}
        />
      ))}
    </div>
  );
}