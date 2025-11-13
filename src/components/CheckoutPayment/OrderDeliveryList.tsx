import { CartItem } from "@/types/cart";
import { OrderDeliveryCard } from "./OrderDeliveryCard";

interface OrderDeliveryListProps {
      items: CartItem[];
}

export function OrderDeliveryList({ items }: OrderDeliveryListProps) {
      return (
            <div className="flex flex-col gap-4">
                  {items.map((order) => (
                        <OrderDeliveryCard key={order.id} storeName={order.storeName} storeId={order.id} products={order.products} />
                  ))}
            </div>
      )
}