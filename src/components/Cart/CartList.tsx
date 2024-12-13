import { CartItem } from "@/types/cart"
import { CartCard } from "./CartCard";

interface CartListProps {
      items: CartItem[];
}

export function CartList({items}: CartListProps) {
      return (
            <div className="flex flex-col gap-4">
                  {items.map((product) => (
                        <CartCard key={product.id} storeName={product.storeName} products={product.products} />
                  ))}
            </div>
      )
}