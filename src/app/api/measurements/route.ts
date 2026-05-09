import { measurements } from "../../../../data/mockMeasurements";
import { withErrorHandling } from "@/lib/apiHandler";
import { ApiError } from "@/lib/errors";
import { REQUEST_ID_HEADER } from "@/lib/requestId";

export async function GET(req: Request) {
  const requestId = req.headers.get(REQUEST_ID_HEADER) ?? undefined;
  return withErrorHandling(async ({ url }) => {
    let result = measurements;

    const stationId = url.searchParams.get("stationId");
    const from = url.searchParams.get("from");
    const to = url.searchParams.get("to");

    if (stationId) {
      result = result.filter(m => m.stationId === stationId);
    }

    if (from) {
      const fromDate = new Date(from);
      if (isNaN(fromDate.getTime())) {
        throw new ApiError("Invalid from date", 400);
      }
      result = result.filter(m => new Date(m.timestamp) >= fromDate);
    }

    if (to) {
      const toDate = new Date(to);
      if (isNaN(toDate.getTime())) {
        throw new ApiError("Invalid to date", 400);
      }
      result = result.filter(m => new Date(m.timestamp) <= toDate);
    }

    result.sort((a, b) =>
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );

    return {
      success: true,
      data: result,
    };
  }, { url: req.url, method: "GET", requestId: requestId });
}