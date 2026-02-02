"use client";

import React from "react";
import { toast } from "sonner";
import { createProductAction } from "@/actions/create-product.action";

export default function CreateProductFormClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const handleAction = async (formData: FormData) => {
    const toastId = toast.loading("Posting product...");

    const result = await createProductAction(formData);

    if (!result.ok) {
      toast.error(result.message, { id: toastId });
      return;
    }

    toast.success(result.message, { id: toastId });

    // ✅ reset form after success
    const form = document.getElementById("product-form") as HTMLFormElement | null;
    form?.reset();
  };

  return (
    <form id="product-form" action={handleAction} className="space-y-10">
      {children}
    </form>
  );
}
