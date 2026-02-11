import React from "react";
import Link from "next/link";
import ProductFilterClient from "@/components/All-product/ProductFilterClient";
import { productService } from "@/services/product/productService.server";
import ProductCard from "@/components/All-product/ProductCard";

export const dynamic = "force-dynamic";


type Product = {
  id: string;
  name: string;
  description?: string;
  manufacturer?: string;
  dosageForm?: string;
  strength?: string;
  price: number;
  discountPrice?: number;
  stock: number;
  image?: string | null;
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams?: {
    search?: string;
    manufacturer?: string;
    dosageForm?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    page?: string;
  };
}) {
  const searchParam= await searchParams;
  const page = parseInt(searchParam?.page || "1");
  const limit = 12;

  const { data: products, pagination } =
    await productService.getAllProducts({
      search: searchParam?.search,
      manufacturer: searchParam?.manufacturer,
      dosageForm: searchParam?.dosageForm,
      page,
      limit,
      skip: (page - 1) * limit,
      sortBy: searchParam?.sortBy || "createdAt",
      sortOrder: searchParam?.sortOrder || "desc",
    });

  // Helper to build query string safely
  const buildQuery = (pageNumber: number) => {
    const params = new URLSearchParams();

    if (searchParam?.search)
      params.set("search", searchParam.search);

    if (searchParam?.manufacturer)
      params.set("manufacturer", searchParam.manufacturer);

    if (searchParam?.dosageForm)
      params.set("dosageForm", searchParam.dosageForm);

    if (searchParam?.sortBy)
      params.set("sortBy", searchParam.sortBy);

    if (searchParam?.sortOrder)
      params.set("sortOrder", searchParam.sortOrder);

    params.set("page", pageNumber.toString());

    return `?${params.toString()}`;
  };
  return (
    <div className="max-w-7xl mx-auto py-8 space-y-6">
      <h1 className="text-3xl font-bold">All Products</h1>

      <ProductFilterClient />

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product: Product) => (
          <ProductCard product={product} key={product.id}/>
        ))}
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-10">
          
          {/* Previous */}
          {page > 1 && (
            <Link
              href={buildQuery(page - 1)}
              className="px-3 py-2 border rounded hover:bg-gray-100"
            >
              Prev
            </Link>
          )}

          {/* Page Numbers */}
          {Array.from(
            { length: pagination.totalPages },
            (_, i) => {
              const pageNumber = i + 1;
              const isActive = pageNumber === page;

              return (
                <Link
                  key={pageNumber}
                  href={buildQuery(pageNumber)}
                  className={`px-4 py-2 border rounded ${
                    isActive
                      ? "bg-black text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {pageNumber}
                </Link>
              );
            }
          )}

          {/* Next */}
          {page < pagination.totalPages && (
            <Link
              href={buildQuery(page + 1)}
              className="px-3 py-2 border rounded hover:bg-gray-100"
            >
              Next
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
