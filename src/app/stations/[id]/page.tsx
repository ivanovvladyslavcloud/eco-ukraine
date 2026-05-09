import StationMeasurements from "@/components/stations/StationMeasurements";
import { MonitoringStation } from "@/types/station";
import { fetchOrThrow } from "@/lib/fetcher";
import StationViewTracker from "@/components/analytics/StationViewTracker";
import { ExportButton } from "@/components/ui/ExportButton";

interface Props {
  params: { id: string } | Promise<{ id: string }>;
}

export default async function StationPage({ params }: Props) {
  const { id } = await params;

  const stationRes = await fetchOrThrow(
    `http://localhost:3000/api/stations/${id}`
  );

  const measurementsRes = await fetchOrThrow(
    `http://localhost:3000/api/measurements?stationId=${id}`
  );

  const station: MonitoringStation = stationRes.data;

  return (
    <div style={{ padding: "20px" }}>

      <StationViewTracker
        stationId={station.id}
        stationName={station.name}
        type={station.type}
      />

      <p className="mb-6">Type: {station.type}</p>

      <StationMeasurements station={station} measurements={measurementsRes.data}/>
      <ExportButton stationId={station.id} />
    </div>
  );
}
