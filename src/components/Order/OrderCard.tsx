'use client';
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Order } from "@/lib/api/fetch-order";
import { LuCalendarDays } from "react-icons/lu";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosMore } from "react-icons/io";

interface OrderCardProps {
      order: Order;
}

// Helper function to format date
const formatDate = (timestamp: number) => {
      const date = new Date(timestamp);
      return date.toLocaleDateString('id-ID', { 
            day: '2-digit', 
            month: 'short', 
            year: 'numeric' 
      });
};

// Helper function to format price
const formatPrice = (price: number) => {
      return new Intl.NumberFormat('id-ID').format(price);
};

// Helper function to get status label
const getStatusLabel = (status: string) => {
      const statusMap: Record<string, string> = {
            'PENDING_PAYMENT': 'Menunggu Pembayaran',
            'PAID': 'Sudah Dibayar',
            'PROCESSING': 'Diproses',
            'SHIPPED': 'Dikirim',
            'DELIVERED': 'Selesai',
            'CANCELLED': 'Dibatalkan'
      };
      return statusMap[status] || status;
};

export function OrderCard({ order }: OrderCardProps) {
      const [showAdditionalItems, setShowAdditionalItems] = useState(false);

      const handleToggleAdditionalItems = () => {
            setShowAdditionalItems((prev) => !prev);
      };

      const shouldShowAdditionalItemsButton = order.ordersProduct.length > 1;

      // Get BASE_API from env
      const BASE_API = process.env.NEXT_PUBLIC_BASE_API || '';

      return (
            <div className="flex flex-col gap-4 w-full p-4 shadow-md rounded-[12px]">
                  {/* payment status, invoice number and payment date component */}
                  <div className="flex flex-row flex-wrap gap-3 items-center">
                        <div className="bg-info-100 text-xs text-info-300 py-1 px-3 rounded-[12px]">
                              {getStatusLabel(order.processStatus)}
                        </div>
                        <span className="mx-2.5 w-1 h-1 rounded-full bg-neutral-400"></span>
                        <p className="underline font-bold text-sm text-primary-500">{order.orderNumber}</p>
                        <span className="mx-2.5 w-1 h-1 rounded-full bg-neutral-400"></span>
                        <div className="inline-flex items-center text-sm gap-3">
                              <LuCalendarDays size={20} color="#191717" />
                              <p>{formatDate(order.createdDate)}</p>
                        </div>
                  </div>

                  <div className="border-t-[1px] border-dashed border-neutral-400"></div>

                  {/* order details and total order */}
                  <div className="flex flex-col w-full md:flex-row gap-6 justify-between">
                        <div className="flex flex-col gap-4 w-full md:w-1/2">
                              {order.ordersProduct.slice(0, 1).map((item) => {
                                    const product = item.productPrice.product;
                                    // Fetch product detail to get image
                                    const productImageUrl = `${BASE_API}/v1/product?id=${product.id}`;
                                    
                                    return (
                                          <div className="flex flex-row gap-2" key={item.id}>
                                                <Image 
                                                      src="/image/order/dummy.png" 
                                                      alt={product.title} 
                                                      width={60} 
                                                      height={60} 
                                                      className="w-[60px] h-[60px] object-cover rounded" 
                                                />
                                                <div className="flex flex-col gap-1 justify-center">
                                                      <p className="text-sm font-bold text-neutral-700 line-clamp-2">{product.title}</p>
                                                      <p className="text-sm text-neutral-700">{item.qty} x Rp {formatPrice(item.productPrice.price)}</p>
                                                </div>
                                          </div>
                                    );
                              })}
                              {shouldShowAdditionalItemsButton && !showAdditionalItems && (
                                    <div
                                          className="inline-flex gap-2 items-center text-primary-500 text-sm font-semibold cursor-pointer"
                                          onClick={handleToggleAdditionalItems}
                                    >
                                          Lihat {order.ordersProduct.length - 1} produk lainnya
                                          <IoIosArrowDown color="#315879" size={16} />
                                    </div>
                              )}
                              {showAdditionalItems &&
                                    order.ordersProduct.slice(1).map((item) => {
                                          const product = item.productPrice.product;
                                          return (
                                                <div className="flex flex-row gap-2" key={item.id}>
                                                      <Image
                                                            src="/image/order/dummy.png"
                                                            alt={product.title}
                                                            width={60}
                                                            height={60}
                                                            className="w-[60px] h-[60px] object-cover rounded"
                                                      />
                                                      <div className="flex flex-col gap-1 justify-center">
                                                            <p className="text-sm font-bold text-neutral-700 line-clamp-2">{product.title}</p>
                                                            <p className="text-sm text-neutral-700">
                                                                  {item.qty} x Rp {formatPrice(item.productPrice.price)}
                                                            </p>
                                                      </div>
                                                </div>
                                          );
                                    })}
                        </div>
                        <div className="flex flex-col md:flex-row gap-4 w-full md:w-1/2">
                              <hr className="border border-dashed md:border-solid border-neutral-400 h-full" />
                              <div className="flex flex-row md:flex-col gap-2 justify-between md:justify-center items-center md:items-start  text-left">
                                    <p className="text-xs text-neutral-700">Total Belanja</p>
                                    <p className="font-extrabold text-neutral-700 text-base">Rp{formatPrice(order.finalTotalPrice)}</p>
                              </div>
                        </div>
                  </div>

                  {/*  more and see details button */}
                  <div className="inline-flex justify-between md:justify-end items-center gap-3">
                        <button className="p-2 border border-neutral-400 rounded-xl"><IoIosMore size={20} color="#000000" /></button>
                        <Link href={`/order/order-details/${order.id}`} className="w-full md:w-fit" passHref>
                              <button className="bg-primary-500 rounded-3xl py-2 px-8 text-white text-sm w-full md:w-fit">Lihat Detail</button>
                        </Link>
                  </div>
            </div>
      )
}