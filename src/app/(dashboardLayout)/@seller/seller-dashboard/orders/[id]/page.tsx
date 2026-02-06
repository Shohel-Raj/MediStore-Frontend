import { sellerOrderService } from "@/services/seller/orderService";

export default async function OrderDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } =await params;


const data = await sellerOrderService.getOrderById(id);
 
  // Handle no data
  if (!data ) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold">Order Details</h1>
        <p className="mt-4 text-red-500">
          { "No order data found for this order."}
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Order Details</h1>

     
    </div>
  );
}
