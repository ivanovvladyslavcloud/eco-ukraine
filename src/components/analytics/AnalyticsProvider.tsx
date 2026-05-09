"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  track,
  trackPageLoadTiming,
  trackPageView,
  trackSessionEnd,
  trackSessionStart,
} from "@/lib/analytics";

export default function AnalyticsProvider() {
  const pathname = usePathname();

  // session + load
  useEffect(() => {
    trackSessionStart();

    const onLoad = () => trackPageLoadTiming();
    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad, { once: true });

    const onVisibility = () => {
      if (document.visibilityState === "hidden") {
        trackSessionEnd();
      }
    };

    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.removeEventListener("load", onLoad);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  // page view
  useEffect(() => {
    trackPageView(pathname);
  }, [pathname]);

  // global errors
  useEffect(() => {
    const onError = (ev: ErrorEvent) => {
      track("error_boundary_triggered", {
        message: ev.message,
        source: ev.filename ?? null,
        line: ev.lineno ?? 0,
      });
    };

    const onRejection = (ev: PromiseRejectionEvent) => {
      const reason =
        ev.reason instanceof Error
          ? ev.reason.message
          : String(ev.reason);

      track("error_boundary_triggered", {
        message: reason,
        kind: "unhandledrejection",
      });
    };

    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onRejection);

    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onRejection);
    };
  }, []);

  return null;
}