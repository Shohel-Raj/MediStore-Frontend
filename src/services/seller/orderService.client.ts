import { OrderStatus } from "../../../types/orderStatus";


export const sellerOrderServiceClient = {
  updateOrderItemStatus: async (
    orderItemId: string,
    status: OrderStatus
  ) => {
    const res = await fetch(
      `/api/v1/order/seller/order-items/${orderItemId}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // ✅ cookies automatically sent
        body: JSON.stringify({ status }),
      }
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data?.error || "Failed to update status");

    return data;
  },
};
