"use server";

import { cookies } from "next/headers";

const API_URL = process.env.API_URL;

type ActionResult = {
  ok: boolean;
  message: string;
};

export async function createProductAction(
  formData: FormData,
): Promise<ActionResult> {
  try {
    const name = (formData.get("name") as string) || "";
    const description = (formData.get("description") as string) || "";

    const manufacturer = (formData.get("manufacturer") as string) || "";
    const dosageForm = (formData.get("dosageForm") as string) || "";
    const strength = (formData.get("strength") as string) || "";
    const packSize = (formData.get("packSize") as string) || "";

    const price = Number(formData.get("price"));
    const discountPriceRaw = (formData.get("discountPrice") as string) || "";
    const discountPrice =
      discountPriceRaw.trim() !== "" ? Number(discountPriceRaw) : null;

    const stock = Number(formData.get("stock"));
    const lowStockThresholdRaw =
      (formData.get("lowStockThreshold") as string) || "";
    const lowStockThreshold =
      lowStockThresholdRaw.trim() !== "" ? Number(lowStockThresholdRaw) : 10;

    const image = (formData.get("image") as string) || "";
    const imagesRaw = (formData.get("images") as string) || "";

    // ✅ basic validation
    if (!name.trim()) return { ok: false, message: "Product name is required." };
    if (!price || price <= 0)
      return { ok: false, message: "Price must be greater than 0." };
    if (stock < 0) return { ok: false, message: "Stock cannot be negative." };

    const productData = {
      name,
      description: description.trim() ? description : null,

      manufacturer: manufacturer.trim() ? manufacturer : null,
      dosageForm: dosageForm.trim() ? dosageForm : null,
      strength: strength.trim() ? strength : null,
      packSize: packSize.trim() ? packSize : null,

      price,
      discountPrice,

      stock,
      lowStockThreshold,

      image: image.trim() ? image : null,
      images: imagesRaw
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean),

      // ✅ default status (not shown in UI)
      status: "ACTIVE",
    };

    const cookieStore = await cookies();

    const res = await fetch(`${API_URL}/api/v1/seller/medicines`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(productData),
      cache: "no-store",
    });

    if (!res.ok) {
      let message = "Product post failed!";
      try {
        const data = await res.json();
        message = data?.message || message;
      } catch {}
      return { ok: false, message };
    }

    return {
      ok: true,
      message: "Product added successfully (Aactive by default).",
    };
  } catch {
    return { ok: false, message: "Something went wrong. Please try again." };
  }
}
