import { stations } from "../../../../../data/mockData";
import { withErrorHandling } from "@/lib/apiHandler";
import { ApiError } from "@/lib/errors";
import { REQUEST_ID_HEADER } from "@/lib/requestId";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }>}) {
  const requestId = req.headers.get(REQUEST_ID_HEADER) ?? undefined;
  return withErrorHandling(async ({}) => {
    const { id } = await params;

    const station = stations.find(s => s.id === id);

    if (!station) {
      throw new ApiError("Station not found", 404);
    }

    return {
      success: true,
      data: station,
    };
  }, { url: req.url, method: "GET", requestId: requestId });
}