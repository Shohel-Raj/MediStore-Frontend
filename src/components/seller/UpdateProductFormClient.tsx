"use client";

import React, { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Product, ProductData } from "@/services/product/getMyProducts.server";
import { sellerProductServiceClient } from "@/services/product/getMyProducts.client";

// import { Product } from "@/services/product/sellerProduct.service.server";
// import {
//   ProductData,
//   sellerProductServiceClient,
// } from "@/services/product/sellerProduct.service.client";

export default function UpdateProductFormClient({
  product,
}: {
  product: Product;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const initialState = useMemo<ProductData>(
    () => ({
      name: product.name,
      description: product.description || "",
      manufacturer: product.manufacturer || "",
      dosageForm: product.dosageForm || "",
      strength: product.strength || "",
      packSize: product.packSize || "",
      price: product.price,
      discountPrice: product.discountPrice || undefined,
      stock: product.stock,
      lowStockThreshold: product.lowStockThreshold,
      status: product.status,
      image: product.image || "",
      images: product.images || [],
    }),
    [product]
  );

  const [form, setForm] = useState<ProductData>(initialState);

  const onChange = (key: keyof ProductData, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]:
        key === "price" ||
        key === "stock" ||
        key === "discountPrice" ||
        key === "lowStockThreshold"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      const { error } = await sellerProductServiceClient.updateProductById(
        product.id,
        form
      );

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Product updated successfully");
      router.push("/seller-dashboard/my-products");
      router.refresh();
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-xl border p-6">
      <div className="space-y-2">
        <Label>Product Name</Label>
        <Input
          value={form.name}
          onChange={(e) => onChange("name", e.target.value)}
          placeholder="Product name"
        />
      </div>

      <div className="space-y-2">
        <Label>Description</Label>
        <Input
          value={form.description}
          onChange={(e) => onChange("description", e.target.value)}
          placeholder="Short description"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Price</Label>
          <Input
            type="number"
            value={form.price}
            onChange={(e) => onChange("price", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Discount Price</Label>
          <Input
            type="number"
            value={form.discountPrice ?? ""}
            onChange={(e) => onChange("discountPrice", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Stock</Label>
          <Input
            type="number"
            value={form.stock}
            onChange={(e) => onChange("stock", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Low Stock Threshold</Label>
          <Input
            type="number"
            value={form.lowStockThreshold ?? 0}
            onChange={(e) => onChange("lowStockThreshold", e.target.value)}
          />
        </div>
      </div>

      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? "Updating..." : "Update Product"}
      </Button>
    </form>
  );
}
