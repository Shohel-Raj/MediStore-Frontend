import Link from "next/link";
import { sellerOrderService } from "@/services/seller/orderService";
import UpdateOrderItemStatusButton from "@/components/seller/UpdateOrderItemStatusButton";
import { toOrderStatus } from "../../../../../../types/orderStatus";

interface Order {
  id: string;
  status: string;
  totalAmount: number;
  createdAt: string;
  user: {
    name: string;
    email: string;
  };
  items: any[];
}

const STATUSES = [
  "PENDING",
  "CONFIRMED",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
];

export default async function SellerOrdersPage({
  searchParams,
}: {
  searchParams?: { page?: string; status?: string };
}) {
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const limit = 10;
  const status =
    params?.status && params.status !== "ALL" ? params.status : undefined;

  const orders = await sellerOrderService.getOrders(page, limit, status);

  if (orders.success === false) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">My Product Orders</h1>
        <p>No orders found.</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">My Product Orders</h1>

      {/* 🔍 Status Filter */}
      <form method="get" className="flex gap-3 items-center">
        <select
          name="status"
          defaultValue={searchParams?.status || "ALL"}
          className="border rounded px-3 py-2 text-sm"
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <button className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700">
          Filter
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Order ID</th>
              <th className="border px-4 py-2">Customer</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Total</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.data.length === 0 && (
              <p className="p-4 text-center text-gray-500">
                No data available for this status
              </p>
            )}
            {orders.data.map((order: Order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{order.id}</td>
                <td className="border px-4 py-2">{order.user.name}</td>
                <td className="border px-4 py-2">{order.status}</td>
                <td className="border px-4 py-2">৳ {order.totalAmount}</td>
                <td className="border px-4 py-2">
                  {new Date(order.createdAt).toLocaleString()}
                </td>
                <td className="border px-4 py-2 text-center space-x-2">
                  <Link
                    href={`/seller-dashboard/orders/${order.id}`}
                    className="px-2 py-1 bg-blue-50 text-blue-700 rounded hover:bg-blue-100"
                  >
                    View Details
                  </Link>

                  <UpdateOrderItemStatusButton
                    orderItemId={order.id}
                    currentStatus={toOrderStatus(order.status)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {orders.pagination?.totalPages > 1 && (
        <div className="flex justify-center space-x-2 mt-4">
          {Array.from({ length: orders.pagination.totalPages }, (_, i) => {
            const p = i + 1;
            const query = new URLSearchParams({
              page: String(p),
              ...(searchParams?.status ? { status: searchParams.status } : {}),
            });

            return (
              <Link
                key={p}
                href={`/seller-dashboard/orders?${query.toString()}`}
                className={`px-3 py-1 border rounded ${
                  page === p ? "bg-gray-200" : "hover:bg-gray-100"
                }`}
              >
                {p}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
