import { headers } from "next/headers";
import Link from "next/link";
import { sellerOrderService } from "@/services/seller/orderService";

interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

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



export default async function SellerOrdersPage({ searchParams }: { searchParams?: { page?: string } }) {

const params =await searchParams;
console.log(params)
  const page = Number(searchParams?.page) || 1;
  const limit = 20;

  const  data  = await sellerOrderService.getOrders(page,limit);
  const orders= data;

console.log("from page",orders)
  if (!orders || !orders?.data.length || orders.success===false) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">My Product Orders</h1>
        <p>No orders found.</p>
      </div>
    );
  }
  

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold mb-4">My Product Orders</h1>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left">Order ID</th>
              <th className="border px-4 py-2 text-left">Customer</th>
              <th className="border px-4 py-2 text-left">Status</th>
              <th className="border px-4 py-2 text-left">Total</th>
              <th className="border px-4 py-2 text-left">Date</th>
              <th className="border px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders?.data.map((order: Order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{order.id}</td>
                <td className="border px-4 py-2">{order.user.name}</td>
                <td className="border px-4 py-2">{order.status}</td>
                <td className="border px-4 py-2">৳ {order.totalAmount}</td>
                <td className="border px-4 py-2">{new Date(order.createdAt).toLocaleString()}</td>
                <td className="border px-4 py-2 text-center space-x-2">
                  <Link
                    href={`/seller/orders/${order.id}`}
                    className="px-2 py-1 bg-blue-50 text-blue-700 rounded hover:bg-blue-100"
                  >
                    View Details
                  </Link>
                  <Link
                    href={`/seller/orders/update-status/${order.id}`}
                    className="px-2 py-1 bg-yellow-50 text-yellow-700 rounded hover:bg-yellow-100"
                  >
                    Update Status
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {orders.pagination && orders.pagination.totalPages > 1 && (
        <div className="flex justify-center space-x-2 mt-4">
          {Array.from({ length: orders.pagination.totalPages }, (_, i) => (
            <Link
              key={i + 1}
              href={`/seller/orders?page=${i + 1}`}
              className={`px-3 py-1 border rounded ${
                currentPage === i + 1 ? "bg-gray-200" : "hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
