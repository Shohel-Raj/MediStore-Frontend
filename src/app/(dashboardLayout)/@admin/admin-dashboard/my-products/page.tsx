import React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { sellerProductServiceServer } from "@/services/product/getMyProducts.server";
import AdminProductsTableClient from "@/components/admin/ProductsTable";

export const dynamic = "force-dynamic";

interface Props {
  searchParams?: { page?: string; limit?: string };
}

export default async function MyProductsPage({ searchParams }: Props) {
  // Parse page & limit from URL query, default to 1 & 10
  const searchParam=await searchParams
  const page = parseInt(searchParam?.page || "1");
  const limit =parseInt(searchParam?.limit || "10");

  const { data, error } = await sellerProductServiceServer.getAllProducts(
    {
      page,
      limit,
      sortBy: "createdAt",
      sortOrder: "desc",
    },
    { cache: "no-store" }
  );

  const products = data?.data || [];
  const pagination = data?.pagination;
  
  return (
    <div className="w-11/12 mx-auto py-8 space-y-5">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">My Products</h1>

        <Button asChild>
          <Link href="/Admin-dashboard/create-product">Add Product</Link>
        </Button>
      </div>

      {error ? (
        <p className="text-sm text-destructive">{error.message}</p>
      ) : products.length === 0 ? (
        <p className="text-muted-foreground">No products found.</p>
      ) : (
        <>
          {/* Products Table */}
          <AdminProductsTableClient products={products} />

          {/* Pagination */}
          {pagination && (
            <div className="flex justify-center items-center gap-3 mt-6">
              {pagination.page > 1 && (
                <Link
                  href={`?page=${pagination.page - 1}&limit=${pagination.limit}`}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Previous
                </Link>
              )}

              <span>
                Page {pagination.page} of {pagination.totalPages}
              </span>

              {pagination.page < pagination.totalPages && (
                <Link
                  href={`?page=${pagination.page + 1}&limit=${pagination.limit}`}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Next
                </Link>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
