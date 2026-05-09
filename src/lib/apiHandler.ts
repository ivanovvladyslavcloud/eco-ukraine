import { NextResponse } from "next/server";
import { createLogger } from "@/lib/logger";
import { ApiError } from "./errors";

export async function withErrorHandling<T>(
  handler: (ctx: { logger: any; url: URL; requestId?: string }) => Promise<T>,
  context: { url: string; method: string; requestId?: string }
) {
  const start = Date.now();
  const url = new URL(context.url);

  const logger = createLogger({
    requestId: context.requestId,
    url: context.url,
    method: context.method,
  });

  try {
    const result = await handler({ logger, url, requestId: context.requestId });

    const duration = (Date.now() - start) * 50;

    console.log(duration)

    if (duration > 500) {
      logger.warn({
        msg: "Slow request",
        duration,
      });
    }

    logger.info({
      msg: "API success",
      duration,
      query: Object.fromEntries(url.searchParams),
    });

    return NextResponse.json(result);
  } catch (error: any) {
    const duration = Date.now() - start;

    const status = error instanceof ApiError ? error.status : 500;

    if (status >= 400 && status < 500) {
      logger.warn({
        msg: "Client error",
        status,
        duration,
        error: error.message,
      });
    }

    if (status >= 500) {
      logger.error({
        msg: "Server error",
        status,
        duration,
        error: error.message,
      });
    }

    return NextResponse.json(
      { success: false, error: error.message },
      { status }
    );
  }
}