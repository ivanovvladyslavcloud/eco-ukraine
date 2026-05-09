"use client";

import { Measurement } from "@/types/measurement";
import { MonitoringStation } from "@/types/station";
import Link from "next/link";

interface Props {
  station: MonitoringStation;
  latest?: Measurement;
}

function getAQIColor(pm25: number) {
  if (pm25 <= 15) return "bg-green-500";
  if (pm25 <= 35) return "bg-yellow-500";
  if (pm25 <= 55) return "bg-orange-500";
  return "bg-red-500";
}

export default function StationCard({ station, latest }: Props) {
  const measurement = latest;

  const hasData = !!measurement;

  const pm25 = measurement?.pm25 ?? 0;

  const color = hasData
    ? getAQIColor(pm25)
    : "bg-gray-400";

  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{station.name}</h3>

        <span className={`text-white text-xs px-2 py-1 rounded ${color}`}>
          {hasData ? "PM2.5" : "No Data"}
        </span>
      </div>

      <p className="text-sm text-slate-500 mb-2">
        Type: {station.type}
      </p>

      <p className="text-2xl font-bold mb-4">
        {hasData ? pm25 : "—"}
      </p>

      <Link
        href={`/stations/${station.id}`}
        className="text-emerald-600 font-medium hover:underline"
      >
        View Details →
      </Link>
    </div>
  );
}