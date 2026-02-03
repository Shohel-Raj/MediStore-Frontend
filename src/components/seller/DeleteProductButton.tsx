"use client";

import React, { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { sellerProductService } from "@/services/product/getMyProducts.server";

export default function DeleteProductButton({ productId }: { productId: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    const ok = confirm("Are you sure you want to delete this product?");
    if (!ok) return;

    startTransition(async () => {
      const { error } = await sellerProductService.deleteProductById(productId);

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Product deleted successfully");
      router.refresh(); // refresh server component data
    });
  };

  return (
    <Button
      size="sm"
      variant="destructive"
      onClick={handleDelete}
      disabled={isPending}
    >
      {isPending ? "Deleting..." : "Delete"}
    </Button>
  );
}
