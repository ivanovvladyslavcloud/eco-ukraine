"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from "recharts";
import CustomTooltip from "./CustomTooltip";
import { track } from "@/lib/analytics"

interface Props {
  data: { name: string; pm25: number; pm10: number; no2: number }[];
}

export default function StationBarChart({ data }: Props) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar
          dataKey="pm25"
          fill="#8884d8"
          onClick={(data) => {
            track("compare_pollutant_changed", {
              chart: "bar",
              pollutant: "pm25",
              station: data?.name ?? null,
            });
          }}
        />
        <Bar
          dataKey="pm10"
          fill="#82ca9d"
          onClick={(data) => {
            track("compare_pollutant_changed", {
              chart: "bar",
              pollutant: "pm10",
              station: data?.name ?? null,
            });
          }}
        />
        <Bar
          dataKey="no2"
          fill="#ffc658"
          onClick={(data) => {
            track("compare_pollutant_changed", {
              chart: "bar",
              pollutant: "no2",
              station: data?.name ?? null,
            });
          }}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}