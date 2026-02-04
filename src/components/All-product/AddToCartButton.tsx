"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import Swal from "sweetalert2";

type AddToCartButtonProps = {
  productId: string;
  disabled?: boolean;
};

export default function AddToCartButton({
  productId,
  disabled = false,
}: AddToCartButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    if (!productId) {
      toast.error("Invalid product!");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/cart/add`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ productId, quantity: 1 }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        // login required
        if (res.status === 401 || res.status === 403) {
          await Swal.fire({
            icon: "warning",
            title: "Login Required",
            text: "Please login first to add items to cart.",
            confirmButtonText: "OK",
            confirmButtonColor: "#2563EB",
          });
          return;
        }

        toast.error(data?.message || "Failed to add to cart!");
        return;
      }

      toast.success("Added to cart successfully 🎉");
    } catch (err) {
      console.error(err);
      toast.error("Network error! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={disabled || loading}
      className={`w-full rounded-xl px-4 py-3 text-sm font-semibold transition active:scale-[0.98]
      ${
        disabled
          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
          : loading
          ? "bg-blue-400 text-white cursor-wait"
          : "bg-blue-600 text-white hover:bg-blue-700"
      }`}
    >
      {disabled ? (
        "Out of Stock"
      ) : loading ? (
        <span className="flex items-center justify-center gap-2">
          <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
          Adding...
        </span>
      ) : (
        "🛒 Add to Cart"
      )}
    </button>
  );
}
