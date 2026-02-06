import { cookies } from "next/headers";

const API_URL = process.env.API_URL;

if (!API_URL) {
  throw new Error("Missing API_URL in environment variables");
}

interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}

// ---------------- DASHBOARD TYPES ----------------
export interface DashboardOverview {
  totalProducts: number;
  inStockProducts: number;
  outOfStockProducts: number;
  discountedProducts: number;
  recentProducts: {
    id: string;
    name: string;
    price: number;
    stock: number;
    createdAt: string;
  }[];
}

type ServiceResult<T> =
  | { data: T; error: null }
  | { data: null; error: { message: string } };

// ---------------- HELPER TO ADD COOKIE HEADERS ----------------
async function withSellerCookieHeaders() {
  const cookieStore = await cookies();
  return {
    Cookie: cookieStore.toString(),
  };
}

// ---------------- SELLER DASHBOARD SERVICE ----------------
export const sellerDashboardService = {
  async getOverview(
    options?: ServiceOptions
  ): Promise<ServiceResult<DashboardOverview>> {
    try {
      const res = await fetch(`${API_URL}/api/v1/seller/dashboard/overview`, {
        method: "GET",
        headers: await withSellerCookieHeaders(),
        cache: options?.cache || "no-store",
        next: { revalidate: options?.revalidate || 60, tags: ["sellerDashboard"] },
      });

      const data = await res.json();

      if (!res.ok) {
        return {
          data: null,
          error: { message: data?.message || "Failed to fetch dashboard overview" },
        };
      }

      return { data, error: null };
    } catch (err) {
      console.error("Dashboard fetch error:", err);
      return { data: null, error: { message: "Something went wrong" } };
    }
  },
};
