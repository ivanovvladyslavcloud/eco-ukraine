import StationCard from "./StationCard";

interface Props {
  stations: any[];
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