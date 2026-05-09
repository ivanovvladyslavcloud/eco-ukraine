import StationList from "@/components/stations/StationList";
import Link from "next/link";
import Dashboard from "@/components/ui/Dashboard";
import { MonitoringStation } from "@/types/station";
import { fetchOrThrow } from "@/lib/fetcher";

export default async function HomePage() {

  const stationsJson = await fetchOrThrow(
    `http://localhost:3000/api/stations/all`
      );

  const stations: MonitoringStation[] = stationsJson.data;

  const latestJson = await fetchOrThrow(
    `http://localhost:3000/api/measurements/new`
      );
  const latest = latestJson.data;

  const stationsWithCurrent = stations.map((s) => {
    const current = latest.find(
      (m: any) => m.stationId === s.id
    );

    return {
      ...s,
      currentData: current || null,
    };
  });

  const latestMap: Record<string, any> = {};
  latest.forEach((m: any) => {
    latestMap[m.stationId] = m;
  });

  const values = Object.values(latestMap);

  const averagePm25 =
    values.length > 0
      ? (
          values.reduce((sum: number, m: any) => sum + m.pm25, 0) /
          values.length
        ).toFixed(1)
      : "—";

  const averagePm10 =
    values.length > 0
      ? (
          values.reduce((sum: number, m: any) => sum + m.pm10, 0) /
          values.length
        ).toFixed(1)
      : "—";

  return (
    <main className="max-w-6xl mx-auto p-6 space-y-8">

      <section className="text-center space-y-2">
        <h1 className="text-4xl font-bold">Eco Ukraine</h1>
        <p className="text-gray-700">
          Monitoring the air quality across different regions in Ukraine
        </p>

        <Link
          href="/stations"
          className="inline-block mt-4 px-6 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition"
        >
          View All Stations
        </Link>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6 text-center">
          Air Quality Map
        </h2>

        <Dashboard stations={stations} />
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded p-6 text-center">
          <h2 className="text-xl font-semibold">Average PM2.5</h2>
          <p className="text-3xl mt-2">
            {averagePm25} {averagePm25 !== "—" && "µg/m³"}
          </p>
        </div>

        <div className="bg-white shadow rounded p-6 text-center">
          <h2 className="text-xl font-semibold">Average PM10</h2>
          <p className="text-3xl mt-2">
            {averagePm10} {averagePm10 !== "—" && "µg/m³"}
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">
          Monitoring Stations
        </h2>

        <StationList stations={stationsWithCurrent.slice(0, 3)} />
      </section>

      <footer className="mt-12 text-center text-sm text-gray-500">
        © 2026 Eco Ukraine. All rights reserved.
      </footer>

    </main>
  );
}