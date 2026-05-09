"use client";

import { track } from "@/lib/analytics";

export function ExportButton({ stationId }: { stationId: string }) {
  const handleDownload = async () => {
    track("data_exported", {
      stationId,
      format: "csv",
      source: "station_page",
    });

    const res = await fetch(`/api/stations/${stationId}/export`);

    if (!res.ok) return;

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `station-${stationId}.csv`;
    document.body.appendChild(a);
    a.click();

    a.remove();
    window.URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleDownload}
      className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      Export CSV
    </button>
  );
}