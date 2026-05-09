"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

export default function Pagination({ pagination }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const totalPages = Math.ceil(
    pagination.total / pagination.limit
  );

  const currentPage = pagination.page;

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));

    router.push(`/stations?${params.toString()}`);
  };

  return (
    <div className="flex gap-2 mt-6">

      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 bg-gray-200 rounded disabled:opacity-50
        ${
            currentPage === 1
              ? "bg-gray-200 rounded disabled:opacity-50"
              : "bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 transition"
          }`}
      >
        Prev
      </button>

      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i}
          onClick={() => goToPage(i + 1)}
          className={`px-3 py-1 rounded ${
            currentPage === i + 1
              ? "bg-emerald-600 text-white"
              : "bg-gray-200 hover:bg-gray-300 transition"
          }`}
        >
          {i + 1}
        </button>
      ))}

      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 bg-gray-200 rounded disabled:opacity-50
        ${
            currentPage === totalPages
              ? "bg-gray-200 rounded disabled:opacity-50"
              : "bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 transition"
          }`}
      >
        Next
      </button>

    </div>
  );
}