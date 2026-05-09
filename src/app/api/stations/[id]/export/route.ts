import { NextResponse } from "next/server";
import { measurements } from "../../../../../../data/mockMeasurements";
import { toCSV } from "@/lib/csv";
import { withErrorHandling } from "@/lib/apiHandler";
import { ApiError } from "@/lib/errors";
import { REQUEST_ID_HEADER } from "@/lib/requestId";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const requestId = req.headers.get(REQUEST_ID_HEADER) ?? undefined;
  return withErrorHandling(async () => {

    const { id: stationId } = await params;

    const filtered = measurements.filter(
      (m) => m.stationId === stationId
    );

    if (!filtered.length) {
      throw new ApiError("No data for this station");
    }

    const csv = toCSV(filtered);

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="station-${stationId}.csv"`,
      },
    });
  }, { url: req.url, method: "GET", requestId: requestId });
}
