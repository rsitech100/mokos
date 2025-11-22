import { OrderCard } from "./OrderCard";
import { Order } from "@/lib/api/fetch-order";

interface OrderCardListProps {
      orders: Order[];
}

export function OrderCardList({ orders }: OrderCardListProps) {
      return (
            <div className="flex flex-col gap-4">
                  {orders.map((order) => (
                        <OrderCard key={order.id} order={order} />
                  ))}
            </div>
      )
}