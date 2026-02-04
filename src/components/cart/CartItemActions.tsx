"use client";

import React, { useState } from "react";
import Swal from "sweetalert2";
import { toast } from "sonner";

export default function CartItemActions({
  itemId,
  quantity,
}: {
  itemId: string;
  quantity: number;
}) {
  const [qty, setQty] = useState(quantity);
  const [loading, setLoading] = useState(false);

  const updateQty = async (newQty: number) => {
    if (newQty < 1) return;

    try {
      setLoading(true);
      setQty(newQty);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/cart/item/${itemId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ quantity: newQty }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.message || "Failed to update quantity");
        setQty(quantity); // rollback
        return;
      }

      toast.success("Quantity updated");
      window.dispatchEvent(new Event("cart-updated"));
      window.location.reload(); // easiest refresh server cart
    } catch (err) {
      console.error(err);
      toast.error("Network error");
      setQty(quantity);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async () => {
    const result = await Swal.fire({
      title: "Remove item?",
      text: "This item will be removed from your cart.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#DC2626",
    });

    if (!result.isConfirmed) return;

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/cart/item/${itemId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.message || "Failed to remove item");
        return;
      }

      toast.success("Item removed");
      window.dispatchEvent(new Event("cart-updated"));
      window.location.reload();
    } catch (err) {
      console.error(err);
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-3">
      {/* Qty Controls */}
      <div className="flex items-center rounded-xl border overflow-hidden">
        <button
          disabled={loading || qty <= 1}
          onClick={() => updateQty(qty - 1)}
          className="px-3 py-2 text-sm font-bold disabled:opacity-50 hover:bg-gray-50"
        >
          -
        </button>

        <span className="px-4 py-2 text-sm font-semibold">{qty}</span>

        <button
          disabled={loading}
          onClick={() => updateQty(qty + 1)}
          className="px-3 py-2 text-sm font-bold disabled:opacity-50 hover:bg-gray-50"
        >
          +
        </button>
      </div>

      {/* Remove */}
      <button
        disabled={loading}
        onClick={removeItem}
        className="rounded-xl px-4 py-2 text-sm font-semibold border hover:bg-red-50 text-red-600"
      >
        Remove
      </button>
    </div>
  );
}
