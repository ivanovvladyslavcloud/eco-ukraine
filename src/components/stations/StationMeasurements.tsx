"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

import { MonitoringStation } from "@/types/station";
import NoData from "@/components/ui/NoData";

const AirQualityChart = dynamic(
  () => import("@/components/charts/AirCharts"),
  {
    ssr: false,
    loading: () => <p>Loading chart...</p>,
  }
);

const StationPieChart = dynamic(
  () => import("@/components/charts/StationPieChart"),
  {
    ssr: false,
    loading: () => <p>Loading chart...</p>,
  }
);

interface Measurement {
  timestamp: string;
  pm25: number;
  pm10: number;
  no2: number;
  so2: number;
  co: number;
  o3: number;
}

interface Props {
  station: MonitoringStation;
  measurements: Measurement[];
}

export default function StationMeasurements({
  station,
  measurements,
}: Props) {

  const lineData = useMemo(() => {
    return measurements.map((m) => ({
      time: new Date(m.timestamp).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      pm25: m.pm25,
      pm10: m.pm10,
      no2: m.no2,
      so2: m.so2,
      co: m.co,
      o3: m.o3,
    }));
  }, [measurements]);

  const pieData = useMemo(() => {
    const avg = measurements.reduce(
      (acc, m) => {
        acc.pm25 += m.pm25;
        acc.pm10 += m.pm10;
        acc.no2 += m.no2;
        acc.so2 += m.so2;
        acc.co += m.co;
        acc.o3 += m.o3;
        return acc;
      },
      {
        pm25: 0,
        pm10: 0,
        no2: 0,
        so2: 0,
        co: 0,
        o3: 0,
      }
    );

    const count = measurements.length || 1;

    const round = (n: number) => Number(n.toFixed(2));
return [
      { name: "PM2.5", value: round(avg.pm25 / count) },
      { name: "PM10", value: round(avg.pm10 / count) },
      { name: "NO2", value: round(avg.no2 / count) },
      { name: "SO2", value: round(avg.so2 / count) },
      { name: "CO", value: round(avg.co / count) },
      { name: "O3", value: round(avg.o3 / count) },
    ];
  }, [measurements]);

  return (
    <div>

      <h2 className="text-xl font-bold mb-4">
        {station.name}
      </h2>

      {measurements.length > 0 ? (
        <AirQualityChart data={lineData} />
      ) : (
        <NoData text="No measurements for this station" />
      )}

      {pieData.some((d) => d.value > 0) ? (
        <StationPieChart data={pieData} />
      ) : (
        <NoData text="No average data available" />
      )}

    </div>
  );
}