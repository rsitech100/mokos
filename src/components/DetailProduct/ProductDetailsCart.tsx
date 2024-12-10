'use client';
import { useState } from "react";
import Image from "next/image";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";

export function ProductDetailsCart() {
      const [quantity, setQuantity] = useState(1);

      const handleDecrement = () => {
            if (quantity > 1) setQuantity(quantity - 1);
      };

      const handleIncrement = () => {
            setQuantity(quantity + 1);
      };


      return (
            <div className="z-50 shadow-md fixed bottom-0 bg-neutral-100 w-full">
                  <div className="flex flex-row justify-between items-center py-5 w-full mx-auto max-w-[1200px]">
                        <div className="flex flex-row gap-3 items-center">
                              <Image src="/image/detail-product/dummy-2.svg" alt="dummy" width={48} height={48} />
                              <p className="text-sm text-neutral-700 font-medium">
                                    Sepatu Hitam Bagus <br /> dan Berkualitas
                              </p>
                        </div>
                        <div className="inline-flex gap-5">
                              <div className="inline-flex border border-neutral-400 px-4 py-2 gap-4 rounded-xl">
                                    <FaMinus size={24} color="#9C9C9C" onClick={handleDecrement} className="cursor-pointer" />
                                    {quantity}
                                    <FaPlus size={24} color="#315879" onClick={handleIncrement} className="cursor-pointer" />
                              </div>
                              <div className="flex flex-col gap-[3px]">
                                    <p className="text-xs text-neutral-700">Total Harga</p>
                                    <p className="text-base font-extrabold text-neutral-700">Rp200.000</p>
                              </div>
                        </div>

                        <div className="inline-flex gap-3">
                              <button className="rounded-2xl px-10 py-3 text-primary-500 border border-primary-500 bg-neutral-100 text-sm font-semibold">Beli Sekarang</button>
                              <button className="rounded-2xl px-10 py-3 text-neutral-100 border bg-primary-500 text-sm font-semibold">Tambah ke Keranjang</button>
                        </div>
                  </div>
            </div>
      )
}