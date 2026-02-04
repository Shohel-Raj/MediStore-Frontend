import React from "react";
import Image from "next/image";
import CartItemActions from "./CartItemActions";

export default function CartItemCard({ item }: { item: any }) {
  const product = item.product;

  const unitPrice = product?.discountPrice ?? product?.price ?? 0;
  const subtotal = unitPrice * item.quantity;

  return (
    <div className="flex gap-4 rounded-2xl border p-4 hover:shadow-sm transition bg-white">
      {/* Image */}
      <div className="relative h-20 w-20 overflow-hidden rounded-xl border bg-gray-50 shrink-0">
        <img
          src={product?.image || "/placeholder.png"}
          alt={product?.name || "product"}
          fill
          className="object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900 line-clamp-1">
          {product?.name}
        </h3>

        <p className="text-sm text-gray-600 mt-1">
          Unit Price:{" "}
          <span className="font-semibold text-gray-900">৳{unitPrice}</span>
        </p>

        <p className="text-sm text-gray-600 mt-1">
          Subtotal:{" "}
          <span className="font-semibold text-gray-900">৳{subtotal}</span>
        </p>

        {/* Client actions */}
        <div className="mt-3">
          <CartItemActions itemId={item.id} quantity={item.quantity} />
        </div>
      </div>
    </div>
  );
}
