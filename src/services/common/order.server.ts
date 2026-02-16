import { cookies } from "next/headers";

// import { headers } from "next/headers";

export async function getMyOrdersServer() {
  const cookieStore = await cookies();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/order/me`,
    {
      headers: { Cookie: cookieStore.toString() },
      cache: "no-store",
    }
  );

  const data = await res.json();

  if (!res.ok) {
    return {
      data: [],
      error: data || "Failed to load orders",
    };
  }

  
  return {
    data: data.data,
    error: null,
  };
}

export async function getOrderDetails(orderId: string) {
  const cookieStore = await cookies();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/order/me/${orderId}`,
    {
      headers: { Cookie: cookieStore.toString() || "" },
      cache: "no-store",
    }
  );
  const data = await res.json();

 if (!res.ok) {
    return {
      data: [],
      error: data || "Failed to load orders",
    };
  }
  return data;
}