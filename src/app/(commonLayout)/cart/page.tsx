import CartItemsPanel from "@/components/cart/CartItemsPanel";
import OrderSummaryPanel from "@/components/cart/OrderSummaryPanel";
import React from "react";


export default async function CartPage() {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#fafafa]">
      <div className="mx-auto max-w-6xl px-4 pt-8">
        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            🛒 My Cart
          </h1>
          <p className="text-gray-600 mt-1">
            Review your items and place your order.
          </p>
        </div>

        {/* 2 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT: Cart Items */}
          <div className="lg:col-span-2">
            <CartItemsPanel />
          </div>

          {/* RIGHT: Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummaryPanel/>
          </div>
        </div>
      </div>
    </div>
  );
}
