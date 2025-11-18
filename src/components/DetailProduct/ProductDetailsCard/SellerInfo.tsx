'use client';
import Image from "next/image";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { FaWhatsapp } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { useProductDetail } from "@/context/ProductDetailContext";

const BASE_API = process.env.NEXT_PUBLIC_BASE_API || '';

export function SellerInfo() {
      const { product, loading } = useProductDetail();

      if (loading) {
            return (
                  <div className="flex flex-col animate-pulse">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3.5 p-4">
                              <div className="inline-flex gap-2">
                                    <div className="w-[54px] h-[54px] rounded-full bg-gray-300"></div>
                                    <div className="flex flex-col gap-1 justify-center">
                                          <div className="h-4 bg-gray-300 rounded w-24"></div>
                                          <div className="h-3 bg-gray-300 rounded w-32"></div>
                                    </div>
                              </div>
                              <div className="h-10 bg-gray-300 rounded-2xl w-full md:w-32"></div>
                        </div>
                  </div>
            );
      }

      if (!product) return null;

      const merchantImage = product.merchant.pictureFile 
            ? `${BASE_API}${product.merchant.pictureFile}` 
            : "/image/detail-product/shoes-dummy.svg";

      const handleWhatsAppClick = () => {
            const phone = product.merchant.phone.replace(/^0/, '62');
            const message = encodeURIComponent(`Halo, saya tertarik dengan produk: ${product.title}`);
            window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
      };

      return (
            <div className="flex flex-col">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3.5 p-4">
                        <div className="inline-flex gap-2">
                              <div className="rounded-full border border-neutral-400 relative w-[54px] h-[54px] overflow-hidden">
                                    <Image 
                                          src={merchantImage} 
                                          alt={product.merchant.name} 
                                          fill
                                          className="object-cover"
                                          unoptimized
                                    />
                              </div>
                              <div className="flex flex-col gap-1 text-xs sm:text-sm justify-center">
                                    <div className="inline-flex font-bold text-neutral-700 gap-1.5">
                                          {product.merchant.name}
                                          <RiVerifiedBadgeFill color="#315879" size={20} />
                                    </div>
                                    <p className="text-neutral-600">Merchant Official</p>
                              </div>
                        </div>
                        <button
                              onClick={handleWhatsAppClick}
                              className="border border-neutral-400 bg-neutral-100 flex items-center justify-center gap-1.5 py-2 px-14 rounded-2xl w-full md:w-fit hover:bg-neutral-200 transition-colors"
                        >
                              <FaWhatsapp color="#191717" size={16} />
                              <p className="text-sm text-neutral-700 font-semibold">Chat</p>
                        </button>
                  </div>
                  <hr className="border-neutral-400 w-full " />
                  <div className="inline-flex items-center p-4 gap-1.5">
                        <IoLocationOutline size={16} color="#191717" />
                        <p className="text-xs sm:text-sm text-neutral-700 font-semibold">Lokasi Toko: <span className="font-normal">{product.merchant.name}</span></p>
                  </div>
                  <hr className="border-neutral-400 w-full " />
            </div>
      )
}