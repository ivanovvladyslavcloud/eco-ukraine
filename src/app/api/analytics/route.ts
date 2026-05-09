import { withErrorHandling } from "@/lib/apiHandler";
import { ApiError } from "@/lib/errors";
import { REQUEST_ID_HEADER } from "@/lib/requestId";

const VALID_NAMES = new Set([
  "page_view",
  "page_load_timing",
  "session_start",
  "session_end",
  "station_detail_viewed",
  "map_station_selected",
  "map_zoom_changed",
  "chart_filter_toggled",
  "compare_pollutant_changed",
  "data_exported",
  "error_boundary_triggered",
]);

function isAnalyticsEvent(value: any) {
  return (
    value &&
    typeof value === "object" &&
    typeof value.name === "string" &&
    VALID_NAMES.has(value.name) &&
    typeof value.sessionId === "string" &&
    typeof value.path === "string" &&
    typeof value.ts === "string"
  );
}

export async function POST(req: Request) {
  const requestId = req.headers.get(REQUEST_ID_HEADER) ?? undefined;
  return withErrorHandling(async ({ logger }) => {
    const body = await req.json();

    if (!isAnalyticsEvent(body)) {
      throw new ApiError("Invalid event", 400);
    }

    logger.info({
      msg: "analytics event",
      event: body.name,
      sessionId: body.sessionId,
    });

    return { success: true };
  }, { url: req.url, method: "POST", requestId: requestId });
}