import { Product } from "@/types/cart";
import Image from "next/image";
import { PopupSelectShipping } from "../Popup/CheckoutPayment/PopupSelectShipping";

interface OrderDeliveryCardProps {
      storeName: string;
      storeId: number;
      products: Product[];
}


export function OrderDeliveryCard({ storeName, storeId, products }: OrderDeliveryCardProps) {
      return (
            <div className="rounded-[12px] flex flex-col gap-4 p-5 shadow-md bg-white">
                  <p className="text-base font-bold text-neutral-700">Pesanan {storeId}</p>
                  <div className="inline-flex gap-1.5 items-center">
                        <Image src="/image/checkout/shop-dummy.svg" alt="shop-dummy" width={24} height={24} />
                        <p className="font-bold text-sm text-neutral-700">{storeName}</p>
                  </div>

                  {/* ProductList */}
                  {products.map((item, index) => {
                        return (
                              <div key={item.id}>
                                    <div className="flex flex-col md:flex-row gap-3 justify-between">
                                          <div className="flex flex-row gap-3">
                                                <div className="flex flex-row gap-4">
                                                      <Image src={item.imageUrl} alt={item.name} width={60} height={60} className="w-[60px] h-[60px] rounded-[12px]" />
                                                      <div className="flex flex-col gap-[3px] text-xs sm:text-sm text-neutral-700">
                                                            <p className="font-semibold">{item.name}</p>
                                                            <p className="text-sm text-neutral-500">{item.category}</p>
                                                            <p className="block md:hidden font-extrabold text-neutral-700">{item.quantity} x Rp{item.price}</p>
                                                      </div>
                                                </div>
                                          </div>

                                          <div className="flex flex-col gap-5 text-right">
                                                <p className="hidden md:block font-extrabold text-base text-neutral-700">{item.quantity} x Rp{item.price}</p>
                                          </div>
                                    </div>
                                    {index < products.length - 1 && (
                                          <hr className="border-dashed border-neutral-400 my-3" />
                                    )}
                              </div>
                        )
                  })}
                  <PopupSelectShipping />
            </div>
      )
}