import { getOrderDetails } from "@/services/common/order.server";

export default async function OrderDetailsPage({
  params,
}: {
  params: { orderId: string };
}) {
  const { orderId } =await params;

  let order: any = null;
  let error: string | null = null;

  try {
    const response = await getOrderDetails(orderId);
    order = response;
  } catch (err: any) {
    console.error(err);
    error = err.message || "Failed to load order details";
  }
  // Handle no data
  if (order.success= false || order.data.length===0) {
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
          <strong>Order ID:</strong> {order.data.id}
        </p>
        <p>
          <strong>Status:</strong> {order.data.status}
        </p>
        <p>
          <strong>Date:</strong>{" "}
          {new Date(order.data.createdAt).toLocaleString()}
        </p>
        <p>
          <strong>Total:</strong> ৳ {order.data.finalAmount}
        </p>
        <p>
          <strong>Shipping Fee:</strong> ৳ {order.data.shippingFee}
        </p>
        <p>
          <strong>Discount:</strong> ৳ {order.data.discountAmount}
        </p>
      </div>

      {/* Shipping Address */}
      <div className="border rounded-lg p-4">
        <h2 className="font-semibold mb-2">Shipping Address</h2>
        <p>{order?.data.shippingAddress?.fullName}</p>
        <p>{order.data.shippingAddress?.addressLine1}</p>
        {order?.data.shippingAddress?.addressLine2 && <p>{order?.shippingAddress?.addressLine2}</p>}
        <p>{order?.data.shippingAddress?.phone}</p>
      </div>

      {/* Items */}
      <div className="overflow-x-auto border rounded-lg">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Product</th>
              <th>Qty</th>
              <th>Unit Price</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {order?.data.items?.map((item: any) => (
              <tr key={item.id}>
                <td>{item.product?.name || "Product"}</td>
                <td>{item.quantity}</td>
                <td>৳ {item.unitPrice}</td>
                <td>৳ {item.subtotal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
