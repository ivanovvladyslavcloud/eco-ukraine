import { stations } from "../../../../data/mockData";
import { withErrorHandling } from "@/lib/apiHandler";
import { ApiError } from "@/lib/errors";
import { REQUEST_ID_HEADER } from "@/lib/requestId";

export async function GET(req: Request) {
  const requestId = req.headers.get(REQUEST_ID_HEADER) ?? undefined;
  return withErrorHandling(async ({ url }) => {
    const page = Number(url.searchParams.get("page") ?? 1);
    const limitRaw = Number(url.searchParams.get("limit") ?? 6);
    const type = url.searchParams.get("type");
    const sort = url.searchParams.get("sort");

    const limit = Math.min(limitRaw, 50);

    if (page < 1 || limit < 1) {
      throw new ApiError("Invalid pagination", 400);
    }

    let result = stations;

    if (type) {
      result = result.filter(s => s.type === type);
    }

    if (sort === "name") {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    }

    const total = result.length;
    const start = (page - 1) * limit;
    const paginated = result.slice(start, start + limit);

    return {
      success: true,
      data: paginated,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }, { url: req.url, method: "GET", requestId: requestId });
}