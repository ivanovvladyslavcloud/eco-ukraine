import pino from "pino";

export const baseLogger = pino({
  level: "info",
  transport: {
    targets: [
      {
        target: "pino/file",
        options: { destination: "./logs/info.log", mkdir: true },
        level: "info",
      },
      {
        target: "pino/file",
        options: { destination: "./logs/error.log", mkdir: true },
        level: "error",
      },
      {
        target: "pino/file",
        options: { destination: "./logs/warn.log", mkdir: true },
        level: "warn",
      },
    ],
  },
});

export function createLogger(context: {
  requestId?: string;
  url?: string;
  method?: string;
}) {
  return baseLogger.child({
    requestId: context.requestId,
    url: context.url,
    method: context.method,
  });
}