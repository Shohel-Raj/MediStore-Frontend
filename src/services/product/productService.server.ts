import { cookies } from "next/headers";

// ------------------ Types ------------------
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

// ------------------ Service ------------------
const API_URL = process.env.API_URL;

interface GetAllProductsParams {
  search?: string;
  manufacturer?: string;
  dosageForm?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  hasDiscount?: boolean;
  sellerId?: string;
  page: number;
  limit: number;
  skip: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export const productService = {
  // --------------- GET ALL PRODUCTS ----------------
  getAllProducts: async (params: GetAllProductsParams) => {
    try {
      const url = new URL(`${API_URL}/api/v1/medicines`);

      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          url.searchParams.append(key, String(value));
        }
      });

      const cookieStore = await cookies();
      const res = await fetch(url.toString(), {
        method: "GET",
        headers: {
          Cookie: cookieStore.toString(),
        },
        next: { tags: ["publicProducts"], revalidate: 10 },
      });

      const data = await res.json();
      if (!res.ok) {
        return {
          data: [],
          pagination: undefined,
          error: data?.message || "Failed to fetch products",
        };
      }

      return {
        data: data.data || [],
        pagination: data.pagination,
        error: null,
      };
    } catch (err: any) {
      return {
        data: [],
        pagination: undefined,
        error: err.message || "Something went wrong",
      };
    }
  },

  // --------------- GET SINGLE PRODUCT ----------------
  getProductById: async (productId: string) => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/v1/medicines/${productId}`, {
        method: "GET",
        headers: { Cookie: cookieStore.toString() },
        next: { tags: ["publicProducts"], revalidate: 10 },
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        const message =
          (errorData && (errorData as any).message) ||
          "Failed to fetch product";
        throw new Error(message);
      }
      const data = await res.json();

      if (!res.ok) {
        return {
          data: null,
          error: { message: data?.message || "Failed to fetch product" },
        };
      }

      return { data, error: null };
    } catch (err: any) {
      throw new Error(err?.message || "Something went wrong");
    }
  },
};
