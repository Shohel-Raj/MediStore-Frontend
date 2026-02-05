import OrdersTable from "@/components/orders/OrdersTable";
import { getMyOrdersServer } from "@/services/common/order.server";

export default async function OrdersPage() {
  const { data: orders, error } = await getMyOrdersServer();
  console.log(orders)
  if (error) {
    return (
      <div className="p-6 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">My Orders</h1>

      <OrdersTable orders={orders} />
    </div>
  );
}
