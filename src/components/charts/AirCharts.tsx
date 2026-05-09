"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import CustomTooltip from "./CustomTooltip";
import { track } from "@/lib/analytics"

interface Props {
  data: any[];
}

const pollutants = [
  { key: "pm25", label: "PM2.5", color: "#ef4444" },
  { key: "pm10", label: "PM10", color: "#f97316" },
  { key: "no2", label: "NO2", color: "#3b82f6" },
  { key: "so2", label: "SO2", color: "#a855f7" },
  { key: "co", label: "CO", color: "#22c55e" },
  { key: "o3", label: "O3", color: "#14b8a6" },
];

export default function AirQualityChart({ data }: Props) {
  const [visible, setVisible] = useState<Record<string, boolean>>({
    pm25: true,
    pm10: true,
    no2: true,
    so2: true,
    co: true,
    o3: true,
  });

  const toggle = (key: string) => {
    setVisible((prev) => {
      const newValue = !prev[key];

      track("chart_filter_toggled", {
        pollutant: key,
        enabled: newValue,
      });

      return {
        ...prev,
        [key]: newValue,
      };
    });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">

      <h3 className="text-lg font-semibold mb-4">
        Air Quality Measurements
      </h3>

      <div className="flex flex-wrap gap-2 mb-4">
        {pollutants.map((p) => (
          <button
            key={p.key}
            onClick={() => toggle(p.key)}
            className={`px-3 py-1 rounded text-sm border transition
              ${visible[p.key]
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-600"
              }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />

          {pollutants.map((p) =>
            visible[p.key] ? (
              <Line
                key={p.key}
                type="monotone"
                dataKey={p.key}
                stroke={p.color}
                strokeWidth={2}
              />
            ) : null
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}