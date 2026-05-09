"use client";

import { useState } from "react";

interface Props {
  onFilter: (filters: { type: string; search: string }) => void;
}

export default function StationFilters({ onFilter }: Props) {
  const [type, setType] = useState("");
  const [search, setSearch] = useState("");

  function applyFilters() {
    onFilter({ type, search });
  }

  return (
    <div className="bg-white p-4 rounded-xl shadow mb-4 flex flex-col lg:flex-row gap-4">

      <input
        type="text"
        placeholder="Search station..."
        className="border p-2 rounded w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        className="border p-2 rounded"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="">All types</option>
        <option value="urban">Urban</option>
        <option value="industrial">Industrial</option>
        <option value="rural">Rural</option>
      </select>

      <button
        onClick={applyFilters}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Apply
      </button>
    </div>
  );
}