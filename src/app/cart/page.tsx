import { TotalShoppingBox } from "@/components/Cart/TotalShoppingBox";
import { CartSection } from "@/containers/cart";
import { LastSeenCartSection } from "@/containers/cart/last-seen";
import { CartProvider } from "@/utils/CartContext";
import { cartItemData } from "@/lib/cart-data";

export default function CartPage() {
      return (
            <main className="flex flex-col md:flex-row gap-10 py-10 px-5 lg:px-20 max-w-[1440px] w-full mx-auto">
                  <CartProvider initialCartItems={cartItemData}>
                        <section className="flex flex-col gap-6 max-w-[790px] w-full">
                              <h2 className="text-neutral-700 font-extrabold text-lg md:text-2xl">Keranjang</h2>
                              <CartSection />
                              <LastSeenCartSection />
                        </section>
                        <TotalShoppingBox />
                  </CartProvider>
            </main>
      )
}