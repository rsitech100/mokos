import Image from "next/image";

export function ProductDetailsInfo() {
      return (
            <div className="flex flex-col gap-2">
                  <p className="text-danger-200 text-xs sm:text-sm font-semibold">SISA STOK 5</p>
                  <div className="inline-flex gap-2 text-xs sm:text-sm text-neutral-700 items-center">
                        <Image src="/image/product/icon/star-icon.svg" alt="star icon" width={16} height={16} />
                        <p>4.9</p>
                        <hr className="border-neutral-400 w-[14px] rotate-90" />
                        <p>124 Penilaian</p>
                  </div>

                  <h3 className="font-extrabold text-lg sm:text-xl">Sepatu Hitam Bagus dan Berkualitas</h3>
                  <p className="text-neutral-600 text-xs sm:text-sm">Terjual 150</p>
                  <h2 className="font-extrabold text-xl sm:text-2xl text-neutral-700">Rp200.000</h2>
            </div>
      )
}