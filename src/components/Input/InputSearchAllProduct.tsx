import Image from "next/image";

export function InputSearchAllProduct() {
      return (
            <div className="flex flex-row bg-transparent border border-neutral-400 rounded-lg gap-3 px-2 py-2 w-max sm:w-full lg:w-[488px]">
                  <Image src="/image/nav/search-icon.svg" alt="search-icon" width={16} height={16} />
                  <input placeholder="Cari" className="outline-none text-neutral-700 w-full text-sm"/>
            </div>
      )
}