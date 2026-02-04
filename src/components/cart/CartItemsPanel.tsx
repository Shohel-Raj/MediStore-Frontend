import { getMyCartServer } from "@/services/common/cartService.server";
import React from "react";
import CartItemCard from "./CartItemCard";
// import CartItemCard from "./CartItemCard";
// import { getMyCartServer } from "@/services/cart/cartService.server";

export default async function CartItemsPanel() {
  const cart = await getMyCartServer();

  if (!cart?.items?.length) {
    return (
      <div className="rounded-2xl border bg-white p-8 text-center">
        <h2 className="text-xl font-semibold text-gray-900">Cart is empty</h2>
        <p className="text-gray-600 mt-2">
          Add some products to your cart first.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border bg-white p-5 md:p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Cart Items ({cart.totalItems})
      </h2>

      <div className="space-y-4">
        {cart.items.map((item: any) => (
          <CartItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
