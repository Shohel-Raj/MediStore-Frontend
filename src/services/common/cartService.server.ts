import { cookies } from "next/headers";

export async function getMyCartServer() {
  const cookieStore =await cookies();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/cart/me`, {
    method: "GET",
    headers: {
      Cookie: cookieStore.toString(),
    },
    cache: "no-store",
  });

  const data = await res.json();

  // if not logged in
  if (!res.ok) {
    return {
      id: null,
      userId: null,
      items: [],
      totalItems: 0,
    };
  }

  return data?.data ?? data;
}
