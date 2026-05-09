"use client";

interface Props {
  active?: boolean;
  payload?: any[];
  label?: string;
}

export default function CustomTooltip({ active, payload, label }: Props) {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="bg-white p-3 rounded-lg shadow-lg border text-sm">
      <p className="font-semibold mb-2">{label}</p>

      {payload.map((entry, index) => (
        <div key={index} className="flex justify-between gap-4">
          <span style={{ color: entry.color }}>
            {entry.name.toUpperCase()}
          </span>
          <span className="font-medium">
            {Number(entry.value).toFixed(2)}
          </span>
        </div>
      ))}
    </div>
  );
}