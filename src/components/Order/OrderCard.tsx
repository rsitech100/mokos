'use client';
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Order } from "@/lib/api/fetch-order";
import { LuCalendarDays } from "react-icons/lu";
import { IoIosArrowDown, IoIosMore } from "react-icons/io";
import { getProductImages } from "@/lib/api/product-detail";

interface OrderCardProps {
      order: Order;
}

// Helper formatters
const formatDate = (timestamp: number) => {
      const date = new Date(timestamp);
      return date.toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
      });
};

const formatPrice = (price: number) =>
      new Intl.NumberFormat('id-ID').format(price);

const getStatusLabel = (status: string) => {
      const map: Record<string, string> = {
            PENDING_PAYMENT: "Menunggu Pembayaran",
            PAID: "Sudah Dibayar",
            PROCESSING: "Diproses",
            SHIPPED: "Dikirim",
            DELIVERED: "Selesai",
            CANCELLED: "Dibatalkan",
      };
      return map[status] || status;
};

export function OrderCard({ order }: OrderCardProps) {
      const [showAdditionalItems, setShowAdditionalItems] = useState(false);

      // Cache gambar per productId
      const [imageMap, setImageMap] = useState<Record<string, string>>({});

      useEffect(() => {
            async function loadImages() {
                  const newMap: Record<string, string> = {};

                  for (const item of order.ordersProduct) {
                        const productId = item.productPrice.product.id;

                        if (imageMap[productId]) continue;

                        const images = await getProductImages(productId);
                        newMap[productId] = images[0]?.fullUrl || "/image/order/dummy.png";
                  }

                  setImageMap(prev => ({ ...prev, ...newMap }));
            }

            loadImages();
            // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [order.ordersProduct]);

      const toggleAdditional = () => setShowAdditionalItems(prev => !prev);

      const shouldShowMore = order.ordersProduct.length > 1;

      return (
            <div className="flex flex-col gap-4 w-full p-4 shadow-md rounded-[12px]">

                  {/* Status + info dasar */}
                  <div className="flex flex-row flex-wrap gap-3 items-center">
                        <div className="bg-info-100 text-xs text-info-300 py-1 px-3 rounded-[12px]">
                              {getStatusLabel(order.processStatus)}
                        </div>

                        <span className="mx-2.5 w-1 h-1 rounded-full bg-neutral-400" />

                        <p className="underline font-bold text-sm text-primary-500">
                              {order.orderNumber}
                        </p>

                        <span className="mx-2.5 w-1 h-1 rounded-full bg-neutral-400" />

                        <div className="inline-flex items-center text-sm gap-3">
                              <LuCalendarDays size={20} color="#191717" />
                              <p>{formatDate(order.createdDate)}</p>
                        </div>
                  </div>

                  <div className="border-t border-dashed border-neutral-400" />

                  {/* Produk & total harga */}
                  <div className="flex flex-col md:flex-row justify-between gap-6">

                        {/* LIST PRODUK */}
                        <div className="flex flex-col gap-4 w-full md:w-1/2">
                              {order.ordersProduct.slice(0, 1).map(item => {
                                    const product = item.productPrice.product;
                                    const imageUrl = imageMap[product.id] || "/image/order/dummy.png";

                                    return (
                                          <div className="flex flex-row gap-2" key={item.id}>
                                                <Image
                                                      src={imageUrl}
                                                      alt={product.title}
                                                      width={60}
                                                      height={60}
                                                      className="w-[60px] h-[60px] object-cover rounded"
                                                />
                                                <div className="flex flex-col justify-center gap-1">
                                                      <p className="text-sm font-bold text-neutral-700 line-clamp-2">
                                                            {product.title}
                                                      </p>
                                                      <p className="text-sm text-neutral-700">
                                                            {item.qty} x Rp {formatPrice(item.productPrice.price)}
                                                      </p>
                                                </div>
                                          </div>
                                    );
                              })}

                              {shouldShowMore && !showAdditionalItems && (
                                    <div
                                          className="inline-flex gap-2 items-center text-primary-500 text-sm font-semibold cursor-pointer"
                                          onClick={toggleAdditional}
                                    >
                                          Lihat {order.ordersProduct.length - 1} produk lainnya
                                          <IoIosArrowDown size={16} color="#315879" />
                                    </div>
                              )}

                              {/* Produk tambahan */}
                              {showAdditionalItems &&
                                    order.ordersProduct.slice(1).map(item => {
                                          const product = item.productPrice.product;
                                          const imageUrl = imageMap[product.id] || "/image/order/dummy.png";

                                          return (
                                                <div className="flex flex-row gap-2" key={item.id}>
                                                      <Image
                                                            src={imageUrl}
                                                            alt={product.title}
                                                            width={60}
                                                            height={60}
                                                            className="w-[60px] h-[60px] object-cover rounded"
                                                      />
                                                      <div className="flex flex-col justify-center gap-1">
                                                            <p className="text-sm font-bold text-neutral-700 line-clamp-2">
                                                                  {product.title}
                                                            </p>
                                                            <p className="text-sm text-neutral-700">
                                                                  {item.qty} x Rp {formatPrice(item.productPrice.price)}
                                                            </p>
                                                      </div>
                                                </div>
                                          );
                                    })}
                        </div>

                        {/* TOTAL HARGA */}
                        <div className="flex flex-col md:flex-row w-full md:w-1/2 gap-4">
                              <hr className="border border-dashed md:border-solid border-neutral-400 h-full" />

                              <div className="flex flex-row md:flex-col justify-between md:justify-center items-center md:items-start gap-2 text-left">
                                    <p className="text-xs text-neutral-700">Total Belanja</p>
                                    <p className="font-extrabold text-neutral-700 text-base">
                                          Rp{formatPrice(order.finalTotalPrice)}
                                    </p>
                              </div>
                        </div>
                  </div>

                  {/* tombol more & detail */}
                  <div className="inline-flex w-full md:justify-end items-center gap-3">
                        <button className="p-2 border border-neutral-400 rounded-xl">
                              <IoIosMore size={20} color="#000" />
                        </button>

                        <Link className="w-full md:w-fit" href={`/order/order-details/${order.id}`} passHref>
                              <button className="bg-primary-500 text-white text-sm py-2 px-8 rounded-3xl w-full md:w-fit">
                                    Lihat Detail
                              </button>
                        </Link>
                  </div>
            </div>
      );
}
