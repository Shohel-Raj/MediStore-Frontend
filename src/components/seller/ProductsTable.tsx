"use client";

import React, { useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Product } from "@/services/product/getMyProducts.server";
import { sellerProductServiceClient } from "@/services/product/getMyProducts.client";

// import { Product } from "@/services/product/sellerProduct.service.server";
// import { sellerProductServiceClient } from "@/services/product/sellerProduct.service.client";

export default function SellerProductsTableClient({
  products,
}: {
  products: Product[];
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = (id: string) => {
    const ok = confirm("Are you sure you want to delete this product?");
    if (!ok) return;

    startTransition(async () => {
      const { error } = await sellerProductServiceClient.deleteProductById(id);

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Product deleted successfully");
      router.refresh();
    });
  };

  return (
    <div className="rounded-xl border bg-background overflow-hidden">
      <Table >
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.map((product, index) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{index + 1}</TableCell>

              <TableCell>
                <div className="flex flex-col">
                  <span className="font-semibold">{product.name}</span>
                  <span className="text-xs text-muted-foreground line-clamp-1">
                    {product.description || "No description"}
                  </span>
                </div>
              </TableCell>

              <TableCell>
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    product.status === "ACTIVE"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {product.status}
                </span>
              </TableCell>

              <TableCell>{product.stock}</TableCell>

              <TableCell>
                <div className="flex flex-col">
                  <span className="font-semibold">${product.price}</span>
                  {product.discountPrice ? (
                    <span className="text-xs text-muted-foreground line-through">
                      ${product.discountPrice}
                    </span>
                  ) : null}
                </div>
              </TableCell>

              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button asChild size="sm" variant="outline">
                    <Link href={`/seller-dashboard/my-products/${product.id}`}>
                      View
                    </Link>
                  </Button>

                  <Button asChild size="sm">
                    <Link
                      href={`/seller-dashboard/my-products/${product.id}/edit`}
                    >
                      Update
                    </Link>
                  </Button>

                  <Button
                    size="sm"
                    variant="destructive"
                    disabled={isPending}
                    onClick={() => handleDelete(product.id)}
                  >
                    {isPending ? "Deleting..." : "Delete"}
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
