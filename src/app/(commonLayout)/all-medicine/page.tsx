import React from "react";
import Link from "next/link";
import ProductFilterClient from "@/components/All-product/ProductFilterClient";
import { productService } from "@/services/product/productService.server";

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

type Pagination = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
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
  const page = parseInt(searchParams?.page || "1");
  const limit = 12;

  const { data: products, pagination } = await productService.getAllProducts({
    search: searchParams?.search,
    manufacturer: searchParams?.manufacturer,
    dosageForm: searchParams?.dosageForm,
    page,
    limit,
    skip: (page - 1) * limit,
    sortBy: (searchParams?.sortBy as any) || "createdAt",
    sortOrder: searchParams?.sortOrder || "desc",
  });

  return (
    <div className="max-w-7xl mx-auto py-8 space-y-6">
      <h1 className="text-3xl font-bold">All Products</h1>

      {/* Client-side Filter/Search */}
      <ProductFilterClient
        searchParams={searchParams}
        totalPages={pagination.totalPages}
        currentPage={pagination.page}
      />

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product: Product) => (
          <Link
            key={product.id}
            href={`/all-medicine/${product.id}`}
            className="border rounded-xl p-4 hover:shadow-md transition"
          >
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg mb-2"
              />
            ) : (
              <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 mb-2">
                No Image
              </div>
            )}

            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {product.description || "No description"}
            </p>
            <p className="text-sm font-medium mt-1">
              Price: ${product.price}
              {product.discountPrice && (
                <span className="line-through text-muted-foreground ml-2">
                  ${product.discountPrice}
                </span>
              )}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
