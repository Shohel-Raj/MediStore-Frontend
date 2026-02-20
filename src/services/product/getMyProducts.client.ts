import { Pagination, Product } from "./getMyProducts.server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("Missing NEXT_PUBLIC_API_URL in environment variables");
}

export interface ProductData {
  name: string;
  description?: string;
  manufacturer?: string;
  dosageForm?: string;
  strength?: string;
  packSize?: string;
  price: number;
  discountPrice?: number;
  stock: number;
  lowStockThreshold?: number;
  image?: string;
  images?: string[];
  status?: "ACTIVE" | "INACTIVE";
}

type ServiceResult<T> =
  | { data: T; error: null }
  | { data: null; error: { message: string } };

export const sellerProductServiceClient = {
  async getAllProductsClient(
    params?: Record<string, string | number | boolean>,
  ): Promise<ServiceResult<{ data: Product[]; pagination?: Pagination }>> {
    try {
      const url = new URL(`/api/v1/seller/medicines`);

      // Append query params if provided
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, String(value));
          }
        });
      }

      const res = await fetch(url.toString(), {
        method: "GET",
        credentials: "include", // send cookies if needed
      });

      const data = await res.json();

      if (!res.ok) {
        return {
          data: null,
          error: { message: data?.message || "Failed to fetch products" },
        };
      }

      return { data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
  // ---------------- DELETE PRODUCT ----------------
  async deleteProductById(productId: string): Promise<ServiceResult<unknown>> {
    try {
      const res = await fetch(
        `/api/v1/seller/medicines/${productId}`,
        {
          method: "DELETE",
          credentials: "include", // sends cookies from browser
        },
      );

      const data = await res.json();

      if (!res.ok) {
        return {
          data: null,
          error: { message: data?.message || "Failed to delete product" },
        };
      }

      return { data, error: null };
    } catch {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  // ---------------- UPDATE PRODUCT ----------------
  async updateProductById(
    productId: string,
    payload: ProductData,
  ): Promise<ServiceResult<unknown>> {
    try {
      const res = await fetch(
        `/api/v1/seller/medicines/${productId}`,
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        return {
          data: null,
          error: { message: data?.message || "Failed to update product" },
        };
      }

      return { data, error: null };
    } catch {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  // ---------------- VIEW PRODUCT (client fetch optional) ----------------
  async getProductById(productId: string): Promise<ServiceResult<unknown>> {
    try {
      const res = await fetch(
        `/api/v1/seller/medicines/${productId}`,
        {
          method: "GET",
          credentials: "include",
        },
      );

      const data = await res.json();

      if (!res.ok) {
        return {
          data: null,
          error: { message: data?.message || "Failed to fetch product" },
        };
      }

      return { data, error: null };
    } catch {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
};
