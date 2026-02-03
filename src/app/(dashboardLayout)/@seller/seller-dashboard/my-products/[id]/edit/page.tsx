import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { sellerProductServiceServer } from "@/services/product/getMyProducts.server";
import UpdateProductFormClient from "@/components/seller/UpdateProductFormClient";


export const dynamic = "force-dynamic";

export default async function UpdateProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data, error } = await sellerProductServiceServer.getProductById(id);

  if (error || !data) return notFound();

  return (
    <div className="w-11/12 md:w-10/12 mx-auto py-8 space-y-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Update Product</h1>
          <p className="text-muted-foreground text-sm">
            Edit product info and save changes
          </p>
        </div>

        <Button asChild variant="outline">
          <Link href="/seller-dashboard/my-products">Back</Link>
        </Button>
      </div>

      <UpdateProductFormClient product={data} />
    </div>
  );
}
