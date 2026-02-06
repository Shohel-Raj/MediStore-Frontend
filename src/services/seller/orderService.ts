import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const sellerOrderService = {
  getOrders: async (page: number = 1, limit: number = 20,) => {
    const cookieStore= await cookies();
    
    const res = await fetch(`${API_URL}/api/v1/order/seller/my-orders?page=${page}&limit=${limit}`, {
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

  getOrderById: async (orderId: string, cookie?: string) => {
    const res = await fetch(`${API_URL}/api/v1/seller/orders/${orderId}`, {
      headers: cookie ? { Cookie: cookie } : undefined,
      cache: "no-store",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.error || "Failed to fetch order");
    return data.data;
  },

  

 
};
