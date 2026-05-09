"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    track("error_boundary_triggered", {
      message: error.message,
      digest: error.digest ?? null,
      type: "global_error",
    });
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center space-y-4">

      <h1 className="text-5xl font-bold text-red-600">
        500 - Server Error
      </h1>

      <p className="text-gray-600 max-w-md">
        Something went wrong on our side. Please try again.
      </p>

      <button
        onClick={() => reset()}
        className="px-6 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition"
      >
        Try again
      </button>
    </div>
  );
}
