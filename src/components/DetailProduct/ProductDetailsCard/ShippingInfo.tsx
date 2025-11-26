import Image from "next/image";

export function ShippingInfo() {
      return (
            <div className="flex flex-col gap-4 p-4">
                  <div className="inline-flex gap-1.5 items-center">
                        <Image src="/image/detail-product/box.svg" alt="box" width={24} height={24} />
                        <p className="text-neutral-700 text-sm font-semibold">Metode Pengiriman</p>
                  </div>
                  <Image src="/image/detail-product/anter-aja.svg" alt="anter-aja" width={80} height={37} className="w-20 h-[37px]" />
            </div>
      )
}