import { cookies } from "next/headers";
import { OrderStatus } from "../../../types/orderStatus";

const API_URL = process.env.API_URL!;



// ================= DASHBOARD =================
export const adminServerService = {
  getOverviewStats: async () => {
    const cookieStore = await cookies();
    const res = await fetch(`${API_URL}/api/v1/admin/stats/overview`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch overview stats");
    return res.json();
  },

  getMonthlySalesStats: async (year: number) => {
    const cookieStore = await cookies();
    const res = await fetch(
      `${API_URL}/api/v1/admin/stats/sales/monthly?year=${year}`,
      {
         headers: {
      Cookie: cookieStore.toString(),
    },
        cache: "no-store",
      },
    );

    if (!res.ok) throw new Error("Failed to fetch monthly sales");
    return res.json();
  },

  // ================= USERS =================
  getAllUsers: async (page = 1, limit = 10, search?: string) => {
    const cookieStore = await cookies();
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      ...(search && { search }),
    });

    const res = await fetch(`${API_URL}/api/v1/admin/users?${params}`, {
       headers: {
      Cookie: cookieStore.toString(),
    },
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch users");
    return res.json();
  },

  // ================= PRODUCTS =================
  getAllProducts: async (
    page = 1,
    limit = 10,
    search?: string,
    status?: string,
  ) => {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      ...(search && { search }),
      ...(status && { status }),
    });
const cookieStore = await cookies();
    const res = await fetch(`${API_URL}/api/v1/admin/products?${params}`, {
      
         headers: {
      Cookie: cookieStore.toString(),
    },
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
  },

  // ================= ORDERS =================
  getAllOrders: async (page = 1, limit = 10, status?: OrderStatus) => {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      ...(status && { status }),
    });
const cookieStore = await cookies();
    const res = await fetch(`${API_URL}/api/v1/admin/orders?${params}`, {
      
         headers: {
      Cookie: cookieStore.toString(),
    },
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch orders");
    return res.json();
  },
};
