import { CartList } from "@/components/Cart/CartList";
import { SelectAllBox } from "@/components/Cart/SelectAllBox";
import { cartItemData } from "@/lib/cart-data";

export function CartSection() {
      return (
            <section className="flex flex-col gap-4">
                  <SelectAllBox count={cartItemData.length} />
                  <CartList items={cartItemData} />
            </section>
      )
}