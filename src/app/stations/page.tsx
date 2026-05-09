import StationList from "@/components/stations/StationList";
import Container from "@/components/ui/Container";
import Pagination from "@/components/ui/Pagination";
import StationBarChart from "@/components/charts/StationBarChart";
import { MonitoringStation } from "@/types/station";
import { fetchOrThrow } from "@/lib/fetcher";
import { Measurement } from "@/types/measurement";
import Link from "next/link"

export default async function StationsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;

  const stationRes = await fetchOrThrow(
    `http://localhost:3000/api/stations?page=${page}`
      );

  const stations: MonitoringStation[] = stationRes.data;

  if (stationRes.error && stationRes.status === 400){
    return <div className="flex flex-col items-center justify-center min-h-[300px]"> Wrong filters / input <Link
        href="/"
        className="text-emerald-600 underline"
      >
        Return to the main page
      </Link></div>
  }

  const pagination = stationRes.pagination;

  const measurementsJson = await fetchOrThrow(
    `http://localhost:3000/api/measurements/new`
      );

  const currentMeasurements = measurementsJson.data;

  const stationsWithCurrent = stations.map((s) => {
    const current = currentMeasurements.find(
      (m: Measurement) => m.stationId === s.id
    );

    return {
      ...s,
      currentData: current || null,
    };
  });

  const barData = stationsWithCurrent.map((s) => ({
    name: s.name,
    pm25: s.currentData?.pm25 || 0,
    pm10: s.currentData?.pm10 || 0,
    no2: s.currentData?.no2 || 0,
  }));

  return (
    <div>
      <Container>
        <h1 className="text-3xl font-bold mb-6">Monitoring Stations</h1>
        <StationList stations={stationsWithCurrent} />
      </Container>

      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">
          Pollution Comparison (Latest Data)
        </h2>
        <StationBarChart data={barData} />
      </div>

      <Pagination pagination={pagination} />
      
    </div>
  );
}