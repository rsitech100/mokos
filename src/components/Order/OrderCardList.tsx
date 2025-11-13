import { OrderCard } from "./OrderCard";
import { orderData } from "@/lib/order-data";

export function OrderCardList() {
      return (
            <div className="flex flex-col gap-4">
                  {orderData.map((item) => (
                        <OrderCard key={item.id} order={item} />
                  ))}
            </div>
      )
}