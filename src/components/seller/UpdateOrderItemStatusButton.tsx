"use client";

import { useState } from "react";
import { OrderStatus } from "../../../types/orderStatus";
import { sellerOrderServiceClient } from "@/services/seller/orderService.client";

interface Props {
  orderItemId: string;
  currentStatus: OrderStatus;
  onUpdated?: () => void;
}

export default function UpdateOrderItemStatusButton({
  orderItemId,
  currentStatus,
}: Props) {
  const [status, setStatus] = useState<OrderStatus>(currentStatus);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpdate = async () => {
    if (status === currentStatus) return;

    try {
      setLoading(true);
      setError(null);

      await sellerOrderServiceClient.updateOrderItemStatus(orderItemId, status);

    } catch (err: any) {
      setError(err.message || "Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as OrderStatus)}
        className="border rounded px-2 py-1 text-sm"
        disabled={loading}
      >
        {Object.values(OrderStatus).map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      <button
        onClick={handleUpdate}
        disabled={loading || status === currentStatus}
        className={`px-3 py-1 rounded text-sm font-medium
          ${
            loading || status === currentStatus
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-yellow-500 text-white hover:bg-yellow-600"
          }`}
      >
        {loading ? "Updating..." : "Update"}
      </button>

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
