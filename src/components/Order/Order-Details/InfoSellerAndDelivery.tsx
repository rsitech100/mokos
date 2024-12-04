import Image from "next/image";

export function InfoSellerAndDelivery() {
      return (
            <div className="flex flex-col bg-white py-5 gap-5 rounded-xl shadow-md w-full h-fit">
                  {/* info penjual */}
                  <div className="flex flex-col px-5 gap-5">
                        <h4 className="text-lg font-extrabold text-neutral-700">Info Penjual</h4>
                        <div className="inline-flex gap-2.5 items-center">
                              <Image src="/image/order/toko-sepatu-dummy.svg" alt="Toko Sepatu" width={48} height={48} className="w-6 h-6 rounded-full" />
                              <p className="text-sm font-bold text-neutral-700">Toko Sepatu</p>
                        </div>
                  </div>

                  <hr className="border-dashed border-neutral-400 w-full"></hr>

                  {/* alamat pengiriman */}
                  <div className="flex flex-col px-5 gap-5">
                        <h4 className="text-lg font-extrabold text-neutral-700">Alamat Pengiriman</h4>
                        <div className="inline-flex gap-2.5 items-center">
                              <div className="flex flex-col gap-3">
                                    <div className="inline-flex gap-2 text-neutral-700 text-sm items-center">
                                          <p className="font-semibold">Tom Haye</p>
                                          <span className=" w-1 h-1 rounded-full bg-neutral-400"></span>
                                          <p>+621234567890</p>
                                    </div>
                                    <div className="inline-flex gap-2 text-neutral-700 text-sm items-start">
                                          <Image src="/image/nav/menu/address.svg" alt="" width={20} height={20} className="w-5" />
                                          <p className="text-sm">Gedung Jaya Lantai 9 Blok A02, Jalan MH Thamrin Nomor 12</p>
                                    </div>
                              </div>
                        </div>
                  </div>

                  <hr className="border-dashed border-neutral-400 w-full"></hr>

                  {/* Pengiriman */}
                  <div className="flex flex-col px-5 gap-5">
                        <h4 className="text-lg font-extrabold text-neutral-700">Pengiriman</h4>
                        <div className="flex flex-col gap-5">
                              <div className="inline-flex justify-between text-sm items-center">
                                    <p>Kurir</p>
                                    <Image src="/image/order/anter-aja.svg" alt="anter-aja" width={80} height={37} />
                              </div>
                              <div className="inline-flex justify-between text-sm items-center">
                                    <p>Type</p>
                                    <p className="font-semibold">Anteraja Regular</p>
                              </div>
                              <div className="inline-flex justify-between text-sm items-center">
                                    <p>No Tracking</p>
                                    <p className="font-semibold text-primary-500 underline">SPX037739199373</p>
                              </div>
                        </div>
                  </div>

                  <hr className="border-dashed border-neutral-400 w-full"></hr>

                  {/* Pembayaran */}
                  <div className="flex flex-col px-5 gap-5">
                        <h4 className="text-lg font-extrabold text-neutral-700">Pembayaran</h4>
                        <div className="inline-flex justify-between text-sm items-center">
                              <p>BNI Virtual Account</p>
                              <div className="p-2 border border-neutral-400 rounded-[12px]">
                                    <Image src="/image/order/bni.svg" alt="bni" width={56} height={16} />
                              </div>
                        </div>
                  </div>
            </div>
      )
}