'use client';
import Image from "next/image";
import { useProductDetail } from "@/context/ProductDetailContext";

export function ProductDetailsInfo() {
      const { product, loading } = useProductDetail();

      if (loading) {
            return (
                  <div className="flex flex-col gap-2 animate-pulse">
                        <div className="h-4 bg-gray-300 rounded w-24"></div>
                        <div className="h-4 bg-gray-300 rounded w-32"></div>
                        <div className="h-6 bg-gray-300 rounded w-full"></div>
                        <div className="h-4 bg-gray-300 rounded w-20"></div>
                        <div className="h-8 bg-gray-300 rounded w-32"></div>
                  </div>
            );
      }

      if (!product) return null;

      const formattedPrice = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
      }).format(product.price);

      const stock = 100; // Default, adjust based on your API if available

      return (
            <div className="flex flex-col gap-2">
                  <p className="text-danger-200 text-xs sm:text-sm font-semibold">SISA STOK {stock}</p>
                  <div className="inline-flex gap-2 text-xs sm:text-sm text-neutral-700 items-center">
                        <Image src="/image/product/icon/star-icon.svg" alt="star icon" width={16} height={16} />
                        <p>{product.totalRating.toFixed(1)}</p>
                        <hr className="border-neutral-400 w-[14px] rotate-90" />
                        <p>{product.viewsCount} Penilaian</p>
                  </div>

                  <h3 className="font-extrabold text-lg sm:text-xl">{product.title}</h3>
                  <p className="text-neutral-600 text-xs sm:text-sm">Terjual {product.soldStock}</p>
                  <h2 className="font-extrabold text-xl sm:text-2xl text-neutral-700">{formattedPrice}</h2>
            </div>
      )
}