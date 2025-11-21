'use client';
import { CartList } from "@/components/Cart/CartList";
import { SelectAllBox } from "@/components/Cart/SelectAllBox";
import { useCartContext } from "@/context/CartContext";

export function CartSection() {
      const { cartItems } = useCartContext();

      return (
            <section className="flex flex-col gap-4">
                  <SelectAllBox count={cartItems.length} />
                  <CartList items={cartItems} />
            </section>
      );
}