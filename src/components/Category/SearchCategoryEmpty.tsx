import Image from "next/image";
import { RecomendationSection } from "../Recomendation/Recomendation";

export function SearchCategoryEmpty() {
      return (
            <div className="hidden flex-col items-center justify-center w-full gap-6 py-10">
                  <Image src="/image/category/search-empty.svg" alt="notification-empty" width={206} height={170} className="w-[206px] h-[174px]" />
                  <div className="flex flex-col text-center">
                        <p className="text-neutral-700 text-base font-bold">Produk tidak ditemukan</p>
                        <p className="text-neutral-700 text-base">Silahkan ganti kata kunci lain</p>
                  </div>
                  <hr className="border-neutral-400 w-full" />
                  <RecomendationSection />
            </div>
      )
}