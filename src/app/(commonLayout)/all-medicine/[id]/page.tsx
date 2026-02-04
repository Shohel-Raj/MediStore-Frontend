import React from "react";
import Link from "next/link";
import { productService } from "@/services/product/productService.server";
import AddToCartButton from "@/components/All-product/AddToCartButton";

export const dynamic = "force-dynamic";

type Product = {
  id: string;
  name: string;
  description?: string;
  manufacturer?: string;
  dosageForm?: string;
  strength?: string;
  packSize?: string;
  price: number;
  discountPrice?: number;
  stock: number;
  lowStockThreshold: number;
  image?: string | null;
  images: string[];
  status: "ACTIVE" | "INACTIVE";
};

export default async function ProductDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  const productData: any = await productService.getProductById(id);
  const product: Product = productData?.data;

  const hasDiscount =
    typeof product?.discountPrice === "number" &&
    product.discountPrice < product.price;

  const finalPrice = hasDiscount ? product.discountPrice! : product.price;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F9FAFB] to-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
        {/* Top Bar */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <Link
              href="/all-medicine"
              className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
            >
              <span className="text-lg leading-none">←</span> Back to Medicines
            </Link>

            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
              {product.name}
            </h1>

            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                  product.status === "ACTIVE"
                    ? "bg-green-50 text-green-700 border-green-200"
                    : "bg-gray-100 text-gray-600 border-gray-200"
                }`}
              >
                {product.status === "ACTIVE" ? "Available" : "Unavailable"}
              </span>

              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                  product.stock > product.lowStockThreshold
                    ? "bg-blue-50 text-blue-700 border-blue-200"
                    : "bg-red-50 text-red-700 border-red-200"
                }`}
              >
                {product.stock > product.lowStockThreshold
                  ? "In Stock"
                  : "Low Stock"}
              </span>
            </div>
          </div>

          {/* Price + Add to Cart */}
          <div className="w-full md:w-auto">
            <div className="rounded-2xl border bg-white shadow-sm p-4 md:p-5 min-w-[280px]">
              <p className="text-xs text-gray-500 font-medium">Price</p>

              <div className="flex items-end gap-2 mt-1">
                <p className="text-2xl font-bold text-gray-900">
                  ${finalPrice}
                </p>

                {hasDiscount && (
                  <p className="text-sm text-gray-500 line-through mb-0.5">
                    ${product.price}
                  </p>
                )}
              </div>

              {hasDiscount && (
                <p className="text-xs mt-1 font-semibold text-green-700">
                  You save ${(product.price - product.discountPrice!).toFixed(2)}
                </p>
              )}

              <div className="mt-3 border-t pt-3 flex items-center justify-between">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Stock:</span>{" "}
                  <span
                    className={`font-semibold ${
                      product.stock > product.lowStockThreshold
                        ? "text-gray-900"
                        : "text-red-600"
                    }`}
                  >
                    {product.stock}
                  </span>
                </p>
              </div>

              {/* Client Button */}
              <div className="mt-4">
                <AddToCartButton
                  product={{
                    id: product.id,
                    name: product.name,
                    image: product.image || "",
                    price: finalPrice,
                    stock: product.stock,
                  }}
                />
              </div>

              <p className="text-[11px] text-gray-500 mt-3">
                🛒 Add this medicine to your cart for quick checkout.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mt-7">
          {/* Left: Image + Gallery */}
          <div className="lg:col-span-2 space-y-5">
            <div className="rounded-2xl border bg-white shadow-sm overflow-hidden">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-[260px] md:h-[340px] object-cover"
                />
              ) : (
                <div className="w-full h-[260px] md:h-[340px] flex items-center justify-center bg-gray-50">
                  <p className="text-sm text-gray-500">No image available</p>
                </div>
              )}
            </div>

            {/* Gallery */}
            {product.images?.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-800 mb-3">
                  More Photos
                </h3>

                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {product.images.map((img, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border bg-white shadow-sm overflow-hidden hover:shadow-md transition"
                    >
                      <img
                        src={img}
                        alt={`${product.name}-${idx}`}
                        className="w-full h-24 object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Details */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border bg-white shadow-sm p-5 md:p-7">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                About this medicine
              </h2>

              {/* Description */}
              <div className="rounded-xl bg-gray-50 border p-4">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {product.description || "No description available"}
                </p>
              </div>

              {/* Quick Info */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InfoCard label="Manufacturer" value={product.manufacturer} />
                <InfoCard label="Dosage Form" value={product.dosageForm} />
                <InfoCard label="Strength" value={product.strength} />
                <InfoCard label="Pack Size" value={product.packSize} />
              </div>

              <div className="mt-6 border-t pt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-900">
                    Low stock warning at:
                  </span>{" "}
                  {product.lowStockThreshold}
                </p>

                <p className="text-xs text-gray-500">
                  Product ID:{" "}
                  <span className="font-mono text-gray-700">{product.id}</span>
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border bg-blue-50 p-4">
              <p className="text-sm text-blue-900 font-semibold">
                💡 Safety Reminder
              </p>
              <p className="text-sm text-blue-800 mt-1">
                Always consult a doctor before taking any medicine and keep out
                of reach of children.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Small server helper component */
function InfoCard({
  label,
  value,
}: {
  label: string;
  value?: string;
}) {
  return (
    <div className="rounded-xl border p-4">
      <p className="text-xs text-gray-500 font-medium">{label}</p>
      <p className="text-sm font-semibold text-gray-900 mt-1">
        {value || "N/A"}
      </p>
    </div>
  );
}
