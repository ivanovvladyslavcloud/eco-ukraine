import { stations } from "../../../../../data/mockData";
import { withErrorHandling } from "@/lib/apiHandler";
import { REQUEST_ID_HEADER } from "@/lib/requestId";

export async function GET(req: Request) {
  const requestId = req.headers.get(REQUEST_ID_HEADER) ?? undefined;
  return withErrorHandling(async () => {
    return {
      success: true,
      data: stations,
      meta: {
        count: stations.length,
      },
    };
  }, { url: req.url, method: "GET", requestId: requestId });
}
