import { useEffect, useState } from "react";
import { fetchOrThrow } from "@/lib/fetcher"; // твій хелпер

export function useLatestMeasurements() {
  const [data, setData] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const json = await fetchOrThrow(`http://localhost:3000/api/measurements/new`);

        if (cancelled) return;

        const mapped: Record<string, any> = {};
        json.data.forEach((m: any) => {
          mapped[m.stationId] = m;
        });
        setData(mapped);
      } catch (err: any) {
        if (!cancelled) setError(err.message || "Unknown error");
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