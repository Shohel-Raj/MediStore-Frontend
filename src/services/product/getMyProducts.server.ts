import { cookies } from "next/headers";

const API_URL = process.env.API_URL;

if (!API_URL) {
  throw new Error("Missing API_URL in environment variables");
}

interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  manufacturer?: string | null;
  dosageForm?: string | null;
  strength?: string | null;
  packSize?: string | null;
  price: number;
  discountPrice?: number | null;
  stock: number;
  lowStockThreshold: number;
  image?: string | null;
  images: string[];
  status: "ACTIVE" | "INACTIVE";
  sellerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface GetProductsResponse {
  data: Product[];
  pagination?: Pagination;
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

async function withSellerCookieHeaders() {
  const cookieStore = await cookies();
  return {
    Cookie: cookieStore.toString(),
  };
}

export const sellerProductServiceServer = {
  // ---------------- GET ALL MY PRODUCTS ----------------
  async getAllProducts(
    params?: Record<string, string | number | boolean>,
    options?: ServiceOptions
  ): Promise<ServiceResult<{ data: Product[]; pagination?: Pagination }>> {
    try {
      const url = new URL(`${API_URL}/api/v1/seller/medicines`);

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, String(value));
          }
        });
      }

      const config: RequestInit = { method: "GET" };
      if (options?.cache) config.cache = options.cache;
      if (options?.revalidate) config.next = { revalidate: options.revalidate };

      config.next = { ...config.next, tags: ["myProducts"] };

      const res = await fetch(url.toString(), {
        ...config,
        headers: await withSellerCookieHeaders(),
      });

      const data = await res.json();

      if (!res.ok) {
        return {
          data: null,
          error: { message: data?.message || "Failed to fetch products" },
        };
      }

      return { data, error: null };
    } catch {
      return { data: null, error: { message: "Something went wrong" } };
    }
  },

  // ---------------- VIEW SINGLE PRODUCT ----------------
  async getProductById(productId: string): Promise<ServiceResult<Product>> {
    try {
      const res = await fetch(`${API_URL}/api/v1/seller/medicines/${productId}`, {
        method: "GET",
        headers: await withSellerCookieHeaders(),
        cache: "no-store",
        next: { tags: ["myProducts"] },
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
