import { OrderStatus } from "../../../types/orderStatus";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

const fetchClient = async (
  url: string,
  options: RequestInit = {}
) => {
  const res = await fetch(url, {
    ...options,
    credentials: "include", // IMPORTANT: send cookies
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "Something went wrong");
  }

  return data;
};

export const adminClientService = {
  // ================= USERS =================
  updateUserRole: async (userId: string, role: string) => {
    return fetchClient(
      `${API_URL}/api/v1/admin/users/${userId}/role`,
      {
        method: "PATCH",
        body: JSON.stringify({ role }),
      }
    );
  },

  blockOrUnblockUser: async (userId: string, status: string) => {
    return fetchClient(
      `${API_URL}/api/v1/admin/users/${userId}/block`,
      {
        method: "PATCH",
        body: JSON.stringify({ status }),
      }
    );
  },

  deleteUser: async (userId: string) => {
    return fetchClient(
      `${API_URL}/api/v1/admin/users/${userId}`,
      {
        method: "DELETE",
      }
    );
  },

  // ================= PRODUCTS =================
  updateProductStatus: async (
    productId: string,
    status: string
  ) => {
    return fetchClient(
      `${API_URL}/api/v1/admin/products/${productId}/status`,
      {
        method: "PATCH",
        body: JSON.stringify({ status }),
      }
    );
  },

  deleteProduct: async (productId: string) => {
    return fetchClient(
      `${API_URL}/api/v1/admin/products/${productId}`,
      {
        method: "DELETE",
      }
    );
  },

  // ================= ORDERS =================
  updateOrderStatus: async (
    orderId: string,
    status: OrderStatus
  ) => {
    return fetchClient(
      `${API_URL}/api/v1/admin/orders/${orderId}/status`,
      {
        method: "PATCH",
        body: JSON.stringify({ status }),
      }
    );
  },
};
