"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";

type CartResponse = {
  id: string | null;
  userId: string;
  items: any[];
  totalItems: number;
};

export default function CartIconButton() {
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCartCount = useCallback(async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/cart/me`,
        {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        // not logged in → no badge
        if (res.status === 401 || res.status === 403) {
          setCount(0);
          return;
        }

        toast.error(data?.message || "Failed to load cart");
        return;
      }

      // support both: {data:{...}} or direct {...}
      const cart: CartResponse = data?.data ?? data;

      setCount(cart?.totalItems ?? 0);
    } catch (err) {
      console.error(err);
      toast.error("Cart load failed");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCartCount();
  }, [fetchCartCount]);

  // 🔥 Listen for cart update events (from AddToCartButton)
  useEffect(() => {
    const handler = () => fetchCartCount();
    window.addEventListener("cart-updated", handler);
    return () => window.removeEventListener("cart-updated", handler);
  }, [fetchCartCount]);

  return (
    <Link
      href="/cart"
      className="relative inline-flex items-center justify-center rounded-full p-2 hover:bg-muted transition"
      aria-label="Cart"
    >
      <ShoppingCart className="h-5 w-5" />

      {/* Loading indicator */}
      {loading && (
        <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-gray-400 animate-pulse" />
      )}

      {/* Badge */}
      {!loading && count > 0 && (
        <span className="absolute -top-1 -right-1 min-w-4.5 h-4.5 px-1 rounded-full bg-red-600 text-white text-[11px] font-bold flex items-center justify-center">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
}
