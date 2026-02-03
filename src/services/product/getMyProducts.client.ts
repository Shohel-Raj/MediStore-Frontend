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
  // ---------------- DELETE PRODUCT ----------------
  async deleteProductById(productId: string): Promise<ServiceResult<unknown>> {
    try {
      const res = await fetch(`${API_URL}/api/v1/seller/medicines/${productId}`, {
        method: "DELETE",
        credentials: "include", // sends cookies from browser
      });

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
    payload: ProductData
  ): Promise<ServiceResult<unknown>> {
    try {
      const res = await fetch(`${API_URL}/api/v1/seller/medicines/${productId}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

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
      const res = await fetch(`${API_URL}/api/v1/seller/medicines/${productId}`, {
        method: "GET",
        credentials: "include",
      });

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
