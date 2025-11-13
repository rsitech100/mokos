import { OrderCardType } from "@/types/order-card";
import Image from "next/image";

// interface DetailProductProps {
//       order: OrderCardType;
// }

export function DetailProduct() {
      return (
            <div className="flex flex-col flex-1 bg-white py-5 gap-5 rounded-xl shadow-md">
                  <h4 className="text-lg font-extrabold text-neutral-700 px-5">Detail Produk</h4>

                  <div className="inline-flex justify-between px-5 items-center">
                        <div className="inline-flex gap-2 items-center">
                              <Image src="/image/order/dummy.png" alt="dummy" width={60} height={60} />
                              <div className="flex flex-col gap-[4px] text-sm text-neutral-700">
                                    <p className="font-bold">Sepatu Hitam</p>
                                    <p>Fashion</p>
                              </div>
                        </div>
                        <p className="text-neutral-700 font-sm">x2</p>
                        <p className="font-bold text-neutral-700 font-sm">Rp200.000</p>
                  </div>

                  <hr className="border-dashed border-neutral-400 w-full"></hr>

                  <div className="inline-flex justify-between px-5 items-center">
                        <div className="inline-flex gap-2 items-center">
                              <Image src="/image/order/dummy.png" alt="dummy" width={60} height={60} />
                              <div className="flex flex-col gap-[4px] text-sm text-neutral-700">
                                    <p className="font-bold">Sepatu Hitam</p>
                                    <p>Fashion</p>
                              </div>
                        </div>
                        <p className="text-neutral-700 font-sm">x2</p>
                        <p className="font-bold text-neutral-700 font-sm">Rp200.000</p>
                  </div>

                  <hr className="border-dashed border-neutral-400 w-full"></hr>

                  <div className="inline-flex justify-between px-5 items-center">
                        <div className="inline-flex gap-2 items-center">
                              <Image src="/image/order/dummy.png" alt="dummy" width={60} height={60} />
                              <div className="flex flex-col gap-[4px] text-sm text-neutral-700">
                                    <p className="font-bold">Sepatu Hitam</p>
                                    <p>Fashion</p>
                              </div>
                        </div>
                        <p className="text-neutral-700 font-sm">x2</p>
                        <p className="font-bold text-neutral-700 font-sm">Rp200.000</p>
                  </div>

                  <hr className="border-dashed border-neutral-400 w-full"></hr>

                  {/* Total  */}
                  <div className="flex flex-col gap-4 px-5 w-full">
                        <div className="inline-flex justify-between items-center text-sm text-neutral-700">
                              <p>Sub Total Produk</p>
                              <p className="font-bold">Rp1.200.000</p>
                        </div>

                        <div className="inline-flex justify-between items-center text-sm text-neutral-700">
                              <p>Sub Total Pengiriman</p>
                              <p className="font-bold">Rp10.000</p>
                        </div>

                        <div className="inline-flex justify-between items-center text-sm text-neutral-700">
                              <p>Ongkos Kirim</p>
                              <p className="font-bold">Rp10.000</p>
                        </div>

                        <div className="inline-flex justify-between items-center text-sm text-primary-500">
                              <p>Total</p>
                              <p className="font-bold">Rp1.220.000</p>
                        </div>
                  </div>
            </div>
      )
} 