import Image from "next/image";
import { SearchProductButton } from "../Buttons/SearchProductButton";

export function OrderEmpty() {
      return (
            <div className="hidden flex-col items-center justify-center w-full gap-6">
            <Image src="/image/order/order-empty.svg" alt="order-empty" width={308} height={240} className="w-[380px] h-[240px]" />
            <div className="flex flex-col text-center">
                  <p className="text-neutral-700 text-base font-bold">Daftar Pesanan masih kosong</p>
                  <p className="text-neutral-700 text-base">Yuk, mulai cari produk</p>
            </div>
            <SearchProductButton />
      </div>
      )
}