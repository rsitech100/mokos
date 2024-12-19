import Image from "next/image";

export function ReviewEmpty() {
      return (
            <div className="hidden flex-col items-center justify-center w-full gap-6">
                  <Image src="/image/review/review-empty.svg" alt="review-empty" width={244} height={211} className="w-[244px] h-[211px]" />
                  <div className="flex flex-col text-center">
                        <p className="text-neutral-700 text-base font-bold">Ulasan masih kosong</p>
                        <p className="text-neutral-700 text-base">Ulasan produk akan tampil di sini</p>
                  </div>
            </div>
      )
}