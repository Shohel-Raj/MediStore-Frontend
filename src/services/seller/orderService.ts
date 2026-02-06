import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const sellerOrderService = {
  getOrders: async (page: number = 1, limit: number = 20, status?: string) => {
    const cookieStore= await cookies();
      const query = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (status) query.append("status", status);
    const res = await fetch(`${API_URL}/api/v1/order/seller/my-orders?${query.toString()}`, {
      headers:{ Cookie: cookieStore.toString() } ,
      cache: "no-store",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.error || "Failed to fetch orders");
    return data;
  },

  updateOrderStatus: async (
    orderId: string,
    newStatus: string,
    cookie?: string
  ) => {
    const res = await fetch(`${API_URL}/api/v1/seller/orders/${orderId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(cookie ? { Cookie: cookie } : {}),
      },
      body: JSON.stringify({ status: newStatus }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.error || "Failed to update status");
    return data;
  },

  getOrderById: async (orderId: string) => {
    const cookieStore= await cookies();
    const res = await fetch(`${API_URL}/api/v1/seller/orders/${orderId}`, {
      headers:  { Cookie: cookieStore.toString() },
      cache: "no-store",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.error || "Failed to fetch order");
    return data.data;
  },

  

 
};
