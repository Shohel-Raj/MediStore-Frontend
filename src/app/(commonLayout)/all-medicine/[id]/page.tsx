import React from "react";
import Link from "next/link";
import { productService } from "@/services/product/productService.server";

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
  const {id}= await params
  console.log(id)
  const product: Product = await productService.getProductById(id);

  return (
    <div className="max-w-5xl mx-auto py-8 space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/all-medicine"
          className="text-blue-600 hover:underline text-sm"
        >
          ← Back to Products
        </Link>
        <h1 className="text-2xl font-bold">{product.name}</h1>
      </div>

      {product.image && (
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover rounded-lg"
        />
      )}

      <div className="space-y-3">
        <p>{product.description || "No description available"}</p>
        <p>
          <span className="font-semibold">Price: </span>${product.price}
          {product.discountPrice && (
            <span className="line-through text-gray-500 ml-2">
              ${product.discountPrice}
            </span>
          )}
        </p>
        <p>
          <span className="font-semibold">Stock: </span>
          {product.stock}
        </p>
        <p>
          <span className="font-semibold">Manufacturer: </span>
          {product.manufacturer || "N/A"}
        </p>
        <p>
          <span className="font-semibold">Dosage Form: </span>
          {product.dosageForm || "N/A"}
        </p>
      </div>

      {/* Gallery */}
      {product.images?.length > 0 && (
        <div>
          <h3 className="font-semibold mb-2">More Images</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {product.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`${product.name}-${idx}`}
                className="w-full h-32 object-cover rounded-lg"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
