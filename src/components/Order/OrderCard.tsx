'use client';
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { OrderCardType } from "@/types/order-card"
import { LuCalendarDays } from "react-icons/lu";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosMore } from "react-icons/io";

interface OrderCardProps {
      order: OrderCardType;
}

export function OrderCard({ order }: OrderCardProps) {
      const [showAdditionalItems, setShowAdditionalItems] = useState(false);

      const handleToggleAdditionalItems = () => {
            setShowAdditionalItems((prev) => !prev);
      };

      const shouldShowAdditionalItemsButton = order.items.length > 1;


      return (
            <div className="flex flex-col gap-4 w-full p-4 shadow-md rounded-[12px]">
                  {/* payment status, invoice number and payment date component */}
                  <div className="flex flex-row gap-3 items-center">
                        <div className="bg-info-100 text-xs text-info-300 -py-2 px-3 rounded-[12px]">
                              {order.status}
                        </div>
                        <span className="mx-2.5 w-1 h-1 rounded-full bg-neutral-400"></span>
                        <p className="underline font-bold text-sm text-primary-500">{order.number_invoice}</p>
                        <span className="mx-2.5 w-1 h-1 rounded-full bg-neutral-400"></span>
                        <div className="inline-flex items-center text-sm gap-3">
                              <LuCalendarDays size={20} color="#191717" />
                              <p>{order.date}</p>
                        </div>
                  </div>

                  <div className="border-t-[1px] border-dashed border-neutral-400"></div>

                  {/* order details and total order */}
                  <div className="flex flex-row gap-6 justify-between">
                        <div className="flex flex-col gap-4 w-1/2">
                              {order.items.slice(0, 1).map((item) => (
                                    <div className="flex flex-row gap-2" key={item.name}>
                                          <Image src="/image/order/dummy.png" alt="dummy" width={60} height={60} className="w-[60px]" />
                                          <div className="flex flex-col gap-1 justify-center">
                                                <p className="text-sm font-bold text-neutral-700">{item.name}</p>
                                                <p className="text-sm text-neutral-700">{item.quantity} x Rp {item.price}</p>
                                          </div>
                                    </div>
                              ))}
                              {shouldShowAdditionalItemsButton && !showAdditionalItems && (
                                    <div
                                          className="inline-flex gap-2 items-center text-primary-500 text-sm font-semibold cursor-pointer"
                                          onClick={handleToggleAdditionalItems}
                                    >
                                          Lihat {order.items.length - 1} produk lainnya
                                          <IoIosArrowDown color="#315879" size={16} />
                                    </div>
                              )}
                              {showAdditionalItems &&
                                    order.items.slice(1).map((item) => (
                                          <div className="flex flex-row gap-2" key={item.name}>
                                                <Image
                                                      src="/image/order/dummy.png"
                                                      alt="dummy"
                                                      width={60}
                                                      height={60}
                                                      className="w-[60px]"
                                                />
                                                <div className="flex flex-col gap-1 justify-center">
                                                      <p className="text-sm font-bold text-neutral-700">{item.name}</p>
                                                      <p className="text-sm text-neutral-700">
                                                            {item.quantity} x Rp {item.price}
                                                      </p>
                                                </div>
                                          </div>
                                    ))}
                        </div>
                        <div className="flex flex-row gap-4 w-1/2">
                              <div className="bg-neutral-400 w-[1px] my-5"></div>
                              <div className="flex flex-col gap-2 items-start justify-center text-left">
                                    <p className="text-xs text-neutral-700">Total Belanja</p>
                                    <p className="font-extrabold text-neutral-700 text-base">Rp{order.total_price}</p>
                              </div>
                        </div>
                  </div>

                  {/*  more and see details button */}
                  <div className="inline-flex justify-end items-center gap-3">
                        <button className="p-2 border border-neutral-400 rounded-xl"><IoIosMore size={20} color="#000000" /></button>
                        <Link href={`/order/order-details/${order.id}`} passHref>
                              <button className="bg-primary-500 rounded-3xl py-2 px-8 text-white text-sm">Lihat Detail</button>
                        </Link>
                  </div>
            </div>
      )
}