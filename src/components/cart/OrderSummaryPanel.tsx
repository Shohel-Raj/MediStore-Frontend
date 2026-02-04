import React from "react";
// import CheckoutButton from "./CheckoutButton";
import { getMyCartServer } from "@/services/common/cartService.server";
import CheckoutButton from "./CheckoutButton";
// import { getMyCartServer } from "@/services/cart/cartService.server";

export default async function OrderSummaryPanel() {
  const cart = await getMyCartServer();

  const items = cart?.items || [];

  const subtotal = items.reduce((sum: number, item: any) => {
    const price = item.product.discountPrice ?? item.product.price;
    return sum + price * item.quantity;
  }, 0);

  const shippingFee = subtotal > 0 ? 50 : 0;
  const discountAmount = 0;
  const total = subtotal - discountAmount + shippingFee;

  return (
    <div className="rounded-2xl border bg-white p-5 md:p-6 sticky top-24">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Order Details
      </h2>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-semibold text-gray-900">৳{subtotal}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="font-semibold text-gray-900">৳{shippingFee}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Discount</span>
          <span className="font-semibold text-gray-900">৳{discountAmount}</span>
        </div>

        <hr />

        <div className="flex justify-between text-base">
          <span className="font-semibold text-gray-900">Total</span>
          <span className="font-bold text-gray-900">৳{total}</span>
        </div>
      </div>

      <div className="mt-5">
        <CheckoutButton
          disabled={!items.length}
          subtotal={subtotal}
          shippingFee={shippingFee}
          discountAmount={discountAmount}
        />
      </div>
    </div>
  );
}
