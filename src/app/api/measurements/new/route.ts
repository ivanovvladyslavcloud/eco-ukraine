import { measurements } from "../../../../../data/mockMeasurements";
import { REQUEST_ID_HEADER } from "@/lib/requestId";
import { withErrorHandling } from "@/lib/apiHandler";

export async function GET(req: Request) {
  const requestId = req.headers.get(REQUEST_ID_HEADER) ?? undefined;
  return withErrorHandling(async () => {
    const latestByStation: Record<string, any> = {};

    measurements.forEach((m) => {
      const current = latestByStation[m.stationId];

      if (!current || new Date(m.timestamp) > new Date(current.timestamp)) {
        latestByStation[m.stationId] = m;
      }
    });

    const result = Object.values(latestByStation);

    return {
      success: true,
      data: result,
      meta: {
        stationsCount: result.length,
      },
    };
  }, { url: req.url, method: "GET", requestId: requestId });
}

