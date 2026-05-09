import { notFound } from "next/navigation";

export async function fetchOrThrow(url: string) {
  const res = await fetch(url, { cache: "no-store" });

  if (res.status === 404) {
    notFound();
  }

  if (res.status === 400) {
     const data = await res.json().catch(() => null);

      return {
        ok: res.ok,
        status: res.status,
        data,
        error: data?.error,
      };
  }

  if (!res.ok) {
    throw new Error("Server error");
  }

  return res.json();
}