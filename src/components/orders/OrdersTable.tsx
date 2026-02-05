"use client";

import Link from "next/link";
import { Eye } from "lucide-react";

type OrderItem = {
  id: string;
  quantity: number;
};

type Order = {
  id: string;
  createdAt: string;
  totalAmount: number;
  finalAmount: number;
  status: "PENDING" | "PAID" | "CANCELLED" | string;
  items: OrderItem[];
};

export default function OrdersTable({ orders }: { orders: Order[] }) {
  if (!orders.length) {
    return (
      <div className="rounded-lg border p-6 text-center text-muted-foreground">
        You haven’t placed any orders yet.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border bg-background">
      <table className="w-full border-collapse text-sm">
        <thead className="bg-muted">
          <tr className="text-left">
            <th className="p-3">#</th>
            <th className="p-3">Order ID</th>
            <th className="p-3">Date</th>
            <th className="p-3">Items</th>
            <th className="p-3">Total</th>
            <th className="p-3">Status</th>
            <th className="p-3 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order, index) => {
            const totalItems = order.items.reduce(
              (sum, item) => sum + item.quantity,
              0
            );

            return (
              <tr
                key={order.id}
                className="border-t transition hover:bg-muted/50"
              >
                <td className="p-3">{index + 1}</td>

                <td className="p-3 font-mono text-xs">
                  {order.id.slice(0, 8)}…
                </td>

                <td className="p-3">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>

                <td className="p-3">{totalItems}</td>

                <td className="p-3 font-semibold">
                  ৳ {order.finalAmount}
                </td>

                <td className="p-3">
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      order.status === "PAID"
                        ? "bg-green-100 text-green-700"
                        : order.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>

                <td className="p-3 text-center">
                  <Link
                    href={`/dashboard/orders/${order.id}`}
                    className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs hover:bg-muted"
                  >
                    <Eye size={14} />
                    View
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
