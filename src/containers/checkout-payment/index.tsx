import { OrderDeliveryList } from "@/components/CheckoutPayment/OrderDeliveryList";
import { ShippingAddressUser } from "@/components/CheckoutPayment/ShippingAddressUser";
import { ShoppingSummaryBox } from "@/components/CheckoutPayment/ShoppingSummaryBox";
import { cartItemData } from "@/lib/cart-data";
export function CheckoutPaymentSection() {
      return (
            <section className="flex flex-col gap-6">
                  <h2 className="text-neutral-700 font-extrabold text-lg md:text-2xl">Pengiriman</h2>
                  <section className="flex flex-col md:flex-row gap-6">
                        <div className="flex flex-col gap-4 max-w-[800px] w-full">
                              <ShippingAddressUser />
                              <OrderDeliveryList items={cartItemData} />
                        </div>
                        <ShoppingSummaryBox />
                  </section>
            </section>
      )
}