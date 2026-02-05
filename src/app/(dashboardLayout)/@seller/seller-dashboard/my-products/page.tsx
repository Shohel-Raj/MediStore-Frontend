import React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { sellerProductServiceServer } from "@/services/product/getMyProducts.server";
import SellerProductsTableClient from "@/components/seller/ProductsTable";
// import { sellerProductServiceServer } from "@/services/product/sellerProduct.service.server";
// import SellerProductsTableClient from "./SellerProductsTableClient";

export const dynamic = "force-dynamic";

export default async function MyProductsPage() {
  const { data, error } = await sellerProductServiceServer.getAllProducts(
    {
      page: 1,
      limit: 50,
      sortBy: "createdAt",
      sortOrder: "desc",
    },
    { cache: "no-store" }
  );

  const products = data?.data || [];

  return (
    <div className="w-11/12 mx-auto py-8 space-y-5">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">My Products</h1>

        <Button asChild>
          <Link href="/seller-dashboard/create-product">Add Product</Link>
        </Button>
      </div>

      {error ? (
        <p className="text-sm text-destructive">{error.message}</p>
      ) : products.length === 0 ? (
        <p className="text-muted-foreground">No products found.</p>
      ) : (
        <SellerProductsTableClient products={products} />
      )}
    </div>
  );
}
