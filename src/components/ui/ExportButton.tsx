"use client";

import { track } from "@/lib/analytics";

export function ExportButton({ stationId }: { stationId: string }) {
  const handleDownload = async () => {
    track("data_exported", {
      stationId,
      format: "csv",
      source: "station_page",
    });

    window.open(`/api/stations/${stationId}/export`, "_blank");
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