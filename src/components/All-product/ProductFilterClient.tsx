"use client";

import React, { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function ProductFilterClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams?.get("search") || "");
  const [sortBy, setSortBy] = useState(searchParams?.get("sortBy") || "createdAt");
  const [sortOrder, setSortOrder] = useState(
    (searchParams?.get("sortOrder") as "asc" | "desc") || "desc"
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    // Construct new query params
    const query = new URLSearchParams();

    if (search) query.set("search", search);
    if (sortBy) query.set("sortBy", sortBy);
    if (sortOrder) query.set("sortOrder", sortOrder);
    query.set("page", "1"); // reset to first page on new search

    router.push(`${pathname}?${query.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex flex-col md:flex-row md:items-center gap-2 mb-4"
    >
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded px-3 py-2 flex-1"
      />

      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="border rounded px-2 py-2"
      >
        <option value="createdAt">Created At</option>
        <option value="price">Price</option>
        <option value="name">Name</option>
      </select>

      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
        className="border rounded px-2 py-2"
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Search
      </button>
    </form>
  );
}
