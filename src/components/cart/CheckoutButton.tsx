"use client";

import React, { useState } from "react";
import Swal from "sweetalert2";
import { toast } from "sonner";

export default function CheckoutButton({
  disabled,
  subtotal,
  shippingFee,
  discountAmount,
}: {
  disabled: boolean;
  subtotal: number;
  shippingFee: number;
  discountAmount: number;
}) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    // for now we take address from user input via modal
    const { value: formValues } = await Swal.fire({
      title: "Shipping Address",
      html: `
        <input id="fullName" class="swal2-input" placeholder="Full Name" />
        <input id="phone" class="swal2-input" placeholder="Phone" />
        <input id="addressLine1" class="swal2-input" placeholder="Address Line 1" />
        <input id="city" class="swal2-input" placeholder="City" />
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Place Order",
      preConfirm: () => {
        const fullName = (document.getElementById("fullName") as HTMLInputElement)
          ?.value;
        const phone = (document.getElementById("phone") as HTMLInputElement)
          ?.value;
        const addressLine1 = (
          document.getElementById("addressLine1") as HTMLInputElement
        )?.value;
        const city = (document.getElementById("city") as HTMLInputElement)?.value;

        if (!fullName || !phone || !addressLine1 || !city) {
          Swal.showValidationMessage("Please fill all required fields");
          return;
        }

        return { fullName, phone, addressLine1, city };
      },
    });

    if (!formValues) return;

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/order/checkout`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            address: {
              fullName: formValues.fullName,
              phone: formValues.phone,
              addressLine1: formValues.addressLine1,
              city: formValues.city,
              addressLine2: null,
              district: null,
              postalCode: null,
              label: "Home",
            },
            discountAmount,
            shippingFee,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.message || "Checkout failed!");
        return;
      }

      toast.success("Order placed successfully 🎉");

      // update navbar badge
      window.dispatchEvent(new Event("cart-updated"));

      // refresh page to show empty cart
      window.location.reload();
    } catch (err) {
      console.error(err);
      toast.error("Network error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      disabled={disabled || loading}
      onClick={handleCheckout}
      className={`w-full rounded-2xl px-4 py-3 font-semibold transition active:scale-[0.98]
      ${
        disabled
          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
          : loading
          ? "bg-green-400 text-white cursor-wait"
          : "bg-green-600 text-white hover:bg-green-700"
      }`}
    >
      {disabled ? "Cart Empty" : loading ? "Placing Order..." : "Checkout"}
    </button>
  );
}
