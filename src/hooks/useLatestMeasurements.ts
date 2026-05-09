import { useEffect, useState } from "react";
import { fetchOrThrow } from "@/lib/fetcher";
import { Measurement } from "@/types/measurement";

export function useLatestMeasurements() {
  const [data, setData] = useState<Record<string, Measurement>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const json = await fetchOrThrow(`http://localhost:3000/api/measurements/new`);

        if (cancelled) return;

        const mapped: Record<string, Measurement> = {};
        json.data.forEach((m: Measurement) => {
          mapped[m.stationId] = m;
        });
        setData(mapped);
      } catch (err: unknown) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Unknown error"
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading, error };
}