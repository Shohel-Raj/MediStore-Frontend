import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { sellerProductServiceServer } from "@/services/product/getMyProducts.server";

export const dynamic = "force-dynamic";

export default async function SellerProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: product, error } =
    await sellerProductServiceServer.getProductById(id);

  if (error || !product) return notFound();

  return (
    <div className="w-11/12 md:w-10/12 mx-auto py-8 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-sm text-muted-foreground">
            Product ID: <span className="font-medium">{product.id}</span>
          </p>
        </div>

        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href="/seller-dashboard/my-products">Back</Link>
          </Button>

          <Button asChild>
            <Link href={`/seller-dashboard/my-products/${product.id}/edit`}>
              Update
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left - Image */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Product Image</CardTitle>
            <CardDescription>Preview of your product</CardDescription>
          </CardHeader>

          <CardContent>
            {product.image ? (
              // using normal img to avoid next/image domain issues
              <img
                src={product.image}
                alt={product.name}
                height={300}
                width={300}
                className="w-full h-64 object-cover rounded-xl border"
              />
            ) : (
              <div className="w-full h-64 rounded-xl border flex items-center justify-center text-muted-foreground">
                No Image
              </div>
            )}
          </CardContent>
        </Card>

        {/* Right - Details */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Product Details</CardTitle>
            <CardDescription>Full information of the product</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Status + Stock */}
            <div className="flex flex-wrap gap-3">
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  product.status === "ACTIVE"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {product.status}
              </span>

              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                Stock: {product.stock}
              </span>

              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-orange-100 text-orange-700">
                Low Stock: {product.lowStockThreshold}
              </span>
            </div>

            {/* Pricing */}
            <div className="rounded-xl border p-4 space-y-2">
              <h3 className="font-semibold">Pricing</h3>

              <p className="text-sm">
                Price:{" "}
                <span className="font-semibold text-base">${product.price}</span>
              </p>

              {product.discountPrice ? (
                <p className="text-sm">
                  Discount Price:{" "}
                  <span className="font-semibold text-base">
                    ${product.discountPrice}
                  </span>{" "}
                  <span className="text-xs text-muted-foreground line-through ml-2">
                    ${product.price}
                  </span>
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No discount applied
                </p>
              )}
            </div>

            {/* Description */}
            <div className="rounded-xl border p-4 space-y-2">
              <h3 className="font-semibold">Description</h3>
              <p className="text-sm text-muted-foreground">
                {product.description || "No description available"}
              </p>
            </div>

            {/* Medicine Info */}
            <div className="rounded-xl border p-4 space-y-3">
              <h3 className="font-semibold">Medicine Info</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <p>
                  <span className="font-medium">Manufacturer:</span>{" "}
                  {product.manufacturer || "N/A"}
                </p>

                <p>
                  <span className="font-medium">Dosage Form:</span>{" "}
                  {product.dosageForm || "N/A"}
                </p>

                <p>
                  <span className="font-medium">Strength:</span>{" "}
                  {product.strength || "N/A"}
                </p>

                <p>
                  <span className="font-medium">Pack Size:</span>{" "}
                  {product.packSize || "N/A"}
                </p>
              </div>
            </div>

            {/* Extra */}
            <div className="rounded-xl border p-4 space-y-2 text-sm">
              <h3 className="font-semibold">Meta</h3>

              <p>
                <span className="font-medium">Slug:</span> {product.slug}
              </p>

              <p>
                <span className="font-medium">Created At:</span>{" "}
                {new Date(product.createdAt).toLocaleString()}
              </p>

              <p>
                <span className="font-medium">Updated At:</span>{" "}
                {new Date(product.updatedAt).toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gallery */}
      {product.images?.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>More Images</CardTitle>
            <CardDescription>Gallery</CardDescription>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {product.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${product.name}-${idx}`}
                  height={300}
                  width={300}
                  className="w-full h-32 object-cover rounded-xl border"
                />
              ))}
            </div>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}
