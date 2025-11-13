// app/order/order-details/[id]/page.tsx

import { OrderDetailsSection } from "@/containers/order/order-details";
import { orderData } from "@/lib/order-data";

interface OrderDetailsPageProps {
  params: {
    id: string; // id dari URL
  };
}

export default async function OrderDetailsPage({ params }: OrderDetailsPageProps) {
  const { id } = params;

  // Ambil data order berdasarkan ID
  const orderId = parseInt(id, 10);
  const order = orderData.find((order) => order.id === orderId)

  // if the data is not found
  if (!order) {
    throw new Error("Order not found");
  }

  return <OrderDetailsSection order={order} />;
}
