import { getOrderDetails } from "@/services/common/order.server";

export default async function OrderDetailsPage({
  params,
}: {
  params: { orderId: string };
}) {
  const { orderId } = params;

  let order: any = null;
  let error: string | null = null;

  try {
    order = await getOrderDetails(orderId);
  } catch (err: any) {
    console.error(err);
    error = err.message || "Failed to load order details";
  }

  if (!order || !order.items || order.items.length === 0) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold">Order Details</h1>
        <p className="mt-4 text-red-500">
          {error || "No order data found for this order."}
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Order Details</h1>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-4">
        <p>
          <strong>Transaction:</strong> {order.transactionId}
        </p>
        <p>
          <strong>Status:</strong> {order.status}
        </p>
        <p>
          <strong>Date:</strong>{" "}
          {new Date(order.orderDate).toLocaleString()}
        </p>
        <p>
          <strong>Total:</strong> ৳ {order.totalPrice}
        </p>
      </div>

      {/* Items */}
      <div className="overflow-x-auto border rounded-lg">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Product</th>
              <th>Qty</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item: any) => (
              <tr key={item.productId}>
                <td>{item.productName}</td>
                <td>{item.quantity}</td>
                <td>৳ {item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
