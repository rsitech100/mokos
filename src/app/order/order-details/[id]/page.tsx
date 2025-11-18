import { OrderDetailsSection } from "@/containers/order/order-details";
import { orderData } from "@/lib/order-data";

export default async function OrderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const orderId = Number(id);
  const order = orderData.find((order) => order.id === orderId);

  if (!order) {
    return <div>Order not found</div>;
  }

  return <OrderDetailsSection order={order} />;
}
