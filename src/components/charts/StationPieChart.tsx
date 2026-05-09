"use client";

import { useState } from "react";
import CustomTooltip from "./CustomTooltip";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { track } from "@/lib/analytics"

interface Props {
  data: { name: string; value: number }[];
}

const COLORS = [
  "#ef4444",
  "#f97316",
  "#3b82f6",
  "#a855f7",
  "#22c55e",
  "#14b8a6",
];

export default function StationPieChart({ data }: Props) {
  const [hidden, setHidden] = useState<string[]>([]);

  const toggle = (name: string) => {
    setHidden((prev) => {
      const isHidden = prev.includes(name);
      const newHidden = isHidden
        ? prev.filter((n) => n !== name)
        : [...prev, name];

      track("chart_filter_toggled", {
        chart: "pie",
        pollutant: name,
        enabled: isHidden, // якщо був hidden → тепер visible
        activeCount: data.length - newHidden.length,
      });

      return newHidden;
    });
  };

  const filteredData = data.filter((d) => !hidden.includes(d.name));

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">

      <h3 className="text-lg font-semibold mb-4">
        Pollution Structure
      </h3>

      <div className="flex flex-wrap gap-2 mb-4">
        {data.map((d) => (
          <button
            key={d.name}
            onClick={() => toggle(d.name)}
            className={`px-3 py-1 rounded text-sm border transition
              ${hidden.includes(d.name)
                ? "bg-gray-200 text-gray-500"
                : "bg-blue-500 text-white"
              }`}
          >
            {d.name}
          </button>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <PieChart>

          <Pie
            data={filteredData}
            dataKey="value"
            nameKey="name"
            outerRadius={150}
            label={({ name, value }) => `${name}: ${value}`}
          >
            {filteredData.map((entry, index) => (
              <Cell
                key={entry.name}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip content={<CustomTooltip />} />

          <Legend />

        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}