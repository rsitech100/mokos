import { Order } from "@/lib/api/fetch-order";
import Image from "next/image";

interface InfoSellerAndDeliveryProps {
      order: Order;
}

export function InfoSellerAndDelivery({ order }: InfoSellerAndDeliveryProps) {
      return (
            <div className="flex flex-col bg-white py-5 gap-5 rounded-xl shadow-md w-full h-fit">
                  {/* info penjual */}
                  <div className="flex flex-col px-5 gap-5">
                        <h4 className="text-lg font-extrabold text-neutral-700">Info Penjual</h4>
                        <div className="inline-flex gap-2.5 items-center">
                              <Image src="/image/order/toko-sepatu-dummy.svg" alt={order.merchant.name} width={48} height={48} className="w-6 h-6 rounded-full" />
                              <p className="text-sm font-bold text-neutral-700">{order.merchant.name}</p>
                        </div>
                  </div>

                  <hr className="border-dashed border-neutral-400 w-full"></hr>

                  {/* alamat pengiriman */}
                  <div className="flex flex-col px-5 gap-5">
                        <h4 className="text-lg font-extrabold text-neutral-700">Alamat Pengiriman</h4>
                        <div className="inline-flex gap-2.5 items-center">
                              <div className="flex flex-col gap-3">
                                    <div className="inline-flex gap-2 text-neutral-700 text-sm items-center">
                                          <p className="font-semibold">{order.toAddress.receiveName}</p>
                                          <span className=" w-1 h-1 rounded-full bg-neutral-400"></span>
                                          <p>{order.toAddress.phone}</p>
                                    </div>
                                    <div className="inline-flex gap-2 text-neutral-700 text-sm items-start">
                                          <Image src="/image/nav/menu/address.svg" alt="" width={20} height={20} className="w-5" />
                                          <p className="text-sm">
                                                {order.toAddress.street}, {order.toAddress.districtName}, {order.toAddress.cityName}, {order.toAddress.provinceName} {order.toAddress.postalCode}
                                          </p>
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
                                    <p className="font-semibold">{String(order.shippingMap?.providerId || '-')}</p>
                              </div>
                              <div className="inline-flex justify-between text-sm items-center">
                                    <p>Type</p>
                                    <p className="font-semibold">{String(order.shippingMap?.caption || '-')}</p>
                              </div>
                        </div>
                  </div>

                  <hr className="border-dashed border-neutral-400 w-full"></hr>

                  {/* Pembayaran */}
                  <div className="flex flex-col px-5 gap-5">
                        <h4 className="text-lg font-extrabold text-neutral-700">Pembayaran</h4>
                        <div className="inline-flex justify-between text-sm items-center">
                              <p>{order.paymentMethod ? 'Metode Pembayaran' : 'Belum ada pembayaran'}</p>
                              {order.paymentMethod && (
                                    <div className="p-2 border border-neutral-400 rounded-[12px]">
                                          <p className="text-xs font-semibold">Payment Method</p>
                                    </div>
                              )}
                        </div>
                  </div>
            </div>
      )
}