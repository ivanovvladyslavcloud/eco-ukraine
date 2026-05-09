"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

interface Props {
  stationId: string;
  stationName: string;
  type: string;
}

export default function StationViewTracker({
  stationId,
  stationName,
  type,
}: Props) {
  useEffect(() => {
    track("station_detail_viewed", {
      stationId,
      stationName,
      type,
      source: "page_load",
    });
  }, [stationId]);

  return null;
}